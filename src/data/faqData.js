/**
 * Calyco master FAQ data.
 * Used by: FAQs.jsx (full page) and ServiceDetailPage.jsx (service-specific subset).
 */

export const FAQ_CATEGORIES = [
  { id: 'all',          label: 'All Questions' },
  { id: 'pricing',      label: 'Pricing & Quotes' },
  { id: 'services',     label: 'Services & Booking' },
  { id: 'materials',    label: 'Materials & Products' },
  { id: 'process',      label: 'Process & Timeline' },
  { id: 'payments',     label: 'Payments & Warranty' },
  { id: 'waterproofing',label: 'Waterproofing' },
  { id: 'commercial',   label: 'Commercial Projects' },
];

export const masterFAQs = [

  // ── Pricing & Quotes ──────────────────────────────────────────────────────
  {
    id: 'fq1',
    category: 'pricing',
    q: 'How much does painting cost per sq ft?',
    a: 'Calyco base rates start at ₹18/sq ft for Economy interior painting and go up to ₹68/sq ft for Luxury interior. Exterior painting starts at ₹24/sq ft. Final rate depends on city, service, paint tier, surface condition and area. Use the Calyco Cost Calculator for a transparent breakdown before speaking to anyone.',
  },
  {
    id: 'fq2',
    category: 'pricing',
    q: 'How is the final price calculated?',
    a: 'Base rate × city multiplier × tier factor × any condition or complexity adjustment = subtotal. GST 18% is added separately. After free site inspection, actual laser-measured area and surface condition are confirmed. The written quote issued after the visit is the price you pay — it does not change after acceptance.',
  },
  {
    id: 'fq3',
    category: 'pricing',
    q: 'Is site inspection free?',
    a: 'Yes — completely free. No payment, no commitment required. A Calyco supervisor visits your property, inspects wall condition, checks for dampness or cracks, measures the area with a laser tool, and gives you a clear written scope and price. Nothing changes after that visit without your approval.',
  },
  {
    id: 'fq4',
    category: 'pricing',
    q: 'Is GST included in the quoted price?',
    a: 'No — GST 18% is shown separately in every Calyco estimate and invoice. The Calyco calculator shows subtotal and GST as separate lines so you can see exactly what you are paying. Your final invoice is GST-compliant and itemised.',
  },
  {
    id: 'fq5',
    category: 'pricing',
    q: 'Is putty included in the painting rate?',
    a: 'It depends on the package. Economy packages typically do not include full putty — they use primer and spot filling. Premium and Luxury packages include full-wall putty for a smoother finish. Putty can also be quoted separately at ₹12–18/sq ft if needed alongside an Economy package. Your supervisor confirms this in writing before work starts.',
  },
  {
    id: 'fq6',
    category: 'pricing',
    q: 'Is primer included?',
    a: 'Yes — primer is included in all Calyco packages. Economy uses a single primer coat. Premium uses a 2-coat damp-resistant primer system. Luxury uses anti-fungal, alkali-resistant primer on all surfaces. The primer specification is listed in your written quote.',
  },
  {
    id: 'fq7',
    category: 'pricing',
    q: 'How much advance payment is required?',
    a: 'Calyco does not require a large advance. A small booking amount (if applicable) is adjusted against the final invoice. Material and labour payment terms are discussed and agreed in the written quote before work begins. You are not asked to pay in full upfront.',
  },
  {
    id: 'fq8',
    category: 'pricing',
    q: 'Can I upload photos for an estimate?',
    a: 'Yes. When filling the quote form, you can upload 3–8 photos of your walls, ceilings, and any problem areas. Photos help Calyco prepare a more accurate estimate before the site visit. You can also share photos directly on WhatsApp.',
  },

  // ── Services & Booking ────────────────────────────────────────────────────
  {
    id: 'fs1',
    category: 'services',
    q: 'What is included in interior painting?',
    a: 'Standard Calyco interior painting includes: wall inspection, furniture masking and floor protection, crack filling (minor), sanding where needed, primer (1–2 coats based on package), 2 coats of emulsion, touch-ups, site cleanup, and supervisor approval before handover. Premium and Luxury packages also include full putty, anti-fungal primer, and a 27-point quality checklist.',
  },
  {
    id: 'fs2',
    category: 'services',
    q: 'What is the difference between fresh painting and repainting?',
    a: 'Fresh painting is for new surfaces that have never been painted before — bare plaster, new construction. It typically requires more coats and an alkali-resistant primer. Repainting is applied over an existing paint layer — the surface needs less primer but may require sanding, spot filling and a bonding primer if the old paint is chalky or loose. Calyco quotes for both separately.',
  },
  {
    id: 'fs3',
    category: 'services',
    q: 'What is rental painting?',
    a: 'Rental painting is a budget-conscious service for landlords who need to repaint a flat before a new tenant. It uses economy emulsion, minimal putty, and a quick-turnaround approach. Calyco rates for rental painting start at ₹14/sq ft and a 2BHK is typically completed in 2 days.',
  },
  {
    id: 'fs4',
    category: 'services',
    q: 'How long does a 2BHK take?',
    a: 'A standard 2BHK interior repaint (Economy) typically takes 3–4 days. Premium with full putty takes 4–6 days. Luxury with full surface prep and multi-coat system takes 5–7 days. The schedule depends on the condition of existing walls and drying time between coats. Your supervisor provides a day-by-day schedule before work starts.',
  },
  {
    id: 'fs5',
    category: 'services',
    q: 'Do you protect furniture and floors?',
    a: 'Yes — furniture masking and floor protection are included in every Calyco project. All furniture is covered with drop sheets. Floors are protected with protective film. Switchboards are taped. This is part of the Calyco process, not an extra charge.',
  },
  {
    id: 'fs6',
    category: 'services',
    q: 'Do painters clean up after work?',
    a: 'Yes. Daily cleanup is part of the Calyco process — masking, drop sheets and paint waste are cleared every evening. At final handover, the team removes all protection, wipes down surfaces, restores furniture to original positions, and the supervisor does a walkthrough before leaving.',
  },
  {
    id: 'fs7',
    category: 'services',
    q: 'Will I get daily updates?',
    a: 'Yes. Calyco teams are required to submit daily progress photos to the supervisor, who forwards them to you on WhatsApp. You receive an update every day whether or not you are present at the property.',
  },
  {
    id: 'fs8',
    category: 'services',
    q: 'Can I track the work if I am not at home?',
    a: 'Yes. Daily WhatsApp updates with photos are sent from the site every evening. You can also call or message your assigned supervisor directly at any time. Calyco does not require you to be present throughout the project.',
  },

  // ── Materials & Products ─────────────────────────────────────────────────
  {
    id: 'fm1',
    category: 'materials',
    q: 'Who buys the paint?',
    a: 'Calyco provides the paint and materials as part of the service. You do not need to purchase anything separately. The paint type, brand (Calyco or as agreed), quantity and specification are all listed in the written quote before work begins.',
  },
  {
    id: 'fm2',
    category: 'materials',
    q: 'Do you use Calyco paints only?',
    a: 'By default, Calyco service projects use Calyco-formulated paints for best compatibility. However, Calyco can also apply other specified paint brands if the customer has a preference or if a client-supplied product is requested. This is discussed and confirmed in the written quote.',
  },
  {
    id: 'fm3',
    category: 'materials',
    q: 'Can I choose Asian Paints, Berger or Nerolac?',
    a: 'Yes. If you prefer a specific brand, Calyco can accommodate this in most cases. The quote will reflect the material cost of the specified brand. In some cases, Calyco may recommend its own formulation as a better or more cost-effective alternative — the final choice is yours.',
  },
  {
    id: 'fm4',
    category: 'materials',
    q: 'What is the difference between Economy, Premium and Luxury tiers?',
    a: 'Economy: Basic primer, 2 coats standard emulsion — best for rental or quick refresh. Premium: Surface repair, damp-resist primer, 2-coat washable emulsion, supervisor check, 2-year workmanship warranty. Luxury: Full putty, anti-fungal primer, luxury emulsion, 27-point inspection, 3-year workmanship warranty. All three include furniture protection and daily cleanup.',
  },

  // ── Process & Timeline ────────────────────────────────────────────────────
  {
    id: 'fp1',
    category: 'process',
    q: 'What happens if the wall has dampness?',
    a: 'Dampness must be diagnosed before painting. Calyco supervisors identify the source (seepage from above, bathroom leakage, rising damp) during the free site inspection. Depending on severity, the team may recommend a waterproofing treatment or damp-seal primer before painting. Painting over damp walls without treatment causes peeling within months.',
  },
  {
    id: 'fp2',
    category: 'process',
    q: 'What is the Calyco 27-point quality checklist?',
    a: 'The 27-point checklist covers all stages of the project — surface preparation, masking, primer application, paint application, edge work, ceiling/wall junction, doors and frames, switchboard masking, floor cleanup, and final handover condition. The supervisor signs off each point before the team leaves.',
  },
  {
    id: 'fp3',
    category: 'process',
    q: 'What surface preparation does Calyco do?',
    a: 'Calyco's standard prep includes: wall inspection, crack filling with appropriate filler, sanding rough surfaces, applying the correct primer system (alkali-resist, damp-resist or bonding primer based on surface), and waiting for full cure before applying topcoats. Premium and Luxury packages also include full-wall putty for a smoother base.',
  },
  {
    id: 'fp4',
    category: 'process',
    q: 'Can work happen when I am not at home?',
    a: 'Yes. Many customers are at work during the painting project. Calyco requires access to the property, which can be arranged with a trusted representative or building security. Daily WhatsApp photo updates are sent so you know exactly what happened each day.',
  },

  // ── Payments & Warranty ───────────────────────────────────────────────────
  {
    id: 'fpw1',
    category: 'payments',
    q: 'Is there a warranty?',
    a: 'Yes. Calyco provides a workmanship warranty on every project. Economy projects: 6–12 months. Premium: 2 years. Luxury: 3 years. If peeling, flaking or adhesion-related defects appear under normal conditions within the warranty period, Calyco inspects and repairs at no cost. This does not cover physical damage, colour fading from direct sunlight over years, or moisture ingress after the warranty period.',
  },
  {
    id: 'fpw2',
    category: 'payments',
    q: 'Can I pay online?',
    a: 'Yes. Calyco accepts UPI, credit/debit cards, net banking and wallets. Payment details and terms are agreed in the written quote. A GST-compliant invoice is issued after project completion.',
  },
  {
    id: 'fpw3',
    category: 'payments',
    q: 'What if there is a dispute about the work quality?',
    a: 'Every project ends with a handover walkthrough. If you identify any issue, the supervisor rectifies it before leaving. Post-completion concerns within 7 days of handover are addressed as a snag fix at no charge. Warranty claims can be raised through WhatsApp with project photos.',
  },

  // ── Waterproofing ─────────────────────────────────────────────────────────
  {
    id: 'fw1',
    category: 'waterproofing',
    q: 'Do you handle waterproofing?',
    a: 'Yes. Calyco provides waterproofing for terraces, roofs, bathrooms, basements, damp walls and external facades. Systems range from surface-applied coatings to injection grouting for active leakage. Every waterproofing job starts with a free site inspection to identify the source of leakage.',
  },
  {
    id: 'fw2',
    category: 'waterproofing',
    q: 'How do you find the source of a leak?',
    a: 'Calyco supervisors carry moisture metres and visual inspection tools. The team traces water paths, checks ceiling joints, bathroom seals, terrace drains, and external walls to identify the primary and secondary sources before recommending a system. Treating only the symptom without finding the source is a common cause of repeat leakage.',
  },
  {
    id: 'fw3',
    category: 'waterproofing',
    q: 'How long does waterproofing last?',
    a: 'Surface-applied waterproofing coatings typically last 5–8 years under normal Indian weather conditions. Injection grouting and multi-layer membrane systems can last 10+ years if the surface prep was thorough. Your supervisor specifies the expected warranty duration in the written quote for your project.',
  },
  {
    id: 'fw4',
    category: 'waterproofing',
    q: 'Do I need to break tiles for bathroom waterproofing?',
    a: 'Not always. Surface waterproofing applied over intact tiles can resolve many bathroom leakage issues. If the leakage is severe or the tiles are already loose, partial tile removal may be needed to apply a membrane beneath. Your supervisor advises after inspecting the extent of damage.',
  },

  // ── Commercial ────────────────────────────────────────────────────────────
  {
    id: 'fc1',
    category: 'commercial',
    q: 'Can I get a BOQ-based quote for a commercial project?',
    a: 'Yes. Share your BOQ, floor plans or area schedule via WhatsApp or the quote form. Calyco returns a line-item commercial quote within 48 hours. Site inspection is scheduled after BOQ review. Commercial projects include shift-based scheduling to minimise business disruption.',
  },
  {
    id: 'fc2',
    category: 'commercial',
    q: 'Do you paint offices and retail spaces?',
    a: 'Yes. Calyco handles offices, showrooms, schools, hotels, restaurants and societies. Commercial projects are quoted on a BOQ basis with scope, material, timeline and exclusions clearly listed. Night-shift and weekend scheduling is available for business-continuity projects.',
  },
];

