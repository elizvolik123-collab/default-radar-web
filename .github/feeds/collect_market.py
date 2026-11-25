"""Refresh dated public financial statements, macro series, bond terms and news."""
import argparse
import html
import json
import re
import sqlite3
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timedelta
from urllib.parse import quote, urljoin

from storage import ROOT, MSK, connect, now
from sync import MOEX_TLS, fetch, iss, pages, records


from credit_data import LABELS, INDICES, CURVE_URL
from disclosure_feed import SCHEMA as FILING_SCHEMA, gateway
FIELDS = set(LABELS)
DATABASE = ROOT / "data/market.sqlite3"
SCHEMA = """
CREATE TABLE IF NOT EXISTS reports(issuer TEXT,period TEXT,standard TEXT,published TEXT,ticker TEXT,url TEXT,
 original TEXT,metrics TEXT,PRIMARY KEY(issuer,period,standard));
CREATE INDEX IF NOT EXISTS reports_issuer ON reports(issuer,published);
CREATE TABLE IF NOT EXISTS report_editions(issuer TEXT,period TEXT,standard TEXT,published TEXT,ticker TEXT,
 url TEXT,original TEXT,metrics TEXT,observed TEXT,PRIMARY KEY(issuer,period,standard,observed));
CREATE TABLE IF NOT EXISTS series(code TEXT,day TEXT,value REAL,label TEXT,unit TEXT,url TEXT,PRIMARY KEY(code,day));
CREATE TABLE IF NOT EXISTS index_candles(code TEXT,day TEXT,open REAL,high REAL,low REAL,close REAL,turnover_rub REAL,
 PRIMARY KEY(code,day));
CREATE TABLE IF NOT EXISTS curve(day TEXT,years REAL,yield_pct REAL,PRIMARY KEY(day,years));
CREATE TABLE IF NOT EXISTS corporate_yields(code TEXT,day TEXT,yield_pct REAL,duration_days INTEGER,PRIMARY KEY(code,day));
CREATE TABLE IF NOT EXISTS terms(bond TEXT,seen TEXT,board TEXT,settle TEXT,accrued REAL,coupon REAL,
 rate REAL,due TEXT,period INTEGER,currency TEXT,source TEXT,PRIMARY KEY(bond,seen));
CREATE TABLE IF NOT EXISTS headlines(published TEXT,url TEXT PRIMARY KEY,title TEXT);
CREATE TABLE IF NOT EXISTS daily(secid TEXT,board TEXT,day TEXT,price REAL,volume REAL,trades INTEGER,
  yield_close REAL,PRIMARY KEY(secid,board,day));
CREATE TABLE IF NOT EXISTS sessions(secid TEXT,board TEXT,day TEXT,open REAL,high REAL,low REAL,
  quantity REAL,currency TEXT,PRIMARY KEY(secid,board,day));
CREATE TABLE IF NOT EXISTS issue_type(secid TEXT,seen TEXT,code TEXT,PRIMARY KEY(secid,seen));
CREATE TABLE IF NOT EXISTS issuer_sector(inn TEXT,day TEXT,sector TEXT,url TEXT,PRIMARY KEY(inn,day,sector));
CREATE TABLE IF NOT EXISTS bond_yields(secid TEXT,board TEXT,day TEXT,ytm REAL,duration REAL,
 zspread REAL,PRIMARY KEY(secid,board,day));
"""


def plain(value):
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", value)).split())


