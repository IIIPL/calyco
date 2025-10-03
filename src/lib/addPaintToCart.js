import { CALYCO_INTERIOR } from '../data/paintProduct';

// Build payload for CALYCO Interior product.
// size: '1L' | '4L' | '10L' | '20L'
export function buildAddToCartPayload({ size, quantity, sheen, colorFamily, color }) {
  const sizeInfo = CALYCO_INTERIOR.sizes[size];
  if (!sizeInfo?.variantId) throw new Error('Missing variantId for selected size');
  return {
    variantId: sizeInfo.variantId,
    quantity: quantity || 1,
    custom: [
      { key: 'Sheen', value: sheen || '' },
      { key: 'Color Family', value: colorFamily || '' },
      { key: 'Color', value: color || '' },
    ],
  };
}
