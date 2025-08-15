import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function ProductColorDisclaimer() {
  return (
    <PolicyLayout title="Product / Color Disclaimer" lastUpdated="August 15, 2025">
      <h2>Digital vs Physical</h2>
      <p>
        On-screen colors are approximations. Device displays, color profiles, and print processes shift hue,
        saturation, and brightness. Final decisions must be based on physical cards or brush-outs on your wall.
      </p>

      <h2>Sampling & Confirmation</h2>
      <ul>
        <li>Test at least a 1 ft × 1 ft area on the actual surface. Let dry fully and view across the day.</li>
        <li>Compare against CALYCO swatch cards under intended lighting. Prefer 4000–5000K neutral light for review.</li>
        <li>Record the chosen shade name and Batch ID for ordering and future touch-ups.</li>
      </ul>

      <h2>Application Variables</h2>
      <ul>
        <li>Substrate: texture, porosity, prior color, alkalinity, moisture, efflorescence.</li>
        <li>Prep: cleaning, sanding, priming, filler quality, cure time.</li>
        <li>System: primer compatibility, dilution (if permitted), tool type, film build (DFT), recoat interval.</li>
        <li>Sheen: higher sheen looks lighter and more reflective; matte looks deeper.</li>
        <li>Environment: daylight vs artificial, color temperature (CCT), CRI, and viewing angle.</li>
      </ul>

      <h2>Batch & Tolerance</h2>
      <p>
        Minor batch-to-batch variation is normal. CALYCO controls shade within defined targets; small
        ΔE differences may still be visible on large walls or touch-ups. For continuous areas, use paint
        from the same Batch ID. Order enough material upfront to avoid mid-job shade joins.
      </p>

      <h2>Coverage Guidance</h2>
      <ul>
        <li>One-coat hide claims apply to primed, uniform, light-to-mid base colors using correct spread rate.</li>
        <li>Deep shades, high-contrast repaints, repairs, and porous substrates typically require additional coats.</li>
        <li>Always follow the product’s TDS for spread rate, DFT, and recoat times.</li>
      </ul>

      <h2>Lighting & Metamerism</h2>
      <p>
        Colors can shift under different lights (metamerism). Evaluate under your actual lighting plan:
        warm (2700–3000K), neutral (4000–5000K), or daylight (5000–6500K). Avoid judging next to strong
        accent colors that can cause simultaneous contrast.
      </p>

      <h2>Mixing & Touch-ups</h2>
      <ul>
        <li>Do not custom-mix across different products or finishes. Stir thoroughly before and during use.</li>
        <li>Touch-ups may flash or appear different due to film age and sheen burnish. Feather edges or repaint the panel to a break line.</li>
      </ul>

      <h2>Printed Materials & Renders</h2>
      <p>
        Brochures, mockups, website visuals, and CGI are illustrative. They show design intent, not exact shade.
        Use official CALYCO swatches and in-situ samples for final confirmation.
      </p>

      <h2>Limits of Liability</h2>
      <p>
        Shade selection is the buyer’s responsibility. CALYCO is not liable for decisions made from digital
        previews or third-party prints. Performance and appearance depend on correct surface prep and application
        as per the product TDS.
      </p>

      <h2>Need Help?</h2>
      <p>
        For shade advice or substrate queries, contact CALYCO with your surface details, lighting type, and any prior coatings.
        Provide the product name and Batch ID for support on touch-ups.
      </p>
    </PolicyLayout>
  );
}
