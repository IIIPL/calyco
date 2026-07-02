import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Check, ClipboardList, MessageCircle, MapPin, ChevronRight, X, Plus, Minus } from 'lucide-react';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME, POSITIONING_TAGLINE } from '../data/positioning';
import CustomSelect from './CustomSelect';
import {
  bhkHelpers,
  calculateServiceEstimate,
  cityMultipliers,
  serviceCategories,
  servicePricing,
  servicesByCategory,
} from '../data/servicePricing';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (v) => `₹${Math.round(v).toLocaleString('en-IN')}`;
const fmtRate = (v) => `₹${v.toFixed(1)}`;

const WORK_TYPES = [
  { id: 'Repainting',      label: 'Repainting',       sub: 'Over existing paint', mult: 1.0 },
  { id: 'Fresh Painting',  label: 'Fresh Painting',    sub: 'New surface, first coat', mult: 1.05 },
  { id: 'Rental Painting', label: 'Rental Painting',   sub: 'Quick refresh, economy', mult: 0.75 },
];

const NOT_INCLUDED_DEFAULT = [
  'Final paintable area (confirmed by laser on site)',
  'Structural repair or major crack treatment',
  'Colour selection beyond standard consultation',
  'Furniture removal if required beyond standard masking',
  'Work outside confirmed scope',
];

const NOT_INCLUDED_WATERPROOFING = [
  'Civil repair or tile work (quoted separately)',
  'Interior repainting after waterproofing (quoted separately)',
  'Plumbing-related repairs',
  'Work beyond confirmed affected area',
];

const getNotIncluded = (category) =>
  category === 'Waterproofing' ? NOT_INCLUDED_WATERPROOFING : NOT_INCLUDED_DEFAULT;

const getRecommendedPackage = (tier, conditionMult, workType) => {
  if (workType === 'Rental Painting') return { name: 'Economy', color: 'bg-gray-100 text-gray-700', reason: 'Best for quick rental-ready refreshes with economy materials.' };
  if (conditionMult >= 1.35) return { name: 'Luxury', color: 'bg-[#493657]/10 text-[#493657]', reason: 'Heavy surface condition needs thorough prep and premium materials for a lasting result.' };
  if (conditionMult >= 1.15 || tier.toLowerCase().includes('premium') || tier.toLowerCase().includes('luxury')) return { name: 'Premium', color: 'bg-[#F0C85A]/20 text-[#7a6020]', reason: 'Balanced quality and durability — the most popular choice for family homes.' };
  return { name: 'Economy', color: 'bg-gray-100 text-gray-700', reason: 'Good for budget-conscious projects with surfaces in good condition.' };
};

const getQuantityLabel = (service) => {
  if (!service) return 'Area / Quantity';
  if (service.category === 'Consultation') return 'Quantity';
  if (service.slug === 'crack-filling') return 'Running feet';
  if (service.category === 'Cleaning & Protection') return 'Carpet area (sq ft)';
  if (service.category === 'Grouting & Tile Repair' && service.unit.includes('running')) return 'Running feet / points';
  if (service.category === 'Painting') return 'Paintable wall area (sq ft)';
  if (service.category === 'Waterproofing') return 'Affected area (sq ft)';
  if (service.category === 'Wall Design') return 'Feature wall area (sq ft)';
  if (service.category === 'Wallpaper') return 'Wall area (sq ft)';
  if (service.category === 'Wood Finishing') return 'Wood surface (sq ft)';
  if (service.category === 'Metal Painting') return 'Metal surface (sq ft)';
  return `Area (${service.unit})`;
};

// ─── Toggle switch ────────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange, label, sub }) => (
  <label className="flex items-center justify-between gap-3 cursor-pointer rounded-xl border border-[#0F1221]/8 bg-[#FAFAF8] px-4 py-3 hover:bg-white transition-colors">
    <div>
      <p className="text-sm font-semibold text-[#0F1221]">{label}</p>
      {sub && <p className="text-xs text-[#0F1221]/70 font-light mt-0.5">{sub}</p>}
    </div>
    <div
      className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-[#25D366]' : 'bg-[#0F1221]/15'}`}
      style={{ height: '22px', width: '40px' }}
    >
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </div>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
  </label>
);