def report_rows(content, ticker, issuer, url):
    header = re.search(r'<tr[^>]+class="header_row"[^>]*>(.*?)</tr>', content, re.S)
    title = re.search(r"<title>(.*?)</title>", content, re.S)
    if not header or not title:
        return []
    standard = next((s for s in ("МСФО","РСБУ","US GAAP") if s in plain(title[1]).upper()), None)
    if not standard:
        return []
    cells = lambda row: re.findall(r"<td\b[^>]*>(.*?)</td>", row, re.S | re.I)
    years = [plain(c) for c in cells(header[1])]
    values = {}
    units = {}
    for key, row in re.findall(r'<tr[^>]*\bfield="([^"]+)"[^>]*>(.*?)</tr>', content, re.S):
        if key not in FIELDS | {"date", "report_url", "currency"}:
            continue
        values[key] = cells(row)
        label = re.search(r"<th[^>]*>(.*?)</th>", row, re.S)
        units[key] = plain(label[1]).rsplit(",",1)[-1].strip() if label and "," in plain(label[1]) else ""
    results = []
    for i,year in enumerate(years):
        if not re.fullmatch(r"20\d{2}(?:Q[1-4])?", year):
            continue
        def get(k):
            col = values.get(k, [])
            return col[i] if len(col) == len(years) else ""
        try:
            published = datetime.strptime(plain(get("date")), "%d.%m.%Y").date()
        except ValueError:
            continue
        from calendar import monthrange
        month=int(year[5])*3 if "Q" in year else 12
        last=date(int(year[:4]),month,monthrange(int(year[:4]),month)[1])
        if published > date.today() or published<last:
            continue
        metrics = {}
        for key in FIELDS:
            raw = plain(get(key)).replace(" ", "").replace(",", ".").replace("−", "-").rstrip("%")
            if re.fullmatch(r"-?\d+(?:\.\d+)?", raw):
                metrics[key] = [float(raw), units[key] or ("%" if "%" in plain(get(key)) else "")]
        link = re.search(r'href="(https?://[^"]+)"', get("report_url"))
        if metrics:
            results.append((issuer, year, standard, published.isoformat(), ticker, url,
                            html.unescape(link[1]) if link else None, json.dumps(metrics, ensure_ascii=False)))
    return results


def store_reports(db,batch):
    stamp=now()
    for row in batch:
        key=row[:3]
        previous=db.execute("SELECT published,url,original,metrics FROM report_editions WHERE issuer=? AND period=? AND standard=? ORDER BY observed DESC LIMIT 1",key).fetchone()
        if previous is None:
            previous=db.execute("SELECT published,url,original,metrics FROM reports WHERE issuer=? AND period=? AND standard=?",key).fetchone()
        if previous is None:
            db.execute("INSERT INTO reports VALUES(?,?,?,?,?,?,?,?)",row)
        elif tuple(previous[:3])!=tuple(row[i] for i in (3,5,6)) or json.loads(previous[3])!=json.loads(row[7]):
            db.execute("INSERT OR REPLACE INTO report_editions VALUES(?,?,?,?,?,?,?,?,?)",(*row,stamp))


def fundamentals(db):
    directory = fetch("https://smart-lab.ru/q/shares_fundamental/").decode()
    symbols = set(re.findall(r'/q/([\w.\-]+)/f/y/',directory))
    with connect() as catalog:
        issuers = {r[0] for r in catalog.execute("SELECT DISTINCT issuer FROM bonds WHERE traded=1")}
    mapping={"RZHD":"7708503727","GAZP":"7736050003","SBER":"7707083893","GMKN":"8401005730",
             "SIBN":"5504036333","SMLT":"9731004688","SGZH":"9703024202","POSI":"9718077239",
             "PHOR":"7736216869","EUTR":"5029169023","LKOH":"7708004767"}
    try:
        for r in pages("securities","securities",engine="stock",market="shares",group_by="group",group_by_filter="stock_shares"):
            if r["emitent_inn"]:mapping[r["secid"]]=str(r["emitent_inn"])
    except OSError as exc:
        print("Справочник акций Мосбиржи загружен частично:",type(exc).__name__,flush=True)
    def resolve_ticker(symbol):
        # A missed page of MOEX's catalogue must not silently exclude an issuer.
        try:
            rows=records(iss("securities",q=symbol,**{"iss.only":"securities","securities.columns":"secid,emitent_inn,group"}),"securities")
        except OSError:
            return symbol,None
        exact={str(r["emitent_inn"]) for r in rows if r["secid"]==symbol and r.get("emitent_inn") and r.get("group")=="stock_shares"}
        return symbol,exact.pop() if len(exact)==1 else None
    with ThreadPoolExecutor(4) as pool:
        for symbol,inn in pool.map(resolve_ticker,sorted(symbols-mapping.keys())):
            if inn:mapping[symbol]=inn
    picked = {inn:ticker for inn,ticker in db.execute("SELECT DISTINCT issuer,ticker FROM reports WHERE ticker<>''") if inn in issuers}
    for ticker in sorted(symbols, key=lambda key:(len(key),key)):
        inn = mapping.get(ticker)
        if inn in issuers:
            picked.setdefault(inn,ticker)
    def collect(item):
        issuer,ticker = item
        url = f"https://smart-lab.ru/q/{quote(ticker)}/f/y/"
        try:
            return report_rows(fetch(url).decode(), ticker, issuer, url)
        except (OSError, UnicodeError) as exc:
            print(ticker, type(exc).__name__, flush=True)
            return []
    with ThreadPoolExecutor(max_workers=4) as pool:
        for batch in pool.map(collect,picked.items()):
            with db:
                store_reports(db,batch)
    print("Mapped", len(picked), "issuers. Financial observations:", db.execute("SELECT count(*) FROM reports").fetchone()[0])


