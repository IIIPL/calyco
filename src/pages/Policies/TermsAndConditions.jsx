import React, { useEffect } from "react";
import SEO from "../../components/SEO";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: [
      'These Terms & Conditions constitute a legally binding agreement between CALYCO Paints Private Limited ("CALYCO", "we", "us") and any person ("you", "user", "customer") accessing calycopaints.com or purchasing CALYCO products.',
      'By using this website, creating an account, or placing an order you accept these terms, our Privacy Policy, Returns & Refunds Policy, and any additional guidelines published on the site.',
      'We may modify these terms at any time. Updated terms will include a revised effective date. Continued use of the website or services after updates constitutes acceptance of the revised terms.',
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility & Account Responsibility",
    content: [
      'Users must be at least 18 years of age or accessing under the supervision of a legal guardian.',
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account.',
      'Notify CALYCO immediately of any unauthorised use of your account or security breach. CALYCO is not liable for loss resulting from failure to protect account credentials.',
    ],
  },
  {
    id: "use",
    title: "Permitted Use & Restrictions",
    content: [
      'You may browse, download, or print content for personal, non-commercial use only. Reproduction or redistribution without written consent is prohibited.',
      'You agree not to misuse the website, engage in unlawful activities, attempt reverse engineering, introduce malware, or disrupt services.',
      'Commercial scraping, automated data extraction, or framing of site content is forbidden without CALYCO\'s written permission.',
    ],
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    content: [
      'All content, trademarks, logos, colour palettes, software, and imagery are the intellectual property of CALYCO or its licensors.',
      'Use of CALYCO trademarks requires prior written authorisation. Unauthorized use may result in legal action.',
      'User-generated content (reviews, testimonials) may be reused by CALYCO for promotional or analytical purposes with attribution preserved.',
    ],
  },
  {
    id: "pricing",
    title: "Pricing, Orders & Promotions",
    content: [
      'All prices are listed in Indian Rupees (INR) and include GST unless specified otherwise. CALYCO reserves the right to correct pricing errors discovered post-order; you may accept the revised price or cancel for a full refund.',
      'Promotional offers are subject to specific terms, cannot be clubbed unless stated, and may be withdrawn without prior notice.',
      'Order acceptance occurs when we dispatch the products. CALYCO may refuse or cancel orders for reasons including limited stock, inaccurate pricing, or regulatory restrictions.',
    ],
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: [
      'Payments can be made via UPI, wallets, credit/debit cards, net banking, EMI, or cash on delivery (where available).',
      'All card/UPI transactions are processed through PCI DSS compliant gateways. CALYCO does not store your payment credentials.',
      'For EMI or credit terms, billing schedules and finance charges (if any) are disclosed during checkout.',
    ],
  },
  {
    id: "delivery",
    title: "Delivery & Risk of Loss",
    content: [
      'Delivery timelines depend on the destination, product availability, and selected shipping method. Refer to the Shipping & Delivery page for detailed schedules.',
      'Risk of loss passes to the customer upon delivery. Inspect packages at arrival and report transit damage within 48 hours for resolution.',
      'CALYCO is not responsible for delivery delays caused by weather, strikes, or force majeure events; we will provide updates and alternative arrangements.',
    ],
  },
  {
    id: "returns",
    title: "Returns, Warranty & After Sales",
    content: [
      'Returns are governed by the Returns & Refunds Policy. Custom tinted paints are returnable only for manufacturing defects.',
      'Warranty durations vary by product. Warranty claims require proof of purchase, application details, and compliance with recommended surface preparation.',
      'CALYCO may inspect the site or request product samples before approving warranty claims. Remedies include replacement or refund at CALYCO\'s discretion.',
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: [
      'CALYCO provides products and services "as is" without warranties beyond those expressly stated. We disclaim liability for indirect, incidental, punitive, or consequential damages.',
      'To the maximum extent permitted by law, CALYCO\'s total liability for any claim shall not exceed the amount you paid for the product or service giving rise to the claim.',
      'Nothing in these terms limits liability for death, personal injury caused by negligence, or fraud.',
    ],
  },
  {
    id: "dispute",
    title: "Dispute Resolution & Governing Law",
    content: [
      'These terms are governed by the laws of India. Courts in Nashik, Maharashtra shall have exclusive jurisdiction.',
      'Parties shall attempt to resolve disputes amicably. Failing settlement within 30 days, disputes may be referred to arbitration in Mumbai under the Arbitration and Conciliation Act, 1996.',
      'Arbitration proceedings will be conducted in English with a sole arbitrator appointed mutually by both parties.',
    ],
  },
  {
    id: "termination",
    title: "Termination",
    content: [
      'CALYCO may suspend or terminate accounts for policy violations, fraudulent activity, or abuse. Termination is effective immediately upon notice.',
      'User obligations, including outstanding payments, confidentiality, and indemnities, survive termination.',
    ],
  },
  {
    id: "updates",
    title: "Changes to Terms",
    content: [
      'We may update these terms to reflect business, legal, or regulatory changes. Revised terms are posted with an effective date.',
      'Substantial updates will be communicated via email or site banners. Continued use after changes constitutes acceptance.',
    ],
  },
];

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionPad = "py-10 md:py-12";
  const sectionPadTight = "py-7 md:py-9";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Terms & Conditions | CALYCO Paints"
        description="Review CALYCO's Terms & Conditions covering website usage, pricing, delivery, returns, liability, and dispute resolution."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-12 bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
              alt="Architectural space finished with CALYCO coatings"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-14 text-center">
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Know Your Rights When Using CALYCO Services
            </h1>
          </div>
        </section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Introduction</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a] mb-1">
            Welcome to CALYCO Paints. By accessing our website, placing orders, or using our services, you agree to be bound by these Terms & Conditions.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a]">
            Please read these terms carefully before using our services. If you do not agree with any part of these terms, you must not use our website or purchase our products.
          </p>
        </section>

        {/* Core Sections */}
        {sections.map((section, idx) => (
          <section
            key={section.id}
            id={section.id}
            className={`${sectionPadTight} ${idx % 2 === 0 ? 'bg-[#FBF9F6]' : 'bg-white'}`}
          >
            <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
              <h2 className="text-2xl font-bold text-[#0F1221] mb-2">{section.title}</h2>
              <div className="space-y-2 text-base text-[#23263a]">
                {section.content.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-2xl font-bold text-[#0F1221] mb-3">Need Clarification?</h2>
          <p className="text-lg text-[#23263a] mb-1">
            For questions regarding these terms, reach out to{" "}
            <a href="mailto:compliance@calycopaints.com" className="text-[#D4AF37] font-semibold underline">
              compliance@calycopaints.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919145000200" className="text-[#D4AF37] font-semibold">
              +91 9145 000 200
            </a>.
          </p>
          <p className="text-base text-[#23263a]">
            Business customers may request tailored agreements for enterprise projects.
          </p>
        </section>

        {/* Related Policies */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center`}>
          <h2 className="text-xl font-bold text-[#0F1221] mb-1">Related Policies</h2>
          <p className="text-sm text-[#23263a] mb-2">
            Review our other policies for more details.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="/policies/privacy"
              className="rounded-xl bg-white border border-[#0F1221]/10 px-6 py-3 text-sm font-semibold text-[#0F1221] transition hover:border-[#D4AF37] hover:shadow-sm"
            >
              Privacy Policy
            </a>
            <a
              href="/policies/returns"
              className="rounded-xl bg-white border border-[#0F1221]/10 px-6 py-3 text-sm font-semibold text-[#0F1221] transition hover:border-[#D4AF37] hover:shadow-sm"
            >
              Returns & Refunds
            </a>
            <a
              href="/policies/shipping"
              className="rounded-xl bg-white border border-[#0F1221]/10 px-6 py-3 text-sm font-semibold text-[#0F1221] transition hover:border-[#D4AF37] hover:shadow-sm"
            >
              Shipping & Delivery
            </a>
          </div>
        </section>

        {/* Effective Date */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12 text-center`}>
          <p className="text-sm text-[#0F1221] font-semibold">
            Effective date: 20 August 2025
          </p>
        </section>
      </main>
    </div>
  );
}
