# Gigafly — Static Website Mirror & Cleanup

Overview
-
Gigafly is a local mirror and curated cleanup of a static website export (HTML/CSS/JS) originally built with a site-builder. The workspace contains the site's HTML pages, embedded structured data (JSON-LD), static assets (JS/CSS/images), and helper scripts used to extract, fix, and standardize markup and styling.

Purpose
-
This repository is used to:
- Review and adjust exported site content for consistency (visible text and structured metadata).
- Diagnose and fix client-side navigation/transition behavior (Barba.js + GSAP) when the export was running as a single-page-like site.
- Maintain a cleaned, self-hostable copy of the site for local previews, QA, and iterative fixes.

What you'll find
-
- Top-level HTML pages: `index.html`, `about.html`, `contact.html` (and their cleaned variants).
- `assets/` folder with third-party and local JS/CSS resources.
- Multiple utility scripts (`fix_pages.py`, `fix_html.py`, `inspect_structure.py`, etc.) used to automate content fixes and to extract/repair site artifacts.
- JSON-LD structured data blocks embedded directly inside pages.

Quick features
-
- Content-first edits: changes aim to only update textual content and JSON-LD values while preserving markup, classes, and layout.
- Careful edits to maintain site-builder export structure and avoid breaking scripts or transitions.
- Notes and tooling to assist previewing the site locally using a simple static server.

Local preview
-
To preview the site locally (works on Windows/macOS/Linux):

1. From the repository root run a simple static server. Example using Python 3:

```powershell
python -m http.server 8000
```

2. Open your browser to `http://localhost:8000` and navigate to the pages (`index.html`, `about.html`, `contact.html`).

Notes about transitions
-
The site uses client-side page-transition tooling (Barba.js + GSAP) in its exported JS. If you run into navigation issues (double-clicks, blank content during transitions), a temporary approach for debugging is disabling the transition JS in `assets/` or serving the pages and appending `?no-transitions=1` (if a toggle exists) while you test content edits.

Editing guidelines
-
- When making content-only updates follow these rules:
	- Change only the inner text inside existing tags. Do not add/remove attributes, classes, or structural HTML unless explicitly required.
	- Update both visible copy and the JSON-LD `description` / `name` fields together so search engines and rich snippets remain consistent.
	- Preserve original whitespace and markup structure to keep CSS and scripts working as intended.

Common tasks & scripts
-
- `fix_pages.py`, `fix_pages_final.py`, `fix_pages_barba.py` — utility scripts used during cleaning and to coordinate fixes for transition logic.
- `inspect_structure.py` — inspects exported HTML structure to assist automated edits.
- `extract_css.py` — helps pull and consolidate CSS from exported assets.

Repository structure (high level)
-
- `index.html` — homepage
- `about.html` — about page (contains JSON-LD)
- `contact.html` — contact page (contains form success block and JSON-LD)
- `assets/` — JS/CSS/third-party files
- `*.py` — helper scripts used to find/replace and fix exported content

Recent edits
-
This copy has had targeted content updates applied (example: replacing a jet description paragraph with new marketing copy and renaming visible product headings). These edits were performed in-place across `index.html`, `about.html`, and `contact.html` and included corresponding JSON-LD updates.

How to contribute
-
1. Create an issue describing the desired change (content, metadata, or behavior).
2. If it is a content change, follow the Editing guidelines above and target only the required files.
3. Run the local server and verify the change in-browser.
4. Optionally, run a repository-wide search for other occurrences to keep copy consistent.

Suggested next steps for maintainers
-
- Run a repo-wide search for brand/product mentions (image alts, backup copies, or other HTML files) before merging copy changes.
- Add a small test harness or checklist for verifying Barba/transition behavior after JS changes.

Contact
-
If you need help with further cleanups, previews, or automation for wide-scale text replacements, open an issue or reach out to the maintainer.

License
-
This repository mirrors site content for local editing and QA. Apply your preferred license or consult the original site's licensing/usage terms before redistributing.
