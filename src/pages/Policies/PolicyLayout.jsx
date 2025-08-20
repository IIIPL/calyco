import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Crumb = ({ children }) => (
  <span className="text-sm text-gray-500">{children}</span>
);

const MetaPill = ({ label }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 px-2.5 py-1 text-xs">
    {label}
  </span>
);

export default function PolicyLayout({
  title = "Privacy Policy",
  lastUpdated = "—",
  children,
}) {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [progress, setProgress] = useState(0);

  // Slugify util
  const slug = useCallback((s) => {
    return s
      .toLowerCase()
      .replace(/[^\w]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }, []);

  // Assign ids, collect h2s
  useEffect(() => {
    const h2Els = Array.from(document.querySelectorAll("article h2"));
    const used = new Set();
    const list = h2Els.map((el) => {
      let id = el.id || slug(el.innerText);
      const base = id;
      let i = 2;
      while (used.has(id)) id = `${base}-${i++}`;
      used.add(id);
      el.id = id;
      return { id, text: el.innerText };
    });
    setHeadings(list);
  }, [children, slug]);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      const h =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (st / h) * 100)) : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section highlighting (scrollspy)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible heading near the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -70% 0px", // triggers when heading enters upper viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    const h2Els = document.querySelectorAll("article h2");
    h2Els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  // Smooth scroll for TOC clicks
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const HEADER_OFFSET = window.innerWidth >= 768 ? 112 : 96; // md:pt-28 vs pt-24
      const top = window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET - 8;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActiveId(id);
    // Add hash without jumping
    window.history.replaceState(null, "", `#${id}`);
  };

  // Memoized progress style
  const progressStyle = useMemo(
    () => ({ height: `${progress}%` }),
    [progress]
  );

  return (
    <div className="min-h-screen bg-white mx-3 scroll-smooth">
      <div className="pt-24 md:pt-28" />
      <div className="mx-auto px-5 md:px-8 max-w-7xl flex gap-8">
        {/* Left TOC */}
        <aside
          className="
            hidden lg:block lg:w-72 shrink-0
          "
          aria-label="On this page"
        >
          <div
            className="
              sticky top-28 pb-6
              max-h-[calc(100vh-8rem)] overflow-auto
              rounded-xl border border-gray-100 bg-white/70 backdrop-blur
              px-4 py-4
            "
          >
            {/* Progress rail */}
            <div className="relative pl-4">
              <div className="absolute left-0 top-0 h-full w-1 rounded-full bg-gray-200" />
              <div
                className="
                  absolute left-0 w-1 rounded-full bg-gradient-to-b from-[#7b5fc6] to-[#493657]
                  transition-[height] duration-300 ease-out
                "
                style={progressStyle}
              />
              <p className="text-xs font-semibold text-gray-700 mb-3 tracking-wider">
                ON THIS PAGE
              </p>
              <ul className="space-y-1 text-xs"> {/* was space-y-1.5 text-sm */}
                {headings.map((h) => {
                  const active = activeId === h.id;
                  return (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => handleTocClick(e, h.id)}
                        className={[
                          "block rounded-md px-2 py-1 transition-colors duration-200", // was py-1.5
                          active
                            ? "text-[#493657] bg-[#f3effc] font-semibold"
                            : "text-gray-600 hover:text-[#493657] hover:bg-gray-50",
                        ].join(" ")}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>

            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-2 text-sm"
          >
            <Link
              to="/"
              className="underline text-[#493657] transition-colors duration-200 hover:text-[#2c2240]"
            >
              Home
            </Link>
            <Crumb>›</Crumb>
            <Link
              to="/policies"
              className="underline text-[#493657] transition-colors duration-200 hover:text-[#2c2240]"
            >
              Policies
            </Link>
            <Crumb>›</Crumb>
            <Crumb>{title}</Crumb>
          </nav>

          {/* Hero */}
          <header className="mb-6 w-full rounded-2xl border border-gray-100 bg-gradient-to-br from-[#f7f5fb] to-white px-6 py-7 md:px-10 md:py-10">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2c2240]">
              {title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <MetaPill label={`Last updated: ${lastUpdated}`} />
              <MetaPill label="CALYCO Policies" />
            </div>
          </header>

          {/* Content */}
          <main className="pb-24">
            <article
              className="
                prose prose-neutral prose-sm md:prose-base max-w-none text-[#2c2240] space-y-6
                prose-h2:text-[#2c2240] prose-h2:font-black prose-h2:text-2xl md:prose-h2:text-3xl
                prose-h2:tracking-wide prose-h2:border-b prose-h2:border-gray-300 prose-h2:pb-1 prose-h2:mt-12
                prose-h2:scroll-mt-28 md:prose-h2:scroll-mt-32
                prose-p:leading-7
                transition-colors duration-200
              "
            >
              {children}
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
