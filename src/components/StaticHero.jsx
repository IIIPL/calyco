import { Link } from 'react-router-dom';
import { getTypographyClasses, getButtonClasses } from '../data/admin/typography';

const StaticHero = () => {
  return (
    <section className="relative w-full h-[80vh] sm:h-[70vh] md:h-[85vh] lg:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Assets/home-hero/full-page.png"
          alt="Beautiful transformed home interior"
          className="w-full h-full object-cover object-[15%_center] md:object-[65%_center] scale-[1.25] md:scale-110"
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/30 md:from-black/55 md:via-black/35 md:to-black/20" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center pt-16 sm:pt-0">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-6 md:px-12 lg:px-16">
          <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <div className="inline-block mb-2 sm:mb-3 md:mb-4">
              <span className="inline-flex items-center px-4 py-2 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                PREMIUM PAINTS
              </span>
            </div>

            {/* Main Title */}
            <h1 className={`${getTypographyClasses('h1')} text-white`}>
              Colors That Transform Homes Into Havens
            </h1>

            {/* Subtitle */}
            <p className={`${getTypographyClasses('bodyLarge')} text-white/90 max-w-2xl`}>
              Premium finishes that look better, last longer, <br className="hidden md:block" />
              and don't break the budget.
            </p>

            {/* CTA Buttons */}
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
