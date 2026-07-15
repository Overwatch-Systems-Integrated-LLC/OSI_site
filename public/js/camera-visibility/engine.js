// tools/camera-visibility/engine.js
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CameraEngine = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // HFOV (degrees) at a focal length, linearly interpolated between the datasheet wide
  // (focalMin) and tele (focalMax) endpoints. Fixed lens (min==max) returns the wide value.
  function hfovDegAtFocal(focalMm, focalMinMm, focalMaxMm, hfovWideDeg, hfovTeleDeg) {
    if (focalMaxMm <= focalMinMm) return hfovWideDeg;
    let t = (focalMm - focalMinMm) / (focalMaxMm - focalMinMm);
    t = Math.max(0, Math.min(1, t));
    return hfovWideDeg + t * (hfovTeleDeg - hfovWideDeg);
  }

  // Convert a HFOV in degrees to radians.
  function hfovRadiansFromDegrees(deg) {
    return (deg * Math.PI) / 180;
  }

  // Scene width (feet) captured at distance (feet) for an HFOV angle (radians).
  function sceneWidthFt(distanceFt, hfovRad) {
    return 2 * distanceFt * Math.tan(hfovRad / 2);
  }

  // Pixels-per-foot on target.
  function pixelsPerFoot(horizontalPixels, sceneWidthFtValue) {
    return horizontalPixels / sceneWidthFtValue;
  }

  // EN 62676-4 DORI thresholds converted from px/m to px/ft.
  const DORI_PX_PER_FT = { detect: 8, observe: 19, recognize: 38, identify: 76 };

  // Highest DORI level achieved for a px/ft value; 'none' below detect.
  function doriLevel(ppf) {
    if (ppf >= DORI_PX_PER_FT.identify) return 'identify';
    if (ppf >= DORI_PX_PER_FT.recognize) return 'recognize';
    if (ppf >= DORI_PX_PER_FT.observe) return 'observe';
    if (ppf >= DORI_PX_PER_FT.detect) return 'detect';
    return 'none';
  }

  // Real-world height (feet) of the reference frame (crown-headroom to collar in the
  // cropped headshot). The downsample keys off the FRAME height, not the face alone:
  // since the face is a known fraction of the frame, resolving the whole frame to
  // ppf*FRAME_HEIGHT_FT pixels resolves the face at the physically correct pixel count.
  // Resolved [IMPL] flag from spec; kept in sync with crop_reference.py.
  const FRAME_HEIGHT_FT = 1.33;

  // How many pixels tall the reference frame is actually resolved at, given px/ft.
  function resolvedFrameHeightPx(ppf) {
    return Math.max(1, Math.round(ppf * FRAME_HEIGHT_FT));
  }

  return { hfovDegAtFocal, hfovRadiansFromDegrees, sceneWidthFt, pixelsPerFoot,
           DORI_PX_PER_FT, doriLevel, FRAME_HEIGHT_FT, resolvedFrameHeightPx };
});
