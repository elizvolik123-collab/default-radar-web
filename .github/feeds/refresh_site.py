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
            if cols:
                db.execute(f"INSERT OR IGNORE INTO main.{name}({cols}) SELECT {cols} FROM prior.{name}")
        db.commit()


def run():
    site=Path.cwd()
    tools=Path(__file__).resolve().parent
    stage=site/"_site"
    stage.mkdir(exist_ok=True)
    for name in ("index.html","app.js","market.js","pages.js","worker.js","style.css","favicon.svg","radar.svg"):
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
        for name in ("collect_market.py","disclosure_feed.py","statement_reader.py","sync.py","export_feed.py"):
            shutil.copy2(tools/name,work/name)
        shutil.copy2(tools/"moex-root.pem",work/"data/moex-root.pem")
        if "--refresh" in sys.argv:
            # Only import previous data. Run code exclusively from the tracked release.
            with tempfile.TemporaryFile() as temp:
                with urllib.request.urlopen(PUBLIC+"market.zip",timeout=60) as resp:shutil.copyfileobj(resp,temp)
                temp.seek(0)
                with zipfile.ZipFile(temp) as source:
                    previous=work/"prior.sqlite3"
                    previous.write_bytes(source.read("data/market.sqlite3"))
                    prior_catalog=work/"prior_catalog.sqlite3"
                    prior_catalog.write_bytes(source.read("data/radar.sqlite3"))
                merge_previous(work/"data/market.sqlite3",previous,("terms","series","reports","headlines","daily","curve","corporate_yields","filings","filing_numbers"))
                merge_previous(work/"data/radar.sqlite3",prior_catalog,("moex_defaults","registry_checks"))
            defaults=subprocess.run([sys.executable,"-u","sync.py","defaults"],cwd=work)
            if defaults.returncode:print("::warning::Реестр дефолтов не обновлён.")
            sections=["curve","yields","rate","terms","news","indices","history"]
            if datetime.now(timezone.utc).weekday()==0:sections+=["fundamentals","quarters"]
            outcome=subprocess.run([sys.executable,"-u","collect_market.py",*sections],cwd=work)
            if outcome.returncode:
                print("::warning::Часть источников недоступна. Для них сохранены последние датированные значения.")
        with zipfile.ZipFile(stage/"market.zip","w",zipfile.ZIP_DEFLATED) as dest:
            for name in members:dest.write(work/name,name)
        subprocess.run([sys.executable,"-c","from export_feed import export; import sys; export(sys.argv[1])",str(stage)],cwd=work,check=True)


if __name__=="__main__":run()
