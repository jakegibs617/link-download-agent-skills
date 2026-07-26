#!/usr/bin/env python3
"""Scoring for technical-review-auditor evaluations.

Two subcommands:

    score      one run  -> score.json
    aggregate  one iteration dir -> summary + appended history.json

Expected layout:

    workspace/
      history.json
      iteration-1/
        fixture-01-notification-service/
          with_skill/run-1/{review.md,grading.json,timing.json}
          baseline/run-1/{review.md,grading.json,timing.json}

See references/evaluation.md for the grading.json and ledger.json schemas.
"""

import argparse
import json
import statistics
import sys
from datetime import datetime, timezone
from pathlib import Path

SEVERITY_WEIGHT = {"critical": 3, "major": 2, "minor": 1}

WEIGHTS = {
    "critical_recall": 0.40,
    "detection_rate": 0.20,
    "blocking_precision": 0.20,
    "noise_inverse": 0.15,
    "format_compliance": 0.05,
}

# Deterministic structural checks on the review markdown.
FORMAT_CHECKS = {
    "has_verdict": lambda t: "## verdict" in t,
    "has_blocking_section": lambda t: "## blocking findings" in t,
    "has_lens_results": lambda t: "## lens results" in t,
    "has_questions": lambda t: "## questions for the author" in t,
    "blocking_capped": lambda t: _count_blocking(t) <= 5,
}


def _count_blocking(text: str) -> int:
    """Count top-level list items under the blocking findings heading."""
    lines = text.splitlines()
    inside, count = False, 0
    for line in lines:
        stripped = line.strip().lower()
        if stripped.startswith("## "):
            inside = stripped.startswith("## blocking findings")
            continue
        if inside and (line.startswith(("- ", "* ")) or line.strip().startswith("### ")):
            count += 1
    return count


def load_ledger(fixture_dir: Path) -> dict:
    ledger_path = fixture_dir / "ledger.json"
    if not ledger_path.exists():
        raise SystemExit(f"missing ledger: {ledger_path}")
    return json.loads(ledger_path.read_text())


def score_run(grading: dict, ledger: dict, review_text: str) -> dict:
    by_id = {d["id"]: d for d in ledger["defects"]}
    graded = {d["id"]: d for d in grading.get("defects", [])}

    missing = set(by_id) - set(graded)
    if missing:
        raise SystemExit(
            f"grading omits defects present in ledger: {sorted(missing)}. "
            "The grader must return a verdict for every seeded defect."
        )

    crit = [d for d in by_id.values() if d["severity"] == "critical"]
    crit_caught = [d for d in crit if graded[d["id"]].get("caught")]
    critical_recall = len(crit_caught) / len(crit) if crit else 1.0

    total_w = sum(SEVERITY_WEIGHT[d["severity"]] for d in by_id.values())
    caught_w = sum(
        SEVERITY_WEIGHT[d["severity"]] for d in by_id.values() if graded[d["id"]].get("caught")
    )
    detection_rate = caught_w / total_w if total_w else 1.0

    must_block = [d for d in by_id.values() if d.get("must_be_blocking")]
    blocking_total = grading.get("blocking_total", 0)
    if not must_block:
        blocking_precision = 1.0
    elif blocking_total == 0:
        blocking_precision = 0.0
    else:
        hit = sum(1 for d in must_block if graded[d["id"]].get("in_blocking"))
        # Reward finding the must-blocks; penalise padding the blocking list.
        recall = hit / len(must_block)
        precision = hit / blocking_total
        blocking_precision = (
            0.0 if (recall + precision) == 0 else 2 * recall * precision / (recall + precision)
        )

    findings_total = grading.get("findings_total", 0)
    spurious = grading.get("findings_spurious", 0)
    noise_rate = spurious / findings_total if findings_total else 0.0

    checks = {name: bool(fn(review_text.lower())) for name, fn in FORMAT_CHECKS.items()}
    format_compliance = sum(checks.values()) / len(checks)

    metrics = {
        "critical_recall": round(critical_recall, 4),
        "detection_rate": round(detection_rate, 4),
        "blocking_precision": round(blocking_precision, 4),
        "noise_rate": round(noise_rate, 4),
        "format_compliance": round(format_compliance, 4),
    }

    composite = (
        WEIGHTS["critical_recall"] * critical_recall
        + WEIGHTS["detection_rate"] * detection_rate
        + WEIGHTS["blocking_precision"] * blocking_precision
        + WEIGHTS["noise_inverse"] * (1 - noise_rate)
        + WEIGHTS["format_compliance"] * format_compliance
    )

    return {
        "fixture_id": ledger["fixture_id"],
        "config": grading.get("config", "unknown"),
        "metrics": metrics,
        "format_checks": checks,
        "composite": round(composite, 4),
    }


