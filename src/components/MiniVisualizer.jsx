// src/components/MiniVisualizer.jsx
import { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-&]+/g, "") // Remove all non-word chars EXCEPT hyphens and '&'
    .replace(/\-\-+/g, "-"); // Collapse multiple hyphens

const MINI_ROOMS = [
  {
    key: "living-room-1",
    title: "Living room 1",
    imageFallback:
      "https://res.cloudinary.com/dr98axi2n/image/upload/v1754831770/sky_blue_indigo_twilight_bbiqpk.jpg",
    mask: "polygon(5% 35%, 95% 25%, 95% 95%, 5% 95%)",
    combos: [
      {
        label: "Sky Blue + Indigo Twilight",
        colors: ["Sky Blue", "Indigo Twilight"],
        hex: "#9cccf2",
        image:
          "https://res.cloudinary.com/dr98axi2n/image/upload/v1754831770/sky_blue_indigo_twilight_bbiqpk.jpg",
      },
      {
        label: "Jade Mist + Forest Olive",
        colors: ["Jade Mist", "Forest Olive"],
        hex: "#b9d1c0",
        image:
          "https://res.cloudinary.com/dr98axi2n/image/upload/v1754846366/jade_mist_forest_olive_kfbbs0.jpg",
      },
      {
        label: "Mauve Shadow",
        colors: ["Mauve Shadow"],
        hex: "#c9a3b6",
        image:
          "https://res.cloudinary.com/dr98axi2n/image/upload/v1754846371/mauve_shadow_eymk7s.jpg",
      },
    ],
  },
];

export default function MiniVisualizer() {
  const navigate = useNavigate();
  const rooms = useMemo(() => MINI_ROOMS, []);
  const [roomIdx] = useState(0);
  const [comboIdx, setComboIdx] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const room = rooms[roomIdx];
  const combo = room?.combos?.[comboIdx] ?? room?.combos?.[0];
  if (!room || !combo) return null;

  useEffect(() => {
    setIsImageLoading(true);
    setImgError(false);
  }, [comboIdx, roomIdx]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 mb-20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#493657]">
          Try Colors Instantly
        </h2>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to={`/room-visualization?room=${room.key}&colors=${encodeURIComponent(
              combo.colors.join(",")
            )}`}
            className="px-4 py-2 rounded-xl bg-[#493657] text-white font-semibold"
          >
            Try Full Visualizer
          </Link>
          <Link
            to="/inspirations/living"
            className="px-4 py-2 rounded-xl bg-[#F0C85A] text-[#493657] font-semibold"
          >
            Explore Inspiration
          </Link>
        </div>
      </div>

      {/* room selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {rooms.map((r, i) => (
          <button
            key={r.key}
            onClick={() => navigate(`room/${slugify(r.title)}`)}
            className={`px-3 py-1.5 rounded-lg text-sm border ${
              i === roomIdx
                ? "bg-[#F0C85A] border-[#F0C85A] text-[#493657]"
                : "bg-white border-gray-200 text-[#493657]"
            }`}
            title={r.title}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* preview */}
        <div className="relative overflow-hidden shadow-xl border border-black/5 bg-white">
          {/* Spinner while loading (no fallback image) */}
          {isImageLoading && (
            <div className="absolute inset-0 grid place-items-center bg-white/70 z-10">
              <div className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-[#493657] animate-spin" />
              <span className="sr-only">Loading colors…</span>
            </div>
          )}

          {/* Optional tiny error badge */}
          {!isImageLoading && imgError && (
            <div className="absolute top-2 left-2 z-10 bg-red-50 text-red-700 text-xs px-2 py-1 rounded">
              Couldn’t load image
            </div>
          )}

          <img
            src={combo.image}
            alt={room.title}
            width="900"
            height="600"
            loading="eager"
            className={`w-full h-auto select-none transition-opacity duration-300 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              // If it fails, show fallback image and end loading state
              e.currentTarget.src = room.imageFallback;
              setIsImageLoading(false);
              setImgError(true);
            }}
          />
        </div>

        {/* controls: big circles with name below */}
        <div>
          <p className="text-[#493657]/80 mb-3">Pick a combo:</p>
          <div className="flex flex-wrap gap-6">
            {room.combos.map((c, i) => (
              <button
                key={c.label}
                onClick={() => setComboIdx(i)}
                className="group flex flex-col items-center"
                title={c.label}
              >
                <span
                  className={`w-14 h-14 rounded-full border-2 transition-all ${
                    comboIdx === i ? "ring-2 ring-black" : "border-white shadow"
                  }`}
                  style={{ background: c.hex }}
                />
                <span
                  className={`mt-2 text-xs text-[#493657] text-center w-28 leading-snug ${
                    comboIdx === i ? "underline" : ""
                  }`}
                >
                  {c.label}
                </span>
              </button>
            ))}
          </div>

          {/* mobile buttons */}
          <div className="mt-6 flex md:hidden items-center gap-2">
            <Link
              to={`/room-visualization?room=${room.key}&colors=${encodeURIComponent(
                combo.colors.join(",")
              )}`}
              className="px-4 py-2 rounded-xl bg-[#493657] text-white font-semibold"
            >
              Try Full Visualizer
            </Link>
            <Link
              to="/inspirations"
              className="px-4 py-2 rounded-xl bg-[#F0C85A] text-[#493657] font-semibold"
            >
              Explore Inspiration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
