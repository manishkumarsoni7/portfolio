const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update Title in preview
html = html.replace(
    '<title>Manish Kumar Soni — Lead Web Designer &amp; AI Builder | Portfolio</title>',
    '<title>Balanced Alternating Editorial Rhythm — Manish Kumar Soni</title>'
);

// Topbar notice
const contrastNotice = `
    <!-- Topbar Banner for Full Alternating Rhythm Preview -->
    <div style="position:fixed; top:0; left:0; width:100%; background:rgba(0, 242, 254, 0.95); color:#040508; font-family:'Space Grotesk', sans-serif; font-size:0.8rem; font-weight:700; padding:0.4rem 1rem; text-align:center; z-index:9999; display:flex; justify-content:center; align-items:center; gap:1.5rem; box-shadow:0 4px 15px rgba(0,0,0,0.3);">
        <span>✦ FULL HARMONIC RHYTHM: Alternating 1-by-1 (Hero: Dark ➔ Statement: Light ➔ Works: Dark ➔ Skills: Light ➔ About: Dark ➔ Process: Light ➔ Contact: Dark)</span>
        <a href="/" style="color:#040508; text-decoration:underline; font-weight:800;">← All-Dark Version</a>
    </div>
`;

html = html.replace('<body id="top">', '<body id="top">\n' + contrastNotice);

// Full Harmonic Alternating Light CSS for: #statement, #skills, and #process
const harmonicRhythmCss = `
        /* ═══════════════════════════════════════════════════════════════════
           HARMONIC ALTERNATING EDITORIAL RHYTHM (50/50 BALANCED FLOW)
        ═══════════════════════════════════════════════════════════════════ */
        
        /* 1. LIGHT SECTION: #statement */
        #statement {
            background: #f8f8f6 !important;
            color: #111318 !important;
            border-top: 1px dashed rgba(17, 19, 24, 0.2) !important;
            border-bottom: 1px dashed rgba(17, 19, 24, 0.2) !important;
        }
        #statement .eyebrow { color: #0891b2 !important; }
        #statement .eyebrow::before { background: #0891b2 !important; }
        #statement .statement-p, #statement .statement-p .reveal-word { color: #111318 !important; }
        #statement .statement-sig { color: #0891b2 !important; }
        #statement .statement-sig .name-highlight {
            color: #111318 !important;
            background: linear-gradient(135deg, #111318 30%, #0891b2 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            text-shadow: none !important;
        }

        /* 2. LIGHT SECTION: #skills */
        #skills {
            background: #f8f8f6 !important;
            color: #111318 !important;
            border-top: 1px dashed rgba(17, 19, 24, 0.2) !important;
            border-bottom: 1px dashed rgba(17, 19, 24, 0.2) !important;
        }
        #skills .eyebrow { color: #0891b2 !important; }
        #skills .eyebrow::before { background: #0891b2 !important; }
        #skills .works-heading-h2 { color: #111318 !important; }
        #skills .works-heading-h2 .accent-serif { color: #0891b2 !important; }
        
        #skills .skills-acc-list { border-color: rgba(17, 19, 24, 0.2) !important; }
        #skills .skill-acc-row { border-color: rgba(17, 19, 24, 0.2) !important; }
        #skills .skill-acc-row:hover { background: rgba(0, 0, 0, 0.03) !important; }
        #skills .skill-acc-title { color: #111318 !important; }
        #skills .skill-acc-row.is-open .skill-acc-title,
        #skills .skill-acc-row:hover .skill-acc-title { color: #0891b2 !important; }
        #skills .skill-acc-num { color: #0891b2 !important; }
        #skills .skill-acc-plus { color: #0891b2 !important; }
        #skills .skill-acc-row.is-open .skill-acc-plus { color: #111318 !important; }
        #skills .skill-acc-desc { color: #4a5568 !important; }
        #skills .skill-acc-chip {
            background: #ffffff !important;
            border: 1px solid rgba(17, 19, 24, 0.14) !important;
            color: #111318 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.04) !important;
        }
        #skills .skill-acc-chip:hover {
            border-color: #0891b2 !important;
            background: rgba(8, 145, 178, 0.08) !important;
            color: #0891b2 !important;
        }
        #skills .skill-acc-dot { background: #0891b2 !important; box-shadow: 0 0 6px rgba(8, 145, 178, 0.4) !important; }

        /* 3. LIGHT SECTION: #process */
        #process {
            background: #f8f8f6 !important;
            color: #111318 !important;
            border-top: 1px dashed rgba(17, 19, 24, 0.2) !important;
            border-bottom: 1px dashed rgba(17, 19, 24, 0.2) !important;
        }
        #process .eyebrow { color: #0891b2 !important; }
        #process .eyebrow::before { background: #0891b2 !important; }
        #process .works-heading-h2 { color: #111318 !important; }
        #process .works-heading-h2 .accent-serif { color: #0891b2 !important; }
        #process .process-step-li { border-color: rgba(17, 19, 24, 0.2) !important; }
        #process .process-num { color: rgba(17, 19, 24, 0.25) !important; }
        #process .process-h3 { color: #111318 !important; }
        #process .process-p { color: #4a5568 !important; }

        /* FIXED HEADER INVERSION ON LIGHT SECTIONS */
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
        #site-header .diamond-mark { border-color: #ffffff !important; }
        #site-header .header-nav-dot { background: #ffffff !important; }
`;

html = html.replace('</style>', harmonicRhythmCss + '\n    </style>');

fs.writeFileSync('contrast-preview.html', html, 'utf8');
console.log('Successfully updated contrast-preview.html with full harmonic 50/50 alternating rhythm!');
