"""Collect evidence of Russian bond payments and pre-event exchange prices."""
import argparse
import hashlib
import html
import http.client
import json
import os
import re
import sqlite3
import tempfile
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import quote, urlencode

from storage import ROOT, connect, now
from sync import BASE, MOEX_TLS

HISTORY=ROOT/"data"/"payment_history.sqlite3"
CACHE=Path(tempfile.gettempdir())/"DefaultRadarResearch"/now()[:10]
MONTHS="января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split()
RUDATE=r"\d{1,2}\s+(?:"+"|".join(MONTHS)+r")\s+20\d{2}"
ISIN=r"\bRU[A-Z0-9]{9}\d\b"

def profile():
    db=sqlite3.connect(HISTORY,timeout=45)
    db.row_factory=sqlite3.Row
    db.executescript("""
      CREATE TABLE IF NOT EXISTS evidence(bond TEXT,due TEXT,kind TEXT,late INTEGER,actual TEXT,
        published TEXT,url TEXT,terms_url TEXT,source TEXT,PRIMARY KEY(bond,due,kind,url));
      CREATE INDEX IF NOT EXISTS evidence_key ON evidence(bond,due,kind);
      CREATE TABLE IF NOT EXISTS prices(bond TEXT,day TEXT,close REAL,PRIMARY KEY(bond,day));
      CREATE TABLE IF NOT EXISTS instruments(bond TEXT PRIMARY KEY,faceunit TEXT,url TEXT);
      CREATE TABLE IF NOT EXISTS announced(bond TEXT,due TEXT,known TEXT,url TEXT,PRIMARY KEY(bond,due,url));
      CREATE TABLE IF NOT EXISTS downloads(url TEXT PRIMARY KEY,error TEXT);
    """)
    return db

def fetch(url):
    CACHE.mkdir(parents=True,exist_ok=True)
    path=CACHE/hashlib.sha256(url.encode()).hexdigest()
    if path.exists():
        return path.read_bytes()
    for attempt in range(2):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":"DefaultRadar-Educational/1.0"})
            with urllib.request.urlopen(req,context=MOEX_TLS,timeout=14) as f:
                body=f.read()
            with tempfile.NamedTemporaryFile(dir=CACHE,delete=False) as tmp:
                tmp.write(body)
            os.replace(tmp.name,path)
            return body
        except (OSError,http.client.HTTPException) as exc:
            if attempt: raise OSError(str(exc)) from exc

def clean(s):
    return " ".join(html.unescape(re.sub(r"<[^>]*>"," ",s)).split())

def dayof(s):
    if "." in s:
        d,m,y=s.split(".")
    else:
        d,m,y=s.lower().split();m=MONTHS.index(m)+1
    return date(int(y),int(m),int(d)).isoformat()

def issdata(path,**params):
    return json.loads(fetch(BASE+path+".json?"+urlencode({"iss.meta":"off",**params})))

def table(payload,key):
    return [dict(zip(payload[key]["columns"],r)) for r in payload[key]["data"]]

def rows_for_bond(secid,kind):
    path="statistics/engines/stock/markets/bonds/bondization/"+quote(secid)
    key,field=("coupons","coupondate") if kind=="Купон" else ("amortizations","amortdate")
    days=set()
    for start in range(0,5000,100):
        data=issdata(path,**{"iss.only":key+","+key+".cursor",key+".columns":field+",data_source","start":start,"limit":100})
        rows=table(data,key)
        days.update(r[field] for r in rows if kind=="Купон" or r.get("data_source")!="maturity")
        if not rows or start+len(rows)>=data[key+".cursor"]["data"][0][1]:break
    return days,BASE+path+".json"

def market_prices(secid,board,start,end):
    path=f"engines/stock/markets/bonds/boards/{quote(board)}/securities/{quote(secid)}/candles"
    rows=[]
    while True:
        page=table(issdata(path,**{"from":start,"till":end,"interval":24,"start":len(rows),
            "candles.columns":"begin,close,volume"}),"candles")
        if not page:break
        if rows and page[0]["begin"]<=rows[-1]["begin"]:raise ValueError("Повтор страницы ISS")
        rows.extend(page)
        if len(page)<500:break
    return [(r["begin"][:10],r["close"]) for r in rows if r["volume"] and r["close"] and r["close"]>0]

def series(s):
    s=s.upper().replace("Р","P").replace("–","-")
    m=re.search(r"\b(\d{3}P-\d{2})\b",s)
    return m[1] if m else None

