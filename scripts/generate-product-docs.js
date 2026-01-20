import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = [
  {
    slug: 'premium-interior-emulsion',
    name: 'Calyco Premium Interior Emulsion',
    subtitle: 'Ultra Premium Interior Paint | Low Sheen Finish | Designer-Grade Color',
    description: 'Calyco Premium Interior Emulsion is an ultra-premium water-based acrylic emulsion designed to deliver unparalleled color vibrancy and lasting beauty for discerning homeowners. This high-pigment formulation provides superior coverage with a sophisticated low sheen finish that is perfect for living spaces, bedrooms, and dining rooms.',
    details: 'Formulated with advanced acrylic resins and high-quality pigments, this premium paint offers excellent scrub resistance, burnish protection, and ultra-low VOC content for healthier indoor environments. The superior hiding power minimizes the number of coats needed while maintaining vibrant, lasting color depth.',
    productCode: 'CAL-PIE-001',
    baseType: 'Water-based acrylic emulsion',
    finish: 'Low Sheen',
    vocContent: '< 35 g/L (Low VOC)',
    coverage: '140-180 sq. ft. per litre per coat',
    coats: '2 coats',
    dryingTime: 'Touch dry: 1 hour | Recoat: 2-4 hours',
    tempRange: '10°C - 35°C',
    humidity: 'Below 80% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: 'Swatch Card, 200ml Sample Pot',
    keyFeatures: [
      'High-Pigment Colour for vibrant, lasting results',
      'Superior Coverage minimizes coats needed',
      'Scrub-Resistant finish stands up to cleaning',
      'Ultra-low VOC (< 35 g/L) for healthier indoor air',
      'Burnish and scuff resistant for high-traffic areas',
      'Designer-grade color accuracy and depth',
      'Water-based for easy cleanup and low odor'
    ],
    applications: [
      'Interior walls and ceilings',
      'Living rooms, bedrooms, dining rooms',
      'Plaster and drywall surfaces',
      'POP (Plaster of Paris) surfaces',
      'Previously painted masonry',
      'Wood and metal surfaces (with suitable primer)'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation',
      'H335 - May cause respiratory irritation'
    ],
    category: 'interior',
    warranty: '5-year warranty'
  },
  {
    slug: 'luxury-interior-emulsion',
    name: 'Calyco Luxury Interior Emulsion',
    subtitle: 'Premium Pearl Finish | Ultra-Low VOC | Luxury-Grade Elegance',
    description: 'Calyco Luxury Interior Emulsion is an exquisite luxury emulsion with a stunning pearl finish, engineered for discerning homeowners who demand unparalleled elegance and lasting beauty. This premium formulation creates sophisticated interiors with luxurious depth and luster.',
    details: 'Formulated with premium acrylic resins and pearl-effect pigments, this luxury paint offers superior washability, exceptional stain resistance, and ultra-low VOC content. The pearl finish adds sophisticated elegance while maintaining excellent durability and cleanability.',
    productCode: 'CAL-ILP-001',
    baseType: 'Premium water-based acrylic emulsion',
    finish: 'Pearl',
    vocContent: '< 35 g/L (Ultra-low VOC)',
    coverage: '140-180 sq. ft. per litre per coat',
    coats: '2 coats',
    dryingTime: 'Touch dry: 1 hour | Recoat: 2-4 hours',
    tempRange: '10°C - 35°C',
    humidity: 'Below 80% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: 'Swatch Card, 200ml Sample Pot',
    keyFeatures: [
      'Stunning Pearl Finish for luxurious, sophisticated interiors',
      'Superior Coverage with premium hiding power',
      'Ultra-Washable finish withstands frequent cleaning',
      'Ultra-low VOC for healthier luxury living',
      'Elegant pearl finish technology',
      'Superior stain resistance',
      'Premium washability and durability'
    ],
    applications: [
      'Luxury interior walls and ceilings',
      'Living rooms, master bedrooms, dining rooms',
      'Premium plaster and POP surfaces',
      'Drywall and gypsum board',
      'Previously painted masonry',
      'Wood and metal surfaces (with suitable primer)'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation',
      'H335 - May cause respiratory irritation'
    ],
    category: 'interior',
    warranty: '5-year warranty'
  },
  {
    slug: 'premium-exterior-emulsion',
    name: 'Calyco Premium Exterior Emulsion',
    subtitle: 'Premium Matte Finish | UV-Resistant | Weather-Proof Barrier',
    description: 'Calyco Premium Exterior Emulsion is a premium acrylic emulsion with a sophisticated matte finish, engineered to withstand intense sun, heavy rain, and humidity while maintaining vibrant color depth. Advanced UV blockers, breathable polymers, and mildew guards provide long-lasting protection.',
    details: 'Formulated with advanced weather-resistant acrylic resins and UV-blocking pigments, this premium exterior paint provides superior protection against fading, chalking, and fungal growth. The breathable formula allows moisture vapor to escape while keeping liquid water out.',
    productCode: 'CAL-PEE-001',
    baseType: 'Premium acrylic exterior emulsion',
    finish: 'Matte Finish',
    vocContent: '< 60 g/L (Low VOC)',
    coverage: '120-160 sq. ft. per litre per coat',
    coats: '2 coats',
    dryingTime: 'Touch dry: 45 minutes | Recoat: 4-6 hours',
    tempRange: '10°C - 40°C',
    humidity: 'Below 85% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: 'Swatch Card, 200ml Sample Pot',
    keyFeatures: [
      'Premium Matte Finish provides sophisticated, non-reflective elegance',
      'Advanced UV Protection prevents color fading and chalking',
      'Weather-Resistant Barrier withstands rain, humidity, and temperature extremes',
      'Anti-Fungal Technology prevents mildew and algae growth',
      'Premium matte finish technology',
      'Advanced UV-blocking pigments',
      'Hydrophobic weather seal'
    ],
    applications: [
      'Premium exterior walls and façades',
      'Stucco and masonry surfaces',
      'Brick and concrete surfaces',
      'Fiber cement boards',
      'Wood surfaces (with suitable primer)',
      'Architectural features and trims'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation',
      'H335 - May cause respiratory irritation'
    ],
    category: 'exterior',
    warranty: '7-year warranty'
  },
  {
    slug: 'luxury-exterior-emulsion',
    name: 'Calyco Luxury Exterior Emulsion',
    subtitle: 'High Sheen Finish | UV-Shielded | Luxury Brilliance',
    description: 'Calyco Luxury Exterior Emulsion is a premium high-sheen exterior emulsion for luxury façades. Advanced UV protection, weather-sealed durability, and algae resistance keep exteriors looking new longer with brilliant sheen that elevates façade appearance.',
    details: 'Formulated with UV-blocking pigments, hydrophobic binders, and anti-fungal additives, Luxury Exterior Emulsion delivers a rich, high-sheen façade with long-term color retention and easy-clean performance. The hydrophobic formula repels water while allowing vapor permeability.',
    productCode: 'CAL-ELP-001',
    baseType: 'Premium acrylic exterior emulsion',
    finish: 'High Sheen Finish',
    vocContent: '< 60 g/L (Low VOC)',
    coverage: '120-160 sq. ft. per litre per coat',
    coats: '2 coats',
    dryingTime: 'Touch dry: 45 minutes | Recoat: 4-6 hours',
    tempRange: '10°C - 40°C',
    humidity: 'Below 85% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: 'Swatch Card, 200ml Sample Pot',
    keyFeatures: [
      'High sheen finish elevates façade brilliance',
      'UV shield resists fading and chalking',
      'Weatherproof film withstands rain and humidity',
      'Anti-fungal protection resists mildew and algae',
      'High-sheen acrylic emulsion',
      'UV-blocking pigments',
      'Hydrophobic weather seal'
    ],
    applications: [
      'Luxury exterior walls and façades',
      'Architectural features and trims',
      'Stucco and masonry surfaces',
      'Brick and concrete surfaces',
      'Fiber cement boards',
      'Wood surfaces (with suitable primer)'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation',
      'H335 - May cause respiratory irritation'
    ],
    category: 'exterior',
    warranty: '7-year warranty'
  },
  {
    slug: 'calyco-water-primer-interior',
    name: 'Calyco Water Primer (Interior)',
    subtitle: 'High-Opacity Interior Primer | Superior Sealing | Excellent Adhesion',
    description: 'Calyco Water Primer (Interior) is a premium water-based acrylic primer designed for interior walls and ceilings with high opacity and excellent sealing properties. This professional-grade primer provides superior coverage and adhesion for all types of interior surfaces.',
    details: 'Formulated with high-quality acrylic resins and opacity enhancers, this primer seals porous surfaces, provides excellent key for topcoats, and improves paint coverage. The fast-drying formula allows for quick recoating and minimal odor for occupied spaces.',
    productCode: 'CAL-PRI-WB-INT-001',
    baseType: 'Water-based acrylic emulsion',
    finish: 'Matte',
    vocContent: '< 30 g/L (Ultra-low VOC)',
    coverage: '180-200 sq. ft. per litre',
    coats: '1-2 coats depending on surface',
    dryingTime: 'Touch dry: 30 minutes | Recoat: 4 hours',
    tempRange: '10°C - 35°C',
    humidity: 'Below 80% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: null,
    keyFeatures: [
      'High opacity for superior coverage',
      'Excellent sealing on porous surfaces',
      'Superior adhesion for topcoats',
      'Ultra-low VOC (< 30 g/L)',
      'Fast-drying for quick recoating',
      'Low odor for occupied spaces',
      'Water-based for easy cleanup'
    ],
    applications: [
      'Interior walls and ceilings',
      'Plaster and cement surfaces',
      'Putty surfaces',
      'Drywall and gypsum board',
      'Masonry and concrete',
      'Previously painted surfaces'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation'
    ],
    category: 'primer',
    warranty: '5-year warranty'
  },
  {
    slug: 'calyco-weather-primer-exterior',
    name: 'Calyco Weather Primer (Exterior)',
    subtitle: 'Weather-Resistant Exterior Primer | Alkali Protection | Superior Adhesion',
    description: 'Calyco Weather Primer (Exterior) is a high-opacity exterior wall primer designed to protect masonry from harsh weather and provide superior adhesion for topcoats. This professional-grade primer seals and protects exterior surfaces against moisture, alkali, and weathering.',
    details: 'Formulated with weather-resistant acrylic resins and alkali-resistant additives, this exterior primer provides excellent protection against efflorescence, moisture penetration, and UV degradation. The breathable formula allows moisture vapor to escape while providing a strong foundation for topcoats.',
    productCode: 'CAL-PRI-WB-EXT-002',
    baseType: 'Water-based acrylic emulsion',
    finish: 'Smooth',
    vocContent: '< 35 g/L (Low VOC)',
    coverage: '150-180 sq. ft. per litre',
    coats: '1-2 coats depending on surface',
    dryingTime: 'Touch dry: 30 minutes | Recoat: 4 hours',
    tempRange: '10°C - 40°C',
    humidity: 'Below 85% RH',
    shelfLife: '24 months in unopened container',
    storage: '5°C - 40°C (protect from freezing)',
    packaging: '1 Litre, 4 Litres, 10 Litres, 20 Litres',
    sampleSizes: null,
    keyFeatures: [
      'Weather-resistant formula for long-lasting protection',
      'Alkali-resistant for masonry surfaces',
      'High opacity for superior coverage',
      'Breathable film prevents moisture trapping',
      'UV protection for topcoat longevity',
      'Low VOC (< 35 g/L)',
      'Fast-drying for quick project completion'
    ],
    applications: [
      'Exterior walls and façades',
      'Cement plaster and concrete',
      'Brickwork and masonry',
      'Fibre cement boards',
      'Previously painted exterior surfaces',
      'New construction and renovation projects'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation'
    ],
    category: 'primer',
    warranty: '5-year warranty'
  },
  {
    slug: 'calyco-acrylic-wall-putty',
    name: 'Calyco Acrylic Wall Putty',
    subtitle: 'Premium Acrylic Putty | Exceptionally Smooth Finish | Strong Foundation',
    description: 'Calyco Acrylic Wall Putty is a premium acrylic-based wall putty that delivers an exceptionally smooth, white surface and strong foundation for paint. This professional-grade putty fills imperfections, cracks, and minor irregularities to create a flawless base for topcoats.',
    details: 'Formulated with high-quality acrylic polymers and fine fillers, this premium putty provides excellent adhesion, minimal shrinkage, and superior whiteness. The smooth, sandable finish ensures a perfect base for all types of paints while resisting cracking and peeling.',
    productCode: 'CAL-PUT-ACR-003',
    baseType: 'Water-based acrylic putty',
    finish: 'Smooth',
    vocContent: 'Low VOC',
    coverage: '28-35 sq. ft. per kg (for 2 coats)',
    coats: '2 coats recommended',
    dryingTime: 'Touch dry: 30 minutes | Recoat: 4 hours',
    tempRange: '10°C - 35°C',
    humidity: 'Below 80% RH',
    shelfLife: '12 months in unopened container',
    storage: '5°C - 35°C (protect from freezing)',
    packaging: '1 kg, 5 kg, 10 kg, 20 kg',
    sampleSizes: null,
    keyFeatures: [
      'Exceptionally smooth finish for flawless walls',
      'Superior whiteness enhances topcoat appearance',
      'Excellent adhesion to various substrates',
      'Minimal shrinkage and cracking',
      'Easy to sand for perfect finish',
      'Low VOC for safer application',
      'Strong foundation for all paint types'
    ],
    applications: [
      'Interior and exterior walls',
      'Plaster and cement surfaces',
      'Concrete and masonry',
      'Gypsum board and drywall',
      'Previously painted surfaces',
      'Ceilings and architectural elements'
    ],
    hazards: [
      'H315 - Causes skin irritation',
      'H319 - Causes serious eye irritation',
      'H335 - May cause respiratory irritation (dust)'
    ],
    category: 'putty',
    warranty: '8-year warranty'
  }
];

