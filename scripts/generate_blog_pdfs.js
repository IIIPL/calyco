
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import blogContentArray from '../src/data/blogData.js';

const require = createRequire(import.meta.url);
const PDFDocument = require('pdfkit');

const OUTPUT_DIR = path.resolve('public/Assets/docs/blogs');
const ASSETS_ROOT = path.resolve('public');

// Ensure output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('--- Generating Blog PDFs (Import Mode) ---');
console.log(`Loaded ${blogContentArray.length} blogs.`);

// 2. Helper Functions
function decodeHtml(text) {
    if (!text) return "";
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&rdquo;/g, '"')
        .replace(/&ldquo;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/&ndash;/g, '-')
        .replace(/&mdash;/g, '--');
}

function findImageFile(imagePath) {
    if (!imagePath) return null;
    // Remove leading slash and normalize
    const normalizedPath = imagePath.replace(/^[\/\\]/, '').replace(/\\/g, '/');

    // 1. Direct check
    const directPath = path.join(ASSETS_ROOT, normalizedPath);
    if (fs.existsSync(directPath)) return directPath;

    // 2. Fuzzy Folder Match
    const dirName = path.dirname(normalizedPath);
    const fileName = path.basename(normalizedPath);
    const absDir = path.join(ASSETS_ROOT, dirName);

    if (!fs.existsSync(absDir)) return null;

    try {
        const files = fs.readdirSync(absDir);
        const targetName = fileName.replace(/\.[^/.]+$/, "").toLowerCase().trim();

        const match = files.find(f => {
            const fName = f.replace(/\.[^/.]+$/, "").toLowerCase();
            return fName === targetName || fName.startsWith(targetName) || targetName.startsWith(fName);
        });

        if (match) return path.join(absDir, match);
    } catch (e) { return null; }

    return null;
}

// 3. Generate PDFs
async function generate() {
    let count = 0;
    for (const blog of blogContentArray) {
        try {
            const safeTitle = blog.title.replace(/[^a-z0-9]/gi, '_').substring(0, 60);
            const fileName = `${safeTitle}.pdf`;
            const filePath = path.join(OUTPUT_DIR, fileName);

            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // --- CONTENT ---

            // Title
            doc.font('Helvetica-Bold').fontSize(20).text(decodeHtml(blog.title), { align: 'center' });
            doc.moveDown(0.5);

            // Metadata
            doc.font('Helvetica').fontSize(10).fillColor('grey')
                .text(`${blog.date} | ${blog.category}`, { align: 'center' });
            doc.fillColor('black');
            doc.moveDown(1);

            // Image
            const imgPath = findImageFile(blog.image);
            if (imgPath) {
                try {
                    doc.image(imgPath, { fit: [495, 300], align: 'center' });
                    doc.moveDown(1);
                } catch (err) {
                    doc.font('Helvetica-Oblique').fontSize(8).text('(Image unavailable)', { align: 'center' });
                }
            }

            // Body (Simple HTML Stripping)
            const content = blog.content || "";
            const parts = content.split(/(<\/?(?:h2|p|div|br)[^>]*>)/gi);

            doc.font('Helvetica').fontSize(11);

            for (const part of parts) {
                const lower = part.toLowerCase();

                if (lower.startsWith('<h2')) {
                    doc.moveDown(0.5);
                    doc.font('Helvetica-Bold').fontSize(14);
                } else if (lower.startsWith('</h2')) {
                    doc.moveDown(0.3);
                    doc.font('Helvetica').fontSize(11);
                } else if (lower.startsWith('<p')) {
                    // new paragraph
                } else if (lower.startsWith('</p')) {
                    doc.moveDown(0.5);
                } else if (lower.startsWith('<br')) {
                    doc.moveDown(0.2);
                } else if (!lower.startsWith('<')) {
                    const text = decodeHtml(part).trim();
                    if (text) doc.text(text, { align: 'justify' });
                }
            }

            doc.end();
            count++;
            // process.stdout.write('.');
        } catch (err) {
            console.error(`Error generating ${blog.id}: ${err.message}`);
        }
    }
    console.log(`\nSuccessfully generated ${count} PDFs in ${OUTPUT_DIR}`);
}

generate().catch(err => console.error(err));
