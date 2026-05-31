# Overwatch Systems Integrated — Website Reference

Working knowledge for the OSI marketing website. Keep this updated when the structure changes.

- **Repo:** https://github.com/Overwatch-Systems-Integrated-LLC/OSI_site
- **Branch deployed:** `main`
- **Hosting:** GitHub Pages
- **Live domain:** **www.overwatchsi.com** (set by the `CNAME` file — do not delete `CNAME` or the custom domain breaks)
- **Stack:** Static HTML + CSS. No build step, no framework, no JS bundler. Pushing to `main` publishes the site.

---

## 1. Directory structure

```
/                         repo root = site root
├── index.html            Homepage (single-page: hero, services strip, how-it-works, contact, partners, footer)
├── 404.html              GitHub Pages 404 page (3rd-party UIdeck template — SEE KNOWN ISSUES)
├── CNAME                 Custom domain: www.overwatchsi.com  (required for Pages domain)
├── .gitignore            Ignores .DS_Store, node_modules, .vs/
├── css/
│   └── style.css         Partner-badge styles — CURRENTLY ORPHANED (not linked by any page; see KNOWN ISSUES)
├── docs/
│   └── OSI_One_Pager.docx  Sales one-pager (not linked from the site; reference asset)
├── images/               All site images + the partner badge sources
│   ├── Official_Logo.svg       Full logo (nav + footer)
│   ├── IconOnly_Logo.png       Icon-only logo (mobile/compact)
│   ├── favicon.ico / favicon.png
│   ├── cyd_partner.svg         ClaimYourDiscount "Veterans" partner badge (LIVE source of truth)
│   ├── cyd_partner.png         Raster export of the badge (520×300, transparent) for email/PDF use
│   ├── cyd-partner-badge.html  Legacy standalone badge page (unused; safe to remove)
│   ├── axis-authorized-partner.png   Axis partner badge
│   ├── netgear-drive-partner.png     Netgear partner badge
│   ├── Axis_logo.png, Netgear.png, Cisco.png, Siemens.png   Vendor logos
└── pages/                Sub-pages (NOTE the path rules in §2)
    ├── services.html             Services detail page (linked from nav + homepage cards)
    ├── camera-sandbox.html       "Camera Coverage Sandbox" interactive tool (linked as "Sandbox")
    └── OSI_How_It_Works.html     Standalone How-It-Works page — ORPHANED (nothing links to it; see KNOWN ISSUES)
```

> **Local-only note:** the working copy at `D:\OSI\05_Marketing_&_Web\Website_Dev` may also contain a `stock images/` folder. That folder is **not** in the repo — it's a local scratch/asset folder and is not deployed.

---

## 2. Path conventions ⚠️ (most common source of bugs)

Links and asset references are **relative**, and the correct prefix depends on which folder the file lives in. Get this wrong and links 404 silently.

| Reference target | From `index.html` / `404.html` (root) | From a file in `pages/` |
|---|---|---|
| An image | `images/foo.png` | `../images/foo.png` |
| The homepage | `index.html` (or `#home`) | `../index.html` |
| A homepage anchor | `#how-it-works`, `#contact` | `../index.html#how-it-works`, `../index.html#contact` |
| The services page | `pages/services.html` | `services.html` (same folder) |
| The sandbox page | `pages/camera-sandbox.html` | `camera-sandbox.html` (same folder) |

**The classic mistake:** moving/authoring a file in `pages/` but linking the homepage as `index.html#contact`. From inside `pages/` that resolves to `pages/index.html#contact`, which does not exist. It must be `../index.html#contact`. This previously broke the "How It Works" nav tab and all six "Request a Consultation" buttons on the services page.

**Homepage anchor IDs that pages link back to:** `#home`, `#how-it-works`, `#contact` (all `<section id="…">` in `index.html`).

---

## 3. Page-by-page reference

### `index.html` (homepage, ~1100 lines)
Single-page layout. All CSS is in **one inline `<style>` block** (no external stylesheet). Sections in order:

1. **NAV** (`<nav>`) — links: Home `#home`, Services `pages/services.html`, How It Works `#how-it-works`, Sandbox `pages/camera-sandbox.html`, Contact Us `#contact` (CTA). Mobile hamburger toggles `.nav-links.open`.
2. **HERO** (`#home`) — headline + primary CTAs ("How It Works" → `#how-it-works`, "Contact" → `#contact`).
3. **SERVICES strip** — 6 cards linking to anchors on the services page:
   - `pages/services.html#security-systems`
   - `pages/services.html#hazardous-environment`
   - `pages/services.html#network-infrastructure`
   - `pages/services.html#system-integration`
   - `pages/services.html#monitoring`
   - `pages/services.html#maintenance`
4. **HOW IT WORKS** (`#how-it-works`) — 5 numbered steps (Free Consultation → Site Assessment → Custom Proposal → Professional Install → Ongoing Support). Uses `.hiw-*` classes.
5. **CONTACT** (`#contact`)
   - Email: **sales@overwatchsi.com** (`mailto:`)
   - Phone: **(256) 240-0681** (`tel:+12562400681`)
   - Form posts to **Formspree**: `https://formspree.io/f/mzdjepoo` (`method="POST"`). Fields: name, email, phone, message. To change where submissions go, update the Formspree form ID.
6. **PARTNERS** (`.partners-section`) — 3 badges (see §5).
7. **FOOTER** — logo + standard footer.

### `pages/services.html` (~667 lines)
Detail page with its own inline `<style>`. Six service categories, each an `<section id="…">` matching the homepage card anchors above:
`security-systems`, `hazardous-environment`, `network-infrastructure`, `system-integration`, `monitoring`, `maintenance` — plus a `sandbox` section.
Each category has a **"Request a Consultation →"** button → `../index.html#contact`. Nav mirrors the homepage (Home `../index.html`, Services `services.html` (active), How It Works `../index.html#how-it-works`, Sandbox `camera-sandbox.html`, Contact `../index.html#contact`).

