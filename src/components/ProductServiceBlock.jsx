import { Link } from 'react-router-dom';
import { IconInteriorPaint, IconFurnitureMask, IconLaserRuler, IconSparkle, IconWarrantyShield, IconQualityCheck } from './CalycoIcons';
import contactData from '../data/admin/contact.json';
import { BRAND_NAME, WA_SITE_VISIT } from '../data/positioning';

// ─── Per-type product service config ─────────────────────────────────────────
const PRODUCT_CONFIG = {
  interior: {
    bestFor: 'Interior walls and ceilings of homes, apartments and rental properties',
    compatibleServices: [
      { label: 'Interior Painting', slug: 'interior-painting' },
      { label: 'Full House Painting', slug: 'full-house-painting' },
      { label: 'Repainting', slug: 'repainting' },
      { label: 'Fresh Painting', slug: 'fresh-painting' },
      { label: 'Rental Painting', slug: 'rental-painting' },
    ],
    recommendedRooms: ['Living room', 'Bedroom', 'Dining room', 'Hallway', 'Kids room', 'Office'],
    warranty: 'As per product specification (typically 3–5 year protection)',
    coverage: '120–140 sq ft per litre (2 coats)',
    finishTypes: ['Low sheen', 'Matte', 'Eggshell'],
    prepNote: 'Best results with Calyco Acrylic Putty base and Calyco Water Primer before application.',
  },
  exterior: {
    bestFor: 'Exterior walls, facades, boundary walls and balconies exposed to weather',
    compatibleServices: [
      { label: 'Exterior Painting', slug: 'exterior-painting' },
      { label: 'Full House Painting', slug: 'full-house-painting' },
      { label: 'Villa / Bungalow Painting', slug: 'villa-bungalow-painting' },
      { label: 'High-Rise Painting', slug: 'high-rise-painting' },
    ],
    recommendedRooms: ['Exterior facade', 'Boundary wall', 'Balcony exterior', 'Terrace parapet'],
    warranty: '7-year weather resistance (product warranty)',
    coverage: '90–120 sq ft per litre (2 coats)',
    finishTypes: ['Matte', 'Weatherproof matte', 'High sheen'],
    prepNote: 'Apply Calyco Weather Primer before coating for maximum adhesion and weather resistance.',
  },
  waterproofing: {
    bestFor: 'Terraces, roofs, bathrooms, wet areas, damp walls and foundations',
    compatibleServices: [
      { label: 'Terrace Waterproofing', slug: 'terrace-waterproofing' },
      { label: 'Bathroom Waterproofing', slug: 'bathroom-waterproofing' },
      { label: 'Roof Waterproofing', slug: 'roof-waterproofing' },
      { label: 'Damp Wall Treatment', slug: 'damp-wall-treatment' },
    ],
    recommendedRooms: ['Terrace', 'Roof', 'Bathroom', 'Basement', 'Wet areas'],
    warranty: 'Project-specific (5–10 year protection)',
    coverage: '60–80 sq ft per litre (2 coats)',
    finishTypes: ['Clear protective coating', 'Flexible membrane'],
    prepNote: 'Surface must be clean and dry. Calyco supervisor confirms site suitability before application.',
  },
  wood: {
    bestFor: 'Doors, furniture, panels, cabinets and interior woodwork',
    compatibleServices: [
      { label: 'Wood Polish & Coating', slug: 'wood-polish' },
      { label: 'PU Coating', slug: 'pu-coating' },
      { label: 'Melamine Polish', slug: 'melamine-polish' },
    ],
    recommendedRooms: ['All rooms with wooden doors', 'Kitchen', 'Wardrobe', 'Dining furniture'],
    warranty: 'Workmanship warranty on Calyco service projects',
    coverage: '80–120 sq ft per litre (2 coats)',
    finishTypes: ['Matte', 'Satin', 'Gloss', 'French polish'],
    prepNote: 'Wood must be sanded smooth and dry. Grain filler recommended for open-grain wood.',
  },
  metal: {
    bestFor: 'Gates, railings, grills, structural steel and metal surfaces',
    compatibleServices: [
      { label: 'Gate Painting', slug: 'gate-painting' },
      { label: 'Railing Painting', slug: 'railing-painting' },
      { label: 'Metal Primer + Enamel', slug: 'metal-primer-enamel' },
    ],
    recommendedRooms: ['Main gate', 'Balcony railing', 'Staircase railing', 'Window grills'],
    warranty: 'Workmanship warranty on Calyco service projects',
    coverage: '100–130 sq ft per litre (2 coats)',
    finishTypes: ['Gloss enamel', 'Satin', 'Anti-corrosion matte'],
    prepNote: 'Rust must be removed and a suitable metal primer applied before topcoat.',
  },
  texture: {
    bestFor: 'Feature walls, accent walls and designer interiors',
    compatibleServices: [
      { label: 'Texture Painting', slug: 'texture-painting' },
      { label: 'Decorative Wall Painting', slug: 'decorative-wall-painting' },
      { label: 'Living Room Accent Wall', slug: 'living-room-accent-wall' },
    ],
    recommendedRooms: ['Living room feature wall', 'Bedroom accent wall', 'Office reception'],
    warranty: 'Workmanship warranty on Calyco service projects',
    coverage: '40–80 sq ft per litre (pattern dependent)',
    finishTypes: ['Sand texture', 'Smooth texture', 'Rough stone effect', 'Metallic'],
    prepNote: 'Base wall must be smooth and primed. Physical sample recommended before final commit.',
  },
  primer: {
    bestFor: 'Surface preparation before topcoat application on new and repainted walls',
    compatibleServices: [
      { label: 'Interior Painting', slug: 'interior-painting' },
      { label: 'Exterior Painting', slug: 'exterior-painting' },
      { label: 'Surface Preparation', slug: 'wall-putty' },
    ],
    recommendedRooms: ['All rooms — applied before topcoat'],
    warranty: 'Product performance as per specification',
    coverage: '140–180 sq ft per litre (1 coat)',
    finishTypes: ['Matt / non-decorative (base only)'],
    prepNote: 'Allow primer to cure fully before applying topcoat. Do not apply on wet or damp surfaces.',
  },
  default: {
    bestFor: 'Residential and commercial surfaces — confirm suitability with your Calyco supervisor',
    compatibleServices: [
      { label: 'Interior Painting', slug: 'interior-painting' },
      { label: 'Exterior Painting', slug: 'exterior-painting' },
      { label: 'Full House Painting', slug: 'full-house-painting' },
    ],
    recommendedRooms: ['As per product specification'],
    warranty: 'As per product specification',
    coverage: 'As per product specification',
    finishTypes: ['As per product specification'],
    prepNote: 'Calyco supervisors confirm surface suitability during free site inspection.',
  },
};

