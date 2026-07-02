import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import contactData from '../data/admin/contact.json';

const IMG_HERO    = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_18_13 PM.png');
const IMG_CONSULT = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_11_55 PM.png');
const IMG_PAINTER = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_00_24 PM.png');

const WA = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent('Hi Calyco! I would like a free painting consultation.')}`;

// ─── SVG Icons ─────────────────────────────────────────────────────────────────
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

// ─── Shared Primitives ─────────────────────────────────────────────────────────

const Counter = ({ to, label }) => {
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

const LineReveal = ({ inView, delay = 0, className = '' }) => (
  <motion.span
    initial={{ scaleX: 0 }}
    animate={inView ? { scaleX: 1 } : {}}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{ transformOrigin: 'left' }}
    className={`block h-px ${className}`}
  />
);

// ─── 1. HERO ───────────────────────────────────────────────────────────────────

const LINES = ['The Art', 'of Perfect', 'Painting.'];
const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

const Stars = ({ size = 'w-3 h-3' }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className={`${size} text-[#F0C85A]`} fill="currentColor" viewBox="0 0 20 20">
        <path d={STAR_PATH} />
      </svg>
    ))}
  </div>
);

const HeroV4 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // ── Scroll parallax ────────────────────────────────────────────────────────
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // image drifts up as you scroll — slower than the page = depth
  const scrollImgY     = useTransform(scrollYProgress, [0, 1], [0, -130]);
  // left text drifts up even slower — subtle
  const scrollTextY    = useTransform(scrollYProgress, [0, 1], [0, -55]);
  // whole section fades out before bottom
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // spring damping makes the motion feel physical & smooth
  const springCfg = { damping: 26, stiffness: 175, mass: 0.8 };
  const smX = useSpring(rawX, springCfg);
  const smY = useSpring(rawY, springCfg);

  // Depth layers — further back = less movement; closer = more
  // Image background: least movement
  const imgX    = useTransform(smX, [-1, 1], [-12, 12]);
  const imgY    = useTransform(smY, [-1, 1], [-8,  8]);
  // Testimonial (just above image)
  const testX   = useTransform(smX, [-1, 1], [-20, 20]);
  const testY   = useTransform(smY, [-1, 1], [-14, 14]);
  // Rating pill (mid foreground)
  const ratingX = useTransform(smX, [-1, 1], [-26, 26]);
  const ratingY = useTransform(smY, [-1, 1], [-18, 18]);
  // Badge (front-most layer — most movement)
  const badgeX  = useTransform(smX, [-1, 1], [-34, 34]);
  const badgeY  = useTransform(smY, [-1, 1], [-24, 24]);

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width  * 2 - 1);
    rawY.set((e.clientY - rect.top)  / rect.height * 2 - 1);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.section
      ref={ref}
      style={{ opacity: sectionOpacity }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="min-h-screen bg-[#FAFAF8] flex overflow-hidden relative"
    >
      {/* Decorative watermark */}
      <div aria-hidden="true" className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <span className="text-[28vw] font-black text-[#0F1221]/[0.028] leading-none tracking-tighter">5★</span>
      </div>

      {/* ── Left column — scroll parallax on text ─────────────────────────── */}
      <motion.div
        style={{ y: scrollTextY }}
        className="relative z-10 w-full lg:w-[56%] flex items-center px-6 sm:px-10 lg:px-16 xl:px-24 py-28 lg:py-0 min-h-screen"
      >
        <div className="w-full max-w-lg">

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-9 h-px bg-[#F0C85A]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#493657]">
              Calyco 5-Star Painting Services
            </span>
          </motion.div>

          <h1 className="mb-7">
            {LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden leading-[1.07]">
                <motion.span
                  initial={{ y: '108%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.22 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  className={`block font-light tracking-[-0.025em] text-[3rem] sm:text-[3.8rem] lg:text-[4.4rem] xl:text-[5rem] ${
                    i === 2 ? 'text-[#493657]' : 'text-[#0F1221]'
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
            className="text-[#0F1221]/48 text-base sm:text-[1.05rem] font-light leading-relaxed mb-10 max-w-[400px]"
          >
            Verified painters. Fixed quotes.<br />
            2-year warranty. 25+ cities across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link
              to="/get-quote"
              className="group inline-flex items-center gap-2.5 bg-[#0F1221] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors duration-300 shadow-lg shadow-[#0F1221]/10"
            >
              Book Free Consultation
              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#0F1221]/12 text-[#0F1221]/60 px-8 py-4 rounded-full text-sm font-semibold hover:border-[#25D366]/50 hover:text-[#25D366] transition-all duration-300"
            >
              <WaIcon />
              WhatsApp Us
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="flex flex-wrap gap-2"
          >
            {['4.8★ Rated', '2-Year Warranty', 'Fixed Quote', '15K+ Homes'].map((t) => (
              <span key={t} className="text-[10px] font-semibold text-[#0F1221]/38 border border-[#0F1221]/10 rounded-full px-3.5 py-1.5 tracking-wide">
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── Right column ──────────────────────────────────────────────────── */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[46%] overflow-hidden">

        {/* Layer 1 — scroll parallax wrapper (image only scrolls slower) */}
        <motion.div style={{ y: scrollImgY }} className="absolute inset-0">
          {/* Layer 2 — clip-path entry animation */}
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
            transition={{ duration: 1.15, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* Layer 3 — mouse parallax on image (oversized -8% so edges never show) */}
            <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-[8%]">
              <img
                src={IMG_CONSULT}
                alt="Calyco painting service"
                className="w-full h-full object-cover object-center"
              />
              {/* Left edge softly fades into the cream background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/60 via-[#FAFAF8]/8 to-transparent" />
              {/* Bottom vignette so floating cards are readable */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#0F1221]/70 via-[#0F1221]/25 to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Floating badge — top right (deepest foreground, most mouse movement) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.55, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
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

        {/* ── Rating pill — mid-left (middle foreground) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 -translate-y-1/2 left-6 z-20"
        >
          <motion.div style={{ x: ratingX, y: ratingY }}>
            <div className="bg-white/92 backdrop-blur-md rounded-2xl px-4 py-3.5 shadow-xl border border-white/50">
              <Stars size="w-3 h-3" />
              <div className="text-sm font-black text-[#0F1221] mt-2 leading-none">4.8 <span className="font-light text-[#0F1221]/40 text-xs">/ 5.0</span></div>
              <div className="text-[11px] text-[#0F1221]/40 font-light mt-1 uppercase tracking-[0.12em]">Customer Rating</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Testimonial card — bottom (just above image layer) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 1.65, ease: [0.22, 1, 0.36, 1] }}
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
                    <div className="text-[11px] text-[#0F1221]/35">Mumbai · Interior Painting</div>
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

// ─── 2. MARQUEE ────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  'Verified Painters', '2-Year Warranty', 'Fixed Price Quote',
  '25+ Cities', '15,000+ Homes', '4.8★ Customer Rating',
  'Free Site Visit', 'No Hidden Charges', 'Premium Paint Brands',
];

const MarqueeV4 = () => (
  <section className="bg-[#0F1221] py-3.5 overflow-hidden border-y border-white/5">
    <style>{`
      @keyframes v4marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      .v4-marquee { animation: v4marquee 28s linear infinite; }
      .v4-marquee:hover { animation-play-state: paused; }
    `}</style>
    <div className="flex whitespace-nowrap v4-marquee">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center gap-4 mx-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <span className="w-1 h-1 rounded-full bg-[#F0C85A] flex-shrink-0" />
          {item}
        </span>
      ))}
    </div>
  </section>
);

// ─── 3. SERVICES — flex accordion panels ──────────────────────────────────────

const SERVICES_DATA = [
  {
    title: 'Interior Painting',
    short: 'from ₹18 / sq ft',
    desc: 'Ultra-smooth walls with premium colour range, surface prep, and a finish that lasts for years.',
    to: '/services/interior-painting',
    img: IMG_PAINTER,
  },
  {
    title: 'Exterior Painting',
    short: 'from ₹24 / sq ft',
    desc: 'Weather-resistant high-coverage paint that shields your home from rain, UV, and algae year-round.',
    to: '/services/exterior-painting',
    img: IMG_HERO,
  },
  {
    title: 'Waterproofing',
    short: 'from ₹45 / sq ft',
    desc: 'Advanced anti-fungal protection for roofs, walls and basements. No more leaks, no more damp.',
    to: '/services/terrace-waterproofing',
    img: IMG_CONSULT,
  },
];

const ServicesV4 = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-[#0F1221]">
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="px-6 sm:px-10 lg:px-16 xl:px-24 pt-16 pb-10 flex items-end justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-px bg-[#F0C85A]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F0C85A]">Our Services</span>
          </div>
          <h2 className="text-[2rem] sm:text-[2.6rem] font-light text-white tracking-[-0.015em]">
            What We Do Best
          </h2>
        </div>
        <Link to="/services" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-white/35 hover:text-[#F0C85A] transition-colors">
          All services <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>

      {/* Desktop: flex accordion panels */}
      <div className="hidden lg:flex h-[60vh] min-h-[480px]">
        {SERVICES_DATA.map((s, i) => (
          <motion.div
            key={s.title}
            className="relative overflow-hidden cursor-pointer"
            animate={{ flexGrow: active === i ? 2.6 : 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setActive(i)}
          >
            {/* Background image */}
            <motion.img
              src={s.img}
              alt={s.title}
              animate={{ scale: active === i ? 1.05 : 1.12 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221] via-[#0F1221]/30 to-transparent" />
            <div className={`absolute inset-0 transition-opacity duration-500 ${active === i ? 'bg-[#493657]/20' : 'bg-[#0F1221]/50'}`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <AnimatePresence>
                {active === i && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-[#F0C85A] border border-[#F0C85A]/40 rounded-full px-3.5 py-1.5 w-fit"
                  >
                    {s.short}
                  </motion.span>
                )}
              </AnimatePresence>
              <h3 className="text-xl font-semibold text-white mb-2 leading-tight">{s.title}</h3>
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-sm text-white/55 font-light leading-relaxed mb-5">{s.desc}</p>
                    <Link
                      to={s.to}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#F0C85A] hover:gap-3 transition-all duration-200"
                    >
                      Learn More <ArrowRight />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {active !== i && (
                <p className="text-xs text-white/35 font-light">{s.short}</p>
              )}
            </div>

            {/* Vertical label for collapsed panels */}
            <AnimatePresence>
              {active !== i && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'translate(-50%, -50%) rotate(180deg)' }}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/30">{s.title}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="lg:hidden grid grid-cols-1 gap-px">
        {SERVICES_DATA.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: i * 0.1 }}
            className="relative overflow-hidden"
          >
            <div className="aspect-[16/9] relative">
              <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221] via-[#0F1221]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-[11px] font-black text-[#F0C85A] uppercase tracking-[0.22em] mb-1.5 block">{s.short}</span>
                <h3 className="text-lg font-semibold text-white mb-1.5">{s.title}</h3>
                <p className="text-sm text-white/50 font-light mb-4 leading-relaxed">{s.desc}</p>
                <Link to={s.to} className="inline-flex items-center gap-2 text-sm font-bold text-[#F0C85A]">
                  Learn More <ArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="px-6 sm:px-10 lg:px-16 xl:px-24 py-10 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-sm text-white/40 font-light">Sign up today to receive a free consultation.</p>
        <div className="flex gap-3">
          <Link to="/get-quote" className="inline-flex items-center gap-2 bg-[#F0C85A] text-[#0F1221] px-6 py-3 rounded-full text-xs font-black hover:bg-white transition-colors">
            Get Free Quote
          </Link>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 text-white/60 px-6 py-3 rounded-full text-xs font-semibold hover:border-white/35 hover:text-white transition-all">
            <WaIcon /> WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  );
};

// ─── 4. STATS — oversized typography ──────────────────────────────────────────

const STATS = [
  { to: 15, label: 'K+', sub: 'Homes Painted', desc: 'Happy families across India' },
  { to: 25, label: '+',  sub: 'Cities Covered', desc: 'Pan-India service network' },
  { to: 3,  label: 'K+', sub: 'Colour Options', desc: 'To suit every taste' },
  { to: 2,  label: '-Yr', sub: 'Warranty',      desc: 'On all painting work' },
];

const StatsV4 = () => {
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
              className="px-8 lg:px-12 py-14 group hover:bg-[#F0EDE8]/50 transition-colors duration-300"
            >
              <div className="text-[3.2rem] sm:text-[4rem] lg:text-[4.4rem] font-black text-[#0F1221] leading-none tracking-tight mb-2 group-hover:text-[#493657] transition-colors duration-300">
                <Counter to={s.to} label={s.label} />
              </div>
              <div className="text-sm font-bold text-[#0F1221]/70 mb-1">{s.sub}</div>
              <div className="text-xs text-[#0F1221]/35 font-light">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 5. PROCESS — vertical timeline with animated draw ────────────────────────

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Initial Assessment',
    desc: 'Our expert visits your home, assesses surface conditions, understands your style preferences, and takes measurements — all at zero cost.',
    time: '30–45 min',
  },
  {
    num: '02',
    title: 'Colour Suggestion',
    desc: 'We recommend the perfect shades, finishes, and paint brands based on your space, lighting, and lifestyle. Physical swatch samples included.',
    time: '1–2 hours',
  },
  {
    num: '03',
    title: 'Fixed Quote & Planning',
    desc: 'A fully transparent, itemised quote with no hidden costs. Materials, labour, and timeline — all confirmed before work begins.',
    time: '24 hours',
  },
  {
    num: '04',
    title: 'Expert Painting',
    desc: 'Verified, background-checked painters execute the project with premium materials, clean processes, and daily progress updates.',
    time: '2–5 days',
  },
];

const ProcessStep = ({ step, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLeft = i % 2 === 0;
  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-[#0F1221]/6 last:border-b-0">
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className={`py-10 lg:py-14 ${isLeft ? 'lg:pr-16 xl:pr-24' : 'lg:col-start-2 lg:pl-16 xl:pl-24'}`}
      >
        <div className="flex items-start gap-6">
          <span className="text-[2.8rem] font-black text-[#0F1221]/7 leading-none shrink-0 mt-1">{step.num}</span>
          <div>
            <h3 className="text-lg font-bold text-[#0F1221] mb-2 leading-snug">{step.title}</h3>
            <p className="text-sm text-[#0F1221]/70 font-light leading-relaxed mb-3">{step.desc}</p>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#493657]">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {step.time}
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`hidden lg:flex items-center ${isLeft ? 'justify-start' : 'justify-end lg:col-start-1'}`}
      >
        {isLeft && <div className="relative left-[calc(50%+0px)] w-4 h-4 rounded-full bg-white border-2 border-[#F0C85A] shadow-md" />}
      </motion.div>
    </div>
  );
};

const ProcessV4 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start center', 'end center'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-7 h-px bg-[#F0C85A]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#493657]">Your Journey</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-[2rem] sm:text-[2.8rem] font-light text-[#0F1221] tracking-[-0.015em] max-w-md leading-tight">
              From Planning to<br />Perfect Finish.
            </h2>
            <p className="text-sm text-[#0F1221]/70 font-light max-w-xs">
              A transparent 4-step process — we keep you informed at every stage.
            </p>
          </div>
          <LineReveal inView={inView} delay={0.3} className="bg-[#0F1221]/8 mt-8 w-full" />
        </motion.div>

        {/* Steps grid */}
        <div ref={lineRef} className="relative">

          {/* Vertical animated line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[#0F1221]/8">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-[#F0C85A] to-[#493657] origin-top" />
          </div>

          <div className="space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStep key={step.num} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 6. CONSULTATION SPLIT ─────────────────────────────────────────────────────

const ConsultationV4 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="bg-[#F7F6F3] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

        {/* Image side */}
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
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F7F6F3]/30 lg:to-[#F7F6F3]/50" />

          {/* Rating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 right-8 bg-[#493657] text-white rounded-2xl px-5 py-4 shadow-2xl"
          >
            <div className="text-3xl font-black leading-none mb-0.5">4.8</div>
            <div className="flex gap-0.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-[#F0C85A]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-[10px] text-white/60 font-light">avg. rating</div>
          </motion.div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20"
        >
          <div className="max-w-lg">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-px bg-[#F0C85A]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#493657]">Expert Consultation</span>
            </div>
            <h2 className="text-[1.9rem] sm:text-[2.5rem] font-light text-[#0F1221] tracking-[-0.015em] leading-tight mb-4">
              Looking for Expert<br />Consultation?
            </h2>
            <p className="text-[#0F1221]/70 font-light text-base leading-relaxed mb-8">
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
              className="group inline-flex items-center gap-3 bg-[#0F1221] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors duration-300"
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

// ─── 7. INSPIRATION GRID — asymmetric layout ──────────────────────────────────

const INSPO = [
  { title: 'Interior Colour Trends 2026', tag: 'Interior', tall: true },
  { title: 'Choosing the Right Finish', tag: 'Tips' },
  { title: 'Exterior Paint That Lasts', tag: 'Exterior' },
  { title: 'Room-by-Room Colour Guide', tag: 'Colours' },
  { title: 'Texture vs Smooth: What\'s Right?', tag: 'Expert' },
];

const InspirationV4 = () => {
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
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#493657]">Inspirations</span>
            </div>
            <h2 className="text-[2rem] sm:text-[2.6rem] font-light text-[#0F1221] tracking-[-0.015em]">
              Featured Ideas
            </h2>
          </div>
          <Link to="/inspirations" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">

          {/* Tall card — spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="row-span-2 col-span-1"
          >
            <Link to="/inspirations" className="group block h-full relative overflow-hidden rounded-2xl min-h-[320px] sm:min-h-[420px]">
              <img src={IMG_PAINTER} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/80 via-[#0F1221]/10 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F0C85A] bg-[#0F1221]/60 backdrop-blur-sm px-3 py-1.5 rounded-full">{INSPO[0].tag}</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-2">
                <h3 className="text-base font-semibold text-white leading-snug">{INSPO[0].title}</h3>
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#F0C85A] group-hover:border-[#F0C85A] transition-all duration-300">
                  <ArrowRight className={`w-3.5 h-3.5 text-white group-hover:text-[#0F1221] transition-colors`} />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* 4 smaller cards */}
          {INSPO.slice(1).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to="/inspirations" className="group block relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img src={i % 2 === 0 ? IMG_CONSULT : IMG_HERO} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/75 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[#F0C85A] bg-[#0F1221]/55 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.tag}</span>
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

// ─── 8. FAQ ────────────────────────────────────────────────────────────────────

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

const FaqV4 = () => {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-[#F7F6F3] py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-7 h-px bg-[#F0C85A]" />
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#493657]">FAQs</span>
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
                    <p className="pb-5 text-sm text-[#0F1221]/70 font-light leading-relaxed">{item.a}</p>
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

// ─── 9. FINAL CTA — bold typographic dark section ─────────────────────────────

const CtaV4 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="bg-[#0F1221] overflow-hidden relative">
      {/* Subtle background image */}
      <div className="absolute inset-0 opacity-15">
        <img src={IMG_HERO} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-[#0F1221]/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 py-24 sm:py-32">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-end">

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-7 h-px bg-[#F0C85A]" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#F0C85A]">Calyco 5-Star Painting Services</span>
            </motion.div>

            {'Looking for Painting Services?'.split(' ').map((word, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.2em]">
                <motion.span
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-[2.2rem] sm:text-[3rem] lg:text-[3.8rem] font-light text-white leading-tight tracking-[-0.02em]"
                >
                  {word}
                </motion.span>
              </span>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="text-white/40 text-base font-light mt-5 max-w-md"
            >
              Sign up today to receive a free consultation. We'll help you choose the perfect shade and finish for your home.
            </motion.p>
          </div>

          {/* CTA stack */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-col gap-3 min-w-[220px]"
          >
            <Link
              to="/get-quote"
              className="inline-flex items-center justify-center gap-2.5 bg-[#F0C85A] text-[#0F1221] px-8 py-[18px] rounded-full font-black text-sm hover:bg-white transition-colors duration-300 shadow-2xl shadow-[#F0C85A]/20"
            >
              Book Free Consultation
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/18 text-white/65 px-8 py-[18px] rounded-full font-semibold text-sm hover:bg-white/8 hover:text-white transition-all duration-300"
            >
              <WaIcon /> WhatsApp Us
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-xs text-white/25 font-light">
            © 2026 Calyco Paint Pvt. Ltd. — Professional Painting Services across India.
          </p>
          <div className="flex items-center gap-4">
            {['25+ Cities', '15K+ Homes', '4.8★ Rated'].map((t) => (
              <span key={t} className="text-[10px] font-bold text-white/25 border border-white/10 rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function HomeV4() {
  return (
    <main>
      <HeroV4 />
      <MarqueeV4 />
      <ServicesV4 />
      <StatsV4 />
      <ProcessV4 />
      <ConsultationV4 />
      <InspirationV4 />
      <FaqV4 />
      <CtaV4 />
    </main>
  );
}
