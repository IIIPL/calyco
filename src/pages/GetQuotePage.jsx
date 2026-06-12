import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, ChevronDown, Calendar, Shield, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME } from '../data/positioning';
import { submitSiteVisit } from '../services/siteVisitSubmit';

/* ── Brand tokens (match HomeFinal / BudgetCalculator exactly) ───────────── */
const GOLD   = '#F0C85A';
const PURPLE = '#493657';

const WA_LINK = contactData?.contact?.whatsapp?.link ?? 'https://wa.me/918796777399';

const CITIES = [
  'Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Pune',
  'Bengaluru', 'Hyderabad', 'Goa', 'Udaipur', 'Other',
];

const PROPERTY_TYPES = [
  'Interior Space',
  'High-rise Apartment',
  'Villa / Bungalow',
  'Commercial Space',
];

const Eyebrow = ({ text }) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="block w-10 h-px" style={{ background: GOLD }} />
    <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: PURPLE }}>{text}</span>
  </div>
);

const WaIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* Shared input style */
const inputCls = 'w-full rounded-xl border border-[#e5e0d8] bg-white px-4 py-3.5 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent transition-shadow';

const Field = ({ label, required = true, children }) => (
  <div>
    <label className="block text-[13px] font-semibold text-[#0F1221] mb-1.5">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

/* ── Custom premium city select ───────────────────────────────────────────── */
const CitySelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls} text-left flex items-center justify-between gap-2 ${value ? '' : 'text-[#0F1221]/30'}`}
      >
        <span>{value || 'Select your city'}</span>
        <ChevronDown className={`w-4 h-4 flex-shrink-0 text-[#0F1221]/35 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 left-0 w-full bg-white rounded-2xl border border-[#0F1221]/8 shadow-[0_18px_60px_rgba(15,18,33,0.18)] py-2 max-h-60 overflow-y-auto">
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => { onChange(c); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors ${value === c ? 'text-[#493657] font-semibold bg-[#493657]/5' : 'text-[#0F1221]/70 font-medium hover:bg-[#FAFAF8] hover:text-[#0F1221]'}`}
            >
              {c}
              {value === c && <Check className="w-4 h-4 flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Custom premium date picker ───────────────────────────────────────────── */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const DatePicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => {
    const base = value ? new Date(`${value}T00:00:00`) : today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstOffset = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const atCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const selected = value ? new Date(`${value}T00:00:00`) : null;

  const pick = (day) => {
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onChange(iso);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls} text-left flex items-center justify-between gap-2 ${value ? '' : 'text-[#0F1221]/30'}`}
      >
        <span>{value ? fmtDate(value) : 'Select visit date'}</span>
        <Calendar className="w-4 h-4 flex-shrink-0 text-[#0F1221]/35" />
      </button>

      {open && (
        <div className="mt-2 w-full bg-white rounded-2xl border border-[#0F1221]/8 shadow-[0_8px_30px_rgba(15,18,33,0.08)] p-4">
          {/* Month header */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#0F1221]">{MONTHS[month]} {year}</p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setView(new Date(year, month - 1, 1))}
                disabled={atCurrentMonth}
                aria-label="Previous month"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${atCurrentMonth ? 'text-[#0F1221]/15 cursor-not-allowed' : 'text-[#0F1221]/55 hover:bg-[#493657]/8 hover:text-[#493657]'}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setView(new Date(year, month + 1, 1))}
                aria-label="Next month"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#0F1221]/55 hover:bg-[#493657]/8 hover:text-[#493657] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday row */}
          <div className="grid grid-cols-7 mb-1">
            {WEEKDAYS.map((w) => (
              <span key={w} className="text-center text-[10px] font-bold uppercase tracking-wide text-[#0F1221]/30 py-1">{w}</span>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstOffset }).map((_, i) => <span key={`b${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = new Date(year, month, day);
              const past = date < today;
              const isSelected = selected && date.getTime() === selected.getTime();
              const isToday = date.getTime() === today.getTime();
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !past && pick(day)}
                  disabled={past}
                  className={`mx-auto w-9 h-9 rounded-full text-[13px] flex items-center justify-center transition-all ${
                    past
                      ? 'text-[#0F1221]/15 cursor-not-allowed'
                      : isSelected
                        ? 'bg-[#493657] text-white font-bold shadow-[0_3px_10px_rgba(73,54,87,0.35)]'
                        : isToday
                          ? 'font-bold text-[#493657] ring-1 ring-[#F0C85A] hover:bg-[#493657]/8'
                          : 'text-[#0F1221]/75 font-medium hover:bg-[#493657]/8 hover:text-[#493657]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <p className="mt-3 pt-3 border-t border-[#0F1221]/6 text-[11px] text-[#0F1221]/35 font-light">
            Visits available all days, 9 AM – 7 PM
          </p>
        </div>
      )}
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────────────────────────── */
const GetQuotePage = () => {
  // Prefill from the homepage hero form (name + phone via router state)
  const prefill = useLocation().state ?? {};
  const hasPrefill = Boolean(prefill.name && String(prefill.phone || '').length === 10);

  const [step, setStep] = useState(hasPrefill ? 2 : 1);   // 1 → 2 → submitted
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: prefill.name ?? '',
    phone: prefill.phone ?? '',
    city: CITIES.includes(prefill.city) ? prefill.city : '',
    houseNo: '',
    street: '',
    areaName: '',
    pincode: '',
    property: '',
    visitDate: '',
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const step1Valid =
    form.name.trim() && form.phone.trim().length === 10 && form.city;

  const step2Valid =
    form.houseNo.trim() &&
    form.street.trim() &&
    form.areaName.trim() &&
    /^\d{6}$/.test(form.pincode.trim()) &&
    form.city &&
    form.property &&
    form.visitDate;

  // Submit — email + Google Sheet ('Site Visits' tab)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!step2Valid || submitting) return;
    setSubmitting(true);
    try {
      await submitSiteVisit({ ...form, visitDate: fmtDate(form.visitDate) });
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const waMessage = () => {
    const msg = [
      'Hi Calyco! I just booked a site visit.',
      `Name: ${form.name}`,
      `Address: ${form.houseNo}, ${form.street}, ${form.areaName}, ${form.city} – ${form.pincode}`,
      `Property: ${form.property}`,
      `Visit date: ${form.visitDate}`,
    ].join('\n');
    return `${WA_LINK}?text=${encodeURIComponent(msg)}`;
  };

  /* ── Confirmation ────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-5 py-16">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(15,18,33,0.08)] border border-[#0F1221]/5 p-8 sm:p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-[#25D366]/12 border-2 border-[#25D366]/25 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#25D366]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#998850] mb-3">{BRAND_NAME}</p>
            <h1 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em] mb-4">
              Thank you for booking!<br />
              <span style={{ color: PURPLE }}>Your dream home awaits.</span>
            </h1>
            <p className="text-[#0F1221]/60 text-sm font-light leading-[1.8] mb-8">
              Our team will contact you shortly to confirm your site visit on{' '}
              <span className="font-semibold text-[#0F1221]">{fmtDate(form.visitDate)}</span>.
            </p>

            <a
              href={waMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-full bg-[#25D366] text-white px-6 py-3.5 text-sm font-bold hover:bg-[#1fb355] shadow-[0_3px_14px_rgba(37,211,102,0.38)] transition-colors mb-4"
            >
              <WaIcon /> Chat with us on WhatsApp
            </a>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/calculators/service-cost-calculator"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/12 text-[#0F1221]/70 px-6 py-3 text-sm font-medium hover:border-[#0F1221]/30 transition-colors"
              >
                See cost calculator
              </Link>
              <Link
                to="/services"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Browse services →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Form ────────────────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen bg-[#FAFAF8] pb-20">
      <SEO
        title="Book a Free Site Visit | Calyco 5-Star Painting Service"
        description="Book a free site inspection and colour consultation in under a minute. Verified painters, fixed written quote. Serving 25+ cities across India."
        url="https://calycopaints.com/get-quote"
      />

      {/* Header — editorial style, matches HomeFinal / Cost Calculator */}
      <section className="bg-white border-b border-[#0F1221]/6">
        <div className="max-w-xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
          <div className="flex items-center gap-2 text-[11px] text-[#0F1221]/30 font-light mb-5">
            <Link to="/" className="hover:text-[#493657] transition-colors">Home</Link>
            <span>/</span>
            <span>Book Site Visit</span>
          </div>
          <Eyebrow text="Free Site Inspection" />
          <h1 className="text-[2rem] sm:text-[2.6rem] font-light text-[#0F1221] tracking-[-0.02em] leading-[1.12] mb-3">
            Book your site visit<br />
            <span style={{ color: PURPLE }}>&amp; colour consultation.</span>
          </h1>
          <p className="text-[#0F1221]/45 text-[14px] font-light leading-relaxed max-w-md">
            A thorough site inspection and colour consultation from our experts — free, no commitment.
          </p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-5 sm:px-8 pt-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2].map((s) => (
            <span
              key={s}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: s === step ? 36 : 20,
                background: s <= step ? PURPLE : 'rgba(15,18,33,0.1)',
              }}
            />
          ))}
          <span className="ml-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#0F1221]/35">
            Step {step} of 2
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgba(15,18,33,0.08)] border border-[#0F1221]/5 p-6 sm:p-8">

            {/* ── Step 1: You ── */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-light text-[#0F1221] tracking-[-0.01em]">Tell us about yourself</h2>
                  <p className="text-sm text-[#0F1221]/45 font-light mt-1">We&apos;ll use this to confirm your visit.</p>
                </div>

                <Field label="Full name">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </Field>

                <Field label="Mobile number">
                  <div className="flex items-center rounded-xl border border-[#e5e0d8] bg-white focus-within:ring-2 focus-within:ring-[#493657] focus-within:border-transparent transition-shadow">
                    <span className="pl-4 pr-3 text-sm text-[#0F1221]/45 font-medium border-r border-[#e5e0d8] py-3.5">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      className="flex-1 bg-transparent px-3 py-3.5 text-sm text-[#0F1221] placeholder-[#0F1221]/30 focus:outline-none"
                    />
                  </div>
                </Field>

                <Field label="City">
                  <CitySelect value={form.city} onChange={(c) => set('city', c)} />
                </Field>

                <button
                  type="button"
                  onClick={() => step1Valid && setStep(2)}
                  disabled={!step1Valid}
                  className={`w-full mt-2 py-4 rounded-full text-sm font-bold tracking-wide transition-all ${step1Valid ? 'bg-[#0F1221] text-white hover:bg-[#493657] shadow-[0_3px_14px_rgba(15,18,33,0.22)]' : 'bg-[#0F1221]/8 text-[#0F1221]/25 cursor-not-allowed'}`}
                >
                  Book Site Inspection →
                </button>
              </div>
            )}

            {/* ── Step 2: Address + visit ── */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="mb-6 flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={submitting}
                    aria-label="Back"
                    className="mt-1 w-8 h-8 rounded-full border border-[#0F1221]/12 flex items-center justify-center text-[#0F1221]/50 hover:border-[#493657] hover:text-[#493657] transition-colors flex-shrink-0"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-light text-[#0F1221] tracking-[-0.01em]">Where should we visit?</h2>
                    <p className="text-sm text-[#0F1221]/45 font-light mt-1">Your address and a preferred visit date.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2fr] gap-4">
                  <Field label="House No">
                    <input
                      type="text"
                      value={form.houseNo}
                      onChange={(e) => set('houseNo', e.target.value)}
                      placeholder="e.g. B-204"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Apartment / Street name">
                    <input
                      type="text"
                      value={form.street}
                      onChange={(e) => set('street', e.target.value)}
                      placeholder="Apartment, society or street"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field label="Area name">
                  <input
                    type="text"
                    value={form.areaName}
                    onChange={(e) => set('areaName', e.target.value)}
                    placeholder="Locality / area"
                    className={inputCls}
                  />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Pincode">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.pincode}
                      onChange={(e) => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="6-digit pincode"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="City">
                    <CitySelect value={form.city} onChange={(c) => set('city', c)} />
                  </Field>
                </div>

                {/* Property type */}
                <div className="rounded-2xl border border-[#e5e0d8] p-4">
                  <p className="text-[13px] font-semibold text-[#0F1221] mb-3">
                    Select your property type <span className="text-red-400">*</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PROPERTY_TYPES.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => set('property', p)}
                        className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 text-left transition-all ${form.property === p ? 'border-[#493657] bg-[#493657]/5 ring-1 ring-[#493657]/20' : 'border-[#e5e0d8] hover:border-[#493657]/40'}`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${form.property === p ? 'border-[#493657] bg-[#493657]' : 'border-[#0F1221]/20'}`}>
                          {form.property === p && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </span>
                        <span className={`text-[13px] ${form.property === p ? 'font-semibold text-[#493657]' : 'font-medium text-[#0F1221]/70'}`}>{p}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Field label={<><Calendar className="w-4 h-4 inline mr-1.5 text-[#0F1221]/40" />Visit date</>}>
                  <DatePicker value={form.visitDate} onChange={(iso) => set('visitDate', iso)} />
                </Field>

                <button
                  type="submit"
                  disabled={!step2Valid || submitting}
                  className={`w-full mt-2 py-4 rounded-full text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2 ${(!step2Valid || submitting) ? 'bg-[#0F1221]/8 text-[#0F1221]/25 cursor-not-allowed' : 'bg-[#0F1221] text-white hover:bg-[#493657] shadow-[0_3px_14px_rgba(15,18,33,0.22)]'}`}
                >
                  {submitting && (
                    <span className="w-4 h-4 rounded-full border-2 border-[#0F1221]/20 border-t-[#0F1221]/60 animate-spin" />
                  )}
                  {submitting ? 'Booking your visit…' : 'Submit'}
                </button>

                <div className="flex items-start gap-2.5 rounded-xl bg-[#F7F6F3] border border-[#0F1221]/6 px-4 py-3">
                  <Shield className="w-4 h-4 text-[#0F1221]/30 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-[#0F1221]/45 font-light leading-[1.6]">
                    Your details go straight to Calyco&apos;s team — no third-party sharing, no spam.
                  </p>
                </div>
              </div>
            )}

          </div>
        </form>

        {/* Trust strip */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          {[
            { icon: <MapPin className="w-4 h-4 mx-auto" style={{ color: PURPLE }} />, label: 'Free site visit', sub: 'No charges, no commitment' },
            { icon: <Check className="w-4 h-4 mx-auto" style={{ color: PURPLE }} />,  label: 'Fixed written quote', sub: 'After site inspection' },
            { icon: <Shield className="w-4 h-4 mx-auto" style={{ color: PURPLE }} />, label: 'Verified painters', sub: 'Screened & background-checked' },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl bg-white border border-[#0F1221]/6 px-3 py-3.5 text-center">
              <span className="block mb-1.5">{b.icon}</span>
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
