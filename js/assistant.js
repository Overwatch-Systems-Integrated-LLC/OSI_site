/* ============================================================================
   OSI Website Assistant — right-side chat pane
   Self-contained: injects its own styles + launcher + slide-in panel.
   The "brain" lives in a Cloudflare Worker (Claude proxy) that holds the API
   key and applies the OSI-only system prompt. This file only handles the UI and
   talks to that Worker. It represents Overwatch Systems Integrated only.

   Drop-in: add  <script src="/js/assistant.js" defer></script>  before </body>.
   ========================================================================== */
(function () {
  'use strict';

  // ── Worker endpoint ─────────────────────────────────────────────────────────
  // Local dev hits a `wrangler dev` instance; production hits the deployed Worker.
  // TODO(deploy): replace the production URL with the real *.workers.dev address.
  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  var WORKER_URL = isLocal
    ? 'http://localhost:8787'
    : 'https://osi-assistant.overwatchsi.workers.dev';

  var CONTACT_HREF = '/#contact';
  var GREETING =
    "Hi! I'm the OSI assistant. I can answer questions about our security " +
    'camera systems, access control, networking, hazardous-environment work, ' +
    '24/7 monitoring, and how a project comes together. What can I help you with?';
  var ERROR_TEXT =
    "Sorry, I couldn't reach the assistant just now. You can always contact our " +
    'team directly at sales@overwatchsi.com or (256) 240-0681.';

  // Consent-safe analytics (gtag is gated by Consent Mode in js/consent.js).
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); }
    catch (e) {}
  }

  // ── styles ────────────────────────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('osi-assist-styles')) return;
    var css = [
      ':root{--oa-navy:#18487a;--oa-cyan:#26aee4;--oa-dark:#090d12;--oa-dark2:#0e1520;--oa-dark3:#141e2e;--oa-steel:#b8c8d8;--oa-muted:#5a7a96;--oa-white:#eaf2f8;}',
      '.osi-assist-fab,.osi-assist-panel,.osi-assist-panel *{box-sizing:border-box;font-family:Inter,system-ui,sans-serif;}',
      /* launcher */
      '.osi-assist-fab{position:fixed;right:22px;bottom:22px;z-index:8500;display:flex;align-items:center;gap:.55rem;padding:.7rem 1.05rem;border:1px solid var(--oa-cyan);border-radius:999px;background:var(--oa-navy);color:var(--oa-white);font-weight:600;font-size:.82rem;letter-spacing:.03em;cursor:pointer;box-shadow:0 8px 28px rgba(0,0,0,.45);transition:transform .18s ease,background .18s ease;}',
      '.osi-assist-fab:hover{transform:translateY(-2px);background:#1d5793;}',
      '.osi-assist-fab svg{width:18px;height:18px;flex-shrink:0;}',
      '.osi-assist-fab.osi-hidden{display:none;}',
      /* backdrop (mobile) */
      '.osi-assist-scrim{position:fixed;inset:0;z-index:8550;background:rgba(4,7,11,.55);opacity:0;visibility:hidden;transition:opacity .25s ease;}',
      '.osi-assist-scrim.osi-open{opacity:1;visibility:visible;}',
      /* right pane */
      '.osi-assist-panel{position:fixed;top:0;right:0;z-index:8600;height:100%;width:min(420px,100%);display:flex;flex-direction:column;background:var(--oa-dark2);border-left:1px solid rgba(38,174,228,.22);box-shadow:-12px 0 40px rgba(0,0,0,.5);transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);}',
      '.osi-assist-panel.osi-open{transform:translateX(0);}',
      /* header */
      '.osi-assist-head{display:flex;align-items:center;gap:.7rem;padding:1rem 1.1rem;background:var(--oa-dark);border-bottom:1px solid rgba(38,174,228,.18);}',
      '.osi-assist-dot{width:9px;height:9px;border-radius:50%;background:#4dd890;box-shadow:0 0 8px #4dd890;flex-shrink:0;}',
      '.osi-assist-title{font-family:Rajdhani,sans-serif;font-weight:700;font-size:.95rem;letter-spacing:.06em;text-transform:uppercase;color:var(--oa-white);line-height:1.1;}',
      '.osi-assist-sub{font-size:.7rem;color:var(--oa-muted);letter-spacing:.02em;}',
      '.osi-assist-close{margin-left:auto;background:none;border:none;color:var(--oa-steel);font-size:1.5rem;line-height:1;cursor:pointer;padding:.1rem .35rem;border-radius:4px;transition:color .15s,background .15s;}',
      '.osi-assist-close:hover{color:var(--oa-white);background:rgba(255,255,255,.08);}',
      /* body */
      '.osi-assist-body{flex:1;overflow-y:auto;padding:1.1rem;display:flex;flex-direction:column;gap:.7rem;}',
      '.osi-assist-body::-webkit-scrollbar{width:5px;}',
      '.osi-assist-body::-webkit-scrollbar-thumb{background:var(--oa-cyan);border-radius:3px;}',
      '.osi-assist-msg{max-width:88%;padding:.7rem .9rem;border-radius:12px;font-size:.88rem;line-height:1.55;white-space:pre-wrap;word-wrap:break-word;}',
      '.osi-assist-msg.assistant{align-self:flex-start;background:var(--oa-dark3);color:var(--oa-white);border:1px solid rgba(38,174,228,.14);border-bottom-left-radius:4px;}',
      '.osi-assist-msg.user{align-self:flex-end;background:var(--oa-navy);color:var(--oa-white);border-bottom-right-radius:4px;}',
      '.osi-assist-typing{display:inline-flex;gap:4px;align-items:center;}',
      '.osi-assist-typing i{width:6px;height:6px;border-radius:50%;background:var(--oa-cyan);opacity:.4;animation:osiBlink 1.2s infinite;}',
      '.osi-assist-typing i:nth-child(2){animation-delay:.2s;}.osi-assist-typing i:nth-child(3){animation-delay:.4s;}',
      '@keyframes osiBlink{0%,80%,100%{opacity:.25;}40%{opacity:1;}}',
      /* contact CTA strip */
      '.osi-assist-cta{padding:.55rem 1.1rem;border-top:1px solid rgba(38,174,228,.12);background:var(--oa-dark);}',
      '.osi-assist-cta a{color:var(--oa-cyan);font-size:.78rem;font-weight:600;letter-spacing:.03em;text-decoration:none;}',
      '.osi-assist-cta a:hover{text-decoration:underline;}',
      /* input */
      '.osi-assist-input{display:flex;gap:.5rem;align-items:flex-end;padding:.8rem 1.1rem 1rem;background:var(--oa-dark);border-top:1px solid rgba(38,174,228,.18);}',
      '.osi-assist-input textarea{flex:1;resize:none;min-height:64px;max-height:140px;padding:.65rem .75rem;border-radius:8px;border:1px solid rgba(38,174,228,.28);background:var(--oa-dark2);color:var(--oa-white);font-size:.9rem;line-height:1.5;outline:none;transition:border-color .15s;}',
      '.osi-assist-input textarea:focus{border-color:var(--oa-cyan);}',
      '.osi-assist-input textarea::placeholder{color:var(--oa-muted);}',
      '.osi-assist-send{flex-shrink:0;align-self:stretch;padding:0 1.1rem;border:none;border-radius:8px;background:var(--oa-cyan);color:#08121b;font-weight:700;font-size:.82rem;letter-spacing:.04em;cursor:pointer;transition:background .15s,opacity .15s;}',
      '.osi-assist-send:hover{background:#48c2f2;}',
      '.osi-assist-send:disabled{opacity:.5;cursor:not-allowed;}',
      '@media(max-width:520px){.osi-assist-panel{width:100%;border-left:none;}.osi-assist-fab span{display:none;}.osi-assist-fab{padding:.8rem;}}'
    ].join('');
    var s = document.createElement('style');
    s.id = 'osi-assist-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── build + wire ────────────────────────────────────────────────────────────
  function mount() {
    if (document.getElementById('osi-assist-fab')) return;
    injectStyles();

    var fab = document.createElement('button');
    fab.id = 'osi-assist-fab';
    fab.className = 'osi-assist-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Open the OSI assistant');
    fab.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>' +
      '<span>Ask OSI</span>';

    var scrim = document.createElement('div');
    scrim.className = 'osi-assist-scrim';

    var panel = document.createElement('aside');
    panel.className = 'osi-assist-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'OSI Assistant');
    panel.setAttribute('aria-modal', 'false');
    panel.innerHTML =
      '<div class="osi-assist-head">' +
        '<span class="osi-assist-dot"></span>' +
        '<div>' +
          '<div class="osi-assist-title">OSI Assistant</div>' +
          '<div class="osi-assist-sub">Ask about our services</div>' +
        '</div>' +
        '<button class="osi-assist-close" type="button" aria-label="Close assistant">&times;</button>' +
      '</div>' +
      '<div class="osi-assist-body" id="osi-assist-body"></div>' +
      '<div class="osi-assist-cta"><a href="' + CONTACT_HREF + '">Talk to our team &rarr;</a></div>' +
      '<form class="osi-assist-input" id="osi-assist-form">' +
        '<textarea id="osi-assist-text" rows="2" placeholder="Type your question…" autocomplete="off"></textarea>' +
        '<button class="osi-assist-send" id="osi-assist-send" type="submit">Send</button>' +
      '</form>';

    document.body.appendChild(scrim);
    document.body.appendChild(panel);
    document.body.appendChild(fab);

    var body = panel.querySelector('#osi-assist-body');
    var form = panel.querySelector('#osi-assist-form');
    var textarea = panel.querySelector('#osi-assist-text');
    var sendBtn = panel.querySelector('#osi-assist-send');
    var closeBtn = panel.querySelector('.osi-assist-close');

    var history = [];   // [{role, text}] actual turns sent to the Worker
    var busy = false;
    var greeted = false;

    function addBubble(role, text) {
      var div = document.createElement('div');
      div.className = 'osi-assist-msg ' + role;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function open() {
      panel.classList.add('osi-open');
      scrim.classList.add('osi-open');
      fab.classList.add('osi-hidden');
      if (!greeted) { addBubble('assistant', GREETING); greeted = true; }
      setTimeout(function () { textarea.focus(); }, 150);
      track('assistant_open');
    }
    function close() {
      panel.classList.remove('osi-open');
      scrim.classList.remove('osi-open');
      fab.classList.remove('osi-hidden');
    }

    async function send() {
      var text = textarea.value.trim();
      if (!text || busy) return;
      textarea.value = '';
      textarea.style.height = '';
      history.push({ role: 'user', text: text });
      addBubble('user', text);
      busy = true;
      sendBtn.disabled = true;

      var pending = addBubble('assistant', '');
      pending.innerHTML = '<span class="osi-assist-typing"><i></i><i></i><i></i></span>';
      track('assistant_message');

      try {
        var res = await fetch(WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history })
        });
        var data = await res.json();
        var reply = (data && data.text) ? data.text : ERROR_TEXT;
        pending.textContent = reply;
        history.push({ role: 'assistant', text: reply });
      } catch (err) {
        pending.textContent = ERROR_TEXT;
      } finally {
        busy = false;
        sendBtn.disabled = false;
        body.scrollTop = body.scrollHeight;
      }
    }

    // auto-grow the textarea up to its max-height
    textarea.addEventListener('input', function () {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
    });
    // Enter sends, Shift+Enter = newline
    textarea.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    form.addEventListener('submit', function (e) { e.preventDefault(); send(); });
    fab.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    scrim.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('osi-open')) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
