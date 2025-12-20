
const fs = require('fs');
const path = require('path');

const logFile = 'debug_log.txt';
function log(msg) {
    fs.appendFileSync(logFile, msg + '\n');
}

try {
    log('Starting script');
    const filePath = 'src/data/blogData.js';
    if (!fs.existsSync(filePath)) {
        log('File not found: ' + filePath);
        process.exit(1);
    }
    log('Reading file...');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    log('File read, length: ' + fileContent.length);

    const slugs = [];
    const titles = [];
    const summaries = []; // Summaries could be multiline or use backticks? Assuming " for now based on snippet

    // Regex approach
    // We'll scan globally
    const slugRegex = /slug:\s*"([^"]+)"/g;
    const titleRegex = /title:\s*"([^"]+)"/g;
    const summaryRegex = /summary:\s*"([^"]+)"/g;

    let match;
    while ((match = slugRegex.exec(fileContent)) !== null) {
        slugs.push(match[1]);
    }
    log('Slugs found: ' + slugs.length);

    while ((match = titleRegex.exec(fileContent)) !== null) {
        titles.push(match[1]);
    }
    log('Titles found: ' + titles.length);

    while ((match = summaryRegex.exec(fileContent)) !== null) {
        summaries.push(match[1]);
    }
    log('Summaries found: ' + summaries.length);

    if (slugs.length === 0) {
        log('No slugs found. Regex failed.');
    }

    const result = [];
    // Assume order matches (it should if keys are consistent)
    for (let i = 0; i < slugs.length; i++) {
        result.push({
            slug: slugs[i],
            title: titles[i] || '',
            summary: summaries[i] || ''
        });
    }

    fs.writeFileSync('blog_metadata.json', JSON.stringify(result, null, 2));
    log('wrote blog_metadata.json');

} catch (e) {
    log('Error: ' + e.message);
    log(e.stack);
}
