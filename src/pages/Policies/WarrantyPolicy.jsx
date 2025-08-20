import React, { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function WarrantyPolicy() {
  useEffect(() => {
    document.title = "Warranty Policy";
  }, []);

  return (
    <PolicyLayout title="Calyco Interior Paint Limited Warranty" lastUpdated="2025-08-18">
      {/* Introduction */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Introduction
      </h2>
      <p>
        Thank you for choosing a Calyco® interior paint product. Calyco is committed to producing
        high-performance, environmentally responsible coatings that deliver long-lasting beauty for
        your home or project. We back our products with a comprehensive limited warranty that
        promises the paint will perform as described when applied and maintained in accordance with
        our instructions.
      </p>
      <p>
        This document explains what the warranty covers, how long it lasts, the conditions required
        to obtain warranty service, what is not covered and how to make a claim. Please read it
        carefully and retain a copy along with your proof of purchase.
      </p>

      {/* Warranty Coverage */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Warranty Coverage
      </h2>

      <h3>Products Covered</h3>
      <ul>
        <li>Interior emulsion paints sold under the Calyco brand</li>
        <li>Products labelled as eligible for the Calyco Interior Paint Limited Warranty</li>
        <li>Architectural coatings applied to properly prepared interior walls and ceilings</li>
        <li>
          Suitable substrates: plaster, gypsum board, concrete, brick, fibre-cement, wood, masonry
          or similar materials
        </li>
      </ul>

      <h3>Volume Requirements</h3>
      <p>
        Warranty is applicable only in case where the minimum volume of Product purchased is{" "}
        <strong>10 Litres or more</strong> and its usage exceeds <strong>90%</strong> of purchased
        volume, along with purchase of the requisite volume of undercoats as required to be applied
        as per Application Guidelines.
      </p>

      <h3>Special Registration for Large Purchases</h3>
      <p>
        For registering of Warranty, where quantity of Product purchase is equal to or more than{" "}
        <strong>200 Litres</strong>, please call our Helpline on <strong>+91 88267 33064</strong>{" "}
        with requisite details. The registration of Warranty in such cases is subject to a
        satisfactory pre-inspection at site by Company's representative.
      </p>

      <h3>Warranty Duration</h3>
      <ul>
        <li>
          <strong>Residential:</strong> 8 Years
        </li>
        <li>
          <strong>Commercial:</strong> 5 Years
        </li>
      </ul>

      <h3>What We Promise</h3>
      <ul>
        <li>Adheres tightly to properly prepared surfaces without peeling or blistering</li>
        <li>Resists cracking and flaking under normal expansion and contraction</li>
        <li>Maintains colour within acceptable industry tolerances</li>
        <li>Remains washable and stain resistant when cleaned properly</li>
        <li>Resists growth of surface mould and fungi under normal conditions</li>
      </ul>
      <p><em>Note: Labour costs for surface preparation and application are NOT covered.</em></p>

      {/* Conditions for Validity */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Conditions for Warranty Validity
      </h2>

      <h3>Surface Suitability</h3>
      <ul>
        <li>Substrates must be sound, dry, clean and free from contaminants</li>
        <li>New masonry surfaces must cure for at least 28 days</li>
        <li>Moisture content must be below 15% before painting</li>
        <li>Cracks, holes, and defects must be filled and levelled</li>
      </ul>

      <h3>Surface Preparation</h3>
      <ul>
        <li>Remove loose or flaking coatings by sanding, scraping or wire brushing</li>
        <li>Wash surfaces with mild detergent and clean water</li>
        <li>Treat fungus, algae or moss with fungicidal wash</li>
        <li>Sand glossy surfaces to a dull finish</li>
        <li>Apply appropriate Calyco primer or sealer where recommended</li>
      </ul>

      <h3>Application Conditions</h3>
      <ul>
        <li>Ambient temperature: 10°C to 40°C</li>
        <li>Relative humidity: below 80%</li>
        <li>No rainfall or condensation expected within 4 hours of application</li>
        <li>Avoid direct sunlight or extremely hot surfaces</li>
      </ul>

      <h3>Application Method</h3>
      <ul>
        <li>Use brush, roller or airless spray equipment</li>
        <li>Stir paint thoroughly before and during use</li>
        <li>Dilution ratio: 30% water for first coat, 20% for subsequent coats</li>
        <li>Apply minimum of two full coats at recommended spreading rate</li>
        <li>Allow each coat to dry for at least 3–4 hours before next coat</li>
      </ul>

      <h3>Maintenance and Care</h3>
      <ul>
        <li>Avoid cleaning for at least two weeks after painting</li>
        <li>Remove stains with soft sponge or cloth dampened with mild soapy water</li>
        <li>Do not use abrasive pads, solvents or harsh chemicals</li>
        <li>Maintain adequate interior ventilation</li>
        <li>Control sources of moisture to prevent condensation</li>
      </ul>

      <h3>Evidence of Purchase and Compliance</h3>
      <ul>
        <li>Retain original purchase invoice</li>
        <li>Keep batch numbers and product details</li>
        <li>
          Provide evidence of proper surface preparation and application if requested
        </li>
      </ul>

      {/* Exclusions */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        What the Warranty Does Not Cover
      </h2>

      <h3>Exclusions</h3>
      <ul>
        <li>Improper substrate or preparation</li>
        <li>Structural or mechanical defects</li>
        <li>Excessive moisture or condensation</li>
        <li>Surface contact or abrasion</li>
        <li>External causes (fire, flood, natural disasters)</li>
        <li>Non-residential chemical exposure</li>
        <li>Misuse or neglect</li>
        <li>Colours outside tolerance</li>
        <li>Normal ageing beyond warranty period</li>
      </ul>
      <p>Incidental or consequential damages are also not covered.</p>

      {/* Claims */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Warranty Claim Procedure
      </h2>

      <h3>Notification Timeline</h3>
      <p>
        Consumer may raise a claim within <strong>30 days</strong> of discovering issue(s) noticed
        on the affected areas based on Warranty Scope/Parameters.
      </p>

      <h3>Notification Process</h3>
      <p>
        The Consumer is required to notify the Company of the issue(s) noticed along with:
      </p>
      <ul>
        <li>Reference of the registered Warranty</li>
        <li>Sample pictures</li>
        <li>Basis for Warranty invocation</li>
      </ul>
      <p>
        Contact customer care at <strong>+91 88267 33064</strong>. The Consumer shall provide such
        additional details as required by the Company and/or allow the company to visit/inspect the
        painting site.
      </p>

      <h3>Applicable Warranty</h3>
      <p>
        In case where the Company decides that the Warranty is applicable on the issue(s) noticed on
        the affected areas, the Company shall bear the Replacement costs as detailed in Para 2.2 to
        repair/repaint the affected areas.
      </p>

      <h3>Non-Applicable Warranty</h3>
      <p>
        In case where the Company decides that Warranty is not applicable, the same shall be
        communicated to the Consumer.
      </p>

      <h3>Scope of Application</h3>
      <p>
        Warranty is applicable only to the affected area where the Product is used in accordance
        with the Application Guidelines and not to the rest of the areas.
      </p>

      <h3>Unauthorized Repairs</h3>
      <p>
        In case the Consumer carries out repair works on the areas covered under the Warranty, the
        same shall be at their own risk and the Company's Warranty on the Product shall not be valid
        on such repaired areas.
      </p>

      {/* Remedy & Limitations */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Warranty Remedy and Limitations
      </h2>

      <h3>Remedy Options</h3>
      <ul>
        <li>
          <strong>Replacement Product</strong> — Free replacement paint for affected area
        </li>
        <li>
          <strong>Refund</strong> — Refund of purchase price upon return
        </li>
      </ul>
      <p><em>Note: Remedial measures do not extend or renew the original warranty period.</em></p>

      <h3>Limitations</h3>
      <ul>
        <li>Calyco makes no other warranties or representations, express or implied</li>
        <li>Total liability shall not exceed the purchase price of the paint</li>
        <li>Some jurisdictions may have different limitations</li>
      </ul>

      {/* Liability & Disputes */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Limitations of Liability & Dispute Resolution
      </h2>

      <h3>Jurisdiction</h3>
      <p>
        In case of any disputes, exclusive jurisdiction of the courts of <strong>Nagpur</strong>{" "}
        shall apply. Governing laws shall be Laws of India.
      </p>

      <h3>Confidentiality</h3>
      <p>
        The facts and all matters concerning any Warranty/claim/dispute will always be kept
        confidential by both the Consumer and the Company.
      </p>

      {/* Transferability */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Transferability
      </h2>
      <p>
        This warranty is non-transferable. It applies only to the original purchaser and the
        property on which the paint was originally applied. Any transfer of ownership or change of
        use from residential to commercial may void the warranty.
      </p>

      {/* Contact */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Contact Information
      </h2>
      <p>For questions, technical support or to submit a warranty claim, please contact:</p>
      <p>
        <strong>Calyco Paints – Customer Service Department</strong>
        <br />
        M E C Office, Civil Lines
        <br />
        Nagpur Maharashtra 440001
        <br />
        Sadar Bazar (Nagpur) MH
        <br />
        <strong>+91 88267 33064</strong> — customer service
        <br />
        <a href="mailto:info@calycopaints.com">info@calycopaints.com</a>
        <br />
        <a href="https://www.calycopaints.com" target="_blank" rel="noreferrer">
          www.calycopaints.com
        </a>
      </p>

      {/* Important */}
      <h2 className="!text-3xl md:!text-4xl !font-black !tracking-wide !text-[#2c2240]">
        Important
      </h2>
      <p>
        Please retain this warranty document and your proof of purchase. In the unlikely event of a
        defect, these documents will help us process your claim quickly and efficiently.
      </p>
    </PolicyLayout>
  );
}
