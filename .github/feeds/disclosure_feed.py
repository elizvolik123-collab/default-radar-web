"""Import versioned public filing metadata from the Interfax disclosure gateway."""
import json
import os
import re
from datetime import date, datetime, timedelta
from urllib.parse import urlencode, urlsplit, quote
from urllib.error import HTTPError
from statement_reader import LIMIT, statements
from urllib.request import HTTPRedirectHandler, HTTPSHandler, Request, build_opener

from storage import MSK, connect
from sync import MOEX_TLS

BASE = "https://gateway.e-disclosure.ru/api/v1"
SCHEMA = """
CREATE TABLE IF NOT EXISTS filings(
 issuer TEXT, uid TEXT, published TEXT, removed INTEGER, category TEXT, title TEXT,
 period TEXT, isin TEXT, url TEXT, PRIMARY KEY(issuer,uid,published));
CREATE INDEX IF NOT EXISTS filings_lookup ON filings(issuer,published);
CREATE TABLE IF NOT EXISTS disclosure_cursor(entity TEXT PRIMARY KEY, event_id TEXT);
CREATE TABLE IF NOT EXISTS filing_numbers(issuer TEXT,uid TEXT,published TEXT,period TEXT,metrics TEXT,
 PRIMARY KEY(issuer,uid,published,period));
"""


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def gateway(db):
    token=os.environ.get("INTERFAX_API_KEY")
    if not token:
        print("Интерфакс · для регулярной выгрузки требуется ключ владельца",flush=True)
        return
    opener=build_opener(NoRedirect(),HTTPSHandler(context=MOEX_TLS))
    with connect() as catalog:
        issuers={r[0] for r in catalog.execute("SELECT id FROM issuers WHERE inn IS NOT NULL")}
        issue_owners=dict(catalog.execute("SELECT isin,issuer FROM bonds WHERE isin IS NOT NULL"))
    for entity in ("Files","Messages"):
        last=db.execute("SELECT event_id FROM disclosure_cursor WHERE entity=?",(entity,)).fetchone()
        cursor=last[0] if last else None
        while True:
            params={"entity":entity,"count":100}
            if cursor:params["fromEventId"]=cursor
            else:params["fromEventDate"]=(date.today()-timedelta(days=30)).isoformat()+"T00:00:00"
            req=Request(BASE+"/disclosure/events?"+urlencode(params),headers={"APIKey":token,"Accept":"application/json"})
            with opener.open(req,timeout=30) as response:batch=json.load(response)
            if not isinstance(batch,list):raise ValueError("Недопустимый ответ шлюза раскрытия")
            if not batch:break
            next_id=batch[-1].get("eventId") or batch[-1].get("uid")
            if not next_id or next_id==cursor:raise ValueError("Шлюз повторил страницу событий")
            with db:
                for item in batch:
                    row=filing_row(item,issuers,issue_owners)
                    if row:
                        db.execute("INSERT OR REPLACE INTO filings VALUES(?,?,?,?,?,?,?,?,?)",row)
                        if item.get("file") and not row[3] and re.search("отч[её]тност",row[4]+" "+row[5],re.I):
                            req=Request(BASE+"/disclosure/download/files/"+quote(row[1],safe=""),headers={"APIKey":token})
                            try:
                                with opener.open(req,timeout=30) as content:raw=content.read(LIMIT+1)
                            except HTTPError as exc:
                                if exc.code not in (403,404):raise
                                continue
                            for period,values in statements(raw,row[0],row[2]):
                                db.execute("INSERT OR REPLACE INTO filing_numbers VALUES(?,?,?,?,?)",
                                           (row[0],row[1],row[2],period,json.dumps(values,ensure_ascii=False)))
                db.execute("INSERT OR REPLACE INTO disclosure_cursor VALUES(?,?)",(entity,next_id))
            cursor=next_id
            if len(batch)<100:break


def filing_row(item,issuers,issue_owners):
    issuer=str(item["subject"].get("inn") or "")
    doc=item.get("file") or item.get("message") or {}
    uid=doc.get("uid")
    if not uid:raise ValueError("Документ без идентификатора")
    stamp=datetime.fromisoformat((item.get("eventDate") or item["date"]).replace("Z","+00:00"))
    if stamp.tzinfo:stamp=stamp.astimezone(MSK).replace(tzinfo=None)
    event=item.get("eventType") or item["type"]
    removed=event in ("Delete","Exclude")
    url=doc.get("publicUrl") or ""
    if not removed and urlsplit(url).scheme not in ("https","http"):return None
    kind=(doc.get("type") or {}).get("name","")
    title=doc.get("header") or kind
    category=(doc.get("category") or {}).get("name") or kind
    attrs={r["name"]:r["value"] for r in doc.get("attributes",[])}
    body=doc.get("text") or ""
    codes=set(re.findall(r"\b[A-Z]{2}[A-Z0-9]{9}\d\b",body+" "+title))
    isin=next(iter(codes)) if len(codes)==1 else ""
    if isin in issue_owners and issue_owners[isin]!=issuer:
        if not re.search(r"представител[ьяе].{0,12}владельцев облигаций",body,re.I):return None
        issuer=issue_owners[isin]
    if issuer not in issuers:return None
    return issuer,uid,stamp.isoformat(timespec="seconds"),int(removed),category,title,attrs.get("YearRep") or "",isin,url
