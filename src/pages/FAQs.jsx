import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";



const categories = [
  { id: "all", label: "All Topics" },
  { id: "products", label: "Products & Colours" },
  { id: "application", label: "Application & Tools" },
  { id: "orders", label: "Orders & Delivery" },
  { id: "returns", label: "Returns & Warranty" },
  { id: "payments", label: "Payments & Invoices" },
  { id: "maintenance", label: "Maintenance & Care" },
];



const faqs = [
  {
    question: "How much area does one litre cover?",
    answer:
      "Coverage depends on surface porosity and finish. CALYCO interior emulsions average 90-110 sq.ft per litre for a single coat on smooth plaster. Exterior systems average 70-80 sq.ft per litre. Use two coats for optimal opacity.",
    category: "products",
  },
  {
    question: "What is the difference between matte and satin finishes?",
    answer:
      "Matte finishes provide a low-sheen, velvety appearance ideal for concealing surface imperfections. Satin finishes offer a soft lustre that is easier to clean and recommended for high-traffic or moisture-prone rooms such as kitchens and hallways.",
    category: "products",
  },
  {
    question: "Do CALYCO paints have any odour?",
    answer:
      "Our formulations use low/zero-VOC binders and eco-friendly solvents to minimise odour. Any mild paint smell dissipates within hours thanks to fast off-gassing technology.",
    category: "products",
  },
  {
    question: "Can I change my delivery address after ordering?",
    answer:
      "Yes, if the order has not been dispatched. Contact support with your order ID, new address, and PIN code. We will confirm availability and update the delivery schedule.",
    category: "orders",
  },
  {
    question: "How do I calculate how much paint I need?",
    answer:
      "Measure wall length and height to obtain surface area, subtract openings, and divide by product coverage. Our coverage calculator on the website automates this and suggests the right system for your project.",
    category: "products",
  },
  {
    question: "How do I prepare surfaces before painting?",
    answer:
      "Ensure the substrate is dry, dust-free, and structurally sound. Remove efflorescence, fill cracks, sand glossy areas, and prime as recommended. Refer to CALYCO technical data sheets for surface-specific preparation details.",
    category: "application",
  },
  {
    question: "What tools are recommended for best results?",
    answer:
      "Use high-density foam rollers or premium nylon rollers for interior walls, 100% acrylic brushes for trims, and airless spray rigs for large exterior surfaces. Always clean tools immediately after use.",
    category: "application",
  },
  {
    question: "What are CALYCO drying and recoat times?",
    answer:
      "At 25°C and 60% RH, interior emulsions dry to touch in 30 minutes and can be recoated after 4 hours. Exterior emulsions require 5-6 hours. High humidity may extend timings; increase ventilation for faster drying.",
    category: "application",
  },
  {
    question: "How can I track my order?",
    answer:
      "Login to your account and visit the Orders section to view live order status, courier partner details, and estimated delivery date. Email notifications are sent at each milestone for your convenience.",
    category: "orders",
  },
  {
    question: "What is the return window for CALYCO products?",
    answer:
      "Returns are accepted within 30 days of delivery for unopened items in original packaging. Custom-tinted paints qualify only if there is a manufacturing defect or quality issue. Refer to our Returns & Refunds policy for complete details.",
    category: "returns",
  },
  {
    question: "How do warranty claims work?",
    answer:
      "Warranty durations vary by product family (3-10 years). Submit photos, purchase proof, and application details via the warranty form. Our technical team will investigate and recommend corrective action or replacement if the claim is valid.",
    category: "returns",
  },
  {
    question: "Which payment methods are accepted?",
    answer:
      "We support UPI, wallets, credit/debit cards, net banking, and EMI on orders above ₹5,000. Cash on delivery is available up to ₹10,000 in select PIN codes with a ₹50 service fee.",
    category: "payments",
  },
  {
    question: "Can I receive a GST invoice?",
    answer:
      "Yes. Provide your GSTIN at checkout to receive an auto-generated tax invoice via email immediately after order confirmation. Past invoices can be downloaded from your account dashboard anytime.",
    category: "payments",
  },
  {
    question: "How do I clean interior painted walls?",
    answer:
      "Use a soft microfiber cloth or sponge with mild soap solution. Avoid abrasive pads or harsh chemicals. Wipe gently in circular motions and dry immediately to prevent water marks.",
    category: "maintenance",
  },
  {
    question: "When should I repaint my exterior walls?",
    answer:
      "Exterior repaint cycles are typically 5-7 years depending on UV exposure and weather conditions. Inspect annually for chalking, fading, or hairline cracks. Address surface preparation before recoating for best results.",
    category: "maintenance",
  },
  {
    question: "How can I protect exterior paint during monsoon?",
    answer:
      "Ensure gutters are clear, repair cracks with elastomeric fillers, and apply CALYCO waterproofing sealers on vulnerable surfaces. Maintain proper slope on horizontal surfaces to prevent water pooling.",
    category: "maintenance",
  },
];



