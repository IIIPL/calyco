// src/components/ColorDisclaimer.jsx
import React from "react";

export const ColorDisclaimer = ({ variant = "full", className = "" }) => {
  const Full = () => (
    <>
      <p className="mb-3 sm:mb-4">
        Digital previews are indicative only. Color appearance varies by device/display settings, browser/OS, ambient
        light, and viewing angle.
      </p>
      <ul className="list-disc pl-5 space-y-2 sm:space-y-1.5">
        <li>Substrate & prep affect shade: texture, porosity, moisture, alkalinity, and previous color.</li>
        <li>Sheen, application method, dilution, film thickness, and drying/curing alter perception.</li>
        <li>Lighting (daylight vs. artificial) and time of day change how a color reads.</li>
        <li>Minor variation can occur between digital swatches, sample panels, and finished surfaces.</li>
      </ul>
      <p className="mt-4 sm:mt-5">
        For the most accurate match, use official <strong>CALYCO</strong> physical color cards or request a sample
        panel/brush-out and view it in your space. For best results, follow the Product Information Sheet, use
        recommended primer/base shade, and test on-site before finalizing.
      </p>
    </>
  );

  const Short = () => (
    <p>
      On-screen colors are a guide only. Shade can vary by device, light, substrate, and sheen. Confirm with official{" "}
      <strong>CALYCO</strong> color cards or a sample applied in your space before final selection.
    </p>
  );

  return (
    <div
      role="note"
      aria-label="Color disclaimer"
      className={[
        "mx-auto ",
        "mt-8 sm:mt-10 ",
        "rounded-xl border border-[#e5e0d8] bg-[#f9f6ef] text-[#2c2240]",
        "p-4 sm:p-5 md:p-6 shadow-sm",
        "md:flex md:items-start md:gap-4",
        "border-l-4 border-l-gray-400",
        className,
      ].join(" ")}
    >
      <div className="w-full">
        <h3 className="font-semibold text-[#493657] mb-2 text-base sm:text-lg">
          CALYCO Sacred Palette — Color Disclaimer
        </h3>
        <div className="text-sm sm:text-[15px] leading-relaxed sm:leading-relaxed md:leading-loose">
          {variant === "full" ? <Full /> : <Short />}
        </div>
      </div>
    </div>
  );
};

export default ColorDisclaimer;
