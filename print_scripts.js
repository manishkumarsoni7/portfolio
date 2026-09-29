const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/g) || [];
scripts.forEach((s, idx) => {
    console.log(`\n--- SCRIPT ${idx + 1} (${s.slice(0, 100)}...) ---`);
    console.log(s.slice(0, 300));
});