const technicalHighlights = [
  {
    title: "Technical Data Sheets",
    description: "Download detailed specs for interior and exterior systems, including coverage, solids content, and recommended primers.",
    link: "/downloads",
  },
  {
    title: "VOC & Safety Compliance",
    description: "CALYCO coatings comply with BIS and international norms. VOC levels: interior emulsions < 30 g/L, exterior emulsions < 50 g/L.",
  },
  {
    title: "System Compatibility",
    description: "Use CALYCO acrylic primer with interior emulsions, water-based exterior primer for facades, and XGuard sealer under waterproofing topcoats.",
  },
];



const maintenanceTips = [
  {
    title: "Cleaning & Care",
    detail: "For routine cleaning, dust walls regularly. Spot clean stains immediately with mild soap solution. Avoid harsh chemicals or high-pressure jets on painted surfaces.",
  },
  {
    title: "Repainting Guidance",
    detail: "Inspect yearly for sheen loss or colour fading. Lightly sand glossy areas and use CALYCO primers before recoating for proper adhesion and durability.",
  },
  {
    title: "Weather & Climate",
    detail: "During extreme heat, schedule painting early morning or evening. In monsoon-prone zones, ensure substrates are below 12% moisture prior to application.",
  },
];



const popularQuestions = [
  "How much area does one litre cover?",
  "What is the difference between matte and satin finishes?",
  "Do CALYCO paints have any odour?",
  "Can I change my delivery address after ordering?",
  "How do I calculate how much paint I need?",
];



const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};



