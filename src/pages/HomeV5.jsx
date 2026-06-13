import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  motion, useInView, AnimatePresence,
  useScroll, useTransform, useMotionValue, useSpring,
} from 'framer-motion';
import contactData from '../data/admin/contact.json';

const IMG_HERO    = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_18_13 PM.png');
const IMG_CONSULT = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_11_55 PM.png');
const IMG_PAINTER = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_00_24 PM.png');
const WA = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent('Hi Calyco! I would like a free painting quote.')}`;
const PHONE = contactData.contact.phone.number;
const PHONE_RAW = contactData.contact.phone.rawNumber;

// ─── SVG Icons ─────────────────────────────────────────────────────────────────
const WaIcon = () => (
  <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
const StarFill = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
const Stars = ({ n = 5, size = 'w-3.5 h-3.5', color = 'text-[#F0C85A]' }) => (
  <div className="flex gap-0.5">{[...Array(n)].map((_, i) => <StarFill key={i} className={`${size} ${color}`} />)}</div>
);
const CheckCircle = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

// ─── Data ──────────────────────────────────────────────────────────────────────
const TRUST_POINTS = [
  'Background-verified painters',
  'Fixed price, no surprises',
  '2-year workmanship warranty',
  '3,000+ premium colour options',
];
const STATS = [
  { num: '15K+',  label: 'Homes Painted' },
  { num: '4.8★',  label: 'Average Rating' },
  { num: '25+',   label: 'Cities Served' },
  { num: '2-Yr',  label: 'Warranty' },
];
const WHY_ITEMS = [
  {
    label: 'Trained Painters',
    desc: 'Every painter is skill-assessed, background-checked, and continuously trained for premium finishes.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    label: 'Fixed Price Quote',
    desc: 'Transparent pricing before we begin. Zero hidden costs, no last-minute additions.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
      </svg>
    ),
  },
  {
    label: 'Background Verified',
    desc: 'Every professional undergoes thorough police verification and identity checks.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: '3,000+ Colours',
    desc: 'An unmatched palette across all premium brands — our colour consultants guide the way.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197" />
      </svg>
    ),
  },
  {
    label: '2-Year Warranty',
    desc: 'Every project comes with a 2-year workmanship warranty for complete peace of mind.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Safety First',
    desc: 'Low-VOC paints, furniture protection, strict on-site safety protocols every single time.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];
const SERVICES = [
  { title: 'Wall Textures',     desc: 'Premium texture finishes that add depth and character to every room.',          to: '/services/texture-painting',       img: IMG_PAINTER },
  { title: 'Interior Painting', desc: 'Smooth, long-lasting paint with 3,000+ colour options and expert finish.',     to: '/services/interior-painting',      img: IMG_CONSULT },
  { title: 'Waterproofing',     desc: 'Advanced anti-fungal protection for walls, roofs and basements.',              to: '/services/terrace-waterproofing',  img: IMG_HERO    },
  { title: 'Floor Finishes',    desc: 'Durable, aesthetically rich coatings — epoxy, PU, and decorative options.',    to: '/services/interior-painting',      img: IMG_PAINTER },
];
const STEPS = [
  { num: '01', title: 'Schedule',          desc: 'Book a free slot — our expert reaches you within 24 hours.',           icon: '📅' },
  { num: '02', title: 'Site Visit',        desc: 'We measure, assess walls, and understand your exact requirements.',     icon: '🏠' },
  { num: '03', title: 'Colour Selection',  desc: 'Choose from 3,000+ shades with expert guidance and on-wall samples.',   icon: '🎨' },
  { num: '04', title: 'Expert Painting',   desc: 'Verified painters deliver flawless results — with daily updates to you.', icon: '🖌️' },
  { num: '05', title: 'Handover',          desc: 'Final inspection, touch-ups, and your 2-year warranty sign-off.',       icon: '✅' },
];
const TESTIMONIALS = [
  {
    name: 'Rahul S.', city: 'Mumbai', service: 'Interior Painting', init: 'R', color: '#493657',
    text: 'Calyco transformed our 3BHK completely. The painters were professional, clean, and finished ahead of schedule. The colour consultation was the best part!',
    rating: 5,
  },
  {
    name: 'Priya K.', city: 'Bangalore', service: 'Full House Painting', init: 'P', color: '#2D6A4F',
    text: "We went with the Gold Plan and couldn't be happier. Fixed price, no surprises, and the 2-year warranty gives us total peace of mind.",
    rating: 5,
  },
  {
    name: 'Amit T.', city: 'Delhi', service: 'Texture Painting', init: 'A', color: '#B5451B',
    text: "The texture wall in our living room is exactly what we wanted. Calyco's team was knowledgeable, patient, and delivered a stunning result.",
    rating: 5,
  },
];
const FAQS = [
  { q: 'What is Calyco 5-Star Homes Painting Services?',          a: 'Calyco is a premium painting service providing trained, background-verified painters with fixed pricing, expert colour consultation, and a 2-year workmanship warranty across 25+ Indian cities.' },
  { q: 'How will Calyco go about painting my home?',             a: 'We follow a 5-step process: site consultation → colour selection → fixed quote → expert painting → final handover with warranty sign-off.' },
  { q: 'Why are the payment terms as stated?',                   a: 'We collect 30% advance to procure materials and the balance on completion — so you only pay in full once you are completely satisfied.' },
  { q: 'Who will paint my house?',                               a: 'All Calyco painters are background-verified, skill-assessed professionals who undergo regular quality audits.' },
  { q: 'What tools are used during painting?',                   a: 'Professional-grade brushes, rollers, spray equipment, and protective gear — maintained to ensure a flawless finish without damaging your property.' },
  { q: 'What are the features of the Calyco Painting Services?',  a: 'Fixed price, free site visit, expert colour guidance, premium materials, background-verified painters, clean working environment, and a 2-year warranty.' },
  { q: 'What safety protocols are followed on-site?',            a: 'We cover all furniture, tape edges, use non-toxic low-VOC paints, and follow strict safety protocols for ladders, heights, and chemical handling.' },
  { q: 'Does Calyco assist in shifting and covering furniture?', a: 'Yes. Our team covers all furniture and flooring with protective sheets before painting and removes them after full cleanup.' },
];

// ─── Shared helpers ─────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1];

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionTag = ({ text }) => (
  <div className="flex items-center justify-center gap-3 mb-4">
    <span className="w-8 h-px bg-[#F0C85A]" />
    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#493657]">{text}</span>
    <span className="w-8 h-px bg-[#F0C85A]" />
  </div>
);

// ─── 1. HERO ────────────────────────────────────────────────────────────────────
const HeroV5 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imgScrollY  = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textScrollY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg  = { damping: 28, stiffness: 160, mass: 0.9 };
  const spX  = useSpring(rawX, cfg);
  const spY  = useSpring(rawY, cfg);
  const imgX  = useTransform(spX, [-1, 1], [-12, 12]);
  const imgY  = useTransform(spY, [-1, 1], [-8, 8]);
  const b1X   = useTransform(spX, [-1, 1], [-24, 24]);
  const b1Y   = useTransform(spY, [-1, 1], [-18, 18]);
  const b2X   = useTransform(spX, [-1, 1], [-18, 18]);
  const b2Y   = useTransform(spY, [-1, 1], [-12, 12]);

  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width  * 2 - 1);
    rawY.set((e.clientY - r.top)  / r.height * 2 - 1);
  };

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="min-h-screen bg-[#FAFAF8] flex flex-col lg:flex-row overflow-hidden"
    >
      {/* ── LEFT TEXT PANEL ── */}
      <motion.div
        style={{ y: textScrollY }}
        className="relative z-10 w-full lg:w-[55%] flex items-center px-8 sm:px-12 lg:px-14 xl:px-20 pt-28 pb-16 lg:py-0 min-h-[60vh] lg:min-h-screen"
      >
        <div className="w-full max-w-xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-9 h-[2px] bg-[#F0C85A] rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#493657]">
              Calyco 5-Star Painting Services
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.18, ease }}
              className="text-[2.8rem] sm:text-[3.5rem] xl:text-[4rem] font-black text-[#0F1221] leading-[1.05] tracking-[-0.03em]"
            >
              Your Home,
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.28, ease }}
              className="text-[2.8rem] sm:text-[3.5rem] xl:text-[4rem] font-black leading-[1.05] tracking-[-0.03em]"
            >
              <span className="text-[#F0C85A]">Perfectly</span>
              <span className="text-[#0F1221]"> Painted.</span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.42, ease }}
            className="text-[#0F1221]/55 text-base sm:text-lg font-light leading-relaxed mb-9 max-w-md"
          >
            Professional painters. Fixed pricing. 2-year warranty.
            Book a free inspection today — we handle everything from colour to cleanup.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.54, ease }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link
              to="/get-quote"
              className="inline-flex items-center gap-2 bg-[#0F1221] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors duration-300 shadow-lg shadow-[#0F1221]/15"
            >
              Book Free Inspection
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href={WA}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0F1221] border border-[#0F1221]/15 px-7 py-3.5 rounded-full text-sm font-bold hover:border-[#493657] hover:text-[#493657] transition-colors duration-300 shadow-sm"
            >
              <WaIcon />
              WhatsApp
            </a>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.66, ease }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            {TRUST_POINTS.map((p) => (
              <div key={p} className="flex items-center gap-2.5 text-sm text-[#0F1221]/70">
                <span className="w-5 h-5 rounded-full bg-[#F0C85A]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#493657]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {p}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ── RIGHT IMAGE PANEL ── */}
      <div className="hidden lg:flex lg:w-[45%] items-center justify-center bg-[#F5F2EC] px-10 xl:px-14 py-16 relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#F0C85A]/10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#493657]/8" />

        <div className="relative w-full max-w-[380px]">
          {/* Image card */}
          <motion.div
            style={{ y: imgScrollY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="relative overflow-hidden rounded-[2.5rem] shadow-2xl shadow-[#0F1221]/15"
              style={{ height: '500px' }}
            >
              <motion.div
                style={{ x: imgX, y: imgY }}
                className="absolute -inset-[7%]"
              >
                <img
                  src={IMG_PAINTER}
                  alt="Expert painting"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/40 via-transparent to-transparent" />
              </motion.div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5 pt-10 bg-gradient-to-t from-[#0F1221]/70 to-transparent">
                <p className="text-white text-xs font-semibold tracking-wider">Expert Team · Fixed Price · 2-Yr Warranty</p>
              </div>
            </motion.div>

            {/* Badge A — top right: rating */}
            <motion.div className="absolute -top-4 -right-4 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.75, ease }}
              >
                <motion.div
                  style={{ x: b1X, y: b1Y }}
                  className="bg-[#0F1221] rounded-2xl px-4 py-3 shadow-xl shadow-[#0F1221]/20"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Stars n={5} size="w-3 h-3" />
                  </div>
                  <p className="text-white text-xs font-bold leading-none">4.8 Rating</p>
                  <p className="text-white/45 text-[9px] mt-0.5">15,000+ Reviews</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Badge B — bottom left: homes */}
            <motion.div className="absolute -bottom-4 -left-4 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9, ease }}
              >
                <motion.div
                  style={{ x: b2X, y: b2Y }}
                  className="bg-[#F0C85A] rounded-2xl px-4 py-3 shadow-xl shadow-[#F0C85A]/30"
                >
                  <p className="text-[#0F1221] text-xl font-black leading-none">15K+</p>
                  <p className="text-[#0F1221]/70 text-[9px] font-semibold uppercase tracking-wider mt-0.5">Homes Painted</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mini stat pills below image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 1.05, ease }}
            className="flex gap-2 mt-6 justify-center"
          >
            {['25+ Cities', '2-Yr Warranty', '100% Verified'].map((s) => (
              <span key={s} className="bg-white text-[#0F1221]/70 text-[10px] font-semibold px-3 py-1.5 rounded-full border border-[#0F1221]/8 shadow-sm">
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─── 2. STATS STRIP ─────────────────────────────────────────────────────────────
const StatsV5 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <section ref={ref} className="bg-[#0F1221] py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease }}
              className="flex flex-col items-center py-4"
            >
              <span className="text-[2.2rem] font-black text-[#F0C85A] leading-none tracking-tight">{s.num}</span>
              <span className="text-white/45 text-xs font-medium uppercase tracking-[0.15em] mt-2">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 3. PHONE STRIP ──────────────────────────────────────────────────────────────
const PhoneStripV5 = () => (
  <section className="bg-[#F5F2EC] py-5 border-y border-[#0F1221]/6">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-[#0F1221]/60 font-light text-center sm:text-left">
        Painting your home is exciting — let us handle the complexity. Verified painters, zero surprises.
      </p>
      <a
        href={`tel:${PHONE_RAW}`}
        className="inline-flex items-center gap-2.5 bg-[#0F1221] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#493657] transition-colors duration-300 whitespace-nowrap flex-shrink-0"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0 1.31.21 2.57.598 3.75h.152c2.15 1.037 5.054 2.285 8.25 2.285s6.1-1.248 8.25-2.285h.152A11.959 11.959 0 0021.75 6.338M2.25 6.338A11.952 11.952 0 0112 2.25c2.64 0 5.122 1.03 6.988 2.898" />
        </svg>
        {PHONE}
      </a>
    </div>
  </section>
);

// ─── 4. WHY CHOOSE US ────────────────────────────────────────────────────────────
const WhyCard = ({ item, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 * i, ease }}
      className="group bg-white rounded-2xl p-6 border border-[#0F1221]/6 hover:border-[#F0C85A]/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] group-hover:bg-[#F0C85A]/15 flex items-center justify-center text-[#493657] group-hover:text-[#0F1221] transition-colors duration-300 mb-4">
        {item.icon}
      </div>
      <h3 className="text-base font-bold text-[#0F1221] mb-2">{item.label}</h3>
      <p className="text-sm text-[#0F1221]/50 font-light leading-relaxed">{item.desc}</p>
    </motion.div>
  );
};

const WhyV5 = () => (
  <section className="bg-[#FAFAF8] py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <FadeUp className="text-center mb-14">
        <SectionTag text="Why Choose Us" />
        <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
          Why Choose <span className="text-[#493657]">Calyco?</span>
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY_ITEMS.map((item, i) => <WhyCard key={item.label} item={item} i={i} />)}
      </div>
    </div>
  </section>
);

// ─── 5. SERVICES ─────────────────────────────────────────────────────────────────
const ServiceCard = ({ svc, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * i, ease }}
      className="group relative rounded-2xl overflow-hidden bg-[#0F1221] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-400 cursor-pointer"
      style={{ height: '340px' }}
    >
      <img
        src={svc.img}
        alt={svc.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/85 via-[#0F1221]/25 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#F0C85A] transition-colors duration-300">{svc.title}</h3>
        <p className="text-white/55 text-xs font-light leading-relaxed mb-4 max-w-[90%]">{svc.desc}</p>
        <Link
          to={svc.to}
          className="inline-flex items-center gap-1.5 text-[#F0C85A] text-xs font-bold uppercase tracking-[0.12em] group-hover:gap-3 transition-all duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          Explore
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
};

const ServicesV5 = () => (
  <section className="bg-[#F5F2EC] py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <FadeUp className="text-center mb-14">
        <SectionTag text="We Help You With" />
        <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
          Our Painting Services
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((svc, i) => <ServiceCard key={svc.title} svc={svc} i={i} />)}
      </div>
    </div>
  </section>
);

// ─── 6. PROCESS ─────────────────────────────────────────────────────────────────
const ProcessStep = ({ step, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.12 * i, ease }}
      className="flex flex-col items-center text-center relative"
    >
      {/* Number circle */}
      <div className="w-14 h-14 rounded-full bg-[#F0C85A] flex items-center justify-center mb-4 shadow-md shadow-[#F0C85A]/25 relative z-10">
        <span className="text-[#0F1221] text-lg font-black">{step.num}</span>
      </div>
      {/* Icon */}
      <div className="text-2xl mb-3">{step.icon}</div>
      <h3 className="text-sm font-bold text-[#0F1221] mb-2">{step.title}</h3>
      <p className="text-xs text-[#0F1221]/50 font-light leading-relaxed max-w-[140px]">{step.desc}</p>
    </motion.div>
  );
};

const ProcessV5 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const lineW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <section ref={ref} className="bg-[#FAFAF8] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <FadeUp className="text-center mb-16">
          <SectionTag text="How It Works" />
          <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
            Get Your Home Painted in 5 Simple Steps
          </h2>
        </FadeUp>

        {/* Steps grid with animated connector line */}
        <div className="relative">
          {/* Animated connecting line */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-[#0F1221]/8">
            <motion.div style={{ width: lineW }} className="h-full bg-[#F0C85A]" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-4">
            {STEPS.map((step, i) => <ProcessStep key={step.num} step={step} i={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── 7. INSPIRATION GALLERY ──────────────────────────────────────────────────────
const InspirationV5 = () => {
  const IMGS = [
    { img: IMG_PAINTER,  label: 'Wall Texture',      span: 'row-span-2' },
    { img: IMG_CONSULT,  label: 'Interior',          span: '' },
    { img: IMG_HERO,     label: 'Waterproofing',     span: '' },
    { img: IMG_PAINTER,  label: 'Floor Finish',      span: '' },
    { img: IMG_CONSULT,  label: 'Exterior',          span: '' },
  ];
  return (
    <section className="bg-[#F5F2EC] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <FadeUp className="text-center mb-14">
          <SectionTag text="Project Gallery" />
          <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
            Ideas for Your Home
          </h2>
          <p className="text-[#0F1221]/50 text-base font-light mt-3 max-w-md mx-auto">
            Browse real transformations by our expert teams across India.
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ gridAutoRows: '200px' }}>
          {IMGS.map((item, i) => (
            <FadeUp key={i} delay={0.07 * i} className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span}`}>
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-xs font-bold uppercase tracking-[0.12em]">{item.label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 8. TESTIMONIALS ────────────────────────────────────────────────────────────
const TestiCard = ({ t, i }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.12 * i, ease }}
      className="bg-white rounded-2xl p-7 border border-[#0F1221]/6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <Stars n={t.rating} size="w-3.5 h-3.5" />
      <p className="text-sm text-[#0F1221]/60 font-light italic leading-relaxed my-5 flex-1">
        "{t.text}"
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-[#0F1221]/6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: t.color }}
          >
            {t.init}
          </div>
          <div>
            <div className="text-sm font-bold text-[#0F1221]">{t.name}</div>
            <div className="text-[10px] text-[#0F1221]/40">{t.city}</div>
          </div>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#493657] bg-[#493657]/8 px-2.5 py-1 rounded-full">
          {t.service}
        </span>
      </div>
    </motion.div>
  );
};

