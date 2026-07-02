import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Calculator, Check, ChevronRight, ChevronDown, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import contactData from '../../data/admin/contact.json';
import { getServiceBySlug, servicesByCategory, cityMultipliers } from '../../data/servicePricing';
import { BRAND_NAME, POSITIONING_TAGLINE, POSITIONING_PILLS, waForService } from '../../data/positioning';
import { getServiceFAQs } from '../../data/faqData';
import SurfacePreparationSection from '../../components/SurfacePreparationSection';
import CustomSelect from '../../components/CustomSelect';
import ServiceWarrantySection from '../../components/ServiceWarrantySection';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

// ─── Category colour themes ───────────────────────────────────────────────────
const categoryColors = {
  // New 7 categories (matched by service.category string from servicePricing)
  'Interior Painting':             { from: '#1A0B21', to: '#432553' },
  'Exterior Painting':             { from: '#0a1e3a', to: '#1a3f6e' },
  'Ceiling Painting':              { from: '#1a2e4a', to: '#2e4f7a' },
  'Add-ons':                       { from: '#2e1e04', to: '#6a4618' },
  'Dampness / Leakage Repair':     { from: '#062030', to: '#0e4060' },
  'Texture / Decorative Painting': { from: '#4a2e00', to: '#8a5a00' },
  'Waterproofing':                 { from: '#062818', to: '#104820' },
  // Legacy fallbacks (in case any old slug sneaks through)
  'Core Painting Services':        { from: '#1A0B21', to: '#432553' },
  'Waterproofing Services':        { from: '#062818', to: '#104820' },
  'Wall Design Services':          { from: '#4a2e00', to: '#8a5a00' },
};

// ─── Package config keyed by tier name ───────────────────────────────────────
const TIER_CONFIG = {
  Economy: {
    bestFor: 'Rental / budget repaint',
    includes: ['Light sanding where needed', 'Single-coat primer', '2 coats standard emulsion', 'Basic masking & cleanup'],
    warranty: '6–12 months',
    cta: 'Get Estimate',
    ctaLink: '/calculators/service-cost-calculator',
    highlight: false,
  },
  Premium: {
    bestFor: 'Family homes',
    includes: ['Surface repair & crack filling', '2-coat primer system', 'Washable premium paint', 'Supervisor quality check'],
    warranty: '2 years',
    cta: 'Book Site Visit',
    ctaLink: '/get-quote',
    highlight: true,
  },
  Luxury: {
    bestFor: 'Premium homes & villas',
    includes: ['Full prep + putty where needed', 'Anti-fungal damp-resist primer', 'Luxury emulsion (2 coats)', '27-point quality inspection'],
    warranty: '3 years',
    cta: 'Talk to Expert',
    ctaLink: '/get-quote',
    highlight: false,
  },
  Standard: {
    bestFor: 'Standard repair / seepage',
    includes: ['Seepage inspection', 'Chemical waterproofing layer', 'Surface preparation', 'Leakage-point treatment'],
    warranty: 'Project-specific',
    cta: 'Get Estimate',
    ctaLink: '/calculators/service-cost-calculator',
    highlight: false,
  },
  'Heavy leakage': {
    bestFor: 'Severe / active leakage',
    includes: ['Deep seepage investigation', 'Multi-layer system', 'Injection grouting if needed', 'Extended treatment'],
    warranty: 'Project-specific',
    cta: 'Talk to Expert',
    ctaLink: '/get-quote',
    highlight: false,
  },
  Basic: {
    bestFor: 'Simple feature walls',
    includes: ['Single texture pattern', 'Base wall prep', '1 feature wall', 'Basic application'],
    warranty: 'Workmanship',
    cta: 'Get Estimate',
    ctaLink: '/calculators/service-cost-calculator',
    highlight: false,
  },
  Designer: {
    bestFor: 'Designer interiors',
    includes: ['Custom pattern selection', 'Multi-layer finish', 'Colour consultation', 'Supervisor check'],
    warranty: 'Workmanship',
    cta: 'Book Site Visit',
    ctaLink: '/get-quote',
    highlight: true,
  },
  'Basic polish': {
    bestFor: 'Budget wood refresh',
    includes: ['Light sanding', 'Single polish coat', 'Standard finish'],
    warranty: 'Workmanship',
    cta: 'Get Estimate',
    ctaLink: '/calculators/service-cost-calculator',
    highlight: false,
  },
  Melamine: {
    bestFor: 'Durable woodwork',
    includes: ['Full surface prep', 'Melamine primer + topcoat', 'Smooth factory-like finish'],
    warranty: 'Workmanship',
    cta: 'Book Site Visit',
    ctaLink: '/get-quote',
    highlight: true,
  },
  'PU coating': {
    bestFor: 'Premium wood surface',
    includes: ['Complete sanding', 'PU primer + 2 PU topcoats', 'Mirror finish option'],
    warranty: 'Workmanship',
    cta: 'Talk to Expert',
    ctaLink: '/get-quote',
    highlight: false,
  },
};

