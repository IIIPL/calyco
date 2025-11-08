import { Link } from "react-router-dom";

const colorSwatches: { hex: string; label: string }[] = [
  { hex: "#4B007D", label: "Purple" },
  { hex: "#D4AF37", label: "Gold" },
  { hex: "#805AD5", label: "Lavender" },
  { hex: "#68D391", label: "Sage" },
  { hex: "#C53030", label: "Barn Red" },
];

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F6F3EE] py-12 md:py-14 lg:py-16">
      {/* Top Section - Image Left, Content Right */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16 mb-12 md:mb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Image */}
          <div className="order-1 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/Assets/Texture Images/GPT_Image_1_Elegant_bedroom_interior_showcasing_a_textured_fea_0.png"
                alt="Textured wall finish bedroom"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-2 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1221] mb-4 leading-tight">
              Access a Range of <span className="text-[#998850]">Eco-Premium Paints</span> & Coatings
            </h2>

            <p className="text-base md:text-lg text-[#0F1221]/70 leading-relaxed mb-6">
              Low-VOC, high performance chemistry engineered for Indian climates. Choose palettes curated by designers and tested by professionals.
            </p>

            {/* Color Swatches */}
            <div className="flex items-center gap-3 mb-8">
              {colorSwatches.map((swatch) => (
                <div
                  key={swatch.hex}
                  className="transition-transform hover:scale-110 duration-300"
                  style={{
                    height: '56px',
                    width: '56px',
                    backgroundColor: swatch.hex,
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}
                  aria-label={swatch.label}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4B007D] px-6 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-[#3d0066] hover:shadow-xl"
              >
                Explore Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/visualizer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#4B007D] px-6 py-3 text-base font-semibold text-[#4B007D] transition hover:bg-[#4B007D] hover:text-white"
              >
                Visualise
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - 2 Cards with Image Overlays */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 - Moving in the Right Direction */}
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col">
            <div className="relative w-full h-52 sm:h-64 overflow-hidden">
              <img
                src="/Assets/Texture Images/left.png"
                alt="Textured wall finish"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-3 px-6 sm:px-8 py-6">
              <h3 className="text-2xl sm:text-3xl font-semibold leading-snug text-[#4B007D]">
                Moving in the<br />
                <span className="text-[#998850]">Right Direction</span>
              </h3>
              <p className="text-sm sm:text-base text-[#0F1221]/70">
                Personalised plans that keep your project moving with confidence.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-[#998850] px-5 py-2 text-sm font-semibold text-[#4B007D] transition hover:bg-[#856f34] w-fit"
              >
                Explore Products
              </Link>
            </div>
          </div>

          {/* Card 2 - Paint Smarter, Last Longer */}
          <div className="rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col">
            <div className="relative w-full h-52 sm:h-64 overflow-hidden">
              <img
                src="/Assets/Texture Images/right.png"
                alt="Durable paint finish"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 pointer-events-none" />
            </div>
            <div className="flex flex-col gap-3 px-6 sm:px-8 py-6">
              <h3 className="text-2xl sm:text-3xl font-semibold leading-snug text-[#4B007D]">
                Paint Smarter,<br />
                <span className="text-[#998850]">Last Longer</span>
              </h3>
              <p className="text-sm sm:text-base text-[#0F1221]/70">
                Premium, durable paints engineered to protect every surface.
              </p>
              <Link
                to="/colors"
                className="inline-flex items-center justify-center rounded-full bg-[#998850] px-5 py-2 text-sm font-semibold text-[#4B007D] transition hover:bg-[#856f34] w-fit"
              >
                Explore Colors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
