import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { coverageFor, getSamples, VISUALIZER_PATH } from '../../lib/catalog';
import { reverseColorNameMapping } from '../../data/colorNameMapping';

const fallbackImage = '/Assets/chair.png';
const PAINT_COLOR_PRODUCT_NAME = 'Paint Color';
const DEFAULT_FINISH = 'Standard Finish';

const PAINT_COLOR_VARIANTS = Object.freeze({
  '1L': {
    price: 499,
    shopifyVariantId: 'gid://shopify/ProductVariant/42619077984374',
  },
  '4L': {
    price: 1747,
    shopifyVariantId: 'gid://shopify/ProductVariant/42619078049910',
  },
  '10L': {
    price: 3992,
    shopifyVariantId: 'gid://shopify/ProductVariant/42619078115446',
  },
  '20L': {
    price: 6986,
    shopifyVariantId: 'gid://shopify/ProductVariant/42619078180982',
  },
});

const PAINT_COLOR_SIZE_ORDER = ['1L', '4L', '10L', '20L'];

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
  const product = products[0];
  const [size, setSize] = useState(PAINT_COLOR_SIZE_ORDER[0]);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const samples = getSamples();

  useEffect(() => {
    setSize(PAINT_COLOR_SIZE_ORDER[0]);
    setQty(1);
  }, [color?.slug, color?.name]);

  const actualHex = useMemo(() => resolveHex(color), [color]);

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

  const unitPrice = useMemo(() => {
    const variantConfig = PAINT_COLOR_VARIANTS[size];
    return variantConfig ? variantConfig.price : 0;
  }, [size]);

  const variantId = useMemo(
    () => (PAINT_COLOR_VARIANTS[size] ? PAINT_COLOR_VARIANTS[size].shopifyVariantId : null),
    [size],
  );

  const sizeOptions = useMemo(
    () => PAINT_COLOR_SIZE_ORDER.map((label) => [label, PAINT_COLOR_VARIANTS[label]]),
    [],
  );

  const coverage = useMemo(() => coverageFor(product), [product]);
  const totalPrice = unitPrice * qty;
  const productType = selectedProductType || 'Interior Latex Paint';

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
      { key: 'Size', value: safeString(size) },
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
      image: color?.image || product?.image || fallbackImage,
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

  const addSampleToCart = (sample) => {
    if (!sample || !color) return;
    const sku = `${sample.skuPrefix}-${colorCode || sanitizeCode(colorMeta.name)}`;
    const sampleLabel = sample.size?.ml ? `${sample.size.ml} ml` : 'Swatch';
    const productForCart = {
      id: sku,
      name: `${sample.name} - ${colorMeta.name || color.name}`,
      display_name: `${sample.name} - ${colorMeta.name || color.name}`,
      price: sample.price,
      image: color?.image || fallbackImage,
    };

    addToCart(
      productForCart,
      'Sample',
      sampleLabel,
      1,
      sample.price,
      { name: colorMeta.name || color?.name || '', hex: colorMeta.hexCode || actualHex, code: colorCode, family: colorMeta.colorFamily || '' },
      'sample',
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
                <div className="font-medium">{label}</div>
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
        <div className="text-2xl font-semibold text-gray-900">{formatCurrency(totalPrice)}</div>
        <button
          onClick={addVariantToCart}
          className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          Add to Cart
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {samples.map((sample) => (
          <button
            key={sample.id}
            onClick={() => addSampleToCart(sample)}
            className="px-3 py-2 border rounded-lg bg-white text-gray-900 hover:border-black/40 transition"
          >
            {sample.name} - {formatCurrency(sample.price)}
          </button>
        ))}
        <Link
          to={`${VISUALIZER_PATH}?color=${encodeURIComponent(colorCode || colorMeta.name)}&hex=${encodeURIComponent(colorMeta.hexCode || actualHex)}`}
          className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
        >
          Visualize This Color
        </Link>
      </div>
    </div>
  );
};

export default ColorBuyBox;
