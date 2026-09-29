const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check sections
const sectionMatches = html.match(/<section[^>]*id="([^"]+)"/g) || [];
console.log('Found sections:', sectionMatches);

// 2. Check script tags
const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
console.log('\nFound scripts count:', scripts.length);

// 3. Check for any syntax errors in embedded JS
scripts.forEach((s, idx) => {
    const code = s.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    if (!s.includes('src=')) {
        try {
            new Function(code);
            console.log(`Script ${idx + 1}: Valid JS`);
        } catch (err) {
            console.error(`Script ${idx + 1} Error:`, err.message);
        }
    } else {
        console.log(`Script ${idx + 1}: External script`);
    }
});

// 4. Check CSS style block
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    console.log('\nCSS total length:', styleMatch[1].length);
}

// 5. Look for duplicates in html
const lines = html.split('\n');
console.log('Total HTML lines:', lines.length);
