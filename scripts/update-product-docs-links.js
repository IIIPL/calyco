import fs from 'fs';

const filePath = 'c:\\calyco-github\\src\\data\\products.js';
let content = fs.readFileSync(filePath, 'utf8');

// Update all document references from PDF to HTML
const replacements = [
  // Premium Interior Emulsion
  {
    old: '"sds": "/Assets/docs/sds_Premium-Interior-Emulsion.pdf"',
    new: '"sds": "/Assets/docs/html-templates/premium-interior-emulsion-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_Premium-Interior-Emulsion.pdf"',
    new: '"tds": "/Assets/docs/html-templates/premium-interior-emulsion-tds.html"'
  },
  // Luxury Interior Emulsion (Interior Latex Paint)
  {
    old: '"sds": "/Assets/docs/sds_Interior-Latex-Paint.pdf"',
    new: '"sds": "/Assets/docs/html-templates/luxury-interior-emulsion-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_Interior-Latex-Paint.pdf"',
    new: '"tds": "/Assets/docs/html-templates/luxury-interior-emulsion-tds.html"'
  },
  // Premium Exterior Emulsion
  {
    old: '"sds": "/Assets/docs/sds_Premium-Exterior-Emulsion.pdf"',
    new: '"sds": "/Assets/docs/html-templates/premium-exterior-emulsion-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_Premium-Exterior-Emulsion.pdf"',
    new: '"tds": "/Assets/docs/html-templates/premium-exterior-emulsion-tds.html"'
  },
  // Luxury Exterior Emulsion (Exterior Latex Paint)
  {
    old: '"sds": "/Assets/docs/sds_Exterior-Latex-Paint.pdf"',
    new: '"sds": "/Assets/docs/html-templates/luxury-exterior-emulsion-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_Exterior-Latex-Paint.pdf"',
    new: '"tds": "/Assets/docs/html-templates/luxury-exterior-emulsion-tds.html"'
  },
  // Water Primer Interior
  {
    old: '"sds": "/Assets/docs/sds_calyco-water-primer-interior.pdf"',
    new: '"sds": "/Assets/docs/html-templates/calyco-water-primer-interior-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_calyco-water-primer-interior.pdf"',
    new: '"tds": "/Assets/docs/html-templates/calyco-water-primer-interior-tds.html"'
  },
  // Weather Primer Exterior
  {
    old: '"sds": "/Assets/docs/sds_calyco-weather-primer-exterior.pdf"',
    new: '"sds": "/Assets/docs/html-templates/calyco-weather-primer-exterior-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_calyco-weather-primer-exterior.pdf"',
    new: '"tds": "/Assets/docs/html-templates/calyco-weather-primer-exterior-tds.html"'
  },
  // Acrylic Wall Putty
  {
    old: '"sds": "/Assets/docs/sds_calyco-acrylic-wall-putty.pdf"',
    new: '"sds": "/Assets/docs/html-templates/calyco-acrylic-wall-putty-sds.html"'
  },
  {
    old: '"tds": "/Assets/docs/tds_calyco-acrylic-wall-putty.pdf"',
    new: '"tds": "/Assets/docs/html-templates/calyco-acrylic-wall-putty-tds.html"'
  }
];

// Apply all replacements
replacements.forEach(({ old, new: newValue }) => {
  if (content.includes(old)) {
    content = content.replace(old, newValue);
    console.log(`✓ Updated: ${old.substring(8, 40)}... → HTML`);
  }
});

// Write updated content back to file
fs.writeFileSync(filePath, content, 'utf8');

console.log('\n✅ Successfully updated products.js with HTML document links');
