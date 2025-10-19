import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { coverageFor, VISUALIZER_PATH } from '../../lib/catalog';
import { reverseColorNameMapping } from '../../data/colorNameMapping';

const fallbackImage = '/Assets/chair.png';
const PAINT_COLOR_PRODUCT_NAME = 'Paint Color';
const DEFAULT_FINISH = 'Standard Finish';

// Pricing and Shopify variants for all 5 products
const PRODUCT_PRICING = Object.freeze({
  'Premium Interior Emulsion': {
    '1L': { price: 700, mrp: 850, shopifyVariantId: 'gid://shopify/ProductVariant/42619077984374' },
    '4L': { price: 2700, mrp: 3400, shopifyVariantId: 'gid://shopify/ProductVariant/42619078049910' },
    '10L': { price: 6500, mrp: 8500, shopifyVariantId: 'gid://shopify/ProductVariant/42619078115446' },
    '20L': { price: 12800, mrp: 17000, shopifyVariantId: 'gid://shopify/ProductVariant/42619078180982' },
    'Swatch Card': { price: 99, mrp: 150, shopifyVariantId: 'gid://shopify/ProductVariant/42664304443510' },
    'Sample Pot 200ml': { price: 199, mrp: 250, shopifyVariantId: 'gid://shopify/ProductVariant/42664304476278' },
  },
  'Luxury Interior Emulsion': {
    '1L': { price: 800, mrp: 1000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304509046' },
    '4L': { price: 3500, mrp: 4200, shopifyVariantId: 'gid://shopify/ProductVariant/42664304541814' },
    '10L': { price: 8400, mrp: 10000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304574582' },
    '20L': { price: 16000, mrp: 20000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304607350' },
    'Swatch Card': { price: 99, mrp: 150, shopifyVariantId: 'gid://shopify/ProductVariant/42664304640118' },
    'Sample Pot 200ml': { price: 199, mrp: 250, shopifyVariantId: 'gid://shopify/ProductVariant/42664304672886' },
  },
  'Premium Exterior Emulsion': {
    '1L': { price: 700, mrp: 850, shopifyVariantId: 'gid://shopify/ProductVariant/42664304705654' },
    '4L': { price: 2700, mrp: 3400, shopifyVariantId: 'gid://shopify/ProductVariant/42664304738422' },
    '10L': { price: 6500, mrp: 8500, shopifyVariantId: 'gid://shopify/ProductVariant/42664304771190' },
    '20L': { price: 12800, mrp: 17000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304803958' },
    'Swatch Card': { price: 99, mrp: 150, shopifyVariantId: 'gid://shopify/ProductVariant/42664304836726' },
    'Sample Pot 200ml': { price: 199, mrp: 250, shopifyVariantId: 'gid://shopify/ProductVariant/42664304869494' },
  },
  'Luxury Exterior Emulsion': {
    '1L': { price: 800, mrp: 1000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304902262' },
    '4L': { price: 3500, mrp: 4200, shopifyVariantId: 'gid://shopify/ProductVariant/42664304935030' },
    '10L': { price: 8400, mrp: 10000, shopifyVariantId: 'gid://shopify/ProductVariant/42664304967798' },
    '20L': { price: 16000, mrp: 20000, shopifyVariantId: 'gid://shopify/ProductVariant/42664305000566' },
    'Swatch Card': { price: 99, mrp: 150, shopifyVariantId: 'gid://shopify/ProductVariant/42664305033334' },
    'Sample Pot 200ml': { price: 199, mrp: 250, shopifyVariantId: 'gid://shopify/ProductVariant/42664305066102' },
  },
  'Waterproofing Sealer': {
    '1L': { price: 700, mrp: 850, shopifyVariantId: 'gid://shopify/ProductVariant/42664305098870' },
    '4L': { price: 2700, mrp: 3400, shopifyVariantId: 'gid://shopify/ProductVariant/42664305131638' },
    '10L': { price: 6500, mrp: 8500, shopifyVariantId: 'gid://shopify/ProductVariant/42664305164406' },
    '20L': { price: 12800, mrp: 17000, shopifyVariantId: 'gid://shopify/ProductVariant/42664305197174' },
    'Swatch Card': { price: 99, mrp: 150, shopifyVariantId: 'gid://shopify/ProductVariant/42664305229942' },
    'Sample Pot 200ml': { price: 199, mrp: 250, shopifyVariantId: 'gid://shopify/ProductVariant/42664305262710' },
  },
});

const PAINT_COLOR_SIZE_ORDER = ['1L', '4L', '10L', '20L', 'Swatch Card', 'Sample Pot 200ml'];

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

  const productVariants = useMemo(() => {
    const productType = selectedProductType || 'Premium Interior Emulsion';
    return PRODUCT_PRICING[productType] || PRODUCT_PRICING['Premium Interior Emulsion'];
  }, [selectedProductType]);

  const unitPrice = useMemo(() => {
    const variantConfig = productVariants[size];
    return variantConfig ? variantConfig.price : 0;
  }, [size, productVariants]);

  const unitMrp = useMemo(() => {
    const variantConfig = productVariants[size];
    return variantConfig ? variantConfig.mrp : 0;
  }, [size, productVariants]);

  const variantId = useMemo(
    () => (productVariants[size] ? productVariants[size].shopifyVariantId : null),
    [size, productVariants],
  );

  const sizeOptions = useMemo(
    () => PAINT_COLOR_SIZE_ORDER.map((label) => [label, productVariants[label]]),
    [productVariants],
  );

  const coverage = useMemo(() => coverageFor(product), [product]);
  const totalPrice = unitPrice * qty;
  const totalMrp = unitMrp * qty;
  const productType = selectedProductType || 'Premium Interior Emulsion';

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
