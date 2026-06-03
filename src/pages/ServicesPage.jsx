import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  motion, useScroll, useTransform, useMotionValue,
  useSpring, useInView, animate, AnimatePresence,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calculator, CalendarCheck, Star,
  MapPin, Shield, Zap, CheckCircle2, ArrowRight, MessageCircle,
  X as XIcon, ArrowUpRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import { servicePricing } from '../data/servicePricing';
import { SERVICE_CATEGORIES, SCENE_IMAGES, RATINGS } from '../data/serviceCategories';

/* ═══════════════════════════════════════════════
   MODAL SERVICE CARD — real image + premium design
═══════════════════════════════════════════════ */
const ModalServiceCard = ({ service, cat, onCardClick }) => {
  const img = SCENE_IMAGES[service.slug];
  const r = RATINGS[service.slug] || { r: 4.8, n: '1k+' };
  const isFree = service.baseMin === 0;
  const baseColor = cat?.gradient?.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#2E1A3E';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}>
      <Link
        to={`/services/${service.slug}`}
        className="group block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        onClick={onCardClick}>

        {/* Image area */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {img ? (
            <img
              src={img} alt={service.name}
              className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-600"
              loading="lazy" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-4xl"
              style={{ background: cat?.gradient }}>
              {cat?.emoji}
            </div>
          )}

          {/* Bottom fade overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Category emoji — frosted pill top-left */}
          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.20)' }}>
            <span className="text-[13px] leading-none">{cat?.emoji}</span>
          </div>

          {/* Free badge */}
          {isFree && (
            <span className="absolute top-2 right-2 bg-[#16a34a] text-white text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow">
              Free
            </span>
          )}

          {/* Price floated on image bottom-right */}
          <div className="absolute bottom-2 right-2">
            <span
              className="text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full"
              style={{ background: `${baseColor}dd`, color: cat?.accent || '#F0C85A' }}>
              {isFree ? 'Free' : `₹${service.baseMin}/${service.unit}`}
            </span>
          </div>
        </div>

        {/* Text row */}
        <div className="bg-white px-2.5 pt-2 pb-2.5">
          <p className="text-[11px] sm:text-[12.5px] font-bold text-[#0F1221] leading-snug line-clamp-2 mb-1">
            {service.name}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-2.5 h-2.5 text-[#F0C85A] fill-[#F0C85A] flex-shrink-0" />
            <span className="text-[9.5px] font-semibold text-gray-600">{r.r}</span>
            <span className="text-[9px] text-gray-400">({r.n})</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════
   CATEGORY CARD — premium gradient (main page)
═══════════════════════════════════════════════ */
const CategoryCard = ({ cat, onOpen }) => {
  /* Pull the first hex colour from the gradient string for the tint overlay */
  const baseColor = cat.gradient.match(/#[0-9a-fA-F]{6}/)?.[0] ?? '#000000';
  return (
  <motion.button
    type="button"
    onClick={() => onOpen(cat)}
    className="relative w-full text-left overflow-hidden rounded-2xl sm:rounded-3xl group focus:outline-none"
    style={{ aspectRatio: '3/4' }}
    whileHover={{ y: -7, scale: 1.01 }}
    transition={{ duration: 0.22, ease: 'easeOut' }}>

    {/* ── Layer 1: background ── */}
    {cat.image ? (
      /* Real photo — full opacity, zooms on hover */
      <img
        src={cat.image} alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        loading="lazy" />
    ) : (
      /* No photo fallback: gradient + dot texture */
      <>
        <div className="absolute inset-0" style={{ background: cat.gradient }} />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `radial-gradient(${cat.accent} 1px, transparent 1px)`, backgroundSize: '22px 22px' }} />
      </>
    )}

    {/* ── Layer 2 (photo only): brand-colour tint — heavy at bottom, fades out at top ── */}
    {cat.image && (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to top,
            ${baseColor}f0 0%,
            ${baseColor}a0 35%,
            ${baseColor}50 60%,
            ${baseColor}18 100%)`,
        }} />
    )}

    {/* ── Layer 3: extra dark bottom strip so white text pops ── */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />

    {/* ── Layer 4: hover glow ring ── */}
    <div
      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
      style={{ boxShadow: `inset 0 0 0 2px ${cat.accent}70, 0 24px 64px 0 ${cat.glow}` }} />

    <div className="relative z-10 h-full flex flex-col p-4 sm:p-5">

      {/* ── Top row: emoji (left) + badge (right) ── */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl flex items-center justify-center text-[24px] sm:text-[28px] shadow-lg group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.30)',
            backdropFilter: 'blur(12px)',
          }}>
          {cat.emoji}
        </div>
        <span
          className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}>
          {cat.slugs.length} services
        </span>
      </div>

      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Bottom: label + description + price + arrow ── */}
      <div>
        <h3 className="text-white font-bold text-[13px] sm:text-[15px] leading-tight mb-1">{cat.label}</h3>
        <p className="text-white/55 text-[9.5px] sm:text-[11px] leading-snug mb-3 line-clamp-2">{cat.description}</p>
        <div className="flex items-center justify-between">
          <p className="font-black text-[13px] sm:text-[15px]" style={{ color: cat.accent }}>{cat.fromPrice}</p>
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200"
            style={{ background: `${cat.accent}22` }}>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: cat.accent }} />
          </div>
        </div>
      </div>
    </div>
  </motion.button>
  );
};

/* ═══════════════════════════════════════════════
   CATEGORY MODAL — premium popup, all services
═══════════════════════════════════════════════ */
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
        style={{ maxHeight: '90vh', boxShadow: '0 32px 80px rgba(0,0,0,0.32)' }}
        initial={{ y: 80, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.9 }}>

        {/* Gradient header */}
        <div className="relative flex-shrink-0 px-5 sm:px-7 py-5 sm:py-6" style={{ background: cat.gradient }}>
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `radial-gradient(${cat.accent} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }} />
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-2xl sm:text-[26px] flex-shrink-0"
                style={{ background: `${cat.accent}22`, border: `1px solid ${cat.accent}35` }}>
                {cat.emoji}
              </div>
              <div>
                <h3 className="text-[16px] sm:text-[19px] font-bold text-white leading-tight">{cat.label}</h3>
                <p className="text-[11px] mt-0.5 font-medium leading-none" style={{ color: `${cat.accent}cc` }}>
                  {services.length} {cat.id === 'consultation' ? 'free services' : 'services available'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to={`/services/all?cat=${cat.id}`}
                onClick={onClose}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors"
                style={{ background: `${cat.accent}22`, color: cat.accent }}>
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
                style={{ background: `${cat.accent}20` }}>
                <XIcon className="w-4 h-4 text-white/80" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable service grid */}
        <div
          className="overflow-y-auto flex-1 px-4 sm:px-6 py-5 bg-[#F8F7FC]"
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
        <div className="flex-shrink-0 px-5 sm:px-7 py-3.5 border-t border-gray-100 bg-[#FAFAF8] flex items-center justify-between gap-4">
          <p className="text-[11px] sm:text-[12px] text-gray-500">
            All prices excl. GST · Final after free site inspection
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/services/all"
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-gray-200 text-gray-600 px-4 py-2 text-[11px] font-semibold hover:border-[#493657]/30 hover:text-[#493657] transition-colors whitespace-nowrap">
              All 66 services
            </Link>
            <Link
              to="/calculators/service-cost-calculator"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full text-white px-4 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-[12px] font-bold whitespace-nowrap transition-opacity hover:opacity-85"
              style={{ background: cat.gradient }}>
              <Calculator className="w-3.5 h-3.5" /> Get Estimate
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

/* ═══════════════════════════════════════════════
   CATEGORY CARDS SECTION
═══════════════════════════════════════════════ */
const CategoryCardsSection = ({ onOpenCat }) => (
  <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <motion.p
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#493657]/55 mb-2"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Calyco 5-Star Service
          </motion.p>
          <motion.h2
            className="text-[22px] sm:text-3xl lg:text-4xl font-bold text-[#0F1221] tracking-tight mb-2"
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            All Services, 12 Categories
          </motion.h2>
          <motion.p
            className="text-[12px] sm:text-base text-gray-500 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Tap any category to see all services, pricing & details.
          </motion.p>
        </div>
        {/* View All button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
          <Link
            to="/services/all"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#493657]/30 text-[#493657] px-5 sm:px-6 py-2.5 sm:py-3 text-[12px] sm:text-sm font-bold hover:bg-[#493657] hover:text-white hover:border-[#493657] transition-all whitespace-nowrap group">
            View All 66 Services
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* 12-card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.045 }}>
            <CategoryCard cat={cat} onOpen={onOpenCat} />
          </motion.div>
        ))}
      </div>

      {/* Sub-CTA */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-10"
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}>
        <Link to="/calculators/service-cost-calculator"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#493657] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-all shadow-[0_4px_20px_rgba(73,54,87,0.28)] hover:shadow-[0_6px_24px_rgba(240,200,90,0.38)]">
          <Calculator className="w-4 h-4" /> Get Free Estimate
        </Link>
        <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#493657]/25 text-[#493657] px-7 py-3.5 text-sm font-semibold hover:border-[#493657] hover:bg-[#493657]/5 transition-all">
          <CalendarCheck className="w-4 h-4" /> Book Free Visit
        </a>
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   PROMO BANNER
═══════════════════════════════════════════════ */
const PromoBanner = ({ dark, eyebrow, title, cta, to, href, image, accent = '#F0C85A' }) => {
  const Wrap = ({ children }) => to
    ? <Link to={to}>{children}</Link>
    : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
  return (
    <section className="py-2 sm:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className={`relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-between gap-3 px-5 py-6 sm:px-12 sm:py-10 min-h-[110px] sm:min-h-[152px] ${dark ? 'bg-[#1A0B25]' : 'bg-[#F7F3EE] border border-[#e5e0d8]'}`}>
          {image && (
            <div className="absolute right-0 top-0 bottom-0 w-[45%] sm:w-[50%] pointer-events-none overflow-hidden">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-r from-[#1A0B25] via-[#1A0B25]/90 to-transparent' : 'bg-gradient-to-r from-[#F7F3EE] via-[#F7F3EE]/90 to-transparent'}`} />
            </div>
          )}
          <div className="relative z-10 max-w-[60%] sm:max-w-lg">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-bold mb-1.5 sm:mb-2"
              style={{ color: dark ? `${accent}88` : '#49365766' }}>{eyebrow}</p>
            <p className={`text-base sm:text-2xl md:text-3xl font-semibold sm:font-light leading-snug ${dark ? 'text-white' : 'text-[#0F1221]'}`}>{title}</p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <Wrap>
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-6 py-2 sm:py-3 text-[11px] sm:text-sm font-bold transition-all hover:opacity-85 active:scale-95 whitespace-nowrap"
                style={{ background: accent, color: dark ? '#080B18' : '#fff' }}>
                {cta} <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </span>
            </Wrap>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   OFFERS AUTO-CAROUSEL
═══════════════════════════════════════════════ */
const OFFERS = [
  {
    tag: 'Always Free', tagDot: '#F0C85A',
    headline: 'Free site inspection\n+ laser measurement',
    sub: 'No charges, no obligation. Book on WhatsApp in 30 seconds.',
    cta: { label: 'Book now', to: '/get-quote' },
    bg: 'linear-gradient(135deg,#1A0826 0%,#3d1f5a 50%,#493657 100%)',
    textColor: '#fff', accent: '#F0C85A',
    image: '/Assets/painter-bg-removed.webp',
  },
  {
    tag: 'New Service', tagDot: '#d4960a',
    headline: 'Texture & stencil\nfrom ₹35/sq ft',
    sub: 'Sand, stucco, Italian & designer feature walls.',
    cta: { label: 'Explore textures', to: '/services/texture-painting' },
    bg: 'linear-gradient(135deg,#2a1800 0%,#6b3d00 50%,#9a6400 100%)',
    textColor: '#fff', accent: '#F0C85A',
    image: '/Assets/Texture Images/texture-main.webp',
  },
  {
    tag: 'Protect Home', tagDot: '#60C8F0',
    headline: 'Waterproofing\nfrom ₹45/sq ft',
    sub: 'Terrace, roof, bathroom, basement — all sealed.',
    cta: { label: 'Get waterproofing', to: '/services/terrace-waterproofing' },
    bg: 'linear-gradient(135deg,#041520 0%,#0a2d45 50%,#0e4060 100%)',
    textColor: '#fff', accent: '#60C8F0',
    image: '/Assets/u7859757176_Modern_luxury_bathroom_with_high_clerestory_windo_4f1ad61e-d8af-4e9c-bb17-4066db021cef_2.webp',
  },
  {
    tag: 'Most Popular', tagDot: '#c08aff',
    headline: 'Full home painting\n1-year warranty',
    sub: 'Fixed quote, laser measurement, daily photo updates.',
    cta: { label: 'Get quote', to: '/services/full-house-painting' },
    bg: 'linear-gradient(135deg,#120820 0%,#2e1545 50%,#4a2070 100%)',
    textColor: '#fff', accent: '#c08aff',
    image: '/service/Full House Painting.jpg',
  },
  {
    tag: 'Free', tagDot: '#40e888',
    headline: 'Colour consultation\n& system advice',
    sub: 'Expert shade, finish & paint-system guidance at zero cost.',
    cta: { label: 'Book free', to: '/services/colour-consultation' },
    bg: 'linear-gradient(135deg,#041810 0%,#0a3020 50%,#105038 100%)',
    textColor: '#fff', accent: '#40e888',
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
    <section className="py-4 sm:py-5 border-b border-gray-100"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">

        {/* ── Card ── */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{ minHeight: 'clamp(200px, 46vw, 280px)' }}>

          {/* Background gradient */}
          <AnimatePresence mode="wait">
            <motion.div key={`bg-${idx}`} className="absolute inset-0"
              style={{ background: o.bg }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }} />
          </AnimatePresence>

          {/* Dot-grid texture for premium depth */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Accent glow blob */}
          <div className="absolute -top-10 left-1/3 w-64 sm:w-96 h-64 sm:h-96 rounded-full pointer-events-none opacity-20"
            style={{ background: o.accent, filter: 'blur(90px)' }} />

          {/* Image panel */}
          <AnimatePresence mode="wait">
            <motion.div key={`img-${idx}`}
              className="absolute right-0 top-0 bottom-0 w-[44%] sm:w-[42%] pointer-events-none overflow-hidden"
              initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <img src={o.image} alt="" className="h-full w-full object-cover scale-[1.04]" />
              {/* Three-stop fade: full opaque → translucent → transparent */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to right, ${base} 0%, ${base}d0 28%, ${base}70 55%, transparent 100%)` }} />
              {/* Top/bottom fades */}
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, ${base}60 0%, transparent 30%, transparent 70%, ${base}60 100%)` }} />
            </motion.div>
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 flex items-center h-full px-6 sm:px-10 lg:px-14 py-8 sm:py-11">
            <AnimatePresence mode="wait">
              <motion.div key={`txt-${idx}`}
                className="max-w-[54%] sm:max-w-[48%]"
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 }}>

                {/* Tag badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-3 sm:mb-4"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(12px)' }}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: o.accent, boxShadow: `0 0 6px ${o.accent}` }} />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-white/90">{o.tag}</span>
                </div>

                {/* Headline */}
                <p className="text-[22px] sm:text-3xl md:text-4xl font-bold leading-[1.12] tracking-tight mb-2 sm:mb-3 whitespace-pre-line text-white">
                  {o.headline}
                </p>

                {/* Sub */}
                <p className="hidden sm:block text-sm sm:text-[15px] mb-5 leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {o.sub}
                </p>

                {/* CTA */}
                <Link to={o.cta.to}
                  className="inline-flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-95"
                  style={{
                    background: o.accent,
                    color: '#0A0A12',
                    boxShadow: `0 6px 24px ${o.accent}55`,
                  }}>
                  {o.cta.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide counter — top right */}
          <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.28)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="text-white font-black text-[11px] leading-none">{idx + 1}</span>
            <span className="text-white/40 text-[11px] leading-none">/</span>
            <span className="text-white/50 text-[11px] leading-none">{OFFERS.length}</span>
          </div>
        </div>

        {/* ── Premium dots with animated progress fill ── */}
        <div className="flex items-center justify-center gap-2 mt-3.5">
          {OFFERS.map((slide, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className="relative overflow-hidden rounded-full transition-all duration-400"
              style={{
                width: i === idx ? 28 : 6,
                height: 6,
                background: i === idx ? 'transparent' : '#d1d5db',
                border: i === idx ? `1px solid ${slide.accent}60` : 'none',
              }}>
              {/* Base fill */}
              {i === idx && (
                <div className="absolute inset-0 rounded-full opacity-30" style={{ background: slide.accent }} />
              )}
              {/* Animated gold progress fill */}
              {i === idx && !paused && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
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

/* ═══════════════════════════════════════════════
   COUNT-UP
═══════════════════════════════════════════════ */
const CountUp = ({ from = 0, to, decimals = 0 }) => {
  const ref = useRef(null);
  const isIn = useInView(ref, { once: true });
  const v = useMotionValue(from);
  const [disp, setDisp] = useState(from.toFixed(decimals));
  useEffect(() => {
    if (!isIn) return;
    const ctrl = animate(v, to, { duration: 1.6, ease: 'easeOut', onUpdate: (n) => setDisp(n.toFixed(decimals)) });
    return ctrl.stop;
  }, [isIn, to, from, decimals, v]);
  return <span ref={ref}>{disp}</span>;
};

/* ═══════════════════════════════════════════════
   PARALLAX HERO
═══════════════════════════════════════════════ */
const ParallaxHero = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sp = { stiffness: 40, damping: 22, mass: 0.9 };
  const bgX = useSpring(useTransform(mx, [-0.5, 0.5], [-20, 20]), sp);
  const bgY = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), sp);
  const fgX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), sp);
  const fgY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), sp);
  const b1x = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), sp);
  const b1y = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), sp);
  const b2x = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), sp);
  const b2y = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), sp);
  const b3x = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), sp);
  const b3y = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), sp);
  const b4x = useSpring(useTransform(mx, [-0.5, 0.5], [20, -20]), sp);
  const b4y = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), sp);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left - r.width / 2) / r.width);
    my.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  const badgeCls = 'flex items-center gap-2.5 bg-white/10 backdrop-blur-2xl border border-white/18 rounded-full px-4 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]';
  return (
    <section ref={ref}
      className="relative overflow-hidden bg-[#080B18] select-none h-[320px] sm:h-[600px] lg:h-[min(92vh,900px)]"
      onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div className="absolute inset-[-6%] z-0" style={{ x: bgX, y: bgY }}>
        <motion.img
          src="/Assets/HERO/hero3_Modern_interior_wall_in_a_house_or_apartment_living_fc50ad6e-a99a-46d5-8608-8b3466c0eb0a.webp"
          alt="" className="w-full h-full object-cover brightness-[0.36]"
          style={{ y: scrollY }} loading="eager" />
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#080B18]/98 via-[#080B18]/70 to-[#080B18]/10 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#080B18]/90 via-transparent to-[#080B18]/25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#F0C85A]/7 blur-[100px] sm:blur-[140px] z-[1] pointer-events-none" />
      <motion.div className="absolute bottom-0 right-[3%] z-[3] w-[32%] max-w-[380px] pointer-events-none hidden sm:block"
        style={{ x: fgX, y: fgY }} initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ duration:1.2,delay:0.4 }}>
        <img src="/Assets/painter-bg-removed.webp" alt="" className="w-full h-auto object-contain object-bottom" draggable={false} />
      </motion.div>
      {[
        { x:b1x,y:b1y,pos:'top-[15%] right-[8%]',  d:-10,r:3.6, icon:<CheckCircle2 className="w-3.5 h-3.5 text-[#080B18]" strokeWidth={2.5}/>, bg:'#F0C85A',  text:'Verified Painters' },
        { x:b2x,y:b2y,pos:'top-[38%] right-[6%]',  d:-8, r:4.4, icon:<MapPin className="w-3.5 h-3.5 text-white"/>,                              bg:'#493657',  text:'25 Cities Served' },
        { x:b3x,y:b3y,pos:'top-[60%] right-[12%]', d:-12,r:3.9, icon:<Shield className="w-3.5 h-3.5 text-white"/>,                              bg:'#16a34a',  text:'1-Year Warranty' },
        { x:b4x,y:b4y,pos:'top-[76%] right-[19%]', d:-9, r:4.7, icon:<span className="font-black text-[11px] text-[#080B18]">₹</span>,           bg:'#F0C85A',  text:'Fixed Pricing' },
      ].map(({ x, y, pos, d, r, icon, bg, text }) => (
        <motion.div key={text} className={`absolute ${pos} z-[5] hidden lg:block`} style={{ x, y }}>
          <motion.div className={badgeCls} animate={{ y:[0,d,0] }} transition={{ duration:r,repeat:Infinity,ease:'easeInOut' }}
            initial={{ opacity:0,scale:0.8 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }}>
            <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:bg }}>{icon}</span>
            <span className="text-white text-xs font-semibold">{text}</span>
          </motion.div>
        </motion.div>
      ))}
      <div className="relative z-[4] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
          <div className="max-w-[480px] sm:max-w-[540px] lg:max-w-[620px]">
            <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7 }}>
              <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-[#F0C85A]/35 bg-[#F0C85A]/10 backdrop-blur-md px-3 sm:px-5 py-1.5 sm:py-2.5 mb-3 sm:mb-5">
                <div className="flex gap-0.5">{[0,1,2,3,4].map((i) => (
                  <motion.span key={i} className="text-[#F0C85A] text-sm sm:text-base leading-none"
                    initial={{ opacity:0,scale:0.3 }} animate={{ opacity:1,scale:1 }}
                    transition={{ delay:0.1+i*0.07,type:'spring',stiffness:280,damping:16 }}>★</motion.span>
                ))}</div>
                <span className="w-px h-3 sm:h-4 bg-[#F0C85A]/30 flex-shrink-0" />
                <span className="text-[#F0C85A] text-[9px] sm:text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap">5-Star Painting Service</span>
              </div>
            </motion.div>
            <motion.h1
              className="text-[26px] sm:text-5xl md:text-[60px] lg:text-[68px] font-light text-white leading-[1.1] tracking-[-0.02em] mb-3 sm:mb-5"
              initial={{ opacity:0,y:24 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.9,delay:0.1 }}>
              Home services<br />at your <span className="text-[#F0C85A]">doorstep.</span>
            </motion.h1>
            <motion.p className="hidden sm:block text-base sm:text-lg text-white/60 leading-[1.75] mb-6 max-w-[420px] font-light"
              initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.85,delay:0.2 }}>
              Verified painters. Free inspection. Fixed quotes. Zero surprises.
            </motion.p>
            <motion.div className="flex flex-wrap gap-2 sm:gap-3" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.7,delay:0.25 }}>
              <Link to="/calculators/service-cost-calculator"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F0C85A] text-[#080B18] px-4 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold hover:bg-white transition-all shadow-[0_4px_20px_rgba(240,200,90,0.4)]">
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Get Fixed Quote
              </Link>
              <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 border-white/50 text-white px-4 sm:px-7 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold hover:bg-white/15 hover:border-white/70 transition-all backdrop-blur-sm">
                <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Free Site Visit
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-16 bg-gradient-to-t from-white to-transparent z-[6] pointer-events-none" />
    </section>
  );
};

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
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
        description="66 professional painting, waterproofing, wall design and surface care services across 12 categories — transparent pricing, verified painters, free site inspection."
        url="https://calycopaints.com/services"
      />

      <ParallaxHero />
      <OffersCarousel />

      {/* 12 Category Cards */}
      <CategoryCardsSection onOpenCat={setModalCat} />

      {/* Category modal */}
      <AnimatePresence>
        {modalCat && <CategoryModal cat={modalCat} onClose={() => setModalCat(null)} />}
      </AnimatePresence>

      {/* Promo banners */}
      <PromoBanner dark eyebrow="Calyco 5-Star" title="Premium interior painting. Fixed price after free inspection."
        cta="Book Inspection"
        href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
        image="/Assets/Rooms/LivingRoom/base.webp" />

      <PromoBanner eyebrow="Wall Design" title="Give your walls a personality."
        cta="Explore Textures" to="/services/texture-painting"
        image="/Assets/Texture Images/texture-main.webp" accent="#F0C85A" />

      <PromoBanner dark eyebrow="Waterproofing" title="Stop leaks before they damage your home."
        cta="Get Quote" to="/services/terrace-waterproofing"
        image="/Assets/u7859757176_Modern_luxury_bathroom_with_high_clerestory_windo_4f1ad61e-d8af-4e9c-bb17-4066db021cef_2.webp"
        accent="#60C8F0" />

      {/* Feature strip */}
      <section className="py-2 sm:py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
            <img src="/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp"
              alt="" className="w-full h-[140px] sm:h-[220px] md:h-[280px] object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D1A]/90 via-[#0A0D1A]/55 to-transparent" />
            <div className="absolute inset-0 flex items-center px-5 sm:px-14">
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#F0C85A]/80 mb-1.5 sm:mb-2">Calyco Exterior</p>
                <p className="text-base sm:text-3xl font-light text-white mb-3 sm:mb-4 max-w-xs sm:max-w-sm leading-snug">
                  Homes that deserve better — inside and out.
                </p>
                <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#F0C85A] text-[#080B18] px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-sm font-bold hover:bg-white transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-7 sm:py-12 border-t border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { from:4.0,to:4.8,decimals:1,suffix:'★',label:'Rating',sub:'All services',color:'#F0C85A' },
              { from:40, to:66, decimals:0,suffix:'+', label:'Services',sub:'Interior to industrial',color:'#493657' },
              { from:8,  to:12, decimals:0,suffix:'',  label:'Categories',sub:'Every surface type',color:'#1a6b9a' },
              { from:0,  to:0,  decimals:0,prefix:'₹', label:'Hidden charges',sub:'Fixed price always',color:'#16a34a' },
            ].map(({ from,to,decimals,suffix,prefix,label,sub,color }) => (
              <motion.div key={label} className="text-center"
                initial={{ opacity:0,y:16 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }}>
                <p className="text-2xl sm:text-4xl font-black mb-0.5 sm:mb-1" style={{ color }}>
                  {prefix}<CountUp from={from} to={to} decimals={decimals} />{suffix}
                </p>
                <p className="text-[12px] sm:text-sm font-semibold text-[#0F1221]">{label}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-6 sm:py-10 bg-[#FAFAF8] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-[15px] sm:text-xl font-bold text-[#0F1221] mb-1">How Calyco works</h2>
          <p className="text-[11px] sm:text-sm text-gray-400 mb-4 sm:mb-7">Step-by-step from first call to final handover</p>
          <div className="flex gap-3 overflow-x-auto sm:grid sm:grid-cols-5 sm:gap-3 pb-1"
            style={{ scrollbarWidth:'none', msOverflowStyle:'none' }}>
            {[
              { n:1, label:'Get estimate',   sub:'Transparent pricing tool',   icon:Calculator },
              { n:2, label:'Book site visit', sub:'Free inspection on WhatsApp', icon:MessageCircle },
              { n:3, label:'Laser measure',  sub:'Exact area confirmed',         icon:Zap },
              { n:4, label:'Fixed quote',    sub:'Scope & price in writing',     icon:Shield },
              { n:5, label:'Track updates',  sub:'Daily WhatsApp photos',        icon:CheckCircle2 },
            ].map(({ n, label, sub, icon:Icon }, i) => (
              <motion.div key={n}
                className="flex-shrink-0 w-[140px] sm:w-auto bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-sm flex gap-2.5 sm:gap-3 items-start"
                initial={{ opacity:0,y:10 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-[#F0C85A]/20 flex items-center justify-center font-black text-[#493657] text-xs sm:text-sm flex-shrink-0">{n}</div>
                <div>
                  <p className="text-[11px] sm:text-[13px] font-bold text-[#0F1221]">{label}</p>
                  <p className="text-[9px] sm:text-[11px] text-gray-400 mt-0.5 leading-snug">{sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-5 sm:py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-[14px] sm:text-lg font-bold text-[#0F1221] mb-3">Available near you</h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[['Delhi','painters-in-delhi'],['Gurgaon','painters-in-gurgaon'],['Noida','painters-in-noida'],
              ['Mumbai','painters-in-mumbai'],['Pune','painters-in-pune'],['Bengaluru','painters-in-bengaluru'],
              ['Hyderabad','painters-in-hyderabad'],['Chennai','painters-in-chennai'],['Ahmedabad','painters-in-ahmedabad'],
              ['Kolkata','painters-in-kolkata'],['Jaipur','painters-in-jaipur'],['Udaipur','painters-in-udaipur'],
              ['Chandigarh','painters-in-chandigarh'],['Kochi','painters-in-kochi'],['Lucknow','painters-in-lucknow'],
            ].map(([name, slug]) => (
              <Link key={slug} to={`/${slug}`}
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 rounded-full px-2.5 sm:px-3.5 py-1 sm:py-2 hover:border-[#493657]/30 hover:text-[#493657] transition-colors">
                <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />{name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="rounded-xl sm:rounded-2xl bg-[#493657] px-5 sm:px-12 py-7 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none">
              <img src="/Assets/Rooms/LivingRoom/base.webp" alt="" className="h-full w-full object-cover opacity-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#493657] to-transparent" />
            </div>
            <div className="relative z-10">
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F0C85A]/70 mb-1.5 sm:mb-2">Ready to start?</p>
              <p className="text-white text-base sm:text-2xl font-light leading-snug max-w-xs sm:max-w-md">
                Get a fixed written quote after our free site inspection.
              </p>
            </div>
            <div className="flex flex-row sm:flex-col md:flex-row gap-2 sm:gap-3 flex-shrink-0 relative z-10 w-full sm:w-auto">
              <Link to="/calculators/service-cost-calculator"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-4 sm:px-7 py-2.5 sm:py-3.5 font-bold text-[11px] sm:text-sm hover:bg-white transition-colors shadow-lg">
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Calculate Cost
              </Link>
              <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20to%20book%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-white/30 text-white px-4 sm:px-7 py-2.5 sm:py-3.5 font-semibold text-[11px] sm:text-sm hover:bg-white/10 transition-colors">
                <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Free Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
