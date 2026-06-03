import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calculator, Check, MessageCircle, Shield, Zap, FileText, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';
import contactData from '../../data/admin/contact.json';
import { getServiceBySlug, servicesByCategory, cityMultipliers } from '../../data/servicePricing';

const categoryColors = {
  'Core Painting Services': { from: '#1A0B21', to: '#432553' },
  'Paint Packages': { from: '#1A0B21', to: '#432553' },
  'Waterproofing Services': { from: '#0a2240', to: '#1a4a8a' },
  'Wall Design Services': { from: '#1a1200', to: '#4a3800' },
  'Wallpaper Services': { from: '#0f1a0a', to: '#2a4a1a' },
  'Wood Finishing Services': { from: '#1a0c00', to: '#4a2800' },
  'Metal Painting Services': { from: '#0a0a1a', to: '#1a1a3a' },
  'Grouting & Tile Repair': { from: '#1a0a00', to: '#4a2000' },
  'Surface Preparation': { from: '#0a0a0a', to: '#2a2a2a' },
  'Cleaning Services': { from: '#001a1a', to: '#004a4a' },
  'Consultation Services': { from: '#1a1200', to: '#4a3800' },
};

const categoryToNavLabel = {
  'Painting': 'Painting',
  'Waterproofing': 'Waterproofing',
  'Wall Design': 'Wall Design',
  'Wallpaper': 'Wallpaper',
  'Wood Finishing': 'Wood Finishing',
  'Metal Painting': 'Metal Painting',
  'Grouting & Tile Repair': 'Grouting',
  'Surface Preparation': 'Surface Prep',
  'Cleaning & Protection': 'Cleaning',
  'Consultation': 'Consultation',
};

const processSteps = [
  { icon: Calculator, label: 'Calculate a transparent estimate' },
  { icon: MessageCircle, label: 'Book a free site inspection on WhatsApp' },
  { icon: Zap, label: 'Confirm laser measurement and scope' },
  { icon: FileText, label: 'Receive a fixed written quote' },
  { icon: Shield, label: 'Track work with daily WhatsApp updates' },
];

