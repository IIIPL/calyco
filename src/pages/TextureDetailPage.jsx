import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTextureBySlug, getRandomTextures } from '../data/textures';
import contactData from '../data/admin/contact.json';
import { useCart } from '../context/CartContext';

const TextureDetailPage = () => {
  const { textureSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart, goToCheckout } = useCart();

  const texture = getTextureBySlug(textureSlug);
  const recommendations = getRandomTextures(textureSlug, 4);

  if (!texture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Texture Not Found</h1>
          <button
            onClick={() => navigate('/textures')}
            className="text-[#5E3A98] hover:underline"
          >
            Back to Textures
          </button>
        </div>
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    window.open(contactData.contact.whatsapp.link, '_blank');
  };

  const handleBookSiteVisit = async () => {
    try {
      // Create a product for site visit
      const siteVisitProduct = {
        id: 'site-visit-texture',
        name: `Site Visit - ${texture.name} Texture`,
        display_name: `Site Visit Consultation`,
        price: 499,
        image: texture.image,
      };

      // Add to cart
      addToCart(siteVisitProduct, 'Service', 'One-time', 1, 499, {
        textureName: texture.name,
        textureSlug: texture.slug,
        serviceType: 'Site Visit Consultation',
      });

      // Go to checkout
      await goToCheckout();
    } catch (error) {
      console.error('Error booking site visit:', error);
      alert('There was an error booking the site visit. Please try again or contact us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <nav className="text-sm text-gray-600 flex items-center gap-2">
          <button onClick={() => navigate('/textures')} className="hover:text-gray-900 transition">
            Textures
          </button>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900">{texture.name}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texture Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src={texture.image}
                alt={texture.name}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  console.error('Failed to load image:', texture.image);
                }}
              />
            </div>
          </motion.div>

          {/* Texture Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {texture.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#F0C85A] text-gray-900 rounded-full text-sm font-semibold">
                  {texture.category}
                </span>
                <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                  {texture.application}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Texture</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {texture.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Get Started</h3>

              {/* WhatsApp Button */}
              <motion.button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contact on WhatsApp
              </motion.button>

              {/* Book Site Visit Button */}
              <motion.button
                onClick={handleBookSiteVisit}
                className="w-full bg-[#5E3A98] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-[#493657] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Site Visit - ₹499
              </motion.button>

              <p className="text-sm text-gray-600 text-center">
                ✓ Professional consultation at your location
                <br />
                ✓ Expert guidance on texture selection and application
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Other Textures Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Other Textures You Might Like</h2>
            <p className="text-gray-600">Explore more premium textures for your project</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((recommendedTexture, index) => (
              <motion.div
                key={recommendedTexture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/textures/${recommendedTexture.slug}`)}
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  {/* Texture Image */}
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={recommendedTexture.image}
                      alt={recommendedTexture.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.error('Failed to load recommended texture image:', recommendedTexture.image);
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Texture Info */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#5E3A98] transition-colors">
                      {recommendedTexture.name}
                    </h3>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {recommendedTexture.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextureDetailPage;
