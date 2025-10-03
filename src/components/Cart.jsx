import { useCart } from '../context/CartContext';

export default function Cart() {
  const { checkout, updateQty, remove, goToCheckout, loading } = useCart();

  // Shopify cart disabled for performance
  if (!checkout) return null;
  const items = checkout?.lineItems || [];

  return (
    <div>
      <h3>Cart</h3>
      {items.length === 0 ? <p>Empty</p> : (
        <ul>
          {items.map(li => (
            <li key={li.id} style={{ marginBottom: 12 }}>
              <div>{li.title}</div>
              <div>{li.variant?.title}</div>
              {li.customAttributes?.length ? (
                <small>{li.customAttributes.map(a => `${a.key}: ${a.value}`).join(' | ')}</small>
              ) : null}
              <div>
                Qty:
                <input
                  type="number"
                  min="1"
                  value={li.quantity}
                  onChange={e => updateQty(li.id, parseInt(e.target.value || '1', 10))}
                  style={{ width: 60, marginLeft: 8 }}
                />
              </div>
              <button onClick={() => remove(li.id)} disabled={loading}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 0 && (
        <button onClick={goToCheckout} disabled={loading}>Checkout</button>
      )}
    </div>
  );
}
