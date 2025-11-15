import { Link } from 'react-router-dom';

const SiteInspectionCTA = () => {
  return (
    <section
      className="w-full rounded-2xl px-4 sm:px-5 md:px-6 py-6 text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      style={{
        background: 'linear-gradient(135deg, #1A0B21 0%, #432553 55%, #5B2F7A 100%)'
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 text-center md:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 flex-1">
          <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-lg md:text-xl font-semibold leading-tight text-white/95">
            Book a site visit for ₹499 and get precise estimates for your painting project.
          </p>
        </div>
        <Link
          to="/contact"
          className="w-full md:w-auto bg-white text-[#432553] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center"
        >
          Book Site Visit
        </Link>
      </div>
    </section>
  );
};

export default SiteInspectionCTA;
