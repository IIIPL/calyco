import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ProductHero from "../components/ProductDetail/ProductHero";
import PriceSizeCard from "../components/ProductDetail/PriceSizeCard";
import CoverageCalc from "../components/ProductDetail/CoverageCalc";
import FinishSwatches from "../components/ProductDetail/FinishSwatches";
import CompatibleColors from "../components/ProductDetail/CompatibleColors";
import FeatureBadges from "../components/ProductDetail/FeatureBadges";
import TechDownloads from "../components/ProductDetail/TechDownloads";
import SpecsAccordion from "../components/ProductDetail/SpecsAccordion";
import AssuranceStrip from "../components/ProductDetail/AssuranceStrip";
import Reviews from "../components/ProductDetail/Reviews";
import RelatedProducts from "../components/ProductDetail/RelatedProducts";
import StickyCTA from "../components/ProductDetail/StickyCTA";
import RelatedArticles from "../components/ProductDetail/RelatedArticles";
import SEO from "../components/SEO";
import CartPopup from "../components/CartPopup";
import { useCart } from "../context/CartContext";
import { getTypographyClasses, getButtonClasses } from "../data/admin/typography";

const INTERIOR_LATEX_VARIANT_MAP = {
  '1L-Low Sheen': 'gid://shopify/ProductVariant/42619088371830',
  '4L-Low Sheen': 'gid://shopify/ProductVariant/42619088437366',
  '10L-Low Sheen': 'gid://shopify/ProductVariant/42619088502902',
  '20L-Low Sheen': 'gid://shopify/ProductVariant/42619088568438',
  '1L-Pearl': 'gid://shopify/ProductVariant/42619088339062',
  '4L-Pearl': 'gid://shopify/ProductVariant/42619088404598',
  '10L-Pearl': 'gid://shopify/ProductVariant/42619088470134',
  '20L-Pearl': 'gid://shopify/ProductVariant/42619088535670',
};

const INTERIOR_LATEX_PRICING = {
  'Low Sheen': {
    '1L': 700,
    '4L': 2700,
    '10L': 6500,
    '20L': 12800,
  },
  'Pearl': {
    '1L': 800,
    '4L': 3500,
    '10L': 8400,
    '20L': 16000,
  },
};

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

const normaliseSizeLabel = (label = '') => label.replace(/\s+/g, '');

const getFinishEntry = (data, index) => {
  if (!data || !Array.isArray(data.finishes) || data.finishes.length === 0) {
    return { name: data?.defaultFinish || data?.default_finish || "Standard" };
  }
  const entry = data.finishes[index] ?? data.finishes[0];
  if (typeof entry === "string") {
    return { name: entry };
  }
  return entry;
};

const resolveDefaultFinishIndex = (data) => {
  if (!data || !Array.isArray(data.finishes) || data.finishes.length === 0) {
    return 0;
  }
  const defaultFinishName = data.defaultFinish || data.default_finish;
  if (!defaultFinishName) {
    return 0;
  }
  const matchIndex = data.finishes.findIndex((finish) => {
    if (typeof finish === "string") {
      return finish === defaultFinishName;
    }
    return finish?.name === defaultFinishName;
  });
  return matchIndex >= 0 ? matchIndex : 0;
};

const resolveDefaultSizeIndex = (data, finishName) => {
  if (!data || !Array.isArray(data.sizes) || data.sizes.length === 0) {
    return 0;
  }
  const matchIndex = data.sizes.findIndex((size) => {
    if (!size) return false;
    const priceMap = size.priceByFinish || size.price_by_finish;
    if (priceMap && finishName) {
      return priceMap[finishName] !== undefined;
    }
    return Boolean(size.price);
  });
  return matchIndex >= 0 ? matchIndex : 0;
};

