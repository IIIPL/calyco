import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calculator, Check, ClipboardList, MessageCircle, MapPin, Layers, Sliders, Ruler, ChevronRight } from 'lucide-react';
import contactData from '../data/admin/contact.json';
import {
  bhkHelpers,
  calculateServiceEstimate,
  cityMultipliers,
  serviceCategories,
  servicePricing,
  servicesByCategory,
} from '../data/servicePricing';

const fmt = (v) => `₹${Math.round(v).toLocaleString('en-IN')}`;

const getQuantityLabel = (service) => {
  if (!service) return 'Area / Quantity';
  if (service.category === 'Consultation') return 'Quantity';
  if (service.slug === 'crack-filling') return 'Running feet';
  if (service.category === 'Cleaning & Protection') return 'Carpet area (sq ft)';
  if (service.category === 'Grouting & Tile Repair' && service.unit.includes('running')) return 'Running feet / points';
  if (service.category === 'Painting') return 'Paintable area (sq ft)';
  if (service.category === 'Waterproofing') return 'Affected area (sq ft)';
  if (service.category === 'Wall Design') return 'Feature wall area (sq ft)';
  if (service.category === 'Wallpaper') return 'Wall area (sq ft)';
  if (service.category === 'Wood Finishing') return 'Wood surface (sq ft)';
  if (service.category === 'Metal Painting') return 'Metal surface (sq ft)';
  return `Area (${service.unit})`;
};

const steps = [
  { number: 1, label: 'City', icon: MapPin },
  { number: 2, label: 'Category', icon: Layers },
  { number: 3, label: 'Service & Tier', icon: Sliders },
  { number: 4, label: 'Area / Qty', icon: Ruler },
];

