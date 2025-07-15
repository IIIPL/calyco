import React from "react";
import { products as allProducts } from "../data/products";
import { Link } from "react-router-dom";

// Example: Show only interior products
const interiorProducts = Object.values(allProducts).filter(p => p.category === "Interior");

export const Interior = () => {
  return (
    <div className="min-h-screen bg-[#f9f6f2] pt-32 pb-20 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#493657] mb-4">Interior Paints</h1>
        <p className="text-[#493657]/80 mb-6">
          Discover our range of premium interior paints, engineered for beautiful color, durability, and a flawless finish. Perfect for living rooms, bedrooms, kitchens, and more.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {interiorProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <img src={product.image} alt={product.name} className="w-28 h-28 object-contain mb-4" />
            <h3 className="text-lg font-bold text-[#493657] mb-2 text-center">{product.name}</h3>
            <p className="text-[#493657]/80 text-sm mb-4 text-center">{product.shortDescription}</p>
            <ul className="text-[#493657] text-xs mb-4 list-disc pl-4 text-left w-full">
              {product.features.slice(0, 4).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <Link to={`/product/${product.id}`} className="mt-auto px-6 py-2 rounded-full bg-[#F0C85A] text-[#493657] font-semibold shadow hover:bg-[#ffe9a7] transition">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
