import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSearch, FiHeart, FiShoppingBag, FiLayers, FiDroplet } from "react-icons/fi";
import SEO from "../components/SEO";

// Import all your 5 products directly
import { premiumInteriorEmulsion } from "../data/productDetail.premiumInteriorEmulsion";
import { luxuryInteriorEmulsion } from "../data/productDetail.luxuryInteriorEmulsion";
import { premiumExteriorEmulsion } from "../data/productDetail.premiumExteriorEmulsion";
import { luxuryExteriorEmulsion } from "../data/productDetail.luxuryExteriorEmulsion";
import { waterproofingSealer } from "../data/productDetail.waterproofingSealer";

const formatINR = (value) =>
  value ? `₹${Number(value || 0).toLocaleString("en-IN")}` : "₹—";

// Define your 5 products with proper data
const productCatalog = [
  {
    id: "premium-interior-emulsion",
    slug: "premium-interior-emulsion",
    name: "Premium Interior Emulsion",
    shortName: "Premium Interior",
    description: "Premium interior paint with low sheen finish, perfect for living spaces",
    category: "Interior Paints",
    image: "/Assets/Interior/1-main.png",
    finish: "Low Sheen",
    coverage: "10-11 sq.ft./Ltr",
    sizes: ["1L", "4L", "10L", "20L"],
    startingPrice: 700,
    originalPrice: 850,
    features: ["Low Sheen Finish", "Smooth Application", "Long-lasting"],
    productData: premiumInteriorEmulsion
  },
  {
    id: "luxury-interior-emulsion",
    slug: "luxury-interior-emulsion",
    name: "Luxury Interior Emulsion",
    shortName: "Luxury Interior",
    description: "Luxury interior paint with pearl finish for elegant interiors",
    category: "Interior Paints",
    image: "/Assets/Interior/luxury-main.png",
    finish: "Pearl",
    coverage: "10-11 sq.ft./Ltr",
    sizes: ["1L", "4L", "10L", "20L"],
    startingPrice: 800,
    originalPrice: 950,
    features: ["Pearl Finish", "Premium Quality", "Rich Texture"],
    productData: luxuryInteriorEmulsion
  },
  {
    id: "premium-exterior-emulsion",
    slug: "premium-exterior-emulsion", 
    name: "Premium Exterior Emulsion",
    shortName: "Premium Exterior",
    description: "Weather-resistant exterior paint with matte finish",
    category: "Exterior Paints",
    image: "/Assets/Exterior/1-main.png",
    finish: "Matte",
    coverage: "10-11 sq.ft./Ltr",
    sizes: ["1L", "4L", "10L", "20L"],
    startingPrice: 700,
    originalPrice: 850,
    features: ["Weather Resistant", "Matte Finish", "UV Protection"],
    productData: premiumExteriorEmulsion
  },
  {
    id: "luxury-exterior-emulsion",
    slug: "luxury-exterior-emulsion",
    name: "Luxury Exterior Emulsion", 
    shortName: "Luxury Exterior",
    description: "High-performance exterior paint with high sheen finish",
    category: "Exterior Paints",
    image: "/Assets/Exterior/luxury-main.png",
    finish: "High Sheen",
    coverage: "10-11 sq.ft./Ltr", 
    sizes: ["1L", "4L", "10L", "20L"],
    startingPrice: 800,
    originalPrice: 950,
    features: ["High Sheen", "Superior Durability", "Self-Cleaning"],
    productData: luxuryExteriorEmulsion
  },
  {
    id: "waterproofing-sealer",
    slug: "waterproofing-sealer",
    name: "Waterproofing Sealer",
    shortName: "Waterproof Sealer", 
    description: "Multi-surface protection & sealing with chocolate brown finish",
    category: "Specialty Coatings",
    image: "/Assets/Nova/1-main.png",
    finish: "Matte",
    coverage: "85-110 sq.ft./Ltr",
    sizes: ["1L", "4L", "10L"],
    startingPrice: 700,
    originalPrice: 760,
    features: ["Waterproof", "Multi-Surface", "Protective Coating"],
    productData: waterproofingSealer
  }
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(productCatalog.map((item) => item.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return productCatalog.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.features.some(feature => feature.toLowerCase().includes(term));

      return matchesCategory && matchesTerm;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <>
      <SEO
        title="Calyco Products - Professional Paint Collection"
        description="Discover Calyco's complete range of premium interior, exterior, and specialty paints. Professional-grade quality for every surface."
      />

      <section className="min-h-screen bg-gradient-to-br from-[#f9f6f2] to-[#f4f1f8]">
        {/* Premium Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#493657] via-[#5d4570] to-[#493657]">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/800')] bg-cover bg-center opacity-10" />
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 bg-[#F0C85A]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#F0C85A]/15 rounded-full blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                Premium Paint 
                <span className="text-[#F0C85A]"> Collection</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90 leading-relaxed"
              >
                Discover our complete range of professional-grade paints engineered for 
                Indian conditions. From elegant interiors to weather-resistant exteriors.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Search & Filter Section */}
        <div className="mx-auto max-w-7xl px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <FiSearch className="w-5 h-5 text-[#493657]/50" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search paints by name, type, or features..."
                  className="w-full pl-12 pr-4 py-4 bg-white/70 border border-[#493657]/10 rounded-2xl text-[#493657] placeholder:text-[#493657]/50 focus:outline-none focus:ring-2 focus:ring-[#F0C85A]/50 focus:border-[#F0C85A]/30 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 lg:min-w-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#493657] text-white shadow-lg scale-105"
                        : "bg-white/70 text-[#493657]/70 hover:bg-white hover:text-[#493657] hover:shadow-md"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="mt-12">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/50 rounded-3xl border border-[#493657]/10"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-[#493657] mb-2">
                  No matching products found
                </h3>
                <p className="text-[#493657]/70">
                  Try adjusting your search or explore different categories
                </p>
              </motion.div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50"
                  >
                    {/* Premium Badge */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#493657] via-[#F0C85A] to-[#493657]" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#493657]/90 text-white backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Favorite Button */}
                    <div className="absolute top-4 right-4 z-10">
                      <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#493657]/70 hover:text-red-500 hover:bg-white transition-all">
                        <FiHeart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="relative pt-16 pb-6 px-6">
                      <div className="relative bg-gradient-to-br from-[#f8f6f2] to-[#f4f1f8] rounded-2xl p-8 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-contain drop-shadow-xl"
                          onError={(e) => {
                            e.target.src = "/Assets/Nova/1-main.png"; // Fallback image
                          }}
                        />
                        {/* Discount Badge */}
                        {product.originalPrice > product.startingPrice && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            SAVE ₹{product.originalPrice - product.startingPrice}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="px-6 pb-6">
                      <h3 className="text-xl font-bold text-[#493657] mb-2 group-hover:text-[#F0C85A] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#493657]/70 mb-4 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Product Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#493657]/10 text-[#493657] rounded-full text-xs font-medium">
                          <FiDroplet className="w-3 h-3" />
                          {product.finish}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#493657]/10 text-[#493657] rounded-full text-xs font-medium">
                          <FiLayers className="w-3 h-3" />
                          {product.coverage}
                        </span>
                      </div>

                      {/* Sizes */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.sizes.map((size) => (
                          <span key={size} className="px-2 py-1 bg-[#F0C85A]/20 text-[#493657] rounded text-xs font-medium">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="bg-gradient-to-r from-[#f8f6f2] to-white px-6 py-4 border-t border-[#493657]/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-[#493657]">
                              {formatINR(product.startingPrice)}
                            </span>
                            {product.originalPrice > product.startingPrice && (
                              <span className="text-sm text-[#493657]/50 line-through">
                                {formatINR(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#493657]/60">Starting price per litre</p>
                        </div>
                        <Link
                          to={`/product/${product.slug}`}
                          className="inline-flex items-center gap-2 bg-[#493657] hover:bg-[#F0C85A] text-white hover:text-[#493657] px-4 py-2 rounded-full font-semibold transition-all duration-300 group-hover:scale-105"
                        >
                          <FiShoppingBag className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