### `pages/camera-sandbox.html` (~1500 lines, "Camera Coverage Sandbox")
Interactive **free planning tool**: visitor uploads/uses a facility map and places Axis cameras to visualize field-of-view coverage, overlap, and blind spots. Entirely client-side (inline CSS + JS, canvas/SVG).
- **Email gate:** `<form id="gate-form">` collects name + email before revealing the tool. Privacy note links to `../index.html#contact`.
- "← Back to OSI" button (`.sb-nav-back`) currently points to `services.html` (the Services page), not the homepage.

### `pages/OSI_How_It_Works.html` (~491 lines) — ORPHANED
A standalone "How It Works" page. **Nothing links to it** — the nav "How It Works" goes to the homepage section `#how-it-works` instead. Either wire it up or remove it (see KNOWN ISSUES).

### `404.html` — 3rd-party template
Title is "Play | Open source Project by UIdeck". Served by GitHub Pages on unknown URLs. See KNOWN ISSUES — it references an `assets/` folder that isn't in the repo.

---

## 4. Brand system

**CSS custom properties** (defined in `index.html` `:root`):

| Variable | Hex | Use |
|---|---|---|
| `--navy` | `#18487a` | deep brand blue |
| `--cyan` | `#26aee4` | **primary accent** (links, CTAs, highlights) |
| `--dark` | `#090d12` | page background (darkest) |
| `--dark2` | `#0e1520` | section background |
| `--dark3` | `#141e2e` | cards / raised surfaces |
| `--steel` | `#b8c8d8` | secondary text |
| `--muted` | `#5a7a96` | muted text |
| `--white` | `#eaf2f8` | near-white text |

**Fonts (Google Fonts):** `Rajdhani` (400/500/600/700 — headings/display) and `Inter` (300/400/500 — body). Loaded per-page via `<link>` to fonts.googleapis.com.

**Badge palette** (CYD partner badge): olive green body + gold (`#d4af37` / `#c8971e` / `#e8c84a`) accents.

---

## 5. Partner badge system

The homepage Partners section shows three linked badges:

| Partner | Image | Links to |
|---|---|---|
| ClaimYourDiscount (Veterans badge) | `images/cyd_partner.svg` | https://www.claimyourdiscount.com |
| Axis | `images/axis-authorized-partner.png` | https://www.axis.com |
| Netgear | `images/netgear-drive-partner.png` | https://www.netgear.com |

- **`cyd_partner.svg` is the source of truth** for the CYD badge (a heraldic "patriot shield" with a green body, gold border, "OFFICIAL PARTNER" chief, "Claim/Your/Discount" text, and a draped **"VETERANS"** ribbon). `cyd_partner.png` is a transparent raster export for places SVG isn't supported (email signatures, PDFs).
- Hover/scale behavior is handled by `.partner-badge a:hover` in the homepage's inline CSS. Sizing is via inline `style` on each `<img>` (CYD `height:100px`, vendor badges `height:64px`).
- `images/cyd-partner-badge.html` is a **legacy** standalone badge page, no longer used.

---

## 6. Making common changes

- **Edit copy/sections:** edit the relevant `*.html` directly; CSS is inline in each page's `<style>` block.
- **Add an image:** drop it in `images/`, reference as `images/x` (root) or `../images/x` (from `pages/`).
- **Add a sub-page:** put it in `pages/`, and use the §2 path rules (remember `../` for root assets and homepage anchors).
- **Change where the contact form goes:** update the Formspree form ID in `index.html` (`action="https://formspree.io/f/…"`).
- **Swap the CYD badge art:** replace `images/cyd_partner.svg` (and re-export `cyd_partner.png` if you need the raster).

---

## 7. Deployment workflow

1. Make edits (locally or via a clone of the repo).
2. Commit and push to **`main`**.
3. GitHub Pages rebuilds automatically (usually under a minute) and serves at **www.overwatchsi.com**.

There is no staging environment — `main` is production. Verify links after structural changes (especially anything in `pages/`, per §2).

---

## 8. Known issues / cleanup candidates

1. **`404.html` is broken/unstyled.** It's a UIdeck template that references an `assets/` folder (`assets/css/bootstrap.min.css`, `assets/css/ud-styles.css`, `assets/images/favicon.svg`, etc.) that **does not exist in the repo**, and its nav links to non-existent pages (`about.html`, `pricing.html`, `contact.html`, `blog.html`). Result: the live 404 page renders unstyled with dead links. **Recommend** replacing it with a small branded 404 that links back to `index.html`.
2. **`css/style.css` is orphaned.** No HTML file links it; `index.html` defines its own `.partner-badge` styles inline. Either wire it in or delete it to avoid confusion. (Note its `.partner-badge svg { height:220px }` / `iframe` rules reflect an older badge approach.)
3. **`pages/OSI_How_It_Works.html` is orphaned.** Nothing links to it; the nav "How It Works" uses the homepage `#how-it-works` section. Decide whether to link it or remove it.
4. **"← Back to OSI" on the sandbox** points to `services.html`, not the homepage — confirm that's intended.
5. **No `<meta name="description">`** on the homepage — worth adding for SEO.
6. **Inline CSS per page** means shared styles (nav, fonts, colors) are duplicated across `index.html`, `services.html`, and `camera-sandbox.html`. If you change brand colors, update each page (or migrate shared rules into the existing `css/style.css` and link it everywhere).

---

*Last updated by Claude Code. When the structure changes, update the relevant section above.*