def quarters(db):
    with connect() as catalog:
        active={r[0] for r in catalog.execute("SELECT DISTINCT issuer FROM bonds WHERE traded=1")}
    items=[r for r in db.execute("SELECT DISTINCT issuer,ticker FROM reports WHERE ticker<>''") if r[0] in active]
    def collect(item):
        inn,ticker=item
        url=f"https://smart-lab.ru/q/{quote(ticker)}/f/q/"
        try:return report_rows(fetch(url).decode(),ticker,inn,url)
        except (OSError,UnicodeError):return []
    with ThreadPoolExecutor(4) as pool:
        for batch in pool.map(collect,items):
            with db:store_reports(db,batch)
    print("Quarterly reports:",db.execute("SELECT count(*) FROM reports WHERE period LIKE '%Q%'").fetchone()[0])


def indices(db):
    first = date(2014, 1, 1)
    # ISS can return an unfinished candle for the current Moscow trading day.
    through = datetime.now(MSK).date() - timedelta(days=1)
    if "turnover_rub" not in {r[1] for r in db.execute("PRAGMA table_info(index_candles)")}:
        db.execute("ALTER TABLE index_candles ADD COLUMN turnover_rub REAL")
    latest = dict(db.execute("SELECT code,max(day) FROM index_candles GROUP BY code HAVING count(turnover_rub)>0"))

    def load(code):
        since = max(first, date.fromisoformat(latest[code]) - timedelta(days=7)) if code in latest else first
        rows = pages(f"engines/stock/markets/index/securities/{code}/candles", "candles",
                     interval=24, **{"from": since.isoformat(), "till": through.isoformat()})
        candles, closes = [], []
        for row in rows:
            day = date.fromisoformat(row["begin"][:10])
            o, h, l, c = (row.get(k) for k in ("open", "high", "low", "close"))
            if c is None or not since <= day <= through:
                continue
            closes.append((code, day.isoformat(), c, INDICES[code], "п.", f"https://www.moex.com/ru/index/{code}"))
            if None not in (o, h, l) and l <= min(o, c) and h >= max(o, c):
                # VALUE is turnover of the index basket. The five RUB indices use RUB in ISS history.
                value = row.get("value")
                candles.append((code, day.isoformat(), o, h, l, c, value if value and value > 0 else None))
        if not closes:
            raise ValueError("Нет истории для " + code)
        return closes, candles

    failures=[]
    with ThreadPoolExecutor(3) as pool:
        jobs={code:pool.submit(load,code) for code in INDICES}
        for code,job in jobs.items():
            try:closes,candles=job.result()
            except (OSError, ValueError) as exc:
                failures.append(code);print(code,str(exc),flush=True);continue
            with db:
                db.executemany("INSERT OR REPLACE INTO series VALUES(?,?,?,?,?,?)",closes)
                db.executemany("INSERT OR REPLACE INTO index_candles VALUES(?,?,?,?,?,?,?)",candles)
            print(code, len(candles), "OHLC", closes[0][1], closes[-1][1], flush=True)
    if failures:raise ValueError("Не получены индексы "+", ".join(failures))


