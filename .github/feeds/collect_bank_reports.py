"""Import published bank ratios by OGRN → INN from CBR form 0409135."""
import argparse
import json
import re
import shutil
import sqlite3
import struct
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor
from datetime import date
from pathlib import Path
from urllib.request import Request, urlopen

from collect_market import DATABASE, SCHEMA, store_reports
from storage import connect, now

STANDARD = "Банк России · форма 135"
METRICS = {"Н1.0": "total_capital_adequacy_ratio", "Н1.2": "core_capital_adequacy_ratio",
           "Н1.1": "base_capital_adequacy_ratio", "Н2": "instant_liquidity_ratio",
           "Н3": "bank_current_liquidity_ratio"}
REGISTRY = "https://www.cbr.ru/finorg/foinfo/?ogrn="


def fetch(url):
    with urlopen(Request(url,headers={"User-Agent":"DefaultRadar/1.0"}),timeout=15) as response:
        return response.read()


def dbf_rows(raw):
    count, start, size = struct.unpack_from("<IHH", raw, 4)
    fields = [(raw[p:p+11].rstrip(b"\0").decode("ascii"), raw[p+16]) for p in range(32,start-1,32)]
    if len(raw)<start+count*size or 1+sum(n for _,n in fields)!=size:
        raise ValueError("Unexpected DBF structure")
    for i in range(count):
        pos=start+i*size
        if raw[pos:pos+1]!=b" ":continue
        row={}
        for name,n in fields:
            row[name]=raw[pos+1:pos+n+1].decode("cp866").strip("\0 ")
            pos+=n
        yield row


def resolve(ogrn):
    page=fetch(REGISTRY+ogrn).decode("utf8")
    def value(label,digits):
        match=re.search(r">"+label+r"</div>\s*<div[^>]*>\s*(\d{"+str(digits)+r"})\s*</div>",page)
        return match[1] if match else None
    return value("ИНН",10) if value("ОГРН",13)==ogrn else None


def collect(days):
    with connect() as catalog:
        active={r[0] for r in catalog.execute("SELECT DISTINCT issuer FROM bonds WHERE traded=1")}
    with sqlite3.connect(DATABASE,timeout=60) as db, tempfile.TemporaryDirectory() as tmp:
        db.executescript(SCHEMA)
        db.execute("CREATE TABLE IF NOT EXISTS cbr_identity(ogrn TEXT PRIMARY KEY,inn TEXT NOT NULL,url TEXT NOT NULL)")
        known=dict(db.execute("SELECT ogrn,inn FROM cbr_identity"))
        for day in days:
            stamp=date.fromisoformat(day)
            if stamp.day!=1 or day>now()[:10]:raise ValueError(day)
            url="https://www.cbr.ru/vfs/credit/forms/135-"+day.replace("-","")+".rar"
            archive=Path(tmp)/"forms.rar"
            archive.write_bytes(fetch(url))
            tar=shutil.which("bsdtar") or "tar"
            def read(*args):return subprocess.check_output([tar,*args])
            names=read("-tf",str(archive)).decode().splitlines()
            def table(suffix):
                name,=[n for n in names if n.upper().endswith(suffix)]
                return dbf_rows(read("-xOf",str(archive),name))
            banks={r["REGN"]:r["OGRN"] for r in table("135B.DBF") if r["DT"]==day.replace("-","") and re.fullmatch(r"\d{13}",r["OGRN"])}
            values={}
            for r in table("135_3.DBF"):
                code=METRICS.get(r["C1_3"])
                if code and r["C2_3"] and r["REGN"] in banks:
                    values.setdefault(banks[r["REGN"]],{})[code]=[float(r["C2_3"]),"%"]
            def lookup(key):
                try:return key,resolve(key)
                except OSError:return key,None
            with ThreadPoolExecutor(4) as pool:
                for key,inn in pool.map(lookup,sorted(values.keys()-known.keys())):
                    if inn:
                        known[key]=inn
                        db.execute("INSERT OR IGNORE INTO cbr_identity VALUES(?,?,?)",(key,inn,REGISTRY+key))
            rows=[]
            for key,metrics in values.items():
                inn=known.get(key)
                if inn not in active:continue
                # No backdating: only claim availability from the day this version was first seen.
                old=db.execute("SELECT published FROM reports WHERE issuer=? AND period=? AND standard=?",(inn,day,STANDARD)).fetchone()
                published=old[0] if old else now()[:10]
                rows.append((inn,day,STANDARD,published,"",url,url,json.dumps(metrics,ensure_ascii=False)))
            store_reports(db,rows)
            db.commit()
            print(day,"эмитентов",len(rows),"без привязки ИНН",len(values.keys()-known.keys()),flush=True)


if __name__=="__main__":
    parser=argparse.ArgumentParser()
    parser.add_argument("days",nargs="*",help="Отчётные даты ГГГГ-ММ-01")
    days=parser.parse_args().days
    if not days:
        page=fetch("https://www.cbr.ru/banking_sector/otchetnost-kreditnykh-organizaciy/").decode("utf8")
        stamp=max(re.findall(r'/vfs/credit/forms/135-(\d{8})\.rar',page))
        days=[stamp[:4]+"-"+stamp[4:6]+"-"+stamp[6:]]
    collect(days)
