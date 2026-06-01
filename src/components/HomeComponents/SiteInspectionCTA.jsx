import { useCart } from '../../context/CartContext';

const SiteInspectionCTA = () => {
  const handleScrollToInquiry = () => {
    const element = document.getElementById('premium-inquiry');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full">
      <div
        className="relative rounded-3xl overflow-hidden px-6 py-8 md:px-10 md:py-10 shadow-2xl border border-[#998850]/20"
        style={{
          background: 'linear-gradient(135deg, #1A1D2B 0%, #0F1221 100%)'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#998850]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#432452]/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#998850]/10 flex items-center justify-center border border-[#998850]/20 flex-shrink-0">
              <svg className="w-8 h-8 text-[#998850]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Large project? <span className="text-[#998850] font-normal text-lg ml-2 tracking-wide uppercase">Get a Professional Quote</span>
              </h3>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                Send us your BOQ or floor plans — we’ll return material estimates and a delivered price. <span className="text-white font-semibold">No site visit required.</span>
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleScrollToInquiry}
            className="flex-shrink-0 bg-[#998850] text-[#0F1221] px-8 py-4 rounded-xl font-bold tracking-wider uppercase hover:bg-[#B3A060] transition-all transform hover:scale-105 shadow-[0_4px_20px_rgba(153,136,80,0.3)] flex items-center gap-3"
          >
            Send Project Details
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SiteInspectionCTA;
