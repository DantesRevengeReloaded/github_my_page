# GitHub Pages Portfolio Scaffold

A future-proof folder layout for a personal portfolio. The UI is a simple "Hello World" for now, but the directory tree mirrors what a full-featured site will need (content, data, automation, docs, and tests).

## What's Inside

```
root
├── index.html             # Temporary landing page
├── site.config.json       # Shared metadata for generators/scripts
├── src/                   # Source-of-truth for UI code, styles, and assets
├── public/                # Static files copied verbatim to the site root
├── data/                  # Structured JSON powering dynamic sections
├── content/               # Plain-language copy, media, and translations
├── docs/                  # Strategy, notes, and planning artifacts
├── config/                # Environment, deployment, and SEO settings
├── scripts/               # Build/deploy/analytics automation
├── tests/                 # Unit + integration + e2e test suites
└── .github/workflows/     # GitHub Actions automations
```

## Quick Start (GitHub Pages)

1. Commit this repository and push it to GitHub.
2. In **Settings → Pages**, choose **Deploy from branch** and pick `main` (or your default) with `/root`.
3. Optionally connect the provided `.github/workflows/deploy.yml` to automate builds.
4. Replace the placeholder `index.html`, CSS, and JS with your real portfolio when ready.

## Roadmap Ideas

- Convert `src/` into a static-site generator (Astro, Next.js static export, Eleventy, etc.).
- Populate `data/` and `content/` from a CMS or simple markdown files.
- Wire scripts in `scripts/` into package.json or PowerShell tasks.
- Expand testing under `tests/` as components appear.

Happy building! 🚀
