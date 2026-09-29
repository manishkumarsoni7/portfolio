const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'build-chronos-horology');
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CHRONOS GENÈVE — Haute Horlogerie &amp; Master Timepiece Atelier</title>
    <meta name="description" content="Manufacture de Haute Horlogerie crafting hand-skeletonized flying tourbillons, perpetual complications, and bespoke mechanical masterworks in the Vallée de Joux." />
    
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet">
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

    <style>
        :root {
            --bg-obsidian: #050608;
            --bg-surface: #090b10;
            --bg-card: rgba(13, 16, 24, 0.7);
            --gold-primary: #d4af37;
            --gold-light: #f3e5ab;
            --gold-dark: #997e25;
            --cyan-lume: #00f2fe;
            --border-subtle: rgba(212, 175, 55, 0.15);
            --border-hover: rgba(212, 175, 55, 0.5);
            --text-primary: #ffffff;
            --text-muted: #9499a8;
            --text-faint: #525a6c;
            --line: rgba(255, 255, 255, 0.1);
            --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { font-size: 16px; scroll-behavior: smooth; background: var(--bg-obsidian); color: var(--text-primary); font-family: "Satoshi", sans-serif; }

        body {
            background-color: var(--bg-obsidian);
            color: var(--text-primary);
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* Ambient Lighting */
        .ambient-glow-gold {
            position: fixed;
            top: -10vw;
            right: 15vw;
            width: 50vw;
            height: 50vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
            filter: blur(120px);
            pointer-events: none;
            z-index: 0;
        }
        .ambient-glow-cyan {
            position: fixed;
            bottom: 10vw;
            left: 10vw;
            width: 45vw;
            height: 45vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
            z-index: 0;
        }

        .container {
            max-width: 86rem;
            margin-inline: auto;
            padding-inline: 1.5rem;
            position: relative;
            z-index: 2;
        }
        @media (min-width: 1024px) { .container { padding-inline: 3.5rem; } }

        /* Navigation Header */
        #site-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 100;
            background: rgba(5, 6, 8, 0.85);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--line);
            padding: 1.25rem 0;
            transition: all 0.3s ease;
        }
        .nav-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .brand-logo-wrap {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            text-decoration: none;
            color: #ffffff;
        }
        .brand-mark {
            width: 24px;
            height: 24px;
            border: 1px solid var(--gold-primary);
            transform: rotate(45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
        }
        .brand-mark-inner {
            width: 8px;
            height: 8px;
            background: var(--gold-primary);
        }
        .brand-title {
            font-family: "Playfair Display", serif;
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
        }
        .brand-sub {
            font-family: "Space Grotesk", monospace;
            font-size: 0.65rem;
            color: var(--gold-primary);
            letter-spacing: 0.18em;
            text-transform: uppercase;
            display: block;
        }

        .nav-links {
            display: none;
            align-items: center;
            gap: 2.5rem;
        }
        @media (min-width: 1024px) { .nav-links { display: flex; } }
        .nav-link {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--text-muted);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .nav-link:hover { color: var(--gold-primary); }

        .nav-right-tools {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }
        .swiss-clock-badge {
            display: none;
            font-family: "JetBrains Mono", monospace;
            font-size: 0.75rem;
            color: var(--gold-primary);
            background: rgba(212, 175, 55, 0.08);
            border: 1px solid rgba(212, 175, 55, 0.25);
            padding: 0.35rem 0.85rem;
            border-radius: 999px;
            align-items: center;
            gap: 0.5rem;
        }
        @media (min-width: 640px) { .swiss-clock-badge { display: inline-flex; } }
        .clock-pulse { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-primary); animation: pulse-gold 1.5s infinite; }
        @keyframes pulse-gold { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.3; transform: scale(0.7); } }

        .btn-concierge {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #050608;
            background: linear-gradient(135deg, #f3e5ab 0%, #d4af37 100%);
            padding: 0.55rem 1.25rem;
            border-radius: 6px;
            text-decoration: none;
            transition: all 0.3s var(--ease-spring);
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.25);
        }
        .btn-concierge:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
            filter: brightness(1.1);
        }

        /* ═══════════════════════════════════════════════════════════════════
           HERO STAGE (TOURBILLON SHOWCASE)
        ═══════════════════════════════════════════════════════════════════ */
        #hero {
            padding-top: 10rem;
            padding-bottom: 6rem;
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
        }
        .hero-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            align-items: center;
            width: 100%;
        }
        @media (min-width: 1024px) {
            .hero-grid { grid-template-columns: 1.15fr 1fr; gap: 4.5rem; }
        }

        .eyebrow-luxury {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.24em;
            color: var(--gold-primary);
            display: flex;
            align-items: center;
            gap: 0.6rem;
        }
        .eyebrow-luxury::before { content: ""; display: inline-block; width: 1.5rem; height: 1px; background: var(--gold-primary); }

        .hero-h1 {
            font-family: "Playfair Display", serif;
            font-size: 3rem;
            line-height: 1.05;
            letter-spacing: -0.02em;
            margin-top: 1.25rem;
        }
        @media (min-width: 640px) { .hero-h1 { font-size: 3.75rem; } }
        @media (min-width: 1024px) { .hero-h1 { font-size: 4.5rem; } }
        .hero-h1 .gold-serif { font-style: italic; color: var(--gold-light); font-weight: 400; }

        .hero-desc {
            font-size: 1.125rem;
            line-height: 1.7;
            color: var(--text-muted);
            max-width: 50ch;
            margin-top: 1.5rem;
        }

        .hero-cta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1.25rem;
            margin-top: 2.5rem;
            align-items: center;
        }
        .btn-outline-gold {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: var(--gold-light);
            border: 1px solid rgba(212, 175, 55, 0.4);
            padding: 0.75rem 1.6rem;
            border-radius: 6px;
            text-decoration: none;
            transition: all 0.3s var(--ease-spring);
        }
        .btn-outline-gold:hover {
            border-color: var(--gold-primary);
            background: rgba(212, 175, 55, 0.08);
            transform: translateY(-2px);
        }

        /* Hero Right: Masterpiece Visual Plate */
        .hero-visual-box {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .watch-main-plate {
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--border-subtle);
            background: #080a10;
            box-shadow: 0 30px 70px rgba(0, 0, 0, 0.9), 0 0 50px rgba(212, 175, 55, 0.1);
            transition: all 0.6s var(--ease-spring);
        }
        .watch-main-plate:hover {
            border-color: var(--gold-primary);
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 35px 80px rgba(0, 0, 0, 0.95), 0 0 60px rgba(212, 175, 55, 0.2);
        }
        .watch-main-plate img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }

        .watch-floating-badge {
            position: absolute;
            bottom: 1.5rem;
            left: 1.5rem;
            background: rgba(5, 6, 8, 0.85);
            border: 1px solid rgba(212, 175, 55, 0.35);
            border-radius: 8px;
            padding: 0.75rem 1.25rem;
            backdrop-filter: blur(16px);
        }
        .badge-model-name {
            font-family: "Playfair Display", serif;
            font-size: 1.1rem;
            font-weight: 600;
            color: #ffffff;
        }
        .badge-model-spec {
            font-family: "Space Grotesk", monospace;
            font-size: 0.75rem;
            color: var(--gold-primary);
            margin-top: 0.2rem;
        }

        /* ═══════════════════════════════════════════════════════════════════
           SPECS STRIP / ATELIER METRICS
        ═══════════════════════════════════════════════════════════════════ */
        .metrics-strip {
            border-block: 1px dashed var(--line);
            padding: 3.5rem 0;
            background: rgba(255, 255, 255, 0.015);
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
        }
        @media (min-width: 1024px) {
            .metrics-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .metric-cell {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .metric-num {
            font-family: "Playfair Display", serif;
            font-size: 2.75rem;
            font-weight: 700;
            color: var(--gold-light);
            line-height: 1;
        }
        .metric-title {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.88rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            color: #ffffff;
        }
        .metric-desc {
            font-size: 0.85rem;
            color: var(--text-muted);
            line-height: 1.4;
        }

        /* ═══════════════════════════════════════════════════════════════════
           FLAGSHIP COLLECTION SHOWCASE
        ═══════════════════════════════════════════════════════════════════ */
        #collection {
            padding: 8rem 0;
        }
        .collection-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            flex-wrap: wrap;
            gap: 2rem;
            border-bottom: 1px dashed var(--line);
            padding-bottom: 2rem;
            margin-bottom: 4rem;
        }
        .collection-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        @media (min-width: 768px) {
            .collection-grid { grid-template-columns: repeat(2, 1fr); gap: 3.5rem; }
        }

        .watch-card {
            background: var(--bg-card);
            border: 1px solid var(--border-subtle);
            border-radius: 14px;
            overflow: hidden;
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            transition: all 0.5s var(--ease-spring);
        }
        .watch-card:hover {
            border-color: var(--gold-primary);
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(212, 175, 55, 0.12);
        }
        .watch-card-img-wrap {
            position: relative;
            overflow: hidden;
            aspect-ratio: 16 / 10;
            background: #080a10;
        }
        .watch-card-img-wrap img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.7s var(--ease-spring);
        }
        .watch-card:hover .watch-card-img-wrap img {
            transform: scale(1.06);
        }
        .watch-card-body {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 1;
        }
        .watch-card-meta {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }
        .watch-card-title {
            font-family: "Playfair Display", serif;
            font-size: 1.65rem;
            font-weight: 600;
            color: #ffffff;
        }
        .watch-card-price {
            font-family: "JetBrains Mono", monospace;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--gold-light);
        }
        .watch-card-desc {
            font-size: 0.95rem;
            line-height: 1.6;
            color: var(--text-muted);
        }
        .watch-card-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.5rem;
            border-top: 1px dashed var(--line);
            padding-top: 1.25rem;
        }
        .watch-tag {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.75rem;
            color: var(--gold-light);
            background: rgba(212, 175, 55, 0.06);
            border: 1px solid rgba(212, 175, 55, 0.2);
            padding: 0.3rem 0.75rem;
            border-radius: 4px;
        }
        .watch-card-action {
            margin-top: auto;
            padding-top: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .btn-inquire-watch {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.82rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #050608;
            background: var(--gold-primary);
            padding: 0.5rem 1.1rem;
            border-radius: 6px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        .btn-inquire-watch:hover {
            background: #ffffff;
            transform: translateX(3px);
        }

        /* ═══════════════════════════════════════════════════════════════════
           INTERACTIVE BESPOKE CONFIGURATOR
        ═══════════════════════════════════════════════════════════════════ */
        #configurator {
            padding: 8rem 0;
            background: #080a10;
            border-top: 1px dashed var(--line);
            border-bottom: 1px dashed var(--line);
        }
        .config-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 4rem;
            margin-top: 3.5rem;
        }
        @media (min-width: 1024px) {
            .config-grid { grid-template-columns: 1fr 1.15fr; gap: 4.5rem; }
        }
        .config-preview-panel {
            background: #050608;
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8);
        }
        .config-controls {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }
        .control-group-title {
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.82rem;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: var(--gold-primary);
            margin-bottom: 0.75rem;
            display: block;
        }
        .options-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
        }
        .opt-btn {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-subtle);
            color: #ffffff;
            font-family: "Space Grotesk", sans-serif;
            font-size: 0.82rem;
            padding: 0.6rem 1.25rem;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s var(--ease-spring);
        }
        .opt-btn:hover, .opt-btn.is-active {
            background: rgba(212, 175, 55, 0.15);
            border-color: var(--gold-primary);
            color: var(--gold-light);
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
        }

        /* ═══════════════════════════════════════════════════════════════════
           FOOTER
        ═══════════════════════════════════════════════════════════════════ */
        #footer {
            padding: 6rem 0 3rem;
            background: #030406;
            border-top: 1px dashed var(--line);
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 3rem;
            border-bottom: 1px dashed var(--line);
            padding-bottom: 4rem;
        }
        @media (min-width: 1024px) {
            .footer-grid { grid-template-columns: 2fr 1fr 1fr; gap: 4rem; }
        }
        .footer-legal-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
            padding-top: 2rem;
            font-size: 0.82rem;
            color: var(--text-faint);
            font-family: "Space Grotesk", sans-serif;
        }
    </style>
