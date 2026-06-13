import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { serviceHubCards } from '../data/servicePricing';
import { BRAND_NAME } from '../data/positioning';
import contactData from '../data/admin/contact.json';

const IMG_HERO    = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_00_24 PM.png');
const IMG_HERO_2  = encodeURI('/v/ChatGPT Image Jun 4, 2026, 01_18_13 PM.png');

// ── Fade-up reveal ─────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Star row ───────────────────────────────────────────────────────────────────
const Stars = ({ n = 5, cls = 'w-4 h-4' }) => (
  <span className="flex gap-0.5">
    {[...Array(n)].map((_, i) => (
      <svg key={i} className={`${cls} text-[#F0C85A]`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </span>
);

const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Check = () => (
  <svg className="w-4 h-4 text-[#493657] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 1 — HERO (Apka Painter inspired split)
// ══════════════════════════════════════════════════════════════════
const HeroV3 = () => {
  const [form, setForm] = useState({ name: '', phone: '', service: '', city: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 10) return;
    const msg = `Hi Calyco! I'd like a free site visit.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nCity: ${form.city}`;
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section className="relative bg-white min-h-[92vh] flex items-stretch overflow-hidden">

      {/* ── LEFT content ──────────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[52%] flex flex-col justify-center px-6 sm:px-10 lg:px-14 xl:px-20 py-20 lg:py-0">

        {/* Stars + label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-5"
        >
          <Stars cls="w-3.5 h-3.5" />
          <span className="text-[11px] font-semibold text-[#0F1221]/45 uppercase tracking-[0.18em]">Calyco 5-Star Painting Services</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] font-bold text-[#0F1221] leading-[1.1] tracking-[-0.02em] mb-3"
        >
          Beautiful Homes<br />
          Start With a<br />
          <span className="text-[#493657]">Perfect Finish.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="text-[#0F1221]/55 text-base leading-[1.75] mb-7 max-w-sm font-normal"
        >
          Expert painters, premium quality, and a hassle-free experience — managed end-to-end.
        </motion.p>

        {/* 4 micro trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.26 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-sm sm:max-w-none"
        >
          {[
            { icon: '🛡', label: 'Verified Teams' },
            { icon: '📋', label: 'Fixed Quote' },
            { icon: '🕐', label: 'On-Time Work' },
            { icon: '✨', label: 'Clean Finish' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 bg-[#F7F6F3] rounded-2xl py-3 px-2 border border-[#0F1221]/5">
              <span className="text-xl leading-none">{icon}</span>
              <span className="text-[10px] font-semibold text-[#0F1221]/60 text-center leading-snug">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="bg-[#F7F6F3] rounded-2xl p-5 border border-[#0F1221]/6 max-w-md"
        >
          <p className="font-bold text-[#493657] text-base mb-0.5">Book a Free Site Visit</p>
          <p className="text-xs text-[#0F1221]/40 mb-4">Free inspection &amp; written quote. No commitment.</p>

          {sent ? (
            <div className="py-3 text-center">
              <p className="font-semibold text-[#493657]">Opening WhatsApp…</p>
              <button onClick={() => setSent(false)} className="text-xs text-[#0F1221]/35 underline mt-1">Submit again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <input type="text" placeholder="Your name" required value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="col-span-2 sm:col-span-1 rounded-xl border border-[#0F1221]/10 bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657]/20"
                />
                <input type="tel" placeholder="Phone number" maxLength={10} required value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="col-span-2 sm:col-span-1 rounded-xl border border-[#0F1221]/10 bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657]/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                  className="rounded-xl border border-[#0F1221]/10 bg-white px-4 py-3 text-sm text-[#0F1221]/70 focus:outline-none focus:ring-2 focus:ring-[#493657]/20 appearance-none"
                >
                  <option value="">Service needed</option>
                  {['Interior Painting','Exterior Painting','Full House','Waterproofing','Texture Painting','Wood Polish'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <input type="text" placeholder="Your city" value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  className="rounded-xl border border-[#0F1221]/10 bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657]/20"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 bg-[#493657] text-white rounded-xl py-3.5 text-sm font-bold hover:bg-[#0F1221] transition-colors shadow-[0_4px_20px_rgba(73,54,87,0.3)]"
              >
                <WaIcon /> Book Free Inspection
              </motion.button>
              <p className="text-center text-[10px] text-[#0F1221]/35">
                Free Site Visit &nbsp;·&nbsp; No Hidden Charges &nbsp;·&nbsp; 100% Satisfaction
              </p>
            </form>
          )}
        </motion.div>
      </div>

      {/* ── RIGHT image ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block absolute right-0 top-0 w-[52%] h-full"
      >
        <img src={IMG_HERO} alt="Professional painting" className="w-full h-full object-cover" />
        {/* Blend into left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" style={{ width: '30%' }} />
      </motion.div>

    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 2 — TRUST STATS BAR
// ══════════════════════════════════════════════════════════════════
const TrustBar = () => (
  <div className="bg-[#493657]">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 divide-x divide-white/10">
      {[
        { v: '15,000+', l: 'Happy Customers' },
        { v: '500+',    l: 'Verified Painters' },
        { v: '25+',     l: 'Cities Served' },
        { v: '4.8★',    l: 'Google Rating' },
      ].map(({ v, l }) => (
        <div key={l} className="text-center px-4">
          <p className="text-white font-bold text-xl sm:text-2xl leading-none mb-1">{v}</p>
          <p className="text-white/55 text-xs font-medium">{l}</p>
        </div>
      ))}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 3 — BOOK OUR SERVICES (Apka Painter style cards)
// ══════════════════════════════════════════════════════════════════
const ServicesV3 = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

      <Reveal className="text-center mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-2">What We Offer</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em]">
          Book Our Services
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {serviceHubCards.slice(0, 6).map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.06}>
            <Link to={`/services/${s.slug}`}
              className="group flex flex-col items-center text-center rounded-2xl border border-[#0F1221]/7 bg-[#F7F6F3] hover:bg-white hover:shadow-[0_6px_24px_rgba(73,54,87,0.12)] hover:border-[#493657]/20 transition-all duration-300 p-4 gap-3"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-[#0F1221]/6">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F1221] leading-snug group-hover:text-[#493657] transition-colors">{s.title}</p>
                <p className="text-[10px] text-[#493657] font-bold mt-0.5">₹{s.startingPrice}/sqft</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="flex justify-center mt-8">
        <Link to="/services"
          className="inline-flex items-center gap-2 border-2 border-[#493657] text-[#493657] px-7 py-3 rounded-full text-sm font-bold hover:bg-[#493657] hover:text-white transition-all"
        >
          View All Services →
        </Link>
      </Reveal>

    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 4 — BRAND LOGOS (trust strip, like Apka Painter)
// ══════════════════════════════════════════════════════════════════
const brands = [
  { name: 'Asian Paints',  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Asian_Paints_Logo.svg/200px-Asian_Paints_Logo.svg.png' },
  { name: 'Nerolac',       logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Kansai_Nerolac_Paints_Logo.svg/200px-Kansai_Nerolac_Paints_Logo.svg.png' },
  { name: 'Berger Paints', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Berger_Paints_logo.svg/200px-Berger_Paints_logo.svg.png' },
  { name: 'Dulux',         logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Dulux_logo.svg/200px-Dulux_logo.svg.png' },
  { name: 'Birla White',   logo: null },
  { name: 'Indigo Paints', logo: null },
];

const BrandsV3 = () => (
  <div className="bg-[#F7F6F3] border-y border-[#0F1221]/6 py-8">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#0F1221]/35 mb-6">We Use Only Trusted Paint Brands</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {brands.map(({ name, logo }) => (
          <div key={name} className="flex items-center justify-center h-8 opacity-50 hover:opacity-90 transition-opacity">
            {logo ? (
              <img src={logo} alt={name} className="h-7 object-contain grayscale" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            ) : null}
            <span className={`text-sm font-bold text-[#0F1221] tracking-wide ${logo ? 'hidden' : 'block'}`}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 5 — HOW IT WORKS (numbered, horizontal)
// ══════════════════════════════════════════════════════════════════
const HowV3 = () => {
  const steps = [
    { n: 1, t: 'Book Free Inspection',   d: 'Share your location. We confirm within 2 hours.' },
    { n: 2, t: 'Site Visit',             d: 'Laser measurement, crack check, surface assessment.' },
    { n: 3, t: 'Fixed Written Quote',    d: 'Full scope, price and timeline — locked in writing.' },
    { n: 4, t: 'Work Begins',            d: 'Verified team arrives on your approved date.' },
    { n: 5, t: 'Daily Updates',          d: 'Progress photos on WhatsApp every single day.' },
    { n: 6, t: 'Final Handover',         d: '27-point check, cleanup, your sign-off. Done.' },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-2">Our Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em]">How It Works</h2>
          </div>
          <Link to="/how-it-works" className="text-sm font-semibold text-[#493657] hover:text-[#0F1221] transition-colors">
            See full process →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-8 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#493657]/20 to-transparent z-0" />

          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.07}>
              <div className="relative z-10 flex flex-col items-center text-center group">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg mb-3 transition-all duration-300 bg-[#F7F6F3] border-2 border-[#0F1221]/8 text-[#0F1221]/30 group-hover:bg-[#493657] group-hover:text-white group-hover:border-[#493657]"
                >
                  {s.n}
                </motion.div>
                <p className="font-semibold text-[#0F1221] text-xs sm:text-sm mb-1 leading-snug group-hover:text-[#493657] transition-colors">{s.t}</p>
                <p className="text-[#0F1221]/40 text-[11px] leading-[1.6]">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 6 — WHY CHOOSE CALYCO (inspired by Apka Painter's list)
// ══════════════════════════════════════════════════════════════════
const WhyV3 = () => {
  const features = [
    'Background-checked, rated painters on every project',
    'Fixed written quote — price never changes after acceptance',
    'Proper wall preparation: crack filling, putty, primer',
    'Furniture & floor protection throughout the project',
    'Daily WhatsApp progress photos without being asked',
    '1-Year workmanship warranty on every project',
    'On-time completion with a supervisor on every site',
    'GST invoice and full documentation provided',
  ];

  return (
    <section className="bg-[#F7F6F3] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — image */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.12)]">
              <img src={IMG_HERO_2} alt="Quality painting" className="w-full h-[400px] lg:h-[520px] object-cover" />
              {/* Floating badge */}
              <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <Stars cls="w-4 h-4" />
                <div>
                  <p className="font-bold text-[#0F1221] text-sm leading-none">4.8 / 5 Rating</p>
                  <p className="text-[#0F1221]/45 text-[11px] mt-0.5">Based on 2,400+ reviews</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — features */}
          <div>
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-3">Why Choose Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em] mb-2">
                Painting &amp; Waterproofing<br />Done Right.
              </h2>
              <p className="text-[#0F1221]/50 text-base font-normal leading-[1.75] mb-7">
                Every Calyco project follows a standard that ensures quality, transparency, and peace of mind.
              </p>
            </Reveal>

            <div className="space-y-3">
              {features.map((f, i) => (
                <Reveal key={f} delay={i * 0.05}>
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#0F1221]/6 hover:border-[#493657]/20 hover:shadow-sm transition-all group">
                    <Check />
                    <p className="text-[#0F1221]/70 text-sm font-normal leading-snug group-hover:text-[#0F1221] transition-colors">{f}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3} className="mt-7">
              <Link to="/get-quote"
                className="inline-flex items-center gap-2 bg-[#493657] text-white px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#0F1221] transition-colors shadow-[0_4px_20px_rgba(73,54,87,0.25)]"
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
//  SECTION 7 — WHAT ARE YOU LOOKING FOR (inspiration grid)
// ══════════════════════════════════════════════════════════════════
const inspirations = [
  { label: 'Interior Painting',  img: '/Assets/Inspiration/IMG-20250718-WA0008.webp', to: '/services/interior-painting' },
  { label: 'Exterior Painting',  img: '/Assets/Inspiration/IMG-20250718-WA0009.webp', to: '/services/exterior-painting' },
  { label: 'Texture Painting',   img: '/Assets/Inspiration/IMG-20250718-WA0010.webp', to: '/services/texture-painting' },
  { label: 'Waterproofing',      img: '/Assets/Inspiration/IMG-20250718-WA0011.webp', to: '/services/terrace-waterproofing' },
  { label: 'Wood Polish',        img: '/Assets/Inspiration/IMG-20250718-WA0012.webp', to: '/services/wood-polish' },
  { label: 'Full House Paint',   img: '/Assets/Inspiration/IMG-20250718-WA0013.webp', to: '/services/full-house-painting' },
];

const LookingForV3 = () => (
  <section className="bg-white py-16 sm:py-20">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

      <Reveal className="text-center mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-2">Explore</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em]">
          What Are You Looking For?
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {inspirations.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.07}>
            <Link to={item.to} className="group relative block overflow-hidden rounded-2xl aspect-[4/3]">
              <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <p className="text-white font-bold text-sm">{item.label}</p>
                <motion.div
                  whileHover={{ x: 3 }}
                  className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

    </div>
  </section>
);

// ══════════════════════════════════════════════════════════════════
//  SECTION 8 — RECENT PROJECTS
// ══════════════════════════════════════════════════════════════════
const ProjectsV3 = () => {
  const projects = [
    '/Assets/Inspiration/IMG-20250718-WA0014.webp',
    '/Assets/Inspiration/IMG-20250718-WA0015.webp',
    '/Assets/Inspiration/IMG-20250718-WA0016.webp',
    '/Assets/Inspiration/IMG-20250718-WA0017.webp',
    '/Assets/Inspiration/IMG-20250718-WA0018.webp',
    '/Assets/Inspiration/IMG-20250718-WA0019.webp',
  ];

  return (
    <section className="bg-[#F7F6F3] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-2">Our Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em]">Our Recent Projects</h2>
          </div>
          <Link to="/gallery" className="text-sm font-semibold text-[#493657] hover:text-[#0F1221] transition-colors">
            View all projects →
          </Link>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {projects.map((src, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden rounded-2xl shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ${i === 0 ? 'sm:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '1/1' : '4/3' }}
              >
                <img src={src} alt={`Project ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1221]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 9 — FAQ (Apka Painter "Select Questions" style)
// ══════════════════════════════════════════════════════════════════
const faqs = [
  { q: 'Is the site inspection really free?',         a: 'Yes. Our team visits your property, inspects walls, measures area, and gives a clear scope — at zero cost and zero obligation.' },
  { q: 'Will the price change after I accept?',       a: 'No. The written quote you accept is the final price. Scope, materials, and cost are all locked in writing before work begins.' },
  { q: 'How do I track progress if I\'m not home?',  a: 'Daily progress photos and notes are shared on WhatsApp every single day — without you having to ask.' },
  { q: 'Do you protect furniture and floors?',        a: 'Yes. Floor covering, furniture protection, switchboard taping, and daily cleanup are standard on every Calyco project.' },
  { q: 'What warranty do I get?',                    a: 'A 1-year workmanship warranty. Any defect that appears within 12 months is fixed at zero additional cost.' },
  { q: 'Which cities do you serve?',                 a: 'Calyco currently operates in 25+ cities across India. Check your city when booking or WhatsApp us to confirm.' },
];

const FaqV3 = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-10">

        <Reveal className="text-center mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#493657] mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F1221] tracking-[-0.02em]">Common Questions</h2>
        </Reveal>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="rounded-2xl border border-[#0F1221]/7 overflow-hidden bg-[#F7F6F3] hover:border-[#493657]/20 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-semibold text-[#0F1221] text-sm sm:text-base">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-6 h-6 rounded-full bg-[#493657]/10 flex items-center justify-center flex-shrink-0 text-[#493657] font-bold text-lg leading-none"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-[#0F1221]/55 leading-[1.8] font-normal">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="text-center mt-6">
          <Link to="/faq" className="text-sm font-semibold text-[#493657]/60 hover:text-[#493657] transition-colors">
            See all FAQs →
          </Link>
        </Reveal>

      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  SECTION 10 — CTA BANNER (Apka Painter "Unlock Best Deals" style)
// ══════════════════════════════════════════════════════════════════
const CtaV3 = () => {
  const [phone, setPhone] = useState('');
  const wa = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(`Hi Calyco! I want to book a free inspection. My number is ${phone}`)}`;

  return (
    <section className="bg-[#493657] relative overflow-hidden py-16 sm:py-20">
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <Reveal>
          <Stars cls="w-5 h-5" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-4 mb-3 tracking-[-0.01em]">
            Unlock the Best Deal by Booking<br className="hidden sm:block" /> Your Inspection Today.
          </h2>
          <p className="text-white/60 text-base mb-8">Free site visit. Written quote. No commitment needed.</p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="tel"
              placeholder="Enter your phone number"
              maxLength={10}
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            />
            <motion.a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-[#F0C85A] text-[#0F1221] px-6 py-3.5 rounded-xl text-sm font-black hover:bg-white transition-colors shadow-[0_4px_20px_rgba(240,200,90,0.3)] flex-shrink-0"
            >
              <WaIcon /> Book Now
            </motion.a>
          </div>

          <p className="text-white/35 text-xs mt-4">
            Free Site Visit &nbsp;·&nbsp; No Hidden Charges &nbsp;·&nbsp; 100% Satisfaction Guarantee
          </p>
        </Reveal>
      </div>
    </section>
  );
};

// ══════════════════════════════════════════════════════════════════
//  PAGE
// ══════════════════════════════════════════════════════════════════
const HomeV3 = () => (
  <div className="font-poppins bg-white min-h-screen">
    <SEO
      title={`${BRAND_NAME} | 5-Star Painting Services — Professional House Painters`}
      description="Beautiful homes start with a perfect finish. Calyco provides verified painters, fixed quotes, and warranty-backed painting services across 25+ cities."
      ogType="website"
    />
    <HeroV3 />
    <TrustBar />
    <ServicesV3 />
    <BrandsV3 />
    <HowV3 />
    <WhyV3 />
    <LookingForV3 />
    <ProjectsV3 />
    <FaqV3 />
    <CtaV3 />
  </div>
);

export default HomeV3;