// ─── Service-specific FAQ sets ─────────────────────────────────────────────────
// Used by ServiceDetailPage.getFAQs()

const BASE_SERVICE_FAQS = [
  { q: 'Is the site inspection free?', a: 'Yes — completely free. No payment, no commitment. Calyco reviews your walls, measures the area with a laser tool, and gives you a written scope and price.' },
  { q: 'Do I get a fixed price quote?', a: 'Yes. After the site visit, you receive a written quote with exact scope, area, material, timeline and price. It does not change after acceptance.' },
  { q: 'Is primer included?', a: 'Yes. All Calyco packages include primer. Economy includes a single primer coat; Premium and Luxury include a 2-coat damp-resistant or anti-fungal primer system.' },
  { q: 'Will you protect my furniture and floors?', a: 'Yes. Furniture masking, floor protection and switchboard taping are included in every Calyco project before work begins.' },
  { q: 'Do painters clean up after work?', a: 'Yes. Daily cleanup and final site restoration are part of the Calyco process. The team does not leave until the supervisor approves the handover condition.' },
  { q: 'Can I track the work if I am not at home?', a: 'Yes. Calyco sends daily WhatsApp progress photos from the site every evening.' },
  { q: 'What warranty do I get?', a: 'Economy: 6–12 months. Premium: 2 years. Luxury: 3 years. Any defect within the warranty period is inspected and repaired at no extra cost.' },
  { q: 'Is GST included in the quoted rate?', a: 'No — GST 18% is shown separately. Your final invoice is GST-compliant and itemised.' },
];

