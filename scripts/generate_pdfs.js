import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const docsDir = path.resolve('public/Assets/docs');
fs.mkdirSync(docsDir, { recursive: true });

const company = {
  name: 'CALYCO PRODUCTS PRIVATE LIMITED',
  address: 'Nagpur, Maharashtra, India',
  contact: 'support@calycopaints.com | +91 8826733064',
};

const products = [
  {
    name: 'Calyco Water Primer (Interior)',
    slug: 'calyco-water-primer-interior',
    category: 'primer',
    use: 'Interior primer for plaster, putty, and drywall.',
    sheen: 'Matte / Low Sheen',
    coverage: '180-200 sq.ft./L per coat',
    solids: '38-42% by volume',
    viscosity: '55-65 KU @ 25°C',
    density: '1.32 ± 0.02 g/cc',
    voc: '< 30 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4 hours',
    dilution: 'Up to 10% with clean water for very absorbent substrates.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.5 - 9.0',
  },
  {
    name: 'Calyco Weather Primer (Exterior)',
    slug: 'calyco-weather-primer-exterior',
    category: 'primer',
    use: 'Exterior primer for masonry, cement plaster, and concrete.',
    sheen: 'Smooth / Low Sheen',
    coverage: '150-180 sq.ft./L per coat',
    solids: '40-45% by volume',
    viscosity: '55-65 KU @ 25°C',
    density: '1.34 ± 0.02 g/cc',
    voc: '< 35 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4 hours',
    dilution: 'Up to 10% with clean water for porous substrates.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.5 - 9.0',
  },
  {
    name: 'Calyco Acrylic Wall Putty',
    slug: 'calyco-acrylic-wall-putty',
    category: 'putty',
    use: 'Surface levelling paste for interior and exterior walls.',
    sheen: 'Smooth',
    coverage: '28-35 sq.ft./kg per coat (dependant on undulation)',
    solids: '50-60% by weight',
    viscosity: 'Smooth paste, ready-to-use',
    density: '1.65 ± 0.05 g/cc',
    voc: 'Low VOC',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4 hours',
    dilution: 'Do not dilute. Ready-to-use paste.',
    physicalState: 'Paste',
    appearance: 'White paste',
    pH: '8.0 - 8.8',
  },
  {
    name: 'Premium Interior Emulsion',
    slug: 'Premium-Interior-Emulsion',
    category: 'premium-interior',
    use: 'Interior decorative topcoat for plastered walls and ceilings.',
    sheen: 'Matte / Low Sheen',
    coverage: '120-140 sq.ft./L per coat',
    solids: '42-48% by volume',
    viscosity: '80-90 KU @ 25°C',
    density: '1.38 ± 0.03 g/cc',
    voc: '< 30 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4 hours',
    dilution: 'Up to 10% with clean water for first coat on very absorbent surfaces.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.0 - 9.0',
  },
  {
    name: 'Luxury Interior Emulsion',
    slug: 'Interior-Latex-Paint',
    category: 'luxury-interior',
    use: 'High-spec interior topcoat for premium walls and ceilings.',
    sheen: 'Silk / Velvet',
    coverage: '160-180 sq.ft./L per coat',
    solids: '44-52% by volume',
    viscosity: '85-95 KU @ 25°C',
    density: '1.40 ± 0.03 g/cc',
    voc: '< 25 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4 hours',
    dilution: 'Up to 10% with clean water for first coat on very absorbent surfaces.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.0 - 9.0',
  },
  {
    name: 'Premium Exterior Emulsion',
    slug: 'Premium-Exterior-Emulsion',
    category: 'premium-exterior',
    use: 'Exterior topcoat for masonry requiring durable matte protection.',
    sheen: 'Matte / Low Sheen',
    coverage: '120-140 sq.ft./L per coat',
    solids: '40-46% by volume',
    viscosity: '80-90 KU @ 25°C',
    density: '1.36 ± 0.03 g/cc',
    voc: '< 40 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4-6 hours',
    dilution: 'Up to 10% with clean water for first coat on porous substrates.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.0 - 9.0',
  },
  {
    name: 'Luxury Exterior Emulsion',
    slug: 'Exterior-Latex-Paint',
    category: 'luxury-exterior',
    use: 'High-spec exterior topcoat for elevated sheen and weather defence.',
    sheen: 'Silk / Velvet',
    coverage: '160-180 sq.ft./L per coat',
    solids: '42-50% by volume',
    viscosity: '85-95 KU @ 25°C',
    density: '1.37 ± 0.03 g/cc',
    voc: '< 40 g/L',
    drying: 'Surface dry: ~30 minutes',
    recoat: 'Recoat: 4-6 hours',
    dilution: 'Up to 10% with clean water for first coat on porous substrates.',
    physicalState: 'Liquid',
    appearance: 'White liquid, tintable',
    pH: '8.0 - 9.0',
  },
];

