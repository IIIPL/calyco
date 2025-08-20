import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '../context/CartContext';

const SIZE_MULTIPLIERS = { '1L': 1, '4L': 3.5, '10L': 8, '20L': 14 };

export default function QuickBuy({
  isOpen,
  onClose,
  product,          // full product object (should include id, name/display_name, price, images[])
  sizes = [],       // optional override: array of strings like ['1L','4L']
  sheens = [],      // optional override: array of strings like ['Matte','Satin']
}) {
  const { addToCart } = useCart();

  // derive fallbacks from product
  const derivedSizes  = (sizes?.length ? sizes : (product?.packaging || [])).filter(Boolean);
  const derivedSheens = (sheens?.length ? sheens : (product?.finish_type_sheen || [])).filter(Boolean);

  const defaultSize  = derivedSizes.length ? derivedSizes[0] : '1L';
  const defaultSheen = derivedSheens.length ? derivedSheens[0] : 'Default';

  const [selectedSize, setSelectedSize]   = useState(defaultSize);
  const [selectedSheen, setSelectedSheen] = useState(defaultSheen);
  const [qty, setQty] = useState(1);

  // reset every time it opens with fresh product context
  useEffect(() => {
    if (!isOpen) return;
    setSelectedSize(defaultSize);
    setSelectedSheen(defaultSheen);
    setQty(1);
  }, [isOpen, product?.id, defaultSize, defaultSheen]);

  const unitPrice = useMemo(() => {
    const mult = SIZE_MULTIPLIERS[selectedSize] ?? 1;
    return Math.round((product?.price || 0) * mult);
  }, [product?.price, selectedSize]);

  // lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleAdd = () => {
    if (!product) return;
    const defaultColor = { name: 'Serene Ivory', hex: '#F8F4E3' };

    // Ensure product shape is compatible with CartContext (needs images[0])
    const safeProduct = {
      id: product.id,
      name: product.display_name || product.name,
      display_name: product.display_name || product.name,
      price: product.price,
      images: Array.isArray(product.images) && product.images.length ? product.images : [product.image].filter(Boolean),
      image: product.image, // harmless extra
    };

    addToCart(
      safeProduct,
      selectedSheen,
      selectedSize,
      qty,
      unitPrice,     // priceOverride per unit
      defaultColor
    );
    onClose?.();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* container: bottom sheet on mobile, centered card on md+ */}
      <div className="absolute inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center">
        <div role="dialog" aria-modal="true"
             className="md:w-[520px] w-full bg-white md:rounded-2xl rounded-t-2xl shadow-2xl">
          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg md:text-xl font-bold text-[#493657]">Quick Buy</h3>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Close">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-500">
                  <path fill="currentColor" d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.29 10.59 10.6 16.89 4.29z"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Size */}
              <div>
                <label className="block text-sm font-semibold text-[#493657] mb-1">Size</label>
                <div className="relative">
                  <select
                    autoFocus
                    className="w-full appearance-none rounded-lg border-2 border-[#E7E0F0] px-3 py-2 text-[#493657] focus:outline-none focus:ring-4 focus:ring-[#F0C85A]/30 focus:border-[#F0C85A]"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {(derivedSizes.length ? derivedSizes : ['1L']).map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#493657]/60">▾</span>
                </div>
              </div>

              {/* Sheen */}
              <div>
                <label className="block text-sm font-semibold text-[#493657] mb-1">Sheen</label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg border-2 border-[#E7E0F0] px-3 py-2 text-[#493657] focus:outline-none focus:ring-4 focus:ring-[#F0C85A]/30 focus:border-[#F0C85A]"
                    value={selectedSheen}
                    onChange={(e) => setSelectedSheen(e.target.value)}
                  >
                    {(derivedSheens.length ? derivedSheens : ['Default']).map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#493657]/60">▾</span>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-[#493657] mb-1">Quantity</label>
                <div className="flex items-center gap-3">
                  <button type="button"
                          className="w-9 h-9 rounded-lg border-2 border-[#E7E0F0] flex items-center justify-center hover:bg-[#493657]/5"
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >-</button>
                  <span className="min-w-[2rem] text-center font-semibold text-[#493657]">{qty}</span>
                  <button type="button"
                          className="w-9 h-9 rounded-lg border-2 border-[#E7E0F0] flex items-center justify-center hover:bg-[#493657]/5"
                          onClick={() => setQty((q) => q + 1)}
                  >+</button>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between bg-[#F0C85A]/10 border border-[#F0C85A]/40 rounded-xl px-3 py-2">
                <span className="text-sm font-semibold text-[#493657]">Total</span>
                <span className="text-base font-bold text-[#301A44]">₹{unitPrice * qty}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button type="button"
                        className="flex-1 px-4 py-3 rounded-lg border-2 border-[#E7E0F0] text-[#493657] font-semibold hover:bg-gray-50"
                        onClick={onClose}
                >
                  Cancel
                </button>
                <button type="button"
                        className="flex-1 px-4 py-3 rounded-lg bg-[#493657] text-white font-semibold hover:bg-[#5a4067]"
                        onClick={handleAdd}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
