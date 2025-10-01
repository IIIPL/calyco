import React from 'react';

export default function PriceRange({ min, max, value, applied, onChange, onApply }) {
  const clamp = (n, lo, hi) => Math.min(Math.max(n, lo), hi);

  const handleMin = (e) => {
    const v = Number(e.target.value);
    onChange({ ...value, min: Number.isFinite(v) ? v : min });
  };
  const handleMax = (e) => {
    const v = Number(e.target.value);
    onChange({ ...value, max: Number.isFinite(v) ? v : max });
  };

  // validation
  const clampedMin = clamp(value.min, min, max);
  const clampedMax = clamp(value.max, min, max);
  const dirty = clampedMin !== applied.min || clampedMax !== applied.max;
  const invalid = clampedMin > clampedMax;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[#493657] font-medium">Price:</span>

      <input
        type="number"
        className="w-24 border rounded px-2 py-1"
        value={value.min}
        min={min}
        max={value.max}
        onChange={handleMin}
      />
      <span>–</span>
      <input
        type="number"
        className="w-24 border rounded px-2 py-1"
        value={value.max}
        min={value.min}
        max={max}
        onChange={handleMax}
      />

      <button
        className={`px-3 py-2 rounded-md text-white ${
          !dirty || invalid ? 'bg-[#b9b0c2] cursor-not-allowed' : 'bg-[#493657] hover:bg-[#301A44]'
        }`}
        disabled={!dirty || invalid}
        onClick={() => onApply({ min: clamp(value.min, min, max), max: clamp(value.max, min, max) })}
      >
        Apply Price Range
      </button>

      {invalid && <span className="text-sm text-red-600">Min cannot exceed Max</span>}
    </div>
  );
}
