import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";

const supportCategories = [
  {
    title: "Products & Colours",
    description: "Finishes, coverage, colour matching, sustainability specs.",
    icon: "🎨",
    link: "/products",
  },
  {
    title: "Application & Tools",
    description: "Surface prep, applicator tips, troubleshooting advice.",
    icon: "🛠️",
    link: "/faq#application",
  },
  {
    title: "Orders & Delivery",
    description: "Shipping timelines, tracking, delivery exceptions.",
    icon: "📦",
    link: "/policies/shipping",
  },
  {
    title: "Account & Payments",
    description: "Billing, invoices, GST, payment methods, security.",
    icon: "💳",
    link: "/policies/payments-gst",
  },
  {
    title: "Professional Services",
    description: "Dealer onboarding, contractor programs, project support.",
    icon: "🏗️",
    link: "/contractors",
  },
];

const popularArticles = [
  "How to choose the right finish for every room",
  "Coverage calculator guide for CALYCO paints",
  "Primers vs sealers: when to use each system",
  "Bulk order checklist for contractors",
  "Step-by-step guide to the Calyco colour visualizer",
];

const knowledgeCategories = [
  { id: "all", label: "All" },
  { id: "products", label: "Products" },
  { id: "application", label: "Application" },
  { id: "orders", label: "Orders" },
  { id: "technical", label: "Technical" },
];

const knowledgeArticles = [
  {
    id: 1,
    title: "Interior vs exterior paint systems",
    summary: "Understand binder technologies, UV stability, and recommended substrates.",
    category: "products",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "Surface preparation checklist",
    summary: "A printable guide for masonry, metal, and wood surfaces before coating.",
    category: "application",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "Using the Calyco coverage calculator",
    summary: "How to estimate paint quantity based on room dimensions and finish.",
    category: "orders",
    readTime: "5 min read",
  },
  {
    id: 4,
    title: "VOC and safety data sheets",
    summary: "Download SDS and PDS documents for CALYCO product families.",
    category: "technical",
    readTime: "3 min read",
  },
  {
    id: 5,
    title: "Troubleshooting roller marks",
    summary: "Diagnose common causes and corrective actions for uneven finishes.",
    category: "application",
    readTime: "7 min read",
  },
];

const videoTutorials = [
  {
    title: "Perfect interior finish in three coats",
    duration: "8:45",
    thumbnail: "/Assets/about-us.png",
  },
  {
    title: "Moisture sealing for monsoon readiness",
    duration: "6:12",
    thumbnail: "/Assets/aekartdir_A_high-quality_ultra-wide_long_shot_photograph_taken__0d5534e1-a72e-4839-8b37-f99d91422e3c.png",
  },
  {
    title: "Choosing the right applicator",
    duration: "5:03",
    thumbnail: "/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png",
  },
];

const downloads = [
  { title: "Master Product Catalogue", size: "8.4 MB", type: "PDF" },
  { title: "Interior Systems Data Sheets", size: "5.1 MB", type: "ZIP" },
  { title: "Warranty & Maintenance Guide", size: "2.7 MB", type: "PDF" },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How quickly does CALYCO respond to support tickets?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We acknowledge every ticket instantly and provide a detailed response within 24 business hours. Urgent issues are escalated through our hotline for immediate assistance.",
      },
    },
    {
      "@type": "Question",
      name: "Can I schedule a consultation with a CALYCO paint expert?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the Consult an Expert form on this page to request a video session. You can specify your project requirements and preferred time slots.",
      },
    },
    {
      "@type": "Question",
      name: "Where can dealers and contractors access partner-only resources?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Certified partners receive login credentials for the Calyco Pro Portal, where they can place orders, access product data, and track technical bulletins.",
      },
    },
  ],
};

