import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, ChevronLeft, Camera, X, Calendar, Shield } from 'lucide-react';
import SEO from '../components/SEO';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME, POSITIONING_TAGLINE, waForFullQuote } from '../data/positioning';
import { cityMultipliers } from '../data/servicePricing';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { id: 'interior-painting',    label: 'Interior Painting',     icon: '🏠', rate: [18, 30],  unit: 'sq ft' },
  { id: 'exterior-painting',    label: 'Exterior Painting',     icon: '🏗️', rate: [24, 40],  unit: 'sq ft' },
  { id: 'full-house-painting',  label: 'Full House Painting',   icon: '🏡', rate: [18, 30],  unit: 'sq ft' },
  { id: 'waterproofing',        label: 'Waterproofing',         icon: '💧', rate: [45, 85],  unit: 'sq ft' },
  { id: 'texture-painting',     label: 'Texture Painting',      icon: '🎨', rate: [35, 80],  unit: 'sq ft' },
  { id: 'wood-polish',          label: 'Wood Polish',           icon: '🪵', rate: [60, 120], unit: 'sq ft' },
  { id: 'wall-putty',           label: 'Wall Putty',            icon: '🔲', rate: [4, 8],    unit: 'sq ft' },
  { id: 'rental-painting',      label: 'Rental Painting',       icon: '🔑', rate: [12, 18],  unit: 'sq ft' },
  { id: 'commercial-painting',  label: 'Commercial Painting',   icon: '🏢', rate: [20, 35],  unit: 'sq ft' },
];

const QUOTE_CITIES = [
  'Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Pune',
  'Bengaluru', 'Hyderabad', 'Goa', 'Udaipur', 'Other',
];

const PROPERTIES = [
  { id: '1BHK',              label: '1 BHK',              sub: '~1,800–2,300 sq ft' },
  { id: '2BHK',              label: '2 BHK',              sub: '~2,800–3,800 sq ft' },
  { id: '3BHK',              label: '3 BHK',              sub: '~4,200–5,600 sq ft' },
  { id: '4BHK',              label: '4 BHK',              sub: '~6,000–8,000 sq ft' },
  { id: 'Villa',             label: 'Villa',              sub: 'Area confirmed on site' },
  { id: 'Office',            label: 'Office',             sub: 'Area confirmed on site' },
  { id: 'Shop',              label: 'Shop',               sub: 'Area confirmed on site' },
  { id: 'Society / Building',label: 'Society / Building', sub: 'Area confirmed on site' },
];

// paintable sqft estimates per BHK
const BHK_AREA = {
  '1BHK': [1800, 2300],
  '2BHK': [2800, 3800],
  '3BHK': [4200, 5600],
  '4BHK': [6000, 8000],
};

const WORK_TYPES = [
  { id: 'Fresh Painting',        label: 'Fresh Painting',        sub: 'New construction, first paint coat' },
  { id: 'Repainting',            label: 'Repainting',            sub: 'Paint over existing walls' },
  { id: 'Rental Painting',       label: 'Rental Painting',       sub: 'Quick, tenant-ready repaint' },
  { id: 'Waterproofing Repair',  label: 'Waterproofing Repair',  sub: 'Seepage, leaks, damp patches' },
  { id: 'Texture / Decorative',  label: 'Texture / Decorative',  sub: 'Feature walls, designer finishes' },
];

const STEPS = ['Service', 'City', 'Property', 'Work Type', 'Photos', 'Contact'];

