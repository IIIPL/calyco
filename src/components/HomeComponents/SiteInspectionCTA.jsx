import { Link } from 'react-router-dom';

const SiteInspectionCTA = () => {
  return (
    <section className="w-full">
      <div
        className="relative rounded-2xl overflow-hidden border border-white/8"
        style={{ background: 'linear-gradient(135deg, #1A1D2B 0%, #0F1221 100%)' }}
      >
        {/* Ambient orbs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0C85A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#493657]/15 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        {/* ── Desktop layout ── */}
        <div className="relative z-10 hidden sm:flex flex-row items-center justify-between gap-8 px-10 py-10">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/8 flex items-center justify-center border border-white/10 flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F0C85A]/70">Get a Quote</span>
              <div className="mt-1.5 mb-3 h-[1px] w-16 bg-white/10" />
              <h3 className="text-2xl font-light text-white leading-[1.15] tracking-[-0.01em] mb-3">
                Get a Fixed Painting Quote.
              </h3>
              <p className="text-white/45 text-sm leading-[1.75] font-light max-w-lg">
                Tell us your location, property type, and painting requirement. Calyco will inspect, measure, and share a clear quote before work starts.{' '}
                <span className="text-white/65">No hidden charges.</span>
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2.5 whitespace-nowrap bg-[#F0C85A] text-[#0F1221] px-7 py-3.5 rounded-full font-medium text-sm tracking-[0.03em] shadow-[0_4px_18px_rgba(240,200,90,0.3)] hover:bg-white transition-all duration-200"
          >
            Start My Quote
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* ── Mobile layout ── */}
        <div className="relative z-10 sm:hidden px-5 pt-6 pb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center border border-white/10 flex-shrink-0">
              <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F0C85A]/70">Get a Quote</span>
          </div>

          <div className="mb-2 h-[1px] w-12 bg-white/10" />
          <h3 className="text-xl font-light text-white leading-[1.15] tracking-[-0.01em] mb-3">
            Get a Fixed Painting Quote.
          </h3>
          <p className="text-white/45 text-sm leading-[1.75] font-light mb-5">
            Tell us your location, property type, and painting requirement. Calyco will inspect, measure, and share a clear quote before work starts.{' '}
            <span className="text-white/65">No hidden charges.</span>
          </p>

          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 w-full bg-[#F0C85A] text-[#0F1221] py-3.5 rounded-full font-medium text-sm tracking-[0.03em] shadow-[0_4px_18px_rgba(240,200,90,0.3)] active:scale-95 transition-all duration-200"
          >
            Start My Quote
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SiteInspectionCTA;
