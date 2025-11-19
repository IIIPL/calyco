const CALYCO_PRIMER_INTERIOR_VARIANT_MAP = {
  "1L-Matte": "gid://shopify/ProductVariant/TBD001",
  "4L-Matte": "gid://shopify/ProductVariant/TBD002",
  "10L-Matte": "gid://shopify/ProductVariant/TBD003",
  "20L-Matte": "gid://shopify/ProductVariant/TBD004"
};

const priceByFinish = {
  "Matte": {
    "1L": 425,
    "4L": 1550,
    "10L": 3700,
    "20L": 7200
  }
};

const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["1L"]
    },
    price: priceByFinish["Matte"]["1L"],
    originalPrice: 550,
  },
  {
    size: "4L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["4L"]
    },
    price: priceByFinish["Matte"]["4L"],
    originalPrice: 1950,
  },
  {
    size: "10L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["10L"]
    },
    price: priceByFinish["Matte"]["10L"],
    originalPrice: 4600,
  },
  {
    size: "20L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["20L"]
    },
    price: priceByFinish["Matte"]["20L"],
    originalPrice: 9000,
  }
];

export const calycoPrimerInteriorDetail = {
  id: "CalycoPrimerInterior",
  slug: "calyco-primer-interior",
  name: "Calyco Primer (Interior)",
  image: "/Assets/Product Images/Primer/interior-primer.webp",
  brand: "Calyco",
  category: "Primer",
  type: "interior",
  rating: 4.8,
  reviewCount: 0,
  description:
    "Water-based acrylic primer for internal walls and ceilings with strong adhesion, improves topcoat coverage, and blocks stains. Perfect for plaster, putty, and drywall.",
  details:
    "Calyco Primer (Interior) is a premium water-based undercoat designed using high-opacity formulation and superior whiteness enhancers. It seals porous surfaces, evens out absorption, and provides strong adhesion for all interior topcoats. With balanced drying, smooth flow, and ultra-low VOCs, it delivers a healthier and more durable finish across plaster, putty, cement, and gypsum surfaces.",
  shortDescription:
    "A high-opacity, water-thinnable interior primer engineered for superior whiteness, smooth finish, and excellent adhesion. Builds an ideal base that enhances the beauty and life of every topcoat.",
  tagline: "The perfect foundation for bright, smooth and long-lasting walls",
  microCopy: "High Opacity Base • Seals Porous Surfaces • Smooth Bright Finish",
  keyBenefits: [
    "Creates a high-opacity base that improves topcoat coverage",
    "Provides a smooth, uniform finish across all interior surfaces",
    "Seals porous substrates for consistent absorption",
    "Delivers strong adhesion for long-lasting paint durability"
  ],
  features: [
    "High whiteness and opacity",
    "Water-thinnable formulation",
    "Alkali-resistant sealing",
    "Smooth, easy-to-apply finish"
  ],
  finishes: [
    {
      name: "Matte",
      description:
        "Smooth matte finish that provides excellent base for topcoats.",
      price: priceByFinish["Matte"]["1L"],
    },
  ],
  defaultFinish: "Matte",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: CALYCO_PRIMER_INTERIOR_VARIANT_MAP,
  sizes,
  coveragePerLitre: 13,
  coatsOptions: [1],
  defaultCoats: 1,
  efficiency: 0.9,
  application: [
    "Interior wall priming",
    "plaster",
    "putty",
    "drywall",
    "cement",
    "wood",
    "masonry"
  ],
  applicationInstructions:
    "Apply with brush, roller, or spray. Stir thoroughly before use. Can be diluted with up to 5% water if needed.",
  preparation:
    "Surface must be clean, dry, and free from dust, grease, loose paint. Remove all flaking material. Fill cracks and holes with putty.",
  base_type: "Water-based acrylic emulsion",
  voc_content: "< 35 g/L (Ultra-low VOC)",
  coverage: "140-150 sq.ft./L/coat",
  coats_required: "1 coat",
  drying_time: "Touch dry: 30 minutes",
  recoat_time: "2 hours",
  full_cure_time: "24 hours",
  temperature_range: "10°C–35°C",
  humidity_range: "Under 80% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place between 5°C–40°C. Avoid freezing. Keep container tightly closed.",
  application_instructions: "Apply with brush, roller, or sprayer. Can be diluted with up to 5% water if needed for better flow.",
  preparation_instructions: "Surface must be clean, dry and free from dust, grease, loose paint. Fill cracks with putty. Sand glossy surfaces lightly.",
  recommended_uses: [
    "Interior walls and ceilings",
    "New plaster surfaces",
    "Putty-finished walls",
    "Renovation projects"
  ],
  substrate: ["Plaster", "Putty", "Drywall", "Cement", "Wood", "Masonry"],

  finish_type_sheen: ["Matte"],

  advantages: [
    "Strong Adhesion - Ensures excellent bonding with surface and topcoat",
    "Superior Coverage - Reduces paint consumption by 15-20%",
    "Stain Blocking - Seals stains and prevents bleed-through",
    "Ultra-low VOC - Safer indoor air quality with < 35 g/L emissions",
    "Quick Drying - Ready for topcoat in just 2 hours"
  ],
  technicalSpecs: {
    product_code: "CAL-PRI-INT-001",
    base: "Proprietary Acrylic Dispersion",
    base_type: "Water-based acrylic emulsion",
    vehicle_type: "Water-based acrylic emulsion",
    dryingTime: "Touch dry: 30 minutes | Recoat: 2 hours | Full cure: 24 hours",
    thinning: "Up to 5% water if needed for better application",
    recoatTime: "2 hours",
    volume_solids: "Approx. 35%",
    voc_content: "< 35 g/L (Ultra-low VOC)",
    pH: "7-8",
    weight_per_volume: "~1.25 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with brush, roller, or sprayer. Ensure surface is clean, dry, and properly prepared.",
    preparation_instructions: "Surface must be clean, dry, and free from dust, grease, loose paint. Prime new surfaces. Fill cracks with putty.",
    temperature_range: "10°C–35°C",
    humidity_range: "Under 80% RH",
    cleanup: "Soap and water immediately after use",
    storage_instructions: "Store in cool dry place, avoid freezing",
  },
  safety_warnings: {
    signal_word: "Caution",
    hazard_statements: [
      "May cause eye irritation",
      "Keep out of reach of children"
    ],
    precautionary_statements: [
      "Use in well-ventilated area",
      "Wear protective gloves",
      "Avoid contact with eyes and skin",
      "Keep out of reach of children",
      "Wash hands thoroughly after handling"
    ],
    first_aid: {
      eye_contact: "Rinse immediately with plenty of water for at least 15 minutes. Remove contact lenses if present and easy to do. Seek medical attention if irritation persists.",
      skin_contact: "Wash thoroughly with soap and water. If irritation develops, seek medical attention.",
      inhalation: "Move to fresh air immediately. If breathing difficulties persist, seek medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth with water. Seek medical attention immediately."
    }
  },
  safety_precautions: "Use in well-ventilated area. Wear protective gloves and eye protection during application.",
  documents: {
    tds: null,
    sds: null,
    warranty: null,
  },
  warranty: "5 years",

  packaging: [
    "1L",
    "4L",
    "10L",
    "20L"
  ],

  bucketImage: "/Assets/Product Images/Primer/interior-primer.webp",
  images: [
    "/Assets/Product Images/Primer/interior-primer.webp"
  ],
  seo: {
    title: "Calyco Interior Primer | Premium Wall Primer for Interior | Calyco",
    description:
      "Calyco Interior Primer provides strong adhesion and superior coverage for flawless walls. Water-based, low VOC, stain-blocking formula for plaster, putty, and drywall.",
    keywords:
      "interior primer, wall primer, acrylic primer, low voc primer, stain blocking primer, primer for walls, interior wall primer, water based primer",
  },
};

export default calycoPrimerInteriorDetail;
