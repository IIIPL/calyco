import nodemailer from 'nodemailer';

const GST_RATE = 0.18;
const SELLER_GSTIN = '27AAKCC9776C1Z9';
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

const buildInvoiceItemsTable = (items = [], currency) => {
  if (!items.length) {
    return '<p>No items listed.</p>';
  }

  const rows = items
    .map((item) => {
      const name = item.display_name || item.name || 'Item';
      const qty = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      const baseTotal = price * qty;
      const lineTax = Math.round(baseTotal * GST_RATE);
      const lineTotal = baseTotal + lineTax;
      const specs = buildItemSpecs(item);
      return `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${name}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;">${resolveHsn(item)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;color:#6b7280;">${specs}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:center;">${qty}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(price, currency)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;">${formatCurrency(lineTax, currency)}</td>
          <td style="padding:8px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">${formatCurrency(lineTotal, currency)}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;">
      <thead>
        <tr style="background:#493657;color:#fff;">
          <th style="padding:8px;text-align:left;">Product</th>
          <th style="padding:8px;text-align:left;">HSN</th>
          <th style="padding:8px;text-align:left;">Specifications</th>
          <th style="padding:8px;text-align:center;">Qty</th>
          <th style="padding:8px;text-align:right;">Unit Price</th>
          <th style="padding:8px;text-align:right;">Tax</th>
          <th style="padding:8px;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
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
  const taxableAmount = Math.max(subtotal - discount, 0);
  const tax = order?.pricing?.tax !== undefined ? Number(order.pricing.tax) : Math.round(taxableAmount * GST_RATE);
  const total = order?.pricing?.total !== undefined ? Number(order.pricing.total) : taxableAmount + shipping + tax;
  const customer = order?.customer || {};
  const address = customer?.address || {};

  const itemsTable = buildInvoiceItemsTable(order?.items || [], currency);
  const cgst = tax / 2;
  const sgst = tax / 2;

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr>
          <td style="vertical-align:top;">
            <div style="font-size:22px;font-weight:700;color:#493657;">${SELLER_INFO.name}</div>
            <div style="font-size:13px;color:#6b7280;font-weight:600;">Premium Paint Solutions</div>
            <div style="font-size:12px;color:#6b7280;">Transforming spaces with innovation</div>
          </td>
          <td style="vertical-align:top;text-align:right;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:#493657;">TAX INVOICE</div>
            <div style="font-size:11px;color:#6b7280;">(Original for Recipient)</div>
            <div style="font-size:13px;color:#493657;font-weight:600;margin-top:6px;">Invoice No: ${invoiceNumber}</div>
            <div style="font-size:12px;color:#6b7280;">Order ID: ${order?.id || ''}</div>
            <div style="font-size:12px;color:#6b7280;">Invoice Date: ${new Date(invoiceDate).toLocaleDateString('en-IN')}</div>
          </td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;background:#f8fafc;border:1px solid #e2e8f0;">
        <tr>
          <td style="padding:12px;vertical-align:top;">
            <div style="font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Sold By</div>
            <div style="font-size:14px;font-weight:600;color:#493657;">${SELLER_INFO.name}</div>
            <div style="font-size:12px;color:#6b7280;">
              ${SELLER_INFO.addressLine1}<br>
              ${SELLER_INFO.addressLine2}<br>
              ${SELLER_INFO.country}
            </div>
            <div style="font-size:12px;color:#6b7280;"><strong>GSTIN:</strong> ${SELLER_GSTIN}</div>
          </td>
          <td style="padding:12px;vertical-align:top;text-align:right;">
            <div style="font-size:12px;color:#6b7280;"><strong>WhatsApp:</strong> ${SELLER_INFO.phone}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Email:</strong> ${SELLER_INFO.email}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Website:</strong> ${SELLER_INFO.website}</div>
          </td>
        </tr>
        <tr>
          <td style="padding:12px;vertical-align:top;">
            <div style="font-size:11px;text-transform:uppercase;color:#6b7280;font-weight:600;">Bill To</div>
            <div style="font-size:14px;font-weight:600;color:#493657;">${customer.firstName || ''} ${customer.lastName || ''}</div>
            <div style="font-size:12px;color:#6b7280;">
              ${address.street || ''}${address.apartment ? `, ${address.apartment}` : ''}<br>
              ${address.city || ''} ${address.postcode || ''}<br>
              ${address.country || 'India'}
            </div>
            <div style="font-size:12px;color:#6b7280;"><strong>Phone:</strong> ${customer.phone || ''}</div>
            <div style="font-size:12px;color:#6b7280;"><strong>Email:</strong> ${customer.email || ''}</div>
          </td>
          <td style="padding:12px;vertical-align:top;"></td>
        </tr>
      </table>

      ${itemsTable}

      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr>
          <td></td>
          <td style="width:280px;background:#f8fafc;border:1px solid #e2e8f0;padding:12px;">
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:6px;">
              <span>Subtotal</span>
              <span>${formatCurrency(subtotal, currency)}</span>
            </div>
            ${discount ? `
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:6px;">
              <span>Discount</span>
              <span>-${formatCurrency(discount, currency)}</span>
            </div>` : ''}
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:6px;">
              <span>Shipping (Non-Taxable)</span>
              <span>${formatCurrency(shipping, currency)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:6px;">
              <span>Taxable Amount (Products)</span>
              <span>${formatCurrency(taxableAmount, currency)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:6px;">
              <span>CGST (9%)</span>
              <span>${formatCurrency(cgst, currency)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#6b7280;margin-bottom:10px;">
              <span>SGST (9%)</span>
              <span>${formatCurrency(sgst, currency)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700;color:#493657;border-top:1px dashed #cbd5f5;padding-top:8px;">
              <span>Grand Total</span>
              <span>${formatCurrency(total, currency)}</span>
            </div>
          </td>
        </tr>
      </table>

      <div style="margin-top:16px;border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fafafa;">
        <div style="font-size:13px;font-weight:600;color:#493657;margin-bottom:6px;">Payment Details</div>
        <div style="font-size:12px;color:#6b7280;"><strong>Payment Mode:</strong> ${order?.payment?.method || 'Razorpay'}</div>
        <div style="font-size:12px;color:#6b7280;"><strong>Status:</strong> ${order?.payment?.status || 'PAID'}</div>
        <div style="font-size:12px;color:#6b7280;"><strong>Transaction ID:</strong> ${order?.payment?.razorpayPaymentId || '-'}</div>
        <div style="font-size:12px;color:#6b7280;"><strong>Payment Date:</strong> ${new Date(order?.createdAt || Date.now()).toLocaleDateString('en-IN')}</div>
      </div>

      <div style="margin-top:16px;font-size:11px;color:#6b7280;text-align:center;">
        This is a system generated invoice and does not require a signature.
      </div>
      <ul style="margin-top:10px;padding-left:18px;font-size:11px;color:#6b7280;">
        <li>Goods once sold will not be taken back.</li>
        <li>Subject to Uttar Pradesh jurisdiction.</li>
        <li>For support: support@calycopaints.com</li>
      </ul>
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
