// src/components/HeroProducts.jsx
import React from "react";
import { Button } from "../Button";
import { products as allProducts } from "../../data/products";
import { getProductPath } from "../../utils/productHelpers";

const Brand = {
  purple: "#5E3A98",
  gold: "#C9A941",
  lavender: "#F3F0F9",
};

export const HeroProducts = ({ productName = "NOVA", productImage }) => {
  // Find the matching product to get the correct slug
  const product = allProducts.find(p =>
    p.name?.toLowerCase().includes(productName.toLowerCase()) ||
    p.display_name?.toLowerCase().includes(productName.toLowerCase()) ||
    p.id?.toLowerCase() === productName.toLowerCase()
  );

  // Get the proper product path using the centralized helper
  const productPath = product ? getProductPath(product) : `/product/${productName.replace(/\s+/g, '-')}`;

  return (
    <div
      className="w-full ring-1 ring-black/5"
      style={{ background: `linear-gradient(180deg, ${Brand.lavender} 0%, #fff 100%)` }}
    >
      {/* Consistent vertical space for the hero */}
      <div className="px-5 sm:px-8 py-4 sm:py-6 md:py-8 min-h-[160px] sm:min-h-[190px] md:min-h-[220px] lg:min-h-[260px]">
        {/* SINGLE LEFT BLOCK: grid keeps image & text on the same axis */}
        <div
          className="
            grid items-center gap-4 sm:gap-6 md:gap-8
            grid-cols-[auto_minmax(220px,1fr)]
          "
        >
          {/* Fixed-size image wrapper (bottom-aligned can = same baseline across slides) */}
          <div
            className="
              relative shrink-0
              w-[92px]  h-[140px]
              sm:w-[104px] sm:h-[160px]
              md:w-[120px] md:h-[190px]
              lg:w-[136px] lg:h-[210px]
              xl:w-[148px] xl:h-[230px]
              flex items-end justify-center
              overflow-hidden
            "
          >
            <img
              src={productImage}
              alt={productName}
              className="max-h-full w-auto object-contain object-bottom"
              width="300"
              height="400"
              loading="lazy"
              decoding="async"
            />
            {/* soft floor shadow to reinforce baseline */}
            <div
              className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[78%] h-2 rounded-full blur-lg opacity-30"
              style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.35), transparent)" }}
              aria-hidden="true"
            />
          </div>

          {/* Text column (stable width to avoid reflow) */}
          <div className="min-w-[220px]">
            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
              style={{ color: Brand.purple }}
            >
              {productName}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-700">One‑Coat Interior Paint</p>

            <Button
              size="sm"
              className="mt-4 w-max"
              to={productPath}
              style={{ backgroundColor: Brand.gold, color: "#1f2937" }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
