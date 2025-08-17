import React, { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function PaymentsGst() {
  useEffect(() => {
    document.title = "Payment, Pricing & GST/Invoices";
  }, []);
  return (
    <PolicyLayout
      title="Payment, Pricing & GST / Invoices"
      lastUpdated="August 15, 2025"
    >
      <h2>Accepted Payment Methods</h2>
      <p>
        CALYCO Paints Private Limited (“CALYCO”) accepts payments in Indian
        Rupees (₹) through secure, RBI-compliant payment gateways. The following
        methods are supported:
      </p>
      <ul>
        <li>Unified Payments Interface (UPI)</li>
        <li>Debit and credit cards (Visa, Mastercard, RuPay, American Express)</li>
        <li>Net banking from major Indian banks</li>
        <li>Popular mobile wallets (where supported by our payment gateway)</li>
        <li>NEFT / RTGS bank transfers for bulk or B2B orders (details provided upon request)</li>
      </ul>
      <p>
        All online transactions are processed through encrypted channels. CALYCO
        does not store card numbers, CVV codes, or other sensitive payment
        information on its servers.
      </p>

      <h2>Pricing</h2>
      <p>
        Product prices displayed on www.calycopaints.com are in Indian Rupees
        (₹) and will indicate whether they are inclusive or exclusive of Goods
        and Services Tax (GST) at the prevailing rates. Prices are subject to
        change without prior notice, but changes will not affect confirmed and
        paid orders.
      </p>
      <p>
        Promotional discounts, coupon codes, and bulk order pricing are applied
        at the time of checkout, subject to the terms of the offer. CALYCO
        reserves the right to withdraw or modify promotional offers without
        notice.
      </p>
      <p>
        In the event of a typographical or system pricing error, CALYCO reserves
        the right to cancel the affected order and issue a full refund to the
        original payment method.
      </p>

      <h2>GST & Invoices</h2>
      <p>
        CALYCO is a GST-registered entity and issues GST-compliant tax invoices
        for all purchases. GST is charged at the applicable rate based on the
        product category and the delivery state.
      </p>
      <ul>
        <li>
          A digital copy of the invoice is sent to the customer’s registered
          email after the order is dispatched.
        </li>
        <li>
          Hard copies of invoices are included with the shipment wherever
          possible.
        </li>
        <li>
          Customers requiring a GST invoice must provide their valid GSTIN at
          the time of placing the order. GST details cannot be added or changed
          after invoice generation.
        </li>
      </ul>
      <p>
        Any corrections to an invoice can be requested within 7 calendar days of
        issue, along with supporting documentation. Requests after this period
        may not be accepted due to statutory compliance requirements.
      </p>
    </PolicyLayout>
  );
}
