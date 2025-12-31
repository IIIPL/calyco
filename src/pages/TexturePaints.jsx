import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiBox, FiPackage, FiClock, FiShield, FiWind, FiTag, FiClipboard, FiRepeat, FiList, FiDroplet, FiLayers, FiCalendar, FiThermometer, FiArchive, FiInfo, FiDownload, FiHeart, FiExternalLink } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import CartPopup from "../components/CartPopup";
import RatingStars from "../components/RatingStars";
import ReviewsSection from "../components/ReviewsSection";
import textures from "../data/textures"; // Assuming this exists based on your provided file

// Product Data for Texture Paint
const texturePaintDetail = {
  id: "calyco-texture-paint",
  name: "Calyco Texture Paint",
  slug: "calyco-texture-paint",
  productType: "texture",
  image: "/Assets/Product Images/Texture Paints/texture-paints.webp",
  images: [
    "/Assets/Product Images/Texture Paints/texture-paints.webp",
  ],
  tagline: "Transform your spaces with timeless artistry and unmatched durability.",
  description: "A premium decorative cement-based texture coating specially formulated to transform plain walls into artistic surfaces. Enriched with high-quality mineral aggregates and polymers, it provides a tough, weather-resistant shield that effectively hides surface undulations and hairline cracks. This durable finish adds rich depth, character, and dimension to your spaces while offering superior protection against algae and harsh weather.",
  finish_type_sheen: ["Decorative Wall Finish"],
  defaultFinish: "Decorative Wall Finish",
  packaging: ["5 kg (Sample)", "20 kg", "30 kg", "40 kg"],
  sizes: [
    { size: "5 kg (Sample)", price: 190, mrp: 300 },
    { size: "20 kg", price: 650, mrp: 900 },
    { size: "30 kg", price: 950, mrp: 1350 },
    { size: "40 kg", price: 1250, mrp: 1750 },
  ],
  price: 190,
  features: [
    "Weather proof",
    "Hides cracks & surface undulations",
    "Strong adhesion to mineral substrates",
    "Anti-algae protection",
    "Interior & exterior use",
  ],
  advantages: [
    "Adds depth and dimension with artistic textures",
    "Tough, weather-resistant finish",
    "Masks minor plaster defects and hairline cracks",
    "Resists algae growth for long-term cleanliness",
  ],
  application: ["Interior walls", "Exterior facades", "Feature walls", "Boundary walls", "Commercial spaces"],
  recommended_uses: [
    "Exterior facades",
    "Feature walls",
    "Boundary walls",
    "Commercial spaces",
    "Uneven surfaces",
  ],
  coats_required: "1-2 coats (depending on pattern depth)",
  coverage: "3.5 - 4.5 sq.ft./kg (varies by texture depth)",
  technicalSpecs: {
    product_code: "CAL-TXT-CEM-001",
    base_type: "Cement-based texture coating",
    voc_content: "Low VOC",
    dryingTime: "Touch dry: 1-2 hours",
    recoatTime: "Patterning window: 10-15 minutes while wet",
    application_instructions: "Mix 1 kg powder with 200-300 ml clean water. Apply with trowel/roller/spray.",
    shelf_life: "12 Months",
    storage_temp: "Cool, dry place",
    cleanup: "Clean water",
    volume_solids: "N/A",
    pH: "10-12",
  },
};

const seededReviews = [
  { name: "Pooja Sharma", rating: 5, date: "2024-11-02", review: "Applied on my drawing room wall, texture look very premium. Neighbours keep asking brand, quite happy!" },
  { name: "Amit Verma", rating: 4, date: "2024-10-18", review: "Good finish and hide cracks nicely. little more effort in mixing but result worth it." },
  { name: "Rajesh Patil", rating: 5, date: "2024-09-29", review: "Used on exterior gate wall, holding well in rain. colour depth is strong and no algae till now." },
  { name: "Sunita Nair", rating: 4, date: "2024-08-14", review: "Easy trowel application, needs some practice for pattern but once done looks like designer wall. Kids love it." },
  { name: "Deepak Yadav", rating: 5, date: "2024-07-22", review: "Value for money texture. Bag quality and coverage as promised, didn't feel cheated like other brands." },
  { name: "Meena Iyer", rating: 4, date: "2024-06-30", review: "Covers undulations nicely. Drying time ok in monsoon also. Slight smell while mixing but goes off fast." },
];

