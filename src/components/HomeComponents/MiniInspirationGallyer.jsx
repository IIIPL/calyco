// src/components/MiniInspirationGallery.jsx
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
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
    return uniq.slice(0, 12); // a bit more room for wider screens
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
    // bigger step on large screens, smaller on phones
    const step = Math.round(el.clientWidth * (window.innerWidth < 640 ? 0.6 : 0.8));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") scrollByAmount(1);
    if (e.key === "ArrowLeft") scrollByAmount(-1);
  };

  // responsive card sizing + consistent aspect
  const CARD_W = `clamp(200px, 60vw, ${cardWidth}px)`;
  const CARD_H = `clamp(180px, 42vw, ${height + 60}px)`;
  const SECTION_H = 80 + Math.min(height, 280); // taller default for all breakpoints

  return (
    <section className="w-full py-4 sm:py-6" style={{ minHeight: SECTION_H }}>
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(200px,28%)_1fr] lg:grid-cols-[minmax(240px,26%)_1fr] gap-4 sm:gap-6 md:gap-8 items-stretch">
          {/* LEFT title (wraps nicely, never overlaps) */}
          <div className="flex items-center justify-start">
            <h2 className="leading-[0.95] text-left">
              <span className="block uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1b1330]">
                {title.split(" ")[0] || "INSPIRATION"}
              </span>
              <span className="block uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1b1330]">
                {title.split(" ")[1] ? title.split(" ").slice(1).join(" ") : "GALLERY"}
              </span>
            </h2>
          </div>

          {/* RIGHT: carousel */}
          <div className="relative min-w-0">
            {/* gradients kept narrow on mobile, wider on desktop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-white to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 md:w-20 bg-gradient-to-l from-white to-transparent"
            />

            <div
              ref={trackRef}
              data-mig
              className="relative w-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] px-10 sm:px-12 md:px-16 lg:px-24"
              onKeyDown={onKeyDown}
              tabIndex={0}
              aria-label="Inspiration images"
              style={{ scrollBehavior: "smooth" }}
            >
              <style>{`[data-mig]::-webkit-scrollbar{display:none;}`}</style>

              <ul className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2 select-none touch-pan-x perspective-1000"
                style={{ height: CARD_H, transformStyle: 'preserve-3d' }}
              >
                {galleryImages.map(({ src, alt, to }, i) => {
                  // Calculate 3D effect based on position
                  const totalItems = galleryImages.length;
                  const centerIndex = Math.floor(totalItems / 2);
                  const distanceFromCenter = Math.abs(i - centerIndex);
                  const maxDistance = Math.floor(totalItems / 2);
                  
                  // Scale and opacity based on distance from center
                  const scale = Math.max(0.6, 1 - (distanceFromCenter / maxDistance) * 0.4);
                  const opacity = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7);
                  const translateZ = -distanceFromCenter * 20; // 3D depth
                  const translateY = distanceFromCenter * 5; // Slight upward movement for depth
                  
                  return (
                    <li
                      key={i}
                      className="snap-start shrink-0 min-w-fit rounded-2xl ring-1 ring-black/10 bg-white shadow-sm hover:shadow-md transition-all duration-500 ease-out"
                      style={{ 
                        height: CARD_H,
                        transform: `perspective(1000px) scale(${scale}) translateZ(${translateZ}px) translateY(${translateY}px)`,
                        opacity: opacity,
                        filter: `blur(${distanceFromCenter * 0.5}px)`,
                        zIndex: totalItems - distanceFromCenter
                      }}
                    >
                      <Link
                        to={to}
                        className="w-full h-full rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A941]/50 flex items-center justify-center"
                      >
                        <img
                          src={src}
                          alt={alt}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-auto object-contain"
                          sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 260px"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Chevrons (kept off the title, responsive hit area) */}
            <button
              aria-label="Scroll left"
              onClick={() => scrollByAmount(-1)}
              className="group absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 backdrop-blur shadow ring-1 ring-black/10 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A941]/40 disabled:opacity-40 disabled:cursor-default disabled:pointer-events-none"
              disabled={atStart}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                <path d="M15 5L8 12l7 7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              aria-label="Scroll right"
              onClick={() => scrollByAmount(1)}
              className="group absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 rounded-full bg-white/70 backdrop-blur shadow ring-1 ring-black/10 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A941]/40 disabled:opacity-40 disabled:cursor-default disabled:pointer-events-none"
              disabled={atEnd}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                <path d="M9 5l7 7-7 7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
