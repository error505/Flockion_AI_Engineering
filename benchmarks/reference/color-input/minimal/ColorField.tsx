// Flockion answer: the platform already has a color picker (ladder rung 4).
interface ColorFieldProps {
  label: string;
  value: string; // #rrggbb
  onChange: (value: string) => void;
}

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
