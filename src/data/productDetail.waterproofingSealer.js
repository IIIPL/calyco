// 🔧 UPDATED: Waterproofing Sealer with Swatch Card + Sample Pot variants

const WATERPROOFING_SEALER_VARIANT_MAP = {
  "1L-Matte Finish": "gid://shopify/ProductVariant/42638016217206",
  "4L-Matte Finish": "gid://shopify/ProductVariant/42638016282742",
  "10L-Matte Finish": "gid://shopify/ProductVariant/42638016348278",
  "20L-Matte Finish": "gid://shopify/ProductVariant/42638016413814",
  "Swatch Card-Matte Finish": "gid://shopify/ProductVariant/42663763017846",
  "SamplePot 200ml-Matte Finish": "gid://shopify/ProductVariant/42663763050614"
};

const priceByFinish = {
  "Matte Finish": {
    "1L": 600,
    "4L": 2200,
    "10L": 4100,
    "20L": 8000,
    "Swatch Card": 99,
    "SamplePot 200ml": 199
  }
};

// 🔧 UPDATED: Sizes array with sample variants in correct order (after 20L)
const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["1L"]
    },
    price: priceByFinish["Matte Finish"]["1L"],
    originalPrice: 700,
  },
  {
    size: "4L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["4L"]
    },
    price: priceByFinish["Matte Finish"]["4L"],
    originalPrice: 2700,
  },
  {
    size: "10L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["10L"]
    },
    price: priceByFinish["Matte Finish"]["10L"],
    originalPrice: 6500,
  },
  {
    size: "20L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["20L"]
    },
    price: priceByFinish["Matte Finish"]["20L"],
    originalPrice: 12800,
  },
  {
    size: "Swatch Card",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["Swatch Card"]
    },
    price: priceByFinish["Matte Finish"]["Swatch Card"],
    originalPrice: 150,
    description: "Color swatch card for quick shade checks",
  },
  {
    size: "SamplePot 200ml",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["SamplePot 200ml"]
    },
    price: priceByFinish["Matte Finish"]["SamplePot 200ml"],
    originalPrice: 250,
    description: "Small sample size for color testing",
  }
];

