import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    // TODO: Navigate to actual product page
    console.log("Navigating to product:", productId);
    navigate(`/product/${productId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getProductType = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('primer')) return 'Primer';
    if (nameLower.includes('undercoat')) return 'Undercoat';
    if (nameLower.includes('exterior')) return 'Exterior';
    if (nameLower.includes('waterproof')) return 'Waterproofing';
    return 'Accessory';
  };

  const getProductColor = (type) => {
    switch (type) {
      case 'Primer':
        return 'bg-blue-50 text-blue-600';
      case 'Undercoat':
        return 'bg-green-50 text-green-600';
      case 'Exterior':
        return 'bg-orange-50 text-orange-600';
      case 'Waterproofing':
        return 'bg-purple-50 text-purple-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
        Complete Your Project
      </h2>
      <p className="text-lg text-gray-600 mb-12">
        Essential products to ensure the best results
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product, index) => {
          const productType = getProductType(product.name);
          const colorClasses = getProductColor(productType);
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Product Type Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${colorClasses}`}>
                    {productType}
                  </div>
                  
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="bg-white/90 backdrop-blur-sm text-purple-600 px-4 py-2 rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      View Product
                    </motion.div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    
                    {/* Product Benefits */}
                    <div className="flex gap-1">
                      {productType === 'Primer' && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full" title="Improves adhesion"></span>
                      )}
                      {productType === 'Undercoat' && (
                        <span className="w-2 h-2 bg-green-500 rounded-full" title="Blocks stains"></span>
                      )}
                      {productType === 'Exterior' && (
                        <span className="w-2 h-2 bg-orange-500 rounded-full" title="Weather resistant"></span>
                      )}
                      {productType === 'Waterproofing' && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full" title="Moisture protection"></span>
                      )}
                    </div>
                  </div>

                  {/* Product Description */}
                  <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                    {productType === 'Primer' && "Essential base coat for better paint adhesion and coverage"}
                    {productType === 'Undercoat' && "Blocks stains and provides uniform surface for top coat"}
                    {productType === 'Exterior' && "Durable exterior paint for outdoor surfaces and weather protection"}
                    {productType === 'Waterproofing' && "Protects surfaces from moisture damage and water penetration"}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleProductClick(product.id)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Project Completion Tips */}
      <div className="mt-12 p-6 bg-gray-50 rounded-2xl max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Completion Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">For New Surfaces</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Start with primer for better adhesion</li>
              <li>• Apply undercoat to block stains</li>
              <li>• Finish with your chosen paint color</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">For Existing Surfaces</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Clean and prepare the surface</li>
              <li>• Use undercoat if needed</li>
              <li>• Apply 2 coats of paint</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bundle Savings */}
      <div className="mt-8 p-6 bg-purple-50 rounded-2xl max-w-3xl mx-auto">
        <h4 className="font-semibold text-purple-800 mb-2">💡 Bundle & Save</h4>
        <p className="text-sm text-purple-700 mb-3">
          Purchase multiple products together and save up to 15% on your order. 
          Perfect for complete room makeovers and large projects.
        </p>
        <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          View Bundle Deals
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Professional Services */}
      <div className="mt-8 p-4 bg-blue-50 rounded-xl max-w-2xl mx-auto">
        <h4 className="font-semibold text-blue-800 mb-2">🛠️ Need Professional Help?</h4>
        <p className="text-sm text-blue-700 mb-3">
          Our team of professional painters can help with surface preparation, 
          application, and project completion.
        </p>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Get Professional Quote
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RelatedProducts;
