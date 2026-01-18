import nodemailer from 'nodemailer';

const GST_RATE = 0.18;
const SELLER_GSTIN = '27AAKCC9776C1Z9';
const LOGO_URL = 'https://calycopaints.com/Logo.webp';
const SELLER_INFO = {
  name: 'Calyco Paints',
  addressLine1: 'B37, Sector 1',
  addressLine2: 'Noida, Uttar Pradesh - 201301',
  country: 'India',
  phone: '+91 8826733064 (WhatsApp - Messages only)',
  email: 'info@calycopaints.com',
  website: 'calycopaints.com'
};

const getRequiredEnv = (key) => {
  const value = process.env[key];
  return value && value.trim() ? value.trim() : null;
};

const buildTransporter = () => {
  const host = getRequiredEnv('SMTP_HOST');
  const portRaw = getRequiredEnv('SMTP_PORT');
  const user = getRequiredEnv('SMTP_USER');
  const pass = getRequiredEnv('SMTP_PASS');

  if (!host || !portRaw || !user || !pass) {
    return null;
  }

  const port = Number(portRaw);
  const secureEnv = getRequiredEnv('SMTP_SECURE');
  const secure =
    secureEnv !== null ? secureEnv.toLowerCase() === 'true' : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass }
  });
};

const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null) return '';
  const number = Number(amount);
  if (Number.isNaN(number)) return String(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2
  }).format(number);
};

const getInclusiveTax = (amount) => {
  const gross = Number(amount || 0);
  const base = gross / (1 + GST_RATE);
  return Math.max(gross - base, 0);
};

