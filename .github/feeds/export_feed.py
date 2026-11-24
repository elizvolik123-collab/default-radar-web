"""Write public, read-only JSON endpoints from a consistent market snapshot."""
import json
from contextlib import closing
from pathlib import Path

from credit_data import issuer_reports, market, open_data
from storage import connect, now


def write(path, data):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(data,ensure_ascii=False,separators=(",",":"),allow_nan=False),"utf-8")


def export(out):
    root=Path(out)/"api"
    at=now()[:10]+"T23:59:59"
    write(root/"macro.json",{"asof":at[:10],**market(at)})
    with closing(open_data()) as facts, closing(connect()) as catalog:
        available={r[0] for r in facts.execute("SELECT DISTINCT issuer FROM reports")}
        directory=[]
        for inn,name in catalog.execute("SELECT id,name FROM issuers ORDER BY id"):
            relative="fundamentals/"+inn+".json" if inn in available and inn.isdigit() else None
            if relative:
                write(root/relative,{"issuer":inn,"name":name,"asof":at[:10],"reports":issuer_reports(inn,at)})
            directory.append({"issuer":inn,"name":name,"report":relative})
        write(root/"issuers.json",{"date":at[:10],"issuers":directory})
