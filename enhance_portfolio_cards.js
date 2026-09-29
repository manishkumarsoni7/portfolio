const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the fallback to getlayers.ai in hero
html = html.replace(
    `<img src="manish.jpg" alt="Manish Kumar Soni — Lead Developer &amp; AI Builder" onerror="this.src='https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p1.webp'" loading="eager">`,
    `<img src="manish.jpg" alt="Manish Kumar Soni — Lead Developer &amp; AI Builder" loading="eager">`
);

// 2. Enhance CSS for Works and About cards to make them look world-class
const oldWorksCss = `        .works-gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            margin-top: 4rem;
        }
        @media (min-width: 1024px) {
            .works-gallery-grid {
                grid-template-columns: repeat(12, 1fr);
                column-gap: 2.5rem;
                row-gap: 0;
                margin-top: 6rem;
            }
        }

        .work-article {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .work-article { grid-column: span 7; }
            .work-article:nth-child(even) { grid-column-start: 6; margin-top: 6rem; }
            .work-article:nth-child(odd) { grid-column-start: 1; }
        }

        .work-card-media {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: #11141c;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            transition: border-color 0.4s ease;
        }
        .work-card-media:hover {
            border-color: var(--accent-cyan);
        }
        .work-card-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s var(--ease-spring);
        }
        .work-card-media:hover img {
            transform: scale(1.05);
        }

        .work-caption {
            border-top: 1px dashed var(--line);
            margin-top: 1.5rem;
            padding-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1.5rem;
        }
        .work-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            font-family: "Space Grotesk", sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .work-medium {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        }
        .work-year {
            font-family: "Playfair Display", serif;
            font-size: 1.1rem;
            color: var(--accent-cyan);
        }`;

const newWorksCss = `        .works-gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 1024px) {
            .works-gallery-grid {
                grid-template-columns: repeat(2, 1fr);
                column-gap: 3.5rem;
                row-gap: 5rem;
                margin-top: 5rem;
            }
        }

        .work-article {
            display: flex;
            flex-direction: column;
            background: rgba(13, 16, 23, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 14px;
            padding: 1.25rem;
            backdrop-filter: blur(16px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
            transition: transform 0.5s var(--ease-spring), border-color 0.4s ease, box-shadow 0.5s ease;
        }
        .work-article:hover {
            transform: translateY(-8px);
            border-color: rgba(0, 242, 254, 0.35);
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 254, 0.08);
        }

        .work-browser-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.4rem 0.6rem 0.9rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            margin-bottom: 1rem;
        }
        .work-browser-dots {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .work-browser-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
        }
        .work-browser-dot:nth-child(1) { background: rgba(255, 95, 86, 0.8); }
        .work-browser-dot:nth-child(2) { background: rgba(255, 189, 46, 0.8); }
        .work-browser-dot:nth-child(3) { background: rgba(39, 201, 63, 0.8); }
        
        .work-browser-url {
            font-family: "Space Grotesk", monospace;
            font-size: 0.72rem;
            color: var(--text-faint);
            letter-spacing: 0.05em;
            background: rgba(255, 255, 255, 0.04);
            padding: 0.25rem 0.75rem;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .work-live-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.68rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--accent-cyan);
            font-family: "Space Grotesk", sans-serif;
            font-weight: 600;
        }
        .work-live-pill::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--accent-cyan);
            box-shadow: 0 0 8px var(--accent-cyan);
            animation: pulse-dot 2s infinite ease-in-out;
        }
        @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(0.8); }
        }

        .work-card-media {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: #090b10;
            aspect-ratio: 16 / 10;
        }
        .work-card-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s var(--ease-spring);
        }
        .work-article:hover .work-card-media img {
            transform: scale(1.05);
        }

        .work-caption {
            margin-top: 1.4rem;
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }
        .work-meta-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1rem;
        }
        .work-title {
            font-size: 1.35rem;
            font-weight: 600;
            color: var(--text-primary);
            font-family: "Space Grotesk", sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: color 0.3s ease;
        }
        .work-article:hover .work-title {
            color: var(--accent-cyan);
        }
        .work-medium {
            font-size: 0.92rem;
            line-height: 1.5;
            color: var(--text-muted);
        }
        .work-tags-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.25rem;
        }
        .work-tag {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-faint);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.25rem 0.65rem;
            border-radius: 4px;
        }
        .work-bottom-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            font-weight: 600;
            font-family: "Space Grotesk", sans-serif;
            color: var(--accent-cyan);
            margin-top: 0.5rem;
            transition: transform 0.3s ease;
        }
        .work-bottom-cta:hover {
            transform: translateX(4px);
        }`;