const UniversalServiceCalculator = () => {
  const location = useLocation();
  const requestedSlug = new URLSearchParams(location.search).get('service');
  const requestedService = servicePricing.find((s) => s.slug === requestedSlug) || servicesByCategory.Painting[0];

  const [city, setCity] = useState('Delhi');
  const [category, setCategory] = useState(requestedService.category);
  const [serviceSlug, setServiceSlug] = useState(requestedService.slug);
  const [tier, setTier] = useState(Object.keys(requestedService.tiers)[0]);
  const [quantity, setQuantity] = useState('');
  const [selectedBhk, setSelectedBhk] = useState('');
  const [propertyMultiplier, setPropertyMultiplier] = useState(1);
  const [conditionMultiplier, setConditionMultiplier] = useState(1);
  const [complexityMultiplier, setComplexityMultiplier] = useState(1);

  const services = servicesByCategory[category] || [];
  const selectedService = services.find((s) => s.slug === serviceSlug) || services[0];
  const tiers = Object.keys(selectedService?.tiers || {});
  const quantityValue = Number(quantity) || 0;

  const estimate = useMemo(() => {
    if (!selectedService) return null;
    return calculateServiceEstimate({
      service: selectedService,
      city,
      quantity: selectedService.category === 'Consultation' ? 1 : quantityValue,
      tier,
      propertyMultiplier,
      conditionMultiplier,
      complexityMultiplier,
    });
  }, [city, complexityMultiplier, conditionMultiplier, propertyMultiplier, quantityValue, selectedService, tier]);

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

  const openWhatsApp = () => {
    const msg = `Hi Calyco, I want a free site visit for ${selectedService.name} in ${city}. ${selectedService.category === 'Consultation' ? '' : `Estimated area: ${quantityValue || 0} ${selectedService.unit}.`}`;
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const isConsultation = selectedService?.category === 'Consultation';
  const canEstimate = isConsultation || quantityValue > 0;
  const isFreeService = selectedService?.baseMin === 0 && selectedService?.baseMax === 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A0B21] via-[#432553] to-[#5B2F7A] px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#F0C85A] font-semibold mb-1">Universal Service Calculator</p>
            <h2 className="text-xl font-bold text-white">Calculate any Calyco service</h2>
            <p className="text-sm text-white/60 mt-1">One transparent calculator -- 60+ services, all cities</p>
          </div>
          <div className="flex-shrink-0 rounded-lg border border-[#F0C85A]/30 bg-[#F0C85A]/10 px-4 py-2 text-sm text-[#F0C85A] font-semibold">
            GST 18% shown separately
          </div>
        </div>

        {/* Step indicators */}
        <div className="mt-5 flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="flex items-center gap-1 flex-shrink-0">
                <div className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#F0C85A] text-[#0F1221] text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {step.number}
                  </div>
                  <Icon className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-xs text-white/80 font-medium">{step.label}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 space-y-6">

        {/* Step 1 + 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center">1</span>
                <span className="text-sm font-semibold text-gray-700">Select City</span>
              </div>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] text-gray-900 bg-white text-sm"
              >
                {Object.entries(cityMultipliers).map(([name, mult]) => (
                  <option key={name} value={name}>{name} ({mult.toFixed(2)}x rate)</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center">2</span>
                <span className="text-sm font-semibold text-gray-700">Service Category</span>
              </div>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] text-gray-900 bg-white text-sm"
              >
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Step 3: Service + Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                <span className="text-sm font-semibold text-gray-700">Service</span>
              </div>
              <select
                value={serviceSlug}
                onChange={(e) => handleServiceChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] text-gray-900 bg-white text-sm"
              >
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">3b</span>
                <span className="text-sm font-semibold text-gray-700">Tier / Finish</span>
              </div>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] text-gray-900 bg-white text-sm"
              >
                {tiers.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* Step 4: Area / Quantity */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-5 rounded-full bg-[#493657] text-white text-[10px] font-bold flex items-center justify-center">4</span>
            <span className="text-sm font-semibold text-gray-700">{getQuantityLabel(selectedService)}</span>
          </div>
          <input
            type="number"
            min="0"
            value={isConsultation ? 1 : quantity}
            disabled={isConsultation}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#493657] disabled:bg-gray-50 text-gray-900 text-sm"
            placeholder="Enter area or quantity"
          />
        </div>

        {/* BHK helper (painting only) */}
        {selectedService?.category === 'Painting' && (
          <div className="rounded-xl border border-[#e5e0d8] bg-[#FBF9F6] p-4">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-[#998850]" />
              <p className="font-semibold text-sm text-gray-900">BHK helper -- don't know paintable area?</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {bhkHelpers.map((helper) => (
                <button
                  key={helper.label}
                  type="button"
                  onClick={() => handleBhkSelect(helper)}
                  className={`text-left rounded-xl border p-3 transition ${
                    selectedBhk === helper.label
                      ? 'border-[#493657] bg-white shadow-sm ring-1 ring-[#493657]/20'
                      : 'border-[#e5e0d8] bg-white/60 hover:bg-white'
                  }`}
                >
                  <span className="block font-bold text-gray-900 text-sm">{helper.label}</span>
                  <span className="block text-[11px] text-gray-500 mt-0.5">{helper.carpet}</span>
                  <span className="block text-[11px] text-[#493657] mt-1 font-semibold">
                    ~{helper.paintableMin.toLocaleString('en-IN')}-{helper.paintableMax.toLocaleString('en-IN')} sq ft
                  </span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-3">
              This is an estimate. Final paintable area will be confirmed by free laser measurement.
            </p>
          </div>
        )}

        {/* Adjustments */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Adjust for your project</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1.5">Property type</span>
              <select
                value={propertyMultiplier}
                onChange={(e) => setPropertyMultiplier(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm"
              >
                <option value={1}>Apartment / standard</option>
                <option value={1.1}>Villa / large home</option>
                <option value={1.15}>Commercial</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1.5">Surface condition</span>
              <select
                value={conditionMultiplier}
                onChange={(e) => setConditionMultiplier(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm"
              >
                <option value={1}>Good condition</option>
                <option value={1.15}>Minor repair needed</option>
                <option value={1.35}>Heavy repair needed</option>
              </select>
            </label>
            <label className="block">
              <span className="block text-xs font-semibold text-gray-600 mb-1.5">Work complexity</span>
              <select
                value={complexityMultiplier}
                onChange={(e) => setComplexityMultiplier(Number(e.target.value))}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white text-sm"
              >
                <option value={1}>Standard access</option>
                <option value={1.15}>Detailed / intricate</option>
                <option value={1.3}>High access / complex</option>
              </select>
            </label>
          </div>
        </div>

        {/* Estimate result */}
        {isFreeService ? (
          <div className="rounded-2xl bg-gradient-to-r from-[#1A0B21] via-[#432553] to-[#6d5b2e] p-6 text-white">
            <p className="text-sm text-white/70 mb-1">Estimated Cost</p>
            <p className="text-3xl font-bold">Free</p>
            <p className="text-sm text-white/70 mt-1">{selectedService?.description}</p>
          </div>
        ) : estimate && canEstimate ? (
          <div className="rounded-2xl border border-[#493657]/15 overflow-hidden">
            {/* Main estimate */}
            <div className="bg-gradient-to-r from-[#1A0B21] via-[#432553] to-[#6d5b2e] p-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60 mb-1">Estimated Cost Range</p>
                  <p className="text-3xl lg:text-4xl font-bold text-white">
                    {fmt(estimate.totalMin)}
                  </p>
                  <p className="text-lg text-[#F0C85A] font-semibold">- {fmt(estimate.totalMax)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/50">including 18% GST</p>
                  <p className="text-xs text-white/50 mt-0.5">Final quote after free site inspection</p>
                </div>
              </div>
            </div>

            {/* Rate breakdown + includes */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white">
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Rate breakdown</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Base rate', `${fmt(selectedService.baseMin)} - ${fmt(selectedService.baseMax)} / ${selectedService.unit}`],
                    ['City factor', `${cityMultipliers[city].toFixed(2)}x (${city})`],
                    ['Adjusted rate', `${fmt(estimate.adjustedRateMin)} - ${fmt(estimate.adjustedRateMax)}`],
                    ['Subtotal', `${fmt(estimate.subtotalMin)} - ${fmt(estimate.subtotalMax)}`],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-gray-600">
                      <span>{label}</span>
                      <span className="font-medium text-gray-900 text-right">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-[#493657] font-semibold border-t border-dashed border-gray-200 pt-2 mt-2">
                    <span>GST 18%</span>
                    <span>{fmt(estimate.gstMin)} - {fmt(estimate.gstMax)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">What is included</h3>
                <ul className="space-y-1.5">
                  {(selectedService.includes || []).slice(0, 5).map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#998850] mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : !isConsultation && !canEstimate ? (
          <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <Calculator className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Enter an area or quantity above to see the full estimate with GST breakdown.</span>
          </div>
        ) : null}

        {/* WhatsApp CTA */}
        <button
          type="button"
          onClick={openWhatsApp}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#493657] text-white text-base font-bold rounded-xl hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors shadow-sm"
        >
          <MessageCircle size={20} />
          Book Free Site Visit on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default UniversalServiceCalculator;
