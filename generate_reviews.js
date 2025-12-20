
const fs = require('fs');

const blogDataPath = 'src/data/blogData.js';
const reviewDataPath = 'src/data/reviewData.js';

try {
    console.log('Reading blog data...');
    const blogContent = fs.readFileSync(blogDataPath, 'utf8');

    const posts = [];
    const lines = blogContent.split('\n');
    let currentPost = {};

    lines.forEach((line, index) => {
        try {
            const trimmed = line.trim();
            if (trimmed.startsWith('id:')) {
                currentPost = {};
                // Remove id: and comma
                currentPost.id = trimmed.replace('id:', '').replace(/[,\s]/g, '');
            }

            // Flexible match for key: "value" or 'value'
            const titleMatch = trimmed.match(/title:\s*["']([^"']+)["']/);
            if (titleMatch) currentPost.title = titleMatch[1];

            const slugMatch = trimmed.match(/slug:\s*["']([^"']+)["']/);
            if (slugMatch) currentPost.slug = slugMatch[1];

            const authorMatch = trimmed.match(/author:\s*["']([^"']+)["']/);
            if (authorMatch) currentPost.author = authorMatch[1];

            const summaryMatch = trimmed.match(/summary:\s*["']([^"']+)["']/);
            if (summaryMatch) {
                currentPost.summary = summaryMatch[1];
                if (currentPost.id && currentPost.title && currentPost.slug) {
                    posts.push({ ...currentPost });
                }
            }
        } catch (innerErr) {
            console.error(`Error parsing line ${index}:`, innerErr);
        }
    });

    console.log(`Found ${posts.length} posts.`);
    if (posts.length === 0) {
        console.error("No posts found! Check the parsing logic.");
        process.exit(1);
    }

    const users = [
        "Rahul Dravid", "Myra Chatterjee", "Ananya Iyer", "Aarav Patel",
        "Aditya Vernekar", "Neha Sharma", "Arjun Singh", "Priya Venkatesh",
        "Amitabh B.", "Kabir Malhotra", "Sneha Agarwal", "Rohan Mehta",
        "Diya Kapoor", "Anvi Choudhury", "Pooja Hegde", "Riya Sen",
        "Vihaan Sharma", "Kiara Kaur", "Vivaan Reddy", "Sai Kumar"
    ];

    function getRandomUser() { return users[Math.floor(Math.random() * users.length)]; }
    function getRandomDate() {
        const year = 2025;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    const newReviewData = {};
    let reviewIdCounter = 1;

    posts.forEach(post => {
        const topic = post.title ? post.title.split(':')[0] : "Painting";
        const summaryText = post.summary || "great insights";
        const shortSummary = summaryText.length > 50 ? summaryText.substring(0, 40) + "..." : summaryText;

        newReviewData[post.slug] = [
            {
                id: reviewIdCounter++,
                user: getRandomUser(),
                rating: 5,
                date: getRandomDate(),
                comment: `This is such a timely article! Living in the city, I’ve always wanted to know more about ${topic}. The advice regarding "${shortSummary}" really clicked for me. Thanks for the clear advice, ${post.author || 'Calyco'}!`,
                verified: true
            },
            {
                id: reviewIdCounter++,
                user: getRandomUser(),
                rating: 4,
                date: getRandomDate(),
                comment: `Finally, a guide that covers the technical side of ${topic}! The tips are exactly what I needed. Great read!`,
                verified: true
            },
            {
                id: reviewIdCounter++,
                user: getRandomUser(),
                rating: 5,
                date: getRandomDate(),
                comment: `Love the idea of ${topic}. This makes it sound much less intimidating for a beginner. Definitely going to try this. Thanks for the inspiration!`,
                verified: false
            }
        ];
    });

    const outputContent = `const reviewData = ${JSON.stringify(newReviewData, null, 2)};\n\nexport default reviewData;\n`;
    fs.writeFileSync(reviewDataPath, outputContent);
    console.log(`Generated reviews for ${Object.keys(newReviewData).length} posts.`);

} catch (err) {
    console.error("Fatal error:", err);
    process.exit(1);
}
