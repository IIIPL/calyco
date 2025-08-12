// src/components/MiniInspirationGallery.jsx
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
// adjust path if needed
import { roomData } from "../../data/roomData";

const GOLD = "#C9A941";

const slugify = (text = "") =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export default function MiniInspirationGallery({
  title = "INSPIRATION GALLERY",
  images = [],
  height = 180,
  cardWidth = 260,
  basePath = "/room",
}) {
  // random, unique by slug, from roomData
  const defaultImages = useMemo(() => {
    const pool = roomData
      .filter((r) => r && Array.isArray(r.shots) && r.shots[0]?.image && r.name)
      .map((r) => {
        const name = r.name;
        const slug = slugify(name);
        return { src: r.shots[0].image, alt: name, to: `${basePath}/${slug}` };
      });

    const seen = new Set();
    const uniq = pool.filter((it) => {
      const slug = it.to.split("/").pop();
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    });

    for (let i = uniq.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniq[i], uniq[j]] = [uniq[j], uniq[i]];
    }
    return uniq.slice(0, 10);
  }, [basePath]);

  // never route to external URLs; force /room/<slug>
  const normalize = (it) => {
    if (typeof it === "string") {
      const nameGuess = it.split("/").pop()?.replace(/\.\w+$/, "") || "inspiration";
      return { src: it, alt: nameGuess, to: `${basePath}/${slugify(nameGuess)}` };
    }
    const name = it.name || it.alt || it.title || it.label || it.slug || "inspiration";
    const slug = it.slug ? slugify(it.slug) : slugify(name);
    const safeTo = typeof it.to === "string" && it.to.startsWith("/") ? it.to : `${basePath}/${slug}`;
    return { src: it.src, alt: name, to: safeTo };
  };

  const galleryImages = useMemo(
    () => (images.length ? images : defaultImages).map(normalize),
    [images, defaultImages]
  );

  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEnds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxLeft = Math.max(0, scrollWidth - clientWidth - 1);
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

  useEffect(() => {
    updateEnds();
  }, [galleryImages, updateEnds]);

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

  const CARD_W = `clamp(220px, 72vw, ${cardWidth}px)`;
  const CARD_H = `clamp(150px, 46vw, ${height}px)`;
  const SECTION_H = 48 + Math.min(height, 180);

  return (
    <section className="w-full" style={{ height: SECTION_H }}>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(180px,22%)_1fr] md:gap-8 h-full mx-3">
        {/* LEFT title */}
        <div className="px-4 sm:px-6 h-full flex items-center justify-center md:justify-start">
          <h2 className="leading-[0.95] text-center md:text-left whitespace-nowrap md:whitespace-normal">
            <span className="inline md:block uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1b1330]">
              Inspiration
            </span>
            <span className="inline md:block uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1b1330]">
              {" "}Gallery
            </span>
          </h2>
        </div>

        {/* RIGHT: carousel */}
        <div className="relative h-full flex items-center overflow-hidden min-w-0 pl-10 md:pl-16 lg:pl-24 pr-10 md:pr-16 lg:pr-24">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

          <div
            ref={trackRef}
            data-mig
            className="relative overflow-x-auto snap-x snap-mandatory w-full [scrollbar-width:none] [-ms-overflow-style:none] pl-14 sm:pl-16 md:pl-20 lg:pl-24 pr-0"
            onKeyDown={onKeyDown}
            tabIndex={0}
            aria-label="Inspiration images"
            style={{ height: CARD_H, scrollBehavior: "smooth" }}
          >
            <style>{`[data-mig]::-webkit-scrollbar{display:none;}`}</style>

            <ul className="flex gap-4 h-full min-w-max">
              {galleryImages.map(({ src, alt, to }, i) => (
                <li
                  key={i}
                  className="snap-start shrink-0 ring-1 ring-black/10 bg-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ width: CARD_W, height: CARD_H }}
                >
                  <Link to={to} className="block w-full h-full overflow-hidden">
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chevrons */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-1)}
            className="group absolute left-3 md:left-4 lg:left-5 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A941]/40 disabled:opacity-40 disabled:cursor-default"
            disabled={atStart}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
              <path d="M15 5L8 12l7 7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            aria-label="Scroll right"
            onClick={() => scrollByAmount(1)}
            className="group absolute right-5 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A941]/40 disabled:opacity-40 disabled:cursor-default"
            disabled={atEnd}
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
