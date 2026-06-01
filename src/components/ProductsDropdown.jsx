import React, { useState, useEffect } from "react";
import { products as allProducts } from "../data/products";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getProductPath } from "../utils/productHelpers";
import MobileChevron from "./MobileChevron";

const leftMenu = [
  { key: "Interior", label: "Interior (Wall Paints)" },
  { key: "Exterior", label: "Exterior (Wall Paints)" },
  { key: "WoodMetal", label: "Wood & Metal (Enamels & Coatings)" },
  { key: "PrimersSeal", label: "Primers & Sealers" },
  { key: "Waterproofing", label: "Waterproofing" },
  { key: "Texture", label: "Texture Paints" },
  { key: "All", label: "Show All Products" },
];

// Explicit grouping by category and order
const groups = {
  Interior: [
    { slug: "Premium-Interior-Emulsion", name: "Premium Interior Emulsion" },
    { slug: "Interior-Latex-Paint", name: "Luxury Interior Emulsion" },
    { slug: "calyco-acrylic-washable-distemper", name: "Acrylic Washable Distemper" },
  ],
  Exterior: [
    { slug: "Premium-Exterior-Emulsion", name: "Premium Exterior Emulsion" },
    { slug: "Exterior-Latex-Paint", name: "Luxury Exterior Emulsion" },
    { slug: "calyco-all-surface-coating", name: "All Surface Coating" },
  ],
  WoodMetal: [
    { slug: "calyco-amrella-enamel", name: "Dura-Shield Enamel" },
    { slug: "calyco-pu-wood-coating", name: "PU Wood Coating" },
    { slug: "melamine-polish", name: "Melamine Polish" },
    { slug: "fire-retardant-paint", name: "Fire Retardant Paint" },
    { slug: "anticorrosive-bitumastic", name: "Anticorrosive Bitumastic Paint" },
    { slug: "epoxy-paint", name: "Epoxy Paint" },
  ],
  PrimersSeal: [
    { slug: "calyco-water-primer-interior", name: "Interior Water-Based Primer" },
    { slug: "calyco-weather-primer-exterior", name: "Exterior Weather Primer" },
    { slug: "calyco-solvent-primer-interior", name: "Interior Solvent Primer" },
    { slug: "calyco-universal-primer", name: "Universal Primer" },
    { slug: "calyco-acrylic-wall-putty", name: "Acrylic Wall Putty" },
    { slug: "pink-primer", name: "Pink Primer" },
    { slug: "yellow-metal-primer", name: "Yellow Metal Primer" },
    { slug: "wood-primer", name: "Wood Primer" },
    { slug: "red-oxide-zinc-chromate", name: "Red Oxide Zinc Chromate Primer" },
  ],
  Waterproofing: [
    { slug: "waterproofing-sealer", name: "Waterproofing Sealer" },
    { slug: "calyco-damp-guard-primer", name: "Damp Guard Primer" },
  ],
  Texture: [
    { slug: "calyco-texture-paint", name: "Calyco Texture Paint" },
  ],
};

const findProductBySlug = (slug) =>
  allProducts.find((p) => p.slug === slug) ||
  allProducts.find((p) => (p.url || "").endsWith(slug)) ||
  allProducts.find((p) => (p.id || "").toLowerCase() === slug.toLowerCase());

const grouped = Object.fromEntries(
  Object.entries(groups).map(([key, items]) => {
    const list = items
      .map((item) => {
        if (item.divider) return item;
        const product = findProductBySlug(item.slug);
        if (!product) return null;
        return {
          ...product,
          display_name: item.name || product.name,
        };
      })
      .filter(Boolean);
    return [key, list];
  })
);

