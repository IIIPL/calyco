import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

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
  const observerRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Add CSS styles to document head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .animate-fadeInUp {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
      }
      .glass-effect {
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      .premium-shadow {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.05);
      }
      .premium-shadow-lg {
        box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1);
      }
      .text-gradient {
        background: linear-gradient(135deg, #4B007D 0%, #D4AF37 100%);
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
        animation: float 3s ease-in-out infinite;
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
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) =>
      observerRef.current?.observe(el)
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
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
        {/* 
          🎯 HERO SECTION - Fixed padding and mobile responsiveness
        */}
        <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-32 pb-12 md:min-h-[90vh] md:pt-32 lg:min-h-[95vh] lg:pt-32">
          <div className="absolute inset-0 z-0">
            <img
              src="/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.png"
              alt="Modern Indian home exterior finished with CALYCO paints"
              className="h-full w-full object-cover scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/35 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse float-animation"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse float-animation" style={{ animationDelay: "1s" }}></div>
          
          {/* 
            🎯 HERO CONTENT - Better mobile layout and fixed title
          */}
          <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 text-center px-4 md:px-6 lg:gap-8">
            {/* Brand Badge */}
            <span className="inline-flex justify-center items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm md:text-base font-medium text-white/90 glass-effect border border-white/20 mx-auto md:px-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="hidden sm:inline">Next-generation sustainable paint solutions for a cleaner future</span>
              <span className="sm:hidden">Sustainable paint solutions for India</span>
            </span>
            
            {/* 
              🎯 FIXED TITLE - Always 2 lines
            */}
            <h1 className="mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Professional-Grade Paint Systems
              <br />
              <span className="text-gradient">for India</span>
            </h1>
            
            {/* 
              🎯 RESPONSIVE DESCRIPTION
            */}
            <div className="max-w-2xl mx-auto space-y-2 md:space-y-3">
              <p className="text-base md:text-lg text-white/90 font-medium">
                Premium paints engineered for Indian homes, offices, and industries.
              </p>
              <p className="text-sm md:text-base text-white/80">
                CALYCO elevates how India paints with high-performance coatings, designer-curated palettes, and low-/zero-VOC innovations for beautiful, durable spaces.
              </p>
            </div>
            
            {/* 
              🎯 ULTRA COMPACT MOBILE BUTTONS - Much smaller on mobile
            */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 justify-center mt-4 md:mt-6 max-w-sm sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={handleNavigate("/products")}
                className="group rounded-lg sm:rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] px-4 py-2 sm:px-6 sm:py-3 md:px-8 text-xs sm:text-sm md:text-base font-semibold text-[#0F1221] premium-shadow-lg transition hover:scale-105 hover:-translate-y-1"
              >
                Explore Our Products
              </button>
              <button
                type="button"
                onClick={handleNavigate("/contact")}
                className="group rounded-lg sm:rounded-xl border-2 border-white/30 px-4 py-2 sm:px-6 sm:py-3 md:px-8 text-xs sm:text-sm md:text-base font-semibold text-white glass-effect transition hover:bg-white/10 hover:border-white/50"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>

        {/* 
          🎯 CONSISTENT SECTION SPACING
          All sections now use: py-16 md:py-20 lg:py-24
        */}

        {/* Our Story */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#F6F3EE] to-white">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Story image */}
              <div className="rounded-3xl overflow-hidden shadow-lg order-2 md:order-1">
                <img
                  src="/Assets/about-us.png"
                  alt="CALYCO team collaborating on colour development"
                  className="w-full h-full object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
              {/* Story text */}
              <div className="space-y-6 md:space-y-8 order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4B007D] mb-3">Our Story</h2>
                <p className="text-base md:text-lg text-[#31274B] font-medium">
                  Founded to merge professional-grade performance with environmental responsibility, CALYCO is building the future of paints for India.
                </p>
                <ul className="mt-4 md:mt-6 space-y-3 text-[#4B007D] font-semibold">
                  {storyMilestones.map((item) => (
                    <li key={item.text} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="text-lg md:text-xl mt-0.5">{item.icon}</span> 
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Values */}
            <div className="mt-16 md:mt-20">
              <h3 className="text-xl md:text-2xl font-semibold text-[#4B007D] mb-6 md:mb-8 text-center">Our Core Values</h3>
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {valuePillars.map((value) => (
                  <span
                    key={value.text}
                    className="group flex items-center gap-2 md:gap-3 rounded-full border-2 border-[#4B007D]/20 bg-gradient-to-r from-white to-[#FBF9F6] px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm font-semibold text-[#4B007D] premium-shadow transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:bg-gradient-to-r hover:from-[#D4AF37]/10 hover:to-[#4B007D]/10"
                  >
                    <span className="text-base md:text-lg transition-transform group-hover:scale-125">
                      {value.icon}
                    </span>
                    <span>{value.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Culture */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#4B007D]/5 to-[#D4AF37]/5">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="mb-10 md:mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#4B007D] mb-2">
                Leadership & Culture
              </h2>
              <p className="mx-auto max-w-4xl text-base md:text-lg text-[#31274B]/90 leading-relaxed">
                A multidisciplinary leadership group with deep experience drives CALYCO's roadmap—powered by an expert network that keeps performance and people at the center.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {leadershipPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl bg-white glass-effect p-6 md:p-8 premium-shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-3 flex flex-col h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`}></div>
                  <div className="relative space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.gradient} text-xl md:text-2xl text-white premium-shadow`}>
                        {pillar.icon}
                      </div>
                      <div>
                        <span className="text-xs md:text-sm font-medium uppercase tracking-wide text-[#D4AF37]">
                          {pillar.caption}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-[#4B007D]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-[#31274B]/90 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Excellence */}
        <section className="py-16 md:py-20 lg:py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Extra wide image */}
              <div className="rounded-3xl overflow-hidden min-h-[300px] md:min-h-[400px] max-h-[400px] md:max-h-[540px] aspect-[16/9] md:aspect-[16/7] flex items-center w-full">
                <img
                  src="/Assets/aekartdir_A_high-quality_ultra-wide_long_shot_photograph_taken__0d5534e1-a72e-4839-8b37-f99d91422e3c.png"
                  alt="Inside CALYCO's automated manufacturing facility"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Text content */}
              <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#4B007D] mb-2">
                  Manufacturing Excellence
                </h2>
                <p className="text-base md:text-lg text-[#31274B]/90 leading-relaxed">
                  Precision manufacturing and rigorous quality assurance turn our formulations into consistent, high-performing paint systems—batch after batch.
                </p>
                {/* Highlights */}
                <div className="space-y-4 md:space-y-6">
                  {manufacturingHighlights.map((highlight) => (
                    <div
                      key={highlight.title}
                      className="flex items-start gap-3 md:gap-4 rounded-3xl border-2 border-[#4B007D]/10 bg-gradient-to-r from-white to-[#FBF9F6]/50 p-4 md:p-6 premium-shadow"
                    >
                      <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4B007D] to-[#D4AF37] text-lg md:text-xl text-white premium-shadow">
                        {highlight.icon}
                      </div>
                      <div className="flex-1 space-y-1 md:space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-bold text-[#4B007D]">{highlight.title}</h3>
                          <span className="rounded-full bg-[#D4AF37]/20 px-2 py-1 md:px-3 text-xs font-bold text-[#4B007D]">
                            {highlight.metric}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm text-[#31274B]/90 leading-relaxed">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EcoMax™ Technology */}
        <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#4B007D]/5 via-white to-[#D4AF37]/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4B007D]/10 to-[#D4AF37]/10 px-6 py-2 text-sm font-medium text-[#4B007D] mb-6">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
                Revolutionary Innovation
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4B007D] mb-4">
                EcoMax™ <span className="text-gradient">Technology</span>
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                <p className="text-lg md:text-xl text-[#31274B] font-medium leading-relaxed">
                  Most traditional paint colorants require harsh chemicals that can weaken paint performance and indoor air quality. We realized that by developing our own eco-friendly colorants, designed specifically for our sustainable formulations, we could eliminate unnecessary chemicals that compromise both durability and health.
                </p>
                <p className="text-base md:text-lg text-[#31274B]/80 leading-relaxed">
                  What we created is a formula that's better, stronger, and cleaner—delivering exceptional color vibrancy while maintaining our commitment to zero-VOC, low-odor performance.
                </p>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 md:gap-8 md:grid-cols-3 mb-12">
              {ecoMaxFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 premium-shadow-lg transition-all duration-500 hover:scale-105 hover:-translate-y-3"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4B007D]/5 to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4B007D] to-[#D4AF37] text-2xl text-white premium-shadow">
                        {feature.icon}
                      </div>
                      <span className="rounded-full bg-[#D4AF37]/20 px-4 py-1 text-xs font-bold text-[#4B007D] uppercase tracking-wide">
                        {feature.stat}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#4B007D]">{feature.title}</h3>
                    <p className="text-sm md:text-base text-[#31274B]/90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center bg-gradient-to-r from-[#4B007D] to-[#D4AF37] rounded-3xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Experience the EcoMax™ Difference
              </h3>
              <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Discover how our revolutionary colorant technology delivers superior performance while protecting your family and the environment.
              </p>
              <button
                type="button"
                onClick={handleNavigate("/products")}
                className="group rounded-xl bg-white px-6 py-3 md:px-8 text-sm md:text-base font-semibold text-[#4B007D] premium-shadow-lg transition hover:scale-105 hover:-translate-y-1"
              >
                Explore EcoMax™ Products
              </button>
            </div>
          </div>
        </section>

        {/* Sustainability */}
        <section className="py-16 md:py-20 lg:py-24 bg-[#F6F3EE]">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4B007D] mb-2 text-center">Sustainability & Responsibility</h2>
            <p className="text-base md:text-lg text-[#31274B]/90 text-center mb-8 md:mb-10">
              Responsible chemistry and transparent reporting guide every decision—today and for the future.
            </p>
            <div className="grid gap-6 md:gap-8 md:grid-cols-3">
              {sustainabilityPoints.map((item) => (
                <div key={item.title} className="flex flex-col items-center rounded-2xl bg-white p-6 md:p-8 shadow-md border">
                  <span className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-teal-600 text-xl md:text-2xl text-white mb-3">
                    {item.icon}
                  </span>
                  <div className="font-semibold text-[#4B007D] mb-2 text-center text-sm md:text-base">{item.title}</div>
                  <div className="text-xs md:text-sm text-[#31274B] text-center">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-[#4B007D] via-[#5B1A8B] to-[#2E0053] overflow-hidden">
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 md:gap-8 px-4 text-center md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Ready to paint a better future?
            </h2>
            <p className="max-w-3xl text-sm md:text-base text-white/90 leading-relaxed">
              Reach our team for specifications, tenders, and bespoke projects—or explore designer-curated colour palettes tailored for Indian spaces.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <button
                type="button"
                onClick={handleNavigate("/contact")}
                className="group rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 text-sm md:text-base font-semibold text-[#0F1221] premium-shadow-lg transition hover:scale-105 hover:-translate-y-1"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={handleNavigate("/colors")}
                className="group rounded-xl border-2 border-white/30 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 text-sm md:text-base font-semibold text-white glass-effect transition hover:bg-white/10 hover:border-white/50"
              >
                Explore Colours
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