const slugify = (value) =>
  value
    ? value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

const TexturePaints = () => {
    // 1. Prepare Texture Data (Simulating Color Families)
    const textureFamilies = useMemo(() => {
        // Grouping textures into a single "Collection" for the UI structure
        // or using the imported 'textures' array directly
        const allTextures = (textures || []).map(t => ({
            name: t.name || t.textureName || "Texture",
            hex: "#D3D3D3", // Placeholder color for the circle
            image: t.image || t.thumbnail,
            code: slugify(t.name || t.textureName)
        }));

        return [{
            code: "standard-textures",
            label: "Standard Patterns",
            colors: allTextures.length > 0 ? allTextures : [{ name: "Rustic", hex: "#D3D3D3" }, { name: "Dholpur", hex: "#C0C0C0" }] 
        }];
    }, []);

    const [selectedSheen, setSelectedSheen] = useState("Decorative Wall Finish");
    const [selectedSize, setSelectedSize] = useState("5 kg (Sample)");
    
    // Quantity & Product State
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Cart & UI State
    const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
    const { addToCart, goToCheckout } = useCart();
    
    // Image Gallery State
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Texture Selection State
    const [selectedColorFamily, setSelectedColorFamily] = useState("standard-textures");
    const [selectedColor, setSelectedColor] = useState(null);
    
    // Refs for Sticky Scroll
    const leftColumnWrapperRef = useRef(null);
    const stickyImageRef = useRef(null);
    const rightColumnRef = useRef(null);

    const activeTextureFamily = textureFamilies.find((family) => family.code === selectedColorFamily);
    const availableTextures = activeTextureFamily?.colors || [];

    // Reviews data (seeded for launch)
    const productReviews = seededReviews;
    const averageRating = productReviews.length
        ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
        : 0;
    const totalReviews = productReviews.length;

    // Scroll to reviews
    const scrollToReviews = () => {
        const reviewsSection = document.getElementById('reviews-section');
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- Touch & Image Logic (Identical to Template) ---
    const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
    const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (product?.images && product.images.length > 0) {
            if (distance > 50 && selectedImageIndex < product.images.length - 1) {
                const nextIndex = selectedImageIndex + 1;
                setSelectedImageIndex(nextIndex);
                setSelectedImage(product.images[nextIndex]);
            }
            if (distance < -50 && selectedImageIndex > 0) {
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

    // --- Sticky Scroll Logic (Identical to Template) ---
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
                if (resizeObserver) resizeObserver.disconnect();
                resetStyles();
                if (wrapper) wrapper.style.minHeight = "";
            };
        };

        setup();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            cleanupFn();
        };
    }, [product?.id, selectedSheen, selectedSize, selectedColor?.name, selectedColorFamily, quantity]);

    // --- Data Initialization ---
    useEffect(() => {
        setProduct(texturePaintDetail);
        
        // Select first texture by default
        if (textureFamilies.length > 0 && textureFamilies[0].colors.length > 0) {
            setSelectedColor(textureFamilies[0].colors[0]);
        }

        if (Array.isArray(texturePaintDetail.images) && texturePaintDetail.images.length > 0) {
            setSelectedImage(texturePaintDetail.images[0]);
            setSelectedImageIndex(0);
        } else {
            setSelectedImage(texturePaintDetail.image);
            setSelectedImageIndex(0);
        }
        document.title = texturePaintDetail.name;
        setLoading(false);
    }, [textureFamilies]);

    // --- Selection Logic for Textures ---
    useEffect(() => {
        if (!activeTextureFamily || !Array.isArray(activeTextureFamily.colors) || activeTextureFamily.colors.length === 0) {
            if (selectedColor !== null) setSelectedColor(null);
            return;
        }
        const hasSelected = activeTextureFamily.colors.some(
            (c) => c.name === selectedColor?.name
        );
        if (!hasSelected) {
            setSelectedColor(activeTextureFamily.colors[0]);
        }
    }, [activeTextureFamily, selectedColor]);

    // Pricing Logic (Fixed for Texture)
    const currentSizeObj =
        (texturePaintDetail.sizes || []).find((s) => s.size === selectedSize) ||
        (texturePaintDetail.sizes || [])[0];
    const displayPriceValue = currentSizeObj?.price ?? texturePaintDetail.price; 
    const displayMRPValue = currentSizeObj?.mrp ?? 0;
    const formatINR = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

    // Add to Cart
    const handleAddToCart = () => {
        addToCart(
            product,
            selectedSheen,
            selectedSize,
            quantity,
            displayPriceValue,
            selectedColor || null, // capture selected texture pattern
            'texture', // productType
            {} // No mixing mode for texture paints
        );
        setCartPopup({
            isVisible: true,
            item: {
                name: product.name,
                hex: "#cccccc",
                colorName: selectedColor?.name || null,
                colorFamily: selectedColor?.family || null,
                selectedSheen,
                selectedSize,
                quantity,
                price: formatINR(displayPriceValue * quantity),
            },
        });
        setTimeout(() => {
            setCartPopup({ isVisible: false, item: null });
        }, 3000);
    };

    const closeCartPopup = () => setCartPopup({ isVisible: false, item: null });
    const handleContinueShopping = () => setCartPopup({ isVisible: false, item: null });
    const handleCheckout = async () => {
        setCartPopup({ isVisible: false, item: null });
        await goToCheckout();
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

    if (!product) return null;

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
                <motion.div className="flex items-center gap-2 text-xs sm:text-sm text-[#493657]/60 mb-4 sm:mb-6" variants={itemVariants}>
                    <Link to="/" className="hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-[#493657] transition-colors" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Products</Link>
                    <span>/</span>
                    <span className="text-[#493657] font-medium truncate">{product.name}</span>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-16 items-start">
                    {/* LEFT SIDE - Product Image Gallery (Sticky) */}
                    <div ref={leftColumnWrapperRef} className="relative w-full">
                        <motion.div ref={stickyImageRef} className="w-full" variants={itemVariants}>
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
                                        width="800"
                                        height="800"
                                        loading="eager"
                                        className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[700px] object-contain rounded-lg sm:rounded-xl"
                                    />
                                    {product.images && product.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePrevImage}
                                                disabled={selectedImageIndex === 0}
                                                className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                                            >
                                                <FiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#493657]" />
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                disabled={selectedImageIndex === product.images.length - 1}
                                                className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${selectedImageIndex === product.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
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
                                                onClick={() => { setSelectedImageIndex(idx); setSelectedImage(product.images[idx]); }}
                                                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 ${idx === selectedImageIndex ? 'bg-[#F0C85A] w-6 sm:w-8' : 'bg-[#493657]/20 hover:bg-[#493657]/40'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Gallery */}
                            {Array.isArray(product.images) && product.images.length > 1 && (
                                <div className="w-full mt-4 sm:mt-6 overflow-hidden">
                                    <div className="flex gap-2 sm:gap-3 transition-transform duration-500 ease-in-out">
                                        {product.images.map((img, idx) => (
                                            <button
                                                key={img + idx}
                                                onClick={() => { setSelectedImage(img); setSelectedImageIndex(idx); }}
                                                className={`rounded-md sm:rounded-lg p-1.5 sm:p-2 transition-all duration-200 focus:outline-none flex-shrink-0 w-20 sm:w-24 ${selectedImageIndex === idx ? 'bg-[#F0C85A]/10' : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                <img src={img} alt={`View ${idx + 1}`} className="w-full h-16 sm:h-20 object-contain" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* RIGHT SIDE - Product Information */}
                    <motion.div ref={rightColumnRef} className="w-full flex flex-col gap-4 sm:gap-6 lg:pt-8 mt-2 sm:mt-4 lg:mt-0" variants={itemVariants}>
                        {/* Product Title */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#493657] leading-tight">{product.name}</h1>

                        {/* Reviews Summary */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                            <div className="inline-flex items-center gap-2 bg-white border-2 border-[#493657]/20 rounded-lg px-3 sm:px-4 py-2 w-fit">
                                <RatingStars rating={averageRating} totalReviews={totalReviews} onClick={scrollToReviews} size="md" />
                            </div>
                            <span className="text-sm sm:text-base text-[#493657] font-medium cursor-pointer hover:text-[#F0C85A]" onClick={scrollToReviews}>
                                {averageRating.toFixed(1)}/5 ({totalReviews} reviews)
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-base sm:text-lg text-[#493657]/80 leading-relaxed">
                            {product.tagline || product.description}
                        </p>

                        {/* Pricing */}
                        <div className="flex flex-col items-start gap-2">
                            <span className="inline-flex items-center rounded-md bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
                                Sale is Live
                            </span>
                            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(displayPriceValue)}</span>
                                {displayMRPValue && (
                                    <span className="text-base sm:text-lg text-red-500 line-through">
                                        {formatINR(displayMRPValue)}
                                    </span>
                                )}
                                <span className="text-xs sm:text-sm text-[#493657]/60">
                                    per {selectedSize || product?.sizes?.[0]?.size || "unit"}
                                </span>
                            </div>
                        </div>

                        {/* Bullet Points */}
                        {Array.isArray(product.features) && (
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

                        {/* 3 Feature Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 my-3">
                            <div className="bg-[#00BCD4] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                                    <FiBox className="w-6 h-6 sm:w-7 sm:h-7 text-[#00BCD4]" />
                                </div>
                                <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Hides Cracks</h4>
                                <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Smooth finish</p>
                            </div>
                            <div className="bg-[#FF9500] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                                    <FiShield className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF9500]" />
                                </div>
                                <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Weather Proof</h4>
                                <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Exterior protection</p>
                            </div>
                            <div className="bg-[#34C759] rounded-xl p-4 sm:p-5 text-center shadow-lg border border-[#493657]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-md">
                                    <FiClock className="w-6 h-6 sm:w-7 sm:h-7 text-[#34C759]" />
                                </div>
                                <h4 className="font-bold text-white text-sm sm:text-base mb-1 drop-shadow-sm">Long Lasting</h4>
                                <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow-sm">Durable bond</p>
                            </div>
                        </div>

                        {/* Product Selectors */}
                        <div className="space-y-4 sm:space-y-6">
                            {/* Sheen */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Finish Type</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 sm:px-4 py-2 rounded-lg border border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657] text-sm sm:text-base">
                                        Matt / Rustic Texture
                                    </button>
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(product?.sizes || []).map((sizeObj) => {
                                        const isActive = selectedSize === sizeObj.size;
                                        return (
                                            <button
                                                key={sizeObj.size}
                                                type="button"
                                                onClick={() => setSelectedSize(sizeObj.size)}
                                                className={`px-3 sm:px-4 py-2 rounded-lg border text-sm sm:text-base transition ${
                                                    isActive
                                                        ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                                        : "border-[#493657]/20 text-[#493657] hover:border-[#493657]/40"
                                                }`}
                                            >
                                                {sizeObj.size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Texture Selector (Replaces Color Family) */}
                            {availableTextures.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-[#493657] mb-3 text-sm sm:text-base">Texture Pattern</h3>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                                        {availableTextures.map((tex) => {
                                            const isSelected = selectedColor?.name === tex.name;
                                            return (
                                                <button
                                                    key={tex.name}
                                                    type="button"
                                                    onClick={() => setSelectedColor(tex)}
                                                    className="group relative flex flex-col items-center gap-1.5 sm:gap-2 focus:outline-none"
                                                >
                                                    <span
                                                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-200 overflow-hidden ${isSelected ? "border-[#F0C85A] ring-2 ring-[#F0C85A]/40 scale-105" : "border-[#493657]/15 group-hover:border-[#493657]/35"}`}
                                                        style={{ backgroundColor: tex.hex || "#D3D3D3" }}
                                                    >
                                                        {/* If image exists, show it, else color */}
                                                        {tex.image && <img src={tex.image} alt={tex.name} className="w-full h-full object-cover" />}
                                                    </span>
                                                    <span className={`text-xs font-medium text-center leading-tight ${isSelected ? "text-[#301A44]" : "text-[#493657]/70"}`}>
                                                        {tex.name}
                                                    </span>
                                                    {isSelected && (
                                                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/90 flex items-center justify-center shadow">
                                                                <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#301A44]" />
                                                            </span>
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {selectedColor && (
                                        <p className="text-xs sm:text-sm text-[#493657]/80 mt-3">
                                            Selected Pattern: {selectedColor.name}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Quantity & Add to Cart */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-[#493657] mb-2 text-sm sm:text-base">Quantity</h3>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5 text-lg font-bold">-</button>
                                    <span className="text-lg sm:text-xl font-semibold text-[#493657] min-w-[3rem] text-center">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-[#493657]/20 flex items-center justify-center hover:bg-[#493657]/5 text-lg font-bold">+</button>
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
                <motion.div className="mt-8 sm:mt-12 lg:mt-16" variants={itemVariants}>
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
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md border border-[#493657]/10">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-[#493657] text-base sm:text-lg">Key Benefits</h3>
                                    </div>
                                    <div className="space-y-3 sm:space-y-4">
                                        {product.advantages?.map((adv, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 sm:p-4 bg-[#f8fafc] rounded-lg border-l-4 border-[#6366f1]">
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#6366f1] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <FiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                                </div>
                                                <span className="text-sm sm:text-base text-[#493657] font-medium leading-relaxed text-left">{adv}</span>
                                            </div>
                                        ))}
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
                                { label: "Category", value: "Textured Finish", icon: FiTag },
                                { label: "Application Areas", value: product.application.join(', '), icon: FiClipboard },
                                { label: "Recommended Uses", value: product.recommended_uses.join(', '), icon: FiList },
                                { label: "Finish / Sheen", value: product.finish_type_sheen.join(', '), icon: FiDroplet },
                                { label: "Coats Required", value: product.coats_required, icon: FiCheckCircle },
                                { label: "Coverage", value: product.coverage, icon: FiBox }
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
                                { label: "Base Type", value: product.technicalSpecs?.base_type, icon: FiBox },
                                { label: "VOC Content", value: product.technicalSpecs?.voc_content, icon: FiShield },
                                { label: "Application Instructions", value: product.technicalSpecs?.application_instructions, icon: FiClipboard },
                                { label: "Drying Time", value: product.technicalSpecs?.dryingTime, icon: FiClock },
                                { label: "Recoat Window", value: product.technicalSpecs?.recoatTime, icon: FiRepeat },
                                { label: "Shelf Life", value: product.technicalSpecs?.shelf_life, icon: FiCalendar },
                                { label: "Storage Temperature", value: product.technicalSpecs?.storage_temp, icon: FiThermometer },
                                { label: "Cleanup", value: product.technicalSpecs?.cleanup, icon: FiArchive },
                                { label: "pH Level", value: product.technicalSpecs?.pH, icon: FiInfo }
                            ].map((spec, idx) => (
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

                {/* Safety Information intentionally hidden for texture paints */}

                {/* Download Documents */}
                <div className="mt-8 sm:mt-12 lg:mt-16">
                    <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-[#493657]/10">
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#493657] mb-6 sm:mb-8 text-center">Download Documents</h2>
                        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
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
                                    <a href="/Assets/docs/html-templates/calyco-texture-paint-tds.html" download className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Download TDS
                                    </a>
                                    <a href="/Assets/docs/html-templates/calyco-texture-paint-tds.html" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                        View TDS
                                    </a>
                                </div>
                            </div>
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
                                    <a href="/Assets/docs/html-templates/calyco-texture-paint-sds.html" download className="flex-1 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                                        Download SDS
                                    </a>
                                    <a href="/Assets/docs/html-templates/calyco-texture-paint-sds.html" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base">
                                        <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                                        View SDS
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ENHANCED Features Section */}
                <motion.div className="mt-8 sm:mt-12 lg:mt-16" variants={itemVariants}>
                    <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#493657]/5 via-white to-[#F0C85A]/5 p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden border border-[#493657]/10">
                        <div className="pointer-events-none absolute -top-24 -right-12 w-96 h-96 bg-gradient-to-br from-[#F0C85A]/20 to-[#493657]/10 blur-3xl rounded-full" />
                        <div className="pointer-events-none absolute -bottom-32 -left-10 w-80 h-80 bg-gradient-to-tr from-[#493657]/15 to-[#F0C85A]/10 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold text-[#493657] mb-3 sm:mb-4 text-center">Premium Features</h2>
                            <p className="text-center text-[#493657]/70 mb-8 sm:mb-12 text-base sm:text-lg">Experience the difference with professional-grade quality</p>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 sm:gap-8">
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC107] via-[#FFD54F] to-[#FFEB3B] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiShield className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Weather Resistant</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Endures harsh sunlight and rain without fading or peeling.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#FFC107] to-[#FFC107]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#673AB7] via-[#7E57C2] to-[#9575CD] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiLayers className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Hides Imperfections</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Effectively masks hairline cracks and surface undulations.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#673AB7] to-[#673AB7]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#4CAF50] via-[#66BB6A] to-[#81C784] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiCheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Anti-Algae</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Prevents black spots and algae growth, keeping walls fresh.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#4CAF50] to-[#4CAF50]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>
                                <div className="group bg-white/80 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-[#493657]/20 p-6 sm:p-8 hover:shadow-2xl hover:border-[#F0C85A] transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#00BCD4] via-[#26C6DA] to-[#4DD0E1] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        <FiWind className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm" />
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-[#493657] mb-2 sm:mb-3">Strong Adhesion</h3>
                                    <p className="text-sm text-[#493657]/70 leading-relaxed">Bonds strongly to cement plasters for a long-lasting finish.</p>
                                    <div className="mt-3 sm:mt-4 h-1 w-10 sm:w-12 bg-gradient-to-r from-[#00BCD4] to-[#00BCD4]/40 rounded-full group-hover:w-14 sm:group-hover:w-16 transition-all duration-300"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* You Might Also Like Section */}
                <motion.div className="relative mt-8 sm:mt-12 lg:mt-16 mb-4 sm:mb-8" variants={itemVariants}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#493657]/10 to-transparent rounded-2xl sm:rounded-3xl blur-2xl opacity-80 pointer-events-none" />
                    <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-md border border-white/70 shadow-2xl px-4 py-6 sm:px-6 sm:py-10 md:px-10">
                        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-10 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#493657]">You might also like</h2>
                                <p className="text-sm md:text-base text-[#493657]/70 mt-2">Pair your texture finish with exterior protection and sealers.</p>
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
                                            <img src="/Assets/Product Images/Luxury Exterior Emulsion/luxury-exterior-bucket-transparent.png" alt="Luxury Exterior Emulsion" className="w-full h-full object-contain drop-shadow-lg" />
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
                                            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1">
                                                <span className="text-xs uppercase tracking-wide text-[#493657]/60">Starts at</span>
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
                                            <img src="/Assets/Product Images/Waterproof Sealer/waterproof-bucket-png.png" alt="Waterproofing Sealer" className="w-full h-full object-contain drop-shadow-lg" />
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
                                            <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1">
                                                <span className="text-xs uppercase tracking-wide text-[#493657]/60">Starts at</span>
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

export default TexturePaints;

