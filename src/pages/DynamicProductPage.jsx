import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

// --- Utility functions for scalable product lookup ---
// Consider moving these to a shared util if used elsewhere
const getProductBySlugOrName = (productId) => {
  if (!productId) return null;
  const lowerId = productId.toLowerCase();
  return products.find(p =>
    (p.name && p.name.toLowerCase() === lowerId) ||
    (p.url && p.url.split("/").pop().toLowerCase() === lowerId)
  );
};
const getProductsByCategory = (category) => {
  if (!category) return [];
  const lowerCat = category.toLowerCase();
  return products.filter(p => p.category && p.category.toLowerCase() === lowerCat);
};
// --- End utility functions ---

export const DynamicProductPage = () => {
    const { productId } = useParams();
    const [selectedSheen, setSelectedSheen] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const foundProduct = getProductBySlugOrName(productId);
        if (foundProduct) {
            setProduct(foundProduct);
            // TODO: Handle sheens and sizes gracefully if present
            // setSelectedSheen(Array.isArray(foundProduct.sheens) && foundProduct.sheens.length > 0 ? foundProduct.sheens[0] : "");
            // setSelectedSize(Array.isArray(foundProduct.sizes) && foundProduct.sizes.length > 0 ? foundProduct.sizes[0] : "");
            document.title = foundProduct.display_name || foundProduct.name;
        }
        setLoading(false);
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#493657] mx-auto mb-4"></div>
                    <p className="text-[#493657]">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return <Navigate to="/product" replace />;
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const getTierColor = (tier) => {
        switch (tier) {
            case "Ultra-Premium": return "text-purple-600 bg-purple-100";
            case "Premium": return "text-blue-600 bg-blue-100";
            case "Standard": return "text-green-600 bg-green-100";
            case "Value": return "text-orange-600 bg-orange-100";
            case "Specialty": return "text-red-600 bg-red-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    // Always show these sizes for every product
    const displaySizes = ["1L", "4L", "10L", "20L"];

    // Price multipliers for each size
    const sizePriceMultipliers = {
        "1L": 1,
        "4L": 3.5,
        "10L": 8,
        "20L": 14
    };
    // Calculate price for selected size
    const getSizePrice = (basePrice, size) => {
        const multiplier = sizePriceMultipliers[size] || 1;
        return Math.round(basePrice * multiplier);
    };

    // Responsive: Only sticky on xl and above
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1280;

    // Get similar products (same category, excluding current)
    const similarProducts = product
      ? getProductsByCategory(product.category).filter(p => p.name !== product.name)
      : [];

    // Get 2 random similar products (same category, excluding current)
    let randomSimilar = [];
    if (similarProducts.length > 2) {
        const shuffled = [...similarProducts].sort(() => 0.5 - Math.random());
        randomSimilar = shuffled.slice(0, 2);
    } else {
        randomSimilar = similarProducts.slice(0, 2);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5 px-2 md:px-6 xl:px-10">
            <motion.section 
                className="w-full max-w-[1400px] mx-auto px-4 py-10 pt-32"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Breadcrumb */}
                <motion.div 
                    className="flex items-center gap-2 text-sm text-[#493657]/60 mb-8"
                    variants={itemVariants}
                >
                    <Link to="/" className="hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Home
                    </Link>
                    <span>/</span>
                    <Link to="/product" className="hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-[#493657] font-medium">{product.name}</span>
                </motion.div>

                {/* Back Button */}
                <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                >
                    <Link 
                        to="/product"
                        className="inline-flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] transition-colors"
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Product Image */}
                    <motion.div 
                        className="xl:w-1/2 xl:sticky xl:top-24 xl:self-start"
                        variants={itemVariants}
                    >
                        <div className="relative group">
                            <div className="hidden xl:block absolute inset-0 bg-gradient-to-r from-[#F0C85A]/20 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full max-w-sm mx-auto hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div 
                        className="xl:w-1/2 flex flex-col gap-8"
                        variants={itemVariants}
                    >
                        {/* Product Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#493657]/60">{product.category}</span>
                            </div>
                            {/* 1. Product Name & Short Description */}
                            <h1 className="text-4xl font-bold text-[#493657]">{product.name}</h1>
                            <p className="text-lg text-[#493657]/70 mb-4">{product["short-description"] || product.shortDescription}</p>
                            
                            {/* 3. Price */}
                            <div className="flex items-center gap-4 mb-4">
                              <p className="text-3xl font-bold text-[#F0C85A]">₹{getSizePrice(product.price, selectedSize)}</p>
                              <span className="text-sm text-[#493657]/60">per {selectedSize}</span>
                            </div>
                        </div>

                        {/* Product Options */}
                        <div className="space-y-6">
                            {/* 4. Finish Type/Sheen */}
                            <div className="mb-4">
                              <h3 className="font-semibold text-[#493657] mb-2">Sheen</h3>
                              <div className="flex flex-wrap gap-2">
                                {(product.finish_type_sheen || []).map((sheen) => (
                                  <button
                                    key={sheen}
                                    onClick={() => setSelectedSheen(sheen)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedSheen === sheen ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]" : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"}`}
                                  >
                                    {sheen}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 5. Size Selection */}
                            <div className="mb-4">
                              <h3 className="font-semibold text-[#493657] mb-2">Size</h3>
                              <div className="flex flex-wrap gap-2">
                                {displaySizes.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedSize === size ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]" : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"}`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 6. Quantity & Add to Cart */}
                            <div className="mb-6">
                              <h3 className="font-semibold text-[#493657] mb-2">Quantity</h3>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5"
                                >
                                  -
                                </button>
                                <span className="text-xl font-semibold text-[#493657] min-w-[3rem] text-center">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5"
                                >
                                  +
                                </button>
                              </div>
                              <motion.button
                                onClick={() => {
                                  addToCart(
                                    product,
                                    selectedSheen,
                                    selectedSize,
                                    quantity,
                                    getSizePrice(product.price, selectedSize)
                                  );
                                  setShowAddedMessage(true);
                                  setTimeout(() => setShowAddedMessage(false), 3000);
                                }}
                                className="w-full bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] font-semibold py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#F0C85A]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaShoppingCart className="w-5 h-5" />
                                Add to Cart - ₹{getSizePrice(product.price, selectedSize) * quantity}
                              </motion.button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        {/* This block is now handled above */}
                    </motion.div>
                </div>

                {/* Product Details Section */}
                <motion.div 
                    className="mt-16"
                    variants={itemVariants}
                >
                    {/* 7. Product Details Section */}
                    <div className="mt-16">
                      <h2 className="text-3xl font-bold text-[#493657] mb-6">Product Details</h2>
                      <p className="text-[#493657]/80 text-lg mb-6 max-w-4xl leading-relaxed">{product.description || product.details}</p>
                      <hr className="border-t-2 border-[#493657] w-[120px] mb-8" />
                    </div>
                    {/* Specifications Section */}
                    <div className="mt-16 mr-20 mb-20">
                      <h2 className="text-3xl font-bold text-[#493657] mb-8">Specifications</h2>
                      <div className="w-full grid grid-cols-1 xl:grid-cols-5 gap-7 xl:gap-10">
                        {/* Left: Recommended For Use On (60% on xl) */}
                        <div className="xl:col-span-3 xl:pr-8">
                          <h4 className="font-semibold text-[#493657] text-lg mb-2">Recommended For Use On</h4>
                          <p className="text-[#493657]/80 text-base mb-4 leading-relaxed">
                            {Array.isArray(product.recommended_uses) && product.recommended_uses.length
                              ? product.recommended_uses.join(' ')
                              : '—'}
                          </p>
                          {/* Application */}
                          <h4 className="font-semibold text-[#493657] text-lg mb-2">Application</h4>
                          <p className="text-[#493657]/80 text-base mb-4">{(product.application || []).join(', ') || '—'}</p>
                          {/* Advantages */}
                          <h4 className="font-semibold text-[#493657] text-lg mb-2">Advantages</h4>
                          <p className="text-[#493657]/80 text-base mb-4">{(product.advantages || []).join(', ') || '—'}</p>
                          {/* Color Options */}
                          <h4 className="font-semibold text-[#493657] text-lg mb-2">Color Options</h4>
                          <p className="text-[#493657]/80 text-base mb-4">{(product.color_options || []).join(', ') || '—'}</p>
                        </div>
                        {/* Right: Labeled grid (40% on xl) */}
                        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Key Feature(s)</span>
                            <span className="text-[#493657]/80 text-base">{(product.features || []).join(', ') || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Interior/Exterior</span>
                            <span className="text-[#493657]/80 text-base">{product.category || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Substrate</span>
                            <span className="text-[#493657]/80 text-base">{(product.substrate || []).join(', ') || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">VOC Range</span>
                            <span className="text-[#493657]/80 text-base">{product.voc_content || (product.technical_specs && product.technical_specs.voc_content) || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Regulatory</span>
                            <span className="text-[#493657]/80 text-base">VOC compliant in all areas</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Why Choose {product.name}?</span>
                            <span className="text-[#493657]/80 text-base">{product.details || product.description || '—'}</span>
                          </div>
                          {/* Technical Specs */}
                          {product.technical_specs && (
                            <>
                              <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Base Type  </span>
                                <span className="text-[#493657]/80 text-base">{product.technical_specs.base_type || '—'}</span>
                              </div>
                              <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Coverage  </span>
                                <span className="text-[#493657]/80 text-base">{product.technical_specs.coverage || '—'}</span>
                              </div>
                              <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Suitable Surfaces</span>
                                <span className="text-[#493657]/80 text-base">{(product.technical_specs.suitable_surfaces || []).join(', ') || '—'}</span>
                              </div>
                              {/* <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Application Instructions</span>
                                <span className="text-[#493657]/80 text-base">{product.technical_specs.application_instructions || '—'}</span>
                              </div> */}
                              
                              <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Recoat Time  </span>
                                <span className="text-[#493657]/80 text-base">{product.technical_specs.recoat_time || '—'}</span>
                              </div>
                              <div>
                                <span className="block font-semibold text-[#493657] text-base mb-1">Cleanup  </span>
                                <span className="text-[#493657]/80 text-base">{product.technical_specs.cleanup || '—'}</span>
                              </div>
                            </>
                          )}
                          {/* Other product keys */}
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Base Type</span>
                            <span className="text-[#493657]/80 text-base">{product.base_type || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Coverage</span>
                            <span className="text-[#493657]/80 text-base">{product.coverage || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Drying Time</span>
                            <span className="text-[#493657]/80 text-base">{product.drying_time || '—'}</span>
                          </div>
                          <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Recoat Time</span>
                            <span className="text-[#493657]/80 text-base">{product.recoat_time || '—'}</span>
                          </div>
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Packaging</span>
                            <span className="text-[#493657]/80 text-base">{(product.packaging || []).join(', ') || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Warranty</span>
                            <span className="text-[#493657]/80 text-base">{product.warranty || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Brand</span>
                            <span className="text-[#493657]/80 text-base">{product.brand || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Product Number</span>
                            <span className="text-[#493657]/80 text-base">{product.product_number || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Coats Required</span>
                            <span className="text-[#493657]/80 text-base">{product.coats_required || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Temperature Range</span>
                            <span className="text-[#493657]/80 text-base">{product.temperature_range || '—'}</span>
                          </div> */}
                          {/* <div>
                            <span className="block font-semibold text-[#493657] text-base mb-1">Humidity Range</span>
                            <span className="text-[#493657]/80 text-base">{product.humidity_range || '—'}</span>
                          </div> */}
                          
                        </div>
                      </div>
                    </div>
                    {/* Documentation */}
                    <div className="space-y-8 bg-gray-100 rounded-xl p-8">
                        <h2 className="text-3xl font-bold text-[#493657] mb-6">Documentation</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Safety Data Sheets</h4>
                                <ul className="list-disc pl-6 text-[#493657]/80 space-y-2">
                                    <li><a href="#" className="underline">SDS 1</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Technical Data Sheets</h4>
                                <ul className="list-disc pl-6 text-[#493657]/80 space-y-2">
                                    <li><a href="#" className="underline">TDS</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Similar Products Section - Comparison Table */}
                {(() => {
                  const similar = getProductsByCategory(product.category).filter(p => p.name !== product.name);
                  if (similar.length === 0) return null;
                  let toShow = similar;
                  if (similar.length > 2) {
                    // Pick 2 random products
                    const shuffled = [...similar].sort(() => 0.5 - Math.random());
                    toShow = shuffled.slice(0, 2);
                  }
                  const compareProducts = [product, ...toShow];
                  // Define the fields to compare (remove Short Description)
                  const fields = [
                    { label: 'Finish/Sheen(s)', key: 'finish_type_sheen', isArray: true },
                    { label: 'Recommended Use', key: 'recommended_uses', isArray: true },
                    { label: 'VOC Range', key: 'voc_content' },
                    { label: 'Dry Time', key: 'drying_time' },
                    { label: 'Recoat Time', key: 'recoat_time' },
                    { label: 'Clean Up', key: 'cleanup' },
                  ];
                  return (
                    <div className="mt-24 overflow-x-auto max-w-7xl px-0 mx-auto pb-20">
                      <h2 className="text-3xl font-bold text-[#493657] mb-8">Compare Similar Products</h2>
                      <table className="min-w-full w-full border border-[#e5e0d8] text-[#493657] bg-white">
                        <thead>
                          <tr>
                            <th className="text-left font-bold px-8 py-5 bg-white border-b-2 border-[#e5e0d8] w-64 align-middle">Product</th>
                            {compareProducts.map((p, idx) => (
                              <th
                                key={p.name}
                                className={`text-center font-bold px-8 py-5 border-b-2 border-[#e5e0d8] align-middle ${idx === 0 ? 'bg-gray-200' : 'bg-gray-50'} ${idx === 0 ? '' : 'border-l-2 border-[#e5e0d8]'}`}
                              >
                                <div className="flex flex-col items-center">
                                  <Link to={`/product/${p.name}`} className="block w-full" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                    <img src={p.image} alt={p.name} className="w-40 h-40 object-contain mx-auto mb-2 transition-transform duration-200 hover:scale-105" loading="lazy" />
                                  </Link>
                                  <div className="text-xl font-bold mb-2 text-center">{p.name}</div>
                                  {/* Product description below bucket */}
                                  <div className="text-[#493657]/80 font-semibold text-sm mb-2 text-center max-w-xs">{p.description}</div>
                                  <Link to={`/product/${p.name}`} className="text-[#493657] underline text-sm" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>See Product Details</Link>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {fields.map(field => (
                            <tr className="bg-white" key={field.label}>
                              <td className="font-bold px-8 py-5 border-b border-[#e5e0d8]">{field.label}</td>
                              {compareProducts.map((p, idx) => {
                                let value = p[field.key];
                                if (field.isArray && Array.isArray(value)) value = value.join(', ');
                                if (!value || (Array.isArray(value) && value.length === 0)) value = '-';
                                return (
                                  <td key={p.name + '-' + field.key} className={`text-center px-8 py-5 border-b border-[#e5e0d8] ${idx === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>{value}</td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
            </motion.section>
        </div>
    );
}; 