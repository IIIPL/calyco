import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ADMIN_DIR = path.resolve(__dirname, '..', 'src', 'data', 'admin');
const DATA_DIR = path.resolve(__dirname, '..', 'src', 'data');

async function generateProducts() {
  const pricingPath = path.join(ADMIN_DIR, 'pricing.json');
  if (!fs.existsSync(pricingPath)) {
    throw new Error(`Missing pricing.json at ${pricingPath}. Run sync-admin-data first.`);
  }

  const pricingRaw = await fs.promises.readFile(pricingPath, 'utf8');
  let pricingData;
  try {
    pricingData = JSON.parse(pricingRaw);
  } catch (error) {
    throw new Error(`pricing.json is not valid JSON: ${error.message}`);
  }

  const updatedFiles = [];

  for (const [productKey, productConfig] of Object.entries(pricingData)) {
    const detailPath = path.join(DATA_DIR, `productDetail.${productKey}.js`);
    if (!fs.existsSync(detailPath)) {
      console.warn(`[INFO] Skipping ${productKey}. No matching file at ${detailPath}`);
      continue;
    }

    let content = await fs.promises.readFile(detailPath, 'utf8');

    const normalized = normalizePricing(productConfig);

    content = replaceVariantMap(content, normalized.variantMap);
    content = replaceConstStructure(content, 'priceByFinish', stringifyObject(normalized.priceByFinish));
    content = replaceConstStructure(content, 'sizes', buildSizesArray(normalized), '[', ']');
    content = replacePropertyArray(content, 'packaging', normalized.packaging);
    content = replaceDefaultFinish(content, normalized.defaultFinish);

    if (content.trim().length === 0) {
      throw new Error(`Unexpected empty content for ${detailPath} after processing.`);
    }

    await fs.promises.writeFile(detailPath, content, 'utf8');
    updatedFiles.push(path.relative(process.cwd(), detailPath));
  }

  if (!updatedFiles.length) {
    console.log('[WARN] No product detail files were updated (check pricing.json configuration).');
    return;
  }

  console.log(`[OK] Updated product pricing for:\n - ${updatedFiles.join('\n - ')}`);
}

function normalizePricing(productConfig) {
  if (!productConfig || typeof productConfig !== 'object') {
    throw new Error('Invalid product configuration detected in pricing.json');
  }

  const { defaultFinish, finishes } = productConfig;
  if (!finishes || typeof finishes !== 'object' || !Object.keys(finishes).length) {
    throw new Error('Each product entry in pricing.json must include at least one finish with sizes.');
  }

  const priceByFinish = {};
  const originalPrices = new Map();
  const variantMap = {};
  const sizeMeta = new Map();
  let orderCounter = 0;

  for (const [finishName, finishConfig] of Object.entries(finishes)) {
    if (!finishConfig || !Array.isArray(finishConfig.sizes)) {
      continue;
    }

    priceByFinish[finishName] = {};

    finishConfig.sizes.forEach((sizeConfig) => {
      const label = sizeConfig.label;
      if (!label) {
        return;
      }

      const currentPrice = Number(sizeConfig.current ?? 0);
      const originalPrice = Number(sizeConfig.original ?? currentPrice);

      priceByFinish[finishName][label] = currentPrice;

      if (!originalPrices.has(label)) {
        originalPrices.set(label, new Map());
      }
      originalPrices.get(label).set(finishName, originalPrice);

      const variantKey = `${label}-${finishName}`;
      if (sizeConfig.variantId) {
        variantMap[variantKey] = sizeConfig.variantId;
      }

      if (!sizeMeta.has(label)) {
        sizeMeta.set(label, {
          order: orderCounter++,
          type: sizeConfig.type || inferSizeType(label),
        });
      }
    });
  }

  const packaging = Array.from(sizeMeta.entries())
    .sort(([, a], [, b]) => {
      const typeScore = (value) => (value.type === 'sample' ? 1 : 0);
      const weightA = typeScore(a);
      const weightB = typeScore(b);
      if (weightA !== weightB) return weightA - weightB;
      return a.order - b.order;
    })
    .map(([label]) => label);

  return {
    defaultFinish: defaultFinish || Object.keys(priceByFinish)[0],
    priceByFinish,
    originalPrices,
    variantMap,
    packaging,
    sizeMeta,
  };
}

function inferSizeType(label) {
  if (!label) return 'standard';
  const lower = label.toLowerCase();
  if (lower.includes('swatch') || lower.includes('sample')) {
    return 'sample';
  }
  return 'standard';
}