const industrialProducts = [
  {
    slug: 'calyco-anticorrosive-bitumastic',
    name: 'Calyco Anticorrosive Bitumastic Paint',
    subtitle: 'Superior anti-corrosive protection for metal structures.',
    description: 'Heavy-duty bitumen-based anti-corrosive coating providing exceptional protection for ferrous metals against corrosion, chemicals, and moisture. Its high-build formulation creates a tough, flexible barrier that withstands harsh industrial and marine environments.',
    details: 'Calyco Anticorrosive Bitumastic is an industrial-grade shield. Designed for the toughest environments, it is ideal for underground pipelines, storage tanks, and marine structures. The bitumen-modified rubber resin creates a thick, waterproof film that accommodates thermal expansion while blocking out corrosive elements.',
    productCode: 'CAL-BIT-010',
    baseType: 'Bitumen modified with rubber/resin',
    finish: 'Semi-Gloss',
    vocContent: '<= 350 g/L',
    coverage: '40-50 sq. ft. per litre per coat',
    coats: '2-3 coats (150-200 microns)',
    dryingTime: 'Touch dry: 12-18 hours | Recoat: 24-48 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '5 years in unopened container',
    storage: 'Cool, dry place (away from ignition sources)',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Heavy-Duty Corrosion Protection',
      'High Build & Waterproof',
      'Chemical & Acid Resistant',
      'Flexible Thermal Expansion',
      'Ideal for Underground Use'
    ],
    applications: [
      'Underground pipelines',
      'Storage tanks',
      'Structural steel',
      'Metal bridges',
      'Marine structures',
      'Industrial foundations'
    ],
    hazards: [
      'WARNING: FLAMMABLE & HARMFUL.',
      'Causes skin irritation and serious eye irritation.',
      'May cause drowsiness or dizziness (hydrocarbon vapours).'
    ],
    category: 'woodmetal',
    warranty: '5-year warranty'
  },
  {
    slug: 'calyco-epoxy-paint',
    name: 'Calyco Epoxy Paint',
    subtitle: 'Industrial-strength protection for demanding environments.',
    description: 'Two-component industrial epoxy coating system providing exceptional durability, chemical resistance, and abrasion resistance. Forms a hard, high-gloss impermeable film designed to withstand harsh chemicals, heavy traffic, and moisture in demanding environments.',
    details: 'Calyco Epoxy Paint is a professional-grade, 2-component system designed for floors, tanks, and machinery. It creates a seamless, non-porous surface that repels oils, acids, and water. Ideal for factories and garages, it offers superior hardness that resists tire marks, impacts, and heavy foot traffic.',
    productCode: 'CAL-EPX-012',
    baseType: 'Epoxy resin (2-component)',
    finish: 'High Gloss',
    vocContent: '<= 250 g/L',
    coverage: '80-120 sq. ft. per litre at 100 microns',
    coats: '2-3 coats (200-300 microns DFT)',
    dryingTime: 'Touch dry: 8-12 hours | Recoat: 12-24 hours | Full cure: 7 days',
    tempRange: '10-35 C',
    humidity: 'Below 80% RH',
    shelfLife: '5 years in sealed packs',
    storage: 'Cool, dry place (store components separately)',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      '2-Component System (Resin + Hardener)',
      'Ultra Durable & High Strength',
      'Chemical & Solvent Resistant',
      'Waterproof & Impermeable',
      'High Gloss Finish'
    ],
    applications: [
      'Industrial floors and warehouses',
      'Chemical storage and processing areas',
      'Parking garages and workshops',
      'Storage tanks and equipment'
    ],
    hazards: [
      'DANGER: HARMFUL if swallowed or inhaled.',
      'Causes skin irritation and may cause allergic skin reaction.',
      'Causes serious eye damage.'
    ],
    category: 'industrial',
    warranty: '5-year warranty'
  },
  {
    slug: 'calyco-fire-retardant-paint',
    name: 'Calyco Fire Retardant Paint',
    subtitle: 'Advanced fire protection for critical structures.',
    description: 'Advanced intumescent fire-retardant coating that swells when exposed to heat, forming an insulating char layer. It delays fire spread, reduces flame propagation, and provides up to 2 hours of crucial evacuation time for critical structures.',
    details: 'Calyco Fire Retardant Paint is a water-based intumescent acrylic coating designed for life safety. When exposed to extreme heat, the paint expands to create a thick, insulating foam barrier. This layer protects the structural integrity of steel and wood, delaying collapse and preventing the rapid spread of flames.',
    productCode: 'CAL-FRP-009',
    baseType: 'Water-based intumescent acrylic',
    finish: 'Matt',
    vocContent: '<= 80 g/L',
    coverage: '4-6 sq. ft. per litre per mm DFT',
    coats: '2-3 coats (per DFT calculation)',
    dryingTime: 'Touch dry: 6-8 hours | Recoat: 12-24 hours | Full cure: 7 days',
    tempRange: '5-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '5 years in unopened container',
    storage: 'Cool, dry place (protect from freezing)',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Intumescent (swells in heat)',
      'Up to 2-hour fire rating',
      'Delays flame spread',
      'Low smoke emission',
      'Structural integrity protection'
    ],
    applications: [
      'Steel structures',
      'Wooden structures',
      'Commercial buildings',
      'Industrial facilities'
    ],
    hazards: [
      'WARNING: Eye and skin irritant.',
      'May cause respiratory irritation if inhaled in enclosed spaces.',
      'Harmful to aquatic life if liquid paint enters drains.'
    ],
    category: 'woodmetal',
    warranty: '5-year warranty'
  },
  {
    slug: 'calyco-melamine-polish',
    name: 'Calyco Melamine Polish',
    subtitle: 'Premium furniture finish with lasting brilliance.',
    description: 'Premium melamine-based wood coating offering exceptional hardness, scratch resistance, and a brilliant high-gloss finish. Its fast-drying formulation creates a mirror-smooth surface that resists stains, heat, and daily wear.',
    details: 'Calyco Melamine Polish is the professional choice for interior woodwork. It provides a tough, durable barrier that protects against hot spills and scratches while enhancing the natural beauty of the wood grain. Perfect for tabletops, dining sets, and cabinetry requiring a glass-like finish.',
    productCode: 'CAL-MEL-008',
    baseType: 'Melamine resin',
    finish: 'High Gloss',
    vocContent: '<= 300 g/L',
    coverage: '100-120 sq. ft. per litre',
    coats: '2-3 coats',
    dryingTime: 'Touch dry: 30-45 minutes | Recoat: 4-6 hours | Full cure: 24-48 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place',
    packaging: '500ml, 1L, 4L, 10L',
    sampleSizes: null,
    keyFeatures: [
      'Brilliant high gloss finish',
      'Superior scratch resistance',
      'Heat resistant formula',
      'Fast drying',
      'Stain resistant protection'
    ],
    applications: [
      'Wooden furniture and cabinetry',
      'Kitchen cabinets and interior woodwork',
      'Dining tables and paneling',
      'Doors, frames, and wardrobes'
    ],
    hazards: [
      'DANGER: Highly flammable liquid and vapour.',
      'Causes serious eye irritation.',
      'May cause drowsiness or dizziness.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-pink-primer',
    name: 'Calyco Pink Primer',
    subtitle: 'Superior sealing and adhesion for wood surfaces.',
    description: 'Premium alkyd-based wood primer designed to seal knots, prevent tannin bleeding, and provide excellent adhesion for topcoats. Creates a smooth, uniform base that enhances finish coat appearance and durability on all wood surfaces.',
    details: 'Calyco Pink Primer is the ultimate foundation for wood. Its specialized alkyd formula penetrates deep to seal porous surfaces and lock in knots, preventing resin bleed-through. It ensures your topcoat adheres perfectly and lasts longer, whether used on interior furniture or exterior window frames.',
    productCode: 'CAL-PRM-001',
    baseType: 'Alkyd resin',
    finish: 'Matte',
    vocContent: '<= 200 g/L',
    coverage: '100-120 sq. ft. per litre',
    coats: '1-2 coats',
    dryingTime: 'Touch dry: 1-2 hours | Recoat: 4-6 hours | Full cure: 24 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place away from direct sunlight',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'High opacity and coverage',
      'Fast drying formula',
      'Seals knots effectively',
      'Strong adhesion to wood',
      'Low VOC content'
    ],
    applications: [
      'Doors and window frames',
      'Wooden furniture',
      'Plywood and MDF',
      'New and bare wood'
    ],
    hazards: [
      'FLAMMABLE: Keep away from heat, sparks, and open flames.',
      'Harmful if swallowed or inhaled.',
      'Causes skin and eye irritation.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-red-oxide-zinc-chromate',
    name: 'Calyco Red Oxide Zinc Chromate Primer',
    subtitle: 'Dual-pigment defence for metal longevity.',
    description: 'A solvent-based metal primer that harnesses the combined protection of red oxide and zinc chromate pigments. It provides powerful dual-action anti-corrosive protection for industrial, marine, and architectural metal applications.',
    details: 'Calyco Red Oxide Zinc Chromate Primer is the heavy-duty choice for iron and steel. By combining the barrier protection of red oxide with the active corrosion-inhibiting properties of zinc chromate, it ensures a bond that withstands harsh weather and industrial environments far better than standard primers.',
    productCode: 'CAL-PRM-016',
    baseType: 'Alkyd resin (Red Oxide & Zinc Chromate)',
    finish: 'Matt',
    vocContent: '~ 450 g/L',
    coverage: '120-140 sq. ft. per litre',
    coats: '2 coats',
    dryingTime: 'Touch dry: 4 hours | Recoat: 8 hours | Full cure: 24 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place (flammable)',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Dual pigment (red oxide + zinc)',
      'Superior rust guard',
      'Strong mechanical bond',
      'Weather resistant',
      'Heavy duty industrial grade'
    ],
    applications: [
      'Steel structures and pipelines',
      'Metal fabrications and railings',
      'Industrial equipment and machinery',
      'Marine and coastal applications'
    ],
    hazards: [
      'DANGER: Contains chromate pigments (health hazard).',
      'Highly flammable liquid and vapour.',
      'May cause sensitization by skin contact.',
      'Toxic to aquatic life.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-wood-primer',
    name: 'Calyco Wood Primer',
    subtitle: 'Seals wood for a flawless finish.',
    description: 'A solvent-based alkyd wood primer that penetrates and seals wooden surfaces, ensuring smooth adhesion of finish coats. Its lead-free formulation protects against moisture and resin bleed, creating the perfect foundation for a flawless finish.',
    details: 'Calyco Wood Primer penetrates deep into the grain, sealing pores and blocking resin bleed-through. It provides a uniform, smooth matte base that improves coverage and durability of topcoat enamels or varnishes.',
    productCode: 'CAL-PRM-015',
    baseType: 'Alkyd resin',
    finish: 'Matt',
    vocContent: '~ 300 g/L',
    coverage: '130-150 sq. ft. per litre',
    coats: '1-2 coats',
    dryingTime: 'Touch dry: 30 minutes | Recoat: 10-12 hours | Full cure: 24 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place away from direct sunlight',
    packaging: '500ml, 1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Deep penetrating sealer',
      'Prevents moisture and resin bleed',
      'Heavy-metal free (lead free)',
      'Strong adhesion for topcoats',
      'Fast drying matte finish'
    ],
    applications: [
      'Wooden doors and windows',
      'Furniture and cabinetry',
      'Plywood and MDF',
      'Exterior trim and joinery'
    ],
    hazards: [
      'WARNING: Flammable liquid and vapour.',
      'Harmful if inhaled.',
      'Repeated exposure may cause skin dryness or cracking.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-yellow-metal-primer',
    name: 'Calyco Yellow Metal Primer',
    subtitle: 'Maximum corrosion protection for metal surfaces.',
    description: 'High-performance yellow metal primer offering superior anti-corrosive protection for ferrous and non-ferrous metals. Formulated with rust-inhibitive pigments that create a protective barrier against moisture, chemicals, and atmospheric corrosion.',
    details: 'Calyco Yellow Metal Primer is an industrial-grade shield for metal assets. Enriched with zinc chromate, it provides active rust inhibition and heat resistance. It forms a tough, durable base that prevents oxidation and ensures topcoats bond securely to gates, grills, and machinery.',
    productCode: 'CAL-PRM-002',
    baseType: 'Alkyd resin with zinc chromate',
    finish: 'Matte',
    vocContent: '<= 250 g/L',
    coverage: '100-120 sq. ft. per litre',
    coats: '2 coats (3 for severe environments)',
    dryingTime: 'Touch dry: 1-2 hours | Recoat: 4-6 hours | Full cure: 48 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '4 years in unopened container',
    storage: 'Cool, dry place away from direct sunlight',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Zinc chromate rust protection',
      'Heat resistant up to 120 C',
      'Quick drying (touch dry 1-2h)',
      'Industrial grade durability',
      'Strong adhesion to metal'
    ],
    applications: [
      'Steel structures and railings',
      'Metal gates and grills',
      'Industrial equipment',
      'Galvanized and ferrous metals'
    ],
    hazards: [
      'FLAMMABLE & HARMFUL: Contains chromate compounds.',
      'May cause cancer by inhalation.',
      'Toxic to aquatic life with long lasting effects.'
    ],
    category: 'woodmetal',
    warranty: '4-year warranty'
  }
];

