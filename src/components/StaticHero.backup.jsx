import { Link } from 'react-router-dom';

const StaticHero = () => {
  return (
    <section className="relative w-full h-[75vh] sm:h-[65vh] md:h-[70vh] lg:h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Assets/home-hero/full-page.png"
          alt="Beautiful transformed home interior"
          className="w-full h-full object-cover object-[65%_center] scale-110"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/35 to-black/20" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-16 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 md:px-12 lg:px-16">
          <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <div className="inline-block mb-2 sm:mb-3 md:mb-4">
              <span className="inline-flex items-center px-4 py-2 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                TRUSTED NATIONWIDE
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-3xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold mb-2 sm:mb-3 md:mb-4 leading-[1.25] sm:leading-[1.25] md:leading-[1.25] text-white tracking-normal"
              style={{ letterSpacing: '0.01em' }}
            >
              Colors That Transform Homes Into Havens
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-base md:text-lg mb-4 sm:mb-5 md:mb-6 text-white/90 font-normal leading-[1.55] sm:leading-[1.55] md:leading-[1.6] max-w-2xl">
              India's most trusted paint brand. Premium quality, affordable pricing, and a finish that lasts a decade.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/colors"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-base sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Discover Your Perfect Shade
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-transparent text-white border-2 border-white/50 rounded-lg font-semibold text-base sm:text-sm hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticHero;
