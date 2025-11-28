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
