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
  'Interior Painting',
  'Exterior Painting',
  'Ceiling Painting',
  'Add-ons',
  'Dampness / Leakage Repair',
  'Texture / Decorative Painting',
  'Waterproofing',
];

export const serviceHubCards = [
  {
    title: 'Interior Repaint', slug: 'interior-repaint', startingPrice: 18,
    description: 'Repainting for previously painted interior walls in homes and apartments.',
    image: '/service/Repainting.jpg',
    images: [
      '/service/Repainting.jpg',
      '/service/Scraping Old Paint.jpg',
      '/service/Rental Painting.jpg',
    ],
  },
  {
    title: 'Interior Fresh Painting', slug: 'interior-fresh-painting', startingPrice: 23,
    description: 'Fresh paint system with primer and finishing coats for new surfaces.',
    image: '/service/fresh painting.jpg',
    images: [
      '/service/fresh painting.jpg',
      '/service/Bedroom Feature Wall.jpg',
      '/service/Living Room Accent Wall.jpg',
    ],
  },
  {
    title: 'Exterior Repaint', slug: 'exterior-repaint', startingPrice: 24,
    description: 'Weather-ready repainting for previously painted exterior walls.',
    image: '/service/Exterior Painting.jpg',
    images: [
      '/service/Exterior Painting.jpg',
      '/service/High-Rise Apartment Painting.jpg',
      '/service/Commercial Painting.jpg',
    ],
  },
  {
    title: 'Exterior Fresh Painting', slug: 'exterior-fresh-painting', startingPrice: 28,
    description: 'Fresh exterior paint system for new or bare walls.',
    image: '/service/High-Rise Apartment Painting.jpg',
    images: [
      '/service/High-Rise Apartment Painting.jpg',
      '/service/Gate Painting.jpg',
      '/service/Railing Painting.jpg',
    ],
  },
  {
    title: 'Ceiling Painting', slug: 'ceiling-painting', startingPrice: 20,
    description: 'Smooth, bright ceiling painting with drip protection and clean finish.',
    image: '/service/Interior Painting.jpg',
    images: [
      '/service/Interior Painting.jpg',
      '/service/Luxury Painting.jpg',
      '/service/Supervisor Assignment.jpg',
    ],
  },
  {
    title: 'Wall Putty Add-on', slug: 'wall-putty-addon', startingPrice: 12,
    description: 'Wall putty application for a smoother, longer-lasting paint finish.',
    image: '/service/Wall Putty.jpg',
    images: [
      '/service/Wall Putty.jpg',
      '/service/Crack Filling.jpg',
      '/service/Primer Application.jpg',
    ],
  },
  {
    title: 'Primer Add-on', slug: 'primer-addon', startingPrice: 6,
    description: 'Primer coat add-on for better adhesion and coverage.',
    image: '/service/Primer Application.jpg',
    images: [
      '/service/Primer Application.jpg',
      '/service/Wall Putty.jpg',
      '/service/Sanding.jpg',
    ],
  },
  {
    title: 'Dampness / Leakage Repair', slug: 'dampness-leakage-repair', startingPrice: 65,
    description: 'Damp wall and leakage treatment before repainting.',
    image: '/service/Internal Damp Wall Treatment.jpg',
    images: [
      '/service/Internal Damp Wall Treatment.jpg',
      '/service/Damp Patch Treatment.jpg',
      '/service/Bathroom Joint Repair.jpg',
    ],
  },
  {
    title: 'Texture / Decorative Painting', slug: 'texture-decorative-painting', startingPrice: 55,
    description: 'Designer textures, stencils and decorative wall finishes.',
    image: '/service/Texture Painting.jpg',
    images: [
      '/service/Texture Painting.jpg',
      '/service/Stencil Painting.jpg',
      '/service/Decorative Wall Painting.jpg',
    ],
  },
  {
    title: 'Waterproofing', slug: 'waterproofing', startingPrice: 45,
    description: 'Terrace, roof, bathroom and wall waterproofing systems.',
    image: '/service/Terrace Waterproofing.jpg',
    images: [
      '/service/Terrace Waterproofing.jpg',
      '/service/Roof Waterproofing.jpg',
      '/service/Basement Waterproofing.jpg',
    ],
  },
];

const commonIncludes = [
  'Verified Calyco service team',
  'Transparent rate logic before booking',
  'Daily WhatsApp project updates',
  'Fixed written quote after free site inspection',
];