const hazards = [
  'GHS: Non-flammable, water-based product. May cause mild skin and eye irritation.',
  'P261 Avoid breathing mist or spray. P280 Wear protective gloves and eye protection.',
  'P302+P352 IF ON SKIN: Wash with plenty of soap and water. P305+P351 IF IN EYES: Rinse cautiously with water.',
  'P501 Dispose of contents/container in accordance with local regulations.',
];

function addHeader(doc, title, subtitle) {
  doc.font('Helvetica-Bold').fontSize(16).text(company.name);
  doc.font('Helvetica').fontSize(10).text(company.address);
  doc.text(`Contact: ${company.contact}`);
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(14).text(title);
  if (subtitle) {
    doc.font('Helvetica').fontSize(11).text(subtitle);
  }
  doc.moveDown();
}

function addList(doc, items) {
  items.forEach((item) => doc.text(`• ${item}`));
}

function addSection(doc, title, items) {
  doc.moveDown(0.35);
  doc.font('Helvetica-Bold').fontSize(11).text(title);
  doc.font('Helvetica').fontSize(10);
  addList(doc, items);
}

function generateSDS(product) {
  const filePath = path.join(docsDir, `sds_${product.slug}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  addHeader(
    doc,
    `${product.name} - Safety Data Sheet`,
    'GHS Format (16 Sections)',
  );

  const sections = [
    {
      title: '1. Identification',
      items: [
        `Product Identifier: ${product.name}`,
        `Recommended Use: ${product.use}`,
        `Manufacturer: ${company.name}`,
        `Address: ${company.address}`,
        `Contact: ${company.contact}`,
      ],
    },
    {
      title: '2. Hazard Identification',
      items: hazards,
    },
    {
      title: '3. Composition / Information on Ingredients',
      items: [
        'Water-based acrylic polymers, titanium dioxide, extenders, functional additives, preservative (<0.5%).',
        'Contains no added lead, mercury, or chromium compounds.',
      ],
    },
    {
      title: '4. First Aid Measures',
      items: [
        'Eyes: Rinse cautiously with water for several minutes. Remove contact lenses if present and easy to do.',
        'Skin: Wash with soap and water. Remove contaminated clothing and launder before reuse.',
        'Inhalation: Move to fresh air. Seek medical attention if symptoms persist.',
        'Ingestion: Rinse mouth. Do not induce vomiting. Seek medical advice if discomfort occurs.',
      ],
    },
    {
      title: '5. Fire-Fighting Measures',
      items: [
        'Non-flammable water-based product.',
        'Use water spray, foam, CO₂, or dry chemical on surrounding fire.',
        'Wear self-contained breathing apparatus for confined fires.',
      ],
    },
    {
      title: '6. Accidental Release Measures',
      items: [
        'Contain spill. Prevent entry into drains or waterways.',
        'Absorb with inert material (sand/earth) and collect for disposal.',
        'Use personal protective equipment to avoid skin/eye contact.',
      ],
    },
    {
      title: '7. Handling and Storage',
      items: [
        'Avoid breathing mist/spray. Ensure good ventilation during application.',
        'Keep containers tightly closed. Store between 5°C and 40°C.',
        'Protect from freezing and direct sunlight. Keep out of reach of children.',
      ],
    },
    {
      title: '8. Exposure Controls / Personal Protection',
      items: [
        'Engineering Controls: Adequate ventilation during spraying or sanding.',
        'Personal Protection: Safety goggles, nitrile gloves, coveralls for prolonged exposure.',
        'Respiratory Protection: NIOSH-approved mask during spraying or sanding of dried film.',
      ],
    },
    {
      title: '9. Physical and Chemical Properties',
      items: [
        `Physical State: ${product.physicalState}`,
        `Appearance: ${product.appearance}`,
        `Odour: Mild acrylic odour`,
        `pH: ${product.pH}`,
        `Specific Gravity: ${product.density}`,
        `Solids Content: ${product.solids}`,
        `Viscosity: ${product.viscosity}`,
        `VOC Content: ${product.voc}`,
        'Flash Point: Not applicable (water-based, non-flammable)',
      ],
    },
    {
      title: '10. Stability and Reactivity',
      items: [
        'Stable under recommended storage conditions.',
        'Avoid extreme temperatures and contamination with strong oxidizers.',
        'No hazardous polymerization expected.',
      ],
    },
    {
      title: '11. Toxicological Information',
      items: [
        'Low toxicity expected with normal handling of water-based coatings.',
        'May cause skin or eye irritation. Prolonged inhalation of spray mist may irritate respiratory tract.',
      ],
    },
    {
      title: '12. Ecological Information',
      items: [
        'Water-based; avoid uncontrolled release to the environment.',
        'Do not allow product to enter waterways or soil untreated.',
      ],
    },
    {
      title: '13. Disposal Considerations',
      items: [
        'Do not pour into drains. Allow leftover material to dry and dispose of as non-hazardous waste as per local regulations.',
        'Empty containers may contain residue; triple rinse before recycling where facilities exist.',
      ],
    },
    {
      title: '14. Transport Information',
      items: [
        'Not regulated as dangerous goods for transport (ADR/RID/IMDG/ICAO/IATA).',
      ],
    },
    {
      title: '15. Regulatory Information',
      items: [
        'Conforms to applicable VOC limits for water-based architectural coatings.',
        'No added heavy metals (lead, mercury, chromium).',
      ],
    },
    {
      title: '16. Other Information',
      items: [
        'The information is based on current knowledge and intended for guidance on safe handling, storage, and use.',
        'Prepared for CALYCO technical reference.',
      ],
    },
  ];

  sections.forEach((section) => addSection(doc, section.title, section.items));

  doc.end();
  console.log(`Generated SDS: ${filePath}`);
}

function addProperty(doc, label, value) {
  doc.font('Helvetica-Bold').fontSize(10).text(`${label}: `, { continued: true });
  doc.font('Helvetica').fontSize(10).text(value);
}

function generateTDS(product) {
  const filePath = path.join(docsDir, `tds_${product.slug}.pdf`);
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  addHeader(
    doc,
    `${product.name} - Technical Data Sheet`,
    'Performance, Application, and Compliance Data',
  );

  doc.font('Helvetica-Bold').fontSize(12).text('Product Overview');
  doc.font('Helvetica').fontSize(10).text(product.use);
  doc.moveDown(0.5);

  doc.font('Helvetica-Bold').fontSize(11).text('Key Properties');
  doc.moveDown(0.2);
  addProperty(doc, 'Finish / Sheen', product.sheen);
  addProperty(doc, 'Coverage (per coat)', product.coverage);
  addProperty(doc, 'Solids', product.solids);
  addProperty(doc, 'Viscosity', product.viscosity);
  addProperty(doc, 'Specific Gravity', product.density);
  addProperty(doc, 'VOC Content', product.voc);
  addProperty(doc, 'pH', product.pH);
  addProperty(doc, 'Drying Time', product.drying);
  addProperty(doc, 'Recoat Window', product.recoat);
  addProperty(doc, 'Dilution', product.dilution);

  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(11).text('Application Guidance');
  doc.font('Helvetica').fontSize(10);
  addList(doc, [
    'Surface must be clean, dry, and free from dust, grease, or loose material.',
    product.category === 'putty'
      ? 'Apply with putty knife/trowel in thin, even layers. Allow full dry before sanding lightly.'
      : 'Apply by brush, roller, or spray. Maintain uniform film build without overspreading.',
    product.category === 'primer'
      ? 'Ideal first coat before emulsion or topcoat. Ensure porosity is sealed evenly.'
      : 'Use appropriate Calyco primer/substrate preparation before topcoating.',
  ]);

  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(11).text('System Recommendations');
  doc.font('Helvetica').fontSize(10);
  addList(doc, [
    product.category === 'primer'
      ? 'Follow with compatible Calyco interior/exterior emulsions based on project location.'
      : 'Prime with Calyco Water Primer (Interior) or Calyco Weather Primer (Exterior) as applicable.',
    product.category === 'putty'
      ? 'Finish with Calyco primers and emulsions after sanding to a smooth, dust-free surface.'
      : 'Apply minimum two coats of the emulsion with recommended recoat intervals.',
    'Avoid application below 10°C or above 40°C, or when humidity exceeds 85%.',
  ]);

  doc.moveDown(0.8);
  doc.font('Helvetica-Bold').fontSize(11).text('Compliance & Safety');
  doc.font('Helvetica').fontSize(10);
  addList(doc, [
    'Meets VOC requirements for architectural water-based coatings.',
    'No added heavy metals. Water-based, low-odour formulation.',
    'Refer to corresponding Safety Data Sheet (SDS) for detailed handling guidance.',
  ]);

  doc.end();
  console.log(`Generated TDS: ${filePath}`);
}

products.forEach((product) => {
  generateSDS(product);
  generateTDS(product);
});