html = html.replace(oldWorksCss, newWorksCss);

// 3. Update the Works HTML Section with the browser chrome headers and rich tags
const oldWorksHtml = `            <div class="works-gallery-grid">
                <!-- 01 · AURA Spatial Atelier · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate" data-parallax-card>
                                <img src="project-aura.jpg" alt="AURA Spatial Atelier — Luxury Interior Architecture & 3D Showroom" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div>
                                <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">AURA Spatial Atelier <span>↗</span></h3>
                                </a>
                                <p class="work-medium">Luxury Interior Architecture &amp; 3D Spatial Showroom</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 02 · Apex Nova Dental · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate" data-parallax-card>
                                <img src="project-dental.jpg" alt="Apex Nova Dental — Surgical Care Studio & Smart Booking Engine" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div>
                                <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">Apex Nova Dental <span>↗</span></h3>
                                </a>
                                <p class="work-medium">Surgical Care Studio &amp; Smart Booking Engine</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 03 · Chronos Horology · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="work-card-media reveal-plate" data-parallax-card>
                            <img src="project-chronos.jpg" alt="Chronos Horology — Haute Horlogerie Timepiece Atelier" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Chronos Horology</h3>
                                <p class="work-medium">Haute Horlogerie Kinetic Timepiece Configurator</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 04 · Autonomous AI Neural Engine · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="work-card-media reveal-plate" data-parallax-card>
                            <img src="project-ai.jpg" alt="Autonomous AI Neural Engine — Multi-Agent Intelligence Platform" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Autonomous AI Neural Engine</h3>
                                <p class="work-medium">Python &amp; LangChain Autonomous Agent Workflows</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>
            </div>`;