const numberToWords = (value) => {
  const number = Math.floor(Number(value || 0));
  if (number <= 0) return 'Zero';

  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const twoDigits = (num) => {
    if (num < 20) return ones[num];
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    return `${tens[ten]}${unit ? ` ${ones[unit]}` : ''}`.trim();
  };

  const threeDigits = (num) => {
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    const hundredText = hundred ? `${ones[hundred]} Hundred` : '';
    const restText = rest ? twoDigits(rest) : '';
    return `${hundredText}${hundredText && restText ? ' ' : ''}${restText}`.trim();
  };

  let n = number;
  const parts = [];
  const crore = Math.floor(n / 10000000);
  if (crore) {
    parts.push(`${threeDigits(crore)} Crore`);
    n %= 10000000;
  }
  const lakh = Math.floor(n / 100000);
  if (lakh) {
    parts.push(`${threeDigits(lakh)} Lakh`);
    n %= 100000;
  }
  const thousand = Math.floor(n / 1000);
  if (thousand) {
    parts.push(`${threeDigits(thousand)} Thousand`);
    n %= 1000;
  }
  if (n) {
    parts.push(threeDigits(n));
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim();
};

const resolveHsn = (item) => {
  const type = String(item?.productType || '').toLowerCase();
  if (type === 'service' || type.includes('service')) return '9983';
  return '3209';
};

const buildItemSpecs = (item) => {
  const parts = [];
  if (item?.selectedSheen) parts.push(item.selectedSheen);
  if (item?.selectedSize) parts.push(item.selectedSize);
  const colorName = item?.selectedColor?.name || item?.selectedColor;
  if (colorName) parts.push(`Color: ${colorName}`);
  if (item?.mixingMode) {
    const mode =
      item.mixingMode === 'ready-mixed'
        ? 'Ready-Mixed Color'
        : item.mixingMode === 'tint-on-demand'
          ? 'Tint-on-Demand'
          : item.mixingMode;
    parts.push(`Type: ${mode}`);
  }
  return parts.length ? parts.join(' | ') : 'Product';
};

const buildItemsTable = (items = [], currency) => {
  if (!items.length) {
    return '<p>No items listed.</p>';
  }

  const rows = items
    .map((item) => {
      const name = item.name || 'Item';
      const qty = item.quantity || 1;
      const price = formatCurrency(item.price, currency);
      return `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;">${name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">${qty}</td>
          <td style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;">${price}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:left;">Item</th>
          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:center;">Qty</th>
          <th style="padding:8px 0;border-bottom:1px solid #e5e7eb;text-align:right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

const buildInvoiceItemsTable = (items = [], currency, summaryRows = '') => {
  if (!items.length) {
    return '<p>No items listed.</p>';
  }

  const rows = items
    .map((item, index) => {
      const name = item.display_name || item.name || 'Item';
      const qty = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      const lineTotal = price * qty;
      const lineTax = getInclusiveTax(lineTotal);
      const specs = buildItemSpecs(item);
      return `
        <tr>
          <td style="padding:6px;border:1px solid #111827;text-align:center;white-space:nowrap;">${index + 1}</td>
          <td style="padding:6px;border:1px solid #111827;">${name}</td>
          <td style="padding:6px;border:1px solid #111827;white-space:nowrap;text-align:center;">${resolveHsn(item)}</td>
          <td style="padding:6px;border:1px solid #111827;color:#6b7280;word-break:break-word;">${specs}</td>
          <td style="padding:6px;border:1px solid #111827;text-align:center;white-space:nowrap;">${qty}</td>
          <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;">${formatCurrency(price, currency)}</td>
          <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;">${formatCurrency(lineTax, currency)}</td>
          <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;font-weight:600;">${formatCurrency(lineTotal, currency)}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #111827;table-layout:fixed;">
      <thead>
        <tr style="background:#f3f4f6;color:#111827;">
          <th style="padding:6px;border:1px solid #111827;text-align:center;">Sl</th>
          <th style="padding:6px;border:1px solid #111827;text-align:left;">Product</th>
          <th style="padding:6px;border:1px solid #111827;text-align:center;">HSN</th>
          <th style="padding:6px;border:1px solid #111827;text-align:left;">Specifications</th>
          <th style="padding:6px;border:1px solid #111827;text-align:center;">Qty</th>
          <th style="padding:6px;border:1px solid #111827;text-align:right;">Unit Price (Incl. GST)</th>
          <th style="padding:6px;border:1px solid #111827;text-align:right;">Tax (Included)</th>
          <th style="padding:6px;border:1px solid #111827;text-align:right;">Total (Incl. GST)</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        ${summaryRows}
      </tbody>
    </table>
  `;
};

const buildInvoiceEmail = (order) => {
  const currency = order?.payment?.currency || order?.pricing?.currency || 'INR';
  const invoiceNumber = order?.invoice?.number || order?.id || '';
  const invoiceDate = order?.invoice?.date || order?.createdAt || new Date().toISOString();
  const subtotal = Number(order?.pricing?.subtotal || 0);
  const discount = Number(order?.pricing?.discount || 0);
  const shipping = Number(order?.pricing?.shipping || 0);
  const effectiveSubtotal = Math.max(subtotal - discount, 0);
  const total = order?.pricing?.total !== undefined ? Number(order.pricing.total) : effectiveSubtotal + shipping;
  const totalTaxIncluded = getInclusiveTax(effectiveSubtotal);
  const customer = order?.customer || {};
  const address = customer?.address || {};

  const cgst = totalTaxIncluded / 2;
  const sgst = totalTaxIncluded / 2;

  const summaryRows = `
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">Item Subtotal (Incl. GST)</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">${formatCurrency(effectiveSubtotal, currency)}</td>
    </tr>
    ${discount ? `
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">Discount</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">-${formatCurrency(discount, currency)}</td>
    </tr>
    ` : ''}
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">Shipping (Non-Taxable)</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">${formatCurrency(shipping, currency)}</td>
    </tr>
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">CGST (9%) - Included</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">${formatCurrency(cgst, currency)}</td>
    </tr>
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">SGST (9%) - Included</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">${formatCurrency(sgst, currency)}</td>
    </tr>
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:600;background:#fafafa;white-space:nowrap;">Total Tax (Included)</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;">${formatCurrency(totalTaxIncluded, currency)}</td>
    </tr>
    <tr>
      <td colspan="7" style="padding:6px;border:1px solid #111827;text-align:right;font-weight:700;background:#fafafa;white-space:nowrap;">Grand Total</td>
      <td style="padding:6px;border:1px solid #111827;text-align:right;white-space:nowrap;background:#fafafa;font-weight:700;">${formatCurrency(total, currency)}</td>
    </tr>
  `;

  const itemsTable = buildInvoiceItemsTable(order?.items || [], currency, summaryRows);
  const amountInWords = `${numberToWords(Math.round(total))} Only`;

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr>
          <td style="vertical-align:top;">
            <table style="border-collapse:collapse;">
              <tr>
                <td style="padding-right:10px;vertical-align:top;">
                  <img src="${LOGO_URL}" alt="Calyco Paints" style="width:110px;height:70px;object-fit:contain;" />
                </td>
                <td style="vertical-align:top;">
                  <div style="font-size:12px;font-weight:700;color:#111827;">Tax Invoice / Bill of Supply</div>
                  <div style="font-size:11px;color:#6b7280;">(Original for Recipient)</div>
                </td>
              </tr>
            </table>
          </td>
          <td style="vertical-align:top;text-align:right;font-size:12px;color:#374151;">
            <div><strong>Invoice No:</strong> ${invoiceNumber}</div>
            <div><strong>Order ID:</strong> ${order?.id || ''}</div>
            <div><strong>Invoice Date:</strong> ${new Date(invoiceDate).toLocaleDateString('en-IN')}</div>
          </td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;background:#f9fafb;border:1px solid #e5e7eb;">
        <tr>
          <td style="padding:12px;vertical-align:top;">
            <div style="font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:700;">Sold By</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${SELLER_INFO.name}</div>
            <div style="font-size:12px;color:#6b7280;">
              ${SELLER_INFO.addressLine1}<br>
              ${SELLER_INFO.addressLine2}<br>
              ${SELLER_INFO.country}
            </div>
            <div style="font-size:12px;color:#6b7280;"><strong>GSTIN:</strong> ${SELLER_GSTIN}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>WhatsApp:</strong> ${SELLER_INFO.phone}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Email:</strong> ${SELLER_INFO.email}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Website:</strong> ${SELLER_INFO.website}</div>
          </td>
          <td style="padding:12px;vertical-align:top;">
            <div style="font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:700;">Billing Address</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${customer.firstName || ''} ${customer.lastName || ''}</div>
            <div style="font-size:12px;color:#6b7280;">
              ${address.street || ''}${address.apartment ? `, ${address.apartment}` : ''}<br>
              ${address.city || ''} ${address.postcode || ''}<br>
              ${address.country || 'India'}
            </div>
            <div style="font-size:12px;color:#6b7280;"><strong>Phone:</strong> ${customer.phone || ''}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Email:</strong> ${customer.email || ''}</div>
            <div style="font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:700;margin-top:10px;">Shipping Address</div>
            <div style="font-size:14px;font-weight:600;color:#111827;">${customer.firstName || ''} ${customer.lastName || ''}</div>
            <div style="font-size:12px;color:#6b7280;">
              ${address.street || ''}${address.apartment ? `, ${address.apartment}` : ''}<br>
              ${address.city || ''} ${address.postcode || ''}<br>
              ${address.country || 'India'}
            </div>
          </td>
        </tr>
      </table>

      ${itemsTable}

      <div style="margin-top:6px;font-size:12px;font-weight:600;color:#111827;">
        Amount in Words: Rupees ${amountInWords}
      </div>

      <table style="width:100%;border-collapse:collapse;margin-top:6px;border:1px solid #111827;font-size:11px;">
        <tr>
          <td style="border:1px solid #111827;padding:6px;white-space:nowrap;"><strong>Payment Transaction ID:</strong> ${order?.payment?.razorpayPaymentId || '-'}</td>
          <td style="border:1px solid #111827;padding:6px;white-space:nowrap;"><strong>Date & Time:</strong> ${new Date(order?.createdAt || Date.now()).toLocaleString('en-IN')}</td>
          <td style="border:1px solid #111827;padding:6px;white-space:nowrap;"><strong>Invoice Value:</strong> ${formatCurrency(total, currency)}</td>
          <td style="border:1px solid #111827;padding:6px;white-space:nowrap;"><strong>Mode of Payment:</strong> ${order?.payment?.method || 'Razorpay'}</td>
        </tr>
      </table>

      <div style="margin-top:12px;font-size:11px;color:#6b7280;text-align:center;">
        This is a system generated invoice and does not require a signature.
      </div>
    </div>
  `;
};

export const sendOrderConfirmationEmail = async (order) => {
  const transporter = buildTransporter();
  if (!transporter) {
    return { skipped: true, reason: 'SMTP not configured' };
  }

  const toEmail = order?.customer?.email;
  if (!toEmail) {
    return { skipped: true, reason: 'Customer email missing' };
  }

  const fromName = getRequiredEnv('FROM_NAME') || 'Calyco Paints';
  const fromEmail = getRequiredEnv('FROM_EMAIL') || getRequiredEnv('SMTP_USER');
  const replyTo = getRequiredEnv('REPLY_TO_EMAIL') || fromEmail;
  const currency = order?.payment?.currency || order?.pricing?.currency || 'INR';

  const subject = `Order confirmed - ${order.id}`;
  const total = formatCurrency(order?.pricing?.total, currency);
  const html = buildInvoiceEmail(order);

  const text = [
    `Thanks for your order.`,
    `Order ID: ${order.id}`,
    `Total: ${total}`,
    `We will share shipping details once your order is dispatched.`
  ].join('\n');

  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: toEmail,
    replyTo,
    subject,
    html,
    text
  });

  return { skipped: false, messageId: info.messageId };
};

export const sendAdminOrderEmail = async (order) => {
  const transporter = buildTransporter();
  if (!transporter) {
    return { skipped: true, reason: 'SMTP not configured' };
  }

  const adminEmail = getRequiredEnv('ADMIN_ORDER_EMAIL');
  if (!adminEmail) {
    return { skipped: true, reason: 'Admin email missing' };
  }

  const fromName = getRequiredEnv('FROM_NAME') || 'Calyco Paints';
  const fromEmail = getRequiredEnv('FROM_EMAIL') || getRequiredEnv('SMTP_USER');
  const replyTo = getRequiredEnv('REPLY_TO_EMAIL') || fromEmail;
  const currency = order?.payment?.currency || order?.pricing?.currency || 'INR';
  const total = formatCurrency(order?.pricing?.total, currency);

  const itemsTable = buildItemsTable(order?.items, currency);
  const customerName = `${order?.customer?.firstName || ''} ${order?.customer?.lastName || ''}`.trim();
  const customerEmail = order?.customer?.email || '';
  const customerPhone = order?.customer?.phone || '';

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <h2 style="margin-bottom:4px;">New order received</h2>
      <p style="margin-top:0;">Order ID: <strong>${order.id}</strong></p>
      <p><strong>Customer:</strong> ${customerName || 'N/A'} (${customerEmail || 'N/A'})</p>
      <p><strong>Phone:</strong> ${customerPhone || 'N/A'}</p>
      ${itemsTable}
      <p style="margin-top:16px;"><strong>Total:</strong> ${total}</p>
    </div>
  `;

  const text = [
    `New order received.`,
    `Order ID: ${order.id}`,
    `Customer: ${customerName || 'N/A'} (${customerEmail || 'N/A'})`,
    `Phone: ${customerPhone || 'N/A'}`,
    `Total: ${total}`
  ].join('\n');

  const info = await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: adminEmail,
    replyTo,
    subject: `New order - ${order.id}`,
    html,
    text
  });

  return { skipped: false, messageId: info.messageId };
};