function buildSizesArray({ priceByFinish, originalPrices, defaultFinish, sizeMeta }) {
  const finishNames = Object.keys(priceByFinish);
  const entries = Array.from(sizeMeta.entries()).map(([label, meta]) => ({
    label,
    type: meta.type,
    order: meta.order,
  }));

  entries.sort((a, b) => {
    const score = (entry) => (entry.type === 'sample' ? 1 : 0);
    const diff = score(a) - score(b);
    if (diff !== 0) return diff;
    return a.order - b.order;
  });

  const lines = ['['];
  entries.forEach((entry, index) => {
    const sizeLabel = entry.label;
    const indent = '  ';
    lines.push(`${indent}{`);
    lines.push(`${indent}  size: "${sizeLabel}",`);

    // priceByFinish block for this size
    lines.push(`${indent}  priceByFinish: {`);
    finishNames.forEach((finishName, finishIndex) => {
      const comma = finishIndex === finishNames.length - 1 ? '' : ',';
      lines.push(
        `${indent}    "${finishName}": priceByFinish["${finishName}"]["${sizeLabel}"]${comma}`,
      );
    });
    lines.push(`${indent}  },`);

    const referenceFinish = priceByFinish[defaultFinish]?.[sizeLabel] !== undefined
      ? defaultFinish
      : finishNames[0];

    lines.push(
      `${indent}  price: priceByFinish["${referenceFinish}"]["${sizeLabel}"],`,
    );

    const originalMap = originalPrices.get(sizeLabel);
    const originalValue =
      (referenceFinish && originalMap?.get(referenceFinish)) ||
      (originalMap && Array.from(originalMap.values())[0]) ||
      priceByFinish[referenceFinish]?.[sizeLabel] ||
      0;
    lines.push(`${indent}  originalPrice: ${Number(originalValue)},`);

    const description = defaultDescriptionForSize(sizeLabel);
    if (description) {
      lines.push(`${indent}  description: "${description}",`);
    }

    const comma = index === entries.length - 1 ? '' : ',';
    lines.push(`${indent}}${comma}`);
  });
  lines.push(']');

  return lines.join('\n');
}

function defaultDescriptionForSize(label) {
  if (!label) return '';
  const normalized = label.toLowerCase();
  if (normalized.includes('swatch')) {
    return 'Color swatch card for quick shade checks';
  }
  if (normalized.includes('sample')) {
    return 'Small sample size for color testing';
  }
  return '';
}

function replaceConstStructure(content, constName, replacement, openChar = '{', closeChar = '}') {
  const regex = new RegExp(`const\\s+${constName}\\s*=\\s*`);
  const match = regex.exec(content);
  if (!match) {
    throw new Error(`Unable to locate declaration for const ${constName}.`);
  }

  const startSearch = match.index + match[0].length;
  const blockStart = content.indexOf(openChar, startSearch);
  if (blockStart === -1) {
    throw new Error(`Unable to find opening "${openChar}" for ${constName}.`);
  }

  const blockEnd = findClosingIndex(content, blockStart, openChar, closeChar);
  return `${content.slice(0, blockStart)}${replacement}${content.slice(blockEnd + 1)}`;
}

function replaceVariantMap(content, variantMap) {
  const constantRegex = /const\s+([A-Z0-9_]+_VARIANT_MAP)\s*=\s*{/;
  const match = constantRegex.exec(content);
  if (!match) {
    throw new Error('Unable to find VARIANT_MAP constant in product detail file.');
  }

  const constName = match[1];
  const replacement = stringifyObject(variantMap);
  return replaceConstStructure(content, constName, replacement);
}

function replacePropertyArray(content, propertyName, values) {
  const regex = new RegExp(`${propertyName}:\\s*\\[`);
  const match = regex.exec(content);
  if (!match) {
    console.warn(`[WARN] Could not find property "${propertyName}" to update.`);
    return content;
  }

  const blockStart = content.indexOf('[', match.index);
  const blockEnd = findClosingIndex(content, blockStart, '[', ']');
  const indentation = detectIndentation(content, match.index);

  const arrayBody = values
    .map((value) => `${indentation}  "${value}"`)
    .join(',\n');

  const replacement = `[\n${arrayBody}\n${indentation}]`;

  return `${content.slice(0, blockStart)}${replacement}${content.slice(blockEnd + 1)}`;
}

function replaceDefaultFinish(content, defaultFinish) {
  if (!defaultFinish) {
    return content;
  }
  const regex = /defaultFinish:\s*"([^"]*)"/;
  if (!regex.test(content)) {
    return content;
  }
  return content.replace(regex, `defaultFinish: "${defaultFinish}"`);
}

function findClosingIndex(text, startIndex, openChar, closeChar) {
  let depth = 0;
  let inString = false;
  let stringChar = null;
  let escapeNext = false;

  for (let i = startIndex; i < text.length; i += 1) {
    const char = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (inString) {
      if (char === '\\') {
        escapeNext = true;
      } else if (char === stringChar) {
        inString = false;
        stringChar = null;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === openChar) {
      depth += 1;
    } else if (char === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return i;
      }
    }
  }

  throw new Error(`Unbalanced ${openChar}${closeChar} block starting at position ${startIndex}.`);
}

function detectIndentation(text, index) {
  let i = index;
  while (i > 0 && text[i - 1] !== '\n' && text[i - 1] !== '\r') {
    i -= 1;
  }
  const lineStart = i;
  const indentMatch = /^[\t ]*/.exec(text.slice(lineStart, index));
  return indentMatch ? indentMatch[0] : '';
}

function stringifyObject(value) {
  return JSON.stringify(value, null, 2);
}

generateProducts().catch((error) => {
  console.error(`[ERROR] Failed to generate product files: ${error.message}`);
  process.exit(1);
});
