// Naive answer: hand-rolled calendar popover, reinventing <input type="date">.
// Representative of what gets produced when the native control is overlooked.
import { useEffect, useMemo, useRef, useState } from "react";

interface DatePickerProps {
  label: string;
  value: string; // ISO yyyy-mm-dd
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function toISO(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function parseISO(iso: string): { year: number; month: number; day: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  if (month < 0 || month > 11 || day < 1 || day > 31) return null;
  return { year, month, day };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function leadingBlanks(year: number, month: number): number {
  // Convert JS Sunday=0 to a Monday-first grid.
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}

function isBefore(a: string, b?: string): boolean {
  return b !== undefined && a < b;
}

function isAfter(a: string, b?: string): boolean {
  return b !== undefined && a > b;
}

export function DatePicker({ label, value, onChange, min, max }: DatePickerProps) {
  const parsed = parseISO(value);
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parsed ? parsed.year : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed ? parsed.month : today.getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parsed) {
      setViewYear(parsed.year);
      setViewMonth(parsed.month);
    }
  }, [value]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  const cells = useMemo(() => {
    const total = daysInMonth(viewYear, viewMonth);
    const blanks = leadingBlanks(viewYear, viewMonth);
    const out: (number | null)[] = [];
    for (let i = 0; i < blanks; i += 1) out.push(null);
    for (let day = 1; day <= total; day += 1) out.push(day);
    return out;
  }, [viewYear, viewMonth]);

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function select(day: number) {
    const iso = toISO(viewYear, viewMonth, day);
    if (isBefore(iso, min) || isAfter(iso, max)) return;
    onChange(iso);
    setOpen(false);
  }

  return (
    <div className="date-picker" ref={containerRef}>
      <span>{label}</span>
      <button type="button" onClick={() => setOpen((o) => !o)}>
        {value || "Select a date"}
      </button>
      {open && (
        <div className="date-picker__popover" role="dialog">
          <div className="date-picker__header">
            <button type="button" onClick={prevMonth} aria-label="Previous month">‹</button>
            <span>{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} aria-label="Next month">›</button>
          </div>
          <div className="date-picker__weekdays">
            {WEEKDAYS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
          <div className="date-picker__grid">
            {cells.map((day, index) => {
              if (day === null) return <span key={`blank-${index}`} />;
              const iso = toISO(viewYear, viewMonth, day);
              const disabled = isBefore(iso, min) || isAfter(iso, max);
              const selected = iso === value;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  className={selected ? "is-selected" : ""}
                  onClick={() => select(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
