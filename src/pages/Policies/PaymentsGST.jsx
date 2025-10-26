import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const paymentMethods = [
  { title: "UPI & Digital Wallets", details: "Instant payment via Google Pay, PhonePe, Paytm, Amazon Pay, and other UPI apps. Zero transaction fees for customers." },
  { title: "Credit / Debit Cards", details: "Visa, Mastercard, RuPay, and American Express with secure 3D authentication and tokenization support." },
  { title: "Net Banking", details: "Direct bank transfers from 50+ banks across India with real-time payment confirmation." },
  { title: "EMI Options", details: "No-cost and standard EMI available on orders above ₹5,000 via select credit cards and Bajaj Finserv." },
  { title: "Cash on Delivery (COD)", details: "Pay with cash upon delivery. Available for orders below ₹10,000 in select locations (₹50 handling fee applies)." },
];

const pricingInfo = [
  { label: "Transparent Pricing", value: "All prices displayed are inclusive of GST with no hidden charges. Final price confirmed at checkout." },
  { title: "Volume Discounts", value: "Tiered pricing available for bulk orders. Contact our sales team for project-specific quotations and pricing." },
  { label: "Custom Tinting Charges", value: "Custom shade tinting fees are displayed before checkout. Specialty formulations may require additional lead time." },
  { label: "Currency & Billing", value: "All prices in INR. International buyers billed in INR; banks handle currency conversion at prevailing exchange rates." },
];

const taxDetails = [
  { title: "GST Included", details: "All displayed prices include GST at applicable rates (18% for paints). Tax breakdown shown in cart and invoices." },
  { title: "HSN/SAC Codes", details: "HSN and SAC codes appear on all invoices to support business procurement and tax compliance needs." },
  { title: "Input Tax Credit (ITC)", details: "Enter GSTIN at checkout to claim ITC. Registered businesses receive GST-compliant invoices automatically." },
  { title: "Invoice Access", details: "Digital invoices emailed instantly and accessible anytime from My Account › Order History for download." },
];

const invoiceFeatures = [
  { label: "Instant PDF Download", action: "GST-compliant invoices in PDF format available immediately after order confirmation from your dashboard." },
  { label: "Pro Forma Invoices", action: "Request pro forma invoices for institutional orders by contacting our corporate sales team." },
  { label: "Multiple Billing Addresses", action: "Save and manage multiple billing addresses for faster checkout across different projects or locations." },
  { label: "Invoice History & Search", action: "Filter by date range or order ID to view past invoices, payment status, and transaction details." },
];

const securityPractices = [
  "PCI DSS Level 1 certified payment gateways with tokenization and encryption",
  "256-bit SSL/TLS encryption across all checkout and payment pages",
  "3D Secure authentication for credit/debit card transactions",
  "CALYCO never stores card numbers, CVV, UPI PIN, or sensitive payment data",
  "Multi-factor authentication (OTP) for high-value orders and COD confirmation",
  "Continuous fraud monitoring and chargeback resolution support",
];

const bulkOptions = [
  { title: "Business Credit Terms", details: "Net 30 or Net 45 day credit terms available for verified business customers subject to credit assessment and documentation." },
  { title: "Purchase Order Processing", details: "Upload approved POs; CALYCO issues consolidated invoices aligned with your project milestones and payment schedules." },
  { title: "Volume Pricing & Quotes", details: "Share project specifications for custom volume pricing, tint matching services, and coordinated delivery schedules." },
];

const packSizes = [
  { pack: "1 Litre", notes: "Ideal for sample rooms, touch-ups, and small accent walls." },
  { pack: "4 Litre", notes: "Perfect for medium-sized rooms or feature walls." },
  { pack: "10 Litre", notes: "Project-friendly pack size with better value per litre for large rooms." },
  { pack: "20 Litre", notes: "Recommended for contractors, builders, and commercial projects." },
];

