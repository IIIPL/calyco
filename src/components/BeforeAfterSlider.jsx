import { useState } from 'react';

/**
 * BeforeAfterSlider
 *
 * Props:
 *   beforeSrc   – URL of the "before" image (optional; shows styled placeholder if absent)
 *   afterSrc    – URL of the "after" image  (optional; shows styled placeholder if absent)
 *   beforeLabel – default "Before"
 *   afterLabel  – default "After"
 *   height      – Tailwind height class (default "h-52")
 *   initialPos  – starting slider position 0-100 (default 40 — shows more "after")
 */
const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  height = 'h-52',
  initialPos = 40,
}) => {
  const [pos, setPos] = useState(initialPos);

  return (
    <div className={`relative ${height} overflow-hidden bg-[#1a1a1a] select-none rounded-t-2xl`}>

      {/* ── After layer (full width, sits behind) ── */}
      <div className="absolute inset-0">
        {afterSrc ? (
          <img
            src={afterSrc}
            alt={afterLabel}
            className="w-full h-full object-cover"
            draggable={false}
          />
        ) : (
          /* Styled "after" placeholder — clean smooth wall */
          <div className="w-full h-full bg-gradient-to-br from-[#F0EDE8] to-[#E8E4DF] flex items-end p-4">
            <div className="space-y-1.5 w-full">
              <div className="h-2 rounded-full bg-[#E0DBD4] w-full" />
              <div className="h-1.5 rounded-full bg-[#D8D2CC] w-4/5" />
              <div className="h-2 rounded-full bg-[#E4DFD9] w-full" />
              <div className="h-1 rounded-full bg-[#D5CFC9] w-3/4" />
            </div>
          </div>
        )}
        {/* After label */}
        <div className="absolute top-3 right-3 rounded px-2 py-1 bg-[#493657]/85 text-white text-[9px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm">
          {afterLabel}
        </div>
      </div>

      {/* ── Before layer (clipped at slider position) ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{ width: pos > 0 ? `${(100 / pos) * 100}%` : '200%' }}
        >
          {beforeSrc ? (
            <img
              src={beforeSrc}
              alt={beforeLabel}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            /* Styled "before" placeholder — aged rough wall feel */
            <div className="w-full h-full bg-gradient-to-br from-[#B8AFA5] to-[#A09488] flex items-end p-4">
              {/* Crack / patch suggestions */}
              <div className="absolute inset-0 overflow-hidden opacity-40">
                <div className="absolute top-[30%] left-[20%] w-0.5 h-12 bg-[#706560] rotate-[12deg] rounded-full" />
                <div className="absolute top-[45%] left-[55%] w-0.5 h-8 bg-[#706560] rotate-[-8deg] rounded-full" />
                <div className="absolute top-[20%] left-[70%] w-12 h-8 rounded bg-[#8a8078] opacity-60" />
                <div className="absolute top-[60%] left-[15%] w-8 h-6 rounded bg-[#8a8078] opacity-50" />
              </div>
              <div className="relative space-y-1.5 w-full">
                <div className="h-2 rounded bg-[#A09488] w-full opacity-60" />
                <div className="h-1.5 rounded bg-[#988E82] w-3/4 opacity-50" />
                <div className="h-2 rounded bg-[#A49890] w-full opacity-70" />
              </div>
            </div>
          )}
        </div>
        {/* Before label */}
        <div className="absolute top-3 left-3 rounded px-2 py-1 bg-black/55 text-white text-[9px] font-bold uppercase tracking-[0.1em] backdrop-blur-sm">
          {beforeLabel}
        </div>
      </div>

      {/* ── Divider line + drag handle ── */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.3)] flex items-center justify-center">
          {/* Double chevron icon */}
          <svg className="w-5 h-5 text-[#0F1221]/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* ── Invisible range input for drag interaction ── */}
      <input
        type="range"
        min={2}
        max={98}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Drag to compare before and after"
        style={{ WebkitAppearance: 'none', appearance: 'none' }}
      />
    </div>
  );
};

export default BeforeAfterSlider;
