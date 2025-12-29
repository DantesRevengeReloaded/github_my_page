# Copilot Instructions

## Architecture at a Glance
- `index.html` is the production landing page: a single-page layout with `section` blocks for hero, projects, dashboards, and contact.
- Detail pages live in `pages/*.html` and share the same CSS so they can be edited without duplicating styles; each page keeps copy-only changes.
- All styling resides in `src/styles/` with `main.css` acting as the build artifact; the `base/`, `layout/`, and `themes/` folders are for future splits but are currently empty to keep GitHub Pages simple.
- JavaScript is minimal and centralized in `src/scripts/main.js`; prefer adding small modules under `src/scripts/modules/` and importing them from `main.js` when behavior grows.

## Content & Assets
- `src/assets/` contains fonts, icons, demo imagery, and videos that are referenced via relative paths from HTML; keep filenames stable because GitHub Pages serves the repo root directly.
- Downloadable CVs and any file that should remain unhashed belong under `public/` so they can be linked as `/public/...` without build tooling.
- When adding new imagery/icons, optimize manually (TinyPNG/Squoosh) because no bundler runs to compress assets.
- Update meta tags, canonical URLs, and social previews in `index.html` whenever branding shifts; GitHub Pages caches aggressively, so touch the HTML file to trigger redeploys.

## Styling System
- `src/styles/main.css` defines the design language via CSS custom properties (see the `:root` palette) and Global fonts (`Space Grotesk`); extend by adding tokens instead of hardcoding colors.
- Layout primitives use utility classes like `.shell`, `.section-heading`, `.project-card`, and `.hub-*`; compose these first before inventing new selectors.
- Animated reveals depend on `data-reveal` attributes plus the `.is-visible` class that `main.js` toggles, so any new block that should fade in must include `data-reveal="0.2"` (or similar) in markup.
- Mobile behaviors rely on CSS grid + clamp-based spacing; keep min/max widths consistent with existing `clamp()` expressions to avoid regressions.

## Interaction Patterns
- `main.js` wires the `#cta` button to smooth-scroll to `#projects`, auto-updates the `#year` footer badge, and manages the `.nav-toggle` + `.site-nav` open state; reuse these hooks instead of duplicating logic.
- IntersectionObserver logic reads the `data-reveal` value and sets `--reveal-delay`; if supporting reduced motion, ensure new animations also add the `prefers-reduced-motion` guard.
- Mobile navigation accessibility depends on updating `aria-expanded` on `.nav-toggle`; keep IDs (`primary-nav`) stable so assistive tech works.
- Console logging is currently minimal; prefer `data-*` hooks over IDs when adding new JS so components can be cloned without ID collisions.

## Extending Pages & Hubs
- Home sections should be prototyped under `src/sections/` (HTML snippets + notes) before being pasted into `index.html`; keep README guidance in each folder up to date.
- Project hubs (e.g., `pages/midnight-notes.html`) use the `.hub-shell` layout; add new hubs by copying one of these files and updating only the text blocks and CTA targets.
- Shared typography helpers (`.eyebrow`, `.label`, `.lede`) already style semantics, so wrap new copy in existing classes rather than adding redundant CSS.
- Any new CTA buttons should reuse `.cv-button` or `.hub-cta` styles; update `main.css` in place if a new variant is unavoidable, documenting why in a comment.

## Workflows & Deployment
- There is no bundler or dev server; preview changes locally with any static server (`npx serve .` or VS Code Live Server) so relative asset paths mirror the GitHub Pages environment.
- Deploys happen by pushing to `main`; GitHub Pages is configured for `/root`, so keep generated files out of the repo and rely on raw HTML/CSS/JS.
- Because caching can lag, bust GitHub Pages caches by touching `index.html` or renaming assets when you need immediate updates.
- When adding dependencies, prefer drop-in `<script>` tags or vendored modules because npm installs are intentionally avoided to keep the repo lightweight.