export default function PaymentsGST() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Payment & GST Policy | CALYCO Paints"
        description="Learn about CALYCO's payment methods, GST compliance, pricing policy, EMI options, and secure payment processing."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Secure payment for CALYCO paints"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/20" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Payment & GST Policy
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Secure, Flexible, Transparent Payments
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              Explore our payment methods, GST compliance, pricing structure, and invoicing tools designed for seamless transactions.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Billing Team
            </button>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Payment Policy Overview</h2>
            <p className="text-lg text-[#31274B]/85 mb-4">
              CALYCO offers secure, convenient, and flexible payment options to ensure a seamless shopping experience. All transactions are processed through certified payment gateways with industry-leading security standards.
            </p>
            <p className="text-base text-[#31274B]/85 mb-4">
              We are fully GST compliant and provide proper tax invoices for all purchases. Whether you're an individual customer or a registered business, our payment and invoicing system is designed for transparency and ease.
            </p>
            <p className="text-base text-[#31274B]/85">
              This policy outlines accepted payment methods, GST rates, pricing policies, EMI options, refund timelines, and security measures.
            </p>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Accepted Payment Methods</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Choose from a variety of secure payment options designed for your convenience.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paymentMethods.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Structure */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Pricing Structure</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              CALYCO pricing is transparent with GST included and clearly indicated tinting or shipping charges.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {pricingInfo.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.label || item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Pack Sizes */}
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-[#4B007D] mb-6">Available Pack Sizes</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {packSizes.map((item) => (
                  <div key={item.pack} className="rounded-xl bg-[#FBF9F6] p-5 text-center">
                    <h4 className="text-xl font-bold text-[#4B007D] mb-2">{item.pack}</h4>
                    <p className="text-sm text-[#31274B]/80">{item.notes}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-[#31274B]/70 italic">
                * Prices vary by product type, finish, and promotions. View product pages for current pricing and add to cart for final cost including GST and shipping.
              </p>
            </div>
          </div>
        </section>

        {/* GST Information */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">GST Compliance & Tax Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {taxDetails.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Important for Business Customers</h3>
              <p className="text-sm text-[#31274B]/85 mb-2">
                If you're a GST-registered business, ensure your GSTIN is entered correctly during checkout for:
              </p>
              <ul className="space-y-1 text-sm text-[#31274B]/80 ml-4">
                <li>✓ Proper tax invoice with your business details</li>
                <li>✓ Eligibility to claim Input Tax Credit (ITC)</li>
                <li>✓ Compliance with GST accounting requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Invoice & Billing */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Invoices & Billing Management</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Access invoices instantly after checkout and manage billing profiles for projects or business units.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {invoiceFeatures.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.label}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment Security */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Payment Security & Data Protection</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Your payment information is protected by industry-leading security standards. We never store sensitive payment data.
            </p>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-4">Security Measures</h3>
              <ul className="space-y-2 text-base text-[#31274B]/85">
                {securityPractices.map((measure) => (
                  <li key={measure} className="flex items-start">
                    <span className="text-[#D4AF37] mr-3 mt-1">🔒</span>
                    <span>{measure}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-[#0F1221]/10">
                <p className="text-sm text-[#31274B]/80">
                  <strong className="text-[#4B007D]">Safe Shopping Guarantee:</strong> If unauthorized charges appear on your account due to a security breach on our platform, we'll work with you and your financial institution to resolve the issue promptly.
                </p>
              </div>
              <div className="mt-4 text-sm text-[#31274B]/70">
                <p><strong>Compliance Standards:</strong> PCI DSS • ISO 27001 (gateway partners) • RBI Payment Aggregator Guidelines • GST Invoicing Standards</p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate & Bulk Orders */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Corporate & Bulk Order Billing</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              CALYCO supports contractors, developers, and institutional buyers with flexible payment and invoicing solutions.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {bulkOptions.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-[#31274B]/80 mb-4">
                For corporate billing, credit terms, or bulk order pricing inquiries:
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Billing & Payment Support</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              For payment-related queries, invoice requests, or GST clarifications, contact our billing team.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Email</h3>
                <a href="mailto:billing@calycopaints.com" className="text-sm text-[#31274B]/85 hover:text-[#4B007D] underline">
                  billing@calycopaints.com
                </a>
              </div>
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Phone</h3>
                <p className="text-sm text-[#31274B]/85">
                  Billing Helpline: <a href="tel:+919145000400" className="hover:text-[#4B007D] font-semibold">+91 9145 000 400</a>
                </p>
                <p className="text-xs text-[#31274B]/70 mt-2">Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12 text-center">
            <p className="text-sm text-[#31274B]/70 mb-2">
              CALYCO complies with all applicable tax laws and payment regulations in India. This policy is subject to change based on regulatory updates.
            </p>
            <p className="text-xs text-[#31274B]/70 mb-4">
              For cross-references, review our{" "}
              <a href="/policies/returns" className="font-semibold text-[#4B007D] underline-offset-4 hover:underline">
                Returns & Refunds
              </a>{" "}
              and{" "}
              <a href="/policies/terms" className="font-semibold text-[#4B007D] underline-offset-4 hover:underline">
                Terms & Conditions
              </a>{" "}
              policies.
            </p>
            <p className="mt-4 text-sm text-[#4B007D] font-semibold">Effective date: 30 October 2025</p>
          </div>
        </section>
      </main>
    </div>
  );
}
