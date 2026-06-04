import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCityBySlug } from '../data/cities';
import contactData from '../data/admin/contact.json';
import SEO from '../components/SEO';
import { serviceHubCards, cityMultipliers } from '../data/servicePricing';
import { Calculator, CalendarCheck, MapPin, Shield, Zap, FileText, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { BRAND_NAME, POSITIONING_TAGLINE, POSITIONING_PILLS, waForCity } from '../data/positioning';

const CityLandingPage = () => {
  const { citySlug } = useParams();
  const navigate = useNavigate();

  const city = getCityBySlug(citySlug);

  useEffect(() => {
    if (city) document.title = city.metaTitle;
  }, [city]);

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF9F6] px-5">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-[#493657]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-[#493657]" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Location not found</h1>
          <p className="text-gray-500 mt-3">We couldn't find services for this location.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#493657] text-white px-6 py-3 font-semibold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const rawMultiplier = cityMultipliers[city.name];
  const cityMultiplier = (rawMultiplier && rawMultiplier > 0) ? rawMultiplier : 1.0;

  const cityStateMap = {
    Udaipur: 'Rajasthan', Jaipur: 'Rajasthan',
    Delhi: 'Delhi', Gurgaon: 'Haryana', Noida: 'Uttar Pradesh',
    Chandigarh: 'Punjab', Lucknow: 'Uttar Pradesh',
    Mumbai: 'Maharashtra', Pune: 'Maharashtra', Nashik: 'Maharashtra', Nagpur: 'Maharashtra', 'Alibaug & Lonavala': 'Maharashtra',
    Bengaluru: 'Karnataka', Goa: 'Goa',
    Hyderabad: 'Telangana', Visakhapatnam: 'Andhra Pradesh',
    Chennai: 'Tamil Nadu', Coimbatore: 'Tamil Nadu',
    Ahmedabad: 'Gujarat', Surat: 'Gujarat', Vadodara: 'Gujarat',
    Kolkata: 'West Bengal',
    Kochi: 'Kerala',
    Indore: 'Madhya Pradesh',
    Bhubaneswar: 'Odisha',
  };
  const addressRegion = cityStateMap[city.name] || 'India';

  const handleWhatsApp = (type = 'general') => {
    const msg = waForCity(city.name);
    window.open(
      `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Calyco Paints - ${city.name}`,
    description: city.description,
    url: `https://calycopaints.com/${citySlug}`,
    telephone: '+918796777399',
    email: 'info@calycopaints.com',
    priceRange: '₹₹',
    areaServed: { '@type': 'City', name: city.name },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: addressRegion,
      addressCountry: 'IN',
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      opens: '10:00',
      closes: '18:00',
    }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Painting & Waterproofing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Interior Painting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Exterior Painting' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Waterproofing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Texture Painting' } },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title={city.metaTitle}
        description={city.metaDescription || city.description}
        canonicalUrl={`https://calycopaints.com/${citySlug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F1221]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.95),rgba(26,11,33,0.98))]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F0C85A]/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A]/15 border border-[#F0C85A]/30 px-4 py-2">
              <MapPin className="w-4 h-4 text-[#F0C85A]" />
              <span className="text-sm font-semibold text-[#F0C85A]">Now serving {city.name}</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">{BRAND_NAME}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] max-w-3xl">
            Professional painting &amp; waterproofing in{' '}
            <span className="text-[#F0C85A]">{city.name}</span>
          </h1>
          <p className="mt-4 text-sm text-[#F0C85A]/80 font-medium tracking-[0.03em]">{POSITIONING_TAGLINE}</p>
          <p className="mt-3 text-base text-white/55 max-w-2xl leading-relaxed">{city.description}</p>

          {cityMultiplier && (
            <p className="mt-3 text-sm text-white/50">
              {city.name} service rates: <span className="text-[#F0C85A] font-semibold">{cityMultiplier.toFixed(2)}x base rate</span>
            </p>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleWhatsApp('visit')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-7 py-3.5 font-bold hover:bg-white transition-colors shadow-lg"
            >
              <CalendarCheck className="w-5 h-5" />
              Book Free Site Visit in {city.name}
            </button>
            <Link
              to="/calculators/service-cost-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              Calculate Cost
            </Link>
          </div>

          {/* Trust pills — positioning pillars */}
          <div className="mt-8 flex flex-wrap gap-2">
            {POSITIONING_PILLS.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                <Check className="w-3 h-3 text-[#F0C85A]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we serve */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#998850] font-semibold mb-3">Coverage</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1221] mb-6">Areas we serve in {city.name}</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {city.landmarks.map((landmark, i) => (
            <motion.div
              key={landmark}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-xl bg-white border border-[#e5e0d8] px-4 py-3.5 hover:border-[#493657]/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#493657]/8 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#493657]" />
              </div>
              <span className="font-semibold text-sm text-gray-900">{landmark}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular services in this city */}
      <section className="bg-white border-y border-[#e5e0d8] py-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#998850] font-semibold mb-2">Services in {city.name}</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1221]">Popular services near you</h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#493657] hover:text-[#F0C85A] transition-colors">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceHubCards.slice(0, 8).map((service) => {
              const adjustedMin = Math.round(service.startingPrice * cityMultiplier);
              return (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group rounded-2xl bg-[#FBF9F6] border border-[#e5e0d8] overflow-hidden hover:shadow-[0_6px_24px_-6px_rgba(73,54,87,0.16)] transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#0F1221] text-sm">{service.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.description}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#493657] bg-[#493657]/8 rounded-full px-2.5 py-1">
                        ₹{adjustedMin}+/sq ft in {city.name}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to={`/calculators/service-cost-calculator`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#493657] text-white px-6 py-3 text-sm font-bold hover:bg-[#F0C85A] hover:text-[#0F1221] transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Calculate Cost for {city.name}
            </Link>
            <button
              onClick={() => handleWhatsApp('visit')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#493657]/25 text-[#493657] px-6 py-3 text-sm font-semibold hover:border-[#493657] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp for Free Visit
            </button>
          </div>
        </div>
      </section>

      {/* Why Calyco in this city */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#998850] font-semibold mb-3">Why Calyco</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1221] mb-8">How Calyco works in {city.name}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: 'Verified service teams',
              desc: 'Skilled painters and applicators background-verified for every job.',
            },
            {
              icon: FileText,
              title: 'Fixed written quote',
              desc: 'City-wise estimates, transparent GST visibility and a fixed written quote after site inspection.',
            },
            {
              icon: Zap,
              title: 'Daily WhatsApp updates',
              desc: 'Project coordination, measurement confirmation and supervisor support throughout.',
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl bg-white border border-[#e5e0d8] p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-[#493657] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-[#0F1221] mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16">
        <div className="rounded-2xl bg-[#0F1221] overflow-hidden relative">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.9),rgba(26,11,33,0.95))]" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#F0C85A]/8 blur-[80px] pointer-events-none" />
          <div className="relative px-8 py-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your space in {city.name}?
            </h2>
            <p className="text-white/65 max-w-xl mx-auto mb-8 text-lg">
              Book a free site visit today. Our team confirms the quote after measurement -- no surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => handleWhatsApp('visit')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-8 py-4 font-bold hover:bg-white transition-colors shadow-xl text-lg"
              >
                <CalendarCheck className="w-5 h-5" />
                Book Free Site Visit
              </button>
              <Link
                to="/calculators/service-cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-8 py-4 font-semibold hover:bg-white/10 transition-colors text-lg"
              >
                <Calculator className="w-5 h-5" />
                Calculate Cost
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityLandingPage;
