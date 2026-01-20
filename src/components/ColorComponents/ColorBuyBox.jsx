import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { coverageFor, VISUALIZER_PATH } from '../../lib/catalog';
import { reverseColorNameMapping } from '../../data/colorNameMapping';
import premiumInteriorEmulsionDetail from '../../data/productDetail.premiumInteriorEmulsion';
import interiorLatexPaintDetail from '../../data/productDetail.interiorLatexPaint';
import premiumExteriorEmulsionDetail from '../../data/productDetail.premiumExteriorEmulsion';
import exteriorLatexPaintDetail from '../../data/productDetail.exteriorLatexPaint';
import waterproofingSealerDetail from '../../data/productDetail.waterproofingSealer';

const fallbackImage = '/Assets/chair.webp';
const PAINT_COLOR_PRODUCT_NAME = 'Paint Color';
const DEFAULT_FINISH = 'Standard Finish';

const DEFAULT_PRODUCT_TYPE = 'Premium Interior Emulsion';
const DEFAULT_SIZE_ORDER = ['1L', '4L', '10L', '20L', 'Swatch Card', 'SamplePot 200ml'];

const productDetailMap = {
  'Premium Interior Emulsion': premiumInteriorEmulsionDetail,
  'Luxury Interior Emulsion': interiorLatexPaintDetail,
  'Premium Exterior Emulsion': premiumExteriorEmulsionDetail,
  'Luxury Exterior Emulsion': exteriorLatexPaintDetail,
  'Waterproofing Sealer': waterproofingSealerDetail,
};

const normalizeSizeKey = (label = '') => label.toLowerCase().replace(/[\s-]+/g, '');

const formatSizeLabel = (label = '') =>
  label
    .replace(/SamplePot/gi, 'Sample Pot')
    .replace(/(\d)\s*ml/gi, '$1 ml')
    .replace(/\s{2,}/g, ' ')
    .trim();

const createSizeAliases = (label = '') => {
  const canonical = label.replace(/\s+/g, ' ').trim();
  const aliases = new Set([canonical]);
  aliases.add(canonical.replace(/SamplePot/gi, 'Sample Pot'));
  aliases.add(canonical.replace(/Sample\s+Pot/gi, 'SamplePot'));
  aliases.add(canonical.replace(/(\d)\s*ml/gi, '$1 ml'));
  aliases.add(normalizeSizeKey(label));
  return Array.from(aliases);
};

const extractPriceValue = (entry) => {
  if (entry === null || entry === undefined) return undefined;
  if (typeof entry === 'number') return entry;
  if (typeof entry === 'object') {
    if (typeof entry.price === 'number') return entry.price;
    if (typeof entry.current === 'number') return entry.current;
  }
  return undefined;
};

const extractMrpValue = (entry, fallback) => {
  if (entry === null || entry === undefined) return fallback;
  if (typeof entry === 'number') return entry;
  if (typeof entry === 'object') {
    if (typeof entry.mrp === 'number') return entry.mrp;
    if (typeof entry.original === 'number') return entry.original;
  }
  return fallback;
};

const resolveVariantId = (map = {}, label, finish) => {
  if (!map) return null;
  const finishOptions = [
    finish,
    finish.replace(/\s+/g, ''),
    finish.replace(/\s*finish$/i, ' Finish'),
  ];

  for (const sizeAlias of createSizeAliases(label)) {
    const compactAlias = sizeAlias.replace(/\s+/g, '');
    for (const finishOption of finishOptions) {
      const finishCompact = finishOption.replace(/\s+/g, '');
      const candidates = [
        `${sizeAlias}-${finishOption}`,
        `${compactAlias}-${finishOption}`,
        `${compactAlias}-${finishCompact}`,
        `${sizeAlias}-${finishCompact}`,
      ];
      for (const key of candidates) {
        if (map[key]) return map[key];
      }
    }
  }

  return null;
};

const buildVariantData = (detail) => {
  if (!detail) {
    return { detail: null, variants: {}, sizeOrder: DEFAULT_SIZE_ORDER, defaultFinish: '' };
  }

  const finishes = detail.priceByFinish || detail.price_by_finish || {};
  const finish = detail.defaultFinish || Object.keys(finishes)[0] || '';
  const finishPricing = finishes[finish] || {};
  const sizes = Array.isArray(detail.sizes) ? detail.sizes : [];

  const sizeOrder =
    sizes.length > 0
      ? sizes
          .map((entry) => (entry.size || '').replace(/\s+/g, ' ').trim())
          .filter(Boolean)
      : DEFAULT_SIZE_ORDER;

  const variants = {};

  sizeOrder.forEach((label) => {
    const sizeEntry =
      sizes.find((entry) => (entry.size || '').replace(/\s+/g, ' ').trim() === label) || {};
    const finishEntry = finishPricing[label];
    const salePrice = sizeEntry.price ?? extractPriceValue(finishEntry);
    const mrp = sizeEntry.originalPrice ?? extractMrpValue(finishEntry, salePrice);
    const variantId = resolveVariantId(detail.shopify_variant_map, label, finish);

    const variantData = {
      price: Number.isFinite(salePrice) ? Number(salePrice) : 0,
      mrp: Number.isFinite(mrp) ? Number(mrp) : Number.isFinite(salePrice) ? Number(salePrice) : 0,
      shopifyVariantId: variantId || null,
    };

    createSizeAliases(label).forEach((alias) => {
      if (alias) {
        variants[alias] = variantData;
      }
    });
  });

  return {
    detail,
    variants,
    sizeOrder,
    defaultFinish: finish,
  };
};

