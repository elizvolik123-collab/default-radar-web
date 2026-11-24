"""Read consolidated RUB facts with unambiguous entity, period and IFRS taxonomy."""
import io
import math
import re
import xml.etree.ElementTree as ET
import zipfile

INSTANCE="{http://www.xbrl.org/2003/instance}"
TAGS={"Revenue":"revenue","ProfitLoss":"net_income","Equity":"equity","Assets":"assets",
      "CurrentAssets":"current_assets","CurrentLiabilities":"current_liabilities",
      "CashAndCashEquivalents":"cash","CashFlowsFromUsedInOperatingActivities":"ocf"}
LIMIT=20*1024*1024
TAGS.update(CurrentBorrowings="short_term_debt",NoncurrentBorrowings="long_term_debt",
            InterestExpense="interest_expenses",ProfitLossFromOperatingActivities="operating_income",
            Inventories="inventories")

def statements(raw,issuer,published):
    if len(raw)>LIMIT:return []
    blobs=[raw]
    if zipfile.is_zipfile(io.BytesIO(raw)):
        with zipfile.ZipFile(io.BytesIO(raw)) as pack:
            members=[m for m in pack.infolist() if m.filename.lower().endswith((".xbrl",".xml"))]
            if sum(m.file_size for m in members)>LIMIT:return []
            blobs=[pack.read(m) for m in members if not m.flag_bits&1]
    results=[]
    for blob in blobs:
        # XBRL data instances have no need for entity expansion.
        if b"\x00" in blob or b"<!DOCTYPE" in blob.upper() or b"<!ENTITY" in blob.upper():continue
        try:root=ET.fromstring(blob)
        except ET.ParseError:continue
        if root.tag!=INSTANCE+"xbrl":continue
        contexts={}
        for ctx in root.findall(INSTANCE+"context"):
            if ctx.findtext(".//"+INSTANCE+"identifier")!=issuer:continue
            if ctx.find(".//"+INSTANCE+"segment") is not None or ctx.find(".//"+INSTANCE+"scenario") is not None:continue
            end=ctx.findtext(".//"+INSTANCE+"endDate") or ctx.findtext(".//"+INSTANCE+"instant") or ""
            start=ctx.findtext(".//"+INSTANCE+"startDate")
            if re.fullmatch(r"20\d\d-(03-31|06-30|09-30|12-31)",end) and end<=published[:10] and (not start or start==end[:4]+"-01-01"):
                contexts[ctx.get("id")]=end
        units={u.get("id") for u in root.findall(INSTANCE+"unit") if len(u)==1 and
               re.fullmatch(r"(?:[A-Za-z_][\w.-]*:)?RUB",u.findtext(INSTANCE+"measure") or "")}
        if not contexts:continue
        end=max(contexts.values())
        period=end[:4]+{"03":"Q1","06":"H1","09":"M9","12":""}[end[5:7]]
        values={}
        for node in root:
            if not re.match(r"\{https?://xbrl\.ifrs\.org/taxonomy/[^}]+/ifrs-full\}",node.tag):continue
            key=TAGS.get(node.tag.split("}")[-1])
            if not key or contexts.get(node.get("contextRef"))!=end or node.get("unitRef") not in units:continue
            try:v=float(node.text or "")
            except ValueError:continue
            if math.isfinite(v):values.setdefault(key,set()).add(v/1_000_000)
        metrics={k:[next(iter(v)),"млн руб."] for k,v in values.items() if len(v)==1}
        if metrics:results.append((period,metrics))
    return results
