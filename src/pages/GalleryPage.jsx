import { Link } from 'react-router-dom';
import { Calculator, CalendarCheck } from 'lucide-react';
import SEO from '../components/SEO';

const projects = [
  {
    title: '3BHK Full Home Repaint',
    location: 'Noida Sector 50',
    service: 'Interior Painting -- Premium',
    area: '4,200 sq ft',
    before: '/Assets/Rooms/LivingRoom/base.webp',
    after: '/Assets/home-hero/home-page-hero-updated.webp',
    tag: 'Interior Painting',
  },
  {
    title: 'Terrace Waterproofing',
    location: 'Delhi, Greater Kailash',
    service: 'Terrace Waterproofing -- Premium',
    area: '800 sq ft',
    before: '/Assets/Waterproof Sealer/Main.webp',
    after: '/Assets/Waterproof Sealer/Main.webp',
    tag: 'Waterproofing',
  },
  {
    title: 'Living Room Feature Wall',
    location: 'Gurgaon, DLF Phase 3',
    service: 'Texture Painting -- Designer',
    area: '180 sq ft',
    before: '/Assets/Texture Images/texture-main.webp',
    after: '/Assets/Texture Images/texture-main.webp',
    tag: 'Wall Design',
  },
  {
    title: 'Villa Exterior Repaint',
    location: 'Udaipur',
    service: 'Exterior Painting -- Luxury',
    area: '6,800 sq ft',
    before: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp',
    after: '/Assets/HERO/hero5-Metallic_parapet_interrupted_by_small_columns_in_a__4ebb7ad1-fde5-4e3d-a238-3c3de0f940e7.webp',
    tag: 'Exterior Painting',
  },
  {
    title: 'Kids Room Mural Wall',
    location: 'Noida Extension',
    service: 'Kids Room Wall Painting -- Designer',
    area: '220 sq ft',
    before: '/Assets/InteriorInspiratoin/living-room.webp',
    after: '/Assets/InteriorInspiratoin/living-room.webp',
    tag: 'Wall Design',
  },
  {
    title: 'Office Full Floor Repaint',
    location: 'Delhi, Saket',
    service: 'Commercial Painting -- Premium',
    area: '12,000 sq ft',
    before: '/Assets/u7621868624_Rectangular_directors_office_interior_in_contempora_76b307ad-c102-4425-920f-9aef0beb8a26.webp',
    after: '/Assets/u7621868624_Rectangular_directors_office_interior_in_contempora_76b307ad-c102-4425-920f-9aef0beb8a26.webp',
    tag: 'Commercial',
  },
];

const tags = ['All', 'Interior Painting', 'Exterior Painting', 'Waterproofing', 'Wall Design', 'Commercial'];

import { useState } from 'react';

const GalleryPage = () => {
  const [activeTag, setActiveTag] = useState('All');
  const filtered = activeTag === 'All' ? projects : projects.filter((p) => p.tag === activeTag);

  return (
    <main className="min-h-screen bg-[#FBF9F6]">
      <SEO
        title="Project Gallery | Calyco Painting & Waterproofing Work"
        description="See Calyco's completed painting, waterproofing and wall design projects across 25 cities in India -- before and after, with real project details."
        url="https://calycopaints.com/gallery"
      />

      {/* Hero */}
      <section className="bg-[#0F1221] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(73,54,87,0.95),rgba(26,11,33,0.98))]" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-10">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-3">Our Work</p>
          <h1 className="text-4xl sm:text-5xl font-light text-white leading-[1.08] tracking-[-0.01em] max-w-2xl">
            Projects we've delivered.
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-xl">Real projects with real details -- location, service, area and before/after photos.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/calculators/service-cost-calculator" className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 font-bold hover:bg-white transition-colors text-sm">
              <Calculator className="w-4 h-4" /> Calculate Your Cost
            </Link>
            <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors text-sm">
              <CalendarCheck className="w-4 h-4" /> Book Free Visit
            </a>
          </div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[79px] z-30 bg-[#FBF9F6]/95 backdrop-blur border-b border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3 flex gap-2 overflow-x-auto scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeTag === tag ? 'bg-[#493657] text-white shadow-sm' : 'text-[#493657] hover:bg-[#493657]/8'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project) => (
            <article key={project.title} className="group bg-white rounded-2xl border border-[#e5e0d8] overflow-hidden shadow-sm hover:shadow-[0_8px_28px_rgba(73,54,87,0.14)] transition-all duration-300">
              <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                <img src={project.after} alt={project.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                <span className="absolute top-3 left-3 rounded-full bg-[#493657] text-white text-[11px] font-bold px-2.5 py-1">{project.tag}</span>
              </div>
              <div className="p-5">
                <h2 className="font-medium text-[#0F1221] text-base">{project.title}</h2>
                <p className="text-xs text-[#998850] font-semibold mt-1">{project.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#FBF9F6] border border-[#e5e0d8] px-2.5 py-1 text-xs text-gray-600">{project.service}</span>
                  <span className="rounded-full bg-[#FBF9F6] border border-[#e5e0d8] px-2.5 py-1 text-xs text-gray-600">{project.area}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#493657] px-8 py-10 text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#F0C85A]/70 mb-2">Start your project</p>
          <h2 className="text-white text-2xl font-light tracking-[-0.01em] mb-6">Want results like these?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/calculators/service-cost-calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 font-bold hover:bg-white transition-colors">
              <Calculator className="w-4 h-4" /> Calculate Cost
            </Link>
            <a href="https://wa.me/918796777399?text=Hi%20Calyco%2C%20I%20want%20a%20free%20site%20visit." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors">
              <CalendarCheck className="w-4 h-4" /> Book Free Site Visit
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;
