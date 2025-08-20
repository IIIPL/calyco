import React from "react";

const accent = "#5E3A98";
const highlight = "#C9A941";

export default function Hero({ heroImg }) {
  return (
    <section
      className="relative overflow-hidden w-full bg-white min-h-[480px] flex items-center justify-center py-12 sm:py-20"
      aria-label="CALYCO high-performance, low-VOC paints hero section"
    >
      {/* Glow background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 30% 40%, #5E3A98 0%, transparent 70%),radial-gradient(ellipse 60% 40% at 80% 70%, #C9A94133 0%, transparent 80%)",
          opacity: 0.18,
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 px-4 sm:px-8">
        {/* Left: Text */}
        <div className="flex-1 w-full max-w-2xl text-center lg:text-left">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#5E3A98] leading-tight mb-4">
            High-Performance, Low-VOC Paints Built for Real-World Jobs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#333333] mb-6 font-medium">
            CALYCO delivers one-coat interior paints and pro-grade stains &amp; sealers that last, with low odor and superior adhesion across concrete, metal, wood, and more.
          </p>
          <ul className="mb-8 space-y-2 text-left inline-block lg:block">
            <li className="flex items-start gap-2 text-[#5E3A98] text-sm sm:text-base">
              <span className="inline-block w-2 h-2 mt-2 rounded-full" style={{ background: highlight }}></span>
              <span className="text-[#333333]">One-coat coverage. 10+ year interior durability.</span>
            </li>
            <li className="flex items-start gap-2 text-[#5E3A98] text-sm sm:text-base">
              <span className="inline-block w-2 h-2 mt-2 rounded-full" style={{ background: highlight }}></span>
              <span className="text-[#333333]">Low-VOC, water-based, easy cleanup.</span>
            </li>
            <li className="flex items-start gap-2 text-[#5E3A98] text-sm sm:text-base">
              <span className="inline-block w-2 h-2 mt-2 rounded-full" style={{ background: highlight }}></span>
              <span className="text-[#333333]">UV and weather resistant. Multi-surface adhesion.</span>
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-4">
            <a
              href="/products"
              aria-label="Explore CALYCO products"
              data-cta="explore-products"
              className="inline-block px-7 py-3 rounded-lg font-semibold text-white bg-[#5E3A98] shadow-md hover:bg-[#4a2e7a] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E3A98] focus:outline-none transition-colors text-base sm:text-lg text-center"
            >
              Explore Products
            </a>
            <a
              href="/bulk-pricing"
              aria-label="Get bulk pricing for CALYCO"
              data-cta="get-bulk-pricing"
              className="inline-block px-7 py-3 rounded-lg font-semibold border-2 border-[#5E3A98] text-[#5E3A98] bg-white hover:bg-[#f6f3fa] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5E3A98] focus:outline-none transition-colors text-base sm:text-lg text-center"
            >
              Get Bulk Pricing
            </a>
          </div>
          <div className="text-xs sm:text-sm text-[#333333] font-medium mt-2" id="calyco-trust-row">
            Trusted by contractors, developers, and industrial buyers.
          </div>
        </div>
        {/* Right: Image (optional) */}
        {heroImg && (
          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
            <img
              src={heroImg}
              alt="CALYCO high-performance coatings and paints"
              className="block w-full h-auto max-h-[340px] rounded-xl shadow-lg object-contain bg-white"
              width="400"
              height="340"
              loading="eager"
              draggable="false"
            />
          </div>
        )}
      </div>
    </section>
  );
}
