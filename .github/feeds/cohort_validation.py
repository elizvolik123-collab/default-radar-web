"""Out-of-time, issue-level validation of the frozen seven-day payment model."""
import csv
import json
import sqlite3
from collections import Counter, defaultdict
from contextlib import closing
from urllib.parse import quote

from payment_journal import calendar_outcomes
from risk_model import DATA, HISTORY, LEAD, forecast, previous_trades, report, score, shift
from storage import connect, now


GROUPS = ("Дефолт", "Технический дефолт", "В срок")


def collect(catalog, history, model, day):
    end = day + "T23:59:59"
    bonds = {r["id"]: dict(r) for r in catalog.execute("SELECT * FROM bonds")}
    first_board = dict(catalog.execute("SELECT bond,min(firstday) FROM boards WHERE board='TQCB' GROUP BY bond"))
    currencies = dict(history.execute("SELECT bond,faceunit FROM instruments"))
    status = defaultdict(list)
    for r in catalog.execute("""SELECT m.* FROM moex_defaults m JOIN bonds b ON b.id=m.bond AND b.issuer=m.inn
            WHERE observed=(SELECT max(observed) FROM moex_defaults WHERE record_id=m.record_id AND observed<=?)
            AND due<=? AND status IN ('Дефолт','Технический дефолт')""", (end,day)):
        status[r["bond"]].append(r)
    schedules = defaultdict(dict)
    plans = list(catalog.execute("SELECT bond,date,kind,known,source FROM plans"))
    plans.extend(history.execute("SELECT bond,due,'Купон',known,url FROM announced"))
    for bond,due,kind,known,url in plans:
        if known and url:
            key = (due,kind)
            existing = schedules[bond].get(key)
            if existing is None or (known,url)<existing:
                schedules[bond][key] = (known,url)
    facts = calendar_outcomes(catalog, "0001-01-01", shift(day,1), end)
    by_bond = defaultdict(list)
    for (bond,due,kind), claims in facts.items():
        by_bond[bond].append((due,kind,claims))
    rows = []
    excluded = Counter()
    for bond, events in sorted(by_bond.items()):
        b = bonds.get(bond)
        if not b or not b["isin"] or not b["issuer"].isdigit() or bond not in first_board or (
                b["currency"] or currencies.get(bond)) not in ("RUB","RUR","SUR"):
            continue
        # A control must have an actual payment date and no known late or disputed payment.
        adverse = [e for e in events if any(r["late"] for r in e[2])]
        official = sorted(status[bond],key=lambda r:(GROUPS.index(r["status"]),r["due"],r["record_id"]))
        if adverse and not official:
            excluded["unclassified_delay"] += 1
            continue
        group = official[0]["status"] if official else GROUPS[2]
        candidates = adverse if adverse else [e for e in events if shift(e[0],-LEAD)>=model["cutoff"]
            and any(r["actual"] and r["actual"]<=e[0] and not r["late"] for r in e[2])]
        if not candidates:
            continue
        # One obligation per issue. A coupon wins ties on the first observed date.
        due,kind,claims = min(candidates,key=lambda e:(e[0],e[1]!="Купон",e[1]))
        if len({r["late"] for r in claims})!=1:
            excluded["conflict"] += 1
            continue
        anchor = shift(due,-LEAD)
        if anchor<model["cutoff"]:
            excluded["before_test"] += 1
            continue
        proof = min((r for r in claims if adverse or r["actual"] and r["actual"]<=due),
                    key=lambda r:(r["published"],r["url"]))
        known,plan_url = schedules[bond].get((due,kind),(None,None))
        row = dict(isin=b["isin"],inn=b["issuer"],name=b["name"],group=group,due=due,kind=kind,anchor=anchor,
            outcome_published=proof["published"],outcome_url=proof["url"],status_url=official[0]["url"] if official else proof["url"],
            status_published=official[0]["observed"] if official else proof["published"],
            plan_known=known,plan_url=plan_url,last_trade=None,trade_url=None,price_alert=None,alert=None,reason="")
        variant = model["horizons"][str(LEAD)].get(kind)
        if not variant or not first_board[bond] or first_board[bond]>anchor:
            row["reason"]="Нет модели для вида платежа или режима на дату"
        else:
            trades = previous_trades(catalog,bond,anchor)
            if trades:
                row.update(last_trade=trades["last"],trade_url=(
                    f"https://iss.moex.com/iss/engines/stock/markets/bonds/boards/TQCB/securities/{quote(b['secid'])}/candles.json"
                    f"?interval=24&from={trades['start']}&till={trades['last']}"),
                    price_alert=int(score(variant["weights"],trades["x"])>=model["threshold"]))
            if not known or known[:10]>anchor:
                row["reason"]="Срок выплаты ещё не подтверждён в архиве"
            elif any(anchor<=d<due and p[0][:10]<=anchor for (d,_),p in schedules[bond].items()):
                row["reason"]="На дату оценки известен более ранний платёж"
            else:
                result = forecast(catalog,{"bond":b,"asof":anchor+"T23:59:59","next":{
                    "date":due,"kind":kind,"known":known,"source":plan_url}},model)
                if result["state"]=="signal":
                    row["alert"]=int(result["alert"])
                else:
                    row["reason"]=result["reason"]
        rows.append(row)
    return rows,dict(excluded)


def summarize(rows):
    groups=[]
    for name in GROUPS:
        items=[r for r in rows if r["group"]==name]
        issuers=Counter(r["inn"] for r in items)
        counts=dict(name=name,total=len(items),issuers=len(issuers),largest=max(issuers.values(),default=0))
        for field in ("alert","price_alert"):
            evaluated=[r for r in items if r[field] is not None]
            signals=sum(r[field] for r in evaluated)
            per_issuer=defaultdict(list)
            for r in evaluated:
                per_issuer[r["inn"]].append(r[field])
            rate=sum(sum(v)/len(v) for v in per_issuer.values())/len(per_issuer) if per_issuer else None
            counts[field]=dict(scored=len(evaluated),signals=signals,quiet=len(evaluated)-signals,
                issuers=len(per_issuer),issuer_mean=round(rate,4) if rate is not None else None)
        groups.append(counts)
    return groups


def run(day):
    model=report()
    with closing(connect()) as catalog, closing(sqlite3.connect(HISTORY)) as history:
        rows,excluded=collect(catalog,history,model,day)
    result=dict(asof=day,cutoff=model["cutoff"],lead=LEAD,threshold=model["threshold"],groups=summarize(rows),excluded=excluded)
    (DATA/"cohort_validation.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n","utf-8")
    with (DATA/"cohort_validation.csv").open("w",encoding="utf-8-sig",newline="") as out:
        fields="isin inn name group due kind anchor outcome_published outcome_url status_url status_published plan_known plan_url last_trade trade_url price_alert alert reason".split()
        writer=csv.DictWriter(out,fields)
        writer.writeheader()
        writer.writerows(rows)
    print(json.dumps(result,ensure_ascii=False))


if __name__=="__main__":
    run(now()[:10])
