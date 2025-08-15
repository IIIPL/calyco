import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function QualityPolicy() {
  return (
    <PolicyLayout title="Quality Policy" lastUpdated="August 15, 2025">
      <h2>Our Commitment</h2>
      <p>
        CALYCO Paints Private Limited (“CALYCO”) delivers coatings that meet documented
        performance specs, are safe to use as directed, and comply with applicable Indian
        regulations. We run a preventive, data-driven quality system focused on consistency,
        traceability, and continuous improvement.
      </p>

      <h2>Quality Objectives</h2>
      <ul>
        <li>Batch-to-batch variance within defined targets for viscosity, density, gloss, and color ΔE.</li>
        <li>Zero critical defects at dispatch; <span className="whitespace-nowrap">≤ 0.5%</span> field complaints per 1,000 units sold.</li>
        <li>Corrective action closure within 10 business days for any nonconformance.</li>
      </ul>

      <h2>Standards & Testing</h2>
      <p>
        We validate products against written specifications and recognized test methods where applicable,
        including IS/ASTM/ISO methods for film properties. Typical checks:
      </p>
      <ul>
        <li>Incoming RM: identity, moisture/solids, contamination screen.</li>
        <li>In-process: grind fineness, viscosity window, pH, density, shade control.</li>
        <li>Finished goods: hiding/opacity, touch-dry/recoat time, adhesion, scrub/washability, water resistance, gloss/sheen.</li>
        <li>Stain/Sealer lines: corrosion resistance panels (salt-spray/cyclic where applicable), water repellency, flexibility/elongation.</li>
      </ul>

      <h2>Batch Control & Traceability</h2>
      <ul>
        <li>Each batch carries a unique Batch ID on label and invoice; Certificate of Analysis available on request.</li>
        <li>Retention samples stored for the declared shelf life plus 3 months.</li>
        <li>Full lot genealogy: raw material lots ↔ production order ↔ dispatch documents.</li>
      </ul>

      <h2>Raw Materials</h2>
      <ul>
        <li>Approved-vendor list; COA verification against internal specs.</li>
        <li>No use of restricted substances beyond legal limits; low-VOC water-based systems prioritized.</li>
      </ul>

      <h2>Production Controls</h2>
      <ul>
        <li>SOPs for charging, mixing, milling, filtration, and filling.</li>
        <li>Line clearance and container hygiene checks before every run.</li>
        <li>Statistical sampling for QC release; only released lots move to FG warehouse.</li>
      </ul>

      <h2>Packaging & Labelling</h2>
      <ul>
        <li>Durable containers with tamper-evident seals where applicable.</li>
        <li>Labels include product name, color/shade, Batch ID, MFG/EXP, net quantity, and key instructions.</li>
      </ul>

      <h2>Storage & Shelf Life</h2>
      <ul>
        <li>Store sealed packs upright in a cool, dry place away from direct sun and frost.</li>
        <li>FIFO/FEFO enforced. Use before expiry for assured performance.</li>
      </ul>

      <h2>Nonconformance & CAPA</h2>
      <ul>
        <li>Isolate and block nonconforming material; investigate with 5-Why/Fishbone as needed.</li>
        <li>Implement corrective and preventive actions; verify effectiveness with follow-up tests.</li>
      </ul>

      <h2>Customer Feedback & Claims</h2>
      <ul>
        <li>Dedicated channel to log issues with photos, Batch ID, surface prep, and application details.</li>
        <li>Site assessment when required; documented resolution which may include replacement or refund per policy.</li>
      </ul>

      <h2>Training & Responsibility</h2>
      <ul>
        <li>Role-based training for production, QC, warehousing, and field teams.</li>
        <li>Quality is every employee’s responsibility; QA has authority to stop shipment if standards are not met.</li>
      </ul>

      <h2>Continuous Improvement</h2>
      <ul>
        <li>Quarterly quality reviews on defects, returns, and process capability.</li>
        <li>Supplier audits and formulation refinement to improve durability, coverage, and application.</li>
      </ul>
    </PolicyLayout>
  );
}
