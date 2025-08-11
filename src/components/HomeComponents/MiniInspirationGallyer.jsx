// src/components/MiniInspirationGallery.jsx
import React, { useRef, useState, useEffect, useCallback } from "react";

const GOLD = "#C9A941";

export default function MiniInspirationGallery({
  title = "INSPIRATION GALLERY",
  images = [],                      // [{ src, alt }] or strings
  height = 180,                     // FIXED card height (px)
  cardWidth = 260,                  // FIXED card width (px)
}) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const normalize = (it) => (typeof it === "string" ? { src: it, alt: "" } : it);

  const updateEnds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxLeft = scrollWidth - clientWidth - 1;
    setAtStart(scrollLeft <= 0);
    setAtEnd(scrollLeft >= maxLeft);
  }, []);

  useEffect(() => {
    updateEnds();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => updateEnds();
    el.addEventListener("scroll", updateEnds, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", updateEnds);
      window.removeEventListener("resize", onResize);
    };
  }, [updateEnds]);

  const scrollByAmount = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollByAmount(1);
    if (e.key === "ArrowLeft") scrollByAmount(-1);
  };

  // section height ≈ card height + vertical padding (adjust if needed)
  const SECTION_H = height + 48;

  return (
    <section className="w-full" style={{ height: SECTION_H }}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(220px,24%)_1fr] h-full">
        {/* LEFT: static label (rigid, vertically centered) */}
        <div className="px-4 sm:px-6 h-full flex items-center">
          <h2 className="text-lg sm:text-xl tracking-wide font-semibold text-[#1b1330]">
            {title}
          </h2>
        </div>

        {/* RIGHT: carousel (fixed height) */}
        <div className="relative h-full flex items-center">
          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

          {/* Track */}
          <div
            ref={trackRef}
            className="relative overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] px-10"
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-label="Inspiration images"
            style={{ height }}
          >
            {/* hide scrollbar (webkit) */}
            <style>{`.no-scrollbar::-webkit-scrollbar{display:none;}`}</style>

            <ul className="no-scrollbar flex gap-4 h-full">
              {images.map((raw, i) => {
                const { src, alt = "" } = normalize(raw);
                return (
                  <li
                    key={i}
                    className="snap-start shrink-0 rounded-xl ring-1 ring-black/10 bg-white shadow-sm hover:shadow-md transition-shadow"
                    style={{ width: cardWidth, height }}
                  >
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Arrows */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/10 disabled:opacity-40"
            disabled={atStart}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12l7 7" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Scroll right"
            onClick={() => scrollByAmount(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow ring-1 ring-black/10 disabled:opacity-40"
            disabled={atEnd}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