const newWorksHtml = `            <div class="works-gallery-grid">
                <!-- 01 · AURA Spatial Atelier -->
                <article class="work-article" data-reveal-section>
                    <div class="work-browser-header">
                        <div class="work-browser-dots">
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                        </div>
                        <span class="work-browser-url">aura-atelier.surge.sh</span>
                        <span class="work-live-pill">Live Deployed</span>
                    </div>
                    <figure>
                        <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate">
                                <img src="project-aura.jpg" alt="AURA Spatial Atelier — Luxury Interior Architecture & 3D Showroom" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div class="work-meta-row">
                                <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">AURA Spatial Atelier <span>↗</span></h3>
                                </a>
                                <span class="work-year">2026</span>
                            </div>
                            <p class="work-medium">Luxury brutalist interior architecture &amp; 3D spatial showroom platform featuring atmospheric light simulation, bespoke typography, and seamless smooth scroll.</p>
                            <div class="work-tags-row">
                                <span class="work-tag">Next.js 15</span>
                                <span class="work-tag">Tailwind CSS</span>
                                <span class="work-tag">Lenis Smooth Scroll</span>
                                <span class="work-tag">Spatial 3D UI</span>
                            </div>
                            <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" class="work-bottom-cta">
                                Launch Live Atelier <span>→</span>
                            </a>
                        </figcaption>
                    </figure>
                </article>

                <!-- 02 · Apex Nova Dental -->
                <article class="work-article" data-reveal-section>
                    <div class="work-browser-header">
                        <div class="work-browser-dots">
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                        </div>
                        <span class="work-browser-url">apex-novadental.surge.sh</span>
                        <span class="work-live-pill">Live Deployed</span>
                    </div>
                    <figure>
                        <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate">
                                <img src="project-dental.jpg" alt="Apex Nova Dental — Surgical Care Studio & Smart Booking Engine" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div class="work-meta-row">
                                <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">Apex Nova Dental <span>↗</span></h3>
                                </a>
                                <span class="work-year">2026</span>
                            </div>
                            <p class="work-medium">Comprehensive surgical dental care &amp; smart scheduling web app with interactive clinical diagnostics, real-time availability engine, and dark obsidian UI design.</p>
                            <div class="work-tags-row">
                                <span class="work-tag">React 19</span>
                                <span class="work-tag">TypeScript</span>
                                <span class="work-tag">Booking Engine</span>
                                <span class="work-tag">Clinical UX</span>
                            </div>
                            <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer" class="work-bottom-cta">
                                Launch Dental Studio <span>→</span>
                            </a>
                        </figcaption>
                    </figure>
                </article>

                <!-- 03 · Chronos Horology -->
                <article class="work-article" data-reveal-section>
                    <div class="work-browser-header">
                        <div class="work-browser-dots">
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                        </div>
                        <span class="work-browser-url">chronos-horology.preview</span>
                        <span class="work-live-pill">Bespoke Atelier</span>
                    </div>
                    <figure>
                        <div class="work-card-media reveal-plate">
                            <img src="project-chronos.jpg" alt="Chronos Horology — Haute Horlogerie Timepiece Atelier" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div class="work-meta-row">
                                <h3 class="work-title">Chronos Horology</h3>
                                <span class="work-year">2026</span>
                            </div>
                            <p class="work-medium">Haute Horlogerie interactive digital boutique showcasing handcrafted Swiss tourbillon movements, micro-precision typography, and spring-physics configurator.</p>
                            <div class="work-tags-row">
                                <span class="work-tag">Luxury Editorial</span>
                                <span class="work-tag">WebGL</span>
                                <span class="work-tag">Kinetic Reveal</span>
                                <span class="work-tag">E-Commerce</span>
                            </div>
                            <span class="work-bottom-cta" style="color: var(--text-muted);">
                                Private Client Showcase <span>🔒</span>
                            </span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 04 · Autonomous AI Neural Engine -->
                <article class="work-article" data-reveal-section>
                    <div class="work-browser-header">
                        <div class="work-browser-dots">
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                            <span class="work-browser-dot"></span>
                        </div>
                        <span class="work-browser-url">neural-agent-matrix.ai</span>
                        <span class="work-live-pill">AI Engine</span>
                    </div>
                    <figure>
                        <div class="work-card-media reveal-plate">
                            <img src="project-ai.jpg" alt="Autonomous AI Neural Engine — Multi-Agent Intelligence Platform" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div class="work-meta-row">
                                <h3 class="work-title">Autonomous AI Neural Engine</h3>
                                <span class="work-year">2026</span>
                            </div>
                            <p class="work-medium">Multi-agent LLM orchestration system in Python &amp; LangChain executing real-time research, code verification, vector retrieval, and autonomous workflow synthesis.</p>
                            <div class="work-tags-row">
                                <span class="work-tag">Python</span>
                                <span class="work-tag">LangChain</span>
                                <span class="work-tag">Autonomous Agents</span>
                                <span class="work-tag">PostgreSQL</span>
                            </div>
                            <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noopener noreferrer" class="work-bottom-cta">
                                View GitHub Architecture <span>→</span>
                            </a>
                        </figcaption>
                    </figure>
                </article>
            </div>`;

html = html.replace(oldWorksHtml, newWorksHtml);

// 4. Update the About Photos Grid with rich labels and tech pillars
const oldAboutPhotosCss = `        .about-photos-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .about-photos-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .about-photo-item {
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid var(--border-subtle);
        }
        .about-photo-item img {
            width: 100%;
            aspect-ratio: 3 / 2;
            object-fit: cover;
            filter: grayscale(90%);
            transition: all 0.7s var(--ease-spring);
        }
        .about-photo-item:hover img {
            filter: grayscale(0%);
            transform: scale(1.06);
        }`;

