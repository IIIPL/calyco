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
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] gap-12 lg:gap-16 items-center">
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
              className="inline-flex items-center justify-center px-6 py-3.5 sm:px-6 sm:py-3 bg-white text-[#0F1221] rounded-lg font-semibold text-base sm:text-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Calculate Budget
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
              src="/Assets/budget.png"
              alt="Family happily planning paint budget"
              className="w-full max-w-sm sm:max-w-md lg:max-w-[460px] object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculatorCTA;