export const servicePricing = [
  {
    category: 'Interior Painting', mainCategory: 'Interior Painting',
    name: 'Interior Repaint', slug: 'interior-repaint',
    unit: 'sq ft', baseMin: 18, baseMax: 28,
    tiers: { Economy: 1, Premium: 1.6, Luxury: 2.5 },
    description: 'Repainting service for previously painted interior walls in homes and apartments.',
    includes: ['Existing paint inspection', 'Two-coat repaint system', ...commonIncludes],
  },
  {
    category: 'Interior Painting', mainCategory: 'Interior Painting',
    name: 'Interior Fresh Painting', slug: 'interior-fresh-painting',
    unit: 'sq ft', baseMin: 23, baseMax: 38,
    tiers: { Economy: 1, Premium: 1.5, Luxury: 2.2 },
    description: 'Fresh paint system with primer and finishing coats for new or bare interior walls.',
    includes: ['Primer planning', 'Fresh wall coating system', ...commonIncludes],
  },
  {
    category: 'Exterior Painting', mainCategory: 'Exterior Painting',
    name: 'Exterior Repaint', slug: 'exterior-repaint',
    unit: 'sq ft', baseMin: 24, baseMax: 35,
    tiers: { Economy: 1, Premium: 1.6, Luxury: 2.4 },
    description: 'Weather-ready repainting for previously painted exterior walls.',
    includes: ['Exterior surface check', 'Weather-ready repaint system', ...commonIncludes],
  },
  {
    category: 'Exterior Painting', mainCategory: 'Exterior Painting',
    name: 'Exterior Fresh Painting', slug: 'exterior-fresh-painting',
    unit: 'sq ft', baseMin: 28, baseMax: 45,
    tiers: { Economy: 1, Premium: 1.5, Luxury: 2.2 },
    description: 'Fresh exterior paint system for new or bare walls, weather-sealed for durability.',
    includes: ['Surface readiness check', 'Fresh exterior coat system', ...commonIncludes],
  },
  {
    category: 'Ceiling Painting', mainCategory: 'Ceiling Painting',
    name: 'Ceiling Painting', slug: 'ceiling-painting',
    unit: 'sq ft', baseMin: 20, baseMax: 30,
    tiers: { Standard: 1, Premium: 1.4 },
    description: 'Smooth, bright ceiling painting with drip protection and clean finish.',
    includes: ['Ceiling surface check', 'Drip protection setup', ...commonIncludes],
  },
  {
    category: 'Add-ons', mainCategory: 'Add-ons',
    name: 'Wall Putty Add-on', slug: 'wall-putty-addon',
    unit: 'sq ft', baseMin: 12, baseMax: 18,
    tiers: { Standard: 1, Premium: 1.3 },
    description: 'Wall putty application for a smoother, longer-lasting paint finish.',
    includes: ['Surface levelling check', 'Putty application', ...commonIncludes],
  },
  {
    category: 'Add-ons', mainCategory: 'Add-ons',
    name: 'Primer Add-on', slug: 'primer-addon',
    unit: 'sq ft', baseMin: 6, baseMax: 10,
    tiers: { Standard: 1, Premium: 1.25 },
    description: 'Primer coat add-on for better adhesion, coverage and paint longevity.',
    includes: ['Primer compatibility check', 'Primer application', ...commonIncludes],
  },
  {
    category: 'Dampness / Leakage Repair', mainCategory: 'Dampness / Leakage Repair',
    name: 'Dampness / Leakage Repair', slug: 'dampness-leakage-repair',
    unit: 'sq ft', baseMin: 65, baseMax: 110,
    tiers: { Standard: 1, Premium: 1.3, 'Heavy leakage': 1.6 },
    description: 'Comprehensive damp wall and leakage treatment before repainting for lasting results.',
    includes: ['Damp source review', 'Leakage treatment system', ...commonIncludes],
  },
  {
    category: 'Texture / Decorative Painting', mainCategory: 'Texture / Decorative Painting',
    name: 'Texture / Decorative Painting', slug: 'texture-decorative-painting',
    unit: 'sq ft', baseMin: 55, baseMax: 120,
    tiers: { Basic: 1, Designer: 1.35, Premium: 1.7 },
    description: 'Designer textures, stencils and decorative wall finishes for feature spaces.',
    includes: ['Texture finish consultation', 'Design guidance', ...commonIncludes],
  },
  {
    category: 'Waterproofing', mainCategory: 'Waterproofing',
    name: 'Waterproofing', slug: 'waterproofing',
    unit: 'sq ft', baseMin: 45, baseMax: 85,
    tiers: { Standard: 1, Premium: 1.25, 'Heavy leakage': 1.55 },
    description: 'Professional waterproofing for terraces, roofs, bathrooms and damp walls.',
    includes: ['Leakage inspection', 'Waterproofing system recommendation', ...commonIncludes],
  },
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