export const FAQs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openQuestion, setOpenQuestion] = useState(null);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        term.length === 0 ||
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);



  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return faqs
      .filter((faq) => faq.question.toLowerCase().includes(term))
      .map((faq) => faq.question)
      .slice(0, 5);
  }, [searchTerm]);



  const highlightedText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "ig");
    return text.replace(regex, "<mark class='bg-[#FFE48A] px-1 rounded'>$1</mark>");
  };



  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Frequently Asked Questions | CALYCO Paints"
        description="Find answers to common questions about CALYCO paints, application, delivery, returns, payments, and maintenance. Search topics or contact support."
        ogType="website"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />



      <main>
        {/* Hero */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[#0F1221]">
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.png"
              alt="Modern interior painted with CALYCO"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-10 lg:px-12 flex items-center justify-center h-full"><div>
            <span className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white/85 backdrop-blur mb-6">
              Frequently Asked Questions
            </span>
            <h1 className="text-3xl font-bold text-white md:text-5xl mb-4">
              Answers to Your Most Common Queries
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg mb-8">
              Browse topics or search for quick solutions. If you can't find what you need, our support team is ready to help.
            </p>
            
            {/* Search Box */}
            <div className="mx-auto w-full max-w-2xl mb-8">
              <div className="relative">
                <input
                  id="faq-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder='Try "coverage" or "delivery"...'
                  className="w-full rounded-xl border border-white/25 bg-white/15 px-5 py-4 text-base text-white placeholder-white/60 shadow-lg outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 backdrop-blur"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/50 text-sm">🔍</span>
              </div>
              
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <ul className="mt-3 space-y-2 rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-white/90 backdrop-blur">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setOpenQuestion(suggestion);
                        }}
                        className="w-full text-left transition hover:text-[#D4AF37]"
                      >
                        → {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>



            <button
              onClick={() => navigate("/contact")}
              className="rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg transition hover:bg-[#bb9831]"
            >
              Contact Support
            </button>
          </div>
          </div>
        </section>



        {/* Categories */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <h2 className="text-2xl font-bold text-[#4B007D] text-center mb-6">Browse by Category</h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#4B007D] text-white shadow-sm"
                        : "border-2 border-[#4B007D]/30 bg-white text-[#4B007D] hover:border-[#4B007D] hover:bg-[#4B007D]/5"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>



        {/* FAQ Accordions */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <h2 className="text-3xl font-bold text-[#4B007D] mb-8 text-center">
              {activeCategory === "all" ? "All Questions" : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            
            {filteredFaqs.length === 0 ? (
              <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-12 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-[#4B007D] mb-3">No Results Found</h3>
                <p className="text-base text-[#31274B]/80 mb-6">
                  Try adjusting your search keywords or browse different categories.
                </p>
                <button
                  onClick={() => navigate("/contact")}
                  className="rounded-xl bg-[#4B007D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3a0061]"
                >
                  Contact Support Team
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openQuestion === faq.question;
                  return (
                    <article
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-[#0F1221]/10 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <button
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        onClick={() => setOpenQuestion(isOpen ? null : faq.question)}
                        aria-expanded={isOpen}
                      >
                        <h3
                          className="text-lg font-semibold text-[#4B007D] flex-1"
                          dangerouslySetInnerHTML={{ __html: highlightedText(faq.question) }}
                        />
                        <span
                          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#4B007D]/10 text-xl font-bold text-[#4B007D] transition ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <p
                            className="text-base text-[#31274B]/85 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: highlightedText(faq.answer) }}
                          />
                          <div className="mt-4 flex items-center gap-3 text-xs text-[#31274B]/60">
                            <span>Was this helpful?</span>
                            <button className="rounded-full border border-[#4B007D]/30 px-4 py-1.5 text-[#4B007D] font-medium transition hover:bg-[#4B007D]/10">
                              Yes
                            </button>
                            <button className="rounded-full border border-[#4B007D]/30 px-4 py-1.5 text-[#4B007D] font-medium transition hover:bg-[#4B007D]/10">
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>



        {/* Technical & Maintenance */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Technical Questions */}
              <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#4B007D] mb-4">Technical Resources</h2>
                <p className="text-sm text-[#31274B]/80 mb-6">
                  Access detailed specifications for compliance documentation and tender submissions.
                </p>
                <ul className="space-y-4">
                  {technicalHighlights.map((item) => (
                    <li key={item.title} className="rounded-xl bg-white p-5">
                      <h3 className="text-base font-bold text-[#4B007D] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#31274B]/80">{item.description}</p>
                      {item.link && (
                        <button
                          onClick={() => navigate(item.link)}
                          className="mt-3 text-sm font-semibold text-[#4B007D] hover:underline"
                        >
                          View Resources →
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>



              {/* Maintenance Tips */}
              <div className="rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#4B007D] mb-4">Maintenance Tips</h2>
                <p className="text-sm text-[#31274B]/80 mb-6">
                  Keep your CALYCO finishes looking fresh with proactive care and climate-aware planning.
                </p>
                <ul className="space-y-4">
                  {maintenanceTips.map((item) => (
                    <li key={item.title} className="rounded-xl bg-white p-5">
                      <h3 className="text-base font-bold text-[#4B007D] mb-2">{item.title}</h3>
                      <p className="text-sm text-[#31274B]/80">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Form */}
        <section className="py-20 bg-[#FBF9F6]">
          <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#4B007D] mb-3">Still Need Help?</h2>
              <p className="text-base text-[#31274B]/85">
                Submit your question and our support team will reply within 24 business hours.
              </p>
            </div>



            <form className="rounded-2xl border border-[#0F1221]/10 bg-white p-8 shadow-sm space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#4B007D]">Name</span>
                  <input
                    type="text"
                    className="rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-[#4B007D]">Email</span>
                  <input
                    type="email"
                    className="rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-[#4B007D]">Your Question</span>
                <textarea
                  rows={5}
                  className="resize-none rounded-xl border border-[#0F1221]/15 px-4 py-3 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                  placeholder="Share details about your project or query..."
                />
              </label>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <p className="text-xs text-[#31274B]/70">
                  By submitting, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/policies/privacy")}
                    className="font-semibold text-[#4B007D] hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
                <button
                  type="submit"
                  className="rounded-xl bg-[#D4AF37] px-8 py-3 text-sm font-semibold text-[#0F1221] shadow-sm transition hover:bg-[#bb9831]"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>



        {/* Popular Questions - Bottom Section */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-12">
            <div className="rounded-2xl border border-[#0F1221]/10 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4B007D] mb-6">Popular Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("How much area does one litre cover?");
                      setOpenQuestion("How much area does one litre cover?");
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-left w-full"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span className="text-[#4B007D] font-medium hover:underline">
                        How much area does one litre cover?
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("Do CALYCO paints have any odour?");
                      setOpenQuestion("Do CALYCO paints have any odour?");
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-left w-full"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span className="text-[#4B007D] font-medium hover:underline">
                        Do CALYCO paints have any odour?
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("How do I calculate how much paint I need?");
                      setOpenQuestion("How do I calculate how much paint I need?");
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-left w-full"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span className="text-[#4B007D] font-medium hover:underline">
                        How do I calculate how much paint I need?
                      </span>
                    </div>
                  </button>
                </div>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("What is the difference between matte and satin finishes?");
                      setOpenQuestion("What is the difference between matte and satin finishes?");
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-left w-full"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span className="text-[#4B007D] font-medium hover:underline">
                        What is the difference between matte and satin finishes?
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("Can I change my delivery address after ordering?");
                      setOpenQuestion("Can I change my delivery address after ordering?");
                      window.scrollTo({ top: 600, behavior: 'smooth' });
                    }}
                    className="text-left w-full"
                  >
                    <div className="flex items-start gap-2">
                      <span className="mt-1 text-[#D4AF37]">•</span>
                      <span className="text-[#4B007D] font-medium hover:underline">
                        Can I change my delivery address after ordering?
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};



export default FAQs;

