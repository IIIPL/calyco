export const GST_RATE = 0.18;

export const cityMultipliers = {
  Udaipur: 1.00,
  Jaipur: 1.05,
  Lucknow: 1.05,
  Indore: 1.05,
  Nagpur: 1.05,
  Bhubaneswar: 1.05,
  Ahmedabad: 1.08,
  Surat: 1.08,
  Vadodara: 1.08,
  Nashik: 1.08,
  Visakhapatnam: 1.08,
  Coimbatore: 1.08,
  Kolkata: 1.10,
  Noida: 1.12,
  Delhi: 1.15,
  Chandigarh: 1.12,
  Kochi: 1.12,
  Chennai: 1.12,
  Hyderabad: 1.15,
  Pune: 1.15,
  Gurgaon: 1.20,
  Bengaluru: 1.20,
  Goa: 1.20,
  'Alibaug & Lonavala': 1.22,
  Mumbai: 1.25,
};

export const bhkHelpers = [
  { label: '1BHK', carpet: '500-650 sq ft', paintableMin: 1800, paintableMax: 2300 },
  { label: '2BHK', carpet: '700-1,000 sq ft', paintableMin: 2800, paintableMax: 3800 },
  { label: '3BHK', carpet: '1,100-1,500 sq ft', paintableMin: 4200, paintableMax: 5600 },
  { label: '4BHK', carpet: '1,600-2,200 sq ft', paintableMin: 6000, paintableMax: 8000 },
];

export const serviceCategories = [
  'Painting',
  'Waterproofing',
  'Wall Design',
  'Wallpaper',
  'Wood Finishing',
  'Metal Painting',
  'Grouting & Tile Repair',
  'Surface Preparation',
  'Cleaning & Protection',
  'Consultation',
];

export const serviceHubCards = [
  { title: 'Interior Painting',          slug: 'interior-painting',    description: 'Smooth, washable interior wall finishes for homes and apartments.',           startingPrice: 18, image: '/service/Interior Painting.jpg' },
  { title: 'Exterior Painting',          slug: 'exterior-painting',    description: 'Weather-ready exterior paint systems for Indian sun and rain.',                startingPrice: 24, image: '/service/Exterior Painting.jpg' },
  { title: 'Full Home Painting',         slug: 'full-house-painting',  description: 'End-to-end home painting with measurement, protection and cleanup.',          startingPrice: 18, image: '/service/Full House Painting.jpg' },
  { title: 'Waterproofing',              slug: 'terrace-waterproofing',description: 'Terrace, roof, bathroom and damp-wall waterproofing systems.',                 startingPrice: 45, image: '/service/Terrace Waterproofing.jpg' },
  { title: 'Texture & Stencil Painting', slug: 'texture-painting',     description: 'Feature walls, designer textures, stencil and decorative finishes.',          startingPrice: 35, image: '/service/Texture Painting.jpg' },
  { title: 'Wallpaper Installation',     slug: 'wallpaper-installation',description: 'Wallpaper installation, removal and paint-combination walls.',                startingPrice: 35, image: '/service/Wallpaper Installation.jpg' },
  { title: 'Wood Polish & Coating',      slug: 'wood-polish',          description: 'Polish, melamine, PU and outdoor wood protection finishes.',                   startingPrice: 60, image: '/service/Wood Polish.jpg' },
  { title: 'Metal Painting',            slug: 'gate-painting',         description: 'Primer, enamel and industrial coatings for gates, grills and railings.',       startingPrice: 35, image: '/service/Gate Painting.jpg' },
  { title: 'Tile Grouting & Repair',    slug: 'tile-grouting',         description: 'Cement, epoxy and injection grouting for wet areas and joints.',               startingPrice: 20, image: '/service/Tile Grouting.jpg' },
  { title: 'Surface Preparation',       slug: 'wall-putty',            description: 'Putty, primer, sanding, scraping, crack filling and damp patches.',            startingPrice: 4,  image: '/service/Wall Putty.jpg' },
  { title: 'Commercial Painting',       slug: 'commercial-painting',   description: 'Organized painting plans for offices, retail, schools and facilities.',        startingPrice: 20, image: '/service/Commercial Painting.jpg' },
  { title: 'Cleaning & Protection',     slug: 'post-painting-cleanup', description: 'Floor protection, furniture masking and post-painting cleanup.',               startingPrice: 2,  image: '/service/Post-Painting Cleanup.jpg' },
];