def collect(main,db):
    asof=now()[:10]
    bonds={r["id"]:dict(r) for r in main.execute("SELECT * FROM bonds")}
    tasks=[]; failures=[]; successes=set()
    def batch(keys,fn):
        def one(key):
            try:
                result=fn(key)
                successes.add(str(key))
                return result
            except (OSError,ValueError,KeyError,IndexError) as exc:
                failures.append((str(key),str(exc)[:200]))
                return None
        with ThreadPoolExecutor(max_workers=5) as pool:
            return [v for v in pool.map(one,keys) if v is not None]
    def add(bond,due,kind,late,actual,published,url,terms,source):
        if bond in bonds and due<=asof and published<=asof and published>=due:
            tasks.append((bond,due,kind,late,actual,published,url,terms,source))
    # A final retrospective register is valid for outcomes. Its first observation
    # bounds use for training. A dated earlier notice can identify the same event.
    for r in main.execute("SELECT * FROM moex_defaults ORDER BY observed"):
        b=bonds.get(r["bond"])
        if b and b["issuer"]==r["inn"]:
            kind="Амортизация" if r["kind"].startswith("Амортизация") else r["kind"]
            add(r["bond"],r["due"],kind,1,r["executed"],r["observed"][:10],r["url"],r["url"],"MOEX")
    for r in main.execute("""SELECT p.bond,p.date,p.kind,x.overdue,x.remaining,x.day,d.published,d.url,p.source
        FROM executions x JOIN plans p ON p.id=x.plan JOIN documents d ON d.id=x.document
        WHERE x.overdue IS NOT NULL"""):
        add(r["bond"],r["date"],r["kind"],int(r["overdue"]>0),r["day"] if r["remaining"]==0 else None,
            r["published"][:10],r["url"],r["source"],"Архив раскрытий")

    # Dated PVO notices. Match the explicit contractual due date and issue. Cross-check
    # kind and issue against the exchange register; never infer a second obligation.
    index=defaultdict(list)
    for b,d,k,y,a,p,u,t,s in tasks:
        if s=="MOEX":index[b,d].append((k,t,a))
    def listing(page):
        raw=fetch(f"https://region-finance.ru/news/?PAGEN_1={page}").decode()
        return [("https://region-finance.ru"+url,dayof(m[0])) for url,body in
                re.findall(r'<a[^>]+href="(/news/\d+/)"[^>]*>(.*?)</a>',raw,re.S)
                if "неисполнени" in clean(body).lower() and (m:=re.search(RUDATE,clean(body),re.I))]
    found={}
    for group in batch(range(1,81),listing):found.update(group)
    def notice(item):
        url,published=item
        text=clean(fetch(url).decode())
        text=text.split("Другие новости")[0]
        code=set(re.findall(ISIN,text))
        due=re.search(r"дат[ауы],?\s+в которую обязательств[оа].{0,130}?должн.{0,35}?исполнен[оы]\s*[:–-]?\s*(\d\d\.\d\d\.20\d\d)",text,re.I)
        if len(code)!=1 or not due:return []
        bond=code.pop(); day=dayof(due[1])
        body=re.search(r"4\.\s*Содержание сообщения(.*?)5\.\s*Подпись",text,re.I)
        if not body or bond not in bonds:return []
        body=body[1]
        if not re.search(r"неисполнени|дефолт",body,re.I):return []
        kinds=({"Купон"} if re.search(r"купонн.{0,8}(?:доход|период)",body,re.I) else set())
        if re.search(r"частичн.{0,16}(?:досрочн.{0,5})?погашени|амортизаци",body,re.I):kinds.add("Амортизация")
        inn=bonds[bond]["issuer"]
        corroboration={k:t for k,t,_ in index[bond,day]}
        return [(bond,day,k,1,None,published,url,corroboration.get(k,url),"ПВО РЕГИОН Финанс")
                for k in kinds if k in corroboration or (inn.isdigit() and inn in text)]
    for group in batch(found.items(),notice):
        for row in group:add(*row)
    print("Датированные уведомления ПВО:",sum(t[8].startswith("ПВО") for t in tasks),flush=True)

    direct={series(b["name"]):k for k,b in bonds.items() if b["issuer"]=="7709673048" and series(b["name"])}
    claims=[];announced=[]
    for page in range(1,40):
        url="https://d-leasing.ru/wp-json/wp/v2/posts?"+urlencode({"search":"купон","per_page":100,"page":page,"_fields":"date,link,title,content"})
        posts=json.loads(fetch(url))
        for p in posts:
            title=clean(p["title"]["rendered"]);body=clean(p["content"]["rendered"]).lower()
            key=direct.get(series(title));pub=p["date"][:10]
            if key and "купон" in title.lower() and "сегодня" in body and re.search(r"своевременно и в полном объ[её]ме|в срок и в полном объ[её]ме",body):
                claims.append((key,pub,pub,p["link"],"Директ Лизинг","Купон"))
                nxt=re.search(r"выплата следующего купона (?:будет произведена|состоится)\s+("+RUDATE+")",body,re.I)
                if nxt and dayof(nxt[1])>pub:announced.append((key,dayof(nxt[1]),pub,p["link"]))
                if re.search(r"произвели выплату купонного дохода и части номинальной стоимости",body):
                    claims.append((key,pub,pub,p["link"],"Директ Лизинг","Амортизация"))
        if len(posts)<100:break
    sitemap=ET.fromstring(fetch("https://msb-leasing.ru/sitemap.xml"))
    links=[n.text for n in sitemap.findall(".//{*}loc")]
    def msb(url):
        raw=fetch(url).decode()
        pub=re.search(r'"datePublished"\s*:\s*"(20\d\d-\d\d-\d\d)',raw)
        article=raw[raw.find("<h1"):]
        article=re.split(r"Читайте ещ[её]|Следите за новостями",clean(article),maxsplit=1,flags=re.I)[0]
        codes=set(re.findall(ISIN,article))
        actual=re.search("("+RUDATE+r")\s*(?:года|г\.)?\s*[,]?\s*(?:состоял[аи]сь|был[аи] произведен|компания выплатил|произведена выплат)",article,re.I)
        if pub and actual and len(codes)==1 and re.search(r"(?:в срок|своевременно) и в полном объ[её]ме",article,re.I):
            key=codes.pop();nxt=re.search(r"выплата следующего купона (?:будет произведена|состоится)\s+("+RUDATE+")",article,re.I)
            if nxt and dayof(nxt[1])>pub[1]:announced.append((key,dayof(nxt[1]),pub[1],url))
            return key,dayof(actual[1]),pub[1],url,"МСБ-Лизинг","Купон"
    claims+=batch([u for u in links if "/news/" in u and re.search("vyplat|kupon|emissi",u)],msb)
    schedules=dict(batch(sorted({(v[0],v[-1]) for v in claims if v[0] in bonds}),
        lambda k:(k,rows_for_bond(bonds[k[0]]["secid"],k[1]))))
    for k,actual,pub,url,s,kind in claims:
        days,terms=schedules.get((k,kind),(set(),""))
        if actual in days:add(k,actual,kind,0,actual,pub,url,terms,s)
    with db:
        db.executemany("INSERT OR IGNORE INTO evidence VALUES(?,?,?,?,?,?,?,?,?)",tasks)
        db.executemany("INSERT OR IGNORE INTO announced VALUES(?,?,?,?)",announced)
        db.executemany("DELETE FROM downloads WHERE url=?",[(key,) for key in successes])
        db.executemany("INSERT OR REPLACE INTO downloads VALUES(?,?)",failures)
    print("Подтверждения по источникам",list(map(tuple,db.execute("SELECT source,count(*) FROM evidence GROUP BY source"))),"ошибок загрузки",len(failures),flush=True)

