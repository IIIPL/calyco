import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { coverageFor, getSamples, VISUALIZER_PATH } from '../../lib/catalog';
import { reverseColorNameMapping } from '../../data/colorNameMapping';

const fallbackImage = '/Assets/chair.png';

const sanitizeCode = (value) => {
  if (!value) return '';
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
};

const resolveHex = (color) => {
  if (!color) return '#CCCCCC';
  if (color.actualHex) return color.actualHex;
  if (typeof color.hex === 'string' && color.hex.startsWith('#')) return color.hex;
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

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString('en-IN')}`;

const normaliseSizeKey = (label = '') => label.replace(/\s+/g, '').toUpperCase();
const extractSizeMultiplier = (label = '') => {
  if (!label) return 1;
  const match = String(label).match(/\d+/);
  const key = match ? match[0] : String(label).toLowerCase();
  const map = {
    '1': 1,
    '4': 3.5,
    '10': 8,
    '20': 14,
    '1l': 1,
    '4l': 3.5,
    '10l': 8,
    '20l': 14,
  };
  return map[key] || 1;
};

const ColorBuyBox = ({ color, products = [], selectedProductType }) => {
  const product = products[0];
  const defaultFinish = product?.defaultFinish || product?.finishes?.[0] || 'Low Sheen';
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const samples = getSamples();

  useEffect(() => {
    if (!product) {
      setSize('');
      setQty(1);
      return;
    }
    const finishPricing = product.priceByFinish?.[defaultFinish] || product.price_by_finish?.[defaultFinish] || {};
    const sizeKeys = Object.keys(finishPricing);
    if (sizeKeys.length > 0) {
      setSize((current) => (current && sizeKeys.includes(current) ? current : sizeKeys[0]));
    } else if (product.packaging && product.packaging.length > 0) {
      setSize(product.packaging[0]);
    } else {
      setSize('');
    }
    setQty(1);
  }, [product, defaultFinish, color?.name]);

  const finishPricing = useMemo(() => {
    if (!product) return {};
    return product.priceByFinish?.[defaultFinish] || product.price_by_finish?.[defaultFinish] || {};
  }, [product, defaultFinish]);

  const priceEntry = useMemo(() => {
    if (!size) return null;
    if (finishPricing && typeof finishPricing === 'object') {
      if (finishPricing[size] !== undefined) {
        return finishPricing[size];
      }
      const normalized = normaliseSizeKey(size);
      const match = Object.entries(finishPricing).find(
        ([label]) => normaliseSizeKey(label) === normalized,
      );
      if (match) {
        return match[1];
      }
    }
    return null;
  }, [finishPricing, size]);

  const unitPrice = useMemo(() => {
    if (priceEntry === null || priceEntry === undefined) {
      if (typeof product?.price === 'number') {
        return Math.round(product.price * extractSizeMultiplier(size));
      }
      return 0;
    }
    if (typeof priceEntry === 'number') {
      return priceEntry;
    }
    if (typeof priceEntry === 'object' && priceEntry.price !== undefined) {
      return Number(priceEntry.price) || 0;
    }
    return 0;
  }, [priceEntry, product, size]);

  const variantId = useMemo(() => {
    if (priceEntry && typeof priceEntry === 'object' && priceEntry.variantId) {
      return priceEntry.variantId;
    }
    const map = product?.shopify_variant_map || {};
    const exactKey = `${size}-${defaultFinish}`;
    if (map[exactKey]) {
      return map[exactKey];
    }
    const normalized = normaliseSizeKey(size || '');
    const fallbackKey = `${normalized}-${defaultFinish}`;
    return map[fallbackKey] || null;
  }, [priceEntry, product, size, defaultFinish]);

  const sizeOptions = useMemo(() => {
    if (finishPricing && typeof finishPricing === 'object') {
      return Object.entries(finishPricing);
    }
    if (Array.isArray(product?.packaging)) {
      return product.packaging.map((label) => [label, null]);
    }
    return [];
  }, [finishPricing, product]);

  const coverage = useMemo(() => coverageFor(product), [product]);
  const totalPrice = unitPrice * qty;

  if (!product || !size) {
    return null;
  }

  const actualHex = resolveHex(color);
  const colorCode = sanitizeCode(color?.code || color?.tintCode || color?.hex || color?.name);
  const colorFamily = color?.colorFamily || color?.color_family || '';

  const productType = selectedProductType || product?.productType || 'Interior Latex Paint';

  const addVariantToCart = async () => {
    if (!size) {
      return;
    }

    const normalisedSize = normaliseSizeKey(size);
    const productForCart = {
      id: variantId || `${product.id || 'interior-latex'}-${normalisedSize}-${colorCode}`,
      name: `${product.name} - ${color.name}`,
      display_name: `${product.name} - ${color.name}`,
      price: unitPrice,
      image: color.image || product.image || fallbackImage,
    };

    const attributes = {
      'Color Code': colorCode,
      'Color Name': color.name,
      'Color Family': colorFamily,
      'Color Hex': actualHex,
      Finish: defaultFinish,
      'Product Type': productType,
      Size: size,
    };

    await addToCart(
      productForCart,
      defaultFinish,
      size,
      qty,
      unitPrice,
      { name: color.name, hex: actualHex, code: colorCode, family: colorFamily },
      productType,
      {
        variantId,
        productType,
        attributes,
      },
    );
  };

  const addSampleToCart = (sample) => {
    if (!sample || !color) return;
    const sku = `${sample.skuPrefix}-${colorCode || sanitizeCode(color.name)}`;
    const sampleLabel = sample.size?.ml ? `${sample.size.ml} ml` : 'Swatch';
    const productForCart = {
      id: sku,
      name: `${sample.name} — ${color.name}`,
      display_name: `${sample.name} — ${color.name}`,
      price: sample.price,
      image: color.image || fallbackImage,
    };

    addToCart(
      productForCart,
      'Sample',
      sampleLabel,
      1,
      sample.price,
      { name: color.name, hex: actualHex, code: colorCode, family: colorFamily },
      'sample',
    );
  };

  return (
    <div className="space-y-6 p-6 border rounded-2xl bg-white/90 shadow-sm">
      <div>
        <div className="text-sm uppercase tracking-wide text-gray-500 mb-1">Choose Size</div>
        <div className="text-base font-semibold text-gray-900">{product.name}</div>
      </div>

      <div>
        <div className="mb-2 font-medium text-gray-900">Size</div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map(([label, entry]) => {
            const isSelected = label === size;
            const optionPrice = entry === undefined || entry === null
              ? (typeof product?.price === 'number' ? Math.round(product.price * extractSizeMultiplier(label)) : 0)
              : typeof entry === 'number'
                ? entry
                : entry?.price ?? 0;
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
            {sample.name} — {formatCurrency(sample.price)}
          </button>
        ))}
        <Link
          to={`${VISUALIZER_PATH}?color=${encodeURIComponent(colorCode || color.name)}&hex=${encodeURIComponent(actualHex)}`}
          className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition"
        >
          Visualize This Color
        </Link>
      </div>
    </div>
  );
};

export default ColorBuyBox;
