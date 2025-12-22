import express from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI conditionally to avoid crash if key is missing during dev
// We initializes it inside the route to ensure dotenv has loaded
const getOpenAIClient = () => {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
};

// Load product map
const loadProductMap = () => {
    try {
        const mapPath = path.join(__dirname, '../../blog/product_map.json');
        if (fs.existsSync(mapPath)) {
            const data = fs.readFileSync(mapPath, 'utf8');
            return JSON.parse(data);
        }
        return { products: [] };
    } catch (err) {
        console.error("Error loading product map:", err);
        return { products: [] };
    }
};

router.post('/generate', async (req, res) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            // Mock response for dev without API key
            // return res.json({ content: "<h1>Mock Blog Post</h1><p>This is a generated post.</p>" });
            return res.status(500).json({ error: "OPENAI_API_KEY not configured on server." });
        }

        const { title, notes, images } = req.body;
        const productMap = loadProductMap();

        // Create a concise list of products for the prompt
        const productContext = productMap.products.map(p => `${p.name} -> ${p.url}`).join('\n');

        // Prepare image content for GPT Vision - LIMIT TO 5 IMAGES FOR PERFORMANCE
        const imageContent = [];
        const imageDescriptions = [];
        const totalImageCount = (images && Array.isArray(images)) ? images.length : 0;

        if (images && Array.isArray(images)) {
            // Process up to 10 images for GPT Vision
            // We previously limited to 5, but we can try 10 with the compressed images
            const imagesToAnalyze = images.slice(0, 10);

            imagesToAnalyze.forEach((imageData, index) => {
                if (imageData) {
                    imageContent.push({
                        type: "image_url",
                        image_url: { url: imageData }
                    });
                    imageDescriptions.push(`Image ${index + 1}: Uploaded image for blog content`);
                }
            });
        }

        const imageCount = totalImageCount; // Use total count for placeholders
        const hasImages = imageCount > 0;

        const systemPrompt = `You are the Lead Content Editor for Calyco Paints, a premium home decor brand. Your task is to write a blog post that mimics the structure and visual rhythm of Asian Paints, Benjamin Moore, and Berger Paints articles.

CONTEXT: Here is the list of available products and URLs:
${productContext}

${hasImages ? `CRITICAL: YOU MUST USE ALL ${imageCount} IMAGES IN YOUR ARTICLE. DO NOT SKIP ANY IMAGES.

${imageContent.length < imageCount ? `NOTE: You are analyzing ${imageContent.length} images, but there are ${imageCount} total images. Create placeholders for ALL ${imageCount} images.` : ''}

IMAGES PROVIDED: You have been given ${imageCount} image(s) to incorporate into the blog post.

