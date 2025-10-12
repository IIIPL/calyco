import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
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
import SEO from "../components/SEO";
import CartPopup from "../components/CartPopup";
import { useCart } from "../context/CartContext";

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

const normaliseSizeLabel = (label = '') => label.replace(/\s+/g, '');

// Sample product data for demonstration
const sampleProduct = {
  id: "nova-premium",
  defaultFinish: "Low Sheen",
  name: "Nova Premium Interior Paint",
  slug: "nova-premium",
  brand: "Calyco",
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
    { size: "1L", priceByFinish: { "Low Sheen": 700, "Pearl": 800 } },
    { size: "4L", priceByFinish: { "Low Sheen": 2700, "Pearl": 3500 } },
    { size: "10L", priceByFinish: { "Low Sheen": 6500, "Pearl": 8400 } },
    { size: "20L", priceByFinish: { "Low Sheen": 12800, "Pearl": 16000 } }
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
    { id: "nova-primer", name: "Nova Primer", image: "/Assets/DefensePrimer/NoBg.png", price: 299 },
    { id: "nova-undercoat", name: "Nova Undercoat", image: "/Assets/DefensePrimer/NoBg.png", price: 349 },
    { id: "nova-exterior", name: "Nova Exterior", image: "/Assets/RegalXterior/NoBg.png", price: 599 },
    { id: "waterproofing", name: "Waterproofing Solution", image: "/Assets/DampShield/NoBg.png", price: 799 }
  ],
  images: [
    "/Assets/Nova/NoBg.png",
    "/Assets/Nova/inuse.png",
    "/Assets/Nova/ontable.png"
  ],
  bucketImage: "/Assets/Nova/ontable.png",
  seo: {
    title: "Nova Premium Interior Paint - Low VOC, High Coverage | Calyco",
    description: "Premium interior paint with low VOC, excellent coverage, and washable finish. Available in Matte, Satin, and Gloss. Safe for kids and pets.",
    keywords: "interior paint, low VOC, premium paint, washable paint, Calyco Nova"
  }
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(sampleProduct);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
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

  // TODO: Replace with actual product fetching logic
  useEffect(() => {
    // Simulate fetching product by slug
    console.log("Fetching product:", slug);
    // setProduct(fetchedProduct);
  }, [slug]);

  const handleAddToCart = () => {

    const selectedFinishName = product.finishes[selectedFinish].name;

    const currentSize = product.sizes[selectedSize];

    const sizeLabel = currentSize.size || currentSize.label;

    const currentPrice = currentSize.priceByFinish[selectedFinishName];

    const variantKey = `${normaliseSizeLabel(sizeLabel)}-${selectedFinishName}`;

    const variantId = INTERIOR_LATEX_VARIANT_MAP[variantKey];



    const selectedColor = product.selectedColor || {

      name: 'Custom Color',

      hex: '#F8F4E3',

      code: '',

      family: '',

    };



    const productForCart = {

      id: variantId || `${product.id || product.slug}-${variantKey}`,

      name: product.name,

      display_name: product.name,

      price: currentPrice,

      image: product.image || '/Assets/home-hero/u3817594935_Facebook_coverLuxury_wall_art_mockup_in_a_minimalis_67136d5f-eeb0-49ba-9fa2-5532ed4aa054.png',

    };



    const attributes = {

      'Color Code': selectedColor.code || '',

      'Color Name': selectedColor.name || 'Custom Color',

      'Color Family': selectedColor.family || '',

      'Color Hex': selectedColor.hex || '#F8F4E3',

      Finish: selectedFinishName,

      'Product Type': 'Interior Latex Paint',

      Size: sizeLabel,

    };



    addToCart(

      productForCart,

      selectedFinishName,

      sizeLabel,

      quantity,

      currentPrice,

      selectedColor,

      'paint',

      {

        variantId,

        productType: 'Interior Latex Paint',

        attributes,

      },

    );



    setCartPopup({

      isVisible: true,

      item: {

        name: product.name,

        hex: selectedColor.hex || '#F8F4E3',

        price: formatCurrency(currentPrice * quantity),

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

  const currentSize = product.sizes[selectedSize];
  const currentFinish = product.finishes[selectedFinish];
  const currentFinishName = currentFinish?.name || 'Low Sheen';
  const currentPrice = currentSize.priceByFinish[currentFinishName];

  return (
    <>
      <SEO 
        title={product.seo.title}
        description={product.seo.description}
        keywords={product.seo.keywords}
      />
      
      <div className="min-h-screen bg-linen-white pt-20">
        {/* Product Hero Section */}
        <ProductHero
          product={product}
          selectedFinish={selectedFinish}
          currentPrice={currentPrice}
          currentSizeLabel={currentSize.size || currentSize.label}
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
        {product.finishes.length > 1 && (
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

        {/* Sticky CTA (Mobile Only) */}
        <StickyCTA
          price={currentPrice * quantity}
          size={currentSize.size}
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
              "color": currentFinish.name
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