const PRODUCT_VARIANT_DATA = Object.fromEntries(
  Object.entries(productDetailMap).map(([key, detail]) => [key, buildVariantData(detail)]),
);

const DEFAULT_PRODUCT_DATA = PRODUCT_VARIANT_DATA[DEFAULT_PRODUCT_TYPE];

const getVariantConfig = (variants, label) =>
  variants[label] || variants[normalizeSizeKey(label)] || null;

const sanitizeCode = (value) => {
  if (!value) return '';
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
};

const resolveHex = (color) => {
  if (!color) return '#CCCCCC';
  if (color.actualHex) return color.actualHex;
  if (typeof color.hex === 'string' && color.hex.startsWith('#')) return color.hex.toUpperCase();
  if (color.tintCode) {
    const mapped = reverseColorNameMapping[color.tintCode];
    if (mapped) return mapped;
  }
  if (color.hex) {
    const mapped = reverseColorNameMapping[color.hex];
    if (mapped) return mapped;
  }
  return '#CCCCCC';
};

const normaliseHexCode = (value = '') => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return '';
  const cleaned = trimmed.replace(/^#/, '').toUpperCase();
  return `#${cleaned}`;
};

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const normaliseSizeKey = (label = '') => label.replace(/\s+/g, '').toUpperCase();

const safeString = (value) => {
  if (value === null || value === undefined) return 'N/A';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  const str = String(value).trim();
  return str || 'N/A';
};

const safeBoolean = (value) => {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return 'N/A';
};

