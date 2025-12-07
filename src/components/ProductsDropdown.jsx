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
  ],
  PrimersSeal: [
    { slug: "calyco-water-primer-interior", name: "Interior Water-Based Primer" },
    { slug: "calyco-weather-primer-exterior", name: "Exterior Weather Primer" },
    { slug: "calyco-solvent-primer-interior", name: "Interior Solvent Primer" },
    { slug: "calyco-universal-primer", name: "Universal Primer" },
    { slug: "calyco-acrylic-wall-putty", name: "Acrylic Wall Putty" },
  ],
  Waterproofing: [
    { slug: "waterproofing-sealer", name: "Waterproofing Sealer" },
    { slug: "calyco-damp-guard-primer", name: "Damp Guard Primer" },
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

// Fallback: first interior product (used when visible list is empty but we still need one entry)
const interiorPrimary = allProducts.find(
  (p) => p.category?.toLowerCase() === "interior"
);
const exteriorPrimary = allProducts.find(
  (p) => p.category?.toLowerCase() === "exterior"
);

export const ProductsDropdown = ({ onSelect, isMobile = false }) => {
  const [selectedMenu, setSelectedMenu] = useState("Interior");
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const navigate = useNavigate();

  const getProductsForMenu = (menuKey) => grouped[menuKey] || [];

  // Use centralized product path helper
  const buildProductPath = (product) => getProductPath(product);

  useEffect(() => {
    const productsForMenu = getProductsForMenu(selectedMenu);
    if (productsForMenu.length) {
      // Skip dividers when picking default hovered item
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

  // ---------- MOBILE (unchanged) ----------
  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] flex justify-between items-center w-full"
        >
          <span>Products</span>
          <MobileChevron open={open} />
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } w-full`}
        >
          <div className="pl-4 py-2 flex flex-col gap-2">
            {leftMenu.map((item) => (
              <div key={item.key} className="w-full">
                <button
                  onClick={() => handleMenuClick(item)}
                  className="text-left text-[#493657] hover:text-[#F0C85A] py-1 w-full flex justify-between items-center"
                >
                  {item.label}
                  <MobileChevron
                    open={item.key !== "All" && submenuOpen === item.key}
                    className="text-[#8c7b96]"
                  />
                </button>
                {item.key !== "All" && (
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      submenuOpen === item.key
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    } pl-4`}
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
                          className="block text-left text-[#493657] hover:text-[#F0C85A] py-1 font-medium"
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
  // ---------- DESKTOP (shrunk left rail on smaller screens) ----------
  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50">
      <div
        className="
          max-w-screen-xl mx-auto
          px-4 sm:px-6 md:px-10 lg:px-24
          py-8 md:py-12 lg:py-14
          flex justify-between items-start
          gap-0
        "
      >
        {/* LEFT rail — narrower on small/medium */}
        <div
          className="
            flex flex-col
            min-w-[180px] max-w-[220px]
            sm:min-w-[200px] sm:max-w-[240px]
            md:min-w-[220px] md:max-w-[260px]
            lg:min-w-[220px] lg:max-w-[260px]
            border-r border-[#e5e0d8]
            pr-4 sm:pr-5 md:pr-6 lg:pr-10
          "
        >
          {leftMenu.map((item) => (
            <button
              key={item.key}
              className={`text-left font-bold
                          text-sm sm:text-base lg:text-lg
                          py-1.5 md:py-2 px-0 mb-1 border-b-2
                          ${
                            selectedMenu === item.key
                              ? "border-[#493657] text-[#493657]"
                              : "border-transparent text-[#495057] hover:text-[#F0C85A]"
                          }`}
              onClick={() => handleMenuClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MIDDLE list — tiny left padding so it sits close to the rail */}
        <div
          className="
            flex-1
            pl-2 sm:pl-3 md:pl-4 lg:pl-12
            pr-2 md:pr-4
            max-h-[50vh] md:max-h-[400px] overflow-y-auto
          "
        >
          
          <ul className="space-y-2 text-[#493657]">
            {(() => {
              const menuProducts = getProductsForMenu(selectedMenu);
              if (!menuProducts.length) return null;
              return menuProducts.map((product) => (
                <li
                  key={product.id || product.name}
                  className={`font-medium cursor-pointer ${
                    hovered?.name === product.name ? "font-semibold" : ""
                  }`}
                >
                  <Link
                    to={buildProductPath(product)}
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      if (onSelect) onSelect();
                    }}
                    onMouseEnter={() => handleHover(product)}
                    className="hover:text-[#F0C85A]"
                  >
                    {product.display_name || product.name}
                  </Link>
                </li>
              ));
            })()}
          </ul>
        </div>

        {/* RIGHT preview — responsive widths */}
        <div
          className="
            flex flex-col items-center justify-center gap-3
            min-w-[140px] max-w-[160px]
            sm:min-w-[180px] sm:max-w-[200px]
            md:min-w-[220px] md:max-w-[240px]
            lg:min-w-[260px] lg:max-w-[280px]
          "
        >
          {hovered && (
            <>
              <LazyLoadImage
                src={hovered.images?.[0] || hovered.image}
                alt={hovered.name}
                effect="blur"
                className="object-contain w-full h-40 md:h-56 lg:h-64"
              />

              <Link
                to={buildProductPath(hovered)}
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  if (onSelect) onSelect();
                }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg
                          bg-[#493657] text-white text-sm font-medium
                          hover:bg-[#F0C85A] hover:text-[#493657] transition-colors"
              >
                Explore more
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
