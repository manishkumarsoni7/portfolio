const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the mobile responsive CSS section and replace it with an ultra-refined mobile-native design system
const mobileSectionStart = '/* ═══════════════════════════════════════════════════════════════════\n           MOBILE-FIRST ROBUST RESPONSIVENESS OVERRIDES';
const mobileSectionEnd = '/* Full-Screen Modal Menu Mobile */';

const refinedMobileCSS = `/* ═══════════════════════════════════════════════════════════════════
           MOBILE-FIRST ROBUST RESPONSIVENESS OVERRIDES (CLEAN & COMPACT)
        ═══════════════════════════════════════════════════════════════════ */
        html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
        }

        /* ─── GLOBAL MOBILE COMPACT SECTION PADDING ─── */
        @media (max-width: 768px) {
            .section-pad {
                padding: 3.75rem 1.25rem !important;
            }
            .eyebrow {
                font-size: 0.7rem !important;
                letter-spacing: 0.16em !important;
                margin-bottom: 0.5rem !important;
            }
            .eyebrow::before {
                width: 1.2rem !important;
            }
        }

        /* ─── 1. HERO SECTION MOBILE ─── */
        @media (max-width: 768px) {
            #hero {
                padding: 5.5rem 1.25rem 2.5rem !important;
                min-height: auto !important;
            }
            .hero-grid {
                gap: 2rem !important;
            }
            .hero-display-name-wrap {
                margin-top: 0.75rem !important;
                margin-bottom: 0.25rem !important;
            }
            .hero-display-name-wrap .cascade-text {
                font-size: clamp(1.6rem, 7vw, 2.15rem) !important;
                line-height: 1.15 !important;
                letter-spacing: -0.01em !important;
            }
            .hero-name-hint {
                font-size: 0.65rem !important;
                margin-top: 0.2rem !important;
            }
            .hero-h1 {
                font-size: clamp(1.65rem, 6.5vw, 2.2rem) !important;
                line-height: 1.12 !important;
                margin-top: 0.75rem !important;
            }
            .hero-lead {
                font-size: 0.92rem !important;
                line-height: 1.55 !important;
                margin-top: 1rem !important;
                color: rgba(255, 255, 255, 0.7) !important;
            }
            .hero-portrait-card {
                max-width: 220px !important;
                margin: 0.5rem auto 0 !important;
                border-radius: 10px !important;
            }
            .hero-cta-row {
                flex-direction: column !important;
                align-items: stretch !important;
                gap: 0.65rem !important;
                margin-top: 1.5rem !important;
            }
            .hero-cta-row .btn-craft {
                text-align: center !important;
                justify-content: center !important;
                padding: 0.8rem 1.25rem !important;
                font-size: 0.8rem !important;
            }
            .hero-facts-dl {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 0.75rem !important;
                margin-top: 2rem !important;
                padding-top: 1.25rem !important;
            }
            .hero-facts-dl dt {
                font-size: 0.62rem !important;
                letter-spacing: 0.12em !important;
            }
            .hero-facts-dl dd {
                font-size: 0.78rem !important;
                margin-top: 0.2rem !important;
                line-height: 1.3 !important;
            }
        }

        /* ─── 2. STATEMENT SECTION MOBILE ─── */
        @media (max-width: 768px) {
            #statement {
                padding: 3rem 1.25rem !important;
            }
            .statement-p {
                font-size: clamp(1.15rem, 4.8vw, 1.45rem) !important;
                line-height: 1.45 !important;
                margin-top: 1rem !important;
            }
            .statement-sig {
                font-size: 0.95rem !important;
                margin-top: 1.25rem !important;
            }
        }

        /* ─── 3. WORKS SECTION MOBILE ─── */
        @media (max-width: 768px) {
            #works {
                padding: 3.5rem 1.25rem !important;
            }
            .stack-header-row {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 0.75rem !important;
                margin-bottom: 1.75rem !important;
                padding-bottom: 1rem !important;
            }
            .stack-title-h2 {
                font-size: clamp(1.6rem, 6.5vw, 2.15rem) !important;
                line-height: 1.15 !important;
            }
            .stack-interactive-grid {
                grid-template-columns: 1fr !important;
                gap: 1.75rem !important;
            }
            .stack-menu-list {
                gap: 0.85rem !important;
            }
            .stack-menu-item {
                padding: 0.35rem 0 !important;
            }
            .stack-item-row {
                gap: 0.85rem !important;
            }
            .stack-item-num {
                font-size: 1rem !important;
                width: 1.5rem !important;
            }
            .stack-item-title {
                font-size: clamp(1.2rem, 5vw, 1.55rem) !important;
                letter-spacing: -0.01em !important;
            }
            .stack-item-arrow {
                font-size: 1.15rem !important;
            }
            .stack-active-card {
                padding: 1rem !important;
                margin-top: 1.25rem !important;
                border-radius: 10px !important;
                background: rgba(13, 16, 23, 0.85) !important;
            }
            .stack-card-meta {
                margin-bottom: 0.5rem !important;
            }
            .stack-card-desc {
                font-size: 0.85rem !important;
                line-height: 1.5 !important;
                margin-bottom: 0.75rem !important;
            }
            .stack-card-bottom {
                padding-top: 0.75rem !important;
                gap: 0.65rem !important;
            }
            .stack-tag-pill {
                font-size: 0.65rem !important;
                padding: 0.15rem 0.5rem !important;
            }
            .stack-cta-btn {
                font-size: 0.78rem !important;
                padding: 0.4rem 0.85rem !important;
                width: 100% !important;
                justify-content: center !important;
                text-align: center !important;
            }
            .stack-svg-canvas {
                max-width: 260px !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 auto !important;
            }
            .stack-visual-badge {
                bottom: 0.5rem !important;
                right: 0.5rem !important;
                padding: 0.3rem 0.65rem !important;
                font-size: 0.68rem !important;
            }
        }

        /* ─── 4. TECHNICAL CORE / SKILLS SECTION MOBILE (SUPER CLEAN & CRISP) ─── */
        @media (max-width: 768px) {
            #skills {
                padding: 3.5rem 1.25rem !important;
            }
            .works-heading-h2 {
                font-size: clamp(1.6rem, 6.5vw, 2.15rem) !important;
                line-height: 1.15 !important;
                margin-top: 0.75rem !important;
            }
            .skills-acc-list {
                margin-top: 1.75rem !important;
            }
            .skill-acc-row {
                padding-block: 1.15rem !important;
            }
            .skill-acc-header {
                gap: 1rem !important;
            }
            .skill-acc-header-left {
                gap: 0.85rem !important;
            }
            .skill-acc-num {
                font-size: 0.95rem !important;
                width: 1.35rem !important;
            }
            .skill-acc-title {
                font-size: clamp(1.05rem, 4.2vw, 1.35rem) !important;
                line-height: 1.25 !important;
                font-weight: 500 !important;
            }
            .skill-acc-plus {
                font-size: 1.25rem !important;
            }
            .skill-acc-panel {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
            }
            .skill-acc-row.is-open .skill-acc-panel {
                margin-top: 1rem !important;
                padding-top: 1rem !important;
            }
            .skill-acc-desc {
                font-size: 0.85rem !important;
                line-height: 1.5 !important;
                color: rgba(255, 255, 255, 0.72) !important;
            }
            /* Clean compact chips cloud on mobile instead of huge vertical cards */
            .skill-acc-chips-grid {
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 0.4rem !important;
            }
            .skill-acc-chip {
                font-size: 0.72rem !important;
                padding: 0.32rem 0.65rem !important;
                border-radius: 999px !important;
                background: rgba(0, 242, 254, 0.05) !important;
                border: 1px solid rgba(0, 242, 254, 0.2) !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 0.35rem !important;
            }
            .skill-acc-dot {
                width: 4px !important;
                height: 4px !important;
            }
        }

        /* ─── 5. ABOUT SECTION MOBILE (CLEAN COMPACT TILES) ─── */
        @media (max-width: 768px) {
            #about {
                padding: 3.5rem 1.25rem !important;
            }
            .about-top-grid {
                gap: 1.5rem !important;
            }
            .about-h2 {
                font-size: clamp(1.6rem, 6.5vw, 2.15rem) !important;
                line-height: 1.15 !important;
                margin-top: 0.75rem !important;
            }
            .about-right {
                gap: 0.85rem !important;
            }
            .about-p {
                font-size: 0.88rem !important;
                line-height: 1.55 !important;
                color: rgba(255, 255, 255, 0.72) !important;
            }
            .about-photos-grid {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
                margin-top: 2rem !important;
            }
            /* Sleek horizontal mini cards for pillars on mobile */
            .about-photo-item {
                display: grid !important;
                grid-template-columns: 85px 1fr !important;
                align-items: center !important;
                padding: 0.65rem !important;
                gap: 0.85rem !important;
                border-radius: 10px !important;
            }
            .about-photo-img-wrap {
                aspect-ratio: 1 / 1 !important;
                border-radius: 6px !important;
                height: 75px !important;
                width: 85px !important;
            }
            .about-photo-caption {
                padding: 0 !important;
                border-top: none !important;
                gap: 0.2rem !important;
            }
            .about-photo-idx {
                font-size: 0.65rem !important;
            }
            .about-photo-title {
                font-size: 0.95rem !important;
            }
            .about-photo-desc {
                font-size: 0.78rem !important;
                line-height: 1.4 !important;
                color: rgba(255, 255, 255, 0.6) !important;
            }
            .about-facts-ledger {
                grid-template-columns: 1fr 1fr !important;
                gap: 1.25rem 0.85rem !important;
                margin-top: 2rem !important;
                padding-top: 1.25rem !important;
            }
            .about-facts-ledger dt {
                font-size: 0.65rem !important;
            }
            .about-facts-ledger dd {
                font-size: 0.85rem !important;
                margin-top: 0.25rem !important;
            }
        }

        /* ─── 6. PROCESS SECTION MOBILE ─── */
        @media (max-width: 768px) {
            #process {
                padding: 3.5rem 1.25rem !important;
            }
            .process-grid {
                gap: 2rem !important;
            }
            .process-step-li {
                padding-block: 1.25rem !important;
                gap: 1rem !important;
            }
            .process-num {
                font-size: 1.75rem !important;
                width: 2.2rem !important;
            }
            .process-h3 {
                font-size: 1.05rem !important;
                margin-bottom: 0.25rem !important;
            }
            .process-p {
                font-size: 0.84rem !important;
                line-height: 1.48 !important;
                color: rgba(255, 255, 255, 0.68) !important;
            }
        }

        /* ─── 7. CONTACT & FAQ MOBILE ─── */
        @media (max-width: 768px) {
            #contact {
                padding: 3.5rem 1.25rem !important;
                min-height: auto !important;
            }
            .pinned-h2 {
                font-size: clamp(1.6rem, 6.5vw, 2.15rem) !important;
                line-height: 1.15 !important;
            }
            .pinned-body {
                font-size: 0.88rem !important;
                line-height: 1.55 !important;
                margin-top: 0.75rem !important;
            }
            #faq {
                padding: 3.5rem 1.25rem !important;
            }
            .faq-grid {
                gap: 1.75rem !important;
            }
            .faq-row {
                padding-block: 1rem !important;
            }
            .faq-q-text {
                font-size: 0.95rem !important;
            }
            .faq-a-text {
                font-size: 0.84rem !important;
                line-height: 1.5 !important;
                padding-bottom: 1rem !important;
            }
            #site-footer {
                padding: 3.5rem 1.25rem 2rem !important;
            }
            .footer-grid {
                gap: 2rem !important;
            }
            .footer-tagline {
                font-size: 0.88rem !important;
            }
            .footer-mail-link {
                font-size: 0.95rem !important;
            }
            .footer-col-title {
                font-size: 0.75rem !important;
            }
            .footer-links-list a {
                font-size: 0.85rem !important;
            }
            .giant-word {
                font-size: 16vw !important;
            }
            .footer-legal-bar {
                flex-direction: column !important;
                align-items: flex-start !important;
                gap: 0.5rem !important;
                font-size: 0.75rem !important;
            }
        }

        `;

const startIdx = html.indexOf(mobileSectionStart);
const endIdx = html.indexOf(mobileSectionEnd);

if (startIdx !== -1 && endIdx !== -1) {
    html = html.substring(0, startIdx) + refinedMobileCSS + html.substring(endIdx);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully updated mobile responsive CSS!');
} else {
    console.error('Could not locate mobile CSS section boundaries');
}
