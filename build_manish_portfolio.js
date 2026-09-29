const fs = require('fs');

const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manish Kumar Soni — Lead Web Designer &amp; AI Builder</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://api.fontshare.com">
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&display=swap" rel="stylesheet">

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

        // Featured works parallax scroll scrub
        const parallaxPlates = document.querySelectorAll('[data-parallax-plate]');
        lenis.on('scroll', () => {
            if (window.innerWidth < 1024) return;
            const vh = window.innerHeight;
            parallaxPlates.forEach((plate) => {
                const rect = plate.getBoundingClientRect();
                const progress = (vh - rect.top) / (vh + rect.height);
                if (progress >= -0.2 && progress <= 1.2) {
                    const clamped = Math.max(0, Math.min(1, progress));
                    const translateY = 2.5 - clamped * 5.0; // from +2.5rem to -2.5rem
                    plate.style.transform = \`translateY(\${translateY.toFixed(3)}rem)\`;
                }
            });
        });
    </script>

    <style>
        /* ═══════════════════════════════════════════════════════════════════
           PAGE SHELL & MASTER COLOR TOKENS
        ═══════════════════════════════════════════════════════════════════ */
        :root {
            --canvas: #ffffff;
            --surface-grey: #f3f3f3;
            --surface-dark: #191917;
            --ink: #191917;
            --ink-muted: rgba(25, 25, 23, 0.6);
            --ink-faint: rgba(25, 25, 23, 0.3);
            --on-dark: #ffffff;
            --on-dark-muted: rgba(255, 255, 255, 0.6);
            --on-dark-faint: rgba(255, 255, 255, 0.3);
            --line: rgba(25, 25, 23, 0.2);
            --line-strong: rgba(25, 25, 23, 0.4);
            --line-on-dark: rgba(255, 255, 255, 0.2);
        }

        /* Rem-based adaptive grid */
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
            background: var(--canvas);
            color: var(--ink);
            font-family: "Satoshi", sans-serif;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            overflow-x: hidden;
        }

        img {
            display: block;
            max-width: 100%;
            height: auto;
        }

        a {
            color: inherit;
            text-decoration: none;
        }

        button {
            background: none;
            border: none;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }

        h1, h2, h3 {
            font-family: "Playfair Display", serif;
            font-weight: 400;
            text-transform: none;
            letter-spacing: -0.01em;
            line-height: 1.12;
        }

        ::selection {
            background: var(--ink);
            color: #ffffff;
        }

        /* Dashed Hairlines */
        .rule-dashed {
            border-top: 1px dashed var(--line);
        }
        .rule-dashed-dark {
            border-top: 1px dashed var(--line-on-dark);
        }

        /* Container */
        .container-custom {
            max-width: 120rem;
            margin-inline: auto;
            width: 100%;
        }

        .section-pad {
            padding: 6rem 1.5rem;
        }
        @media (min-width: 1024px) {
            .section-pad {
                padding: 8rem 3rem;
            }
        }

        .scroll-mt-custom {
            scroll-margin-top: 6rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           SHARED UI PRIMITIVES
        ═══════════════════════════════════════════════════════════════════ */
        .eyebrow {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            color: var(--ink-muted);
            font-weight: 500;
        }
        .eyebrow::before {
            content: "";
            display: block;
            width: 2rem;
            height: 1px;
            background: var(--ink-muted);
        }
        .eyebrow-dark {
            color: var(--on-dark-muted);
        }
        .eyebrow-dark::before {
            background: var(--on-dark-muted);
        }

        .accent-serif {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-weight: 400;
            text-transform: none;
        }

        /* CTA Buttons */
        .btn-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem 2rem;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            font-weight: 500;
            transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .btn-cta .btn-arrow {
            display: inline-block;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .btn-cta:hover .btn-arrow {
            transform: translateX(0.4rem);
        }

        .btn-solid-light {
            background: #191917;
            color: #ffffff;
        }
        .btn-solid-light:hover {
            background: rgba(25, 25, 23, 0.9);
        }

        .btn-ghost-light {
            border: 1px dashed var(--line);
            color: #191917;
        }
        .btn-ghost-light:hover {
            background: #191917;
            color: #ffffff;
            border-color: #191917;
        }

        .btn-solid-dark {
            background: #ffffff;
            color: #191917;
        }
        .btn-solid-dark:hover {
            background: rgba(255, 255, 255, 0.9);
        }

        .btn-ghost-dark {
            border: 1px dashed var(--line-on-dark);
            color: #ffffff;
        }
        .btn-ghost-dark:hover {
            background: #ffffff;
            color: #191917;
            border-color: #ffffff;
        }

        /* Ratio Locked Image Plates */
        .ratio-plate {
            position: relative;
            overflow: hidden;
            width: 100%;
            background: #e5e5e5;
        }
        .ratio-plate img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%);
        }
        .ratio-3-4 { aspect-ratio: 3 / 4; }
        .ratio-3-2 { aspect-ratio: 3 / 2; }

        /* ═══════════════════════════════════════════════════════════════════
           HEADER (FIXED, MIX-BLEND-DIFFERENCE)
        ═══════════════════════════════════════════════════════════════════ */
        #site-header {
            position: fixed;
            inset-inline: 0;
            top: 0;
            z-index: 50;
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

        .header-left {
            display: none;
        }
        @media (min-width: 1024px) {
            .header-left {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }
        }
        .header-left-top {
            font-size: 0.875rem;
            letter-spacing: -0.02em;
        }
        .header-left-sub {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: rgba(255, 255, 255, 0.7);
        }

        .header-logo {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            justify-self: start;
        }
        @media (min-width: 1024px) {
            .header-logo {
                justify-self: center;
            }
        }

        .diamond-mark {
            width: 0.625rem;
            height: 0.625rem;
            border: 1px solid currentColor;
            transform: rotate(45deg);
        }

        .logo-wordmark {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.125rem;
            letter-spacing: 0.04em;
        }

        .header-right {
            justify-self: end;
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        .header-nav {
            display: none;
            align-items: center;
            gap: 2rem;
        }
        @media (min-width: 1024px) {
            .header-nav {
                display: flex;
            }
        }

        .header-nav-link {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: opacity 0.2s;
        }
        .header-nav-dot {
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: #ffffff;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .header-nav-link:hover .header-nav-dot {
            opacity: 1;
        }

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
        @media (min-width: 640px) {
            .menu-btn-label {
                display: inline-block;
            }
        }

        .hamburger-lines {
            display: flex;
            flex-direction: column;
            gap: 0.375rem;
        }
        .hamburger-lines span {
            display: block;
            width: 1.5rem;
            height: 1px;
            background: #ffffff;
        }

        /* ═══════════════════════════════════════════════════════════════════
           HERO SECTION
        ═══════════════════════════════════════════════════════════════════ */
        #hero {
            position: relative;
            min-height: 100svh;
            padding: 8rem 1.5rem 4rem;
            display: flex;
            align-items: center;
        }
        @media (min-width: 1024px) {
            #hero {
                padding: 10rem 3rem 4rem;
            }
        }

        .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: center;
            width: 100%;
        }
        @media (min-width: 1024px) {
            .hero-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
            }
        }

        .hero-left {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .hero-left {
                grid-column: span 6;
            }
        }

        .hero-h1 {
            max-width: 14ch;
            font-size: 3.75rem;
            line-height: 1.04;
            margin-top: 1.5rem;
            font-family: "Playfair Display", serif;
            font-weight: 400;
        }
        @media (min-width: 640px) {
            .hero-h1 { font-size: 4.5rem; }
        }
        @media (min-width: 1024px) {
            .hero-h1 { font-size: 6rem; }
        }

        .hero-lead {
            max-width: 46ch;
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--ink-muted);
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
            margin-top: 3rem;
            border-top: 1px solid var(--line);
            padding-top: 2rem;
        }
        @media (min-width: 1024px) {
            .hero-facts-dl {
                display: grid;
            }
        }
        .hero-facts-dl dt {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--ink-faint);
        }
        .hero-facts-dl dd {
            font-size: 0.875rem;
            color: var(--ink);
            margin-top: 0.25rem;
        }

        .hero-right {
            width: 100%;
        }
        @media (min-width: 1024px) {
            .hero-right {
                grid-column: 7 / span 6;
            }
        }

        .mobile-scroll-cue {
            margin-top: 3rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        @media (min-width: 1024px) {
            .mobile-scroll-cue {
                display: none;
            }
        }
        .mobile-scroll-cue span {
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: var(--ink-faint);
        }
        .mobile-scroll-cue .cue-line {
            width: 2.5rem;
            height: 1px;
            background: var(--line-strong);
        }

        /* ═══════════════════════════════════════════════════════════════════
           STATEMENT SECTION (LIGHT)
        ═══════════════════════════════════════════════════════════════════ */
        #statement {
            background: #ffffff;
            padding: 7rem 1.5rem;
        }
        @media (min-width: 1024px) {
            #statement {
                padding: 10rem 3rem;
            }
        }
        .statement-inner {
            max-width: 80rem;
            margin-inline: auto;
        }
        .statement-p {
            font-family: "Playfair Display", serif;
            font-size: 1.875rem;
            line-height: 1.3;
            color: var(--ink);
            margin-top: 3rem;
        }
        @media (min-width: 640px) {
            .statement-p { font-size: 2.25rem; }
        }
        @media (min-width: 1024px) {
            .statement-p { font-size: 3rem; line-height: 1.25; }
        }
        .statement-sig {
            display: block;
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.25rem;
            color: var(--ink-muted);
            margin-top: 3rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FEATURED WORKS SECTION (LIGHT)
        ═══════════════════════════════════════════════════════════════════ */
        #works {
            background: #ffffff;
        }
        .works-heading-h2 {
            font-size: 2.25rem;
            max-width: 18ch;
            margin-top: 1.5rem;
        }
        @media (min-width: 640px) {
            .works-heading-h2 { font-size: 3rem; }
        }
        @media (min-width: 1024px) {
            .works-heading-h2 { font-size: 4.5rem; }
        }

        .works-gallery-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            margin-top: 4rem;
        }
        @media (min-width: 1024px) {
            .works-gallery-grid {
                grid-template-columns: repeat(12, 1fr);
                column-gap: 2rem;
                row-gap: 0;
                margin-top: 6rem;
            }
        }

        .work-article {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .work-article {
                grid-column: span 7;
            }
            .work-article:nth-child(even) {
                grid-column-start: 6;
                margin-top: 6rem;
            }
            .work-article:nth-child(odd) {
                grid-column-start: 1;
            }
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
            font-weight: 500;
            color: var(--ink);
            font-family: "Satoshi", sans-serif;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .work-medium {
            font-size: 0.875rem;
            color: var(--ink-muted);
            margin-top: 0.25rem;
        }
        .work-year {
            font-family: "Playfair Display", serif;
            font-size: 1rem;
            color: var(--ink);
        }

        /* ═══════════════════════════════════════════════════════════════════
           PINNED CTA #1 (DARK)
        ═══════════════════════════════════════════════════════════════════ */
        #pinned-cta-1 {
            background: #191917;
            min-height: 100svh;
            display: flex;
            align-items: center;
            color: #ffffff;
        }
        .pinned-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            align-items: center;
            width: 100%;
        }
        @media (min-width: 1024px) {
            .pinned-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
            }
        }
        .pinned-copy {
            max-width: 34rem;
        }
        @media (min-width: 1024px) {
            .pinned-copy {
                grid-column: span 6;
            }
        }
        .pinned-h2 {
            font-size: 2.25rem;
            color: var(--on-dark);
            margin-top: 1.5rem;
        }
        @media (min-width: 640px) {
            .pinned-h2 { font-size: 3rem; }
        }
        @media (min-width: 1024px) {
            .pinned-h2 { font-size: 3.75rem; }
        }

        .pinned-body {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--on-dark-muted);
            margin-top: 2rem;
        }

        .pinned-img-wrap {
            width: 100%;
        }
        @media (min-width: 1024px) {
            .pinned-img-wrap {
                grid-column: 8 / span 5;
            }
        }

        /* ═══════════════════════════════════════════════════════════════════
           SKILLS SECTION (GREY)
        ═══════════════════════════════════════════════════════════════════ */
        #skills {
            background: var(--surface-grey);
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
            .skills-grid {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .skill-card {
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
        }
        .skill-num {
            font-family: "Playfair Display", serif;
            font-size: 1.5rem;
            color: var(--ink);
        }
        .skill-h3 {
            font-family: "Satoshi", sans-serif;
            font-size: 1.25rem;
            font-weight: 500;
            line-height: 1.2;
            color: var(--ink);
            margin-top: 1.5rem;
        }
        .skill-p {
            font-size: 1rem;
            line-height: 1.625;
            color: var(--ink-muted);
            margin-top: 0.75rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           ABOUT SECTION (LIGHT)
        ═══════════════════════════════════════════════════════════════════ */
        #about {
            background: #ffffff;
        }
        .about-top-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 1024px) {
            .about-top-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
            }
        }
        .about-left {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .about-left {
                grid-column: span 7;
            }
        }
        .about-h2 {
            font-size: 2.25rem;
            line-height: 1.1;
            color: var(--ink);
            max-width: 20ch;
            margin-top: 2rem;
        }
        @media (min-width: 640px) {
            .about-h2 { font-size: 3rem; }
        }
        @media (min-width: 1024px) {
            .about-h2 { font-size: 3.75rem; }
        }

        .about-right {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        @media (min-width: 1024px) {
            .about-right {
                grid-column: span 5;
            }
        }
        .about-p {
            font-size: 1rem;
            line-height: 1.625;
            color: var(--ink-muted);
            max-width: 52ch;
        }

        .about-photos-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .about-photos-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        @media (min-width: 1024px) {
            .about-photos-grid {
                margin-top: 5rem;
            }
        }

        .about-photo-item {
            overflow: hidden;
        }
        .about-photo-item img {
            transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) and (pointer: fine) {
            .about-photo-item:hover img {
                transform: scale(1.06);
            }
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
            .about-facts-ledger {
                grid-template-columns: repeat(4, 1fr);
            }
        }
        .about-facts-ledger dt {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--ink-faint);
        }
        .about-facts-ledger dd {
            font-size: 1rem;
            color: var(--ink);
            margin-top: 0.5rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           PROCESS SECTION (STICKY HEADING)
        ═══════════════════════════════════════════════════════════════════ */
        #process {
            background: #ffffff;
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
        .process-sticky-left {
            width: 100%;
        }
        @media (min-width: 1024px) {
            .process-sticky-left {
                grid-column: span 5;
                position: sticky;
                top: 8rem;
                align-self: start;
            }
        }
        .process-right {
            list-style: none;
        }
        @media (min-width: 1024px) {
            .process-right {
                grid-column: span 7;
            }
        }
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
            color: var(--ink-faint);
            flex-shrink: 0;
        }
        @media (min-width: 640px) {
            .process-num {
                font-size: 6rem;
            }
        }
        .process-info {
            flex: 1;
        }
        @media (min-width: 640px) {
            .process-info {
                padding-top: 0.75rem;
            }
        }
        .process-h3 {
            font-family: "Satoshi", sans-serif;
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--ink);
        }
        @media (min-width: 1024px) {
            .process-h3 { font-size: 1.875rem; }
        }
        .process-p {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--ink-muted);
            max-width: 48ch;
            margin-top: 1rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           SERVICES / CONTRACT ACQUIRE (LIGHT)
        ═══════════════════════════════════════════════════════════════════ */
        #services {
            background: #ffffff;
        }
        .acquire-header-row {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
        }
        @media (min-width: 1024px) {
            .acquire-header-row {
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
            }
        }
        .acquire-lead {
            font-size: 1rem;
            line-height: 1.625;
            color: var(--ink-muted);
            max-width: 42ch;
        }

        .for-sale-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3.5rem 2.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .for-sale-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .acquire-card-link {
            display: flex;
            flex-direction: column;
        }
        .acquire-card-plate {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @media (hover: hover) and (pointer: fine) {
            .acquire-card-link:hover .acquire-card-plate {
                transform: translateY(-0.75rem);
            }
        }

        .acquire-info-row {
            border-top: 1px dashed var(--line);
            margin-top: 1.5rem;
            padding-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 1.5rem;
        }
        .acquire-title {
            font-family: "Satoshi", sans-serif;
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--ink);
        }
        .acquire-medium {
            font-size: 0.875rem;
            color: var(--ink-muted);
            margin-top: 0.5rem;
        }
        .acquire-edition {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--ink-faint);
            margin-top: 0.25rem;
        }
        .acquire-price {
            font-family: "Playfair Display", serif;
            font-size: 1.25rem;
            color: var(--ink);
            white-space: nowrap;
        }

        .acquire-bottom-cta {
            margin-top: 4rem;
            display: flex;
            justify-content: center;
        }

        /* ═══════════════════════════════════════════════════════════════════
           PINNED CTA #2 (DARK, CENTERED)
        ═══════════════════════════════════════════════════════════════════ */
        #contact {
            background: #191917;
            min-height: 100svh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            text-align: center;
        }
        .pinned-centered-box {
            max-width: 40rem;
            margin-inline: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* ═══════════════════════════════════════════════════════════════════
           TESTIMONIALS SECTION (LIGHT)
        ═══════════════════════════════════════════════════════════════════ */
        #testimonials {
            background: #ffffff;
        }
        .testimonials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-top: 4rem;
        }
        @media (min-width: 768px) {
            .testimonials-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        .testimonial-card {
            border-top: 1px dashed var(--line);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
        .testimonial-quote {
            font-family: "Playfair Display", serif;
            font-size: 1.25rem;
            line-height: 1.625;
            color: var(--ink);
        }
        @media (min-width: 1024px) {
            .testimonial-quote { font-size: 1.5rem; }
        }
        .testimonial-author {
            margin-top: 2.5rem;
        }
        .author-name {
            font-size: 1rem;
            color: var(--ink);
            font-weight: 500;
        }
        .author-role {
            font-size: 0.875rem;
            color: var(--ink-muted);
            margin-top: 0.25rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           DEPLOYMENTS ROSTER SECTION (GREY)
        ═══════════════════════════════════════════════════════════════════ */
        #roster {
            background: var(--surface-grey);
        }
        .exhibitions-ul {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr;
            margin-top: 4rem;
        }
        @media (min-width: 640px) {
            .exhibitions-ul {
                grid-template-columns: repeat(2, 1fr);
                column-gap: 3rem;
            }
        }
        @media (min-width: 1024px) {
            .exhibitions-ul {
                grid-template-columns: repeat(3, 1fr);
                column-gap: 3rem;
            }
        }
        .exhibition-li {
            border-top: 1px dashed var(--line);
            padding-block: 1.5rem;
            display: flex;
            align-items: baseline;
            gap: 1.25rem;
        }
        .exhibition-idx {
            font-family: "Playfair Display", serif;
            font-size: 0.875rem;
            color: var(--ink-muted);
        }
        .exhibition-venue {
            font-family: "Playfair Display", serif;
            font-size: 1.25rem;
            color: var(--ink);
        }
        @media (min-width: 1024px) {
            .exhibition-venue {
                font-size: 1.5rem;
            }
        }

        /* ═══════════════════════════════════════════════════════════════════
           FAQ SECTION (ACCORDION)
        ═══════════════════════════════════════════════════════════════════ */
        #faq {
            background: #ffffff;
        }
        .faq-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 1024px) {
            .faq-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 2rem;
            }
        }
        .faq-left {
            width: 100%;
        }
        @media (min-width: 1024px) {
            .faq-left {
                grid-column: span 4;
            }
        }
        .faq-right {
            width: 100%;
        }
        @media (min-width: 1024px) {
            .faq-right {
                grid-column: span 8;
            }
        }
        .faq-row {
            border-top: 1px dashed var(--line);
        }
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
            font-family: "Satoshi", sans-serif;
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--ink);
        }
        @media (min-width: 1024px) {
            .faq-q-text { font-size: 1.5rem; }
        }
        .faq-plus-icon {
            font-family: "Satoshi", sans-serif;
            font-size: 1.5rem;
            color: var(--ink);
            display: inline-block;
            transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: center;
        }
        .faq-row.is-open .faq-plus-icon {
            transform: rotate(45deg);
        }
        .faq-panel {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease;
        }
        .faq-row.is-open .faq-panel {
            opacity: 1;
        }
        .faq-a-text {
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--ink-muted);
            max-width: 60ch;
            padding-bottom: 2.5rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FOOTER (DARK)
        ═══════════════════════════════════════════════════════════════════ */
        #site-footer {
            background: #191917;
            color: #ffffff;
            padding: 6rem 1.5rem 3rem;
        }
        @media (min-width: 1024px) {
            #site-footer {
                padding: 6rem 3rem 3rem;
            }
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
        }
        @media (min-width: 1024px) {
            .footer-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 3rem;
            }
        }
        .footer-brand-col {
            display: flex;
            flex-direction: column;
        }
        @media (min-width: 1024px) {
            .footer-brand-col {
                grid-column: span 5;
            }
        }
        .footer-tagline {
            font-family: "Playfair Display", serif;
            font-style: italic;
            font-size: 1.5rem;
            color: var(--on-dark-muted);
            max-width: 28ch;
            margin-top: 1.5rem;
        }
        .footer-mail-link {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--on-dark);
            margin-top: 2rem;
            transition: color 0.2s;
        }
        .footer-mail-link:hover {
            color: var(--on-dark-muted);
        }

        .footer-col-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: var(--on-dark-faint);
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
            color: var(--on-dark-muted);
            transition: color 0.2s;
        }
        .footer-links-list a:hover {
            color: var(--on-dark);
        }

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
            color: rgba(255, 255, 255, 0.08);
            user-select: none;
        }

        .footer-legal-bar {
            margin-top: 3rem;
            border-top: 1px dashed var(--line-on-dark);
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
        .footer-copyright {
            font-size: 0.875rem;
            color: var(--on-dark-faint);
        }
        .footer-legal-links {
            display: flex;
            gap: 1.5rem;
        }
        .footer-legal-links a {
            font-size: 0.875rem;
            color: var(--on-dark-faint);
            transition: color 0.2s;
        }
        .footer-legal-links a:hover {
            color: var(--on-dark-muted);
        }

        /* ═══════════════════════════════════════════════════════════════════
           MODAL MENU (FULL-SCREEN OVERLAY)
        ═══════════════════════════════════════════════════════════════════ */
        #modal-menu {
            position: fixed;
            inset: 0;
            z-index: 60;
            color: #ffffff;
            display: none;
            pointer-events: none;
        }
        #modal-menu.is-open {
            display: block;
            pointer-events: auto;
        }

        .modal-backdrop-panel {
            position: absolute;
            inset: 0;
            background: #191917;
            transform-origin: top;
            transform: scaleY(0);
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #modal-menu.is-open .modal-backdrop-panel {
            transform: scaleY(1);
        }

        .modal-content-wrap {
            position: relative;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 1.5rem 1.5rem 2.5rem;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        @media (min-width: 1024px) {
            .modal-content-wrap {
                padding: 1.5rem 3rem 2.5rem;
            }
        }
        #modal-menu.is-open .modal-content-wrap {
            opacity: 1;
            transition-delay: 0.15s;
        }

        .modal-topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-menu-title {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.28em;
            color: var(--on-dark-faint);
        }
        .btn-modal-close {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.18em;
            color: #ffffff;
            transition: color 0.2s;
        }
        .btn-modal-close:hover {
            color: var(--on-dark-muted);
        }

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
            transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #modal-menu.is-open .modal-nav-item {
            opacity: 1;
            transform: translateY(0);
        }

        .modal-nav-idx {
            width: 2rem;
            font-size: 0.875rem;
            color: var(--on-dark-muted);
            font-family: "Playfair Display", serif;
        }
        .modal-nav-label {
            font-family: "Playfair Display", serif;
            font-size: 3rem;
            color: #ffffff;
            transition: font-style 0.2s ease;
        }
        @media (min-width: 640px) {
            .modal-nav-label { font-size: 3.75rem; }
        }
        @media (min-width: 1024px) {
            .modal-nav-label { font-size: 4.5rem; }
        }
        .modal-nav-item:hover .modal-nav-label {
            font-style: italic;
        }

        .modal-bottom-block {
            border-top: 1px dashed var(--line-on-dark);
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
        #modal-menu.is-open .modal-bottom-block {
            opacity: 1;
        }

        .modal-mail {
            font-size: 1.125rem;
            color: #ffffff;
        }
        .modal-loc {
            font-size: 0.875rem;
            color: var(--on-dark-muted);
            margin-top: 0.25rem;
        }
        .modal-socials {
            display: flex;
            gap: 1.5rem;
        }
        .modal-socials a {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--on-dark-muted);
            transition: color 0.2s;
        }
        .modal-socials a:hover {
            color: var(--on-dark);
        }

        /* ═══════════════════════════════════════════════════════════════════
           MOTION ENGINE & REVEALS
        ═══════════════════════════════════════════════════════════════════ */
        .reveal-line-wrap {
            display: inline-block;
            overflow: hidden;
            vertical-align: top;
        }
        .reveal-line-inner {
            display: inline-block;
            transform: translateY(110%);
            opacity: 0;
            transition: transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed .reveal-line-inner {
            transform: translateY(0);
            opacity: 1;
        }

        .reveal-word {
            display: inline-block;
            transform: translateY(0.8rem);
            opacity: 0;
            transition: transform 720ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 720ms cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .is-revealed .reveal-word {
            transform: translateY(0);
            opacity: 1;
        }

        .reveal-fade-up {
            opacity: 0;
            transform: translateY(2.5rem);
            transition: opacity 720ms cubic-bezier(0.16, 1, 0.3, 1), transform 720ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed.reveal-fade-up, .is-revealed .reveal-fade-up {
            opacity: 1;
            transform: translateY(0);
        }

        .reveal-fade {
            opacity: 0;
            transition: opacity 640ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed.reveal-fade, .is-revealed .reveal-fade {
            opacity: 1;
        }

        .reveal-plate {
            opacity: 0;
            transform: translateY(3.5rem) scale(1.04);
            transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .is-revealed.reveal-plate, .is-revealed .reveal-plate {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation: none !important;
                transition: none !important;
                transform: none !important;
                opacity: 1 !important;
            }
        }
    </style>
</head>
<body id="top">

    <!-- ═══════════════════════════════════════════════════════════════════
         HEADER (FIXED, MIX-BLEND-DIFFERENCE)
    ═══════════════════════════════════════════════════════════════════ -->
    <header id="site-header">
        <div class="header-inner container-custom">
            <!-- Left Column (Hidden below lg) -->
            <div class="header-left">
                <p class="header-left-top">Web Developer &amp; AI Builder</p>
                <p class="header-left-sub">Engineering · Design · Intelligence</p>
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
            <!-- Left (lg col-span 6) -->
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
                    <a href="#works" class="btn-cta btn-solid-light">
                        Explore Works <span class="btn-arrow">→</span>
                    </a>
                    <a href="#contact" class="btn-cta btn-ghost-light">
                        Initiate Contract <span class="btn-arrow">→</span>
                    </a>
                </div>

                <dl class="hero-facts-dl reveal-fade" style="transition-delay: 1000ms;">
                    <div>
                        <dt>Based</dt>
                        <dd>India · Remote Worldwide</dd>
                    </div>
                    <div>
                        <dt>Focus</dt>
                        <dd>Next.js · React · AI Agents</dd>
                    </div>
                    <div>
                        <dt>Craft</dt>
                        <dd>Luxury Web Engineering</dd>
                    </div>
                </dl>

                <div class="mobile-scroll-cue reveal-fade" style="transition-delay: 1400ms;">
                    <span>Scroll to enter</span>
                    <div class="cue-line"></div>
                </div>
            </div>

            <!-- Right Hero Portrait Plate (lg col-span 6, col-start 7) -->
            <div class="hero-right">
                <div class="ratio-plate ratio-3-4 reveal-plate" style="transition-delay: 200ms;">
                    <img src="manish.jpg" alt="Manish Kumar Soni — Portrait" onerror="this.src='https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p1.webp'" loading="eager">
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         STATEMENT SECTION (LIGHT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="statement" class="rule-dashed">
        <div class="statement-inner" data-reveal-section>
            <div class="eyebrow reveal-fade">The Philosophy</div>

            <p class="statement-p" data-word-reveal data-word-stagger="30" data-word-delay="100">
                I treat code as an architectural medium — every interaction must have intention, every pixel must hold weight, and every system must breathe with precision. The future belongs to software that feels both alive and effortless.
            </p>

            <span class="statement-sig reveal-fade-up" style="transition-delay: 400ms;">— Manish Soni</span>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEATURED WORKS SECTION (LIGHT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="works" class="rule-dashed section-pad scroll-mt-custom">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Selected Deployments</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Systems designed to</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">endure</span> and perform.</span></span>
            </h2>

            <div class="works-gallery-grid">
                <!-- 01 · AURA Spatial Atelier · 2026 · Luxury Interior Architecture & 3D Configurator · art-l1.webp · 3 / 2 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer" style="display:block;">
                            <div class="ratio-plate ratio-3-2 reveal-plate" data-parallax-plate>
                                <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="AURA Spatial Atelier — Luxury Interior Architecture" loading="lazy">
                            </div>
                        </a>
                        <figcaption class="work-caption">
                            <div>
                                <a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">
                                    <h3 class="work-title">AURA Spatial Atelier <span>↗</span></h3>
                                </a>
                                <p class="work-medium">Luxury Interior Architecture &amp; 3D Configurator</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 02 · Apex Nova Dental · 2026 · Surgical Care Studio & Smart Booking · art-l2.webp · 3 / 2 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer" style="display:block;">
                            <div class="ratio-plate ratio-3-2 reveal-plate" data-parallax-plate>
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

                <!-- 03 · Chronos Horology · 2026 · Haute Horlogerie Kinetic Timepiece Atelier · art-p3.webp · 3 / 4 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="ratio-plate ratio-3-4 reveal-plate" data-parallax-plate>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p3.webp" alt="Chronos Horology — Haute Horlogerie Kinetic Timepiece Atelier" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Chronos Horology</h3>
                                <p class="work-medium">Haute Horlogerie Kinetic Timepiece Atelier</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 04 · Autonomous AI Neural Engine · 2026 · LLM Autonomous Agent Orchestration · art-l4.webp · 3 / 2 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="ratio-plate ratio-3-2 reveal-plate" data-parallax-plate>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l4.webp" alt="Autonomous AI Neural Engine — Agent Orchestration" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Autonomous AI Neural Engine</h3>
                                <p class="work-medium">LLM Autonomous Agent Orchestration Pipeline</p>
                            </div>
                            <span class="work-year">2026</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 05 · Spatial Design Studio · 2025 · Editorial Brand Architecture · art-l3.webp · 3 / 2 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="ratio-plate ratio-3-2 reveal-plate" data-parallax-plate>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l3.webp" alt="Spatial Design Studio — Brand Architecture" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Spatial Design Studio</h3>
                                <p class="work-medium">Editorial Brand Architecture &amp; Design Systems</p>
                            </div>
                            <span class="work-year">2025</span>
                        </figcaption>
                    </figure>
                </article>

                <!-- 06 · Venture Capital Portfolio · 2025 · High-Fintech Analytics · art-l5.webp · 3 / 2 -->
                <article class="work-article" data-reveal-section>
                    <figure>
                        <div class="ratio-plate ratio-3-2 reveal-plate" data-parallax-plate>
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l5.webp" alt="Venture Capital Portfolio — High-Fintech Analytics" loading="lazy">
                        </div>
                        <figcaption class="work-caption">
                            <div>
                                <h3 class="work-title">Venture Capital Portfolio</h3>
                                <p class="work-medium">High-Fintech Analytics &amp; Fund Intelligence</p>
                            </div>
                            <span class="work-year">2025</span>
                        </figcaption>
                    </figure>
                </article>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PINNED CTA #1 (DARK)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="pinned-cta-1" class="rule-dashed-dark section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="pinned-grid">
                <div class="pinned-copy">
                    <div class="eyebrow eyebrow-dark reveal-fade">Engineering Standard</div>

                    <h2 class="pinned-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Craft is not an</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">accident.</span></span>
                    </h2>

                    <p class="pinned-body" data-word-reveal data-word-stagger="16" data-word-delay="200">
                        Every line of code, every spring curve, and every backend architecture is engineered from first principles without generic templates.
                    </p>

                    <div style="margin-top: 2.5rem;" class="reveal-fade-up" style="transition-delay: 300ms;">
                        <a href="#contact" class="btn-cta btn-solid-dark">
                            Hire For Your Project <span class="btn-arrow">→</span>
                        </a>
                    </div>
                </div>

                <div class="pinned-img-wrap">
                    <div class="ratio-plate ratio-3-4 reveal-plate" style="transition-delay: 150ms;">
                        <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p2.webp" alt="" loading="lazy">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         TECHNICAL CORE / SKILLS SECTION (GREY)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="skills" class="rule-dashed section-pad scroll-mt-custom">
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
         ABOUT SECTION (LIGHT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="about" class="rule-dashed section-pad scroll-mt-custom">
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

            <!-- Photo Grid -->
            <div class="about-photos-grid">
                <div class="about-photo-item reveal-plate" style="transition-delay: 0ms;">
                    <div class="ratio-plate ratio-3-2">
                        <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l1.webp" alt="Creative Studio Architecture" loading="lazy">
                    </div>
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 100ms;">
                    <div class="ratio-plate ratio-3-2">
                        <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l2.webp" alt="Engineering Studio Workspace" loading="lazy">
                    </div>
                </div>
                <div class="about-photo-item reveal-plate" style="transition-delay: 200ms;">
                    <div class="ratio-plate ratio-3-2">
                        <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l3.webp" alt="Design Systems &amp; Prototyping" loading="lazy">
                    </div>
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
    <section id="process" class="rule-dashed section-pad scroll-mt-custom">
        <div class="container-custom" data-reveal-section>
            <div class="process-grid">
                <!-- Left Sticky Heading (lg col-span 5) -->
                <div class="process-sticky-left">
                    <div class="eyebrow reveal-fade">The Methodology</div>
                    <h2 class="works-heading-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">From architecture</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">to deployment.</span></span>
                    </h2>
                </div>

                <!-- Right Steps List (lg col-span 7) -->
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
         SERVICES & CONTRACT TIERS (LIGHT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="services" class="rule-dashed section-pad scroll-mt-custom">
        <div class="container-custom" data-reveal-section>
            <div class="acquire-header-row">
                <div>
                    <div class="eyebrow reveal-fade">Engagement Models</div>
                    <h2 class="works-heading-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Services for ambitious</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">founders &amp; brands.</span></span>
                    </h2>
                </div>

                <p class="acquire-lead reveal-fade" style="transition-delay: 150ms;">
                    Available for high-impact contracts, full-stack product builds, and autonomous AI system integrations worldwide.
                </p>
            </div>

            <!-- Services Grid -->
            <div class="for-sale-grid">
                <!-- Card 1 -->
                <article class="reveal-fade-up" style="transition-delay: 0ms;">
                    <a href="#contact" class="acquire-card-link" aria-label="Enquire about Flagship Web Platforms">
                        <div class="ratio-plate ratio-3-2 acquire-card-plate">
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l4.webp" alt="Flagship Web Platforms" loading="lazy">
                        </div>
                        <div class="acquire-info-row">
                            <div>
                                <h3 class="acquire-title">Flagship Web Platforms</h3>
                                <p class="acquire-medium">Next.js 15, TypeScript, Custom Motion, Tailored Design System</p>
                                <p class="acquire-edition">End-to-End Build</p>
                            </div>
                            <span class="acquire-price">Contract</span>
                        </div>
                    </a>
                </article>

                <!-- Card 2 -->
                <article class="reveal-fade-up" style="transition-delay: 90ms;">
                    <a href="#contact" class="acquire-card-link" aria-label="Enquire about Autonomous AI Agent Pipelines">
                        <div class="ratio-plate ratio-3-4 acquire-card-plate">
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p2.webp" alt="Autonomous AI Agent Pipelines" loading="lazy">
                        </div>
                        <div class="acquire-info-row">
                            <div>
                                <h3 class="acquire-title">Autonomous AI Agents</h3>
                                <p class="acquire-medium">Python, LangChain, Tool Use, Custom Enterprise Workflows</p>
                                <p class="acquire-edition">Custom Solution</p>
                            </div>
                            <span class="acquire-price">Contract</span>
                        </div>
                    </a>
                </article>

                <!-- Card 3 -->
                <article class="reveal-fade-up" style="transition-delay: 0ms;">
                    <a href="#contact" class="acquire-card-link" aria-label="Enquire about Luxury Brand Portals">
                        <div class="ratio-plate ratio-3-2 acquire-card-plate">
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-l5.webp" alt="Luxury Brand Portals" loading="lazy">
                        </div>
                        <div class="acquire-info-row">
                            <div>
                                <h3 class="acquire-title">Luxury Brand Portals</h3>
                                <p class="acquire-medium">Awwwards-level interactive web design, smooth scroll, 3D showcases</p>
                                <p class="acquire-edition">Bespoke Design</p>
                            </div>
                            <span class="acquire-price">Contract</span>
                        </div>
                    </a>
                </article>

                <!-- Card 4 -->
                <article class="reveal-fade-up" style="transition-delay: 90ms;">
                    <a href="#contact" class="acquire-card-link" aria-label="Enquire about Full-Stack SaaS Architecture">
                        <div class="ratio-plate ratio-3-4 acquire-card-plate">
                            <img src="https://api.getlayers.ai/storage/v1/object/public/public/assets/artist-32290926f6/site/art-p3.webp" alt="Full-Stack SaaS Architecture" loading="lazy">
                        </div>
                        <div class="acquire-info-row">
                            <div>
                                <h3 class="acquire-title">Full-Stack SaaS Architecture</h3>
                                <p class="acquire-medium">PostgreSQL, Authentication, Stripe, Dashboard Engines</p>
                                <p class="acquire-edition">Production Scale</p>
                            </div>
                            <span class="acquire-price">Contract</span>
                        </div>
                    </a>
                </article>
            </div>

            <!-- Bottom CTA -->
            <div class="acquire-bottom-cta reveal-fade-up" style="transition-delay: 200ms;">
                <a href="#contact" class="btn-cta btn-solid-light">
                    Initiate Project Scope <span class="btn-arrow">→</span>
                </a>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PINNED CTA #2 (DARK, CENTERED, NO IMAGE)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="contact" class="rule-dashed-dark section-pad scroll-mt-custom">
        <div class="container-custom" data-reveal-section>
            <div class="pinned-centered-box">
                <div class="eyebrow eyebrow-dark reveal-fade">Dispatch</div>

                <h2 class="pinned-h2" style="max-width: 22ch;">
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Let's engineer something</span></span>
                    <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;"><span class="accent-serif">extraordinary.</span></span></span>
                </h2>

                <p class="pinned-body" data-word-reveal data-word-stagger="16" data-word-delay="200" style="max-width: 38ch;">
                    Planning a flagship web platform, full-stack product build, or autonomous AI system? Write directly to the studio.
                </p>

                <div style="margin-top: 2.5rem;" class="reveal-fade-up" style="transition-delay: 300ms;">
                    <a href="mailto:issac78neo@gmail.com" class="btn-cta btn-solid-dark">
                        issac78neo@gmail.com <span class="btn-arrow">→</span>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         TESTIMONIALS SECTION (LIGHT)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="testimonials" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Client Reflections</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">What founders and</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">collaborators say.</span></span>
            </h2>

            <div class="testimonials-grid">
                <!-- 01 -->
                <figure class="testimonial-card reveal-fade-up" style="transition-delay: 0ms;">
                    <blockquote class="testimonial-quote">
                        “Manish transformed our vision into an architectural masterpiece. The motion, responsiveness, and speed exceeded all expectations.”
                    </blockquote>
                    <figcaption class="testimonial-author">
                        <p class="author-name">Alexandre Dubois</p>
                        <p class="author-role">Founder, Atelier Luxe</p>
                    </figcaption>
                </figure>

                <!-- 02 -->
                <figure class="testimonial-card reveal-fade-up" style="transition-delay: 110ms;">
                    <blockquote class="testimonial-quote">
                        “The level of typography, adaptive scaling, and micro-interactions Manish brings to the table is on par with the best design studios worldwide.”
                    </blockquote>
                    <figcaption class="testimonial-author">
                        <p class="author-name">Sarah Chen</p>
                        <p class="author-role">Product Director, Apex Health</p>
                    </figcaption>
                </figure>

                <!-- 03 -->
                <figure class="testimonial-card reveal-fade-up" style="transition-delay: 220ms;">
                    <blockquote class="testimonial-quote">
                        “Rarely do you find a developer who has both deep full-stack AI engineering chops and world-class frontend taste.”
                    </blockquote>
                    <figcaption class="testimonial-author">
                        <p class="author-name">Rohan Mehta</p>
                        <p class="author-role">Venture Partner, Kinetic Capital</p>
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         DEPLOYMENTS ROSTER (GREY)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="roster" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="eyebrow reveal-fade">Selected Index</div>
            
            <h2 class="works-heading-h2">
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Production roster &amp;</span></span>
                <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">live platforms.</span></span>
            </h2>

            <ul class="exhibitions-ul">
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 0ms;"><span class="exhibition-idx">01</span><span class="exhibition-venue">AURA Spatial Atelier</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 80ms;"><span class="exhibition-idx">02</span><span class="exhibition-venue">Apex Nova Dental</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 160ms;"><span class="exhibition-idx">03</span><span class="exhibition-venue">Chronos Horology</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 0ms;"><span class="exhibition-idx">04</span><span class="exhibition-venue">Autonomous AI Agents</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 80ms;"><span class="exhibition-idx">05</span><span class="exhibition-venue">Next.js 15 Architectures</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 160ms;"><span class="exhibition-idx">06</span><span class="exhibition-venue">Spatial Design Systems</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 0ms;"><span class="exhibition-idx">07</span><span class="exhibition-venue">Venture Intelligence Portal</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 80ms;"><span class="exhibition-idx">08</span><span class="exhibition-venue">Python Automation Core</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 160ms;"><span class="exhibition-idx">09</span><span class="exhibition-venue">Interactive 3D Showcases</span></li>
                <li class="exhibition-li reveal-fade-up" style="transition-delay: 0ms;"><span class="exhibition-idx">10</span><span class="exhibition-venue">Global Surge / Vercel Edge</span></li>
            </ul>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FAQ SECTION (ACCORDION)
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="faq" class="rule-dashed section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="faq-grid">
                <!-- Left (lg col-span 4) -->
                <div class="faq-left">
                    <div class="eyebrow reveal-fade">Inquiries</div>
                    <h2 class="works-heading-h2">
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 0ms;">Frequently asked</span></span>
                        <span class="reveal-line-wrap"><span class="reveal-line-inner" style="transition-delay: 90ms;">questions.</span></span>
                    </h2>
                </div>

                <!-- Right Accordion (lg col-span 8) -->
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
         FOOTER (DARK)
    ═══════════════════════════════════════════════════════════════════ -->
    <footer id="site-footer" class="section-pad">
        <div class="container-custom" data-reveal-section>
            <div class="footer-grid">
                <!-- Brand (lg col-span 5) -->
                <div class="footer-brand-col reveal-fade-up">
                    <a href="#top" class="header-logo" aria-label="Manish Kumar Soni Home">
                        <span class="diamond-mark" aria-hidden="true"></span>
                        <span class="logo-wordmark">manish soni</span>
                    </a>
                    <p class="footer-tagline">Building digital monuments with code &amp; AI.</p>
                    <a href="mailto:issac78neo@gmail.com" class="footer-mail-link">issac78neo@gmail.com</a>
                </div>

                <!-- Explore (lg col-span 2) -->
                <div class="footer-col-explore reveal-fade-up" style="transition-delay: 100ms;">
                    <p class="footer-col-title">Explore</p>
                    <ul class="footer-links-list">
                        <li><a href="#works">Works</a></li>
                        <li><a href="#skills">Skills</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#process">Process</a></li>
                    </ul>
                </div>

                <!-- Studio (lg col-span 2) -->
                <div class="footer-col-studio reveal-fade-up" style="transition-delay: 200ms;">
                    <p class="footer-col-title">Deployments</p>
                    <ul class="footer-links-list">
                        <li><a href="https://aura-atelier.surge.sh" target="_blank" rel="noopener noreferrer">AURA Atelier ↗</a></li>
                        <li><a href="https://apex-novadental.surge.sh" target="_blank" rel="noopener noreferrer">Apex Nova ↗</a></li>
                        <li><a href="#contact">AI Agents</a></li>
                        <li><a href="#contact">Contracts</a></li>
                    </ul>
                </div>

                <!-- Follow (lg col-span 3) -->
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
            <!-- Top Bar -->
            <div class="modal-topbar">
                <span class="modal-menu-title">Menu</span>
                <button class="btn-modal-close" onclick="closeModalMenu()">Close ✕</button>
            </div>

            <!-- Nav Links -->
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

            <!-- Bottom Block -->
            <div class="modal-bottom-block">
                <div>
                    <a href="mailto:issac78neo@gmail.com" class="modal-mail">issac78neo@gmail.com</a>
                    <p class="modal-loc">India · Remote Worldwide</p>
                </div>
                <div class="modal-socials">
                    <a href="https://github.com/manishkumarsoni7" target="_blank" rel="noreferrer noopener">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer noopener">LinkedIn</a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer noopener">Twitter / X</a>
                </div>
            </div>
        </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════════
         INTERACTION LOGIC & INTERSECTION OBSERVERS
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

        // Auto-recalculate open FAQ panel heights on window resize
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

fs.writeFileSync('c:/Users/manis/Desktop/Antigravity 2.0 web designer/index.html', portfolioHtml, 'utf8');
console.log('Successfully written Manish Kumar Soni master portfolio to index.html! Bytes:', Buffer.byteLength(portfolioHtml));