const ColorBuyBox = ({ color, products = [], selectedProductType, colorAttributes }) => {
  const productType = selectedProductType || DEFAULT_PRODUCT_TYPE;
  const productData = useMemo(
    () => PRODUCT_VARIANT_DATA[productType] || DEFAULT_PRODUCT_DATA,
    [productType],
  );
  const productVariants = productData?.variants || {};
  const sizeOrder =
    productData?.sizeOrder && productData.sizeOrder.length > 0
      ? productData.sizeOrder
      : DEFAULT_SIZE_ORDER;

  const [size, setSize] = useState(() => sizeOrder[0] || DEFAULT_SIZE_ORDER[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const nextOrder =
      productData?.sizeOrder && productData.sizeOrder.length > 0
        ? productData.sizeOrder
        : DEFAULT_SIZE_ORDER;
    setSize(nextOrder[0] || DEFAULT_SIZE_ORDER[0]);
    setQty(1);
  }, [color?.slug, color?.name, productData]);

  const actualHex = useMemo(() => resolveHex(color), [color]);
  const productRecord = products[0] || productData.detail || {};

  const colorMeta = useMemo(() => {
    const meta = colorAttributes || {};
    return {
      name: meta.name || color?.name || '',
      ralCode: meta.ralCode || color?.code || color?.tintCode || '',
      hexCode: normaliseHexCode(meta.hexCode || actualHex),
      colorFamily: meta.colorFamily || color?.colorFamily || color?.color_family || '',
      tone: meta.tone || '',
      layer: meta.layer || '',
      sheen: meta.sheen || '',
      collection: meta.collection || '',
      interiorUse: meta.interiorUse || '',
      exteriorUse: meta.exteriorUse || '',
      mood: meta.mood || '',
      lightReflectance: meta.lightReflectance || '',
      undertone: meta.undertone || '',
      popularity: meta.popularity || '',
      contractor: meta.contractor ?? false,
      designer: meta.designer ?? false,
    };
  }, [actualHex, color, colorAttributes]);

  const colorCode = useMemo(
    () =>
      sanitizeCode(
        colorMeta.ralCode ||
          color?.code ||
          color?.tintCode ||
          color?.hex ||
          colorMeta.name ||
          '',
      ),
    [color, colorMeta],
  );

  const currentVariant = useMemo(
    () => getVariantConfig(productVariants, size),
    [productVariants, size],
  );

  const unitPrice = currentVariant?.price ?? 0;
  const unitMrp = currentVariant?.mrp ?? 0;
  const variantId = currentVariant?.shopifyVariantId ?? null;

  const sizeOptions = useMemo(
    () =>
      sizeOrder
        .map((label) => {
          const variantConfig = getVariantConfig(productVariants, label);
          if (!variantConfig) return null;
          return [label, variantConfig];
        })
        .filter(Boolean),
    [productVariants, sizeOrder],
  );

  const coverage = useMemo(() => coverageFor(productRecord), [productRecord]);
  const totalPrice = unitPrice * qty;
  const totalMrp = unitMrp * qty;

  const customAttributes = useMemo(
    () => [
      { key: 'RAL Code', value: safeString(colorMeta.ralCode) },
      { key: 'Color Name', value: safeString(colorMeta.name || color?.name) },
      { key: 'Hex Code', value: safeString(colorMeta.hexCode || actualHex) },
      { key: 'Color Family', value: safeString(colorMeta.colorFamily) },
      { key: 'Tone', value: safeString(colorMeta.tone) },
      { key: 'Layer', value: safeString(colorMeta.layer) },
      { key: 'Sheen', value: safeString(colorMeta.sheen) },
      { key: 'Collection', value: safeString(colorMeta.collection) },
      { key: 'Interior Use', value: safeString(colorMeta.interiorUse) },
      { key: 'Exterior Use', value: safeString(colorMeta.exteriorUse) },
      { key: 'Mood', value: safeString(colorMeta.mood) },
      { key: 'Light Reflectance', value: safeString(colorMeta.lightReflectance) },
      { key: 'Undertone', value: safeString(colorMeta.undertone) },
      { key: 'Popularity', value: safeString(colorMeta.popularity) },
      { key: 'Contractor', value: safeBoolean(colorMeta.contractor) },
      { key: 'Designer', value: safeBoolean(colorMeta.designer) },
      { key: 'Product Type', value: safeString(productType) },
      { key: 'Size', value: safeString(formatSizeLabel(size)) },
    ],
    [actualHex, color?.name, colorMeta, productType, size],
  );

  const addVariantToCart = async () => {
    if (!size) {
      alert('Please select a size before adding to cart.');
      return;
    }

    if (!variantId) {
      console.error('[CALYCO] Missing Shopify variant ID for size:', size);
      alert('We could not find the selected size. Please try again.');
      return;
    }

    const normalisedSize = normaliseSizeKey(size);
    const selectedColorInfo = {
      name: colorMeta.name || color?.name || '',
      hex: colorMeta.hexCode || actualHex,
      code: colorCode,
      family: colorMeta.colorFamily || '',
    };

    const productForCart = {
      id: variantId || `paint-color-${normalisedSize}-${colorCode}`,
      name: `${PAINT_COLOR_PRODUCT_NAME} - ${selectedColorInfo.name}`,
      display_name: `${PAINT_COLOR_PRODUCT_NAME} - ${selectedColorInfo.name}`,
      price: unitPrice,
      image: color?.image || productRecord?.image || fallbackImage,
    };

    await addToCart(
      productForCart,
      DEFAULT_FINISH,
      size,
      qty,
      unitPrice,
      selectedColorInfo,
      productType,
      {
        variantId,
        productType,
        attributes: customAttributes,
      },
    );
  };


  return (
    <div className="space-y-6 p-6 border rounded-2xl bg-white/90 shadow-sm">
      <div>
        <div className="mb-2 font-medium text-gray-900">Size</div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map(([label, entry]) => {
            const isSelected = label === size;
            const optionPrice = entry?.price ?? 0;
            return (
              <button
                key={label}
                onClick={() => setSize(label)}
                className={`px-3 py-2 rounded-lg border text-left transition ${
                  isSelected ? 'bg-black text-white border-black' : 'bg-white text-gray-900 hover:border-black/40'
                }`}
              >
                <div className="font-medium">{formatSizeLabel(label)}</div>
                <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {formatCurrency(optionPrice)}
                </div>
              </button>
            );
          })}
        </div>
        {coverage && <div className="text-sm text-gray-600 mt-2">{coverage}</div>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="px-3 py-2 border rounded-lg text-lg"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="w-8 text-center text-lg font-medium">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="px-3 py-2 border rounded-lg text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-semibold text-gray-900">{formatCurrency(totalPrice)}</div>
          {totalMrp > 0 && totalMrp !== totalPrice && (
            <div className="text-lg text-red-500 line-through">{formatCurrency(totalMrp)}</div>
          )}
        </div>
        <button
          onClick={addVariantToCart}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Add to Cart
        </button>
      </div>

      <div>
        <Link
          to={`${VISUALIZER_PATH}?color=${encodeURIComponent(colorCode || colorMeta.name)}&hex=${encodeURIComponent(colorMeta.hexCode || actualHex)}`}
          className="inline-block px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
        >
          Visualize This Color
        </Link>
      </div>
    </div>
  );
};

export default ColorBuyBox;
