// tools/camera-visibility/cameras.js
// SPEC SOURCE (Rule 2 satisfied): E:\surveillance-design-studio\Axis Camera Specs.md
// (SDS, from Axis official datasheets, retrieved 2026-07-12; docket mripoi4d01izm).
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
      hfovWideDeg: 58.3, hfovTeleDeg: 2.4, verified: true }
  ];

  function unverifiedModels() {
    return CAMERAS.filter((m) => !m.verified);
  }

  return { CAMERAS, unverifiedModels };
});
