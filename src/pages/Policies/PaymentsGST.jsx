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

  const sectionPad = "py-10 md:py-12";
  const sectionPadTight = "py-7 md:py-9";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Payment & GST Policy | CALYCO Paints"
        description="Learn about CALYCO's payment methods, GST compliance, pricing policy, EMI options, and secure payment processing."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Secure payment for CALYCO paints"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex items-center justify-center h-full"><div>
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Secure, Flexible, Transparent Payments
            </h1>
          </div></div></section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Payment Policy Overview</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a] mb-1">
            CALYCO offers secure, convenient, and flexible payment options to ensure a seamless shopping experience. All transactions are processed through certified payment gateways with industry-leading security standards.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a] mb-1">
            We are fully GST compliant and provide proper tax invoices for all purchases. Whether you're an individual customer or a registered business, our payment and invoicing system is designed for transparency and ease.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a]">
            This policy outlines accepted payment methods, GST rates, pricing policies, EMI options, refund timelines, and security measures.
          </p>
        </section>

        {/* Payment Methods */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Accepted Payment Methods</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Choose from a variety of secure payment options designed for your convenience.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Structure */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Pricing Structure</h2>
          <p className="text-lg text-[#23263a] mb-6">
            CALYCO pricing is transparent with GST included and clearly indicated tinting or shipping charges.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {pricingInfo.map((item) => (
              <div key={item.label || item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.label || item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Pack Sizes */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-[#0F1221] mb-4">Available Pack Sizes</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {packSizes.map((item) => (
                <div key={item.pack} className="rounded-xl bg-[#FBF9F6] p-5 text-center">
                  <h4 className="text-xl font-bold text-[#0F1221] mb-1">{item.pack}</h4>
                  <p className="text-sm text-[#23263a]">{item.notes}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#23263a]/80 italic">
              * Prices vary by product type, finish, and promotions. View product pages for current pricing and add to cart for final cost including GST and shipping.
            </p>
          </div>
        </section>

        {/* GST Information */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">GST Compliance & Tax Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {taxDetails.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Important for Business Customers</h3>
            <p className="text-sm text-[#23263a] mb-1">
              If you're a GST-registered business, ensure your GSTIN is entered correctly during checkout for:
            </p>
            <ul className="space-y-1 text-sm text-[#23263a] ml-4">
              <li>✓ Proper tax invoice with your business details</li>
              <li>✓ Eligibility to claim Input Tax Credit (ITC)</li>
              <li>✓ Compliance with GST accounting requirements</li>
            </ul>
          </div>
        </section>

        {/* Invoice & Billing */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Invoices & Billing Management</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Access invoices instantly after checkout and manage billing profiles for projects or business units.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {invoiceFeatures.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.label}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Security */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Payment Security & Data Protection</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Your payment information is protected by industry-leading security standards. We never store sensitive payment data.
          </p>
          <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-3">Security Measures</h3>
            <ul className="space-y-2 text-base text-[#23263a]">
              {securityPractices.map((measure) => (
                <li key={measure} className="flex items-start">
                  <span className="text-[#D4AF37] mr-3 mt-1">🔒</span>
                  <span>{measure}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-[#0F1221]/10">
              <p className="text-sm text-[#23263a]">
                <strong className="text-[#0F1221]">Safe Shopping Guarantee:</strong> If unauthorized charges appear on your account due to a security breach on our platform, we'll work with you and your financial institution to resolve the issue promptly.
              </p>
            </div>
            <div className="mt-4 text-sm text-[#23263a]/80">
              <p><strong>Compliance Standards:</strong> PCI DSS • ISO 27001 (gateway partners) • RBI Payment Aggregator Guidelines • GST Invoicing Standards</p>
            </div>
          </div>
        </section>

        {/* Corporate & Bulk Orders */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Corporate & Bulk Order Billing</h2>
          <p className="text-lg text-[#23263a] mb-6">
            CALYCO supports contractors, developers, and institutional buyers with flexible payment and invoicing solutions.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {bulkOptions.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#0F1221]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-[#23263a] mb-3">
              For corporate billing, credit terms, or bulk order pricing inquiries:
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Us
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Billing & Payment Support</h2>
          <p className="text-lg text-[#23263a] mb-5">
            For payment-related queries, invoice requests, or GST clarifications, contact our billing team.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Email</h3>
              <a href="mailto:billing@calycopaints.com" className="text-sm text-[#23263a] hover:text-[#D4AF37] underline">
                billing@calycopaints.com
              </a>
            </div>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Contact Billing Helpline</h3>
              <p className="text-sm text-[#23263a] mb-2">
                <a href="https://wa.me/918826733064" className="text-[#D4AF37] hover:text-[#0F1221] font-semibold underline" target="_blank" rel="noopener noreferrer">WhatsApp Message</a>
              </p>
              <p className="text-xs text-[#23263a]/80 leading-relaxed mb-1">
                Please contact us only via WhatsApp message for any grievance or urgent privacy concern. Phone calls are not accepted on this number.
              </p>
              <p className="text-xs text-[#23263a]/70 mt-2">(Mon–Sat, 10:00 AM – 6:00 PM IST)</p>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-14 bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center">
          <p className="text-sm text-[#23263a]/80 mb-1">
            CALYCO complies with all applicable tax laws and payment regulations in India. This policy is subject to change based on regulatory updates.
          </p>
          <p className="text-xs text-[#23263a]/70 mb-2">
            For cross-references, review our{" "}
            <a href="/policies/returns" className="font-semibold text-[#0F1221] underline-offset-4 hover:underline">
              Returns & Refunds
            </a>{" "}
            and{" "}
            <a href="/policies/terms" className="font-semibold text-[#0F1221] underline-offset-4 hover:underline">
              Terms & Conditions
            </a>{" "}
            policies.
          </p>
          <p className="mt-3 text-sm text-[#0F1221] font-semibold">
            Effective date: 20 August 2025
          </p>
        </section>
      </main>
    </div>
  );
}
