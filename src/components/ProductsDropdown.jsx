import React, { useState } from "react";
import { products as allProducts } from "../data/products";
import { Link, useNavigate } from "react-router-dom";

const leftMenu = [
  { key: "Interior", label: "INTERIOR" },
  { key: "Exterior", label: "EXTERIOR" },
  { key: "Industrial", label: "INDUSTRIAL" },
  { key: "Enamel", label: "ENAMEL" },
  { key: "All", label: "SHOW ALL PRODUCTS" },
];

const grouped = {
  Interior: Object.values(allProducts).filter(p => p.category === "Interior"),
  Exterior: Object.values(allProducts).filter(p => p.category === "Exterior"),
  Industrial: [], // No products yet
  Enamel: [], // No products yet
  All: Object.values(allProducts),
};

export const ProductsDropdown = ({ onSelect }) => {
  const [selectedMenu, setSelectedMenu] = useState("Interior");
  const [hovered, setHovered] = useState(grouped["Interior"][0]);
  const navigate = useNavigate();

  // Update hovered when menu changes
  React.useEffect(() => {
    setHovered(grouped[selectedMenu][0] || null);
  }, [selectedMenu]);

  const handleMenuClick = (item) => {
    if (item.key === "All") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate("/product");
      if (onSelect) onSelect();
    } else {
      setSelectedMenu(item.key);
    }
  };

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 transition-opacity duration-300">
      <div className="max-w-screen-xl mx-auto px-24 py-14 flex gap-0 justify-between items-start">
        {/* Left menu */}
        <div className="flex flex-col min-w-[200px] max-w-[220px] border-r border-[#e5e0d8] pr-10">
          {leftMenu.map(item => (
            <button
              key={item.key}
              className={`text-left text-lg font-bold uppercase py-2 px-0 mb-1 border-b-2 ${selectedMenu === item.key ? "border-[#493657] text-[#493657]" : "border-transparent text-[#495057] hover:text-[#F0C85A]"}`}
              onClick={() => handleMenuClick(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* Middle and Right: only show if not 'All' */}
        {selectedMenu !== "All" && (
          <>
            {/* Middle: product/category list */}
            <div className="flex-1 px-12">
              <h4 className="font-semibold mb-4 text-[#493657] text-base uppercase tracking-wide">
                {selectedMenu === "All" ? "ALL PRODUCTS" : `ALL ${selectedMenu.toUpperCase()} PAINTS`}
              </h4>
              <ul className="space-y-2 text-[#493657]">
                {grouped[selectedMenu].length === 0 && (
                  <li className="text-[#493657]/60 italic">No products available.</li>
                )}
                {grouped[selectedMenu].map(product => (
                  <li
                    key={product.id}
                    className={`cursor-pointer hover:text-[#F0C85A] transition-colors${hovered && hovered.id === product.id ? " font-bold" : ""}`}
                    onMouseEnter={() => setHovered(product)}
                  >
                    <Link to={`/product/${product.id}`} onClick={onSelect}>{product.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right: image preview */}
            <div className="min-w-[260px] max-w-[280px] flex flex-col items-center justify-center">
              {hovered && (
                <img
                  src={hovered.image}
                  alt={hovered.name}
                  className=""
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 