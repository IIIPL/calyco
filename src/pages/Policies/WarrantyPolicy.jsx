import React, { useEffect, useRef } from "react";
// FIXED: Added an extra '../' to go up two levels to find the components folder
import SEO from "../../components/SEO"; 
// FIXED: Added an extra '../' to find the data folder
import { getTypographyClasses, getButtonClasses } from "../../data/admin/typography";

const documentLinks = [
  // Wall paints grouped like the menu
  { name: "Interior Wall Paints", desc: "Premium & Luxury Interior Emulsion, Acrylic Washable Distemper.", href: "/Assets/docs/warranty_Interior-Wall-Paints.html", icon: "🎨" },
  { name: "Exterior Wall Paints", desc: "Premium & Luxury Exterior Emulsion, All Surface Coating.", href: "/Assets/docs/warranty_Exterior-Wall-Paints.html", icon: "🏡" },
  { name: "Wood & Metal (Enamels/Coatings)", desc: "Dura-Shield Enamel, PU Wood Coating.", href: "/Assets/docs/warranty_Wood-Metal.html", icon: "🪵" },
  { name: "Primers & Sealers", desc: "Interior/Exterior primers, solvent, universal, and wall putty.", href: "/Assets/docs/warranty_Primers-Sealers.html", icon: "🛡️" },
  { name: "Waterproofing", desc: "Waterproofing Sealer, Damp Guard Primer.", href: "/Assets/docs/warranty_Waterproofing.html", icon: "💧" },
  { name: "Texture Paints", desc: "Calyco Texture Paint.", href: "/Assets/docs/warranty_calyco-texture-paint.html", icon: "🧩" },
];

