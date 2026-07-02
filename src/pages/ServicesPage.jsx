import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  motion, useScroll, useTransform, useMotionValue,
  useSpring, useInView, animate, AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { X as XIcon, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import { servicePricing } from '../data/servicePricing';
import { SERVICE_CATEGORIES, SCENE_IMAGES, RATINGS } from '../data/serviceCategories';

/* ─── Design tokens ────────────────────────────────────────── */
const GOLD   = '#F0C85A';
const PURPLE = '#493657';
const DARK   = '#0F1221';

/* ─── Shared primitives ─────────────────────────────────────── */
const Eyebrow = ({ text, light = false }) => (
  <div className="flex items-center gap-3 mb-5">
    <span className="w-7 h-px flex-shrink-0" style={{ background: GOLD }} />
    <span
      className="text-[13px] font-black uppercase tracking-[0.28em]"
      style={{ color: light ? 'rgba(255,255,255,0.5)' : PURPLE }}>
      {text}
    </span>
  </div>
);

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

/* ─── CountUp ───────────────────────────────────────────────── */
const CountUp = ({ from = 0, to, decimals = 0 }) => {
  const ref  = useRef(null);
  const isIn = useInView(ref, { once: true });
  const v    = useMotionValue(from);
  const [disp, setDisp] = useState(from.toFixed(decimals));
  useEffect(() => {
    if (!isIn) return;
    const ctrl = animate(v, to, {
      duration: 1.5, ease: 'easeOut',
      onUpdate: (n) => setDisp(n.toFixed(decimals)),
    });
    return ctrl.stop;
  }, [isIn, to, from, decimals, v]);
  return <span ref={ref}>{disp}</span>;
};

/* ═══════════════════════════════════════════════════════════
   MODAL SERVICE CARD — clean, no icon overlay
═══════════════════════════════════════════════════════════ */
const ModalServiceCard = ({ service, cat, onCardClick }) => {
  const img  = SCENE_IMAGES[service.slug];
  const r    = RATINGS[service.slug] || { r: 4.8, n: '1k+' };
  const isFree = service.baseMin === 0;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.18, ease: 'easeOut' }}>
      <Link
        to={`/services/${service.slug}`}
        className="group block rounded-2xl overflow-hidden border border-[#0F1221]/8 hover:shadow-xl transition-all duration-300 bg-white"
        onClick={onCardClick}>

        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {img ? (
            <img src={img} alt={service.name} loading="lazy" decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500" />
          ) : (
            <div className="w-full h-full" style={{ background: cat?.gradient }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {isFree && (
            <span className="absolute top-2 right-2 bg-[#16a34a] text-white text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full">
              Free
            </span>
          )}

          <div className="absolute bottom-2 right-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#0F1221]/85 backdrop-blur-sm"
              style={{ color: GOLD }}>
              {isFree ? 'Free' : `₹${service.baseMin}/${service.unit}`}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="px-3 pt-2.5 pb-3">
          <p className="text-[12px] font-bold text-[#0F1221] leading-snug line-clamp-2 mb-1.5 tracking-tight">
            {service.name}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[#F0C85A] text-[10px] leading-none">★</span>
            <span className="text-[9.5px] font-semibold text-gray-500">{r.r}</span>
            <span className="text-[11px] text-gray-400">({r.n})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY CARD — premium image card, no icons
═══════════════════════════════════════════════════════════ */
const CategoryCard = ({ cat, idx, onOpen }) => {
  const num = String(idx + 1).padStart(2, '0');

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(cat)}
      whileHover={{ y: -7, scale: 1.01 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="relative w-full text-left overflow-hidden rounded-2xl sm:rounded-3xl group focus:outline-none aspect-[16/11] sm:aspect-[3/4]">

      {/* Background */}
      {cat.image
        ? <img src={cat.image} alt={cat.label} loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
        : <div className="absolute inset-0 bg-[#0F1221]" />
      }

      {/* Gradient overlay — consistent dark ink, image stays clean on top */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(15,18,33,0.92) 0%, rgba(15,18,33,0.55) 32%, rgba(15,18,33,0.08) 60%, transparent 100%)',
      }} />

      {/* Top row — service count pill */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        <span className="text-[28px] sm:text-[34px] font-black leading-none select-none pointer-events-none text-white/15">
          {num}
        </span>
        <span className="text-[11px] font-black uppercase tracking-[0.18em] rounded-full px-2.5 py-1 backdrop-blur-sm bg-[#0F1221]/40 text-white/75 border border-white/15">
          {cat.slugs.length} {cat.slugs.length === 1 ? 'service' : 'services'}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">

        {/* Gold line + price eyebrow */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-4 h-[1.5px] rounded-full flex-shrink-0" style={{ background: GOLD }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
            from {cat.fromPrice}
          </span>
        </div>

        <h3 className="text-white font-semibold text-[15px] sm:text-[17px] leading-tight tracking-tight mb-1.5">
          {cat.label}
        </h3>
        <p className="text-white/55 text-[10px] sm:text-[11px] leading-snug line-clamp-2 mb-4">
          {cat.description}
        </p>

        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-white transition-all duration-200 group-hover:gap-2.5 group-hover:text-[#F0C85A]">
          Explore services
          <span className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: GOLD }}>→</span>
        </span>
      </div>

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${GOLD}66, 0 24px 64px 0 rgba(15,18,33,0.35)` }} />
    </motion.button>
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY MODAL — premium sheet, no icon badges
═══════════════════════════════════════════════════════════ */
const CategoryModal = ({ cat, onClose }) => {
  const services = servicePricing.filter((s) => cat.slugs.includes(s.slug));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}>

      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

      <motion.div
        className="relative z-10 bg-white w-full sm:max-w-4xl sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh', boxShadow: '0 32px 80px rgba(0,0,0,0.30)' }}
        initial={{ y: 80, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.9 }}>

        {/* Header — editorial, matches homepage */}
        <div className="relative flex-shrink-0 px-5 sm:px-7 py-5 sm:py-6 bg-white border-b border-[#0F1221]/6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-5 h-px" style={{ background: GOLD }} />
                <span className="text-[11px] font-black uppercase tracking-[0.26em] text-[#0F1221]/35">
                  {services.length} {services.length === 1 ? 'service' : 'services'} available
                </span>
              </div>
              <h3 className="text-[18px] sm:text-[22px] font-light text-[#0F1221] leading-tight tracking-[-0.01em]">{cat.label}</h3>
            </div>

            <div className="flex items-center gap-2">
              <Link to={`/services/all?cat=${cat.id}`} onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold border border-[#0F1221]/12 text-[#0F1221]/60 hover:border-[#493657] hover:text-[#493657] transition-colors">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
              <button onClick={onClose} aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-[#FAFAF8] border border-[#0F1221]/8 text-[#0F1221]/50 hover:text-[#0F1221] hover:border-[#0F1221]/25 transition-colors flex-shrink-0">
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Service grid */}
        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 bg-[#F8F7F4]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service, i) => (
              <motion.div key={service.slug}
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.28 }}>
                <ModalServiceCard service={service} cat={cat} onCardClick={onClose} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-5 sm:px-7 py-3.5 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
          <p className="text-[11px] sm:text-[12px] text-gray-400 font-light">
            All prices excl. GST · Final after free site inspection
          </p>
          <div className="flex items-center gap-2">
            <Link to="/services/all" onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-200 text-gray-600 px-4 py-2 text-[11px] font-semibold hover:border-[#493657]/30 hover:text-[#493657] transition-colors whitespace-nowrap">
              All 10 services
            </Link>
            <Link to="/calculators/service-cost-calculator" onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-bold whitespace-nowrap hover:bg-[#493657] transition-colors">
              Get Estimate →
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ═══════════════════════════════════════════════════════════
   CATEGORY CARDS SECTION
═══════════════════════════════════════════════════════════ */
const CategoryCardsSection = ({ onOpenCat }) => (
  <section className="py-16 sm:py-20 lg:py-24 bg-[#FAFAF8] border-b border-[#0F1221]/6">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <Reveal>
            <Eyebrow text="Calyco 5-Star Service" />
            <h2 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-light text-[#0F1221] tracking-[-0.025em] leading-[1.07] mb-3">
              All Services,<br className="hidden sm:block" /> <span className="text-[#493657] font-semibold">7 Categories</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Link to="/services/all"
            className="inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/65 px-6 py-3 text-[12px] sm:text-sm font-semibold hover:border-[#493657] hover:text-[#493657] transition-all whitespace-nowrap group">
            View All 10 Services
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </Reveal>
      </div>

      {/* 7-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <motion.div key={cat.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}>
            <CategoryCard cat={cat} idx={i} onOpen={onOpenCat} />
          </motion.div>
        ))}
      </div>

      {/* Sub CTA */}
      <Reveal delay={0.2}>
        <div className="flex flex-col sm:flex-row gap-3 mt-10 sm:mt-12">
          <Link to="/calculators/service-cost-calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold hover:bg-[#493657] transition-colors shadow-[0_4px_24px_rgba(15,18,33,0.18)] whitespace-nowrap">
            Get Free Estimate →
          </Link>
          <Link to="/get-quote"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/65 px-6 py-3 sm:px-8 sm:py-4 text-sm font-semibold hover:border-[#493657]/50 hover:text-[#493657] transition-all whitespace-nowrap">
            Book Free Visit →
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════
   MARQUEE STRIP — V4 style
═══════════════════════════════════════════════════════════ */
const TICKER = [
  'Verified Painters', 'Fixed Written Quote', 'Daily WhatsApp Updates',
  'Proper Wall Preparation', 'Clean Worksite', '1-Year Warranty',
  '25+ Cities', 'Free Site Inspection', 'Final Quality Check',
];

const MarqueeStrip = () => (
  <div className="bg-[#0F1221] border-y border-white/8 py-4 overflow-hidden">
    <style>{`@keyframes svcsmarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    <div className="flex whitespace-nowrap" style={{ animation: 'svcsmarquee 32s linear infinite' }}>
      {[...TICKER, ...TICKER].map((t, i) => (
        <span key={i} className="inline-flex items-center gap-4 mx-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: GOLD }} />
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   OFFERS AUTO-CAROUSEL — premium slides
═══════════════════════════════════════════════════════════ */
const OFFERS = [
  {
    tag: 'Wall Design', tagDot: '#d4960a',
    headline: 'Texture & decorative\nfrom ₹55/sq ft',
    sub: 'Sand, stucco, Italian & designer.',
    cta: { label: 'Explore textures', to: '/services/texture-decorative-painting' },
    bg: 'linear-gradient(135deg,#2a1800 0%,#6b3d00 50%,#9a6400 100%)',
    accent: GOLD,
    image: '/Assets/Texture Images/texture-main.webp',
  },
  {
    tag: 'Protect Home', tagDot: '#60C8F0',
    headline: 'Waterproofing\nfrom ₹45/sq ft',
    sub: 'Terrace, roof, bathroom & basement.',
    cta: { label: 'Get waterproofing', to: '/services/waterproofing' },
    bg: 'linear-gradient(135deg,#041520 0%,#0a2d45 50%,#0e4060 100%)',
    accent: '#60C8F0',
    image: '/Assets/u7859757176_Modern_luxury_bathroom_with_high_clerestory_windo_4f1ad61e-d8af-4e9c-bb17-4066db021cef_2.webp',
  },
  {
    tag: 'Always Free', tagDot: GOLD,
    headline: 'Free site inspection\n+ laser measurement',
    sub: 'No charges, no obligation. Book on WhatsApp in 30 seconds.',
    cta: { label: 'Book now', to: '/get-quote' },
    bg: `linear-gradient(135deg,#1A0826 0%,#3d1f5a 50%,${PURPLE} 100%)`,
    accent: GOLD,
    image: '/Assets/painter-bg-removed.webp',
  },
  {
    tag: 'Most Popular', tagDot: '#c08aff',
    headline: 'Interior repaint\n1-year warranty',
    sub: 'Fixed quote, laser measurement, daily photo updates.',
    cta: { label: 'Get quote', to: '/services/interior-repaint' },
    bg: 'linear-gradient(135deg,#120820 0%,#2e1545 50%,#4a2070 100%)',
    accent: '#c08aff',
    image: '/service/Repainting.webp',
  },
  {
    tag: 'Free', tagDot: '#40e888',
    headline: 'Free site visit\n& written quote',
    sub: 'No charges. No commitment.',
    cta: { label: 'Book free visit', to: '/get-quote' },
    bg: 'linear-gradient(135deg,#041810 0%,#0a3020 50%,#105038 100%)',
    accent: '#40e888',
    image: '/Assets/Rooms/LivingRoom/base.webp',
  },
];

const OffersCarousel = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const INTERVAL = 4800;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % OFFERS.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const o    = OFFERS[idx];
  const base = o.bg.match(/#[0-9A-Fa-f]{6}/g)?.[2] ?? o.bg.match(/#[0-9A-Fa-f]{6}/)?.[0] ?? '#080B18';

  return (
    <section className="py-4 sm:py-5 border-b border-[#0F1221]/6"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ minHeight: 'clamp(200px, 46vw, 280px)' }}>

          <AnimatePresence mode="wait">
            <motion.div key={`bg-${idx}`} className="absolute inset-0"
              style={{ background: o.bg }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }} />
          </AnimatePresence>

          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <AnimatePresence mode="wait">
            <motion.div key={`img-${idx}`}
              className="absolute right-0 top-0 bottom-0 w-[44%] sm:w-[42%] pointer-events-none overflow-hidden"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <img src={o.image} alt="" className="h-full w-full object-cover scale-[1.04]" />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${base} 0%, ${base}d0 28%, ${base}70 55%, transparent 100%)` }} />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex items-center h-full px-6 sm:px-10 lg:px-14 py-8 sm:py-11">
            <AnimatePresence mode="wait">
              <motion.div key={`txt-${idx}`} className="max-w-[54%] sm:max-w-[48%]"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}>

                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-3 sm:mb-4"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: o.accent, boxShadow: `0 0 6px ${o.accent}` }} />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-white/90">{o.tag}</span>
                </div>

                <p className="text-[22px] sm:text-3xl md:text-4xl font-light leading-[1.12] tracking-[-0.02em] mb-2 sm:mb-3 whitespace-pre-line text-white">
                  {o.headline}
                </p>

                <p className="hidden sm:block text-sm mb-5 leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {o.sub}
                </p>

                <Link to={o.cta.to}
                  className="inline-flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
                  style={{ background: o.accent, color: '#0A0A12', boxShadow: `0 6px 24px ${o.accent}55` }}>
                  {o.cta.label} →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="text-white font-black text-[11px] leading-none">{idx + 1}</span>
            <span className="text-white/40 text-[11px] leading-none">/</span>
            <span className="text-white/50 text-[11px] leading-none">{OFFERS.length}</span>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-3.5">
          {OFFERS.map((slide, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`}
              className="relative overflow-hidden rounded-full transition-all duration-400"
              style={{
                width: i === idx ? 28 : 6, height: 6,
                background: i === idx ? 'transparent' : '#d1d5db',
                border: i === idx ? `1px solid ${slide.accent}60` : 'none',
              }}>
              {i === idx && <div className="absolute inset-0 rounded-full opacity-30" style={{ background: slide.accent }} />}
              {i === idx && !paused && (
                <motion.div className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: slide.accent }}
                  initial={{ width: '0%' }} animate={{ width: '100%' }}
                  transition={{ duration: INTERVAL / 1000, ease: 'linear' }} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PROMO BANNER — reusable
═══════════════════════════════════════════════════════════ */
const PromoBanner = ({ dark, eyebrow, title, cta, to, href, image, accent = GOLD }) => {
  const Wrap = ({ children }) => to
    ? <Link to={to}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  return (
    <section className="py-2 sm:py-3">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-between gap-3 px-5 py-6 sm:px-12 sm:py-10 min-h-[110px] sm:min-h-[152px] ${dark ? 'bg-[#0F1221]' : 'bg-[#F7F3EE] border border-[#e5e0d8]'}`}>
          {image && (
            <div className="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[50%] pointer-events-none overflow-hidden">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-r from-[#0F1221] via-[#0F1221]/90 to-transparent' : 'bg-gradient-to-r from-[#F7F3EE] via-[#F7F3EE]/90 to-transparent'}`} />
            </div>
          )}
          <div className="relative z-10 max-w-[60%] sm:max-w-lg">
            <p className="text-[11px] sm:text-[10px] uppercase tracking-[0.22em] font-bold mb-1.5 sm:mb-2"
              style={{ color: dark ? `${accent}70` : '#49365766' }}>{eyebrow}</p>
            <p className={`text-base sm:text-2xl md:text-3xl font-light leading-snug tracking-tight ${dark ? 'text-white' : 'text-[#0F1221]'}`}>{title}</p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <Wrap>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-6 py-2 sm:py-3 text-[11px] sm:text-sm font-bold transition-all hover:opacity-85 active:scale-95 whitespace-nowrap"
                style={{ background: accent, color: dark ? '#080B18' : '#fff' }}>
                {cta} →
              </span>
            </Wrap>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   PARALLAX HERO — dark cinematic, text badges only
═══════════════════════════════════════════════════════════ */
const ParallaxHero = () => {
  const ref = useRef(null);
  const mx  = useMotionValue(0); const my = useMotionValue(0);
  const sp  = { stiffness: 40, damping: 22, mass: 0.9 };
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), sp);
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), sp);
  const fgX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), sp);
  const fgY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), sp);
  const b1x = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), sp);
  const b1y = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), sp);
  const b2x = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), sp);
  const b2y = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), sp);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  return (
    <section ref={ref}
      className="relative overflow-hidden bg-[#080B18] select-none h-[320px] sm:h-[600px] lg:h-[min(92vh,900px)]"
      onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>

      {/* Parallax bg image */}
      <motion.div className="absolute inset-[-6%] z-0" style={{ x: bgX, y: bgY }}>
        <motion.img
          src="/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.webp"
          alt="" className="w-full h-full object-cover brightness-[0.36]"
          style={{ y: scrollY }} loading="eager" />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080B18]/98 via-[#080B18]/70 to-[#080B18]/10 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080B18]/90 via-transparent to-[#080B18]/25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#F0C85A]/7 blur-[100px] sm:blur-[140px] z-[1] pointer-events-none" />

      {/* Painter image */}
      <motion.div className="absolute bottom-0 right-[3%] z-[3] w-[32%] max-w-[380px] pointer-events-none hidden sm:block"
        style={{ x: fgX, y: fgY }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4 }}>
        <img src="/Assets/painter-bg-removed.webp" alt="" className="w-full h-auto object-contain object-bottom" draggable={false} />
      </motion.div>

      {/* Floating text badges — no icons */}
      {[
        { x: b1x, y: b1y, pos: 'top-[30%] right-[8%]',  d: -10, r: 3.6, bg: GOLD,    label: '4.8★', sub: 'Customer Rating' },
        { x: b2x, y: b2y, pos: 'top-[55%] right-[10%]', d: -8,  r: 4.4, bg: PURPLE,  label: '1-Year', sub: 'Warranty' },
      ].map(({ x, y, pos, d, r, bg, label, sub }) => (
        <motion.div key={label} className={`absolute ${pos} z-[5] hidden lg:block`} style={{ x, y }}>
          <motion.div animate={{ y: [0, d, 0] }} transition={{ duration: r, repeat: Infinity, ease: 'easeInOut' }}
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="flex items-center gap-2.5 bg-white/10 backdrop-blur-2xl border border-white/18 rounded-full px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black text-[#080B18]"
              style={{ background: bg }}>{label}</span>
            <span className="text-white text-xs font-semibold">{sub}</span>
          </motion.div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-[4] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-[480px] sm:max-w-[540px] lg:max-w-[620px]">

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex items-center gap-3 mb-5 sm:mb-7">
                <span className="w-7 h-px" style={{ background: GOLD }} />
                <span className="text-[13px] font-black uppercase tracking-[0.28em]" style={{ color: `${GOLD}cc` }}>
                  Calyco 5-Star Service
                </span>
              </div>
            </motion.div>

            <motion.div className="flex gap-1 mb-4 sm:mb-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
              {[...Array(5)].map((_, i) => (
                <motion.span key={i} className="text-[#F0C85A] text-sm sm:text-base"
                  initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 280, damping: 16 }}>★</motion.span>
              ))}
            </motion.div>

            <motion.h1
              className="text-[2.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-light text-white leading-[1.07] tracking-[-0.025em] mb-4 sm:mb-5"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
              Home services<br />at your <span style={{ color: GOLD }}>doorstep.</span>
            </motion.h1>

            <motion.p className="hidden sm:block text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-[420px] font-light"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.2 }}>
              Verified painters. Fixed quotes. Zero surprises.
            </motion.p>

            <motion.div className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }}>
              <Link to="/calculators/service-cost-calculator"
                className="inline-flex items-center gap-2 rounded-full text-[#0F1221] px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold hover:scale-[1.03] transition-all whitespace-nowrap"
                style={{ background: GOLD, boxShadow: `0 4px_20px ${GOLD}40` }}>
                Get Fixed Quote →
              </Link>
              <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 text-white px-5 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm whitespace-nowrap">
                Free Site Visit
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-16 bg-gradient-to-t from-white to-transparent z-[6] pointer-events-none" />
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
const ServicesPage = () => {
  const [modalCat, setModalCat] = useState(null);

  return (
    <main id="services-page-root" className="min-h-screen bg-white">
      <style>{`
        #services-page-root *::-webkit-scrollbar { display: none !important; }
        #services-page-root * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
      `}</style>

      <SEO
        title="Calyco Services — Painting, Waterproofing & Wall Design"
        description="Professional painting, waterproofing, texture and dampness repair services across 7 categories — transparent pricing, verified painters, free site inspection."
        url="https://calycopaints.com/services"
      />

      <ParallaxHero />
      <MarqueeStrip />
      <OffersCarousel />

      {/* 7 Category Cards */}
      <CategoryCardsSection onOpenCat={setModalCat} />

      <AnimatePresence>
        {modalCat && <CategoryModal cat={modalCat} onClose={() => setModalCat(null)} />}
      </AnimatePresence>

      {/* Promo banners */}
      <PromoBanner dark eyebrow="Calyco 5-Star" title="Premium interior painting. Fixed price after free inspection."
        cta="Book Inspection"
        href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
        image="/Assets/Rooms/LivingRoom/base.webp" />

      <PromoBanner eyebrow="Wall Design" title="Give your walls a personality."
        cta="Explore Textures" to="/services/texture-decorative-painting"
        image="/Assets/Texture Images/texture-main.webp" />

      <PromoBanner dark eyebrow="Waterproofing" title="Stop leaks before they damage your home."
        cta="Get Quote" to="/services/waterproofing"
        image="/Assets/u7859757176_Modern_luxury_bathroom_with_high_clerestory_windo_4f1ad61e-d8af-4e9c-bb17-4066db021cef_2.webp"
        accent="#60C8F0" />

      {/* Stats */}
      <section className="py-10 sm:py-16 border-t border-b border-[#0F1221]/6 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { from: 4.0, to: 4.8, decimals: 1, suffix: '★', label: 'Rating', sub: 'All services', color: GOLD },
              { from: 5, to: 10, decimals: 0, suffix: '', label: 'Services', sub: 'Painting to waterproofing', color: PURPLE },
              { from: 3, to: 7, decimals: 0, suffix: '', label: 'Categories', sub: 'Every surface type', color: '#1a6b9a' },
              { from: 0, to: 0, decimals: 0, prefix: '₹', label: 'Hidden charges', sub: 'Fixed price always', color: '#16a34a' },
            ].map(({ from, to, decimals, suffix, prefix, label, sub, color }) => (
              <motion.div key={label} className="text-center"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-3xl sm:text-5xl font-black mb-1 leading-none tracking-tight" style={{ color }}>
                  {prefix}<CountUp from={from} to={to} decimals={decimals} />{suffix}
                </p>
                <p className="text-[12px] sm:text-sm font-semibold text-[#0F1221] mt-1.5">{label}</p>
                <p className="text-[10px] sm:text-xs text-[#0F1221]/70 mt-0.5 font-light">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 sm:py-16 bg-[#FAFAF8] border-b border-[#0F1221]/6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <Reveal>
            <Eyebrow text="Process" />
            <h2 className="text-[1.8rem] sm:text-3xl font-light text-[#0F1221] tracking-[-0.02em] mb-8 sm:mb-10">
              How Calyco works
            </h2>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-4 pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { n: '01', label: 'Get estimate',    sub: 'Transparent pricing tool' },
              { n: '02', label: 'Book site visit', sub: 'Free inspection at your home' },
              { n: '03', label: 'Laser measure',   sub: 'Exact area confirmed' },
              { n: '04', label: 'Fixed quote',     sub: 'Scope & price in writing' },
              { n: '05', label: 'Track updates',   sub: 'Daily WhatsApp photos' },
            ].map(({ n, label, sub }, i) => (
              <motion.div key={n}
                className="flex-shrink-0 w-[155px] sm:w-auto bg-white rounded-2xl border border-[#0F1221]/8 p-4 sm:p-5 flex gap-3 items-start"
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <span className="text-[1.6rem] sm:text-[1.9rem] font-black leading-none flex-shrink-0 mt-0.5"
                  style={{ color: `${GOLD}55` }}>{n}</span>
                <div>
                  <p className="text-[11px] sm:text-[13px] font-bold text-[#0F1221] leading-tight">{label}</p>
                  <p className="text-[11px] sm:text-[11px] text-[#0F1221]/70 mt-0.5 leading-snug font-light">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-6 sm:py-10 border-b border-[#0F1221]/6">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <h2 className="text-[14px] sm:text-base font-bold text-[#0F1221] mb-4 tracking-tight">Available near you</h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              ['Delhi', 'painters-in-delhi'], ['Gurgaon', 'painters-in-gurgaon'], ['Noida', 'painters-in-noida'],
              ['Mumbai', 'painters-in-mumbai'], ['Pune', 'painters-in-pune'], ['Bengaluru', 'painters-in-bengaluru'],
              ['Hyderabad', 'painters-in-hyderabad'], ['Chennai', 'painters-in-chennai'], ['Ahmedabad', 'painters-in-ahmedabad'],
              ['Kolkata', 'painters-in-kolkata'], ['Jaipur', 'painters-in-jaipur'], ['Udaipur', 'painters-in-udaipur'],
              ['Chandigarh', 'painters-in-chandigarh'], ['Kochi', 'painters-in-kochi'], ['Lucknow', 'painters-in-lucknow'],
            ].map(([name, slug]) => (
              <Link key={slug} to={`/${slug}`}
                className="inline-flex items-center text-[11px] sm:text-xs font-medium text-[#0F1221]/55 bg-[#0F1221]/4 border border-[#0F1221]/8 rounded-full px-3 sm:px-3.5 py-1 sm:py-2 hover:border-[#493657]/30 hover:text-[#493657] transition-colors">
                {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
            <img src="/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp"
              alt="" loading="lazy" decoding="async" className="w-full h-[140px] sm:h-[220px] md:h-[280px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D1A]/90 via-[#0A0D1A]/55 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 sm:px-14">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-5 h-px" style={{ background: GOLD }} />
                  <span className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: `${GOLD}80` }}>Calyco Exterior</span>
                </div>
                <p className="text-base sm:text-3xl font-light text-white mb-4 max-w-xs sm:max-w-sm leading-snug tracking-tight">
                  Better walls. Inside and out.
                </p>
                <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full text-[#0F1221] px-5 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
                  style={{ background: GOLD }}>
                  Book on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="rounded-2xl sm:rounded-3xl bg-[#0F1221] px-6 sm:px-12 py-8 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none">
              <img src="/Assets/Rooms/LivingRoom/base.webp" alt="" className="h-full w-full object-cover opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F1221] to-transparent" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px" style={{ background: GOLD }} />
                <span className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: `${GOLD}70` }}>Ready to start?</span>
              </div>
              <p className="text-white text-xl sm:text-3xl font-light leading-snug tracking-tight max-w-sm sm:max-w-md">
                Fixed quote. Free site inspection.
              </p>
            </div>
            <div className="flex flex-row sm:flex-col md:flex-row gap-2.5 sm:gap-3 flex-shrink-0 relative z-10 w-full sm:w-auto">
              <Link to="/calculators/service-cost-calculator"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full text-[#0F1221] px-5 sm:px-8 py-3 sm:py-3.5 font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                style={{ background: GOLD }}>
                Calculate Cost →
              </Link>
              <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20to%20book%20a%20free%20site%20visit."
                target="_blank" rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-5 sm:px-8 py-3 sm:py-3.5 font-semibold text-sm hover:bg-white/8 transition-colors whitespace-nowrap">
                Free Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
