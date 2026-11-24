"""Import public MOEX ISS data. Each completed dataset is committed atomically."""
import argparse
import json
import ssl
import time
import urllib.request
import xml.etree.ElementTree as ET
import threading
from contextvars import ContextVar
from datetime import date, datetime, timedelta
from concurrent.futures import ThreadPoolExecutor
from email.utils import parsedate_to_datetime
from urllib.parse import urlencode, quote
from storage import ROOT, MSK, connect, init, log, now

BASE = "https://iss.moex.com/iss/"
MOEX_TLS = ssl.create_default_context()
MOEX_TLS.load_verify_locations(str(ROOT / "data/moex-root.pem"))
_interactive=ContextVar("interactive_moex",default=False)
_hydrate_lock=threading.Lock()


def fetch(url, headers=None):
    attempts=1 if _interactive.get() else 3
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "DefaultRadar-Educational/1.0",**(headers or {})})
            with urllib.request.urlopen(req, timeout=5 if _interactive.get() else 22, context=MOEX_TLS) as response:
                return response.read()
        except (OSError, TimeoutError):
            if attempt == attempts-1:
                raise
            time.sleep(0.5 * (2 ** attempt))


def iss(path, **params):
    return json.loads(fetch(BASE + path + ".json?" + urlencode({"iss.meta":"off", **params})))


def records(payload, table):
    block = payload[table]
    return [dict(zip(block["columns"], row)) for row in block["data"]]


def pages(path, table, **params):
    start, previous = 0, None
    while True:
        result = iss(path, start=start, limit=1000, **params)
        rows = records(result, table)
        if not rows:
            break
        if rows[0] == previous:
            raise ValueError("ISS повторил страницу")
        previous = rows[0]
        yield from rows
        start += len(rows)
        cursor = result.get(table + ".cursor", {}).get("data", [])
        if cursor and start >= cursor[0][1]:
            break


def catalog(db):
    items = list(pages("securities","securities",group_by="group",group_by_filter="stock_bonds"))
    listing = list(pages("history/engines/stock/markets/bonds/listing","securities"))
    active = records(iss("engines/stock/markets/bonds/securities", **{"iss.only":"securities"}),"securities")
    if not items or not listing or not active:
        raise ValueError("Пустая выгрузка справочника")
    stamp = now()
    mapping = {}
    for row in items:
        key = row["isin"] or row["secid"]
        mapping[row["secid"]] = key
        issuer = str(row["emitent_inn"] or row["emitent_id"] or ("unknown:"+key))
        db.execute("INSERT OR REPLACE INTO issuers VALUES(?,?,?)",
                   (issuer,row["emitent_title"] or "Эмитент не указан",row["emitent_inn"]))
        db.execute("""INSERT INTO bonds(id,isin,secid,name,short,issuer,primary_board,traded,seen,source)
          VALUES(?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,short=excluded.short,
          issuer=excluded.issuer,primary_board=excluded.primary_board,traded=excluded.traded,seen=excluded.seen""",
          (key,row["isin"],row["secid"],row["name"],row["shortname"],issuer,row["primary_boardid"],
           row["is_traded"],stamp,BASE+"securities/"+quote(row["secid"])+".json"))
    for row in listing:
        key = mapping.get(row["SECID"])
        if key:
            db.execute("INSERT OR REPLACE INTO boards VALUES(?,?,?,?,?)",
                       (key,row["SECID"],row["BOARDID"],row["history_from"],row["history_till"]))
    for row in active:
        key = row["ISIN"] or row["SECID"]
        db.execute("""UPDATE bonds SET currency=?,nominal=?,maturity=? WHERE id=? AND
          (primary_board=? OR currency IS NULL)""",
          (row["FACEUNIT"],row["FACEVALUE"],row["MATDATE"],key,row["BOARDID"]))
    next_coupons(db,active)
    return len(set(mapping.values()))


