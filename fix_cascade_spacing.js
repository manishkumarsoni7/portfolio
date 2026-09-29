const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Cascade CSS for clear word spacing (gap: 0.45em)
const oldCascadeCssRegex = /\.cascade-text \.cascade-inner[\s\S]*?\.cascade-text \.cascade-word[^\}]+\}/;

const newCascadeCss = `.cascade-text .cascade-inner {
            display: inline-flex;
            flex-wrap: wrap;
            align-items: baseline;
            gap: 0.5em; /* Clear, wide spacing between MANISH, KUMAR, and SONI */
            position: relative;
        }

        .cascade-text .cascade-word {
            display: inline-flex;
            overflow: hidden;
            height: 1.15em;
            vertical-align: top;
            margin-right: 0.15em;
        }`;

html = html.replace(oldCascadeCssRegex, newCascadeCss);

// 2. Update initCascadeText to ensure proper word separation
const oldInitCascade = `        // Cascade Rolling Text Engine Initializer
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
        }`;

const newInitCascade = `        // Cascade Rolling Text Engine Initializer with Distinct Word Spacing
        function initCascadeText() {
            const elements = document.querySelectorAll('[data-cascade]');
            elements.forEach(el => {
                const text = el.getAttribute('data-cascade') || el.textContent.trim();
                const stagger = parseInt(el.getAttribute('data-stagger') || '22', 10);
                const words = text.split(/\\s+/);
                
                let globalCharIdx = 0;
                const wordsHtml = words.map(word => {
                    const charsHtml = word.split('').map(char => {
                        const delay = globalCharIdx * stagger;
                        globalCharIdx++;
                        return \`<span class="cascade-char" style="transition-delay: \${delay}ms;">\${char}</span>\`;
                    }).join('');
                    return \`<span class="cascade-word">\${charsHtml}</span>\`;
                }).join('<span class="cascade-space" style="width: 0.4em; display: inline-block;">&nbsp;</span>');
                
                el.innerHTML = \`<span class="cascade-inner" aria-label="\${text}">\${wordsHtml}</span>\`;
            });
        }`;

html = html.replace(oldInitCascade, newInitCascade);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully added clear space between MANISH, KUMAR, and SONI!');
