const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update CSS for clickable items and visual link hover
const oldCssSnippet = `        .stack-menu-item {
            cursor: pointer;
            position: relative;
            padding: 0.5rem 0;
            transition: transform 0.4s var(--ease-spring);
        }`;

const newCssSnippet = `        .stack-menu-item {
            cursor: pointer;
            position: relative;
            padding: 0.5rem 0;
            transition: transform 0.4s var(--ease-spring);
            text-decoration: none;
            display: block;
        }

        .stack-item-arrow {
            font-size: 1.5rem;
            color: var(--accent-cyan);
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.4s var(--ease-spring);
            margin-left: 0.5rem;
        }

        .stack-menu-item.is-active .stack-item-arrow,
        .stack-menu-item:hover .stack-item-arrow {
            opacity: 1;
            transform: translateX(0);
        }

        .stack-visual-link {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            cursor: pointer;
            text-decoration: none;
        }

        .stack-visual-badge {
            position: absolute;
            bottom: 1.5rem;
            right: 1.5rem;
            z-index: 10;
            background: rgba(4, 5, 8, 0.85);
            border: 1px solid rgba(0, 242, 254, 0.4);
            padding: 0.45rem 1rem;
            border-radius: 999px;
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            color: #ffffff;
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            backdrop-filter: blur(12px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
            transition: all 0.3s var(--ease-spring);
            opacity: 0.9;
        }

        .stack-visual-link:hover .stack-visual-badge {
            opacity: 1;
            transform: scale(1.05);
            background: var(--accent-cyan);
            color: #040508;
            border-color: var(--accent-cyan);
        }`;

html = html.replace(oldCssSnippet, newCssSnippet);

// 2. Replace the Works section HTML so menu items are links and SVG is wrapped in visual link
const worksSectionRegex = /<section id="works"[\s\S]*?<\/section>/;

const newWorksSectionHtml = `    <!-- ═══════════════════════════════════════════════════════════════════
         FEATURED WORKS (GSAP SVG CLIPPATH STACK INTERACTOR)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="works" class="section-pad">
        <div class="stack-interactor-container" data-reveal-section>
            
            <div class="stack-header-row">
                <div>
                    <div class="eyebrow reveal-fade">Selected Systems</div>
                    <h2 class="stack-title-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Systems designed to</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">endure</span> &amp; perform.</span></span>
                    </h2>
                </div>
                <div class="work-live-pill reveal-fade" style="font-size: 0.8rem;">
                    Click Any Project to Open
                </div>
            </div>

            <div class="stack-interactive-grid">
                <!-- Left Side: Typographic Project Selector with Direct Links -->
                <div class="stack-menu-col">
                    <ul class="stack-menu-list" id="stack-menu-list">
                        <!-- 01 · AURA Spatial Atelier -->
                        <li>
                            <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-menu-item is-active" data-index="0" onmouseenter="handleStackHover(0)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">01</span>
                                    <h3 class="stack-item-title">AURA ATELIER</h3>
                                    <span class="stack-item-arrow">↗</span>
                                </div>
                            </a>
                        </li>

                        <!-- 02 · Apex Nova Dental -->
                        <li>
                            <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-menu-item" data-index="1" onmouseenter="handleStackHover(1)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">02</span>
                                    <h3 class="stack-item-title">APEX DENTAL</h3>
                                    <span class="stack-item-arrow">↗</span>
                                </div>
                            </a>
                        </li>

                        <!-- 03 · Chronos Horology -->
                        <li>
                            <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-menu-item" data-index="2" onmouseenter="handleStackHover(2)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">03</span>
                                    <h3 class="stack-item-title">CHRONOS WATCH</h3>
                                    <span class="stack-item-arrow">↗</span>
                                </div>
                            </a>
                        </li>

                        <!-- 04 · Autonomous AI Neural Engine -->
                        <li>
                            <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noopener noreferrer" class="stack-menu-item" data-index="3" onmouseenter="handleStackHover(3)">
                                <div class="stack-item-row">
                                    <span class="stack-item-num">04</span>
                                    <h3 class="stack-item-title">NEURAL AI</h3>
                                    <span class="stack-item-arrow">↗</span>
                                </div>
                            </a>
                        </li>
                    </ul>

                    <!-- Dynamic Details Box -->
                    <div class="stack-active-card reveal-fade-up" id="stack-details-card">
                        <div class="stack-card-meta">
                            <span class="work-browser-url" id="stack-card-url">aura-atelier.surge.sh</span>
                            <span class="work-live-pill" id="stack-card-status">Live Deployed</span>
                        </div>
                        <p class="stack-card-desc" id="stack-card-desc">
                            Luxury brutalist interior architecture &amp; 3D spatial showroom platform featuring atmospheric light simulation, bespoke typography, and seamless smooth scroll.
                        </p>
                        <div class="stack-card-bottom">
                            <div class="stack-tags" id="stack-card-tags">
                                <span class="stack-tag-pill">Next.js 15</span>
                                <span class="stack-tag-pill">Tailwind CSS</span>
                                <span class="stack-tag-pill">Spatial 3D UI</span>
                            </div>
                            <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-cta-btn" id="stack-card-cta">
                                Launch Live <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Clickable SVG Geometric ClipPath Reveal Engine -->
                <div class="stack-visual-display">
                    <div class="stack-visual-glow"></div>
                    
                    <a id="stack-visual-link" href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="stack-visual-link" title="Click to open live project">
                        <svg viewBox="0 0 500 500" class="stack-svg-canvas" id="stack-svg-canvas">
                            <defs>
                                <!-- 01: Architectural Horizontal Slits & Monolith cutouts -->
                                <clipPath id="clip-aura">
                                    <path class="path" d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z" />
                                    <path class="path" d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z" />
                                    <path class="path" d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z" />
                                    <path class="path" d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z" />
                                    <path class="path" d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z" />
                                </clipPath>

                                <!-- 02: Bento Rounded Rect Hexagon Panels -->
                                <clipPath id="clip-dental">
                                    <rect class="path" x="20" y="20" width="200" height="280" rx="14" />
                                    <rect class="path" x="20" y="320" width="200" height="160" rx="14" />
                                    <rect class="path" x="240" y="20" width="240" height="140" rx="14" />
                                    <rect class="path" x="240" y="180" width="110" height="160" rx="14" />
                                    <rect class="path" x="370" y="180" width="110" height="160" rx="14" />
                                    <rect class="path" x="240" y="360" width="240" height="120" rx="14" />
                                </clipPath>

                                <!-- 03: Mechanical Circular & Precision Cuts -->
                                <clipPath id="clip-chronos">
                                    <circle class="path" cx="250" cy="250" r="220" />
                                    <rect class="path" x="40" y="40" width="180" height="180" rx="20" />
                                    <rect class="path" x="280" y="40" width="180" height="180" rx="20" />
                                    <rect class="path" x="40" y="280" width="180" height="180" rx="20" />
                                    <rect class="path" x="280" y="280" width="180" height="180" rx="20" />
                                </clipPath>

                                <!-- 04: Cybernetic 9-Tile Pixel Grid -->
                                <clipPath id="clip-neural">
                                    <rect class="path" x="20" y="20" width="135" height="135" rx="8" />
                                    <rect class="path" x="180" y="20" width="135" height="135" rx="8" />
                                    <rect class="path" x="340" y="20" width="135" height="135" rx="8" />
                                    
                                    <rect class="path" x="20" y="180" width="135" height="135" rx="8" />
                                    <rect class="path" x="180" y="180" width="135" height="135" rx="8" />
                                    <rect class="path" x="340" y="180" width="135" height="135" rx="8" />
                                    
                                    <rect class="path" x="20" y="340" width="135" height="135" rx="8" />
                                    <rect class="path" x="180" y="340" width="135" height="135" rx="8" />
                                    <rect class="path" x="340" y="340" width="135" height="135" rx="8" />
                                </clipPath>
                            </defs>

                            <g id="stack-main-group" clip-path="url(#clip-aura)">
                                <image
                                    id="stack-image-element"
                                    href="project-aura.jpg"
                                    width="500"
                                    height="500"
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </g>
                        </svg>

                        <div class="stack-visual-badge">
                            <span>Open Project</span> <span>↗</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </section>`;

