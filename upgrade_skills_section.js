const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Monolith Editorial Accordion CSS for #skills
const skillsAccordionCss = `
        /* ═══════════════════════════════════════════════════════════════════
           SKILLS MONOLITH EDITORIAL ACCORDION (UPGRADED)
        ═══════════════════════════════════════════════════════════════════ */
        #skills {
            background: var(--bg-surface);
            border-top: 1px dashed var(--line);
        }

        .skills-acc-list {
            margin-top: 4rem;
            border-top: 1px dashed var(--line);
        }

        .skill-acc-row {
            border-bottom: 1px dashed var(--line);
            padding-block: 2.25rem;
            cursor: pointer;
            transition: background 0.35s ease, padding 0.4s var(--ease-spring);
        }
        .skill-acc-row:hover {
            background: rgba(255, 255, 255, 0.015);
            padding-left: 1rem;
        }

        .skill-acc-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
        }

        .skill-acc-header-left {
            display: flex;
            align-items: baseline;
            gap: 2rem;
        }

        .skill-acc-num {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--accent-cyan);
            width: 2.5rem;
            flex-shrink: 0;
            transition: transform 0.4s var(--ease-spring);
        }
        .skill-acc-row.is-open .skill-acc-num,
        .skill-acc-row:hover .skill-acc-num {
            transform: scale(1.15);
        }

        .skill-acc-title {
            font-family: "Playfair Display", serif;
            font-size: 1.875rem;
            font-weight: 600;
            color: var(--text-primary);
            transition: color 0.3s ease, font-style 0.3s ease;
        }
        @media (min-width: 640px) { .skill-acc-title { font-size: 2.35rem; } }
        @media (min-width: 1024px) { .skill-acc-title { font-size: 2.75rem; } }

        .skill-acc-row.is-open .skill-acc-title,
        .skill-acc-row:hover .skill-acc-title {
            color: var(--accent-cyan);
            font-style: italic;
        }

        .skill-acc-plus {
            font-size: 1.75rem;
            color: var(--accent-cyan);
            display: inline-block;
            transition: transform 0.45s var(--ease-spring), color 0.3s ease;
            font-weight: 300;
            flex-shrink: 0;
        }
        .skill-acc-row.is-open .skill-acc-plus {
            transform: rotate(45deg);
            color: #ffffff;
        }

        .skill-acc-panel {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 0.55s var(--ease-spring), opacity 0.4s ease, margin-top 0.4s ease;
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .skill-acc-panel {
                grid-template-columns: 1.3fr 1fr;
                gap: 3.5rem;
            }
        }
        .skill-acc-row.is-open .skill-acc-panel {
            opacity: 1;
            margin-top: 2rem;
            padding-top: 1.75rem;
            border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }

        .skill-acc-desc {
            font-size: 1.05rem;
            line-height: 1.68;
            color: var(--text-muted);
            max-width: 54ch;
        }

        .skill-acc-chips-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.65rem;
        }
        @media (min-width: 640px) {
            .skill-acc-chips-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .skill-acc-chip {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.8rem;
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            padding: 0.5rem 0.85rem;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.25s ease;
        }
        .skill-acc-chip:hover {
            border-color: rgba(0, 242, 254, 0.4);
            background: rgba(0, 242, 254, 0.08);
            color: #ffffff;
        }
        .skill-acc-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--accent-cyan);
            box-shadow: 0 0 6px var(--accent-cyan);
            flex-shrink: 0;
        }
`;

// Insert CSS
html = html.replace('</style>', skillsAccordionCss + '\n    </style>');

// 2. Replace the old #skills HTML with the new Monolith Editorial Accordion
const oldSkillsSectionRegex = /<section id="skills"[\s\S]*?<\/section>/;

