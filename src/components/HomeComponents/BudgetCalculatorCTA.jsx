import { Link } from 'react-router-dom';

const BudgetCalculatorCTA = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative min-h-[75vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8E4F3] via-[#F0ECF5] to-[#EDE9F4]" />

        {/* Family Image on Right */}
        <div className="absolute right-0 bottom-0 w-full lg:w-1/2 h-full">
          <img
            src="/Assets/family.png"
            alt="Family holding house model"
            className="absolute right-0 bottom-0 h-full w-auto object-contain object-bottom"
          />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-20">
            <div className="max-w-xl lg:max-w-2xl">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-[#998850]">
                  BUDGET CONFIDENCE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1221] mb-6 leading-tight">
                Never <span className="text-[#432452]">Overpay</span> for Paint Again
              </h2>

              <p className="text-base md:text-lg text-[#0F1221]/70 mb-8 leading-relaxed max-w-xl">
                Calculate exactly what you need with our intelligent budget planner. No surprises, just precise estimates tailored to your space.
              </p>

              <Link
                to="/budget-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0F1221] shadow-xl transition hover:shadow-2xl hover:-translate-y-1"
              >
                Calculate Budget
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BudgetCalculatorCTA;