// ─── Detect product type from name or category ────────────────────────────────
export const detectProductType = (nameOrCategory = '') => {
  const s = nameOrCategory.toLowerCase();
  if (s.includes('exterior')) return 'exterior';
  if (s.includes('waterproof') || s.includes('sealer') || s.includes('damp')) return 'waterproofing';
  if (s.includes('wood') || s.includes('polish') || s.includes('melamine') || s.includes('pu coat') || s.includes('varnish')) return 'wood';
  if (s.includes('enamel') || s.includes('metal') || s.includes('gate') || s.includes('oxide') || s.includes('bitum')) return 'metal';
  if (s.includes('texture') || s.includes('stucco')) return 'texture';
  if (s.includes('primer') || s.includes('putty') || s.includes('alkali')) return 'primer';
  if (s.includes('interior') || s.includes('emulsion') || s.includes('distemper') || s.includes('latex')) return 'interior';
  return 'default';
};

// ─── Main component ───────────────────────────────────────────────────────────
/**
 * ProductServiceBlock
 *
 * Props:
 *   productName  – product display name (for WA message)
 *   productType  – 'interior'|'exterior'|'waterproofing'|'wood'|'metal'|'texture'|'primer'|'default'
 *                  Defaults to auto-detecting from productName.
 */
const ProductServiceBlock = ({ productName = 'this product', productType }) => {
  const type = productType || detectProductType(productName);
  const cfg  = PRODUCT_CONFIG[type] || PRODUCT_CONFIG.default;

  const waMsg = `Hi Calyco — I am interested in having ${productName} applied professionally by the ${BRAND_NAME}. Please share details for a free site visit.`;
  const waLink = `${contactData.contact.whatsapp.link}?text=${encodeURIComponent(waMsg)}`;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">

        {/* ── Left: Product specs summary ───────────────────────────────── */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#0F1221]/8 bg-[#FAFAF8] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#0F1221]/8 bg-white">
              <h2 className="text-lg font-semibold text-[#0F1221] tracking-[-0.01em]">Product Guide</h2>
              <p className="text-xs text-[#0F1221]/70 font-light mt-0.5">Specifications, compatibility and usage guide</p>
            </div>
            <div className="divide-y divide-[#0F1221]/6">

              {/* Best used for */}
              <div className="flex gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#0F1221] flex items-center justify-center flex-shrink-0 mt-0.5"><IconInteriorPaint className="w-4 h-4 text-[#F0C85A]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F1221]/70 mb-1">Best used for</p>
                  <p className="text-sm text-[#0F1221]/70 font-light leading-[1.65]">{cfg.bestFor}</p>
                </div>
              </div>

              {/* Recommended rooms */}
              <div className="flex gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#493657] flex items-center justify-center flex-shrink-0 mt-0.5"><IconFurnitureMask className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F1221]/70 mb-2">Recommended rooms</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cfg.recommendedRooms.map((r) => (
                      <span key={r} className="rounded-full border border-[#0F1221]/10 bg-white px-2.5 py-1 text-xs font-medium text-[#0F1221]/60">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Coverage */}
              <div className="flex gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#1a4a8a] flex items-center justify-center flex-shrink-0 mt-0.5"><IconLaserRuler className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F1221]/70 mb-1">Approx. coverage</p>
                  <p className="text-sm text-[#0F1221]/70 font-medium">{cfg.coverage}</p>
                </div>
              </div>

              {/* Finish type */}
              <div className="flex gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#4a1a6a] flex items-center justify-center flex-shrink-0 mt-0.5"><IconSparkle className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F1221]/70 mb-2">Finish type</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cfg.finishTypes.map((f) => (
                      <span key={f} className="rounded-full bg-[#493657]/8 text-[#493657] px-2.5 py-1 text-xs font-semibold">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div className="flex gap-4 px-5 py-4">
                <div className="w-8 h-8 rounded-lg bg-[#998850] flex items-center justify-center flex-shrink-0 mt-0.5"><IconWarrantyShield className="w-4 h-4 text-white" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#0F1221]/70 mb-1">Warranty</p>
                  <p className="text-sm text-[#0F1221]/70 font-light leading-[1.65]">{cfg.warranty}</p>
                </div>
              </div>

              {/* Surface prep note */}
              <div className="flex gap-4 px-5 py-4 bg-[#FFFBEF]">
                <div className="w-8 h-8 rounded-lg bg-[#F0C85A] flex items-center justify-center flex-shrink-0 mt-0.5"><IconQualityCheck className="w-4 h-4 text-[#0F1221]" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#7a6020] mb-1">Surface preparation note</p>
                  <p className="text-xs text-[#0F1221]/60 font-light leading-[1.7]">{cfg.prepNote}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── Right: Service CTA ────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Professional application block */}
          <div className="rounded-2xl border border-[#F0C85A]/35 bg-gradient-to-br from-[#FFFBEF] to-[#FFF8E2] p-6">
            <div className="flex items-start gap-3 mb-4">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D4AF37]" />
              <div>
                <h3 className="font-bold text-[#0F1221] text-base leading-snug">Want this finish applied professionally?</h3>
                <p className="text-sm text-[#0F1221]/60 font-light mt-1.5 leading-[1.7]">
                  Book {BRAND_NAME} and get {productName} applied by verified painters with proper surface preparation and final quality check.
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              <Link
                to="/get-quote"
                className="block w-full text-center rounded-xl bg-[#0F1221] text-white py-3 text-sm font-bold hover:bg-[#493657] transition-colors"
              >
                Book Painting Services →
              </Link>
              <Link
                to="/calculators/service-cost-calculator"
                className="block w-full text-center rounded-xl border border-[#0F1221]/15 text-[#0F1221]/70 py-3 text-sm font-medium hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-colors"
              >
                Calculate Paint + Labour Cost
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#25D366] text-white py-3 text-sm font-bold hover:bg-[#1fb355] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Ask on WhatsApp
              </a>
            </div>
            <p className="text-[10px] text-[#0F1221]/70 font-light mt-3 text-center">
              Free site inspection · Fixed written quote · Verified painters
            </p>
          </div>

          {/* Compatible services */}
          <div className="rounded-2xl border border-[#0F1221]/8 bg-white p-5">
            <h3 className="text-sm font-bold text-[#0F1221] mb-3">Compatible Calyco Services</h3>
            <div className="space-y-2">
              {cfg.compatibleServices.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/services/${svc.slug}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#0F1221]/8 bg-[#FAFAF8] px-3.5 py-2.5 hover:border-[#493657]/25 hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0C85A] flex-shrink-0" />
                    <span className="text-sm font-medium text-[#0F1221] group-hover:text-[#493657] transition-colors">{svc.label}</span>
                  </div>
                  <svg className="w-3.5 h-3.5 text-[#0F1221]/25 group-hover:text-[#493657] transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
            <Link
              to="/services"
              className="block text-center mt-3 text-xs font-bold text-[#493657] hover:text-[#F0C85A] transition-colors"
            >
              Browse all 60+ services →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductServiceBlock;
