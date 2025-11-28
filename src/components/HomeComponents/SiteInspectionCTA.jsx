import { useCart } from '../../context/CartContext';

const SiteInspectionCTA = () => {
  const { addToCart, goToCheckout } = useCart();

  const handleBookSiteVisit = async () => {
    try {
      // Create SVG icon as data URL for site visit
      const siteVisitIcon = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="#5E3A98"/>
          <path d="M30 20h40v10H30z" fill="white"/>
          <rect x="25" y="30" width="50" height="50" rx="4" fill="white"/>
          <path d="M35 45h10v10H35zm15 0h10v10H50zm15 0h10v10H65z" fill="#5E3A98"/>
          <circle cx="50" cy="50" r="8" fill="#F0C85A"/>
          <path d="M50 45v10m-5-5h10" stroke="white" stroke-width="2"/>
        </svg>
      `)}`;

      const siteVisitProduct = {
        id: 'site-visit-home',
        name: 'Site Visit Consultation',
        display_name: 'Professional Site Visit Consultation',
        price: 499,
        image: siteVisitIcon,
        requiresShipping: false,
        productType: 'service',
      };

      await addToCart(siteVisitProduct, 'Service', 'One-time', 1, 499, {
        serviceType: 'Site Visit Consultation',
        source: 'home-page',
      });

      // Wait longer for cart state to fully update before navigating (500ms to ensure React state settles)
      await new Promise(resolve => setTimeout(resolve, 500));
      await goToCheckout();
    } catch (error) {
      console.error('Error booking site visit:', error);
      alert('There was an error booking the site visit. Please try again or contact us directly.');
    }
  };

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
        <button
          onClick={handleBookSiteVisit}
          className="w-full md:w-auto bg-white text-[#432553] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center justify-center"
        >
          Book Site Visit
        </button>
      </div>
    </section>
  );
};

export default SiteInspectionCTA;
