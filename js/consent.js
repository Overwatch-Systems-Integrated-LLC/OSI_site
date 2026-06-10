/* ============================================================================
   OSI Cookie Consent — Google Consent Mode v2 (GDPR/CCPA-aligned)
   Self-contained: injects its own styles + banner + preferences modal.
   Analytics stays denied until the visitor explicitly accepts.
   Reopen later via window.osiOpenConsent() (wire to a "Cookie Settings" link).
   ========================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'osi_consent';
  var dl = (window.dataLayer = window.dataLayer || []);
  // Mirror gtag(): push the raw arguments object onto the dataLayer.
  function gtagConsent() { dl.push(arguments); }

  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function save(analytics) {
    var rec = { analytics: !!analytics, ts: new Date().toISOString(), v: 1 };
    try { localStorage.setItem(STORE_KEY, JSON.stringify(rec)); } catch (e) {}
    return rec;
  }
  function apply(analytics) {
    gtagConsent('consent', 'update', {
      analytics_storage: analytics ? 'granted' : 'denied'
    });
  }

  /* ---- styles -------------------------------------------------------------- */
  function injectStyles() {
    if (document.getElementById('osi-cc-styles')) return;
    var css = [
      '.osi-cc-banner,.osi-cc-modal-overlay{font-family:Inter,system-ui,sans-serif;color:#eaf2f8;box-sizing:border-box}',
      '.osi-cc-banner *,.osi-cc-modal-overlay *{box-sizing:border-box}',
      '.osi-cc-banner{position:fixed;left:0;right:0;bottom:0;z-index:9000;background:rgba(9,13,18,0.97);border-top:1px solid rgba(38,174,228,0.35);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);box-shadow:0 -8px 32px rgba(0,0,0,0.4);transform:translateY(110%);transition:transform .35s ease}',
      '.osi-cc-banner.osi-cc-show{transform:translateY(0)}',
      '.osi-cc-inner{max-width:1280px;margin:0 auto;padding:1.1rem 5%;display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap}',
      '.osi-cc-text{flex:1 1 420px;min-width:280px}',
      '.osi-cc-title{font-family:Rajdhani,sans-serif;font-weight:700;font-size:1rem;letter-spacing:.04em;text-transform:uppercase;color:#fff;margin:0 0 .35rem}',
      '.osi-cc-text p{margin:0;font-size:.82rem;line-height:1.55;color:#b9c7d4}',
      '.osi-cc-text a{color:#26aee4;text-decoration:underline}',
      '.osi-cc-actions{display:flex;gap:.6rem;flex-wrap:wrap;align-items:center}',
      '.osi-cc-btn{font-family:Inter,sans-serif;font-weight:600;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;padding:.6rem 1.2rem;border-radius:4px;border:1px solid transparent;cursor:pointer;transition:all .18s ease;white-space:nowrap}',
      '.osi-cc-btn-accept{background:#26aee4;color:#08121b;border-color:#26aee4}',
      '.osi-cc-btn-accept:hover{background:#48c2f2;border-color:#48c2f2}',
      '.osi-cc-btn-reject{background:rgba(255,255,255,0.08);color:#eaf2f8;border-color:rgba(255,255,255,0.22)}',
      '.osi-cc-btn-reject:hover{background:rgba(255,255,255,0.16)}',
      '.osi-cc-btn-custom{background:transparent;color:#9fb2c2;border-color:transparent;text-decoration:underline}',
      '.osi-cc-btn-custom:hover{color:#26aee4}',
      '.osi-cc-modal-overlay{position:fixed;inset:0;z-index:9100;background:rgba(4,7,11,0.72);display:flex;align-items:center;justify-content:center;padding:1.25rem;opacity:0;visibility:hidden;transition:opacity .25s ease}',
      '.osi-cc-modal-overlay.osi-cc-show{opacity:1;visibility:visible}',
      '.osi-cc-modal{width:100%;max-width:560px;max-height:90vh;overflow:auto;background:#0d1620;border:1px solid rgba(38,174,228,0.28);border-radius:8px;padding:1.6rem}',
      '.osi-cc-modal h2{font-family:Rajdhani,sans-serif;font-weight:700;font-size:1.25rem;letter-spacing:.03em;text-transform:uppercase;color:#fff;margin:0 0 .5rem}',
      '.osi-cc-modal>p{font-size:.84rem;line-height:1.6;color:#b9c7d4;margin:0 0 1.25rem}',
      '.osi-cc-cat{border:1px solid rgba(38,174,228,0.16);border-radius:6px;padding:1rem 1.1rem;margin-bottom:.8rem;background:rgba(255,255,255,0.02)}',
      '.osi-cc-cat-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:.4rem}',
      '.osi-cc-cat-name{font-family:Rajdhani,sans-serif;font-weight:700;font-size:.95rem;letter-spacing:.03em;text-transform:uppercase;color:#eaf2f8}',
      '.osi-cc-cat p{margin:0;font-size:.78rem;line-height:1.5;color:#9fb2c2}',
      '.osi-cc-pill{font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#26aee4}',
      '.osi-cc-switch{position:relative;display:inline-block;width:42px;height:23px;flex-shrink:0}',
      '.osi-cc-switch input{opacity:0;width:0;height:0}',
      '.osi-cc-slider{position:absolute;cursor:pointer;inset:0;background:rgba(255,255,255,0.18);border-radius:23px;transition:.2s}',
      '.osi-cc-slider:before{content:"";position:absolute;height:17px;width:17px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s}',
      '.osi-cc-switch input:checked+.osi-cc-slider{background:#26aee4}',
      '.osi-cc-switch input:checked+.osi-cc-slider:before{transform:translateX(19px)}',
      '.osi-cc-switch input:disabled+.osi-cc-slider{opacity:.55;cursor:not-allowed}',
      '.osi-cc-modal-actions{display:flex;gap:.6rem;flex-wrap:wrap;justify-content:flex-end;margin-top:1.25rem}',
      '@media(max-width:680px){.osi-cc-inner{flex-direction:column;align-items:stretch}.osi-cc-actions{justify-content:stretch}.osi-cc-btn{flex:1 1 auto;text-align:center}.osi-cc-btn-custom{flex-basis:100%}}'
    ].join('');
    var s = document.createElement('style');
    s.id = 'osi-cc-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---- banner -------------------------------------------------------------- */
  var bannerEl = null;
  function buildBanner() {
    if (bannerEl) return bannerEl;
    var b = document.createElement('div');
    b.className = 'osi-cc-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookie consent');
    b.setAttribute('aria-live', 'polite');
    b.innerHTML =
      '<div class="osi-cc-inner">' +
        '<div class="osi-cc-text">' +
          '<p class="osi-cc-title">We value your privacy</p>' +
          '<p>Overwatch Systems Integrated uses cookies and similar technologies. ' +
          'Strictly necessary cookies keep the site working. With your consent we also use ' +
          'Google Analytics to understand how the site is used so we can improve it. We never ' +
          'sell your data. You can accept, reject, or choose which categories to allow.</p>' +
        '</div>' +
        '<div class="osi-cc-actions">' +
          '<button type="button" class="osi-cc-btn osi-cc-btn-custom" data-cc="customize">Customize</button>' +
          '<button type="button" class="osi-cc-btn osi-cc-btn-reject" data-cc="reject">Reject all</button>' +
          '<button type="button" class="osi-cc-btn osi-cc-btn-accept" data-cc="accept">Accept all</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    b.addEventListener('click', function (e) {
      var act = e.target && e.target.getAttribute && e.target.getAttribute('data-cc');
      if (act === 'accept') { setConsent(true); hideBanner(); }
      else if (act === 'reject') { setConsent(false); hideBanner(); }
      else if (act === 'customize') { openModal(); }
    });
    bannerEl = b;
    return b;
  }
  function showBanner() {
    buildBanner();
    requestAnimationFrame(function () { bannerEl.classList.add('osi-cc-show'); });
  }
  function hideBanner() {
    if (bannerEl) bannerEl.classList.remove('osi-cc-show');
  }

  /* ---- preferences modal --------------------------------------------------- */
  var modalEl = null, analyticsToggle = null;
  function buildModal() {
    if (modalEl) return modalEl;
    var o = document.createElement('div');
    o.className = 'osi-cc-modal-overlay';
    o.innerHTML =
      '<div class="osi-cc-modal" role="dialog" aria-modal="true" aria-label="Cookie preferences">' +
        '<h2>Cookie Preferences</h2>' +
        '<p>Choose which categories of cookies and tracking technologies you allow. ' +
        'Your choice is stored on this device and applied on future visits.</p>' +
        '<div class="osi-cc-cat">' +
          '<div class="osi-cc-cat-head">' +
            '<span class="osi-cc-cat-name">Strictly Necessary</span>' +
            '<span class="osi-cc-pill">Always on</span>' +
          '</div>' +
          '<p>Required for the site to function (security, page navigation, remembering ' +
          'your consent choice). These cannot be switched off.</p>' +
        '</div>' +
        '<div class="osi-cc-cat">' +
          '<div class="osi-cc-cat-head">' +
            '<span class="osi-cc-cat-name">Analytics</span>' +
            '<label class="osi-cc-switch"><input type="checkbox" id="osi-cc-analytics"><span class="osi-cc-slider"></span></label>' +
          '</div>' +
          '<p>Google Analytics (G-44PPPMTQKS) collects anonymous usage data such as ' +
          'pages viewed, time on site, and general location, helping us improve the ' +
          'site. No data is collected until you enable this.</p>' +
        '</div>' +
        '<div class="osi-cc-modal-actions">' +
          '<button type="button" class="osi-cc-btn osi-cc-btn-reject" data-cc="reject">Reject all</button>' +
          '<button type="button" class="osi-cc-btn osi-cc-btn-accept" data-cc="save">Save preferences</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(o);
    analyticsToggle = o.querySelector('#osi-cc-analytics');
    o.addEventListener('click', function (e) {
      var act = e.target && e.target.getAttribute && e.target.getAttribute('data-cc');
      if (e.target === o) { closeModal(); return; }
      if (act === 'save') { setConsent(!!analyticsToggle.checked); closeModal(); hideBanner(); }
      else if (act === 'reject') { setConsent(false); closeModal(); hideBanner(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalEl && modalEl.classList.contains('osi-cc-show')) closeModal();
    });
    modalEl = o;
    return o;
  }
  function openModal() {
    buildModal();
    var saved = load();
    analyticsToggle.checked = saved ? !!saved.analytics : false;
    requestAnimationFrame(function () { modalEl.classList.add('osi-cc-show'); });
  }
  function closeModal() {
    if (modalEl) modalEl.classList.remove('osi-cc-show');
  }

  /* ---- decision ------------------------------------------------------------ */
  function setConsent(analytics) {
    save(analytics);
    apply(analytics);
  }

  // Public hook for a "Cookie Settings" link in the footer.
  window.osiOpenConsent = function () { injectStyles(); openModal(); };

  /* ---- boot ---------------------------------------------------------------- */
  function boot() {
    injectStyles();
    var saved = load();
    if (saved) {
      // Re-affirm the stored choice for this page load.
      apply(!!saved.analytics);
    } else {
      showBanner();
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
