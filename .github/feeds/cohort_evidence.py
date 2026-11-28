"""Publish the individual observations behind a dated cohort summary."""
import csv
import json
from pathlib import Path


STUDIES = ("schedule_review_522", "cohort_validation")
FIELDS = ("isin", "name", "group", "event_group", "due", "kind", "anchor",
          "outcome_url", "outcome_published", "event_status_url", "event_status_published",
          "status_url", "status_published")


def evidence(directory, study):
    if study not in STUDIES:
        raise ValueError("Unknown cohort study")
    summary = json.loads((directory / (study + ".json")).read_text("utf-8"))
    with (directory / (study + ".csv")).open(encoding="utf-8-sig", newline="") as stream:
        rows = []
        for record in csv.DictReader(stream):
            row = {key: record.get(key) or None for key in FIELDS}
            for key in ("alert", "price_alert"):
                row[key] = {"": None, "0": 0, "1": 1}[record[key]]
            rows.append(row)
    for key, groups in (("group", summary["groups"]), ("event_group", summary.get("payments", []))):
        for group in groups:
            subset = [row for row in rows if row[key] == group["name"]]
            for flag in ("alert", "price_alert"):
                expected = group[flag]
                counts = [sum(row[flag] == value for row in subset) for value in (1, 0, None)]
                if counts != [expected["signals"], expected["quiet"], group["total"] - expected["scored"]]:
                    raise ValueError(f"Inconsistent {study} evidence: {group['name']} / {key} / {flag}")
    return {"asof": summary["asof"], "rows": sorted(rows, key=lambda row: (row["due"], row["isin"]), reverse=True)}


def export_evidence(directory: Path, destination: Path, study: str):
    path = destination / (study + "_evidence.json")
    path.write_text(json.dumps(evidence(directory, study), ensure_ascii=False, separators=(",", ":")), "utf-8")