export const getServiceFAQs = (service) => {
  const cat = service?.category || '';
  const slug = service?.slug || '';

  // Waterproofing
  if (cat === 'Waterproofing') return [
    { q: 'How do you identify the source of leakage?', a: 'Our supervisor uses moisture metres and traces water paths across ceilings, bathroom joints, terrace drains and external walls to identify the primary source before recommending a system.' },
    { q: 'Do I need to break tiles for waterproofing?', a: 'Not always. Surface waterproofing often resolves the issue without tile removal. If leakage is severe or tiles are loose, partial removal may be needed. Your supervisor advises after site inspection.' },
    { q: 'How long does waterproofing protection last?', a: 'Surface coatings: 5–8 years. Multi-layer membrane systems: 8–12 years. Your written quote specifies the warranty duration for your project.' },
    { q: 'Can I paint over waterproofing?', a: 'Yes — after the waterproofing system cures fully (typically 7–14 days). Calyco supervisors confirm when it is safe to apply topcoat.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Wall Design / Texture
  if (cat === 'Wall Design') return [
    { q: 'Can I see texture samples before finalising?', a: 'Yes. Calyco provides physical texture finish samples and colour combinations at your home before work begins, so you can confirm the finish with confidence.' },
    { q: 'How long does texture painting take?', a: 'A standard feature wall takes 1–2 days depending on the pattern and drying time required between layers. Your supervisor confirms the timeline after site inspection.' },
    { q: 'Can texture be applied over existing paint?', a: 'In most cases, yes — if the existing surface is sound, clean and well-adhered. If the base is chalky or peeling, surface preparation is done first before texture application.' },
    { q: 'What happens if I do not like the finish?', a: 'Calyco shows physical samples and may apply a test patch on a small area before proceeding to the full wall. Your approval is required before scaling up.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Wood Finishing
  if (cat === 'Wood Finishing') return [
    { q: 'What is the difference between melamine and PU coating?', a: 'Melamine gives a clean, durable semi-gloss finish suitable for most interior woodwork. PU (Polyurethane) coating gives a harder, more resistant finish — ideal for kitchens, high-traffic doors and wet-area woodwork.' },
    { q: 'Do I need to empty the room before wood polishing?', a: 'For furniture polishing, we work around items in place. For full room woodwork (all doors, panels), your supervisor advises what to clear for best access and result.' },
    { q: 'How many coats of polish are needed?', a: 'Typically 2–3 coats depending on the finish type and porosity of the wood. Open-grain wood may need a grain filler first. The number of coats is specified in your written quote.' },
    { q: 'Can old polish be stripped and reapplied?', a: 'Yes. Calyco can sand off old polish, prep the surface, and apply a fresh system. This gives a much better result than polishing over old, worn finish.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Wallpaper
  if (cat === 'Wallpaper') return [
    { q: 'Can you remove old wallpaper before installing new?', a: 'Yes. Calyco handles wallpaper removal before new installation. The wall is then prepared (filled, sanded and primed) to ensure good adhesion for the new wallpaper.' },
    { q: 'Will there be bubbles in the wallpaper after installation?', a: 'No — if the surface preparation is done correctly. Calyco checks surface flatness before installation. Any bubbles that appear in the first 48 hours from trapped air are re-smoothed at no extra charge.' },
    { q: 'How do I clean installed wallpaper?', a: 'Most vinyl wallpapers can be wiped with a damp cloth. Non-washable paper types need dry dusting only. Your supervisor confirms the maintenance method for your specific wallpaper.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Metal Painting
  if (cat === 'Metal Painting') return [
    { q: 'Will you remove rust before painting?', a: 'Yes. Rust removal (wire brushing or grinding) is part of the Calyco metal prep process. A rust-inhibiting primer is applied before any topcoat. Painting over rust causes the paint to fail within months.' },
    { q: 'How long does metal paint last?', a: 'Properly applied metal primer and enamel systems last 3–5 years on gates and railings in normal weather conditions. Annual inspection is recommended.' },
    { q: 'Can you paint without disassembling the gate?', a: 'Yes. In most cases, Calyco paints gates and railings in situ. For complex or large gates, partial disassembly may be recommended for better coverage — this is discussed at site inspection.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Surface Preparation
  if (cat === 'Surface Preparation') return [
    { q: 'Is putty required for all surfaces?', a: 'No. Putty is recommended for new or rough plaster surfaces that need levelling before painting. Smooth surfaces in good condition can go directly to primer and topcoat. Your supervisor assesses and recommends.' },
    { q: 'Why is surface preparation so important?', a: 'A good paint job starts with the wall, not the paint. Skipping crack filling, sanding or primer causes peeling within 6–12 months. Calyco's prep process is what makes the finish last 2–3× longer than a typical local painter job.' },
    { q: 'What is the difference between putty and primer?', a: 'Putty is a white compound applied to level and smooth rough plaster. It is sanded after drying. Primer is a chemical bonding coat applied after putty, which seals the surface and improves paint adhesion. Both are needed for best results.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Commercial Painting
  if (cat === 'Painting' && (slug.includes('commercial') || slug.includes('high-rise'))) return [
    { q: 'Can you work in night shifts to avoid business disruption?', a: 'Yes. Calyco schedules night or weekend shifts for commercial projects where business operations must continue. This is agreed in the written quote before work begins.' },
    { q: 'Can you provide a BOQ-based quote?', a: 'Yes. Share your floor plans, area schedule or BOQ via WhatsApp. Calyco returns a line-item commercial quote within 48 hours.' },
    { q: 'Do you handle large-area exterior painting for societies?', a: 'Yes. Calyco handles societies, high-rise exteriors and compound walls with access equipment planning, safety protocols and shift-based scheduling.' },
    ...BASE_SERVICE_FAQS,
  ];

  // Default: Painting services
  return [
    { q: 'How much does interior painting cost?', a: 'Base rates start at ₹18/sq ft (Economy) and go up to ₹68/sq ft (Luxury). Final price depends on city, package, surface condition and total area. Use the Calyco calculator for a transparent breakdown.' },
    { q: 'What is the difference between fresh painting and repainting?', a: 'Fresh painting is for new, uncoated plaster. Repainting is applied over existing paint. Fresh surfaces need alkali-resist primer; repainting may need sanding and a bonding coat if the old paint is chalky.' },
    { q: 'Is putty included?', a: 'Putty is included in Premium and Luxury packages. Economy packages include spot filling only. Full-wall putty can be added to Economy as a separate line item — your supervisor quotes this at site inspection.' },
    { q: 'How long does a 2BHK interior painting take?', a: 'Economy: 3–4 days. Premium: 4–6 days. Luxury with full prep: 5–7 days. Your supervisor provides a day-by-day schedule before work begins.' },
    { q: 'Who buys the paint?', a: 'Calyco provides all materials including paint, primer and putty as part of the service quote. You do not need to purchase anything separately.' },
    { q: 'Can I use Asian Paints or Berger instead of Calyco?', a: 'Yes. Calyco can apply your preferred brand if specified. The material cost is reflected in the quote. In many cases, Calyco\'s own formulations offer better value and compatibility.' },
    ...BASE_SERVICE_FAQS,
  ];
};