def curve_rows(raw):
    rows=re.findall(r"<tr\b[^>]*>(.*?)</tr>",raw,re.I|re.S)
    tenors=[]
    for row in rows:
        cells=[plain(v) for v in re.findall(r"<t[hd]\b[^>]*>(.*?)</t[hd]>",row,re.I|re.S)]
        if len(cells)>2 and all(re.fullmatch(r"\d+(?:[.,]\d+)?",v) for v in cells):
            tenors=[float(v.replace(",",".")) for v in cells]
        if tenors and len(cells)==len(tenors)+1 and re.fullmatch(r"\d{2}\.\d{2}\.\d{4}",cells[0]):
            stamp=datetime.strptime(cells[0],"%d.%m.%Y").date().isoformat()
            for term,value in zip(tenors,cells[1:]):
                if re.fullmatch(r"-?\d+(?:[.,]\d+)?",value):
                    yield stamp,term,float(value.replace(",","."))


def curve(db):
    last=db.execute("SELECT max(day) FROM curve").fetchone()[0]
    start=date.fromisoformat(last)-timedelta(days=7) if last else date.today()-timedelta(days=730)
    url=CURVE_URL+"?UniDbQuery.Posted=True&UniDbQuery.From="+start.strftime("%d.%m.%Y")+"&UniDbQuery.To="+date.today().strftime("%d.%m.%Y")
    batch=list(curve_rows(fetch(url).decode("utf-8")))
    if not batch:raise ValueError("Банк России не вернул узлы КБД")
    with db:db.executemany("INSERT OR REPLACE INTO curve VALUES(?,?,?)",batch)
    print("КБД",len(batch),"узлов",max(r[0] for r in batch),flush=True)


def corporate_yields(db):
    for code in ("RUCBTRNS","RUCBTRAAANS"):
        prior=db.execute("SELECT max(day) FROM corporate_yields WHERE code=?",(code,)).fetchone()[0]
        start=date.fromisoformat(prior)-timedelta(days=8) if prior else date.today()-timedelta(days=730)
        path=f"history/engines/stock/markets/index/boards/RTSI/securities/{code}"
        rows=pages(path,"history",**{"from":str(start),"till":str(date.today())})
        batch=[(code,r["TRADEDATE"],r["YIELD"],r["DURATION"]) for r in rows
               if r.get("YIELD") is not None and r.get("DURATION") and str(r.get("TRADINGSESSION")) in ("3","None")]
        if not batch:raise ValueError("Нет данных о доходности "+code)
        with db:db.executemany("INSERT OR REPLACE INTO corporate_yields VALUES(?,?,?,?)",batch)
        print(code,"доходность и дюрация",len(batch),flush=True)


def key_rate(db):
    start = (date.today()-timedelta(days=730)).isoformat()
    end = date.today().isoformat()
    body = f'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><KeyRate xmlns="http://web.cbr.ru/"><fromDate>{start}T00:00:00</fromDate><ToDate>{end}T23:59:59</ToDate></KeyRate></soap:Body></soap:Envelope>'
    req = urllib.request.Request("https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx",body.encode(),
          {"Content-Type":"text/xml; charset=utf-8","SOAPAction":'"http://web.cbr.ru/KeyRate"'})
    with urllib.request.urlopen(req,timeout=35,context=MOEX_TLS) as resp:
        root=ET.parse(resp)
    batch=[("KEY",node.findtext("DT")[:10],float(node.findtext("Rate")),"Ключевая ставка","%",
            "https://www.cbr.ru/hd_base/KeyRate/") for node in root.iter() if node.findtext("DT") and node.findtext("Rate")]
    if not batch: raise ValueError("Пустой ответ Банка России")
    with db: db.executemany("INSERT OR REPLACE INTO series VALUES(?,?,?,?,?,?)",batch)
    print("CBR",len(batch),flush=True)


