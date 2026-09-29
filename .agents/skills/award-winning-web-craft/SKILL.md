---
name: award-winning-web-craft
description: Master rules and patterns for building Awwwards-caliber, high-craft editorial and luxury interactive websites. Includes Playfair Display + Satoshi typography, adaptive rem grids, Lenis smooth scroll, line/word kinetic text reveals, scroll-scrub parallax, and spring physics.
---

# Award-Winning Web Craft & Editorial UI Standards

This skill defines the mandatory frontend design and motion architecture for all web projects. Never build generic, plain, or low-effort templates. Every website must embody world-class creative engineering.

---

## 1. Master Typography & Pairing System

### Font Choices (Load from CDN):
- **Editorial / Luxury Display:**
  - **Playfair Display** (`family=Playfair+Display:ital,wght@0,400;1,400`): Headings, quotes, prices, numerals, and wordmark.
  - Heading base: `font-family: "Playfair Display", serif; font-weight: 400; letter-spacing: -0.01em; line-height: 1.04 - 1.12;`
- **Body & UI Sans:**
  - **Satoshi** (`https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap`): Body, buttons, metadata, labels.
- **Accents:**
  - One emphasized word in headings rendered as `<span class="accent-serif">` (Playfair Display, italic, normal weight).

---

## 2. Adaptive Rem-Based Viewport Grid Architecture

Proportions must hold across all display sizes by scaling root `font-size` proportionally with viewport width:

```css
html { font-size: 16px; }
@media (max-width: 1920px) { html { font-size: 0.833333vw; } } /* 16*100/1920 */
@media (max-width: 1440px) { html { font-size: 1.111111vw; } } /* 16*100/1440 */
@media (max-width: 1024px) { html { font-size: 1.5625vw;  } } /* 16*100/1024 */
@media (max-width: 640px)  { html { font-size: 4.444444vw; } } /* 16*100/360  */
```

---

## 3. Kinetic Text Engine & Spring Reveal Physics

### A. Line-by-Line Heading Reveals:
Wrap heading lines in `overflow: hidden` containers. Lines animate from `translateY(110%); opacity: 0` to `translateY(0); opacity: 1` over 1000ms using `cubic-bezier(0.16, 1, 0.3, 1)` with 90–140ms stagger.

### B. Word-by-Word Body & Lead Reveals:
Split paragraphs into word spans. Each word translates from `translateY(0.8rem); opacity: 0` to `translateY(0); opacity: 1` over 720ms using `cubic-bezier(0.165, 0.84, 0.44, 1)` with 10–30ms stagger.

### C. Image Plate Scale-Settle:
Images animate from `opacity: 0; transform: translateY(3.5rem) scale(1.04)` to `opacity: 1; transform: translateY(0) scale(1)` over 700ms `cubic-bezier(0.16, 1, 0.3, 1)`.

### D. Scroll-Scrub Viewport Parallax:
Map plate progress across viewport linearly to `translateY(+2.5rem)` (at bottom) down to `translateY(-2.5rem)` (at top).

---

## 4. Smooth Scroll & Physics (Lenis ESM)

Always integrate Lenis smooth scroll:
```javascript
import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.19/+esm";

const lenis = new Lenis({ smoothWheel: true, duration: 1.2 });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

---

## 5. Micro-Craft & UI Tokens

- **Dashed Hairlines:** `border-top: 1px dashed var(--line)` (light: `rgba(25,25,23,0.2)`, dark: `rgba(255,255,255,0.2)`).
- **Eyebrow:** Inline flex with `1px × 2rem` horizontal line + uppercase `letter-spacing: 0.2em; font-size: 0.75rem`.
- **CTA Buttons:** Solid and ghost states with arrow `→` that springs on hover: `translateX(0.4rem)`.
- **Header:** `position: fixed; mix-blend-mode: difference; color: #fff;` with subtle diamond/geometric mark.
- **Accordion:** Spring-expanded measured `scrollHeight` with rotating `+` (45°).
- **Modal Menu:** Top-origin `scaleY(0) -> scaleY(1)` panel with staggered oversized italic links and scroll lock (`lenis.stop()`).
