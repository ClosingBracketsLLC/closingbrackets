"use client";

import { useEffect, useRef } from "react";

/**
 * Procedural 3D particle field — the moving artwork behind the page headers.
 *
 * Deliberately hand-rolled on a 2D canvas rather than three.js: the whole site
 * ships React and nothing else, and a WebGL runtime would cost more transfer
 * than every other asset on these pages combined. What we need is real 3D
 * motion — perspective, depth sorting, depth-of-field — and that is a little
 * matrix maths plus two pre-rendered sprites.
 *
 * Particles drift through a smooth sum-of-sines flow field (organic, O(n), and
 * it cannot clump or explode the way naive boids do) while a slowly wandering
 * attractor pulls the mass around, so the field breathes instead of hovering.
 *
 * Each particle is drawn as a soft point whose radius grows and whose core
 * fades with distance from the focal plane — cheap bokeh, which is what sells
 * the depth. Blending is additive, so overlapping points bloom the way real
 * out-of-focus highlights do against a night background.
 *
 * One field, every page. Pages differentiate on `accent` alone — the geometry
 * is deliberately identical everywhere so the site reads as one surface rather
 * than a set of pages that each had their own idea.
 */

const FIELD = {
  count: 74,
  size: 0.011,
  flow: 0.5,
  cohesion: 0.55,
  // World-space radius an edge is drawn across. At this density it works out to
  // roughly six neighbours a node — enough to read as a graph without becoming
  // a solid mesh.
  link: 1,
};

/** Field geometry. Z is depth from the camera; the field sits around Z = 3. */
const Z_CENTER = 3;
const Z_SPREAD = 1.05;
const Y_SPREAD = 1.15;

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/** Deterministic per-mount RNG, so a re-render never re-rolls the layout. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Rotate a point around the origin: Y (yaw) then X (pitch). */
function rotate(p, ry, rx) {
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);

  const x = p[0] * cy + p[2] * sy;
  let z = -p[0] * sy + p[2] * cy;
  const y = p[1] * cx - z * sx;
  z = p[1] * sx + z * cx;

  return [x, y, z];
}

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16,
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/**
 * Pre-render a radial dot once, then blit it per particle. Building a gradient
 * per particle per frame is the single most expensive thing this could do;
 * drawImage of a cached sprite is close to free.
 *
 * `stops` is [offset, alpha] pairs — a tight ramp gives a crisp point, a wide
 * one gives the out-of-focus halo.
 */
