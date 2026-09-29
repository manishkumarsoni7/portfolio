const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add .name-highlight CSS styling
const highlightCss = `
        /* Name Luxury Highlight */
        .name-highlight {
            font-weight: 700;
            color: #ffffff !important;
            display: inline-block;
            background: linear-gradient(135deg, #ffffff 25%, #00f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 25px rgba(0, 242, 254, 0.4);
            letter-spacing: -0.01em;
            position: relative;
        }
        .reveal-word.name-highlight {
            color: #ffffff;
        }
`;

html = html.replace('</style>', highlightCss + '\n    </style>');

// 2. Remove (issac78neo) from About paragraph
html = html.replace(
    'I am Manish Kumar Soni (issac78neo) — a creative technologist',
    'I am Manish Kumar Soni — a creative technologist'
);

// 3. Update statement signature
html = html.replace(
    '<span class="statement-sig reveal-fade-up" style="transition-delay: 400ms;">— Manish Soni</span>',
    '<span class="statement-sig reveal-fade-up" style="transition-delay: 400ms;">— <span class="name-highlight">Manish Kumar Soni</span></span>'
);

// 4. Update initWordReveals in JS to automatically apply name-highlight to Manish, Kumar, Soni
const oldWordRevealJs = `        // Word-by-word text engine splitter
        function initWordReveals() {
            const elements = document.querySelectorAll('[data-word-reveal]');
            elements.forEach(el => {
                const text = el.textContent.trim();
                const words = text.split(/\\s+/);
                const stagger = parseInt(el.getAttribute('data-word-stagger') || '20', 10);
                const baseDelay = parseInt(el.getAttribute('data-word-delay') || '0', 10);

                el.innerHTML = words.map((word, idx) => {
                    const delay = baseDelay + idx * stagger;
                    return \`<span class="reveal-word" style="transition-delay: \${delay}ms">\${word}&nbsp;</span>\`;
                }).join('');
            });
        }`;

const newWordRevealJs = `        // Word-by-word text engine splitter with Name Highlighting
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
        }`;

html = html.replace(oldWordRevealJs, newWordRevealJs);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated name highlighting and removed (issac78neo) alias from text!');