</head>
<body id="top">

    <!-- Ambient Glows -->
    <div class="ambient-glow-gold"></div>
    <div class="ambient-glow-cyan"></div>

    <!-- Header Navigation -->
    <header id="site-header">
        <div class="container nav-inner">
            <a href="#top" class="brand-logo-wrap">
                <div class="brand-mark">
                    <div class="brand-mark-inner"></div>
                </div>
                <div>
                    <span class="brand-title">CHRONOS</span>
                    <span class="brand-sub">GENÈVE · VAL DE JOUX</span>
                </div>
            </a>

            <nav class="nav-links">
                <a href="#collection" class="nav-link">Collection</a>
                <a href="#configurator" class="nav-link">Bespoke Atelier</a>
                <a href="#craftsmanship" class="nav-link">Craftsmanship</a>
                <a href="#concierge" class="nav-link">Salons</a>
            </nav>

            <div class="nav-right-tools">
                <div class="swiss-clock-badge">
                    <span class="clock-pulse"></span>
                    <span id="live-swiss-clock">GENÈVE 14:30:00</span>
                </div>
                <a href="#configurator" class="btn-concierge">
                    Inquire ↗
                </a>
            </div>
        </div>
    </header>

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="hero">
        <div class="container hero-grid">
            <!-- Left Info -->
            <div class="hero-left">
                <div class="eyebrow-luxury">Manufacture de Haute Horlogerie · Est. 1894</div>
                
                <h1 class="hero-h1">
                    The Architecture of <span class="gold-serif">Perpetual</span> Motion.
                </h1>

                <p class="hero-desc">
                    Handcrafted in the Vallée de Joux, Chronos conceives bespoke skeletonized flying tourbillons, celestial complications, and astronomical masterworks for the world's most discerning collectors.
                </p>

                <div class="hero-cta-row">
                    <a href="#collection" class="btn-concierge" style="padding: 0.8rem 1.8rem;">
                        Explore Collection →
                    </a>
                    <a href="#configurator" class="btn-outline-gold">
                        Bespoke Configurator
                    </a>
                </div>
            </div>

            <!-- Right Visual Stage -->
            <div class="hero-visual-box">
                <div class="watch-main-plate">
                    <img src="project-chronos.jpg" alt="Chronos Genève — The Tourbillon Squelette No. 1">
                    <div class="watch-floating-badge">
                        <div class="badge-model-name">The Tourbillon Squelette No. 1</div>
                        <div class="badge-model-spec">Calibre CS.01 · Handcrafted Tourbillon · CHF 148,000</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         METRICS STRIP
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="metrics-strip">
        <div class="container metrics-grid">
            <div class="metric-cell">
                <span class="metric-num">60s</span>
                <span class="metric-title">Flying Tourbillon</span>
                <span class="metric-desc">Titanium cage rotating continuously against gravity distortion.</span>
            </div>
            <div class="metric-cell">
                <span class="metric-num">72h</span>
                <span class="metric-title">Power Reserve</span>
                <span class="metric-desc">Twin mainspring barrels delivering constant torque resonance.</span>
            </div>
            <div class="metric-cell">
                <span class="metric-num">380+</span>
                <span class="metric-title">Hand-Finished Parts</span>
                <span class="metric-desc">Anglage, Côtes de Genève, and black specular mirror polishing.</span>
            </div>
            <div class="metric-cell">
                <span class="metric-num">1894</span>
                <span class="metric-title">Swiss Heritage</span>
                <span class="metric-desc">Uninterrupted independent manufacture in Geneva &amp; Le Brassus.</span>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         COLLECTION SHOWCASE
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="collection">
        <div class="container">
            <div class="collection-header">
                <div>
                    <div class="eyebrow-luxury">Masterpieces in Production</div>
                    <h2 style="font-family:'Playfair Display', serif; font-size: 2.75rem; margin-top: 0.75rem;">
                        The Sovereign <span style="font-style:italic; color:var(--gold-light);">Collection</span>.
                    </h2>
                </div>
                <p style="color:var(--text-muted); max-width: 40ch; font-size: 0.95rem;">
                    Strictly limited to single-digit allocations per annum, each reference is assembled and adjusted by a dedicated master watchmaker.
                </p>
            </div>

            <div class="collection-grid">
                <!-- Watch 01 -->
                <article class="watch-card">
                    <div class="watch-card-img-wrap">
                        <img src="project-chronos.jpg" alt="The Tourbillon Squelette No. 1">
                    </div>
                    <div class="watch-card-body">
                        <div class="watch-card-meta">
                            <h3 class="watch-card-title">Tourbillon Squelette No. 1</h3>
                            <span class="watch-card-price">CHF 148,000</span>
                        </div>
                        <p class="watch-card-desc">
                            A testament to Haute Horlogerie, featuring an open-worked skeletonized movement, 60-second flying tourbillon, 18k gold balance wheel, and 72-hour power reserve.
                        </p>
                        <div class="watch-card-tags">
                            <span class="watch-tag">42mm Platinum 950</span>
                            <span class="watch-tag">Calibre CS.01</span>
                            <span class="watch-tag">Sapphire Crystal</span>
                            <span class="watch-tag">72h Reserve</span>
                        </div>
                        <div class="watch-card-action">
                            <span style="font-size:0.8rem; color:var(--text-faint); font-family:'Space Grotesk', monospace;">ALLOCATION: 3/5 REMAINING</span>
                            <a href="#configurator" class="btn-inquire-watch">Configure Atelier ↗</a>
                        </div>
                    </div>
                </article>

                <!-- Watch 02 -->
                <article class="watch-card">
                    <div class="watch-card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" alt="Chronos Perpetual Sovereign">
                    </div>
                    <div class="watch-card-body">
                        <div class="watch-card-meta">
                            <h3 class="watch-card-title">Chrono-Perpetual Sovereign</h3>
                            <span class="watch-card-price">CHF 192,000</span>
                        </div>
                        <p class="watch-card-desc">
                            Astronomical perpetual calendar with moonphase accuracy for 122 years, split-seconds column-wheel chronograph, and hand-engraved 18k rose gold rotor.
                        </p>
                        <div class="watch-card-tags">
                            <span class="watch-tag">41mm 18k Rose Gold</span>
                            <span class="watch-tag">Calibre CS.04</span>
                            <span class="watch-tag">Perpetual Calendar</span>
                            <span class="watch-tag">Moonphase</span>
                        </div>
                        <div class="watch-card-action">
                            <span style="font-size:0.8rem; color:var(--text-faint); font-family:'Space Grotesk', monospace;">ALLOCATION: 2/3 REMAINING</span>
                            <a href="#configurator" class="btn-inquire-watch">Configure Atelier ↗</a>
                        </div>
                    </div>
                </article>

                <!-- Watch 03 -->
                <article class="watch-card">
                    <div class="watch-card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80" alt="Celestial Grand Resonance">
                    </div>
                    <div class="watch-card-body">
                        <div class="watch-card-meta">
                            <h3 class="watch-card-title">Celestial Grand Resonance</h3>
                            <span class="watch-card-price">CHF 215,000</span>
                        </div>
                        <p class="watch-card-desc">
                            Twin independent balance wheels operating through acoustic resonance, neutralizing thermal distortion and yielding chronometer precision.
                        </p>
                        <div class="watch-card-tags">
                            <span class="watch-tag">41.5mm Grade 5 Titanium</span>
                            <span class="watch-tag">Dual Balance Resonance</span>
                            <span class="watch-tag">Minute Repeater</span>
                        </div>
                        <div class="watch-card-action">
                            <span style="font-size:0.8rem; color:var(--text-faint); font-family:'Space Grotesk', monospace;">BESPOKE ORDER</span>
                            <a href="#configurator" class="btn-inquire-watch">Configure Atelier ↗</a>
                        </div>
                    </div>
                </article>

                <!-- Watch 04 -->
                <article class="watch-card">
                    <div class="watch-card-img-wrap">
                        <img src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80" alt="Obsidian Monolith Lume Edition">
                    </div>
                    <div class="watch-card-body">
                        <div class="watch-card-meta">
                            <h3 class="watch-card-title">Obsidian Monolith Lume</h3>
                            <span class="watch-card-price">CHF 98,000</span>
                        </div>
                        <p class="watch-card-desc">
                            Monolithic black high-tech ceramic case paired with Super-LumiNova BGW9 electric cyan indices, skeletonized date disc, and DLC titanium crown.
                        </p>
                        <div class="watch-card-tags">
                            <span class="watch-tag">40mm Black Ceramic</span>
                            <span class="watch-tag">Calibre CS.02</span>
                            <span class="watch-tag">BGW9 Cyan Lume</span>
                            <span class="watch-tag">100m Water Resist</span>
                        </div>
                        <div class="watch-card-action">
                            <span style="font-size:0.8rem; color:var(--text-faint); font-family:'Space Grotesk', monospace;">ALLOCATION: 5/10 REMAINING</span>
                            <a href="#configurator" class="btn-inquire-watch">Configure Atelier ↗</a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         INTERACTIVE BESPOKE CONFIGURATOR
    ═══════════════════════════════════════════════════════════════════ -->
    <section id="configurator">
        <div class="container">
            <div class="eyebrow-luxury">Geneva Bespoke Workshop</div>
            <h2 style="font-family:'Playfair Display', serif; font-size: 2.75rem; margin-top: 0.75rem;">
                Configure Your <span style="font-style:italic; color:var(--gold-light);">Masterpiece</span>.
            </h2>
            <p style="color:var(--text-muted); max-width: 52ch; font-size: 1.05rem; margin-top: 1rem;">
                Select custom materials, mechanical complications, and bespoke leather finishes to tailor your private commission.
            </p>

            <div class="config-grid">
                <!-- Preview -->
                <div class="config-preview-panel">
                    <div>
                        <span style="font-family:'Space Grotesk', monospace; font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:0.14em;">Bespoke Estimate</span>
                        <div style="font-family:'Playfair Display', serif; font-size: 2.5rem; color:#fff; font-weight:700; margin-top:0.5rem;" id="config-price">CHF 148,000</div>
                        <div style="font-size:0.9rem; color:var(--text-muted); margin-top:0.25rem;" id="config-summary">950 Platinum Case · Flying Tourbillon · Black Alligator Strap</div>
                    </div>

                    <div style="border-top:1px dashed var(--line); padding-top:1.5rem; margin-top:2rem;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">
                            <span>Manufacturing Lead Time:</span>
                            <span style="color:#fff; font-weight:600;">8 to 12 Weeks</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:var(--text-muted); margin-bottom:1.5rem;">
                            <span>Origin:</span>
                            <span style="color:#fff; font-weight:600;">Geneva, Switzerland (Handcrafted)</span>
                        </div>
                        <button onclick="alert('Thank you. A master horologist from our Geneva concierge will contact you within 24 hours.')" class="btn-concierge" style="width:100%; text-align:center; padding:0.85rem; border:none; cursor:pointer;">
                            Submit Private Commission ↗
                        </button>
                    </div>
                </div>

                <!-- Controls -->
                <div class="config-controls">
                    <!-- 1. Case Material -->
                    <div>
                        <span class="control-group-title">01 · Case Metallurgy</span>
                        <div class="options-row">
                            <button class="opt-btn is-active" onclick="selectOpt(this, 'material', '950 Platinum', 148000)">950 Platinum (CHF 148k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'material', '18k Rose Gold', 132000)">18k Rose Gold (CHF 132k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'material', 'Black Ceramic', 98000)">Black Ceramic (CHF 98k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'material', 'Damascus Steel', 86000)">Damascus Steel (CHF 86k)</button>
                        </div>
                    </div>

                    <!-- 2. Complication -->
                    <div>
                        <span class="control-group-title">02 · Complication &amp; Calibre</span>
                        <div class="options-row">
                            <button class="opt-btn is-active" onclick="selectOpt(this, 'comp', 'Flying Tourbillon', 0)">60s Flying Tourbillon</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'comp', 'Perpetual Calendar', 44000)">Perpetual Calendar (+44k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'comp', 'Minute Repeater', 67000)">Minute Repeater (+67k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'comp', 'Dual Time GMT', 18000)">Dual-Time GMT (+18k)</button>
                        </div>
                    </div>

                    <!-- 3. Strap -->
                    <div>
                        <span class="control-group-title">03 · Bespoke Leather &amp; Bracelet</span>
                        <div class="options-row">
                            <button class="opt-btn is-active" onclick="selectOpt(this, 'strap', 'Black Alligator', 0)">Hand-Stitched Alligator</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'strap', 'Titanium Bracelet', 6000)">Titanium Link (+6k)</button>
                            <button class="opt-btn" onclick="selectOpt(this, 'strap', 'Textured Rubber', 2000)">Vulcanized Rubber (+2k)</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════════════════════════════ -->
    <footer id="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    <span style="font-family:'Playfair Display', serif; font-size:1.5rem; font-weight:700; letter-spacing:0.1em;">CHRONOS GENÈVE</span>
                    <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6; max-width:40ch; margin-top:1rem;">
                        Independent Swiss Manufacture de Haute Horlogerie dedicated to the preservation of classical hand-anglage, tourbillon complications, and astronomical mechanics.
                    </p>
                </div>
                <div>
                    <span style="font-family:'Space Grotesk', monospace; font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:0.16em;">Salons &amp; Ateliers</span>
                    <ul style="list-style:none; margin-top:1rem; display:flex; flex-direction:column; gap:0.6rem; font-size:0.9rem; color:var(--text-muted);">
                        <li>Rue du Rhône 42, Genève</li>
                        <li>Bahnhofstrasse 18, Zürich</li>
                        <li>Ginza 6-Chome, Tokyo</li>
                        <li>Bond Street, London</li>
                    </ul>
                </div>
                <div>
                    <span style="font-family:'Space Grotesk', monospace; font-size:0.75rem; color:var(--gold-primary); text-transform:uppercase; letter-spacing:0.16em;">Direct Concierge</span>
                    <p style="margin-top:1rem; color:#fff; font-family:'Space Grotesk', sans-serif; font-size:0.95rem;">
                        concierge@chronos-geneve.ch
                    </p>
                    <p style="color:var(--text-faint); font-size:0.85rem; margin-top:0.4rem;">
                        +41 22 819 00 00
                    </p>
                </div>
            </div>

            <div class="footer-legal-bar">
                <span>© 2026 Chronos Genève Manufacture. All rights reserved.</span>
                <span>Designed &amp; Engineered by Manish Kumar Soni</span>
            </div>
        </div>
    </footer>

    <script>
        // Swiss UTC Time Clock
        function updateSwissClock() {
            const now = new Date();
            const utcHour = (now.getUTCHours() + 1) % 24; // Geneva CET
            const min = String(now.getUTCMinutes()).padStart(2, '0');
            const sec = String(now.getUTCSeconds()).padStart(2, '0');
            const hour = String(utcHour).padStart(2, '0');
            const clockEl = document.getElementById('live-swiss-clock');
            if (clockEl) clockEl.textContent = \`GENÈVE \${hour}:\${min}:\${sec}\`;
        }
        setInterval(updateSwissClock, 1000);
        updateSwissClock();

        // Configurator State
        let configState = {
            material: '950 Platinum',
            materialPrice: 148000,
            comp: 'Flying Tourbillon',
            compPrice: 0,
            strap: 'Black Alligator',
            strapPrice: 0
        };

        function selectOpt(btn, group, name, price) {
            btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            if (group === 'material') {
                configState.material = name;
                configState.materialPrice = price;
            } else if (group === 'comp') {
                configState.comp = name;
                configState.compPrice = price;
            } else if (group === 'strap') {
                configState.strap = name;
                configState.strapPrice = price;
            }

            const total = configState.materialPrice + configState.compPrice + configState.strapPrice;
            document.getElementById('config-price').textContent = 'CHF ' + total.toLocaleString();
            document.getElementById('config-summary').textContent = \`\${configState.material} Case · \${configState.comp} · \${configState.strap} Strap\`;
        }
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(targetDir, 'CNAME'), 'chronos-atelier.surge.sh', 'utf8');

if (fs.existsSync('project-chronos.jpg')) {
    fs.copyFileSync('project-chronos.jpg', path.join(targetDir, 'project-chronos.jpg'));
}
if (fs.existsSync('favicon.svg')) {
    fs.copyFileSync('favicon.svg', path.join(targetDir, 'favicon.svg'));
}

console.log('Successfully built magnificent Chronos Horology site in build-chronos-horology!');