def next_coupons(db,active=None):
    if active is None:
        active=records(iss("engines/stock/markets/bonds/securities",**{"iss.only":"securities"}),"securities")
    today=now()
    seen=set()
    for r in active:
        key=r["ISIN"] or r["SECID"]
        day=r.get("NEXTCOUPON")
        if key in seen or not day or day<today[:10] or not db.execute("SELECT 1 FROM bonds WHERE id=?",(key,)).fetchone():
            continue
        seen.add(key)
        if db.execute("SELECT 1 FROM plans WHERE bond=? AND kind='Купон' AND date=? AND id NOT LIKE 'next:%'",(key,day)).fetchone():
            continue
        unit=r.get("COUPONVALUE") or None
        # Current number actually placed, when ISS supplies it.
        size=r.get("ISSUESIZEPLACED") or None
        amount=round(unit*size,2) if unit and size else None
        cur="RUB" if r.get("FACEUNIT") in ("SUR","RUR") else r.get("FACEUNIT") or "—"
        source=BASE+"engines/stock/markets/bonds/securities/"+quote(r["SECID"])+".json"
        db.execute("INSERT OR REPLACE INTO plans VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                   (f"next:{key}:{today[:10]}",key,day,"Купон",amount,unit,cur,today,source,"Ближайший купон · ISS",today))
    return len(seen)


def histories(db, secid, board, begin, end):
    row = db.execute("SELECT id FROM bonds WHERE secid=? OR id=?",(secid,secid)).fetchone()
    key = row[0] if row else secid
    path = f"history/engines/stock/markets/bonds/boards/{quote(board)}/securities/{quote(secid)}"
    rows = list(pages(path,"history",**{"from":begin,"till":end}))
    for r in rows:
        if (r["NUMTRADES"] or 0)>0 and r["CLOSE"] is not None:
            db.execute("INSERT OR REPLACE INTO quotes VALUES(?,?,?,?,?,?,?,?,?)",
              (key,board,r["TRADEDATE"],r["CLOSE"],r["VALUE"],r["NUMTRADES"],r.get("YIELDCLOSE"),
               r.get("CURRENCYID"),now()))
    return len(rows)


def market_day(db, day):
    path="history/engines/stock/markets/bonds/securities"
    columns="BOARDID,TRADEDATE,SECID,NUMTRADES,VALUE,CLOSE,YIELDCLOSE,CURRENCYID"
    def page(start):
        return iss(path,date=day,start=start,**{"history.columns":columns})
    first=page(0)
    _,total,size=first["history.cursor"]["data"][0]
    if not size:
        raise ValueError("Пустой размер страницы ISS")
    all_rows=records(first,"history")
    with ThreadPoolExecutor(max_workers=3) as pool:
        for chunk in pool.map(page,range(size,total,size)):
            all_rows.extend(records(chunk,"history"))
    if len(all_rows)!=total:
        raise ValueError("Неполная дневная выгрузка")
    ids={r["secid"]:r["id"] for r in db.execute("SELECT id,secid FROM bonds")}
    stamp=now()
    saved=[(ids[r["SECID"]],r["BOARDID"],day,r["CLOSE"],r["VALUE"],r["NUMTRADES"],r["YIELDCLOSE"],r["CURRENCYID"],stamp)
           for r in all_rows if r["SECID"] in ids and (r["NUMTRADES"] or 0)>0 and r["CLOSE"] is not None]
    if not saved:
        raise ValueError("Нет подтверждённых сделок за дату")
    db.executemany("INSERT OR REPLACE INTO quotes VALUES(?,?,?,?,?,?,?,?,?)",saved)
    return len(saved)


def schedule(db, secid):
    path = f"statistics/engines/stock/markets/bonds/bondization/{quote(secid)}"
    total = 0
    stamp = now()
    source = BASE+path+".json"
    result = iss(path,limit=100,start=0)
    for table,date_field,title in [("coupons","coupondate","Купон"),("amortizations","amortdate","Амортизация"),("offers","offerdate","Оферта")]:
        rows = records(result,table)
        cursor = result.get(table+".cursor",{}).get("data",[])
        if cursor and len(rows)<cursor[0][1]:
            rows = list(pages(path,table,**{"iss.only":table+","+table+".cursor"}))
        # Today's terms cannot backfill what investors knew at a prior date.
        for index,r in enumerate(rows):
            kind = "Погашение" if r.get("data_source")=="maturity" else title
            day = r[date_field]
            if not day:
                continue
            per_unit = None if title=="Оферта" else r.get("value")
            amount = None
            if per_unit is not None and r.get("initialfacevalue") and r.get("issuevalue") is not None:
                amount = round(per_unit*r["issuevalue"]/r["initialfacevalue"],2)
            bond = r.get("isin") or secid
            terms = (amount,per_unit,r.get("faceunit") or "—")
            previous = db.execute("""SELECT amount,per_unit,currency FROM plans
                WHERE bond=? AND date=? AND kind=? AND source=? ORDER BY known DESC LIMIT 1""",
                (bond,day,kind,source)).fetchone()
            if previous is None or tuple(previous)!=terms:
                db.execute("INSERT OR REPLACE INTO plans VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                    (f"iss:{secid}:{table}:{day}:{index}:{stamp}",bond,day,kind,*terms,stamp,source,kind+" · график ISS",stamp))
        total += len(rows)
    return total


def rss(db):
    url = "https://www.moex.com/export/news.aspx"
    root = ET.fromstring(fetch(url))
    items = root.findall(".//item")
    if not items:
        raise ValueError("В RSS нет записей")
    for item in items:
        link,title,dt = (item.findtext(k) for k in ("link","title","pubDate"))
        if link and title and dt:
            stamp = parsedate_to_datetime(dt).astimezone(MSK).isoformat()[:19]
            db.execute("INSERT OR REPLACE INTO news VALUES(?,?,?,?,?,?,?,?,?,?)",
                       (link,"Рынок",None,None,stamp,title,"Московская биржа",link,None,now()))
    return len(items)


def defaults(db):
    """Import the public register. Observation time is the conservative availability bound."""
    endpoint="https://web.moex.com/moex-web-icdb-api/api/v1/site-defaults"
    headers={"Origin":"https://www.moex.com","Referer":"https://www.moex.com/ru/listing/emidocs.aspx?type=4",
             "Accept":"application/json"}
    def page(number):
        params=urlencode(dict(pageNumber=number,pageSize=20,order="technicalDefaultDate",dir="desc",query=""))
        return json.loads(fetch(endpoint+"?"+params,headers))
    result=page(0)
    batch=list(result["list"])
    seen={r["id"] for r in batch}
    page_no=1
    while batch:
        batch=page(page_no)["list"]
        fresh=[r for r in batch if r["id"] not in seen]
        if batch and not fresh:
            raise ValueError("Реестр повторил страницу")
        seen.update(r["id"] for r in fresh)
        result["list"].extend(fresh)
        if len(batch)<20:
            break
        page_no+=1
    if not seen:
        raise ValueError("Реестр вернул пустую выдачу")
    stamp=now()
    for r in result["list"]:
        isin=(r.get("instrumentIsin") or r.get("instrumentTradeCode") or "").strip().upper()
        if not isin:
            continue
        record=r["id"]
        values=(isin,str(r.get("emitentInn") or ""),r["technicalDefaultDate"][:10],r["liabilityType"],
                r["defaultState"],(r.get("executeDate") or "")[:10] or None,
                f"https://www.moex.com/ru/listing/emidoc-default.aspx?id={int(record)}")
        previous=db.execute("""SELECT bond,inn,due,kind,status,executed,url FROM moex_defaults
            WHERE record_id=? ORDER BY observed DESC LIMIT 1""",(record,)).fetchone()
        if previous is None or tuple(previous)!=values:
            db.execute("INSERT INTO moex_defaults VALUES(?,?,?,?,?,?,?,?,?)",(record,stamp,*values))
    return len(seen)


def run(db,name,job):
    try:
        with db:
            count=job()
            log(db,name,count)
        print(f"{name}: {count}",flush=True)
        return True
    except (OSError, ValueError, KeyError, ET.ParseError) as exc:
        with db:
            log(db,name,error=str(exc)[:240])
        print(f"{name}: {exc}",flush=True)
        return False


def enrich_for_chat(db,s,topics):
    """Fill absent market observations; current schedules are never backdated."""
    b=s["bond"];day=s["asof"][:10];secid=b["secid"]
    jobs=[]
    if "цена" in topics and (not s["last"] or (date.fromisoformat(day)-date.fromisoformat(s["last"]["day"])).days>3):
        board=db.execute("""SELECT board FROM boards WHERE bond=? AND firstday<=? AND lastday>=?
              ORDER BY CASE board WHEN 'TQCB' THEN 0 WHEN 'TQOB' THEN 0 ELSE 1 END LIMIT 1""",
              (b["id"],day,s["start"])).fetchone()
        if board:
            jobs.append((f"История {secid} {board[0]} {day}",lambda:histories(db,secid,board[0],s["start"],day)))
    if "календарь" in topics and day==now()[:10] and not s["next"]:
        jobs.append((f"График {secid} {day}",lambda:schedule(db,secid)))
    changed=False
    if jobs:
        with _hydrate_lock:
            token=_interactive.set(True)
            try:
                for name,job in jobs:
                    last=db.execute("SELECT attempt,error FROM refresh WHERE source=?",(name,)).fetchone()
                    if last and datetime.fromisoformat(last["attempt"])+timedelta(minutes=5 if last["error"] else 180)>datetime.fromisoformat(now()):
                        continue
                    changed=run(db,name,job) or changed
            finally:
                _interactive.reset(token)
    return changed


if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("task",choices=["catalog","demo","rss","bond","market-days","next-coupons","defaults"])
    parser.add_argument("--dates",nargs="+",default=["2026-03-18","2026-03-19","2026-04-07","2026-04-08"])
    parser.add_argument("--secid")
    parser.add_argument("--board",default="TQCB")
    parser.add_argument("--from-date",default="2025-12-01")
    parser.add_argument("--till",default="2026-04-08")
    args=parser.parse_args()
    db=connect()
    init(db)
    ok=True
    if args.task=="catalog":
        ok=run(db,"MOEX · каталог",lambda:catalog(db))
    elif args.task=="defaults":
        ok=run(db,"MOEX · реестр дефолтов",lambda:defaults(db))
    elif args.task=="next-coupons":
        ok=run(db,"MOEX · ближайшие купоны",lambda:next_coupons(db))
    elif args.task=="market-days":
        for day in args.dates:
            ok=run(db,"MOEX · рынок "+day,lambda:market_day(db,day)) and ok
    elif args.task=="rss":
        ok=run(db,"MOEX · RSS",lambda:rss(db))
    else:
        if args.task=="bond" and not args.secid:
            parser.error("--secid обязателен")
        tickers=[args.secid] if args.task=="bond" else ["RU000A10BB75","RU000A10CZB9","RU000A10ATS0","RU000A107C91","SU26238RMFS4"]
        for ticker in tickers:
            board = "TQOB" if ticker=="SU26238RMFS4" else args.board
            ok=run(db,"MOEX · торги "+ticker,lambda:histories(db,ticker,board,args.from_date,args.till)) and ok
            ok=run(db,"MOEX · календарь "+ticker,lambda:schedule(db,ticker)) and ok
    db.close()
    raise SystemExit(0 if ok else 1)
