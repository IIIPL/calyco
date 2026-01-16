import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { FaDownload, FaSpinner } from 'react-icons/fa';

const SELLER_GSTIN = '27AAKCC9776C1Z9';
const SELLER_STATE_CODE = '27';
const GST_RATE = 0.18;

export const InvoiceGenerator = ({
  items = [],
  subtotal = 0,
  tax = 0,
  shipping = 0,
  total = 0,
  invoiceData = null,
  onClose
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const formatNumber = (value) => {
    const number = Number(value || 0);
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(number);
  };

  const formatDate = (value) => {
    if (!value) return new Date().toLocaleDateString('en-IN');
    try {
      return new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return value;
    }
  };

  const formatLabel = (value) => (value ? String(value).trim() : '');

  const resolveHsn = (item) => {
    if (item?.hsn) return item.hsn;
    const type = String(item?.productType || '').toLowerCase();
    if (type === 'service' || type.includes('service')) return '9983';
    return '3209';
  };

  const buildDescription = (item) => {
    if (item?.description) return item.description;

    const parts = [
      formatLabel(item?.selectedSheen),
      formatLabel(item?.selectedSize)
    ].filter(Boolean);

    if (item?.selectedColor?.name) {
      parts.push(`Color: ${item.selectedColor.name}`);
    }

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

  const normalizeItems = (sourceItems) => {
    return (sourceItems || []).map((item) => {
      const quantity = Number(item?.quantity || 1);
      const price = Number(item?.price || item?.unitPrice || 0);
      const lineTotal = Number(item?.total || price * quantity);
      const lineTax = Number(item?.tax ?? lineTotal * GST_RATE);
      return {
        name: item?.name || 'Product',
        hsn: resolveHsn(item),
        description: buildDescription(item),
        quantity,
        price,
        tax: lineTax,
        total: lineTotal
      };
    });
  };

  const generateInvoice = async () => {
    setIsGenerating(true);
    let wrapper = null;

    try {
      const resolvedItems = normalizeItems(invoiceData?.items || items);
      const resolvedSubtotal = Number(invoiceData?.subtotal ?? subtotal ?? 0);
      const resolvedShipping = Number(invoiceData?.shipping ?? shipping ?? 0);
      const resolvedTax =
        invoiceData?.tax !== undefined && invoiceData?.tax !== null
          ? Number(invoiceData.tax)
          : Number(tax ?? Math.round(resolvedSubtotal * GST_RATE));
      const resolvedTotal =
        invoiceData?.total !== undefined && invoiceData?.total !== null
          ? Number(invoiceData.total)
          : resolvedSubtotal + resolvedShipping + resolvedTax;
      const taxableAmount = resolvedSubtotal;

      const resolvedInvoiceData = {
        invoiceNumber: invoiceData?.invoiceNumber || `INV-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
        orderId: invoiceData?.orderId || '',
        invoiceDate: invoiceData?.invoiceDate || new Date().toISOString(),
        company: invoiceData?.company || {
          name: 'Calyco Paints',
          addressLine1: 'B37, Sector 1',
          addressLine2: 'Noida, Uttar Pradesh - 201301',
          country: 'India',
          phone: '+91 8826733064 (WhatsApp - Messages only)',
          email: 'info@calycopaints.com',
          website: 'calycopaints.com',
          gstin: SELLER_GSTIN
        },
        customer: invoiceData?.customer || null,
        payment: invoiceData?.payment || null,
        items: resolvedItems,
        subtotal: resolvedSubtotal,
        shipping: resolvedShipping,
        taxableAmount,
        tax: resolvedTax,
        total: resolvedTotal
      };

      const pdfContent = generatePDFContent(resolvedInvoiceData);
      const filename = `Calyco-Invoice-${resolvedInvoiceData.invoiceNumber}.pdf`;
      wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '-9999px';
      wrapper.style.top = '0';
      wrapper.innerHTML = pdfContent;
      document.body.appendChild(wrapper);

      const invoiceNode = wrapper.querySelector('.invoice');
      if (!invoiceNode) {
        throw new Error('Invoice template not found');
      }

      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, allowTaint: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(invoiceNode)
        .save();

      setTimeout(() => {
        onClose?.();
      }, 1000);
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      if (wrapper && wrapper.parentNode) {
        wrapper.parentNode.removeChild(wrapper);
      }
      setIsGenerating(false);
    }
  };

  const generatePDFContent = (data) => {
    const isInterState = Boolean(
      data.customer?.stateCode &&
        data.customer.stateCode !== SELLER_STATE_CODE
    );
    const cgst = isInterState ? 0 : data.tax / 2;
    const sgst = isInterState ? 0 : data.tax / 2;
    const igst = isInterState ? data.tax : 0;

    const itemsHTML = data.items
      .map(
        (item) => `
      <tr>
        <td data-label="Product" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${item.name}</td>
        <td data-label="HSN" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${item.hsn}</td>
        <td data-label="Specifications" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${item.description}</td>
        <td data-label="Qty" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 500;">${item.quantity}</td>
        <td data-label="Unit Price" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">&#8377;${formatNumber(item.price)}</td>
        <td data-label="Tax" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">&#8377;${formatNumber(item.tax)}</td>
        <td data-label="Total" style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #493657;">&#8377;${formatNumber(item.total)}</td>
      </tr>
    `
      )
      .join('');

    const customerHTML = data.customer
      ? `
        <div class="customer-info">
          <div class="customer-title">Bill To</div>
          <div class="customer-name">${data.customer.name || 'Customer'}</div>
          <div class="customer-address">
            ${data.customer.addressLine1 || ''}
            ${data.customer.addressLine2 ? `<br>${data.customer.addressLine2}` : ''}
            ${data.customer.country ? `<br>${data.customer.country}` : ''}
          </div>
          ${data.customer.phone ? `<div class="contact-item"><strong>Phone:</strong> ${data.customer.phone}</div>` : ''}
          ${data.customer.email ? `<div class="contact-item"><strong>Email:</strong> ${data.customer.email}</div>` : ''}
        </div>
      `
      : '';

    const paymentHTML = data.payment
      ? `
        <div class="payment-details">
          <div class="payment-title">Payment Details</div>
          <div class="payment-grid">
            <div><strong>Payment Mode:</strong> ${data.payment.mode || 'Razorpay'}</div>
            <div><strong>Status:</strong> ${data.payment.status || 'PAID'}</div>
            <div><strong>Transaction ID:</strong> ${data.payment.transactionId || '-'}</div>
            <div><strong>Payment Date:</strong> ${formatDate(data.payment.paymentDate)}</div>
          </div>
        </div>
      `
      : '';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Calyco Paints Invoice</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

            * { margin: 0; padding: 0; box-sizing: border-box; }

            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #1f2937;
              background: #ffffff;
            }

            .invoice {
              word-break: break-word;
              overflow-wrap: anywhere;
              white-space: normal;
            }

            .invoice * ,
            .invoice-table td,
            .invoice-details div,
            .payment-details div {
              word-break: break-word;
              overflow-wrap: anywhere;
              white-space: normal;
            }

            .invoice-details div {
              display: block;
            }

            .invoice-container {
              max-width: 820px;
              margin: 0 auto;
              padding: 40px;
              background: #ffffff;
            }

            .header {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              align-items: flex-start;
              margin-bottom: 30px;
              padding-bottom: 24px;
              border-bottom: 2px solid #f3f4f6;
            }

            .logo-section {
              flex: 1;
            }

            .logo-title {
              font-size: 30px;
              font-weight: 700;
              color: #493657;
              margin-bottom: 6px;
            }

            .logo-subtitle {
              font-size: 14px;
              color: #F0C85A;
              font-weight: 600;
              margin-bottom: 2px;
            }

            .logo-tagline {
              font-size: 13px;
              color: #6b7280;
              font-weight: 400;
            }

            .invoice-info {
              text-align: right;
              flex: 1;
            }

            .invoice-label {
              font-size: 12px;
              font-weight: 700;
              color: #493657;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            }

            .invoice-sub-label {
              font-size: 11px;
              color: #6b7280;
              margin-bottom: 10px;
            }

            .invoice-number {
              font-size: 18px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 4px;
            }

            .invoice-date {
              font-size: 13px;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .invoice-status {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
            }

            .invoice-meta {
              display: flex;
              flex-direction: column;
              gap: 4px;
              align-items: flex-end;
            }

            .company-details {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 16px;
              margin-bottom: 30px;
              padding: 24px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }

            .company-info,
            .contact-info,
            .customer-info {
              min-width: 0;
            }

            .company-name {
              font-size: 16px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 6px;
            }

            .company-address,
            .customer-address {
              font-size: 13px;
              color: #6b7280;
              line-height: 1.5;
              margin-bottom: 6px;
            }

            .contact-info {
              text-align: right;
            }

            .contact-item {
              font-size: 13px;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .contact-item strong {
              color: #493657;
              font-weight: 600;
            }

            .customer-title {
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: #6b7280;
              font-weight: 600;
              margin-bottom: 6px;
            }

            .customer-name {
              font-size: 15px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 6px;
            }

            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 24px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .invoice-table td {
              font-size: 13px;
            }

            .items-table th {
              background: linear-gradient(135deg, #493657 0%, #5a4067 100%);
              color: white;
              padding: 14px 10px;
              text-align: left;
              font-weight: 600;
              font-size: 13px;
            }

            .items-table th:nth-child(4),
            .items-table td:nth-child(4) {
              text-align: center;
            }

            .items-table th:nth-child(5),
            .items-table th:nth-child(6),
            .items-table th:nth-child(7),
            .items-table td:nth-child(5),
            .items-table td:nth-child(6),
            .items-table td:nth-child(7) {
              text-align: right;
            }

            .totals-section {
              margin-left: auto;
              max-width: 320px;
              background: #f8fafc;
              padding: 20px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }

            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              font-size: 14px;
            }

            .total-row:last-child {
              margin-bottom: 0;
              padding-top: 10px;
              border-top: 1px dashed #cbd5f5;
              font-size: 16px;
              font-weight: 700;
              color: #493657;
            }

            .total-label {
              font-weight: 500;
              color: #6b7280;
            }

            .total-value {
              font-weight: 600;
              color: #493657;
            }

            .payment-details {
              margin-top: 24px;
              padding: 18px;
              border-radius: 10px;
              border: 1px solid #e5e7eb;
              background: #fafafa;
            }

            .payment-title {
              font-size: 14px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 10px;
            }

            .payment-grid {
              display: grid;
              gap: 6px;
              font-size: 13px;
              color: #6b7280;
            }

            .system-note {
              margin-top: 24px;
              font-size: 12px;
              color: #6b7280;
              text-align: center;
            }

            .footer {
              margin-top: 18px;
              padding-top: 12px;
              border-top: 1px solid #e5e7eb;
              font-size: 11px;
              color: #6b7280;
            }

            .footer li {
              margin-bottom: 4px;
            }

            @media print {
              body { margin: 0; }
              .invoice-container { padding: 20px; }
            }

            @media (max-width: 640px) {
              .invoice-header,
              .seller-buyer-grid {
                grid-template-columns: 1fr !important;
              }

              .invoice-info {
                text-align: left;
              }

              .invoice-meta {
                align-items: flex-start;
              }

              .items-table thead {
                display: none;
              }

              .items-table tr {
                display: block;
                margin-bottom: 12px;
                border-bottom: 1px solid #e5e7eb;
              }

              .items-table td {
                display: flex;
                justify-content: space-between;
                gap: 12px;
                padding: 6px 0;
                border-bottom: none;
              }

              .items-table td::before {
                content: attr(data-label);
                font-weight: 600;
                color: #555;
              }

              .totals-section {
                width: 100%;
                max-width: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice invoice-container">
            <div class="header invoice-header">
              <div class="logo-section">
                <div class="logo-title">Calyco Paints</div>
                <div class="logo-subtitle">Premium Paint Solutions</div>
                <div class="logo-tagline">Transforming spaces with innovation</div>
              </div>
              <div class="invoice-info">
                <div class="invoice-label">Tax Invoice</div>
                <div class="invoice-sub-label">(Original for Recipient)</div>
                <div class="invoice-meta">
                  <div class="invoice-number">Invoice No: ${data.invoiceNumber}</div>
                  ${data.orderId ? `<div class="invoice-date">Order ID: ${data.orderId}</div>` : ''}
                  <div class="invoice-date">Invoice Date: ${formatDate(data.invoiceDate)}</div>
                  <div class="invoice-status">PAID</div>
                </div>
              </div>
            </div>

            <div class="company-details seller-buyer-grid invoice-details">
              <div class="company-info">
                <div class="customer-title">Sold By</div>
                <div class="company-name">${data.company?.name || 'Calyco Paints'}</div>
                <div class="company-address">
                  ${data.company?.addressLine1 || 'B37, Sector 1'}<br>
                  ${data.company?.addressLine2 || 'Noida, Uttar Pradesh - 201301'}<br>
                  ${data.company?.country || 'India'}
                </div>
                <div class="contact-item"><strong>GSTIN:</strong> ${data.company?.gstin || SELLER_GSTIN}</div>
              </div>
              <div class="contact-info">
                <div class="contact-item"><strong>WhatsApp:</strong> ${data.company?.phone || '+91 8826733064 (Messages only)'}</div>
                <div class="contact-item"><strong>Email:</strong> ${data.company?.email || 'info@calycopaints.com'}</div>
                <div class="contact-item"><strong>Website:</strong> ${data.company?.website || 'calycopaints.com'}</div>
              </div>
              ${customerHTML}
            </div>

            <table class="items-table invoice-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>HSN</th>
                  <th>Specifications</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="total-row">
                <span class="total-label">Subtotal</span>
                <span class="total-value">&#8377;${formatNumber(data.subtotal)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Shipping</span>
                <span class="total-value">&#8377;${formatNumber(data.shipping)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Taxable Amount</span>
                <span class="total-value">&#8377;${formatNumber(data.taxableAmount)}</span>
              </div>
              ${
                isInterState
                  ? `
              <div class="total-row">
                <span class="total-label">IGST (18%)</span>
                <span class="total-value">&#8377;${formatNumber(igst)}</span>
              </div>
              `
                  : `
              <div class="total-row">
                <span class="total-label">CGST (9%)</span>
                <span class="total-value">&#8377;${formatNumber(cgst)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">SGST (9%)</span>
                <span class="total-value">&#8377;${formatNumber(sgst)}</span>
              </div>
              `
              }
              <div class="total-row">
                <span class="total-label">Grand Total</span>
                <span class="total-value">&#8377;${formatNumber(data.total)}</span>
              </div>
            </div>

            ${paymentHTML}

            <div class="system-note">
              This is a system generated invoice and does not require a signature.
            </div>

            <ul class="footer">
              <li>- Goods once sold will not be taken back.</li>
              <li>- Subject to Maharashtra jurisdiction.</li>
              <li>- For support: support@calycopaints.com</li>
            </ul>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <button
      onClick={generateInvoice}
      disabled={isGenerating}
      className="w-full px-4 py-3 bg-gradient-to-r from-[#F0C85A] to-[#F0C85A]/80 text-[#493657] font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {isGenerating ? (
        <>
          <FaSpinner className="w-4 h-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FaDownload className="w-4 h-4" />
          Generate Invoice
        </>
      )}
    </button>
  );
};
