import { useState, useEffect, useRef } from "react";
import { HeroProducts } from "./HeroProducts";

export default function Carousel() {
  const slides = [
    <HeroProducts key={0} index={0} productName="Aluminium Paint" productImage="https://res.cloudinary.com/dr98axi2n/image/upload/v1754142297/NoBg_pnnshq.png" />,
    <HeroProducts key={1} index={1} productName="Alkyd Enamel" productImage="https://res.cloudinary.com/dr98axi2n/image/upload/v1754142296/NoBg_pyhvl6.png" />,
    <HeroProducts key={2} index={2} productName="Defense" productImage="https://res.cloudinary.com/dr98axi2n/image/upload/v1754142305/NoBg_ur9qqq.png" />,
    <HeroProducts key={3} index={3} productName="Nova" productImage="https://res.cloudinary.com/dr98axi2n/image/upload/v1754142454/NoBg_ojfrtz.png" />,
    <HeroProducts key={4} index={4} productName="Thermacool" productImage="https://res.cloudinary.com/dr98axi2n/image/upload/v1754142461/NoBg_cb0amu.png" />,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentIndex(index);

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slide container */}
      <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-56 md:h-96 flex items-center justify-center">
            {slide}
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-400"}`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1 1 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 6 10" xmlns="http://www.w3.org/2000/svg">
            <path d="m1 9 4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </div>
  );
}
