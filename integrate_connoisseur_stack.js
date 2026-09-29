const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Ensure GSAP CDN is loaded in <head>
if (!html.includes('cdnjs.cloudflare.com/ajax/libs/gsap')) {
    html = html.replace(
        '</head>',
        '    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n</head>'
    );
}

// Replace the entire #works section CSS and HTML with the Connoisseur Stack Interactor
const worksCss = `
        /* ═══════════════════════════════════════════════════════════════════
           CONNOISSEUR STACK INTERACTOR (WORKS SECTION)
        ═══════════════════════════════════════════════════════════════════ */
        #works {
            background: #040508;
            position: relative;
            overflow: hidden;
            padding: 7rem 1.5rem;
            border-top: 1px dashed var(--line);
        }
        @media (min-width: 1024px) {
            #works {
                padding: 8rem 3rem;
                min-height: 90vh;
                display: flex;
                align-items: center;
            }
        }

        .stack-interactor-container {
            width: 100%;
            max-width: 82rem;
            margin-inline: auto;
            position: relative;
            z-index: 2;
        }

        .stack-header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 3.5rem;
            border-bottom: 1px dashed var(--line);
            padding-bottom: 1.5rem;
        }

        .stack-title-h2 {
            font-size: 2.25rem;
            line-height: 1.1;
            color: var(--text-primary);
        }
        @media (min-width: 640px) { .stack-title-h2 { font-size: 3rem; } }
        @media (min-width: 1024px) { .stack-title-h2 { font-size: 3.75rem; } }

        .stack-interactive-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3.5rem;
            align-items: center;
        }
        @media (min-width: 1024px) {
            .stack-interactive-grid {
                grid-template-columns: 1.1fr 1fr;
                gap: 4rem;
            }
        }

        /* Left Side: Typographic Menu */
        .stack-menu-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1.75rem;
        }

        .stack-menu-item {
            cursor: pointer;
            position: relative;
            padding: 0.5rem 0;
            transition: transform 0.4s var(--ease-spring);
        }

        .stack-item-row {
            display: flex;
            align-items: baseline;
            gap: 1.5rem;
        }

        .stack-item-num {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-faint);
            transition: color 0.4s ease, transform 0.4s var(--ease-spring);
            flex-shrink: 0;
            width: 2.5rem;
        }

        .stack-menu-item.is-active .stack-item-num {
            color: var(--accent-cyan);
            transform: scale(1.15);
        }

        .stack-item-title {
            font-family: "Playfair Display", serif;
            font-size: 2.25rem;
            font-weight: 700;
            line-height: 1.05;
            letter-spacing: -0.02em;
            text-transform: uppercase;
            transition: all 0.5s var(--ease-spring);
            color: rgba(255, 255, 255, 0.25);
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.35);
        }
        @media (min-width: 640px) { .stack-item-title { font-size: 2.75rem; } }
        @media (min-width: 1024px) { .stack-item-title { font-size: 3.25rem; } }

        .stack-menu-item.is-active .stack-item-title {
            color: #ffffff;
            -webkit-text-stroke: 0px transparent;
            transform: translateX(1.2rem);
            font-style: italic;
        }

        /* Active Project Details Card below menu */
        .stack-active-card {
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(13, 16, 23, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            backdrop-filter: blur(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .stack-card-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
        }

        .stack-card-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--text-muted);
            margin-bottom: 1rem;
        }

        .stack-card-bottom {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            border-top: 1px dashed var(--line);
            padding-top: 1rem;
        }

        .stack-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .stack-tag-pill {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--accent-cyan);
            background: rgba(0, 242, 254, 0.06);
            border: 1px solid rgba(0, 242, 254, 0.2);
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
        }

        .stack-cta-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.85rem;
            font-weight: 600;
            color: #ffffff;
            background: var(--accent-cyan);
            color: #040508;
            padding: 0.5rem 1.1rem;
            border-radius: 6px;
            transition: all 0.3s var(--ease-spring);
        }
        .stack-cta-btn:hover {
            background: #ffffff;
            transform: translateX(4px);
        }

        /* Right Side: Dynamic Geometric SVG Masking Display */
        .stack-visual-display {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        .stack-visual-glow {
            position: absolute;
            width: 110%;
            height: 110%;
            background: radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, rgba(79, 172, 254, 0.05) 50%, transparent 70%);
            filter: blur(80px);
            border-radius: 50%;
            pointer-events: none;
            transition: opacity 0.8s ease;
        }

        .stack-svg-canvas {
            width: 100%;
            max-width: 520px;
            height: auto;
            aspect-ratio: 1 / 1;
            position: relative;
            z-index: 2;
            filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.9));
        }
`;

// Insert the CSS before </style>
html = html.replace('</style>', worksCss + '\n    </style>');

