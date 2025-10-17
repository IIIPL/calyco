const INTERIOR_LATEX_VARIANT_MAP = {
  "1L-Low Sheen": "gid://shopify/ProductVariant/42619088371830",
  "4L-Low Sheen": "gid://shopify/ProductVariant/42619088437366",
  "10L-Low Sheen": "gid://shopify/ProductVariant/42619088502902",
  "20L-Low Sheen": "gid://shopify/ProductVariant/42619088568438",
  "1L-Pearl": "gid://shopify/ProductVariant/42619088339062",
  "4L-Pearl": "gid://shopify/ProductVariant/42619088404598",
  "10L-Pearl": "gid://shopify/ProductVariant/42619088470134",
  "20L-Pearl": "gid://shopify/ProductVariant/42619088535670"
};

const priceByFinish = {
  "Low Sheen": {
    "1L": 700,
    "4L": 2700,
    "10L": 6500,
    "20L": 12800,
  },
  "Pearl": {
    "1L": 800,
    "4L": 3500,
    "10L": 8400,
    "20L": 16000,
  },
};

const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Low Sheen": priceByFinish["Low Sheen"]["1L"],
      "Pearl": priceByFinish["Pearl"]["1L"],
    },
    price: priceByFinish["Low Sheen"]["1L"],
    originalPrice: 850,
  },
  {
    size: "4L",
    priceByFinish: {
      "Low Sheen": priceByFinish["Low Sheen"]["4L"],
      "Pearl": priceByFinish["Pearl"]["4L"],
    },
    price: priceByFinish["Low Sheen"]["4L"],
    originalPrice: 3200,
  },
  {
    size: "10L",
    priceByFinish: {
      "Low Sheen": priceByFinish["Low Sheen"]["10L"],
      "Pearl": priceByFinish["Pearl"]["10L"],
    },
    price: priceByFinish["Low Sheen"]["10L"],
    originalPrice: 7800,
  },
  {
    size: "20L",
    priceByFinish: {
      "Low Sheen": priceByFinish["Low Sheen"]["20L"],
      "Pearl": priceByFinish["Pearl"]["20L"],
    },
    price: priceByFinish["Low Sheen"]["20L"],
    originalPrice: 15600,
  },
];

