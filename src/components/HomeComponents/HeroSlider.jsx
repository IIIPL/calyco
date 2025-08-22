import React, { useState } from "react";
import { HeroProducts } from "./HeroProducts";

const heroData = [
  {
    productName: "Nova",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142454/NoBg_ojfrtz.png",
  },
  {
    productName: "Aluminium Paint",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142297/NoBg_pnnshq.png",
  },
  {
    productName: "Alkyd Enamel",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142296/NoBg_pyhvl6.png",
  },
  {
    productName: "Defense",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142305/NoBg_ur9qqq.png",
  },
  {
    productName: "WoodGuard",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142463/NoBg_yrymef.png",
  },
  {
    productName: "Thermacool",
    productImage: "https://res.cloudinary.com/dr98axi2n/image/upload/v1754142461/NoBg_cb0amu.png",
  },
  {
    productName: "LustroLite",
    productImage: "/Assets/LustroLite/inhouse.png",
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Debug: Log when component renders to verify no autoplay
  console.log('HeroSlider rendered, current slide:', current);

  return (
    <div className="relative w-full min-h-[300px] flex items-center justify-center overflow-hidden">
      {/* Simple Slide Display - NO AUTOPLAY, NO ANIMATIONS */}
      <div className="absolute inset-0">
        <HeroProducts
          productName={heroData[current].productName}
          productImage={heroData[current].productImage}
        />
      </div>
      
      {/* Navigation Dots - ONLY WAY TO CHANGE SLIDES */}
      <div className="absolute bottom-6 left-1/2 bg-black p-2 rounded-2xl -translate-x-1/2 flex gap-3 z-10">
        {heroData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              console.log('Dot clicked, changing to slide:', index);
              setCurrent(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current 
                ? "bg-[#2C194B] scale-125" 
                : "bg-white bg-opacity-50 hover:bg-opacity-80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};