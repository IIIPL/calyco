import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, FiPackage, FiDollarSign, FiType, FiThermometer, FiRepeat, FiClock, FiShield, FiArchive, FiAlertCircle, FiInfo, FiHash } from 'react-icons/fi';
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
    const [selectedImage, setSelectedImage] = useState("");
    
    // Use the product's actual packaging sizes
    const displaySizes = product && product.packaging ? product.packaging : [];
    
    useEffect(() => {
        const foundProduct = getProductBySlugOrName(productId);
        if (foundProduct) {
            setProduct(foundProduct);
            // Set default size to first available size in packaging
            if (foundProduct.packaging && foundProduct.packaging.length > 0) {
                setSelectedSize(foundProduct.packaging[0]);
            } else {
                setSelectedSize("");
            }
            // Set default image
            if (Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
                setSelectedImage(foundProduct.images[0]);
            } else {
                setSelectedImage(foundProduct.image);
            }
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

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <motion.div 
                        className="xl:w-1/2 md:w-1/2 w-full xl:sticky xl:top-24 xl:self-start flex flex-col items-center md:items-start justify-center"
                        variants={itemVariants}
                    >
                        <div className="relative group w-full flex items-center md:items-start justify-center">
                            <div className="hidden xl:block absolute inset-0 bg-gradient-to-r from-[#301A44]/10 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div
                                className="relative bg-white rounded-3xl p-2 md:p-4 xl:p-6 shadow-2xl flex items-center justify-center w-[90vw] max-w-[320px] h-[90vw] max-h-[320px] md:w-[440px] md:h-[440px] md:max-w-[440px] md:max-h-[440px] xl:w-[600px] xl:h-[600px] xl:max-w-[600px] xl:max-h-[600px]"
                            >
                                <img
                                    src={selectedImage || product.image}
                                    alt={product.name}
                                    className="object-contain w-full h-full mx-auto hover:scale-105 transition-transform duration-500"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            </div>
                        </div>
                        {/* Image Gallery Thumbnails - now below the image */}
                        {Array.isArray(product.images) && product.images.length > 0 && (
                          <div className="flex gap-2 mt-4 flex-wrap justify-center md:justify-start">
                            {product.images.map((img, idx) => (
                              <button
                                key={img + idx}
                                onClick={() => setSelectedImage(img)}
                                className={`border rounded-lg p-1 transition-all focus:outline-none ${selectedImage === img ? 'border-[#F0C85A] ring-2 ring-[#F0C85A]' : 'border-[#493657]/20 hover:border-[#493657]/40'}`}
                                style={{background: selectedImage === img ? '#F0C85A22' : 'white'}}
                              >
                                <img src={img} alt={`Thumbnail ${idx+1}`} className="w-16 h-16 object-contain rounded-md" />
                              </button>
                            ))}
                          </div>
                        )}
                    </motion.div>
                    {/* Product Details */}
                    <motion.div 
                        className="xl:w-1/2 md:w-1/2 w-full flex flex-col gap-8"
                        variants={itemVariants}
                    >
                        {/* Product Header */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-[#493657]/60">{product.category}</span>
                            </div>
                            {/* 1. Product Name */}
                            <h1 className="text-4xl font-bold text-[#493657]">{product.name}</h1>
                            {/* 2. Short Description (distinguishable) */}
                            <p className="text-lg text-[#301A44] font-semibold mb-2">{product["short-description"] || product.shortDescription}</p>
                            {/* 3. Gap */}
                            <div className="my-4" />
                            {/* 4. Main Description (distinguishable) */}
                            <p className="text-xl text-[#493657]/90 mb-4 font-medium leading-relaxed">{product.description || product.details}</p>
                            {/* 5. Features as bullet points */}
                            {Array.isArray(product.features) && product.features.length > 0 && (
                              <div className="mb-4">
                                
                                <ul className="list-disc pl-6 space-y-2 text-lg text-[#301A44] font-semibold">
                                  {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {/* 3. Price */}
                            <div className="flex items-center gap-4 mb-4">
                              <p className="text-3xl font-bold text-[#301A44]">₹{getSizePrice(product.price, selectedSize)}</p>
                              <span className="text-sm text-[#493657]/60">per {selectedSize || displaySizes[0]}</span>
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
                                className="w-full bg-gradient-to-r from-[#301A44] to-[#493657]/80 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#301A44]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
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
                    className="mt-32"
                    variants={itemVariants}
                >
                    <div className="flex flex-col gap-8">
                      {/* Heading */}
                      <div className="w-full">
                        <h2 className="text-5xl font-bold text-[#493657]">Product Details</h2>
                      </div>
                      {/* Content: Description and Advantages side by side */}
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        {/* Left: Description */}
                        <div className="lg:w-1/2 w-full">
                          <p className="text-2xl md:text-3xl font-semibold text-[#301A44] leading-snug">
                            {product.details || product.description}
                          </p>
                        </div>
                        {/* Right: Bulleted advantages */}
                        <div className="lg:w-1/2 w-full">
                          <ul className="list-disc pl-6 space-y-3 text-lg text-[#493657] font-medium">
                            {Array.isArray(product.advantages) && product.advantages.length > 0 ? (
                              product.advantages.map((adv, idx) => (
                                <li key={idx}>{adv}</li>
                              ))
                            ) : (
                              <li>No key advantages listed.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-4" />
                </motion.div>
                {/* Specifications Section */}
                <div className="mt-16 mb-12">
                  <h2 className="text-5xl font-bold text-[#493657] mb-8">Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiTag className="w-5 h-5 text-[#493657]" />Category</span>
                      <span className="text-[#493657]/80 text-lg">{product.category || 'N/A'}</span>
                    </div>
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiClipboard className="w-5 h-5 text-[#493657]" />Application Areas</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.application) ? product.application.join(', ') : (product.application || 'N/A')}</span>
                    </div>
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiList className="w-5 h-5 text-[#493657]" />Recommended Uses</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.recommended_uses) ? product.recommended_uses.join(', ') : (product.recommended_uses || 'N/A')}</span>
                    </div>
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiDroplet className="w-5 h-5 text-[#493657]" />Finish / Sheen</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.finish_type_sheen) ? product.finish_type_sheen.join(', ') : (product.finish_type_sheen || 'N/A')}</span>
                    </div>
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiLayers className="w-5 h-5 text-[#493657]" />Surface Compatibility</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.substrate) ? product.substrate.join(', ') : (product.substrate || 'N/A')}</span>
                    </div>
                    <div>
                      <span className=" font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiCheckCircle className="w-5 h-5 text-[#493657]" />Coats Required</span>
                      <span className="text-[#493657]/80 text-lg">{product.coats_required || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiBox className="w-5 h-5 text-[#493657]" />Coverage</span>
                      <span className="text-[#493657]/80 text-lg">{product.coverage || 'N/A'}</span>
                    </div>
                    
                    
                  </div>
                </div>
                {/* Add divider between Specifications and Technical Specifications */}
                <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-4" />
                {/* Technical Specifications Section */}
                <div className="mb-20 mt-16">
                  <h2 className="text-5xl font-bold text-[#493657] mb-8">Technical Specifications</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">Base Type</span>
                      <span className="text-[#493657]/80 text-lg">{product.base_type || (product.technical_specs && product.technical_specs.base_type) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiShield className="w-5 h-5 text-[#493657]" />VOC Content</span>
                      <span className="text-[#493657]/80 text-lg">{product.voc_content || (product.technical_specs && product.technical_specs.voc_content) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiClipboard className="w-5 h-5 text-[#493657]" />Application Instructions</span>
                      <span className="text-[#493657]/80 text-lg">{product.application_instructions || (product.technical_specs && product.technical_specs.application_instructions) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiClock className="w-5 h-5 text-[#493657]" />Drying Time</span>
                      <span className="text-[#493657]/80 text-lg">{product.drying_time || (product.technical_specs && product.technical_specs.drying_time) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiRepeat className="w-5 h-5 text-[#493657]" />Recoat Time</span>
                      <span className="text-[#493657]/80 text-lg">{product.recoat_time || (product.technical_specs && product.technical_specs.recoat_time) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiArchive className="w-5 h-5 text-[#493657]" />Cleanup</span>
                      <span className="text-[#493657]/80 text-lg">{product.cleanup || (product.technical_specs && product.technical_specs.cleanup) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiThermometer className="w-5 h-5 text-[#493657]" />Temperature Range</span>
                      <span className="text-[#493657]/80 text-lg">{product.temperature_range || (product.technical_specs && product.technical_specs.temperature_range) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiDroplet className="w-5 h-5 text-[#493657]" />Humidity Range</span>
                      <span className="text-[#493657]/80 text-lg">{product.humidity_range || (product.technical_specs && product.technical_specs.humidity_range) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiInfo className="w-5 h-5 text-[#493657]" />Surface Preparation</span>
                      <span className="text-[#493657]/80 text-lg">{product.preparation_instructions || (product.technical_specs && product.technical_specs.preparation_instructions) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiAlertCircle className="w-5 h-5 text-[#493657]" />Safety Precautions</span>
                      <span className="text-[#493657]/80 text-lg">{product.safety_precautions || (product.technical_specs && product.technical_specs.safety_precautions) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiPackage className="w-5 h-5 text-[#493657]" />Storage Instructions</span>
                      <span className="text-[#493657]/80 text-lg">{product.storage_instructions || (product.technical_specs && product.technical_specs.storage_instructions) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiShield className="w-5 h-5 text-[#493657]" />Warranty</span>
                      <span className="text-[#493657]/80 text-lg">{product.warranty || (product.technical_specs && product.technical_specs.warranty) || 'N/A'}</span>
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
                                <li><a href="https://docs.google.com/document/d/1a7G2nY1phuWpv8mLcqpqDSd2So-i43Qs/edit"  target="_blank" rel="noopener noreferrer" className="underline">SDS 1</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-[#493657] text-lg mb-2">Technical Data Sheets</h4>
                            <ul className="list-disc pl-6 text-[#493657]/80 space-y-2">
                                <li><a href="https://docs.google.com/document/d/1SxsgrtuzcKehOF3pqnUtv0HiD3ROSCX9/edit"  target="_blank" rel="noopener noreferrer" className="underline">TDS</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
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
                    <div className="mt-24 overflow-x-auto max-w-7xl px-0 mx-auto pb-20 hide-scrollbar">
                      <h2 className="text-lg md:text-2xl font-bold text-[#493657] mb-6 md:mb-8">Compare Similar Products</h2>
                      <div className="w-full min-w-[600px]">
                        <table className="min-w-full w-full border border-[#e5e0d8] text-[#493657] bg-white text-sm md:text-lg">
                          <thead>
                            <tr>
                              <th className="text-left font-bold px-4 md:px-8 py-3 md:py-5 bg-white border-b-2 border-[#e5e0d8] w-32 md:w-64 align-middle text-sm md:text-lg">Product</th>
                              {compareProducts.map((p, idx) => (
                                <th
                                  key={p.name}
                                  className={`text-center font-bold px-4 md:px-8 py-3 md:py-5 border-b-2 border-[#e5e0d8] align-middle text-sm md:text-lg ${idx === 0 ? 'bg-gray-200' : 'bg-gray-50'} ${idx === 0 ? '' : 'border-l-2 border-[#e5e0d8]'}`}
                                >
                                  <div className="flex flex-col items-center">
                                    <Link to={`/product/${p.name}`} className="block w-full" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                      <img src={p.image} alt={p.name} className="w-20 h-20 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain mx-auto mb-2 transition-transform duration-200 hover:scale-105" loading="lazy" />
                                    </Link>
                                    <div className="text-base md:text-xl font-bold mb-1 md:mb-2 text-center">{p.name}</div>
                                    {/* Product description below bucket */}
                                    <div className="text-[#493657]/80 font-semibold text-xs md:text-base mb-1 md:mb-2 text-center max-w-[7rem] md:max-w-xs">{p.description}</div>
                                    <Link to={`/product/${p.name}`} className="text-[#493657] underline text-xs md:text-base" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>See Product Details</Link>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {fields.map(field => (
                              <tr className="bg-white" key={field.label}>
                                <td className="font-bold px-4 md:px-8 py-3 md:py-5 border-b border-[#e5e0d8] text-sm md:text-lg">{field.label}</td>
                                {compareProducts.map((p, idx) => {
                                  let value = p[field.key];
                                  if (field.isArray && Array.isArray(value)) value = value.join(', ');
                                  if (!value || (Array.isArray(value) && value.length === 0)) value = '-';
                                  return (
                                    <td key={p.name + '-' + field.key} className={`text-center px-4 md:px-8 py-3 md:py-5 border-b border-[#e5e0d8] text-sm md:text-lg ${idx === 0 ? 'bg-gray-200' : 'bg-gray-50'}`}>{value}</td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
            </motion.section>
        </div>
    );
}; 