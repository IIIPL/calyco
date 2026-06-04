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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3.5 font-bold hover:bg-white transition-colors shadow-lg text-sm"
            >
              <Calculator className="w-4 h-4" />
              Calculate Your Cost
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-6 py-3.5 font-semibold hover:bg-white/10 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              Book Free Site Visit
            </a>
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
