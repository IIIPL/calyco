import React, { useState } from "react";
import { products as allProducts } from "../data/products";
import { Link } from "react-router-dom";

// Group products by category and show all
const categories = ["Interior", "Exterior", "Wood Finishes"];
const grouped = {};
categories.forEach(cat => {
  grouped[cat] = Object.values(allProducts)
    .filter(p => p.category === cat);
});
const productList = [...grouped["Interior"], ...grouped["Exterior"], ...grouped["Wood Finishes"]];

export const ProductsDropdown = ({ onSelect }) => {
  const [hovered, setHovered] = useState(productList[0]);

  return (
    <div className="fixed left-0 top-[6.5rem] w-full bg-white border-t border-b border-[#e5e0d8] shadow-lg z-50 transition-opacity duration-300">
      <div className="max-w-screen-xl mx-auto px-24 py-14 flex gap-24 justify-between items-start">
        {/* Categories and products */}
        <div className="flex gap-20 flex-1">
          {categories.map(cat => (
            <div key={cat}>
              <h4 className="font-semibold mb-3 text-[#493657] underline">{cat}</h4>
              <ul className="space-y-2 text-[#493657]">
                {grouped[cat].map(product => (
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
          ))}
        </div>
        {/* Product image on hover (image only, no bg, no border, no height/fit) */}
        <div className="min-w-[260px] max-w-[280px] flex flex-col items-center justify-center">
          {hovered && (
            <img
              src={hovered.image}
              alt={hovered.name}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
}; 