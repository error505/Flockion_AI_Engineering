// Flockion answer: the platform already has a date picker (ladder rung 4).
interface DateFieldProps {
  label: string;
  value: string; // ISO yyyy-mm-dd
  onChange: (value: string) => void;
  min?: string;
  max?: string;
}

export function DateField({ label, value, onChange, min, max }: DateFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        type="date"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
