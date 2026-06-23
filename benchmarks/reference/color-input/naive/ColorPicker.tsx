// Naive answer: hand-rolled HSV picker, reinventing <input type="color">.
// Representative of what gets produced when the native control is overlooked.
import { useEffect, useRef, useState } from "react";

interface ColorPickerProps {
  label: string;
  value: string; // #rrggbb
  onChange: (value: string) => void;
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

function pad2(n: number): string {
  const hex = Math.round(n).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return `#${pad2((r + m) * 255)}${pad2((g + m) * 255)}${pad2((b + m) * 255)}`;
}

function hexToHsv(hex: string): { h: number; s: number; v: number } | null {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match) return null;
  const int = parseInt(match[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : delta / max;
  return { h, s, v: max };
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const initial = hexToHsv(value) ?? { h: 0, s: 1, v: 1 };
  const [hue, setHue] = useState(initial.h);
  const [sat, setSat] = useState(initial.s);
  const [val, setVal] = useState(initial.v);
  const [open, setOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const hsv = hexToHsv(value);
    if (hsv) {
      setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
    }
  }, [value]);

  function commit(h: number, s: number, v: number) {
    onChange(hsvToHex(h, s, v));
  }

  function updateFromPointer(clientX: number, clientY: number) {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const nextSat = clamp((clientX - rect.left) / rect.width, 0, 1);
    const nextVal = 1 - clamp((clientY - rect.top) / rect.height, 0, 1);
    setSat(nextSat);
    setVal(nextVal);
    commit(hue, nextSat, nextVal);
  }

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (dragging.current) updateFromPointer(e.clientX, e.clientY);
    }
    function onUp() {
      dragging.current = false;
    }
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [hue]);

  return (
    <div className="color-picker">
      <span>{label}</span>
      <button
        type="button"
        className="color-picker__swatch"
        style={{ background: value }}
        onClick={() => setOpen((o) => !o)}
      >
        {value}
      </button>
      {open && (
        <div className="color-picker__popover" role="dialog">
          <div
            ref={areaRef}
            className="color-picker__area"
            style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hsvToHex(hue, 1, 1)})` }}
            onMouseDown={(e) => {
              dragging.current = true;
              updateFromPointer(e.clientX, e.clientY);
            }}
          >
            <span
              className="color-picker__thumb"
              style={{ left: `${sat * 100}%`, top: `${(1 - val) * 100}%` }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={360}
            value={hue}
            onChange={(e) => {
              const nextHue = Number(e.target.value);
              setHue(nextHue);
              commit(nextHue, sat, val);
            }}
          />
        </div>
      )}
    </div>
  );
}
