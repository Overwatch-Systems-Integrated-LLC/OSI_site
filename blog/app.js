/**
 * OSI Blog — app.js
 * Overwatch Systems Integrated | overwatchsi.com
 * Powered by GSAP + Lenis
 */

(function () {
  'use strict';

  /* ── Guard: GSAP must be present ──────────────── */
  const hasGSAP = typeof gsap !== 'undefined';

  /* ═══════════════════════════════════════════════
     1. GSAP — Register ScrollTrigger
  ═══════════════════════════════════════════════ */
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ── Word-split helper (no premium SplitText needed) ── */
  function splitWords(el) {
    if (!el) return [];
    // innerText respects <br> as \n — prevents words from concatenating across line breaks
    const original = (el.innerText || el.textContent).trim();
    const words = original.split(/\s+/).filter(Boolean);
    el.innerHTML = words.map(function (w) {
      return '<span class="gs-word" style="display:inline-block;overflow:hidden;vertical-align:top">'
           + '<span class="gs-word-inner" style="display:inline-block">' + w + '</span>'
           + '</span>';
    }).join(' ');
    return Array.from(el.querySelectorAll('.gs-word-inner'));
  }

  /* ═══════════════════════════════════════════════
     3. PAGE-LOAD ANIMATIONS
  ═══════════════════════════════════════════════ */
  if (hasGSAP) {

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* Header */
    tl.from('.site-logo-img', { duration: 0.5, scale: 0.85, opacity: 0, ease: 'back.out(1.4)' }, 0)
      .from('.logo-text',     { duration: 0.5, x: -12, opacity: 0 }, 0.1)
      .from('.nav-link, .nav-dropdown-toggle', {
        duration: 0.45, y: -8, opacity: 0, stagger: 0.05
      }, 0.15)
      .from('.btn-nav', { duration: 0.4, opacity: 0, x: 8 }, 0.35);

    /* Hero eyebrow line */
    tl.from('.page-hero-eyebrow', { duration: 0.6, y: 16, opacity: 0 }, 0.2);

    /* Hero title — preserve <br> line breaks; animate the block as one unit */
    const heroTitle = document.querySelector('.page-hero-title');
    if (heroTitle) {
      tl.from(heroTitle, {
        duration: 0.75,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
      }, 0.35);
    }

    /* Article title — same word-reveal treatment */
    const articleTitle = document.querySelector('.article-title');
    if (articleTitle) {
      const aWords = splitWords(articleTitle);
      tl.from(aWords, {
        duration: 0.6,
        y: '105%',
        opacity: 0,
        stagger: 0.04,
        ease: 'power4.out',
      }, 0.3);
      tl.from('.article-header .cat-badge', { duration: 0.4, opacity: 0, y: 10 }, 0.2);
    }

    /* Hero desc + stats */
    tl.from('.page-hero-desc', { duration: 0.6, y: 18, opacity: 0 }, 0.55);
    tl.from('.page-hero-stats > div', {
      duration: 0.5, y: 14, opacity: 0, stagger: 0.08
    }, 0.7);

    /* Category hero badge */
    tl.from('.cat-badge:not(.card-body .cat-badge)', {
      duration: 0.4, opacity: 0, x: -8
    }, 0.25);

    /* Article breadcrumb */
    tl.from('.breadcrumb', { duration: 0.4, opacity: 0, y: -6 }, 0.1);

    /* Article meta row */
    tl.from('.article-meta-row', { duration: 0.5, opacity: 0, y: 10 }, 0.5);
    tl.from('.article-hero-image', { duration: 0.8, opacity: 0, scale: 0.99 }, 0.55);

    /* Featured article */
    tl.from('.featured-article', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, 0.5);

    /* Section headers on homepage */
    const sectionHeaders = document.querySelectorAll('.section-header');
    if (sectionHeaders.length) {
      tl.from(sectionHeaders, { duration: 0.5, opacity: 0, y: 14 }, 0.5);
    }

  }

  /* ═══════════════════════════════════════════════
     4. SCROLL-TRIGGERED ANIMATIONS
  ═══════════════════════════════════════════════ */
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') {

    /* ── Article cards stagger ───────────────── */
    const cardGrids = document.querySelectorAll('.article-grid');
    cardGrids.forEach(function (grid) {
      const cards = Array.from(grid.querySelectorAll('.article-card'));
      const chunkSize = 3;

      for (let i = 0; i < cards.length; i += chunkSize) {
        const row = cards.slice(i, i + chunkSize);
        gsap.from(row, {
          scrollTrigger: {
            trigger: row[0],
            start: 'top 88%',
            once: true,
          },
          duration: 0.6,
          y: 32,
          opacity: 0,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    });

    /* ── Sidebar widgets ─────────────────────── */
    gsap.utils.toArray('.sidebar-widget').forEach(function (widget, i) {
      gsap.from(widget, {
        scrollTrigger: { trigger: widget, start: 'top 85%', once: true },
        duration: 0.55,
        y: 22,
        opacity: 0,
        ease: 'power2.out',
        delay: i * 0.07,
      });
    });

    /* ── Article body — paragraph fade-up ────── */
    gsap.utils.toArray('.article-body p, .article-body h2, .article-body h3, .article-body blockquote, .callout').forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        duration: 0.5,
        y: 14,
        opacity: 0,
        ease: 'power2.out',
      });
    });

    /* ── Article newsletter strip ────────────── */
    gsap.from('.article-newsletter-strip', {
      scrollTrigger: { trigger: '.article-newsletter-strip', start: 'top 85%', once: true },
      duration: 0.65,
      y: 24,
      opacity: 0,
      ease: 'power3.out',
    });

    /* ── Article CTA ─────────────────────────── */
    gsap.from('.article-cta', {
      scrollTrigger: { trigger: '.article-cta', start: 'top 82%', once: true },
      duration: 0.7,
      y: 28,
      opacity: 0,
      ease: 'power3.out',
    });

    /* ── Tags ────────────────────────────────── */
    gsap.from('.article-tags .tag', {
      scrollTrigger: { trigger: '.article-tags', start: 'top 90%', once: true },
      duration: 0.4,
      y: 10,
      opacity: 0,
      stagger: 0.04,
      ease: 'power2.out',
    });

    /* ── Related articles ────────────────────── */
    gsap.from('.related-section .article-card', {
      scrollTrigger: { trigger: '.related-section', start: 'top 80%', once: true },
      duration: 0.6,
      y: 28,
      opacity: 0,
      stagger: 0.12,
      ease: 'power2.out',
    });

    /* ── Filter tabs ─────────────────────────── */
    gsap.from('.filter-tab', {
      scrollTrigger: { trigger: '.filter-tabs', start: 'top 85%', once: true },
      duration: 0.4,
      y: 10,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.out',
    });

    /* ── Category nav strip ──────────────────── */
    gsap.from('.filter-tabs + div', {
      scrollTrigger: { trigger: '.filter-tabs', start: 'top 80%', once: true },
      duration: 0.4,
      opacity: 0,
      ease: 'power1.out',
    });

    /* ── CTA banner ──────────────────────────── */
    const ctaBanner = document.querySelector('.cta-banner');
    if (ctaBanner) {
      const ctaTl = gsap.timeline({
        scrollTrigger: { trigger: ctaBanner, start: 'top 78%', once: true }
      });
      ctaTl.from('.cta-eyebrow',       { duration: 0.4, y: 14, opacity: 0 }, 0)
           .from('.cta-banner-title',   { duration: 0.6, y: 22, opacity: 0 }, 0.1)
           .from('.cta-banner-sub',     { duration: 0.5, y: 14, opacity: 0 }, 0.25)
           .from('.cta-banner-actions', { duration: 0.5, y: 12, opacity: 0 }, 0.38);
    }

    /* ── Footer columns ──────────────────────── */
    gsap.from('.footer-grid > div', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 90%', once: true },
      duration: 0.55,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
    });

  }

  /* ═══════════════════════════════════════════════
     5. READING PROGRESS BAR
  ═══════════════════════════════════════════════ */
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    function updateProgress() {
      const article = document.querySelector('.article-body');
      if (!article) return;
      const scrollTop  = window.scrollY;
      const docHeight  = article.offsetTop + article.offsetHeight - window.innerHeight;
      const progress   = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = progress + '%';
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  /* ═══════════════════════════════════════════════
     6. STICKY HEADER
  ═══════════════════════════════════════════════ */
  const header = document.querySelector('.site-header');
  if (header) {
    function onScroll() {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ═══════════════════════════════════════════════
     7. MOBILE NAVIGATION
  ═══════════════════════════════════════════════ */
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', function () {
      const isOpen = mobileBtn.classList.toggle('open');
      mobileNav.style.display = isOpen ? 'flex' : 'none';
      mobileNav.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      mobileBtn.setAttribute('aria-expanded', String(isOpen));

      if (hasGSAP && isOpen) {
        gsap.from('.mobile-nav-link', {
          duration: 0.35,
          x: 24,
          opacity: 0,
          stagger: 0.06,
          ease: 'power2.out',
        });
      }
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        mobileNav.style.display = 'none';
        document.body.style.overflow = '';
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ═══════════════════════════════════════════════
     8. CATEGORIES DROPDOWN
  ═══════════════════════════════════════════════ */
  const dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    const menu   = dropdown.querySelector('.dropdown-menu');

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (hasGSAP && isOpen && menu) {
        gsap.from(menu.querySelectorAll('.dropdown-item'), {
          duration: 0.25, y: -6, opacity: 0, stagger: 0.04, ease: 'power2.out',
        });
      }
    });

    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        dropdown.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ═══════════════════════════════════════════════
     9. CLIENT-SIDE SEARCH
  ═══════════════════════════════════════════════ */
  const searchInput = document.getElementById('search-input');
  const articleCards = document.querySelectorAll('.article-card[data-title]');

  if (searchInput && articleCards.length) {
    function runSearch(query) {
      const q = query.toLowerCase().trim();
      let visible = 0;

      articleCards.forEach(function (card) {
        const title    = (card.dataset.title    || '').toLowerCase();
        const category = (card.dataset.category || '').toLowerCase();
        const tags     = (card.dataset.tags     || '').toLowerCase();
        const match    = !q || title.includes(q) || category.includes(q) || tags.includes(q);

        if (match) {
          card.style.display = '';
          visible++;
          if (hasGSAP && q) {
            gsap.fromTo(card,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
            );
          }
        } else {
          card.style.display = 'none';
        }
      });

      let noResults = document.getElementById('no-results-msg');
      if (!q) { if (noResults) noResults.remove(); return; }

      if (visible === 0) {
        if (!noResults) {
          noResults = document.createElement('p');
          noResults.id = 'no-results-msg';
          noResults.style.cssText = 'color:var(--text-muted);font-size:.9rem;padding:2rem 0;grid-column:1/-1;';
          noResults.textContent = 'No articles found for "' + query + '"';
          const grid = document.querySelector('.article-grid');
          if (grid) grid.appendChild(noResults);
        }
      } else if (noResults) {
        noResults.remove();
      }
    }

    searchInput.addEventListener('input', function () { runSearch(this.value); });

    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        runSearch(searchInput.value);
      });
    }
  }

  /* ═══════════════════════════════════════════════
     10. CATEGORY FILTER TABS
  ═══════════════════════════════════════════════ */
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length && articleCards.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        const filter = tab.dataset.filter;
        const matched = [];

        articleCards.forEach(function (card) {
          const show = filter === 'all' || (card.dataset.category || '') === filter;
          card.style.display = show ? '' : 'none';
          if (show) matched.push(card);
        });

        if (hasGSAP && matched.length) {
          gsap.from(matched, {
            duration: 0.35, y: 12, opacity: 0, stagger: 0.06, ease: 'power2.out',
          });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════
     11. NEWSLETTER FORM
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput || !emailInput.value.trim()) return;
      const email = emailInput.value.trim();

      const successEl = form.parentElement.querySelector('.newsletter-success');

      // Capture the subscriber in HubSpot (Forms Submission API via js/hubspot.js).
      // Fire-and-forget: the reader sees success regardless of network result.
      if (window.OSIHubSpot) {
        window.OSIHubSpot.submit('newsletter', { email: email }).catch(function () {});
      }

      // Conversion event (consent-gated by Consent Mode v2; no-op if gtag absent).
      if (window.gtag) {
        window.gtag('event', 'generate_lead', { method: 'newsletter', source: 'blog' });
      }

      if (hasGSAP && successEl) {
        gsap.to(form, {
          duration: 0.25, opacity: 0, y: -8, ease: 'power2.in',
          onComplete: function () {
            form.style.display = 'none';
            successEl.style.display = 'flex';
            gsap.from(successEl, { duration: 0.4, opacity: 0, y: 8, ease: 'power2.out' });
          }
        });
      } else {
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'flex';
      }
    });
  });

  /* ═══════════════════════════════════════════════
     12. SOCIAL SHARE BUTTONS
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.share-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const platform = btn.dataset.platform;
      const url      = encodeURIComponent(window.location.href);
      const title    = encodeURIComponent(document.title);
      let shareUrl   = '';

      if (platform === 'linkedin') {
        shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
      } else if (platform === 'facebook') {
        shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
      } else if (platform === 'email') {
        shareUrl = 'mailto:?subject=' + title + '&body=Thought%20you%20might%20find%20this%20useful%3A%20' + url;
      } else if (platform === 'copy') {
        navigator.clipboard.writeText(window.location.href).then(function () {
          const orig = btn.innerHTML;
          btn.textContent = '✓';
          btn.style.color = 'var(--cat-ai-sec)';
          btn.style.borderColor = 'var(--cat-ai-sec)';
          if (hasGSAP) gsap.from(btn, { duration: 0.3, scale: 1.2, ease: 'back.out(2)' });
          setTimeout(function () {
            btn.innerHTML = orig;
            btn.style.color = '';
            btn.style.borderColor = '';
          }, 1800);
        });
        return;
      }

      if (shareUrl) window.open(shareUrl, '_blank', 'noopener,width=600,height=500');
    });
  });

  /* ═══════════════════════════════════════════════
     13. BACK TO TOP
  ═══════════════════════════════════════════════ */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    function toggleBackToTop() {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (hasGSAP) gsap.from(backToTop, { duration: 0.3, scale: 0.85, ease: 'back.out(2)' });
    });
  }

  /* ═══════════════════════════════════════════════
     14. SMOOTH ANCHOR LINKS (Lenis-aware)
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 64;

      window.scrollTo({ top: target.offsetTop - headerH - 16, behavior: 'smooth' });
    });
  });

  /* ═══════════════════════════════════════════════
     15. CARD HOVER MAGNETIC EFFECT (subtle)
  ═══════════════════════════════════════════════ */
  if (hasGSAP && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.article-card').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        gsap.to(card, { duration: 0.3, scale: 1.015, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, { duration: 0.4, scale: 1, y: 0, ease: 'power2.out' });
      });
    });
  }

  /* ═══════════════════════════════════════════════
     16. PAGINATION (demo)
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.page-btn').forEach(function (btn) {
    if (btn.classList.contains('arrow')) return;
    btn.addEventListener('click', function () {
      document.querySelectorAll('.page-btn:not(.arrow)').forEach(function (b) {
        b.classList.remove('active');
        b.removeAttribute('aria-current');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-current', 'page');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

})();
