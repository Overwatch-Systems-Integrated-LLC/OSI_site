---
title: "WF05 Astro Smoke Test (Internal - Safe to Delete)"
description: "Internal smoke test verifying the WF05 Astro content-collection rewrite emits a valid src/content/blog/*.md. Not real content; delete after the build confirms."
pubDate: 2026-07-15
category: "Industrial Security"
author: "Barry Fuller"
readingTime: 1
---

This is an internal smoke test used to verify the WF05 Astro content-collection rewrite end to end.

## What this checks

Publishing this draft should commit a single markdown file to src/content/blog/wf05-astro-smoketest.md on main, with YAML frontmatter and a pure-markdown body. Astro should then build the post page and blog card automatically. This content is disposable and should be deleted once the build is confirmed.
