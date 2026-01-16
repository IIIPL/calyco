import { useState } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';

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

  const formatLabel = (value) => (value ? String(value).trim() : '');

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
      return {
        name: item?.name || 'Product',
        description: buildDescription(item),
        quantity,
        price,
        total: lineTotal
      };
    });
  };

  const generateInvoice = async () => {
    setIsGenerating(true);

    try {
      const resolvedItems = normalizeItems(invoiceData?.items || items);
      const resolvedSubtotal = Number(invoiceData?.subtotal ?? subtotal ?? 0);
      const resolvedShipping = Number(invoiceData?.shipping ?? shipping ?? 0);
      const resolvedTax =
        invoiceData?.tax !== undefined && invoiceData?.tax !== null
          ? Number(invoiceData.tax)
          : Number(tax ?? Math.round(resolvedSubtotal * 0.18));
      const resolvedTotal =
        invoiceData?.total !== undefined && invoiceData?.total !== null
          ? Number(invoiceData.total)
          : resolvedSubtotal + resolvedShipping + resolvedTax;

      const resolvedInvoiceData = {
        invoiceNumber: invoiceData?.invoiceNumber || `CAL-${Date.now()}`,
        date: invoiceData?.date || new Date().toLocaleDateString('en-IN'),
        company: invoiceData?.company || {
          name: 'Calyco Paints',
          address: 'B37, Sector 1, Noida, NCR',
          phone: '+91 8826733064 (WhatsApp - Messages only)',
          email: 'info@calycopaints.com',
          website: 'calycopaints.com'
        },
        customer: invoiceData?.customer || null,
        items: resolvedItems,
        subtotal: resolvedSubtotal,
        shipping: resolvedShipping,
        tax: resolvedTax,
        total: resolvedTotal
      };

      const pdfContent = generatePDFContent(resolvedInvoiceData);
      await downloadPDF(pdfContent, `Calyco-Invoice-${resolvedInvoiceData.invoiceNumber}.pdf`);

      setTimeout(() => {
        onClose?.();
      }, 1000);
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Error generating invoice. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePDFContent = (data) => {
    const itemsHTML = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; font-weight: 500;">${item.name}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${item.description}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: center; font-weight: 500;">${item.quantity}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">&#8377;${formatNumber(item.price)}</td>
        <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600; color: #493657;">&#8377;${formatNumber(item.total)}</td>
      </tr>
    `
      )
      .join('');

    const currentDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const customerHTML = data.customer
      ? `
        <div class="customer-info">
          <div class="customer-title">Bill To</div>
          <div class="customer-name">${data.customer.name || 'Customer'}</div>
          <div class="customer-address">
            ${data.customer.address || ''}
            ${data.customer.city ? `<br>${data.customer.city}` : ''}
            ${data.customer.postcode ? ` ${data.customer.postcode}` : ''}
          </div>
          ${data.customer.phone ? `<div class="contact-item"><strong>Phone:</strong> ${data.customer.phone}</div>` : ''}
          ${data.customer.email ? `<div class="contact-item"><strong>Email:</strong> ${data.customer.email}</div>` : ''}
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

            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 40px;
              background: #ffffff;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              margin-bottom: 40px;
              padding-bottom: 30px;
              border-bottom: 2px solid #f3f4f6;
              gap: 20px;
            }

            .logo-section {
              flex: 1;
            }

            .logo-title {
              font-size: 32px;
              font-weight: 700;
              color: #493657;
              margin-bottom: 8px;
            }

            .logo-subtitle {
              font-size: 16px;
              color: #F0C85A;
              font-weight: 600;
              margin-bottom: 4px;
            }

            .logo-tagline {
              font-size: 14px;
              color: #6b7280;
              font-weight: 400;
            }

            .invoice-info {
              text-align: right;
              flex: 1;
            }

            .invoice-number {
              font-size: 24px;
              font-weight: 700;
              color: #493657;
              margin-bottom: 8px;
            }

            .invoice-date {
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .invoice-status {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: 600;
            }

            .company-details {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
              gap: 16px;
              margin-bottom: 40px;
              padding: 30px;
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }

            .company-info {
              min-width: 0;
            }

            .company-name {
              font-size: 18px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 8px;
            }

            .company-address {
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
            }

            .contact-info {
              min-width: 0;
              text-align: right;
            }

            .contact-item {
              font-size: 14px;
              color: #6b7280;
              margin-bottom: 4px;
            }

            .contact-item strong {
              color: #493657;
              font-weight: 600;
            }

            .customer-info {
              min-width: 0;
            }

            .customer-title {
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.06em;
              color: #6b7280;
              font-weight: 600;
              margin-bottom: 6px;
            }

            .customer-name {
              font-size: 16px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 6px;
            }

            .customer-address {
              font-size: 14px;
              color: #6b7280;
              line-height: 1.5;
              margin-bottom: 6px;
            }

            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .items-table th {
              background: linear-gradient(135deg, #493657 0%, #5a4067 100%);
              color: white;
              padding: 16px 12px;
              text-align: left;
              font-weight: 600;
              font-size: 14px;
            }

            .items-table th:last-child,
            .items-table td:last-child {
              text-align: right;
            }

            .items-table th:nth-child(3),
            .items-table td:nth-child(3) {
              text-align: center;
            }

            .totals-section {
              background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
              padding: 30px;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
            }

            .total-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 12px;
              font-size: 16px;
            }

            .total-row:last-child {
              margin-bottom: 0;
              padding-top: 16px;
              border-top: 2px solid #e5e7eb;
              font-size: 20px;
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

            .total-value.final {
              color: #F0C85A;
              font-size: 24px;
            }

            .footer {
              margin-top: 40px;
              padding: 30px;
              background: linear-gradient(135deg, #493657 0%, #5a4067 100%);
              border-radius: 12px;
              color: white;
              text-align: center;
            }

            .footer-title {
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
            }

            .footer-text {
              font-size: 14px;
              opacity: 0.9;
              margin-bottom: 8px;
            }

            .footer-contact {
              font-size: 14px;
              opacity: 0.8;
            }

            .terms {
              margin-top: 30px;
              padding: 20px;
              background: #f9fafb;
              border-radius: 8px;
              border: 1px solid #e5e7eb;
            }

            .terms-title {
              font-size: 16px;
              font-weight: 600;
              color: #493657;
              margin-bottom: 12px;
            }

            .terms-list {
              font-size: 12px;
              color: #6b7280;
              line-height: 1.5;
            }

            .terms-list li {
              margin-bottom: 4px;
            }

            @media print {
              body { margin: 0; }
              .invoice-container { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="logo-section">
                <div class="logo-title">Calyco Paints</div>
                <div class="logo-subtitle">Premium Paint Solutions</div>
                <div class="logo-tagline">Transforming spaces with innovation</div>
              </div>
              <div class="invoice-info">
                <div class="invoice-number">${data.invoiceNumber}</div>
                <div class="invoice-date">${currentDate}</div>
                <div class="invoice-status">PAID</div>
              </div>
            </div>

            <div class="company-details">
              <div class="company-info">
                <div class="company-name">${data.company?.name || 'Calyco Paints'}</div>
                <div class="company-address">
                  ${data.company?.address || 'B37, Sector 1, Noida, NCR'}<br>
                  Uttar Pradesh, India
                </div>
              </div>
              <div class="contact-info">
                <div class="contact-item"><strong>WhatsApp:</strong> ${data.company?.phone || '+91 8826733064 (Messages only)'}</div>
                <div class="contact-item"><strong>Email:</strong> ${data.company?.email || 'info@calycopaints.com'}</div>
                <div class="contact-item"><strong>Website:</strong> ${data.company?.website || 'calycopaints.com'}</div>
              </div>
              ${customerHTML}
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Specifications</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
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
                <span class="total-label">GST (18%)</span>
                <span class="total-value">&#8377;${formatNumber(data.tax)}</span>
              </div>
              <div class="total-row">
                <span class="total-label">Total Amount</span>
                <span class="total-value final">&#8377;${formatNumber(data.total)}</span>
              </div>
            </div>

            <div class="footer">
              <div class="footer-title">Thank you for choosing Calyco Paints!</div>
              <div class="footer-text">Your satisfaction is our priority</div>
              <div class="footer-contact">For any queries, contact us at info@calycopaints.com</div>
            </div>

            <div class="terms">
              <div class="terms-title">Terms & Conditions</div>
              <ul class="terms-list">
                <li>- All prices are inclusive of GST</li>
                <li>- Payment is due upon receipt of this invoice</li>
                <li>- Products are covered under manufacturer warranty</li>
                <li>- Returns accepted within 30 days of purchase</li>
                <li>- Free delivery on orders above &#8377;5000</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const downloadPDF = async (htmlContent, filename) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
