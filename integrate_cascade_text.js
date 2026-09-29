const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Cascade Text CSS
const cascadeCss = `
        /* ═══════════════════════════════════════════════════════════════════
           CASCADE ROLLING TEXT ENGINE
        ═══════════════════════════════════════════════════════════════════ */
        .hero-display-name-wrap {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            display: flex;
            align-items: center;
        }

        .cascade-text {
            display: inline-block;
            position: relative;
            text-decoration: none;
            font-family: "Space Grotesk", sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            overflow: hidden;
            cursor: pointer;
            user-select: none;
            font-size: 2.5rem;
            line-height: 1.05;
            color: #ffffff;
            transition: color 0.35s ease, text-shadow 0.35s ease;
            padding: 0.1em 0;
        }
        @media (min-width: 640px) { .cascade-text { font-size: 3.25rem; } }
        @media (min-width: 1024px) { .cascade-text { font-size: 4.25rem; } }

        .cascade-text .cascade-inner {
            display: inline-flex;
            overflow: hidden;
            position: relative;
            height: 1.05em;
            vertical-align: bottom;
        }

        .cascade-text .cascade-char {
            display: inline-block;
            position: relative;
            will-change: transform;
            text-shadow: 0 1.05em currentColor;
            transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
        }

        .cascade-text:hover {
            color: var(--accent-cyan);
            text-shadow: 0 0 30px rgba(0, 242, 254, 0.4);
        }

        .cascade-text:hover .cascade-char {
            transform: translateY(-1.05em);
        }

        .hero-name-hint {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 0.72rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--accent-cyan);
            margin-top: 0.25rem;
            font-family: "Space Grotesk", sans-serif;
            opacity: 0.85;
        }
        .hero-name-hint span {
            display: inline-block;
            animation: bounce-right 1.5s infinite ease-in-out;
        }
        @keyframes bounce-right {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(4px); }
        }
`;

html = html.replace('</style>', cascadeCss + '\n    </style>');

// 2. Insert the Monumental Cascade Name in the Hero Section
const oldHeroMarkup = `            <!-- Left (lg col-span 7) -->
            <div class="hero-left">
                <div class="eyebrow reveal-fade" style="transition-delay: 0ms;">Full-Stack Developer &amp; AI Builder</div>
                
                <h1 class="hero-h1">
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Building digital</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 140ms;"><span class="accent-serif">monuments</span> with</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 280ms;">code &amp; AI.</span></span>
                </h1>`;

const newHeroMarkup = `            <!-- Left (lg col-span 7) -->
            <div class="hero-left">
                <div class="eyebrow reveal-fade" style="transition-delay: 0ms;">Full-Stack Developer &amp; AI Architect</div>
                
                <!-- Monumental Cascade Rolling Name -->
                <div class="hero-display-name-wrap reveal-fade-up" style="transition-delay: 100ms;">
                    <div class="cascade-text" data-cascade="MANISH KUMAR SONI" data-stagger="22" title="Hover to roll">
                        MANISH KUMAR SONI
                    </div>
                </div>
                <div class="hero-name-hint reveal-fade" style="transition-delay: 200ms;">
                    <span>Hover Name</span> <span>⇄</span>
                </div>
                
                <h1 class="hero-h1" style="margin-top: 1rem; font-size: 2.75rem;">
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 250ms;">Building digital</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 350ms;"><span class="accent-serif">monuments</span> with</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 450ms;">code &amp; AI.</span></span>
                </h1>`;

html = html.replace(oldHeroMarkup, newHeroMarkup);

// 3. Add Cascade Text Init function to the JS script
const cascadeJs = `
        // Cascade Rolling Text Engine Initializer
        function initCascadeText() {
            const elements = document.querySelectorAll('[data-cascade]');
            elements.forEach(el => {
                const text = el.getAttribute('data-cascade') || el.textContent.trim();
                const stagger = parseInt(el.getAttribute('data-stagger') || '25', 10);
                
                let chars = [];
                if (typeof Intl !== "undefined" && Intl.Segmenter) {
                    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
                    chars = Array.from(segmenter.segment(text), s => s.segment);
                } else {
                    chars = text.split('');
                }
                
                const innerHtml = chars.map((char, i) => {
                    const delay = i * stagger;
                    const displayChar = char === ' ' ? '&nbsp;' : char;
                    return \`<span class="cascade-char" style="transition-delay: \${delay}ms;">\${displayChar}</span>\`;
                }).join('');
                
                el.innerHTML = \`<span class="cascade-inner" aria-hidden="true">\${innerHtml}</span>\`;
            });
        }
        initCascadeText();
`;

html = html.replace('initWordReveals();', 'initWordReveals();\n        initCascadeText();');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully integrated Cascade Rolling Text on Manish Kumar Soni in Hero section!');
