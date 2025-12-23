const fs = require('fs');
const path = require('path');

// Read the file content
const filePath = 'c:\\Users\\av074\\Downloads\\repo calyco\\calyco\\src\\data\\blogData.js';
const content = fs.readFileSync(filePath, 'utf8');

// Simple regex to find objects with titles but maybe missing authors
// distinct ids
const matches = content.match(/id:\s*\d+/g);
const authorMatches = content.match(/author:/g);

console.log('Total posts (by id):', matches ? matches.length : 0);
console.log('Total authors keys:', authorMatches ? authorMatches.length : 0);

// Let's try to parse it strictly using regex is hard, but let's just see if counts match.