// Find #works section in index.html
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
                    4 Active Architectures
                </div>
            </div>

            <div class="stack-interactive-grid">
                <!-- Left Side: Typographic Project Selector -->
                <div class="stack-menu-col">
                    <ul class="stack-menu-list" id="stack-menu-list">
                        <!-- 01 · AURA Spatial Atelier -->
                        <li class="stack-menu-item is-active" data-index="0" onmouseenter="handleStackHover(0)">
                            <div class="stack-item-row">
                                <span class="stack-item-num">01</span>
                                <h3 class="stack-item-title">AURA ATELIER</h3>
                            </div>
                        </li>

                        <!-- 02 · Apex Nova Dental -->
                        <li class="stack-menu-item" data-index="1" onmouseenter="handleStackHover(1)">
                            <div class="stack-item-row">
                                <span class="stack-item-num">02</span>
                                <h3 class="stack-item-title">APEX DENTAL</h3>
                            </div>
                        </li>

                        <!-- 03 · Chronos Horology -->
                        <li class="stack-menu-item" data-index="2" onmouseenter="handleStackHover(2)">
                            <div class="stack-item-row">
                                <span class="stack-item-num">03</span>
                                <h3 class="stack-item-title">CHRONOS WATCH</h3>
                            </div>
                        </li>

                        <!-- 04 · Autonomous AI Neural Engine -->
                        <li class="stack-menu-item" data-index="3" onmouseenter="handleStackHover(3)">
                            <div class="stack-item-row">
                                <span class="stack-item-num">04</span>
                                <h3 class="stack-item-title">NEURAL AI</h3>
                            </div>
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

                <!-- Right Side: SVG Geometric ClipPath Reveal Engine -->
                <div class="stack-visual-display">
                    <div class="stack-visual-glow"></div>
                    
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
                </div>
            </div>
        </div>
    </section>`;

html = html.replace(worksSectionRegex, newWorksSectionHtml);

// Add the GSAP interaction script logic at the bottom before </body>
const gsapScript = `
    <!-- ═══════════════════════════════════════════════════════════════════
         GSAP CONNOISSEUR STACK CONTROLLER
    ═══════════════════════════════════════════════════════════════════ -->
    <script>
        const stackProjects = [
            {
                num: "01",
                name: "AURA ATELIER",
                clipId: "clip-aura",
                image: "project-aura.jpg",
                url: "aura-atelier.surge.sh",
                link: "https://aura-atelier.surge.sh",
                status: "Live Deployed",
                desc: "Luxury brutalist interior architecture & 3D spatial showroom platform featuring atmospheric light simulation, bespoke typography, and seamless smooth scroll.",
                tags: ["Next.js 15", "Tailwind CSS", "Spatial 3D UI", "Lenis"]
            },
            {
                num: "02",
                name: "APEX DENTAL",
                clipId: "clip-dental",
                image: "project-dental.jpg",
                url: "apex-novadental.surge.sh",
                link: "https://apex-novadental.surge.sh",
                status: "Live Deployed",
                desc: "Comprehensive surgical dental care & smart scheduling web app with interactive clinical diagnostics, real-time availability engine, and dark obsidian UI design.",
                tags: ["React 19", "TypeScript", "Booking Engine", "Clinical UX"]
            },
            {
                num: "03",
                name: "CHRONOS WATCH",
                clipId: "clip-chronos",
                image: "project-chronos.jpg",
                url: "chronos-horology.preview",
                link: "https://aura-atelier.surge.sh",
                status: "Private Atelier",
                desc: "Haute Horlogerie interactive digital boutique showcasing handcrafted Swiss tourbillon movements, micro-precision typography, and spring-physics configurator.",
                tags: ["Luxury Editorial", "WebGL", "Kinetic Motion", "Tourbillon"]
            },
            {
                num: "04",
                name: "NEURAL AI",
                clipId: "clip-neural",
                image: "project-ai.jpg",
                url: "github.com/manishkumarsoni7",
                link: "https://github.com/manishkumarsoni7",
                status: "AI Engine",
                desc: "Multi-agent LLM orchestration system in Python & LangChain executing real-time research, code verification, vector retrieval, and autonomous workflow synthesis.",
                tags: ["Python", "LangChain", "Autonomous Agents", "PostgreSQL"]
            }
        ];

        let activeStackIdx = 0;
        let stackMasterTl = null;

        function createStackLoop(index) {
            if (typeof gsap === 'undefined') return;
            const item = stackProjects[index];
            const selector = \`#\${item.clipId} .path\`;
            const imageEl = document.getElementById('stack-image-element');
            const groupEl = document.getElementById('stack-main-group');

            if (stackMasterTl) stackMasterTl.kill();

            if (imageEl) imageEl.setAttribute('href', item.image);
            if (groupEl) groupEl.setAttribute('clip-path', \`url(#\${item.clipId})\`);

            gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" });

            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

            // 1. IN (Expo Out)
            tl.to(selector, {
                scale: 1,
                duration: 0.8,
                stagger: { amount: 0.35, from: "random" },
                ease: "expo.out",
            })
            // 2. IDLE (Sine Breath)
            .to(selector, {
                scale: 1.04,
                duration: 1.6,
                yoyo: true,
                repeat: 1,
                ease: "sine.inOut",
                stagger: { amount: 0.2, from: "center" }
            })
            // 3. OUT (Expo In)
            .to(selector, {
                scale: 0,
                duration: 0.55,
                stagger: { amount: 0.25, from: "edges" },
                ease: "expo.in",
            });

            stackMasterTl = tl;
        }

        window.handleStackHover = function(index) {
            if (index === activeStackIdx) return;
            activeStackIdx = index;

            // Update active class on menu items
            const items = document.querySelectorAll('.stack-menu-item');
            items.forEach((item, i) => {
                if (i === index) item.classList.add('is-active');
                else item.classList.remove('is-active');
            });

            // Update details box content
            const project = stackProjects[index];
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
            }
            if (tagsEl) {
                tagsEl.innerHTML = project.tags.map(tag => \`<span class="stack-tag-pill">\${tag}</span>\`).join('');
            }

            // Animate SVG ClipPath
            createStackLoop(index);
        };

        // Initialize first loop on DOM ready
        window.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                createStackLoop(0);
            }, 300);
        });
    </script>
`;

html = html.replace('</body>', gsapScript + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully integrated Connoisseur Stack Interactor into index.html!');
