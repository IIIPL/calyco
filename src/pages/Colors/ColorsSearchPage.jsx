// pages/ColorsSearchPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { flatColors } from "../../data/flatColors";
import ColorBox from "../../components/ColorComponents/ColorBox";
import { BuyNowDrawer } from "../../components/BuyNowDrawer";

const slugify = (text) =>
  text?.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-&]+/g, "").replace(/\-\-+/g, "-");

const norm = (s) => (s || "").toLowerCase().trim();

export default function ColorsSearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const q = norm(params.get("query"));
  const [term, setTerm] = useState(params.get("query") || "");

  // Drawer state
  const [showDrawer, setShowDrawer] = useState(false);
  const [buyColor, setBuyColor] = useState(null);

  useEffect(() => {
    if (q) document.title = "Search results for " + q;
  }, [q]);

  const results = useMemo(() => {
    if (!q) return [];

    const terms = q.split(/\s+/).filter(Boolean);
    const _norm = (s) => (s || "").toLowerCase().trim();
    const cleanHex = (h) => _norm(h).replace(/^#/, "");
    const expand3 = (h) => (h.length === 3 ? h.split("").map((ch) => ch + ch).join("") : h);

    return flatColors.filter((c) => {
      const name = _norm(c.name ?? c.color_name);
      const fam = _norm(c.color_family ?? c.family ?? "");
      const code = _norm(c.code ?? c.id ?? "");
      const desc = _norm(c.description ?? "");
      const hexFull = cleanHex(c.hex ?? "");
      const hexExpand = expand3(hexFull);

      return terms.every((t) => {
        const tNorm = _norm(t);
        const tHex = expand3(cleanHex(tNorm));
        return (
          name.includes(tNorm) ||
          fam.includes(tNorm) ||
          code.includes(tNorm) ||
          desc.includes(tNorm) ||
          hexFull.includes(tHex) ||
          hexExpand.includes(tHex)
        );
      });
    });
  }, [q]);

  // Open with a 2-RAF tick so the drawer mounts "closed" then animates in
  const handleOpenDrawer = (c) => {
    if (!c) return;
    setBuyColor({
      name: c.name || "",
      hex: c.hex || "#301A44",
      description: c.description || "",
      color_family: c.color_family || c.family || "",
    });
    setShowDrawer(false); // ensure initial closed state on mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShowDrawer(true)); // then animate to open
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 lg:px-24 pt-28 pb-16">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#493657]">
            Search results{q ? ` for "${params.get("query")}"` : ""}
          </h1>
          <Link to="/colors" className="text-[#493657] hover:text-[#F0C85A] underline">
            Browse all colors
          </Link>
        </div>

        {/* Search row */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const next = term.trim();
            if (!next) return;
            navigate(`/colors/search?query=${encodeURIComponent(next)}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mb-6 flex justify-stretch md:justify-end"
          role="search"
          aria-label="Search colors"
        >
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search color name, family, code or hex…"
              className="h-10 w-full md:w-64 lg:w-80 rounded-lg border border-[#e5e0d8] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0C85A] focus:border-transparent"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-lg bg-[#301A44] text-white text-sm font-semibold hover:bg-[#493657] transition"
            >
              Search
            </button>
          </div>
        </form>

        {!q && <div className="text-[#493657]/70">Type a search term above.</div>}
        {q && results.length === 0 && (
          <div className="text-[#493657]/70">No matching colors found. Try another name, family, or hex.</div>
        )}

        {results.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {results.map((c) => (
                <ColorBox
                  key={`${c.color_family || c.family}-${c.name || c.color_name}-${c.hex}`}
                  color={{
                    name: c.name ?? c.color_name,
                    hex: c.hex,
                    description: c.description || "",
                    color_family: c.color_family || c.family || "",
                    image: c.image,
                  }}
                  familyName={c.color_family || c.family || "colors"}
                  onOpenDrawer={handleOpenDrawer}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Keep mounted so exit animation plays */}
      {buyColor && (
        <BuyNowDrawer
          isOpen={showDrawer}
          onClose={() => {
            setShowDrawer(false);
            setTimeout(() => setBuyColor(null), 520); // match 500ms transition in drawer
          }}
          currentColor={buyColor}
        />
      )}
    </div>
  );
}