export default function WarrantyPolicy() {
  const observerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // --- STYLES INJECTION (From About Page) ---
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      :root {
        --calyco-ink: #0F1221;
        --calyco-plum: #4B007D;
        --calyco-gold: #D4AF37;
        --calyco-cream: #F6F3EE;
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
      .float-animation {
        animation: float 3.5s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(styleSheet);

    // --- INTERSECTION OBSERVER ---
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
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  // Form Input Styles (Light Theme)
  const inputClasses = "w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-base text-[var(--calyco-ink)] placeholder-gray-400 shadow-sm focus:border-[var(--calyco-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--calyco-gold)]/20 transition-all";
  const labelClasses = "mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[var(--calyco-plum)]";

  return (
    <div className="min-h-screen bg-[#F6F3EE] text-[#0F1221] font-poppins overflow-x-hidden">
      <SEO
        title="Warranty Policy | CALYCO Paints"
        description="Explore Calyco's warranty coverage, make a claim, and download policy documents."
      />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/Assets/InteriorInspiratoin/living-room.webp"
              alt="Modern interior with CALYCO paint"
              className="h-full w-full scale-105 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Floating Orbs (From About Page) */}
          <div className="absolute top-24 left-10 h-40 w-40 rounded-full bg-[var(--calyco-gold)]/20 blur-3xl float-animation" />
          <div className="absolute bottom-24 right-14 h-44 w-44 rounded-full bg-white/10 blur-3xl float-animation" style={{ animationDelay: "1.25s" }} />

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 text-center">
            <span className="glass-effect animate-on-scroll inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90 md:text-xs">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--calyco-gold)]" />
              Calyco Warranty Care
            </span>
            <h1 className={`${getTypographyClasses('h1')} animate-on-scroll text-white mt-6`}>
              Warranty Policy
            </h1>
            <p className={`${getTypographyClasses('bodyLarge')} animate-on-scroll mx-auto max-w-2xl text-white/90 mt-4`}>
              We design coatings that last, so your spaces glow longer. Explore coverage, claims, and documentation.
            </p>
          </div>
        </section>

        {/* --- COVERAGE SECTION (Replaces 'Plum') --- */}
        <section className="bg-[var(--calyco-cream)] py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
            <div className="animate-on-scroll text-center mb-16">
              <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)]`}>Protected Coverage</h2>
              <p className={`${getTypographyClasses('body')} mx-auto max-w-3xl text-[#31274B]/80 mt-4`}>
                Manufacturing defects; what is included and excluded.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="animate-on-scroll group relative flex flex-col gap-5 overflow-hidden rounded-[32px] border border-black/5 bg-white/90 p-8 shadow-[0_28px_60px_-45px_rgba(13,15,28,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_65px_-40px_rgba(15,18,33,0.35)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-3xl shadow-sm">
                  🎨
                </div>
                <div>
                  <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>Manufacturing Defects</h3>
                  <p className={`${getTypographyClasses('body')} mt-3 text-[#31274B]/80`}>
                    Covers defects arising from manufacturing processes that affect performance or appearance under normal use.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="animate-on-scroll group relative flex flex-col gap-5 overflow-hidden rounded-[32px] border border-black/5 bg-white/90 p-8 shadow-[0_28px_60px_-45px_rgba(13,15,28,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_65px_-40px_rgba(15,18,33,0.35)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-3xl shadow-sm">
                  🛡️
                </div>
                <div>
                  <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>What is Included</h3>
                  <p className={`${getTypographyClasses('body')} mt-3 text-[#31274B]/80`}>
                    Peeling, flaking, blistering, or premature fading when applied as per CALYCO system guidelines.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="animate-on-scroll group relative flex flex-col gap-5 overflow-hidden rounded-[32px] border border-black/5 bg-white/90 p-8 shadow-[0_28px_60px_-45px_rgba(13,15,28,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_45px_65px_-40px_rgba(15,18,33,0.35)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calyco-cream)] text-3xl shadow-sm">
                  ⚠️
                </div>
                <div>
                  <h3 className={`${getTypographyClasses('h4')} text-[var(--calyco-ink)]`}>What is Excluded</h3>
                  <p className={`${getTypographyClasses('body')} mt-3 text-[#31274B]/80`}>
                    Surface movement, water ingress, structural cracks, contamination, mishandling, or non-recommended usage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- DOCUMENTS SECTION (Replaces 'Canvas') --- */}
        <section className="bg-white py-20 md:py-24 relative overflow-hidden">
           {/* Subtle background grain or pattern could go here */}
           <div className="absolute inset-0 bg-[radial-gradient(#d4af3711_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />
           
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10 relative z-10">
            <div className="animate-on-scroll mb-12">
               <span className="inline-flex items-center rounded-full border border-black/10 bg-[var(--calyco-cream)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--calyco-ink)]/70">
                  Download Centre
               </span>
               <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)] mt-4`}>Warranty Documents</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {documentLinks.map((doc) => (
                <a
                  key={doc.name}
                  href={doc.href}
                  download
                  className="animate-on-scroll group flex items-start gap-4 rounded-[28px] border border-black/6 bg-[var(--calyco-cream)]/50 px-6 py-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-20px_rgba(15,18,33,0.2)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {doc.icon}
                  </div>
                  <div>
                    <h3 className={`${getTypographyClasses('h4')} text-base text-[var(--calyco-ink)] group-hover:text-[var(--calyco-plum)]`}>
                      {doc.name}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#31274B]/70">{doc.desc}</p>
                    <span className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-[var(--calyco-gold)] group-hover:underline">
                      Download File →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- CLAIMS SECTION (Replaces 'Lilac') --- */}
        <section className="bg-[var(--calyco-cream)] py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-10">
            <div className="animate-on-scroll rounded-[40px] bg-white border border-black/5 p-8 md:p-12 shadow-[0_32px_65px_-50px_rgba(13,15,28,0.35)]">
              <div className="text-center mb-10">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--calyco-gold)]">
                  Support Journey
                </span>
                <h2 className={`${getTypographyClasses('h2')} text-[var(--calyco-ink)] mt-2`}>Claims Process</h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex gap-5">
                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--calyco-plum)] text-white text-xl shadow-lg">1</div>
                   <div>
                      <h4 className="text-lg font-bold text-[var(--calyco-ink)]">Inspection & Documentation</h4>
                      <p className="mt-2 text-sm leading-6 text-[#31274B]/80">
                        Share order details, batch numbers, photographs or videos, and a brief description. Our technical team may inspect the site to validate conditions.
                      </p>
                   </div>
                </div>
                <div className="flex gap-5">
                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--calyco-gold)] text-white text-xl shadow-lg">2</div>
                   <div>
                      <h4 className="text-lg font-bold text-[var(--calyco-ink)]">Remedy & Resolution</h4>
                      <p className="mt-2 text-sm leading-6 text-[#31274B]/80">
                        Upon validation, CALYCO may repair, replace, or offer store credit for the affected product as appropriate to keep your project on schedule.
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONTACT FORM SECTION (Styled for Light Theme) --- */}
        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="absolute inset-0 bg-[#0F1221]" /> {/* Dark background for contrast at footer */}
          <div className="absolute inset-0 bg-[url('/Assets/canal.health.hacks_Realistic_photo_of_a_modern_house_in_dark_gr_9200c95a-bf7d-42e8-b335-37b3695167c4.webp')] opacity-20 bg-cover bg-center mix-blend-overlay" />
          
          <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:items-start">
            {/* Left Text */}
            <div className="w-full md:w-5/12 pt-8">
              <span className="inline-flex items-center rounded-full bg-[var(--calyco-gold)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0F1221]">
                Talk To A Specialist
              </span>
              <h2 className="mt-6 text-3xl font-black uppercase tracking-tight text-white md:text-4xl leading-tight">
                Questions? <br/>Let’s Connect
              </h2>
              <p className="mt-6 text-base leading-7 text-white/80">
                Fill this quick form and one of our coating consultants will reach out with the right system, shade, and warranty details for your project.
              </p>
            </div>

            {/* Form Container - Light Card on Dark Background */}
            <form className="animate-on-scroll w-full rounded-[32px] bg-white p-6 shadow-[0_24px_70px_-32px_rgba(0,0,0,0.5)] md:w-7/12 md:p-10" noValidate>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className={labelClasses} htmlFor="warranty-topic">
                    How can we help you?
                  </label>
                  <select
                    id="warranty-topic"
                    className={`${inputClasses} appearance-none cursor-pointer`}
                    defaultValue=""
                  >
                    <option value="" disabled hidden>Select an option</option>
                    <option value="product-support">Product support</option>
                    <option value="warranty-claim">Warranty claim</option>
                    <option value="technical-advice">Technical advice</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses} htmlFor="warranty-name">Name</label>
                  <input id="warranty-name" type="text" autoComplete="name" placeholder="Full name" className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses} htmlFor="warranty-email">Email ID</label>
                  <input id="warranty-email" type="email" autoComplete="email" placeholder="you@company.com" className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses} htmlFor="warranty-phone">Phone Number</label>
                  <input id="warranty-phone" type="tel" autoComplete="tel" placeholder="+91 90000 00000" className={inputClasses} />
                </div>

                <div>
                  <label className={labelClasses} htmlFor="warranty-pincode">Pincode</label>
                  <input id="warranty-pincode" type="text" inputMode="numeric" autoComplete="postal-code" placeholder="Enter pincode" className={inputClasses} />
                </div>

                <div className="mt-2 flex items-start gap-3 md:col-span-2">
                  <input
                    id="warranty-consent"
                    type="checkbox"
                    className="mt-1 h-5 w-5 cursor-pointer rounded border-gray-300 bg-gray-100 text-[var(--calyco-gold)] focus:ring-[var(--calyco-gold)]"
                  />
                  <label htmlFor="warranty-consent" className="text-xs leading-5 text-gray-500">
                    I have read and agree to the <a href="#" className="text-[var(--calyco-plum)] underline">terms &amp; conditions</a> and <a href="#" className="text-[var(--calyco-plum)] underline">privacy policy</a>.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-full bg-[var(--calyco-ink)] py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[var(--calyco-plum)] hover:shadow-lg"
              >
                Submit Request
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

