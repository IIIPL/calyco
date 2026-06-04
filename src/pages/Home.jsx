import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Calculator, ArrowRight, MapPin, ChevronDown, Check } from 'lucide-react';
import { IconLaserRuler, IconGSTReceipt, IconPriceLock, IconQualityCheck, IconWarrantyShield } from '../components/CalycoIcons';
import SEO from '../components/SEO';

import StaticHero from '../components/StaticHero';
import SiteInspectionCTA from '../components/HomeComponents/SiteInspectionCTA';
import ReviewsSection from '../components/ReviewsSection';
import CallToAction from '../components/CallToAction';
import WhyFiveStar from '../components/HomeComponents/WhyFiveStar';
import ProjectGallerySection from '../components/ProjectGallerySection';
import { serviceHubCards, cityMultipliers } from '../data/servicePricing';
import { BRAND_NAME, POSITIONING_TAGLINE, WA_SITE_VISIT } from '../data/positioning';
import contactData from '../data/admin/contact.json';

// ─────────────────────────────────────────────
// Section 2 — Trust Badges
// ─────────────────────────────────────────────
const trustBadges = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Verified Painters',
    desc: 'Background-checked and trained teams.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Fixed Written Quote',
    desc: 'No surprise charges after work begins.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
      </svg>
    ),
    title: 'Proper Wall Preparation',
    desc: 'Crack filling, sanding, primer and surface correction.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: 'Daily WhatsApp Updates',
    desc: 'Photos and progress updates shared daily.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Clean Worksite',
    desc: 'Furniture, floors, doors and switches protected.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: 'Final Quality Check',
    desc: 'Supervisor approval before handover.',
  },
];

