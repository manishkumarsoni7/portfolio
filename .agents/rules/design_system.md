# Web Design Excellence & Component Standards

Always apply high-craft UI/UX engineering inspired by **Award-Winning Editorial Design**, **Unlumen UI**, **Magic UI Pro**, and **Smooth UI**.

### 1. Typography & Adaptive Scaling
- **Editorial Pairing:** Playfair Display (Serif display, 400 + italic accents) + Satoshi (Sans body 400/500/700/900).
- **Viewport Proportion Locking:** Dynamic root `font-size` queries (`1920: 0.833vw`, `1440: 1.111vw`, `1024: 1.5625vw`, `640: 4.444vw`).

### 2. Kinetic Motion Physics
- **Line & Word Reveal Engines:** Line clip slide-ups (`overflow: hidden` + `translateY(110%)` to `0`) and word-by-word cascading reveals.
- **Spring Animations:** `cubic-bezier(0.16, 1, 0.3, 1)` and `cubic-bezier(0.165, 0.84, 0.44, 1)`.
- **Lenis Smooth Scroll & Viewport Parallax:** Scroll-scrub `translateY(+2.5rem)` to `-2.5rem`.

### 3. Signature Details
- **Dashed Hairlines:** `border-top: 1px dashed var(--line)`.
- **Eyebrows:** `1px × 2rem` horizontal rule + uppercase tracking `0.2em`.
- **Tactile Micro-States:** Button arrow slide (`translateX(0.4rem)`), image hover zoom (`scale(1.06)`), and card lift (`translateY(-0.75rem)`).
- **Full-Screen Modal Menu:** Top-origin `scaleY(0) -> scaleY(1)` with staggered links and scroll locking.