function makeSprite(rgb, stops, px = 64) {
  const c = document.createElement("canvas");
  c.width = px;
  c.height = px;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
  for (const [offset, alpha] of stops) {
    grad.addColorStop(offset, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`);
  }
  g.fillStyle = grad;
  g.fillRect(0, 0, px, px);
  return c;
}

export default function SwarmField({ accent = "#2ef2dc", className = "" }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = FIELD;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- sprites ---------------------------------------------------------
    const BONE = [244, 247, 255];
    const ACCENT = hexToRgb(accent);
    const CORE = [
      [0, 1],
      [0.35, 0.95],
      [0.62, 0.32],
      [1, 0],
    ];
    const HALO = [
      [0, 0.5],
      [0.3, 0.16],
      [1, 0],
    ];
    const sprites = {
      hot: { core: makeSprite(ACCENT, CORE, 48), halo: makeSprite(ACCENT, HALO) },
      cool: { core: makeSprite(BONE, CORE, 48), halo: makeSprite(BONE, HALO) },
    };

    // --- particles -------------------------------------------------------
    const rand = rng(7919 + cfg.count);
    const parts = Array.from({ length: cfg.count }, () => ({
      x: (rand() * 2 - 1) * 1.5,
      y: (rand() * 2 - 1) * Y_SPREAD,
      z: Z_CENTER + (rand() * 2 - 1) * Z_SPREAD,
      vx: 0,
      vy: 0,
      vz: 0,
      seed: rand() * Math.PI * 2,
      // Normalised "slot" in the field. Cohesion pulls each particle toward
      // the attractor OFFSET BY ITS OWN SLOT rather than toward the attractor
      // itself — without this the whole field collapses into one clump in the
      // middle of the band and leaves the edges empty.
      hx: rand() * 2 - 1,
      hy: rand() * 2 - 1,
      hz: rand() * 2 - 1,
      // Per-particle size jitter, so the field has a range of grain rather
      // than one repeated dot.
      scale: 0.55 + rand() * 0.9,
      // Half the field carries the accent; the rest reads as cool white.
      hot: rand() > 0.5,
    }));

    // --- sizing ----------------------------------------------------------
    let w = 0;
    let h = 0;
    let focal = 600;
    let spreadX = 1.5;

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      focal = Math.max(w, h) * 0.6;
      // Widen the field on wide viewports so it fills the band instead of
      // huddling in a column down the middle.
      spreadX = 1.45 * clamp(w / h, 1, 3.2);
    };

    // --- camera ----------------------------------------------------------
    // Pointer parallax, eased. Kept small: this sits behind headline copy and
    // must never read as the page itself moving.
    let yaw = 0;
    let pitch = 0;
    let yawTo = 0;
    let pitchTo = 0;

    // Listen on the PARENT, not on the field itself. The field is painted at a
    // negative z-index behind the header copy, so hit-testing resolves to the
    // hero band above it and a listener bound here would never fire.
    const surface = host.parentElement ?? host;

    const onPointer = (e) => {
      const r = host.getBoundingClientRect();
      yawTo = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
      pitchTo = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
    };
    const onLeave = () => {
      yawTo = 0;
      pitchTo = 0;
    };

    // --- simulation ------------------------------------------------------
    const proj = [];

    const step = (dt, t) => {
      // The attractor the whole mass leans toward, wandering on its own slow
      // Lissajous path. Its travel scales with the field so the drift reads the
      // same on a phone and on a wide desktop band.
      const ax = Math.sin(t * 0.21) * spreadX * 0.18;
      const ay = Math.cos(t * 0.17) * 0.3;
      const az = Z_CENTER + Math.sin(t * 0.13) * 0.3;

      for (const p of parts) {
        const nx = Math.sin(p.y * 1.7 + t * 0.31 + p.seed) + Math.cos(p.z * 1.3 - t * 0.22);
        const ny = Math.sin(p.z * 1.5 - t * 0.27 + p.seed * 1.7) + Math.cos(p.x * 1.9 + t * 0.19);
        const nz = Math.sin(p.x * 1.3 + t * 0.24 + p.seed * 0.7) + Math.cos(p.y * 1.6 - t * 0.29);

        // Target = wandering attractor + this particle's own slot.
        const tx = ax + p.hx * spreadX * 0.82;
        const ty = ay + p.hy * Y_SPREAD * 0.8;
        const tz = az + p.hz * Z_SPREAD * 0.75;

        p.vx += (nx * cfg.flow * 0.5 + (tx - p.x) * cfg.cohesion) * dt;
        p.vy += (ny * cfg.flow * 0.5 + (ty - p.y) * cfg.cohesion) * dt;
        p.vz += (nz * cfg.flow * 0.3 + (tz - p.z) * cfg.cohesion) * dt;

        const drag = Math.pow(0.12, dt);
        p.vx *= drag;
        p.vy *= drag;
        p.vz *= drag;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.z += p.vz * dt;

        // Hard rails, so nothing can wander behind the camera or off-field.
        p.x = clamp(p.x, -spreadX, spreadX);
        p.y = clamp(p.y, -Y_SPREAD * 1.4, Y_SPREAD * 1.4);
        p.z = clamp(p.z, Z_CENTER - Z_SPREAD * 1.5, Z_CENTER + Z_SPREAD * 1.5);
      }
    };

    const project = () => {
      proj.length = 0;
      const cx = w / 2;
      const cy = h / 2;
      for (const p of parts) {
        const [x, y, z] = rotate([p.x, p.y, p.z - Z_CENTER], yaw, pitch);
        const zc = z + Z_CENTER;
        if (zc < 0.4) continue;
        const s = focal / zc;
        proj.push({
          p,
          sx: cx + x * s,
          sy: cy + y * s,
          s,
          z: zc,
          // Depth fog: the far edge of the field dissolves into the night sky.
          fade: clamp(1.25 - (zc - (Z_CENTER - Z_SPREAD)) / (Z_SPREAD * 2.6), 0.1, 1),
          // Distance from the focal plane, 0..1 — drives the bokeh.
          blur: clamp(Math.abs(zc - Z_CENTER) / (Z_SPREAD * 1.25), 0, 1),
        });
      }
      proj.sort((a, b) => b.z - a.z);
    };

    const drawParticle = (q) => {
      const { p, blur } = q;
      const base = cfg.size * p.scale * q.s;
      // Out of focus: wider, dimmer, and the hard core all but disappears.
      const r = base * (1 + blur * 2.8);
      const a = q.fade * (1 - blur * 0.5);
      const sprite = p.hot ? sprites.hot : sprites.cool;

      ctx.globalAlpha = a * 0.55;
      ctx.drawImage(sprite.halo, q.sx - r * 2.4, q.sy - r * 2.4, r * 4.8, r * 4.8);
      ctx.globalAlpha = a * (1 - blur * 0.82);
      ctx.drawImage(sprite.core, q.sx - r, q.sy - r, r * 2, r * 2);
    };

    const drawLinks = () => {
      const max = cfg.link;
      ctx.lineWidth = 1;
      for (let i = 0; i < proj.length; i++) {
        const a = proj[i];
        for (let j = i + 1; j < proj.length; j++) {
          const b = proj[j];
          const dx = a.p.x - b.p.x;
          const dy = a.p.y - b.p.y;
          const dz = a.p.z - b.p.z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > max) continue;
          ctx.globalAlpha = (1 - d / max) * 0.34 * Math.min(a.fade, b.fade);
          ctx.strokeStyle = a.p.hot && b.p.hot ? accent : "#7c89a6";
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      project();
      drawLinks();
      // Additive: overlapping points bloom instead of stacking as flat discs,
      // which is what makes out-of-focus highlights read as light.
      ctx.globalCompositeOperation = "lighter";
      for (const q of proj) drawParticle(q);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
    };

    // --- loop ------------------------------------------------------------
    let raf = 0;
    let last = 0;
    let clock = 0;
    let visible = true;

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      // Clamped so a backgrounded tab cannot resume with one enormous step.
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      clock += dt;

      yaw += (yawTo - yaw) * Math.min(1, dt * 3);
      pitch += (pitchTo - pitch) * Math.min(1, dt * 3);

      step(dt, clock);
      render();
    };

    const start = () => {
      if (raf || still || !visible) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();

    if (still) {
      // Reduced motion: settle the field with a few fixed steps and paint one
      // frame. The composition survives; the movement does not.
      for (let i = 0; i < 120; i++) step(1 / 30, i / 30);
      render();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (still) render();
    });
    ro.observe(host);

    // Off-screen and background tabs cost nothing.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (!still) {
      surface.addEventListener("pointermove", onPointer);
      surface.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      surface.removeEventListener("pointermove", onPointer);
      surface.removeEventListener("pointerleave", onLeave);
    };
  }, [accent]);

  return (
    /* No halftone screen over this one: at a few pixels across, the points get
       diced by the dot grid rather than textured by it. The comic treatment
       lives in the panels, buttons and type instead. */
    <div ref={hostRef} aria-hidden className={`swarm-field ${className}`}>
      <canvas ref={canvasRef} className="swarm-field__canvas" />
    </div>
  );
}
