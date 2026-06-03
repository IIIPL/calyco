import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Calculator, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { serviceCategories, cityMultipliers } from '../data/servicePricing';
import contactData from '../data/admin/contact.json';

const STEPS = ['City & Service', 'Property Details', 'Contact'];

const GetQuotePage = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    city: 'Delhi',
    category: serviceCategories[0],
    area: '',
    propertyType: 'Apartment',
    condition: 'Good',
    name: '',
    phone: '',
    preferWhatsApp: true,
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    const lines = [
      'Hi Calyco, I\'d like a quote.',
      '',
      `City: ${form.city}`,
      `Service: ${form.category}`,
      form.area ? `Area: ${form.area} sq ft` : null,
      `Property: ${form.propertyType}`,
      `Condition: ${form.condition}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
    ].filter(Boolean);
    const msg = lines.join('\n');
    window.open(
      `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
  };

  const fieldCls = 'w-full rounded-xl border border-[#e5e0d8] bg-white px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#493657] focus:border-transparent';
  const selectCls = fieldCls + ' appearance-none';

  return (
    <main className="min-h-screen bg-[#FBF9F6] pb-16">
      <SEO
        title="Get a Free Quote | Calyco Painting & Waterproofing Services"
        description="Get a free quote for painting, waterproofing or any surface care service. Takes 2 minutes. No commitment required."
        url="https://calycopaints.com/get-quote"
      />

      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#998850] font-semibold mb-3">Free Quote</p>
          <h1 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.01em]">Get your free quote in 2 minutes</h1>
          <p className="text-gray-500 mt-3">No commitment. A Calyco expert will follow up within 2 hours.</p>
        </div>

        {/* Step progress */}
        <div className="flex items-center gap-2 mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${i < step ? 'bg-[#998850] text-white' : i === step ? 'bg-[#493657] text-white' : 'bg-gray-200 text-gray-400'}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${i === step ? 'text-[#493657]' : 'text-gray-400'}`}>{label}</span>
              {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0 ml-auto" />}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white border border-[#e5e0d8] rounded-2xl p-10 text-center">
            <div className="w-16 h-16 bg-[#25D366]/15 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-[#25D366]" />
            </div>
            <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-3">Quote request sent!</h2>
            <p className="text-gray-500 mb-6">Your details were sent via WhatsApp. Our team will follow up within 2 hours (Mon-Sat, 10am-6pm).</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/calculators/service-cost-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#493657] text-white px-6 py-3 font-semibold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors text-sm">
                <Calculator className="w-4 h-4" /> See Estimate
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e5e0d8] text-[#493657] px-6 py-3 font-semibold hover:border-[#493657] transition-colors text-sm">
                Browse Services →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#e5e0d8] rounded-2xl p-6 sm:p-8 space-y-5">

            {step === 0 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your city</label>
                  <select value={form.city} onChange={(e) => set('city', e.target.value)} className={selectCls}>
                    {Object.keys(cityMultipliers).map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service needed</label>
                  <select value={form.category} onChange={(e) => set('category', e.target.value)} className={selectCls}>
                    {serviceCategories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Approx. area (sq ft)</label>
                  <input type="number" min="0" value={form.area} onChange={(e) => set('area', e.target.value)} placeholder="e.g. 1500" className={fieldCls} />
                  <p className="text-xs text-gray-400 mt-1.5">Don't know the area? Leave blank -- we'll measure during the free site visit.</p>
                </div>
                <button type="button" onClick={() => setStep(1)} className="w-full rounded-full bg-[#493657] text-white py-3.5 font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors">
                  Continue →
                </button>
              </>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property type</label>
                  <select value={form.propertyType} onChange={(e) => set('propertyType', e.target.value)} className={selectCls}>
                    {['Apartment', 'Villa / Bungalow', 'Commercial', 'High-rise'].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current surface condition</label>
                  <select value={form.condition} onChange={(e) => set('condition', e.target.value)} className={selectCls}>
                    {['Good (no major repairs needed)', 'Minor repair needed', 'Heavy repair / damp / cracks'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="flex-1 rounded-full border border-[#e5e0d8] text-gray-600 py-3.5 font-semibold hover:border-[#493657] transition-colors">
                    ← Back
                  </button>
                  <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-full bg-[#493657] text-white py-3.5 font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors">
                    Continue →
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your name</label>
                  <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Full name" required className={fieldCls} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone number</label>
                  <input type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+91 99999 99999" required className={fieldCls} />
                </div>

                <div className="rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] p-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-900 mb-1">Summary</p>
                  <p>City: <span className="font-medium text-gray-900">{form.city}</span></p>
                  <p>Service: <span className="font-medium text-gray-900">{form.category}</span></p>
                  {form.area && <p>Area: <span className="font-medium text-gray-900">{form.area} sq ft</span></p>}
                  <p>Property: <span className="font-medium text-gray-900">{form.propertyType}</span></p>
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-full border border-[#e5e0d8] text-gray-600 py-3.5 font-semibold hover:border-[#493657] transition-colors">
                    ← Back
                  </button>
                  <button type="submit" className="flex-1 rounded-full bg-[#25D366] text-white py-3.5 font-bold hover:bg-[#1fb355] transition-colors flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Send via WhatsApp
                  </button>
                </div>
                <p className="text-xs text-center text-gray-400">Your details will be sent to Calyco's team via WhatsApp. We follow up within 2 hours.</p>
              </>
            )}
          </form>
        )}
      </div>
    </main>
  );
};

export default GetQuotePage;
