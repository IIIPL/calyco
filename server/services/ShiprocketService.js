import fetch from 'node-fetch';

const DEFAULT_PACKAGE = {
  weight: 2.5,
  length: 30,
  breadth: 20,
  height: 15
};

const SIZE_PACKAGES = [
  { match: ['200ml', 'samplepot200ml'], weight: 0.3, length: 12, breadth: 12, height: 10 },
  { match: ['1l', '1liter', '1ltr'], weight: 1.4, length: 16, breadth: 16, height: 18 },
  { match: ['2l', '2liter', '2ltr'], weight: 2.6, length: 18, breadth: 18, height: 20 },
  { match: ['4l', '4liter', '4ltr'], weight: 5.0, length: 22, breadth: 22, height: 25 },
  { match: ['10l', '10liter', '10ltr'], weight: 12.0, length: 30, breadth: 28, height: 30 },
  { match: ['20l', '20liter', '20ltr'], weight: 25.0, length: 35, breadth: 35, height: 40 },
  { match: ['1kg', '1kgm'], weight: 1.2, length: 20, breadth: 20, height: 15 },
  { match: ['5kg', '5kgm'], weight: 5.0, length: 32, breadth: 22, height: 14 },
  { match: ['10kg', '10kgm'], weight: 10.0, length: 35, breadth: 25, height: 20 }
];

const normalizeSizeToken = (value) => {
  if (!value) return '';
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
};

const resolvePackageForItem = (item) => {
  const sizeToken = normalizeSizeToken(item?.selectedSize || item?.size);
  if (!sizeToken) return DEFAULT_PACKAGE;

  for (const pkg of SIZE_PACKAGES) {
    if (pkg.match.some((token) => sizeToken.includes(token))) {
      return pkg;
    }
  }

  return DEFAULT_PACKAGE;
};

const resolveAggregatePackage = (items = []) => {
  if (!items.length) return { ...DEFAULT_PACKAGE };

  let totalWeight = 0;
  let totalVolume = 0;
  let maxLength = DEFAULT_PACKAGE.length;
  let maxBreadth = DEFAULT_PACKAGE.breadth;
  let maxHeight = DEFAULT_PACKAGE.height;

  items.forEach((item) => {
    const pkg = resolvePackageForItem(item);
    const qty = Number(item?.quantity || 1);
    totalWeight += pkg.weight * qty;
    totalVolume += pkg.length * pkg.breadth * pkg.height * qty;
    maxLength = Math.max(maxLength, pkg.length);
    maxBreadth = Math.max(maxBreadth, pkg.breadth);
    maxHeight = Math.max(maxHeight, pkg.height);
  });

  const baseArea = maxLength * maxBreadth;
  const computedHeight = baseArea > 0 ? Math.ceil(totalVolume / baseArea) : maxHeight;

  return {
    weight: Number(totalWeight.toFixed(2)),
    length: maxLength,
    breadth: maxBreadth,
    height: Math.max(computedHeight, maxHeight)
  };
};

const resolveHsn = (item) => {
  const type = String(item?.productType || '').toLowerCase();
  if (type === 'service' || type.includes('service')) return '9983';
  return '3209';
};

const resolveShippingItems = (items = []) => {
  return (items || []).filter((item) => {
    const type = String(item?.productType || '').toLowerCase();
    const sizeToken = normalizeSizeToken(item?.selectedSize || item?.size);
    const isService =
      type === 'service' ||
      type.includes('service') ||
      sizeToken.includes('onetime') ||
      sizeToken.includes('one-time');
    return !isService;
  });
};

const resolveUnitPrice = (item) => {
  const qty = Number(item?.quantity || 1);
  const price = Number(item?.price || 0);
  if (qty > 0) {
    return Number((price / qty).toFixed(2));
  }
  return price;
};

const getStateFromPincode = (pincode) => {
  const firstDigit = String(pincode || '')[0];
  const stateMap = {
    '1': 'Delhi',
    '2': 'Haryana',
    '3': 'Punjab',
    '4': 'Maharashtra',
    '5': 'Andhra Pradesh',
    '6': 'Karnataka',
    '7': 'West Bengal',
    '8': 'Bihar',
    '9': 'Kerala'
  };
  return stateMap[firstDigit] || 'Haryana';
};

export class ShiprocketService {
  constructor() {
    this.baseURL = 'https://apiv2.shiprocket.in/v1/external';
    this.email = process.env.SHIPROCKET_EMAIL;
    this.password = process.env.SHIPROCKET_PASSWORD;
    this.pickupLocation = process.env.SHIPROCKET_PICKUP_LOCATION || 'work';
    this.token = null;
    this.tokenExpiry = null;
  }

  async login() {
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }

    if (!this.email || !this.password) {
      throw new Error('Shiprocket credentials are missing');
    }

    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.email,
        password: this.password
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Shiprocket login failed: ${errorText}`);
    }

    const data = await response.json();
    this.token = data.token;
    this.tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000);
    return this.token;
  }

  async createOrder(orderData) {
    try {
      await this.login();
      const shippingItems = resolveShippingItems(orderData?.items || []);
      if (!shippingItems.length) {
        return { success: false, error: 'No shippable items' };
      }

      const address = orderData.customer?.address || {};
      const packageInfo = resolveAggregatePackage(shippingItems);
      const subTotal = Number(orderData?.pricing?.subtotal || 0);
      const discount = Number(orderData?.pricing?.discount || 0);

      const shiprocketOrder = {
        order_id: orderData.id,
        order_date: new Date(orderData.createdAt).toISOString().split('T')[0],
        pickup_location: this.pickupLocation,
        comment: 'Order from calycopaints.com',
        billing_customer_name: orderData.customer?.firstName || '',
        billing_last_name: orderData.customer?.lastName || '',
        billing_address: address.street || '',
        billing_address_2: address.apartment || '',
        billing_city: address.city || '',
        billing_pincode: address.postcode || '',
        billing_state: getStateFromPincode(address.postcode),
        billing_country: 'India',
        billing_email: orderData.customer?.email || '',
        billing_phone: orderData.customer?.phone || '',
        shipping_is_billing: true,
        order_items: shippingItems.map((item) => ({
          name: item.display_name || item.name || 'Product',
          sku: item.id || `SKU-${String(item.name || 'product').replace(/\s+/g, '-')}`,
          units: Number(item.quantity || 1),
          selling_price: resolveUnitPrice(item),
          discount: 0,
          tax: Math.round(resolveUnitPrice(item) * 0.18),
          hsn: resolveHsn(item)
        })),
        payment_method: orderData.payment?.method === 'razorpay' ? 'Prepaid' : 'COD',
        shipping_charges: Number(orderData?.pricing?.shipping || 0),
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: discount,
        sub_total: subTotal,
        length: packageInfo.length,
        breadth: packageInfo.breadth,
        height: packageInfo.height,
        weight: packageInfo.weight
      };

      const response = await fetch(`${this.baseURL}/orders/create/adhoc`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shiprocketOrder)
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: errorText };
      }

      const data = await response.json();
      return {
        success: true,
        shiprocket_order_id: data.order_id,
        shipment_id: data.shipment_id,
        status: data.status,
        status_code: data.status_code
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export const shiprocketService = new ShiprocketService();
