import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { getProductById, getProductsByCategory } from "../data/products";
import { useCart } from "../context/CartContext";

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
        const foundProduct = getProductById(productId);
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
    const similarProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id) : [];

    // Get 2 random similar products (same category, excluding current)
    let randomSimilar = [];
    if (similarProducts.length > 2) {
        const shuffled = [...similarProducts].sort(() => 0.5 - Math.random());
        randomSimilar = shuffled.slice(0, 2);
    } else {
        randomSimilar = similarProducts.slice(0, 2);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-[#F0C85A]/5 px-4 md:px-12 xl:px-32">
            <motion.section 
                className="w-full max-w-7xl mx-auto px-4 py-10 pt-32"
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
                            <h1 className="text-4xl font-bold text-[#493657]">{product.display_name || product.name}</h1>
                            <p className="text-lg text-[#493657]/70">{product.shortDescription}</p>
                            <div className="flex items-center gap-4">
                                <p className="text-3xl font-bold text-[#F0C85A]">₹{getSizePrice(product.price, selectedSize)}</p>
                                <span className="text-sm text-[#493657]/60">per {selectedSize}</span>
                            </div>
                        </div>

                        {/* Product Options */}
                        <div className="space-y-6">
                            {/* Sheen Selection */}
                            <div>
                                <h3 className="font-semibold text-[#493657] mb-3">Finish Options</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(product.sheens || []).map((sheen) => (
                                        <button
                                            key={sheen}
                                            onClick={() => setSelectedSheen(sheen)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${
                                                selectedSheen === sheen
                                                    ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                                    : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"
                                            }`}
                                        >
                                            {sheen}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div>
                                <h3 className="font-semibold text-[#493657] mb-3">Available Sizes</h3>
                                <div className="flex flex-wrap gap-2">
                                    {displaySizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${
                                                selectedSize === size
                                                    ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                                    : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <h3 className="font-semibold text-[#493657] mb-3">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl font-semibold text-[#493657] min-w-[3rem] text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="bg-gradient-to-r from-[#F0C85A]/10 to-[#493657]/10 rounded-2xl p-6">
                            <h3 className="font-semibold text-[#493657] mb-4 flex items-center gap-2">
                                <FaInfoCircle className="text-[#F0C85A]" />
                                Key Features
                            </h3>
                            <ul className="space-y-2 text-[#493657]/80">
                                {(product.features || []).map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <FaCheck className="text-[#F0C85A] mt-1 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Add to Cart Button */}
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
                            className="w-full bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] font-semibold py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#F0C85A]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            Add to Cart - ₹{getSizePrice(product.price, selectedSize) * quantity}
                        </motion.button>

                        {/* Success Message */}
                        <AnimatePresence>
                            {showAddedMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center"
                                >
                                    ✅ Added to cart successfully!
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Product Details Section */}
                <motion.div 
                    className="mt-24 border-t border-[#493657]/20 pt-16 space-y-16"
                    variants={itemVariants}
                >
                    {/* Product Details */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-[#493657] mb-6">Product Details</h2>
                            <p className="text-[#493657]/80 text-lg mb-6 max-w-4xl leading-relaxed">
                                {product.description}
                            </p>
                            <ul className="list-disc pl-6 text-[#493657]/80 space-y-2">
                                {(product.features || []).map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Specifications */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-[#493657] mb-6">Specifications</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Recommended For Use On</h4>
                                <p className="text-[#493657]/80 text-base mb-4">
                                    {(product.applications || []).join(", ")}
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Key Feature(s)</h4>
                                <p className="text-[#493657]/80 text-base mb-4">{(product.features && product.features[0]) || ''}</p>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Substrate</h4>
                                <p className="text-[#493657]/80 text-base mb-4">(Placeholder)</p>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Regulatory</h4>
                                <p className="text-[#493657]/80 text-base mb-4">VOC compliant in all areas</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Interior/Exterior</h4>
                                <p className="text-[#493657]/80 text-base mb-4">{product.category}</p>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">VOC Range</h4>
                                <p className="text-[#493657]/80 text-base mb-4">{(product.technicalSpecs && product.technicalSpecs.vocLevel) || ''}</p>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Specifications</h4>
                                <p className="text-[#493657]/80 text-base mb-4">(Placeholder)</p>
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
                                    <li><a href="#" className="underline">SDS 1 (Placeholder)</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#493657] text-lg mb-2">Technical Data Sheets</h4>
                                <ul className="list-disc pl-6 text-[#493657]/80 space-y-2">
                                    <li><a href="#" className="underline">TDS (Placeholder)</a></li>
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
                    // Pick 2–3 random products
                    const shuffled = [...similar].sort(() => 0.5 - Math.random());
                    toShow = shuffled.slice(0, 3);
                  }
                  const compareProducts = [product, ...toShow];
                  // Define the fields to compare
                  const fields = [
                    { label: 'Short Description', key: 'short-description' },
                    { label: 'Finish/Sheen(s)', key: 'finish_type_sheen', isArray: true },
                    { label: 'Recommended Use', key: 'recommended_uses', isArray: true },
                    { label: 'VOC Range', key: 'voc_content' },
                    { label: 'Dry Time', key: 'drying_time' },
                    { label: 'Recoat Time', key: 'recoat_time' },
                    { label: 'Clean Up', key: 'cleanup' },
                  ];
                  return (
                    <div className="mt-24 overflow-x-auto">
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
                                    <img src={p.image} alt={p.name} className="w-32 h-32 object-contain mx-auto mb-2 transition-transform duration-200 hover:scale-105" loading="lazy" />
                                  </Link>
                                  <div className="text-xl font-bold mb-2 text-center">{p.display_name || p.name}</div>
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