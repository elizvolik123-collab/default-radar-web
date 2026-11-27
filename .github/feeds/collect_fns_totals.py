"""Import a published FNS revexp release for the issuer catalogue, matched by INN."""
import argparse
from datetime import datetime
from decimal import Decimal
from pathlib import Path
import re
import sqlite3
import tempfile
from urllib.request import urlopen
from shutil import copyfileobj
from xml.etree import ElementTree as ET
from zipfile import ZipFile

from collect_market import DATABASE
from storage import connect, now

BASE="https://file.nalog.ru/opendata/7707329152-revexp/"
PASSPORT="https://www.nalog.gov.ru/opendata/7707329152-revexp/"
SCHEMA="""
CREATE TABLE IF NOT EXISTS fns_releases(published TEXT PRIMARY KEY,url TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS fns_totals(issuer TEXT,published TEXT,period TEXT,income TEXT,expense TEXT,
    document TEXT,member TEXT,PRIMARY KEY(issuer,published,period));
"""

def collect(zip_path,url):
    match=re.fullmatch(re.escape(BASE)+r"data-(\d{8})-structure-20180110\.zip",url)
    if not match:raise ValueError("Unknown FNS release URL")
    released=datetime.strptime(match[1],"%Y%m%d").date().isoformat()
    if released>now()[:10]:raise ValueError("Future release")
    with connect() as db:
        issuers={r[0] for r in db.execute("SELECT DISTINCT issuer FROM bonds")}
    totals={}
    conflicts=set()
    with ZipFile(zip_path) as archive:
        for entry in archive.infolist():
            if not entry.filename.lower().endswith(".xml"):continue
            with archive.open(entry) as file:
                root=ET.parse(file).getroot()
            if root.get("ТипИнф")!="ОТКРДАННЫЕ5":raise ValueError("Unexpected FNS release schema")
            for doc in root.findall("Документ"):
                inn=doc.find("СведНП").get("ИННЮЛ")
                if inn not in issuers:continue
                end=datetime.strptime(doc.attrib["ДатаСост"],"%d.%m.%Y").date()
                if end.isoformat()>=released:raise ValueError("Invalid reporting period")
                record=doc.find("СведДохРасх")
                amounts=[Decimal(record.attrib[k]) for k in ("СумДоход","СумРасход")]
                if not all(v.is_finite() for v in amounts):raise ValueError("Invalid amounts")
                key=(inn,str(end.year))
                row=(inn,released,str(end.year),*map(str,amounts),doc.attrib["ИдДок"],entry.filename)
                if key in totals and totals[key][3:5]!=row[3:5]:conflicts.add(key)
                totals[key]=row
    if not totals:raise ValueError("No verified catalogue matches")
    with sqlite3.connect(DATABASE,timeout=90) as db:
        db.executescript(SCHEMA)
        db.execute("INSERT OR REPLACE INTO fns_releases VALUES(?,?)",(released,url))
        db.execute("DELETE FROM fns_totals WHERE published=?",(released,))
        db.executemany("INSERT INTO fns_totals VALUES(?,?,?,?,?,?,?)",(r for k,r in totals.items() if k not in conflicts))
    print(released,"совпадений",len(totals)-len(conflicts),"конфликтов",len(conflicts),flush=True)


if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--archive",type=Path)
    p.add_argument("--release")
    args=p.parse_args()
    if args.archive and not args.release:p.error("--archive requires --release")
    if args.release:
        url=BASE+"data-"+datetime.strptime(args.release,"%Y-%m-%d").strftime("%Y%m%d")+"-structure-20180110.zip"
    else:
        with urlopen(PASSPORT,timeout=30) as response:
            urls=re.findall(re.escape(BASE)+r"data-\d{8}-structure-20180110\.zip",response.read().decode("utf8"))
        url=max(urls)
        with sqlite3.connect(DATABASE) as db:
            db.executescript(SCHEMA)
            if db.execute("SELECT 1 FROM fns_releases WHERE url=?",(url,)).fetchone():raise SystemExit(0)
    if args.archive:collect(args.archive,url)
    else:
        with tempfile.TemporaryDirectory() as tmp:
            path=Path(tmp)/"release.zip"
            with urlopen(url,timeout=90) as response,path.open("wb") as out:copyfileobj(response,out)
            collect(path,url)