CRITICAL IMAGE INSTRUCTIONS:
1. ANALYZE each image carefully to understand what it shows
2. CREATE exactly ${imageCount} image placeholders using {{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}, etc.
3. PLACE images throughout the article - DO NOT group them all together
4. REFERENCE each image in surrounding text
5. ADJUST surrounding text to describe or relate to the image content
6. USE ALL ${imageCount} images provided - do not skip any
7. For each image, add contextual text that describes what readers are seeing

MANDATORY: Before finishing, verify you have used ALL ${imageCount} images. Count them!

Image Placement Format:
- Use {{IMAGE_1}} as the Hero Image
- Use {{IMAGE_2}}, {{IMAGE_3}}, etc. inside the Side-by-Side Content Blocks defined below
- DO NOT use grids or other layouts
- DO NOT skip any images

When you see an image showing:
- A specific color/finish → mention it in nearby headings like "Achieving This [Color] Look" or "The [Texture] Finish Shown Above"
- A problem (cracks, dampness) → reference it: "Addressing Issues Like These" or "Fixing [Problem] Damage"
- A solution/result → highlight it: "Creating This Professional Finish" or "Transform Your Space Like This"
- A room/area → be specific: "Bedroom Elegance" or "Kitchen Protection"
- Products/materials → describe them: "Using Premium Emulsion" or "Quality Primers Make the Difference"

IMPORTANT: Adapt your content structure based on ${imageCount} image(s). Don't force a structure that requires more images than provided.
` : 'NOTE: No images were provided for this blog post. Create a text-focused article without image placeholders.'}

CONTENT STRUCTURE RULES (Strict HTML Output):

1. The Hook (AEO Optimized):
   - Start with a <p class='intro-text'> that serves as a direct answer summary (40-60 words). No fluff.

2. The Visual Layout:
   ${hasImages ? `You have ${imageCount} image(s). Use this SPECIFIC LAYOUT for images 2 through ${imageCount}:
   
   - **Hero Image**: Place {{IMAGE_1}} immediately after the intro text (full width).
   
   - **Side-by-Side Content Blocks**: For ALL remaining images ({{IMAGE_2}} to {{IMAGE_10}}), you MUST use this structure:
   
     <div class="blog-content-split">
         <div class="media-side">
             {{IMAGE_X}}
         </div>
         <div class="text-side">
             <h3>[Number]. [Heading]</h3>
             <p>[Paragraph 1: Detailed visual description of the image content.]</p>
             <p>[Paragraph 2: Expert advice or solution related to this visual.]</p>
         </div>
     </div>
     
     (Example: If this is image 2, the heading should start with "2. Heading Name")
     
     NOTE: Alternate the image position (left/right) for visual interest if possible by swapping the div order, or just keep image left for consistency.
     
     REQUIRED: You MUST create one of these "Side-by-Side" blocks for EACH available image.
     If you have 6 images, you should have 1 Hero Image and 5 Side-by-Side blocks.
     DO NOT SKIP ANY IMAGES.
   ` : ''}
   
   - <h2> [Main Problem/Topic] ${hasImages ? '- Reference what you see in the first image if relevant' : ''}
   - Write 5-6 paragraphs (4-5 sentences each) with detailed explanations
   - Include specific examples, benefits, and practical insights
   - Each paragraph should add value and depth to the topic
   
   - <h2> [The Solution/Process] ${hasImages && imageCount >= 2 ? '- Adjust heading based on images if they show specific solutions' : ''}
   - Write 3-4 introductory paragraphs explaining the approach
   - Use <ul> or <ol> lists for 6-8 detailed steps
   - Each step should be comprehensive (2-3 sentences explaining what and why)
   - Add a concluding paragraph summarizing the benefits
   
   - <h2> [Additional Tips/Best Practices]
   - Write 4-5 paragraphs with expert advice
   - Include pro tips, common mistakes to avoid, and maintenance advice

3. Smart Linking (STRICT LIMITS):
   - **Product Links**: Link to a MAXIMUM of 4 different products total across the ENTIRE article (body + FAQs combined)
   - Format: <a href='/products/wall-putty' class='product-link'><strong>Calyco Wall Putty</strong></a>
   - Each product should be linked only ONCE in the article
   - Choose the most relevant products for the topic
   
   - **Internal Page Links**: Intelligently suggest relevant website sections:
     * <a href='/products'>Browse All Products</a> - Product catalog
     * <a href='/colour-visualizer'>Try Our Colour Visualizer</a> - For color selection
     * <a href='/inspiration'>Explore Design Ideas</a> - Design inspiration gallery
     * <a href='/about'>About Calyco Paints</a> - Brand information
   - Use 2-3 internal page links per article, placed contextually

4. The Ad Card:
   - After the 'Solution' section, insert this exact placeholder: <div class='product-ad-card'>AD_CONTENT_HERE</div>
   - The backend will inject a contextually relevant product based on the blog title

5. Explore More Section (BEFORE FAQ):
   - Add a <h2>Explore More Resources</h2> section
   - Create a helpful paragraph suggesting 3-4 relevant website sections based on the blog topic
   - Example format:
     <p>Ready to transform your space? <a href='/colour-visualizer'>Try our Colour Visualizer</a> to experiment with different shades, <a href='/products'>browse our complete product range</a> for premium paints and primers, or visit our <a href='/inspiration'>inspiration gallery</a> for more design ideas. For personalized advice, <a href='/about'>learn more about Calyco Paints</a> and our commitment to quality.</p>
   - Customize suggestions based on blog content (colors → visualizer, products → product page, design → inspiration, etc.)

6. Mandatory FAQ Section (With Minimal Links):
   - End the response with a <section id='faq'>
   - Include exactly 4 Frequently Asked Questions related to the topic
   - FAQ answers should be detailed and helpful (4-5 sentences each)
   - Provide comprehensive, expert-level answers
   - Link to products in FAQs ONLY if already linked in main content (count towards 4 max limit)
   - Format: <h3>Question?</h3> <p>Detailed answer here...</p>

7. Tone: Helpful, authoritative, encouraging. Use 'We' and 'You'.

8. Content Length Requirements:
   - Minimum 1200-1500 words total
   - Each section should be substantial and informative
   - Avoid fluff, but provide comprehensive coverage
   - Include specific examples and actionable advice

9. SEO: Use semantic HTML <article>, <aside>, <section id='faq'>.

CRITICAL REMINDERS:
- MAX 4 product links total (not per section, but entire article)
- Each product linked only ONCE
- FAQ answers should be substantial (4-5 sentences)
- Vary content - don't repeat same products in every blog
- WRITE COMPREHENSIVE CONTENT - minimum 1200 words
- Each paragraph should be 4-5 sentences with detailed information
- ALWAYS include "Explore More Resources" section with contextual website suggestions
- Suggest relevant pages: colors → visualizer, textures → products, design → inspiration
${hasImages ? `- ANALYZE and REFERENCE all ${imageCount} image(s) provided
- Generate headings/text that describe what's visible in the images
- Place ALL ${imageCount} images strategically - don't skip any
- Use {{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}, etc. as placeholders
- Adapt your structure to the number of images available` : ''}

Remember: Return ONLY the valid HTML body content (no <html>, <head>, or <body> tags, just the inner content).`;

        const userPrompt = `Blog Title: ${title}\nRough Notes: ${notes}`;

        const openai = getOpenAIClient();

        // Build messages array with vision support if images are provided
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        if (imageContent.length > 0) {
            // Use vision model with images
            messages.push({
                role: 'user',
                content: [
                    { type: "text", text: userPrompt },
                    ...imageContent
                ]
            });
        } else {
            // Text-only
            messages.push({
                role: 'user',
                content: userPrompt
            });
        }

        const completion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-4o', // gpt-4o supports vision
            temperature: 0.7,
            max_tokens: 4000, // Increased for longer content with image analysis
        });

        let htmlContent = completion.choices[0].message.content;

        // Dynamic Ad Injection with Improved Product Selection
        if (htmlContent.includes('AD_CONTENT_HERE')) {
            const allProducts = productMap.products;
            const titleLower = title.toLowerCase();
            const notesLower = (notes || '').toLowerCase();
            const combinedText = `${titleLower} ${notesLower}`;

            // Score each product based on relevance
            const scoredProducts = allProducts.map(product => {
                let score = 0;

                // Check product name match (highest weight)
                if (titleLower.includes(product.name.toLowerCase())) {
                    score += 10;
                }

                // Check category match
                if (product.category && combinedText.includes(product.category.toLowerCase())) {
                    score += 8;
                }

                // Check keywords
                if (product.keywords) {
                    product.keywords.forEach(keyword => {
                        if (combinedText.includes(keyword.toLowerCase())) {
                            score += 3;
                        }
                    });
                }

                // Check bestFor attributes
                if (product.bestFor) {
                    product.bestFor.forEach(area => {
                        if (combinedText.includes(area.toLowerCase())) {
                            score += 4;
                        }
                    });
                }

                // Check features
                if (product.features) {
                    product.features.forEach(feature => {
                        if (combinedText.includes(feature.toLowerCase())) {
                            score += 2;
                        }
                    });
                }

                return { product, score };
            });

            // Sort by score and get the best match
            scoredProducts.sort((a, b) => b.score - a.score);
            let adProduct = scoredProducts[0]?.score > 0 ? scoredProducts[0].product : null;

            // Fallback to random if no good match found
            if (!adProduct && allProducts.length > 0) {
                adProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
            }

            if (adProduct) {
                // Use product-specific image or fallback to default
                const productImage = adProduct.image || '/Assets/Nova/NoBg.webp';
                const productDescription = adProduct.description || 'Achieve this look with our premium, eco-friendly formulation. Excellent coverage and low VOC.';

                const adHtml = `
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        <div class="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img src="${productImage}" alt="${adProduct.name}" class="w-full h-full object-contain" />
                        </div>
                        <div class="text-center md:text-left">
                            <h3 class="text-xl font-bold text-brand-purple mb-2">Recommended: ${adProduct.name}</h3>
                            <p class="text-gray-600 text-sm mb-4">${productDescription}</p>
                            <a href="${adProduct.url}" class="inline-block bg-brand-gold text-brand-ink font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all no-underline">
                                View Product
                            </a>
                        </div>
                    </div>`;
                htmlContent = htmlContent.replace('AD_CONTENT_HERE', adHtml);
            } else {
                // Remove placeholder if no product found
                htmlContent = htmlContent.replace(/<div class='product-ad-card'>AD_CONTENT_HERE<\/div>/g, '');
            }
        }

        res.json({ content: htmlContent });

    } catch (error) {
        console.error('Generation Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Helper to save base64 image
const saveImage = (base64Data, slug, type) => {
    if (!base64Data) return null;

    // Remove header (data:image/jpeg;base64,)
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        return null;
    }

    const buffer = Buffer.from(matches[2], 'base64');
    const extension = matches[1].split('/')[1]; // jpeg, png, etc.
    const filename = `${slug}-${type}-${Date.now()}.${extension}`;
    const publicDir = path.join(__dirname, '../../public/blog-images');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, filename), buffer);
    return `/blog-images/${filename}`;
};