export const ProductsDropdown = ({ onSelect, isMobile = false }) => {
  const [selectedMenu, setSelectedMenu] = useState("Interior");
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const navigate = useNavigate();

  const getProductsForMenu = (menuKey) => grouped[menuKey] || [];

  const buildProductPath = (product) => getProductPath(product);

  useEffect(() => {
    const productsForMenu = getProductsForMenu(selectedMenu);
    if (productsForMenu.length) {
      const firstProduct = productsForMenu.find((p) => !p.divider);
      setHovered(firstProduct || null);
    } else {
      setHovered(null);
    }
  }, [selectedMenu]);

  const handleMenuClick = (item) => {
    if (item.key === "All") {
      navigate("/products");
      if (onSelect) onSelect();
    } else {
      setSubmenuOpen(submenuOpen === item.key ? null : item.key);
      setSelectedMenu(item.key);
    }
  };

  const handleHover = (product) => setHovered(product);

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start border-b border-[#e5e0d8]/50">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] py-4 flex justify-between items-center w-full transition-colors duration-300"
        >
          <span className="text-lg font-medium">Products</span>
          <MobileChevron open={open} />
        </button>
        <div
          className={`transition-all duration-500 ease-[bezier(0.4,0,0.2,1)] overflow-hidden ${open ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"
            } w-full`}
        >
          <div className="pl-4 flex flex-col gap-2">
            {leftMenu.map((item) => (
              <div key={item.key} className="w-full">
                <button
                  onClick={() => handleMenuClick(item)}
                  className="text-left text-[#493657] hover:text-[#F0C85A] py-2 w-full flex justify-between items-center font-medium"
                >
                  {item.label}
                  <MobileChevron
                    open={item.key !== "All" && submenuOpen === item.key}
                    className="text-[#8c7b96]"
                  />
                </button>
                {item.key !== "All" && (
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${submenuOpen === item.key
                        ? "max-h-[1000px] opacity-100 mt-2"
                        : "max-h-0 opacity-0"
                      } pl-4 flex flex-col gap-2 border-l border-gray-100 ml-2`}
                  >
                    {(() => {
                      const menuProducts = getProductsForMenu(item.key).filter((p) => !p.divider);
                      if (!menuProducts.length) return null;
                      return menuProducts.map((product) => (
                        <Link
                          key={product.id || product.name}
                          to={buildProductPath(product)}
                          onClick={() => {
                            window.scrollTo({ top: 0 });
                            if (onSelect) onSelect();
                            setOpen(false);
                            setSubmenuOpen(null);
                            setHovered(product);
                          }}
                          className="block text-left text-gray-600 hover:text-[#F0C85A] py-1 text-sm transition-colors"
                        >
                          {product.display_name || product.name}
                        </Link>
                      ));
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white/95 backdrop-blur-md border-t border-b border-[#e5e0d8] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] z-50 font-poppins transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-10 lg:px-24 py-16 flex gap-12">
        {/* LEFT rail */}
        <div className="flex flex-col w-72 pr-8 border-r border-[#e5e0d8]/50">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-6 pl-4">Categories</h3>
          {leftMenu.map((item) => (
            <button
              key={item.key}
              className={`text-left text-base lg:text-lg py-3 px-4 rounded-lg transition-all duration-300 ${selectedMenu === item.key
                  ? "bg-[#F9F6FF] text-[#493657] font-bold shadow-sm translate-x-1"
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#493657]"
                }`}
              onClick={() => handleMenuClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MIDDLE list */}
        <div className="flex-1 px-8 max-h-[500px] overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-6">Values</h3>
          <ul className="space-y-4">
            {(() => {
              const menuProducts = getProductsForMenu(selectedMenu);
              if (!menuProducts.length) return null;
              return menuProducts.map((product) => (
                <li key={product.id || product.name}>
                  <Link
                    to={buildProductPath(product)}
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      if (onSelect) onSelect();
                    }}
                    onMouseEnter={() => handleHover(product)}
                    className={`group flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${hovered?.name === product.name
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                      }`}
                  >
                    <span className={`text-xl transition-colors duration-300 ${hovered?.name === product.name
                        ? "text-[#493657] font-bold"
                        : "text-[#493657] font-medium"
                      }`}>
                      {product.display_name || product.name}
                    </span>

                    <span className={`transition-all duration-300 text-[#F0C85A] ${hovered?.name === product.name ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                      }`}>
                      →
                    </span>
                  </Link>
                </li>
              ));
            })()}
          </ul>
        </div>

        {/* RIGHT preview */}
        <div className="w-80 flex flex-col items-center justify-center">
          {hovered && (
            <div className="relative group w-full">
              <div className="w-full h-64 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-2">
                <LazyLoadImage
                  src={hovered.images?.[0] || hovered.image}
                  alt={hovered.name}
                  effect="blur"
                  className="object-contain max-h-full max-w-full drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="mt-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Link
                  to={buildProductPath(hovered)}
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    if (onSelect) onSelect();
                  }}
                  className="inline-flex items-center gap-2 text-[#493657] font-bold uppercase tracking-wider text-sm border-b-2 border-[#F0C85A] pb-1 hover:text-[#F0C85A] transition-colors"
                >
                  Explore Product <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

