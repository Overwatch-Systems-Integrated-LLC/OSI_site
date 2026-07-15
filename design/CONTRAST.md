# OSI Design Tokens — Contrast Verification (WCAG 2.2)

Verified 2026-07-14 (Phase A). Ratios computed with the WCAG relative-luminance formula.
AA requires 4.5:1 for normal text, 3:1 for large text (>=24px, or >=18.66px bold).
Accent (Signal Amber) is intentionally NOT text-safe on paper — it is a signal only.

## Light theme (default site identity)

| Pair | Ratio | Verdict |
|---|---|---|
| Body: ink `#0F1722` on paper `#F3F5F8` | 16.49:1 | AAA |
| Muted: ink-2 `#33414F` on paper | 9.57:1 | AAA |
| Brand: navy `#18487A` on paper | 8.56:1 | AAA |
| Accent-as-text `#E8A317` on paper | 1.99:1 | FAIL — by design; signal only, never text |
| Primary button: ink on amber `#E8A317` | 8.30:1 | AAA |
| Navy button: white on navy `#18487A` | 9.35:1 | AAA |

## Dark theme (control-room, tool canvases)

| Pair | Ratio | Verdict |
|---|---|---|
| Body: ink `#EAF2F8` on paper `#0B1420` | 16.35:1 | AAA |
| Muted: ink-2 `#9DB2C4` on paper | 8.46:1 | AAA |
| Brand: navy `#4F8CC4` on paper | 5.18:1 | AA (normal) |
| Accent-as-text `#E8A317` on paper | 8.53:1 | AAA — amber IS text-safe on dark |

## Rules that fall out of this

- Amber never carries reading text on paper. Use it for marks, underlines, the one primary button (ink on amber), and small labels. On dark, amber is text-safe.
- Dark navy is lifted to `#4F8CC4` so `--brand` carries small text in both themes.
- All reading text (ink, muted, navy links) clears AA, most clears AAA.
- Focus ring is amber, 2px, 2px offset, applied once via `:focus-visible` in `tokens.css`.