html = html.replace(worksSectionRegex, newWorksSectionHtml);

// 3. Update the JavaScript handleStackHover so it syncs stack-visual-link href
const oldJsSnippet = `            const project = stackProjects[index];
            const urlEl = document.getElementById('stack-card-url');
            const statusEl = document.getElementById('stack-card-status');
            const descEl = document.getElementById('stack-card-desc');
            const tagsEl = document.getElementById('stack-card-tags');
            const ctaEl = document.getElementById('stack-card-cta');

            if (urlEl) urlEl.textContent = project.url;
            if (statusEl) statusEl.textContent = project.status;
            if (descEl) descEl.textContent = project.desc;
            if (ctaEl) {
                ctaEl.href = project.link;
                ctaEl.innerHTML = project.status === 'Private Atelier' ? 'Private Showcase <span>🔒</span>' : 'Launch Live <span>→</span>';
            }`;

const newJsSnippet = `            const project = stackProjects[index];
            const urlEl = document.getElementById('stack-card-url');
            const statusEl = document.getElementById('stack-card-status');
            const descEl = document.getElementById('stack-card-desc');
            const tagsEl = document.getElementById('stack-card-tags');
            const ctaEl = document.getElementById('stack-card-cta');
            const visualLink = document.getElementById('stack-visual-link');

            if (urlEl) urlEl.textContent = project.url;
            if (statusEl) statusEl.textContent = project.status;
            if (descEl) descEl.textContent = project.desc;
            if (ctaEl) {
                ctaEl.href = project.link;
                ctaEl.innerHTML = project.status === 'Private Atelier' ? 'Private Showcase <span>🔒</span>' : 'Launch Live <span>→</span>';
            }
            if (visualLink) {
                visualLink.href = project.link;
            }`;

html = html.replace(oldJsSnippet, newJsSnippet);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully made all stack interactor items and visual plate clickable to live URLs!');
