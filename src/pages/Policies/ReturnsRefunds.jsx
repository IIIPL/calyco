import React, { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function ReturnsRefunds() {
  useEffect(() => {
    document.title = "Returns & Refunds";
  }, []);
  return (
    <PolicyLayout title="Returns & Refunds" lastUpdated="—">
      <h2>Eligibility</h2>
      <p>Defects, transit damage, wrong item; made-to-order exclusions etc.</p>
      <h2>How to Initiate</h2>
      <p>Window, proof required, pickup/drop process.</p>
      <h2>Refund Method</h2>
      <p>Original payment mode timelines.</p>
    </PolicyLayout>
  );
}
