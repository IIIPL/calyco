import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read product_map.json
const productMapPath = path.join(__dirname, '../blog/product_map.json');
const productMap = JSON.parse(fs.readFileSync(productMapPath, 'utf8'));

// Product image mapping based on folder names
const imageMapping = {
    'Premium Interior Emulsion': '/Assets/Product Images/Premium Interior Emulsion/NoBg.webp',
    'Premium Exterior Emulsion': '/Assets/Product Images/Premium Exterior Emulsion/NoBg.webp',
    'Luxury Interior Emulsion': '/Assets/Product Images/Luxury Interior Emulsion/NoBg.webp',
    'Luxury Exterior Emulsion': '/Assets/Product Images/Luxury Exterior Emulsion/NoBg.webp',
    'Calyco Water Primer Interior': '/Assets/Product Images/Calyco Interior Water Primer/NoBg.webp',
    'Calyco Weather Primer Exterior': '/Assets/Product Images/Calyco Exterior Weather Primer/NoBg.webp',
    'Calyco Acrylic Wall Putty': '/Assets/Product Images/Calyco Acrylic Putty/NoBg.webp',
    'Calyco Solvent Primer Interior': '/Assets/Product Images/Interior Solvent Primer/NoBg.webp',
    'Calyco Damp Guard Primer': '/Assets/Product Images/Damp Guard Primer/NoBg.webp',
    'Calyco Universal Primer': '/Assets/Product Images/Universal Primer/NoBg.webp',
    'Amrella Enamel': '/Assets/Product Images/Dura-Shield Enamel/NoBg.webp',
    'PU Wood Coating': '/Assets/Product Images/PU Wood Coating/NoBg.webp',
    'Acrylic Washable Distemper': '/Assets/Product Images/Acrylic Washable Distemper/NoBg.webp',
    'All Surface Coating': '/Assets/Product Images/All Surface Coating/NoBg.webp',
    'Texture Paints': '/Assets/Product Images/Texture Paints/NoBg.webp'
};

// Add image property to each product
productMap.products.forEach(product => {
    if (imageMapping[product.name]) {
        product.image = imageMapping[product.name];
    } else {
        // Fallback to default Nova image
        product.image = '/Assets/Nova/NoBg.webp';
    }
});

// Write back to file
fs.writeFileSync(productMapPath, JSON.stringify(productMap, null, 4));

console.log('✅ Product images added successfully!');
console.log(`Updated ${productMap.products.length} products`);