// ─── Service FAQs per category ────────────────────────────────────────────────
// getFAQs now delegates to the shared faqData module for consistent, rich content

// ─── Before/After cards per category ─────────────────────────────────────────
const BA_DIR = '/real project section/before and after';
const baPair = (n) => ({
  beforeSrc: `${BA_DIR}/${n},1.webp`,
  afterSrc:  `${BA_DIR}/${n},2.webp`,
});

const getBeforeAfterCards = (service) => {
  const paintingCards = [
    { ...baPair('s2'), before: 'Yellowed, stained walls with flaking paint and visible patches', after: 'Smooth washable finish, uniform colour, clean edges and corners', location: 'Delhi' },
    { ...baPair('s3'), before: 'Dull, chalky walls from previous low-quality paint that attracts dust', after: 'Vibrant, anti-dust finish that wipes clean without damage', location: 'Gurgaon' },
    { ...baPair('s1'), before: 'Cracked skirting and uneven surface with rough texture', after: 'Filled, sanded smooth and painted to a polished finish', location: 'Mumbai' },
  ];
  const waterCards = [
    { ...baPair('s4'), before: 'Green seepage marks and damp patches on ceiling after rain', after: 'Dry, protected surface sealed against water ingress for years', location: 'Mumbai' },
    { ...baPair('s6'), before: 'Active leakage from terrace slab causing interior wall damage', after: 'Terrace sealed with multi-layer system, interior dry and clean', location: 'Bengaluru' },
    { ...baPair('s5'), before: 'Bathroom wall seepage staining tiles and weakening plaster', after: 'Wet-area waterproofed before tiling — no seepage signs after 6 months', location: 'Delhi' },
  ];
  const textureCards = [
    { ...baPair('s7'), before: 'Plain flat wall in living room, scuffed and worn from years of use', after: 'Designer sand texture in warm beige — premium finish, no scuffs visible', location: 'Pune' },
    { ...baPair('s5'), before: 'Bare bedroom wall with faded paint and nail-hole patches', after: 'Geometric stencil accent wall in charcoal and white — focal point of the room', location: 'Hyderabad' },
    { ...baPair('s6'), before: 'Office reception wall with scratched emulsion from years of traffic', after: 'Metallic texture feature wall — professional look, easy to maintain', location: 'Bengaluru' },
  ];
  if (service.category === 'Waterproofing') return waterCards;
  if (service.category === 'Wall Design') return textureCards;
  return paintingCards;
};

// ─── WhatsApp icon ────────────────────────────────────────────────────────────
const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ─── Hero quick-quote form — continues into /get-quote with city + phone ─────
const HeroQuoteForm = () => {
  const CITIES = Object.keys(cityMultipliers).sort();
  const navigate = useNavigate();
  const [city, setCity] = useState('Delhi');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.trim().length < 10) return;
    navigate('/get-quote', { state: { phone: phone.trim(), city } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <CustomSelect
        value={city}
        onChange={setCity}
        options={CITIES}
        label="Select city"
        variant="dark"
      />
      <input
        type="tel"
        inputMode="numeric"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
        placeholder="Mobile number"
        maxLength={10}
        required
        className="w-full rounded-xl border border-white/15 bg-white/10 text-white placeholder-white/35 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F0C85A]"
        aria-label="Mobile number"
      />
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F0C85A] text-[#0F1221] py-3 text-sm font-bold hover:bg-white transition-colors shadow-[0_3px_14px_rgba(240,200,90,0.4)]"
      >
        Book Free Site Visit →
      </button>
      <p className="text-center text-[10px] text-white/35">No spam · Team calls or WhatsApps you</p>
    </form>
  );
};

// ─── Service Schema ───────────────────────────────────────────────────────────
const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: { '@type': 'Organization', name: 'Calyco Paints' },
  areaServed: ['Delhi', 'Gurgaon', 'Noida', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Goa', 'Udaipur', 'Jaipur'],
  offers: service.baseMin > 0 ? {
    '@type': 'Offer',
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: service.baseMin,
      maxPrice: service.baseMax,
      unitText: service.unit,
    },
  } : undefined,
});

