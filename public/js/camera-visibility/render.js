// tools/camera-visibility/render.js
'use strict';
(function () {
  const E = window.CameraEngine;
  const canvas = document.getElementById('preview');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  let imgReady = false;

  img.onload = function () { imgReady = true; if (window.__lastPPF != null) render(window.__lastPPF); };
  img.src = '../images/reference-face.jpg';

  // Offscreen buffer for the downsample step.
  const buf = document.createElement('canvas');
  const bctx = buf.getContext('2d');

  function render(ppf) {
    if (!imgReady) return;
    // Resolved frame height in pixels; width scaled to image aspect ratio.
    const frameH = E.resolvedFrameHeightPx(ppf);
    const aspect = img.width / img.height;
    const smallH = Math.max(1, frameH);
    const smallW = Math.max(1, Math.round(smallH * aspect));

    buf.width = smallW;
    buf.height = smallH;
    bctx.imageSmoothingEnabled = true;   // honest downscale (averaging) into the small buffer
    bctx.clearRect(0, 0, smallW, smallH);
    bctx.drawImage(img, 0, 0, smallW, smallH);

    // Blit back up with NO smoothing => blocky pixels the sensor actually resolves.
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(buf, 0, 0, smallW, smallH, 0, 0, canvas.width, canvas.height);
  }

  window.renderPreview = render;
})();
