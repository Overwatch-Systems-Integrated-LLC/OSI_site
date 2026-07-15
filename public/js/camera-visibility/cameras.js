// tools/camera-visibility/cameras.js
// SPEC SOURCE (Rule 2 satisfied): E:\surveillance-design-studio\Axis Camera Specs.md
// (SDS, from Axis official datasheets, retrieved 2026-07-12; docket mripoi4d01izm).
// SPEC SOURCE (added 2026-07-13, 8 dome/panoramic/multidirectional models): SDS production
// catalog GET https://surveillance.design/api/cameras, transcribed via sandbox-cam-ingest.md
// (stored production records, confirmed present, not dry-run guesses).
// horizontalPixels = horizontal resolution; hfovWideDeg/hfovTeleDeg = published HFOV at
// the wide (focalMin) and tele (focalMax) lens ends. P3265-LVE = common 9mm variant;
// Q1798-LE = 4K mode. unverifiedModels() gates shipping (Task 8).
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.CameraData = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const CAMERAS = [
    { id: 'm2036le', name: 'AXIS M2036-LE', lens: 'fixed',
      horizontalPixels: 2304, focalMinMm: 2.4, focalMaxMm: 2.4,
      hfovWideDeg: 130, hfovTeleDeg: 130, verified: true },
    { id: 'p3265lve', name: 'AXIS P3265-LVE', lens: 'varifocal',
      horizontalPixels: 1920, focalMinMm: 3.4, focalMaxMm: 8.9,
      hfovWideDeg: 100, hfovTeleDeg: 36, verified: true },
    { id: 'p3267lve', name: 'AXIS P3267-LVE', lens: 'varifocal',
      horizontalPixels: 2592, focalMinMm: 3.0, focalMaxMm: 8.0,
      hfovWideDeg: 104, hfovTeleDeg: 40, verified: true },
    { id: 'p1468le', name: 'AXIS P1468-LE', lens: 'varifocal',
      horizontalPixels: 3840, focalMinMm: 6.2, focalMaxMm: 12.9,
      hfovWideDeg: 108, hfovTeleDeg: 49, verified: true },
    { id: 'q1798le', name: 'AXIS Q1798-LE', lens: 'varifocal',
      horizontalPixels: 3840, focalMinMm: 12.0, focalMaxMm: 48.0,
      hfovWideDeg: 90, hfovTeleDeg: 21, verified: true },
    { id: 'q6135le', name: 'AXIS Q6135-LE', lens: 'ptz',
      horizontalPixels: 1920, focalMinMm: 4.3, focalMaxMm: 137.6,
      hfovWideDeg: 58.3, hfovTeleDeg: 2.4, verified: true },

    // --- 8 models added 2026-07-13 from SDS production catalog (see SPEC SOURCE header). ---
    { id: 'm1075lmk2', name: 'AXIS M1075-L Mk II', lens: 'fixed',
      horizontalPixels: 1920, focalMinMm: 3.16, focalMaxMm: 3.16,
      hfovWideDeg: 103, hfovTeleDeg: 103, verified: true },
    { id: 'm3057plrmk2', name: 'AXIS M3057-PLR Mk II', lens: 'fixed',
      horizontalPixels: 2016, focalMinMm: 1.56, focalMaxMm: 1.56,
      hfovWideDeg: 183, hfovTeleDeg: 183, verified: true }, // panoramic; source FOV 30-183 deg incl. dewarped view modes (1x optical)
    { id: 'm3077plve', name: 'AXIS M3077-PLVE', lens: 'fixed',
      horizontalPixels: 2016, focalMinMm: 1.56, focalMaxMm: 1.56,
      hfovWideDeg: 183, hfovTeleDeg: 183, verified: true }, // 360/panoramic
    { id: 'm3088v', name: 'AXIS M3088-V', lens: 'fixed',
      horizontalPixels: 3840, focalMinMm: 2.9, focalMaxMm: 2.9,
      hfovWideDeg: 109, hfovTeleDeg: 109, verified: true },
    { id: 'm3098h', name: 'AXIS M3098-H', lens: 'fixed',
      horizontalPixels: 3840, focalMinMm: 3.76, focalMaxMm: 3.76,
      hfovWideDeg: 124, hfovTeleDeg: 124, verified: true },
    { id: 'm3138lve', name: 'AXIS M3138-LVE', lens: 'fixed',
      horizontalPixels: 3840, focalMinMm: 3.7, focalMaxMm: 3.7,
      hfovWideDeg: 126, hfovTeleDeg: 126, verified: true }, // ⚠ source labels lens "varifocal" but lists 1x optical zoom + single 3.7mm / 126 deg; treated as fixed
    { id: 'm4216v', name: 'AXIS M4216-V', lens: 'varifocal',
      horizontalPixels: 2304, focalMinMm: 3.0, focalMaxMm: 6.0,
      hfovWideDeg: 100, hfovTeleDeg: 45, verified: true },
    { id: 'p3748plve', name: 'AXIS P3748-PLVE', lens: 'varifocal',
      horizontalPixels: 3840, focalMinMm: 3.18, focalMaxMm: 7.42,
      hfovWideDeg: 103, hfovTeleDeg: 41, verified: true } // 4-sensor multidirectional; horizontalPixels is per-sensor
  ];

  function unverifiedModels() {
    return CAMERAS.filter((m) => !m.verified);
  }

  return { CAMERAS, unverifiedModels };
});
