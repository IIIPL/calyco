import { Link } from 'react-router-dom';

const warrantyCards = [
  {
    icon: '🏠',
    service: 'Interior Painting',
    duration: 'Up to 2 years',
    detail: 'Peeling, flaking or adhesion defects under normal use are inspected and fixed.',
    color: 'bg-blue-50 border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    icon: '🏗️',
    service: 'Exterior Painting',
    duration: 'Up to 3 years',
    detail: 'Blistering, fading beyond normal weathering and peeling covered under warranty.',
    color: 'bg-emerald-50 border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: '💧',
    service: 'Waterproofing',
    duration: 'Project-specific warranty',
    detail: 'Warranty terms set per project scope, material used and site condition at inspection.',
    color: 'bg-sky-50 border-sky-100',
    badge: 'bg-sky-100 text-sky-700',
  },
  {
    icon: '🎨',
    service: 'Texture Painting',
    duration: 'Workmanship warranty',
    detail: 'Application-related delamination, cracking or patchiness covered under workmanship terms.',
    color: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    icon: '🪵',
    service: 'Wood Polish & Coating',
    duration: 'Workmanship warranty',
    detail: 'Peeling, bubbling or finish failure from application covered for the workmanship period.',
    color: 'bg-orange-50 border-orange-100',
    badge: 'bg-orange-100 text-orange-700',
  },
  {
    icon: '🧪',
    service: 'Product Warranty',
    duration: 'As per product selected',
    detail: 'Calyco products carry manufacturer warranties. Ask your supervisor for the product datasheet.',
    color: 'bg-purple-50 border-purple-100',
    badge: 'bg-purple-100 text-purple-700',
  },
];

const ServiceWarrantySection = ({ highlightCategory }) => (
  <section className="bg-white py-12 sm:py-16 border-y border-[#0F1221]/6">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#F0C85A]/15 border border-[#F0C85A]/30 px-4 py-1.5 mb-4">
            <span className="text-[#F0C85A] text-sm">★★★★★</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7a6020]">Warranty-Backed Finish</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em]">
            Every Project. Covered.
          </h2>
          <p className="mt-3 text-sm text-[#0F1221]/55 font-light max-w-xl leading-[1.8]">
            Every Calyco 5-Star Painting project includes a workmanship warranty. If peeling, flaking or application-related defects appear under normal conditions, we inspect and fix the issue as per warranty terms.
          </p>
        </div>
        <Link
          to="/policies/warranty"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full border border-[#0F1221]/12 text-[#0F1221]/60 px-5 py-2.5 text-xs font-semibold hover:border-[#0F1221]/30 hover:text-[#0F1221] transition-colors whitespace-nowrap"
        >
          View Warranty Terms →
        </Link>
      </div>

      {/* Warranty cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {warrantyCards.map((card) => (
          <div
            key={card.service}
            className={`rounded-2xl border ${card.color} px-5 py-5 ${highlightCategory && card.service.toLowerCase().includes(highlightCategory.toLowerCase()) ? 'ring-2 ring-[#F0C85A]/40' : ''}`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <span className="text-2xl leading-none flex-shrink-0">{card.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${card.badge}`}>
                {card.duration}
              </span>
            </div>
            <p className="text-sm font-semibold text-[#0F1221] mb-1.5">{card.service}</p>
            <p className="text-xs text-[#0F1221]/55 font-light leading-[1.7]">{card.detail}</p>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-8 rounded-2xl bg-[#F7F6F3] border border-[#0F1221]/7 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-[#0F1221]/60 font-light leading-[1.7]">
          <span className="font-semibold text-[#0F1221]">Warranty does not cover:</span> colour fading from direct sunlight over years, damage from moisture ingress after project period, or physical damage.
          <Link to="/policies/warranty" className="ml-2 text-[#493657] font-medium hover:text-[#F0C85A] transition-colors">
            Full terms →
          </Link>
        </p>
        <Link
          to="/get-quote"
          className="flex-shrink-0 inline-flex items-center gap-2 rounded-full bg-[#0F1221] text-white px-5 py-2.5 text-xs font-bold hover:bg-[#493657] transition-colors whitespace-nowrap"
        >
          Book Free Site Visit →
        </Link>
      </div>

    </div>
  </section>
);

export default ServiceWarrantySection;
