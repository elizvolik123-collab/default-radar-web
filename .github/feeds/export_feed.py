"""Write public, read-only JSON endpoints from a consistent market snapshot."""
import json
import os
from contextlib import closing
from pathlib import Path

from credit_data import issuer_reports, issuer_filings, market, open_data
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
        available.update(r[0] for r in facts.execute("SELECT DISTINCT issuer FROM filings WHERE removed=0"))
        directory=[]
        active={r[0] for r in catalog.execute("SELECT DISTINCT issuer FROM bonds WHERE traded=1")}
        for inn,name in catalog.execute("SELECT id,name FROM issuers ORDER BY id"):
            relative="fundamentals/"+inn+".json" if inn in available and inn.isdigit() else None
            reports=issuer_reports(inn,at) if relative else []
            if relative:
                write(root/relative,{"issuer":inn,"name":name,"asof":at[:10],"reports":reports,"filings":issuer_filings(inn,at)})
            directory.append({"issuer":inn,"name":name,"report":relative,"active":inn in active,
                              "latest_statement":reports[0]["published"] if reports else None})
        write(root/"issuers.json",{"date":at[:10],"issuers":directory})
        active_rows=[r for r in directory if r["active"]]
        write(root/"collection.json",{"date":at[:10],"active_issuers":len(active_rows),
              "with_numeric_statements":sum(bool(r["latest_statement"]) for r in active_rows),
              "interfax_key_configured":bool(os.getenv("INTERFAX_API_KEY")),
              "interfax_cursor_present":bool(facts.execute("SELECT 1 FROM disclosure_cursor LIMIT 1").fetchone())})
