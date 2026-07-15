'use strict';
(function () {
  const E = window.CameraEngine;
  const D = window.CameraData;

  const els = {
    camera: document.getElementById('camera'),
    lens: document.getElementById('lens'),
    lensVal: document.getElementById('lensVal'),
    distance: document.getElementById('distance'),
    distVal: document.getElementById('distVal'),
    ppfValue: document.getElementById('ppfValue'),
    levelBadge: document.getElementById('levelBadge'),
    chips: document.getElementById('chips'),
    flag: document.getElementById('flag')
  };

  // Fill the slider track up to its current value in the accent color.
  function paintSlider(el) {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.background =
      'linear-gradient(to right, var(--accent) ' + pct + '%, var(--track) ' + pct + '%)';
  }

  // Populate camera dropdown.
  D.CAMERAS.forEach(function (m) {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.name;
    els.camera.appendChild(opt);
  });

  function currentCamera() {
    return D.CAMERAS.find(function (m) { return m.id === els.camera.value; });
  }

  // Configure the lens slider for the selected model.
  function syncLensRange() {
    const cam = currentCamera();
    els.lens.min = cam.focalMinMm;
    els.lens.max = cam.focalMaxMm;
    els.lens.step = 0.1;
    els.lens.value = cam.focalMinMm;
    els.lens.disabled = cam.lens === 'fixed';
    els.flag.hidden = cam.verified === true;
  }

  const LEVEL_LABEL = { none: 'Nothing usable', detect: 'Detect', observe: 'Observe',
                        recognize: 'Recognize', identify: 'Identify' };

  function update() {
    const cam = currentCamera();
    const focal = parseFloat(els.lens.value);
    const dist = parseFloat(els.distance.value);
    els.lensVal.textContent = focal.toFixed(1);
    els.distVal.textContent = dist;

    const hfovDeg = E.hfovDegAtFocal(focal, cam.focalMinMm, cam.focalMaxMm,
                                     cam.hfovWideDeg, cam.hfovTeleDeg);
    const hfov = E.hfovRadiansFromDegrees(hfovDeg);
    const width = E.sceneWidthFt(dist, hfov);
    const ppf = E.pixelsPerFoot(cam.horizontalPixels, width);
    const level = E.doriLevel(ppf);

    els.ppfValue.textContent = ppf.toFixed(0);
    els.levelBadge.textContent = LEVEL_LABEL[level];

    const chips = [['Detect', 'detect'], ['Recognize', 'recognize'], ['Identify', 'identify']];
    els.chips.innerHTML = chips.map(function (c) {
      const on = E.DORI_PX_PER_FT[c[1]] <= ppf;
      return '<span class="chip ' + (on ? 'ok' : 'no') + '">' + c[0] + (on ? ' ✓' : ' ✗') + '</span>';
    }).join('');

    paintSlider(els.lens);
    paintSlider(els.distance);

    window.__lastPPF = ppf; // render.js reads this for the canvas render.
    if (window.renderPreview) window.renderPreview(ppf);
  }

  els.camera.addEventListener('change', function () { syncLensRange(); update(); });
  els.lens.addEventListener('input', update);
  els.distance.addEventListener('input', update);

  syncLensRange();
  update();
})();
