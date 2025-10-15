import { useEffect, useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTruck, FaShieldAlt, FaUndo, FaCheck, FaInfoCircle, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { FiTag, FiList, FiCheckCircle, FiDroplet, FiClipboard, FiLayers, FiBox, FiPackage, FiDollarSign, FiType, FiThermometer, FiRepeat, FiClock, FiShield, FiArchive, FiAlertCircle, FiInfo, FiHash, FiCalendar, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { products } from "../data/products";
import { calycoColors as colorData } from "../data/calycoColors.js";
import { useCart } from "../context/CartContext";
import CartPopup from "../components/CartPopup";
import RatingStars from "../components/RatingStars";
import ReviewsSection from "../components/ReviewsSection";
import { getProductReviews, getAverageRating, getTotalReviews } from "../data/productReviews";

import variantMapInterior from '../data/variantMap.interior.json';

const EXTERIOR_LATEX_VARIANTS = {
  'Matte Finish': {
    displayName: 'Matte Finish',
    subTitle: 'Premium Exterior Emulsion',
    description: 'Weather-resistant matte finish for exteriors',
    sizes: {
      '1L': { price: 700, variantId: 'gid://shopify/ProductVariant/42637669400694' },
      '4L': { price: 2700, variantId: 'gid://shopify/ProductVariant/42637669466230' },
      '10L': { price: 6500, variantId: 'gid://shopify/ProductVariant/42637669531766' },
      '20L': { price: 12800, variantId: 'gid://shopify/ProductVariant/42637669597302' },
    },
  },
  'High Sheen Finish': {
    displayName: 'High Sheen Finish',
    subTitle: 'Luxury Exterior Emulsion',
    description: 'Premium high-sheen finish for luxury exteriors',
    sizes: {
      '1L': { price: 800, variantId: 'gid://shopify/ProductVariant/42637669433462' },
      '4L': { price: 3500, variantId: 'gid://shopify/ProductVariant/42637669498998' },
      '10L': { price: 8400, variantId: 'gid://shopify/ProductVariant/42637669564534' },
      '20L': { price: 16000, variantId: 'gid://shopify/ProductVariant/42637669630070' },
    },
  },
};

const EXTERIOR_SIZE_ORDER = ['1L', '4L', '10L', '20L'];

// MRP pricing for Interior Latex Paint (Nova)
const INTERIOR_LATEX_MRP = {
  'Low Sheen': {
    '1L': 850,
    '4L': 3200,
    '10L': 7800,
    '20L': 15600,
  },
  'Pearl': {
    '1L': 950,
    '4L': 4200,
    '10L': 10100,
    '20L': 19200,
  },
};

// MRP pricing for Exterior Latex Paint
const EXTERIOR_LATEX_MRP = {
  'Matte Finish': {
    '1L': 850,
    '4L': 3200,
    '10L': 7800,
    '20L': 15600,
  },
  'High Sheen Finish': {
    '1L': 950,
    '4L': 4200,
    '10L': 10100,
    '20L': 19200,
  },
};

// MRP pricing for Waterproofing Sealer
const WATERPROOFING_SEALER_MRP = {
  'Clear': {
    '1L': 850,
    '4L': 3200,
    '10L': 7800,
    '20L': 15600,
  },
  'Protective': {
    '1L': 850,
    '4L': 3200,
    '10L': 7800,
    '20L': 15600,
  },
  'Matte Finish': {
    '1L': 850,
    '4L': 3200,
    '10L': 7800,
    '20L': 15600,
  },
};

const slugify = (value) =>
  value
    ? value.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "";

const VARIANT_MAPS = {
  'variantMap.interior.json': variantMapInterior,
};

// --- Utility functions ---
const getProductBySlugOrName = (productId) => {
  if (!productId) return null;
  const lowerId = productId.toLowerCase();
  return products.find(p =>
    (p.name && p.name.toLowerCase() === lowerId) ||
    (p.slug && p.slug.toLowerCase() === lowerId) ||
    (p.url && p.url.split("/").pop().toLowerCase() === lowerId)
  );
};

const getProductsByCategory = (category) => {
  if (!category) return [];
  const lowerCat = category.toLowerCase();
  return products.filter(p => p.category && p.category.toLowerCase() === lowerCat);
};

const normalizeSizeLabel = (label = "") => label.replace(/\s+/g, "").toUpperCase();

// Price multipliers for each size
const getSizeMultiplier = (size) => {
    if (!size) return 1;
    const sizeNum = size.toString().match(/\d+/)?.[0];
    const multipliers = {
        "1": 1,
        "4": 3.5,
        "10": 8,
        "20": 14
    };
    return multipliers[sizeNum] || 1;
};

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

    const [selectedSheen, setSelectedSheen] = useState("Matte Finish");
    const [selectedSize, setSelectedSize] = useState("1L");
    const [selectedColorType, setSelectedColorType] = useState("ready-mixed");
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
    const [addingToCart, setAddingToCart] = useState(false);
    const { addToCart, goToCheckout } = useCart();
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [selectedColorFamily, setSelectedColorFamily] = useState(() => colorFamilies[0]?.code || "");
    const [selectedColor, setSelectedColor] = useState(null);

    const activeColorFamily = colorFamilies.find((family) => family.code === selectedColorFamily);
    const isExteriorProduct =
        product &&
        (product.id === 'ExteriorLatex' ||
            product.slug === 'Exterior-Latex-Paint' ||
            (product.name && product.name.toLowerCase().includes('exterior latex')));

    const isInteriorLatexProduct =
        product &&
        (product.id === 'Nova' ||
            product.slug === 'Interior-Latex-Paint' ||
            (product.name && product.name.toLowerCase().includes('interior latex')));

    const isWaterproofingSealerProduct =
        product &&
        (product.id === 'WaterproofingSealer' ||
            product.slug === 'waterproofing-sealer' ||
            (product.name && product.name.toLowerCase().includes('waterproofing sealer')));

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

    // Touch handlers
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

    const colorInfo = selectedColor
        ? {
            name: selectedColor.name,
            hex: selectedColor.hex,
            family: activeColorFamily?.label,
            familyCode: activeColorFamily?.code
        }
        : null;

    const exteriorFinishConfig = isExteriorProduct
        ? EXTERIOR_LATEX_VARIANTS[selectedSheen] || EXTERIOR_LATEX_VARIANTS['Matte Finish']
        : null;

    const currentExteriorVariant =
        isExteriorProduct && selectedSheen && selectedSize
            ? EXTERIOR_LATEX_VARIANTS[selectedSheen]?.sizes?.[selectedSize]
            : null;

    const formatINR = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

    const priceByFinish = useMemo(() => {
        if (!product) return {};
        if (isExteriorProduct) {
            const mapped = {};
            Object.entries(EXTERIOR_LATEX_VARIANTS).forEach(([finish, info]) => {
                mapped[finish] = {};
                EXTERIOR_SIZE_ORDER.forEach((size) => {
                    if (info.sizes[size]) {
                        mapped[finish][size] = {
                            price: info.sizes[size].price,
                            variantId: info.sizes[size].variantId,
                        };
                    }
                });
                Object.entries(info.sizes).forEach(([size, config]) => {
                    if (!mapped[finish][size]) {
                        mapped[finish][size] = {
                            price: config.price,
                            variantId: config.variantId,
                        };
                    }
                });
            });
            return mapped;
        }
        return product.priceByFinish || product.price_by_finish || {};
    }, [product, isExteriorProduct]);

    const normalizedSelectedSheen =
        selectedSheen ||
        product?.defaultFinish ||
        product?.default_finish ||
        product?.finish_type_sheen?.[0] ||
        "Low Sheen";

    const activeFinishPricing = useMemo(() => {
        return priceByFinish?.[normalizedSelectedSheen] || {};
    }, [priceByFinish, normalizedSelectedSheen]);

    const resolvePriceEntry = (sizeLabel) => {
        if (!sizeLabel) return undefined;
        if (!activeFinishPricing || typeof activeFinishPricing !== "object") return undefined;
        if (activeFinishPricing[sizeLabel] !== undefined) {
            return activeFinishPricing[sizeLabel];
        }
        const normalized = normalizeSizeLabel(sizeLabel);
        const match = Object.entries(activeFinishPricing).find(([key]) => normalizeSizeLabel(key) === normalized);
        return match ? match[1] : undefined;
    };

    const calculatePrice = (sizeLabel) => {
        const entry = resolvePriceEntry(sizeLabel);
        if (entry === undefined || entry === null) {
            if (typeof product?.price === "number") {
                const multiplier = getSizeMultiplier(sizeLabel);
                return Math.round(product.price * multiplier);
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
        const entry = resolvePriceEntry(sizeLabel);
        if (entry && typeof entry === "object" && entry.variantId) {
            return entry.variantId;
        }
        let variantMap = product?.shopify_variant_map || {};
        const variantMapFile = product?.variantMapFile;
        if ((!variantMap || Object.keys(variantMap).length === 0) && variantMapFile) {
            variantMap = VARIANT_MAPS[variantMapFile] || variantMap;
        }
        const exactKey = `${sizeLabel}-${finishLabel}`;
        if (variantMap[exactKey]) {
            return variantMap[exactKey];
        }
        const normalized = normalizeSizeLabel(sizeLabel);
        const fallbackKey = `${normalized}-${finishLabel}`;
        return variantMap[fallbackKey] || null;
    };

    const displayPriceValue = isExteriorProduct
        ? currentExteriorVariant?.price || 0
        : calculatePrice(selectedSize);

    // Calculate MRP for products with MRP pricing
    const calculateMRP = (sizeLabel) => {
        let mrpSource = null;

        if (isInteriorLatexProduct) {
            mrpSource = INTERIOR_LATEX_MRP;
        } else if (isExteriorProduct) {
            mrpSource = EXTERIOR_LATEX_MRP;
        } else if (isWaterproofingSealerProduct) {
            mrpSource = WATERPROOFING_SEALER_MRP;
        }

        if (!mrpSource) return null;

        const mrpData = mrpSource[normalizedSelectedSheen];
        if (!mrpData) return null;
        return mrpData[sizeLabel] || null;
    };

    const shouldShowMRP = isInteriorLatexProduct || isExteriorProduct || isWaterproofingSealerProduct;
    const displayMRPValue = shouldShowMRP ? calculateMRP(selectedSize) : null;

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
        const foundProduct = getProductBySlugOrName(productId);
        if (foundProduct) {
            setProduct(foundProduct);
            const defaultFinish =
                foundProduct.defaultFinish ||
                foundProduct.default_finish ||
                foundProduct.finish_type_sheen?.[0] ||
                "Low Sheen";
            const looksLikeExterior =
                foundProduct.id === 'ExteriorLatex' ||
                foundProduct.slug === 'Exterior-Latex-Paint' ||
                (foundProduct.name && foundProduct.name.toLowerCase().includes('exterior latex'));
            setSelectedSheen(looksLikeExterior ? 'Matte Finish' : defaultFinish);

            const finishPricing = looksLikeExterior
                ? EXTERIOR_LATEX_VARIANTS['Matte Finish'].sizes
                : (foundProduct.priceByFinish || foundProduct.price_by_finish || {})[
                      looksLikeExterior ? 'Matte Finish' : defaultFinish
                  ];
            if (finishPricing && typeof finishPricing === "object") {
                const sizeKeys = Object.keys(finishPricing);
                if (sizeKeys.length > 0) {
                    setSelectedSize(looksLikeExterior ? '1L' : sizeKeys[0]);
                } else if (foundProduct.packaging && foundProduct.packaging.length > 0) {
                    setSelectedSize(foundProduct.packaging[0]);
                } else {
                    setSelectedSize("");
                }
            } else if (foundProduct.packaging && foundProduct.packaging.length > 0) {
                setSelectedSize(foundProduct.packaging[0]);
            } else {
                setSelectedSize("");
            }

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

    useEffect(() => {
        if (!displaySizes.length) {
            return;
        }
        const normalized = normalizeSizeLabel(selectedSize);
        const hasCurrent = displaySizes.some((label) => normalizeSizeLabel(label) === normalized);
        if (!hasCurrent) {
            setSelectedSize(displaySizes[0]);
        }
    }, [displaySizes, selectedSize]);

    const handleGenericAddToCart = () => {
        const variantId = getVariantIdForSelection(normalizedSelectedSheen, selectedSize);
        addToCart(
            product,
            selectedSheen,
            selectedSize,
            quantity,
            calculatePrice(selectedSize),
            colorInfo,
            selectedColorType,
            variantId ? { variantId } : {}
        );

        setCartPopup({
            isVisible: true,
            item: {
                name: product.display_name || product.name,
                hex: (colorInfo && colorInfo.hex) || product.color_hex || "#CCCCCC",
                colorName: colorInfo ? colorInfo.name : undefined,
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

    const handleExteriorAddToCart = async () => {
        if (!selectedColor) {
            alert("Please select a color first");
            return;
        }

        const variantData = EXTERIOR_LATEX_VARIANTS[selectedSheen]?.sizes?.[selectedSize];
        if (!variantData) {
            alert("Please select a valid size option");
            return;
        }

        const variantId = variantData.variantId;
        if (!variantId) {
            alert("Unable to determine a Shopify variant for the selected combination.");
            return;
        }

        const customAttributes = [
            { key: "Product Type", value: "Exterior Latex Paint" },
            { key: "Finish Type", value: selectedSheen },
            { key: "Finish Name", value: exteriorFinishConfig?.subTitle || selectedSheen },
            { key: "Color Code", value: selectedColor.ralCode || selectedColor.code || "" },
            { key: "Color Name", value: selectedColor.name || "" },
            { key: "Hex Code", value: selectedColor.hexCode || selectedColor.hex || "" },
            { key: "Color Family", value: selectedColor.colorFamily || activeColorFamily?.label || "" },
        ];

        console.log('[CALYCO] Adding Exterior to cart:', {
            finish: selectedSheen,
            size: selectedSize,
            color: selectedColor.name,
            variantId,
            price: variantData.price,
        });
        console.log('[CALYCO] Custom attributes:', customAttributes);

        try {
            await addToCart(
                {
                    id: variantId,
                    name: `${product.display_name || product.name} - ${selectedColor.name}`,
                    display_name: `${product.display_name || product.name} - ${selectedColor.name}`,
                    price: variantData.price,
                    image: product.image || product.images?.[0] || '/Assets/chair.png',
                },
                selectedSheen,
                selectedSize,
                quantity,
                variantData.price,
                {
                    name: selectedColor.name || "",
                    hex: selectedColor.hex || selectedColor.hexCode || "",
                    code: selectedColor.ralCode || selectedColor.code || "",
                    family: selectedColor.colorFamily || activeColorFamily?.label || "",
                },
                'paint',
                {
                    variantId,
                    productType: 'Exterior Latex Paint',
                    attributes: customAttributes,
                },
            );

            console.log('[CALYCO] Successfully added to cart');

            setCartPopup({
                isVisible: true,
                item: {
                    name: product.display_name || product.name,
                    hex: selectedColor.hex || selectedColor.hexCode || '#CCCCCC',
                    colorName: selectedColor.name || '',
                    colorFamily: selectedColor.colorFamily || activeColorFamily?.label || '',
                    selectedSheen,
                    selectedSize,
                    quantity,
                    price: formatINR(variantData.price * quantity),
                },
            });

            setTimeout(() => {
                setCartPopup({ isVisible: false, item: null });
            }, 3000);
        } catch (error) {
            console.error('[CALYCO] Failed to add Exterior paint:', error);
            alert(`Failed to add to cart: ${error.message}`);
        }
    };

    const handleAddToCartClick = () => {
        if (isExteriorProduct) {
            void handleExteriorAddToCart();
        } else {
            handleGenericAddToCart();
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

    const similarProducts = product
      ? getProductsByCategory(product.category).filter(p => p.name !== product.name)
      : [];

    let randomSimilar = [];
    if (similarProducts.length > 2) {
        const shuffled = [...similarProducts].sort(() => 0.5 - Math.random());
        randomSimilar = shuffled.slice(0, 2);
    } else {
        randomSimilar = similarProducts.slice(0, 2);
    }

    return (
        <>
        <div className="min-h-screen bg-white px-2 md:px-6 xl:px-10">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* LEFT SIDE - Product Image Gallery (Sticky) */}
                    <motion.div
                        className="lg:sticky lg:top-24 w-full self-start"
                        variants={itemVariants}
                    >
                        <div
                            className="relative group w-full"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative bg-white rounded-2xl p-4">
                                <img
                                    src={selectedImage || product.image}
                                    alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                                    onError={(e) => {
                                        console.error('Image failed to load:', e.target.src);
                                        if (product.image && e.target.src !== product.image) {
                                            e.target.src = product.image;
                                        }
                                    }}
                                    className="w-full h-auto max-h-[700px] object-contain rounded-xl"
                                />

                                {product.images && product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevImage}
                                            disabled={selectedImageIndex === 0}
                                            className={`absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                selectedImageIndex === 0
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-100'
                                            }`}
                                            aria-label="Previous image"
                                        >
                                            <FiChevronLeft className="w-5 h-5 text-[#493657]" />
                                        </button>

                                        <button
                                            onClick={handleNextImage}
                                            disabled={selectedImageIndex === product.images.length - 1}
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 hover:bg-[#F0C85A]/10 hover:shadow-xl ${
                                                selectedImageIndex === product.images.length - 1
                                                    ? 'opacity-30 cursor-not-allowed'
                                                    : 'opacity-100'
                                            }`}
                                            aria-label="Next image"
                                        >
                                            <FiChevronRight className="w-5 h-5 text-[#493657]" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Carousel Dots - Always at bottom */}
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
                                                idx === selectedImageIndex
                                                    ? 'bg-[#F0C85A] w-8'
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
                          <div className="w-full mt-6 overflow-hidden">
                            <div
                              className="flex gap-3 transition-transform duration-500 ease-in-out"
                              style={{
                                transform: `translateX(-${Math.max(0, (selectedImageIndex - 1) * (96 + 12))}px)`
                              }}
                            >
                              {product.images.map((img, idx) => (
                                <button
                                  key={img + idx}
                                  onClick={() => {
                                    setSelectedImage(img);
                                    setSelectedImageIndex(idx);
                                  }}
                                  className={`rounded-lg p-2 transition-all duration-200 focus:outline-none flex-shrink-0 w-24 ${
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
                                    className="w-full h-20 object-contain"
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                    </motion.div>

                    {/* RIGHT SIDE - Product Information */}
                    <motion.div
                        className="w-full flex flex-col gap-6 lg:pt-8"
                        variants={itemVariants}
                    >
                        {/* Product Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-[#493657] leading-tight">{product.display_name || product.name}</h1>

                        {/* Reviews - New Style */}
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

                        {/* Pricing - Single Line with MRP */}
                        {shouldShowMRP && displayMRPValue ? (
                          <div className="flex items-baseline gap-3 flex-wrap">
                            <span className="text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(displayPriceValue)}</span>
                            <span className="text-xl text-[#dc2626] line-through">{formatINR(displayMRPValue)}</span>
                            <span className="text-sm text-[#493657]/60">per {selectedSize || displaySizes[0] || '1L'}</span>
                          </div>
                        ) : (
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl md:text-4xl font-bold text-[#493657]">{formatINR(displayPriceValue)}</span>
                            <span className="text-sm text-[#493657]/60">per {selectedSize || displaySizes[0] || '1L'}</span>
                          </div>
                        )}

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

                        {/* 3 Feature Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
                          {isInteriorLatexProduct && (
                            <>
                              <div className="bg-gradient-to-br from-[#B8E6F0] to-[#8DD4E8] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiShield className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Low VOC</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Eco-friendly formula</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#F5D9A8] to-[#F0C85A] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiCheckCircle className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Great Coverage</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Superior finish</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#A8D5B0] to-[#7EC488] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiDroplet className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Stain Resistant</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Easy to clean</p>
                              </div>
                            </>
                          )}
                          {isExteriorProduct && (
                            <>
                              <div className="bg-gradient-to-br from-[#B8E6F0] to-[#8DD4E8] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiShield className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Weather Resistant</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">All-season protection</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#F5D9A8] to-[#F0C85A] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiArchive className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">UV Protection</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Fade resistant</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#A8D5B0] to-[#7EC488] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiClipboard className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Easy Cleanup</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Water-based formula</p>
                              </div>
                            </>
                          )}
                          {isWaterproofingSealerProduct && (
                            <>
                              <div className="bg-gradient-to-br from-[#B8E6F0] to-[#8DD4E8] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiDroplet className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Waterproof Protection</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Complete sealing</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#F5D9A8] to-[#F0C85A] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiShield className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Eco-Friendly</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Safe for environment</p>
                              </div>
                              <div className="bg-gradient-to-br from-[#A8D5B0] to-[#7EC488] rounded-xl p-5 text-center shadow-md border border-[#493657]/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                  <FiClock className="w-7 h-7 text-[#493657]" />
                                </div>
                                <h4 className="font-bold text-[#493657] text-base mb-1">Long Lasting</h4>
                                <p className="text-sm text-[#493657]/80 font-medium">Durable protection</p>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Product Selectors */}
                        <div className="space-y-6">
                            {/* Sheen / Finish */}
                            {isExteriorProduct ? (
                              <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-2">Choose Finish Type</h3>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(EXTERIOR_LATEX_VARIANTS).map(([finishKey, info]) => {
                                    const isSelected = selectedSheen === finishKey;
                                    return (
                                      <button
                                        key={finishKey}
                                        type="button"
                                        onClick={() => setSelectedSheen(finishKey)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${
                                          isSelected
                                            ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                            : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"
                                        }`}
                                      >
                                        {info.displayName}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              product.finish_type_sheen &&
                              product.finish_type_sheen.length > 0 && (
                                <div className="mb-4">
                                  <h3 className="font-semibold text-[#493657] mb-2">Choose Finish Type</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {product.finish_type_sheen.map((sheen) => (
                                      <button
                                        key={sheen}
                                        type="button"
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
                              )
                            )}

                            {/* Color Family */}
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

                            {/* Color Selection */}
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
                                              <svg className="w-4 h-4 text-[#301A44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                            {/* Size Selection */}
                            {isExteriorProduct ? (
                              <div className="mb-4">
                                <h3 className="font-semibold text-[#493657] mb-2">Size</h3>
                                <div className="flex flex-wrap gap-2">
                                  {EXTERIOR_SIZE_ORDER.map((size) => {
                                    const variant = EXTERIOR_LATEX_VARIANTS[selectedSheen]?.sizes?.[size];
                                    if (!variant) return null;
                                    const isSelected = selectedSize === size;
                                    return (
                                      <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border transition-all ${
                                          isSelected
                                            ? "border-[#F0C85A] bg-[#F0C85A]/10 text-[#493657]"
                                            : "border-[#493657]/20 text-[#493657]/70 hover:border-[#493657]/40"
                                        }`}
                                      >
                                        {size}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              displaySizes.length > 0 && (
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
                              )
                            )}

                            {/* Color Type Selection */}
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
                                        Pre-mixed at factory, ready to use. Consistent color batch-to-batch.
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
                                        Custom mixed at store/site. Perfect color matching.
                                      </p>
                                      <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        ✓ Custom Mixed
                                      </span>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>

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
                                onClick={handleAddToCartClick}
                                className="w-full bg-gradient-to-r from-[#301A44] to-[#493657]/80 text-white font-semibold py-4 rounded-2xl hover:shadow-2xl hover:shadow-[#301A44]/30 transition-all duration-500 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <FaShoppingCart className="w-5 h-5" />
                                Add to Cart - {formatINR(displayPriceValue * quantity)}
                              </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Details Section */}
                <motion.div 
                    className="mt-32"
                    variants={itemVariants}
                >
                    <div className="flex flex-col gap-8">
                      <div className="w-full">
                        <h2 className="text-5xl font-bold text-[#493657]">Product Details</h2>
                      </div>
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                        <div className="lg:w-1/2 w-full">
                          <p className="text-2xl md:text-3xl font-semibold text-[#301A44] leading-snug">
                            {product.details || product.description}
                          </p>
                        </div>
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
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiTag className="w-5 h-5 text-[#493657]" />Category</span>
                      <span className="text-[#493657]/80 text-lg">{product.category || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiClipboard className="w-5 h-5 text-[#493657]" />Application Areas</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.application) ? product.application.join(', ') : (product.application || 'N/A')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiList className="w-5 h-5 text-[#493657]" />Recommended Uses</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.recommended_uses) ? product.recommended_uses.join(', ') : (product.recommended_uses || 'N/A')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiDroplet className="w-5 h-5 text-[#493657]" />Finish / Sheen</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.finish_type_sheen) ? product.finish_type_sheen.join(', ') : (product.finish_type_sheen || 'N/A')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiLayers className="w-5 h-5 text-[#493657]" />Surface Compatibility</span>
                      <span className="text-[#493657]/80 text-lg">{Array.isArray(product.substrate) ? product.substrate.join(', ') : (product.substrate || 'N/A')}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiCheckCircle className="w-5 h-5 text-[#493657]" />Coats Required</span>
                      <span className="text-[#493657]/80 text-lg">{product.coats_required || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[#493657] text-lg mb-1 flex items-center gap-2"><FiBox className="w-5 h-5 text-[#493657]" />Coverage</span>
                      <span className="text-[#493657]/80 text-lg">{product.coverage || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-4" />

                {/* Technical Specifications */}
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

                {/* Safety Information */}
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

                      <div className="bg-blue-50 rounded-lg p-6 mt-6">
                        <h3 className="font-semibold text-blue-800 text-lg mb-3">General Safety Precautions</h3>
                        <p className="text-blue-700">{product.safety_precautions || 'Use appropriate protective equipment. Work in well-ventilated areas.'}</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Download Documents */}
                <hr className="border-t-2 border-[#493657]/20 w-full mt-12 mb-8" />
                <div className="mb-20 mt-16">
                  <h2 className="text-5xl font-bold text-[#493657] mb-8">Download Documents</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* TDS Document */}
                    <div className="bg-white rounded-xl border-2 border-[#493657]/20 p-6 hover:border-[#F0C85A] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F0C85A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiClipboard className="w-6 h-6 text-[#493657]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#493657] text-lg mb-1">Technical Data Sheet</h3>
                          <p className="text-sm text-[#493657]/60">Product specifications and application details</p>
                        </div>
                        <a
                          href={isInteriorLatexProduct
                            ? "/Assets/docs/interior-latex-paint-tds.pdf"
                            : isExteriorProduct
                            ? "/Assets/docs/exterior-latex-paint-tds.pdf"
                            : "/Assets/docs/waterproofing-sealer-tds.pdf"}
                          download
                          className="bg-[#493657] text-white px-4 py-2 rounded-lg hover:bg-[#301A44] transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
                        >
                          <FiClipboard className="w-4 h-4" />
                          Download
                        </a>
                      </div>
                    </div>

                    {/* SDS Document */}
                    <div className="bg-white rounded-xl border-2 border-[#493657]/20 p-6 hover:border-[#F0C85A] hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#F0C85A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiShield className="w-6 h-6 text-[#493657]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#493657] text-lg mb-1">Safety Data Sheet</h3>
                          <p className="text-sm text-[#493657]/60">Health and safety information</p>
                        </div>
                        <a
                          href={isInteriorLatexProduct
                            ? "/Assets/docs/interior-latex-paint-sds.pdf"
                            : isExteriorProduct
                            ? "/Assets/docs/exterior-latex-paint-sds.pdf"
                            : "/Assets/docs/waterproofing-sealer-sds.pdf"}
                          download
                          className="bg-[#493657] text-white px-4 py-2 rounded-lg hover:bg-[#301A44] transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
                        >
                          <FiShield className="w-4 h-4" />
                          Download
                        </a>
                      </div>
                    </div>
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