const commonIncludes = [
  'Verified Calyco service team',
  'Transparent rate logic before booking',
  'Daily WhatsApp project updates',
  'Fixed written quote after free site inspection',
];

export const servicePricing = [
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Interior Painting', slug: 'interior-painting', unit: 'sq ft', baseMin: 18, baseMax: 22, tiers: { Economy: 1, Premium: 1.75, Luxury: 3.05 }, description: 'Interior wall and ceiling painting for occupied homes, rentals and apartments.', includes: ['Surface check', 'Two-coat paint system', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Exterior Painting', slug: 'exterior-painting', unit: 'sq ft', baseMin: 24, baseMax: 30, tiers: { Economy: 1, Premium: 1.75, Luxury: 2.92 }, description: 'Exterior wall painting with weather-resistant paint systems.', includes: ['Exterior surface check', 'Weather-ready paint system', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Full House Painting', slug: 'full-house-painting', unit: 'sq ft', baseMin: 18, baseMax: 40, tiers: { Economy: 1, Premium: 1.35, Luxury: 1.9 }, description: 'Complete home painting with BHK helper and laser measurement confirmation.', includes: ['BHK helper estimate', 'Room-wise planning', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Fresh Painting', slug: 'fresh-painting', unit: 'sq ft', baseMin: 23, baseMax: 50, tiers: { Economy: 1, Premium: 1.25, Luxury: 1.65 }, description: 'New surface paint system with primer and finishing coats.', includes: ['Primer planning', 'Fresh wall coating system', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Repainting', slug: 'repainting', unit: 'sq ft', baseMin: 18, baseMax: 40, tiers: { Economy: 1, Premium: 1.35, Luxury: 1.85 }, description: 'Repainting service for previously painted walls.', includes: ['Existing paint inspection', 'Recoat planning', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Commercial Painting', slug: 'commercial-painting', unit: 'sq ft', baseMin: 20, baseMax: 55, tiers: { Economy: 1, Premium: 1.2, Luxury: 1.45 }, description: 'Painting for offices, shops, schools and commercial properties.', includes: ['BOQ-friendly quote', 'Work schedule planning', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'High-Rise Apartment Painting', slug: 'high-rise-painting', unit: 'sq ft', baseMin: 30, baseMax: 65, tiers: { Economy: 1, Premium: 1.25, Luxury: 1.55 }, description: 'High-rise exterior and apartment painting with access planning.', includes: ['Access condition review', 'Safety-led execution plan', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Core Painting Services', name: 'Villa / Bungalow Painting', slug: 'villa-bungalow-painting', unit: 'sq ft', baseMin: 20, baseMax: 44, tiers: { Economy: 1, Premium: 1.35, Luxury: 1.85 }, description: 'Premium painting plan for villas, bungalows and larger residences.', includes: ['Facade and room planning', 'Finish recommendations', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Paint Packages', name: 'Economy Painting', slug: 'economy-painting', unit: 'sq ft', baseMin: 18, baseMax: 22, tiers: { Economy: 1 }, description: 'Budget-conscious painting for fast refreshes and rental spaces.', includes: ['Economy finish planning', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Paint Packages', name: 'Premium Painting', slug: 'premium-painting', unit: 'sq ft', baseMin: 32, baseMax: 40, tiers: { Premium: 1 }, description: 'Balanced durability and finish quality for everyday homes.', includes: ['Premium paint recommendation', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Paint Packages', name: 'Luxury Painting', slug: 'luxury-painting', unit: 'sq ft', baseMin: 55, baseMax: 68, tiers: { Luxury: 1 }, description: 'High-finish luxury wall painting for statement interiors.', includes: ['Luxury finish recommendation', ...commonIncludes] },
  { category: 'Painting', mainCategory: 'Paint Packages', name: 'Rental Painting', slug: 'rental-painting', unit: 'sq ft', baseMin: 14, baseMax: 20, tiers: { Economy: 1, Premium: 1.25 }, description: 'Quick rental repainting with clean handover support.', includes: ['Rental-ready finish', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Terrace Waterproofing', slug: 'terrace-waterproofing', unit: 'sq ft', baseMin: 45, baseMax: 75, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Protective waterproofing system for terraces and exposed slabs.', includes: ['Leakage inspection', 'Waterproofing system recommendation', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Roof Waterproofing', slug: 'roof-waterproofing', unit: 'sq ft', baseMin: 50, baseMax: 85, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Roof waterproofing for seepage, cracks and weather exposure.', includes: ['Roof condition check', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Bathroom Waterproofing', slug: 'bathroom-waterproofing', unit: 'sq ft', baseMin: 60, baseMax: 95, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Bathroom wet-area waterproofing before tile or repair work.', includes: ['Wet-area diagnosis', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Basement Waterproofing', slug: 'basement-waterproofing', unit: 'sq ft', baseMin: 80, baseMax: 140, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Basement waterproofing for dampness and pressure seepage.', includes: ['Moisture source check', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Exterior Wall Waterproofing', slug: 'exterior-wall-waterproofing', unit: 'sq ft', baseMin: 45, baseMax: 70, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Exterior wall treatment for seepage and rain exposure.', includes: ['Wall dampness review', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Internal Damp Wall Treatment', slug: 'damp-wall-treatment', unit: 'sq ft', baseMin: 65, baseMax: 110, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Internal damp patch treatment before repainting.', includes: ['Damp source review', ...commonIncludes] },
  { category: 'Waterproofing', mainCategory: 'Waterproofing Services', name: 'Wall & Foundation Waterproofing', slug: 'foundation-waterproofing', unit: 'sq ft', baseMin: 90, baseMax: 160, tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 }, description: 'Foundation and wall waterproofing for structural dampness.', includes: ['Foundation-area diagnosis', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Texture Painting', slug: 'texture-painting', unit: 'sq ft', baseMin: 55, baseMax: 120, tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 }, description: 'Designer textured walls with finish samples and application planning.', includes: ['Texture finish consultation', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Decorative Wall Painting', slug: 'decorative-wall-painting', unit: 'sq ft', baseMin: 60, baseMax: 150, tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 }, description: 'Decorative feature-wall painting for living rooms and bedrooms.', includes: ['Design consultation', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Stencil Painting', slug: 'stencil-painting', unit: 'sq ft', baseMin: 45, baseMax: 100, tiers: { Basic: 1, Designer: 1.3, Premium: 1.6 }, description: 'Stencil patterns for accent walls and custom motifs.', includes: ['Pattern guidance', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Geometric Wall Painting', slug: 'geometric-wall-painting', unit: 'sq ft', baseMin: 35, baseMax: 80, tiers: { Basic: 1, Designer: 1.3, Premium: 1.6 }, description: 'Modern geometric wall layouts with clean masking and finish control.', includes: ['Layout marking', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Kids Room Wall Painting', slug: 'kids-room-wall-painting', unit: 'sq ft', baseMin: 80, baseMax: 180, tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 }, description: 'Custom kids-room walls with playful colour and motif planning.', includes: ['Theme consultation', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Bedroom Feature Wall', slug: 'bedroom-feature-wall', unit: 'sq ft', baseMin: 60, baseMax: 150, tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 }, description: 'Premium bedroom feature walls with colour and finish guidance.', includes: ['Feature-wall planning', ...commonIncludes] },
  { category: 'Wall Design', mainCategory: 'Wall Design Services', name: 'Living Room Accent Wall', slug: 'living-room-accent-wall', unit: 'sq ft', baseMin: 60, baseMax: 150, tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 }, description: 'Living-room accent wall design for a polished first impression.', includes: ['Accent-wall planning', ...commonIncludes] },
  { category: 'Wallpaper', mainCategory: 'Wallpaper Services', name: 'Wallpaper Installation', slug: 'wallpaper-installation', unit: 'sq ft', baseMin: 35, baseMax: 80, tiers: { Standard: 1, Premium: 1.3 }, description: 'Wallpaper installation with surface check and neat edge finishing.', includes: ['Surface readiness check', ...commonIncludes] },
  { category: 'Wallpaper', mainCategory: 'Wallpaper Services', name: 'Wallpaper Removal', slug: 'wallpaper-removal', unit: 'sq ft', baseMin: 15, baseMax: 30, tiers: { Standard: 1, Premium: 1.25 }, description: 'Wallpaper removal before repainting or new wallpaper installation.', includes: ['Removal planning', ...commonIncludes] },
  { category: 'Wallpaper', mainCategory: 'Wallpaper Services', name: 'Wallpaper Surface Preparation', slug: 'wallpaper-surface-preparation', unit: 'sq ft', baseMin: 12, baseMax: 25, tiers: { Standard: 1, Premium: 1.25 }, description: 'Wall preparation for clean wallpaper adhesion.', includes: ['Surface levelling check', ...commonIncludes] },
  { category: 'Wallpaper', mainCategory: 'Wallpaper Services', name: 'Wallpaper + Paint Combination', slug: 'wallpaper-paint-combination', unit: 'sq ft', baseMin: 70, baseMax: 180, tiers: { Standard: 1, Premium: 1.35 }, description: 'Coordinated wallpaper and paint combinations for feature spaces.', includes: ['Colour matching guidance', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'Wood Coating', slug: 'wood-coating', unit: 'sq ft', baseMin: 80, baseMax: 180, tiers: { 'Basic polish': 1, Melamine: 1.35, 'PU coating': 1.75 }, description: 'Protective wood coating for doors, furniture and panels.', includes: ['Wood surface review', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'Wood Polish', slug: 'wood-polish', unit: 'sq ft', baseMin: 70, baseMax: 150, tiers: { 'Basic polish': 1, Melamine: 1.35, 'PU coating': 1.75 }, description: 'Wood polishing for furniture, doors and interior woodwork.', includes: ['Finish matching', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'Varnish', slug: 'varnish', unit: 'sq ft', baseMin: 60, baseMax: 120, tiers: { 'Basic polish': 1, Melamine: 1.25, 'PU coating': 1.6 }, description: 'Clear varnish application for wood protection and sheen.', includes: ['Sheen selection', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'French Polish', slug: 'french-polish', unit: 'sq ft', baseMin: 90, baseMax: 180, tiers: { 'Basic polish': 1, Melamine: 1.25, 'PU coating': 1.6 }, description: 'Traditional French polish style finishing for premium woodwork.', includes: ['Finish planning', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'Melamine Polish', slug: 'melamine-polish', unit: 'sq ft', baseMin: 120, baseMax: 220, tiers: { Melamine: 1, 'PU coating': 1.35 }, description: 'Durable melamine polish finish for interior wood surfaces.', includes: ['Melamine finish recommendation', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'PU Coating', slug: 'pu-coating', unit: 'sq ft', baseMin: 160, baseMax: 300, tiers: { 'PU coating': 1, Premium: 1.2 }, description: 'PU coating for strong, premium wood protection.', includes: ['PU system recommendation', ...commonIncludes] },
  { category: 'Wood Finishing', mainCategory: 'Wood Finishing Services', name: 'Deck / Outdoor Wood Coating', slug: 'outdoor-wood-coating', unit: 'sq ft', baseMin: 120, baseMax: 240, tiers: { 'Basic polish': 1, Melamine: 1.2, 'PU coating': 1.55 }, description: 'Outdoor wood coating for decks and exposed wood surfaces.', includes: ['Weather exposure review', ...commonIncludes] },
  { category: 'Metal Painting', mainCategory: 'Metal Painting Services', name: 'Gate Painting', slug: 'gate-painting', unit: 'sq ft', baseMin: 35, baseMax: 70, tiers: { Standard: 1, Premium: 1.3 }, description: 'Gate painting with primer and enamel finish options.', includes: ['Rust check', ...commonIncludes] },
  { category: 'Metal Painting', mainCategory: 'Metal Painting Services', name: 'Railing Painting', slug: 'railing-painting', unit: 'sq ft', baseMin: 35, baseMax: 65, tiers: { Standard: 1, Premium: 1.3 }, description: 'Railing painting for balconies, stairs and terraces.', includes: ['Metal prep review', ...commonIncludes] },
  { category: 'Metal Painting', mainCategory: 'Metal Painting Services', name: 'Grill Painting', slug: 'grill-painting', unit: 'sq ft', baseMin: 35, baseMax: 60, tiers: { Standard: 1, Premium: 1.3 }, description: 'Grill painting with metal primer and enamel protection.', includes: ['Grill prep check', ...commonIncludes] },
  { category: 'Metal Painting', mainCategory: 'Metal Painting Services', name: 'Metal Primer + Enamel', slug: 'metal-primer-enamel', unit: 'sq ft', baseMin: 45, baseMax: 85, tiers: { Standard: 1, Premium: 1.3 }, description: 'Metal primer and enamel application for durable protection.', includes: ['Primer system recommendation', ...commonIncludes] },
  { category: 'Metal Painting', mainCategory: 'Metal Painting Services', name: 'Industrial Metal Coating', slug: 'industrial-metal-coating', unit: 'sq ft', baseMin: 80, baseMax: 180, tiers: { Standard: 1, Premium: 1.35 }, description: 'Industrial metal coating for higher-duty surfaces.', includes: ['System and substrate review', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'Tile Grouting', slug: 'tile-grouting', unit: 'sq ft', baseMin: 25, baseMax: 45, tiers: { 'Cement grout': 1, 'Epoxy grout': 2.4 }, description: 'Tile grouting for bathrooms, kitchens and floor areas.', includes: ['Joint condition check', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'Epoxy Grouting', slug: 'epoxy-grouting', unit: 'sq ft', baseMin: 70, baseMax: 130, tiers: { 'Epoxy grout': 1 }, description: 'Epoxy grouting for durable, water-resistant joints.', includes: ['Epoxy grout planning', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'Cement Grouting', slug: 'cement-grouting', unit: 'sq ft', baseMin: 20, baseMax: 40, tiers: { 'Cement grout': 1 }, description: 'Cement grouting for standard tile joint repairs.', includes: ['Joint prep planning', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'PU Injection Grouting', slug: 'pu-injection-grouting', unit: 'running ft / point', baseMin: 250, baseMax: 600, tiers: { 'PU injection': 1, Premium: 1.25 }, description: 'PU injection grouting for active leakage points.', includes: ['Leak source review', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'Cement Injection Grouting', slug: 'cement-injection-grouting', unit: 'running ft / point', baseMin: 150, baseMax: 400, tiers: { 'Cement grout': 1, 'PU injection': 1.4 }, description: 'Injection grouting for cracks and leakage paths.', includes: ['Injection point review', ...commonIncludes] },
  { category: 'Grouting & Tile Repair', mainCategory: 'Grouting & Tile Repair', name: 'Bathroom Joint Repair', slug: 'bathroom-joint-repair', unit: 'sq ft', baseMin: 60, baseMax: 120, tiers: { 'Cement grout': 1, 'Epoxy grout': 1.45, 'PU injection': 1.8 }, description: 'Bathroom joint repair for leakage-prone wet areas.', includes: ['Wet joint diagnosis', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Wall Putty', slug: 'wall-putty', unit: 'sq ft', baseMin: 12, baseMax: 18, tiers: { Standard: 1, Premium: 1.25 }, description: 'Wall putty application for smoother paint finish.', includes: ['Surface levelling check', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Primer Application', slug: 'primer-application', unit: 'sq ft', baseMin: 6, baseMax: 10, tiers: { Standard: 1, Premium: 1.25 }, description: 'Primer application before paint or texture systems.', includes: ['Primer compatibility check', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Crack Filling', slug: 'crack-filling', unit: 'running ft', baseMin: 15, baseMax: 40, tiers: { Standard: 1, Premium: 1.35 }, description: 'Crack filling before painting or waterproofing.', includes: ['Crack width review', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Sanding', slug: 'sanding', unit: 'sq ft', baseMin: 4, baseMax: 8, tiers: { Standard: 1, Premium: 1.25 }, description: 'Wall sanding for smoother repainting results.', includes: ['Surface smoothness check', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Scraping Old Paint', slug: 'scraping-old-paint', unit: 'sq ft', baseMin: 8, baseMax: 15, tiers: { Standard: 1, Premium: 1.25 }, description: 'Scraping old loose paint before primer and repainting.', includes: ['Loose paint removal planning', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Wall Cleaning', slug: 'wall-cleaning', unit: 'sq ft', baseMin: 3, baseMax: 6, tiers: { Standard: 1, Premium: 1.25 }, description: 'Wall cleaning before paint, wallpaper or repair work.', includes: ['Dust and residue check', ...commonIncludes] },
  { category: 'Surface Preparation', mainCategory: 'Surface Preparation', name: 'Damp Patch Treatment', slug: 'damp-patch-treatment', unit: 'sq ft', baseMin: 45, baseMax: 90, tiers: { Standard: 1, Premium: 1.3, 'Heavy leakage': 1.6 }, description: 'Treatment for local damp patches before repainting.', includes: ['Damp patch review', ...commonIncludes] },
  { category: 'Cleaning & Protection', mainCategory: 'Cleaning Services', name: 'Post-Painting Cleanup', slug: 'post-painting-cleanup', unit: 'carpet sq ft', baseMin: 2, baseMax: 5, tiers: { Standard: 1, Premium: 1.3 }, description: 'Post-painting cleanup for a cleaner handover.', includes: ['Basic cleanup planning', ...commonIncludes] },
  { category: 'Cleaning & Protection', mainCategory: 'Cleaning Services', name: 'Deep Cleaning', slug: 'deep-cleaning', unit: 'carpet sq ft', baseMin: 6, baseMax: 15, tiers: { Standard: 1, Premium: 1.3 }, description: 'Deep cleaning after painting or renovation work.', includes: ['Cleaning scope review', ...commonIncludes] },
  { category: 'Cleaning & Protection', mainCategory: 'Cleaning Services', name: 'Floor Protection & Cleaning', slug: 'floor-protection-cleaning', unit: 'carpet sq ft', baseMin: 3, baseMax: 8, tiers: { Standard: 1, Premium: 1.3 }, description: 'Floor masking, protection and post-work cleaning.', includes: ['Floor protection planning', ...commonIncludes] },
  { category: 'Cleaning & Protection', mainCategory: 'Cleaning Services', name: 'Furniture Protection', slug: 'furniture-protection', unit: 'room / sq ft', baseMin: 500, baseMax: 2500, tiers: { Standard: 1, Premium: 1.25 }, description: 'Furniture masking and movement support during paint work.', includes: ['Furniture protection scope', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Free Colour Consultation', slug: 'colour-consultation', unit: 'session', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Colour consultation for paint, texture and finish selection.', includes: ['Colour guidance', 'Finish pairing', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Site Inspection', slug: 'site-inspection', unit: 'visit', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Free site inspection before final fixed quotation.', includes: ['Site condition review', 'Measurement check', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Laser Measurement', slug: 'laser-measurement', unit: 'visit', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Laser measurement to confirm final paintable area.', includes: ['Paintable area confirmation', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'BOQ-Based Quote', slug: 'boq-quote', unit: 'quote', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'BOQ-based quote for contractors and commercial projects.', includes: ['BOQ review', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Fixed Written Quotation', slug: 'fixed-written-quotation', unit: 'quote', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Fixed written quotation after inspection and measurement.', includes: ['Written scope', 'Final price clarity', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Paint System Recommendation', slug: 'paint-system-recommendation', unit: 'session', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Product and paint system recommendation by surface condition.', includes: ['System recommendation', ...commonIncludes] },
  { category: 'Consultation', mainCategory: 'Consultation Services', name: 'Supervisor Assignment', slug: 'supervisor-assignment', unit: 'project', baseMin: 0, baseMax: 0, tiers: { Free: 1 }, description: 'Supervisor assignment for organized execution and updates.', includes: ['Project coordination', ...commonIncludes] },
];

export const servicesByCategory = serviceCategories.reduce((groups, category) => {
  groups[category] = servicePricing.filter((service) => service.category === category);
  return groups;
}, {});

export const getServiceBySlug = (slug) => servicePricing.find((service) => service.slug === slug);

export const calculateServiceEstimate = ({
  service,
  city = 'Delhi',
  quantity = 0,
  tier,
  propertyMultiplier = 1,
  conditionMultiplier = 1,
  complexityMultiplier = 1,
}) => {
  const selectedTier = tier || Object.keys(service.tiers)[0];
  const tierMultiplier = service.tiers[selectedTier] || 1;
  const cityMultiplier = cityMultipliers[city] || 1;
  const parsedQuantity = Number(quantity) || 0;
  const totalMultiplier = propertyMultiplier * conditionMultiplier * complexityMultiplier * tierMultiplier;
  const cityRateMin = service.baseMin * cityMultiplier;
  const cityRateMax = service.baseMax * cityMultiplier;
  const adjustedRateMin = cityRateMin * totalMultiplier;
  const adjustedRateMax = cityRateMax * totalMultiplier;
  const subtotalMin = parsedQuantity * adjustedRateMin;
  const subtotalMax = parsedQuantity * adjustedRateMax;
  const gstMin = subtotalMin * GST_RATE;
  const gstMax = subtotalMax * GST_RATE;

  return {
    cityMultiplier,
    tierMultiplier,
    adjustedRateMin,
    adjustedRateMax,
    subtotalMin,
    subtotalMax,
    gstMin,
    gstMax,
    totalMin: subtotalMin + gstMin,
    totalMax: subtotalMax + gstMax,
  };
};