export const waterproofingSealerDetail = {
  id: "waterproofing-sealer",
  slug: "waterproofing-sealer",
  name: "Calyco Waterproofing Sealer",
  image: "/Assets/Product Images/Waterproof Sealer/1.webp",
  brand: "Calyco",
  category: "Waterproofing",
  rating: 4.8,
  reviewCount: 5,
  description:
    "Flexible, breathable waterproofing membrane that locks out moisture while resisting UV degradation, fungal growth, and hairline cracking across demanding interior or exterior surfaces.",
  details:
    "Formulated from an advanced water-based acrylic elastomer, Calyco Waterproofing Sealer bridges cracks up to 1 mm, adheres tenaciously to concrete, masonry, metal, timber, tile, and asphalt, and maintains long-term weatherproof protection without trapping vapour. The breathable film mitigates blistering, while fungicides and UV blockers preserve integrity in exposed environments.",
  shortDescription:
    "Breathable, crack-bridging waterproof membrane engineered for terraces, facades, planter boxes, and high-moisture interiors.",
  microCopy: "Low VOC  Breathable barrier  Crack-bridging 1 mm",
  keyBenefits: [
    "Bridges hairline cracks up to 1 mm",
    "Breathable barrier prevents trapped moisture blisters",
    "Low-VOC, low-odor water-based chemistry",
    "UV and fungal resistant for long-term exterior exposure",
  ],
  features: [
    "Crack-bridging elastomeric membrane",
    "Waterproof UV-stable protection",
    "Vapour-permeable breathable film",
    "Multi-surface adhesion: concrete, metal, wood, tile",
  ],
  finishes: [
    {
      name: "Matte Finish",
      description:
        "Dead-flat breathable finish that accepts clear or tinted topcoats while maintaining a monolithic waterproof barrier.",
      price: priceByFinish["Matte Finish"]["1L"],
    },
  ],
  defaultFinish: "Matte Finish",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: WATERPROOFING_SEALER_VARIANT_MAP,
  sizes,
  coveragePerLitre: 9,
  coatsOptions: [1, 2, 3],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Concrete terraces and parapet walls",
    "Exterior masonry, stucco, and plaster",
    "Planter boxes and retaining walls",
    "Wet areas, basements, and splash zones",
    "Timber decks, fascia, and trims",
    "Metal roofing and flashings with suitable primer",
  ],
  applicationInstructions:
    "Stir thoroughly before and during use. Apply two uniform coats by brush, roller, or airless spray, allowing a minimum of 4 hours between coats. Reinforce joints, corners, and cracks with polyester mesh and sealant as detailed in the Technical Data Sheet. For very porous substrates, prime with a thinned first coat or Calyco Acrylic Sealer.",
  preparation:
    "Surfaces must be clean, dry (less than 5 percent moisture), structurally sound, and free from laitance, efflorescence, grease, and previous failing coatings. Repair cracks wider than 1 mm with compatible elastomeric filler and allow curing before application.",
  base_type: "Water-based acrylic elastomer",
  voc_content: "Below 45 g/L",
  coverage: "85-110 sq. ft. per litre per coat",
  coats_required: "2 full coats recommended",
  drying_time: "Touch dry 60 minutes at 25°C",
  recoat_time: "4-6 hours at 25°C and 60% RH",
  temperature_range: "15°C - 40°C application temperature",
  humidity_range: "Below 80% relative humidity",
  cleanup: "Soap and water immediately after use",
  storage_instructions: "Store indoors between 10°C and 38°C, protect from frost",
  application_instructions: "Apply by brush, 3/8\" nap roller, or airless spray. Stir thoroughly before use. Apply two uniform coats perpendicular to each other.",
  preparation_instructions: "Surfaces must be clean, dry (less than 5% moisture), structurally sound. Remove laitance, efflorescence, grease, and previous failing coatings.",
  recommended_uses: ["Terraces", "Parapets", "Wet areas", "Decks", "Planter boxes", "Retaining walls"],
  substrate: ["Concrete", "Masonry", "Plaster", "Wood", "Metal", "Tile", "Asphalt"],
  finish_type_sheen: ["Matte Finish"],
  advantages: [
    "Bridges hairline cracks up to 1 mm for long-term protection",
    "Breathable barrier prevents blistering from trapped moisture",
    "Excellent UV stability with accelerated weathering resistance",
    "Resists fungal and algal growth due to in-film preservatives",
    "Low-VOC formula suitable for occupied spaces",
    "Multi-surface adhesion on concrete, metal, wood, and tile"
  ],
  technicalSpecs: {
    base: "Water-based acrylic elastomer",
    base_type: "Water-based acrylic elastomer",
    dryingTime: "Touch dry 60 minutes at 25°C, recoat after 4-6 hours",
    thinning: "Brush/Roller: up to 5% clean water; Airless spray: up to 10%",
    recoatTime: "4-6 hours at 25°C and 60% RH",
    volume_solids: "Approx. 52% by volume",
    voc_content: "Below 45 g/L",
    pH: "8.0 +/- 0.5",
    shelf_life: "24 months in unopened container",
    storage_temp: "10°C - 38°C",
    application_instructions: "Stir thoroughly before use. Apply by brush, roller, or airless spray (0.021\" tip, 2000 psi). Apply second coat perpendicular to first for uniform film build.",
    preparation_instructions: "Substrate must be structurally sound, clean, and dry (moisture under 5%). Remove laitance, dust, grease, salts, fungal growth, loose paint. Treat cracks greater than 1 mm with elastomeric crack paste.",
    temperature_range: "15°C - 40°C",
    humidity_range: "Below 80% RH",
    cleanup: "Soap and water immediately after use. Do not discharge wash water to drains or waterways.",
    storage_instructions: "Store indoors between 10°C and 38°C. Protect from frost and direct sunlight.",
    wet_film_thickness: "10-12 mils per coat",
    dry_film_thickness: "120-150 microns over 2 coats",
    foot_traffic: "After 24 hours",
    full_cure: "7 days",
  },
  safety_warnings: {
    signal_word: "WARNING",
    hazard_statements: [
      "H315 - Causes skin irritation",
      "H319 - Causes serious eye irritation",
      "H335 - May cause respiratory irritation"
    ],
    precautionary_statements: [
      "P261 - Avoid breathing mist or spray. Use only with adequate ventilation",
      "P264 - Wash hands, face, and exposed skin thoroughly after handling",
      "P271 - Use only outdoors or in well-ventilated area",
      "P280 - Wear protective gloves, safety goggles, and suitable protective clothing",
      "P312 - Call a POISON CENTER or doctor/physician if you feel unwell"
    ],
    first_aid: {
      eye_contact: "Rinse cautiously with water for several minutes. Remove contact lenses if present. Continue rinsing. Seek medical attention if irritation persists.",
      skin_contact: "Wash with soap and water. Remove contaminated clothing and launder before reuse. Seek medical attention if irritation develops.",
      inhalation: "Move person to fresh air. Keep at rest in position comfortable for breathing. Seek medical advice if symptoms occur.",
      ingestion: "Rinse mouth. Do NOT induce vomiting. Seek medical attention immediately."
    }
  },
  safety_precautions: "Wear nitrile gloves, safety goggles, and long sleeves during application. Provide local exhaust ventilation for enclosed areas. Do not ingest product.",
  documents: {
    tds: "/Assets/docs/html-templates/waterproofing-sealer-tds.html",
    sds: "/Assets/docs/html-templates/waterproofing-sealer-sds.html",
    warranty: "/Assets/docs/waterproof-sealer-warranty.pdf",
  },
  specs: {
    "Application & Surface Prep": [
      "Ensure moisture content is below 5 percent before coating.",
      "Remove loose material, laitance, and previous peeling coatings mechanically.",
      "Treat cracks exceeding 1 mm with elastomeric crack paste and embed polyester tape over movement joints.",
      "Prime highly porous substrates with a diluted first coat (up to 5 percent water) or Calyco Acrylic Sealer.",
      "Mask adjacent surfaces and protect drainage points prior to application.",
    ],
    "Coverage & Drying": [
      "Coverage: 85-110 sq. ft. per litre per coat depending on substrate profile.",
      "Recommended film build: minimum 2 coats, cross-rolled for uniform thickness.",
      "Touch dry in 60 minutes; allow 4-6 hours between coats under standard conditions.",
      "Full waterproof cure achieved after 7 days at 25 degC.",
      "Do not apply when substrate temperature is below 15 degC or ambient RH exceeds 80 percent.",
    ],
    "Performance & Compliance": [
      "Elongation at break > 250 percent after full cure.",
      "Excellent UV stability with accelerated weathering resistance.",
      "Resists fungal and algal growth due to in-film preservatives.",
      "Breathable membrane prevents osmotic blistering on damp surfaces.",
      "Complies with ASTM C836 liquid-applied waterproofing membrane requirements.",
    ],
    "Safety & Handling": [
      "Wear nitrile gloves, safety goggles, and long sleeves during application.",
      "Avoid inhalation of spray mist; provide local exhaust ventilation for enclosed areas.",
      "In case of skin contact, wash with soap and water. For eye contact, rinse for 15 minutes and seek medical attention.",
      "Do not ingest. If swallowed, rinse mouth and obtain medical advice immediately.",
      "Refer to the Safety Data Sheet for complete hazard and first-aid information.",
    ],
    "Storage & Disposal": [
      "Store sealed containers between 10 and 38 degC, away from direct sunlight and frost.",
      "Do not allow product to freeze. Maintain upright storage to prevent leakage.",
      "Shelf life: 24 months in original, unopened packaging.",
      "Dispose of wash water and empty containers in accordance with local regulations.",
      "Do not discharge liquid waste into storm drains or natural waterways.",
    ],
  },
  compatibleColors: [
    { name: "Storm Slate", hex: "#5F6369", slug: "storm-slate" },
    { name: "Salt Stone", hex: "#D9D3C5", slug: "salt-stone" },
    { name: "Terracotta Roof", hex: "#A64E24", slug: "terracotta-roof" },
    { name: "Tropical Green", hex: "#3D6A5B", slug: "tropical-green" },
  ],
  relatedProducts: [],
  warranty: "5-year waterproofing guarantee when applied as per TDS.",
  
  // 🔧 UPDATED: Added sample variants in correct order
  packaging: [
    "1L",
    "4L",
    "10L",
    "20L",
    "Swatch Card",
    "SamplePot 200ml"
  ],
  
  bucketImage: "/Assets/Product Images/Waterproof Sealer/1.webp",
  images: [
    "/Assets/Product Images/Waterproof Sealer/1.webp"
  ],
  seo: {
    title: "Waterproofing Sealer | Elastomeric Waterproof Barrier | Calyco",
    description:
      "Calyco Waterproofing Sealer delivers a breathable, crack-bridging waterproof barrier for concrete, masonry, wood, and metal surfaces. Low VOC, UV stable, and backed by a 5-year warranty.",
    keywords:
      "waterproofing sealer, elastomeric coating, crack bridging, breathable waterproof membrane, low voc sealer",
  },
};

export default waterproofingSealerDetail;