// Sample product data for demonstration
const sampleProduct = {
  id: "nova-premium",
  defaultFinish: "Low Sheen",
  name: "Nova Premium Interior Paint",
  slug: "nova-premium",
  brand: "Calyco",
  category: "Interior",
  rating: 4.8,
  reviewCount: 127,
  finish: "Low Sheen",
  finishes: [
    { name: "Low Sheen", description: "Soft velvety appearance with excellent washability" },
    { name: "Pearl", description: "Subtle sheen that enhances color depth and durability" }
  ],
  selectedFinish: 0,
  keyBenefits: [
    "Low-VOC",
    "Great coverage",
    "Washable"
  ],
  microCopy: "Low-VOC • Safe for kids • Water-based",
  sizes: [
    {
      size: "1L",
      priceByFinish: { "Low Sheen": 700, "Pearl": 800 },
      mrpByFinish: { "Low Sheen": 850, "Pearl": 950 },
    },
    {
      size: "4L",
      priceByFinish: { "Low Sheen": 2700, "Pearl": 3500 },
      mrpByFinish: { "Low Sheen": 3200, "Pearl": 4200 },
    },
    {
      size: "10L",
      priceByFinish: { "Low Sheen": 6500, "Pearl": 8400 },
      mrpByFinish: { "Low Sheen": 7800, "Pearl": 10100 },
    },
    {
      size: "20L",
      priceByFinish: { "Low Sheen": 12800, "Pearl": 16000 },
      mrpByFinish: { "Low Sheen": 15600, "Pearl": 19200 },
    }
  ],

  price_by_finish: {
    "Low Sheen": {
      "1L": 700,
      "4L": 2700,
      "10L": 6500,
      "20L": 12800
    },
    "Pearl": {
      "1L": 800,
      "4L": 3500,
      "10L": 8400,
      "20L": 16000
    }
  },
  shopify_variant_map: {
    "1L-Low Sheen": "gid://shopify/ProductVariant/42619088371830",
    "4L-Low Sheen": "gid://shopify/ProductVariant/42619088437366",
    "10L-Low Sheen": "gid://shopify/ProductVariant/42619088502902",
    "20L-Low Sheen": "gid://shopify/ProductVariant/42619088568438",
    "1L-Pearl": "gid://shopify/ProductVariant/42619088339062",
    "4L-Pearl": "gid://shopify/ProductVariant/42619088404598",
    "10L-Pearl": "gid://shopify/ProductVariant/42619088470134",
    "20L-Pearl": "gid://shopify/ProductVariant/42619088535670"
  },
  selectedSize: 1,
  quantity: 1,
  coveragePerLitre: 12, // sqm per litre
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9, // 90% efficiency
  features: [
    "Low VOC",
    "Washable",
    "UV Resistant",
    "Fast Drying"
  ],
  technicalSpecs: {
    base: "Water-based acrylic",
    dryingTime: "1 hour touch dry, 4 hours recoat",
    thinning: "Up to 10% water",
    recoatTime: "2-4 hours"
  },
  documents: {
    tds: "/public/docs/nova-tds.pdf",
    sds: "/public/docs/nova-sds.pdf",
    warranty: "/public/docs/nova-warranty.pdf"
  },
  specs: {
    "Application & Surface Prep": [
      "Clean, dry surface required",
      "Apply primer if needed",
      "Use brush, roller or spray",
      "Temperature: 12°C-40°C"
    ],
    "Coverage & Drying": [
      "12 sqm per litre coverage",
      "1 hour touch dry",
      "2-4 hours between coats",
      "2 coats recommended"
    ],
    "Safety": [
      "Low VOC content",
      "Safe for kids and pets",
      "Use in well-ventilated area",
      "Wear protective gloves"
    ],
    "Storage": [
      "Store in cool, dry place",
      "Keep away from sunlight",
      "Seal container tightly",
      "Use within 2 years"
    ]
  },
  compatibleColors: [
    { name: "Grey Thunder", hex: "#4A5568", slug: "grey-thunder" },
    { name: "Sage Green", hex: "#68D391", slug: "sage-green" },
    { name: "Lavender", hex: "#B794F4", slug: "lavender" },
    { name: "Linen", hex: "#EFE8DA", slug: "linen" }
  ],
  relatedProducts: [
    { id: "nova-primer", name: "Nova Primer", image: "/Assets/DefensePrimer/NoBg.webp", price: 299 },
    { id: "nova-undercoat", name: "Nova Undercoat", image: "/Assets/DefensePrimer/NoBg.webp", price: 349 },
    { id: "nova-exterior", name: "Nova Exterior", image: "/Assets/RegalXterior/NoBg.webp", price: 599 },
    { id: "waterproofing", name: "Waterproofing Solution", image: "/Assets/DampShield/NoBg.webp", price: 799 }
  ],
  images: [
    "/Assets/Nova/NoBg.webp",
    "/Assets/Nova/inuse.webp",
    "/Assets/Nova/ontable.webp"
  ],
  bucketImage: "/Assets/Nova/ontable.webp",
  seo: {
    title: "Nova Premium Interior Paint - Low VOC, High Coverage | Calyco",
    description: "Premium interior paint with low VOC, excellent coverage, and washable finish. Available in Matte, Satin, and Gloss. Safe for kids and pets.",
    keywords: "interior paint, low VOC, premium paint, washable paint, Calyco Nova"
  }
};

