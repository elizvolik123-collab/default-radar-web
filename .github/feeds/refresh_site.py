"""Build the Pages data artifact in CI using the files tracked in the public site."""
import shutil
import sqlite3
import subprocess
import sys
import tempfile
import urllib.request
import zipfile
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path

PUBLIC="https://elizvolik123-collab.github.io/default-radar-web/"


def merge_previous(path, previous,names):
    with closing(sqlite3.connect(path)) as db:
        db.execute("ATTACH DATABASE ? AS prior",(str(previous),))
        for name in names:
            dest=[r[1] for r in db.execute(f"PRAGMA main.table_info({name})")]
            src={r[1] for r in db.execute(f"PRAGMA prior.table_info({name})")}
            cols=",".join(k for k in dest if k in src)
            if cols and name=="disclosure_cursor":
                db.execute(f"INSERT OR REPLACE INTO main.{name}({cols}) SELECT {cols} FROM prior.{name}")
            elif cols:
                db.execute(f"INSERT OR IGNORE INTO main.{name}({cols}) SELECT {cols} FROM prior.{name}")
                if name=="bonds":
                    db.execute("UPDATE bonds AS b SET (traded,seen,nominal,maturity,primary_board,currency)=(SELECT traded,seen,nominal,maturity,primary_board,currency FROM prior.bonds p WHERE p.id=b.id) WHERE EXISTS(SELECT 1 FROM prior.bonds p WHERE p.id=b.id AND p.seen>b.seen)")
        db.commit()


def run():
    site=Path.cwd()
    tools=Path(__file__).resolve().parent
    stage=site/"_site"
    stage.mkdir(exist_ok=True)
    for name in ("index.html","tactile.js","tactile.css","tactile-LICENSE.txt","trading-chart.js","trading-chart.css","lightweight-charts.js","charts-LICENSE.txt","charts-NOTICE","app.js","market.js","terminal.js","terminal.css","pages.js","worker.js","style.css","favicon.svg","agent-radar.svg","radar.svg"):
        shutil.copy2(site/name,stage/name)
    for name in ("python","research","documents"):
        shutil.copytree(site/name,stage/name,dirs_exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        work=Path(tmp)
        with zipfile.ZipFile(site/"market.zip") as source:
            members=source.namelist()
            for name in members:
                if Path(name).is_absolute() or ".." in Path(name).parts:raise ValueError("Unexpected archive path")
                source.extract(name,work)
        for name in ("collect_market.py","collect_payments.py","market_disclosures.py","disclosure_feed.py","statement_reader.py","sync.py","export_feed.py"):
            shutil.copy2(tools/name,work/name)
        shutil.copy2(tools/"moex-root.pem",work/"data/moex-root.pem")
        # Code-only releases must preserve observations acquired between deployments.
        tables={
            "market":("terms","series","index_candles","reports","report_editions","headlines","daily","sessions","session_downloads","curve","corporate_yields","filings","filing_numbers","issue_type","bond_yields","issuer_sector","disclosure_cursor"),
            "radar":("issuers","bonds","boards","plans","moex_defaults","registry_checks"),
            "payment_history":("evidence","announced","payment_journal","journal_days","prices","instruments"),
        }
        with tempfile.TemporaryFile() as temp:
            with urllib.request.urlopen(PUBLIC+"market.zip",timeout=90) as resp:shutil.copyfileobj(resp,temp)
            temp.seek(0)
            with zipfile.ZipFile(temp) as source:
                for db_name,names in tables.items():
                    previous=work/"prior.sqlite3"
                    entry=f"data/{db_name}.sqlite3"
                    previous.write_bytes(source.read(entry))
                    merge_previous(work/entry,previous,names)
        if "--refresh" in sys.argv:
            catalog=subprocess.run([sys.executable,"-u","sync.py","catalog"],cwd=work)
            if catalog.returncode:
                print("::warning::Справочник не обновлён. Проверка раскрытий продолжится по последнему составу эмитентов.")
                subprocess.run([sys.executable,"-u","sync.py","next-coupons"],cwd=work)
            defaults=subprocess.run([sys.executable,"-u","sync.py","defaults"],cwd=work)
            if defaults.returncode:print("::warning::Реестр дефолтов не обновлён.")
            for args in (["market_disclosures.py","--recent"],["market_disclosures.py","--recent","--plans"]):
                job=subprocess.run([sys.executable,"-u",*args],cwd=work)
                if job.returncode==2:print("::warning::АК&М: часть публикаций недоступна. Полнота новых подтверждений не установлена.")
                elif job.returncode:job.check_returncode()
            subprocess.run([sys.executable,"collect_payments.py","plans"],cwd=work,check=True)
            sections=["fundamentals","quarters","disclosures","curve","yields","rate","terms","news","indices","history","spreads"]
            if datetime.now(timezone.utc).weekday()==0:sections+=["types","sectors"]
            outcome=subprocess.run([sys.executable,"-u","collect_market.py",*sections],cwd=work)
            if outcome.returncode:
                print("::warning::Часть источников недоступна. Для них сохранены последние датированные значения.")
            subprocess.run([sys.executable,"payment_journal.py"],cwd=work,check=True)
        # The ingestion error queue is operational metadata, not public market data.
        with closing(sqlite3.connect(work/"data/payment_history.sqlite3")) as history:
            history.execute("DROP TABLE IF EXISTS downloads");history.commit()
        with zipfile.ZipFile(stage/"market.zip","w",zipfile.ZIP_DEFLATED) as dest:
            for name in members:dest.write(work/name,name)
        subprocess.run([sys.executable,"-c","from export_feed import export; import sys; export(sys.argv[1])",str(stage)],cwd=work,check=True)


if __name__=="__main__":run()