const serviceSchema = (service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  description: service.description,
  provider: { '@type': 'Organization', name: 'Calyco Paints' },
  areaServed: ['Delhi', 'Gurgaon', 'Noida', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata', 'Goa', 'Udaipur', 'Jaipur', 'Lucknow', 'Chandigarh', 'Surat', 'Indore', 'Nagpur', 'Kochi', 'Coimbatore', 'Visakhapatnam', 'Bhubaneswar', 'Vadodara', 'Nashik', 'Alibaug'],
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

const ServiceDetailPage = () => {
  const { serviceSlug } = useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return (
      <main className="min-h-screen bg-[#FBF9F6] pt-6 px-5">
        <div className="max-w-3xl mx-auto bg-white border border-[#e5e0d8] rounded-2xl p-10 text-center">
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

  // Related: same category, different service, max 3
  const related = (servicesByCategory[service.category] || [])
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  const openWhatsApp = () => {
    const msg = `Hi Calyco, I want a free site visit for ${service.name}.`;
    window.open(`${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const delhiRate = (val) => `₹${Math.round(val * cityMultipliers.Delhi).toLocaleString('en-IN')}`;

  return (
    <main className="min-h-screen">
      <SEO
        title={`${service.name} Services | Calyco`}
        description={service.description}
        url={`https://calycopaints.com/services/${service.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F0C85A]/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6 pb-10 lg:pt-8 lg:pb-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-7" aria-label="breadcrumb">
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/40 font-light">{categoryToNavLabel[service.category] || service.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80 font-medium">{service.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-2">{service.mainCategory}</p>
              <div className="mb-5 h-[1px] w-10 bg-white/15" />
              <h1 className="text-4xl md:text-6xl font-light text-white leading-[1.08] tracking-[-0.01em]">{service.name}</h1>
              <p className="mt-5 text-base text-white/50 font-light leading-[1.75] max-w-2xl">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {['Free site inspection', 'Fixed written quote', 'Daily WhatsApp updates', 'Laser measurement'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                    <Check className="w-3 h-3 text-[#F0C85A]" />{t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to={`/calculators/service-cost-calculator?service=${service.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3.5 font-bold hover:bg-white transition-colors shadow-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Cost
                </Link>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-white font-semibold hover:bg-white/15 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Free Site Visit
                </button>
              </div>
            </div>

            {/* Pricing card */}
            <div className="rounded-2xl bg-white shadow-xl p-6">
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Starting rate</p>
              {isFree ? (
                <p className="text-4xl font-bold text-[#493657]">Free</p>
              ) : (
                <>
                  <p className="text-4xl font-bold text-[#493657]">
                    ₹{service.baseMin.toLocaleString('en-IN')}
                    <span className="text-2xl text-gray-400"> - ₹{service.baseMax.toLocaleString('en-IN')}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">per {service.unit} · base rate · excl. GST</p>
                </>
              )}

              {/* Tier price breakdown */}
              {!isFree && Object.keys(service.tiers).length > 1 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Price by tier (Delhi, incl. city rate)</p>
                  <div className="space-y-2">
                    {Object.entries(service.tiers).map(([tierName, mult]) => (
                      <div key={tierName} className="flex justify-between items-center">
                        <span className="text-sm text-gray-700 font-medium">{tierName}</span>
                        <span className="text-sm font-bold text-[#493657]">
                          {delhiRate(service.baseMin * mult)} - {delhiRate(service.baseMax * mult)}
                          <span className="text-xs text-gray-400 font-normal"> /{service.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] px-4 py-3 text-xs text-gray-600">
                Final price confirmed after free site inspection and laser measurement.
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-[#FBF9F6]">
      {/* Process + Includes */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6"
      >
        <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em] mb-5">How Calyco works</h2>
          <div className="space-y-3">
            {processSteps.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F0C85A]/20 text-[#493657] flex items-center justify-center font-bold flex-shrink-0 text-sm">{i + 1}</div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon className="w-4 h-4 text-[#998850] flex-shrink-0" />
                  <span>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#e5e0d8] rounded-2xl p-6">
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em] mb-5">What is included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.includes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] p-3.5">
                <Check className="w-4 h-4 text-[#998850] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-[#493657] p-5 text-white">
            <p className="font-medium text-lg">Fixed written quote after free site inspection</p>
            <p className="text-sm text-white/70 mt-2">The online estimate shows rate logic clearly. Calyco confirms final price after site condition check and laser measurement.</p>
            <button type="button" onClick={openWhatsApp} className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-2.5 text-sm font-bold hover:bg-white transition-colors">
              <MessageCircle className="w-4 h-4 flex-shrink-0" /> WhatsApp for Site Visit
            </button>
          </div>
        </div>
      </motion.section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-10">
          <h2 className="text-xl font-light text-[#0F1221] tracking-[-0.01em] mb-5">Related services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((s, i) => (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
              >
                <Link
                  to={`/services/${s.slug}`}
                  onClick={() => window.scrollTo({ top: 0 })}
                  className="group rounded-2xl bg-white border border-[#e5e0d8] p-5 hover:border-[#493657]/30 hover:shadow-[0_4px_18px_rgba(73,54,87,0.10)] transition-all block h-full"
                >
                  <p className="font-bold text-[#0F1221] group-hover:text-[#493657] transition-colors">{s.name}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.description}</p>
                  {s.baseMin > 0 && (
                    <p className="text-xs font-bold text-[#998850] mt-3">₹{s.baseMin}-₹{s.baseMax}/{s.unit}</p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#e5e0d8] bg-white px-6 py-5">
          <div>
            <p className="font-medium text-[#0F1221]">Need a different service?</p>
            <p className="text-sm text-[#0F1221]/50 font-light mt-0.5">Browse 60+ professional services with transparent pricing.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link to="/services" className="whitespace-nowrap rounded-full border border-[#493657]/20 bg-[#FBF9F6] px-5 py-2.5 text-sm font-semibold text-[#493657] hover:border-[#493657] transition-colors">All Services</Link>
            <Link to="/calculators/service-cost-calculator" className="whitespace-nowrap rounded-full bg-[#493657] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors">Calculate Cost</Link>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default ServiceDetailPage;

