import nodemailer from 'nodemailer';

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

  const itemsTable = buildItemsTable(order?.items, currency);

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <h2 style="margin-bottom:4px;">Thanks for your order</h2>
      <p style="margin-top:0;">Order ID: <strong>${order.id}</strong></p>
      ${itemsTable}
      <p style="margin-top:16px;"><strong>Total:</strong> ${total}</p>
      <p>We will share shipping details once your order is dispatched.</p>
      <p>Need help? Reply to this email or contact support.</p>
    </div>
  `;

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
