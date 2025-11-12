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
      
      {/* Navigation Dots with Arrows */}
      <div className="absolute bottom-6 left-1/2 bg-black p-2 rounded-2xl -translate-x-1/2 flex items-center gap-3 z-10">
        {/* Left Arrow */}
        <button
          onClick={() => {
            const newIndex = current === 0 ? heroData.length - 1 : current - 1;
            console.log('Left arrow clicked, changing to slide:', newIndex);
            setCurrent(newIndex);
          }}
          className="w-8 h-8 rounded-full bg-white bg-opacity-60 hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center text-gray-800 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
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

        {/* Right Arrow */}
        <button
          onClick={() => {
            const newIndex = current === heroData.length - 1 ? 0 : current + 1;
            console.log('Right arrow clicked, changing to slide:', newIndex);
            setCurrent(newIndex);
          }}
          className="w-8 h-8 rounded-full bg-white bg-opacity-60 hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center text-gray-800 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};