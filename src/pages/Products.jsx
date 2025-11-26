import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiEye } from "react-icons/fi";
import SEO from "../components/SEO";
import { products } from "../data/products";

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

const normaliseProduct = (product) => {
  const finish = pickDefaultFinish(product);
  const size = pickDefaultSize(product);
  return {
    id: product.id,
    title: product.name,
    category: product.category || "General",
    description: product["short-description"] || product.description || "",
    image: product.image || "/Assets/Nova/1-main.webp",
    slug: product.slug,
    finish,
    size,
    price: getPriceForSelection(product, finish, size),
    coverage: product.coverage || "",
    detail: product,
  };
};

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const catalog = useMemo(
    () => products.map(normaliseProduct),
    []
  );

  // Generate categories from products
  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    products.forEach(p => {
      if (p.category) {
        cats.add(p.category.charAt(0).toUpperCase() + p.category.slice(1));
      }
    });
    return Array.from(cats);
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return catalog.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesTerm =
        !term ||
        product.title.toLowerCase().includes(term) ||
        (product.description || "").toLowerCase().includes(term) ||
        (product.category || "").toLowerCase().includes(term);

      return matchesCategory && matchesTerm;
    });
  }, [catalog, selectedCategory, searchTerm]);

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
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-[1.1]"
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
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 w-full max-w-2xl min-w-0">
                <FiSearch className="w-5 h-5 text-white/80" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products by name, category, or keywords..."
                  className="flex-1 min-w-0 bg-transparent py-4 outline-none text-white placeholder:text-white/60 text-lg overflow-hidden text-ellipsis whitespace-nowrap"
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
              className="flex flex-nowrap gap-3 pb-6 overflow-x-auto px-2 md:px-0 justify-start md:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                          e.target.src = "/Assets/Nova/1-main.webp";
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
                        🎯 VIEW DETAILS BUTTON - Users need to select colors first
                      */}
                      <div className="mt-4">
                        <Link
                          to={`/product/${product.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#493657] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#F0C85A] hover:text-[#493657] transition-all duration-300"
                        >
                          <FiEye className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
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
