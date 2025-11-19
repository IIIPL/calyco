const CALYCO_PRIMER_EXTERIOR_VARIANT_MAP = {
  "1L-Matte": "gid://shopify/ProductVariant/TBD005",
  "4L-Matte": "gid://shopify/ProductVariant/TBD006",
  "10L-Matte": "gid://shopify/ProductVariant/TBD007",
  "20L-Matte": "gid://shopify/ProductVariant/TBD008"
};

const priceByFinish = {
  "Matte": {
    "1L": 450,
    "4L": 1600,
    "10L": 3800,
    "20L": 7500
  }
};

const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["1L"]
    },
    price: priceByFinish["Matte"]["1L"],
    originalPrice: 600,
  },
  {
    size: "4L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["4L"]
    },
    price: priceByFinish["Matte"]["4L"],
    originalPrice: 2100,
  },
  {
    size: "10L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["10L"]
    },
    price: priceByFinish["Matte"]["10L"],
    originalPrice: 4800,
  },
  {
    size: "20L",
    priceByFinish: {
      "Matte": priceByFinish["Matte"]["20L"]
    },
    price: priceByFinish["Matte"]["20L"],
    originalPrice: 9500,
  }
];

export const calycoPrimerExteriorDetail = {
  id: "CalycoPrimerExterior",
  slug: "calyco-primer-exterior",
  name: "Calyco Primer (Exterior)",
  image: "/Assets/Product Images/Primer/exterior-primer.webp",
  brand: "Calyco",
  category: "Primer",
  type: "exterior",
  rating: 4.8,
  reviewCount: 0,
  description:
    "High-bond primer for exterior surfaces. Alkali-resistant, UV-stable, and moisture-resistant for cement walls and exterior plaster.",
  details:
    "Calyco Primer (Exterior) is built for Indian weather conditions, offering strong adhesion and long-term protection against alkali, moisture, and UV damage. It penetrates deeply into porous exterior surfaces, sealing them effectively and enabling superior bonding with exterior emulsion topcoats. The water-based formulation provides balanced drying and a smooth application experience.",
  shortDescription:
    "A durable exterior primer designed to resist alkali, weather, and UV exposure. It forms a tough, sealing base that enhances topcoat adhesion and extends exterior paint life.",
  tagline: "Strong adhesion and weather-ready protection for every exterior wall",
  microCopy: "Strong Weather Resistance • Superior Adhesion • Seals Porous Surfaces",
  keyBenefits: [
    "Enhances adhesion for long-lasting exterior topcoats",
    "Provides weather-resistant, alkali-resistant protection",
    "Seals porous surfaces for uniform finish",
    "Improves durability and lifespan of exterior paints"
  ],
  features: [
    "High adhesion exterior formulation",
    "Weather-resistant sealing",
    "Alkali-resistant performance",
    "Smooth and easy application"
  ],
  finishes: [
    {
      name: "Matte",
      description:
        "Durable matte finish designed for exterior surfaces exposed to weather.",
      price: priceByFinish["Matte"]["1L"],
    },
  ],
  defaultFinish: "Matte",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: CALYCO_PRIMER_EXTERIOR_VARIANT_MAP,
  sizes,
  coveragePerLite: 12,
  coatsOptions: [1],
  defaultCoats: 1,
  efficiency: 0.9,
  application: [
    "Exterior wall priming",
    "cement plaster",
    "exterior masonry",
    "concrete",
    "stucco",
    "brickwork"
  ],
  applicationInstructions:
    "Apply with brush, roller, or spray. Stir thoroughly before use. Dilute with up to 20% water for first coat on highly porous surfaces.",
  preparation:
    "Ensure surface is dry, clean and free from dust, grease, loose paint and efflorescence. Allow new plaster to cure for at least 28 days.",
  base_type: "Water-based acrylic emulsion",
  voc_content: "< 40 g/L (Low VOC)",
  coverage: "130-150 sq.ft./L/coat",
  coats_required: "1 coat",
  drying_time: "Surface dry: 30-45 minutes",
  recoat_time: "4 hours",
  full_cure_time: "24 hours",
  temperature_range: "10°C–35°C",
  humidity_range: "Under 80% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place between 5°C–40°C. Avoid freezing. Keep container tightly closed.",
  application_instructions: "Apply with brush, roller, or sprayer. Dilute with clean water (up to 20%) for first coat on porous surfaces.",
  preparation_instructions: "Surface must be dry, clean and free from dust, grease and efflorescence. Allow new cement plaster to cure for 28 days. Treat fungal growth before priming.",
  recommended_uses: [
    "Exterior walls and facades",
    "New cement plaster",
    "Previously painted exterior surfaces",
    "Concrete and masonry structures"
  ],
  substrate: ["Cement Plaster", "Concrete", "Masonry", "Stucco", "Brickwork", "Asbestos"],

  finish_type_sheen: ["Matte"],

  advantages: [
    "Alkali Resistant - Prevents efflorescence and peeling on cement surfaces",
    "UV Stable - Pigments resist fading from harsh sunlight",
    "Moisture Resistant - Creates barrier against rain and humidity",
    "Weather Proof - Engineered for Indian monsoon and summer conditions",
    "Superior Adhesion - High-bond formula ensures long-lasting topcoat performance"
  ],
  technicalSpecs: {
    product_code: "CAL-PRI-EXT-002",
    base: "Proprietary Acrylic Dispersion",
    base_type: "Water-based acrylic emulsion",
    vehicle_type: "Water-based acrylic emulsion",
    dryingTime: "Surface dry: 30-45 minutes | Recoat: 4 hours | Full cure: 24 hours",
    thinning: "Up to 20% water for first coat on highly porous surfaces",
    recoatTime: "4 hours",
    volume_solids: "Approx. 38%",
    voc_content: "< 40 g/L (Low VOC)",
    pH: "7.5-8.5",
    weight_per_volume: "~1.28 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with brush, roller, or sprayer. Ensure surface is clean, dry, and properly cured.",
    preparation_instructions: "Surface must be dry and free from dust, grease, efflorescence. Allow new plaster to cure for 28 days. Remove fungal growth.",
    temperature_range: "10°C–35°C",
    humidity_range: "Under 80% RH",
    cleanup: "Soap and water immediately after use",
    storage_instructions: "Store in cool dry place, avoid freezing and extreme heat",
  },
  safety_warnings: {
    signal_word: "Caution",
    hazard_statements: [
      "May cause eye irritation",
      "Keep out of reach of children"
    ],
    precautionary_statements: [
      "Use in well-ventilated area",
      "Wear protective gloves and eye protection",
      "Avoid contact with eyes and skin",
      "Do not apply in humid or rainy conditions",
      "Keep out of reach of children",
      "Wash hands thoroughly after handling"
    ],
    first_aid: {
      eye_contact: "Rinse immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.",
      skin_contact: "Wash thoroughly with soap and water. If irritation develops, seek medical attention.",
      inhalation: "Move to fresh air immediately. If breathing difficulties persist, seek medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth with water. Seek medical attention immediately."
    }
  },
  safety_precautions: "Use in well-ventilated area. Wear protective gloves and eye protection. Do not apply during rain or high humidity.",
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

  bucketImage: "/Assets/Product Images/Primer/exterior-primer.webp",
  images: [
    "/Assets/Product Images/Primer/exterior-primer.webp"
  ],
  seo: {
    title: "Calyco Exterior Primer | Weather-Resistant Wall Primer | Calyco",
    description:
      "Calyco Exterior Primer offers alkali-resistant, UV-stable protection for exterior walls. High-bond formula withstands weather and prevents efflorescence.",
    keywords:
      "exterior primer, outdoor primer, alkali resistant primer, weather proof primer, exterior wall primer, cement primer, masonry primer, UV resistant primer",
  },
};

export default calycoPrimerExteriorDetail;
