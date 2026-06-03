import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Calculator, CalendarCheck, ArrowRight, MapPin, CheckCircle2, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';

import StaticHero from '../components/StaticHero';
import BenefitsSection from '../components/HomeComponents/BenefitsSection';
import WhyCalycoShowcase from '../components/HomeComponents/WhyCalycoShowcase';
import SiteInspectionCTA from '../components/HomeComponents/SiteInspectionCTA';
import TestimonialsCarousel from '../components/HomeComponents/TestimonialsCarousel';
import CallToAction from '../components/CallToAction';
import WhyFiveStar from '../components/HomeComponents/WhyFiveStar';
import ComparisonSection from '../components/HomeComponents/ComparisonSection';
import { serviceHubCards } from '../data/servicePricing';

const cityLinks = [
  { name: 'Gurgaon', slug: 'painters-in-gurgaon' },
  { name: 'Delhi', slug: 'painters-in-delhi' },
  { name: 'Noida', slug: 'painters-in-noida' },
  { name: 'Mumbai', slug: 'painters-in-mumbai' },
  { name: 'Pune', slug: 'painters-in-pune' },
  { name: 'Bengaluru', slug: 'painters-in-bengaluru' },
  { name: 'Hyderabad', slug: 'painters-in-hyderabad' },
  { name: 'Chennai', slug: 'painters-in-chennai' },
  { name: 'Udaipur', slug: 'painters-in-udaipur' },
  { name: 'Jaipur', slug: 'painters-in-jaipur' },
];

const trustNumbers = [
  { value: '60+', label: 'Paint & coating solutions', sub: 'Interior to industrial' },
  { value: '25', label: 'Cities being onboarded', sub: 'Partner network expanding' },
  { value: '₹0', label: 'Hidden charges after quote', sub: 'Fixed price, no surprises' },
  { value: '27', label: 'Quality checklist points', sub: 'Every project, every time' },
];

const serviceFaqs = [
  {
    q: 'Is the inspection really free?',
    a: 'Yes. Calyco reviews your space, understands the wall condition, and gives you a clear scope before work begins -- with no charges and no obligation.',
  },
  {
    q: 'Do I get a fixed quote?',
    a: 'Yes. You receive a written quote with scope, area, material, labour, timeline, and exclusions. The price does not change after you accept it.',
  },
  {
    q: 'Will your painters protect my furniture and floors?',
    a: 'Yes. Floor covering, furniture protection, switchboard taping, and daily cleanup are part of the Calyco process.',
  },
  {
    q: 'Can I track the work if I am not at home?',
    a: 'Yes. Daily photo updates are shared on WhatsApp so you always know what is happening on site.',
  },
  {
    q: 'Do you handle waterproofing also?',
    a: 'Yes. Calyco provides terrace, roof, bathroom, basement, and damp-wall waterproofing depending on site condition.',
  },
  {
    q: 'Which cities do you serve?',
    a: 'Calyco is building a verified painting partner network across 25 selected Indian cities. Check your city availability when booking.',
  },
];

const ServiceFAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[#F7F6F3] py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">Common Questions</span>
          <div className="mt-2 mb-5 h-[1px] w-full bg-[#0F1221]/10" />
          <h2 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em]">Before You Book a Free Inspection.</h2>
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

