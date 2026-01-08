import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BudgetCalculatorCTA = () => {
  return (
    <section className="relative w-full bg-gradient-to-r from-white via-[#F5F0FB] to-[#F5F0FB] py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-16 w-48 h-48 bg-[#432452]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-24 w-56 h-56 bg-[#998850]/20 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,500px)] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl sm:text-4xl md:text-[46px] font-bold leading-tight text-[#0F1221]">
              <span className="text-[#998850]">Never Overpay</span> for Paint Again
            </h3>

            <p className="text-base sm:text-lg text-[#0F1221]/75 leading-relaxed max-w-xl">
              Calculate exactly what you need with our intelligent budget planner. No surprises—just precise estimates tailored to your space.
            </p>

            <Link
              to="/budget-calculator"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#998850] text-white rounded-full font-semibold hover:bg-[#856f34] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Calculate Budget
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src="/Assets/Texture Images/calyco-family.webp"
              alt="Family happily planning paint budget"
              className="w-full max-w-sm sm:max-w-md lg:max-w-[520px] object-contain drop-shadow-2xl rounded-2xl"
              width="637"
              height="358"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculatorCTA;