export default function ProductDetailPage({ productData }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(productData || sampleProduct);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    productData?.selectedColor || (Array.isArray(productData?.colors) ? productData.colors[0] : null)
  );
  const [quantity, setQuantity] = useState(1);
  const [coverageData, setCoverageData] = useState({
    area: "",
    doors: 0,
    windows: 0,
    coats: 2,
    efficiency: 0.9
  });
  const [cartPopup, setCartPopup] = useState({ isVisible: false, item: null });
  const { addToCart, goToCheckout } = useCart();

  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(value);

  const initialiseProduct = useCallback((data) => {
    if (!data) {
      return;
    }
    setProduct(data);
    const finishIndex = resolveDefaultFinishIndex(data);
    setSelectedFinish(finishIndex);
    const finishName = getFinishEntry(data, finishIndex).name;
    const sizeIndex = resolveDefaultSizeIndex(data, finishName);
    setSelectedSize(sizeIndex);
    setQuantity(1);
    setSelectedColor(data.selectedColor || (Array.isArray(data.colors) ? data.colors[0] : null));
    setCoverageData((prev) => ({
      ...prev,
      coats: data.defaultCoats || data.default_coats || 2,
      efficiency: data.efficiency !== undefined ? data.efficiency : prev.efficiency,
    }));

    if (typeof document !== "undefined") {
      if (data.seo?.title) {
        document.title = data.seo.title;
      } else if (data.name) {
        document.title = data.name;
      }
    }
  }, [setProduct, setSelectedFinish, setSelectedSize, setQuantity, setCoverageData]);

  useEffect(() => {
    if (productData) {
      initialiseProduct(productData);
      return;
    }

    if (slug) {
      const normalisedSlug = slug.toLowerCase();
      if (normalisedSlug === "interior-latex-paint") {
        initialiseProduct(sampleProduct);
        return;
      }
    }

    if (!productData && !slug) {
      initialiseProduct(sampleProduct);
    }
  }, [slug, productData, initialiseProduct]);

  const handleAddToCart = () => {
    if (!product || !Array.isArray(product.sizes) || product.sizes.length === 0) {
      return;
    }

    const finishEntry = getFinishEntry(product, selectedFinish);
    const selectedFinishName = finishEntry?.name || "Standard";
    const currentSize = product.sizes[selectedSize] || product.sizes[0];
    if (!currentSize) {
      return;
    }

    const sizeLabelRaw = currentSize.size || currentSize.label || currentSize.name || "1L";
    const sizeLabel = typeof sizeLabelRaw === "string" ? sizeLabelRaw : String(sizeLabelRaw);
    const priceMap = currentSize.priceByFinish || currentSize.price_by_finish || {};
    const currentPrice =
      priceMap[selectedFinishName] !== undefined ? priceMap[selectedFinishName] : currentSize.price || 0;

    const variantKey = `${normaliseSizeLabel(sizeLabel)}-${selectedFinishName}`;
    const variantMap = {
      ...INTERIOR_LATEX_VARIANT_MAP,
      ...(product.shopify_variant_map || {}),
      ...(product.variantMap || {}),
    };
    const variantId =
      variantMap[variantKey] ||
      variantMap[`${sizeLabel}-${selectedFinishName}`] ||
      variantMap[`${normaliseSizeLabel(sizeLabel)}-${selectedFinishName}`] ||
      null;

    const selectedColorResolved =
      selectedColor ||
      product.selectedColor ||
      (Array.isArray(product.colors) ? product.colors[0] : null) || {
        name: "Custom Color",
        hex: "#F8F4E3",
        code: "",
        family: "",
      };

    const productForCart = {
      id: variantId || `${product.id || product.slug || "product"}-${variantKey}`,
      name: product.name,
      display_name: product.name,
      price: currentPrice,
      image:
        product.image ||
        (Array.isArray(product.images) ? product.images[0] : undefined) ||
        "/Assets/home-hero/u3817594935_Facebook_coverLuxury_wall_art_mockup_in_a_minimalis_67136d5f-eeb0-49ba-9fa2-5532ed4aa054.webp",
    };

    const attributes = {
      "Color Code": selectedColorResolved.code || "",
      "Color Name": selectedColorResolved.name || "Custom Color",
      "Color Family": selectedColorResolved.family || "",
      "Color Hex": selectedColorResolved.hex || "#F8F4E3",
      Finish: selectedFinishName,
      Size: sizeLabel,
      "Product Type": product.name,
    };

    const safeQuantity = quantity || 1;

    addToCart(
      productForCart,
      selectedFinishName,
      sizeLabel,
      safeQuantity,
      currentPrice,
      selectedColorResolved,
      "paint",
      {
        variantId,
        productType: product.name,
        attributes,
      },
    );

    setCartPopup({
      isVisible: true,
      item: {
        name: product.name,
        hex: selectedColorResolved.hex || "#F8F4E3",
        colorName: selectedColorResolved.name || "Custom Color",
        colorFamily: selectedColorResolved.family || "",
        selectedFinish: selectedFinishName,
        selectedSize: sizeLabel,
        quantity: safeQuantity,
        price: formatCurrency(currentPrice * safeQuantity),
      },
    });

    setTimeout(() => {
      setCartPopup({ isVisible: false, item: null });
    }, 3000);
  };



  const handleSampleOrder = () => {
    // TODO: Add sample to cart (100ml/250ml sample SKU)
    console.log("Adding sample to cart");
  };

  const handleVisualizer = () => {
    navigate(`/visualizer?product=${product.slug}&color=${product.compatibleColors[0].slug}`);
  };

  const handleFinishChange = (index) => {
    setSelectedFinish(index);
    // Pricing automatically updates based on selectedFinish and selectedSize
    // No need to modify product state as priceByFinish is already defined
  };

  const handleSizeChange = (index) => {
    setSelectedSize(index);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Math.max(1, newQuantity));
  };

  const handleCoverageCalc = (data) => {
    setCoverageData(data);
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

  const handleAddRecommended = () => {
    // Calculate recommended packs based on coverage
    const selectedFinishName = product.finishes[selectedFinish].name;
    const area = parseFloat(coverageData.area) || 0;
    const totalArea = area + (coverageData.doors * 2) + (coverageData.windows * 1.5);
    const totalLitres = (totalArea / product.coveragePerLitre) * coverageData.coats / coverageData.efficiency;

    // Find best pack combination
    let recommendedPacks = [];
    let remainingLitres = totalLitres;

    // Start with largest packs
    const sortedSizes = [...product.sizes].sort((a, b) => {
      const aLitres = parseInt(a.size);
      const bLitres = parseInt(b.size);
      return bLitres - aLitres;
    });

    sortedSizes.forEach(size => {
      const sizeLitres = parseInt(size.size);
      if (remainingLitres >= sizeLitres) {
        const packs = Math.floor(remainingLitres / sizeLitres);
        if (packs > 0) {
          const sizePrice = size.priceByFinish ? size.priceByFinish[selectedFinishName] : size.price;
          recommendedPacks.push({ size: size.size, packs, price: sizePrice });
          remainingLitres -= packs * sizeLitres;
        }
      }
    });

    // Add to cart
    recommendedPacks.forEach(pack => {
      console.log(`Adding ${pack.packs} • ${pack.size} to cart`);
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const currentSize =
    Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes[selectedSize] || product.sizes[0]
      : null;
  const currentFinishEntry = getFinishEntry(product, selectedFinish);
  const currentFinishName = currentFinishEntry?.name || "Standard";
  const currentPrice = (() => {
    if (!currentSize) {
      return 0;
    }
    const priceMap = currentSize.priceByFinish || currentSize.price_by_finish || {};
    if (priceMap[currentFinishName] !== undefined) {
      return priceMap[currentFinishName];
    }
    return currentSize.price || 0;
  })();
  const currentSizeLabel = currentSize
    ? currentSize.size || currentSize.label || currentSize.name || "1L"
    : "1L";
  const currentMrp = (() => {
    if (!currentSize) {
      return null;
    }
    const mrpMap = currentSize.mrpByFinish || currentSize.mrp_by_finish || {};
    if (mrpMap[currentFinishName] !== undefined) {
      return mrpMap[currentFinishName];
    }
    if (typeof currentSize.originalPrice === "number") {
      return currentSize.originalPrice;
    }
    const sizeLabelRaw = currentSize.size || currentSize.label || currentSize.name || "1L";
    const sizeLabel = typeof sizeLabelRaw === "string" ? sizeLabelRaw : String(sizeLabelRaw);
    const finishMrp = INTERIOR_LATEX_MRP[currentFinishName];
    if (finishMrp) {
      const normalisedLabel = normaliseSizeLabel(sizeLabel);
      if (finishMrp[normalisedLabel] !== undefined) {
        return finishMrp[normalisedLabel];
      }
      if (finishMrp[sizeLabel] !== undefined) {
        return finishMrp[sizeLabel];
      }
    }
    return null;
  })();

  return (
    <>
      <SEO
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
      />

      <div className="min-h-screen bg-linen-white pt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[#493657] hover:text-[#F0C85A] transition-colors mb-6"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>

        {/* Product Hero Section */}
        <ProductHero
          product={product}
          selectedFinish={selectedFinish}
          currentPrice={currentPrice}
          mrpPrice={currentMrp}
          currentSizeLabel={currentSizeLabel}
          currentFinishName={currentFinishName}
          onAddToCart={handleAddToCart}
          onSampleOrder={handleSampleOrder}
          onVisualizer={handleVisualizer}
        />

        {/* Price & Size Card */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <PriceSizeCard
              product={product}
              selectedSize={selectedSize}
              selectedFinish={selectedFinish}
              quantity={quantity}
              onSizeChange={handleSizeChange}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </section>

        {/* Coverage Calculator */}
        <section className="py-16 lg:py-24 bg-grey-mist">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <CoverageCalc
              coveragePerLitre={product.coveragePerLitre}
              coatsOptions={product.coatsOptions}
              defaultCoats={product.defaultCoats}
              efficiency={product.efficiency}
              onCalculate={handleCoverageCalc}
              onAddRecommended={handleAddRecommended}
            />
          </div>
        </section>

        {/* Finish Swatches */}
        {product.finishes.length > 0 && (
          <section className="py-16 lg:py-24 bg-linen-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <FinishSwatches
                finishes={product.finishes}
                selectedFinish={selectedFinish}
                onChange={handleFinishChange}
              />
            </div>
          </section>
        )}

        {/* Compatible Colors */}
        <section className="py-16 lg:py-24 bg-grey-mist">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <CompatibleColors colors={product.compatibleColors} />
          </div>
        </section>

        {/* Feature Badges */}
        <section className="py-16 lg:py-24 bg-linen-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <FeatureBadges features={product.features} />
          </div>
        </section>

        {/* Technical Downloads */}
        <section className="py-16 lg:py-24 bg-grey-mist">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <TechDownloads
              documents={product.documents}
              specs={product.technicalSpecs}
            />
          </div>
        </section>

        {/* Specifications Accordion */}
        <section className="py-16 lg:py-24 bg-linen-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <SpecsAccordion specs={product.specs} />
          </div>
        </section>

        {/* Assurance Strip */}
        <section className="py-16 lg:py-24 bg-grey-mist">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <AssuranceStrip />
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 lg:py-24 bg-linen-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <Reviews
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 lg:py-24 bg-grey-mist">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <RelatedProducts products={product.relatedProducts} />
          </div>
        </section>

        {/* Related Articles */}
        <RelatedArticles currentProductSlug={product.slug} productTags={product.category} />

        {/* Sticky CTA (Mobile Only) */}
        <StickyCTA
          price={currentPrice * quantity}
          size={currentSizeLabel}
          finish={currentFinishName}
          onAddToCart={handleAddToCart}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": product.name,
              "brand": {
                "@type": "Brand",
                "name": product.brand
              },
              "description": product.seo.description,
              "image": product.images,
              "offers": {
                "@type": "Offer",
                "price": currentPrice,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "seller": {
                  "@type": "Organization",
                  "name": "Calyco"
                }
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": product.rating,
                "reviewCount": product.reviewCount
              },
              "material": product.technicalSpecs.base,
              "color": currentFinishName
            })
          }}
        />

        {/* Cart Popup (Toast Notification) */}
        <CartPopup
          isVisible={cartPopup.isVisible}
          onClose={closeCartPopup}
          item={cartPopup.item}
          onContinueShopping={handleContinueShopping}
          onCheckout={handleCheckout}
        />
      </div>
    </>
  );
}


