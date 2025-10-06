import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, FiPackage, FiDollarSign, FiType, FiThermometer, FiRepeat, FiClock, FiShield, FiArchive, FiAlertCircle, FiInfo, FiHash, FiCalendar, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { products } from "../data/products";
import { calycoColors442 as colorData } from "../data/calycoColors442";
import { useCart } from "../context/CartContext";
import CartPopup from "../components/CartPopup";
import RatingStars from "../components/RatingStars";
import ReviewsSection from "../components/ReviewsSection";
import { getProductReviews, getAverageRating, getTotalReviews } from "../data/productReviews";

const slugify = (value) =>
  value
    ? value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

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
    const colorFamilies = useMemo(() => {
        return (colorData || [])
            .map((family) => {
                const label = family.family || family.title || "Color Family";
                const code = family.familyCode || slugify(label);
                return {
                    code,
                    label,
                    colors: Array.isArray(family.colors) ? family.colors : []
                };
            })
            .filter((family) => family.code && family.colors.length > 0);
    }, []);
    const [selectedSheen, setSelectedSheen] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColorType, setSelectedColorType] = useState("ready-mixed");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
    const { addToCart, goToCheckout } = useCart();
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [selectedColorFamily, setSelectedColorFamily] = useState(() => colorFamilies[0]?.code || "");
    const [selectedColor, setSelectedColor] = useState(() => colorFamilies[0]?.colors?.[0] || null);

    const activeColorFamily = colorFamilies.find((family) => family.code === selectedColorFamily);

    // Get reviews data for this product
    const productReviews = product ? getProductReviews(product.id) : [];
    const averageRating = product ? getAverageRating(product.id) : 0;
    const totalReviews = product ? getTotalReviews(product.id) : 0;

    // Scroll to reviews section
    const scrollToReviews = () => {
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Swipe gesture handlers for mobile
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (product?.images && product.images.length > 0) {
            if (isLeftSwipe && selectedImageIndex < product.images.length - 1) {
                // Swipe left - next image
                const nextIndex = selectedImageIndex + 1;
                setSelectedImageIndex(nextIndex);
                setSelectedImage(product.images[nextIndex]);
            }

            if (isRightSwipe && selectedImageIndex > 0) {
                // Swipe right - previous image
                const prevIndex = selectedImageIndex - 1;
                setSelectedImageIndex(prevIndex);
                setSelectedImage(product.images[prevIndex]);
            }
        }

        // Reset
        setTouchStart(0);
        setTouchEnd(0);
    };

    // Navigation arrow handlers
    const handlePrevImage = () => {
        if (product?.images && product.images.length > 0 && selectedImageIndex > 0) {
            const prevIndex = selectedImageIndex - 1;
            setSelectedImageIndex(prevIndex);
            setSelectedImage(product.images[prevIndex]);
        }
    };

    const handleNextImage = () => {
        if (product?.images && product.images.length > 0 && selectedImageIndex < product.images.length - 1) {
            const nextIndex = selectedImageIndex + 1;
            setSelectedImageIndex(nextIndex);
            setSelectedImage(product.images[nextIndex]);
        }
    };

    useEffect(() => {
        if (!activeColorFamily || !Array.isArray(activeColorFamily.colors) || activeColorFamily.colors.length === 0) {
            if (selectedColor !== null) {
                setSelectedColor(null);
            }
            return;
        }

        const hasSelected = activeColorFamily.colors.some(
            (colorOption) =>
                colorOption.hex === selectedColor?.hex && colorOption.name === selectedColor?.name
        );

        if (!hasSelected) {
            setSelectedColor(activeColorFamily.colors[0]);
        }
    }, [activeColorFamily, selectedColor]);

    const availableColors = activeColorFamily?.colors || [];

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
                setSelectedImageIndex(0);
            } else {
                setSelectedImage(foundProduct.image);
                setSelectedImageIndex(0);
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

    const closeCartPopup = () => {
        setCartPopup({ isVisible: false, item: null });
    };

    const handleContinueShopping = () => {
        setCartPopup({ isVisible: false, item: null });
        // Stay on current page
    };

    const handleCheckout = async () => {
        setCartPopup({ isVisible: false, item: null });
        await goToCheckout();
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

    // Price multipliers for each size (supports both formats: "1L" and "1 litre")
    const getSizeMultiplier = (size) => {
        if (!size) return 1;

        // Normalize the size string to extract the number
        const sizeNum = size.toString().match(/\d+/)?.[0];

        const multipliers = {
            "1": 1,
            "4": 3.5,
            "10": 8,
            "20": 14
        };

        return multipliers[sizeNum] || 1;
    };

    // Calculate price for selected size
    const getSizePrice = (basePrice, size) => {
        const multiplier = getSizeMultiplier(size);
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

    const colorInfo = selectedColor
        ? {
            name: selectedColor.name,
            hex: selectedColor.hex,
            family: activeColorFamily?.label,
            familyCode: activeColorFamily?.code
        }
        : null;

    return (
        <>
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
                    <Link to="/products" className="hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        Products
                    </Link>
                    <span>/</span>
                    <span className="text-[#493657] font-medium">{product.display_name || product.name}</span>
                </motion.div>

                {/* Back Button */}
                <motion.div 
                    className="mb-6"
                    variants={itemVariants}
                >
                    <Link 
                        to="/products"
                        className="inline-flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] transition-colors"
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    >
                        <FaArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    {/* Product Image Gallery - Sticky on MD+ screens */}
                    <motion.div
                        className="md:w-1/2 w-full md:sticky md:top-24 md:self-start md:h-fit flex flex-col items-center md:items-start justify-center"
                        variants={itemVariants}
                    >
                        <div
                            className="relative group w-full flex items-center md:items-start justify-center"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="hidden xl:block absolute inset-0 bg-gradient-to-r from-[#301A44]/10 to-[#493657]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div
                                className="relative bg-white rounded-3xl p-2 md:p-4 xl:p-6 shadow-2xl flex items-center justify-center overflow-hidden"
                            >
                                <img
                                    src={selectedImage || product.image}
                                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                                    onError={(e) => {
                                        console.error('Image failed to load:', e.target.src);
                                        if (product.image && e.target.src !== product.image) {
                                            e.target.src = product.image;
                                        }
                                    }}
                                    className="max-w-[90vw] max-h-[90vw] md:max-w-[440px] md:max-h-[440px] xl:max-w-[600px] xl:max-h-[600px] object-contain transition-opacity duration-300"
                                />

                                {/* Premium Navigation Arrows */}
                                {product.images && product.images.length > 1 && (
                                    <>
                                        {/* Previous Arrow */}
                                        <button
                                            onClick={handlePrevImage}
                                            disabled={selectedImageIndex === 0}
                                            className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 ${
                                                selectedImageIndex === 0
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-0 group-hover:opacity-100 hover:shadow-xl'
                                            }`}
                                            aria-label="Previous image"
                                        >
                                            <FiChevronLeft className="w-6 h-6 text-[#493657]" />
                                        </button>

                                        {/* Next Arrow */}
                                        <button
                                            onClick={handleNextImage}
                                            disabled={selectedImageIndex === product.images.length - 1}
                                            className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 ${
                                                selectedImageIndex === product.images.length - 1
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-0 group-hover:opacity-100 hover:shadow-xl'
                                            }`}
                                            aria-label="Next image"
                                        >
                                            <FiChevronRight className="w-6 h-6 text-[#493657]" />
                                        </button>
                                    </>
                                )}
                            </div>
                            {/* Swipe indicator for mobile */}
                            {product.images && product.images.length > 1 && (
                                <div className="md:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                                    {product.images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-2 h-2 rounded-full transition-all ${
                                                idx === selectedImageIndex ? 'bg-[#F0C85A] w-6' : 'bg-white/60'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Image Gallery Thumbnails */}
                        {Array.isArray(product.images) && product.images.length > 1 && (
                          <div className="w-full mt-6">
                            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                              {product.images.map((img, idx) => (
                                <button
                                  key={img + idx}
                                  onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedImageIndex(idx);
                                  }}
                                  className={`border-2 rounded-xl p-1.5 transition-all duration-200 focus:outline-none hover:shadow-lg ${
                                    selectedImageIndex === idx
                                      ? 'border-[#F0C85A] ring-2 ring-[#F0C85A]/30 shadow-md'
                                      : 'border-[#493657]/15 hover:border-[#493657]/30'
                                  }`}
                                  style={{background: selectedImageIndex === idx ? '#F0C85A15' : 'white'}}
                                  aria-label={`View image ${idx + 1}`}
                                  title={`${product.name} - Image ${idx + 1}`}
                                >
                                  <img
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    loading="lazy"
                                    className="w-20 h-20 object-contain rounded-lg"
                                  />
                                </button>
                              ))}
                            </div>
                            {product.images.length > 1 && (
                              <p className="text-xs text-[#493657]/60 text-center md:text-left mt-3">
                                {selectedImageIndex + 1} / {product.images.length}
                              </p>
                            )}
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
                            <h1 className="text-4xl font-bold text-[#493657]">{product.display_name || product.name}</h1>

                            {/* Rating Stars */}
                            {totalReviews > 0 && (
                              <div className="my-3">
                                <RatingStars
                                  rating={averageRating}
                                  totalReviews={totalReviews}
                                  onClick={scrollToReviews}
                                  size="lg"
                                />
                              </div>
                            )}

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
                                    type="button"
                                    onClick={() => setSelectedSheen(sheen)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedSheen === sheen ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]" : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"}`}
                                  >
                                    {sheen}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 5. Color Family */}
                            {colorFamilies.length > 0 && (
                              <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-2">Color Family</h3>
                                <div className="flex flex-wrap gap-2">
                                  {colorFamilies.map((family) => {
                                    const isActive = family.code === selectedColorFamily;
                                    return (
                                      <button
                                        key={family.code}
                                        type="button"
                                        onClick={() => setSelectedColorFamily(family.code)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${isActive ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]" : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"}`}
                                      >
                                        {family.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {/* 6. Color */}
                            {availableColors.length > 0 && (
                              <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-3">Color</h3>
                                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                                  {availableColors.map((color) => {
                                    const isSelected = selectedColor?.hex === color.hex && selectedColor?.name === color.name;
                                    return (
                                      <button
                                        key={`${activeColorFamily?.code || "color"}-${color.name}-${color.hex}`}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className="group relative flex flex-col items-center gap-2 focus:outline-none"
                                        aria-label={`Select color ${color.name}`}
                                        title={color.name}
                                      >
                                        <span
                                          className={`w-14 h-14 rounded-full border-2 transition-all duration-200 ${isSelected ? "border-[#F0C85A] ring-2 ring-[#F0C85A]/40 scale-105" : "border-[#493657]/15 group-hover:border-[#493657]/35"}`}
                                          style={{ backgroundColor: color.hex }}
                                        />
                                        <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-[#301A44]" : "text-[#493657]/70"}`}>
                                          {color.name}
                                        </span>
                                        {isSelected && (
                                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
                                              <svg
                                                className="w-4 h-4 text-[#301A44]"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                              >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                              </svg>
                                            </span>
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                                {selectedColor && (
                                  <p className="text-sm text-[#493657]/80 mt-3">
                                    Selected: {activeColorFamily?.label || "Color"} • {selectedColor.name}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* 7. Size Selection */}
                            <div className="mb-4">
                              <h3 className="font-semibold text-[#493657] mb-2">Size</h3>
                              <div className="flex flex-wrap gap-2">
                                {displaySizes.map((size) => (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded-lg border transition-all ${selectedSize === size ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]" : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"}`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 7.5 Color Type Selection */}
                            <div className="mb-4">
                              <h3 className="font-semibold text-[#493657] mb-2 flex items-center gap-2">
                                Color Mixing Option
                                <span className="text-xs font-normal text-[#493657]/60 bg-[#F0C85A]/10 px-2 py-0.5 rounded-full">
                                  Professional Choice
                                </span>
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                  type="button"
                                  onClick={() => setSelectedColorType("ready-mixed")}
                                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                    selectedColorType === "ready-mixed"
                                      ? "border-[#F0C85A] bg-[#F0C85A]/5 shadow-lg"
                                      : "border-[#493657]/20 hover:border-[#493657]/40 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                      selectedColorType === "ready-mixed"
                                        ? "border-[#F0C85A] bg-[#F0C85A]"
                                        : "border-[#493657]/30"
                                    }`}>
                                      {selectedColorType === "ready-mixed" && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-[#493657] mb-1">Ready-Mixed Color</h4>
                                      <p className="text-xs text-[#493657]/70 leading-relaxed">
                                        Pre-mixed at factory, ready to use. Consistent color batch-to-batch. Ideal for large projects.
                                      </p>
                                      <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                                        ✓ Factory Fresh
                                      </span>
                                    </div>
                                  </div>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setSelectedColorType("tint-on-demand")}
                                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                    selectedColorType === "tint-on-demand"
                                      ? "border-[#F0C85A] bg-[#F0C85A]/5 shadow-lg"
                                      : "border-[#493657]/20 hover:border-[#493657]/40 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                      selectedColorType === "tint-on-demand"
                                        ? "border-[#F0C85A] bg-[#F0C85A]"
                                        : "border-[#493657]/30"
                                    }`}>
                                      {selectedColorType === "tint-on-demand" && (
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-[#493657] mb-1">Tint-on-Demand</h4>
                                      <p className="text-xs text-[#493657]/70 leading-relaxed">
                                        Custom mixed at store/site. Perfect color matching. Flexible for small quantities.
                                      </p>
                                      <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        ✓ Custom Mixed
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>

                            {/* 8. Quantity & Add to Cart */}
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
                                    getSizePrice(product.price, selectedSize),
                                    colorInfo,
                                    selectedColorType
                                  );

                                  // Show cart popup (toast notification)
                                  setCartPopup({ isVisible: true, item: {
                                    name: product.display_name || product.name,
                                    hex: (colorInfo && colorInfo.hex) || product.color_hex || "#CCCCCC",
                                    colorName: colorInfo ? colorInfo.name : undefined,
                                    colorFamily: colorInfo ? colorInfo.family : undefined,
                                    selectedSheen,
                                    selectedSize,
                                    selectedColorType,
                                    quantity,
                                    price: `₹${getSizePrice(product.price, selectedSize) * quantity}`
                                  }});

                                  // Auto-hide popup after 3 seconds
                                  setTimeout(() => {
                                    setCartPopup({ isVisible: false, item: null });
                                  }, 3000);
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {product.technical_specs?.product_code && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiTag className="w-5 h-5 text-[#493657]" />Product Code</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.product_code}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">Base Type</span>
                      <span className="text-[#493657]/80 text-lg">{product.base_type || (product.technical_specs && product.technical_specs.base_type) || 'N/A'}</span>
                    </div>
                    {product.technical_specs?.vehicle_type && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">Vehicle Type</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.vehicle_type}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiShield className="w-5 h-5 text-[#493657]" />VOC Content</span>
                      <span className="text-[#493657]/80 text-lg">{product.voc_content || (product.technical_specs && product.technical_specs.voc_content) || 'N/A'}</span>
                    </div>
                    {product.technical_specs?.volume_solids && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">Volume Solids</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.volume_solids}</span>
                      </div>
                    )}
                    {product.technical_specs?.pH && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">pH Level</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.pH}</span>
                      </div>
                    )}
                    {product.technical_specs?.weight_per_volume && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2">Weight/Volume</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.weight_per_volume}</span>
                      </div>
                    )}
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
                    {product.technical_specs?.shelf_life && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiCalendar className="w-5 h-5 text-[#493657]" />Shelf Life</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.shelf_life}</span>
                      </div>
                    )}
                    {product.technical_specs?.storage_temp && (
                      <div>
                        <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiThermometer className="w-5 h-5 text-[#493657]" />Storage Temperature</span>
                        <span className="text-[#493657]/80 text-lg">{product.technical_specs.storage_temp}</span>
                      </div>
                    )}
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
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiPackage className="w-5 h-5 text-[#493657]" />Storage Instructions</span>
                      <span className="text-[#493657]/80 text-lg">{product.storage_instructions || (product.technical_specs && product.technical_specs.storage_instructions) || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiShield className="w-5 h-5 text-[#493657]" />Warranty</span>
                      <span className="text-[#493657]/80 text-lg">{product.warranty || (product.technical_specs && product.technical_specs.warranty) || 'N/A'}</span>
                    </div>

                    {/* Ingredients Section */}
                    {product.technical_specs?.ingredients && product.technical_specs.ingredients.length > 0 && (
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-[#493657] text-xl mb-3 mt-4">Composition</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="border-b border-[#493657]/20">
                                <th className="pb-2 text-[#493657] font-semibold">Ingredient</th>
                                <th className="pb-2 text-[#493657] font-semibold">CAS Number</th>
                                <th className="pb-2 text-[#493657] font-semibold">Weight %</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.technical_specs.ingredients.map((ingredient, idx) => (
                                <tr key={idx} className="border-b border-[#493657]/10">
                                  <td className="py-2 text-[#493657]/80">{ingredient.name}</td>
                                  <td className="py-2 text-[#493657]/80">{ingredient.cas}</td>
                                  <td className="py-2 text-[#493657]/80">{ingredient.weight}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Safety Information Section */}
                {product.safety_warnings && (
                  <>
                    <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-8" />
                    <div className="mb-20 mt-16">
                      <h2 className="text-5xl font-bold text-[#493657] mb-8">Safety Information</h2>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
                        <div className="flex items-start">
                          <FiAlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
                          <div>
                            <h3 className="font-bold text-yellow-800 text-xl mb-2">
                              {product.safety_warnings.signal_word || 'Warning'}
                            </h3>
                            <p className="text-yellow-700 text-base">
                              Please read all safety information before use
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hazard Statements */}
                      {product.safety_warnings.hazard_statements && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-[#493657] text-xl mb-3 flex items-center gap-2">
                            <FiAlertCircle className="w-5 h-5" />
                            Hazard Statements
                          </h3>
                          <ul className="list-disc pl-6 space-y-2">
                            {product.safety_warnings.hazard_statements.map((statement, idx) => (
                              <li key={idx} className="text-[#493657]/80 text-lg">{statement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Precautionary Statements */}
                      {product.safety_warnings.precautionary_statements && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-[#493657] text-xl mb-3 flex items-center gap-2">
                            <FiShield className="w-5 h-5" />
                            Precautionary Statements
                          </h3>
                          <ul className="list-disc pl-6 space-y-2">
                            {product.safety_warnings.precautionary_statements.map((statement, idx) => (
                              <li key={idx} className="text-[#493657]/80 text-lg">{statement}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* First Aid Measures */}
                      {product.safety_warnings.first_aid && (
                        <div className="mb-6">
                          <h3 className="font-semibold text-[#493657] text-xl mb-3 flex items-center gap-2">
                            <FiHeart className="w-5 h-5" />
                            First Aid Measures
                          </h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            {product.safety_warnings.first_aid.inhalation && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-[#493657] mb-2">Inhalation</h4>
                                <p className="text-[#493657]/80">{product.safety_warnings.first_aid.inhalation}</p>
                              </div>
                            )}
                            {product.safety_warnings.first_aid.skin_contact && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-[#493657] mb-2">Skin Contact</h4>
                                <p className="text-[#493657]/80">{product.safety_warnings.first_aid.skin_contact}</p>
                              </div>
                            )}
                            {product.safety_warnings.first_aid.eye_contact && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-[#493657] mb-2">Eye Contact</h4>
                                <p className="text-[#493657]/80">{product.safety_warnings.first_aid.eye_contact}</p>
                              </div>
                            )}
                            {product.safety_warnings.first_aid.ingestion && (
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-semibold text-[#493657] mb-2">Ingestion</h4>
                                <p className="text-[#493657]/80">{product.safety_warnings.first_aid.ingestion}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Basic Safety Precautions */}
                      <div className="bg-blue-50 rounded-lg p-6 mt-6">
                        <h3 className="font-semibold text-blue-800 text-lg mb-3">General Safety Precautions</h3>
                        <p className="text-blue-700">{product.safety_precautions || 'Use appropriate protective equipment. Work in well-ventilated areas.'}</p>
                      </div>
                    </div>
                  </>
                )}
            </motion.section>

            {/* Reviews Section */}
            {productReviews.length > 0 && (
                <ReviewsSection
                    reviews={productReviews}
                    productName={product.display_name || product.name}
                />
            )}
        </div>

        {/* Cart Popup (Toast Notification) */}
        <CartPopup
            isVisible={cartPopup.isVisible}
            onClose={closeCartPopup}
            item={cartPopup.item}
            onContinueShopping={handleContinueShopping}
            onCheckout={handleCheckout}
        />
    </>
    );
}; 
