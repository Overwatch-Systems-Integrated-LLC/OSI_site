# Overwatch Systems Integrated — Website Reference

Working knowledge for the OSI company website. Keep this updated when the structure changes.

- **Repo:** https://github.com/Overwatch-Systems-Integrated-LLC/OSI_site
- **Reface branch:** `reface/build` (the "As-Built" reface; merges to `main` at deploy, gated on Barry)
- **Deployed branch:** `main`
- **Hosting:** GitHub Pages, published by GitHub Actions (see §7). Custom domain **www.overwatchsi.com** via the `CNAME` file in `public/` — do not delete `CNAME` or the domain breaks.
- **Stack:** **Astro 5** (static output), Node 24. `npm run build` emits static HTML to `dist/`. Shared layout + components + a design-token layer replace the old per-page inline CSS. Two interactive tools and `services.html` remain hand-authored static files served verbatim from `public/`.

> This file describes the **refaced** site (the `reface/build` branch). Until that branch merges to `main` (Phase F), production still serves the previous hand-authored site.

---

## 1. Directory structure

```
/                              repo root
├── astro.config.mjs           Astro config (site URL, static output)
├── package.json               Astro 5 + scripts (dev / build / preview)
├── src/
│   ├── pages/                 route = file (Astro builds these)
│   │   ├── index.astro              Homepage
│   │   ├── blog/index.astro         Blog / Resources index (content-collection list)
│   │   ├── blog/[...slug].astro     Dynamic blog post route
│   │   └── proof/as-built-packet.astro   Proof page: the As-Built Packet
│   ├── layouts/
│   │   ├── Base.astro               <head> (meta/OG/canonical, GA4 + Consent Mode, fonts), body slot, preserved JS
│   │   └── BlogPost.astro           Article layout + BlogPosting/Breadcrumb JSON-LD
│   ├── components/
│   │   ├── Nav.astro                Shared nav (gear logo + wordmark image)
│   │   ├── Footer.astro             NAP (city+state only) + partner badges
│   │   └── CoverageWedge.astro      Hero FOV/DORI coverage-wedge SVG
│   ├── content/
│   │   ├── blog/*.md                9 posts (Astro content collection)
│   │   └── (config)                 content.config.ts defines the blog schema
│   └── styles/
│       ├── tokens.css               Design tokens (single source of truth)
│       └── global.css               Shared element + component layer
├── public/                    copied to dist/ verbatim (not processed by Astro)
│   ├── CNAME                        Custom domain (required)
│   ├── .nojekyll                    Stops GitHub Pages' Jekyll from stripping _astro/
│   ├── robots.txt, sitemap.xml
│   ├── 404.html                     Branded As-Built 404 (static)
│   ├── pages/
│   │   ├── services.html            Services detail page (static, re-themed in place)
│   │   ├── camera-sandbox.html      "Camera Coverage Sandbox" tool (static, dark control-room)
│   │   └── pixels-on-target.html    "Pixels on Target" calculator (static, dark control-room)
│   ├── js/
│   │   ├── consent.js               Cookie consent / Consent Mode v2 (self-injecting, every page)
│   │   ├── assistant.js             "Ask OSI" assistant widget (self-injecting, every page)
│   │   ├── hubspot.js               HubSpot Forms API helper (portal + 3 form GUIDs)
│   │   └── camera-visibility/       Shared engine BOTH tools depend on (engine/cameras/render/app)
│   ├── css/style.css                Legacy partner-badge styles (mostly superseded)
│   └── images/                      Logos, wordmarks, favicon, partner badges, og-image, tool assets
│       ├── IconOnly_Logo.png              Gear mark (nav logo, kept)
│       ├── wordmark.png                   Wordmark art, black (light pages)
│       ├── wordmark-light.png             Wordmark art, white + #4F8CC4 (dark pages)
│       ├── favicon.png / favicon.ico      OSI gear favicon (tab icon)
│       ├── og-image.png                   1200x630 social preview
│       ├── axis-authorized-partner.png / netgear-drive-partner.png / cyd_partner.svg
│       └── reference-face.jpg             Camera-sandbox demo asset
└── .github/workflows/deploy.yml   astro build -> actions/deploy-pages (publishes dist/)
```

---

## 2. Information architecture / URLs

All previous indexed URLs are preserved (no redirects needed). Live URLs:

| URL | Source | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Homepage |
| `/pages/services.html` | `public/pages/services.html` | Static; 7 section IDs preserved |
| `/pages/camera-sandbox.html` | `public/pages/camera-sandbox.html` | Static tool (dark) |
| `/pages/pixels-on-target.html` | `public/pages/pixels-on-target.html` | Static tool (dark) |
| `/blog/` | `src/pages/blog/index.astro` | Nav label "Resources"; URL stays `/blog/` |
| `/blog/<slug>/` | `src/pages/blog/[...slug].astro` | 9 posts, permalinks preserved |
| `/proof/as-built-packet/` | `src/pages/proof/as-built-packet.astro` | New proof page (Phase D) |
| 404 | `public/404.html` | Branded As-Built, `noindex` |

