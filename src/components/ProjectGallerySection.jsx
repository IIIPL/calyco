import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { galleryProjects, GALLERY_CATEGORIES } from '../data/galleryProjects';
import contactData from '../data/admin/contact.json';

const WaIcon = ({ cls = 'w-4 h-4' }) => (
  <svg className={cls} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// ─── Single project card ───────────────────────────────────────────────────────
const ProjectCard = ({ project }) => {
  const waMsg = `Hi Calyco — I saw your ${project.service} project in ${project.city} and want a similar estimate for my home.`;
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(waMsg)}`;

  return (
    <article className="bg-white rounded-2xl border border-[#0F1221]/8 overflow-hidden hover:border-[#493657]/25 hover:shadow-[0_6px_28px_rgba(73,54,87,0.12)] transition-all duration-300 flex flex-col">

      {/* Before/After slider */}
      <BeforeAfterSlider
        afterSrc={project.afterSrc}
        height="h-52"
        initialPos={38}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">

        {/* Category + City */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] rounded-full bg-[#493657]/10 text-[#493657] px-2.5 py-1">
            {project.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#0F1221]/45 font-medium">
            <MapPin className="w-3 h-3" />{project.city}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[#0F1221] text-sm sm:text-base leading-snug mb-3">{project.title}</h3>

        {/* Project meta grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-xs">
          <div>
            <span className="text-[#0F1221]/35 uppercase tracking-wide text-[10px] font-bold block mb-0.5">Service</span>
            <span className="text-[#0F1221]/70 font-medium">{project.service}</span>
          </div>
          <div>
            <span className="text-[#0F1221]/35 uppercase tracking-wide text-[10px] font-bold block mb-0.5">Area</span>
            <span className="text-[#0F1221]/70 font-medium">{project.area}</span>
          </div>
          <div>
            <span className="text-[#0F1221]/35 uppercase tracking-wide text-[10px] font-bold block mb-0.5">Time taken</span>
            <span className="flex items-center gap-1 text-[#0F1221]/70 font-medium">
              <Clock className="w-3 h-3" />{project.timeTaken}
            </span>
          </div>
          <div>
            <span className="text-[#0F1221]/35 uppercase tracking-wide text-[10px] font-bold block mb-0.5">Budget range</span>
            <span className="text-[#998850] font-bold">{project.budgetRange}</span>
          </div>
        </div>

        {/* Products used */}
        <div className="mb-4 rounded-xl bg-[#FAFAF8] border border-[#0F1221]/6 px-3 py-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#0F1221]/35 block mb-1">Products used</span>
          <span className="text-xs text-[#0F1221]/60 font-light">{project.productsUsed}</span>
        </div>

        {/* Customer quote */}
        <blockquote className="mb-4 flex-1">
          <p className="text-xs text-[#0F1221]/60 font-light leading-[1.75] italic border-l-2 border-[#F0C85A] pl-3">
            "{project.customerQuote}"
          </p>
          <p className="text-[11px] font-bold text-[#0F1221]/50 mt-1.5 pl-3">— {project.customerName}</p>
        </blockquote>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/calculators/service-cost-calculator?service=${project.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1221] text-white py-2.5 text-xs font-bold hover:bg-[#493657] transition-colors"
          >
            Get Similar Estimate
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#1fb355] transition-colors flex-shrink-0"
            aria-label="Ask on WhatsApp"
          >
            <WaIcon cls="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
    </article>
  );
};

// ─── Full section ─────────────────────────────────────────────────────────────
/**
 * Props:
 *   compact    – show only 3 cards with "See all" link (for homepage)
 *   showHeader – show the section heading (default true)
 *   showFilter – show category filter tabs (default true)
 */
const ProjectGallerySection = ({
  compact = false,
  showHeader = true,
  showFilter = true,
  bgClass = 'bg-[#F7F6F3]',
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryProjects
    : galleryProjects.filter((p) => p.category === activeCategory);

  const displayed = compact ? filtered.slice(0, 3) : filtered;

  return (
    <section className={`${bgClass} py-12 sm:py-16`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        {showHeader && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">Real Projects</span>
              <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
              <h2 className="text-3xl sm:text-4xl font-light text-[#0F1221] tracking-[-0.01em]">
                Real Homes.<br className="sm:hidden" /> Real Transformations.
              </h2>
              <p className="mt-3 text-sm text-[#0F1221]/50 font-light max-w-lg leading-[1.75]">
                Drag the slider on each card to compare before and after. Every project includes city, service, area, time and budget details.
              </p>
            </div>
            {compact && (
              <Link
                to="/gallery"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0F1221]/15 text-[#0F1221]/70 px-5 py-2.5 text-sm font-medium hover:border-[#0F1221]/35 hover:text-[#0F1221] transition-colors whitespace-nowrap"
              >
                View all projects <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}

        {/* Category filter */}
        {showFilter && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 mb-8">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0F1221] text-white shadow-sm'
                    : 'border border-[#0F1221]/12 text-[#0F1221]/60 hover:border-[#0F1221]/25 hover:text-[#0F1221]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Project grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* "See all" strip for compact mode */}
        {compact && filtered.length > 3 && (
          <div className="mt-8 text-center">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-[#0F1221] text-white px-7 py-3.5 text-sm font-bold hover:bg-[#493657] transition-colors"
            >
              See all {filtered.length} projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Lead CTA strip at bottom */}
        {!compact && (
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-[#0F1221] via-[#1a0b21] to-[#432553] px-6 sm:px-10 py-7 sm:py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <p className="font-bold text-white text-base sm:text-lg mb-1">Inspired by a project? Get a similar estimate for your home.</p>
              <p className="text-sm text-white/50 font-light">Free site visit · Fixed written quote · Verified painting team assigned</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/get-quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F0C85A] text-[#0F1221] px-6 py-3 font-bold hover:bg-white transition-colors whitespace-nowrap text-sm"
              >
                Book Free Site Visit →
              </Link>
              <Link
                to="/calculators/service-cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 text-white px-6 py-3 font-semibold hover:bg-white/10 transition-colors whitespace-nowrap text-sm"
              >
                Calculate Cost
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectGallerySection;
