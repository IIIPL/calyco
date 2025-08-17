import React, { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function WarrantyPolicy() {
  useEffect(() => {
    document.title = "Warranty Policy";
  }, []); 
  return (
    <PolicyLayout title="Warranty Policy" lastUpdated="—">
      <h2>Coverage</h2>
      <p>Manufacturing defects; what’s included/excluded.</p>
      <h2>Conditions</h2>
      <p>Correct surface prep, recommended system, storage & application.</p>
      <h2>Claims</h2>
      <p>Inspection, documentation, remedy (repair/replace/credit).</p>
    </PolicyLayout>
  );
}
