import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion, useInView, useScroll, useTransform,
  useMotionValue, useSpring, AnimatePresence
} from 'framer-motion';
import SEO from '../components/SEO';
import ReviewsSection from '../components/ReviewsSection';
import { serviceHubCards } from '../data/servicePricing';
import { BRAND_NAME } from '../data/positioning';
import contactData from '../data/admin/contact.json';

// ── Image paths ────────────────────────────────────────────────────────────────
const IMG_HERO    = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_18_13 PM.png');
const IMG_SPLIT_1 = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_00_24 PM.png');
const IMG_SPLIT_2 = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_11_55 PM.png');

// ── Theme tokens ───────────────────────────────────────────────────────────────
const C = {
  bg:     '#F7F6F3',
  surface:'#FFFFFF',
  card:   '#F0EDE8',
  border: 'rgba(15,18,33,0.08)',
  gold:   '#D4A017',
  purple: '#493657',
  text:   '#0F1221',
};

// ── Shared SVGs ────────────────────────────────────────────────────────────────
const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Star = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Animated counter ───────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '', duration = 1800 }) => {
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

// ── Magnetic tilt card ─────────────────────────────────────────────────────────
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

// ── Fade-up animation wrapper ──────────────────────────────────────────────────
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

// ── Section eyebrow ────────────────────────────────────────────────────────────
const Eyebrow = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-6 h-px bg-[#F0C85A]" />
    <span className="text-[13px] font-bold uppercase tracking-[0.25em] text-[#F0C85A]">{text}</span>
  </div>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 1 — FULL-SCREEN HERO
// ══════════════════════════════════════════════════════════════════
const HeroV2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 10) return;
    const msg = `Hi Calyco! I'd like a free site visit.\nName: ${form.name}\nPhone: ${form.phone}`;
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const headline = ['Calyco', '5-Star', 'Painting', 'Services.'];

  return (
    <section ref={ref} className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0F1221]">

      {/* Parallax image */}
      <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: imgY }}>
        <img src={IMG_HERO} alt="" aria-hidden className="w-full h-full object-cover object-center" />
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1221]/90 via-[#0F1221]/70 to-[#0F1221]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/80 via-transparent to-[#0F1221]/20" />
      </motion.div>

      {/* Gold ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#F0C85A]/5 blur-[140px] pointer-events-none z-[1]" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-[#493657]/10 blur-[100px] pointer-events-none z-[1]" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-0 pt-36"
      >
        <div className="max-w-3xl">

          {/* Stars badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-2.5 mb-7"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} cls="w-4 h-4 text-[#F0C85A]" />)}
            </div>
            <div className="w-px h-3.5 bg-white/15" />
            <span className="text-white/45 text-[11px] font-semibold uppercase tracking-[0.22em]">Calyco 5-Star Painting Services</span>
          </motion.div>

          {/* Word-by-word headline */}
          <h1 className="mb-6 leading-[1.06] tracking-[-0.025em]">
            {headline.map((word, wi) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.15 + wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`inline-block mr-[0.22em] text-[3rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.2rem] font-light
                  ${word === 'Services.' ? 'text-[#F0C85A] font-semibold' : 'text-white'}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-white/55 text-base sm:text-lg font-light leading-[1.8] mb-10 max-w-xl"
          >
            Professional house painters you can count on —
            verified teams, fixed quotes, and a warranty-backed finish.
          </motion.p>

          {/* Booking form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="mb-8"
          >
            <div className="inline-block rounded-2xl p-[1px] bg-gradient-to-r from-[#F0C85A]/40 via-white/10 to-transparent max-w-xl w-full">
              <div className="rounded-2xl bg-white/8 backdrop-blur-xl p-5">
                <p className="text-white font-semibold text-sm mb-4">Get a Free Site Inspection</p>
                {sent ? (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[#F0C85A] text-sm py-2"
                  >
                    WhatsApp opening… Our team responds within 2 hours.
                  </motion.p>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text" placeholder="Your name" required value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="flex-1 bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F0C85A]/50 transition-colors"
                    />
                    <input
                      type="tel" placeholder="Phone number" maxLength={10} required value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="flex-1 bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F0C85A]/50 transition-colors"
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-shrink-0 flex items-center justify-center gap-2 bg-[#F0C85A] text-[#07090f] px-5 py-3 rounded-xl text-sm font-bold hover:bg-white transition-colors shadow-[0_4px_24px_rgba(240,200,90,0.35)]"
                    >
                      <WaIcon /> Book
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/calculators/service-cost-calculator"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-white/20 transition-all"
            >
              Calculate My Cost →
            </Link>
            <Link to="/services"
              className="inline-flex items-center gap-2 text-white/45 text-sm font-medium hover:text-white transition-colors"
            >
              View all services ↗
            </Link>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.0 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="bg-white/5 backdrop-blur-lg border-t border-white/8">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 grid grid-cols-4 gap-4">
            {[
              { v: '15,000+', l: 'Happy Customers' },
              { v: '500+',    l: 'Verified Painters' },
              { v: '25+',     l: 'Cities' },
              { v: '4.8★',    l: 'Customer Rating' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="text-white font-bold text-lg sm:text-xl leading-none">{v}</p>
                <p className="text-white/40 text-[11px] font-medium mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-20 right-8 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-14 bg-gradient-to-b from-[#F0C85A]/60 to-transparent"
        />
        <span className="text-white/25 text-[9px] uppercase tracking-[0.28em]" style={{ writingMode: 'vertical-rl' }}>scroll</span>
      </motion.div>

    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 2 — MARQUEE STRIP
// ══════════════════════════════════════════════════════════════════
const TICKER = [
  'Verified Painters', 'Fixed Written Quote', 'Daily WhatsApp Updates',
  'Proper Wall Preparation', 'Clean Worksite', '1-Year Warranty',
  '25+ Cities', '15,000+ Customers', 'Free Site Inspection', 'Final Quality Check',
];

const MarqueeStrip = () => (
  <div className="bg-[#0F1221] border-y border-white/8 py-4 overflow-hidden">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      className="flex gap-0 flex-shrink-0 w-max"
    >
      {[...TICKER, ...TICKER].map((t, i) => (
        <div key={i} className="flex items-center gap-3 px-7 flex-shrink-0">
          <Star cls="w-3 h-3 text-[#F0C85A]/70" />
          <span className="text-white/50 text-[13px] font-medium tracking-[0.04em] whitespace-nowrap">{t}</span>
        </div>
      ))}
    </motion.div>
  </div>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 3 — SERVICES
// ══════════════════════════════════════════════════════════════════
const ServicesV2 = () => (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceHubCards.slice(0, 6).map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.07}>
            <TiltCard className="h-full">
              <Link
                to={`/services/${s.slug}`}
                className="group block relative overflow-hidden rounded-2xl border border-[#0F1221]/8 bg-white h-full hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)] transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={s.image} alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute top-3 right-3 bg-[#0F1221] text-white text-[11px] font-bold px-3 py-1.5 rounded-full"
                  >
                    ₹{s.startingPrice}/sqft
                  </motion.span>
                </div>

                {/* Body */}
                <div className="p-5 flex items-center justify-between">
                  <h3 className="text-[#0F1221] font-semibold text-sm group-hover:text-[#493657] transition-colors duration-300">{s.title}</h3>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="w-8 h-8 rounded-full bg-[#493657]/8 flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-[#493657]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#493657]/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-10 flex gap-3">
        <Link to="/get-quote"
          className="inline-flex items-center gap-2 bg-[#0F1221] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors"
        >
          Get Free Estimate
        </Link>
        <Link to="/services"
          className="inline-flex items-center gap-2 border border-[#0F1221]/15 text-[#0F1221]/55 px-7 py-3.5 rounded-full text-sm font-medium hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-all"
        >
          All Services →
        </Link>
      </Reveal>

    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 4 — WHY 5-STAR (sticky split)
// ══════════════════════════════════════════════════════════════════
const WhyV2 = () => {
  const points = [
    { n: '01', t: 'Verified Painters',       d: 'Background-checked, skill-tested, rated by real customers — before every project.' },
    { n: '02', t: 'Fixed Written Quote',     d: 'Scope, area, materials, price — all locked in writing. The number never changes.' },
    { n: '03', t: 'Proper Wall Preparation', d: 'Crack filling, putty, sanding, primer — done correctly before the first coat.' },
    { n: '04', t: 'Daily Photo Updates',     d: 'WhatsApp progress photos every day. You see every stage without being on site.' },
    { n: '05', t: '1-Year Warranty',         d: 'Any defect within 12 months of handover is fixed at zero additional cost.' },
  ];

  return (
    <section className="bg-[#0a0d16]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">

          {/* Left — sticky image panel */}
          <div className="relative h-[55vh] lg:h-auto lg:sticky lg:top-0 overflow-hidden">
            <img src={IMG_SPLIT_1} alt="" className="w-full h-full object-cover brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0d16]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d16] via-transparent to-transparent" />

            {/* Overlay content */}
            <div className="absolute bottom-8 left-8 right-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} cls="w-5 h-5 text-[#F0C85A]" />)}
                </div>
                <p className="text-white font-light text-2xl lg:text-3xl leading-[1.25] tracking-[-0.01em]">
                  "Five non-negotiables<br />on every project."
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — numbered list */}
          <div className="px-8 sm:px-12 lg:px-14 py-16 sm:py-20 bg-white">
            <Reveal>
              <Eyebrow text="The Standard" />
              <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] leading-[1.1] tracking-[-0.02em] mb-12">
                Why We Call It<br /><span className="font-semibold text-[#493657]">5-Star.</span>
              </h2>
            </Reveal>

            <div>
              {points.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex gap-5 py-7 border-b border-[#0F1221]/6 last:border-b-0 cursor-default"
                >
                  <span className="text-[11px] font-black text-[#0F1221]/15 tracking-[0.08em] flex-shrink-0 pt-1">{p.n}</span>
                  <div>
                    <p className="font-semibold text-[#0F1221] text-base mb-1.5 group-hover:text-[#493657] transition-colors duration-300">{p.t}</p>
                    <p className="text-[#0F1221]/45 text-sm font-light leading-[1.8]">{p.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-10">
              <Link to="/get-quote"
                className="inline-flex items-center gap-2.5 bg-[#0F1221] text-white px-7 py-4 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Book Free Inspection →
              </Link>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 5 — ANIMATED STATS
// ══════════════════════════════════════════════════════════════════
const StatsV2 = () => (
  <section className="bg-[#493657] py-20 sm:py-24 relative overflow-hidden">

    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
        {[
          { to: 15000, suffix: '+', label: 'Happy Customers',   delay: 0 },
          { to: 500,   suffix: '+', label: 'Verified Painters', delay: 0.1 },
          { to: 25,    suffix: '+', label: 'Cities Served',     delay: 0.2 },
          { to: 7,     suffix: '+', label: 'Years Experience',  delay: 0.3 },
        ].map(({ to, suffix, label, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.65 }}
            className="text-center group"
          >
            <div className="inline-block">
              <p className="text-white font-black text-5xl sm:text-6xl lg:text-7xl leading-none mb-3 group-hover:text-[#F0C85A] transition-colors duration-500">
                <Counter to={to} suffix={suffix} />
              </p>
              <div className="w-8 h-[2px] bg-white/30 mx-auto mb-3 group-hover:w-full group-hover:bg-[#F0C85A] transition-all duration-500" />
              <p className="text-white/55 text-sm font-medium tracking-[0.04em]">{label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 6 — PROCESS TIMELINE
// ══════════════════════════════════════════════════════════════════
const ProcessV2 = () => {
  const steps = [
    { n: '01', t: 'Book Free Inspection',     d: 'Tell us your location and requirement. No charges, no commitment.' },
    { n: '02', t: 'Site Visit & Measurement', d: 'Laser area measurement, crack check, and surface condition assessment.' },
    { n: '03', t: 'Fixed Written Quote',       d: 'Clear pricing, scope, materials, timeline and exclusions — in writing.' },
    { n: '04', t: 'Verified Team Assigned',    d: 'Calyco-screened background-checked painters assigned to your project.' },
    { n: '05', t: 'Daily Progress Updates',    d: 'Photos and notes shared on WhatsApp every single day.' },
    { n: '06', t: 'Final Quality Check',       d: '27-point checklist, touch-ups, cleanup, and your sign-off before we leave.' },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">

          {/* Label col */}
          <div className="lg:w-72 flex-shrink-0 lg:sticky lg:top-28 self-start">
            <Reveal>
              <Eyebrow text="Our Process" />
              <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] leading-[1.1] tracking-[-0.02em] mb-5">
                How Calyco<br /><span className="font-semibold text-[#493657]">Delivers.</span>
              </h2>
              <p className="text-[#0F1221]/45 text-sm font-light leading-[1.85] mb-6">
                Six structured steps from first call to final handover.
              </p>
              <Link to="/how-it-works" className="inline-flex items-center gap-1.5 text-sm text-[#493657] hover:text-[#0F1221] transition-colors font-semibold">
                Full process details →
              </Link>
            </Reveal>
          </div>

          {/* Steps */}
          <div className="flex-1 relative">
            <div className="absolute left-[19px] top-2 bottom-10 w-px hidden sm:block"
              style={{ background: 'linear-gradient(to bottom, #493657, rgba(73,54,87,0.2), transparent)' }}
            />

            <div className="space-y-0">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-6 sm:gap-8 group"
                >
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center z-10 border border-[#0F1221]/10 bg-white group-hover:border-[#493657]/40 group-hover:bg-[#493657]/5 transition-all"
                    >
                      <span className="text-[10px] font-black text-[#0F1221]/30 group-hover:text-[#493657] transition-colors">{s.n}</span>
                    </motion.div>
                  </div>

                  <div className="flex-1 pb-10 last:pb-0 border-b border-[#0F1221]/6 last:border-b-0">
                    <span className="text-[10px] font-black text-[#0F1221]/20 sm:hidden mb-1 block">{s.n}</span>
                    <h3 className="font-semibold text-[#0F1221] text-base mb-2 group-hover:text-[#493657] transition-colors">{s.t}</h3>
                    <p className="text-[#0F1221]/45 text-sm font-light leading-[1.85]">{s.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 7 — GALLERY
// ══════════════════════════════════════════════════════════════════
const galleryImages = [
  '/Assets/Inspiration/IMG-20250718-WA0008.webp',
  '/Assets/Inspiration/IMG-20250718-WA0009.webp',
  '/Assets/Inspiration/IMG-20250718-WA0010.webp',
  '/Assets/Inspiration/IMG-20250718-WA0011.webp',
  '/Assets/Inspiration/IMG-20250718-WA0012.webp',
  '/Assets/Inspiration/IMG-20250718-WA0013.webp',
  '/Assets/Inspiration/IMG-20250718-WA0014.webp',
];

const GalleryV2 = () => (
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

      {/* Masonry-style grid */}
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
              className="w-full h-full object-cover brightness-80 hover:brightness-100 transition-all duration-700"
            />
            {/* Hover overlay */}
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
//  SECTION 8 — REVIEWS (dark themed)
// ══════════════════════════════════════════════════════════════════
const ReviewsWrap = () => (
  <div style={{ background: C.surface }} className="[&_.bg-white]:!bg-[#111827] [&_.bg-\\[\\#F7F6F3\\]]:!bg-[#0d1220] [&_.text-\\[\\#0F1221\\]]:!text-white [&_.text-\\[\\#0F1221\\]\\/70]:!text-white\\/50 [&_.border-\\[\\#0F1221\\]\\/8]:!border-white\\/8">
    <ReviewsSection />
  </div>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 9 — FINAL CTA
// ══════════════════════════════════════════════════════════════════
const CtaV2 = () => {
  const wa = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent('Hi Calyco, I want to book a free site inspection.')}`;
  return (
    <section className="relative overflow-hidden">
      <img src={IMG_SPLIT_2} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1221]/92 via-[#0F1221]/80 to-[#0F1221]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/70 via-transparent to-transparent" />

      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-[#F0C85A]/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 sm:py-36">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex gap-0.5 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} cls="w-5 h-5 text-[#F0C85A]" />)}
            </div>
            <h2 className="text-4xl sm:text-6xl font-light text-white leading-[1.06] tracking-[-0.025em] mb-5">
              Ready to Transform<br /><span className="font-semibold text-[#F0C85A]">Your Home?</span>
            </h2>
            <p className="text-white/45 text-base sm:text-lg font-light leading-[1.8] mb-10">
              Free inspection. Fixed written quote. Warranty-backed finish.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/get-quote"
                  className="inline-flex items-center justify-center gap-2 bg-[#F0C85A] text-[#07090f] px-10 py-4.5 rounded-full text-sm font-bold hover:bg-white transition-colors shadow-[0_6px_32px_rgba(240,200,90,0.35)] py-4"
                >
                  Book Free Inspection
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-4 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
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
//  PAGE
// ══════════════════════════════════════════════════════════════════
const HomeV2 = () => (
  <div className="font-poppins bg-white min-h-screen">
    <SEO
      title={`${BRAND_NAME} | 5-Star Painting Services — Professional House Painters`}
      description="Professional house painters you can count on. Verified teams, fixed written quotes, and a warranty-backed finish managed end-to-end by Calyco."
      ogType="website"
    />
    <HeroV2 />
    <MarqueeStrip />
    <ServicesV2 />
    <WhyV2 />
    <StatsV2 />
    <ProcessV2 />
    <GalleryV2 />
    <ReviewsSection />
    <CtaV2 />
  </div>
);

export default HomeV2;
