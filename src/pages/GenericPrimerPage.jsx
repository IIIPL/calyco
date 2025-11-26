import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, FiPackage, FiDollarSign, FiType, FiThermometer, FiRepeat, FiClock, FiShield, FiArchive, FiAlertCircle, FiInfo, FiHash, FiCalendar, FiHeart, FiChevronLeft, FiChevronRight, FiStar, FiWind, FiDownload } from 'react-icons/fi';
import { useCart } from "../context/CartContext";
import CartPopup from "../components/CartPopup";
import RatingStars from "../components/RatingStars";
import ReviewsSection from "../components/ReviewsSection";
import { getProductReviews, getAverageRating, getTotalReviews } from "../data/productReviews";
import { products } from "../data/products";

const getProductBySlugOrId = (identifier) => {
  console.log('[getProductBySlugOrId] Searching for identifier:', identifier);
  console.log('[getProductBySlugOrId] Total products available:', products.length);

  if (!identifier) {
    console.log('[getProductBySlugOrId] No identifier provided');
    return null;
  }

  const lowerIdentifier = identifier.toLowerCase();
  console.log('[getProductBySlugOrId] Lowercase identifier:', lowerIdentifier);

  const found = products.find(p => {
    const slugMatch = p.slug && p.slug.toLowerCase() === lowerIdentifier;
    const idMatch = p.id && p.id.toLowerCase() === lowerIdentifier;
    const nameMatch = p.name && p.name.toLowerCase() === lowerIdentifier;

    if (slugMatch || idMatch || nameMatch) {
      console.log('[getProductBySlugOrId] FOUND MATCH:', p.name, '(slug:', p.slug, ')');
    }

    return slugMatch || idMatch || nameMatch;
  });

  if (!found) {
    console.error('[getProductBySlugOrId] NO PRODUCT FOUND for identifier:', identifier);
    console.log('[getProductBySlugOrId] Available slugs:', products.map(p => p.slug).filter(Boolean));
  }

  return found;
};

