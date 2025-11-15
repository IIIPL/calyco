import { Link } from 'react-router-dom';
import { getTypographyClasses, getButtonClasses } from '../data/admin/typography';

const StaticHero = () => {
  return (
    <section className="relative w-full h-[80vh] sm:h-[70vh] md:h-[85vh] lg:h-[85vh] overflow-hidden">
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <img
          src="/Assets/home-hero/full-page.webp"
          alt="Beautiful transformed home interior"
          className="w-full h-full object-cover object-[65%_center] scale-110"
        />
      </div>

      {/* Background Image - Mobile (with text baked in) */}
      <div className="absolute inset-0 md:hidden bg-[#2d1f4a]">
        <img
          src="/Assets/home-hero/home-page-hero-updated.webp"
          alt="Colors That Transform Homes Into Havens"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Dark overlay for readability - Desktop only */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-br from-black/55 via-black/35 to-black/20" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-end md:items-center pb-8 md:pb-0 pt-16 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 md:px-12 lg:px-16">
          <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* Badge - Hidden on mobile */}
            <div className="hidden md:inline-block mb-2 sm:mb-3 md:mb-4">
              <span className="inline-flex items-center px-4 py-2 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                PREMIUM PAINTS
              </span>
            </div>

            {/* Main Title - Hidden on mobile */}
            <h1 className={`${getTypographyClasses('h1')} text-white hidden md:block`}>
              Colors That Transform Homes Into Havens
            </h1>

            {/* Subtitle - Hidden on mobile */}
            <p className={`${getTypographyClasses('bodyLarge')} text-white/90 max-w-2xl hidden md:block`}>
              Premium finishes that look better, last longer, <br className="hidden md:block" />
              and don't break the budget.
            </p>

            {/* CTA Buttons - Visible on all devices */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/colors"
                className={getButtonClasses('primary')}
              >
                Discover Your Perfect Shade
              </Link>
              <Link
                to="/products"
                className={getButtonClasses('secondary')}
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
