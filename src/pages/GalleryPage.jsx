import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import SEO from '../components/SEO';
import ProjectGallerySection from '../components/ProjectGallerySection';
import { BRAND_NAME, WA_SITE_VISIT } from '../data/positioning';
import contactData from '../data/admin/contact.json';

const GalleryPage = () => {
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(WA_SITE_VISIT)}`;

  return (
    <main className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title="Project Gallery | Real Homes, Real Transformations | Calyco"
        description="See Calyco's completed painting, waterproofing and wall design projects. Before and after photos with city, area, time and budget details."
        url="https://calycopaints.com/gallery"
      />

      {/* Hero */}
      <section className="bg-[#0F1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.95),rgba(26,11,33,0.98))]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F0C85A]/8 blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F0C85A]/70 mb-3">{BRAND_NAME}</p>
          <h1 className="text-4xl sm:text-5xl font-light text-white leading-[1.08] tracking-[-0.02em] max-w-2xl mb-4">
            Real Homes.<br />Real Transformations.
          </h1>
          <p className="text-lg text-white/55 max-w-xl leading-[1.75] mb-8">
            Drag the slider on each card to see the before and after. Every project shows city, service, area, time and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/calculators/service-cost-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-5 py-3 sm:px-6 sm:py-3.5 font-bold hover:bg-white transition-colors shadow-lg text-sm"
            >
              <Calculator className="w-4 h-4" />
              Calculate Your Cost
            </Link>
            <Link
              to="/get-quote"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-5 py-3 sm:px-6 sm:py-3.5 font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              Book Free Site Visit →
            </Link>
          </div>
        </div>
      </section>

      {/* Full gallery with filter */}
      <ProjectGallerySection
        compact={false}
        showHeader={false}
        showFilter={true}
        bgClass="bg-[#FBF9F6]"
      />
    </main>
  );
};

export default GalleryPage;