def bond_terms(db):
    rows=records(iss("engines/stock/markets/bonds/securities",**{"iss.only":"securities"}),"securities")
    with connect() as catalog:
        known={r["secid"]:(r["id"],r["primary_board"]) for r in catalog.execute("SELECT id,secid,primary_board FROM bonds")}
    chosen={}
    for r in rows:
        if r["SECID"] not in known: continue
        issue,primary=known[r["SECID"]]
        rank=(r["BOARDID"]!=primary,r["BOARDID"] not in ("TQCB","TQOB","TQOD"),r["BOARDID"])
        if issue not in chosen or rank<chosen[issue][0]:chosen[issue]=(rank,r)
    seen=now()
    batch=[]
    for issue,(_,r) in chosen.items():
        sec=quote(r["SECID"]);board=quote(r["BOARDID"])
        url=f"https://iss.moex.com/iss/engines/stock/markets/bonds/boards/{board}/securities/{sec}.json"
        batch.append((issue,seen,board,r["SETTLEDATE"],r["ACCRUEDINT"],r["COUPONVALUE"],r["COUPONPERCENT"],
                      r["NEXTCOUPON"],r["COUPONPERIOD"],r["FACEUNIT"],url,r["CURRENCYID"]))
    if not batch:raise ValueError("Пустая таблица НКД")
    with db:
        if "settlement_currency" not in [r[1] for r in db.execute("PRAGMA table_info(terms)")]:
            db.execute("ALTER TABLE terms ADD COLUMN settlement_currency TEXT")
        db.executemany("INSERT OR REPLACE INTO terms VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",batch)
    print("Bond terms",len(batch),flush=True)


def telegram(db):
    text=fetch("https://t.me/s/markettwits").decode()
    batch=[]
    for num,block in re.findall(r'data-post="markettwits/(\d+)"(.*?)(?=data-post="markettwits/|\Z)',text,re.S):
        dt=re.search(r'<time[^>]*datetime="([^"]+)"',block)
        msg=re.search(r'<div class="tgme_widget_message_text[^"]*"[^>]*>(.*?)</div>',block,re.S)
        if dt and msg:
            lines=[plain(p) for p in re.split(r'<br\s*/?>',msg[1]) if plain(p)]
            title=next((s for s in lines if len(re.findall(r"\b[а-яёa-z]{3,}\b",re.sub(r"#\w+","",s),re.I))>=3 and not s.startswith('https://')),None)
            if title:
                batch.append((datetime.fromisoformat(dt[1]).astimezone(MSK).isoformat()[:19],
                              "https://t.me/markettwits/"+num," ".join(title.split()[:16])[:165]))
    if not batch:raise ValueError("Нет публикаций MarketTwits")
    with db:db.executemany("INSERT OR REPLACE INTO headlines VALUES(?,?,?)",batch)
    print("MarketTwits",len(batch),flush=True)


def issuer_sectors(db):
    codes={"MOEXOG":"Нефть и газ","MOEXMM":"Металлы и добыча","MOEXFN":"Финансовый сектор",
           "MOEXTN":"Транспорт","MOEXCN":"Потребительский сектор","MOEXEU":"Электроэнергетика",
           "MOEXTL":"Телекоммуникации","MOEXCH":"Химия и нефтехимия","MOEXIT":"Информационные технологии"}
    day=db.execute("SELECT max(day) FROM series WHERE code='IMOEX' AND day<?",(now()[:10],)).fetchone()[0]
    if not day:raise ValueError("Не найдена дата завершённой сессии")
    equities=pages("securities","securities",group_by="group",group_by_filter="stock_shares",
                   **{"securities.columns":"secid,emitent_inn,group"})
    owners={r["secid"]:str(r["emitent_inn"]) for r in equities if r.get("emitent_inn") and r.get("group")=="stock_shares"}
    for code,sector in codes.items():
        path=f"statistics/engines/stock/markets/index/analytics/{code}"
        rows=pages(path,"analytics",date=day)
        url="https://iss.moex.com/iss/"+path+".json?date="+day
        items={(owners[r["ticker"]],day,sector,url) for r in rows if r.get("ticker") in owners and r.get("tradedate")==day}
        with db:db.executemany("INSERT OR IGNORE INTO issuer_sector VALUES(?,?,?,?)",items)
        print(code,len(items),flush=True)


def issue_types(db):
    stamp=now()
    rows=pages("securities","securities",group_by="group",group_by_filter="stock_bonds",
               **{"securities.columns":"secid,type,group"})
    batch=[(r["secid"],stamp,r["type"]) for r in rows if r.get("group")=="stock_bonds" and r.get("type")]
    if not batch:raise ValueError("ISS не вернул типы выпусков")
    with db:db.executemany("INSERT OR IGNORE INTO issue_type VALUES(?,?,?)",batch)
    print("Типы выпусков ISS",len(batch),flush=True)


