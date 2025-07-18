// ✅ Unified ProductsDropdown with mobile & desktop logic
import React, { useState, useEffect } from "react";
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
  Interior: allProducts.filter(p => p.category?.toLowerCase() === "interior"),
  Exterior: allProducts.filter(p => p.category?.toLowerCase() === "exterior"),
  Industrial: allProducts.filter(p => p.category?.toLowerCase().includes("industrial")),
  Enamel: allProducts.filter(p => p.category?.toLowerCase().includes("enamel")),
  All: allProducts,
};

export const ProductsDropdown = ({ onSelect, isMobile = false }) => {
  const [selectedMenu, setSelectedMenu] = useState("Interior");
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMenu && grouped[selectedMenu]?.[0]) {
      setHovered(grouped[selectedMenu][0]);
    } else {
      setHovered(null);
    }
  }, [selectedMenu]);

  const handleMenuClick = (item) => {
    if (item.key === "All") {
      navigate("/product");
      if (onSelect) onSelect();
    } else {
      setSubmenuOpen(submenuOpen === item.key ? null : item.key);
      setSelectedMenu(item.key);
    }
  };

  const handleHover = (product) => {
    setHovered(product);
  };

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-start">
        <button
          onClick={() => setOpen(!open)}
          className="text-[#493657] hover:text-[#F0C85A] flex justify-between w-full"
        >
          <span>Products</span>
          <span className={`transform transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} w-full`}
        >
          <div className="pl-4 py-2 flex flex-col gap-2">
            {leftMenu.map(item => (
              <div key={item.key} className="w-full">
                <button
                  onClick={() => handleMenuClick(item)}
                  className="text-left text-[#493657] hover:text-[#F0C85A] py-1 w-full flex justify-between items-center"
                >
                  {item.label}
                  <span className={`transform transition-transform ${submenuOpen === item.key ? 'rotate-90' : ''}`}>▶</span>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${submenuOpen === item.key ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'} pl-4`}
                >
                  {grouped[item.key]?.map(product => (
                    <Link
                      key={product.name}
                      to={`/product/${product.name}`}
                      onClick={() => {
                        window.scrollTo({ top: 0 });
                        if (onSelect) onSelect();
                        setOpen(false);
                        setSubmenuOpen(null);
                      }}
                      className="block text-left text-[#493657] hover:text-[#F0C85A] py-1 font-medium"
                    >
                      {product.display_name || product.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50">
      <div className="max-w-screen-xl mx-auto px-24 py-14 flex justify-between">
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

        <>
          <div className="flex-1 px-12 max-h-[400px] overflow-y-auto">
            <h4 className="font-semibold mb-4 text-[#493657] text-base uppercase tracking-wide">
              {`ALL ${selectedMenu.toUpperCase()} PAINTS`}
            </h4>
            <ul className="space-y-2 text-[#493657]">
              {grouped[selectedMenu].map(product => (
                <li
                  key={product.name}
                  className={`font-medium cursor-pointer ${hovered?.name === product.name ? 'font-semibold' : ''}`}
                >
                  <Link
                    to={`/product/${product.name}`}
                    onClick={() => { window.scrollTo({ top: 0 }); if (onSelect) onSelect(); }}
                    onMouseEnter={() => handleHover(product)}
                    className="hover:text-[#F0C85A]"
                  >
                    {product.display_name || product.name}
                  </Link>
                </li>
              
              ))}
            </ul>
          </div>
          <div className="min-w-[260px] max-w-[280px] flex items-center justify-center">
            {hovered && (
              <img src={hovered.image} alt={hovered.name} className="object-contain h-48" />
            )}
          </div>
        </>
      </div>
    </div>
  );
};
