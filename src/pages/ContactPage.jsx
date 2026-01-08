import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "@formspree/react";
import SEO from "../components/SEO";
import contactData from "../data/admin/contact.json";
import { getTypographyClasses, getButtonClasses } from "../data/admin/typography";

const contactChannels = [
  {
    title: "WhatsApp Support",
    detail: contactData.contact.whatsapp.displayText,
    description: "Message our team instantly.",
    subDetail: contactData.contact.workingHours.days + " - " + contactData.contact.workingHours.time,
    icon: "📱",
    href: contactData.contact.whatsapp.link,
    newTab: true,
  },
  {
    title: "Email Support",
    detail: contactData.contact.email.support,
    description: "Send us a note and we'll reply within a day.",
    subDetail: "Replies within 24 hours",
    icon: "✉️",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactData.contact.email.support)}`,
    newTab: true,
  },
  {
    title: "Visit Our HQ",
    detail: contactData.contact.address.full,
    description: "Meet us at our headquarters.",
    subDetail: "By appointment only",
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
  telephone: contactData.contact.phone.number,
  email: contactData.contact.email.support,
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
      telephone: contactData.contact.phone.number,
      contactType: "customer support",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xnnbaygb");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Inject premium palette tokens + scroll animation helpers shared with brand pages.
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      :root {
        --calyco-ink: #0F1221;
        --calyco-plum: #4B007D;
        --calyco-gold: #D4AF37;
        --calyco-cream: #F6F3EE;
        --calyco-warm-white: #FCFAF6;
      }
      .animate-fadeInUp {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(26px);
      }
      .glass-effect {
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      .premium-shadow {
        box-shadow: 0 22px 45px -24px rgba(15, 18, 33, 0.32);
      }
      .text-gradient {
        background: linear-gradient(135deg, var(--calyco-gold) 0%, var(--calyco-plum) 95%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
    `;
    document.head.appendChild(styleSheet);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  const fieldHasError = (field) =>
    Boolean(state.errors?.some((error) => error.field === field));

  return (
    <div className="min-h-screen bg-[var(--calyco-cream)] text-[var(--calyco-ink)] font-poppins">
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
        {/* Hero: hospitality-inspired contact banner */}
        <section className="relative h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden bg-[var(--calyco-ink)] text-white">
          <div className="absolute inset-0">
            <img
              src="/Assets/updated hero images/2.webp?v=20260108-002"
              alt="Modern painted interior space - Calyco Paints customer support and consultation center"
              title="Contact Calyco Paints - Premium Paint Consultation"
              className="h-full w-full object-cover brightness-75"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative mx-auto w-full max-w-5xl px-4 text-center flex items-center justify-center h-full">
            <div>
              <span className="glass-effect animate-on-scroll inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 md:text-xs">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--calyco-gold)]" />
                CALYCO Support
              </span>
              <h1 className={`${getTypographyClasses('h1')} animate-on-scroll text-white`}>
                Get in touch with our team
              </h1>
              <p className={`${getTypographyClasses('bodyLarge')} animate-on-scroll mx-auto max-w-2xl text-white/90`}>
                We're here to help with your paint projects
              </p>
            </div>
          </div>
        </section>

        {/* Multiple Ways to Reach Us */}
        <section className="relative py-20 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F8F4EC] to-white" />
          <div className="relative mx-auto max-w-5xl px-4 md:px-8 lg:px-10">
            <div className="animate-on-scroll text-center">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                Multiple Ways to Reach Us
              </h2>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-3xl text-[#31274B]/80`}>
                Choose the most convenient way to get in touch with our expert team.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {contactChannels.map((channel) => {
                const isLink = Boolean(channel.href);
                const Wrapper = isLink ? 'a' : 'article';
                const wrapperProps = isLink
                  ? {
                      href: channel.href,
                      target: channel.newTab ? "_blank" : undefined,
                      rel: channel.newTab ? "noreferrer" : undefined,
                    }
                  : {};

                return (
                  <Wrapper
                    key={channel.title}
                    {...wrapperProps}
                    className={`animate-on-scroll flex h-full flex-col items-center gap-4 rounded-[28px] border border-black/6 bg-white/95 p-6 text-center shadow-[0_24px_45px_-40px_rgba(15,18,33,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_60px_-38px_rgba(15,18,33,0.55)] ${isLink ? 'cursor-pointer' : ''}`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-2xl text-[var(--calyco-ink)]">
                      <span role="img" aria-label={`${channel.title} icon`}>
                        {channel.icon}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>
                        {channel.title}
                      </h3>
                      <p className={`${getTypographyClasses('body')} text-[#31274B]/70`}>
                        {channel.description}
                      </p>
                    </div>
                    <div className="text-base font-semibold text-[var(--calyco-ink)]">
                      {channel.detail}
                    </div>
                    {channel.subDetail && (
                      <p className="text-sm text-[#31274B]/70">{channel.subDetail}</p>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </section>

        {/* Send Us a Message */}
        <section className="relative py-20 md:py-24" ref={formRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--calyco-cream)] to-white" />
          <div className="relative mx-auto max-w-6xl px-4 md:px-8 lg:px-10">
            <div className="animate-on-scroll text-center">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                Send Us a Message
              </h2>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-3xl text-[#31274B]/85`}>
                Tell us about your project, ask questions, or request a quote. Our team will get back to you within 24 hours with personalized solutions.
              </p>
            </div>

            <div className="mt-12">
              <form
                onSubmit={handleSubmit}
                className="animate-on-scroll rounded-[32px] border border-black/6 bg-white/95 p-8 shadow-[0_32px_55px_-45px_rgba(15,18,33,0.55)] backdrop-blur"
                noValidate
                aria-live="polite"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder=" "
                      aria-invalid={fieldHasError("name")}
                      className="peer h-14 w-full rounded-2xl border border-black/10 bg-[var(--calyco-cream)]/60 px-4 pt-5 text-sm text-[var(--calyco-ink)] shadow-sm outline-none transition focus:border-[var(--calyco-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--calyco-ink)]/15"
                    />
                    <label
                      htmlFor="name"
                      className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#31274B]/65 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.1em] peer-focus:top-2 peer-focus:text-[var(--calyco-ink)] peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
                    >
                      Full Name<span className="text-[var(--calyco-gold)]">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder=" "
                      aria-invalid={fieldHasError("email")}
                      className="peer h-14 w-full rounded-2xl border border-black/10 bg-[var(--calyco-cream)]/60 px-4 pt-5 text-sm text-[var(--calyco-ink)] shadow-sm outline-none transition focus:border-[var(--calyco-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--calyco-ink)]/15"
                    />
                    <label
                      htmlFor="email"
                      className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#31274B]/65 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.1em] peer-focus:top-2 peer-focus:text-[var(--calyco-ink)] peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
                    >
                      Email Address<span className="text-[var(--calyco-gold)]">*</span>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      pattern="^\\+?[0-9\\s-]{7,}$"
                      placeholder="+91 99999 99999"
                      aria-invalid={fieldHasError("phone")}
                      className="peer h-14 w-full rounded-2xl border border-black/10 bg-[var(--calyco-cream)]/60 px-4 pt-5 text-sm text-[var(--calyco-ink)] shadow-sm outline-none transition focus:border-[var(--calyco-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--calyco-ink)]/15"
                    />
                    <label
                      htmlFor="phone"
                      className="pointer-events-none absolute left-4 top-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#31274B]/65 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-xs peer-focus:top-1.5 peer-focus:text-[var(--calyco-ink)] peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[11px]"
                    >
                      Phone Number
                    </label>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="inquiry"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-[#31274B]/70"
                    >
                      Type of Inquiry<span className="text-[var(--calyco-gold)]">*</span>
                    </label>
                    <select
                      id="inquiry"
                      name="inquiry"
                      required
                      className="h-14 w-full rounded-2xl border border-black/10 bg-[var(--calyco-cream)]/60 px-4 text-sm text-[var(--calyco-ink)] shadow-sm outline-none transition focus:border-[var(--calyco-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--calyco-ink)]/15"
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
                <div className="mt-6">
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder=" "
                      aria-invalid={fieldHasError("message")}
                      className="peer w-full rounded-2xl border border-black/10 bg-[var(--calyco-cream)]/60 px-4 pb-3 pt-5 text-sm text-[var(--calyco-ink)] shadow-sm outline-none transition focus:border-[var(--calyco-ink)] focus:bg-white focus:ring-2 focus:ring-[var(--calyco-ink)]/15"
                    ></textarea>
                    <label
                      htmlFor="message"
                      className="pointer-events-none absolute left-4 top-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#31274B]/65 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-[0.1em] peer-focus:top-2 peer-focus:text-[var(--calyco-ink)] peer-focus:text-[11px] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]"
                    >
                      Message<span className="text-[var(--calyco-gold)]">*</span>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-[var(--calyco-cream)]/80 px-4 py-3 text-sm text-[#31274B]/85">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="privacy_agreement"
                      required
                      className="mt-0.5 h-4 w-4 rounded border-[#0F1221]/20 text-[var(--calyco-ink)] focus:ring-[var(--calyco-ink)]"
                    />
                    <span>
                      I agree to Calyco Paints processing my personal data in accordance with the{" "}
                      <a
                        href="/privacy"
                        className="font-semibold text-[var(--calyco-plum)] underline-offset-4 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .<span className="text-[var(--calyco-gold)]">*</span>
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
                  className={`${getButtonClasses('accent')} mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70`}
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              <div className="animate-on-scroll flex items-stretch">
                <div className="w-full overflow-hidden rounded-[32px] border border-white/60 shadow-[0_35px_65px_-50px_rgba(15,18,33,0.65)]">
                  <img
                    src="/Assets/jonestown___a_head_on_front_facing_view_of_a_computer_monitor_o_8ce9e327-7643-4fe4-8216-dfd87bf574cd.webp"
                    alt="Calyco customer service team providing on-call assistance"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Support Features */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-10">
            <div className="animate-on-scroll mb-10 text-center">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                Why Teams Choose Calyco Support
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {businessSupport.map((item) => (
                <div
                  key={item.title}
                  className="animate-on-scroll flex flex-col items-center gap-4 rounded-[28px] border border-black/6 bg-white/95 p-6 text-center shadow-[0_24px_45px_-40px_rgba(15,18,33,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_40px_60px_-38px_rgba(15,18,33,0.55)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-2xl text-[var(--calyco-ink)]">
                    <span role="img" aria-label={`${item.title} icon`}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>
                      {item.title}
                    </h3>
                    <p className={`${getTypographyClasses('body')} text-[#31274B]/85`}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="bg-[#FBF9F6] py-20">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:px-10 lg:px-12">
            <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
              Need specifications or color inspiration?
            </h2>
            <p className={`${getTypographyClasses('body')} max-w-3xl text-[#31274B]/85`}>
              Continue exploring CALYCO products or visit Support & FAQs for quick
              answers to common questions.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/products"
                className={getButtonClasses('accent')}
              >
                Back to Products
              </a>
              <a
                href="/faq"
                className={getButtonClasses('outline')}
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

