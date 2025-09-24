#!/usr/bin/env python3
"""Convert reflection.ics into reflection_filtered.csv.

The script prefers third-party iCalendar parsers when available. It tries these
packages in order:
1. icalendar – mature parser used by many Python projects.
2. ics – lightweight modern parser with nice ergonomics.

If neither package is installed, the script falls back to a minimal parser based
on the iCalendar spec (RFC 5545) that is sufficient for the repository export.
"""

from __future__ import annotations

import csv
import datetime as dt
import sys
from pathlib import Path
from typing import Callable, Iterable, List, Optional, Sequence, Tuple

REFLECTION_DIR = Path(__file__).resolve().parent.parent / "src" / "components" / "Reflection"
ICS_PATH = REFLECTION_DIR / "reflection.ics"
CSV_PATH = REFLECTION_DIR / "reflection_filtered.csv"

SUMMARY_FILTERS = ("morning planning", "evening reflection")


def decode_ics_text(value: str) -> str:
    """Decode escaped characters used inside ICS text values."""
    return (
        value.replace("\\n", "\n")
        .replace("\\N", "\n")
        .replace("\\,", ",")
        .replace("\\;", ";")
        .replace("\\\\", "\\")
    )


def format_datetime(value: object) -> Tuple[str, Optional[dt.datetime]]:
    """Format a date/time into the CSV representation and return comparable UTC."""
    if isinstance(value, dt.datetime):
        local_dt = value
        if local_dt.tzinfo is not None:
            offset = local_dt.strftime("%z")
            formatted_offset = f"{offset[:3]}:{offset[3:]}" if offset else ""
            csv_value = local_dt.strftime("%Y-%m-%d %H:%M:%S") + formatted_offset
            utc_dt = local_dt.astimezone(dt.timezone.utc)
        else:
            csv_value = local_dt.strftime("%Y-%m-%d %H:%M:%S")
            utc_dt = local_dt.replace(tzinfo=dt.timezone.utc)
        return csv_value, utc_dt

    if isinstance(value, dt.date):
        csv_value = value.strftime("%Y-%m-%d")
        return csv_value, dt.datetime.combine(value, dt.time.min, tzinfo=dt.timezone.utc)

    return str(value), None


def matches_summary(summary: str) -> bool:
    lower = summary.lower()
    return any(key in lower for key in SUMMARY_FILTERS)


def extract_with_icalendar(raw: str) -> Optional[List[dict]]:
    try:
        from icalendar import Calendar  # type: ignore
    except Exception:
        return None

    calendar = Calendar.from_ical(raw)
    events: List[dict] = []
    for component in calendar.walk("VEVENT"):
        summary_raw = component.get("summary")
        if summary_raw is None:
            continue
        summary = decode_ics_text(str(summary_raw))
        if not matches_summary(summary):
            continue

        location = decode_ics_text(str(component.get("location", "")))
        description = decode_ics_text(str(component.get("description", "")))

        start_obj = component.decoded("dtstart", None)
        end_obj = component.decoded("dtend", None)

        start_text, start_utc = format_datetime(start_obj)
        end_text, _ = format_datetime(end_obj)

        events.append(
            {
                "summary": summary,
                "location": location,
                "description": description,
                "start": start_text,
                "end": end_text,
                "start_utc": start_utc,
            }
        )
    return events


def extract_with_ics_package(raw: str) -> Optional[List[dict]]:
    try:
        from ics import Calendar  # type: ignore
    except Exception:
        return None

    calendar = Calendar(raw)
    events: List[dict] = []
    for event in calendar.events:
        summary = decode_ics_text(event.name or "")
        if not matches_summary(summary):
            continue

        location = decode_ics_text(event.location or "")
        description = decode_ics_text(event.description or "")

        start = event.begin
        end = event.end

        start_text, start_utc = format_datetime(start.datetime if start else None)
        end_text, _ = format_datetime(end.datetime if end else None)

        events.append(
            {
                "summary": summary,
                "location": location,
                "description": description,
                "start": start_text,
                "end": end_text,
                "start_utc": start_utc,
            }
        )
    return events


def unfold_ics_lines(raw_lines: Sequence[str]) -> List[str]:
    unfolded: List[str] = []
    for line in raw_lines:
        if line.startswith(" ") or line.startswith("\t"):
            if unfolded:
                unfolded[-1] += line[1:]
            else:
                unfolded.append(line.lstrip())
        else:
            unfolded.append(line)
    return unfolded


