import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calculator, MapPin, Ruler, FileText, MessageCircle, Check, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const steps = [
  {
    number: '01',
    icon: Calculator,
    title: 'Get an instant estimate',
    description: 'Use our Universal Service Calculator to get a transparent min-max price range for any service -- painting, waterproofing, texture, wood, metal, grouting and more. Select your city, service, tier and area. GST is shown separately.',
    cta: { label: 'Open Calculator', to: '/calculators/service-cost-calculator' },
    detail: 'Takes under 2 minutes. No registration required.',
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Book a free site visit',
    description: 'Send us a WhatsApp message and our team will schedule a free site inspection at your convenience. No charges, no commitment at this stage.',
    cta: { label: 'Book on WhatsApp', href: 'https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit.' },
    detail: 'Available across 25 cities in India -- Delhi, Gurgaon, Mumbai, Bengaluru, Hyderabad, Pune, Chennai and more.',
  },
  {
    number: '03',
    icon: Ruler,
    title: 'Laser measurement + scope confirmation',
    description: 'Our team arrives at your site, measures paintable area with laser tools, assesses surface condition and confirms the exact scope of work -- number of rooms, surface repair needs, and product recommendations.',
    detail: 'This confirms the estimate produced by the calculator.',
  },
  {
    number: '04',
    icon: FileText,
    title: 'Receive a fixed written quote',
    description: 'After the site visit, we provide a fixed written quotation with a clear line-item breakdown -- labour, material, GST and timeline. No hidden charges. You approve the quote before work begins.',
    detail: 'Valid for 15 days. No surprises after acceptance.',
  },
  {
    number: '05',
    icon: Check,
    title: 'Work begins with daily updates',
    description: 'A dedicated supervisor is assigned. Work begins on the agreed date. You receive a daily WhatsApp update with progress photos and any site notes.',
    detail: 'Supervisor contact number shared before Day 1.',
  },
];

const trustItems = [
  { label: 'Free site inspection', sub: 'No charges, no obligation' },
  { label: 'Laser measurement', sub: 'Accurate area confirmation' },
  { label: 'Fixed written quote', sub: 'No price changes after approval' },
  { label: 'Daily WhatsApp updates', sub: 'Progress photos every day' },
  { label: 'GST shown separately', sub: 'Fully transparent billing' },
  { label: 'Verified service teams', sub: 'Background-checked applicators' },
];

const HowItWorksPage = () => (
  <main className="min-h-screen bg-[#FBF9F6]">
    <SEO
      title="How It Works | Calyco Painting & Waterproofing Services"
      description="See exactly how Calyco delivers painting, waterproofing and surface care -- from instant estimate to fixed written quote and daily project updates."
      url="https://calycopaints.com/how-it-works"
    />

    {/* Hero */}
    <section className="bg-[#0F1221] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.95),rgba(26,11,33,0.98))]" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F0C85A]/8 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10 lg:py-12">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-2">Our Process</p>
        <div className="mb-5 h-[1px] w-10 bg-white/15" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.08] tracking-[-0.01em] max-w-3xl">
          How Calyco works -- from estimate to finished walls.
        </h1>
        <p className="mt-5 text-lg text-white/60 max-w-2xl">Five transparent steps. No hidden charges. Fixed written quote before work begins.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link to="/calculators/service-cost-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-7 py-3.5 font-medium hover:bg-white transition-colors">
            <Calculator className="w-5 h-5" /> Calculate Cost
          </Link>
          <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-7 py-3.5 font-medium hover:bg-white/10 transition-colors">
            <MessageCircle className="w-5 h-5" /> Book Free Site Visit
          </a>
        </div>
      </div>
    </section>

    {/* Steps -- staggered whileInView */}
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
      <div className="space-y-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="group bg-white border border-[#e5e0d8] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:shadow-[0_6px_24px_rgba(73,54,87,0.10)] transition-shadow"
            >
              <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-start gap-4 sm:gap-2">
                <span className="text-5xl sm:text-6xl font-bold text-[#493657]/15 leading-none select-none">{step.number}</span>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-[#493657] flex items-center justify-center"
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-3">{step.title}</h2>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                <p className="text-sm text-[#0F1221]/40 font-medium mt-3">{step.detail}</p>
                {step.cta && (
                  <div className="mt-4">
                    {step.cta.to ? (
                      <Link to={step.cta.to} className="inline-flex items-center gap-2 rounded-full bg-[#493657] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors">
                        {step.cta.label} <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a href={step.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#1fb355] transition-colors">
                        {step.cta.label}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* Trust grid -- staggered */}
    <section className="bg-white border-y border-[#e5e0d8] py-7">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <h2 className="text-2xl font-light text-[#0F1221] tracking-[-0.01em] mb-5">Our commitments to you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl bg-[#FBF9F6] border border-[#e5e0d8] p-4 text-center"
            >
              <Check className="w-5 h-5 text-[#998850] mx-auto mb-2" />
              <p className="font-medium text-xs text-[#0F1221]/70">{item.label}</p>
              <p className="text-[11px] text-gray-500 mt-1">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Cities */}
    <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#493657] rounded-2xl px-8 py-8">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-2">Now serving</p>
          <h2 className="text-white text-2xl font-light tracking-[-0.01em] mb-3">25 Cities Across India</h2>
          <div className="flex flex-wrap gap-2">
            {['Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata', 'Goa', 'Udaipur', 'Jaipur', 'Lucknow', 'Chandigarh', '& more'].map((c) => (
              <span key={c} className="rounded-full bg-white/10 text-white/70 text-xs font-medium px-3 py-1.5">{c}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/calculators/service-cost-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 font-medium hover:bg-white transition-colors whitespace-nowrap">
            <Calculator className="w-4 h-4" /> Calculate Cost
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors whitespace-nowrap">
            All Services →
          </Link>
        </div>
      </div>
    </section>
  </main>
);

export default HowItWorksPage;