const Home = () => {
  return (
    <div className="font-poppins bg-white min-h-screen">
      <SEO
        title="Calyco Paints | Professional Painting & Waterproofing Services Across India"
        description="Professional painting, waterproofing, wall design and surface care by Calyco -- transparent pricing, free site inspection, verified painters and fixed written quotes across 25 cities including Delhi, Gurgaon, Mumbai, Bengaluru, Hyderabad, Pune and more."
        keywords="painting services india, painting services delhi, painting services mumbai, painting services bengaluru, waterproofing services, interior painting, exterior painting, wall texture painting, calyco paints"
        ogType="website"
      />

      {/* 1. Hero */}
      <StaticHero />

      {/* 2. Services */}
      <section className="bg-[#F7F6F3] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/45">Our Services</span>
              <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
              <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] leading-[1.1] tracking-[-0.01em]">
                Everything Your Property Needs.
              </h2>
              <p className="mt-3 text-sm text-[#0F1221]/50 font-light leading-[1.75] max-w-xl">
                From interior repainting to waterproofing and surface protection, Calyco manages the full job with professional teams and transparent pricing.
              </p>
            </div>
            <Link
              to="/services"
              className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-5 py-2.5 text-sm font-medium hover:border-[#0F1221]/40 hover:text-[#0F1221] transition-colors whitespace-nowrap"
            >
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Service image grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {serviceHubCards.slice(0, 6).map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="group relative rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4] shadow-sm hover:shadow-[0_8px_28px_-6px_rgba(73,54,87,0.18)] transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-medium text-white text-xs leading-tight">{service.title}</p>
                  <p className="text-[#F0C85A] text-[10px] font-medium mt-1 tracking-[0.05em]">from ₹{service.startingPrice}/sq ft</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-row gap-3">
            <Link
              to="/calculators/service-cost-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F1221] text-white px-6 py-3 text-sm font-medium tracking-[0.03em] hover:bg-[#493657] transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate Cost
            </Link>
            <a
              href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-6 py-3 text-sm font-medium hover:border-[#0F1221]/40 hover:text-[#0F1221] transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Visit
            </a>
          </div>
        </div>
      </section>

      {/* 3. Trust numbers + Cities */}
      <section className="bg-[#0F1221] py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          {/* Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pb-7 border-b border-white/8">
            {trustNumbers.map(({ value, label, sub }) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-3xl sm:text-4xl font-light text-[#F0C85A] leading-none tracking-[-0.01em]">{value}</p>
                <p className="text-white/80 font-medium text-sm mt-2">{label}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/35 font-medium mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
          {/* Cities */}
          <div className="pt-5 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/30 uppercase tracking-[0.15em] mr-1">
              <MapPin className="w-3 h-3" /> Now in
            </span>
            {cityLinks.map((city) => (
              <Link
                key={city.slug}
                to={`/${city.slug}`}
                className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-white/45 hover:border-white/25 hover:text-white/70 transition-colors"
              >
                {city.name}
              </Link>
            ))}
            <Link
              to="/services"
              className="rounded-full border border-[#F0C85A]/25 px-3 py-1 text-[11px] font-medium text-[#F0C85A]/60 hover:text-[#F0C85A] transition-colors"
            >
              +15 more cities
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why 5-Star */}
      <WhyFiveStar />

      {/* 6. Comparison */}
      <ComparisonSection />

      {/* 7. Why Homeowners Choose Calyco */}
      <BenefitsSection />

      {/* 8. How It Works */}
      <section className="bg-[#0F1221] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="mb-10">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F0C85A]/60">Our Process</span>
            <div className="mt-2 mb-5 h-[1px] w-10 bg-white/15" />
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-[-0.01em]">
              How Calyco Delivers 5-Star Painting.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { n: '01', t: 'Book Free Inspection', d: 'Tell us your location and requirement. No payment, no commitment.' },
              { n: '02', t: 'Site Visit & Measurement', d: 'We inspect walls, dampness, cracks, area, and surface condition.' },
              { n: '03', t: 'Fixed Written Quote', d: 'Clear pricing, scope, material, timeline, and exclusions in writing.' },
              { n: '04', t: 'Verified Team Assigned', d: 'A Calyco-screened painting team is assigned to your project.' },
              { n: '05', t: 'Daily Work Updates', d: 'Progress photos and notes shared on WhatsApp during execution.' },
              { n: '06', t: 'Final Quality Check', d: 'Touch-ups, cleanup, and your approval before the team leaves.' },
            ].map((step, i) => (
              <div key={step.n} className="rounded-xl bg-white/5 border border-white/8 p-5 hover:bg-white/8 transition-all">
                <span className="text-[10px] font-medium text-white/25 tracking-[0.1em] block mb-3">{step.n}</span>
                <h3 className="text-sm sm:text-base font-medium text-white/85 mb-2">{step.t}</h3>
                <p className="text-xs sm:text-sm text-white/40 font-light leading-[1.7]">{step.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-row gap-3">
            <Link to="/how-it-works" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white/65 px-6 py-3 text-sm font-medium hover:border-white/35 hover:text-white transition-colors">
              See Full Process →
            </Link>
            <Link to="/calculators/service-cost-calculator" className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 text-sm font-medium hover:bg-white transition-colors">
              Get Fixed Quote
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Why Calyco */}
      <WhyCalycoShowcase />

      {/* 10. Testimonials */}
      <TestimonialsCarousel />

      {/* 11. FAQ */}
      <ServiceFAQ />

      {/* 12. Quote CTA */}
      <div className="bg-[#F7F6F3] px-5 sm:px-8 md:px-12 lg:px-16 py-8">
        <SiteInspectionCTA />
      </div>

      {/* 13. Final CTA */}
      <CallToAction />
    </div>
  );
};

export default Home;
