import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SiteInspectionCTA = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-[#3D2C56] via-[#4A3566] to-[#3D2C56] py-8 md:py-10 lg:py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-20 w-64 h-64 bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-purple-600/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Icon */}
            <div className="hidden md:flex flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center">
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Content */}
            <div className="text-white text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                Site Inspection in Delhi NCR
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 max-w-2xl">
                Get accurate measurements and professional recommendations from our experts. Book a site visit for just ₹499 and get precise estimates for your painting project.
              </p>

              {/* Features */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Professional Assessment</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Detailed Quotation</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Color Consultation</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-base sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book Site Visit
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SiteInspectionCTA;