def cmd_score(args) -> None:
    grading = json.loads(Path(args.grading).read_text())
    review_text = Path(args.review).read_text()
    fixture_dir = (
        Path(args.fixture) if args.fixture else Path(args.grading).resolve().parents[2]
    )
    result = score_run(grading, load_ledger(fixture_dir), review_text)

    timing_path = Path(args.grading).parent / "timing.json"
    if timing_path.exists():
        t = json.loads(timing_path.read_text())
        result["total_tokens"] = t.get("total_tokens")
        result["duration_ms"] = t.get("duration_ms")

    out = Path(args.out) if args.out else Path(args.grading).parent / "score.json"
    out.write_text(json.dumps(result, indent=2) + "\n")
    print(f"{result['config']:<12} {result['fixture_id']:<36} composite {result['composite']:.3f}")


def _mean_sd(values):
    if not values:
        return None, None
    return (
        round(statistics.mean(values), 4),
        round(statistics.stdev(values), 4) if len(values) > 1 else 0.0,
    )


def cmd_aggregate(args) -> None:
    iter_dir = Path(args.iteration_dir)
    scores = [json.loads(p.read_text()) for p in sorted(iter_dir.rglob("score.json"))]
    if not scores:
        raise SystemExit(f"no score.json files under {iter_dir}")

    holdout = set(args.holdout or [])
    summary = {
        "iteration": iter_dir.name,
        "timestamp": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "note": args.note,
        "runs": len(scores),
        "splits": {},
    }

    for split_name, predicate in (
        ("train", lambda s: s["fixture_id"] not in holdout),
        ("holdout", lambda s: s["fixture_id"] in holdout),
    ):
        subset = [s for s in scores if predicate(s)]
        if not subset:
            continue
        split = {}
        for config in sorted({s["config"] for s in subset}):
            runs = [s for s in subset if s["config"] == config]
            mean, sd = _mean_sd([r["composite"] for r in runs])
            entry = {"n": len(runs), "composite_mean": mean, "composite_sd": sd}
            for metric in ("critical_recall", "detection_rate", "blocking_precision", "noise_rate"):
                entry[metric] = _mean_sd([r["metrics"][metric] for r in runs])[0]
            toks = [r["total_tokens"] for r in runs if r.get("total_tokens")]
            if toks:
                entry["tokens_mean"] = round(statistics.mean(toks))
            split[config] = entry

        if "with_skill" in split and "baseline" in split:
            uplift = split["with_skill"]["composite_mean"] - split["baseline"]["composite_mean"]
            pooled_sd = max(split["with_skill"]["composite_sd"], split["baseline"]["composite_sd"])
            n_min = min(split["with_skill"]["n"], split["baseline"]["n"])
            split["uplift"] = round(uplift, 4)
            split["runs_per_config"] = n_min
            if n_min < 2:
                split["significance"] = "unknown"
            elif abs(uplift) > pooled_sd:
                split["significance"] = "exceeds_1sd"
            else:
                split["significance"] = "within_variance"
        summary["splits"][split_name] = split

    print(json.dumps(summary, indent=2))

    for name, split in summary["splits"].items():
        sig = split.get("significance")
        if sig == "unknown":
            print(
                f"\n[warning] {name}: only {split['runs_per_config']} run per configuration, so "
                f"uplift {split['uplift']:+.3f} has no variance estimate behind it. "
                "Run three per configuration before treating it as a result.",
                file=sys.stderr,
            )
        elif sig == "within_variance":
            print(
                f"\n[warning] {name}: uplift {split['uplift']:+.3f} is within one standard "
                f"deviation of run-to-run variance. Not evidence of improvement.",
                file=sys.stderr,
            )
    tr, ho = summary["splits"].get("train"), summary["splits"].get("holdout")
    if tr and ho and "uplift" in tr and "uplift" in ho and tr["uplift"] - ho["uplift"] > 0.05:
        print(
            "\n[warning] train uplift exceeds holdout uplift by more than 0.05 — "
            "likely fitting the skill to the seeded defects rather than improving review quality.",
            file=sys.stderr,
        )

    if args.history:
        hist_path = Path(args.history)
        history = json.loads(hist_path.read_text()) if hist_path.exists() else []
        history.append(summary)
        hist_path.write_text(json.dumps(history, indent=2) + "\n")
        print(f"\nappended to {hist_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("score", help="score a single run")
    s.add_argument("--grading", required=True)
    s.add_argument("--review", required=True)
    s.add_argument("--fixture", help="fixture dir holding ledger.json (default: inferred)")
    s.add_argument("--out")
    s.set_defaults(func=cmd_score)

    a = sub.add_parser("aggregate", help="aggregate an iteration directory")
    a.add_argument("iteration_dir")
    a.add_argument("--holdout", nargs="*", help="fixture_ids held out from tuning")
    a.add_argument("--history", help="path to history.json to append to")
    a.add_argument("--note", default="", help="what changed in the skill this iteration")
    a.set_defaults(func=cmd_aggregate)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
