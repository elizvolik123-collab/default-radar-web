"""Market-wide, deterministic time sample of issuer filings distributed by AK&M."""
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import date,timedelta

from collect_payments import ISIN, RUDATE, clean, dayof, fetch, profile
from storage import connect, now

BASE="https://www.disclosure.ru/rus/corpnews/"
DATES=r"\b(?:\d{2}\.\d{2}\.20\d{2}|"+RUDATE+r")\b"

def listing(stamp,planned=False):
    url=BASE+"index.shtml?ts="+stamp
    page=fetch(url).decode("cp1251")
    links=re.findall(r'<a\s+href="news.shtml\?newsisn=(\d+)"[^>]*>\s*<b>(\d\d\.\d\d\.20\d\d)[^<]*</b>(.*?)</a>',page,re.S|re.I)
    if not links and re.search(r"elements\['ts'\]\.value\s*=\s*;",page):return []
    if not links or any(dayof(d).replace("-","")>stamp[:8] for _,d,_ in links):raise ValueError("Неподтверждённая дата выдачи")
    pattern=r"начисленн\w*\s+доход" if planned else r"выплаченн\w*\s+доход|неисполнени[ея].{0,50}обязательств"
    return [(BASE+"news.shtml?newsisn="+n,dayof(d)) for n,d,title in links if re.search(pattern,clean(title),re.I)]

def announcement(url,published,allowed):
    body=re.search(r"2\.\s*Содержание сообщения(.*?)3\.\s*Подпись",clean(fetch(url).decode("cp1251")),re.I)
    if not body:return []
    fields=re.split(r"(?:^|\s)2\.\d{1,2}\.\s*",body[1])
    ids=set(re.findall(ISIN,body[1]))
    kind=next((v.partition(":")[2] for v in fields if re.match(r"категория выплат|вид .*доход",v,re.I)),"")
    period=next((v.partition(":")[2] for v in fields if re.match(r"отч[её]тный",v,re.I)),"")
    part=next((v for v in fields if re.match(r"дата,?\s+в которую обязанность",v,re.I)),"")
    dates=set(re.findall(DATES,part,re.I))
    if len(ids)!=1 or len(dates)!=1 or not (re.search(r"купон|процент",kind,re.I) or
            ("купон" in period.lower() and "дисконтн" not in body[1][:450].lower())):return []
    k=ids.pop();due=dayof(dates.pop())
    return [(k,due,published,url)] if k in allowed and published<due else []

def parse(url,published,allowed):
    page=clean(fetch(url).decode("cp1251"))
    # Only accept an affirmative issuer filing about paid income. Future accrual
    # notices, board resolutions, releases with several ISINs and ambiguous dates abstain.
    match=re.search(r"1\.7\.\s*Дата наступления события.*?("+DATES+")",page,re.I)
    body=re.search(r"2\.\s*Содержание сообщения(.*?)3\.\s*Подпись",page,re.I)
    if not match or not body:return []
    actual=dayof(match[1]);body=body[1]
    codes=set(re.findall(ISIN,body))
    if len(codes)!=1 or next(iter(codes)) not in allowed:return []
    k=codes.pop()
    fields=re.split(r"(?:^|\s)2\.\d{1,2}\.\s*",body)
    def field(pattern):
        return next((part for part in fields if re.search(pattern,part[:180],re.I)),"")
    duepart=field(r"дата,?\s+в которую (?:обязанность|обязательство)")
    amount=field(r"объ[её]м\s*\(в процентах\)|объ[её]м.*?процентн")
    nature=field(r"категория выплат|вид (?:выплаченного дохода|доходов|выплаченных|дохода|выплаты|выплачиваемых)")
    terms=nature.partition(":")[2].lower()
    due_dates=set(re.findall(DATES,duepart,re.I))
    if len(due_dates)!=1 or not re.search(r"(?<![\d,.])100(?:[,.]0+)?\s*(?:\(сто\)\s*)?(?:%|процент)",amount,re.I):return []
    due=dayof(due_dates.pop())
    if max(due,actual)>published or actual<"2023-01-01":return []
    kinds=[]
    if re.search(r"купон|процентн.{0,6}доход|процент[ыа]\b",terms):kinds.append("Купон")
    if re.search(r"амортизаци|частичн.{0,30}погашени|част[ьи].{0,12}номинальн",terms):kinds.append("Амортизация")
    elif re.search(r"погашени[ея]\s+(?:номинальн|облигац|основн)|номинальная стоимость облигац",terms):kinds.append("Погашение")
    return [(k,due,kind,int(actual>due),actual,published,url,url,"Раскрытие эмитента · АК&М") for kind in kinds]

def collect(planned=False,recent=False):
    with connect() as main,profile() as db:
        allowed={r[0] for r in main.execute("SELECT id FROM bonds")}
        day=date(2024,1,1);today=date.fromisoformat(now()[:10]);stamps=[]
        while day<=today:
            if day.weekday() in (2,4) or (date(2025,11,1)<=day<date(2026,1,1) and day.weekday()<5):
                stamps.append(day.strftime("%Y%m%d")+("120000" if day.weekday()==4 else "160000"))
            day+=timedelta(days=1)
        if recent:
            stamps=[(today-timedelta(days=n)).strftime("%Y%m%d")+hour for n in range(3)
                    for hour in ("060000","120000","180000","235959")
                    if (today-timedelta(days=n)).strftime("%Y%m%d")+hour<=now().replace("-","").replace(":","").replace("T","")]
        def visit(stamp):
            try:return listing(stamp,planned),None
            except (OSError,ValueError) as e:return [],(BASE+"index.shtml?ts="+stamp,str(e)[:190])
        releases={};errors=[]
        with ThreadPoolExecutor(max_workers=5) as pool:
            for stamp,(items,error) in zip(stamps,pool.map(visit,stamps)):
                releases.update(items)
                if error:errors.append(error)
                else:db.execute("DELETE FROM downloads WHERE url=?",(BASE+"index.shtml?ts="+stamp,))
                db.commit()
        print("АК&М: архивных срезов",len(stamps)-len(errors),"кандидатов",len(releases),flush=True)
        def read(item):
            url,pub=item
            try:return url,(announcement if planned else parse)(url,pub,allowed),None
            except (OSError,ValueError) as e:return url,[],(url,str(e)[:190])
        with ThreadPoolExecutor(max_workers=5) as pool:
            for url,rows,error in pool.map(read,releases.items()):
                with db:
                    if error:errors.append(error)
                    else:
                        db.execute("DELETE FROM downloads WHERE url=?",(url,))
                        db.executemany("INSERT OR IGNORE INTO announced VALUES(?,?,?,?)" if planned else
                                       "INSERT OR IGNORE INTO evidence VALUES(?,?,?,?,?,?,?,?,?)",rows)
        with db:db.executemany("INSERT OR REPLACE INTO downloads VALUES(?,?)",errors)
        query="SELECT count(*) FROM announced WHERE url LIKE '%disclosure.ru/%'" if planned else "SELECT count(*) FROM evidence WHERE source LIKE '%АК&М'"
        print("АК&М: принятые записи",db.execute(query).fetchone()[0],"ошибок",len(errors),flush=True)
        return not errors

if __name__=="__main__":
    import argparse
    p=argparse.ArgumentParser();p.add_argument("--plans",action="store_true");p.add_argument("--recent",action="store_true")
    args=p.parse_args()
    if not collect(args.plans,args.recent):raise SystemExit(2)