const newSkillsSectionHtml = `    <!-- ═══════════════════════════════════════════════════════════════════
         TECHNICAL CORE / SKILLS SECTION (MONOLITH EDITORIAL ACCORDION)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="skills" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Technical Core</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">The tools that</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">power</span> the craft.</span></span>
            </h2>

            <div class="skills-acc-list">
                <!-- 01 · Frontend Craft & Spatial Motion -->
                <div class="skill-acc-row is-open reveal-fade-up" style="transition-delay: 0ms;" onclick="toggleSkillAcc(this)">
                    <div class="skill-acc-header">
                        <div class="skill-acc-header-left">
                            <span class="skill-acc-num">01</span>
                            <h3 class="skill-acc-title">Frontend Craft &amp; Spatial Motion</h3>
                        </div>
                        <span class="skill-acc-plus">+</span>
                    </div>
                    <div class="skill-acc-panel">
                        <p class="skill-acc-desc">
                            Engineering flagship client ateliers and web platforms utilizing Next.js 15 App Router, React 19, strict TypeScript, and Tailwind CSS. Synchronized with adaptive viewport rem architecture, GSAP spring physics, and Lenis inertia scrolling.
                        </p>
                        <div class="skill-acc-chips-grid">
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Next.js 15 (App Router)</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> React 19 Core</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> TypeScript (Strict)</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Tailwind CSS</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> GSAP 3 Motion &amp; SVG</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Lenis Smooth Scroll</span>
                        </div>
                    </div>
                </div>

                <!-- 02 · Autonomous AI & Multi-Agent Swarms -->
                <div class="skill-acc-row reveal-fade-up" style="transition-delay: 90ms;" onclick="toggleSkillAcc(this)">
                    <div class="skill-acc-header">
                        <div class="skill-acc-header-left">
                            <span class="skill-acc-num">02</span>
                            <h3 class="skill-acc-title">Autonomous AI &amp; Agent Swarms</h3>
                        </div>
                        <span class="skill-acc-plus">+</span>
                    </div>
                    <div class="skill-acc-panel">
                        <p class="skill-acc-desc">
                            Architecting resilient multi-agent execution graphs with LangChain and Python. Engineered for autonomous web research, real-time multi-source verification, automated code synthesis, and Gemini/OpenAI tool-calling pipelines.
                        </p>
                        <div class="skill-acc-chips-grid">
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> LangChain Multi-Agents</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Python 3.12 Architecture</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Google Gemini Pro SDK</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> OpenAI API &amp; Embeddings</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Vector RAG &amp; Pinecone</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Tool-Calling Workflows</span>
                        </div>
                    </div>
                </div>

                <!-- 03 · Backend Architecture & Cloud -->
                <div class="skill-acc-row reveal-fade-up" style="transition-delay: 180ms;" onclick="toggleSkillAcc(this)">
                    <div class="skill-acc-header">
                        <div class="skill-acc-header-left">
                            <span class="skill-acc-num">03</span>
                            <h3 class="skill-acc-title">Backend Architecture &amp; Cloud</h3>
                        </div>
                        <span class="skill-acc-plus">+</span>
                    </div>
                    <div class="skill-acc-panel">
                        <p class="skill-acc-desc">
                            Designing scalable microservices, relational PostgreSQL architectures, real-time Supabase subscriptions, REST &amp; GraphQL endpoints, and zero-downtime containerized Docker edge deployments.
                        </p>
                        <div class="skill-acc-chips-grid">
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Node.js / Express</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> PostgreSQL Relational</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Supabase Realtime</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> REST &amp; GraphQL APIs</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Docker &amp; Serverless Edge</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Redis In-Memory Cache</span>
                        </div>
                    </div>
                </div>

                <!-- 04 · UX Precision & Web Vitals -->
                <div class="skill-acc-row reveal-fade-up" style="transition-delay: 270ms;" onclick="toggleSkillAcc(this)">
                    <div class="skill-acc-header">
                        <div class="skill-acc-header-left">
                            <span class="skill-acc-num">04</span>
                            <h3 class="skill-acc-title">UX Precision &amp; Web Vitals</h3>
                        </div>
                        <span class="skill-acc-plus">+</span>
                    </div>
                    <div class="skill-acc-panel">
                        <p class="skill-acc-desc">
                            Mathematical viewport rem scaling architectures scaling fluidly across 4K screens down to mobile devices. Sub-second First Contentful Paint, zero cumulative layout shifts, semantic SEO structure, and WCAG accessibility.
                        </p>
                        <div class="skill-acc-chips-grid">
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> 100/100 Lighthouse Vitals</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Adaptive Viewport Rem Grids</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Figma Design Atelier</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> Semantic SEO &amp; Rich Schema</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> &lt; 0.8s First Contentful Paint</span>
                            <span class="skill-acc-chip"><span class="skill-acc-dot"></span> WCAG 2.1 Accessibility</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

html = html.replace(oldSkillsSectionRegex, newSkillsSectionHtml);

// 3. Add toggleSkillAcc function to scripts in index.html
const toggleSkillAccJs = `
        // Skills Monolith Accordion Toggle
        window.toggleSkillAcc = function(row) {
            const isOpen = row.classList.contains('is-open');
            const panel = row.querySelector('.skill-acc-panel');
            
            document.querySelectorAll('.skill-acc-row').forEach(r => {
                r.classList.remove('is-open');
                const p = r.querySelector('.skill-acc-panel');
                if (p) p.style.maxHeight = '0px';
            });
            
            if (!isOpen) {
                row.classList.add('is-open');
                if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        };

        // Initialize first skill panel open height
        window.addEventListener('DOMContentLoaded', () => {
            const openRow = document.querySelector('.skill-acc-row.is-open');
            if (openRow) {
                const p = openRow.querySelector('.skill-acc-panel');
                if (p) setTimeout(() => { p.style.maxHeight = p.scrollHeight + 'px'; }, 200);
            }
        });
`;

html = html.replace('// FAQ Accordion Controller', toggleSkillAccJs + '\n        // FAQ Accordion Controller');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully upgraded #skills to Monolith Editorial Accordion in 100% matching site theme!');
