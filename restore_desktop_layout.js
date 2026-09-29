const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix Adaptive Viewport Grid Architecture in CSS
const oldGrid = `        /* Adaptive Rem-based Viewport Grid */
        html { 
            font-size: 16px; 
            scroll-behavior: auto;
        }
        @media (max-width: 1920px) { html { font-size: 0.833333vw; } }
        @media (max-width: 1440px) { html { font-size: 1.111111vw; } }
        @media (max-width: 1024px) { html { font-size: 1.5625vw;  } }
        @media (max-width: 640px)  { html { font-size: 4.444444vw; } }`;

const newGrid = `        /* Adaptive Rem-based Viewport Grid Architecture */
        html { 
            font-size: 16px; 
            scroll-behavior: auto;
        }
        @media (min-width: 1921px) { html { font-size: 16px; } }
        @media (max-width: 1920px) { html { font-size: clamp(15px, 0.95vw, 16px); } }
        @media (max-width: 1440px) { html { font-size: clamp(14.5px, 1.1vw, 16px); } }
        @media (max-width: 1024px) { html { font-size: clamp(14px, 1.4vw, 16px); } }
        @media (max-width: 768px)  { html { font-size: 15px; } }
        @media (max-width: 480px)  { html { font-size: 14px; } }`;

if (html.includes(oldGrid)) {
    html = html.replace(oldGrid, newGrid);
    console.log('Replaced Adaptive Grid CSS');
} else {
    console.log('Old grid not found verbatim');
}

// 2. Fix container-custom in base CSS
const oldContainer = `.container-custom {
            max-width: 120rem;
            margin-inline: auto;
            width: 100%;
        }`;

const newContainer = `.container-custom {
            max-width: 120rem;
            margin-inline: auto;
            width: 100%;
            padding-inline: 1.5rem;
            box-sizing: border-box;
        }
        @media (min-width: 640px) {
            .container-custom { padding-inline: 2.5rem; }
        }
        @media (min-width: 1024px) {
            .container-custom { padding-inline: 4rem; }
        }
        @media (min-width: 1440px) {
            .container-custom { padding-inline: 5.5rem; }
        }`;

if (html.includes(oldContainer)) {
    html = html.replace(oldContainer, newContainer);
    console.log('Updated base container-custom');
}

// 3. Fix hero-h1 in CSS
const oldHeroH1 = `.hero-h1 {
            max-width: 14ch;
            font-size: 3.75rem;
            line-height: 1.04;
            margin-top: 1.5rem;
            font-family: "Playfair Display", serif;
            font-weight: 400;
        }
        @media (min-width: 640px) { .hero-h1 { font-size: 4.5rem; } }
        @media (min-width: 1024px) { .hero-h1 { font-size: 5.75rem; } }`;

const newHeroH1 = `.hero-h1 {
            max-width: 15ch;
            font-size: clamp(2.5rem, 5vw, 5.25rem);
            line-height: 1.06;
            margin-top: 1.25rem;
            font-family: "Playfair Display", serif;
            font-weight: 400;
        }
        @media (min-width: 640px) { .hero-h1 { font-size: clamp(3rem, 5vw, 4.5rem); } }
        @media (min-width: 1024px) { .hero-h1 { font-size: clamp(3.75rem, 4.5vw, 5.5rem); } }`;

if (html.includes(oldHeroH1)) {
    html = html.replace(oldHeroH1, newHeroH1);
    console.log('Updated hero-h1 CSS');
}

// 4. Fix stack-interactor-container width
const oldStackContainer = `.stack-interactor-container {
            width: 100%;
            max-width: 82rem;
            margin-inline: auto;
            position: relative;
            z-index: 2;
        }`;

const newStackContainer = `.stack-interactor-container {
            width: 100%;
            max-width: 105rem;
            margin-inline: auto;
            position: relative;
            z-index: 2;
        }`;

if (html.includes(oldStackContainer)) {
    html = html.replace(oldStackContainer, newStackContainer);
    console.log('Updated stack-interactor-container CSS');
}

// 5. Remove global max-width 82rem from mobile overrides
const oldMobileContainer = `        html, body {
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
        }`;

const newMobileContainer = `        html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
        }`;

if (html.includes(oldMobileContainer)) {
    html = html.replace(oldMobileContainer, newMobileContainer);
    console.log('Removed global 82rem restriction from mobile overrides');
}

// 6. Fix inline style on hero-h1 in markup
const oldHeroH1Markup = `<h1 class="hero-h1" style="margin-top: 1rem; font-size: 2.75rem;">`;
const newHeroH1Markup = `<h1 class="hero-h1">`;

if (html.includes(oldHeroH1Markup)) {
    html = html.replace(oldHeroH1Markup, newHeroH1Markup);
    console.log('Removed inline small font-size from hero-h1 markup');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully applied all desktop/laptop layout restorations!');