const GenericPrimerPage = () => {
    const { productId } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedFinish, setSelectedFinish] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
    const { addToCart, goToCheckout } = useCart();
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Get reviews data
    const productReviews = product ? getProductReviews(product.id) : [];
    const averageRating = product ? getAverageRating(product.id) : 0;
    const totalReviews = product ? getTotalReviews(product.id) : 0;

    // Scroll to reviews
    const scrollToReviews = () => {
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        // Extract slug from URL path (e.g., "/product/calyco-water-primer-interior" -> "calyco-water-primer-interior")
        const slug = productId || location.pathname.split('/').pop();
        console.log('[GenericPrimerPage] Loading product with ID:', productId, 'Slug from path:', slug);
        const foundProduct = getProductBySlugOrId(slug);
        console.log('[GenericPrimerPage] Found product:', foundProduct);

        if (foundProduct) {
            setProduct(foundProduct);

            // Set default finish
            const defaultFinish = foundProduct.defaultFinish || foundProduct.default_finish || foundProduct.finish_type_sheen?.[0] || "Matte";
            setSelectedFinish(defaultFinish);

            // Set default size
            const defaultSize = foundProduct.packaging?.[0] || "1L";
            setSelectedSize(defaultSize);

            // Set default image
            if (Array.isArray(foundProduct.images) && foundProduct.images.length > 0) {
                setSelectedImage(foundProduct.images[0]);
                setSelectedImageIndex(0);
            } else {
                setSelectedImage(foundProduct.image);
                setSelectedImageIndex(0);
            }

            document.title = foundProduct.display_name || foundProduct.name;
        } else {
            console.error('[GenericPrimerPage] Product not found!');
        }
        setLoading(false);
    }, [productId, location.pathname]);

    const formatINR = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

    const getCurrentPrice = () => {
        if (!product || !selectedSize || !selectedFinish) return 0;

        const priceMap = product.priceByFinish || product.price_by_finish || {};
        const finishPricing = priceMap[selectedFinish];

        if (finishPricing && finishPricing[selectedSize]) {
            const entry = finishPricing[selectedSize];
            return typeof entry === 'object' ? entry.price : entry;
        }

        return product.price || 0;
    };

    const getVariantId = () => {
        if (!product || !selectedSize || !selectedFinish) return null;

        const priceMap = product.priceByFinish || product.price_by_finish || {};
        const finishPricing = priceMap[selectedFinish];

        if (finishPricing && finishPricing[selectedSize]) {
            const entry = finishPricing[selectedSize];
            if (typeof entry === 'object' && entry.variantId) {
                return entry.variantId;
            }
        }

        return null;
    };

    const handleAddToCart = () => {
        if (!product) return;

        const currentPrice = getCurrentPrice();
        const variantId = getVariantId();

        addToCart(
            product,
            selectedFinish,
            selectedSize,
            quantity,
            currentPrice,
            null, // no color selection for primers
            "ready-mixed",
            variantId ? { variantId } : {}
        );

        setCartPopup({
            isVisible: true,
            item: {
                name: product.display_name || product.name,
                hex: "#CCCCCC",
                selectedFinish,
                selectedSize,
                quantity,
                price: formatINR(currentPrice * quantity),
            },
        });

        setTimeout(() => {
            setCartPopup({ isVisible: false, item: null });
        }, 3000);
    };

    const closeCartPopup = () => {
        setCartPopup({ isVisible: false, item: null });
    };

    const handleContinueShopping = () => {
        setCartPopup({ isVisible: false, item: null });
    };

    const handleCheckout = async () => {
        setCartPopup({ isVisible: false, item: null });
        await goToCheckout();
    };

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
        return <Navigate to="/products" replace />;
    }

    const currentPrice = getCurrentPrice();
    const displaySizes = product.packaging || [];
    const displayFinishes = product.finish_type_sheen || [];

    return (
        <>
            <div className="min-h-screen bg-white px-2 md:px-6 xl:px-10">
                <motion.section
                    className="w-full max-w-[1400px] mx-auto px-4 py-10 pt-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Breadcrumb */}
                    <motion.div className="flex items-center gap-2 text-sm text-[#493657]/60 mb-8">
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                        {/* LEFT SIDE - Product Image Gallery */}
                        <div className="relative w-full">
                            <div className="relative group w-full">
                                <div className="relative bg-white rounded-2xl p-4">
                                    <img
                                        src={selectedImage || product.image}
                                        alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                                        className="w-full h-auto max-h-[700px] object-contain rounded-xl"
                                    />

                                    {product.images && product.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePrevImage}
                                                disabled={selectedImageIndex === 0}
                                                className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                    selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                                }`}
                                            >
                                                <FiChevronLeft className="w-5 h-5 text-[#493657]" />
                                            </button>

                                            <button
                                                onClick={handleNextImage}
                                                disabled={selectedImageIndex === product.images.length - 1}
                                                className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                    selectedImageIndex === product.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                                }`}
                                            >
                                                <FiChevronRight className="w-5 h-5 text-[#493657]" />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Carousel Dots */}
                                {product.images && product.images.length > 1 && (
                                    <div className="flex justify-center gap-2 mt-4">
                                        {product.images.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedImageIndex(idx);
                                                    setSelectedImage(product.images[idx]);
                                                }}
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                                    idx === selectedImageIndex ? 'bg-[#F0C85A] w-8' : 'bg-[#493657]/20 hover:bg-[#493657]/40'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SIDE - Product Information */}
                        <div className="w-full flex flex-col gap-6 lg:pt-8">
                            {/* Product Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-[#493657] leading-tight">{product.display_name || product.name}</h1>

                            {/* Reviews */}
                            {totalReviews > 0 && (
                                <div className="flex items-center gap-4">
                                    <div className="inline-flex items-center gap-2 bg-white border-2 border-[#493657]/20 rounded-lg px-4 py-2">
                                        <RatingStars
                                            rating={averageRating}
                                            totalReviews={0}
                                            onClick={scrollToReviews}
                                            size="md"
                                        />
                                    </div>
                                    <span className="text-[#493657] font-medium cursor-pointer hover:text-[#F0C85A]" onClick={scrollToReviews}>
                                        {averageRating.toFixed(1)}/5 ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                                    </span>
                                </div>
                            )}

                            {/* Product Description */}
                            {(product.tagline || product.short_description || product.description) && (
                                <p className="text-lg text-[#493657]/80 leading-relaxed">
                                    {product.tagline || product.short_description || product.description}
                                </p>
                            )}

                            {/* Pricing */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(currentPrice)}</span>
                                <span className="text-sm text-[#493657]/60">per {selectedSize || displaySizes[0] || '1L'}</span>
                            </div>

                            {/* Bullet Points in Card */}
                            {Array.isArray(product.features) && product.features.length > 0 && (
                                <div className="my-2">
                                    <div className="bg-gradient-to-br from-[#F0C85A]/10 to-[#493657]/5 rounded-xl border-2 border-[#493657]/20 p-6 shadow-md">
                                        <ul className="space-y-3">
                                            {product.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-3">
                                                    <FiCheckCircle className="w-5 h-5 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                                    <span className="text-base font-bold text-[#493657]">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* 3 Feature Cards - Generic for Primers/Putty */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                                <div className="bg-gradient-to-br from-[#B8E6F0] to-[#8DD4E8] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                        <FiDroplet className="w-7 h-7 text-[#493657]" />
                                    </div>
                                    <h4 className="font-bold text-[#493657] text-base mb-1">Water-Based</h4>
                                    <p className="text-sm text-[#493657]/80 font-medium">Easy application</p>
                                </div>
                                <div className="bg-gradient-to-br from-[#F5D9A8] to-[#F0C85A] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                        <FiShield className="w-7 h-7 text-[#493657]" />
                                    </div>
                                    <h4 className="font-bold text-[#493657] text-base mb-1">Low VOC</h4>
                                    <p className="text-sm text-[#493657]/80 font-medium">Safe for environment</p>
                                </div>
                                <div className="bg-gradient-to-br from-[#A8D5B0] to-[#7EC488] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                        <FiClock className="w-7 h-7 text-[#493657]" />
                                    </div>
                                    <h4 className="font-bold text-[#493657] text-base mb-1">Fast Drying</h4>
                                    <p className="text-sm text-[#493657]/80 font-medium">Quick application</p>
                                </div>
                            </div>

                            {/* Product Selectors */}
                            <div className="space-y-6">
                                {/* Finish Selection */}
                                {displayFinishes.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-[#493657] mb-2">Choose Finish Type</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {displayFinishes.map((finish) => (
                                                <button
                                                    key={finish}
                                                    type="button"
                                                    onClick={() => setSelectedFinish(finish)}
                                                    className={`px-4 py-2 rounded-lg border transition-all ${
                                                        selectedFinish === finish
                                                            ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                                            : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"
                                                    }`}
                                                >
                                                    {finish}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Selection */}
                                {displaySizes.length > 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-[#493657] mb-2">Size</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {displaySizes.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
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
                                )}

                                {/* Quantity & Add to Cart */}
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
                                        onClick={handleAddToCart}
                                        className="w-full bg-gradient-to-r from-[#301A44] to-[#493657]/80 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#301A44]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <FaShoppingCart className="w-5 h-5" />
                                        Add to Cart - {formatINR(currentPrice * quantity)}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <motion.div className="mt-32">
                        <div className="flex flex-col gap-8">
                            <div className="w-full">
                                <h2 className="text-5xl font-bold text-[#493657]">Product Details</h2>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                                {/* About This Product Card */}
                                <div className="lg:w-1/2 w-full bg-white rounded-2xl border-2 border-[#493657]/10 p-8 shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] rounded-xl flex items-center justify-center">
                                            <FaInfoCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#493657]">About This Product</h3>
                                    </div>
                                    <p className="text-lg text-[#493657]/80 leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Key Benefits Card */}
                                <div className="lg:w-1/2 w-full bg-white rounded-2xl border-2 border-[#493657]/10 p-8 shadow-lg">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-xl flex items-center justify-center">
                                            <FiCheckCircle className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#493657]">Key Benefits</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {(product.keyBenefits || []).map((benefit, idx) => (
                                            <li key={idx} className="flex items-start gap-3 border-l-4 border-[#7C3AED] pl-4 py-2">
                                                <FiCheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                                                <span className="text-base text-[#493657] font-medium">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-4" />
                    </motion.div>

                    {/* Specifications Section */}
                    <div className="my-20 bg-gradient-to-br from-[#493657] to-[#301A44] rounded-3xl p-12 text-white shadow-2xl">
                        <h2 className="text-5xl font-bold mb-10">Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {product.category && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiTag className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Category</div>
                                        <div className="text-white/90 text-base capitalize">{product.category}</div>
                                    </div>
                                </div>
                            )}
                            {(Array.isArray(product.recommendedUses) && product.recommendedUses.length > 0) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiList className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Recommended Uses</div>
                                        <div className="text-white/90 text-base">{product.recommendedUses.join(', ')}</div>
                                    </div>
                                </div>
                            )}
                            {(Array.isArray(product.finish_type_sheen) && product.finish_type_sheen.length > 0) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiDroplet className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Finish / Sheen</div>
                                        <div className="text-white/90 text-base">{product.finish_type_sheen.join(', ')}</div>
                                    </div>
                                </div>
                            )}
                            {(Array.isArray(product.substrate) && product.substrate.length > 0) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiLayers className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Surface Compatibility</div>
                                        <div className="text-white/90 text-base">{product.substrate.join(', ')}</div>
                                    </div>
                                </div>
                            )}
                            {product.coverage && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiBox className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Coverage</div>
                                        <div className="text-white/90 text-base">{product.coverage}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-4" />

                    {/* Technical Specifications */}
                    <div className="my-20 bg-gradient-to-br from-[#493657] to-[#301A44] rounded-3xl p-12 text-white shadow-2xl">
                        <h2 className="text-5xl font-bold mb-10">Technical Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {(product.product_code || product.technical_specs?.product_code) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiTag className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Product Code</div>
                                        <div className="text-white/90 text-base">{product.product_code || product.technical_specs.product_code}</div>
                                    </div>
                                </div>
                            )}
                            {(product.base_type || product.technical_specs?.base_type) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiType className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Base Type</div>
                                        <div className="text-white/90 text-base">{product.base_type || product.technical_specs.base_type}</div>
                                    </div>
                                </div>
                            )}
                            {(product.voc_content || product.technical_specs?.voc_content) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiShield className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">VOC Content</div>
                                        <div className="text-white/90 text-base">{product.voc_content || product.technical_specs.voc_content}</div>
                                    </div>
                                </div>
                            )}
                            {(product.drying_time || product.technical_specs?.drying_time) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiClock className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Drying Time</div>
                                        <div className="text-white/90 text-base">{product.drying_time || product.technical_specs.drying_time}</div>
                                    </div>
                                </div>
                            )}
                            {(product.recoat_time || product.technical_specs?.recoat_time) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiRepeat className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Recoat Time</div>
                                        <div className="text-white/90 text-base">{product.recoat_time || product.technical_specs.recoat_time}</div>
                                    </div>
                                </div>
                            )}
                            {(product.warranty || product.technical_specs?.warranty) && (
                                <div className="flex items-start gap-4 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                                    <FiShield className="w-6 h-6 text-[#F0C85A] mt-1 flex-shrink-0" />
                                    <div>
                                        <div className="font-semibold text-lg mb-1">Warranty</div>
                                        <div className="text-white/90 text-base">{product.warranty || product.technical_specs.warranty}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-8" />

                    {/* Download Documents */}
                    <div className="my-20">
                        <h2 className="text-5xl font-bold text-[#493657] mb-12 text-center">Download Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* TDS Document */}
                            <div className="bg-white rounded-2xl border-2 border-[#493657]/20 p-8 hover:border-[#F0C85A] hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <FiClipboard className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#493657] text-xl mb-1">Technical Data Sheet</h3>
                                        <p className="text-sm text-[#493657]/60">Product specifications and application details</p>
                                    </div>
                                </div>
                                <a
                                    href={`/Assets/docs/${product.slug}-tds.pdf`}
                                    download
                                    className="w-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg"
                                >
                                    <FiDownload className="w-5 h-5" />
                                    Download TDS
                                </a>
                            </div>

                            {/* SDS Document */}
                            <div className="bg-white rounded-2xl border-2 border-[#493657]/20 p-8 hover:border-[#F0C85A] hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <FiShield className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#493657] text-xl mb-1">Safety Data Sheet</h3>
                                        <p className="text-sm text-[#493657]/60">Health and safety information</p>
                                    </div>
                                </div>
                                <a
                                    href={`/Assets/docs/${product.slug}-sds.pdf`}
                                    download
                                    className="w-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-lg"
                                >
                                    <FiDownload className="w-5 h-5" />
                                    Download SDS
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-8" />

                    {/* Premium Features */}
                    <div className="my-20 text-center">
                        <h2 className="text-5xl font-bold text-[#493657] mb-4">Premium Features</h2>
                        <p className="text-xl text-[#493657]/70 mb-12">Experience the difference with professional-grade quality</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(product.advantages || []).slice(0, 4).map((advantage, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#493657]/10 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-300">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md ${
                                        idx === 0 ? 'bg-gradient-to-br from-[#FBBF24] to-[#F59E0B]' :
                                        idx === 1 ? 'bg-gradient-to-br from-[#7C3AED] to-[#A78BFA]' :
                                        idx === 2 ? 'bg-gradient-to-br from-[#10B981] to-[#34D399]' :
                                        'bg-gradient-to-br from-[#06B6D4] to-[#22D3EE]'
                                    }`}>
                                        <FiCheckCircle className="w-8 h-8 text-white" />
                                    </div>
                                    <p className="text-[#493657] font-semibold text-lg leading-relaxed">{advantage}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* Reviews Section */}
                {productReviews.length > 0 && (
                    <ReviewsSection
                        reviews={productReviews}
                        productName={product.display_name || product.name}
                    />
                )}
            </div>

            {/* Cart Popup */}
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

export default GenericPrimerPage;