export default function CustomerService() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    return popularArticles
      .filter((article) => article.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 4);
  }, [searchTerm]);

  const filteredKnowledge = useMemo(() => {
    if (activeKnowledgeTab === "all") return knowledgeArticles;
    return knowledgeArticles.filter((article) => article.category === activeKnowledgeTab);
  }, [activeKnowledgeTab]);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="CALYCO Support & Queries | Help Centre, Tickets, Knowledge Base"
        description="Access CALYCO's support centre for product guidance, application advice, delivery updates, and ticket tracking. Chat live or schedule expert consultations."
        ogType="website"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 pb-16 md:pt-28">
          <div className="absolute inset-0">
            <img
              src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
              alt="Support representative assisting with CALYCO paints"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B007D]/92 via-[#4B007D]/88 to-[#2E0053]/85" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-5xl flex-col justify-center gap-8 px-6 text-center md:min-h-[78vh] md:px-10 lg:px-12">
            <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur">
              CALYCO Support Centre
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold leading-tight text-white md:text-[3rem]">
                Help & Support Centre
              </h1>
              <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg">
                Your one-stop destination for product information, application guidance, and order assistance. Browse the knowledge base, start a live chat, or schedule an expert consultation.
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-xl flex-col gap-3 text-left">
              <label htmlFor="support-search" className="text-xs font-semibold uppercase tracking-wide text-white/80">
                Search the help centre
              </label>
              <div className="relative">
                <input
                  id="support-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="w-full rounded-2xl border border-white/25 bg-white/15 px-5 py-3 text-sm text-white shadow-lg outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/40"
                  placeholder="Try “coverage calculator” or “express delivery”"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/70">⌘K</span>
              </div>
              {filteredSuggestions.length > 0 && (
                <ul className="space-y-2 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white/85 backdrop-blur">
                  {filteredSuggestions.map((suggestion) => (
                    <li key={suggestion}>
                      <button
                        type="button"
                        onClick={() => setSearchTerm(suggestion)}
                        className="w-full text-left transition hover:text-[#D4AF37]"
                      >
                        {suggestion}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <button
                type="button"
                className={getButtonClasses('accent')}
              >
                Visit Help Centre
              </button>
              <Link
                to="/contact"
                className="rounded-xl border-2 border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">Help Centre Dashboard</h2>
              <p className="mx-auto mt-3 max-w-3xl text-base text-[#31274B]/85 md:text-lg">
                Explore guided resources organised by topic. Dive into curated articles, videos, and tools tailored to your project stage.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {supportCategories.map((category) => (
                <Link
                  key={category.title}
                  to={category.link}
                  className="group flex h-full flex-col gap-4 rounded-3xl border border-[#0F1221]/12 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#D4AF37]/20 text-xl">
                      {category.icon}
                    </span>
                    <h3 className="text-xl font-semibold text-[#4B007D]">{category.title}</h3>
                  </div>
                  <p className="text-sm text-[#31274B]/85">{category.description}</p>
                  <span className="mt-auto text-sm font-semibold text-[#4B007D]">
                    Browse {category.title.split(" ")[0]} →
                  </span>
                </Link>
              ))}
              <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-[#4B007D]/30 bg-[#FBF9F6] p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#4B007D]">Popular Articles</h3>
                <p className="text-sm text-[#31274B]/80">
                  Quick answers to the most-viewed guides this month.
                </p>
                <ul className="space-y-3 text-sm text-[#4B007D]">
                  {popularArticles.map((article) => (
                    <li key={article} className="flex items-start gap-2">
                      <span className="mt-0.5 text-[#D4AF37]">•</span>
                      <span>{article}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Live chat & expert */}
        <section className="py-24 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">
                  Live Chat & Expert Consultation
                </h2>
                <p className={`${getTypographyClasses('body')} text-[#31274B]/85`}>
                  Connect instantly with our specialists from 9 AM to 9 PM IST or schedule a video consultation for personalised advice.
                </p>
                <div className="rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">Dealer & Contractor Support</h3>
                  <p className="mt-2 text-sm text-[#31274B]/80">
                    Call +91 9300 111 222 or log into the Calyco Pro Portal for partner resources, price lists, and project tracking.
                  </p>
                  <a
                    href="/contractors"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[#4B007D] underline-offset-4 hover:underline"
                  >
                    Access partner portal
                  </a>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-xl text-[#4B007D]">
                      💬
                    </span>
                    <h3 className="text-xl font-semibold text-[#4B007D]">Start Live Chat</h3>
                  </div>
                  <p className="text-sm text-[#31274B]/80">
                    Available daily from 9 AM to 9 PM IST. Connect with trained support agents in under 60 seconds.
                  </p>
                  <button
                    type="button"
                    className={`mt-auto ${getButtonClasses('accent')}`}
                  >
                    Chat now
                  </button>
                </div>
                <div className="flex h-full flex-col gap-4 rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4B007D]/15 text-xl text-[#4B007D]">
                      🎥
                    </span>
                    <h3 className="text-xl font-semibold text-[#4B007D]">Consult an Expert</h3>
                  </div>
                  <p className="text-sm text-[#31274B]/80">
                    Schedule a 30-minute video call for colour planning, product selection, or application sequencing.
                  </p>
                  <form className="mt-auto space-y-3 text-sm">
                    <label className="flex flex-col gap-1 text-[#31274B]/85">
                      Preferred slot
                      <input
                        type="datetime-local"
                        className="rounded-lg border border-[#0F1221]/15 px-3 py-2 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-[#31274B]/85">
                      Topic
                      <select className="rounded-lg border border-[#0F1221]/15 px-3 py-2 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20">
                        <option value="colour-advice">Colour advice</option>
                        <option value="project-planning">Project planning</option>
                        <option value="technical-guidance">Technical guidance</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      className="w-full rounded-xl border border-[#4B007D] px-4 py-2 text-sm font-semibold text-[#4B007D] transition hover:bg-[#4B007D]/10"
                    >
                      Request session
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticket system */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">Ticket System</h2>
              <p className="mx-auto mt-3 max-w-3xl text-base text-[#31274B]/85 md:text-lg">
                Log an issue, upload photos, and track progress in one dashboard. We respond to every ticket within 24 hours.
              </p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)]">
              <div className="space-y-6 rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-[#4B007D]">Submit a Request</h3>
                  <span className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-xs font-semibold text-[#4B007D]">
                    Step 1 of 3
                  </span>
                </div>
                <form className="space-y-4 text-sm">
                  <label className="flex flex-col gap-1 text-[#31274B]/85">
                    Category
                    <select className="rounded-lg border border-[#0F1221]/15 px-3 py-2 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20">
                      <option value="product">Product guidance</option>
                      <option value="order">Order or delivery</option>
                      <option value="technical">Technical issue</option>
                      <option value="billing">Billing or account</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1 text-[#31274B]/85">
                    Priority
                    <div className="flex gap-3">
                      {["Low", "Medium", "High"].map((priority) => (
                        <label key={priority} className="inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 px-3 py-2">
                          <input type="radio" name="priority" value={priority.toLowerCase()} className="text-[#4B007D] focus:ring-[#4B007D]" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-[#4B007D]">
                            {priority}
                          </span>
                        </label>
                      ))}
                    </div>
                  </label>
                  <label className="flex flex-col gap-1 text-[#31274B]/85">
                    Describe the issue
                    <textarea
                      rows={4}
                      className="resize-none rounded-lg border border-[#0F1221]/15 px-3 py-2 text-sm text-[#0F1221] outline-none focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      placeholder="Share details, order IDs, or paint system names."
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[#31274B]/85">
                    Attach photos
                    <input
                      type="file"
                      multiple
                      className="rounded-lg border border-dashed border-[#0F1221]/20 px-3 py-3 text-sm text-[#0F1221]"
                    />
                  </label>
                  <button
                    type="button"
                    className="w-full rounded-xl bg-[#4B007D] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3C0063]"
                  >
                    Log ticket
                  </button>
                  <p className="text-xs text-[#31274B]/70">
                    Response commitment: within 24 hours for non-urgent tickets. For emergencies, call +91 9111 222 333.
                  </p>
                </form>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-[#4B007D]">Ticket Status</h3>
                    <span className="rounded-full bg-[#4B007D]/10 px-3 py-1 text-xs font-semibold text-[#4B007D]">
                      Updated 15 min ago
                    </span>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#0F1221]/10">
                    <table className="min-w-full divide-y divide-[#0F1221]/10 text-sm">
                      <thead className="bg-[#FBF9F6] text-[#4B007D]">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold">Ticket</th>
                          <th className="px-4 py-3 text-left font-semibold">Category</th>
                          <th className="px-4 py-3 text-left font-semibold">Status</th>
                          <th className="px-4 py-3 text-left font-semibold">Updated</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white text-[#31274B]/85">
                        {[
                          { id: "#4821", category: "Delivery", status: "In Progress", updated: "1 h ago" },
                          { id: "#4762", category: "Product", status: "Resolved", updated: "Yesterday" },
                          { id: "#4699", category: "Technical", status: "New", updated: "10 min ago" },
                        ].map((ticket) => (
                          <tr key={ticket.id} className="divide-x divide-[#0F1221]/10">
                            <td className="px-4 py-3 font-semibold text-[#4B007D]">{ticket.id}</td>
                            <td className="px-4 py-3">{ticket.category}</td>
                            <td className="px-4 py-3">
                              <span className="rounded-full bg-[#D4AF37]/20 px-3 py-1 text-xs font-semibold text-[#4B007D]">
                                {ticket.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">{ticket.updated}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-3xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">Service Level Commitments</h3>
                  <ul className="mt-3 space-y-2 text-sm text-[#31274B]/85">
                    <li>• First response within 24 hours for standard tickets.</li>
                    <li>• Urgent delivery or safety concerns receive immediate callback.</li>
                    <li>• Resolution time tracked and shared transparently inside your dashboard.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge base */}
        <section className="py-24 bg-[#FBF9F6]">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">Knowledge Base & Tutorials</h2>
                <p className="mt-2 text-sm text-[#31274B]/80 md:text-base">
                  Filter articles, watch short tutorials, and download datasheets for your next specification.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {knowledgeCategories.map((tab) => {
                  const isActive = tab.id === activeKnowledgeTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveKnowledgeTab(tab.id)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        isActive
                          ? "bg-[#4B007D] text-white shadow-sm"
                          : "border border-[#4B007D]/30 bg-white text-[#4B007D] hover:border-[#4B007D]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
              <div className="space-y-4">
                {filteredKnowledge.map((article) => (
                  <article key={article.id} className="rounded-3xl border border-[#0F1221]/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-[#D4AF37]">
                      {article.category}
                      <span className="text-[#31274B]/60">{article.readTime}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold text-[#4B007D]">{article.title}</h3>
                    <p className="mt-2 text-sm text-[#31274B]/80">{article.summary}</p>
                    <button className="mt-3 text-sm font-semibold text-[#4B007D] underline-offset-4 hover:underline">
                      Read article
                    </button>
                  </article>
                ))}
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">Video Tutorials</h3>
                  <div className="mt-4 space-y-4">
                    {videoTutorials.map((video) => (
                      <div key={video.title} className="flex items-center gap-4 rounded-2xl border border-[#0F1221]/10 bg-[#FBF9F6] p-3">
                        <div className="relative h-20 w-32 overflow-hidden rounded-xl">
                          <img src={video.thumbnail} alt={video.title} className="h-full w-full object-cover" loading="lazy" />
                          <span className="absolute inset-0 flex items-center justify-center text-white">
                            ▶
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#4B007D]">{video.title}</p>
                          <p className="text-xs text-[#31274B]/70">Duration: {video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-[#0F1221]/10 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-[#4B007D]">Downloadable Resources</h3>
                  <ul className="mt-4 space-y-3 text-sm text-[#31274B]/85">
                    {downloads.map((file) => (
                      <li key={file.title} className="flex items-center justify-between rounded-2xl bg-[#FBF9F6] px-4 py-3">
                        <div>
                          <p className="font-semibold text-[#4B007D]">{file.title}</p>
                          <p className="text-xs text-[#31274B]/60">{file.type} • {file.size}</p>
                        </div>
                        <button className="rounded-full border border-[#4B007D] px-3 py-1 text-xs font-semibold text-[#4B007D] transition hover:bg-[#4B007D]/10">
                          Download
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:px-10 lg:px-12">
            <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">Join the Calyco Community</h2>
            <p className="max-w-3xl text-base text-[#31274B]/85 md:text-lg">
              Subscribe for colour launches, application webinars, and technical deep dives. Share your support experience so we can keep improving.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className={getButtonClasses('accent')}>
                Subscribe & Download
              </button>
              <button className="rounded-xl border-2 border-[#D4AF37] px-8 py-3 text-base font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10">
                Give Feedback
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

