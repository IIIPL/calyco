import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence
} from 'framer-motion';
import SEO from '../components/SEO';
import ReviewsSection from '../components/ReviewsSection';
import { serviceHubCards } from '../data/servicePricing';
import { BRAND_NAME } from '../data/positioning';
import contactData from '../data/admin/contact.json';

/* ── Service card image slideshow ──────────────────────────────────────────────
   Cycles through images[] every 2 s with a smooth crossfade.
   Staggered start via `offset` so all 6 cards don't flip in sync.
────────────────────────────────────────────────────────────────────────────── */
const ServiceCardImage = ({ images = [], title, offset = 0 }) => {
  const [idx, setIdx] = useState(0);
  const [ready, setReady] = useState(false);

  // Stagger initial delay so cards don't all change at once
  useEffect(() => {
    if (images.length <= 1) { setReady(true); return; }
    const init = setTimeout(() => {
      setReady(true);
    }, offset * 400);
    return () => clearTimeout(init);
  }, [images.length, offset]);

  useEffect(() => {
    if (!ready || images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [ready, images.length]);

  const src = images[idx] ?? images[0];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={src}
          src={src}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          loading="eager"
        />
      </AnimatePresence>

      {/* Subtle progress dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {images.map((_, i) => (
            <span key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:   i === idx ? 14 : 4,
                height:  4,
                background: i === idx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ── Image paths (shared across sections) ───────────────────────────────────────
const IMG_HERO    = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_18_13 PM.png');
const IMG_PAINTER = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_00_24 PM.png');
const IMG_CONSULT = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_11_55 PM.png');

const WA_BASE = contactData?.contact?.whatsapp?.link ?? 'https://wa.me/918796777399';

// ── Shared SVG icons ───────────────────────────────────────────────────────────
const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

const WaIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ArrowRight = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const Star = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 20 20"><path d={STAR_PATH} /></svg>
);

const Stars = ({ size = 'w-3 h-3' }) => (
  <div className="flex gap-1">{[...Array(5)].map((_, i) => <Star key={i} cls={`${size} text-[#F0C85A]`} />)}</div>
);

// ── Animated counters ──────────────────────────────────────────────────────────
const CounterFull = ({ to, suffix = '', duration = 1800 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = to / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= to) { setVal(to); clearInterval(interval); }
      else setVal(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [inView, to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
};

const CounterK = ({ to, label }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const step = (to / 1800) * 16;
    const t = setInterval(() => {
      v += step;
      if (v >= to) { setN(to); clearInterval(t); } else setN(Math.floor(v));
    }, 16);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{n >= 1000 ? Math.floor(n / 1000) + 'K' : n}{label}</span>;
};

// ── Shared layout primitives ───────────────────────────────────────────────────
const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Reveal = ({ children, delay = 0, y = 32, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ text, dark = false }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-[#F0C85A]" />
    <span className={`text-[10px] font-bold uppercase tracking-[0.25em] ${dark ? 'text-[#F0C85A]' : 'text-[#493657]'}`}>{text}</span>
  </div>
);

const LineReveal = ({ inView, delay = 0, className = '' }) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={inView ? { scaleX: 1 } : {}}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: 'left' }}
    className={`block h-px ${className}`}
  />
);

// ══════════════════════════════════════════════════════════════════
//  1 — HERO  (V4 split layout + V2 inline lead-capture form, V4 CTAs)
// ══════════════════════════════════════════════════════════════════
const LINES = ['Calyco', '5-Star', 'Painting', 'Service'];

const HeroFinal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollImgY     = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const scrollTextY    = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const sectionOpacity = useTransform(scrollYProgress, [0.45, 0.95], [1, 0]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { damping: 26, stiffness: 175, mass: 0.8 };
  const smX = useSpring(rawX, springCfg);
  const smY = useSpring(rawY, springCfg);

  const imgX    = useTransform(smX, [-1, 1], [-12, 12]);
  const imgY    = useTransform(smY, [-1, 1], [-8,  8]);
  const testX   = useTransform(smX, [-1, 1], [-20, 20]);
  const testY   = useTransform(smY, [-1, 1], [-14, 14]);
  const ratingX = useTransform(smX, [-1, 1], [-26, 26]);
  const ratingY = useTransform(smY, [-1, 1], [-18, 18]);
  const badgeX  = useTransform(smX, [-1, 1], [-34, 34]);
  const badgeY  = useTransform(smY, [-1, 1], [-24, 24]);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  * 2 - 1);
    rawY.set((e.clientY - rect.top)  / rect.height * 2 - 1);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  // ── Inline lead-capture form — continues into /get-quote with name + phone prefilled
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '' });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 10) return;
    navigate('/get-quote', { state: { name: form.name.trim(), phone: form.phone.trim() } });
  };

  return (
    <motion.section
      ref={ref}
      style={{ opacity: sectionOpacity }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="min-h-screen bg-[#FAFAF8] flex overflow-hidden relative"
    >
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden gap-[1.5vw]">
        <span className="text-[30vw] font-black text-[#0F1221]/[0.05] leading-none tracking-tighter">5</span>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20vw] h-[20vw] text-[#0F1221]/[0.05] shrink-0">
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
        </svg>
      </div>

      {/* ── Left column ────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: scrollTextY }}
        className="relative z-10 w-full lg:w-[54%] flex items-center px-6 sm:px-10 lg:px-20 xl:px-28 py-28 lg:py-0 min-h-screen"
      >
        <div className="w-full max-w-lg">

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-9 h-px bg-[#F0C85A]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">
              India&apos;s Trusted Painting Experts
            </span>
          </motion.div>

          <h1 className="mb-7">
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden leading-[1.07]">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.22 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  className={`block font-light tracking-[-0.025em] text-[2.6rem] sm:text-[3.3rem] lg:text-[3.8rem] xl:text-[4.3rem] ${
                    i === LINES.length - 1 ? 'text-[#493657]' : 'text-[#0F1221]'
                  }`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#0F1221]/48 text-base sm:text-[1.05rem] font-light leading-relaxed mb-10 max-w-[420px]"
          >
            Professional house painters you can count on —<br className="hidden sm:block" />
            verified teams, fixed quotes, and a warranty-backed finish.
          </motion.p>

          {/* Inline lead-capture form — restyled for the light hero theme */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 mb-9 max-w-[460px]"
          >
            <div className="rounded-2xl border border-[#0F1221]/8 bg-white shadow-[0_10px_40px_rgba(15,18,33,0.07)] p-4 sm:p-5">
              <p className="text-[#0F1221] font-bold text-xs sm:text-sm mb-3 sm:mb-4">Get a Free Site Inspection</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text" placeholder="Your name" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="flex-1 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-xl px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:border-[#F0C85A] transition-colors"
                />
                <input
                  type="tel" inputMode="numeric" placeholder="Phone number" maxLength={10} required value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                  className="flex-1 bg-[#FAFAF8] border border-[#0F1221]/10 rounded-xl px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:border-[#F0C85A] transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-shrink-0 flex items-center justify-center gap-1.5 bg-[#0F1221] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#493657] transition-colors"
                >
                  Book <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap gap-2"
          >
            {['4.8★ Rated', '2-Year Warranty', 'Fixed Quote', '15K+ Homes'].map((t) => (
              <span key={t} className="text-[9px] font-semibold text-[#0F1221]/38 border border-[#0F1221]/10 rounded-full px-3 py-1 tracking-wide">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right column ──────────────────────────────────────────────── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[48%] overflow-hidden">
        <motion.div style={{ y: scrollImgY }} className="absolute inset-0">
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-[5%]">
              <img
                src={IMG_HERO}
                alt="Calyco painting service"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/30 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0F1221]/70 via-[#0F1221]/25 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-10 right-8 z-20"
        >
          <motion.div style={{ x: badgeX, y: badgeY }}>
            <div className="bg-[#493657] text-white rounded-2xl px-5 py-4 shadow-2xl shadow-[#493657]/30">
              <div className="text-[1.85rem] font-black leading-none tracking-tight mb-0.5">
                15K<span className="text-[#F0C85A]">+</span>
              </div>
              <div className="text-[10px] font-semibold text-white/55 tracking-wide">Homes Painted</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 left-6 z-20"
        >
          <motion.div style={{ x: ratingX, y: ratingY }}>
            <div className="bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-xl border border-white/50">
              <Stars size="w-3 h-3" />
              <div className="text-sm font-black text-[#0F1221] mt-2 leading-none">4.8 <span className="font-light text-[#0F1221]/40 text-xs">/ 5.0</span></div>
              <div className="text-[9px] text-[#0F1221]/40 font-light mt-1 uppercase tracking-[0.12em]">Customer Rating</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-8 left-8 z-20"
        >
          <motion.div style={{ x: testX, y: testY }}>
            <div className="w-[300px] bg-white/90 backdrop-blur-md rounded-2xl p-[18px] shadow-2xl border border-white/40">
              <p className="text-[11px] text-[#0F1221]/62 font-light italic leading-relaxed mb-3">
                "Best painting job we've ever had. Clean work, on time, and the 2-year warranty gave us total peace of mind."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#493657] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">R</div>
                  <div>
                    <div className="text-[11px] font-bold text-[#0F1221] leading-none mb-0.5">Rakesh M.</div>
                    <div className="text-[9px] text-[#0F1221]/35">Mumbai · Interior Painting</div>
                  </div>
                </div>
                <Stars size="w-2.5 h-2.5" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  2 — MARQUEE  (V4)
// ══════════════════════════════════════════════════════════════════
const MARQUEE_ITEMS = [
  'Verified Painters', '2-Year Warranty', 'Fixed Price Quote',
  '25+ Cities', '15,000+ Homes', '4.8★ Customer Rating',
  'Free Site Visit', 'No Hidden Charges', 'Premium Paint Brands',
];

const MarqueeFinal = () => (
  <section className="bg-[#0F1221] py-3.5 overflow-hidden border-y border-white/5">
    <style>{`
      @keyframes finalMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .final-marquee { animation: finalMarquee 28s linear infinite; }
      .final-marquee:hover { animation-play-state: paused; }
    `}</style>
    <div className="flex whitespace-nowrap final-marquee">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4 mx-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <span className="w-1 h-1 rounded-full bg-[#F0C85A] flex-shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  3 — SERVICES  (V2 — 6-card grid with live pricing)
// ══════════════════════════════════════════════════════════════════
const ServicesFinal = () => (
  <section className="bg-[#F7F6F3] py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <Reveal>
          <Eyebrow text="What We Do" />
          <h2 className="text-4xl sm:text-5xl font-light text-[#0F1221] leading-[1.08] tracking-[-0.025em]">
            Our Painting<br /><span className="font-semibold text-[#493657]">Services.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/services" className="text-sm text-[#0F1221]/40 hover:text-[#0F1221] transition-colors font-medium">
            View all services →
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {serviceHubCards.slice(0, 6).map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.07}>
            <TiltCard className="h-full">
              <Link
                to={`/services/${s.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-[#0F1221]/8 bg-white h-full hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500"
              >
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <ServiceCardImage
                    images={s.images ?? [s.image]}
                    title={s.title}
                    offset={i}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-3 right-3 bg-[#0F1221] text-white text-xs font-bold px-3.5 py-2 rounded-full z-10"
                  >
                    ₹{s.startingPrice}/sqft
                  </motion.span>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <h3 className="text-[#0F1221] font-semibold text-sm group-hover:text-[#493657] transition-colors duration-300">{s.title}</h3>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="w-8 h-8 rounded-full bg-[#493657]/8 flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-[#493657]" />
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#493657]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex gap-3">
        <Link to="/get-quote"
          className="inline-flex items-center gap-2 bg-[#0F1221] text-white px-5 py-3 sm:px-7 sm:py-3.5 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors"
        >
          Get Free Estimate
        </Link>
        <Link to="/services"
          className="inline-flex items-center gap-2 border border-[#0F1221]/15 text-[#0F1221]/55 px-5 py-3 sm:px-7 sm:py-3.5 rounded-full text-sm font-medium hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-all"
        >
          All Services →
        </Link>
      </Reveal>

    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  4 — STATS  (V4 — oversized typography, 2-Year Warranty)
// ══════════════════════════════════════════════════════════════════
const STATS = [
  { to: 15, label: 'K+', sub: 'Homes Painted',  desc: 'Happy families across India' },
  { to: 25, label: '+',  sub: 'Cities Covered', desc: 'Pan-India service network' },
  { to: 3,  label: 'K+', sub: 'Colour Options', desc: 'To suit every taste' },
  { to: 2,  label: '-Yr', sub: 'Warranty',      desc: 'On all painting work' },
];

const StatsFinal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-[#FAFAF8] border-b border-[#0F1221]/6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#0F1221]/8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.sub}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="px-5 sm:px-8 lg:px-12 py-8 sm:py-11 group hover:bg-[#F0EDE8]/50 transition-colors duration-300"
            >
              <div className="text-[2.5rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[4.6rem] font-black text-[#0F1221] leading-none tracking-tight mb-3 group-hover:text-[#493657] transition-colors duration-300">
                <CounterK to={s.to} label={s.label} />
              </div>
              <div className="w-9 h-[2px] bg-[#F0C85A] mb-3 group-hover:w-16 transition-all duration-500" />
              <div className="text-sm font-bold text-[#0F1221]/70 mb-1">{s.sub}</div>
              <div className="text-xs text-[#0F1221]/35 font-light">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  5 — PROCESS  (V4 — 4-step zigzag timeline, scroll-linked line)
// ══════════════════════════════════════════════════════════════════
const PROCESS_STEPS = [
  { num: '01', title: 'Initial Assessment',  desc: 'Our expert visits your home, assesses surface conditions, understands your style preferences, and takes measurements — all at zero cost.', time: '30–45 min' },
  { num: '02', title: 'Colour Suggestion',   desc: 'We recommend the perfect shades, finishes, and paint brands based on your space, lighting, and lifestyle. Physical swatch samples included.', time: '1–2 hours' },
  { num: '03', title: 'Fixed Quote & Planning', desc: 'A fully transparent, itemised quote with no hidden costs. Materials, labour, and timeline — all confirmed before work begins.', time: '24 hours' },
  { num: '04', title: 'Expert Painting',     desc: 'Verified, background-checked painters execute the project with premium materials, clean processes, and daily progress updates.', time: '2–5 days' },
];

const ProcessStepFinal = ({ step, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLeft = i % 2 === 0;
  return (
    <div ref={ref} className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-[#0F1221]/6 last:border-b-0">
      {/* Center timeline dot — consistent on every row */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border-2 border-[#F0C85A] shadow-md"
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`py-10 lg:py-14 ${isLeft ? 'lg:pr-16 xl:pr-24' : 'lg:col-start-2 lg:pl-16 xl:pl-24'}`}
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <span className="text-[2.2rem] sm:text-[2.8rem] font-black text-[#0F1221]/7 leading-none shrink-0 mt-1">{step.num}</span>
          <div>
            <h3 className="text-lg font-bold text-[#0F1221] mb-2 leading-snug">{step.title}</h3>
            <p className="text-sm text-[#0F1221]/50 font-light leading-relaxed mb-3">{step.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#493657]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {step.time}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Empty alternating side — filled with a large echoed step number for premium editorial texture */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`hidden lg:flex items-center ${isLeft ? 'justify-start pl-16 xl:pl-24' : 'justify-end pr-16 xl:pr-24 lg:col-start-1 lg:row-start-1'}`}
      >
        <span className="text-[6rem] xl:text-[7.5rem] font-black text-[#0F1221]/[0.05] leading-none tracking-tighter select-none">
          {step.num}
        </span>
      </motion.div>
    </div>
  );
};

const ProcessFinal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start center', 'end center'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-[#F0C85A]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">Your Journey</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[2rem] sm:text-[2.8rem] font-light text-[#0F1221] tracking-[-0.015em] max-w-md leading-tight">
              From Planning to<br />Perfect Finish.
            </h2>
            <p className="text-sm text-[#0F1221]/40 font-light max-w-xs">
              A transparent 4-step process — we keep you informed at every stage.
            </p>
          </div>
          <LineReveal inView={inView} delay={0.3} className="bg-[#0F1221]/8 mt-8 w-full" />
        </motion.div>

        <div ref={lineRef} className="relative">
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[#0F1221]/8">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-[#F0C85A] to-[#493657] origin-top" />
          </div>
          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepFinal key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  6 — CONSULTATION SPLIT  (V4)
// ══════════════════════════════════════════════════════════════════
const ConsultationFinal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="bg-[#F7F6F3] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        <motion.div
          ref={imgRef}
          initial={{ opacity: 0, x: -44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden min-h-[480px] lg:min-h-[600px]"
        >
          <motion.img
            style={{ y: imgY }}
            src={IMG_CONSULT}
            alt="Expert consultation"
            className="absolute inset-0 w-full h-full object-cover object-right scale-110"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-8 bg-[#493657] text-white rounded-2xl px-5 py-4 shadow-2xl"
          >
            <div className="text-3xl font-black leading-none mb-0.5">4.8</div>
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} cls="w-3 h-3 text-[#F0C85A]" />)}
            </div>
            <div className="text-[10px] text-white/60 font-light">avg. rating</div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20"
        >
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-[#F0C85A]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">Expert Consultation</span>
            </div>
            <h2 className="text-[1.9rem] sm:text-[2.5rem] font-light text-[#0F1221] tracking-[-0.015em] leading-tight mb-4">
              Looking for Expert<br />Consultation?
            </h2>
            <p className="text-[#0F1221]/48 font-light text-base leading-relaxed mb-8">
              Our experts help you choose the perfect shade and finish. Free home visit, transparent quote, and 2-year workmanship warranty — at zero compromise.
            </p>

            <div className="space-y-3.5 mb-10">
              {[
                'Free home visit & surface assessment',
                'Personalised colour & finish guidance',
                'Transparent itemised quotation',
                '2-Year workmanship warranty',
                'Background-verified painters only',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-[#493657]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-[#493657]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm text-[#0F1221]/60 font-light">{item}</span>
                </div>
              ))}
            </div>

            <Link
              to="/get-quote"
              className="group inline-flex items-center gap-3 bg-[#0F1221] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors duration-300"
            >
              Book a Free Consultation Now
              <span className="w-6 h-6 rounded-full bg-white/12 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  7 — INSPIRATION GRID  (V4 — asymmetric layout)
// ══════════════════════════════════════════════════════════════════
const INSPO = [
  { title: 'Interior Colour Trends 2026', tag: 'Interior', tall: true, image: '/real project section/inspration/i1.webp' },
  { title: 'Choosing the Right Finish', tag: 'Tips', image: '/real project section/inspration/i3.webp' },
  { title: 'Exterior Paint That Lasts', tag: 'Exterior', image: '/real project section/inspration/i2.webp' },
  { title: 'Room-by-Room Colour Guide', tag: 'Colours', image: '/real project section/inspration/i6.webp' },
  { title: 'Texture vs Smooth: What\'s Right?', tag: 'Expert', image: '/real project section/inspration/i4.webp' },
];

const InspirationFinal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-px bg-[#F0C85A]" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">Inspirations</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-light text-[#0F1221] tracking-[-0.015em]">
              Featured Ideas
            </h2>
          </div>
          <Link to="/inspirations" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="row-span-2 col-span-1"
          >
            <Link to="/inspirations" className="group block h-full relative overflow-hidden rounded-2xl min-h-[320px] sm:min-h-[420px]">
              <img src={INSPO[0].image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/80 via-[#0F1221]/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#F0C85A] bg-[#0F1221]/60 backdrop-blur-sm px-3 py-1.5 rounded-full">{INSPO[0].tag}</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-2">
                <h3 className="text-base font-semibold text-white leading-snug">{INSPO[0].title}</h3>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F0C85A] group-hover:border-[#F0C85A] transition-all duration-300">
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#0F1221] transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>

          {INSPO.slice(1).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/inspirations" className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#F0C85A] bg-[#0F1221]/55 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.tag}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-white leading-snug">{item.title}</h3>
                  <ArrowRight className="w-3.5 h-3.5 text-white/50 group-hover:text-[#F0C85A] transition-colors flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  8 — GALLERY  (V2 — masonry "Real Homes" grid)
// ══════════════════════════════════════════════════════════════════
const galleryImages = [
  '/real project section/a1.webp',
  '/real project section/a5.webp',
  '/real project section/a6.webp',
  '/real project section/a9.webp',
  '/real project section/a4.webp',
  '/real project section/a3.webp',
  '/real project section/a2.webp',
];

const GalleryFinal = () => (
  <section className="bg-[#F7F6F3] py-24 sm:py-32">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <Reveal>
          <Eyebrow text="Real Projects" />
          <h2 className="text-4xl sm:text-5xl font-light text-[#0F1221] leading-[1.08] tracking-[-0.025em]">
            Real Homes.<br /><span className="font-semibold text-[#493657]">Real Transformations.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link to="/gallery" className="text-sm font-medium text-[#0F1221]/40 hover:text-[#0F1221] transition-colors">
            View all projects →
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {galleryImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06, duration: 0.6 }}
            whileHover={{ scale: 1.02, zIndex: 10 }}
            className={`relative overflow-hidden rounded-2xl cursor-pointer
              ${i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}
              ${i === 3 ? 'sm:col-span-2' : ''}`}
            style={{
              aspectRatio: i === 0 ? '1/1' : (i === 3 ? '16/9' : '4/3'),
              background: '#e8e4df',
            }}
          >
            <img
              src={src} alt={`Project ${i + 1}`}
              className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-700"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4"
            >
              <span className="text-white/80 text-xs font-medium">View Project</span>
            </motion.div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  10 — FAQ  (V4)
// ══════════════════════════════════════════════════════════════════
const FAQS = [
  { q: 'What types of painting services does Calyco offer?', a: 'Interior & exterior painting, waterproofing, texture painting, wood polish, rental repainting, and commercial painting — across 25+ Indian cities.' },
  { q: 'How do I get a free consultation?', a: 'Fill the booking form or WhatsApp us. Our local team contacts you within 2 hours to schedule a free site visit.' },
  { q: 'What does the fixed quote include?', a: 'Labour, premium paint materials, surface preparation, and a 2-year workmanship warranty. No hidden charges — ever.' },
  { q: 'How does the 2-Year Warranty work?', a: 'Any defect in workmanship — peeling, cracking, uneven finish — within 2 years is fixed at zero cost, no questions asked.' },
  { q: 'Can I see colour samples before deciding?', a: 'Yes. Painters bring physical swatch samples. Our online Colour Visualizer also lets you preview shades on a virtual room.' },
  { q: 'Are your painters background-verified?', a: 'Every Calyco painter undergoes background checks, skill assessment, and on-site training before joining our network.' },
  { q: 'What eco-friendly options do you offer?', a: 'We source low-VOC, water-based paints that improve indoor air quality. Ask our consultant during your free site visit.' },
  { q: 'How long does a typical project take?', a: 'A 2BHK interior typically takes 3–5 days. Timelines depend on scope and surface prep. We provide an exact timeline in your quote.' },
];

const FaqFinal = () => {
  const [open, setOpen] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-[#F7F6F3] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-7 h-px bg-[#F0C85A]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">FAQs</span>
            <span className="w-7 h-px bg-[#F0C85A]" />
          </div>
          <h2 className="text-[2rem] sm:text-[2.6rem] font-light text-[#0F1221] tracking-[-0.015em]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="divide-y divide-[#0F1221]/7">
          {FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.03 * i }}
            >
              <button
                className="w-full flex items-center justify-between py-5 text-left gap-5 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className={`text-sm font-semibold leading-snug transition-colors ${open === i ? 'text-[#493657]' : 'text-[#0F1221] group-hover:text-[#493657]'}`}>
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${open === i ? 'border-[#493657] bg-[#493657]' : 'border-[#0F1221]/12'}`}
                >
                  <svg className={`w-3 h-3 ${open === i ? 'text-white' : 'text-[#0F1221]/40'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-[#0F1221]/52 font-light leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  11 — FINAL CTA  (V2 — dark closing section, image bg)
// ══════════════════════════════════════════════════════════════════
const CtaFinal = () => {
  const wa = `${WA_BASE}?text=${encodeURIComponent('Hi Calyco, I want to book a free site inspection.')}`;
  return (
    <section className="relative overflow-hidden">
      <img src={IMG_PAINTER} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      {/* Light frosted overlay on the left so dark text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex gap-0.5 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} cls="w-5 h-5 text-[#F0C85A]" />)}
            </div>
            <h2 className="text-4xl sm:text-6xl font-light text-[#0F1221] leading-[1.06] tracking-[-0.025em] mb-5">
              Ready to Transform<br /><span className="font-semibold text-[#d4a017]">Your Home?</span>
            </h2>
            <p className="text-[#0F1221]/65 text-base sm:text-lg font-light leading-[1.8] mb-10">
              Free inspection. Fixed written quote. 2-year warranty-backed finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/get-quote"
                  className="inline-flex items-center justify-center gap-2 bg-[#F0C85A] text-[#07090f] px-6 py-3 sm:px-10 sm:py-4 rounded-full text-sm font-bold hover:bg-[#0F1221] hover:text-white transition-colors shadow-[0_6px_32px_rgba(240,200,90,0.40)]"
                >
                  Book Free Inspection
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-[#0F1221]/25 text-[#0F1221] px-6 py-3 sm:px-10 sm:py-4 rounded-full text-sm font-medium hover:bg-[#0F1221]/8 transition-all"
                >
                  <WaIcon /> WhatsApp Us
                </a>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  PAGE — Final merged homepage (V2 + V4, boss-approved sections)
// ══════════════════════════════════════════════════════════════════
const HomeFinal = () => (
  <div className="font-poppins bg-white min-h-screen">
    <SEO
      title={`${BRAND_NAME} | 5-Star Painting Service — Professional House Painters`}
      description="Professional house painters you can count on. Verified teams, fixed written quotes, and a 2-year warranty-backed finish managed end-to-end by Calyco."
      ogType="website"
    />
    <HeroFinal />
    <MarqueeFinal />
    <ServicesFinal />
    <StatsFinal />
    <ProcessFinal />
    <ConsultationFinal />
    <InspirationFinal />
    <GalleryFinal />
    <ReviewsSection />
    <FaqFinal />
    <CtaFinal />
  </div>
);

export default HomeFinal;
