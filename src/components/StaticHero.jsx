import { Link } from 'react-router-dom';
import { getTypographyClasses, getButtonClasses } from '../data/admin/typography';

const StaticHero = () => {
  return (
    // FIXED: Changed mobile min-height from [70vh] to [90vh] to make room for buttons
    <section className="relative w-full min-h-[90vh] md:min-h-[85vh] overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Assets/home-hero/full-page.webp"
          alt="Beautiful transformed home interior"
          className="w-full h-full object-cover object-[60%_center] scale-105 md:scale-110"
        />
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/20" />

      {/* Content Container */}
      {/* FIXED: Reduced top padding (pt-20) slightly so text starts higher up */}
      <div className="absolute inset-0 flex items-start md:items-center justify-center pb-10 pt-20 sm:pt-32 md:p-0">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-16">
          <div className="text-white max-w-xl md:max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 flex flex-col justify-center">
            
            <div className="inline-block mb-1 sm:mb-2">
              <span className="inline-flex items-center px-4 py-2 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-xs sm:text-xs font-semibold uppercase tracking-wider shadow-lg">
                PREMIUM PAINTS
              </span>
            </div>

            <h1 className={`${getTypographyClasses('h1')} text-white text-4xl sm:text-5xl md:text-[56px] leading-tight`}>
              Colors That Transform Homes Into Havens
            </h1>

            <p className={`${getTypographyClasses('bodyLarge')} text-white/90 max-w-2xl text-base sm:text-lg`}>
              Premium finishes that look better, last longer, and don't break the budget.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Link
                to="/colors"
                className={`${getButtonClasses('primary')} w-full sm:w-auto text-center whitespace-nowrap`}
              >
                Discover Your Perfect Shade
              </Link>
              <Link
                to="/products"
                className={`${getButtonClasses('secondary')} w-full sm:w-auto text-center whitespace-nowrap`}
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