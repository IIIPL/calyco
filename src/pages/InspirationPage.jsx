import { Link, useNavigate } from "react-router-dom";

/* ── Brand tokens (match HomeFinal / BudgetCalculator exactly) ───────────── */
const GOLD   = '#F0C85A';
const PURPLE = '#493657';

const ROOMS = [
  {
    title: "Living Room", slug: "living", designs: 118,
    desc: "Transform your main living space with stunning design",
    thumbnail: "/real project section/inspration/i1.webp",
  },
  {
    title: "Bedroom", slug: "bedroom", designs: 111,
    desc: "Design a peaceful sanctuary for rest and relaxation",
    thumbnail: "/Assets/Inspiration/bedroom.webp",
  },
  {
    title: "Dining Room", slug: "dining", designs: 40,
    desc: "Set the perfect mood for memorable meals",
    thumbnail: "/real project section/inspration/i5.webp",
  },
  {
    title: "Kitchen", slug: "kitchen", designs: 22,
    desc: "Create a kitchen that inspires cooking and gathering",
    thumbnail: "/Assets/Inspiration/IMG-20250718-WA0043.webp",
  },
  {
    title: "Hallway", slug: "hallway", designs: 28,
    desc: "Make a lasting first impression with elegant corridors",
    thumbnail: "/real project section/inspration/i4.webp",
  },
  {
    title: "Bathroom", slug: "bathroom", designs: 1,
    desc: "Refresh your bathroom with spa-like tranquility",
    thumbnail: "/Assets/u7859757176_Modern_luxury_bathroom_with_high_clerestory_windo_4f1ad61e-d8af-4e9c-bb17-4066db021cef_2.webp",
  },
];

const Eyebrow = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="block w-10 h-px" style={{ background: GOLD }} />
    <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PURPLE }}>{text}</span>
  </div>
);

export default function InspirationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* ── Header — editorial, matches HomeFinal ─────────────────────────── */}
      <section className="bg-white border-b border-[#0F1221]/6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-[11px] text-[#0F1221]/30 font-light mb-5">
            <Link to="/" className="hover:text-[#493657] transition-colors">Home</Link>
            <span>/</span>
            <span>Inspirations</span>
          </div>
          <Eyebrow text="Design Inspiration" />
          <h1 className="text-[2rem] sm:text-[2.8rem] font-light text-[#0F1221] tracking-[-0.02em] leading-[1.12] mb-3">
            Find the perfect look<br />
            <span style={{ color: PURPLE }}>for every room.</span>
          </h1>
          <p className="text-[#0F1221]/45 text-[14px] font-light leading-relaxed max-w-md mb-5">
            Curated colour combinations and design ideas from real Calyco projects — pick a room to explore.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Curated collections', 'Expert colour palettes', 'Real room examples'].map(b => (
              <span key={b} className="inline-flex items-center gap-1.5 text-[11px] font-light text-[#0F1221]/55 bg-[#FAFAF8] border border-[#0F1221]/8 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} />
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Room grid ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {ROOMS.map((room) => (
            <button
              key={room.slug}
              type="button"
              onClick={() => navigate(`/inspirations/${room.slug}`)}
              className="group relative text-left overflow-hidden rounded-2xl sm:rounded-3xl focus:outline-none"
              style={{ aspectRatio: '4/3.4' }}
            >
              <img
                src={room.thumbnail}
                alt={room.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                loading="lazy"
                draggable="false"
              />
              {/* Consistent ink gradient — strong only behind text */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(15,18,33,0.88) 0%, rgba(15,18,33,0.45) 30%, rgba(15,18,33,0.05) 55%, transparent 100%)',
              }} />

              {/* Design count pill */}
              <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-[0.16em] rounded-full px-2.5 py-1 backdrop-blur-sm bg-[#0F1221]/40 text-white/75 border border-white/15">
                {room.designs} {room.designs === 1 ? 'design' : 'designs'}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-[1.5px] rounded-full flex-shrink-0" style={{ background: GOLD }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                    Explore palettes
                  </span>
                </div>
                <h2 className="text-white font-semibold text-[18px] sm:text-[20px] leading-tight tracking-tight mb-1">
                  {room.title}
                </h2>
                <p className="text-white/55 text-[11px] sm:text-[12px] leading-snug mb-3 max-w-[280px]">
                  {room.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white transition-all duration-200 group-hover:gap-2.5 group-hover:text-[#F0C85A]">
                  Explore {room.title.toLowerCase()}
                  <span className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: GOLD }}>→</span>
                </span>
              </div>

              {/* Hover ring */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1.5px ${GOLD}66, 0 24px 64px 0 rgba(15,18,33,0.35)` }} />
            </button>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA — brand editorial band ─────────────────────────────── */}
      <section className="bg-[#0F1221]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-px" style={{ background: GOLD }} />
                <p className="text-[10px] font-black uppercase tracking-[0.28em]" style={{ color: GOLD }}>Ready to transform?</p>
              </div>
              <p className="text-white text-xl sm:text-3xl font-light tracking-[-0.015em] max-w-md leading-snug">
                Found a look you love?<br />Let&apos;s bring it to your walls.
              </p>
            </div>
            <div className="flex gap-2.5 sm:gap-3 flex-wrap w-full sm:w-auto">
              <Link to="/colors"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-bold hover:bg-white transition-colors shadow-lg">
                Browse Colours →
              </Link>
              <Link to="/get-quote"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white/85 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold hover:bg-white/10 transition-colors">
                Get Expert Advice
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