// ─── Counter input ────────────────────────────────────────────────────────────
const Counter = ({ value, onChange, label, sub, min = 0, max = 20 }) => (
  <div className="rounded-xl border border-[#0F1221]/8 bg-[#FAFAF8] px-4 py-3">
    <p className="text-sm font-semibold text-[#0F1221]">{label}</p>
    {sub && <p className="text-xs text-[#0F1221]/70 font-light mt-0.5 mb-2">{sub}</p>}
    <div className="flex items-center gap-3 mt-1">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-7 h-7 rounded-lg border border-[#0F1221]/12 flex items-center justify-center hover:bg-white transition-colors">
        <Minus className="w-3.5 h-3.5 text-[#0F1221]/60" />
      </button>
      <span className="text-base font-bold text-[#0F1221] w-6 text-center">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-7 h-7 rounded-lg border border-[#0F1221]/12 flex items-center justify-center hover:bg-white transition-colors">
        <Plus className="w-3.5 h-3.5 text-[#0F1221]/60" />
      </button>
    </div>
  </div>
);

// ─── Step label ───────────────────────────────────────────────────────────────
const StepLabel = ({ n, label }) => (
  <div className="flex items-center gap-2 mb-2">
    <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{n}</span>
    <span className="text-sm font-semibold text-[#0F1221]/80">{label}</span>
  </div>
);

const inputCls = 'w-full px-4 py-3 border border-[#0F1221]/12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] text-[#0F1221] text-sm bg-white';

// ─── WhatsApp SVG ─────────────────────────────────────────────────────────────
const WaIcon = ({ cls = 'w-5 h-5' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ─── Main Calculator ──────────────────────────────────────────────────────────
const UniversalServiceCalculator = () => {
  const location = useLocation();
  const requestedSlug = new URLSearchParams(location.search).get('service');
  const requestedService = servicePricing.find((s) => s.slug === requestedSlug) || servicesByCategory.Painting[0];

  // Core selectors
  const [city, setCity] = useState('Delhi');
  const [category, setCategory] = useState(requestedService.category);
  const [serviceSlug, setServiceSlug] = useState(requestedService.slug);
  const [tier, setTier] = useState(Object.keys(requestedService.tiers)[0]);
  const [workType, setWorkType] = useState('Repainting');
  const [quantity, setQuantity] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');

  // Surface factors
  const [propertyMultiplier, setPropertyMultiplier] = useState(1);
  const [conditionMultiplier, setConditionMultiplier] = useState(1);
  const [complexityMultiplier, setComplexityMultiplier] = useState(1);

  // Add-ons (painting-specific)
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [doorsCount, setDoorsCount] = useState(0);
  const [windowsCount, setWindowsCount] = useState(0);
  const [puttyRequired, setPuttyRequired] = useState(false);
  const [waterproofingRequired, setWaterproofingRequired] = useState(false);

  // Lead capture
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  const services = servicesByCategory[category] || [];
  const selectedService = services.find((s) => s.slug === serviceSlug) || services[0];
  const tiers = Object.keys(selectedService?.tiers || {});
  const quantityValue = Number(quantity) || 0;
  const isPainting = selectedService?.category === 'Painting';
  const isConsultation = selectedService?.category === 'Consultation';
  const isFreeService = selectedService?.baseMin === 0 && selectedService?.baseMax === 0;
  const canEstimate = isConsultation || quantityValue > 0;

  // Work type multiplier (painting only)
  const workTypeMult = isPainting
    ? (WORK_TYPES.find((w) => w.id === workType)?.mult ?? 1.0)
    : 1.0;

  // Add-on areas
  const ceilingArea = isPainting && includeCeiling ? Math.round(quantityValue * 0.25) : 0;
  const doorArea    = isPainting ? doorsCount * 15 : 0;   // ~15 sq ft per door
  const windowArea  = isPainting ? windowsCount * 8 : 0;  // ~8 sq ft per window
  const totalArea   = quantityValue + ceilingArea + doorArea + windowArea;

  const cityMult = cityMultipliers[city] || 1.0;

  // Core estimate on totalArea
  const estimate = useMemo(() => {
    if (!selectedService) return null;
    const qty = isConsultation ? 1 : (isPainting ? totalArea : quantityValue);
    return calculateServiceEstimate({
      service: selectedService,
      city,
      quantity: qty,
      tier,
      propertyMultiplier: propertyMultiplier * workTypeMult,
      conditionMultiplier,
      complexityMultiplier,
    });
  }, [city, complexityMultiplier, conditionMultiplier, propertyMultiplier, workTypeMult, isConsultation, isPainting, totalArea, quantityValue, selectedService, tier]);

  // Add-on costs
  const puttyMin = puttyRequired && totalArea > 0 ? Math.round(totalArea * 12 * cityMult) : 0;
  const puttyMax = puttyRequired && totalArea > 0 ? Math.round(totalArea * 18 * cityMult) : 0;
  const waterMin = waterproofingRequired ? Math.round(150 * 60 * cityMult) : 0; // ~150 sqft bathroom
  const waterMax = waterproofingRequired ? Math.round(150 * 95 * cityMult) : 0;
  const addOnMin  = puttyMin + waterMin;
  const addOnMax  = puttyMax + waterMax;

  const grandMin = estimate ? estimate.totalMin + addOnMin : 0;
  const grandMax = estimate ? estimate.totalMax + addOnMax : 0;

  // Handlers
  const handleCategoryChange = (nextCategory) => {
    const nextService = servicesByCategory[nextCategory][0];
    setCategory(nextCategory);
    setServiceSlug(nextService.slug);
    setTier(Object.keys(nextService.tiers)[0]);
    setQuantity('');
    setSelectedBhk('');
  };

  const handleServiceChange = (nextSlug) => {
    const nextService = services.find((s) => s.slug === nextSlug);
    setServiceSlug(nextSlug);
    setTier(Object.keys(nextService.tiers)[0]);
    setQuantity('');
    setSelectedBhk('');
  };

  const handleBhkSelect = (helper) => {
    setSelectedBhk(helper.label);
    setQuantity(Math.round((helper.paintableMin + helper.paintableMax) / 2).toString());
  };

  const buildWhatsAppMessage = (name, phone) => {
    const lines = [
      `Hi Calyco — I calculated my estimate using the Calyco calculator and want a free site visit.`,
      '',
      `📋 MY ESTIMATE`,
      `Service: ${selectedService?.name}`,
      `City: ${city} (${cityMult.toFixed(2)}× rate)`,
      isPainting ? `Work type: ${workType}` : null,
      `Area: ${isPainting ? totalArea : quantityValue} ${selectedService?.unit}`,
      isPainting && ceilingArea > 0 ? `  → Ceiling: ${ceilingArea} sq ft included` : null,
      isPainting && doorsCount > 0 ? `  → Doors: ${doorsCount} (~${doorArea} sq ft)` : null,
      isPainting && windowsCount > 0 ? `  → Windows: ${windowsCount} (~${windowArea} sq ft)` : null,
      `Tier: ${tier}`,
      '',
      `💰 ESTIMATED RANGE (incl. 18% GST)`,
      estimate ? `${fmt(grandMin)} – ${fmt(grandMax)}` : 'Area to be confirmed on site',
      estimate ? `Base subtotal: ${fmt(estimate.subtotalMin)} – ${fmt(estimate.subtotalMax)}` : null,
      estimate ? `GST 18%: ${fmt(estimate.gstMin)} – ${fmt(estimate.gstMax)}` : null,
      puttyRequired && puttyMin > 0 ? `Putty add-on: ${fmt(puttyMin)} – ${fmt(puttyMax)}` : null,
      waterproofingRequired && waterMin > 0 ? `Waterproofing add-on: ${fmt(waterMin)} – ${fmt(waterMax)}` : null,
      '',
      name ? `Name: ${name}` : null,
      phone ? `Phone: ${phone}` : null,
      '',
      `Please arrange a free site visit and send me a fixed written quote.`,
      `— ${BRAND_NAME}`,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const sendToWhatsApp = (name = '', phone = '') => {
    window.open(
      `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(buildWhatsAppMessage(name, phone))}`,
      '_blank', 'noopener,noreferrer'
    );
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadPhone.trim().length < 10) return;
    sendToWhatsApp(leadName, leadPhone);
    setLeadSent(true);
  };

  const rec = getRecommendedPackage(tier, conditionMultiplier, workType);
  const notIncluded = getNotIncluded(selectedService?.category);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#0F1221]/8 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#1A0B21] via-[#432553] to-[#5B2F7A] px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#F0C85A]/70 font-bold mb-1">{BRAND_NAME}</p>
            <h2 className="text-xl font-bold text-white">Service Cost Calculator</h2>
            <p className="text-sm text-white/50 mt-1">Transparent estimate before you speak to anyone.</p>
          </div>
          <div className="flex-shrink-0 rounded-lg border border-[#F0C85A]/30 bg-[#F0C85A]/10 px-3 py-2 text-xs text-[#F0C85A] font-bold whitespace-nowrap">
            GST shown separately
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-6">

        {/* ── A: City + Category ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <StepLabel n="1" label="City" />
            <CustomSelect
              value={city}
              onChange={setCity}
              options={Object.entries(cityMultipliers).map(([name, mult]) => ({ value: name, label: name, sub: `${mult.toFixed(2)}× city rate` }))}
              label="Select city"
              variant="light"
            />
          </div>
          <div>
            <StepLabel n="2" label="Service category" />
            <CustomSelect
              value={category}
              onChange={handleCategoryChange}
              options={serviceCategories}
              label="Service category"
              variant="light"
            />
          </div>
        </div>

        {/* ── B: Service + Tier ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <StepLabel n="3" label="Service" />
            <CustomSelect
              value={serviceSlug}
              onChange={handleServiceChange}
              options={services.map((s) => ({ value: s.slug, label: s.name }))}
              label="Select service"
              variant="light"
            />
          </div>
          <div>
            <StepLabel n="4" label="Paint tier / finish" />
            <CustomSelect
              value={tier}
              onChange={setTier}
              options={tiers}
              label="Select tier"
              variant="light"
            />
          </div>
        </div>

        {/* ── C: Work type (painting only) ─────────────────────────────────── */}
        {isPainting && (
          <div>
            <StepLabel n="5" label="Fresh painting / repainting / rental?" />
            <div className="grid grid-cols-3 gap-2">
              {WORK_TYPES.map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWorkType(w.id)}
                  className={`rounded-xl border px-3 py-3 text-left transition-all ${
                    workType === w.id
                      ? 'border-[#493657] bg-[#493657]/5 ring-1 ring-[#493657]/20'
                      : 'border-[#0F1221]/10 bg-[#FAFAF8] hover:border-[#0F1221]/20'
                  }`}
                >
                  <span className="block text-sm font-semibold text-[#0F1221]">{w.label}</span>
                  <span className="block text-[11px] text-[#0F1221]/45 font-light mt-0.5">{w.sub}</span>
                  {w.mult !== 1.0 && (
                    <span className={`block text-[10px] font-bold mt-1 ${w.mult < 1 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {w.mult < 1 ? `${Math.round((1 - w.mult) * 100)}% lower rate` : `+${Math.round((w.mult - 1) * 100)}% rate`}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── D: Area / Quantity ────────────────────────────────────────────── */}
        <div>
          <StepLabel n={isPainting ? '6' : '5'} label={getQuantityLabel(selectedService)} />
          <input
            type="number"
            min="0"
            value={isConsultation ? 1 : quantity}
            disabled={isConsultation}
            onChange={(e) => setQuantity(e.target.value)}
            className={inputCls + ' disabled:bg-gray-50'}
            placeholder="Enter area or quantity"
          />
          {isPainting && quantityValue > 0 && (
            <p className="text-xs text-[#0F1221]/70 mt-1.5 font-light">
              Paintable wall area (ceiling, doors and windows can be added below)
            </p>
          )}
        </div>

        {/* BHK helper */}
        {isPainting && (
          <div className="rounded-xl border border-[#e5e0d8] bg-[#FBF9F6] p-4">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-[#998850]" />
              <p className="font-semibold text-sm text-[#0F1221]">BHK helper — do not know paintable area?</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {bhkHelpers.map((helper) => (
                <button
                  key={helper.label}
                  type="button"
                  onClick={() => handleBhkSelect(helper)}
                  className={`text-left rounded-xl border p-3 transition-all ${
                    selectedBhk === helper.label
                      ? 'border-[#493657] bg-white shadow-sm ring-1 ring-[#493657]/20'
                      : 'border-[#e5e0d8] bg-white/60 hover:bg-white hover:border-[#0F1221]/20'
                  }`}
                >
                  <span className="block font-bold text-[#0F1221] text-sm">{helper.label}</span>
                  <span className="block text-[11px] text-[#0F1221]/45 mt-0.5">{helper.carpet}</span>
                  <span className="block text-[11px] text-[#493657] mt-1 font-semibold">
                    ~{helper.paintableMin.toLocaleString('en-IN')}–{helper.paintableMax.toLocaleString('en-IN')} sq ft
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#0F1221]/70 mt-3 font-light">
              Auto-fills paintable area with mid-range estimate. Final area confirmed by laser on site.
            </p>
          </div>
        )}

        {/* ── E: Add-ons (painting only) ────────────────────────────────────── */}
        {isPainting && (
          <div>
            <p className="text-xs font-bold text-[#0F1221]/70 uppercase tracking-wider mb-3">What else should be included?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              <Toggle
                checked={includeCeiling}
                onChange={setIncludeCeiling}
                label="Ceiling included?"
                sub={includeCeiling && quantityValue > 0 ? `+${ceilingArea} sq ft added to area` : 'Adds ~25% of wall area'}
              />
              <Toggle
                checked={puttyRequired}
                onChange={setPuttyRequired}
                label="Putty required?"
                sub="Adds ₹12–18/sq ft for smooth base"
              />
              <Toggle
                checked={waterproofingRequired}
                onChange={setWaterproofingRequired}
                label="Waterproofing required?"
                sub="Separate waterproofing quote added"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Counter value={doorsCount} onChange={setDoorsCount} label="Doors to paint" sub="~15 sq ft per door" />
              <Counter value={windowsCount} onChange={setWindowsCount} label="Windows to paint" sub="~8 sq ft per window" />
            </div>
          </div>
        )}

        {/* ── F: Surface factors ────────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-bold text-[#0F1221]/70 uppercase tracking-wider mb-3">Surface & access factors</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <span className="block text-xs font-semibold text-[#0F1221]/60 mb-1.5">Property type</span>
              <CustomSelect
                value={String(propertyMultiplier)}
                onChange={(v) => setPropertyMultiplier(Number(v))}
                options={[
                  { value: '1',    label: 'Apartment',        sub: 'Standard rate' },
                  { value: '1.1',  label: 'Villa / large home', sub: '+10%' },
                  { value: '1.15', label: 'Commercial',        sub: '+15%' },
                ]}
                label="Property type" variant="light"
              />
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#0F1221]/60 mb-1.5">Surface condition</span>
              <CustomSelect
                value={String(conditionMultiplier)}
                onChange={(v) => setConditionMultiplier(Number(v))}
                options={[
                  { value: '1',    label: 'Good condition',   sub: 'Standard rate' },
                  { value: '1.15', label: 'Minor repair',     sub: '+15%' },
                  { value: '1.35', label: 'Heavy repair',     sub: '+35%' },
                ]}
                label="Surface condition" variant="light"
              />
            </div>
            <div>
              <span className="block text-xs font-semibold text-[#0F1221]/60 mb-1.5">Work complexity</span>
              <CustomSelect
                value={String(complexityMultiplier)}
                onChange={(v) => setComplexityMultiplier(Number(v))}
                options={[
                  { value: '1',    label: 'Standard access',   sub: 'Standard rate' },
                  { value: '1.15', label: 'Detailed / intricate', sub: '+15%' },
                  { value: '1.3',  label: 'High access / complex', sub: '+30%' },
                ]}
                label="Work complexity" variant="light"
              />
            </div>
          </div>
        </div>

        {/* ── G: Estimate output ────────────────────────────────────────────── */}
        {!canEstimate && !isConsultation && (
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <Calculator className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Enter an area or select a BHK size above to see the full cost estimate.</span>
          </div>
        )}

        {(isFreeService || (estimate && canEstimate)) && (
          <div className="rounded-2xl border border-[#493657]/15 overflow-hidden">

            {/* Total range */}
            <div className="bg-gradient-to-r from-[#1A0B21] via-[#432553] to-[#5B2F7A] p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
                {isFreeService ? 'This service is free' : 'Your estimated cost range (incl. GST)'}
              </p>
              {isFreeService ? (
                <p className="text-3xl font-bold text-white">Free</p>
              ) : (
                <>
                  <p className="text-4xl lg:text-5xl font-light text-white tracking-[-0.02em]">
                    {fmt(grandMin)}
                  </p>
                  <p className="text-xl text-[#F0C85A] font-semibold mt-0.5">– {fmt(grandMax)}</p>
                  <p className="text-xs text-white/40 mt-2">
                    For {isPainting ? totalArea.toLocaleString('en-IN') : quantityValue.toLocaleString('en-IN')} {selectedService?.unit} in {city} · Final quote after free site inspection
                  </p>
                </>
              )}
            </div>

            <div className="bg-white divide-y divide-[#0F1221]/6">

              {/* Rate breakdown */}
              {estimate && !isFreeService && (
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#0F1221] mb-4">Rate breakdown</h3>
                  <div className="space-y-2.5 text-sm">
                    {[
                      ['Base rate', `${fmt(selectedService.baseMin)} – ${fmt(selectedService.baseMax)} /${selectedService.unit}`],
                      ['City factor', `${cityMult.toFixed(2)}× (${city})`],
                      isPainting && workTypeMult !== 1 ? ['Work type adjustment', `${workType} → ×${workTypeMult.toFixed(2)}`] : null,
                      ['Adjusted rate', `${fmt(estimate.adjustedRateMin)} – ${fmt(estimate.adjustedRateMax)} /${selectedService.unit}`],
                      isPainting && totalArea !== quantityValue ? ['Total area (with add-ons)', `${totalArea.toLocaleString('en-IN')} sq ft`] : null,
                      ['Material + labour subtotal', `${fmt(estimate.subtotalMin)} – ${fmt(estimate.subtotalMax)}`],
                      puttyRequired && puttyMin > 0 ? ['Putty add-on', `${fmt(puttyMin)} – ${fmt(puttyMax)}`] : null,
                      waterproofingRequired && waterMin > 0 ? ['Waterproofing add-on', `${fmt(waterMin)} – ${fmt(waterMax)}`] : null,
                    ].filter(Boolean).map(([label, value]) => (
                      <div key={label} className="flex justify-between items-start gap-4 text-[#0F1221]/65">
                        <span className="font-light">{label}</span>
                        <span className="font-semibold text-[#0F1221] text-right flex-shrink-0">{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2.5 mt-1 border-t border-dashed border-[#0F1221]/10">
                      <span className="text-sm font-semibold text-[#0F1221]">GST 18%</span>
                      <span className="text-sm font-bold text-[#493657]">{fmt(estimate.gstMin)} – {fmt(estimate.gstMax)}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5 border-t border-[#0F1221]/10">
                      <span className="text-base font-bold text-[#0F1221]">Total estimate</span>
                      <span className="text-base font-bold text-[#493657]">{fmt(grandMin)} – {fmt(grandMax)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Included + Not included */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#0F1221]/6">
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#0F1221] mb-3">What is included</h3>
                  <ul className="space-y-1.5">
                    {(selectedService?.includes || []).slice(0, 5).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#0F1221]/65">
                        <Check className="w-3.5 h-3.5 text-[#25D366] flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-[#0F1221] mb-3">What is not included</h3>
                  <ul className="space-y-1.5">
                    {notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#0F1221]/70">
                        <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended package */}
              <div className="p-5 flex items-start gap-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#0F1221]/70 uppercase tracking-wider mb-1">Recommended package for your project</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${rec.color}`}>{rec.name}</span>
                    <span className="text-sm font-semibold text-[#0F1221]">package</span>
                  </div>
                  <p className="text-xs text-[#0F1221]/70 font-light leading-[1.6]">{rec.reason}</p>
                </div>
                <Link
                  to="/get-quote"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#0F1221] text-white px-4 py-2 text-xs font-bold hover:bg-[#493657] transition-colors whitespace-nowrap"
                >
                  Book Site Visit →
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* ── H: Lead capture (shown only when estimate is visible) ─────────── */}
        {canEstimate && !isFreeService && estimate && (
          <div className="rounded-2xl border border-[#25D366]/25 bg-[#F0FFF6] p-5">
            {leadSent ? (
              <div className="text-center py-2">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-3">
                  <WaIcon cls="w-6 h-6 text-[#25D366]" />
                </div>
                <p className="font-bold text-[#0F1221] text-sm mb-1">Estimate sent to Calyco!</p>
                <p className="text-xs text-[#0F1221]/70 font-light">Our team will contact you within 2 hours to arrange a free site visit.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3 mb-4">
                  <WaIcon cls="w-5 h-5 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#0F1221] text-sm">Send this estimate to Calyco</p>
                    <p className="text-xs text-[#0F1221]/70 font-light mt-0.5">Enter your name and number — your full breakdown is sent on WhatsApp. Team responds within 2 hours.</p>
                  </div>
                </div>
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Your name"
                      className={inputCls}
                      aria-label="Your name"
                    />
                    <input
                      type="tel"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Mobile number"
                      maxLength={10}
                      required
                      className={inputCls}
                      aria-label="Mobile number"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-bold hover:bg-[#1fb355] transition-colors shadow-[0_3px_14px_rgba(37,211,102,0.38)]"
                  >
                    <WaIcon cls="w-4 h-4" />
                    Send Estimate on WhatsApp
                  </button>
                  <p className="text-center text-[11px] text-[#0F1221]/70">No spam · Your estimate breakdown + contact details sent to Calyco</p>
                </form>
              </>
            )}
          </div>
        )}

        {/* ── I: Quick CTA (always visible) ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/get-quote"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0F1221] text-white text-sm font-bold hover:bg-[#493657] transition-colors"
          >
            Book Free Site Visit →
          </Link>
          <button
            type="button"
            onClick={() => sendToWhatsApp()}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-[#25D366]/30 bg-[#F0FFF6] text-[#1a8c48] text-sm font-bold hover:bg-[#25D366]/10 transition-colors"
          >
            <WaIcon cls="w-4 h-4 text-[#25D366]" />
            WhatsApp Estimate
          </button>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl bg-[#FBF9F6] border border-[#0F1221]/6 px-4 py-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#998850] mb-0.5">{BRAND_NAME}</p>
          <p className="text-xs text-[#0F1221]/70 font-light">This is a transparent rate-logic estimate. Final price is confirmed after free site inspection and laser measurement.</p>
        </div>

      </div>
    </div>
  );
};

export default UniversalServiceCalculator;
