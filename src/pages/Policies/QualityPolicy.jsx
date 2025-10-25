import React, { useEffect } from "react";
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

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Quality Policy | CALYCO Paints"
        description="Learn about CALYCO's commitment to quality excellence, testing standards, certifications, and continuous improvement in paint manufacturing."
        ogType="website"
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 bg-gradient-to-br from-[#4B007D] to-[#2E0053]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Premium quality CALYCO painted interior"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B007D]/90 via-[#4B007D]/85 to-[#2E0053]/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Quality Policy
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Our Commitment to Excellence
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              Consistent performance, rigorous testing, and continuous improvement define every CALYCO product. We deliver quality you can trust.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Quality Team
            </button>
            <p className="mt-6 text-xs text-white/70">Last updated: 30 October 2025</p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Quality Policy Overview</h2>
            <p className="text-lg text-[#31274B]/85 mb-4">
              At CALYCO Paints, quality is not just a standard—it's our promise. We are committed to manufacturing premium paints and coatings that deliver consistent performance, meet stringent regulatory requirements, and exceed customer expectations.
            </p>
            <p className="text-base text-[#31274B]/85 mb-4">
              Our quality policy is built on four foundational pillars: rigorous testing protocols, regulatory compliance, continuous improvement processes, and environmental responsibility.
            </p>
            <p className="text-base text-[#31274B]/85">
              This document outlines our quality standards, testing procedures, certifications, and commitment to delivering products that protect and beautify your spaces for years to come.
            </p>
          </div>
        </section>

        {/* Quality Commitments */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Our Quality Commitments</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Every CALYCO product is manufactured with unwavering attention to quality, from raw material selection to final packaging.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {qualityCommitments.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testing Standards */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8">Testing Standards & Quality Control</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {testingStandards.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Certifications & Compliance</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              CALYCO products are certified and tested by recognized authorities to ensure safety, performance, and environmental responsibility.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {certifications.map((item) => (
                <div key={item.title} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Metrics */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Performance Metrics & Specifications</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              All CALYCO paints meet or exceed the following performance benchmarks:
            </p>
            <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
              <ul className="space-y-3 text-base text-[#31274B]/85">
                {qualityMetrics.map((metric) => (
                  <li key={metric} className="flex items-start">
                    <span className="text-[#D4AF37] mr-3 mt-1">✓</span>
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-[#31274B]/70 italic">
                * Performance may vary based on surface preparation, application method, environmental conditions, and product type. Refer to product-specific technical data sheets for detailed specifications.
              </p>
            </div>
          </div>
        </section>

        {/* Customer Feedback Process */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Quality Feedback & Complaint Resolution</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              Your feedback helps us improve. If you experience any quality concerns, we have a structured process to address and resolve issues promptly.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {feedbackProcess.map((item, index) => (
                <div key={item.step} className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B007D] text-white text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-[#4B007D]">{item.step}</h3>
                  </div>
                  <p className="text-sm text-[#31274B]/80">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-2 border-[#D4AF37]/30 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-[#4B007D] mb-2">Quality Guarantee</h3>
              <p className="text-sm text-[#31274B]/85">
                If a product defect is confirmed due to manufacturing error, CALYCO will provide a full replacement or refund. We stand behind every product we manufacture and are committed to making things right.
              </p>
            </div>
          </div>
        </section>

        {/* Continuous Improvement */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-6">Continuous Improvement Initiatives</h2>
            <p className="text-lg text-[#31274B]/85 mb-6">
              Quality is a journey, not a destination. CALYCO invests continuously in process optimization, technology upgrades, and team training to enhance product quality and operational excellence.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Research & Development</h3>
                <p className="text-sm text-[#31274B]/80">
                  Ongoing R&D to develop innovative formulations, improve durability, and reduce environmental impact.
                </p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">👥</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Team Training</h3>
                <p className="text-sm text-[#31274B]/80">
                  Regular training programs for production, QC, and support teams on quality standards and best practices.
                </p>
              </div>
              <div className="rounded-xl bg-[#FBF9F6] p-6 text-center">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-bold text-[#4B007D] mb-2">Performance Monitoring</h3>
                <p className="text-sm text-[#31274B]/80">
                  Real-time tracking of quality metrics, defect rates, and customer satisfaction to drive improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-4">Quality Assurance Team</h2>
            <p className="text-lg text-[#31274B]/85 mb-8">
              For quality-related queries, product specifications, or to report concerns, contact our dedicated quality assurance team.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Email</h3>
                <a href="mailto:quality@calycopaints.com" className="text-sm text-[#31274B]/85 hover:text-[#4B007D] underline">
                  quality@calycopaints.com
                </a>
              </div>
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[#4B007D] mb-3">Phone</h3>
                <p className="text-sm text-[#31274B]/85">
                  Quality Hotline: <a href="tel:+919145000300" className="hover:text-[#4B007D] font-semibold">+91 9145 000 300</a>
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
              CALYCO is committed to transparency in our quality practices. This policy is reviewed annually and updated to reflect improvements in our processes and standards.
            </p>
            <p className="text-xs text-[#31274B]/70">
              For technical data sheets, safety data sheets, or certification documents, please contact our quality team.
            </p>
            <p className="mt-4 text-sm text-[#4B007D] font-semibold">Effective date: 30 October 2025</p>
          </div>
        </section>
      </main>
    </div>
  );
}