export const interiorLatexPaintDetail = {
  id: "Interior-Latex-Paint",
  slug: "Interior-Latex-Paint",
  name: "Calyco Interior Latex Paint",
  image: "/Assets/Nova/1-main.png",
  brand: "Calyco",
  category: "Interior",
  rating: 4.9,
  reviewCount: 12,
  description:
    "Ultra premium interior paint, the only choice for unparalleled color and stunning beauty that lasts.",
  details:
    "Trusted by discerning designers and homeowners alike, Calyco Interior Latex Paint delivers breathtaking colour with unmatched quality.",
  shortDescription:
    "Vibrant, high-pigment colour. Ultra-low VOC. Water-based for safer, smarter living.",
  tagline: "Ultra premium interior paint, the only choice for unparalleled color and stunning beauty that lasts.",
  microCopy: "Low VOC  Designer-grade color  Superior Coverage",
  keyBenefits: [
    "High-Pigment Colour for vibrant, lasting results",
    "Superior Coverage minimizes coats needed",
    "Scrub-Resistant finish stands up to cleaning",
    "Ultra-low VOC for healthier indoor air"
  ],
  features: [
    "Burnish and scuff resistant",
    "Low VOC",
    "Unbeatable hide",
    "Designer-grade color"
  ],
  finishes: [
    {
      name: "Low Sheen",
      description:
        "Soft, elegant finish perfect for living spaces, bedrooms, and dining rooms.",
      price: priceByFinish["Low Sheen"]["1L"],
    },
    {
      name: "Pearl",
      description:
        "Subtle luster adds depth and sophistication to any interior wall.",
      price: priceByFinish["Pearl"]["1L"],
    },
  ],
  defaultFinish: "Low Sheen",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: INTERIOR_LATEX_VARIANT_MAP,
  sizes,
  coveragePerLitre: 11,
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Interior wall painting",
    "plaster",
    "drywall",
    "wood",
    "masonry",
    "metal"
  ],
  applicationInstructions:
    "Apply with brush, roller, or sprayer. Ensure surface is clean, dry, and properly primed if needed.",
  preparation:
    "Clean dry surface, primed if needed. Remove dust, grease, and loose paint.",
  base_type: "Water-based acrylic emulsion",
  voc_content: "< 35 g/L (Low VOC)",
  coverage: "140-180 sq.ft./L/coat",
  coats_required: "2 coats",
  drying_time: "Touch dry: 1 hour",
  recoat_time: "2-4 hours",
  temperature_range: "10°C–35°C",
  humidity_range: "Under 80% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place, avoid freezing. Store between 5°C – 40°C.",
  application_instructions: "Apply with brush, roller, or sprayer. Stir thoroughly before use.",
  preparation_instructions: "Clean dry surface, primed if needed. Remove dust, grease, and loose paint.",
  recommended_uses: ["Walls & Ceilings: Ideal for plaster, POP, and drywall surfaces"],
  substrate: ["Drywall", "Plaster", "Wood", "Masonry", "Metal"],
  finish_type_sheen: ["Low Sheen", "Pearl"],
  advantages: [
    "High-Pigment Colour for stunning, vibrant results",
    "Superior Coverage reduces application time and costs",
    "Scrub-Resistant finish withstands daily wear and tear",
    "Ultra-low VOC content for safer indoor environments"
  ],
  technicalSpecs: {
    product_code: "CAL-00135",
    base: "Proprietary Acrylic Dispersion",
    base_type: "Water-based acrylic emulsion",
    vehicle_type: "Water-based acrylic emulsion",
    dryingTime: "Touch dry: 1 hour | Recoat: 2-4 hours | Full cure: 24 hours",
    thinning: "Not recommended; use as-is for best results",
    recoatTime: "2-4 hours",
    volume_solids: "Approx. 35%",
    voc_content: "< 35 g/L (Low VOC)",
    pH: "7-8.5",
    weight_per_volume: "~1.26 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with brush, roller, or sprayer. Ensure surface is clean, dry, and properly primed if needed.",
    preparation_instructions: "Surface must be clean, dry, and free from dust, grease, loose paint. Prime new surfaces.",
    temperature_range: "10°C–35°C",
    humidity_range: "Under 80% RH",
    cleanup: "Soap and Water immediately after use",
    storage_instructions: "Store in cool dry place, avoid freezing",
  },
  safety_warnings: {
    signal_word: "Warning",
    hazard_statements: [
      "H319: Causes serious eye irritation",
      "H332: Harmful if inhaled",
      "H351: Suspected of causing cancer"
    ],
    precautionary_statements: [
      "P261: Avoid breathing dust/fume/gas/mist/vapours/spray",
      "P264: Wash exposed skin thoroughly after handling",
      "P271: Use only outdoors or in a well-ventilated area",
      "P280: Wear protective gloves/eye protection/face protection",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses if present and easy to do. Continue rinsing",
      "P312: Call a POISON CENTER or doctor if you feel unwell"
    ],
    first_aid: {
      eye_contact: "Rinse immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.",
      skin_contact: "Wash with soap and water. If irritation develops, seek medical attention.",
      inhalation: "Move to fresh air. If symptoms persist, seek medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth with water. Seek medical attention immediately."
    }
  },
  safety_precautions: "Gloves recommended, ventilated area. Wear protective gloves and eye protection during application.",
  documents: {
    tds: "/Assets/docs/interior-latex-paint-tds.pdf",
    sds: "/Assets/docs/interior-latex-paint-sds.pdf",
    warranty: "/Assets/docs/interior-latex-paint-warranty.pdf",
  },
  warranty: "5 years",
  packaging: ["1L", "4L", "10L", "20L"],
  bucketImage: "/Assets/Nova/1-main.png",
  images: [
    "/Assets/Nova/1-main.png",
    "/Assets/Nova/1.png",
    "/Assets/Nova/2.png",
    "/Assets/Nova/3.png",
    "/Assets/Nova/4.png",
    "/Assets/Nova/5.png",
    "/Assets/Nova/6.png",
    "/Assets/Nova/7.png"
  ],
  seo: {
    title: "Interior Latex Paint | Premium Interior Wall Paint | Calyco",
    description:
      "Calyco Interior Latex Paint delivers stunning, vibrant colors with superior coverage. Ultra-low VOC, scrub-resistant, designer-grade finish for your home.",
    keywords:
      "interior paint, latex paint, low voc paint, designer paint, interior wall paint",
  },
};

export default interiorLatexPaintDetail;