def quotes(main,db):
    universe=db.execute("SELECT bond,min(due) first,max(due) last FROM evidence GROUP BY bond").fetchall()
    jobs=[]
    for row in universe:
        sec=main.execute("SELECT secid FROM bonds WHERE id=?",(row["bond"],)).fetchone()[0]
        # The first model is fitted on corporate rouble bonds on the common board.
        if main.execute("SELECT 1 FROM boards WHERE bond=? AND board='TQCB'",(row["bond"],)).fetchone():
            start=(date.fromisoformat(row["first"])-timedelta(days=65)).isoformat()
            jobs.append((row["bond"],sec,start,row["last"]))
    def request(job):
        k,sec,start,end=job
        try:return k,market_prices(sec,"TQCB",start,end),None
        except (OSError,ValueError,KeyError,IndexError) as e:return k,[],str(e)[:200]
    with ThreadPoolExecutor(max_workers=5) as pool:
        for k,history,error in pool.map(request,jobs):
            with db:
                if error:
                    db.execute("INSERT OR REPLACE INTO downloads VALUES(?,?)",("ISS "+k,error))
                else:
                    db.executemany("INSERT OR REPLACE INTO prices VALUES(?,?,?)",((k,d,v) for d,v in history))
                    db.execute("DELETE FROM downloads WHERE url=?",("ISS "+k,))
    print("Дневные цены:",db.execute("SELECT count(*) FROM prices").fetchone()[0],flush=True)