**Services section IDs** (homepage links into these): `security-systems`, `hazardous-environment`, `network-infrastructure`, `system-integration`, `monitoring`, `maintenance`, plus `sandbox`.

**Homepage anchors** other pages link to: `#tools`, `#contact`.

Path note for the static files in `public/pages/`: they reference assets root-absolute (`/images/...`, `/js/...`) so they resolve at any URL depth.

---

## 3. Design system ("As-Built", Direction B)

Single source of truth: `src/styles/tokens.css` (framework-neutral CSS custom properties), consumed by `global.css` and mirrored inline in the static files.

- **Accent:** Signal Amber `#E8A317` — a signal only (marks, underlines, one primary button, small labels). Never body text on paper (fails contrast).
- **Palette (light default):** paper `#F3F5F8`, ink `#0F1722`, OSI navy `#18487A`, navy-deep `#0C2947`.
- **Dark "control-room" theme** (`[data-theme="dark"]`, navy lifted to `#4F8CC4`): the two interactive tool canvases and the one homepage proof band.
- **Type:** Archivo Expanded (display), IBM Plex Sans (body/UI), IBM Plex Mono (eyebrows/data). Loaded via Google Fonts in `Base.astro` and each static file's `<head>`.
- **Logo lockup:** gear `IconOnly_Logo.png` + wordmark image (`wordmark.png` on light, `wordmark-light.png` on dark), flex-centered.
- **Accessibility:** WCAG 2.2 AA. Contrast verified in `design/CONTRAST.md`; Lighthouse accessibility = 100 on homepage / services / proof / tool pages.

---

## 4. Preserved integrations (do not break)

- **GA4 + Consent Mode v2:** measurement id `G-44PPPMTQKS`; the inline Consent-Mode-default + gtag bootstrap lives in every page `<head>` (in `Base.astro` and each static file), plus the banner in `public/js/consent.js`.
- **HubSpot lead capture** (`public/js/hubspot.js`, portal `245760841`): 3 form GUIDs (`contact`, `newsletter`, `sandbox`). Contact form on homepage; newsletter on blog index; sandbox gate in the camera-sandbox tool.
- **AI assistant widget** (`public/js/assistant.js`): self-injecting "Ask OSI" launcher. Chat brain is the Cloudflare Worker `osi-assistant-worker` at `https://osi-assistant.overwatchsi.workers.dev` (holds the Anthropic key + OSI system prompt). No worker changes without Barry.
- **Camera-visibility engine** (`public/js/camera-visibility/`): shared by both tools; do not alter tool logic in the reface.
- `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`.

---

## 5. Structured data (JSON-LD)

- Homepage: `LocalBusiness` (`#business` entity, city+state NAP, 6 areaServed) + `WebSite`.
- Services (static): `BreadcrumbList` + `Service`.
- Both tools (static): `WebApplication` + `BreadcrumbList`.
- Blog posts: `BlogPosting` + `BreadcrumbList` (via `BlogPost.astro`).
- Proof page: `BreadcrumbList`.

All blocks validate (parse as JSON) in the build; see the Phase E audit.

---

## 6. Making common changes

- **Homepage / blog / proof pages:** edit the `.astro` files; styles come from `tokens.css` + `global.css` (or a scoped `<style>` in the page).
- **Blog post:** add a `.md` file in `src/content/blog/` matching the content schema; the route + index + JSON-LD are generated.
- **Services / tools / 404:** edit the static files in `public/` directly (each carries its own inline `<style>` mirroring the tokens).
- **Design tokens:** change `src/styles/tokens.css`; Astro pages inherit automatically, static files mirror the same variables.
- **Copy / positioning:** SMO's turf (marketing). CTO owns structure/design/AEO.
- **Sitemap:** `public/sitemap.xml` is hand-maintained; add new URLs when pages are added.

---

## 7. Deployment workflow (gated)

1. `npm run build` produces `dist/`.
2. `.github/workflows/deploy.yml` runs `astro build` then `actions/deploy-pages` to publish `dist/`.
3. **One-time repo setting (Barry):** GitHub Pages source must be changed from "Deploy from a branch" to **"GitHub Actions"**.
4. Merge `reface/build` to `main` and push (both gated on Barry, Rules 1/3).

`main` is production; there is no staging. Verify the build serves assets before switching the production Pages source.

---

## 8. Notes / resolved items

- The old 404 (UIdeck template) is replaced by a branded As-Built 404.
- The homepage carries a meta description + full per-page meta/OG/canonical (via `Base.astro`); the old "no meta description" issue is resolved.
- Per-page inline CSS duplication is resolved for Astro pages (shared `global.css`); the three static files still carry inline CSS by design (to protect tool logic and preserve URLs).
- `public/css/style.css` is legacy and largely unreferenced.
- Veteran-owned claim stays off the entire site (VET hold). The CYD partner badge is kept (discount partnership, not a veteran-owned status claim).

---

*Last updated by Claude Code (CTO) during the As-Built reface, Phase E. When the structure changes, update the relevant section above.*
