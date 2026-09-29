const fs = require('fs');

const bespokePortfolioHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manish Kumar Soni — Lead Web Designer &amp; AI Builder | Portfolio</title>
    
    <!-- High-Craft Fonts -->
    <link rel="preconnect" href="https://api.fontshare.com">
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&family=general-sans@400,500,600,700&display=swap">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Lenis Smooth Scroll via ESM CDN -->
    <script type="module">
        import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.19/+esm";

        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        window.lenis = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Parallax Scroll-Scrub
        const parallaxCards = document.querySelectorAll('[data-parallax-card]');
        lenis.on('scroll', () => {
            if (window.innerWidth < 1024) return;
            const vh = window.innerHeight;
            parallaxCards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const progress = (vh - rect.top) / (vh + rect.height);
                if (progress >= -0.2 && progress <= 1.2) {
                    const clamped = Math.max(0, Math.min(1, progress));
                    const translateY = 2.0 - clamped * 4.0; // from +2rem to -2rem
                    card.style.transform = \`translateY(\${translateY.toFixed(3)}rem)\`;
                }
            });
        });
    </script>

    <style>
        /* ═══════════════════════════════════════════════════════════════════
           LUXURY OBSIDIAN & CRAFT DESIGN TOKENS
        ═══════════════════════════════════════════════════════════════════ */
        :root {
            --bg-obsidian: #050608;
            --bg-surface: #0a0b10;
            --bg-card: rgba(14, 16, 24, 0.7);
            --bg-card-hover: rgba(20, 24, 36, 0.85);
            --border-subtle: rgba(255, 255, 255, 0.08);
            --border-glow: rgba(0, 242, 254, 0.35);
            --accent-cyan: #00f2fe;
            --accent-blue: #3b82f6;
            --accent-purple: #a855f7;
            --text-primary: #ffffff;
            --text-muted: rgba(255, 255, 255, 0.65);
            --text-faint: rgba(255, 255, 255, 0.35);
            --line: rgba(255, 255, 255, 0.12);
            --line-strong: rgba(255, 255, 255, 0.25);
            --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Adaptive Rem-based Viewport Grid */
        html { 
            font-size: 16px; 
            scroll-behavior: auto;
        }
        @media (max-width: 1920px) { html { font-size: 0.833333vw; } }
        @media (max-width: 1440px) { html { font-size: 1.111111vw; } }
        @media (max-width: 1024px) { html { font-size: 1.5625vw;  } }
        @media (max-width: 640px)  { html { font-size: 4.444444vw; } }

        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--bg-obsidian);
            color: var(--text-primary);
            font-family: "Satoshi", sans-serif;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
            position: relative;
        }

        /* Ambient Background Mesh */
        .ambient-glow-1 {
            position: absolute;
            top: -10vw;
            left: 20vw;
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, rgba(0, 242, 254, 0.12) 0%, rgba(59, 130, 246, 0.04) 50%, transparent 70%);
            filter: blur(80px);
            pointer-events: none;
            z-index: 0;
        }
        .ambient-glow-2 {
            position: absolute;
            top: 120vh;
            right: 10vw;
            width: 45vw;
            height: 45vw;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(0, 242, 254, 0.03) 50%, transparent 70%);
            filter: blur(90px);
            pointer-events: none;
            z-index: 0;
        }

        a { color: inherit; text-decoration: none; }
        button { background: none; border: none; color: inherit; font: inherit; cursor: pointer; }
        img { display: block; max-width: 100%; height: auto; }

        h1, h2, h3 {
            font-family: "Playfair Display", serif;
            font-weight: 400;
            letter-spacing: -0.01em;
            line-height: 1.12;
        }

        .accent-serif {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-weight: 400;
        }

        ::selection {
            background: rgba(0, 242, 254, 0.3);
            color: #ffffff;
        }

        .container-custom {
            max-width: 120rem;
            margin-inline: auto;
            width: 100%;
        }

        .section-pad {
            padding: 6rem 1.5rem;
            position: relative;
            z-index: 1;
        }
        @media (min-width: 1024px) {
            .section-pad { padding: 8rem 3rem; }
        }

        .rule-dashed {
            border-top: 1px dashed var(--line);
        }

        /* Eyebrow badge */
        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--accent-cyan);
            font-weight: 600;
            font-family: "Space Grotesk", sans-serif;
        }
        .eyebrow::before {
            content: "";
            display: block;
            width: 1.8rem;
            height: 1.5px;
            background: var(--accent-cyan);
            box-shadow: 0 0 8px var(--accent-cyan);
        }

        /* Modern Tactile CTA Buttons */
        .btn-craft {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-weight: 600;
            font-family: "Space Grotesk", sans-serif;
            border-radius: 6px;
            transition: all 0.3s var(--ease-spring);
            position: relative;
            overflow: hidden;
        }
        .btn-craft-primary {
            background: #ffffff;
            color: #050608;
            box-shadow: 0 0 25px rgba(255, 255, 255, 0.2);
        }
        .btn-craft-primary:hover {
            background: var(--accent-cyan);
            box-shadow: 0 0 30px rgba(0, 242, 254, 0.4);
            transform: translateY(-2px);
        }
        .btn-craft-secondary {
            background: rgba(255, 255, 255, 0.04);
            border: 1px dashed var(--line-strong);
            color: #ffffff;
            backdrop-filter: blur(10px);
        }
        .btn-craft-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--accent-cyan);
            transform: translateY(-2px);
        }
        .btn-craft .btn-arrow {
            display: inline-block;
            transition: transform 0.4s var(--ease-spring);
        }
        .btn-craft:hover .btn-arrow {
            transform: translateX(0.4rem);
        }

        /* ═══════════════════════════════════════════════════════════════════
           HEADER (FIXED, MIX-BLEND-DIFFERENCE & GLASS)
        ═══════════════════════════════════════════════════════════════════ */
        #site-header {
            position: fixed;
            inset-inline: 0;
            top: 0;
            z-index: 100;
            color: #ffffff;
            mix-blend-mode: difference;
            pointer-events: auto;
        }
        .header-inner {
            padding: 1.25rem 1.5rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
        @media (min-width: 1024px) {
            .header-inner {
                padding: 1.25rem 3rem;
                grid-template-columns: 1fr auto 1fr;
            }
        }
        .header-left { display: none; }
        @media (min-width: 1024px) {
            .header-left {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }
        }
        .header-left-top { font-size: 0.875rem; font-weight: 500; }
        .header-left-sub { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.16em; opacity: 0.7; }

        .header-logo {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            justify-self: start;
        }
        @media (min-width: 1024px) {
            .header-logo { justify-self: center; }
        }
        .diamond-mark {
            width: 0.625rem;
            height: 0.625rem;
            border: 1.5px solid currentColor;
            transform: rotate(45deg);
        }
        .logo-wordmark {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.2rem;
            letter-spacing: 0.02em;
        }

        .header-right {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 2rem;
        }
        .header-nav { display: none; align-items: center; gap: 2rem; }
        @media (min-width: 1024px) {
            .header-nav { display: flex; }
        }
        .header-nav-link {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }
        .header-nav-dot {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #ffffff;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .header-nav-link:hover .header-nav-dot { opacity: 1; }

        .btn-menu-trigger {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            cursor: pointer;
        }
        .menu-btn-label {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            display: none;
        }
        @media (min-width: 640px) { .menu-btn-label { display: inline-block; } }
        .hamburger-lines { display: flex; flex-direction: column; gap: 0.375rem; }
        .hamburger-lines span { display: block; width: 1.5rem; height: 1px; background: #ffffff; }

        /* ═══════════════════════════════════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */
        #hero {
            position: relative;
            min-height: 100svh;
            padding: 8rem 1.5rem 4rem;
            display: flex;
            align-items: center;
            z-index: 1;
        }
        @media (min-width: 1024px) { #hero { padding: 10rem 3rem 4rem; } }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3.5rem;
            align-items: center;
            width: 100%;
        }
        @media (min-width: 1024px) {
            .hero-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 3rem;
            }
        }

        .hero-left {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) { .hero-left { grid-column: span 7; } }

        .hero-h1 {
            max-width: 14ch;
            font-size: 3.75rem;
            line-height: 1.04;
            margin-top: 1.5rem;
            font-family: "Playfair Display", serif;
            font-weight: 400;
        }
        @media (min-width: 640px) { .hero-h1 { font-size: 4.5rem; } }
        @media (min-width: 1024px) { .hero-h1 { font-size: 5.75rem; } }

        .hero-lead {
            max-width: 48ch;
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--text-muted);
            margin-top: 2.5rem;
        }

        .hero-cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin-top: 2.5rem;
        }

        .hero-facts-dl {
            display: none;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 3.5rem;
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
        }
        @media (min-width: 1024px) { .hero-facts-dl { display: grid; } }
        .hero-facts-dl dt {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--text-faint);
            font-family: "Space Grotesk", sans-serif;
        }
        .hero-facts-dl dd {
            font-size: 0.95rem;
            color: var(--text-primary);
            margin-top: 0.35rem;
            font-weight: 500;
        }

        .hero-right {
            width: 100%;
        }
        @media (min-width: 1024px) { .hero-right { grid-column: 8 / span 5; } }

        .hero-portrait-card {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.1);
            background: #0d0f17;
        }
        .hero-portrait-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            aspect-ratio: 3 / 4;
            filter: grayscale(80%) contrast(1.1);
            transition: filter 0.6s ease, transform 0.6s var(--ease-spring);
        }
        .hero-portrait-card:hover img {
            filter: grayscale(0%) contrast(1.05);
            transform: scale(1.04);
        }

        /* ═══════════════════════════════════════════════════════════════════
           STATEMENT SECTION
        ═══════════════════════════════════════════════════════════════════ */
        #statement {
            background: var(--bg-surface);
            padding: 7rem 1.5rem;
            border-top: 1px dashed var(--line);
        }
        @media (min-width: 1024px) { #statement { padding: 10rem 3rem; } }
        .statement-inner { max-width: 80rem; margin-inline: auto; }
        .statement-p {
            font-family: "Playfair Display", serif;
            font-size: 1.875rem;
            line-height: 1.35;
            color: var(--text-primary);
            margin-top: 3rem;
        }
        @media (min-width: 640px) { .statement-p { font-size: 2.25rem; } }
        @media (min-width: 1024px) { .statement-p { font-size: 3rem; line-height: 1.25; } }
        .statement-sig {
            display: block;
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.25rem;
            color: var(--accent-cyan);
            margin-top: 3rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FEATURED WORKS SECTION (ASYMMETRIC 12-COL ZIG-ZAG)
        ═══════════════════════════════════════════════════════════════════ */
        #works {
            background: var(--bg-obsidian);
        }
        .works-heading-h2 {
            font-size: 2.25rem;
            max-width: 18ch;
            margin-top: 1.5rem;
        }
        @media (min-width: 640px) { .works-heading-h2 { font-size: 3rem; } }
        @media (min-width: 1024px) { .works-heading-h2 { font-size: 4.5rem; } }

        .works-gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            margin-top: 4rem;
        }
        @media (min-width: 1024px) {
            .works-gallery-grid {
                grid-template-columns: repeat(12, 1fr);
                column-gap: 2.5rem;
                row-gap: 0;
                margin-top: 6rem;
            }
        }

        .work-article {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .work-article { grid-column: span 7; }
            .work-article:nth-child(even) { grid-column-start: 6; margin-top: 6rem; }
            .work-article:nth-child(odd) { grid-column-start: 1; }
        }

        .work-card-media {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: #11141c;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            transition: border-color 0.4s ease;
        }
        .work-card-media:hover {
            border-color: var(--accent-cyan);
        }
        .work-card-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s var(--ease-spring);
        }
        .work-card-media:hover img {
            transform: scale(1.05);
        }

        .work-caption {
            border-top: 1px dashed var(--line);
            margin-top: 1.5rem;
            padding-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 1.5rem;
        }
        .work-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            font-family: "Space Grotesk", sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .work-medium {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        }
        .work-year {
            font-family: "Playfair Display", serif;
            font-size: 1.1rem;
            color: var(--accent-cyan);
        }

        /* ═══════════════════════════════════════════════════════════════════
           TECHNICAL CORE (SKILLS BENTO CARDS)
        ═══════════════════════════════════════════════════════════════════ */
        #skills {
            background: var(--bg-surface);
        }
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .skills-grid {
                grid-template-columns: repeat(2, 1fr);
                column-gap: 3rem;
                row-gap: 3rem;
            }
        }
        @media (min-width: 1024px) {
            .skills-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .skill-card {
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s var(--ease-spring);
        }
        .skill-card:hover {
            transform: translateY(-4px);
        }
        .skill-num {
            font-family: "Playfair Display", serif;
            font-size: 1.5rem;
            color: var(--accent-cyan);
        }
        .skill-h3 {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            line-height: 1.2;
            color: var(--text-primary);
            margin-top: 1.5rem;
        }
        .skill-p {
            font-size: 1rem;
            line-height: 1.625;
            color: var(--text-muted);
            margin-top: 0.75rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           ABOUT SECTION
        ═══════════════════════════════════════════════════════════════════ */
        #about {
            background: var(--bg-obsidian);
        }
        .about-top-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 1024px) {
            .about-top-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 3rem;
            }
        }
        .about-left { display: flex; flex-direction: column; }
        @media (min-width: 1024px) { .about-left { grid-column: span 7; } }
        .about-h2 {
            font-size: 2.25rem;
            line-height: 1.1;
            color: var(--text-primary);
            max-width: 20ch;
            margin-top: 2rem;
        }
        @media (min-width: 640px) { .about-h2 { font-size: 3rem; } }
        @media (min-width: 1024px) { .about-h2 { font-size: 3.75rem; } }

        .about-right { display: flex; flex-direction: column; gap: 1.5rem; }
        @media (min-width: 1024px) { .about-right { grid-column: span 5; } }
        .about-p {
            font-size: 1.05rem;
            line-height: 1.65;
            color: var(--text-muted);
            max-width: 52ch;
        }

        .about-photos-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .about-photos-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .about-photo-item {
            overflow: hidden;
            border-radius: 8px;
            border: 1px solid var(--border-subtle);
        }
        .about-photo-item img {
            width: 100%;
            aspect-ratio: 3 / 2;
            object-fit: cover;
            filter: grayscale(90%);
            transition: all 0.7s var(--ease-spring);
        }
        .about-photo-item:hover img {
            filter: grayscale(0%);
            transform: scale(1.06);
        }

        .about-facts-ledger {
            border-top: 1px dashed var(--line);
            margin-top: 4rem;
            padding-top: 2.5rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
        }
        @media (min-width: 640px) {
            .about-facts-ledger { grid-template-columns: repeat(4, 1fr); }
        }
        .about-facts-ledger dt {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--text-faint);
            font-family: "Space Grotesk", sans-serif;
        }
        .about-facts-ledger dd {
            font-size: 1rem;
            color: var(--text-primary);
            margin-top: 0.5rem;
            font-weight: 500;
        }

        /* ═══════════════════════════════════════════════════════════════════
           PROCESS SECTION (STICKY HEADING)
        ═══════════════════════════════════════════════════════════════════ */
        #process {
            background: var(--bg-surface);
        }
        .process-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 1024px) {
            .process-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
            }
        }
        .process-sticky-left { width: 100%; }
        @media (min-width: 1024px) {
            .process-sticky-left {
                grid-column: span 5;
                position: sticky;
                top: 8rem;
                align-self: start;
            }
        }
        .process-right { list-style: none; }
        @media (min-width: 1024px) { .process-right { grid-column: span 7; } }

        .process-step-li {
            border-top: 1px dashed var(--line);
            padding-block: 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        @media (min-width: 640px) {
            .process-step-li {
                padding-block: 3rem;
                flex-direction: row;
                gap: 3rem;
            }
        }
        .process-num {
            font-family: "Playfair Display", serif;
            font-size: 4.5rem;
            line-height: 1;
            color: var(--text-faint);
            flex-shrink: 0;
        }
        @media (min-width: 640px) { .process-num { font-size: 6rem; } }
        .process-info { flex: 1; }
        @media (min-width: 640px) { .process-info { padding-top: 0.75rem; } }
        .process-h3 {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        @media (min-width: 1024px) { .process-h3 { font-size: 1.875rem; } }
        .process-p {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--text-muted);
            max-width: 48ch;
            margin-top: 1rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           PINNED CTA (CONTACT & SCOPING)
        ═══════════════════════════════════════════════════════════════════ */
        #contact {
            background: #020305;
            min-height: 100svh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-align: center;
            border-top: 1px dashed var(--line);
        }
        .pinned-centered-box {
            max-width: 42rem;
            margin-inline: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .pinned-h2 {
            font-size: 2.25rem;
            color: #ffffff;
            margin-top: 1.5rem;
        }
        @media (min-width: 640px) { .pinned-h2 { font-size: 3rem; } }
        @media (min-width: 1024px) { .pinned-h2 { font-size: 3.75rem; } }
        .pinned-body {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--text-muted);
            margin-top: 2rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FAQ ACCORDION
        ═══════════════════════════════════════════════════════════════════ */
        #faq {
            background: var(--bg-obsidian);
        }
        .faq-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 1024px) {
            .faq-grid { grid-template-columns: repeat(12, 1fr); gap: 2rem; }
        }
        .faq-left { width: 100%; }
        @media (min-width: 1024px) { .faq-left { grid-column: span 4; } }
        .faq-right { width: 100%; }
        @media (min-width: 1024px) { .faq-right { grid-column: span 8; } }

        .faq-row { border-top: 1px dashed var(--line); }
        .faq-btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2rem;
            padding-block: 2rem;
            text-align: left;
        }
        .faq-q-text {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
        }
        @media (min-width: 1024px) { .faq-q-text { font-size: 1.5rem; } }
        .faq-plus-icon {
            font-size: 1.5rem;
            color: var(--accent-cyan);
            display: inline-block;
            transition: transform 0.45s var(--ease-spring);
        }
        .faq-row.is-open .faq-plus-icon { transform: rotate(45deg); color: #ffffff; }
        .faq-panel {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.55s var(--ease-spring), opacity 0.55s ease;
        }
        .faq-row.is-open .faq-panel { opacity: 1; }
        .faq-a-text {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--text-muted);
            max-width: 60ch;
            padding-bottom: 2.5rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════════════════════════════════ */
        #site-footer {
            background: #020305;
            color: #ffffff;
            padding: 6rem 1.5rem 3rem;
            border-top: 1px dashed var(--line);
        }
        @media (min-width: 1024px) { #site-footer { padding: 6rem 3rem 3rem; } }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
        }
        @media (min-width: 1024px) {
            .footer-grid { grid-template-columns: repeat(12, 1fr); gap: 3rem; }
        }
        .footer-brand-col { display: flex; flex-direction: column; }
        @media (min-width: 1024px) { .footer-brand-col { grid-column: span 5; } }
        .footer-tagline {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.5rem;
            color: var(--text-muted);
            max-width: 28ch;
            margin-top: 1.5rem;
        }
        .footer-mail-link {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--accent-cyan);
            margin-top: 2rem;
            font-weight: 600;
            font-family: "Space Grotesk", sans-serif;
        }

        .footer-col-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--text-faint);
            font-family: "Space Grotesk", sans-serif;
        }
        .footer-links-list {
            list-style: none;
            margin-top: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        .footer-links-list a {
            font-size: 1rem;
            color: var(--text-muted);
            transition: color 0.2s;
        }
        .footer-links-list a:hover { color: #ffffff; }

        @media (min-width: 1024px) {
            .footer-col-explore { grid-column: span 2; }
            .footer-col-studio { grid-column: span 2; }
            .footer-col-follow { grid-column: span 3; }
        }

        .footer-giant-wordmark {
            overflow: hidden;
            margin-top: 6rem;
            text-align: center;
        }
        .giant-word {
            font-family: "Satoshi", sans-serif;
            font-size: 18vw;
            font-weight: 900;
            text-transform: uppercase;
            line-height: 0.8;
            letter-spacing: -0.04em;
            color: rgba(255, 255, 255, 0.06);
            user-select: none;
        }

        .footer-legal-bar {
            margin-top: 3rem;
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        @media (min-width: 640px) {
            .footer-legal-bar {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
        }
        .footer-copyright { font-size: 0.875rem; color: var(--text-faint); }

        /* ═══════════════════════════════════════════════════════════════════
           MODAL MENU OVERLAY
        ═══════════════════════════════════════════════════════════════════ */
        #modal-menu {
            position: fixed;
            inset: 0;
            z-index: 200;
            color: #ffffff;
            display: none;
            pointer-events: none;
        }
        #modal-menu.is-open { display: block; pointer-events: auto; }

        .modal-backdrop-panel {
            position: absolute;
            inset: 0;
            background: #06070a;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.6s var(--ease-spring);
        }
        #modal-menu.is-open .modal-backdrop-panel { transform: scaleY(1); }

        .modal-content-wrap {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 1.5rem 1.5rem 2.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        @media (min-width: 1024px) { .modal-content-wrap { padding: 1.5rem 3rem 2.5rem; } }
        #modal-menu.is-open .modal-content-wrap { opacity: 1; transition-delay: 0.15s; }

        .modal-topbar { display: flex; justify-content: space-between; align-items: center; }
        .modal-menu-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.28em; color: var(--text-faint); }
        .btn-modal-close { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.18em; color: #ffffff; }

        .modal-nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
        }
        .modal-nav-item {
            display: inline-flex;
            align-items: baseline;
            gap: 1.25rem;
            opacity: 0;
            transform: translateY(1.5rem);
            transition: opacity 0.5s var(--ease-spring), transform 0.5s var(--ease-spring);
        }
        #modal-menu.is-open .modal-nav-item { opacity: 1; transform: translateY(0); }
        .modal-nav-idx { width: 2rem; font-size: 0.875rem; color: var(--accent-cyan); font-family: "Space Grotesk", sans-serif; }
        .modal-nav-label {
            font-family: "Playfair Display", serif;
            font-size: 3rem;
            color: #ffffff;
            transition: font-style 0.2s ease;
        }
        @media (min-width: 640px) { .modal-nav-label { font-size: 3.75rem; } }
        @media (min-width: 1024px) { .modal-nav-label { font-size: 4.5rem; } }
        .modal-nav-item:hover .modal-nav-label { font-style: italic; }

        .modal-bottom-block {
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            opacity: 0;
            transition: opacity 0.5s ease 0.4s;
        }
        @media (min-width: 640px) {
            .modal-bottom-block {
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
            }
        }
        #modal-menu.is-open .modal-bottom-block { opacity: 1; }

        /* ═══════════════════════════════════════════════════════════════════
           REVEAL MOTION ENGINE
        ═══════════════════════════════════════════════════════════════════ */
        .reveal-line-wrap { display: inline-block; overflow: hidden; vertical-align: top; }
        .reveal-line-inner {
            display: inline-block;
            transform: translateY(110%);
            opacity: 0;
            transition: transform 1000ms var(--ease-spring), opacity 1000ms var(--ease-spring);
        }
        .is-revealed .reveal-line-inner { transform: translateY(0); opacity: 1; }

        .reveal-word {
            display: inline-block;
            transform: translateY(0.8rem);
            opacity: 0;
            transition: transform 720ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 720ms cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .is-revealed .reveal-word { transform: translateY(0); opacity: 1; }

        .reveal-fade-up {
            opacity: 0;
            transform: translateY(2.5rem);
            transition: opacity 720ms var(--ease-spring), transform 720ms var(--ease-spring);
        }
        .is-revealed.reveal-fade-up, .is-revealed .reveal-fade-up { opacity: 1; transform: translateY(0); }

        .reveal-fade {
            opacity: 0;
            transition: opacity 640ms var(--ease-spring);
        }
        .is-revealed.reveal-fade, .is-revealed .reveal-fade { opacity: 1; }

        .reveal-plate {
            opacity: 0;
            transform: translateY(3.5rem) scale(1.04);
            transition: opacity 700ms var(--ease-spring), transform 700ms var(--ease-spring);
        }
        .is-revealed.reveal-plate, .is-revealed .reveal-plate { opacity: 1; transform: translateY(0) scale(1); }
    </style>
</head>
<body id="top">

    <!-- Ambient Lighting Glows -->
    <div class="ambient-glow-1"></div>
    <div class="ambient-glow-2"></div>

    <!-- ═══════════════════════════════════════════════════════════════════
         HEADER (FIXED, MIX-BLEND-DIFFERENCE)
    ═══════════════════════════════════════════════════════════════════ -->
    <header id="site-header">
        <div class="header-inner container-custom">
            <!-- Left Column -->
            <div class="header-left">
                <p class="header-left-top">Full-Stack &amp; AI Engineer</p>
                <p class="header-left-sub">Design · Engineering · Intelligence</p>
            </div>

            <!-- Center Logo -->
            <a href="#top" class="header-logo" aria-label="Manish Kumar Soni Home">
                <span class="diamond-mark" aria-hidden="true"></span>
                <span class="logo-wordmark">manish soni</span>
            </a>

            <!-- Right Column -->
            <div class="header-right">
                <nav class="header-nav" aria-label="Primary">
                    <a href="#works" class="header-nav-link">
                        <span class="header-nav-dot"></span> Works
                    </a>
                    <a href="#skills" class="header-nav-link">
                        <span class="header-nav-dot"></span> Skills
                    </a>
                    <a href="#about" class="header-nav-link">
                        <span class="header-nav-dot"></span> About
                    </a>
                    <a href="#process" class="header-nav-link">
                        <span class="header-nav-dot"></span> Process
                    </a>
                    <a href="#contact" class="header-nav-link">
                        <span class="header-nav-dot"></span> Contact
                    </a>
                </nav>

                <button class="btn-menu-trigger" onclick="openModalMenu()" aria-label="Open navigation menu">
                    <span class="menu-btn-label">Menu</span>
                    <div class="hamburger-lines" aria-hidden="true">
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>
        </div>
    </header>

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO SECTION (FULL VIEWPORT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="hero" class="container-custom">
        <div class="hero-grid" data-reveal-section>
            <!-- Left (lg col-span 7) -->
            <div class="hero-left">
                <div class="eyebrow reveal-fade" style="transition-delay: 0ms;">Full-Stack Developer &amp; AI Builder</div>
                
                <h1 class="hero-h1">
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Building digital</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 140ms;"><span class="accent-serif">monuments</span> with</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 280ms;">code &amp; AI.</span></span>
                </h1>

                <p class="hero-lead" data-word-reveal data-word-stagger="18" data-word-delay="500">
                    Manish Kumar Soni engineers award-winning web platforms, bespoke luxury interfaces, and autonomous AI systems — bridging thoughtful human aesthetics with next-generation machine intelligence.
                </p>

                <div class="hero-cta-row reveal-fade-up" style="transition-delay: 800ms;">
                    <a href="#works" class="btn-craft btn-craft-primary">
                        Explore Works <span class="btn-arrow">→</span>
                    </a>
                    <a href="#contact" class="btn-craft btn-craft-secondary">
                        Initiate Contract <span class="btn-arrow">→</span>
                    </a>
                </div>

                <dl class="hero-facts-dl reveal-fade" style="transition-delay: 1000ms;">
                    <div>
                        <dt>Based</dt>
                        <dd>India · Remote Worldwide</dd>
                    </div>
                    <div>
                        <dt>Core Tech</dt>
                        <dd>Next.js 15 · Python · AI Agents</dd>
                    </div>
                    <div>
                        <dt>Craft</dt>
                        <dd>High-End Web Architecture</dd>
                    </div>
                </dl>
            </div>

            <!-- Right Hero Portrait Plate (lg col-span 5) -->
            <div class="hero-right">
                <div class="hero-portrait-card reveal-plate" style="transition-delay: 200ms;">
                    <img src="manish.jpg" alt="Manish Kumar Soni — Lead Developer &amp; AI Builder" onerror="this.src='https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p1.webp'" loading="eager">
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         STATEMENT SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="statement">
        <div class="statement-inner" data-reveal-section>
            <div class="eyebrow reveal-fade">The Philosophy</div>

            <p class="statement-p" data-word-reveal data-word-stagger="30" data-word-delay="100">
                I treat code as an architectural medium — every interaction must have intention, every pixel must hold weight, and every system must breathe with precision. The future belongs to software that feels both alive and effortless.
            </p>

            <span class="statement-sig reveal-fade-up" style="transition-delay: 400ms;">— Manish Soni</span>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEATURED WORKS SECTION (12-COL ZIG-ZAG WITH PARALLAX)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="works" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Selected Deployments</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Systems designed to</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">endure</span> and perform.</span></span>
            </h2>

            <div class="works-gallery-grid">
                <!-- 01 · AURA Spatial Atelier · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate" data-parallax-card>
                                <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="AURA Spatial Atelier — Luxury Interior Architecture" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div>
                                <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">AURA Spatial Atelier <span>↗</span></h3>
                                </a>
                                <p class="work-medium">Luxury Interior Architecture &amp; 3D Spatial Showroom</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 02 · Apex Nova Dental · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                            <div class="work-card-media reveal-plate" data-parallax-card>
                                <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l2.webp" alt="Apex Nova Dental — Surgical Care Studio" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div>
                                <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">Apex Nova Dental <span>↗</span></h3>
                                </a>
                                <p class="work-medium">Surgical Care Studio &amp; Smart Booking Engine</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 03 · Chronos Horology · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="work-card-media reveal-plate" data-parallax-card>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p3.webp" alt="Chronos Horology — Haute Horlogerie Timepiece Atelier" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Chronos Horology</h3>
                                <p class="work-medium">Haute Horlogerie Kinetic Timepiece Configurator</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 04 · Autonomous AI Neural Engine · 2026 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="work-card-media reveal-plate" data-parallax-card>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l4.webp" alt="Autonomous AI Neural Engine — LLM Agent Pipelines" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Autonomous AI Neural Engine</h3>
                                <p class="work-medium">Python &amp; LangChain Autonomous Agent Workflows</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         TECHNICAL CORE / SKILLS SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="skills" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Technical Core</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">The tools that</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">power the craft.</span></span>
            </h2>

            <div class="skills-grid">
                <!-- 01 -->
                <article class="skill-card reveal-fade-up" style="transition-delay: 0ms;">
                    <span class="skill-num">01</span>
                    <h3 class="skill-h3">Frontend Craft &amp; Motion</h3>
                    <p class="skill-p">Next.js 15, React 19, TypeScript, Tailwind CSS, Lenis, Framer Motion &amp; Spring Physics.</p>
                </article>

                <!-- 02 -->
                <article class="skill-card reveal-fade-up" style="transition-delay: 90ms;">
                    <span class="skill-num">02</span>
                    <h3 class="skill-h3">Autonomous AI &amp; Agents</h3>
                    <p class="skill-p">LangChain, OpenAI &amp; Gemini SDKs, Autonomous Agent Workflows, Python Automation Pipelines.</p>
                </article>

                <!-- 03 -->
                <article class="skill-card reveal-fade-up" style="transition-delay: 180ms;">
                    <span class="skill-num">03</span>
                    <h3 class="skill-h3">Backend Architecture</h3>
                    <p class="skill-p">Node.js, Express, PostgreSQL, REST &amp; GraphQL APIs, Serverless Cloud Deployment.</p>
                </article>

                <!-- 04 -->
                <article class="skill-card reveal-fade-up" style="transition-delay: 270ms;">
                    <span class="skill-num">04</span>
                    <h3 class="skill-h3">UX &amp; Performance</h3>
                    <p class="skill-p">Adaptive Viewport Scaling, Sub-second Web Vitals, Semantic SEO, World-Class Typography.</p>
                </article>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         ABOUT SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="about" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="about-top-grid">
                <div class="about-left">
                    <div class="eyebrow reveal-fade">About Manish</div>

                    <h2 class="about-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Bridging high-craft</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">design with deep</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 180ms;">engineering.</span></span>
                    </h2>
                </div>

                <div class="about-right">
                    <p class="about-p" data-word-reveal data-word-stagger="10" data-word-delay="100">
                        I am Manish Kumar Soni (issac78neo) — a creative technologist focused on crafting flagship web experiences that merge editorial typography, bespoke micro-interactions, and resilient architecture.
                    </p>
                    <p class="about-p" data-word-reveal data-word-stagger="10" data-word-delay="250">
                        In an era saturated with low-effort AI templates, I build software that stands apart: tailored design systems, kinetic text reveal engines, and autonomous AI agents that solve real business problems.
                    </p>
                    <p class="about-p" data-word-reveal data-word-stagger="10" data-word-delay="400">
                        Whether engineering a luxury brand atelier or deploying an enterprise full-stack platform, I deliver software that feels authoritative, durable, and effortlessly fast.
                    </p>
                </div>
            </div>

            <!-- Photos Grid -->
            <div class="about-photos-grid">
                <div class="about-photo-item reveal-plate" style="transition-delay: 0ms;">
                    <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="Studio Light Study" loading="lazy">
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 100ms;">
                    <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l2.webp" alt="Workspace &amp; Engineering" loading="lazy">
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 200ms;">
                    <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l3.webp" alt="Prototypes in Progress" loading="lazy">
                </div>
            </div>

            <!-- Facts Ledger -->
            <dl class="about-facts-ledger reveal-fade-up" style="transition-delay: 300ms;">
                <div>
                    <dt>Location</dt>
                    <dd>India · Global Remote</dd>
                </div>
                <div>
                    <dt>Specialization</dt>
                    <dd>Full-Stack &amp; AI Systems</dd>
                </div>
                <div>
                    <dt>Primary Stack</dt>
                    <dd>Next.js 15, React, Python</dd>
                </div>
                <div>
                    <dt>Availability</dt>
                    <dd>Open for Contracts</dd>
                </div>
            </dl>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PROCESS SECTION (STICKY HEADING)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="process" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="process-grid">
                <!-- Left Sticky Heading -->
                <div class="process-sticky-left">
                    <div class="eyebrow reveal-fade">The Methodology</div>
                    <h2 class="works-heading-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">From architecture</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">to deployment.</span></span>
                    </h2>
                </div>

                <!-- Right Steps List -->
                <ol class="process-right">
                    <!-- Step 01 -->
                    <li class="process-step-li reveal-fade-up" style="transition-delay: 0ms;">
                        <span class="process-num">01</span>
                        <div class="process-info">
                            <h3 class="process-h3">Architect &amp; Blueprint</h3>
                            <p class="process-p">Deep analysis of product requirements, data models, user flows, and interaction systems before a single line is written.</p>
                        </div>
                    </li>

                    <!-- Step 02 -->
                    <li class="process-step-li reveal-fade-up" style="transition-delay: 90ms;">
                        <span class="process-num">02</span>
                        <div class="process-info">
                            <h3 class="process-h3">Kinetic Craft &amp; Prototyping</h3>
                            <p class="process-p">Crafting adaptive rem grids, luxury typography hierarchies, spring easing curves, and tactile micro-states.</p>
                        </div>
                    </li>

                    <!-- Step 03 -->
                    <li class="process-step-li reveal-fade-up" style="transition-delay: 180ms;">
                        <span class="process-num">03</span>
                        <div class="process-info">
                            <h3 class="process-h3">Full-Stack &amp; AI Integration</h3>
                            <p class="process-p">Building high-performance React/Next.js frontends connected to robust APIs and intelligent autonomous agent workflows.</p>
                        </div>
                    </li>

                    <!-- Step 04 -->
                    <li class="process-step-li reveal-fade-up" style="transition-delay: 270ms;">
                        <span class="process-num">04</span>
                        <div class="process-info">
                            <h3 class="process-h3">Deploy &amp; Scale</h3>
                            <p class="process-p">Sub-second global CDN delivery, automated CI/CD pipelines, perfect Core Web Vitals, and continuous monitoring.</p>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PINNED CTA (CONTACT & SCOPING)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="contact" class="section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="pinned-centered-box">
                <div class="eyebrow reveal-fade">Dispatch</div>

                <h2 class="pinned-h2" style="max-width: 22ch;">
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Let's engineer something</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">extraordinary.</span></span></span>
                </h2>

                <p class="pinned-body" data-word-reveal data-word-stagger="16" data-word-delay="200" style="max-width: 38ch;">
                    Planning a flagship web platform, full-stack product build, or autonomous AI system? Write directly to the studio.
                </p>

                <div style="margin-top: 2.5rem;" class="reveal-fade-up" style="transition-delay: 300ms;">
                    <a href="mailto:issac78neo@gmail.com" class="btn-craft btn-craft-primary">
                        issac78neo@gmail.com <span class="btn-arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FAQ SECTION (ACCORDION)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="faq" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="faq-grid">
                <div class="faq-left">
                    <div class="eyebrow reveal-fade">Inquiries</div>
                    <h2 class="works-heading-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Frequently asked</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">questions.</span></span>
                    </h2>
                </div>

                <div class="faq-right">
                    <!-- Q1 -->
                    <div class="faq-row reveal-fade-up" style="transition-delay: 0ms;">
                        <h3>
                            <button class="faq-btn" onclick="toggleFaq(this)" aria-expanded="false" aria-controls="faq-panel-1" id="faq-btn-1">
                                <span class="faq-q-text">What is your typical project timeline?</span>
                                <span class="faq-plus-icon">+</span>
                            </button>
                        </h3>
                        <div class="faq-panel" id="faq-panel-1" role="region" aria-labelledby="faq-btn-1">
                            <p class="faq-a-text">
                                Most bespoke flagship builds take between two to four weeks depending on complexity, motion requirements, and backend/AI integrations. Sprints can be scheduled for accelerated deliveries.
                            </p>
                        </div>
                    </div>

                    <!-- Q2 -->
                    <div class="faq-row reveal-fade-up" style="transition-delay: 80ms;">
                        <h3>
                            <button class="faq-btn" onclick="toggleFaq(this)" aria-expanded="false" aria-controls="faq-panel-2" id="faq-btn-2">
                                <span class="faq-q-text">Do you handle both design and development?</span>
                                <span class="faq-plus-icon">+</span>
                            </button>
                        </h3>
                        <div class="faq-panel" id="faq-panel-2" role="region" aria-labelledby="faq-btn-2">
                            <p class="faq-a-text">
                                Yes. I work across the full spectrum — from high-craft creative UI/UX design and typography systems to production-grade Next.js, backend infrastructure, and autonomous AI integrations.
                            </p>
                        </div>
                    </div>

                    <!-- Q3 -->
                    <div class="faq-row reveal-fade-up" style="transition-delay: 160ms;">
                        <h3>
                            <button class="faq-btn" onclick="toggleFaq(this)" aria-expanded="false" aria-controls="faq-panel-3" id="faq-btn-3">
                                <span class="faq-q-text">How do you approach AI agent integrations?</span>
                                <span class="faq-plus-icon">+</span>
                            </button>
                        </h3>
                        <div class="faq-panel" id="faq-panel-3" role="region" aria-labelledby="faq-btn-3">
                            <p class="faq-a-text">
                                I design custom autonomous pipelines utilizing Python, LangChain, and advanced LLM tool-calling architectures that automate data extraction, customer workflows, and operational tasks.
                            </p>
                        </div>
                    </div>

                    <!-- Q4 -->
                    <div class="faq-row reveal-fade-up" style="transition-delay: 240ms;">
                        <h3>
                            <button class="faq-btn" onclick="toggleFaq(this)" aria-expanded="false" aria-controls="faq-panel-4" id="faq-btn-4">
                                <span class="faq-q-text">Where are you available to work?</span>
                                <span class="faq-plus-icon">+</span>
                            </button>
                        </h3>
                        <div class="faq-panel" id="faq-panel-4" role="region" aria-labelledby="faq-btn-4">
                            <p class="faq-a-text">
                                I collaborate remotely with startups, venture funds, and creative brands worldwide across US, European, and Asian timezones.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════════════════════════ -->
    <footer id="site-footer">
        <div class="container-custom" data-reveal-section>
            <div class="footer-grid">
                <!-- Brand Column -->
                <div class="footer-brand-col reveal-fade-up">
                    <a href="#top" class="header-logo" aria-label="Manish Kumar Soni Home">
                        <span class="diamond-mark" aria-hidden="true"></span>
                        <span class="logo-wordmark">manish soni</span>
                    </a>
                    <p class="footer-tagline">Building digital monuments with code &amp; AI.</p>
                    <a href="mailto:issac78neo@gmail.com" class="footer-mail-link">issac78neo@gmail.com</a>
                </div>

                <!-- Explore Column -->
                <div class="footer-col-explore reveal-fade-up" style="transition-delay: 100ms;">
                    <p class="footer-col-title">Explore</p>
                    <ul class="footer-links-list">
                        <li><a href="#works">Works</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#process">Process</a></li>
                    </ul>
                </div>

                <!-- Deployments Column -->
                <div class="footer-col-studio reveal-fade-up" style="transition-delay: 200ms;">
                    <p class="footer-col-title">Deployments</p>
                    <ul class="footer-links-list">
                        <li><a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">AURA Atelier ↗</a></li>
                        <li><a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">Apex Nova ↗</a></li>
                        <li><a href="#contact">AI Agents</a></li>
                        <li><a href="#contact">Contracts</a></li>
                    </ul>
                </div>

                <!-- Connect Column -->
                <div class="footer-col-follow reveal-fade-up" style="transition-delay: 300ms;">
                    <p class="footer-col-title">Connect</p>
                    <ul class="footer-links-list">
                        <li><a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                        <li><a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">LinkedIn</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noreferrer noopener">Twitter / X</a></li>
                    </ul>
                </div>
            </div>

            <!-- Giant Wordmark -->
            <div class="footer-giant-wordmark reveal-fade-up" aria-hidden="true" style="transition-delay: 200ms;">
                <div class="giant-word">MANISH</div>
            </div>

            <!-- Legal Bar -->
            <div class="footer-legal-bar">
                <p class="footer-copyright">© 2026 Manish Kumar Soni. All rights reserved.</p>
                <div class="footer-legal-links">
                    <a href="#top">Back to top ↑</a>
                    <a href="mailto:issac78neo@gmail.com">issac78neo@gmail.com</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- ═══════════════════════════════════════════════════════════════════
         MODAL MENU (FULL-SCREEN OVERLAY)
    ═══════════════════════════════════════════════════════════════════ -->
    <div id="modal-menu" role="dialog" aria-modal="true" aria-label="Main menu">
        <div class="modal-backdrop-panel"></div>
        <div class="modal-content-wrap container-custom">
            <div class="modal-topbar">
                <span class="modal-menu-title">Navigation</span>
                <button class="btn-modal-close" onclick="closeModalMenu()">Close ✕</button>
            </div>

            <nav class="modal-nav">
                <a href="#works" class="modal-nav-item" style="transition-delay: 180ms;" onclick="closeModalMenu()">
                    <span class="modal-nav-idx">01</span>
                    <span class="modal-nav-label">Works</span>
                </a>
                <a href="#skills" class="modal-nav-item" style="transition-delay: 250ms;" onclick="closeModalMenu()">
                    <span class="modal-nav-idx">02</span>
                    <span class="modal-nav-label">Skills</span>
                </a>
                <a href="#about" class="modal-nav-item" style="transition-delay: 320ms;" onclick="closeModalMenu()">
                    <span class="modal-nav-idx">03</span>
                    <span class="modal-nav-label">About</span>
                </a>
                <a href="#process" class="modal-nav-item" style="transition-delay: 390ms;" onclick="closeModalMenu()">
                    <span class="modal-nav-idx">04</span>
                    <span class="modal-nav-label">Process</span>
                </a>
                <a href="#contact" class="modal-nav-item" style="transition-delay: 460ms;" onclick="closeModalMenu()">
                    <span class="modal-nav-idx">05</span>
                    <span class="modal-nav-label">Contact</span>
                </a>
            </nav>

            <div class="modal-bottom-block">
                <div>
                    <a href="mailto:issac78neo@gmail.com" style="color:#ffffff; font-size:1.125rem;">issac78neo@gmail.com</a>
                    <p style="color:var(--text-muted); font-size:0.875rem; margin-top:0.25rem;">India · Remote Worldwide</p>
                </div>
                <div style="display:flex; gap:1.5rem;">
                    <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer noopener" style="color:var(--text-muted); font-size:0.875rem; text-transform:uppercase; letter-spacing:0.16em;">Twitter</a>
                </div>
            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         INTERACTION CONTROLLER
    ═══════════════════════════════════════════════════════════════════ -->
    <script>
        // Modal Menu Controller
        const modalMenu = document.getElementById('modal-menu');

        window.openModalMenu = function() {
            modalMenu.classList.add('is-open');
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.style.height = '100%';
            document.documentElement.style.position = 'relative';
            if (window.lenis) window.lenis.stop();
        };

        window.closeModalMenu = function() {
            modalMenu.classList.remove('is-open');
            document.documentElement.style.overflow = '';
            document.documentElement.style.height = '';
            document.documentElement.style.position = '';
            if (window.lenis) window.lenis.start();
        };

        // FAQ Accordion Controller
        window.toggleFaq = function(button) {
            const row = button.closest('.faq-row');
            const panel = row.querySelector('.faq-panel');
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

        // Word-by-word text engine splitter
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
        }
        initWordReveals();

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
            rootMargin: '0px 0px -10% 0px'
        });

        document.querySelectorAll('[data-reveal-section], .work-article, .reveal-fade-up, .reveal-plate, .reveal-fade').forEach(el => {
            revealObserver.observe(el);
        });

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
    </script>
</body>
</html>
`;

fs.writeFileSync('c:/Users/manis/Desktop/Antigravity 2.0 web designer/index.html', bespokePortfolioHtml, 'utf8');
console.log('Successfully written bespoke Manish portfolio to index.html! Bytes:', Buffer.byteLength(bespokePortfolioHtml));
