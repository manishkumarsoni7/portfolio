const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Ensure CSS for .cascade-text is responsive, clean and cannot cause horizontal overflow
const cleanCascadeCss = `
        /* ═══════════════════════════════════════════════════════════════════
           CASCADE ROLLING TEXT ENGINE
        ═══════════════════════════════════════════════════════════════════ */
        .hero-display-name-wrap {
            margin-top: 1.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }

        .cascade-text {
            display: inline-block;
            position: relative;
            text-decoration: none;
            font-family: "Space Grotesk", sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            cursor: pointer;
            user-select: none;
            font-size: 2.25rem;
            line-height: 1.1;
            color: #ffffff;
            transition: color 0.35s ease, text-shadow 0.35s ease;
            max-width: 100%;
        }
        @media (min-width: 640px) { .cascade-text { font-size: 2.85rem; } }
        @media (min-width: 1024px) { .cascade-text { font-size: 3.5rem; } }

        .cascade-text .cascade-inner {
            display: inline-flex;
            flex-wrap: wrap;
            position: relative;
        }

        .cascade-text .cascade-word {
            display: inline-flex;
            overflow: hidden;
            height: 1.12em;
            margin-right: 0.3em;
            vertical-align: top;
        }

        .cascade-text .cascade-char {
            display: inline-block;
            position: relative;
            will-change: transform;
            text-shadow: 0 1.12em currentColor;
            transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
        }

        .cascade-text:hover {
            color: var(--accent-cyan);
            text-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
        }

        .cascade-text:hover .cascade-char {
            transform: translateY(-1.12em);
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

// Replace previous cascade css if present
if (html.includes('CASCADE ROLLING TEXT ENGINE')) {
    html = html.replace(/\/\* ═+\s+CASCADE ROLLING TEXT ENGINE[\s\S]*?@keyframes bounce-right[^\}]+\}\s+\}/, cleanCascadeCss);
} else {
    html = html.replace('</style>', cleanCascadeCss + '\n    </style>');
}

// 2. Fix Script section with complete definitions and robust error-handling
const oldScriptBlockRegex = /<script>\s*\/\/ Modal Menu Controller[\s\S]*?<\/script>/;

const newScriptBlock = `<script>
        // Modal Menu Controller
        const modalMenu = document.getElementById('modal-menu');

        window.openModalMenu = function() {
            if (!modalMenu) return;
            modalMenu.classList.add('is-open');
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.height = '100%';
            document.documentElement.style.position = 'relative';
            if (window.lenis) window.lenis.stop();
        };

        window.closeModalMenu = function() {
            if (!modalMenu) return;
            modalMenu.classList.remove('is-open');
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            document.documentElement.style.position = '';
            if (window.lenis) window.lenis.start();
        };

        // FAQ Accordion Controller
        window.toggleFaq = function(button) {
            const row = button.closest('.faq-row');
            if (!row) return;
            const panel = row.querySelector('.faq-panel');
            if (!panel) return;
            const isOpen = row.classList.contains('is-open');

            if (isOpen) {
                row.classList.remove('is-open');
                button.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = '0px';
            } else {
                row.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        };

        window.addEventListener('resize', () => {
            document.querySelectorAll('.faq-row.is-open .faq-panel').forEach(panel => {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            });
        });

        // Word-by-word text engine splitter with Name Highlighting
        function initWordReveals() {
            const elements = document.querySelectorAll('[data-word-reveal]');
            elements.forEach(el => {
                const text = el.textContent.trim();
                const words = text.split(/\\s+/);
                const stagger = parseInt(el.getAttribute('data-word-stagger') || '20', 10);
                const baseDelay = parseInt(el.getAttribute('data-word-delay') || '0', 10);

                el.innerHTML = words.map((word, idx) => {
                    const delay = baseDelay + idx * stagger;
                    const clean = word.replace(/[^a-zA-Z]/g, '');
                    const isName = (clean === 'Manish' || clean === 'Kumar' || clean === 'Soni');
                    const highlightClass = isName ? ' name-highlight' : '';
                    return \`<span class="reveal-word\${highlightClass}" style="transition-delay: \${delay}ms">\${word}&nbsp;</span>\`;
                }).join('');
            });
        }

        // Cascade Rolling Text Engine Initializer
        function initCascadeText() {
            const elements = document.querySelectorAll('[data-cascade]');
            elements.forEach(el => {
                const text = el.getAttribute('data-cascade') || el.textContent.trim();
                const stagger = parseInt(el.getAttribute('data-stagger') || '22', 10);
                const words = text.split(' ');
                
                let globalCharIdx = 0;
                const wordsHtml = words.map(word => {
                    const charsHtml = word.split('').map(char => {
                        const delay = globalCharIdx * stagger;
                        globalCharIdx++;
                        return \`<span class="cascade-char" style="transition-delay: \${delay}ms;">\${char}</span>\`;
                    }).join('');
                    return \`<span class="cascade-word">\${charsHtml}</span>\`;
                }).join('');
                
                el.innerHTML = \`<span class="cascade-inner" aria-label="\${text}">\${wordsHtml}</span>\`;
            });
        }

        // Initialize Splitters
        try {
            initWordReveals();
        } catch (e) {
            console.error('Error in initWordReveals:', e);
        }

        try {
            initCascadeText();
        } catch (e) {
            console.error('Error in initCascadeText:', e);
        }

        // IntersectionObserver for scroll-triggered spring reveals
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '0px 0px -8% 0px'
        });

        document.querySelectorAll('[data-reveal-section], .work-article, .reveal-fade-up, .reveal-plate, .reveal-fade').forEach(el => {
            revealObserver.observe(el);
        });

        // Trigger immediate reveals for elements in view
        setTimeout(() => {
            document.querySelectorAll('#hero [data-reveal-section], #hero .reveal-fade, #hero .reveal-line-inner, #hero .reveal-fade-up, #hero .reveal-plate, #hero .reveal-word').forEach(el => {
                el.classList.add('is-revealed');
            });
            const heroSection = document.getElementById('hero');
            if (heroSection) heroSection.classList.add('is-revealed');
            const heroGrid = document.querySelector('.hero-grid');
            if (heroGrid) heroGrid.classList.add('is-revealed');
        }, 100);

        // Smooth scroll anchor link handler
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    if (window.lenis) window.lenis.scrollTo(0);
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (window.lenis) window.lenis.scrollTo(target, { offset: -30 });
                    else target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>`;

html = html.replace(oldScriptBlockRegex, newScriptBlock);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully fixed all script definitions, reveal triggers, and cascade word wrapping!');