const fmt = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`;

// ─── Estimate helper ──────────────────────────────────────────────────────────
const getEstimate = (serviceId, propertyId, city) => {
  const svc = SERVICES.find((s) => s.id === serviceId);
  if (!svc) return null;
  const area = BHK_AREA[propertyId];
  if (!area) return null;
  const mult = cityMultipliers[city] || 1.1;
  const [rMin, rMax] = svc.rate;
  const [aMin, aMax] = area;
  return {
    low:  Math.round(rMin * aMin * mult),
    high: Math.round(rMax * aMax * mult),
    area: `${aMin.toLocaleString('en-IN')}–${aMax.toLocaleString('en-IN')} sq ft`,
  };
};

// ─── Sub-components ───────────────────────────────────────────────────────────
const WaIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Progress bar
const ProgressBar = ({ step, total }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-medium text-[#0F1221]/45 uppercase tracking-[0.12em]">Step {step + 1} of {total}</span>
      <span className="text-xs font-semibold text-[#493657]">{STEPS[step]}</span>
    </div>
    <div className="h-1.5 rounded-full bg-[#0F1221]/8 overflow-hidden">
      <div
        className="h-full rounded-full bg-[#493657] transition-all duration-500"
        style={{ width: `${((step + 1) / total) * 100}%` }}
      />
    </div>
    <div className="flex mt-3 gap-1">
      {STEPS.map((label, i) => (
        <div key={label} className="flex-1 flex flex-col items-center gap-1">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${i < step ? 'bg-[#493657] text-white' : i === step ? 'bg-[#F0C85A] text-[#0F1221] ring-2 ring-[#F0C85A]/30' : 'bg-[#0F1221]/8 text-[#0F1221]/30'}`}>
            {i < step ? <Check className="w-2.5 h-2.5" /> : i + 1}
          </div>
          <span className={`text-[9px] font-medium hidden sm:block text-center leading-tight ${i === step ? 'text-[#493657]' : 'text-[#0F1221]/30'}`}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