const TestimonialsV5 = () => (
  <section className="bg-[#FAFAF8] py-20 sm:py-28">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <FadeUp className="text-center mb-14">
        <SectionTag text="Customer Testimonials" />
        <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
          What Our Customers Say
        </h2>
      </FadeUp>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => <TestiCard key={t.name} t={t} i={i} />)}
      </div>
    </div>
  </section>
);

// ─── 9. FAQ ─────────────────────────────────────────────────────────────────────
const FaqItem = ({ item, i, open, setOpen }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const isOpen = open === i;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.04 * i, ease }}
      className={`border-b border-[#0F1221]/8 last:border-0 transition-colors duration-200 ${isOpen ? '' : ''}`}
    >
      <button
        onClick={() => setOpen(isOpen ? null : i)}
        className="w-full flex items-center justify-between py-5 text-left gap-5 group"
      >
        <span className={`text-sm font-semibold leading-snug transition-colors ${isOpen ? 'text-[#493657]' : 'text-[#0F1221]/75 group-hover:text-[#0F1221]'}`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.22 }}
          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen ? 'bg-[#F0C85A] border-[#F0C85A]' : 'border-[#0F1221]/15 group-hover:border-[#493657]'
          }`}
        >
          <svg className={`w-3 h-3 ${isOpen ? 'text-[#0F1221]' : 'text-[#0F1221]/40'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#0F1221]/55 font-light leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqV5 = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[#F5F2EC] py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <FadeUp className="text-center mb-12">
          <SectionTag text="FAQs" />
          <h2 className="text-[2rem] sm:text-[2.6rem] font-black text-[#0F1221] tracking-[-0.025em]">
            Frequently Asked Questions
          </h2>
        </FadeUp>
        <div className="bg-white rounded-2xl px-6 sm:px-8 shadow-sm border border-[#0F1221]/6">
          {FAQS.map((item, i) => (
            <FaqItem key={i} item={item} i={i} open={open} setOpen={setOpen} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── 10. CTA SECTION ────────────────────────────────────────────────────────────
const CtaV5 = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <section ref={ref} className="bg-[#0F1221] py-20 sm:py-24 relative overflow-hidden">
      {/* Decorative gold blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#F0C85A]/10 blur-3xl rounded-full" />
      <div className="max-w-3xl mx-auto px-6 sm:px-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#F0C85A]" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F0C85A]">Start Today</span>
            <span className="w-8 h-px bg-[#F0C85A]" />
          </div>
          <h2 className="text-[2rem] sm:text-[2.8rem] font-black text-white tracking-[-0.025em] leading-[1.1] mb-5">
            Ready for a Beautiful<br />
            <span className="text-[#F0C85A]">New Home?</span>
          </h2>
          <p className="text-white/45 text-base font-light mb-10 max-w-md mx-auto">
            Book a free site inspection — our expert visits within 24 hours and gives you a fixed price, zero-obligation quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/get-quote"
              className="inline-flex items-center justify-center gap-2 bg-[#F0C85A] text-[#0F1221] px-8 py-4 rounded-full text-sm font-black hover:bg-white transition-colors duration-300 shadow-2xl shadow-[#F0C85A]/20"
            >
              START NOW — Book Free Inspection
            </Link>
            <a
              href={WA}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/8 text-white border border-white/15 px-8 py-4 rounded-full text-sm font-bold hover:bg-white/15 transition-colors duration-300"
            >
              <WaIcon />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── PAGE ───────────────────────────────────────────────────────────────────────
export default function HomeV5() {
  return (
    <main className="bg-[#FAFAF8]">
      <HeroV5 />
      <StatsV5 />
      <PhoneStripV5 />
      <WhyV5 />
      <ServicesV5 />
      <ProcessV5 />
      <InspirationV5 />
      <TestimonialsV5 />
      <FaqV5 />
      <CtaV5 />
    </main>
  );
}
