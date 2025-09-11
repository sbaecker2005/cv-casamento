import { useId } from "react";

export default function RadioGroup({
  name,
  options,
  value,
  onChange,
  ...props
}: {
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const groupId = useId();
  return (
    <div role="radiogroup" aria-labelledby={groupId}>
  {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center mr-6">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
            className="mr-2 text-brand-sage-600 focus:ring-brand-sage-600"
            aria-checked={value === opt.value}
            {...props}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
