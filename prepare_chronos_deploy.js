const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'build-chronos-horology');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Read demo-chronos-horology.html and write as index.html in targetDir
let html = fs.readFileSync(path.join(__dirname, 'demo-chronos-horology.html'), 'utf8');

// Ensure image references and metadata are sharp
fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');

// 2. Write CNAME file for Surge
fs.writeFileSync(path.join(targetDir, 'CNAME'), 'chronos-atelier.surge.sh', 'utf8');

// 3. Copy image assets
if (fs.existsSync('project-chronos.jpg')) {
    fs.copyFileSync('project-chronos.jpg', path.join(targetDir, 'project-chronos.jpg'));
}
if (fs.existsSync('favicon.svg')) {
    fs.copyFileSync('favicon.svg', path.join(targetDir, 'favicon.svg'));
}

console.log('Successfully prepared build-chronos-horology with files:', fs.readdirSync(targetDir));