def split_event(lines: Sequence[str]) -> List[dict]:
    """Extract VEVENT dictionaries while ignoring nested components like VALARM."""

    events: List[dict] = []
    current: dict | None = None
    stack: List[str] = []

    for line in lines:
        if line.startswith("BEGIN:"):
            component = line[6:]
            stack.append(component)
            if component == "VEVENT":
                current = {}
            continue

        if line.startswith("END:"):
            if stack:
                component = stack.pop()
                if component == "VEVENT" and current is not None:
                    events.append(current)
                    current = None
            continue

        if not stack or stack[-1] != "VEVENT":
            # Either outside a VEVENT or inside a nested component (e.g. VALARM).
            continue

        if current is None or ":" not in line:
            continue

        left, right = line.split(":", 1)
        key_parts = left.split(";")
        key = key_parts[0].upper()
        params = {}
        for part in key_parts[1:]:
            if "=" in part:
                pk, pv = part.split("=", 1)
                params[pk.upper()] = pv
        current[key] = {"value": right, "params": params}

    return events


def parse_dt_raw(value: str, params: dict) -> Tuple[str, Optional[dt.datetime]]:
    value = value.strip()
    if not value:
        return "", None

    if value.endswith("Z"):
        dt_value = dt.datetime.strptime(value, "%Y%m%dT%H%M%SZ")
        dt_value = dt_value.replace(tzinfo=dt.timezone.utc)
        return format_datetime(dt_value)

    if "T" in value:
        dt_value = dt.datetime.strptime(value, "%Y%m%dT%H%M%S")
        tzid = params.get("TZID")
        if tzid:
            try:
                import zoneinfo

                tz = zoneinfo.ZoneInfo(tzid)
                dt_value = dt_value.replace(tzinfo=tz)
            except Exception:
                dt_value = dt_value.replace(tzinfo=dt.timezone.utc)
        return format_datetime(dt_value)

    date_value = dt.datetime.strptime(value, "%Y%m%d").date()
    return format_datetime(date_value)


def extract_with_fallback(raw: str) -> List[dict]:
    lines = raw.splitlines()
    unfolded = unfold_ics_lines(lines)
    parsed_events = split_event(unfolded)

    events: List[dict] = []
    for event in parsed_events:
        summary_field = event.get("SUMMARY")
        if not summary_field:
            continue
        summary = decode_ics_text(summary_field["value"])
        if not matches_summary(summary):
            continue

        location_field = event.get("LOCATION", {"value": ""})
        description_field = event.get("DESCRIPTION", {"value": ""})
        dtstart_field = event.get("DTSTART", {"value": "", "params": {}})
        dtend_field = event.get("DTEND", {"value": "", "params": {}})

        start_text, start_utc = parse_dt_raw(dtstart_field["value"], dtstart_field.get("params", {}))
        end_text, _ = parse_dt_raw(dtend_field["value"], dtend_field.get("params", {}))

        events.append(
            {
                "summary": summary,
                "location": decode_ics_text(location_field["value"]),
                "description": decode_ics_text(description_field["value"]),
                "start": start_text,
                "end": end_text,
                "start_utc": start_utc,
            }
        )

    return events


def load_events() -> List[dict]:
    raw = ICS_PATH.read_text(encoding="utf-8")

    for extractor in (extract_with_icalendar, extract_with_ics_package):
        try:
            events = extractor(raw)
        except Exception as exc:  # pragma: no cover - defensive
            print(f"Warning: {extractor.__name__} failed: {exc}", file=sys.stderr)
            events = None
        if events:
            print(f"Using parser: {extractor.__name__}")
            return events

    print("Using parser: fallback implementation")
    return extract_with_fallback(raw)


def write_csv(events: Sequence[dict]) -> None:
    sorted_events = sorted(
        events,
        key=lambda event: event.get("start_utc") or dt.datetime.max.replace(tzinfo=dt.timezone.utc),
    )

    with CSV_PATH.open("w", encoding="utf-8", newline="") as csvfile:
        writer = csv.writer(csvfile, quoting=csv.QUOTE_ALL)
        writer.writerow(["Summary", "Location", "Description", "Start Date/Time", "End Date/Time"])
        for event in sorted_events:
            writer.writerow(
                [
                    event.get("summary", ""),
                    event.get("location", ""),
                    event.get("description", ""),
                    event.get("start", ""),
                    event.get("end", ""),
                ]
            )


def main() -> None:
    if not ICS_PATH.exists():
        print(f"ICS file not found at {ICS_PATH}", file=sys.stderr)
        sys.exit(1)

    events = load_events()
    if not events:
        print("No matching events found.")
        return

    write_csv(events)
    print(f"Exported {len(events)} events to {CSV_PATH}")


if __name__ == "__main__":
    main()
