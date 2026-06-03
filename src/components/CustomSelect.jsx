import { useState, useRef, useEffect } from 'react';

/**
 * CustomSelect — replaces native <select> everywhere.
 *
 * Props:
 *   value      – currently selected value (string)
 *   onChange   – (value: string) => void
 *   options    – string[] | { value, label, sub? }[]
 *   placeholder – shown when nothing selected
 *   variant    – 'light' (default, white bg) | 'dark' (translucent, for dark hero sections)
 *   label      – optional aria label
 *   className  – extra classes on the wrapper
 */
const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select…',
  variant = 'light',
  label,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const containerRef = useRef(null);

  // Normalise options → [{value, label, sub?}]
  const normalised = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o
  );
  const selected = normalised.find((o) => o.value === value);

  const handleToggle = () => {
    if (!open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // Open upward if there's less than 260px below but more above
      setOpenUp(spaceBelow < 260 && rect.top > spaceBelow);
    }
    setOpen((o) => !o);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    const onClick = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // ── Styles ──────────────────────────────────────────────────────────────
  const isDark = variant === 'dark';

  const triggerBase =
    'w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0C85A]';

  const triggerVariant = isDark
    ? 'border border-white/15 bg-white/10 text-white hover:bg-white/15 backdrop-blur-sm'
    : 'border border-[#0F1221]/12 bg-white text-[#0F1221] hover:border-[#0F1221]/25 shadow-sm';

  const chevronColor = isDark ? 'text-white/40' : 'text-[#0F1221]/30';

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* ── Trigger ─────────────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className={`${triggerBase} ${triggerVariant}`}
      >
        <span className={`truncate ${!selected ? (isDark ? 'text-white/35' : 'text-[#0F1221]/35') : ''}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''} ${chevronColor}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Dropdown panel ──────────────────────────────────────────────── */}
      {open && (
        <div
          role="listbox"
          aria-label={label}
          className={`
            absolute ${openUp ? 'bottom-full mb-2' : 'top-full mt-2'}
            left-0 right-0 z-[300]
            rounded-2xl overflow-hidden
            bg-white border border-[#0F1221]/8
            shadow-[0_12px_48px_rgba(0,0,0,0.18)]
            backdrop-blur-sm
          `}
        >
          {/* Scrollable list — capped at 224px so it never overflows viewport */}
          <div className="max-h-56 overflow-y-auto overscroll-contain divide-y divide-[#0F1221]/5">
            {normalised.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3 text-left
                    transition-colors text-sm
                    ${isSelected
                      ? 'bg-[#0F1221] text-white'
                      : 'text-[#0F1221] hover:bg-[#F7F6F3]'
                    }
                  `}
                >
                  <div className="min-w-0">
                    <span className="font-medium block truncate">{opt.label}</span>
                    {opt.sub && (
                      <span className={`text-[11px] font-light block mt-0.5 ${isSelected ? 'text-white/55' : 'text-[#0F1221]/40'}`}>
                        {opt.sub}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[#F0C85A] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
