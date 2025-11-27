import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import BudgetCalculatorCTA from "../components/HomeComponents/BudgetCalculatorCTA";
import WhyCalycoShowcase from "../components/HomeComponents/WhyCalycoShowcase";
import { getTypographyClasses, getButtonClasses } from "../data/admin/typography";

const storyMilestones = [
  { icon: "🎯", text: "Closing the gap between performance & responsibility" },
  { icon: "🚀", text: "150+ shades, world-class facilities, 10 states served" },
  { icon: "👑", text: "Serving homes & projects nationwide, sustainable growth" },
];

const valuePillars = [
  { text: "Quality without compromise", icon: "⭐" },
  { text: "Relentless innovation", icon: "🔬" },
  { text: "Environmental stewardship", icon: "🌱" },
  { text: "Customer-first approach", icon: "🤝" },
  { text: "Integrity", icon: "🛡️" },
];

const leadershipPillars = [
  {
    caption: "Science-led Innovation",
    title: "R&D Excellence",
    description:
      "Coatings technologists and material scientists advance resin chemistry, pigments, and additives tuned for India's humidity, dust, and monsoon cycles.",
    icon: "🧪",
    gradient: "from-[#4B007D] to-[#6B46C1]",
  },
  {
    caption: "Operations & Scale",
    title: "Manufacturing Mastery",
    description:
      "Manufacturing, supply chain, and quality leaders orchestrate end-to-end efficiency with rigorous batch-to-bucket validation.",
    icon: "⚙️",
    gradient: "from-[#D4AF37] to-[#F59E0B]",
  },
  {
    caption: "Experience Design",
    title: "Customer Excellence",
    description:
      "Design strategists and service teams translate field feedback into intuitive product systems and support for homeowners and specifiers.",
    icon: "💎",
    gradient: "from-[#4B007D] to-[#8B5CF6]",
  },
  {
    caption: "Partner Enablement",
    title: "Trade Enablement",
    description:
      "Applicator trainers and technical advisors equip dealers, contractors, and architects with real-world application guidance.",  
    icon: "🏗️",
    gradient: "from-[#D4AF37] to-[#EAB308]",
  },
];

const manufacturingHighlights = [
  {
    title: "State-of-the-Art Facilities",
    description:
      "50,000 sq. ft. factory in Maharashtra featuring automated mixing, tinting, and packaging lines for consistent, scalable output.",
    icon: "🏭",
    metric: "50,000 sq. ft.",
  },
  {
    title: "Quality Assurance",
    description:
      "Every batch tested for color accuracy, coverage, film build, adhesion, scrub resistance, and weather durability before release.",
    icon: "🔍",
    metric: "100% Tested",
  },
  {
    title: "Sustainable Operations",
    description:
      "Water-based systems, low-/zero-VOC formulations, and waste reduction practices minimize impact across the product lifecycle.",
    icon: "🌿",
    metric: "Zero-VOC",
  },
];

const ecoMaxFeatures = [
  {
    title: "Zero-VOC Colorants",
    description: "Proprietary eco-friendly colorants eliminate harsh chemicals while delivering exceptional color vibrancy and depth.",
    icon: "🎨",
    stat: "0% VOC"
  },
  {
    title: "Enhanced Durability",
    description: "Advanced formulation strengthens paint performance, extending lifespan and reducing maintenance requirements.",
    icon: "🛡️",
    stat: "25% Stronger"
  },
  {
    title: "Superior Air Quality",
    description: "Low-odor technology ensures healthier indoor environments during and after application.",
    icon: "💨",
    stat: "Low Odor"
  }
];

