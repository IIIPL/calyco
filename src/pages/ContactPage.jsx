import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@formspree/react";
import SEO from "../components/SEO";

const contactChannels = [
  {
    title: "Call Us",
    detail: "+91-99589-66881",
    subDetail: "Mon–Sat, 10am–6pm IST",
    description: "Speak directly with our experts",
    icon: "📞",
    href: "tel:+919958966881",
  },
  {
    title: "Email Us",
    detail: "support@calycopaints.com",
    subDetail: "24/7 support available",
    description: "Get detailed responses quickly",
    icon: "✉️",
    href: "mailto:support@calycopaints.com",
  },
  {
    title: "Visit Us",
    detail: "B-37, Sector - 1, Noida NCR, India",
    subDetail: "By appointment only",
    description: "Our headquarters",
    icon: "🏢",
  },
];

const businessSupport = [
  {
    title: "24h Response Time",
    description: "Our team will get back to you within 24 hours with personalized solutions.",
    icon: "⏰",
  },
  {
    title: "Expert Support",
    description: "Connect with our technical specialists for detailed product guidance.",
    icon: "🎯",
  },
  {
    title: "Global Presence",
    description: "Local support and expertise across multiple countries and regions.",
    icon: "🌍",
  },
];

const offices = [
  {
    id: "india",
    name: "India",
    region: "Headquarters",
    address: "B-37, Sector - 1, Noida NCR, India",
    email: "info@calycopaints.com",
  },
  {
    id: "dubai",
    name: "Dubai",
    region: "Middle East",
    address: "Po Box: 42747 Hamriyah FZ, Sharjah, U.A.E.",
    email: "dubai@calycopaints.com",
  },
  {
    id: "thailand",
    name: "Thailand",
    region: "Southeast Asia",
    address: "75 Ocean Tower - II, 18C Floor Sukhumvit Road, Bangkok, Thailand",
    email: "thailand@calycopaints.com",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Bulk Order",
  "Dealer Partnership",
  "Media & Press",
  "Technical Support",
  "Request Quote",
];

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Calyco Paints",
  url: "https://calycopaints.com",
  telephone: "+91-99589-66881",
  email: "support@calycopaints.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B-37, Sector - 1",
    addressLocality: "Noida NCR",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  areaServed: ["IN"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-99589-66881",
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xnnbaygb");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins">
      <SEO
        title="Contact Calyco | Expert Paint Support Across India"
        description="Speak with CALYCO's team for product advice, bulk orders, or technical support. Call, email, live chat, or submit our enquiry form."
        ogType="website"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <main>
        {/* Hero - Fixed spacing and removed call button */}
        <section className="relative flex min-h-[78vh] items-start justify-center overflow-hidden pt-24 pb-16 md:min-h-[85vh] md:pt-28 lg:min-h-[90vh]">
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
              alt="Modern Indian home exterior finished with Calyco paints"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#4B007D]/95 via-[#4B007D]/90 to-[#2E0053]/85" />
          </div>
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-7 px-6 pb-12 pt-12 text-center md:px-10 md:pt-16 lg:px-12">
            {/* Fixed badge spacing */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#D4AF37]"></span>
                Calyco Support Network
              </span>
            </div>
            <h1 className="mx-auto max-w-[680px] text-3xl font-semibold leading-[1.12] text-white md:text-[3.25rem] lg:text-[3.6rem]">
              <span className="block">
                Get in Touch with{" "}
                <span className="text-[#D4AF37]">Calyco</span>
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-base text-white/90 md:text-lg">
              We're here to answer questions, provide expert advice, and help you
              specify the perfect paint system—whether you're a homeowner,
              contractor, architect, or designer.
            </p>
            {/* Removed the second paragraph and call button */}
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleScrollToForm}
                className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg shadow-[#00000014] transition hover:bg-[#bb9831]"
              >
                Submit an Enquiry
              </button>
            </div>
          </div>
        </section>

        {/* Multiple Ways to Reach Us */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">
                Multiple Ways to Reach Us
              </h2>
              <p className="mx-auto max-w-3xl text-base text-[#31274B]/80 md:text-lg">
                Choose the most convenient way to get in touch with our expert team.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {contactChannels.map((channel) => (
                <div
                  key={channel.title}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-[#0F1221]/10 bg-[#FBF9F6] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D4AF37]/20 text-2xl">
                      <span role="img" aria-label={`${channel.title} icon`}>
                        {channel.icon}
                      </span>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-[#4B007D]">
                        {channel.title}
                      </h3>
                      <p className="text-sm text-[#31274B]/70">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="text-base font-medium text-[#31274B] underline-offset-4 transition hover:text-[#4B007D] hover:underline"
                    >
                      {channel.detail}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-[#31274B]">
                      {channel.detail}
                    </p>
                  )}
                  {channel.subDetail && (
                    <p className="text-sm text-[#31274B]/70">{channel.subDetail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Send Us a Message - Fixed image height */}
        <section className="py-20" ref={formRef}>
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            {/* Header */}
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl mb-4">
                Send Us a Message
              </h2>
              <p className="mx-auto max-w-3xl text-base text-[#31274B]/85 md:text-lg">
                Tell us about your project, ask questions, or request a quote. Our team will get back to you within 24 hours with personalized solutions.
              </p>
            </div>

            {/* Form and Image Layout - Fixed height matching */}
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-stretch">
              {/* Contact Form */}
              <form
                onSubmit={handleSubmit}
                className="rounded-[32px] border border-[#0F1221]/10 bg-white/80 p-8 shadow-lg backdrop-blur"
                noValidate
                aria-live="polite"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-[#4B007D]"
                    >
                      Full Name<span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] px-4 py-3 text-sm text-[#0F1221] shadow-sm outline-none transition focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      aria-invalid={Boolean(state.errors?.some((e) => e.field === "name"))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-[#4B007D]"
                    >
                      Email Address<span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] px-4 py-3 text-sm text-[#0F1221] shadow-sm outline-none transition focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      aria-invalid={Boolean(state.errors?.some((e) => e.field === "email"))}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-[#4B007D]"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="^\\+?[0-9\\s-]{7,}$"
                      className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] px-4 py-3 text-sm text-[#0F1221] shadow-sm outline-none transition focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                      aria-invalid={Boolean(state.errors?.some((e) => e.field === "phone"))}
                      placeholder="+91 99999 99999"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="inquiry"
                      className="text-sm font-semibold text-[#4B007D]"
                    >
                      Type of Inquiry<span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      className="rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] px-4 py-3 text-sm text-[#0F1221] shadow-sm outline-none transition focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-[#4B007D]"
                  >
                    Message<span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="resize-none rounded-xl border border-[#0F1221]/15 bg-[#FBF9F6] px-4 py-3 text-sm text-[#0F1221] shadow-sm outline-none transition focus:border-[#4B007D] focus:ring-2 focus:ring-[#4B007D]/20"
                  ></textarea>
                </div>
                <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[#FBF9F6] px-4 py-3 text-sm text-[#31274B]/85">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="privacy_agreement"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-[#0F1221]/20 text-[#4B007D] focus:ring-[#4B007D]"
                    />
                    <span>
                      I agree to Calyco Paints processing my personal data in accordance with the{" "}
                      <a
                        href="/privacy"
                        className="font-semibold text-[#4B007D] underline-offset-4 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .<span className="text-[#D4AF37]">*</span>
                    </span>
                  </label>
                </div>
                {state.errors && state.errors.length > 0 && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Please review the highlighted fields and try again.
                  </div>
                )}
                {showSuccess && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Thanks for reaching out! Our team will get back to you soon.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#D4AF37] px-6 py-3 text-base font-semibold text-[#0F1221] shadow-lg shadow-[#00000014] transition hover:bg-[#bb9831] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Right Side Image - Fixed to match form height */}
              <div className="flex items-stretch lg:pl-8">
                <div className="rounded-3xl overflow-hidden shadow-lg w-full flex">
                  <img
                    src="/Assets/about-us.png"
                    alt="Calyco customer service team"
                    className="w-full h-full object-cover min-h-full"
                    loading="lazy"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Support Features - Separate Section with Minimal Spacing */}
        <section className="py-12">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="grid gap-6 sm:grid-cols-3">
              {businessSupport.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-4 rounded-3xl border border-[#0F1221]/8 bg-[#FBF9F6] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4B007D]/15 text-2xl text-[#4B007D]">
                    <span role="img" aria-label={`${item.title} icon`}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#4B007D] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#31274B]/85 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-12">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">
                Global Presence
              </h2>
              <p className="mx-auto max-w-3xl text-base text-[#31274B]/80 md:text-lg">
                Connect with our team across the globe for local support and expertise.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className="flex h-full flex-col gap-4 rounded-3xl border border-[#0F1221]/10 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <span className="text-sm font-semibold uppercase tracking-wide text-[#D4AF37]">
                      {office.region}
                    </span>
                    <h3 className="mt-1 text-2xl font-semibold text-[#4B007D]">
                      {office.name}
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm text-[#31274B]/85">
                    <p className="font-medium">{office.address}</p>
                    <div>
                      <a
                        href={`mailto:${office.email}`}
                        className="text-[#4B007D] underline-offset-4 hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-[#FBF9F6] py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:px-10 lg:px-12">
            <h2 className="text-3xl font-semibold text-[#4B007D] md:text-4xl">
              Need specifications or color inspiration?
            </h2>
            <p className="max-w-3xl text-base text-[#31274B]/85 md:text-lg">
              Continue exploring CALYCO products or visit Support & FAQs for quick
              answers to common questions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-8 py-3 text-base font-semibold text-[#0F1221] shadow-lg shadow-[#00000014] transition hover:bg-[#bb9831]"
              >
                Back to Products
              </a>
              <a
                href="/faq"
                className="inline-flex items-center justify-center rounded-xl border-2 border-[#D4AF37] px-8 py-3 text-base font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/10"
              >
                Support & FAQs
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
