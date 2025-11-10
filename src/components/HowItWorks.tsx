import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F6F3EE] py-12 md:py-14 lg:py-16">
      {/* 2 Cards with Image Overlays */}
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