def bond_yields(db):
    path="history/engines/stock/markets/bonds/boards/TQCB/securities"
    # Revisit completed sessions so exchange corrections can be incorporated.
    for (day,) in db.execute("SELECT DISTINCT day FROM daily WHERE board='TQCB' ORDER BY day DESC LIMIT 5").fetchall():
        rows=pages(path,"history",date=day,**{"history.columns":"SECID,TRADINGSESSION,FACEUNIT,COUPON_DETAILS,DURATION,YIELDCLOSE,ZSPREAD,NUMTRADES"})
        batch=[(r["SECID"],"TQCB",day,r["YIELDCLOSE"],r["DURATION"],r["ZSPREAD"]) for r in rows
               if r["TRADINGSESSION"] in (3,None) and r["FACEUNIT"] in ("SUR","RUR","RUB")
               and r["NUMTRADES"] and (r["COUPON_DETAILS"] or "").startswith("Фиксированный")
               and r["YIELDCLOSE"] is not None and r["DURATION"] and r["DURATION"]>0]
        with db:db.executemany("INSERT OR REPLACE INTO bond_yields VALUES(?,?,?,?,?,?)",batch)
        print("Доходность и дюрация",day,len(batch),flush=True)


def save_sessions(db,batch):
    with db:
        db.executemany("INSERT OR REPLACE INTO daily VALUES(?,?,?,?,?,?,?)",
            ((r["SECID"],r["BOARDID"],r["TRADEDATE"],r["CLOSE"],r["VALUE"],r["NUMTRADES"],r.get("YIELDCLOSE")) for r in batch))
        db.executemany("INSERT OR REPLACE INTO sessions VALUES(?,?,?,?,?,?,?,?)",
            ((r["SECID"],r["BOARDID"],r["TRADEDATE"],r.get("OPEN"),r.get("HIGH"),r.get("LOW"),r.get("VOLUME"),r.get("CURRENCYID")) for r in batch))


def history(db, days=8):
    end=date.today()-timedelta(days=1)
    db.execute("CREATE TABLE IF NOT EXISTS session_downloads(day TEXT PRIMARY KEY)")
    existing={r[0] for r in db.execute("SELECT day FROM session_downloads")}
    dates=[end-timedelta(days=n) for n in range(days)]
    def get(day):
        path="history/engines/stock/markets/bonds/securities"
        args={"date":day.isoformat(),"history.columns":"SECID,BOARDID,TRADEDATE,OPEN,HIGH,LOW,CLOSE,VALUE,VOLUME,CURRENCYID,NUMTRADES,YIELDCLOSE,TRADINGSESSION"}
        result=[]
        for r in pages(path,"history",**args):
            if r.get("TRADINGSESSION") in (None,3) and r["BOARDID"] in ("TQCB","TQOB","TQOD","TQIR","TQOY") and r["NUMTRADES"] and r["CLOSE"] is not None:
                result.append(r)
        return result
    with ThreadPoolExecutor(4) as pool:
        work={day:pool.submit(get,day) for day in dates if day.isoformat() not in existing}
        for day,future in work.items():
            try: batch=future.result()
            except (OSError, ValueError) as exc:
                print("MOEX history",day,type(exc).__name__,flush=True); continue
            save_sessions(db,batch)
            with db:db.execute("INSERT OR IGNORE INTO session_downloads VALUES(?)",(day.isoformat(),))
            print("MOEX history",day,len(batch),flush=True)


if __name__=="__main__":
    commands={"fundamentals":fundamentals,"quarters":quarters,"indices":indices,"curve":curve,"yields":corporate_yields,"disclosures":gateway,"rate":key_rate,"terms":bond_terms,"news":telegram,"history":history}
    commands.update(types=issue_types,spreads=bond_yields,sectors=issuer_sectors)
    parser=argparse.ArgumentParser()
    parser.add_argument("sections",nargs="*",choices=list(commands))
    args=parser.parse_args()
    with sqlite3.connect(DATABASE,timeout=60) as conn:
        conn.executescript(SCHEMA+FILING_SCHEMA)
        failed=[]
        for section in args.sections or commands:
            try:commands[section](conn)
            except (OSError,ValueError,KeyError) as exc:
                print(section,str(exc),flush=True);failed.append(section)
        if failed:raise SystemExit(1)
