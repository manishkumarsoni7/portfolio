# Web Design Excellence & Aesthetic Principles

This workspace strictly adheres to modern, craft-driven, award-winning frontend design. **NEVER generate generic, low-effort "AI-generated" templates** (such as plain purple-gradient hero sections, centered generic bootstrap cards, or uninspired linear CSS animations).

Whenever building websites or web components in this workspace, integrate the core design patterns and interactive aesthetics:

---

## 1. Editorial & Luxury Typography Mastery (Awwwards / Editorial Standard)
- **High-Contrast Typography Pairing:**
  - **Display / Headings:** *Playfair Display* (Google Fonts) normal + italic accents (`.accent-serif`), or *Cormorant Garamond*, or *Syne*.
  - **Body / Metadata:** *Satoshi* (Fontshare CDN) or *Manrope* / *Space Grotesk*.
  - **Accents:** An intentional italic serif word in headlines (`<span class="accent-serif">`).
  - **Line-Height & Rhythm:** Tight tracking (`line-height: 1.04 - 1.12`) on large headings, relaxed `1.625` on body copy.

---

## 2. Adaptive Rem-Based Viewport Grid Architecture
Proportions must scale seamlessly across all devices by dynamically adjusting root `font-size`:
```css
html { font-size: 16px; }
@media (max-width: 1920px) { html { font-size: 0.833333vw; } }
@media (max-width: 1440px) { html { font-size: 1.111111vw; } }
@media (max-width: 1024px) { html { font-size: 1.5625vw;  } }
@media (max-width: 640px)  { html { font-size: 4.444444vw; } }
```

---

## 3. Kinetic Motion & Spring Reveal Engine
- **Line-by-Line Heading Reveals:** `overflow: hidden` line wrappers animating from `translateY(110%); opacity: 0` to `translateY(0); opacity: 1` over 1000ms `cubic-bezier(0.16, 1, 0.3, 1)` with 90–140ms stagger.
- **Word-by-Word Lead Reveals:** Splitting lead and narrative copy into word `<span>` elements animating from `translateY(0.8rem); opacity: 0` with 10–30ms stagger.
- **Plate Scale-Settle:** Image containers transitioning from `opacity: 0; translateY(3.5rem) scale(1.04)` to `opacity: 1; translateY(0) scale(1)` over 700ms.
- **Lenis Smooth Scroll & Viewport Parallax:** ESM Lenis smooth scroll with scroll-scrub translation mapped across viewport progress.

---

## 4. Unlumen UI & Magic UI Pro Elements
- **Deep Obsidian Palette & Ambient Glow:** Obsidian surfaces (`#080808`, `#0a0b10`, `#191917`), radial spotlights, and animated Border Beams.
- **Micro-Borders & Dashed Hairlines:** `border-top: 1px dashed var(--line)` (light: `rgba(25,25,23,0.2)`, dark: `rgba(255,255,255,0.2)`).
- **Tactile Interactables:**
  - CTA button arrow slide: `translateX(0.4rem)`.
  - Image hover scale: `scale(1.06)`.
  - Card lift: `translateY(-0.75rem)` on hover.
  - Header: `mix-blend-mode: difference` fixed navigation bar.
  - Accordion: Measured `scrollHeight` expansion with rotating `+` (45°).
  - Modal Menu: Top-origin `scaleY(0) -> scaleY(1)` panel with staggered oversized italic links.

---

## Strict Prohibitions
1. **Never generate flat, generic cards**: Every card must feature intentional borders, subtle elevation/shadow, hover micro-interactions, or ambient lighting.
2. **Never use plain linear CSS transitions**: Always use spring curves (`cubic-bezier(0.16, 1, 0.3, 1)` or `cubic-bezier(0.165, 0.84, 0.44, 1)`).
3. **No low-effort templates**: Maintain high craft, precise typography hierarchies, and intentional whitespace across every page.
