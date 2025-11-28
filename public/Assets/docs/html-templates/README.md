# Calyco TDS & SDS HTML Templates

This folder contains professional HTML templates for Technical Data Sheets (TDS) and Safety Data Sheets (SDS) for Calyco products.

## ✅ Completed Templates

All TDS and SDS documents created! **16 total documents (8 TDS + 8 SDS)**

### Interior Paints
1. **Premium Interior Emulsion** - ✅ TDS, ✅ SDS
2. **Luxury Interior Emulsion** - ✅ TDS, ✅ SDS

### Exterior Paints
3. **Premium Exterior Emulsion** - ✅ TDS, ✅ SDS
4. **Luxury Exterior Emulsion** - ✅ TDS, ✅ SDS

### Surface Preparation
5. **Calyco Water Primer (Interior)** - ✅ TDS, ✅ SDS
6. **Calyco Weather Primer (Exterior)** - ✅ TDS, ✅ SDS
7. **Calyco Acrylic Wall Putty** - ✅ TDS, ✅ SDS

### Specialty Products
8. **Waterproofing Sealer** - ✅ TDS, ✅ SDS

## 🔄 How to Convert HTML to PDF

### Method 1: Using Browser (Recommended - Free & Easy)
1. Open the HTML file in **Google Chrome** or **Microsoft Edge**
2. Press `Ctrl + P` (or `Cmd + P` on Mac) to open Print dialog
3. Select **"Save as PDF"** as the destination
4. **Important Print Settings:**
   - Paper size: **A4**
   - Margins: **Default** or **None**
   - Scale: **100%**
   - Background graphics: **✓ Enabled** (important for colors!)
   - Headers and footers: **Disabled**
5. Click **Save** and name the file appropriately:
   - `waterproofing-sealer-tds.pdf`
   - `waterproofing-sealer-sds.pdf`

### Method 2: Using Online Converter
1. Visit: https://www.sejda.com/html-to-pdf
2. Upload the HTML file
3. Download the generated PDF

### Method 3: Using Command Line (Advanced)
If you have wkhtmltopdf installed:
```bash
wkhtmltopdf waterproofing-sealer-tds.html waterproofing-sealer-tds.pdf
```

## 📁 File List

### Interior Paint Documents
- `premium-interior-emulsion-tds.html`
- `premium-interior-emulsion-sds.html`
- `luxury-interior-emulsion-tds.html`
- `luxury-interior-emulsion-sds.html`

### Exterior Paint Documents
- `premium-exterior-emulsion-tds.html`
- `premium-exterior-emulsion-sds.html`
- `luxury-exterior-emulsion-tds.html`
- `luxury-exterior-emulsion-sds.html`

### Primer & Putty Documents
- `calyco-water-primer-interior-tds.html`
- `calyco-water-primer-interior-sds.html`
- `calyco-weather-primer-exterior-tds.html`
- `calyco-weather-primer-exterior-sds.html`
- `calyco-acrylic-wall-putty-tds.html`
- `calyco-acrylic-wall-putty-sds.html`

### Specialty Product Documents
- `waterproofing-sealer-tds.html`
- `waterproofing-sealer-sds.html`

## 🌐 Website Integration

✅ **All product pages now link to HTML documents!**

Updated files:
- `products.js` - Main products file
- `productDetail.waterproofingSealer.js`
- `productDetail.premiumInteriorEmulsion.js`
- `productDetail.interiorLatexPaint.js`
- `productDetail.premiumExteriorEmulsion.js`
- `productDetail.exteriorLatexPaint.js`

When users click "Download TDS" or "Download SDS" on product pages:
1. HTML file opens in browser
2. Users can view directly or print to PDF
3. No PDF files needed - HTML works perfectly!

## 🎨 Customization Guide

To create documents for other products, copy the waterproofing sealer templates and update:

### For TDS:
1. Product title and description
2. Key features section
3. Technical specifications table
4. Coverage values
5. Pack sizes
6. Application instructions specific to product

### For SDS:
1. Product name and code
2. Composition table (if different)
3. Hazard statements (if different)
4. VOC content
5. Keep the 16-section structure as per GHS requirements

## 🎯 Design Features

Both templates include:
- **Professional branding** with Calyco colors (#493657, #F0C85A, #DC2626)
- **Print-optimized** layout for A4 paper
- **Responsive tables** for technical data
- **Color-coded sections** (Yellow for TDS, Red for SDS)
- **Page-break protection** to avoid awkward splits
- **Footer disclaimers** as required

## 📍 File Location After PDF Conversion

Move the generated PDFs to:
```
/public/Assets/docs/[product-slug]-tds.pdf
/public/Assets/docs/[product-slug]-sds.pdf
```

Example:
```
/public/Assets/docs/waterproofing-sealer-tds.pdf
/public/Assets/docs/waterproofing-sealer-sds.pdf
```

## ⚠️ Important Notes

1. **Always enable "Background graphics"** when printing to PDF to preserve the yellow/red color schemes
2. **Review all product-specific data** before finalizing
3. **SDS must follow GHS 16-section format** (already implemented in template)
4. **Update revision dates** before publishing
5. **Verify all technical specifications** with product formulation data

## 📞 Support

For questions about template customization or PDF generation:
- Email: support@calycopaints.com
- Documentation: Check product detail files in `/src/data/`
