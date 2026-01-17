import { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { FaDownload, FaSpinner } from 'react-icons/fa';

const SELLER_GSTIN = '27AAKCC9776C1Z9';
const SELLER_STATE_CODE = '27';
const GST_RATE = 0.18;
const LOGO_URL = 'https://calycopaints.com/Logo.webp';

export const InvoiceGenerator = ({
  items = [],
  subtotal = 0,
  discount = 0,
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

  const getInclusiveTax = (amount) => {
    const gross = Number(amount || 0);
    const base = gross / (1 + GST_RATE);
    return Math.max(gross - base, 0);
  };

  const normalizeItems = (sourceItems) => {
    return (sourceItems || []).map((item) => {
      const quantity = Number(item?.quantity || 1);
      const price = Number(item?.price || item?.unitPrice || 0);
      const lineTotal = Number(item?.total ?? price * quantity);
      const lineTax = Number(item?.tax ?? getInclusiveTax(lineTotal));
      return {
        name: item?.display_name || item?.name || 'Product',
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
      const resolvedDiscount = Number(invoiceData?.discount ?? discount ?? 0);
      const netSubtotal = Math.max(resolvedSubtotal - resolvedDiscount, 0);
      const resolvedTotal =
        invoiceData?.total !== undefined && invoiceData?.total !== null
          ? Number(invoiceData.total)
          : netSubtotal + resolvedShipping;
      const effectiveSubtotal =
        invoiceData?.total !== undefined && invoiceData?.total !== null
          ? Math.max(resolvedTotal - resolvedShipping, 0)
          : netSubtotal;
      const resolvedTax = getInclusiveTax(effectiveSubtotal);
      const taxableAmount = effectiveSubtotal;

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
        netSubtotal: effectiveSubtotal,
        discount: resolvedDiscount,
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
        (item, index) => `
      <tr>
        <td data-label="Sl" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${index + 1}</td>
        <td data-label="Product" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${item.name}</td>
        <td data-label="HSN" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb;">${item.hsn}</td>
        <td data-label="Specifications" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${item.description}</td>
        <td data-label="Qty" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td data-label="Unit Price (Incl. GST)" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">&#8377;${formatNumber(item.price)}</td>
        <td data-label="Tax (Included)" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">&#8377;${formatNumber(item.tax)}</td>
        <td data-label="Total (Incl. GST)" style="padding: 10px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">&#8377;${formatNumber(item.total)}</td>
      </tr>
    `
      )
      .join('');

    const customerHTML = data.customer
      ? `
        <div class="address-block">
          <div class="block-title">Bill To</div>
          <div class="block-name">${data.customer.name || 'Customer'}</div>
          <div class="block-text">
            ${data.customer.addressLine1 || ''}${data.customer.addressLine2 ? `, ${data.customer.addressLine2}` : ''}<br>
            ${data.customer.country || ''}
          </div>
          ${data.customer.phone ? `<div class="block-text"><strong>Phone:</strong> ${data.customer.phone}</div>` : ''}
          ${data.customer.email ? `<div class="block-text"><strong>Email:</strong> ${data.customer.email}</div>` : ''}
          <div class="block-title" style="margin-top:10px;">Shipping Address</div>
          <div class="block-name">${data.customer.name || 'Customer'}</div>
          <div class="block-text">
            ${data.customer.addressLine1 || ''}${data.customer.addressLine2 ? `, ${data.customer.addressLine2}` : ''}<br>
            ${data.customer.country || ''}
          </div>
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

    const totalTaxIncluded = data.tax;
    const amountInWords = `${numberToWords(Math.round(data.total))} Only`;

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
              padding: 36px;
              background: #ffffff;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 1px solid #e5e7eb;
            }

            .brand {
              display: flex;
              gap: 12px;
              align-items: flex-start;
            }

            .brand-logo {
              width: 56px;
              height: 56px;
              object-fit: contain;
            }

            .brand-name {
              font-size: 20px;
              font-weight: 700;
              color: #111827;
            }

            .brand-subtitle {
              font-size: 12px;
              color: #6b7280;
            }

            .invoice-title {
              margin-top: 6px;
              font-size: 12px;
              font-weight: 600;
              color: #111827;
            }

            .invoice-sub {
              font-size: 11px;
              color: #6b7280;
            }

            .invoice-meta {
              text-align: right;
              font-size: 12px;
              color: #374151;
              line-height: 1.6;
            }

            .invoice-meta strong {
              color: #111827;
            }

            .address-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 20px;
              border: 1px solid #e5e7eb;
              padding: 16px;
              background: #f9fafb;
            }

            .address-block {
              min-width: 0;
            }

            .block-title {
              font-size: 11px;
              font-weight: 700;
              color: #6b7280;
              text-transform: uppercase;
              margin-bottom: 6px;
            }

            .block-name {
              font-size: 14px;
              font-weight: 600;
              color: #111827;
              margin-bottom: 4px;
            }

            .block-text {
              font-size: 12px;
              color: #6b7280;
              line-height: 1.5;
              margin-bottom: 4px;
            }

            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              background: white;
              border: 1px solid #e5e7eb;
            }

            .invoice-table td {
              font-size: 12px;
            }

            .items-table th {
              background: #f3f4f6;
              color: #111827;
              padding: 10px 8px;
              text-align: left;
              font-weight: 600;
              font-size: 12px;
              border-bottom: 1px solid #e5e7eb;
            }

            .items-table th:nth-child(1),
            .items-table td:nth-child(1),
            .items-table th:nth-child(5),
            .items-table td:nth-child(5) {
              text-align: center;
            }

            .items-table th:nth-child(6),
            .items-table th:nth-child(7),
            .items-table th:nth-child(8),
            .items-table td:nth-child(6),
            .items-table td:nth-child(7),
            .items-table td:nth-child(8) {
              text-align: right;
            }

            .totals-section {
              margin-left: auto;
              max-width: 320px;
              border: 1px solid #e5e7eb;
              padding: 12px;
              background: #f9fafb;
              font-size: 12px;
            }

            .total-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 6px;
            }

            .total-row:last-child {
              margin-top: 6px;
              padding-top: 6px;
              border-top: 1px solid #e5e7eb;
              font-weight: 700;
              color: #111827;
            }

            .amount-words {
              margin-top: 12px;
              font-size: 12px;
              color: #111827;
              font-weight: 600;
            }

            .payment-details {
              margin-top: 16px;
              padding: 12px;
              border: 1px solid #e5e7eb;
              background: #f9fafb;
              font-size: 12px;
            }

            .payment-title {
              font-size: 12px;
              font-weight: 700;
              color: #111827;
              margin-bottom: 6px;
            }

            .payment-grid {
              display: grid;
              gap: 4px;
              color: #6b7280;
            }

            .system-note {
              margin-top: 16px;
              font-size: 11px;
              color: #6b7280;
              text-align: center;
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

              .invoice-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
              }

              .invoice-meta {
                align-items: flex-start;
                text-align: left;
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
              <div class="brand">
                <img src="${LOGO_URL}" alt="Calyco Paints" class="brand-logo" />
                <div>
                  <div class="brand-name">Calyco Paints</div>
                  <div class="brand-subtitle">Premium Paint Solutions</div>
                  <div class="brand-subtitle">Transforming spaces with innovation</div>
                  <div class="invoice-title">Tax Invoice / Bill of Supply</div>
                  <div class="invoice-sub">(Original for Recipient)</div>
                </div>
              </div>
              <div class="invoice-meta">
                <div><strong>Invoice No:</strong> ${data.invoiceNumber}</div>
                ${data.orderId ? `<div><strong>Order ID:</strong> ${data.orderId}</div>` : ''}
                <div><strong>Invoice Date:</strong> ${formatDate(data.invoiceDate)}</div>
              </div>
            </div>

            <div class="address-grid seller-buyer-grid invoice-details">
              <div class="address-block">
                <div class="block-title">Sold By</div>
                <div class="block-name">${data.company?.name || 'Calyco Paints'}</div>
                <div class="block-text">
                  ${data.company?.addressLine1 || 'B37, Sector 1'}<br>
                  ${data.company?.addressLine2 || 'Noida, Uttar Pradesh - 201301'}<br>
                  ${data.company?.country || 'India'}
                </div>
                <div class="block-text"><strong>GSTIN:</strong> ${data.company?.gstin || SELLER_GSTIN}</div>
                <div class="block-text"><strong>WhatsApp:</strong> ${data.company?.phone || '+91 8826733064 (Messages only)'}</div>
                <div class="block-text"><strong>Email:</strong> ${data.company?.email || 'info@calycopaints.com'}</div>
                <div class="block-text"><strong>Website:</strong> ${data.company?.website || 'calycopaints.com'}</div>
              </div>
              ${customerHTML}
            </div>

            <table class="items-table invoice-table">
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Product</th>
                  <th>HSN</th>
                  <th>Specifications</th>
                  <th>Qty</th>
                  <th>Unit Price (Incl. GST)</th>
                  <th>Tax (Included)</th>
                  <th>Total (Incl. GST)</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="totals-section">
              <div class="total-row">
                <span>Item Subtotal (Incl. GST)</span>
                <span>&#8377;${formatNumber(data.subtotal)}</span>
              </div>
              ${
                data.discount
                  ? `
              <div class="total-row">
                <span>Discount</span>
                <span>-&#8377;${formatNumber(data.discount)}</span>
              </div>
              `
                  : ''
              }
              <div class="total-row">
                <span>Shipping (Non-Taxable)</span>
                <span>&#8377;${formatNumber(data.shipping)}</span>
              </div>
              ${
                isInterState
                  ? `
              <div class="total-row">
                <span>IGST (18%) - Included</span>
                <span>&#8377;${formatNumber(igst)}</span>
              </div>
              `
                  : `
              <div class="total-row">
                <span>CGST (9%) - Included</span>
                <span>&#8377;${formatNumber(cgst)}</span>
              </div>
              <div class="total-row">
                <span>SGST (9%) - Included</span>
                <span>&#8377;${formatNumber(sgst)}</span>
              </div>
              `
              }
              <div class="total-row">
                <span>Total Tax (Included)</span>
                <span>&#8377;${formatNumber(totalTaxIncluded)}</span>
              </div>
              <div class="total-row">
                <span>Grand Total</span>
                <span>&#8377;${formatNumber(data.total)}</span>
              </div>
            </div>

            <div class="amount-words">Amount in Words: Rupees ${amountInWords}</div>

            ${paymentHTML}

            <div class="system-note">
              This is a system generated invoice and does not require a signature.
            </div>
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
