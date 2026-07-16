# Contributing to SmartHarvest AI

Thanks for your interest in improving this project.

## Getting started
1. Fork the repository and clone your fork.
2. This is a static site — no build step. Open `index.html` directly, or serve the folder with any static server (e.g. `python -m http.server`) so `fetch()` calls to `data/*.json` resolve correctly.
3. For backend changes, see `backend/README` (or `AWS_DEPLOYMENT.md`) in the main ML repository.

## Code style
- Vanilla HTML5 / CSS3 / JavaScript only — no frameworks or build tooling.
- Keep `js/config.js` as the single point of backend configuration.
- New charts should go in `js/charts.js` as dependency-free SVG renderers, consistent with the existing functions.

## Pull requests
1. Create a feature branch: `git checkout -b feature/your-feature`.
2. Keep PRs focused — one feature or fix per PR.
3. Test on desktop and mobile viewport widths before submitting.
4. Fill out the PR template with a summary and screenshots for any visual change.

## Reporting issues
Use the issue templates in `.github/ISSUE_TEMPLATE/` — include browser, viewport size, and steps to reproduce.