const TrustBadges = () => (
  <section className="bg-white border-b border-[#0F1221]/6 py-8 sm:py-10">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

      {/* 3-column grid — always even */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-3 mb-6 max-w-2xl mx-auto">
        {trustBadges.map(({ title }) => (
          <div key={title} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#0F1221] flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm font-medium text-[#0F1221]/65">{title}</span>
          </div>
        ))}
      </div>

      {/* Warranty strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-[#0F1221]/8 bg-[#F7F6F3] px-5 sm:px-7 py-4">
        <p className="text-sm font-medium text-[#0F1221]/70">
          2-Year Workmanship Warranty — any defect within 2 years is fixed at zero cost.
        </p>
        <Link
          to="/get-quote"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0F1221] text-white px-5 py-2.5 text-xs font-medium tracking-[0.05em] uppercase hover:bg-[#493657] transition-colors whitespace-nowrap"
        >
          Book Free Inspection →
        </Link>
      </div>

    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 3 — Service Cards (premium format)
// ─────────────────────────────────────────────
const SERVICE_BULLETS = {
  'interior-painting':    ['Low-odour washable paints', 'Proper wall preparation', 'Clean site handover'],
  'exterior-painting':    ['UV-stable weather-resistant coat', '2-coat application system', 'Protection & cleanup included'],
  'full-house-painting':  ['BHK-based estimate in minutes', 'Laser area measurement', 'Full furniture & floor protection'],
  'terrace-waterproofing':['Seepage source inspected first', 'Multi-layer waterproofing system', 'Long-lasting seal with warranty'],
  'texture-painting':     ['Sample seen before we start', 'Designer finish options', 'Supervisor quality approval'],
  'wallpaper-installation':['Surface readiness checked first', 'Clean edge finishing', 'Zero bubble application'],
  'wood-polish':          ['Sanding & prep included', 'Polish or PU coating options', 'Colour-matched finish'],
  'gate-painting':        ['Rust check & primer first', 'Enamel or spray finish', 'Durable corrosion protection'],
  'tile-grouting':        ['Cement or epoxy options', 'Joint condition checked first', 'Waterproof finished joints'],
  'wall-putty':           ['Surface levelling assessed', 'Smooth base for paint', 'Primer-ready finish'],
  'commercial-painting':  ['BOQ-friendly transparent quote', 'Shift-based scheduling', 'Fast clean execution'],
  'post-painting-cleanup':['Furniture protection included', 'Floor & switch cleaning', 'Handover-ready finish'],
};

const ServiceCards = () => (
  <section className="bg-[#F7F6F3] py-16 sm:py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="section-eyebrow">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F0C85A]">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0F1221] leading-[1.08] tracking-[-0.02em] mt-2">
            Everything Your<br className="hidden sm:block" /> Property Needs.
          </h2>
          <p className="mt-4 text-base text-[#0F1221]/50 font-light leading-[1.8] max-w-lg">
            Interior, exterior, waterproofing, texture and wood — managed end-to-end with transparent pricing.
          </p>
        </div>
        <Link
          to="/services"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-5 py-2.5 text-sm font-medium hover:border-[#0F1221]/40 hover:text-[#0F1221] transition-colors whitespace-nowrap"
        >
          All services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Premium service cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {serviceHubCards.slice(0, 6).map((service) => {
          const bullets = SERVICE_BULLETS[service.slug] || [];
          return (
            <div
              key={service.slug}
              className="group card-premium flex flex-col overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-[#E8E4DF] flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                />
                {/* Subtle gradient for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Price badge */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center rounded-full bg-[#0F1221]/75 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold text-[#F0C85A] shadow-sm">
                    From ₹{service.startingPrice}/sq ft
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-[#0F1221] text-base leading-snug mb-3 group-hover:text-[#493657] transition-colors">
                  {service.title}
                </h3>

                {/* Trust bullets */}
                {bullets.length > 0 && (
                  <ul className="space-y-2 mb-5 flex-1">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-[#0F1221]/60">
                        <Check className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA */}
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-auto block w-full text-center rounded-xl bg-[#0F1221] text-white py-3 text-sm font-bold hover:bg-[#493657] transition-colors shadow-sm"
                >
                  Get Estimate →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex flex-row gap-3">
        <Link
          to="/calculators/service-cost-calculator"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#493657] transition-colors shadow-sm"
        >
          <Calculator className="w-4 h-4" />
          Calculate Cost
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-7 py-3.5 text-sm font-medium hover:border-[#0F1221]/40 hover:text-[#0F1221] transition-colors"
        >
          All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 4 — Calculator Teaser
// ─────────────────────────────────────────────
// ─── Calculator + Pricing section (merged) ────────────────────────────────────
const pricingFacts = [
  { Icon: IconLaserRuler,  bg: 'bg-[#0F1221]', label: 'Laser-measured area',    sub: 'Not a rough estimate' },
  { Icon: IconQualityCheck, bg: 'bg-[#493657]', label: 'Itemised written quote', sub: 'Line-by-line scope + cost' },
  { Icon: IconPriceLock,   bg: 'bg-[#1a4a8a]', label: 'Price locked on sign-off', sub: 'No changes after acceptance' },
  { Icon: IconGSTReceipt,  bg: 'bg-[#998850]', label: 'GST shown separately',   sub: 'Compliant invoice provided' },
];

const CalculatorTeaser = () => (
  <section className="bg-white py-14 sm:py-18 lg:py-20 border-b border-[#0F1221]/6">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 space-y-5">

      {/* Dark calculator card */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0F1221] via-[#1a0b21] to-[#432553] px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-xl">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/70 mb-2 block">Transparent Pricing</span>
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em] leading-[1.2]">
            Know your cost before<br className="hidden sm:block" /> the painter arrives.
          </h2>
          <p className="text-sm text-white/50 font-light mt-3 leading-[1.75]">
            Rates published online. Every quote itemised. The price you agree is the price you pay.
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto">
          <Link
            to="/calculators/service-cost-calculator"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-8 py-4 text-sm font-bold hover:bg-white transition-colors shadow-lg whitespace-nowrap"
          >
            <Calculator className="w-4 h-4" />
            Open Cost Calculator
          </Link>
          <Link
            to="/transparent-pricing"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-8 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            How our pricing works →
          </Link>
        </div>
      </div>

      {/* Pricing facts strip — replaces the standalone TransparentPricingSection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {pricingFacts.map((f) => {
          const { Icon } = f;
          return (
            <div key={f.label} className="rounded-2xl border border-[#0F1221]/8 bg-[#FAFAF8] px-4 py-4 flex items-start gap-3 hover:bg-white hover:border-[#0F1221]/15 transition-all">
              <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F1221] leading-snug">{f.label}</p>
                <p className="text-[11px] text-[#0F1221]/45 font-light mt-0.5">{f.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 6 — Before / After (now powered by ProjectGallerySection)
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Section 7 — How Calyco Works
// ─────────────────────────────────────────────
const howSteps = [
  { n: '01', t: 'Book Free Inspection', d: 'Tell us your location and requirement. No payment, no commitment.' },
  { n: '02', t: 'Site Visit & Measurement', d: 'We inspect walls, dampness, cracks, area, and surface condition with a laser tool.' },
  { n: '03', t: 'Fixed Written Quote', d: 'Clear pricing, scope, material, timeline, and exclusions in writing. Price does not change.' },
  { n: '04', t: 'Verified Team Assigned', d: 'A Calyco-screened, rated painting team is assigned to your project.' },
  { n: '05', t: 'Daily Work Updates', d: 'Progress photos and notes shared on WhatsApp every single day.' },
  { n: '06', t: 'Final Quality Check', d: '27-point checklist, touch-ups, cleanup, and your approval before the team leaves.' },
];

const HowItWorksSection = () => (
  <section className="bg-[#0F1221] py-16 sm:py-20 lg:py-24">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-0.5 bg-[#F0C85A] rounded-full" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]">Our Process</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-[-0.02em] leading-[1.08]">
          How Calyco Delivers<br className="hidden sm:block" /> 5-Star Painting.
        </h2>
        <p className="mt-4 text-base text-white/40 font-light max-w-lg leading-[1.8]">
          Six structured steps — from first call to final handover. Nothing left to chance.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {howSteps.map((step) => (
          <div key={step.n} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/8 hover:border-white/15 transition-all">
            <span className="text-[11px] font-bold text-[#F0C85A] tracking-[0.12em] block mb-4">{step.n}</span>
            <h3 className="text-sm sm:text-base font-semibold text-white/90 mb-2 leading-snug">{step.t}</h3>
            <p className="text-xs sm:text-sm text-white/45 font-light leading-[1.75]">{step.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-row gap-3">
        <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/65 px-6 py-3 text-sm font-medium hover:border-white/35 hover:text-white transition-colors">
          See Full Process →
        </Link>
        <Link to="/get-quote" className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 text-sm font-bold hover:bg-white transition-colors">
          Book Free Inspection
        </Link>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// Section 8 — Painter Verification (imported)
// ─────────────────────────────────────────────

// TransparentPricingSection merged into CalculatorTeaser below.
// Pricing principles (laser measurement, itemised quote, price-lock, GST)
// now appear inside the calculator section to avoid a standalone near-duplicate.

// ProductRecommendationSection removed from homepage.
// Products are service-adjacent, not the homepage focus.
// Products accessible via nav → Products or /products.

// ─────────────────────────────────────────────
// Section 11 — Warranty bar (compact — full detail in TrustBadges §2)
// ─────────────────────────────────────────────
const WarrantyBar = () => (
  <div className="bg-[#FFFBEF] border-y border-[#F0C85A]/25">
    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#F0C85A] flex items-center justify-center flex-shrink-0"><IconWarrantyShield className="w-4.5 h-4.5 text-[#0F1221]" /></div>
        <div>
          <p className="font-bold text-[#0F1221] text-sm leading-snug">1-Year Workmanship Warranty on every project.</p>
          <p className="text-xs text-[#0F1221]/50 font-light mt-0.5">Any defect within 12 months is fixed at zero cost. Premium: 2 yrs · Luxury: 3 yrs.</p>
        </div>
      </div>
      <Link
        to="/get-quote"
        className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0F1221] text-white px-5 py-2.5 text-xs font-bold hover:bg-[#493657] transition-colors whitespace-nowrap"
      >
        Book Free Inspection →
      </Link>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Section 13 — City Availability
// ─────────────────────────────────────────────
const cityRegions = [
  {
    region: 'North India',
    color: 'bg-blue-50 border-blue-100',
    dot: 'bg-blue-400',
    cities: [
      { name: 'Delhi', slug: 'painters-in-delhi' },
      { name: 'Gurgaon', slug: 'painters-in-gurgaon' },
      { name: 'Noida', slug: 'painters-in-noida' },
      { name: 'Chandigarh', slug: 'painters-in-chandigarh' },
      { name: 'Lucknow', slug: 'painters-in-lucknow' },
    ],
  },
  {
    region: 'West India',
    color: 'bg-amber-50 border-amber-100',
    dot: 'bg-amber-400',
    cities: [
      { name: 'Mumbai', slug: 'painters-in-mumbai' },
      { name: 'Pune', slug: 'painters-in-pune' },
      { name: 'Ahmedabad', slug: 'painters-in-ahmedabad' },
      { name: 'Surat', slug: 'painters-in-surat' },
      { name: 'Nagpur', slug: 'painters-in-nagpur' },
      { name: 'Goa', slug: 'painters-in-goa' },
    ],
  },
  {
    region: 'South India',
    color: 'bg-emerald-50 border-emerald-100',
    dot: 'bg-emerald-400',
    cities: [
      { name: 'Bengaluru', slug: 'painters-in-bengaluru' },
      { name: 'Hyderabad', slug: 'painters-in-hyderabad' },
      { name: 'Chennai', slug: 'painters-in-chennai' },
      { name: 'Kochi', slug: 'painters-in-kochi' },
    ],
  },
  {
    region: 'Other Cities',
    color: 'bg-purple-50 border-purple-100',
    dot: 'bg-purple-400',
    cities: [
      { name: 'Kolkata', slug: 'painters-in-kolkata' },
      { name: 'Jaipur', slug: 'painters-in-jaipur' },
      { name: 'Udaipur', slug: 'painters-in-udaipur' },
      { name: 'Indore', slug: 'painters-in-indore' },
    ],
  },
];

const CityAvailabilitySection = () => {
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent('Hi Calyco, I want to check if you serve my city.')}`;
  return (
    <section className="bg-[#F7F6F3] py-16 sm:py-20 lg:py-24 border-t border-[#0F1221]/6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F1221] px-4 py-2 mb-5">
              <MapPin className="w-3.5 h-3.5 text-[#F0C85A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">25+ Cities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#0F1221] tracking-[-0.02em] leading-[1.08]">
              Painting Services<br className="hidden sm:block" /> Across India.
            </h2>
            <p className="mt-4 text-base text-[#0F1221]/50 font-light leading-[1.8] max-w-lg">
              Calyco verified painter network live across 25+ cities and expanding every month.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#1fb355] transition-colors whitespace-nowrap shadow-[0_3px_12px_rgba(37,211,102,0.35)]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            Check My City
          </a>
        </div>

        {/* Region groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cityRegions.map((group) => (
            <div key={group.region} className={`rounded-2xl border ${group.color} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${group.dot} flex-shrink-0`} />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0F1221]/50">{group.region}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {group.cities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/${city.slug}`}
                    className="flex items-center justify-between rounded-xl bg-white/70 border border-[#0F1221]/6 px-3.5 py-2.5 hover:bg-white hover:border-[#493657]/20 hover:shadow-sm transition-all group"
                  >
                    <span className="text-sm font-medium text-[#0F1221] group-hover:text-[#493657] transition-colors">{city.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0F1221]/20 group-hover:text-[#493657] group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#0F1221]/8 bg-white px-6 py-4">
          <p className="text-sm text-[#0F1221]/60 font-light">
            <span className="font-semibold text-[#0F1221]">Don't see your city?</span> We are expanding every month — WhatsApp us to check availability.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-5 py-2.5 text-sm font-medium hover:border-[#0F1221]/35 hover:text-[#0F1221] transition-colors whitespace-nowrap"
          >
            Ask on WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Section 14 — FAQ
// ─────────────────────────────────────────────
const serviceFaqs = [
  { q: 'Is the inspection really free?', a: 'Yes. Calyco reviews your space, understands the wall condition, and gives you a clear scope before work begins — with no charges and no obligation.' },
  { q: 'Do I get a fixed quote?', a: 'Yes. You receive a written quote with scope, area, material, labour, timeline, and exclusions. The price does not change after you accept it.' },
  { q: 'Will your painters protect my furniture and floors?', a: 'Yes. Floor covering, furniture protection, switchboard taping, and daily cleanup are part of the Calyco process.' },
  { q: 'Can I track the work if I am not at home?', a: 'Yes. Daily photo updates are shared on WhatsApp so you always know what is happening on site.' },
  { q: 'Do you handle waterproofing also?', a: 'Yes. Calyco provides terrace, roof, bathroom, basement, and damp-wall waterproofing depending on site condition.' },
  { q: 'What warranty do I get?', a: 'A 1-year workmanship warranty on all Calyco service projects. If any defect appears within 12 months, we fix it at zero extra cost.' },
  { q: 'Which cities do you serve?', a: 'Calyco is building a verified painting partner network across 25+ selected Indian cities. Check your city availability when booking.' },
];

const ServiceFAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[#F7F6F3] py-14 sm:py-18">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-10">
          <div className="section-eyebrow mb-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#F0C85A]">Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.02em] leading-[1.08]">Before You Book<br className="hidden sm:block" /> a Free Inspection.</h2>
        </div>
        <div className="space-y-2">
          {serviceFaqs.map((faq, i) => (
            <div key={i} className="bg-white/70 border border-[#0F1221]/8 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium text-[#0F1221] text-sm sm:text-base">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#0F1221]/40 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 ${open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <p className="px-6 pb-5 text-sm text-[#0F1221]/60 leading-[1.75] font-light">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link to="/faq" className="text-sm font-medium text-[#0F1221]/50 hover:text-[#0F1221] transition-colors tracking-[0.03em]">
            See all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// Home page — 15-section order
// ─────────────────────────────────────────────
const Home = () => (
  <div className="font-poppins bg-white min-h-screen">
    <SEO
      title={`${BRAND_NAME} | Professional Painting & Waterproofing Services Across India`}
      description={`${POSITIONING_TAGLINE} Free site inspection, fixed written quote, verified painters across 25 cities including Delhi, Gurgaon, Mumbai, Bengaluru, Hyderabad, Pune and more.`}
      keywords="painting services india, painting services delhi, painting services mumbai, painting services bengaluru, waterproofing services, interior painting, exterior painting, wall texture painting, calyco paints"
      ogType="website"
    />

    {/* ─────────────────────────────────────────────────────────────────────
        MOBILE flow: Hero → Trust → Services → Calculator → Reviews → CTA
        All 6 sections visible on mobile. Sections 5–11 are desktop-only.
        The sticky bottom bar (Call | WhatsApp | Get Estimate) covers
        instant contact on every scroll position.
        ───────────────────────────────────────────────────────────────── */}

    {/* 1 — Hero with lead form */}
    <StaticHero />

    {/* 2 — Trust badges */}
    <TrustBadges />

    {/* 3 — Service cards */}
    <ServiceCards />

    {/* 4 — Cost calculator teaser */}
    <CalculatorTeaser />

    {/* 5 — Calyco 5-Star Painting Standard */}
    <WhyFiveStar />

    {/* 6 — Real Homes. Real Transformations. */}
    <ProjectGallerySection compact={true} showHeader={true} showFilter={true} bgClass="bg-[#F7F6F3]" />

    {/* 7 — How Calyco Works */}
    <HowItWorksSection />

    {/* 8 — Painter verification strip */}
    <div className="bg-white border-y border-[#0F1221]/6">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm font-medium text-[#0F1221]/70">
          Every painter is background-checked, skill-tested, and rated by previous customers.
        </p>
        <Link to="/verified-painters" className="flex-shrink-0 text-sm font-bold text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap">
          How we verify →
        </Link>
      </div>
    </div>

    {/* 11 — Warranty bar */}
    <WarrantyBar />

    {/* 12 — Customer reviews */}
    <ReviewsSection />

    {/* 13 — City availability */}
    <CityAvailabilitySection />

    {/* 14 — FAQ */}
    <ServiceFAQ />

    {/* 15 — Final CTA (visible on all sizes) */}
    <div className="bg-[#F7F6F3] px-5 sm:px-8 md:px-12 lg:px-16 py-8">
      <SiteInspectionCTA />
    </div>
    <CallToAction />
  </div>
);

export default Home;
