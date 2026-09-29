const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update Title in preview
html = html.replace(
    '<title>Manish Kumar Soni — Lead Web Designer &amp; AI Builder | Portfolio</title>',
    '<title>High-Contrast Section Rhythm Preview — Manish Kumar Soni</title>'
);

// Add topbar notice explaining this is the high-contrast preview
const contrastNotice = `
    <!-- Topbar Banner for Contrast Preview -->
    <div style="position:fixed; top:0; left:0; width:100%; background:rgba(0, 242, 254, 0.95); color:#040508; font-family:'Space Grotesk', sans-serif; font-size:0.8rem; font-weight:700; padding:0.4rem 1rem; text-align:center; z-index:9999; display:flex; justify-content:center; align-items:center; gap:1rem; box-shadow:0 4px 15px rgba(0,0,0,0.3);">
        <span>✦ LIVE PREVIEW: Alternating High-Contrast Section Rhythm (Obsidian ➔ Warm Paper ➔ Obsidian)</span>
        <a href="/" style="color:#040508; text-decoration:underline; font-weight:800;">← Return to Dark Version</a>
    </div>
`;

html = html.replace('<body id="top">', '<body id="top">\n' + contrastNotice);

// Add light section CSS rules for #statement and #about
const lightSectionCss = `
        /* ═══════════════════════════════════════════════════════════════════
           HIGH-CONTRAST INVERTED SECTION RHYTHM
        ═══════════════════════════════════════════════════════════════════ */
        #statement {
            background: #f8f8f6 !important;
            color: #111318 !important;
            border-top: 1px dashed rgba(17, 19, 24, 0.2) !important;
            border-bottom: 1px dashed rgba(17, 19, 24, 0.2) !important;
            position: relative;
            z-index: 2;
        }

        #statement .eyebrow {
            color: #0891b2 !important;
        }
        #statement .eyebrow::before {
            background: #0891b2 !important;
        }

        #statement .statement-p {
            color: #111318 !important;
        }
        #statement .statement-p .reveal-word {
            color: #111318 !important;
        }

        #statement .statement-sig {
            color: #0891b2 !important;
        }
        #statement .statement-sig .name-highlight {
            color: #111318 !important;
            background: linear-gradient(135deg, #111318 30%, #0891b2 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            text-shadow: none !important;
        }

        /* Ensure fixed header blend mode inverts text smoothly over light paper */
        #site-header {
            mix-blend-mode: difference !important;
            z-index: 1000 !important;
        }
        #site-header .header-logo,
        #site-header .header-left-top,
        #site-header .header-left-sub,
        #site-header .header-nav-link,
        #site-header .menu-btn-label,
        #site-header .hamburger-lines span {
            color: #ffffff !important;
        }
        #site-header .diamond-mark {
            border-color: #ffffff !important;
        }
        #site-header .header-nav-dot {
            background: #ffffff !important;
        }
`;

html = html.replace('</style>', lightSectionCss + '\n    </style>');

fs.writeFileSync('contrast-preview.html', html, 'utf8');
console.log('Successfully generated contrast-preview.html with Alternating Section Rhythm!');