def currencies(main,db):
    missing=[(r[0],main.execute("SELECT secid FROM bonds WHERE id=?",(r[0],)).fetchone()[0])
             for r in db.execute("SELECT DISTINCT bond FROM evidence EXCEPT SELECT bond FROM instruments")]
    def lookup(k):
        bond,sec=k;path="securities/"+quote(sec)
        try:
            values={r["name"]:r["value"] for r in table(issdata(path,**{"iss.only":"description"}),"description")}
            if values.get("ISIN")==bond and values.get("FACEUNIT"):
                return bond,values["FACEUNIT"],BASE+path+".json"
        except (OSError,ValueError,KeyError) as e:return bond,None,str(e)
    with ThreadPoolExecutor(max_workers=5) as pool:
        for row in pool.map(lookup,missing):
            if row:
                with db:
                    if row[1]:
                        db.execute("INSERT OR REPLACE INTO instruments VALUES(?,?,?)",row)
                        db.execute("DELETE FROM downloads WHERE url=?",("ISIN "+row[0],))
                    else:db.execute("INSERT OR REPLACE INTO downloads VALUES(?,?)",("ISIN "+row[0],row[2]))
    print("Справочники валюты номинала:",db.execute("SELECT count(*) FROM instruments").fetchone()[0],flush=True)

def upcoming(main,db):
    today=date.fromisoformat(now()[:10])
    end=(today+timedelta(days=14)).isoformat()
    bonds={r[0] for r in main.execute("SELECT DISTINCT bond FROM plans WHERE date>? AND date<=?",(str(today),end))}
    jobs=[]
    for key in bonds:
        r=main.execute("""SELECT secid FROM bonds WHERE id=? AND currency IN ('RUB','SUR','RUR')
             AND EXISTS(SELECT 1 FROM boards WHERE bond=? AND board='TQCB')""",(key,key)).fetchone()
        if r:jobs.append((key,r[0]))
    def get(job):
        k,sec=job
        try:return k,market_prices(sec,"TQCB",str(today-timedelta(days=55)),str(today-timedelta(days=1))),None
        except (OSError,ValueError,KeyError) as e:return k,[],str(e)
    with ThreadPoolExecutor(max_workers=5) as pool:
        for k,prices,error in pool.map(get,jobs):
            with db:
                if error:db.execute("INSERT OR REPLACE INTO downloads VALUES(?,?)",("Текущие торги "+k,error))
                else:
                    db.executemany("INSERT OR REPLACE INTO prices VALUES(?,?,?)",((k,d,v) for d,v in prices))
                    db.execute("DELETE FROM downloads WHERE url=?",("Текущие торги "+k,))
    print("Проверены предстоящие платежи, выпусков:",len(jobs),flush=True)

def import_plans(main,db):
    for k,d,known,url in db.execute("SELECT * FROM announced"):
        key="announced:"+hashlib.sha256((k+d+url).encode()).hexdigest()
        unit=main.execute("SELECT currency FROM bonds WHERE id=?",(k,)).fetchone()
        if unit:
            main.execute("INSERT OR IGNORE INTO plans VALUES(?,?,?,?,?,?,?,?,?,?,?)",
                (key,k,d,"Купон",None,None,unit[0] or "—",known,url,"Объявленный купон",now()))
    main.commit()

if __name__=="__main__":
    p=argparse.ArgumentParser();p.add_argument("mode",choices=["all","evidence","prices","currencies","upcoming","plans"],default="all",nargs="?")
    mode=p.parse_args().mode
    with connect() as main, profile() as db:
        if mode in ("all","evidence"):collect(main,db)
        if mode in ("all","currencies"):currencies(main,db)
        if mode in ("all","prices"):quotes(main,db)
        if mode in ("all","plans"):import_plans(main,db)
        if mode=="upcoming":upcoming(main,db)
