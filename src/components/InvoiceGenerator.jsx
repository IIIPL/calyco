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
        <td data-label="Sl" class="col-center col-nowrap">${index + 1}</td>
        <td data-label="Product" class="col-wrap col-strong">${item.name}</td>
        <td data-label="HSN" class="col-center col-nowrap">${item.hsn}</td>
        <td data-label="Specifications" class="col-wrap col-muted">${item.description}</td>
        <td data-label="Qty" class="col-center col-nowrap">${item.quantity}</td>
        <td data-label="Unit Price (Incl. GST)" class="col-right col-nowrap">&#8377;${formatNumber(item.price)}</td>
        <td data-label="Tax (Included)" class="col-right col-nowrap">&#8377;${formatNumber(item.tax)}</td>
        <td data-label="Total (Incl. GST)" class="col-right col-nowrap col-strong">&#8377;${formatNumber(item.total)}</td>
      </tr>
    `
      )
      .join('');

    const customerHTML = data.customer
      ? `
        <div class="address-block">
          <div class="block-title">Billing Address</div>
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
        <table class="payment-details">
          <tr>
            <td><strong>Payment Transaction ID:</strong> ${data.payment.transactionId || '-'}</td>
            <td><strong>Date:</strong> ${formatDate(data.payment.paymentDate)}</td>
            <td><strong>Invoice Value:</strong> &#8377;${formatNumber(data.total)}</td>
            <td><strong>Mode of Payment:</strong> ${data.payment.mode || 'Razorpay'}</td>
          </tr>
        </table>
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
              max-width: 900px;
              margin: 0 auto;
              padding: 30px;
              background: #ffffff;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 18px;
              padding-bottom: 12px;
              border-bottom: 1px solid #e5e7eb;
            }

            .brand {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .brand-logo {
              width: 72px;
              height: 48px;
              object-fit: contain;
            }

            .invoice-title {
              font-size: 12px;
              font-weight: 700;
              color: #111827;
            }

            .invoice-sub {
              font-size: 11px;
              color: #6b7280;
            }

            .invoice-meta {
              text-align: right;
              font-size: 12px;
              color: #111827;
              line-height: 1.6;
            }

            .invoice-meta strong {
              color: #111827;
            }

            .address-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 18px;
              border: 1px solid #e5e7eb;
              padding: 12px;
              background: #ffffff;
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
              margin-bottom: 12px;
              background: white;
              border: 1px solid #111827;
              table-layout: fixed;
            }

            .invoice-table td,
            .invoice-table th {
              font-size: 12px;
              border: 1px solid #111827;
              padding: 6px 6px;
              vertical-align: top;
            }

            .items-table th {
              background: #f3f4f6;
              color: #111827;
              font-weight: 700;
              text-align: left;
            }

            .items-table th:nth-child(1),
            .items-table td:nth-child(1) {
              width: 4%;
            }

            .items-table th:nth-child(2),
            .items-table td:nth-child(2) {
              width: 22%;
            }

            .items-table th:nth-child(3),
            .items-table td:nth-child(3) {
              width: 8%;
            }

            .items-table th:nth-child(4),
            .items-table td:nth-child(4) {
              width: 28%;
            }

            .items-table th:nth-child(5),
            .items-table td:nth-child(5) {
              width: 6%;
            }

            .items-table th:nth-child(6),
            .items-table td:nth-child(6) {
              width: 12%;
            }

            .items-table th:nth-child(7),
            .items-table td:nth-child(7) {
              width: 10%;
            }

            .items-table th:nth-child(8),
            .items-table td:nth-child(8) {
              width: 10%;
            }

            .col-center {
              text-align: center;
            }

            .col-right {
              text-align: right;
            }

            .col-nowrap {
              white-space: nowrap;
            }

            .col-wrap {
              white-space: normal;
              word-break: break-word;
            }

            .col-muted {
              color: #6b7280;
            }

            .col-strong {
              font-weight: 600;
            }

            .summary-row td {
              font-weight: 600;
              background: #fafafa;
            }

            .summary-label {
              text-align: right;
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

            .amount-words {
              margin-top: 6px;
              font-size: 12px;
              font-weight: 600;
              color: #111827;
            }

            .payment-details {
              margin-top: 8px;
              font-size: 11px;
              color: #111827;
              border: 1px solid #111827;
              border-collapse: collapse;
              width: 100%;
            }

            .payment-details td {
              border: 1px solid #111827;
              padding: 6px;
              white-space: nowrap;
            }

            .system-note {
              margin-top: 8px;
              font-size: 10px;
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
                <div class="invoice-title">Tax Invoice / Bill of Supply</div>
                <div class="invoice-sub">(Original for Recipient)</div>
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
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">Item Subtotal (Incl. GST)</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(data.netSubtotal ?? data.subtotal)}</td>
                </tr>
                ${
                  data.discount
                    ? `
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">Discount</td>
                  <td colspan="2" class="col-right col-nowrap">-&#8377;${formatNumber(data.discount)}</td>
                </tr>
                `
                    : ''
                }
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">Shipping (Non-Taxable)</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(data.shipping)}</td>
                </tr>
                ${
                  isInterState
                    ? `
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">IGST (18%) - Included</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(igst)}</td>
                </tr>
                `
                    : `
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">CGST (9%) - Included</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(cgst)}</td>
                </tr>
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">SGST (9%) - Included</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(sgst)}</td>
                </tr>
                `
                }
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">Total Tax (Included)</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(totalTaxIncluded)}</td>
                </tr>
                <tr class="summary-row">
                  <td colspan="6" class="summary-label">Grand Total</td>
                  <td colspan="2" class="col-right col-nowrap">&#8377;${formatNumber(data.total)}</td>
                </tr>
              </tbody>
            </table>

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
