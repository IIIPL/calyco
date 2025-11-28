import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTextureBySlug, getRandomTextures } from '../data/textures';
import contactData from '../data/admin/contact.json';
import { useCart } from '../context/CartContext';

const TextureDetailPage = () => {
  const { textureSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, goToCheckout } = useCart();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const texture = getTextureBySlug(textureSlug);
  const recommendations = getRandomTextures(textureSlug, 4);

  // --- SEO LOGIC START ---
  useEffect(() => {
    if (texture) {
      document.title = `${texture.name} Texture | Calyco Paints`;
    }
  }, [texture]);

  // Calculate a dynamic "Price Valid Until" date (1 year from today)
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const priceValidUntil = nextYear.toISOString().split('T')[0];

  // Generate Robust Schema JSON
  // Generate Robust Schema JSON
  const schemaData = texture ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": texture.name,
        "image": `https://calycopaints.com${texture.image}`,
        "description": texture.description,
        "sku": texture.id || "SKU-1",
        "mpn": texture.id || "MPN-1",
        "brand": {
          "@type": "Brand",
          "name": "Calyco Paints"
        },
        "offers": {
          "@type": "Offer",
          "url": `https://calycopaints.com/textures/${texture.slug}`,
          "priceCurrency": "INR",
          "price": "499",
          "priceValidUntil": priceValidUntil,
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition",
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "INR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN"
            },
            // --- NEW: Delivery Time to fix the Red Line ---
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 0,
                "maxValue": 1,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 5,
                "unitCode": "DAY"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 7, // Fixed: Number instead of String
            "returnMethod": "https://schema.org/ReturnByMail"
          }
        }
      },
      ...(texture.faqs && texture.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": texture.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  } : null;
  // --- SEO LOGIC END ---

  if (!texture) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Texture Not Found</h1>
          <button
            onClick={() => navigate('/textures')}
            className="text-[#5E3A98] hover:underline font-semibold"
          >
            Back to Textures
          </button>
        </motion.div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    window.open(contactData.contact.whatsapp.link, '_blank');
  };

  const handleBookSiteVisit = async () => {
    try {
      // Create unique ID based on texture name to prevent merging different texture site visits
      const uniqueId = `site-visit-${texture.name.replace(/\s+/g, '-').toLowerCase()}`;

      const siteVisitProduct = {
        id: uniqueId,
        name: `Site Visit - ${texture.name} Texture`,
        display_name: `Site Visit Consultation - ${texture.name}`,
        price: 499,
        image: texture.image,
        requiresShipping: false,
        productType: 'service',
      };

      await addToCart(siteVisitProduct, 'Service', 'One-time', 1, 499, {
        textureName: texture.name,
        textureSlug: texture.slug,
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

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20">
      
      {/* --- INJECTED SCHEMA --- */}
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

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

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-6 relative z-10"
      >
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <button
            onClick={() => navigate('/textures')}
            className="hover:text-[#5E3A98] transition-colors duration-300 flex items-center gap-1 group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Textures
          </button>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-medium">{texture.name}</span>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texture Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="sticky top-24"
          >
            <motion.div
              className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              
              <img
                src={texture.image}
                alt={texture.name}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', texture.image);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>

          {/* Texture Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {texture.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-[#F0C85A] to-[#f5d57a] text-gray-900 rounded-full text-sm font-semibold shadow-md"
                >
                  {texture.category}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold"
                >
                  {texture.application}
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#5E3A98] rounded-full" />
                About This Texture
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {texture.description}
              </p>
            </motion.div>

            {/* Dynamic FAQ Section */}
            {texture.faqs && texture.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="border-t border-gray-200 pt-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <svg className="w-7 h-7 text-[#5E3A98]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Common Questions
                </h3>
                <div className="space-y-3">
                  {texture.faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-[#5E3A98] font-bold text-lg mt-0.5 flex-shrink-0">Q.</span>
                          <h4 className="font-bold text-gray-900 pr-4 leading-relaxed">
                            {faq.question}
                          </h4>
                        </div>
                        <motion.svg
                          animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 text-[#5E3A98] flex-shrink-0 mt-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </button>
                      <AnimatePresence>
                        {expandedFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 pl-14">
                              <div className="border-l-3 border-[#F0C85A] pl-4 py-2">
                                <p className="text-gray-600 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="space-y-4 pt-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#5E3A98] rounded-full" />
                Get Started
              </h3>
              <motion.button
                onClick={handleWhatsAppContact}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01.198 0 .52.074.792.372.272.297 1.04 1.016 1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="relative z-10">Contact on WhatsApp</span>
              </motion.button>
              <motion.button
                onClick={handleBookSiteVisit}
                className="w-full bg-gradient-to-r from-[#5E3A98] to-[#7a4db8] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-[#493657] hover:to-[#5E3A98] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl relative overflow-hidden group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Book Site Visit - ₹499</span>
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm text-gray-600 text-center bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <span className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Professional consultation at your location
                </span>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Expert guidance on texture selection and application
                </span>
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-gray-100 via-gray-50 to-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5E3A98] rounded-full opacity-5 blur-3xl transform translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F0C85A] rounded-full opacity-5 blur-3xl transform -translate-x-32 translate-y-32" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Other Textures You Might Like</h2>
            <p className="text-gray-600 text-lg">Explore more premium textures for your project</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((recommendedTexture, index) => (
              <motion.div
                key={recommendedTexture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/textures/${recommendedTexture.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group-hover:shadow-2xl transition-all duration-300 h-full"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <img
                      src={recommendedTexture.image}
                      alt={recommendedTexture.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        console.error('Failed to load recommended texture image:', recommendedTexture.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5E3A98]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#5E3A98] transition-colors line-clamp-2">
                      {recommendedTexture.name}
                    </h3>
                    <span className="text-xs text-gray-600 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-full font-medium">
                      {recommendedTexture.category}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => navigate('/textures')}
              className="px-6 py-3 border border-[#5E3A98] text-[#5E3A98] rounded-full font-semibold hover:bg-[#5E3A98] hover:text-white transition-colors"
            >
              View All
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextureDetailPage;
