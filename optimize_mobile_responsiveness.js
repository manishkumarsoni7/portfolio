const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Root HTML Font Size Scaling for Mobile
const oldRootScaling = `        html { font-size: 16px; }
        @media (max-width: 1920px) { html { font-size: 0.833333vw; } }
        @media (max-width: 1440px) { html { font-size: 1.111111vw; } }
        @media (max-width: 1024px) { html { font-size: 1.5625vw;  } }
        @media (max-width: 640px)  { html { font-size: 4.444444vw; } }`;

const newRootScaling = `        html { font-size: 16px; }
        @media (min-width: 1025px) and (max-width: 1920px) { html { font-size: 0.833333vw; } }
        @media (min-width: 769px) and (max-width: 1024px) { html { font-size: 1.35vw; } }
        @media (max-width: 768px) { html { font-size: 15px; } }
        @media (max-width: 390px) { html { font-size: 14px; } }`;

html = html.replace(oldRootScaling, newRootScaling);

// 2. Comprehensive Mobile Styling Enhancements
const mobileEnhancementsCss = `
        /* ═══════════════════════════════════════════════════════════════════
           MOBILE-FIRST ROBUST RESPONSIVENESS OVERRIDES
        ═══════════════════════════════════════════════════════════════════ */
        html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
        }

        .container-custom, .stack-interactor-container {
            width: 100% !important;
            max-width: 82rem !important;
            padding-inline: 1.25rem !important;
            box-sizing: border-box !important;
        }
        @media (min-width: 640px) {
            .container-custom, .stack-interactor-container { padding-inline: 2rem !important; }
        }
        @media (min-width: 1024px) {
            .container-custom, .stack-interactor-container { padding-inline: 3rem !important; }
        }

        /* Hero Responsive Typography */
        @media (max-width: 768px) {
            #hero {
                padding: 6.5rem 1.25rem 3.5rem !important;
                min-height: auto !important;
            }
            .hero-grid {
                gap: 2.5rem !important;
            }
            .hero-display-name-wrap .cascade-text {
                font-size: clamp(1.75rem, 7.5vw, 2.35rem) !important;
                line-height: 1.15 !important;
                letter-spacing: -0.01em !important;
            }
            .hero-h1 {
                font-size: clamp(1.85rem, 8vw, 2.5rem) !important;
                line-height: 1.12 !important;
                margin-top: 0.75rem !important;
            }
            .hero-lead {
                font-size: 1rem !important;
                line-height: 1.6 !important;
                margin-top: 1.25rem !important;
            }
            .hero-portrait-card {
                max-width: 280px !important;
                margin: 1rem auto 0 !important;
            }
            .hero-cta-row {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 0.75rem !important;
            }
            .hero-cta-row .btn-craft {
                text-align: center !important;
                justify-content: center !important;
                padding: 0.85rem 1.5rem !important;
            }
        }

        /* Statement Responsive Typography */
        @media (max-width: 768px) {
            #statement {
                padding: 4.5rem 1.25rem !important;
            }
            .statement-p {
                font-size: clamp(1.35rem, 5.5vw, 1.85rem) !important;
                line-height: 1.4 !important;
                margin-top: 1.5rem !important;
            }
            .statement-sig {
                font-size: 1.1rem !important;
                margin-top: 2rem !important;
            }
        }

        /* Works Section Mobile Optimizations */
        @media (max-width: 768px) {
            #works {
                padding: 4.5rem 1.25rem !important;
            }
            .stack-header-row {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 1rem !important;
                margin-bottom: 2.5rem !important;
            }
            .stack-title-h2 {
                font-size: clamp(1.85rem, 7vw, 2.5rem) !important;
            }
            .stack-interactive-grid {
                grid-template-columns: 1fr !important;
                gap: 2.5rem !important;
            }
            .stack-item-title {
                font-size: clamp(1.35rem, 5.5vw, 1.85rem) !important;
            }
            .stack-item-num {
                font-size: 1.15rem !important;
                width: 1.75rem !important;
            }
            .stack-menu-list {
                gap: 1.25rem !important;
            }
            .stack-active-card {
                padding: 1.25rem !important;
                margin-top: 1.5rem !important;
            }
            .stack-svg-canvas {
                max-width: 100% !important;
                width: 100% !important;
                height: auto !important;
            }
            .stack-visual-badge {
                bottom: 0.75rem !important;
                right: 0.75rem !important;
                padding: 0.35rem 0.75rem !important;
                font-size: 0.7rem !important;
            }
        }

        /* Skills Monolith Accordion Mobile */
        @media (max-width: 768px) {
            #skills {
                padding: 4.5rem 1.25rem !important;
            }
            .works-heading-h2 {
                font-size: clamp(1.85rem, 7vw, 2.5rem) !important;
            }
            .skills-acc-list {
                margin-top: 2.5rem !important;
            }
            .skill-acc-row {
                padding-block: 1.5rem !important;
            }
            .skill-acc-header-left {
                gap: 1rem !important;
            }
            .skill-acc-num {
                font-size: 1rem !important;
                width: 1.5rem !important;
            }
            .skill-acc-title {
                font-size: clamp(1.2rem, 4.5vw, 1.6rem) !important;
                line-height: 1.2 !important;
            }
            .skill-acc-plus {
                font-size: 1.35rem !important;
            }
            .skill-acc-panel {
                grid-template-columns: 1fr !important;
                gap: 1.5rem !important;
                margin-top: 1.25rem !important;
                padding-top: 1.25rem !important;
            }
            .skill-acc-desc {
                font-size: 0.95rem !important;
                line-height: 1.6 !important;
            }
            .skill-acc-chips-grid {
                grid-template-columns: 1fr !important;
                gap: 0.5rem !important;
            }
        }

        /* About Section Mobile */
        @media (max-width: 768px) {
            #about {
                padding: 4.5rem 1.25rem !important;
            }
            .about-h2 {
                font-size: clamp(1.85rem, 7vw, 2.5rem) !important;
                margin-top: 1rem !important;
            }
            .about-p {
                font-size: 0.98rem !important;
                line-height: 1.6 !important;
            }
            .about-photos-grid {
                grid-template-columns: 1fr !important;
                gap: 1.5rem !important;
                margin-top: 2.5rem !important;
            }
            .about-facts-ledger {
                grid-template-columns: 1fr 1fr !important;
                gap: 1.5rem 1rem !important;
                margin-top: 2.5rem !important;
                padding-top: 1.75rem !important;
            }
        }

        /* Process Section Mobile */
        @media (max-width: 768px) {
            #process {
                padding: 4.5rem 1.25rem !important;
            }
            .process-step-li {
                padding-block: 2rem !important;
                gap: 1.25rem !important;
            }
            .process-num {
                font-size: 3rem !important;
            }
            .process-h3 {
                font-size: 1.35rem !important;
            }
            .process-p {
                font-size: 0.95rem !important;
                line-height: 1.55 !important;
            }
        }

        /* Contact & FAQ Mobile */
        @media (max-width: 768px) {
            #contact {
                padding: 5rem 1.25rem !important;
                min-height: auto !important;
            }
            .pinned-h2 {
                font-size: clamp(1.85rem, 7vw, 2.5rem) !important;
            }
            .pinned-body {
                font-size: 1rem !important;
                line-height: 1.6 !important;
            }
            #faq {
                padding: 4.5rem 1.25rem !important;
            }
            .faq-q-text {
                font-size: 1.1rem !important;
            }
            .faq-a-text {
                font-size: 0.95rem !important;
                padding-bottom: 1.5rem !important;
            }
            #site-footer {
                padding: 4.5rem 1.25rem 2.5rem !important;
            }
            .footer-grid {
                gap: 2.5rem !important;
            }
            .giant-word {
                font-size: 17vw !important;
            }
            .footer-legal-bar {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 0.75rem !important;
            }
        }

        /* Full-Screen Modal Menu Mobile */
        @media (max-width: 768px) {
            .modal-content-wrap {
                padding: 1.25rem !important;
            }
            .modal-nav-label {
                font-size: clamp(2.25rem, 9vw, 3.25rem) !important;
            }
            .modal-nav-item {
                gap: 1rem !important;
            }
            .modal-bottom-block {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 1rem !important;
            }
        }
`;

html = html.replace('</style>', mobileEnhancementsCss + '\n    </style>');

// 3. Update Touch Interactions in JavaScript for mobile taps on Connoisseur Stack
html = html.replace(
    `onmouseenter="handleStackHover(0)"`,
    `onmouseenter="handleStackHover(0)" ontouchstart="handleStackHover(0)"`
);
html = html.replace(
    `onmouseenter="handleStackHover(1)"`,
    `onmouseenter="handleStackHover(1)" ontouchstart="handleStackHover(1)"`
);
html = html.replace(
    `onmouseenter="handleStackHover(2)"`,
    `onmouseenter="handleStackHover(2)" ontouchstart="handleStackHover(2)"`
);
html = html.replace(
    `onmouseenter="handleStackHover(3)"`,
    `onmouseenter="handleStackHover(3)" ontouchstart="handleStackHover(3)"`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully optimized mobile responsiveness across the entire website!');
