import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { 
  FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, 
  FiPackage, FiShield, FiArchive, FiAlertCircle, FiInfo, FiCalendar, 
  FiHeart, FiChevronLeft, FiChevronRight, FiWind, FiDownload, FiClock, 
  FiThermometer, FiAlertTriangle, FiAnchor, FiTool, FiTarget 
} from 'react-icons/fi';
import { useCart } from "../context/CartContext"; 
import CartPopup from "../components/CartPopup"; 
import RatingStars from "../components/RatingStars"; 
import ReviewsSection from "../components/ReviewsSection"; 
import { getProductReviews, getAverageRating, getTotalReviews } from "../data/productReviews";
import { calycoColors as colorData } from "../data/calycoColors.js";

// --- DATA DEFINITION FOR RED OXIDE ZINC CHROMATE ---
const redOxideDetail = {
  id: "red-oxide-zinc-chromate",
  name: "Calyco Red Oxide Zinc Chromate Primer",
  slug: "red-oxide-zinc-chromate",
  image: "/Assets/Product%20Images/Red%20Oxide%20Zinc%20Chromate%20Primer/red-oxide-zinc-chromate-primer.webp", 
  images: ["/Assets/Product%20Images/Red%20Oxide%20Zinc%20Chromate%20Primer/red-oxide-zinc-chromate-primer.webp"],
  description: "A solvent-based metal primer that harnesses the combined protection of red oxide and zinc chromate pigments. It provides powerful dual-action anti-corrosive protection for industrial, marine, and architectural metal applications.",
  tagline: "Dual-pigment defence for metal longevity.",
  details: "Calyco Red Oxide Zinc Chromate Primer is the heavy-duty choice for iron and steel. By combining the barrier protection of Red Oxide with the active corrosion-inhibiting properties of Zinc Chromate, it ensures a bond that withstands harsh weather and industrial environments significantly better than standard primers.",
  finish_type_sheen: ["Matt"],
  defaultFinish: "Matt",
  packaging: ["1L", "4L", "10L", "20L"],
  // Selling Price (based on provided MRP)
  priceByFinish: {
    "Matt": {
      "1L": 240,
      "4L": 880,
      "10L": 2000,
      "20L": 3680,
    }
  },
  features: [
    "Dual Pigment (Red Oxide + Zinc)",
    "Superior Rust Guard",
    "Strong Mechanical Bond",
    "Weather Resistant",
    "Heavy Duty Industrial Grade"
  ],
  advantages: [
    "Powerful anti-corrosive dual pigments",
    "Excellent adhesion to metal surfaces",
    "Durable and weather resistant",
    "Compatible with multiple topcoats",
    "Provides long-lasting rust protection",
    "Suitable for harsh environments"
  ],
  application: ["Steel Structures", "Pipelines", "Metal Fabrications", "Industrial Metalwork"],
  recommended_uses: ["Equipment & Machinery", "Iron Railings", "Marine Applications", "Structural Steel"],
  substrate: ["Iron", "Steel", "Ferrous Metals"],
  coats_required: "2 coats",
  coverage: "120-140 sq.ft./L",
  technicalSpecs: {
    product_code: "CAL-PRM-016",
    base_type: "Alkyd resin (Red Oxide & Zinc Chromate)",
    voc_content: "≈ 450 g/L",
    dryingTime: "4 hours (Touch Dry)",
    recoatTime: "8 hours",
    full_cure: "24 hours",
    application_instructions: "Stir thoroughly. Thin 10-20% with mineral turpentine. Apply 2 coats via brush/spray.",
    shelf_life: "3 Years (Warranty)",
    storage_temp: "Cool, dry place (Flammable)",
    cleanup: "Mineral Turpentine",
    preparation_instructions: "Clean to bare metal (SA 2.5 preferred). Remove rust/scale/grease. Apply within 4-6 hours of cleaning."
  },
  safety_warnings: {
    hazard_statements: [
      "DANGER: Contains chromate pigments (Health Hazard).",
      "Highly Flammable liquid and vapour.",
      "May cause sensitization by skin contact.",
      "Toxic to aquatic life."
    ],
    precautionary_statements: [
      "Avoid inhalation of dust and spray mist.",
      "Use with adequate ventilation - mandatory for enclosed spaces.",
      "Wear protective gloves, goggles, and respirator.",
      "Keep away from heat, sparks, and open flames."
    ],
    first_aid: {
        inhalation: "Move to fresh air. If breathing is irregular, seek medical advice.",
        skin_contact: "Wash with soap and water. Remove contaminated clothing.",
        eye_contact: "Rinse cautiously with water for several minutes. Get medical attention.",
        ingestion: "Seek immediate medical attention. Do NOT induce vomiting."
    }
  }
};

