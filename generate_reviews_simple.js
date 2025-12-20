const fs = require('fs');
const path = require('path');

try {
    const blogDataPath = path.join(__dirname, 'src/data/blogData.js');
    const reviewDataPath = path.join(__dirname, 'src/data/reviewData.js');

    console.log(`Reading from ${blogDataPath}...`);
    const blogData = fs.readFileSync(blogDataPath, 'utf8');

    // Regex to capture slugs
    const slugRegex = /slug:\s*"([^"]+)"/g;
    let match;
    const slugs = [];

    while ((match = slugRegex.exec(blogData)) !== null) {
        if (!slugs.includes(match[1])) {
            slugs.push(match[1]);
        }
    }

    console.log(`Found ${slugs.length} unique slugs.`);

    const reviews = {};
    const users = [
        ["Aditi Sharma", "Rohan Mehta", "Priya Lopez"],
        ["Karan Malhotra", "Sneha Gupta", "Rajiv Kumar"],
        ["Ananya Das", "Vikram Sethi", "Meera Reddy"],
        ["Siddharth Rao", "Neha Kapoor", "Rahul Nair"]
    ];

    slugs.forEach((slug, index) => {
        // Create a readable title from slug for the "Specific" review
        const titlePart = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

        const userSet = users[index % users.length];

        // 1. Appreciative & Specific
        const review1 = {
            id: 1,
            user: userSet[0],
            rating: 5,
            comment: `I really appreciated the specific details in "${titlePart}". It cleared up so many questions I had about the topic.`,
            date: "2025-11-15",
            verified: true
        };

        // 2. Short & Sweet
        const review2 = {
            id: 2,
            user: userSet[1],
            rating: 5,
            comment: "Great read! Very helpful and to the point.",
            date: "2025-11-20",
            verified: true
        };

        // 3. Enthusiastic
        const review3 = {
            id: 3,
            user: userSet[2],
            rating: 5,
            comment: "This is absolutely fantastic! I'm so excited to apply these tips. 10/10 recommendation!",
            date: "2025-12-05",
            verified: true
        };

        reviews[slug] = [review1, review2, review3];
    });

    const output = `export const reviewData = ${JSON.stringify(reviews, null, 2)};`;

    fs.writeFileSync(reviewDataPath, output);
    console.log(`Successfully wrote reviews for ${slugs.length} posts to ${reviewDataPath}.`);

} catch (e) {
    console.error("Error:", e);
}
