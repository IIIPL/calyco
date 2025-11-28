import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\calyco-github\\src\\pages';

// Map of files and their replacements
const replacements = [
  {
    file: 'CalycoAcrylicPutty.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/calyco-acrylic-wall-putty-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-acrylic-wall-putty-tds.html"'
      },
      {
        old: 'href="/Assets/docs/calyco-acrylic-wall-putty-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-acrylic-wall-putty-sds.html"'
      }
    ]
  },
  {
    file: 'CalycoWaterPrimerInterior.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/calyco-water-primer-interior-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-water-primer-interior-tds.html"'
      },
      {
        old: 'href="/Assets/docs/calyco-water-primer-interior-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-water-primer-interior-sds.html"'
      }
    ]
  },
  {
    file: 'CalycoWeatherPrimerExterior.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/calyco-weather-primer-exterior-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-weather-primer-exterior-tds.html"'
      },
      {
        old: 'href="/Assets/docs/calyco-weather-primer-exterior-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/calyco-weather-primer-exterior-sds.html"'
      }
    ]
  },
  {
    file: 'PremiumInteriorEmulsion.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/premium-interior-emulsion-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/premium-interior-emulsion-tds.html"'
      },
      {
        old: 'href="/Assets/docs/premium-interior-emulsion-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/premium-interior-emulsion-sds.html"'
      }
    ]
  },
  {
    file: 'InteriorLatexPaint.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/interior-latex-paint-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/luxury-interior-emulsion-tds.html"'
      },
      {
        old: 'href="/Assets/docs/interior-latex-paint-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/luxury-interior-emulsion-sds.html"'
      }
    ]
  },
  {
    file: 'PremiumExteriorEmulsion.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/exterior-latex-paint-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/premium-exterior-emulsion-tds.html"'
      },
      {
        old: 'href="/Assets/docs/exterior-latex-paint-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/premium-exterior-emulsion-sds.html"'
      }
    ]
  },
  {
    file: 'ExteriorLatexPaint.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/exterior-latex-paint-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/luxury-exterior-emulsion-tds.html"'
      },
      {
        old: 'href="/Assets/docs/exterior-latex-paint-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/luxury-exterior-emulsion-sds.html"'
      }
    ]
  },
  {
    file: 'WaterproofingSealer.jsx',
    changes: [
      {
        old: 'href="/Assets/docs/waterproofing-sealer-tds.pdf"',
        new: 'href="/Assets/docs/html-templates/waterproofing-sealer-tds.html"'
      },
      {
        old: 'href="/Assets/docs/waterproofing-sealer-sds.pdf"',
        new: 'href="/Assets/docs/html-templates/waterproofing-sealer-sds.html"'
      }
    ]
  }
];

// Process each file
replacements.forEach(({ file, changes }) => {
  const filePath = path.join(pagesDir, file);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ File not found: ${file}`);
    return;
  }

  // Read file content
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Apply each change
  changes.forEach(({ old, new: newValue }) => {
    if (content.includes(old)) {
      content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newValue);
      updated = true;
      console.log(`✓ ${file}: Updated ${old.substring(0, 40)}...`);
    }
  });

  // Write back if updated
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Saved ${file}`);
  } else {
    console.log(`  ℹ No changes needed for ${file}`);
  }
});

console.log('\n✅ All product pages updated with HTML document links!');
