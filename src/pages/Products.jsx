import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart, FiEye } from "react-icons/fi";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";

import interiorLuxuryDetail from "../data/productDetail.interiorLatexPaint";
import premiumInteriorDetail from "../data/productDetail.premiumInteriorEmulsion";
import exteriorLuxuryDetail from "../data/productDetail.exteriorLatexPaint";
import premiumExteriorDetail from "../data/productDetail.premiumExteriorEmulsion";
import waterproofingSealerDetail from "../data/productDetail.waterproofingSealer";

const HERO_PRODUCTS = [
  {
    id: "Luxury-Interior-Emulsion",
    tag: "Interior",
    title: "Luxury Interior Emulsion",
    detail: interiorLuxuryDetail,
  },
  {
    id: "Premium-Interior-Emulsion",
    tag: "Interior", 
    title: "Premium Interior Emulsion",
    detail: premiumInteriorDetail,
  },
  {
    id: "Luxury-Exterior-Emulsion",
    tag: "Exterior",
    title: "Luxury Exterior Emulsion",
    detail: exteriorLuxuryDetail,
  },
  {
    id: "Premium-Exterior-Emulsion",
    tag: "Exterior",
    title: "Premium Exterior Emulsion",
    detail: premiumExteriorDetail,
  },
  {
    id: "WaterproofingSealer",
    tag: "Stain & sealer",
    title: "Waterproofing Sealer",
    detail: waterproofingSealerDetail,
  },
];

const formatINR = (value) =>
  value ? `₹${Number(value || 0).toLocaleString("en-IN")}` : "₹—";

const isSampleSize = (size = "") => /swatch|sample/i.test(size);

const pickDefaultSize = (detail) => {
  if (Array.isArray(detail?.packaging)) {
    const regular = detail.packaging.find((size) => !isSampleSize(size));
    if (regular) return regular;
  }
  if (Array.isArray(detail?.sizes)) {
    const regularEntry = detail.sizes.find((entry) => entry?.size && !isSampleSize(entry.size));
    if (regularEntry) return regularEntry.size;
  }
  return detail?.packaging?.[0] || detail?.sizes?.[0]?.size || "";
};

const pickDefaultFinish = (detail) =>
  detail?.defaultFinish || detail?.finishes?.[0]?.name || "";

const getPriceForSelection = (detail, finish, size) => {
  if (!detail) return 0;
  const priceMaps =
    detail.priceByFinish || detail.price_by_finish || detail.price_by_finish_all || {};
  const finishPrices = priceMaps?.[finish] || priceMaps?.[finish?.replace(/ Finish$/, "")] || {};
  let price = finishPrices?.[size];
  if (price === undefined && Array.isArray(detail?.sizes)) {
    const match = detail.sizes.find((entry) => entry.size === size);
    if (match && match.price !== undefined) price = match.price;
  }
  return price !== undefined ? price : detail.price || 0;
};

const getVariantId = (detail, size, finish) => {
  const map =
    detail?.shopify_variant_map ||
    detail?.variantMap ||
    detail?.variant_map ||
    detail?.shopifyVariantMap ||
    {};

  const candidates = [
    `${size}-${finish}`,
    `${size}-${finish} Finish`,
    `${size}-${finish?.replace(/ Finish$/, "")}`,
    `${size}-${finish?.replace(/\s+/g, " ")}`,
    `${size}-${finish?.replace(/\s+/g, "")}`,
  ];

  for (const key of candidates) {
    if (map[key]) return map[key];
  }
  return null;
};

const normaliseHeroProduct = ({ id, tag, title, detail }) => {
  const finish = pickDefaultFinish(detail);
  const size = pickDefaultSize(detail);
  return {
    id,
    title,
    category: tag || detail?.category || "General",
    description: detail?.shortDescription || detail?.description || "",
    image: detail?.image || detail?.bucketImage || "/Assets/Nova/1-main.png",
    slug: detail?.slug || detail?.id || id,
    finish,
    size,
    price: getPriceForSelection(detail, finish, size),
    coverage: detail?.coverage || detail?.coveragePerLitre || "",
    detail,
  };
};