// Nav buttons
const NavButtons = ({ onBack, onNext, nextLabel = 'Continue', nextDisabled = false, isSubmit = false }) => (
  <div className="flex gap-3 mt-6">
    {onBack && (
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 px-5 py-3 rounded-full border border-[#0F1221]/12 text-[#0F1221]/60 text-sm font-medium hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
    )}
    <button
      type={isSubmit ? 'submit' : 'button'}
      onClick={!isSubmit ? onNext : undefined}
      disabled={nextDisabled}
      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold transition-all ${nextDisabled ? 'bg-[#0F1221]/8 text-[#0F1221]/25 cursor-not-allowed' : isSubmit ? 'bg-[#25D366] text-white hover:bg-[#1fb355] shadow-[0_3px_14px_rgba(37,211,102,0.38)]' : 'bg-[#0F1221] text-white hover:bg-[#493657]'}`}
    >
      {isSubmit && <WaIcon />}
      {nextLabel}
      {!isSubmit && <ChevronRight className="w-4 h-4" />}
    </button>
  </div>
);

// Step label
const StepHeading = ({ title, sub }) => (
  <div className="mb-6">
    <h2 className="text-xl sm:text-2xl font-semibold text-[#0F1221] tracking-[-0.01em]">{title}</h2>
    {sub && <p className="text-sm text-[#0F1221]/50 font-light mt-1">{sub}</p>}
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const GetQuotePage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState([]); // array of { url, name }
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    service: '',
    city: '',
    property: '',
    workType: '',
    name: '',
    phone: '',
    preferWhatsApp: true,
    preferredDate: '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Photo handling
  const handleFiles = useCallback((files) => {
    const remaining = 8 - photos.length;
    const added = Array.from(files).slice(0, remaining).map((f) => ({
      url: URL.createObjectURL(f),
      name: f.name,
    }));
    setPhotos((prev) => [...prev, ...added]);
  }, [photos]);

  const removePhoto = (i) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[i].url);
      return prev.filter((_, idx) => idx !== i);
    });
  };

  // Estimate
  const estimate = getEstimate(form.service, form.property, form.city);

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.trim().length < 10) return;
    const msg = waForFullQuote({ ...form, photoCount: photos.length });
    window.open(
      `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
  };

  // Card button style helpers
  const cardBase = 'relative flex flex-col gap-1.5 rounded-2xl border px-4 py-3.5 text-left transition-all cursor-pointer focus:outline-none';
  const cardSelected = 'border-[#493657] bg-[#493657]/5 shadow-sm ring-1 ring-[#493657]/20';
  const cardIdle = 'border-[#0F1221]/10 bg-white hover:border-[#493657]/40 hover:bg-[#493657]/3';

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FBF9F6] flex items-center justify-center px-5 py-16">
        <div className="max-w-lg w-full">
          <div className="bg-white border border-[#e5e0d8] rounded-3xl p-8 sm:p-10 text-center">
            {/* Check circle */}
            <div className="w-20 h-20 rounded-full bg-[#25D366]/12 border-2 border-[#25D366]/25 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998850] mb-3">{BRAND_NAME}</p>
            <h1 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em] mb-4">
              Your Calyco site visit request is confirmed.
            </h1>
            <p className="text-[#0F1221]/60 text-sm font-light leading-[1.8] mb-2">
              Our team will review your details and contact you on WhatsApp.
            </p>
            <p className="text-[#0F1221]/60 text-sm font-light leading-[1.8] mb-8">
              You will receive a fixed written quote after site inspection and measurement.
            </p>

            {/* What happens next */}
            <div className="rounded-2xl bg-[#F7F6F3] border border-[#0F1221]/6 p-5 text-left mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0F1221]/40 mb-4">What happens next</p>
              {[
                { n: '1', t: 'WhatsApp confirmation', d: 'Our team confirms your request within 2 hours.' },
                { n: '2', t: 'Free site visit scheduled', d: 'A Calyco supervisor visits your property.' },
                { n: '3', t: 'Verified painter assigned', d: 'Screened, rated team allocated to your project.' },
                { n: '4', t: 'Fixed written quote', d: 'Exact scope, area, material, timeline, and price in writing.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 mb-3 last:mb-0">
                  <span className="w-6 h-6 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#0F1221]">{item.t}</p>
                    <p className="text-xs text-[#0F1221]/50 font-light mt-0.5">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/calculators/service-cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/12 text-[#0F1221]/70 px-6 py-3 text-sm font-medium hover:border-[#0F1221]/30 transition-colors"
              >
                See cost calculator
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Browse all services →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#FBF9F6] pb-20">
      <SEO
        title="Get a Free Quote | Calyco 5-Star Painting Service"
        description="Book a free site visit in 2 minutes. Verified painters, fixed written quote, daily WhatsApp updates. Serving 25+ cities across India."
        url="https://calycopaints.com/get-quote"
      />

      {/* Page header */}
      <div className="bg-[#0F1221] px-5 sm:px-8 py-8 sm:py-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0C85A]/70 mb-2">{BRAND_NAME}</p>
          <h1 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.01em]">
            Book Your Free Site Visit
          </h1>
          <p className="text-white/45 text-sm font-light mt-2 leading-[1.7]">
            Takes 2 minutes · No commitment · Fixed quote after site inspection
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-8">
        <form onSubmit={handleSubmit}>
          <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6 sm:p-8">

            <ProgressBar step={step} total={STEPS.length} />

            {/* ── Step 1: Service ── */}
            {step === 0 && (
              <>
                <StepHeading title="What service do you need?" sub="Select the primary service for this project." />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => set('service', s.id)}
                      className={`${cardBase} ${form.service === s.id ? cardSelected : cardIdle}`}
                    >
                      {form.service === s.id && (
                        <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#493657] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                      <span className="text-xl leading-none">{s.icon}</span>
                      <span className="text-sm font-semibold text-[#0F1221] leading-snug pr-5">{s.label}</span>
                      <span className="text-[10px] text-[#0F1221]/40 font-medium">₹{s.rate[0]}–{s.rate[1]}/{s.unit}</span>
                    </button>
                  ))}
                </div>
                <NavButtons onNext={() => setStep(1)} nextDisabled={!form.service} />
              </>
            )}

            {/* ── Step 2: City ── */}
            {step === 1 && (
              <>
                <StepHeading title="Which city is the property in?" sub="We'll apply the correct city pricing rate." />
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {QUOTE_CITIES.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set('city', c)}
                      className={`${cardBase} items-center text-center ${form.city === c ? cardSelected : cardIdle}`}
                    >
                      {form.city === c && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#493657] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[#0F1221] w-full">{c}</span>
                      {cityMultipliers[c] && (
                        <span className="text-[10px] text-[#0F1221]/35 font-medium">{cityMultipliers[c].toFixed(2)}x rate</span>
                      )}
                    </button>
                  ))}
                </div>
                <NavButtons onBack={() => setStep(0)} onNext={() => setStep(2)} nextDisabled={!form.city} />
              </>
            )}

            {/* ── Step 3: Property ── */}
            {step === 2 && (
              <>
                <StepHeading title="What is the property size?" sub="BHK selection gives you an instant estimate range." />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PROPERTIES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => set('property', p.id)}
                      className={`${cardBase} ${form.property === p.id ? cardSelected : cardIdle}`}
                    >
                      {form.property === p.id && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#493657] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </span>
                      )}
                      <span className="text-sm font-bold text-[#0F1221] pr-5">{p.label}</span>
                      <span className="text-[10px] text-[#0F1221]/40 font-light">{p.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Estimate card */}
                {estimate && (
                  <div className="mt-5 rounded-2xl bg-[#0F1221] px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F0C85A]/70 mb-1">Estimated cost range</p>
                    <p className="text-2xl font-light text-white">
                      {fmt(estimate.low)} <span className="text-[#F0C85A]">– {fmt(estimate.high)}</span>
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      Based on {estimate.area} paintable area in {form.city} · Final quote after site inspection
                    </p>
                  </div>
                )}
                <NavButtons onBack={() => setStep(1)} onNext={() => setStep(3)} nextDisabled={!form.property} />
              </>
            )}

            {/* ── Step 4: Work type ── */}
            {step === 3 && (
              <>
                <StepHeading title="What kind of work is this?" sub="Helps us send the right supervisor for your site visit." />
                <div className="flex flex-col gap-2">
                  {WORK_TYPES.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => set('workType', w.id)}
                      className={`${cardBase} flex-row items-center gap-4 ${form.workType === w.id ? cardSelected : cardIdle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${form.workType === w.id ? 'border-[#493657] bg-[#493657]' : 'border-[#0F1221]/20'}`}>
                        {form.workType === w.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0F1221]">{w.label}</p>
                        <p className="text-xs text-[#0F1221]/45 font-light">{w.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <NavButtons onBack={() => setStep(2)} onNext={() => setStep(4)} nextDisabled={!form.workType} />
              </>
            )}

            {/* ── Step 5: Photos ── */}
            {step === 4 && (
              <>
                <StepHeading
                  title="Upload wall photos"
                  sub={`Share 3–8 photos of your walls, ceiling, and any problem areas. Helps us prepare a more accurate quote. (${photos.length}/8 uploaded)`}
                />

                {/* Upload area */}
                {photos.length < 8 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-2xl border-2 border-dashed border-[#0F1221]/15 bg-[#FAFAF8] hover:border-[#493657]/40 hover:bg-[#493657]/3 transition-all py-8 flex flex-col items-center gap-3 mb-4"
                  >
                    <Camera className="w-8 h-8 text-[#0F1221]/25" />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0F1221]/70">Tap to add photos</p>
                      <p className="text-xs text-[#0F1221]/35 mt-1">JPEG, PNG or HEIC · Max 8 photos</p>
                    </div>
                    <span className="px-5 py-2 rounded-full bg-[#0F1221] text-white text-xs font-bold">
                      Choose Photos
                    </span>
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => { if (e.target.files) handleFiles(e.target.files); e.target.value = ''; }}
                />

                {/* Thumbnails */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {photos.map((p, i) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-[#e5e0d8]">
                        <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                          aria-label="Remove photo"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    {photos.length < 8 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-[#0F1221]/12 flex items-center justify-center hover:border-[#493657]/40 transition-colors"
                      >
                        <span className="text-2xl text-[#0F1221]/20">+</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="rounded-xl bg-[#F0C85A]/10 border border-[#F0C85A]/25 px-4 py-3 text-xs text-[#7a6020] font-medium">
                  Photos are optional but recommended. You can also share them directly after opening WhatsApp.
                </div>

                <NavButtons
                  onBack={() => setStep(3)}
                  onNext={() => setStep(5)}
                  nextLabel={photos.length === 0 ? 'Skip & Continue' : `Continue with ${photos.length} photo${photos.length > 1 ? 's' : ''}`}
                />
              </>
            )}

            {/* ── Step 6: Contact ── */}
            {step === 5 && (
              <>
                <StepHeading title="Your contact details" sub="We'll confirm your site visit on WhatsApp within 2 hours." />

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0F1221] mb-1.5">Full name <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1221] mb-1.5">Mobile number <span className="text-red-400">*</span></label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      required
                      className="w-full rounded-xl border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1221] mb-1.5">
                      <Calendar className="w-4 h-4 inline mr-1.5 text-[#0F1221]/40" />
                      Preferred visit date &amp; time
                    </label>
                    <input
                      type="text"
                      value={form.preferredDate}
                      onChange={(e) => set('preferredDate', e.target.value)}
                      placeholder="e.g. 18 June, Morning / After 6pm"
                      className="w-full rounded-xl border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5">
                      <input
                        type="checkbox"
                        checked={form.preferWhatsApp}
                        onChange={(e) => set('preferWhatsApp', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 rounded border-2 border-[#e5e0d8] bg-white peer-checked:bg-[#25D366] peer-checked:border-[#25D366] transition-all flex items-center justify-center">
                        {form.preferWhatsApp && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-sm text-[#0F1221]/70 font-light leading-[1.5]">
                      Contact me on WhatsApp (this number is WhatsApp-enabled)
                    </span>
                  </label>
                </div>

                {/* Order summary */}
                <div className="mt-5 rounded-2xl bg-[#F7F6F3] border border-[#0F1221]/8 p-4 text-sm space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0F1221]/35 mb-3">Your request summary</p>
                  {[
                    ['Service', SERVICES.find((s) => s.id === form.service)?.label],
                    ['City', form.city],
                    ['Property', form.property],
                    ['Work type', form.workType],
                    ['Photos', photos.length > 0 ? `${photos.length} photo${photos.length > 1 ? 's' : ''}` : 'None — can share later'],
                  ].map(([k, v]) => v && (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-[#0F1221]/45 font-light">{k}</span>
                      <span className="font-semibold text-[#0F1221]">{v}</span>
                    </div>
                  ))}
                  {estimate && (
                    <div className="pt-2 mt-2 border-t border-[#0F1221]/8 flex items-center justify-between">
                      <span className="text-[#0F1221]/45 font-light">Est. range</span>
                      <span className="font-bold text-[#493657]">{fmt(estimate.low)} – {fmt(estimate.high)}</span>
                    </div>
                  )}
                </div>

                <NavButtons
                  onBack={() => setStep(4)}
                  nextLabel="Send via WhatsApp & Book Visit"
                  nextDisabled={!form.name.trim() || form.phone.trim().length < 10}
                  isSubmit
                />

                <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#F7F6F3] border border-[#0F1221]/6 px-4 py-3">
                  <Shield className="w-4 h-4 text-[#0F1221]/30 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0F1221]/45 font-light leading-[1.6]">
                    Your details are sent directly to Calyco's team via WhatsApp. No third-party sharing. No spam.
                  </p>
                </div>
              </>
            )}

          </div>
        </form>

        {/* Trust strip below form */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: '✅', label: 'Free site visit', sub: 'No charges, no commitment' },
            { icon: '📋', label: 'Fixed written quote', sub: 'After site inspection' },
            { icon: '🛡️', label: 'Verified painters', sub: 'Screened & background-checked' },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl bg-white border border-[#e5e0d8] px-3 py-3 text-center">
              <span className="text-lg block mb-1">{b.icon}</span>
              <p className="text-xs font-semibold text-[#0F1221] leading-tight">{b.label}</p>
              <p className="text-[10px] text-[#0F1221]/40 font-light mt-0.5 leading-tight">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GetQuotePage;
