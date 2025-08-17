import React, { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function ShippingDelivery() {
  useEffect(() => {
    document.title = "Shipping & Delivery ";
  }, []);
  return (
    <PolicyLayout title="Shipping & Delivery" lastUpdated="—">
      <h2>Coverage & Timelines</h2>
      <p>Serviceable pincodes and typical delivery windows.</p>
      <h2>Charges</h2>
      <p>Free/paid thresholds; bulky/remote surcharges.</p>
      <h2>Tracking & Delays</h2>
      <p>Tracking info; handling of exceptions.</p>
    </PolicyLayout>
  );
}
