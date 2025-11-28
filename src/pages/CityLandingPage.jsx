// src/pages/CityLandingPage.jsx

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCityBySlug } from '../data/cities';
import { getRandomTextures } from '../data/textures';
import contactData from '../data/admin/contact.json';
import { useCart } from '../context/CartContext';

const CityLandingPage = () => {
  const { citySlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, goToCheckout } = useCart();
  
  const city = getCityBySlug(citySlug);
  const topTextures = getRandomTextures(null, 4);

  // SEO: Update page title
  useEffect(() => {
    if (city) {
      document.title = city.metaTitle;
    }
  }, [city]);

  // If city not found, show error
  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find painting services for this location.</p>
          <button
            onClick={() => navigate('/')}
            className="text-[#5E3A98] hover:underline font-semibold"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in wall texture painting services in ${city.name}.`;
    const whatsappLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleBookSiteVisit = async () => {
    try {
      // Create SVG icon as data URL for site visit
      const siteVisitIcon = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#5E3A98"/>
          <path d="M30 20h40v10H30z" fill="white"/>
          <rect x="25" y="30" width="50" height="50" rx="4" fill="white"/>
          <path d="M35 45h10v10H35zm15 0h10v10H50zm15 0h10v10H65z" fill="#5E3A98"/>
          <circle cx="50" cy="50" r="8" fill="#F0C85A"/>
          <path d="M50 45v10m-5-5h10" stroke="white" stroke-width="2"/>
        </svg>
      `)}`;

      const siteVisitProduct = {
        id: `site-visit-${city.slug}`,
        name: `Site Visit - ${city.name}`,
        display_name: `Site Visit Consultation in ${city.name}`,
        price: 499,
        image: siteVisitIcon,
        requiresShipping: false,
        productType: 'service',
      };

      await addToCart(siteVisitProduct, 'Service', 'One-time', 1, 499, {
        cityName: city.name,
        citySlug: city.slug,
        serviceType: 'Site Visit Consultation',
      });

      // Wait longer for cart state to fully update before navigating (500ms to ensure React state settles)
      await new Promise(resolve => setTimeout(resolve, 500));
      await goToCheckout();
    } catch (error) {
      console.error('Error booking site visit:', error);
      alert('There was an error booking the site visit. Please try again or contact us directly.');
    }
  };

  // JSON-LD Schema for Local Business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Calyco Paints - ${city.name}`,
    "description": city.description,
    "areaServed": {
      "@type": "City",
      "name": city.name
    },
    "serviceType": "Wall Texture Painting",
    "provider": {
      "@type": "Organization",
      "name": "Calyco Paints"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[#5E3A98] rounded-full opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#F0C85A] rounded-full opacity-5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F0C85A] to-[#f5d57a] text-gray-900 px-6 py-2 rounded-full font-semibold mb-6 shadow-md"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Now Serving {city.name}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Professional Wall Texture Painters in{' '}
              <span className="bg-gradient-to-r from-[#5E3A98] to-[#7a4db8] bg-clip-text text-transparent">
                {city.name}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              {city.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {/* Book Site Visit Button */}
              <motion.button
                onClick={handleBookSiteVisit}
                className="bg-gradient-to-r from-[#5E3A98] to-[#7a4db8] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#493657] hover:to-[#5E3A98] transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Site Visit in {city.name} - ₹499
              </motion.button>

              {/* WhatsApp Button */}
              <motion.button
                onClick={handleWhatsAppContact}
                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact on WhatsApp
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Local Areas Serving Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-100 via-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Areas We Serve in {city.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional texture painting services across all major localities
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {city.landmarks.map((landmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center group hover:border-[#5E3A98] transition-all duration-300"
              >
                <svg className="w-8 h-8 text-[#5E3A98] mx-auto mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900 group-hover:text-[#5E3A98] transition-colors">
                  {landmark}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Textures Section */}
      <section className="py-16 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Textures in {city.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most requested wall texture finishes for residential and commercial properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTextures.map((texture, index) => (
              <motion.div
                key={texture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/textures/${texture.slug}`)}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group-hover:shadow-2xl transition-all duration-300 h-full"
                >
                  {/* Texture Image */}
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={texture.image}
                      alt={texture.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5E3A98]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Texture Info */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#5E3A98] transition-colors line-clamp-2">
                      {texture.name}
                    </h3>
                    <span className="text-xs text-gray-600 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full font-medium">
                      {texture.category}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View All Textures Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => navigate('/textures')}
              className="text-[#5E3A98] hover:text-[#493657] font-semibold text-lg flex items-center gap-2 mx-auto group"
            >
              View All Textures
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Calyco Paints in {city.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality meets local expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Expert Craftsmanship",
                description: "Skilled painters with years of experience in texture application and surface preparation"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Eco-Friendly Solutions",
                description: "Low-VOC, water-based formulas that are safe for your family and the environment"
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
                title: "Timely Completion",
                description: "Professional project management ensuring on-time delivery without compromising quality"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#5E3A98] to-[#7a4db8] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-[#5E3A98] to-[#7a4db8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space in {city.name}?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Book a professional site visit today and get expert guidance on texture selection
            </p>
            <motion.button
              onClick={handleBookSiteVisit}
              className="bg-white text-[#5E3A98] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 mx-auto shadow-2xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Site Visit - ₹499
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CityLandingPage;