const sustainabilityPoints = [
  {
    title: "Safer Indoors",
    description:
      "Low-/zero-VOC technologies help reduce indoor air pollutants during and after application.",
    icon: "🏠",
  },
  {
    title: "Responsible Supply",
    description:
      "Ethically sourced raw materials and packaging optimized for recyclability support responsible consumption.",
    icon: "♻️",
  },
  {
    title: "Full Transparency",
    description:
      "Product and safety data sheets, plus third-party certifications, empower informed decision-making.",
    icon: "📜",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Attach premium palette tokens and animation helpers once per mount.
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      /* Calyco premium palette tokens */
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
        transform: translateY(28px);
      }
      .glass-effect {
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }
      .premium-shadow {
        box-shadow: 0 22px 45px -20px rgba(15, 18, 33, 0.28);
      }
      .premium-shadow-lg {
        box-shadow: 0 32px 60px -18px rgba(15, 18, 33, 0.32);
      }
      .surface-soft {
        background: linear-gradient(150deg, rgba(252, 250, 246, 0.96), rgba(246, 243, 238, 0.92));
      }
      .text-gradient {
        background: linear-gradient(135deg, var(--calyco-gold) 0%, var(--calyco-plum) 95%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .float-animation {
        animation: float 3.5s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleSheet);

    // Apply smooth intersection reveals inspired by premium editorial layouts.
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeInUp");
          }
        });
      },
      { threshold: 0.14 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  const handleNavigate = (path) => () => navigate(path);

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins overflow-x-hidden">
      <SEO
        title="About CALYCO | Professional-Grade Paint Systems for India"
        description="CALYCO delivers premium, low-/zero-VOC paint systems engineered for Indian conditions—combining durability, innovation, and sustainability."
        ogType="website"
      />

      <main>
        {/* Hero: editorial photography with softened overlays for premium tone */}
        <section className="relative flex h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.webp"
              alt="Modern Indian home exterior finished with CALYCO paints"
              className="h-full w-full scale-105 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="absolute top-24 left-10 h-40 w-40 rounded-full bg-[var(--calyco-gold)]/12 blur-3xl float-animation" />
          <div
            className="absolute bottom-24 right-14 h-44 w-44 rounded-full bg-white/10 blur-3xl float-animation"
            style={{ animationDelay: "1.25s" }}
          />
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
            <span className="glass-effect animate-on-scroll inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 md:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--calyco-gold)]" />
              CALYCO Paints | Est. 2023
            </span>
            <h1 className={`${getTypographyClasses('h1')} animate-on-scroll text-white`}>
              Colour systems for modern India
            </h1>
            <p className={`${getTypographyClasses('bodyLarge')} animate-on-scroll mx-auto max-w-2xl text-white/90`}>
              Purpose-built finishes with sustainable chemistries
            </p>
          </div>
        </section>
        {/* Our Story: calm cream surface pairing photography with proof points */}
        <section className="bg-[var(--calyco-cream)] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div className="animate-on-scroll rounded-[32px] border border-black/5 bg-white/90 p-8 shadow-[0_28px_60px_-45px_rgba(13,15,28,0.45)] md:p-10">
                <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>Our Story</h2>
                <p className={`${getTypographyClasses('body')} text-[#31274B]/90`}>
                  Founded to merge professional-grade performance with environmental responsibility, CALYCO is building the future of paints for India.
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                  {storyMilestones.map((item) => (
                    <li
                      key={item.text}
                      className="animate-on-scroll flex flex-col gap-3 rounded-2xl border border-black/5 bg-[var(--calyco-cream)]/75 px-4 py-5 text-left shadow-[0_18px_35px_-28px_rgba(13,15,28,0.45)]"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium text-[var(--calyco-ink)]/90">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="animate-on-scroll overflow-hidden rounded-[36px] border border-white/70 shadow-[0_45px_70px_-50px_rgba(15,18,33,0.65)]">
                <img
                  src="/Assets/about-us.webp"
                  alt="CALYCO team collaborating on colour development"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-20 animate-on-scroll rounded-[32px] border border-black/5 bg-white/95 p-8 shadow-[0_32px_65px_-50px_rgba(13,15,28,0.55)] md:p-10">
              <h3 className={`${getTypographyClasses('h3')} text-center text-[var(--calyco-ink)]`}>Our Core Values</h3>
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:gap-4">
                {valuePillars.map((value) => (
                  <span
                    key={value.text}
                    className="animate-on-scroll inline-flex items-center gap-2 rounded-full border border-black/8 bg-[var(--calyco-cream)]/80 px-5 py-2 text-sm font-semibold text-[var(--calyco-plum)] transition hover:border-[var(--calyco-gold)] hover:bg-[var(--calyco-gold)]/10"
                  >
                    <span className="text-base">{value.icon}</span>
                    {value.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Culture: editorial grid layered over subtle workplace imagery */}
        <section
          className="relative overflow-hidden py-20 md:py-24"
          style={{
            backgroundImage:
              "url(/Assets/u7336851251_the_design_of_a_modern_psychological_officesubdued__c333b72d-13cb-4c09-8ef5-00f2e7aff4c9.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/88 backdrop-blur-[2px]" />
          <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="animate-on-scroll text-center">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>Leadership & Culture</h2>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-3xl text-[#31274B]/85`}>
                A multidisciplinary leadership group with deep experience drives CALYCO's roadmap—powered by an expert network that keeps performance and people at the center.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
              {leadershipPillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="animate-on-scroll group relative flex h-full flex-col gap-5 overflow-hidden rounded-[28px] border border-black/6 bg-white/95 p-7 shadow-[0_26px_45px_-40px_rgba(15,18,33,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_65px_-40px_rgba(15,18,33,0.6)]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition duration-300 group-hover:opacity-[0.08]`}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.gradient} text-2xl text-white shadow-lg shadow-black/20`}
                    >
                      {pillar.icon}
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--calyco-gold)]">
                        {pillar.caption}
                      </span>
                      <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>{pillar.title}</h3>
                    </div>
                  </div>
                  <p className={`${getTypographyClasses('body')} relative text-[#31274B]/85`}>{pillar.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Excellence: atelier-inspired proof of craft */}
        <section className="bg-[#FBF7F0] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-10">
            <div className="animate-on-scroll grid gap-10 rounded-[44px] border border-black/5 bg-white/95 p-6 shadow-[0_40px_80px_-60px_rgba(15,18,33,0.55)] md:grid-cols-[1.05fr_1fr] md:p-12">
              <div className="relative flex min-h-[340px] items-end overflow-hidden rounded-[36px] md:min-h-[480px]">
                <img
                  src="/Assets/aekartdir_A_high-quality_ultra-wide_long_shot_photograph_taken__0d5534e1-a72e-4839-8b37-f99d91422e3c.webp"
                  alt="Inside CALYCO's automated manufacturing facility"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--calyco-ink)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--calyco-gold)]" />
                  Batch-to-bucket assurance
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-5">
                  <span className="inline-flex items-center rounded-full border border-black/10 bg-[var(--calyco-cream)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--calyco-ink)]/70">
                    Manufacturing excellence
                  </span>
                  <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                    Precision engineered, meticulously verified.
                  </h2>
                  <p className={`${getTypographyClasses('body')} text-[#31274B]/85`}>
                    From resin design through finishing gloss, each Calyco batch advances through calibrated production cells, HEPA-filtered tinting, and layered quality gates built for India's humidity, dust, and UV extremes.
                  </p>
                </div>
                <div className="mt-8 space-y-4">
                  {manufacturingHighlights.map((highlight) => (
                    <article
                      key={highlight.title}
                      className="group flex items-start gap-4 rounded-[28px] border border-black/6 bg-white px-5 py-5 shadow-[0_20px_35px_-30px_rgba(15,18,33,0.4)] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_32px_55px_-34px_rgba(15,18,33,0.45)]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-lg text-[var(--calyco-plum)]">
                        {highlight.icon}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)] group-hover:text-[var(--calyco-plum)]`}>
                            {highlight.title}
                          </h3>
                          <span className="rounded-full bg-[var(--calyco-gold)]/18 px-3 py-1 text-xs font-semibold text-[var(--calyco-ink)]">
                            {highlight.metric}
                          </span>
                        </div>
                        <p className={`${getTypographyClasses('body')} text-[#31274B]/75`}>{highlight.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EcoMax™ Technology: innovation layered like a brochure highlight */}
        <section className="bg-gradient-to-br from-[var(--calyco-cream)] via-white to-[#F2ECF9] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="animate-on-scroll text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calyco-gold)]/40 bg-[var(--calyco-gold)]/10 px-5 py-2 text-xs font-semibold text-[var(--calyco-plum)] md:text-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--calyco-gold)]" />
                Revolutionary Innovation
              </div>
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                EcoMax™ <span className="text-gradient">Technology</span>
              </h2>
              <div className="mx-auto mt-6 max-w-4xl space-y-5 text-[#31274B]/85">
                <p className={`${getTypographyClasses('body')} font-medium`}>
                  Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.
                </p>
                <p className={`${getTypographyClasses('body')}`}>
                  What we created is a formula that's better, stronger, and cleaner—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.
                </p>
              </div>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {ecoMaxFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="animate-on-scroll group relative flex h-full flex-col gap-5 overflow-hidden rounded-[28px] border border-black/6 bg-white/95 p-7 shadow-[0_26px_45px_-38px_rgba(15,18,33,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_65px_-40px_rgba(15,18,33,0.6)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--calyco-plum)]/8 to-[var(--calyco-gold)]/8 opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--calyco-plum)] to-[var(--calyco-gold)] text-2xl text-white shadow-lg shadow-black/20">
                      {feature.icon}
                    </div>
                    <span className="rounded-full bg-[var(--calyco-gold)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--calyco-plum)]">
                      {feature.stat}
                    </span>
                  </div>
                  <div className="relative space-y-3">
                    <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>{feature.title}</h3>
                    <p className={`${getTypographyClasses('body')} text-[#31274B]/85`}>{feature.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="animate-on-scroll mt-16 rounded-[32px] bg-gradient-to-r from-[var(--calyco-plum)] to-[var(--calyco-gold)] px-8 py-10 text-center text-white md:px-10 md:py-14">
              <h3 className={`${getTypographyClasses('h3')} text-white`}>Experience the EcoMax™ Difference</h3>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-2xl text-white/90`}>
                Discover how our revolutionary colorant technology delivers superior performance while protecting your family and the environment.
              </p>
              <button
                type="button"
                onClick={handleNavigate("/products")}
                className={getButtonClasses('accent')}
              >
                Explore EcoMax™ Products
              </button>
            </div>
          </div>
        </section>

        {/* Sustainability & Responsibility: layered cards over soft imagery */}
        <section
          className="relative overflow-hidden py-20 md:py-24"
          style={{
            backgroundImage:
              "url(/Assets/u1147136281_imagine_realistic_photo_taken_of_an_empty_horizonta_129fd89e-9956-4324-bb58-f5814ef8737c.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/93 backdrop-blur-sm" />
            <div className="relative mx-auto max-w-6xl px-4 md:px-6 lg:px-10">
              <div className="animate-on-scroll text-center">
              <h2 className={`${getTypographyClasses('h2')} text-white`}>Sustainability & Responsibility</h2>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-3xl text-white`}>
                Responsible chemistry and transparent reporting guide every decision-today and for the future.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {sustainabilityPoints.map((item) => (
                <div
                  key={item.title}
                  className="animate-on-scroll flex flex-col items-center gap-3 rounded-[28px] border border-black/6 bg-white/95 p-8 text-center shadow-[0_24px_45px_-40px_rgba(15,18,33,0.6)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg shadow-black/20">
                    {item.icon}
                  </span>
                  <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>{item.title}</h3>
                  <p className={`${getTypographyClasses('body')} text-[#31274B]/80`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Budget Calculator CTA */}
        <BudgetCalculatorCTA />

        {/* Why Calyco Paints */}
        <WhyCalycoShowcase />

        {/* Footer CTA: warm minimal close */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F1] via-[#F4EEE3] to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#d4af3733,transparent_70%)]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="animate-on-scroll flex flex-col items-center gap-6 rounded-[40px] border border-black/5 bg-white/85 px-8 py-12 text-center shadow-[0_35px_70px_-55px_rgba(15,18,33,0.55)] md:px-12">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>
                Ready to bring Calyco into your next project?
              </h2>
              <p className={`${getTypographyClasses('body')} max-w-3xl text-[#31274B]/85`}>
                Share specifications, request colour support, or plan large-format rollouts with our technical consultants and designer network.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleNavigate("/contact")}
                  className={getButtonClasses('accent')}
                >
                  Start a Conversation
                </button>
                <button
                  type="button"
                  onClick={handleNavigate("/colors")}
                  className={getButtonClasses('outline')}
                >
                  View Colour Library
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