products.push(...industrialProducts);

const additionalProducts = [
  {
    slug: 'calyco-solvent-primer-interior',
    name: 'Interior Solvent Primer',
    subtitle: 'Bond, seal, and protect with versatile interior priming.',
    description: 'Solvent-based alkyd primer for interior masonry, wood, and metal surfaces with superior adhesion and high opacity.',
    details: 'Interior Solvent Primer penetrates and seals porous substrates while delivering strong adhesion on wood, metal, and masonry. Its high opacity improves topcoat coverage across varied interior substrates.',
    productCode: 'CAL-PRI-ST-INT-004',
    baseType: 'Solvent-based alkyd',
    finish: 'Matte',
    vocContent: '< 200 g/L',
    coverage: '140-160 sq. ft. per litre',
    coats: '1-2 coats',
    dryingTime: 'Touch dry: 1 hour | Recoat: 6 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place away from heat and flame',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Alkyd resin, solvent-based',
      'High opacity and strong adhesion',
      'Multi-surface: masonry, wood, metal',
      'Quick drying for faster recoats'
    ],
    applications: [
      'Interior masonry',
      'Wood surfaces',
      'Metal surfaces',
      'Plaster',
      'Gypsum boards'
    ],
    hazards: [
      'Flammable liquid and vapour.',
      'May cause skin irritation on prolonged contact.'
    ],
    category: 'primer',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-damp-guard-primer',
    name: 'Damp Guard Primer',
    subtitle: 'Keep walls dry and protected with a reliable damp-proof base.',
    description: 'Advanced waterproofing primer forming a flexible, breathable barrier to resist dampness, efflorescence, and hairline cracks on interior and exterior surfaces.',
    details: 'Calyco Damp Guard Primer is a high-performance elastomeric primer that blocks dampness, bridges hairline cracks, and resists efflorescence. Its breathable film lets moisture vapour escape while safeguarding against water damage on bathrooms, kitchens, basements, roof slabs, and exterior walls.',
    productCode: 'CAL-PRI-WP-005',
    baseType: 'Water-based acrylic elastomeric',
    finish: 'Matte',
    vocContent: '< 50 g/L',
    coverage: '90-110 sq. ft. per litre per coat',
    coats: '2-3 coats',
    dryingTime: 'Touch dry: 45 minutes | Recoat: 5 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place; do not freeze',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Waterproof, crack-bridging barrier',
      'Breathable elastomeric film',
      'Resists dampness and efflorescence',
      'Excellent adhesion to varied substrates'
    ],
    applications: [
      'Bathrooms',
      'Kitchens',
      'Basements',
      'Roof slabs',
      'Exterior walls'
    ],
    hazards: [
      'May cause mild skin/eye irritation on contact.'
    ],
    category: 'primer',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-universal-primer',
    name: 'Universal Primer',
    subtitle: 'Versatility meets performance in one powerful primer.',
    description: 'Solvent-based universal primer delivering superior adhesion and corrosion protection on metal, wood, and masonry surfaces.',
    details: 'Calyco Universal Primer is an alkyd-based, solvent-borne primer engineered for multi-surface use. It bonds strongly to metal, wood, and masonry, sealing porous substrates while providing corrosion resistance and high opacity for faster topcoat coverage.',
    productCode: 'CAL-PRI-UNI-006',
    baseType: 'Solvent-based alkyd',
    finish: 'Matte',
    vocContent: '< 250 g/L',
    coverage: '140-150 sq. ft. per litre',
    coats: '1-2 coats (2 on metal for rust protection)',
    dryingTime: 'Touch dry: 1 hour | Recoat: 8 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry, well-ventilated area away from flame',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Multi-surface adhesion: metal, wood, masonry',
      'Corrosion protection for metal substrates',
      'High opacity and sealing power',
      'Fast drying for quick recoating'
    ],
    applications: [
      'Metal gates and railings',
      'Wooden furniture and doors',
      'Masonry walls',
      'GI sheet roofing',
      'Fibre cement boards'
    ],
    hazards: [
      'Flammable liquid and vapour.',
      'May cause skin/eye irritation.'
    ],
    category: 'primer',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-amrella-enamel',
    name: 'Dura-Shield Enamel',
    subtitle: 'Brilliant finish that stands the test of time.',
    description: 'Premium modified-alkyd enamel providing a high-gloss, mirror-like finish for wood, metal, and masonry. Tough film resists stains and moisture with excellent adhesion and rust protection.',
    details: 'Dura-Shield Enamel delivers a mirror-like gloss and durable protection on multiple substrates. The modified alkyd resin provides weather and UV resistance, strong adhesion, and quick drying for long-lasting beauty indoors or out.',
    productCode: 'CAL-ENL-HG-001',
    baseType: 'Modified alkyd resin (solvent-based)',
    finish: 'High Gloss',
    vocContent: '= 300 g/L',
    coverage: '100-140 sq. ft. per litre',
    coats: '2 coats',
    dryingTime: 'Surface dry: 1-2 hours | Recoat: 6-8 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place away from heat and flame',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'High gloss modified alkyd enamel',
      'Weather and UV resistance',
      'Anti-rust protection for metal',
      'Quick drying, multi-surface adhesion'
    ],
    applications: [
      'Interior and exterior wood',
      'Metal surfaces',
      'Masonry',
      'Plaster'
    ],
    hazards: [
      'Flammable liquid and vapour.',
      'May cause skin/eye irritation.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-pu-wood-coating',
    name: 'PU Wood Coating',
    subtitle: 'Enhance and protect your wood surfaces.',
    description: 'Two-component polyurethane clear coat that enhances natural wood while delivering superior scratch, stain, and heat resistance with a non-yellowing, high-gloss finish.',
    details: 'PU Wood Coating is a crystal-clear, non-yellowing 2K polyurethane system that highlights wood grain and forms a tough, glossy film. It offers outstanding resistance to scratches, stains, heat, and fungi—ideal for furniture, doors, veneer, MDF, and flooring.',
    productCode: 'CAL-WOOD-PU-002',
    baseType: 'Acrylic polyurethane (2-component)',
    finish: 'High Gloss',
    vocContent: '= 350 g/L',
    coverage: '80-100 sq. ft. per litre',
    coats: '2-3 coats',
    dryingTime: 'Touch dry: 1-2 hours | Recoat: 6 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place; keep components sealed',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Two-component PU clear coat',
      'Non-yellowing high gloss',
      'Scratch, stain, and heat resistant',
      'Anti-fungal protection'
    ],
    applications: [
      'Wood furniture',
      'Doors and windows',
      'MDF surfaces',
      'Veneer',
      'Wooden flooring'
    ],
    hazards: [
      'Flammable and harmful vapours.',
      'May cause skin/eye irritation.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-acrylic-washable-distemper',
    name: 'Acrylic Washable Distemper',
    subtitle: 'Affordable washable finish for everyday living.',
    description: 'Economical, water-based distemper providing smooth, matt interiors with good washability and quick drying—ideal for everyday living.',
    details: 'Acrylic Washable Distemper delivers a micro-smooth matt look with bright colours, fast drying, and good washability at an accessible price. Great for interior walls, ceilings, plaster, concrete, and false ceilings.',
    productCode: 'CAL-DIST-WB-003',
    baseType: 'Acrylic copolymer emulsion',
    finish: 'Matt',
    vocContent: '= 50 g/L',
    coverage: '35-40 sq. ft. per litre (2 coats)',
    coats: '2 coats',
    dryingTime: 'Touch dry: 30 minutes | Recoat: 4-6 hours',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place; protect from freezing and sunlight',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Smooth matt finish',
      'Washable and fast drying',
      'Low VOC',
      'Economical interior solution'
    ],
    applications: [
      'Interior walls',
      'Ceilings',
      'Plaster and concrete',
      'False ceilings',
      'Asbestos sheets'
    ],
    hazards: [
      'May cause mild skin/eye irritation.'
    ],
    category: 'interior',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-all-surface-coating',
    name: 'All Surface Coating',
    subtitle: 'One paint for every surface.',
    description: 'Versatile multi-surface paint with built-in primer and semi-gloss/satin finish for wood, metal, plastic, masonry, and walls. Weather-resistant with strong adhesion and low odour.',
    details: 'All Surface Coating is an acrylic-alkyd hybrid that bonds to wood, metal, plastic, masonry, and interior/exterior walls. It offers weather and UV protection, quick drying, and low odour while eliminating the need for separate primers on most surfaces.',
    productCode: 'CAL-AS-COAT-004',
    baseType: 'Acrylic-alkyd hybrid',
    finish: 'Semi-Gloss/Satin',
    vocContent: '= 100 g/L',
    coverage: '80-120 sq. ft. per litre',
    coats: '2 coats',
    dryingTime: 'Touch dry: 1 hour | Recoat: 4 hours',
    tempRange: '10-40 C',
    humidity: 'Below 85% RH',
    shelfLife: '3 years in unopened container',
    storage: 'Cool, dry place; avoid freezing or extreme heat',
    packaging: '1L, 4L, 10L, 20L',
    sampleSizes: null,
    keyFeatures: [
      'Built-in primer, multi-surface adhesion',
      'Weather and UV resistant',
      'Low odour, low VOC',
      'Quick drying semi-gloss/satin'
    ],
    applications: [
      'Wood surfaces',
      'Metal surfaces',
      'Plastic',
      'Masonry and concrete',
      'Interior and exterior walls'
    ],
    hazards: [
      'May cause skin/eye irritation.'
    ],
    category: 'woodmetal',
    warranty: '3-year warranty'
  },
  {
    slug: 'calyco-texture-paint',
    name: 'Calyco Texture Paint',
    subtitle: 'Transform your spaces with timeless artistry and durability.',
    description: 'A premium decorative cement-based texture coating that transforms plain walls into artistic surfaces while providing a tough, weather-resistant shield.',
    details: 'Enriched with high-quality mineral aggregates and polymers, this texture finish hides surface undulations and hairline cracks, adding depth and dimension while resisting algae and harsh weather on interior and exterior facades.',
    productCode: 'CAL-TXT-CEM-001',
    baseType: 'Cement-based texture coating',
    finish: 'Decorative Wall Finish',
    vocContent: 'Low VOC',
    coverage: '3.5 - 4.5 sq. ft. per kg (varies by texture depth)',
    coats: '1-2 coats depending on pattern depth',
    dryingTime: 'Touch dry: 1-2 hours | Patterning window: 10-15 minutes while wet',
    tempRange: '10-40 C',
    humidity: 'Below 80% RH',
    shelfLife: '12 months in unopened bag',
    storage: 'Cool, dry place',
    packaging: '5 kg (Sample), 20 kg, 30 kg, 40 kg',
    sampleSizes: '5 kg sample bag',
    keyFeatures: [
      'Weather proof',
      'Hides cracks and surface undulations',
      'Strong adhesion to mineral substrates',
      'Anti-algae protection',
      'Interior and exterior use'
    ],
    applications: [
      'Interior walls',
      'Exterior facades',
      'Feature walls',
      'Boundary walls',
      'Commercial spaces'
    ],
    hazards: [
      'Cement-based powder: avoid inhalation of dust.',
      'May cause skin/eye irritation.'
    ],
    category: 'texture',
    warranty: '2-year warranty'
  }
];