const newAboutPhotosCss = `        .about-photos-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .about-photos-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .about-photo-item {
            background: rgba(13, 16, 23, 0.7);
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s var(--ease-spring), border-color 0.4s ease;
        }
        .about-photo-item:hover {
            transform: translateY(-6px);
            border-color: rgba(0, 242, 254, 0.3);
        }
        .about-photo-img-wrap {
            position: relative;
            overflow: hidden;
            aspect-ratio: 16 / 10;
        }
        .about-photo-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(40%) contrast(1.05);
            transition: all 0.7s var(--ease-spring);
        }
        .about-photo-item:hover .about-photo-img-wrap img {
            filter: grayscale(0%) contrast(1.05);
            transform: scale(1.06);
        }
        .about-photo-caption {
            padding: 1.25rem 1.25rem 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .about-photo-idx {
            font-family: "Space Grotesk", monospace;
            font-size: 0.75rem;
            color: var(--accent-cyan);
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }
        .about-photo-title {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.05rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        .about-photo-desc {
            font-size: 0.85rem;
            color: var(--text-muted);
            line-height: 1.5;
        }`;

html = html.replace(oldAboutPhotosCss, newAboutPhotosCss);

// 5. Update the About Photos Grid HTML
const oldAboutPhotosHtml = `            <!-- Photos Grid -->
            <div class="about-photos-grid">
                <div class="about-photo-item reveal-plate" style="transition-delay: 0ms;">
                    <img src="about-craft.jpg" alt="Spatial Proportions & Minimalist Design Systems" loading="lazy">
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 100ms;">
                    <img src="about-code.jpg" alt="High-Performance Systems & Full-Stack Architecture" loading="lazy">
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 200ms;">
                    <img src="about-ai.jpg" alt="Autonomous AI Neural Agents & LLM Pipelines" loading="lazy">
                </div>
            </div>`;

const newAboutPhotosHtml = `            <!-- Engineering & Craft Pillar Cards -->
            <div class="about-photos-grid">
                <div class="about-photo-item reveal-plate" style="transition-delay: 0ms;">
                    <div class="about-photo-img-wrap">
                        <img src="about-craft.jpg" alt="Spatial Proportions & Minimalist Design Systems" loading="lazy">
                    </div>
                    <div class="about-photo-caption">
                        <span class="about-photo-idx">Pillar 01 · Spatial Craft</span>
                        <h3 class="about-photo-title">Editorial &amp; 3D UI Systems</h3>
                        <p class="about-photo-desc">Crafting digital spaces with architectural harmony, adaptive rem grids, and kinetic spring physics.</p>
                    </div>
                </div>

                <div class="about-photo-item reveal-plate" style="transition-delay: 100ms;">
                    <div class="about-photo-img-wrap">
                        <img src="about-code.jpg" alt="High-Performance Systems & Full-Stack Architecture" loading="lazy">
                    </div>
                    <div class="about-photo-caption">
                        <span class="about-photo-idx">Pillar 02 · Full-Stack Depth</span>
                        <h3 class="about-photo-title">Resilient Architecture</h3>
                        <p class="about-photo-desc">End-to-end type safety, high-concurrency Node.js &amp; Python backends, and sub-second Web Vitals.</p>
                    </div>
                </div>

                <div class="about-photo-item reveal-plate" style="transition-delay: 200ms;">
                    <div class="about-photo-img-wrap">
                        <img src="about-ai.jpg" alt="Autonomous AI Neural Agents & LLM Pipelines" loading="lazy">
                    </div>
                    <div class="about-photo-caption">
                        <span class="about-photo-idx">Pillar 03 · Machine Intelligence</span>
                        <h3 class="about-photo-title">Autonomous AI Agents</h3>
                        <p class="about-photo-desc">Multi-agent orchestrations, LangChain pipelines, and custom tool-using autonomous workflows.</p>
                    </div>
                </div>
            </div>`;

html = html.replace(oldAboutPhotosHtml, newAboutPhotosHtml);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully upgraded index.html with luxurious project & engineering cards!');
