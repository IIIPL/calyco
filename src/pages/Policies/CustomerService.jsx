import React from "react";
import PolicyLayout from "./PolicyLayout";
import { Link } from "react-router-dom";

export default function CustomerService() {
  return (
    <PolicyLayout title="Customer Service" lastUpdated="—">
      <p className="mb-6">How we help—orders, shipping, returns and warranties.</p>
      <ul className="grid sm:grid-cols-2 gap-3 m-0 list-none p-0">
        <li><Link to="/policies/shipping" className="block rounded-lg border border-[#e5e0d8] px-4 py-3 hover:bg-[#f9f6ef]">Shipping & Delivery</Link></li>
        <li><Link to="/policies/returns" className="block rounded-lg border border-[#e5e0d8] px-4 py-3 hover:bg-[#f9f6ef]">Returns & Refunds</Link></li>
        <li><Link to="/policies/warranty" className="block rounded-lg border border-[#e5e0d8] px-4 py-3 hover:bg-[#f9f6ef]">Warranty Policy</Link></li>
        <li><Link to="/policies" className="block rounded-lg border border-[#e5e0d8] px-4 py-3 hover:bg-[#f9f6ef]">All Policies</Link></li>
      </ul>
    </PolicyLayout>
  );
}