products.push(...additionalProducts);

// TDS Template Function
function generateTDS(product) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - Technical Data Sheet</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', 'Helvetica', sans-serif; line-height: 1.6; color: #333; max-width: 210mm; margin: 0 auto; padding: 20mm; background: #fff; }
        .header { border-bottom: 4px solid #493657; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
        .logo { font-size: 32px; font-weight: bold; color: #493657; letter-spacing: 2px; }
        .doc-type { text-align: right; color: #493657; }
        .doc-type h2 { font-size: 16px; font-weight: bold; margin-bottom: 5px; }
        .doc-type p { font-size: 12px; color: #666; }
        .product-title { background: linear-gradient(135deg, #493657 0%, #5B2C87 100%); color: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; }
        .product-title h1 { font-size: 28px; margin-bottom: 8px; }
        .product-title p { font-size: 14px; opacity: 0.95; }
        .section { margin-bottom: 25px; }
        .section-title { background-color: #F0C85A; color: #493657; padding: 10px 15px; font-size: 16px; font-weight: bold; margin-bottom: 12px; border-radius: 4px; }
        .section-content { padding: 0 15px; }
        .bullet-list { list-style: none; padding-left: 0; }
        .bullet-list li { padding-left: 25px; position: relative; margin-bottom: 8px; color: #555; }
        .bullet-list li:before { content: "•"; color: #F0C85A; font-weight: bold; font-size: 20px; position: absolute; left: 5px; }
        .highlight-box { background: #FFF9E6; border-left: 4px solid #F0C85A; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .highlight-box h4 { color: #493657; margin-bottom: 8px; font-size: 14px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #493657; font-size: 11px; color: #666; text-align: center; }
        .footer p { margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background-color: #493657; color: white; padding: 10px; text-align: left; font-weight: bold; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        @media print { body { padding: 10mm; } .section { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">CALYCO</div>
        <div class="doc-type">
            <h2>TECHNICAL DATA SHEET</h2>
            <p>Issue Date: January 2025 | Version 1.0</p>
        </div>
    </div>

    <div class="product-title">
        <h1>${product.name}</h1>
        <p>${product.subtitle}</p>
    </div>

    <div class="section">
        <div class="section-title">PRODUCT DESCRIPTION</div>
        <div class="section-content">
            <p>${product.description}</p><br>
            <p>${product.details}</p>
        </div>
    </div>

    <div class="section">
        <div class="section-title">KEY FEATURES & BENEFITS</div>
        <div class="section-content">
            <ul class="bullet-list">
                ${product.keyFeatures.map(f => `<li>${f}</li>`).join('\n                ')}
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">TECHNICAL SPECIFICATIONS</div>
        <div class="section-content">
            <table>
                <tr><th>Property</th><th>Specification</th></tr>
                <tr><td>Product Code</td><td>${product.productCode}</td></tr>
                <tr><td>Base Type</td><td>${product.baseType}</td></tr>
                <tr><td>Finish</td><td>${product.finish}</td></tr>
                <tr><td>VOC Content</td><td>${product.vocContent}</td></tr>
                <tr><td>Coverage</td><td>${product.coverage}</td></tr>
                <tr><td>Recommended Coats</td><td>${product.coats}</td></tr>
                <tr><td>Drying Time (25°C)</td><td>${product.dryingTime}</td></tr>
                <tr><td>Application Temperature</td><td>${product.tempRange}</td></tr>
                <tr><td>Relative Humidity</td><td>${product.humidity}</td></tr>
                <tr><td>Shelf Life</td><td>${product.shelfLife}</td></tr>
                <tr><td>Storage Temperature</td><td>${product.storage}</td></tr>
            </table>
        </div>
    </div>

    <div class="section">
        <div class="section-title">RECOMMENDED APPLICATIONS</div>
        <div class="section-content">
            <ul class="bullet-list">
                ${product.applications.map(a => `<li>${a}</li>`).join('\n                ')}
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">SURFACE PREPARATION</div>
        <div class="section-content">
            <ul class="bullet-list">
                <li>Surface must be clean, dry, and free from dust, grease, and loose paint</li>
                <li>Remove all flaking or peeling paint mechanically</li>
                <li>Fill cracks and holes with suitable filler and allow to dry completely</li>
                <li>Prime new surfaces${product.category === 'primer' || product.category === 'putty' ? '' : ' with suitable primer'} for best results</li>
                <li>Sand glossy surfaces lightly to provide key for adhesion</li>
                <li>Ensure surface is properly prepared for optimal results</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">APPLICATION INSTRUCTIONS</div>
        <div class="section-content">
            <ol class="bullet-list">
                <li>${product.category === 'putty' ? 'Mix putty thoroughly to a smooth, lump-free consistency' : 'Stir thoroughly before and during use to ensure uniform consistency'}</li>
                <li>Apply by ${ product.category === 'putty' ? 'putty knife or trowel' : 'brush, roller, or airless spray equipment'}</li>
                <li>${product.category === 'putty' ? 'Apply first coat evenly, filling all imperfections' : 'For brush/roller application, thin with up to 10% clean water if needed'}</li>
                <li>${product.category === 'putty' ? 'Allow to dry for 4-6 hours, then sand smooth with fine sandpaper' : `Apply first coat evenly and allow to dry for ${product.dryingTime.split('Recoat: ')[1]}`}</li>
                <li>${product.category === 'putty' ? 'Apply second coat if needed for perfect smoothness' : 'Apply second coat perpendicular to the first for best coverage'}</li>
                <li>Do not apply when temperature is below ${product.tempRange.split(' - ')[0]} or above ${product.tempRange.split(' - ')[1]}</li>
                <li>Ensure adequate ventilation during application and drying</li>
                <li>${product.category === 'putty' ? 'Prime surface before topcoat application' : 'Allow 7 days for full cure before washing or heavy use'}</li>
            </ol>
            <div class="highlight-box">
                <h4>⚠ IMPORTANT APPLICATION NOTES</h4>
                <p>• Coverage varies based on substrate porosity and texture<br>
                • Apply in thin, even coats for best finish quality<br>
                • Do not apply to damp surfaces or when rain is forecast</p>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">CLEANUP & DISPOSAL</div>
        <div class="section-content">
            <ul class="bullet-list">
                <li>Clean tools and equipment immediately after use with soap and water</li>
                <li>Do not discharge wash water to drains or waterways</li>
                <li>Dispose of wash water and empty containers according to local regulations</li>
                <li>Do not allow product to freeze during storage</li>
                <li>Keep containers tightly sealed when not in use</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">AVAILABLE PACK SIZES</div>
        <div class="section-content">
            <p><strong>${product.packaging}</strong></p>
            ${product.sampleSizes ? `<p style="margin-top: 10px; color: #666;">Sample sizes: ${product.sampleSizes}</p>` : ''}
        </div>
    </div>

    <div class="section">
        <div class="section-title">WARRANTY</div>
        <div class="section-content">
            <p>${product.warranty} when applied as per technical specifications and recommended application procedures outlined in this Technical Data Sheet.</p>
        </div>
    </div>

    <div class="footer">
        <p><strong>CALYCO PAINTS</strong> | Premium Coating Solutions</p>
        <p>For complete safety information, please refer to the Safety Data Sheet (SDS)</p>
        <p>Technical Support: support@calycopaints.com | www.calycopaints.com</p>
        <p style="margin-top: 10px; font-size: 10px;">The information contained in this document is given in good faith and represents our current knowledge. It is provided without warranty and does not represent a specification. Users should conduct their own tests to determine suitability for their particular purpose.</p>
    </div>
</body>
</html>`;
}

// SDS Template Function
function generateSDS(product) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - Safety Data Sheet</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', 'Helvetica', sans-serif; line-height: 1.6; color: #333; max-width: 210mm; margin: 0 auto; padding: 20mm; background: #fff; }
        .header { border-bottom: 4px solid #493657; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-start; }
        .logo { font-size: 32px; font-weight: bold; color: #493657; letter-spacing: 2px; }
        .doc-type { text-align: right; color: #493657; }
        .doc-type h2 { font-size: 16px; font-weight: bold; margin-bottom: 5px; }
        .doc-type p { font-size: 12px; color: #666; }
        .product-title { background: linear-gradient(135deg, #493657 0%, #5B2C87 100%); color: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; }
        .product-title h1 { font-size: 26px; margin-bottom: 8px; }
        .product-title p { font-size: 13px; opacity: 0.95; }
        .section { margin-bottom: 25px; page-break-inside: avoid; }
        .section-header { background-color: #493657; color: white; padding: 10px 15px; font-size: 14px; font-weight: bold; margin-bottom: 12px; border-radius: 4px; display: flex; align-items: center; }
        .section-number { background: #F0C85A; color: #493657; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; }
        .section-content { padding: 0 15px; }
        .spec-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e5e5; }
        .spec-row:last-child { border-bottom: none; }
        .spec-label { font-weight: bold; color: #493657; min-width: 180px; flex-shrink: 0; }
        .spec-value { color: #555; }
        .bullet-list { list-style: none; padding-left: 0; }
        .bullet-list li { padding-left: 25px; position: relative; margin-bottom: 8px; color: #555; }
        .bullet-list li:before { content: "•"; color: #F0C85A; font-weight: bold; font-size: 18px; position: absolute; left: 5px; }
        .warning-box { background: #FFF9E6; border-left: 4px solid #EAB308; padding: 15px; margin: 15px 0; border-radius: 4px; }
        .warning-box h4 { color: #854D0E; margin-bottom: 8px; font-size: 13px; font-weight: bold; }
        .warning-box p { font-size: 12px; line-height: 1.6; color: #555; }
        .footer { margin-top: 30px; padding-top: 15px; border-top: 2px solid #493657; font-size: 10px; color: #666; text-align: center; }
        .footer p { margin-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background-color: #493657; color: white; padding: 8px; text-align: left; font-size: 13px; }
        td { padding: 8px; border-bottom: 1px solid #ddd; font-size: 12px; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        @media print { body { padding: 10mm; } .section { page-break-inside: avoid; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">CALYCO</div>
        <div class="doc-type">
            <h2>SAFETY DATA SHEET (SDS)</h2>
            <p>Revision Date: January 2025 | Version 1.0</p>
        </div>
    </div>

    <div class="product-title">
        <h1>${product.name}</h1>
        <p>${product.baseType}</p>
    </div>

    <!-- Section 1 -->
    <div class="section">
        <div class="section-header"><span class="section-number">1</span>PRODUCT & COMPANY IDENTIFICATION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Product Name:</div><div class="spec-value">${product.name}</div></div>
            <div class="spec-row"><div class="spec-label">Product Code:</div><div class="spec-value">${product.productCode}</div></div>
            <div class="spec-row"><div class="spec-label">Product Type:</div><div class="spec-value">${product.baseType}</div></div>
            <div class="spec-row"><div class="spec-label">Recommended Use:</div><div class="spec-value">${product.applications[0]}</div></div>
            <div class="spec-row"><div class="spec-label">Manufacturer:</div><div class="spec-value">Calyco Paints Private Limited</div></div>
            <div class="spec-row"><div class="spec-label">Address:</div><div class="spec-value">India</div></div>
            <div class="spec-row"><div class="spec-label">Website:</div><div class="spec-value">www.calycopaints.com</div></div>
        </div>
    </div>

    <!-- Section 2 -->
    <div class="section">
        <div class="section-header"><span class="section-number">2</span>HAZARDS IDENTIFICATION</div>
        <div class="section-content">
            <p style="margin-bottom: 10px;"><strong>GHS Classification:</strong></p>
            <ul class="bullet-list">
                ${product.hazards.map(h => `<li>${h}</li>`).join('\n                ')}
            </ul>
            <div class="warning-box">
                <h4>⚠ WARNING</h4>
                <p><strong>Precautionary Statements:</strong><br>
                P261 - Avoid breathing mist or spray. Use only with adequate ventilation.<br>
                P264 - Wash hands thoroughly after handling.<br>
                P280 - Wear protective gloves and eye protection.<br>
                P312 - Call a POISON CENTER or doctor if you feel unwell.</p>
            </div>
        </div>
    </div>

    <!-- Section 3 -->
    <div class="section">
        <div class="section-header"><span class="section-number">3</span>COMPOSITION / INFORMATION ON INGREDIENTS</div>
        <div class="section-content">
            <table>
                <tr><th>Component</th><th>CAS Number</th><th>Concentration</th></tr>
                <tr><td>Acrylic polymer dispersion</td><td>Proprietary</td><td>30-50%</td></tr>
                <tr><td>Titanium dioxide (if white/tinted)</td><td>13463-67-7</td><td>5-15%</td></tr>
                <tr><td>Water</td><td>7732-18-5</td><td>30-50%</td></tr>
                <tr><td>Additives and fillers</td><td>Proprietary</td><td>5-20%</td></tr>
            </table>
        </div>
    </div>

    <!-- Section 4 -->
    <div class="section">
        <div class="section-header"><span class="section-number">4</span>FIRST AID MEASURES</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Eye Contact:</div><div class="spec-value">Rinse cautiously with water for several minutes. Remove contact lenses if present. Continue rinsing. Seek medical attention if irritation persists.</div></div>
            <div class="spec-row"><div class="spec-label">Skin Contact:</div><div class="spec-value">Wash with soap and water. Remove contaminated clothing. Seek medical attention if irritation develops.</div></div>
            <div class="spec-row"><div class="spec-label">Inhalation:</div><div class="spec-value">Move to fresh air. Keep at rest in comfortable position. Seek medical advice if symptoms occur.</div></div>
            <div class="spec-row"><div class="spec-label">Ingestion:</div><div class="spec-value">Rinse mouth. Do NOT induce vomiting. Seek medical attention immediately.</div></div>
        </div>
    </div>

    <!-- Section 5 -->
    <div class="section">
        <div class="section-header"><span class="section-number">5</span>FIRE-FIGHTING MEASURES</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Suitable Extinguishing Media:</div><div class="spec-value">Water spray, foam, dry powder, carbon dioxide</div></div>
            <div class="spec-row"><div class="spec-label">Unsuitable Media:</div><div class="spec-value">None known</div></div>
            <div class="spec-row"><div class="spec-label">Special Hazards:</div><div class="spec-value">May release toxic fumes when heated</div></div>
            <div class="spec-row"><div class="spec-label">Protection for Firefighters:</div><div class="spec-value">Wear self-contained breathing apparatus and protective gear</div></div>
        </div>
    </div>

    <!-- Section 6 -->
    <div class="section">
        <div class="section-header"><span class="section-number">6</span>ACCIDENTAL RELEASE MEASURES</div>
        <div class="section-content">
            <ul class="bullet-list">
                <li>Eliminate all ignition sources</li>
                <li>Ventilate area</li>
                <li>Contain spill with inert absorbent material</li>
                <li>Collect and place in suitable container for disposal</li>
                <li>Clean contaminated area with water</li>
                <li>Prevent entry into drains and waterways</li>
            </ul>
        </div>
    </div>

    <!-- Section 7 -->
    <div class="section">
        <div class="section-header"><span class="section-number">7</span>HANDLING & STORAGE</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Handling:</div><div class="spec-value">Avoid contact with eyes and skin. Use in well-ventilated areas. Wear protective equipment.</div></div>
            <div class="spec-row"><div class="spec-label">Storage:</div><div class="spec-value">Store in cool, dry place (${product.storage}). Keep container tightly closed. Protect from freezing.</div></div>
        </div>
    </div>

    <!-- Section 8 -->
    <div class="section">
        <div class="section-header"><span class="section-number">8</span>EXPOSURE CONTROLS / PERSONAL PROTECTION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Exposure Limits:</div><div class="spec-value">VOC: ${product.vocContent}</div></div>
            <div class="spec-row"><div class="spec-label">Eye Protection:</div><div class="spec-value">Safety goggles</div></div>
            <div class="spec-row"><div class="spec-label">Hand Protection:</div><div class="spec-value">Nitrile or latex gloves</div></div>
            <div class="spec-row"><div class="spec-label">Respiratory Protection:</div><div class="spec-value">Not normally required with adequate ventilation</div></div>
            <div class="spec-row"><div class="spec-label">Skin Protection:</div><div class="spec-value">Long sleeves and protective clothing</div></div>
        </div>
    </div>

    <!-- Section 9 -->
    <div class="section">
        <div class="section-header"><span class="section-number">9</span>PHYSICAL & CHEMICAL PROPERTIES</div>
        <div class="section-content">
            <table>
                <tr><td>Appearance:</td><td>${product.category === 'putty' ? 'Paste' : 'Liquid'}</td></tr>
                <tr><td>Colour:</td><td>${product.category === 'putty' ? 'White' : 'Variable (as per tint)'}</td></tr>
                <tr><td>Odour:</td><td>Mild, characteristic</td></tr>
                <tr><td>pH:</td><td>8.0 - 9.5</td></tr>
                <tr><td>Flash Point:</td><td>Non-flammable</td></tr>
                <tr><td>Specific Gravity:</td><td>${product.category === 'putty' ? '1.6 - 1.8' : '1.3 - 1.5'}</td></tr>
                <tr><td>VOC Content:</td><td>${product.vocContent}</td></tr>
            </table>
        </div>
    </div>

    <!-- Section 10 -->
    <div class="section">
        <div class="section-header"><span class="section-number">10</span>STABILITY & REACTIVITY</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Chemical Stability:</div><div class="spec-value">Stable under normal conditions</div></div>
            <div class="spec-row"><div class="spec-label">Conditions to Avoid:</div><div class="spec-value">Freezing temperatures, excessive heat</div></div>
            <div class="spec-row"><div class="spec-label">Incompatible Materials:</div><div class="spec-value">Strong oxidizing agents</div></div>
            <div class="spec-row"><div class="spec-label">Hazardous Decomposition:</div><div class="spec-value">Carbon oxides when heated to decomposition</div></div>
        </div>
    </div>

    <!-- Section 11 -->
    <div class="section">
        <div class="section-header"><span class="section-number">11</span>TOXICOLOGICAL INFORMATION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Acute Toxicity:</div><div class="spec-value">Low toxicity by all exposure routes</div></div>
            <div class="spec-row"><div class="spec-label">Skin Corrosion/Irritation:</div><div class="spec-value">May cause mild skin irritation</div></div>
            <div class="spec-row"><div class="spec-label">Eye Damage/Irritation:</div><div class="spec-value">May cause eye irritation</div></div>
            <div class="spec-row"><div class="spec-label">Sensitization:</div><div class="spec-value">Not classified as a sensitizer</div></div>
        </div>
    </div>

    <!-- Section 12 -->
    <div class="section">
        <div class="section-header"><span class="section-number">12</span>ECOLOGICAL INFORMATION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Ecotoxicity:</div><div class="spec-value">Low aquatic toxicity</div></div>
            <div class="spec-row"><div class="spec-label">Persistence:</div><div class="spec-value">Not readily biodegradable</div></div>
            <div class="spec-row"><div class="spec-label">Mobility:</div><div class="spec-value">Low mobility in soil</div></div>
            <div class="spec-row"><div class="spec-label">Environmental Precautions:</div><div class="spec-value">Prevent entry into drains and waterways</div></div>
        </div>
    </div>

    <!-- Section 13 -->
    <div class="section">
        <div class="section-header"><span class="section-number">13</span>DISPOSAL CONSIDERATIONS</div>
        <div class="section-content">
            <ul class="bullet-list">
                <li>Dispose in accordance with local environmental regulations</li>
                <li>Do not discharge to drains or waterways</li>
                <li>Empty containers should be recycled or disposed of properly</li>
                <li>Allow liquid waste to solidify before disposal if permitted</li>
                <li>Consult local waste management authority for proper disposal</li>
            </ul>
        </div>
    </div>

    <!-- Section 14 -->
    <div class="section">
        <div class="section-header"><span class="section-number">14</span>TRANSPORT INFORMATION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">UN Number:</div><div class="spec-value">Not classified as dangerous goods</div></div>
            <div class="spec-row"><div class="spec-label">Transport Hazard Class:</div><div class="spec-value">Not applicable</div></div>
            <div class="spec-row"><div class="spec-label">Packing Group:</div><div class="spec-value">Not applicable</div></div>
            <div class="spec-row"><div class="spec-label">Special Precautions:</div><div class="spec-value">Protect from freezing during transport</div></div>
        </div>
    </div>

    <!-- Section 15 -->
    <div class="section">
        <div class="section-header"><span class="section-number">15</span>REGULATORY INFORMATION</div>
        <div class="section-content">
            <div class="spec-row"><div class="spec-label">Classification:</div><div class="spec-value">Classified according to GHS standards</div></div>
            <div class="spec-row"><div class="spec-label">VOC Compliance:</div><div class="spec-value">${product.vocContent}</div></div>
            <div class="spec-row"><div class="spec-label">Standards:</div><div class="spec-value">Complies with applicable Indian and international standards</div></div>
        </div>
    </div>

    <!-- Section 16 -->
    <div class="section">
        <div class="section-header"><span class="section-number">16</span>OTHER INFORMATION</div>
        <div class="section-content">
            <p><strong>Revision Date:</strong> January 2025</p>
            <p><strong>Version:</strong> 1.0</p>
            <p style="margin-top: 10px;">This Safety Data Sheet provides information based on current knowledge. Users should evaluate and use this product safely based on their own specific applications and conditions.</p>
        </div>
    </div>

    <div class="footer">
        <p><strong>CALYCO PAINTS</strong> | Premium Coating Solutions</p>
        <p>For technical information, please refer to the Technical Data Sheet (TDS)</p>
        <p>Technical Support: support@calycopaints.com | www.calycopaints.com</p>
        <p style="margin-top: 10px;">Disclaimer: The information provided is accurate to the best of our knowledge. However, no warranty is expressed or implied regarding the accuracy of the data or the results obtained from the use thereof.</p>
    </div>
</body>
</html>`;
}

// Generate all documents
const outputDir = path.join(__dirname, '..', 'public', 'Assets', 'docs', 'html-templates');

// Make sure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

products.forEach(product => {
  // Generate TDS
  const tdsContent = generateTDS(product);
  const tdsPath = path.join(outputDir, `${product.slug}-tds.html`);
  fs.writeFileSync(tdsPath, tdsContent, 'utf8');
  console.log(`✓ Created: ${product.slug}-tds.html`);

  // Generate SDS
  const sdsContent = generateSDS(product);
  const sdsPath = path.join(outputDir, `${product.slug}-sds.html`);
  fs.writeFileSync(sdsPath, sdsContent, 'utf8');
  console.log(`✓ Created: ${product.slug}-sds.html`);
});

console.log(`\n✅ Successfully generated ${products.length * 2} documents (${products.length} TDS + ${products.length} SDS)`);
console.log(`📁 Location: ${outputDir}`);