export const Products = () => {
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addingId, setAddingId] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  const [errorId, setErrorId] = useState(null);

  const catalog = useMemo(
    () => HERO_PRODUCTS.map(normaliseHeroProduct),
    []
  );

  // Fixed categories as requested
  const categories = ["All", "Interior", "Exterior", "Stain & sealer"];

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return catalog.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        (selectedCategory === "Interior" && (product.category === "Interior" || product.title.toLowerCase().includes("interior"))) ||
        (selectedCategory === "Exterior" && (product.category === "Exterior" || product.title.toLowerCase().includes("exterior"))) ||
        (selectedCategory === "Stain & sealer" && (product.category === "Stain & sealer" || product.title.toLowerCase().includes("sealer") || product.title.toLowerCase().includes("waterproof")));

      const matchesTerm =
        !term ||
        product.title.toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term) ||
        (product.category || "").toLowerCase().includes(term);

      return matchesCategory && matchesTerm;
    });
  }, [catalog, selectedCategory, searchTerm]);

  const handleAddToCart = async (item) => {
    const productKey = item.slug || item.id;
    setAddingId(productKey);
    setErrorId(null);

    try {
      const variantId = getVariantId(item.detail, item.size, item.finish);
      await addToCart(
        item.detail,
        item.finish,
        item.size,
        1,
        item.price,
        null,
        "paint",
        variantId ? { variantId, productType: "paint" } : { productType: "paint" }
      );
      setLastAddedId(productKey);
      setTimeout(() => {
        setLastAddedId((current) => (current === productKey ? null : current));
      }, 2500);
    } catch (error) {
      console.error("[Products] addToCart failed", error);
      setErrorId(productKey);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <>
      <SEO
        title="Calyco Products"
        description="Discover Calyco's professional-grade paint systems curated for long-lasting colour and protection."
      />

      <section className="min-h-screen bg-[#f9f6f2]">
        {/* 
          🎯 IMPROVED HERO SECTION - Fixed spacing, no subtext, removed circle
        */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#493657]/95 via-[#493657] to-[#1f102e] text-white">
          <div className="absolute -top-24 -left-10 w-64 h-64 bg-[#F0C85A]/30 blur-[120px] rounded-full" />
          {/* Removed the round circle from right side */}

          {/* 🎯 MAIN CONTAINER PADDING: pt-24 = more top padding, pb-6 = minimal bottom */}
          <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-6">
            {/* 
              🎯 TITLE SPACING - Centered and improved
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold"
              >
                Professional-Grade Paint Systems
              </motion.h1>
            </motion.div>

            {/* 
              🎯 SHORTER SEARCH BAR - Centered and limited width
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-10 flex justify-center"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 w-full max-w-2xl">
                <FiSearch className="w-5 h-5 text-white/80" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name, category, or keywords..."
                  className="flex-1 bg-transparent py-4 outline-none text-white placeholder:text-white/60 text-lg"
                />
              </div>
            </motion.div>

            {/* 
              🎯 CATEGORY FILTER BUTTONS - Centered and improved styling
            */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 pb-6"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full transition-all duration-200 font-medium ${
                    selectedCategory === category
                      ? "bg-white text-[#493657] shadow-lg"
                      : "bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 
          🎯 PRODUCTS SECTION
        */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white border border-dashed border-[#493657]/20 rounded-3xl"
            >
              <h3 className="text-2xl font-semibold text-[#493657] mb-2">
                No matching products
              </h3>
              <p className="text-[#493657]/60">
                Try adjusting your search or browse another category to discover more Calyco
                finishes.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            >
              {filteredProducts.map((product, index) => {
                const productKey = product.slug || product.id || String(index);
                const busy = addingId === productKey;
                const added = lastAddedId === productKey;
                const errored = errorId === productKey;

                return (
                  <motion.div
                    key={productKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="group relative rounded-3xl bg-white border border-[#493657]/12 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-[520px]"
                  >
                    {/* Top gradient bar */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#493657] to-[#F0C85A]" />
                    
                    {/* Category badge only - overlapping the image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#493657]/90 text-white backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* 
                      🎯 3:4 ASPECT RATIO PRODUCT IMAGE - No white space, no borders
                    */}
                    <div className="relative w-full aspect-[3/4] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "/Assets/Nova/1-main.png";
                        }}
                      />
                    </div>

                    {/* 
                      🎯 PRODUCT DETAILS - Clean layout without unnecessary badges
                    */}
                    <div className="flex-1 flex flex-col justify-between p-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#493657] mb-2 group-hover:text-[#F0C85A] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-[#493657]/70 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* 
                        🎯 TWO ACTION BUTTONS - Side by side, no pricing
                      */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <Link
                          to={`/product/${product.slug}`}
                          className="inline-flex items-center justify-center gap-1 bg-white border-2 border-[#493657] text-[#493657] px-3 py-2 rounded-full text-sm font-semibold hover:bg-[#493657] hover:text-white transition-all duration-300"
                        >
                          <FiEye className="w-4 h-4" />
                          Details
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleAddToCart(product)}
                          disabled={busy}
                          className={`inline-flex items-center justify-center gap-1 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                            busy
                              ? "bg-[#493657]/60 text-white cursor-not-allowed"
                              : added
                              ? "bg-green-500 text-white"
                              : "bg-[#493657] text-white hover:bg-[#F0C85A] hover:text-[#493657]"
                          }`}
                        >
                          <FiShoppingCart className="w-4 h-4" />
                          {busy ? "Adding..." : added ? "Added!" : "Add to Cart"}
                        </button>
                      </div>
                      
                      {/* Error message */}
                      {errored && (
                        <p className="text-xs text-red-500 mt-2 text-center">
                          Unable to add to cart. Please try again.
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Products;