// ─── Main page ────────────────────────────────────────────────────────────────
const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const [faqOpen, setFaqOpen] = useState(null);
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#FBF9F6] flex items-center justify-center px-5">
        <div className="max-w-md w-full bg-white border border-[#e5e0d8] rounded-2xl p-10 text-center">
          <Calculator className="w-10 h-10 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
          <p className="text-gray-500 mt-3">This service may have moved or is not available yet.</p>
          <Link to="/services" className="inline-flex items-center gap-2 mt-6 text-[#493657] font-semibold hover:text-[#F0C85A]">
            <ArrowLeft className="w-4 h-4" /> Back to services
          </Link>
        </div>
      </main>
    );
  }

  const colors = categoryColors[service.mainCategory] || categoryColors['Core Painting Services'];
  const isFree = service.baseMin === 0 && service.baseMax === 0;
  const tiers = Object.keys(service.tiers);
  const packages = tiers.map((t) => ({ name: t, multiplier: service.tiers[t], ...(TIER_CONFIG[t] || TIER_CONFIG.Standard) })).slice(0, 3);
  const faqs = getServiceFAQs(service);
  const beforeAfter = getBeforeAfterCards(service);

  const related = (servicesByCategory[service.category] || [])
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const openWhatsApp = (msg) => {
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const fmt = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

  return (
    <main className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title={`${service.name} Services | ${BRAND_NAME}`}
        description={`${service.description} ${POSITIONING_TAGLINE}`}
        url={`https://calycopaints.com/services/${service.slug}`}
        schemaMarkup={faqs.length > 0 ? {
          '@context': 'https://schema.org',
          '@graph': [
            serviceSchema(service),
            {
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ],
        } : serviceSchema(service)}
      />

      {/* ── Section 1: Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F0C85A]/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6 pb-10 lg:pt-8 lg:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/45 mb-6" aria-label="breadcrumb">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/70 mb-3">{BRAND_NAME}</p>
              <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-light text-white leading-[1.08] tracking-[-0.02em] mb-4">
                {service.name}
              </h1>
              <p className="text-base text-white/55 font-light leading-[1.75] max-w-xl mb-2">{service.description}</p>
              <p className="text-xs text-[#F0C85A]/70 font-medium mb-6 tracking-[0.03em]">{POSITIONING_TAGLINE}</p>

              {/* Price */}
              {!isFree && (
                <div className="mb-6">
                  <p className="text-3xl font-light text-white">
                    {fmt(service.baseMin)}
                    <span className="text-xl text-white/50"> – {fmt(service.baseMax)}</span>
                    <span className="text-base text-white/45 font-light"> /{service.unit}</span>
                  </p>
                  <p className="text-xs text-white/35 mt-1">Base rate · City factor applied at inspection · excl. GST</p>
                </div>
              )}

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {POSITIONING_PILLS.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/12 px-3 py-1.5 text-xs font-medium text-white/70">
                    <Check className="w-3 h-3 text-[#F0C85A] flex-shrink-0" />{t}
                  </span>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/calculators/service-cost-calculator?service=${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-6 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Calculate Cost
                </Link>
                <Link
                  to="/get-quote"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-5 py-3 sm:px-6 sm:py-3.5 text-white font-semibold hover:bg-white/15 transition-colors"
                >
                  Book Free Site Visit →
                </Link>
              </div>
              <p className="text-xs text-white/30 mt-3">Free inspection · Fixed written quote · No commitment required</p>
            </div>

            {/* Right: quick quote form */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-1">{service.name}</p>
              <h2 className="text-lg font-semibold text-white mb-1">Get a quick site visit</h2>
              <p className="text-xs text-white/40 font-light mb-5">Enter your city and number — team confirms in 2 hrs.</p>
              <HeroQuoteForm />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#FBF9F6]">

        {/* ── Section 2: What is included ──────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-[#0F1221] tracking-[-0.01em] mb-5">What is included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] p-3">
                    <Check className="w-4 h-4 text-[#25D366] mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-[#0F1221]/75 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-[#0F1221] tracking-[-0.01em] mb-4">
                {isFree ? 'This service is free' : 'Starting price'}
              </h2>
              {isFree ? (
                <p className="text-4xl font-bold text-[#493657]">Free</p>
              ) : (
                <>
                  <p className="text-4xl font-bold text-[#493657]">
                    {fmt(service.baseMin)}
                    <span className="text-2xl text-gray-400"> – {fmt(service.baseMax)}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">per {service.unit} · base rate · excl. GST</p>

                  {Object.keys(service.tiers).length > 1 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tier pricing (Delhi rate incl.)</p>
                      {Object.entries(service.tiers).map(([t, m]) => (
                        <div key={t} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 font-medium">{t}</span>
                          <span className="text-sm font-bold text-[#493657]">
                            {fmt(service.baseMin * m * 1.15)} – {fmt(service.baseMax * m * 1.15)}
                            <span className="text-xs text-gray-400 font-normal"> /{service.unit}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="mt-4 rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] px-4 py-3 text-xs text-gray-500">
                Final price confirmed after free site inspection and laser measurement.
              </div>
              <Link
                to="/get-quote"
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white py-3 text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Book Free Site Visit →
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 3: Package Table ──────────────────────────────────── */}
        {packages.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-10">
            <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-6">Choose Your Package</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`rounded-2xl border p-5 flex flex-col relative ${pkg.highlight ? 'border-[#F0C85A] bg-[#FFFDF0] shadow-[0_4px_20px_rgba(240,200,90,0.18)]' : 'border-[#e5e0d8] bg-white'}`}
                >
                  {pkg.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#F0C85A] text-[#0F1221] text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1">Most Popular</span>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-bold text-[#0F1221] text-base">{pkg.name}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0F1221]/8 text-[#0F1221]/55 uppercase tracking-[0.07em]">
                      {pkg.warranty} warranty
                    </span>
                  </div>
                  <p className="text-xs text-[#0F1221]/70 font-medium mb-1">Best for: <span className="text-[#0F1221]/70">{pkg.bestFor}</span></p>
                  {!isFree && (
                    <p className="text-xs font-bold text-[#493657] mb-3">
                      ~{fmt(service.baseMin * pkg.multiplier)} – {fmt(service.baseMax * pkg.multiplier)}/{service.unit}
                    </p>
                  )}
                  <ul className="space-y-1.5 flex-1 mb-4">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#0F1221]/70">
                        <Check className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={pkg.ctaLink}
                    className={`block text-center rounded-full py-2.5 text-xs font-bold transition-colors ${pkg.highlight ? 'bg-[#0F1221] text-white hover:bg-[#493657]' : 'border border-[#0F1221]/15 text-[#0F1221]/70 hover:border-[#493657] hover:text-[#493657]'}`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#0F1221]/70 font-light">
              Package inclusions and pricing confirmed after free site inspection and laser measurement. Rates shown are base rates before city factor.
            </p>
          </section>
        )}

        {/* ── Section 4: Surface Preparation ───────────────────────────── */}
        <SurfacePreparationSection />

        {/* ── Section 5: Calyco 5-Star Process ─────────────────────────── */}
        <section className="bg-[#0F1221] py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/60">Our Process</span>
              <div className="mt-2 mb-4 h-[1px] w-10 bg-white/15" />
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em]">
                How Calyco Delivers {service.name}.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { n: '01', t: 'Book Free Inspection', d: 'Tell us your location and requirement. No payment, no commitment.' },
                { n: '02', t: 'Site Visit & Measurement', d: 'Supervisor inspects walls, dampness, cracks, area and surface condition with laser tool.' },
                { n: '03', t: 'Fixed Written Quote', d: 'Clear pricing, scope, material, timeline and exclusions in writing. Price does not change.' },
                { n: '04', t: 'Verified Team Assigned', d: 'A Calyco-screened, background-checked and rated painting team is assigned.' },
                { n: '05', t: 'Daily Work Updates', d: 'Progress photos and notes shared on WhatsApp every day during execution.' },
                { n: '06', t: 'Final Quality Check', d: '27-point checklist, touch-ups, full cleanup and your approval before handover.' },
              ].map((step) => (
                <div key={step.n} className="rounded-xl bg-white/5 border border-white/8 p-5 hover:bg-white/8 transition-all">
                  <span className="text-[10px] font-bold text-[#F0C85A]/50 tracking-[0.12em] block mb-3">{step.n}</span>
                  <h3 className="text-sm font-semibold text-white/85 mb-2">{step.t}</h3>
                  <p className="text-xs text-white/40 font-light leading-[1.7]">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6: Before / After ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">Real Results</span>
              <div className="mt-2 mb-3 h-[1px] w-10 bg-[#0F1221]/10" />
              <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em]">Before &amp; After.</h2>
            </div>
            <Link to="/gallery" className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap">View gallery →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {beforeAfter.map((card, i) => (
              <div key={i} className="rounded-2xl border border-[#0F1221]/8 bg-white overflow-hidden hover:shadow-[0_12px_36px_rgba(15,18,33,0.10)] transition-shadow">
                {/* Real before/after — drag to compare */}
                <div className="relative">
                  <BeforeAfterSlider
                    beforeSrc={card.beforeSrc}
                    afterSrc={card.afterSrc}
                    height="h-44"
                    initialPos={42}
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-[#0F1221] bg-white px-2 py-0.5 rounded-full shadow-sm z-10 pointer-events-none">{card.location}</span>
                </div>
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#0F1221]/35 flex-shrink-0 w-10 uppercase tracking-wide text-[10px]">Before</span>
                    <span className="text-[#0F1221]/55 font-light">{card.before}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#493657] flex-shrink-0 w-10 uppercase tracking-wide text-[10px]">After</span>
                    <span className="text-[#0F1221]/75">{card.after}</span>
                  </div>
                  <Link to="/gallery" className="inline-flex items-center gap-1 pt-1 text-[11px] font-bold text-[#493657] hover:text-[#F0C85A] transition-colors">
                    See similar projects →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 7: Warranty ───────────────────────────────────────── */}
        <ServiceWarrantySection highlightCategory={service.category} />

        {/* ── Section 8: FAQs ──────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-12">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em]">Common Questions</h2>
            <Link to="/faq" className="text-sm font-medium text-[#493657] hover:text-[#F0C85A] transition-colors whitespace-nowrap">
              See all FAQs →
            </Link>
          </div>
          <div className="space-y-2">
            {faqs.map((item, i) => {
              const panelId = `svc-faq-panel-${i}`;
              return (
              <div key={i} className="rounded-2xl border border-[#e5e0d8] bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={faqOpen === i}
                  aria-controls={panelId}
                >
                  <span className="text-sm font-semibold text-[#0F1221]">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#0F1221]/35 flex-shrink-0 transition-transform duration-200 ${faqOpen === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                <div id={panelId} className={`transition-all duration-300 ${faqOpen === i ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="px-5 pb-5 text-sm text-[#0F1221]/60 font-light leading-[1.75]">{item.a}</p>
                </div>
              </div>
              );
            })}
          </div>
          <div className="mt-5">
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-medium text-[#0F1221]/45 hover:text-[#493657] transition-colors">
              Browse all FAQs including pricing, warranty, waterproofing and payments →
            </Link>
          </div>
        </section>

        {/* ── Section 9: Related Services ───────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-10">
            <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-5">Related Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="group rounded-2xl bg-white border border-[#e5e0d8] p-5 hover:border-[#493657]/30 hover:shadow-[0_4px_18px_rgba(73,54,87,0.10)] transition-all block"
                >
                  <p className="font-bold text-[#0F1221] group-hover:text-[#493657] transition-colors">{s.name}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.description}</p>
                  {s.baseMin > 0 && <p className="text-xs font-bold text-[#998850] mt-3">{fmt(s.baseMin)} – {fmt(s.baseMax)}/{s.unit}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Section 10: Final CTA ─────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-10">
          <div className="rounded-2xl bg-gradient-to-r from-[#0F1221] via-[#1a0b21] to-[#432553] px-6 sm:px-10 py-8 sm:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F0C85A]/60 mb-2">{BRAND_NAME}</p>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em] mb-2">
                Ready to start your {service.name} project?
              </h2>
              <p className="text-sm text-white/50 font-light max-w-lg leading-[1.75]">
                Book a free site visit. A Calyco supervisor visits your property, inspects the condition, and gives you a fixed written quote — no commitment required.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Free inspection', 'Fixed price', 'Verified team', 'Warranty-backed'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/50 font-medium">
                    <Check className="w-3 h-3 text-[#F0C85A]" />{t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0 w-full lg:w-auto min-w-[200px]">
              <Link
                to="/get-quote"
                className="flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-7 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg whitespace-nowrap"
              >
                Book Free Inspection →
              </Link>
              <button
                type="button"
                onClick={() => openWhatsApp(waForService(service.name))}
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-5 py-2.5 sm:px-7 sm:py-3 font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <WaIcon />
                WhatsApp Us
              </button>
              <Link
                to="/services"
                className="text-center text-xs text-white/35 hover:text-white/60 transition-colors"
              >
                Browse all services →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ServiceDetailPage;
