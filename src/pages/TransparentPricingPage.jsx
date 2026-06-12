import { Link } from 'react-router-dom';
import { Calculator, Check, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { cityMultipliers, serviceHubCards } from '../data/servicePricing';

const formula = [
  { label: 'Base rate', desc: 'Starting rate per sq ft / running ft for the selected service' },
  { label: 'Ã-- City multiplier', desc: 'Udaipur 1.00 · Jaipur 1.05 · Noida 1.12 · Delhi 1.15 · Gurgaon 1.20 · Mumbai 1.25 · and more' },
  { label: 'Ã-- Tier multiplier', desc: 'Economy, Premium or Luxury finish level selected by you' },
  { label: 'Ã-- Property / condition / complexity', desc: 'Apartment vs villa, good vs heavy repair, standard vs high-access' },
  { label: 'Ã-- Quantity', desc: 'Paintable area, affected sq ft, or running ft entered by you' },
  { label: '+ 18% GST', desc: 'Shown as a separate line item -- never hidden inside the rate' },
  { label: '= Estimate range', desc: 'Min-max cost displayed transparently before you commit to anything' },
];

const cityRows = Object.entries(cityMultipliers).map(([city, mult]) => ({ city, mult }));

const guarantees = [
  'Estimate visible before any booking',
  'GST shown separately, always',
  'Fixed written quote after site inspection',
  'No price increase after quote acceptance',
  'Booking amount adjustable against final cost',
  'Supervisor assigned before work starts',
];

const TransparentPricingPage = () => (
  <main className="min-h-screen bg-[#FBF9F6]">
    <SEO
      title="Transparent Pricing | How Calyco Calculates Service Costs"
      description="Calyco shows you the full rate logic -- base rate, city multiplier, tier, GST -- before you book anything. No hidden charges, no price changes after quote acceptance."
      url="https://calycopaints.com/transparent-pricing"
    />

    {/* Hero */}
    <section className="bg-[#0F1221] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.95),rgba(26,11,33,0.98))]" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#F0C85A] font-semibold mb-4">Pricing Transparency</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-[-0.01em] leading-[1.05] max-w-3xl">
          You see the full rate logic before you book anything.
        </h1>
        <p className="mt-5 text-lg text-white/60 max-w-2xl">Base rate, city multiplier, tier, GST -- all visible in the calculator. No hidden charges. Fixed written quote before work starts.</p>
        <div className="mt-8">
          <Link to="/calculators/service-cost-calculator" className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-7 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg">
            <Calculator className="w-5 h-5" /> Open Calculator
          </Link>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 grid grid-cols-1 lg:grid-cols-2 gap-8">

      {/* Formula */}
      <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Info className="w-5 h-5 text-[#998850]" />
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em]">How the estimate is calculated</h2>
        </div>
        <div className="space-y-3">
          {formula.map((row, i) => (
            <div key={i} className={`flex items-start gap-4 rounded-xl p-4 ${i === formula.length - 1 ? 'bg-[#493657] text-white' : 'bg-[#FBF9F6] border border-[#e5e0d8]'}`}>
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold ${i === formula.length - 1 ? 'bg-[#F0C85A] text-[#0F1221]' : 'bg-[#493657] text-white'}`}>{i + 1}</span>
              <div>
                <p className={`font-bold text-sm ${i === formula.length - 1 ? 'text-[#F0C85A]' : 'text-[#0F1221]'}`}>{row.label}</p>
                <p className={`text-xs mt-0.5 ${i === formula.length - 1 ? 'text-white/70' : 'text-gray-500'}`}>{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* City multipliers */}
        <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em] mb-4">City rate multipliers</h2>
          <div className="space-y-2">
            {cityRows.map(({ city, mult }) => (
              <div key={city} className="flex items-center justify-between rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] px-4 py-3">
                <span className="font-semibold text-sm text-gray-900">{city}</span>
                <div className="flex items-center gap-3">
                  <div className="h-2 rounded-full bg-[#493657]/15 w-24 sm:w-32">
                    <div className="h-2 rounded-full bg-[#493657]" style={{ width: `${((mult - 1) / 0.2) * 100}%` }} />
                  </div>
                  <span className="font-bold text-[#493657] text-sm w-10 text-right">{mult.toFixed(2)}x</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">Multipliers applied to base rate before GST.</p>
        </div>

        {/* Starting rates quick ref */}
        <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em] mb-4">Service starting rates</h2>
          <div className="grid grid-cols-2 gap-2">
            {serviceHubCards.slice(0, 8).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="flex justify-between items-center rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] px-3 py-2.5 hover:border-[#493657]/30 transition-colors">
                <span className="text-xs font-semibold text-gray-800 truncate">{s.title}</span>
                <span className="text-xs font-bold text-[#493657] flex-shrink-0 ml-2">₹{s.startingPrice}+</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Guarantees */}
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16">
      <div className="rounded-2xl bg-[#493657] p-8 sm:p-10">
        <h2 className="text-white text-2xl font-bold mb-6">Our pricing guarantees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {guarantees.map((g) => (
            <div key={g} className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/15 px-4 py-3">
              <Check className="w-4 h-4 text-[#F0C85A] flex-shrink-0" />
              <span className="text-sm font-semibold text-white">{g}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/calculators/service-cost-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 font-bold hover:bg-white transition-colors">
            <Calculator className="w-4 h-4" /> Calculate Your Cost
          </Link>
          <Link to="/how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
            How It Works â†'
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default TransparentPricingPage;
