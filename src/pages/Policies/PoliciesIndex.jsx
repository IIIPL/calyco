import React from "react";
import { Link } from "react-router-dom";
import PolicyLayout from "./PolicyLayout";

const links = [
  { to: "/policies/privacy", label: "Privacy Policy" },
  { to: "/policies/terms", label: "Terms & Conditions" },
  { to: "/policies/payments-gst", label: "Payment, Pricing & GST/Invoices" },
  { to: "/policies/quality", label: "Quality Policy" },
  { to: "/policies/environmental-sustainability", label: "Environmental & Sustainability" },
  { to: "/policies/disclaimer", label: "Product/Color Disclaimer" },
  { to: "/policies/shipping", label: "Shipping & Delivery" },
  { to: "/policies/returns", label: "Returns & Refunds" },
  { to: "/policies/warranty", label: "Warranty Policy" },
];

export default function PoliciesIndex() {
  return (
    <PolicyLayout title="Policies" lastUpdated="—">
      <p className="mb-6">
        Find Calyco’s customer service and policy documents in one place.
      </p>
      <ul className="grid sm:grid-cols-2 gap-3 m-0 list-none p-0">
        {links.map(x => (
          <li key={x.to} className="m-0">
            <Link
              to={x.to}
              className="block rounded-lg border border-[#e5e0d8] px-4 py-3 hover:bg-[#f9f6ef] hover:border-[#d7cfbf] text-[#493657] font-medium"
            >
              {x.label}
            </Link>
          </li>
        ))}
      </ul>
    </PolicyLayout>
  );
}
