import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function PaymentsGst() {
  return (
    <PolicyLayout title="Payment, Pricing & GST/Invoices" lastUpdated="—">
      <h2>Accepted Payments</h2>
      <p>UPI, cards, net-banking, wallets (via gateway).</p>
      <h2>Pricing</h2>
      <p>GST-inclusive/exclusive display, promotions, errors.</p>
      <h2>Invoices</h2>
      <p>GST invoice issuance & corrections.</p>
    </PolicyLayout>
  );
}
