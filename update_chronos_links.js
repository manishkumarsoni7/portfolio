const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update HTML link for Chronos Watch in Works menu
html = html.replace(
    `<a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-menu-item" data-index="2" onmouseenter="handleStackHover(2)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">03</span>
                                    <h3 class="stack-item-title">CHRONOS WATCH</h3>`,
    `<a href="https://chronos-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-menu-item" data-index="2" onmouseenter="handleStackHover(2)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">03</span>
                                    <h3 class="stack-item-title">CHRONOS WATCH</h3>`
);

// 2. Update JavaScript data array for Chronos Watch
html = html.replace(
    `            {
                num: "03",
                name: "CHRONOS WATCH",
                clipId: "clip-chronos",
                image: "project-chronos.jpg",
                url: "chronos-horology.preview",
                link: "https://aura-atelier.surge.sh",
                status: "Private Atelier",
                desc: "Haute Horlogerie interactive digital boutique showcasing handcrafted Swiss tourbillon movements, micro-precision typography, and spring-physics configurator.",
                tags: ["Luxury Editorial", "WebGL", "Kinetic Motion", "Tourbillon"]
            }`,
    `            {
                num: "03",
                name: "CHRONOS WATCH",
                clipId: "clip-chronos",
                image: "project-chronos.jpg",
                url: "chronos-atelier.surge.sh",
                link: "https://chronos-atelier.surge.sh",
                status: "Live Deployed",
                desc: "Haute Horlogerie interactive digital boutique showcasing handcrafted Swiss tourbillon movements, micro-precision typography, and spring-physics configurator.",
                tags: ["Luxury Editorial", "WebGL", "Kinetic Motion", "Tourbillon"]
            }`
);

// 3. Update Footer Deployments List
html = html.replace(
    `                        <li><a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">AURA Atelier ↗</a></li>
                        <li><a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">Apex Nova ↗</a></li>
                        <li><a href="#contact">AI Agents</a></li>
                        <li><a href="#contact">Contracts</a></li>`,
    `                        <li><a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">AURA Spatial Atelier ↗</a></li>
                        <li><a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">Apex Nova Dental ↗</a></li>
                        <li><a href="https://chronos-atelier.surge.sh" target="_blank" rel="noopener noreferrer">Chronos Horology ↗</a></li>
                        <li><a href="https://github.com/manishkumarsoni7" target="_blank" rel="noopener noreferrer">AI Neural Swarms ↗</a></li>`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with live chronos-atelier.surge.sh URL!');
