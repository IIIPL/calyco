import fs from 'fs';
import path from 'path';

// Load slugs
const slugsPath = path.join(process.cwd(), 'slugs.json');
const slugs = JSON.parse(fs.readFileSync(slugsPath, 'utf-8'));

const users = [
    "Aarav Patel", "Vihaan Sharma", "Aditya Vernekar", "Sai Kumar", "Reyansh Gupta",
    "Arjun Singh", "Vivaan Reddy", "Rohan Mehta", "Aryan Joshi", "Kabir Malhotra",
    "Ananya Iyer", "Diya Kapoor", "Saanvi Nair", "Aadhya Venkataraman", "Kiara Kaur",
    "Myra Chatterjee", "Pari Das", "Riya Sen", "Anvi Choudhury", "Priya Venkatesh",
    "Rahul Dravid", "Sneha Agarwal", "Neha Sharma", "Pooja Hegde", "Amitabh B."
];

const comments = [
    "Great article! Really helpful tips.",
    "I was looking for exactly this information. Thanks!",
    "Loved the detailed explanation about the color palettes.",
    "The product recommendations are spot on.",
    "Very informative post. I learned a lot about primers.",
    "Can you write more about exterior waterproofing?",
    "This saved me so much time on my DIY project.",
    "Excellent guide. Clear and concise.",
    "I used these tips for my living room and it looks amazing.",
    "The before and after examples would be a nice addition.",
    "Highly recommended read for anyone renovating.",
    "Simple and easy to understand.",
    "Thanks for clarifying the jargon.",
    "Good insights on sustainable options.",
    "I didn't know about these techniques before. Thanks!",
    "Well written and easy to follow.",
    "Helpful for beginners like me.",
    "Professional advice for free!",
    "Great read!",
    "Looking forward to the next post.",
    "Just what I needed for my weekend project.",
    "Nice breakdown of the steps.",
    "Very practical advice.",
    "Love the design ideas shared here.",
    "Super helpful, thanks for sharing!"
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
    const start = new Date(2025, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

const reviewData = {};
let reviewIdCounter = 1;

slugs.forEach(slug => {
    const numReviews = getRandomInt(0, 5); // 0 to 5 reviews per post
    const postReviews = [];

    for (let i = 0; i < numReviews; i++) {
        const user = users[getRandomInt(0, users.length - 1)];
        const comment = comments[getRandomInt(0, comments.length - 1)];
        const rating = getRandomInt(3, 5); // Mostly 3-5 stars
        const date = getRandomDate();
        const verified = Math.random() > 0.3; // 70% verified

        postReviews.push({
            id: reviewIdCounter++,
            user,
            rating,
            date,
            comment,
            verified
        });
    }

    // Sort by date descending
    postReviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (postReviews.length > 0) {
        reviewData[slug] = postReviews;
    }
});

const outputPath = path.join(process.cwd(), 'src', 'data', 'reviewData.js');
const fileContent = `const reviewData = ${JSON.stringify(reviewData, null, 2)};\n\nexport default reviewData;`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated reviews for ${Object.keys(reviewData).length} posts. Written to src/data/reviewData.js`);
