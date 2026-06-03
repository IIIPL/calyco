const prepSteps = [
  {
    n: '01',
    title: 'Wall Inspection',
    desc: 'Every surface is checked for cracks, dampness, loose paint, mould, and uneven patches before work begins.',
  },
  {
    n: '02',
    title: 'Furniture Masking',
    desc: 'All furniture, shelves and fixed items are covered with drop sheets and plastic masking.',
  },
  {
    n: '03',
    title: 'Floor Protection',
    desc: 'Floors are covered with protective film and newspaper to prevent paint drops and dust contamination.',
  },
  {
    n: '04',
    title: 'Crack Filling',
    desc: 'Cracks and gaps in walls and ceilings are filled with premium crack filler and allowed to cure completely.',
  },
  {
    n: '05',
    title: 'Sanding',
    desc: 'Filled areas and rough patches are sanded smooth so the final coat sits evenly across the surface.',
  },
  {
    n: '06',
    title: 'Primer Application',
    desc: 'The correct primer is applied based on surface condition — damp-resist, alkali-resist or bonding primer.',
  },
  {
    n: '07',
    title: 'Two-Coat Paint Application',
    desc: 'First coat applied and allowed to dry completely. Second coat applied for uniform coverage and depth.',
  },
  {
    n: '08',
    title: 'Touch-Ups',
    desc: 'Edges, corners, and any spots missed in the main coat are touched up before the supervisor review.',
  },
  {
    n: '09',
    title: 'Site Cleanup',
    desc: 'All masking, drop sheets and waste material removed. Furniture restored to original position.',
  },
  {
    n: '10',
    title: 'Final Inspection',
    desc: 'Supervisor reviews the complete project against the 27-point quality checklist before handover.',
  },
];

const SurfacePreparationSection = () => (
  <section className="bg-[#F7F6F3] py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 items-start">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#0F1221]/40">What separates Calyco</span>
          <div className="mt-2 mb-4 h-[1px] w-10 bg-[#0F1221]/10" />
          <h2 className="text-2xl sm:text-3xl font-light text-[#0F1221] tracking-[-0.01em] leading-[1.15]">
            The Difference Is in the<br className="hidden sm:block" /> Wall Preparation.
          </h2>
          <p className="mt-4 text-sm text-[#0F1221]/55 font-light leading-[1.85] max-w-sm">
            A good paint job starts before the first coat. Calyco checks for cracks, dampness, loose paint, uneven patches and surface dust before painting begins. Our team prepares the surface properly so the final finish looks smoother and lasts longer.
          </p>

          {/* Highlight stat */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-[#F0C85A]/35 bg-[#FFFBEF] px-4 py-3">
            <span className="text-2xl leading-none flex-shrink-0">⭐</span>
            <div>
              <p className="text-sm font-bold text-[#0F1221]">27-Point Quality Checklist</p>
              <p className="text-xs text-[#0F1221]/50 font-light mt-0.5">Signed off by supervisor before handover on every project.</p>
            </div>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prepSteps.map((step) => (
            <div
              key={step.n}
              className="flex gap-3.5 rounded-2xl border border-[#0F1221]/7 bg-white px-4 py-4 hover:border-[#0F1221]/15 hover:shadow-sm transition-all"
            >
              <span className="text-[11px] font-bold text-[#F0C85A] tracking-[0.08em] flex-shrink-0 mt-0.5 w-6">{step.n}</span>
              <div>
                <p className="text-sm font-semibold text-[#0F1221] leading-snug">{step.title}</p>
                <p className="text-xs text-[#0F1221]/50 font-light mt-1 leading-[1.65]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
);

export default SurfacePreparationSection;
