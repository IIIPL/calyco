import React, { useEffect } from "react";
import { getTypographyClasses, getButtonClasses } from "../../data/admin/typography";
import { useNavigate } from "react-router-dom";
import SEO from "../../components/SEO";

const qualityCommitments = [
  {
    title: "Performance Excellence",
    details: "Every batch undergoes rigorous testing to ensure consistent coverage, durability, color accuracy, and finish quality across all product lines.",
  },
  {
    title: "Regulatory Compliance",
    details: "Full adherence to IS 1200, IS 2074, BIS standards, VOC limits, and environmental regulations mandated by Indian and international authorities.",
  },
  {
    title: "Continuous Improvement",
    details: "Regular audits, customer feedback integration, and process optimization to enhance product quality and manufacturing efficiency.",
  },
  {
    title: "Sustainability Focus",
    details: "Low-VOC formulations, eco-friendly packaging, responsible sourcing, and waste reduction initiatives throughout our production cycle.",
  },
];

const testingStandards = [
  {
    title: "Raw Material Inspection",
    details: "All incoming pigments, binders, additives, and solvents are tested for purity, consistency, and compliance before production.",
  },
  {
    title: "In-Process Quality Checks",
    details: "Real-time monitoring during mixing, grinding, and tinting to maintain viscosity, pH levels, and color consistency.",
  },
  {
    title: "Batch Testing & QC",
    details: "Every production batch is sampled and tested for coverage, opacity, drying time, adhesion, washability, and finish quality.",
  },
  {
    title: "Third-Party Certification",
    details: "Independent lab testing for VOC levels, heavy metal content, fire resistance, and environmental compliance where applicable.",
  },
];

const certifications = [
  {
    title: "BIS Certification",
    details: "All CALYCO paints comply with Bureau of Indian Standards (BIS) specifications for decorative and industrial coatings.",
  },
  {
    title: "ISO 9001:2015",
    details: "Quality Management System certification ensuring consistent processes, documentation, and continuous improvement practices.",
  },
  {
    title: "Environmental Standards",
    details: "Products tested for low-VOC emissions and compliance with Green Building Council of India (IGBC) and LEED requirements.",
  },
  {
    title: "Safety Compliance",
    details: "Adherence to OSHA safety standards, proper labeling, SDS documentation, and safe handling guidelines for all products.",
  },
];

const qualityMetrics = [
  "Coverage: 120-140 sq.ft per litre (2 coats on prepared surface)",
  "Drying time: Touch dry in 25-35 minutes, recoat after 4-6 hours",
  "VOC levels: < 50 g/L for premium interior paints, < 100 g/L for exterior",
  "Color accuracy: Delta E < 1.0 for custom tints",
  "Washability: Minimum 5,000 scrub cycles (interior premium range)",
  "Shelf life: 24 months from manufacturing date when stored properly",
];

const feedbackProcess = [
  { step: "Report Issue", description: "Contact customer support with product batch number, application details, and photos/videos of the concern." },
  { step: "Initial Assessment", description: "Our quality team reviews the report and may request additional information or product samples for analysis." },
  { step: "Root Cause Analysis", description: "If a quality defect is confirmed, we conduct thorough investigation to identify the cause and prevent recurrence." },
  { step: "Resolution & Action", description: "Customers receive replacement products or refunds. Internal corrective actions are implemented to improve processes." },
];

