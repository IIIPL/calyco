import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, FiPackage, FiDollarSign, FiType, FiThermometer, FiRepeat, FiClock, FiShield, FiArchive, FiAlertCircle, FiInfo, FiHash, FiCalendar, FiHeart, FiChevronLeft, FiChevronRight, FiStar, FiWind, FiDownload, FiSun, FiExternalLink } from 'react-icons/fi';
import { useCart } from "../context/CartContext";
import CartPopup from "../components/CartPopup";
import RatingStars from "../components/RatingStars";
import ReviewsSection from "../components/ReviewsSection";
import { getProductReviews, getAverageRating, getTotalReviews } from "../data/productReviews";
import { calycoColors as colorData } from "../data/calycoColors.js";

// --- DATA DEFINITION FOR WEATHER PRIMER (Embedded for self-containment) ---
const exteriorPrimerDetail = {
  id: "calyco-weather-primer-exterior",
  name: "Exterior Weather Primer",
  slug: "calyco-weather-primer-exterior",
  image: "/Assets/Product Images/Calyco Exterior Weather Primer/calyco-exterior-weather-primer.webp",
  images: ["/Assets/Product Images/Calyco Exterior Weather Primer/calyco-exterior-weather-primer.webp"],
  description: "High-performance water-based exterior wall primer with superior adhesion, alkali resistance, and weather protection properties.",
  tagline: "The ultimate foundation for lasting exterior protection.",
  details: "Exterior Weather Primer is a specially formulated acrylic primer designed to protect exterior walls. It penetrates deeply to seal the surface, resists alkali and efflorescence, and provides a strong bond for the topcoat, ensuring your exterior paint lasts longer in harsh weather conditions.",
  finish_type_sheen: ["Smooth"],
  defaultFinish: "Smooth",
  packaging: ["1L", "4L", "10L", "20L"],
  priceByFinish: {
    "Smooth": {
      "1L": 310,
      "4L": 1150,
      "10L": 3100,
      "20L": 5800,
    }
  },
  features: [
    "Advanced acrylic polymer formula",
    "Superior alkali and efflorescence resistance",
    "Excellent adhesion to exterior masonry",
    "Enhances topcoat coverage and durability",
  ],
  advantages: [
    "Prevents peeling and flaking of topcoat",
    "Resists severe weather conditions",
    "Anti-algal and anti-fungal properties",
    "Breathable film allows moisture to escape",
    "Reduces topcoat consumption",
  ],
  application: ["Exterior walls", "Parapets", "Compound walls"],
  recommended_uses: ["Concrete", "Plaster", "Brickwork", "Asbestos"],
  substrate: ["Cement Plaster", "Concrete", "Brick", "Masonry"],
  coats_required: "1 coat",
  coverage: "150-180 sq.ft./L",
  technicalSpecs: {
    product_code: "CAL-PRI-WB-EXT-002",
    base_type: "100% Acrylic Latex",
    voc_content: "< 50 g/L",
    dryingTime: "30-45 minutes (Surface Dry)",
    recoatTime: "4-6 hours",
    application_instructions: "Dilute up to 15% with clean water. Apply with brush, roller or spray.",
    shelf_life: "3 Years",
    storage_temp: "Cool, dry place away from direct sunlight",
    cleanup: "Clean water",
  },
  safety_warnings: {
    hazard_statements: ["Harmful to aquatic life with long lasting effects if poured in drains."],
    precautionary_statements: ["Avoid release to the environment.", "Wear protective gloves/clothing.", "Use in well-ventilated areas."],
    first_aid: {
        inhalation: "Move to fresh air. Keep warm and at rest.",
        skin_contact: "Remove contaminated clothing. Wash skin thoroughly with soap and water.",
        eye_contact: "Rinse cautiously with water for several minutes. Remove contact lenses if present.",
        ingestion: "If swallowed, seek medical advice immediately."
    }
  }
};

// MRP pricing for Weather Primer (Exterior)
const EXTERIOR_PRIMER_MRP = {
  'Smooth': {
    '1L': 388,
    '4L': 1438,
    '10L': 3875,
    '20L': 7250,
  },
};

const SHOW_SAFETY_SECTION = false;
const ALLOW_COLOR_MIXING = false;

const slugify = (value) =>
  value
    ? value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