router.post('/save', async (req, res) => {
    try {
        const {
            title,
            content,
            images,
            notes,
            slug: providedSlug,
            category,
            waterproofingIssue,
            areas,
            surfaces
        } = req.body;

        // Generate slug if not provided
        const slug = providedSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        // Save images dynamically - handle any number of images
        const savedImageUrls = [];
        if (images) {
            let imageIndex = 1;
            for (const [key, value] of Object.entries(images)) {
                if (value) {
                    const imageUrl = saveImage(value, slug, key);
                    if (imageUrl) {
                        savedImageUrls.push({ index: imageIndex, url: imageUrl, key });
                        imageIndex++;
                    }
                }
            }
        }

        // Replace placeholders in content dynamically
        let finalContent = content;

        // Replace {{IMAGE_1}}, {{IMAGE_2}}, {{IMAGE_3}}, etc. with actual image URLs
        savedImageUrls.forEach(({ index, url, key }) => {
            const placeholder = `{{IMAGE_${index}}}`;

            // Handle case where AI put placeholder in src attribute
            finalContent = finalContent.replace(new RegExp(`src=["']${placeholder}["']`, 'g'), `src="${url}"`);
            finalContent = finalContent.replace(new RegExp(`src=${placeholder}`, 'g'), `src="${url}"`);

            // Handle standalone placeholder - replace with full img tag
            const imgTag = `<img src="${url}" alt="${title} - Image ${index}" class="w-full h-auto object-cover rounded-2xl my-6" />`;
            finalContent = finalContent.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), imgTag);
        });

        // Handle image grids - replace grid containers
        const gridPattern = /<div class=['"]image-grid-2x2['"]>(.*?)<\/div>/gs;
        finalContent = finalContent.replace(gridPattern, (match, gridContent) => {
            // Extract image placeholders from grid content
            const imageMatches = gridContent.match(/{{IMAGE_\d+}}/g);
            if (imageMatches && imageMatches.length >= 2) {
                const img1Index = parseInt(imageMatches[0].match(/\d+/)[0]);
                const img2Index = parseInt(imageMatches[1].match(/\d+/)[0]);

                const img1 = savedImageUrls.find(img => img.index === img1Index);
                const img2 = savedImageUrls.find(img => img.index === img2Index);

                if (img1 && img2) {
                    return `<div class="grid grid-cols-2 gap-4 my-8">
                        <img src="${img1.url}" alt="${title} - Image ${img1Index}" class="w-full h-64 object-cover rounded-xl" />
                        <img src="${img2.url}" alt="${title} - Image ${img2Index}" class="w-full h-64 object-cover rounded-xl" />
                    </div>`;
                }
            }
            return match; // Return original if can't process
        });

        // Create a set of used image URLs to track which ones are in the content
        const usedImageUrls = new Set();
        savedImageUrls.forEach(({ url }) => {
            if (finalContent.includes(url)) {
                usedImageUrls.add(url);
            }
        });

        // Identify unused images
        const unusedImages = savedImageUrls.filter(img => !usedImageUrls.has(img.url));

        // Append unused images to the end of the content
        if (unusedImages.length > 0) {
            finalContent += `\n\n<h2>More Images</h2>\n<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">`;
            unusedImages.forEach(img => {
                finalContent += `\n<img src="${img.url}" alt="${title} - Image ${img.index}" class="w-full h-64 object-cover rounded-xl" />`;
            });
            finalContent += `\n</div>`;
        }

        // Clean up any remaining placeholders (in case some images weren't uploaded)
        finalContent = finalContent.replace(/{{IMAGE_\d+}}/g, '');
        finalContent = finalContent.replace(/<div class=['"]image-grid-2x2['"]>.*?<\/div>/gs, '');

        // Also handle old placeholder format for backward compatibility
        finalContent = finalContent.replace(/{{HERO_IMAGE}}/g, '');
        finalContent = finalContent.replace(/{{GRID_IMAGE_\d+}}/g, '');
        finalContent = finalContent.replace(/{{ACTION_IMAGE}}/g, '');

        // Load existing posts
        const postsPath = path.join(__dirname, '../../blog/data/posts.json');
        let posts = [];
        if (fs.existsSync(postsPath)) {
            posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        }

        // Create new post object
        const newPost = {
            title,
            slug,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            heroImage: savedImageUrls.length > 0 ? savedImageUrls[0].url : 'https://via.placeholder.com/800x400',
            tags: ['Advice', 'Design'],
            metaDescription: notes.substring(0, 150) + '...',
            category: category || "Colour Trends & Decor",
            waterproofingIssue: waterproofingIssue || "",
            areas: areas || [],
            surfaces: surfaces || [],
            content: finalContent
        };

        // Add to top
        posts.unshift(newPost);

        // Save back
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

        res.json({ success: true, slug });

    } catch (error) {
        console.error("Save Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all posts for admin
router.get('/all', async (req, res) => {
    try {
        const postsPath = path.join(__dirname, '../../blog/data/posts.json');
        if (fs.existsSync(postsPath)) {
            const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
            res.json(posts);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/delete/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const postsPath = path.join(__dirname, '../../blog/data/posts.json');

        if (!fs.existsSync(postsPath)) {
            return res.status(404).json({ error: 'No posts found' });
        }

        let posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        const postToDelete = posts.find(post => post.slug === slug);

        if (!postToDelete) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete associated images to free up space
        const blogImagesDir = path.join(__dirname, '../../public/blog-images');
        if (fs.existsSync(blogImagesDir)) {
            const imageFiles = fs.readdirSync(blogImagesDir);
            const postImageFiles = imageFiles.filter(file => file.includes(slug));

            postImageFiles.forEach(file => {
                const filePath = path.join(blogImagesDir, file);
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted image: ${file}`);
                } catch (err) {
                    console.error(`Failed to delete image ${file}:`, err);
                }
            });
        }

        // Remove post from JSON
        posts = posts.filter(post => post.slug !== slug);
        fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));

        res.json({
            success: true,
            message: 'Post and associated images deleted successfully'
        });

    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
