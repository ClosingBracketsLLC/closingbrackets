import * as THREE from "three";

// The brand's curly brace traced as a 3D curve path — the same centerline the
// BracketMark SVG strokes, so 2D and 3D renders of the device always match.
// SVG source coords live in a 32x32 box; we recenter on (16,16) and flip Y.
const SVG_POINTS = [
  // [type, ...points] — 'C' = cubic bezier (3 pts), 'L' = line (1 pt)
  { type: "start", p: [12.5, 4] },
  { type: "C", p: [9.5, 4, 9, 5.5, 9, 8] },
  { type: "L", p: [9, 12] },
  { type: "C", p: [9, 14.5, 8, 15.5, 6, 16] },
  { type: "C", p: [8, 16.5, 9, 17.5, 9, 20] },
  { type: "L", p: [9, 24] },
  { type: "C", p: [9, 26.5, 9.5, 28, 12.5, 28] },
];

// Center of the glyph's x-extent (SVG x spans 6..12.5) so the geometry is
// centered on its local origin — mesh `position` then means what it says.
const X_CENTER = 9.25;

/**
 * Build the brace centerline as a THREE.CurvePath.
 * @param {boolean} mirror  false = opening "{", true = closing "}"
 * @param {number} scale    world units per SVG unit (height = 24 * scale)
 */
export function makeBracePath(mirror = false, scale = 0.3) {
  const map = ([x, y]) =>
    new THREE.Vector3(
      (x - X_CENTER) * scale * (mirror ? -1 : 1),
      (16 - y) * scale,
      0
    );

  const path = new THREE.CurvePath();
  let cursor = map(SVG_POINTS[0].p);
  for (const seg of SVG_POINTS.slice(1)) {
    if (seg.type === "L") {
      const end = map([seg.p[0], seg.p[1]]);
      path.add(new THREE.LineCurve3(cursor, end));
      cursor = end;
    } else {
      const c1 = map([seg.p[0], seg.p[1]]);
      const c2 = map([seg.p[2], seg.p[3]]);
      const end = map([seg.p[4], seg.p[5]]);
      path.add(new THREE.CubicBezierCurve3(cursor, c1, c2, end));
      cursor = end;
    }
  }
  return path;
}

/** Neon-tube geometry of the brace. */
export function makeBraceGeometry({ mirror = false, scale = 0.3, radius = 0.14 } = {}) {
  return new THREE.TubeGeometry(makeBracePath(mirror, scale), 96, radius, 12, false);
}