// Simulated Higher "Market Price" (~15-20% markup)
const RED_OXIDE_MRP = {
  'Matt': {
    '1L': 290,
    '4L': 1050,
    '10L': 2400,
    '20L': 4450,
  },
};

const SHOW_SAFETY_SECTION = false;
const ALLOW_COLOR_MIXING = false; // Red Oxide is always Red/Brown

const slugify = (value) =>
  value
    ? value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

const RedOxideZincChromate = () => {
    // Logic for colors - Standard Red Oxide color
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

    const [selectedSheen, setSelectedSheen] = useState("Matt");
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

    // Sticky Scroll Logic
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

            const topOffset = 96; 

            const resetStyles = () => {
                stickyEl.style.position = "relative";
                stickyEl.style.top = "0px";
                stickyEl.style.left = "0px";
                stickyEl.style.width = "100%";
                stickyEl.style.zIndex = "";
            };

            const updateWrapperHeight = () => {
                if (wrapper && rightEl) {
                    if (window.innerWidth >= 1024) { 
                        wrapper.style.minHeight = `${rightEl.offsetHeight}px`;
                    } else {
                        wrapper.style.minHeight = "";
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

    // Color Selection Logic
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

    const normalizedSelectedSheen = selectedSheen || product?.defaultFinish || "Matt";

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

    // Calculate MRP
    const calculateMRP = (sizeLabel) => {
        const mrpData = RED_OXIDE_MRP[normalizedSelectedSheen];
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
        setProduct(redOxideDetail);
        setSelectedSheen(redOxideDetail.defaultFinish || "Matt");

        const finishPricing = (redOxideDetail.priceByFinish || redOxideDetail.price_by_finish || {})["Matt"];
        if (finishPricing && typeof finishPricing === "object") {
            const sizeKeys = Object.keys(finishPricing);
            if (sizeKeys.length > 0) {
                setSelectedSize(sizeKeys[0]);
            } else if (redOxideDetail.packaging && redOxideDetail.packaging.length > 0) {
                setSelectedSize(redOxideDetail.packaging[0]);
            }
        } else if (redOxideDetail.packaging && redOxideDetail.packaging.length > 0) {
            setSelectedSize(redOxideDetail.packaging[0]);
        }

        if (Array.isArray(redOxideDetail.images) && redOxideDetail.images.length > 0) {
            setSelectedImage(redOxideDetail.images[0]);
            setSelectedImageIndex(0);
        } else {
            setSelectedImage(redOxideDetail.image);
            setSelectedImageIndex(0);
        }
        document.title = redOxideDetail.name;
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
            'primer', 
            {
                variantId,
                productType: 'primer',
            }
        );
        setCartPopup({
            isVisible: true,
            item: {
                name: product.name,
                hex: "#5B2C87", // Red Oxide Color
                colorName: "Red Oxide",
                colorFamily: "Primer",
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
                                        if (!e.target.src.includes("placeholder")) {
                                            e.target.src = "https://placehold.co/600x600/7F2B2B/FFFFFF?text=Red+Oxide+Zinc";
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
                                                selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
                                            }`}
                                            aria-label="Previous image"
                                        >
                                            <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#493657]" />
                                        </button>

                                        <button
                                            onClick={handleNextImage}
                                            disabled={selectedImageIndex === product.images.length - 1}
                                            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                selectedImageIndex === product.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
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
                                                idx === selectedImageIndex ? 'bg-[#5B2C87] w-6 sm:w-8' : 'bg-[#493657]/20 hover:bg-[#493657]/40'
                                            }`}
                                            aria-label={`View image ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
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

                        {/* Reviews */}
                        {totalReviews > 0 && (
                          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#493657]/20 rounded-lg px-3 sm:px-4 py-2 w-fit">
                              <RatingStars
                                rating={averageRating}
                                totalReviews={0}
                                onClick={scrollToReviews}
                                size="md"
                              />
                            </div>
                            <span className="text-sm sm:text-base text-[#493657] font-medium cursor-pointer hover:text-[#5B2C87]" onClick={scrollToReviews}>
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

                        {/* Pricing */}
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

                        {/* Bullet Points */}
                        {Array.isArray(product.features) && product.features.length > 0 && (
                          <div className="my-2">
                            <div className="bg-gradient-to-br from-[#5B2C87]/10 to-[#493657]/5 rounded-xl border-2 border-[#5B2C87]/20 p-4 sm:p-6 shadow-md">
                              <ul className="space-y-2 sm:space-y-3">
                                {product.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-3">
                                    <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B2C87] mt-0.5 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-bold text-[#493657]">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {/* 3 Feature Cards - Red Oxide Specific */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-3">
                          <div className="bg-[#5B2C87] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiTarget className="w-6 h-6 sm:w-7 sm:h-7 text-[#5B2C87]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Dual Pigment</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Red Oxide + Zinc</p>
                          </div>
                          <div className="bg-[#5B2C87] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiShield className="w-6 h-6 sm:w-7 sm:h-7 text-[#5B2C87]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Rust Guard</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Anti-corrosive</p>
                          </div>
                          <div className="bg-[#4b5563] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                              <FiTool className="w-6 h-6 sm:w-7 sm:h-7 text-[#4b5563]" />
                            </div>
                            <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Heavy Duty</h4>
                            <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Industrial Use</p>
                          </div>
                        </div>

                        {/* Product Selectors */}
                        <div className="space-y-4 sm:space-y-6">
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
                                            ? "border-[#5B2C87] bg-[#5B2C87]/10 text-[#493657]"
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
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#5B2C87] to-[#991b1b] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-[#493657] text-base sm:text-lg">Key Benefits</h3>
                                    </div>
                                    
                                    <div className="space-y-3 sm:space-y-4">
                                        {Array.isArray(product.advantages) && product.advantages.length > 0 ? (
                                            product.advantages.map((adv, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-[#f8fafc] rounded-lg border-l-4 border-[#5B2C87]">
                                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#5B2C87] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                    </div>
                                                    <span className="text-sm sm:text-base text-[#493657] font-medium leading-relaxed text-left">{adv}</span>
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
                        <div className="bg-gradient-to-r from-[#5B2C87] via-[#991b1b] to-[#450a0a] text-white p-4 sm:p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20"></div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-center relative z-10 text-white drop-shadow-lg">Specifications</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-[#e2e8f0]">
                            {[
                                { label: "Category", value: "Metal Primer", icon: FiTag },
                                { label: "Application Areas", value: Array.isArray(product.application) ? product.application.join(', ') : (product.application || 'N/A'), icon: FiClipboard },
                                { label: "Recommended Uses", value: Array.isArray(product.recommended_uses) ? product.recommended_uses.join(', ') : (product.recommended_uses || 'N/A'), icon: FiList },
                                { label: "Finish / Sheen", value: Array.isArray(product.finish_type_sheen) ? product.finish_type_sheen.join(', ') : (product.finish_type_sheen || 'N/A'), icon: FiDroplet },
                                { label: "Surface Compatibility", value: Array.isArray(product.substrate) ? product.substrate.join(', ') : (product.substrate || 'N/A'), icon: FiLayers },
                                { label: "Coats Required", value: product.coats_required || 'N/A', icon: FiCheckCircle },
                                { label: "Coverage", value: product.coverage || 'N/A', icon: FiBox }
                            ].map((spec, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 hover:bg-[#f8fafc] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B2C87]" />
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
                        <div className="bg-gradient-to-r from-[#5B2C87] via-[#991b1b] to-[#450a0a] text-white p-4 sm:p-6 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-black/20"></div>
                            <h2 className="text-2xl sm:text-3xl font-bold relative z-10 text-white drop-shadow-lg">Technical Specifications</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-px bg-[#e2e8f0]">
                            {[
                                { label: "Product Code", value: product.technicalSpecs?.product_code, icon: FiTag },
                                { label: "Base Type", value: product.technicalSpecs?.base_type, icon: FiBox },
                                { label: "VOC Content", value: product.technicalSpecs?.voc_content, icon: FiShield },
                                { label: "Drying Time", value: product.technicalSpecs?.dryingTime, icon: FiClock },
                                { label: "Recoat Time", value: product.technicalSpecs?.recoatTime, icon: FiList },
                                { label: "Full Cure", value: product.technicalSpecs?.full_cure, icon: FiCalendar },
                                { label: "Shelf Life", value: product.technicalSpecs?.shelf_life, icon: FiCalendar },
                                { label: "Storage Temperature", value: product.technicalSpecs?.storage_temp, icon: FiPackage },
                                { label: "Cleanup", value: product.technicalSpecs?.cleanup, icon: FiArchive },
                                { label: "Application Instructions", value: product.technicalSpecs?.application_instructions, icon: FiClipboard },
                                { label: "Surface Preparation", value: product.technicalSpecs?.preparation_instructions, icon: FiInfo }
                            ].filter(spec => spec.value && spec.value !== 'N/A').map((spec, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 hover:bg-[#f8fafc] transition-colors">
                                    <div className="flex items-center gap-3">
                                        <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#5B2C87]" />
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
                            <div className="bg-gradient-to-r from-[#dc2626] to-[#7f1d1d] text-white p-4 sm:p-6 flex items-center gap-3 sm:gap-4">
                                <FiAlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold">Safety Information</h2>
                                    <p className="text-red-100 mt-1 text-sm sm:text-base">Contains Chromate Pigments - Please read carefully</p>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 lg:p-8">
                                <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                                    {/* Hazard Statements */}
                                    {product.safety_warnings.hazard_statements && (
                                        <div>
                                            <h3 className="font-bold text-[#493657] text-lg sm:text-xl mb-4 flex items-center gap-3">
                                                <FiAlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#dc2626]" />
                                                Hazard Statements
                                            </h3>
                                            <div className="space-y-2">
                                                {product.safety_warnings.hazard_statements.map((statement, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-[#fef2f2] border-l-4 border-[#dc2626] rounded-r-lg">
                                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#dc2626] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                            <span className="text-white text-xs font-bold">!</span>
                                                        </div>
                                                        <span className="text-[#991b1b] font-medium text-xs sm:text-sm">{statement}</span>
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

                {/* ENHANCED Download Documents - Placeholder Links */}
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
                                <a
                                    href="/Assets/docs/html-templates/calyco-red-oxide-zinc-tds.html"
                                    download
                                    className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold group-hover:scale-102 text-sm sm:text-base"
                                >
                                    <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Download TDS
                                </a>
                            </div>

                            {/* SDS Document */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-[#493657]/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5B2C87] to-[#2D1B69] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#493657] text-base sm:text-xl mb-1 sm:mb-2">Safety Data Sheet</h3>
                                        <p className="text-[#493657]/70 text-xs sm:text-sm">Health and safety information</p>
                                    </div>
                                </div>
                                <a
                                    href="/Assets/docs/html-templates/calyco-red-oxide-zinc-sds.html"
                                    download
                                    className="w-full bg-gradient-to-r from-[#5B2C87] to-[#2D1B69] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold group-hover:scale-102 text-sm sm:text-base"
                                >
                                    <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Download SDS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ENHANCED Features Section - Adapted for Red Oxide Zinc Chromate */}
                <motion.div
                    className="mt-8 sm:mt-12 lg:mt-16"
                    variants={itemVariants}
                >
                    <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#5B2C87]/5 via-white to-[#493657]/5 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden border border-[#493657]/10">
                        {/* Premium Background Effects - Rust/Red Tones */}
                        <div className="pointer-events-none absolute -top-24 -right-12 w-96 h-96 bg-gradient-to-br from-[#5B2C87]/20 to-[#493657]/10 blur-3xl rounded-full" />
                        <div className="pointer-events-none absolute -bottom-32 -left-10 w-80 h-80 bg-gradient-to-tr from-[#493657]/15 to-[#5B2C87]/10 blur-3xl rounded-full" />
                        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#991b1b]/10 to-[#7f1d1d]/10 blur-2xl rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#493657] mb-3 sm:mb-4 text-center">Double Defence</h2>
                            <p className="text-center text-[#493657]/70 mb-8 sm:mb-12 text-base sm:text-lg">Red Oxide + Zinc Chromate for maximum metal life</p>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:gap-8">
                                {/* Feature 1: Dual Pigment */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#5B2C87] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5B2C87] via-[#991b1b] to-[#450a0a] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiTarget className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Dual Pigment</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Combines Red Oxide barrier protection with Zinc Chromate active rust inhibition.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#5B2C87] to-[#5B2C87]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 2: Rust Guard */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#5B2C87] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#5B2C87] via-[#2D1B69] to-[#9a3412] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiShield className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Rust Guard</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Forms an impenetrable shield that prevents moisture and oxygen from corroding the metal.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#5B2C87] to-[#5B2C87]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 3: Strong Bond */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#5B2C87] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#6366f1] via-[#818cf8] to-[#a5b4fc] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiAnchor className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Strong Bond</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Alkyd resin ensures excellent adhesion to both clean metal and the subsequent topcoat.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#6366f1] to-[#6366f1]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>

                                {/* Feature 4: Industrial Grade */}
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#5B2C87] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4b5563] via-[#6b7280] to-[#9ca3af] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiTool className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Industrial Grade</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Formulated for demanding environments including factories, bridges, and marine structures.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#4b5563] to-[#4b5563]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
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
                                <p className="text-sm md:text-base text-[#493657]/70 mt-2">Finish your metal project with our premium paints.</p>
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
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                                            <img
                                                src="/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.png"
                                                alt="Luxury Exterior Emulsion"
                                                className="w-full h-full object-contain drop-shadow-lg"
                                            />
                                        </div>
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
                                        <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32">
                                            <img
                                                src="/Assets/Product Images/Waterproof Sealer/waterproof-bucket-png.png"
                                                alt="Waterproofing Sealer"
                                                className="w-full h-full object-contain drop-shadow-lg"
                                            />
                                        </div>
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

            {/* Reviews Section */}
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

export default RedOxideZincChromate;
