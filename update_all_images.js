const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace Works section images with the new project assets
html = html.replace(
    'src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="AURA Spatial Atelier — Luxury Interior Architecture"',
    'src="project-aura.jpg" alt="AURA Spatial Atelier — Luxury Interior Architecture & 3D Showroom"'
);

html = html.replace(
    'src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l2.webp" alt="Apex Nova Dental — Surgical Care Studio"',
    'src="project-dental.jpg" alt="Apex Nova Dental — Surgical Care Studio & Smart Booking Engine"'
);

html = html.replace(
    'src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p3.webp" alt="Chronos Horology — Haute Horlogerie Timepiece Atelier"',
    'src="project-chronos.jpg" alt="Chronos Horology — Haute Horlogerie Timepiece Atelier"'
);

html = html.replace(
    'src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l4.webp" alt="Autonomous AI Neural Engine — LLM Agent Pipelines"',
    'src="project-ai.jpg" alt="Autonomous AI Neural Engine — Multi-Agent Intelligence Platform"'
);

// 2. Replace About section images with the new engineering & craft case study assets
html = html.replace(
    '<img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="Studio Light Study" loading="lazy">',
    '<img src="about-craft.jpg" alt="Spatial Proportions & Minimalist Design Systems" loading="lazy">'
);

html = html.replace(
    '<img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l2.webp" alt="Workspace &amp; Engineering" loading="lazy">',
    '<img src="about-code.jpg" alt="High-Performance Systems & Full-Stack Architecture" loading="lazy">'
);

html = html.replace(
    '<img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l3.webp" alt="Prototypes in Progress" loading="lazy">',
    '<img src="about-ai.jpg" alt="Autonomous AI Neural Agents & LLM Pipelines" loading="lazy">'
);

// Check if any getlayers.ai URLs remain
const remainingLayers = (html.match(/getlayers\.ai/g) || []).length;
console.log('Remaining getlayers.ai references:', remainingLayers);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with real project assets!');