const CalycoWeatherPrimerExterior = () => {
    // Logic for colors (Standard template structure, though primers are usually white)
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

    const [selectedSheen, setSelectedSheen] = useState("Low Sheen");
    const [selectedSize, setSelectedSize] = useState("1L");
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
    const [selectedColor, setSelectedColor] = useState(null);
    
    const leftColumnWrapperRef = useRef(null);
    const stickyImageRef = useRef(null);
    const rightColumnRef = useRef(null);

    const activeColorFamily = colorFamilies.find((family) => family.code === selectedColorFamily);
    const availableColors = product?.availableColors || []; 

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

    // Touch handlers for image gallery
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
                const nextIndex = selectedImageIndex + 1;
                setSelectedImageIndex(nextIndex);
                setSelectedImage(product.images[nextIndex]);
            }
            if (isRightSwipe && selectedImageIndex > 0) {
                const prevIndex = selectedImageIndex - 1;
                setSelectedImageIndex(prevIndex);
                setSelectedImage(product.images[prevIndex]);
            }
        }
        setTouchStart(0);
        setTouchEnd(0);
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

    useEffect(() => {
        let rafId = 0;
        let cleanupFn = () => {};

        const setup = () => {
            const wrapper = leftColumnWrapperRef.current;
            const stickyEl = stickyImageRef.current;
            const rightEl = rightColumnRef.current;

            if (!wrapper || !stickyEl || !product) {
                rafId = requestAnimationFrame(setup);
                return;
            }

            const topOffset = 96; // matches lg:top-24

            const resetStyles = () => {
                stickyEl.style.position = "relative";
                stickyEl.style.top = "0px";
                stickyEl.style.left = "0px";
                stickyEl.style.width = "100%";
                stickyEl.style.zIndex = "";
            };

            const updateWrapperHeight = () => {
                if (wrapper && rightEl) {
                    if (window.innerWidth >= 1024) { // Only on desktop
                        wrapper.style.minHeight = `${rightEl.offsetHeight}px`;
                    } else {
                        wrapper.style.minHeight = ""; // Clear height on mobile
                    }
                }
            };

            const handleScroll = () => {
                if (!wrapper || !stickyEl || !rightEl) {
                    resetStyles();
                    return;
                }

                if (window.innerWidth < 1024) {
                    resetStyles();
                    return;
                }

                const containerTop = wrapper.getBoundingClientRect().top + window.scrollY;
                const rightBottom = rightEl.getBoundingClientRect().bottom + window.scrollY;
                const stickyHeight = stickyEl.offsetHeight;
                const scrollTop = window.scrollY;

                const startStick = scrollTop + topOffset;
                const stopStick = rightBottom - stickyHeight;

                if (stopStick <= containerTop) {
                    resetStyles();
                    return;
                }

                if (startStick <= containerTop) {
                    resetStyles();
                } else if (startStick >= stopStick) {
                    stickyEl.style.position = "absolute";
                    stickyEl.style.top = `${rightBottom - containerTop - stickyHeight}px`;
                    stickyEl.style.left = "0px";
                    stickyEl.style.width = "100%";
                    stickyEl.style.zIndex = "";
                } else {
                    stickyEl.style.position = "fixed";
                    stickyEl.style.top = `${topOffset}px`;
                    stickyEl.style.left = `${wrapper.getBoundingClientRect().left}px`;
                    stickyEl.style.width = `${wrapper.offsetWidth}px`;
                    stickyEl.style.zIndex = "30";
                }
            };

            const handleResize = () => {
                updateWrapperHeight();
                handleScroll();
            };

            updateWrapperHeight();
            handleScroll();

            window.addEventListener("scroll", handleScroll, { passive: true });
            window.addEventListener("resize", handleResize);

            const resizeObserver = typeof ResizeObserver !== "undefined"
                ? new ResizeObserver(() => {
                    updateWrapperHeight();
                    handleScroll();
                })
                : null;

            if (resizeObserver && rightEl) {
                resizeObserver.observe(rightEl);
            }

            cleanupFn = () => {
                window.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
                if (resizeObserver) {
                    resizeObserver.disconnect();
                }
                resetStyles();
                if (wrapper) {
                    wrapper.style.minHeight = "";
                }
            };
        };

        setup();

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            cleanupFn();
        };
    }, [product?.id, selectedSheen, selectedSize, selectedColor?.name, selectedColorFamily, quantity]);

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

    const colorInfo = selectedColor
        ? {
            name: selectedColor.name,
            hex: selectedColor.hex,
            family: activeColorFamily?.label,
            familyCode: activeColorFamily?.code
        }
        : null;

    const formatINR = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

    const priceByFinish = useMemo(() => {
        if (!product) return {};
        return product.priceByFinish || product.price_by_finish || {};
    }, [product]);

    const normalizedSelectedSheen = selectedSheen || product?.defaultFinish || "Low Sheen";

    const activeFinishPricing = useMemo(() => {
        return priceByFinish?.[normalizedSelectedSheen] || {};
    }, [priceByFinish, normalizedSelectedSheen]);

    const calculatePrice = (sizeLabel) => {
        const entry = activeFinishPricing[sizeLabel];
        if (entry === undefined || entry === null) {
            if (typeof product?.price === "number") {
                return product.price;
            }
            return 0;
        }
        if (typeof entry === "number") {
            return entry;
        }
        if (typeof entry === "object" && entry.price !== undefined) {
            return entry.price;
        }
        return 0;
    };

    const getVariantIdForSelection = (finishLabel, sizeLabel) => {
        let variantMap = product?.shopify_variant_map || {};
        const exactKey = `${sizeLabel}-${finishLabel}`;
        if (variantMap[exactKey]) {
            return variantMap[exactKey];
        }
        return null;
    };

    const displayPriceValue = calculatePrice(selectedSize);

    // Calculate MRP for Weather Primer (Exterior)
    const calculateMRP = (sizeLabel) => {
        const mrpData = EXTERIOR_PRIMER_MRP[normalizedSelectedSheen];
        if (!mrpData) return null;
        return mrpData[sizeLabel] || null;
    };

    const displayMRPValue = calculateMRP(selectedSize);

    const displaySizes = useMemo(() => {
        const finishSizes =
            activeFinishPricing && typeof activeFinishPricing === "object"
                ? Object.keys(activeFinishPricing)
                : [];
        if (finishSizes.length > 0) {
            return finishSizes;
        }
        if (Array.isArray(product?.packaging)) {
            return product.packaging;
        }
        return [];
    }, [activeFinishPricing, product?.packaging]);

    useEffect(() => {
        setProduct(exteriorPrimerDetail);
        setSelectedSheen(exteriorPrimerDetail.defaultFinish || "Low Sheen");

        const finishPricing = (exteriorPrimerDetail.priceByFinish || exteriorPrimerDetail.price_by_finish || {})["Low Sheen"];
        if (finishPricing && typeof finishPricing === "object") {
            const sizeKeys = Object.keys(finishPricing);
            if (sizeKeys.length > 0) {
                setSelectedSize(sizeKeys[0]);
            } else if (exteriorPrimerDetail.packaging && exteriorPrimerDetail.packaging.length > 0) {
                setSelectedSize(exteriorPrimerDetail.packaging[0]);
            }
        } else if (exteriorPrimerDetail.packaging && exteriorPrimerDetail.packaging.length > 0) {
            setSelectedSize(exteriorPrimerDetail.packaging[0]);
        }

        if (Array.isArray(exteriorPrimerDetail.images) && exteriorPrimerDetail.images.length > 0) {
            setSelectedImage(exteriorPrimerDetail.images[0]);
            setSelectedImageIndex(0);
        } else {
            setSelectedImage(exteriorPrimerDetail.image);
            setSelectedImageIndex(0);
        }
        document.title = exteriorPrimerDetail.name;
        setLoading(false);
    }, []);

    const handleAddToCart = () => {
        const variantId = getVariantIdForSelection(normalizedSelectedSheen, selectedSize);
        addToCart(
            product,
            selectedSheen,
            selectedSize,
            quantity,
            calculatePrice(selectedSize),
            colorInfo,
            'primer', // productType
            {
                variantId,
                productType: 'primer', // Explicitly set product type
                // Don't pass mixingMode for primers - they don't have color mixing options
            }
        );
        setCartPopup({
            isVisible: true,
            item: {
                name: product.name,
                hex: (colorInfo && colorInfo.hex) || "#FFFFFF",
                colorName: colorInfo ? colorInfo.name : "White/Base",
                colorFamily: colorInfo ? colorInfo.family : undefined,
                selectedSheen,
                selectedSize,
                selectedColorType,
                quantity,
                price: formatINR(calculatePrice(selectedSize) * quantity),
            },
        });
        setTimeout(() => {
            setCartPopup({ isVisible: false, item: null });
        }, 3000);
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
        return null;
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
    };

    const handleCheckout = async () => {
        setCartPopup({ isVisible: false, item: null });
        await goToCheckout();
    };

    return (
        <>
        <div className="min-h-screen bg-white px-3 sm:px-4 md:px-6 xl:px-10">
            <motion.section
                className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 py-4 sm:py-6 pt-16 sm:pt-20"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Breadcrumb */}
                <motion.div
                    className="flex items-center gap-2 text-xs sm:text-sm text-[#493657]/60 mb-4 sm:mb-6"
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
                    <span className="text-[#493657] font-medium truncate">{product.name}</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-start">
                    {/* LEFT SIDE - Product Image Gallery (Sticky) */}
                    <div ref={leftColumnWrapperRef} className="relative w-full">
                    <motion.div
                        ref={stickyImageRef}
                        className="w-full"
                        variants={itemVariants}
                    >
                        <div
                            className="relative group w-full"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4">
                                <img
                                    src={selectedImage || product.image}
                                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                                    onError={(e) => {
                                        console.error('Image failed to load:', e.target.src);
                                        if (product.image && e.target.src !== product.image) {
                                            e.target.src = product.image;
                                        }
                                    }}
                                    className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[700px] object-contain rounded-lg sm:rounded-xl"
                                />

                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            disabled={selectedImageIndex === 0}
                                            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                selectedImageIndex === 0
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-100'
                                            }`}
                                            aria-label="Previous image"
                                        >
                                            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#493657]" />
                                        </button>

                                        <button
                                            onClick={handleNextImage}
                                            disabled={selectedImageIndex === product.images.length - 1}
                                            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                selectedImageIndex === product.images.length - 1
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-100'
                                            }`}
                                            aria-label="Next image"
                                        >
                                            <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#493657]" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Carousel Dots */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                                    {product.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setSelectedImageIndex(idx);
                                                setSelectedImage(product.images[idx]);
                                            }}
                                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${
                                                idx === selectedImageIndex
                                                    ? 'bg-[#F0C85A] w-6 sm:w-8'
                                                    : 'bg-[#493657]/20 hover:bg-[#493657]/40'
                                            }`}
                                            aria-label={`View image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery - Auto-sliding */}
                        {Array.isArray(product.images) && product.images.length > 1 && (
                          <div className="w-full mt-4 sm:mt-6 overflow-hidden">
                            <div
                              className="flex gap-2 sm:gap-3 transition-transform duration-500 ease-in-out"
                              style={{
                                transform: `translateX(-${Math.max(0, (selectedImageIndex - 1) * (80 + 8))}px)`
                              }}
                            >
                                  {product.images.map((img, idx) => (
                                <button
                                  key={img + idx}
                                  onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedImageIndex(idx);
                                  }}
                                  className={`rounded-md sm:rounded-lg p-1.5 sm:p-2 transition-all duration-200 focus:outline-none flex-shrink-0 w-20 sm:w-24 ${
                                    selectedImageIndex === idx
                                      ? 'bg-[#F0C85A]/10'
                                      : 'bg-gray-50 hover:bg-gray-100'
                                  }`}
                                  aria-label={`View image ${idx + 1}`}
                                  title={`${product.name} - Image ${idx + 1}`}
                                >
                                  <img
                                    src={img}
                                    alt={`${product.name} view ${idx + 1}`}
                                    loading="lazy"
                                    className="w-full h-16 sm:h-20 object-contain"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </motion.div>
                    </div>

                    {/* RIGHT SIDE - Product Information */}
                    <motion.div
                        ref={rightColumnRef}
                        className="w-full flex flex-col gap-4 sm:gap-6 lg:pt-8 mt-2 sm:mt-4 lg:mt-0"
                        variants={itemVariants}
                    >
                        {/* Product Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#493657] leading-tight">{product.name}</h1>

                        {/* Reviews - New Style */}
                        {totalReviews > 0 && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#493657]/20 rounded-lg px-3 sm:px-4 py-2 w-fit">
                              <RatingStars
                                rating={averageRating}
                                totalReviews={totalReviews}
                                onClick={scrollToReviews}
                                size="md"
                              />
                            </div>
                            <span className="text-sm sm:text-base text-[#493657] font-medium cursor-pointer hover:text-[#F0C85A]" onClick={scrollToReviews}>
                              {averageRating.toFixed(1)}/5 ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                            </span>
                          </div>
                        )}

                        {/* Product Description */}
                        {(product.tagline || product.short_description || product.description) && (
                          <p className="text-base sm:text-lg text-[#493657]/80 leading-relaxed">
                            {product.tagline || product.short_description || product.description}
                          </p>
                        )}

                        {/* Compact Sale Label & Pricing */}
                        <div>
                            <div className="inline-block bg-[#dc2626] text-white px-3 py-1 text-sm font-semibold rounded mb-2">
                                Sale is Live
                            </div>
                            {displayMRPValue ? (
                              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(displayPriceValue)}</span>
                                <span className="text-lg sm:text-xl text-[#dc2626] line-through">{formatINR(displayMRPValue)}</span>
                                <span className="text-xs sm:text-sm text-[#493657]/60">per {selectedSize || displaySizes[0] || '1L'}</span>
                              </div>
                            ) : (
                              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(displayPriceValue)}</span>
                                <span className="text-xs sm:text-sm text-[#493657]/60">per {selectedSize || displaySizes[0] || '1L'}</span>
                              </div>
                            )}
                        </div>

                        {/* Bullet Points in Card */}
                        {Array.isArray(product.features) && product.features.length > 0 && (
                          <div className="my-2">
                            <div className="bg-gradient-to-br from-[#F0C85A]/10 to-[#493657]/5 rounded-xl border-2 border-[#493657]/20 p-4 sm:p-6 shadow-md">
                              <ul className="space-y-2 sm:space-y-3">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F0C85A] mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-bold text-[#493657]">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* 3 Feature Cards - Weather Primer Specific */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-3">
                          <div className="bg-[#00BCD4] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiSun className="w-6 h-6 sm:w-7 sm:h-7 text-[#00BCD4]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Weather Guard</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">All-season protection</p>
                          </div>
                          <div className="bg-[#FF9500] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiShield className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF9500]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Alkali Resist</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Prevents degradation</p>
                          </div>
                          <div className="bg-[#34C759] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiLayers className="w-6 h-6 sm:w-7 sm:h-7 text-[#34C759]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">High Opacity</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Excellent coverage</p>
                          </div>
                        </div>

                        {/* Product Selectors */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Sheen / Finish */}
                            {product.finish_type_sheen && product.finish_type_sheen.length > 0 && (
                                <div className="mb-4">
                                  <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Choose Finish Type</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.finish_type_sheen.map((sheen) => (
                                      <button
                                        key={sheen}
                                        type="button"
                                        onClick={() => setSelectedSheen(sheen)}
                                        className={`px-3 sm:px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${
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
                            )}

                            {/* Size Selection */}
                            {displaySizes.length > 0 && (
                              <div className="mb-4">
                                  <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Size</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {displaySizes.map((size) => (
                                      <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-3 sm:px-4 py-2 rounded-lg border transition-all text-sm sm:text-base ${
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

                            {/* Color Selection - Hidden for Primer if availableColors is empty */}
                            {availableColors.length > 0 && (
                              <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-3 text-sm sm:text-base">Color</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                                  {availableColors.map((color) => {
                                    const isSelected = selectedColor?.hex === color.hex && selectedColor?.name === color.name;
                                    return (
                                      <button
                                        key={`${activeColorFamily?.code || "color"}-${color.name}-${color.hex}`}
                                        type="button"
                                        onClick={() => setSelectedColor(color)}
                                        className="group relative flex flex-col items-center gap-1.5 sm:gap-2 focus:outline-none"
                                        aria-label={`Select color ${color.name}`}
                                        title={color.name}
                                      >
                                        <span
                                          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-200 ${isSelected ? "border-[#F0C85A] ring-2 ring-[#F0C85A]/40 scale-105" : "border-[#493657]/15 group-hover:border-[#493657]/35"}`}
                                          style={{ backgroundColor: color.hex }}
                                        />
                                        <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-[#301A44]" : "text-[#493657]/70"}`}>
                                          {color.name}
                                        </span>
                                        {isSelected && (
                                          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
                                              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#301A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                  <p className="text-xs sm:text-sm text-[#493657]/80 mt-3">
                                    Selected: {activeColorFamily?.label || "Color"} • {selectedColor.name}
                                  </p>
                                )}
                          </div>
                        )}

                        {/* Color Mixing Option */}
                        {ALLOW_COLOR_MIXING && (
                        <div className="mb-4">
                          <h3 className="font-semibold text-[#493657] mb-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm sm:text-base">
                            Color Mixing Option
                            <span className="text-xs font-normal text-[#493657]/60 bg-[#F0C85A]/10 px-2 py-0.5 rounded-full w-fit">
                              Professional Choice
                            </span>
                              </h3>
                              <div className="grid grid-cols-1 gap-3">
                                <button
                                  type="button"
                                  onClick={() => setSelectedColorType("ready-mixed")}
                                  className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                    selectedColorType === "ready-mixed"
                                      ? "border-[#F0C85A] bg-[#F0C85A]/5 shadow-lg"
                                      : "border-[#493657]/20 hover:border-[#493657]/40 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                        selectedColorType === "ready-mixed"
                                        ? "border-[#F0C85A] bg-[#F0C85A]"
                                        : "border-[#493657]/30"
                                    }`}>
                                      {selectedColorType === "ready-mixed" && (
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-[#493657] mb-1 text-sm sm:text-base">Standard White</h4>
                                  <p className="text-xs text-[#493657]/70 leading-relaxed">
                                    Factory standard bright white primer.
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
                                  className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                                    selectedColorType === "tint-on-demand"
                                      ? "border-[#F0C85A] bg-[#F0C85A]/5 shadow-lg"
                                      : "border-[#493657]/20 hover:border-[#493657]/40 hover:shadow-md"
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                        selectedColorType === "tint-on-demand"
                                        ? "border-[#F0C85A] bg-[#F0C85A]"
                                        : "border-[#493657]/30"
                                    }`}>
                                      {selectedColorType === "tint-on-demand" && (
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                                      )}
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-[#493657] mb-1 text-sm sm:text-base">Tint-able</h4>
                                  <p className="text-xs text-[#493657]/70 leading-relaxed">
                                    Suitable for tinting with universal stainers.
                                  </p>
                                  <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    ✓ Custom Mixed
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              </div>
                        </div>
                        )}

                            {/* Quantity & Add to Cart */}
                            <div className="mb-6">
                              <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Quantity</h3>
                              <div className="flex items-center gap-4">
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5 text-lg font-bold"
                                >
                                  -
                                </button>
                                <span className="text-lg sm:text-xl font-semibold text-[#493657] min-w-[3rem] text-center">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5 text-lg font-bold"
                                >
                                  +
                                </button>
                              </div>
                              <motion.button
                                onClick={handleAddToCart}
                                className="w-full bg-gradient-to-r from-[#2D1B69] via-[#5B2C87] to-[#1E1B4B] text-white font-semibold py-3 sm:py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#2D1B69]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4 text-sm sm:text-base"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                Add to Cart - {formatINR(displayPriceValue * quantity)}
                              </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ENHANCED Product Details Section */}
                <motion.div
                    className="mt-8 sm:mt-12 lg:mt-16"
                    variants={itemVariants}
                >
                    <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-[#493657]/10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#493657] mb-6 sm:mb-8">Product Details</h2>
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 items-start">
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#493657]/10">
                                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <FiInfo className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#493657] text-base sm:text-lg mb-2">About This Product</h3>
                                        <p className="text-sm sm:text-base text-[#493657]/80 leading-relaxed">
                                            {product.details || product.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#493657]/10">
                                <div className="flex flex-col">
                                    {/* Key Benefits Header */}
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-[#493657] text-base sm:text-lg">Key Benefits</h3>
                                    </div>
                                    
                                    {/* Benefits List */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {Array.isArray(product.advantages) && product.advantages.length > 0 ? (
                                            product.advantages.map((adv, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-[#f8fafc] rounded-lg border-l-4 border-[#6366f1]">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6366f1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                    </div>
                                                    <span className="text-sm sm:text-base text-[#493657] font-medium leading-relaxed text-left">{adv}</span>
                                                </div>
                                            ))
                                        ) : Array.isArray(product.keyBenefits) && product.keyBenefits.length > 0 ? (
                                            product.keyBenefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-[#f8fafc] rounded-lg border-l-4 border-[#6366f1]">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6366f1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                    </div>
                                                    <span className="text-sm sm:text-base text-[#493657] font-medium leading-relaxed text-left">{benefit}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-start gap-3 p-3 sm:p-4 bg-[#f8fafc] rounded-lg border-l-4 border-[#6366f1]">
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6366f1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                                <span className="text-sm sm:text-base text-[#493657] font-medium leading-relaxed text-left">No key advantages listed.</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ENHANCED Specifications Section */}
                <div className="mt-8 sm:mt-12 lg:mt-16">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#493657]/10 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#2D1B69] via-[#5B2C87] to-[#1E1B4B] text-white p-4 sm:p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20"></div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-center relative z-10 text-white drop-shadow-lg">Specifications</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-[#e2e8f0]">
                            {[
                                { label: "Category", value: "Primer", icon: FiTag },
                                { label: "Application Areas", value: Array.isArray(product.application) ? product.application.join(', ') : (product.application || 'N/A'), icon: FiClipboard },
                                { label: "Recommended Uses", value: Array.isArray(product.recommended_uses) ? product.recommended_uses.join(', ') : (product.recommended_uses || 'N/A'), icon: FiList },
                                { label: "Finish / Sheen", value: Array.isArray(product.finish_type_sheen) ? product.finish_type_sheen.join(', ') : (product.finish_type_sheen || 'N/A'), icon: FiDroplet },
                                { label: "Surface Compatibility", value: Array.isArray(product.substrate) ? product.substrate.join(', ') : (product.substrate || 'N/A'), icon: FiLayers },
                                { label: "Coats Required", value: product.coats_required || 'N/A', icon: FiCheckCircle },
                                { label: "Coverage", value: product.coverage || 'N/A', icon: FiBox }
                            ].map((spec, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 hover:bg-[#f8fafc] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#6366f1]" />
                                        <span className="font-semibold text-sm sm:text-base text-[#374151]">{spec.label}</span>
                                    </div>
                                    <span className="text-sm sm:text-base text-[#6b7280] font-medium text-left sm:text-right sm:max-w-xs">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ENHANCED Technical Specifications */}
                <div className="mt-8 sm:mt-12 lg:mt-16">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#493657]/10 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#2D1B69] via-[#5B2C87] to-[#1E1B4B] text-white p-4 sm:p-6 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20"></div>
                            <h2 className="text-2xl sm:text-3xl font-bold relative z-10 text-white drop-shadow-lg">Technical Specifications</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-[#e2e8f0]">
                            {[
                                { label: "Product Code", value: product.technicalSpecs?.product_code, icon: FiTag },
                                { label: "Base Type", value: product.base_type || (product.technicalSpecs && product.technicalSpecs.base_type) || 'N/A', icon: FiBox },
                                { label: "Vehicle Type", value: product.technicalSpecs?.vehicle_type, icon: FiPackage },
                                { label: "VOC Content", value: product.voc_content || (product.technicalSpecs && product.technicalSpecs.voc_content) || 'N/A', icon: FiShield },
                                { label: "Volume Solids", value: product.technicalSpecs?.volume_solids, icon: FiDroplet },
                                { label: "pH Level", value: product.technicalSpecs?.pH, icon: FiInfo },
                                { label: "Weight/Volume", value: product.technicalSpecs?.weight_per_volume, icon: FiPackage },
                                { label: "Application Instructions", value: product.application_instructions || (product.technicalSpecs && product.technicalSpecs.application_instructions) || 'N/A', icon: FiClipboard },
                                { label: "Drying Time", value: product.drying_time || (product.technicalSpecs && product.technicalSpecs.dryingTime) || 'N/A', icon: FiClock },
                                { label: "Recoat Time", value: product.recoat_time || (product.technicalSpecs && product.technicalSpecs.recoatTime) || 'N/A', icon: FiRepeat },
                                { label: "Shelf Life", value: product.technicalSpecs?.shelf_life, icon: FiCalendar },
                                { label: "Storage Temperature", value: product.technicalSpecs?.storage_temp, icon: FiThermometer },
                                { label: "Cleanup", value: product.cleanup || (product.technicalSpecs && product.technicalSpecs.cleanup) || 'N/A', icon: FiArchive },
                                { label: "Temperature Range", value: product.temperature_range || (product.technicalSpecs && product.technicalSpecs.temperature_range) || 'N/A', icon: FiThermometer },
                                { label: "Humidity Range", value: product.humidity_range || (product.technicalSpecs && product.technicalSpecs.humidity_range) || 'N/A', icon: FiDroplet },
                                { label: "Surface Preparation", value: product.preparation_instructions || (product.technicalSpecs && product.technicalSpecs.preparation_instructions) || 'N/A', icon: FiInfo }
                            ].filter(spec => spec.value && spec.value !== 'N/A').map((spec, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 hover:bg-[#f8fafc] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#6366f1]" />
                                        <span className="font-semibold text-sm sm:text-base text-[#374151]">{spec.label}</span>
                                    </div>
                                    <span className="text-sm sm:text-base text-[#6b7280] font-medium text-left sm:text-right sm:max-w-xs">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* IMPROVED Safety Information */}
                {SHOW_SAFETY_SECTION && product.safety_warnings && (
                    <div className="mt-8 sm:mt-12 lg:mt-16">
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#493657]/10 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                                <FiAlertCircle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold">Safety Information</h2>
                                    <p className="text-orange-100 mt-1 text-sm sm:text-base">Please read all safety information before use</p>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                                    {/* Hazard Statements */}
                                    {product.safety_warnings.hazard_statements && (
                                        <div>
                                            <h3 className="font-bold text-[#493657] text-lg sm:text-xl mb-4 flex items-center gap-3">
                                                <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#f59e0b]" />
                                                Hazard Statements
                                            </h3>
                                            <div className="space-y-2">
                                                {product.safety_warnings.hazard_statements.map((statement, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#fef3c7] border-l-4 border-[#fbbf24] rounded-r-lg">
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#f59e0b] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <span className="text-white text-xs font-bold">!</span>
                                                        </div>
                                                        <span className="text-[#92400e] font-medium text-xs sm:text-sm">{statement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Precautionary Statements */}
                                    {product.safety_warnings.precautionary_statements && (
                                        <div>
                                            <h3 className="font-bold text-[#493657] text-lg sm:text-xl mb-4 flex items-center gap-3">
                                                <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563eb]" />
                                                Precautionary Statements
                                            </h3>
                                            <div className="space-y-2">
                                                {product.safety_warnings.precautionary_statements.map((statement, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#dbeafe] border-l-4 border-[#60a5fa] rounded-r-lg">
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <FiShield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                                                        </div>
                                                        <span className="text-[#1e40af] font-medium text-xs sm:text-sm">{statement}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* First Aid Measures */}
                                {product.safety_warnings.first_aid && (
                                    <div className="mt-6 sm:mt-8">
                                        <h3 className="font-bold text-[#493657] text-lg sm:text-xl mb-4 sm:mb-6 flex items-center gap-3">
                                            <FiHeart className="w-5 h-5 sm:w-6 sm:h-6 text-[#22c55e]" />
                                            First Aid Measures
                                        </h3>
                                        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                            {product.safety_warnings.first_aid.inhalation && (
                                                <div className="bg-[#f0fdf4] border-l-4 border-[#22c55e] rounded-r-xl p-4 sm:p-5">
                                                    <h4 className="font-bold text-[#166534] mb-2 sm:mb-3 flex items-center gap-2">
                                                        <FiWind className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        Inhalation
                                                    </h4>
                                                    <p className="text-[#166534] text-xs sm:text-sm">{product.safety_warnings.first_aid.inhalation}</p>
                                                </div>
                                            )}
                                            {product.safety_warnings.first_aid.skin_contact && (
                                                <div className="bg-[#f0fdf4] border-l-4 border-[#22c55e] rounded-r-xl p-4 sm:p-5">
                                                    <h4 className="font-bold text-[#166534] mb-2 sm:mb-3 flex items-center gap-2">
                                                        <FiShield className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        Skin Contact
                                                    </h4>
                                                    <p className="text-[#166534] text-xs sm:text-sm">{product.safety_warnings.first_aid.skin_contact}</p>
                                                </div>
                                            )}
                                            {product.safety_warnings.first_aid.eye_contact && (
                                                <div className="bg-[#f0fdf4] border-l-4 border-[#22c55e] rounded-r-xl p-4 sm:p-5">
                                                    <h4 className="font-bold text-[#166534] mb-2 sm:mb-3 flex items-center gap-2">
                                                        <FiInfo className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        Eye Contact
                                                    </h4>
                                                    <p className="text-[#166534] text-xs sm:text-sm">{product.safety_warnings.first_aid.eye_contact}</p>
                                                </div>
                                            )}
                                            {product.safety_warnings.first_aid.ingestion && (
                                                <div className="bg-[#f0fdf4] border-l-4 border-[#22c55e] rounded-r-xl p-4 sm:p-5">
                                                    <h4 className="font-bold text-[#166534] mb-2 sm:mb-3 flex items-center gap-2">
                                                        <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                        Ingestion
                                                    </h4>
                                                    <p className="text-[#166534] text-xs sm:text-sm">{product.safety_warnings.first_aid.ingestion}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ENHANCED Download Documents */}
                <div className="mt-8 sm:mt-12 lg:mt-16">
                    <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-[#493657]/10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#493657] mb-6 sm:mb-8 text-center">Download Documents</h2>
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                            {/* TDS Document */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-[#493657]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FiClipboard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#493657] text-base sm:text-xl mb-1 sm:mb-2">Technical Data Sheet</h3>
                                        <p className="text-[#493657]/70 text-xs sm:text-sm">Product specifications and application details</p>
                                    </div>
                                </div>
                                                                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                    <a href="/Assets/docs/html-templates/calyco-weather-primer-exterior-tds.html" download className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Download TDS
                                    </a>
                                    <a href="/Assets/docs/html-templates/calyco-weather-primer-exterior-tds.html" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                        View TDS
                                    </a>
                                </div>
                            </div>

                            {/* SDS Document */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-[#493657]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#493657] text-base sm:text-xl mb-1 sm:mb-2">Safety Data Sheet</h3>
                                        <p className="text-[#493657]/70 text-xs sm:text-sm">Health and safety information</p>
                                    </div>
                                </div>
                                                                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                                    <a href="/Assets/docs/html-templates/calyco-weather-primer-exterior-sds.html" download className="flex-1 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Download SDS
                                    </a>
                                    <a href="/Assets/docs/html-templates/calyco-weather-primer-exterior-sds.html" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                        View SDS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ENHANCED Features Section - Adapted for Exterior Primer */}
                <motion.div
                    className="mt-8 sm:mt-12 lg:mt-16"
                    variants={itemVariants}
                >
                    <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#493657]/5 via-white to-[#F0C85A]/5 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden border border-[#493657]/10">
                        {/* Premium Background Effects */}
                        <div className="pointer-events-none absolute -top-24 -right-12 w-96 h-96 bg-gradient-to-br from-[#F0C85A]/20 to-[#493657]/10 blur-3xl rounded-full" />
                        <div className="pointer-events-none absolute -bottom-32 -left-10 w-80 h-80 bg-gradient-to-tr from-[#493657]/15 to-[#F0C85A]/10 blur-3xl rounded-full" />
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 blur-2xl rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#493657] mb-3 sm:mb-4 text-center">Premium Features</h2>
                            <p className="text-center text-[#493657]/70 mb-8 sm:mb-12 text-base sm:text-lg">The perfect foundation for exterior durability</p>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:gap-8">
                                {/* Feature 1: Extreme Adhesion */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC107] via-[#FFD54F] to-[#FFEB3B] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiLayers className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Extreme Adhesion</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Bonds powerfully to masonry and concrete, preventing peeling and flaking.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#FFC107] to-[#FFC107]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 2: Alkali Shield */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#673AB7] via-[#7E57C2] to-[#9575CD] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiShield className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Alkali Shield</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Superior resistance to alkali attack and efflorescence from cement surfaces.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#673AB7] to-[#673AB7]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 3: Weather Protection */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4CAF50] via-[#66BB6A] to-[#81C784] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiSun className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Weather Protection</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Engineered to withstand harsh sunlight, rain, and temperature fluctuations.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 4: Anti-Algal */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#00BCD4] via-[#26C6DA] to-[#4DD0E1] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiWind className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Anti-Algal</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Resists fungal and algal growth, keeping exterior walls clean and fresh.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#00BCD4] to-[#00BCD4]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* You Might Also Like Section */}
                <motion.div
                    className="relative mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-8"
                    variants={itemVariants}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/10 to-transparent rounded-2xl sm:rounded-3xl blur-2xl opacity-80 pointer-events-none" />

                    <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl px-4 py-6 sm:px-6 sm:py-10 md:px-10">
                        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-10 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#493657]">You might also like</h2>
                                <p className="text-sm md:text-base text-[#493657]/70 mt-2">Pair your exterior primer with top-tier finish coats.</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-medium text-[#493657]/60 uppercase tracking-[0.2em] w-fit">
                                <span className="w-2 h-2 rounded-full bg-[#F0C85A]" />
                                Calyco picks
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                            {/* Luxury Exterior Emulsion Card */}
                            <Link to="/product/Luxury-Exterior-Emulsion" className="group h-full">
                                <div className="relative h-full rounded-xl sm:rounded-2xl bg-white shadow-lg border border-[#493657]/15 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F0C85A] to-[#493657] opacity-90" />

                                    <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4 sm:gap-6">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                                            <img
                                                src="/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.webp"
                                                alt="Luxury Exterior Emulsion"
                                                className="w-full h-full object-contain drop-shadow-lg"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                                                <span className="inline-flex items-center gap-2 bg-[#493657] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md w-fit mx-auto sm:mx-0">
                                                    <FiShield className="w-3 h-3" />
                                                    Climate ready
                                                </span>
                                                <button className="flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] transition-colors text-sm font-medium w-fit mx-auto sm:mx-0">
                                                    <FiHeart className="w-4 h-4" />
                                                    Favourite
                                                </button>
                                            </div>
                                            
                                            <h3 className="text-lg sm:text-xl font-semibold text-[#493657] mb-2">Luxury Exterior Emulsion</h3>
                                            <p className="text-sm text-[#493657]/70 leading-relaxed mb-3">High-performance exterior emulsion designed for maximum UV and rain defence.</p>
                                            <p className="text-xs text-[#493657]/55 mb-3">Pack sizes: 1 L, 4 L, 10 L, 20 L</p>
                                            
                                            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1">
                                                <span className="text-xs uppercase tracking-wide text-[#493657]/60">Starts at</span>
                                                <span className="text-base line-through text-gray-400">₹850</span>
                                                <span className="text-xl sm:text-2xl font-bold text-[#493657]">₹700</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Waterproofing Sealer Card */}
                            <Link to="/product/waterproofing-sealer" className="group h-full">
                                <div className="relative h-full rounded-xl sm:rounded-2xl bg-white shadow-lg border border-[#493657]/15 overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#493657] to-[#F0C85A] opacity-90" />

                                    <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4 sm:gap-6">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                                            <img
                                                src="/Assets/Product Images/Waterproof Sealer/waterproof-bucket-png.webp"
                                                alt="Waterproofing Sealer"
                                                className="w-full h-full object-contain drop-shadow-lg"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                                                <span className="inline-flex items-center gap-2 bg-[#493657] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md w-fit mx-auto sm:mx-0">
                                                    <FiShield className="w-3 h-3" />
                                                    Surface guard
                                                </span>
                                                <button className="flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] transition-colors text-sm font-medium w-fit mx-auto sm:mx-0">
                                                    <FiHeart className="w-4 h-4" />
                                                    Favourite
                                                </button>
                                            </div>
                                            
                                            <h3 className="text-lg sm:text-xl font-semibold text-[#493657] mb-2">Waterproofing Sealer</h3>
                                            <p className="text-sm text-[#493657]/70 leading-relaxed mb-3">Flexible, breathable membrane that keeps moisture out on every surface.</p>
                                            <p className="text-xs text-[#493657]/55 mb-3">Pack sizes: 1 L, 4 L, 10 L, 20 L</p>
                                            
                                            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1">
                                                <span className="text-xs uppercase tracking-wide text-[#493657]/60">Starts at</span>
                                                <span className="text-base line-through text-gray-400">₹850</span>
                                                <span className="text-xl sm:text-2xl font-bold text-[#493657]">₹700</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </motion.div>

            </motion.section>

            {/* Reviews Section - MOBILE RESPONSIVE */}
            {productReviews.length > 0 && (
                <div className="mt-6 sm:mt-8">
                    <ReviewsSection
                        reviews={productReviews}
                        productName={product.name}
                    />
                </div>
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

export default CalycoWeatherPrimerExterior;
