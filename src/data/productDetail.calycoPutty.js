const CALYCO_PUTTY_VARIANT_MAP = {
  "5kg-Smooth": "gid://shopify/ProductVariant/TBD009",
  "20kg-Smooth": "gid://shopify/ProductVariant/TBD010"
};

const priceByFinish = {
  "Smooth": {
    "5kg": 375,
    "20kg": 1400
  }
};

const sizes = [
  {
    size: "5kg",
    priceByFinish: {
      "Smooth": priceByFinish["Smooth"]["5kg"]
    },
    price: priceByFinish["Smooth"]["5kg"],
    originalPrice: 480,
  },
  {
    size: "20kg",
    priceByFinish: {
      "Smooth": priceByFinish["Smooth"]["20kg"]
    },
    price: priceByFinish["Smooth"]["20kg"],
    originalPrice: 1800,
  }
];

export const calycoPuttyDetail = {
  id: "CalycoPutty",
  slug: "calyco-putty",
  name: "Calyco Putty",
  image: "/Assets/Product Images/Putty/putty.webp",
  brand: "Calyco",
  category: "Putty",
  type: "wall-filler",
  rating: 4.7,
  reviewCount: 0,
  description:
    "White cement-based putty for leveling walls. Smooths undulations, excellent sanding properties, and strong adhesion for interior and exterior walls.",
  details:
    "Calyco Acrylic Wall Putty is a high-performance water-based putty formulated for superior smoothness, high whiteness, and excellent bonding. It minimizes surface undulations, fills minor cracks, and provides a durable base for any paint system. Ideal for both interior and exterior surfaces, it sands easily and offers long-term stability.",
  shortDescription:
    "Premium acrylic putty engineered for smoothness, strong adhesion, crack resistance, and high whiteness. Creates a flawless surface for interior and exterior painting.",
  tagline: "A smooth, strong and bright finish that prepares your walls for perfection",
  microCopy: "Smooth Bright Finish • Crack-Resistant Formulation • Strong Adhesion",
  keyBenefits: [
    "Provides a smooth and uniform painting surface",
    "High whiteness enhances topcoat finish",
    "Crack-resistant formula improves wall strength",
    "Strong adhesion for long-lasting durability"
  ],
  features: [
    "Smooth high-whiteness finish",
    "Excellent adhesion",
    "Crack-resistant formula",
    "Water-based, easy to apply"
  ],
  finishes: [
    {
      name: "Smooth",
      description:
        "Ultra-smooth finish that creates the perfect base for topcoat paints.",
      price: priceByFinish["Smooth"]["5kg"],
    },
  ],
  defaultFinish: "Smooth",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: CALYCO_PUTTY_VARIANT_MAP,
  sizes,
  coveragePerKg: 1.9, // sq meters per kg for 2 coats (approx 20 sq ft)
  coatsOptions: [2],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Wall leveling and filling",
    "plaster",
    "concrete",
    "brickwork",
    "asbestos sheets",
    "interior and exterior walls"
  ],
  applicationInstructions:
    "Apply with putty knife or trowel. Mix putty powder with clean water to paste consistency. Apply first coat to fill imperfections; allow to dry 6-8 hours; sand lightly; apply second coat.",
  preparation:
    "Surface must be clean, dry and free from dust, grease and loose particles. Remove all flaking paint. Ensure surface is structurally sound.",
  base_type: "White cement-polymer blend",
  voc_content: "Zero (cement-based)",
  coverage: "20-22 sq.ft./kg for 2 coats",
  coats_required: "2 coats",
  drying_time: "Touch dry: 2-3 hours",
  recoat_time: "6-8 hours per coat",
  full_cure_time: "24 hours after final coat",
  temperature_range: "10°C–35°C",
  humidity_range: "Under 80% RH",
  cleanup: "Clean water",
  storage_instructions: "Store in cool dry place off the ground. Keep bags sealed and away from moisture. Use within 12 months of manufacture.",
  application_instructions: "Mix putty powder with clean water to smooth paste. Apply first coat with putty knife; allow 6-8 hours drying; sand lightly; apply second coat.",
  preparation_instructions: "Surface must be clean, dry and free from dust and grease. Fill large cracks separately. Remove loose and flaking material.",
  recommended_uses: [
    "Filling and leveling interior walls",
    "Smoothing exterior walls and ceilings",
    "Repairing cracks and imperfections",
    "Creating smooth base before painting"
  ],
  substrate: ["Plaster", "Concrete", "Brickwork", "Asbestos sheets", "Cement surfaces"],

  finish_type_sheen: ["Smooth"],

  advantages: [
    "Superior Smoothness - Creates ultra-smooth walls with excellent finish",
    "Excellent Sanding - Easy to sand for perfect leveling",
    "Strong Adhesion - Bonds firmly to plaster, concrete and brick",
    "Water Resistant - Polymer formulation resists moisture penetration",
    "Minimal Shrinkage - Maintains integrity without cracking or peeling"
  ],
  technicalSpecs: {
    product_code: "CAL-PUTTY-001",
    base: "White cement with polymer additives",
    base_type: "White cement-polymer blend",
    vehicle_type: "Powder (mix with water)",
    dryingTime: "Touch dry: 2-3 hours | Recoat: 6-8 hours | Full cure: 24 hours after final coat",
    thinning: "Mix with clean water to smooth paste consistency",
    recoatTime: "6-8 hours between coats",
    volume_solids: "N/A (cement-based powder)",
    voc_content: "Zero (cement-based)",
    pH: "10-12 (alkaline)",
    weight_per_volume: "Approx. 1.6 kg/L when mixed",
    shelf_life: "12 months in sealed bags",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with putty knife or trowel in thin, even layers. Allow proper drying between coats.",
    preparation_instructions: "Surface must be clean, dry and structurally sound. Remove dust, grease and loose material. Fill large cracks separately.",
    temperature_range: "10°C–35°C",
    humidity_range: "Under 80% RH",
    cleanup: "Clean tools with water immediately after use",
    storage_instructions: "Store in cool dry place off the ground, away from moisture",
  },
  safety_warnings: {
    signal_word: "Warning",
    hazard_statements: [
      "Causes skin irritation",
      "Causes serious eye irritation",
      "May cause respiratory irritation (dust)",
      "Keep out of reach of children"
    ],
    precautionary_statements: [
      "Wear dust mask while mixing powder",
      "Wear protective gloves and eye protection",
      "Avoid inhaling dust",
      "Avoid contact with eyes and skin",
      "Work in well-ventilated area",
      "Keep out of reach of children",
      "Wash hands thoroughly after handling"
    ],
    first_aid: {
      eye_contact: "Rinse immediately with plenty of water for at least 15 minutes. Remove contact lenses if present. Seek medical attention if irritation persists.",
      skin_contact: "Wash thoroughly with soap and water. If irritation develops, seek medical attention.",
      inhalation: "Move to fresh air immediately. If inhaled dust causes discomfort, seek medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth with water. Seek medical attention immediately."
    }
  },
  safety_precautions: "Wear dust mask while mixing. Use protective gloves and eye protection during application. Work in well-ventilated area.",
  documents: {
    tds: null,
    sds: null,
    warranty: null,
  },
  warranty: "3 years",

  packaging: [
    "5kg",
    "20kg"
  ],

  bucketImage: "/Assets/Product Images/Putty/putty.webp",
  images: [
    "/Assets/Product Images/Putty/putty.webp"
  ],
  seo: {
    title: "Calyco Wall Putty | Premium White Cement Putty | Calyco",
    description:
      "Calyco Putty provides superior smoothness and strong adhesion for interior and exterior walls. White cement-based formula with excellent sanding properties.",
    keywords:
      "wall putty, white cement putty, wall filler, acrylic wall putty, interior putty, exterior putty, wall leveling putty, smooth wall putty",
  },
};

export default calycoPuttyDetail;