export default function QualityPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionPad = "py-10 md:py-12";
  const sectionPadTight = "py-7 md:py-9";

  return (
    <div className="min-h-screen bg-white text-[#0F1221] font-poppins">
      <SEO
        title="Quality Policy | CALYCO Paints"
        description="Learn about CALYCO's commitment to quality excellence, testing standards, certifications, and continuous improvement in paint manufacturing."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.webp"
              alt="Premium quality CALYCO painted interior"
              className="h-full w-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center flex items-center justify-center h-full"><div>
            <h1 className="text-4xl font-semibold text-white leading-tight md:text-5xl">
              Our Commitment to Excellence
            </h1>
          </div></div></section>

        {/* Introduction */}
        <section className={`${sectionPad} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Quality Policy Overview</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed text-[#23263a] mb-1">
            At CALYCO Paints, quality is not just a standard—it's our promise. We are committed to manufacturing premium paints and coatings that deliver consistent performance, meet stringent regulatory requirements, and exceed customer expectations.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a] mb-1">
            Our quality policy is built on four foundational pillars: rigorous testing protocols, regulatory compliance, continuous improvement processes, and environmental responsibility.
          </p>
          <p className="text-base max-w-3xl mx-auto text-[#23263a]">
            This document outlines our quality standards, testing procedures, certifications, and commitment to delivering products that protect and beautify your spaces for years to come.
          </p>
        </section>

        {/* Quality Commitments */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Our Quality Commitments</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Every CALYCO product is manufactured with unwavering attention to quality, from raw material selection to final packaging.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {qualityCommitments.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testing Standards */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Testing Standards & Quality Control</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {testingStandards.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Certifications & Compliance</h2>
          <p className="text-lg text-[#23263a] mb-6">
            CALYCO products are certified and tested by recognized authorities to ensure safety, performance, and environmental responsibility.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((item) => (
              <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className={`${getTypographyClasses('h4')} text-[#0F1221]`}>{item.title}</h3>
                <p className="mt-2 text-sm text-[#23263a]">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Metrics */}
        <section className={`${sectionPadTight} bg-white max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Performance Metrics & Specifications</h2>
          <p className="text-lg text-[#23263a] mb-6">
            All CALYCO paints meet or exceed the following performance benchmarks:
          </p>
          <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
            <ul className="space-y-3 text-base text-[#23263a]">
              {qualityMetrics.map((metric) => (
                <li key={metric} className="flex items-start">
                  <span className="text-[#D4AF37] mr-3 mt-1">✓</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-[#23263a]/80 italic">
              * Performance may vary based on surface preparation, application method, environmental conditions, and product type. Refer to product-specific technical data sheets for detailed specifications.
            </p>
          </div>
        </section>

        {/* Customer Feedback Process */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-6xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Quality Feedback & Complaint Resolution</h2>
          <p className="text-lg text-[#23263a] mb-6">
            Your feedback helps us improve. If you experience any quality concerns, we have a structured process to address and resolve issues promptly.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {feedbackProcess.map((item, index) => (
              <div key={item.step} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F1221] text-white text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold text-[#0F1221]">{item.step}</h3>
                </div>
                <p className="text-sm text-[#23263a]">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Quality Guarantee</h3>
            <p className="text-sm text-[#23263a]">
              If a product defect is confirmed due to manufacturing error, CALYCO will provide a full replacement or refund. We stand behind every product we manufacture and are committed to making things right.
            </p>
          </div>
        </section>

        {/* Continuous Improvement */}
        <section className={`${sectionPadTight} bg-white max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold mb-3 text-[#0F1221]">Continuous Improvement Initiatives</h2>
          <p className="text-lg text-[#23263a] mb-4">
            Quality is a journey, not a destination. CALYCO invests continuously in process optimization, technology upgrades, and team training to enhance product quality and operational excellence.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">🔬</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Research & Development</h3>
              <p className="text-sm text-[#23263a]">
                Ongoing R&D to develop innovative formulations, improve durability, and reduce environmental impact.
              </p>
            </div>
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Team Training</h3>
              <p className="text-sm text-[#23263a]">
                Regular training programs for production, QC, and support teams on quality standards and best practices.
              </p>
            </div>
            <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-[#0F1221] mb-1">Performance Monitoring</h3>
              <p className="text-sm text-[#23263a]">
                Real-time tracking of quality metrics, defect rates, and customer satisfaction to drive improvement.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={`${sectionPadTight} bg-[#FBF9F6] max-w-5xl mx-auto px-6 md:px-10 lg:px-12`}>
          <h2 className="text-3xl font-bold text-[#0F1221] mb-3">Quality Assurance Team</h2>
          <p className="text-lg text-[#23263a] mb-5">
            For quality-related queries, product specifications, or to report concerns, contact our dedicated quality assurance team.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Email</h3>
              <a href="mailto:quality@calycopaints.com" className="text-sm text-[#23263a] hover:text-[#D4AF37] underline">
                quality@calycopaints.com
              </a>
            </div>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#0F1221] mb-2">Contact Quality Hotline</h3>
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
            CALYCO is committed to transparency in our quality practices. This policy is reviewed annually and updated to reflect improvements in our processes and standards.
          </p>
          <p className="text-xs text-[#23263a]/70">
            For technical data sheets, safety data sheets, or certification documents, please contact our quality team.
          </p>
          <p className="mt-3 text-sm text-[#0F1221] font-semibold">
            Effective date: 20 August 2025
          </p>
        </section>
      </main>
    </div>
  );
}
