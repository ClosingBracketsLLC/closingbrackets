"use client";

import { useEffect, useRef } from "react";

// The brand brace centerline (same segments BracketMark strokes), in the
// 32x32 SVG box. Sampled below to give swarm particles their home positions.
const BRACE_SEGMENTS = [
  { type: "C", from: [12.5, 4], pts: [9.5, 4, 9, 5.5, 9, 8] },
  { type: "L", from: [9, 8], pts: [9, 12] },
  { type: "C", from: [9, 12], pts: [9, 14.5, 8, 15.5, 6, 16] },
  { type: "C", from: [6, 16], pts: [8, 16.5, 9, 17.5, 9, 20] },
  { type: "L", from: [9, 20], pts: [9, 24] },
  { type: "C", from: [9, 24], pts: [9, 26.5, 9.5, 28, 12.5, 28] },
];

// Evenly-ish sample `n` points along the brace (unit 32-box coords).
function sampleBrace(n) {
  const lengths = [5, 4, 3.6, 3.6, 4, 5]; // approximate segment lengths
  const total = lengths.reduce((a, b) => a + b, 0);
  const out = [];
  BRACE_SEGMENTS.forEach((seg, si) => {
    const count = Math.max(2, Math.round((lengths[si] / total) * n));
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      if (seg.type === "L") {
        out.push([
          seg.from[0] + (seg.pts[0] - seg.from[0]) * t,
          seg.from[1] + (seg.pts[1] - seg.from[1]) * t,
        ]);
      } else {
        const [x0, y0] = seg.from;
        const [x1, y1, x2, y2, x3, y3] = seg.pts;
        const u = 1 - t;
        out.push([
          u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
        ]);
      }
    }
  });
  return out;
}

/**
 * The hero particle swarm. Idle, the motes settle into the brand's curly
 * brace pair `{ }` framing the hero; move the cursor and they break formation
 * to flock toward it, then drift back into the braces when it goes quiet.
 * Pure 2D canvas — a few KB, no WebGL, runs on every device. Mounted via
 * VisibilityGate so it never competes with first paint and is skipped
 * entirely under prefers-reduced-motion.
 */
export default function SwarmField({ density = 1, maxCount = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    const pointer = { x: 0, y: 0, strength: 0 };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(maxCount, Math.round(((w * h) / 9000) * density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 0.7 + Math.random() * 1.7,
        a: 0.25 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
        agility: 0.5 + Math.random() * 0.9,
        home: null, // ambient by default
      }));

      // Assign ~72% of the motes home positions along the two braces —
      // only when the hero is wide enough for the shape to breathe.
      if (w >= 640) {
        const scale = Math.min(h * 0.62, 440) / 24;
        const cy = h * 0.5;
        const offset = Math.min(w * 0.38, 560, w / 2 - 5 * scale - 24);
        const perBrace = Math.floor((count * 0.72) / 2);
        const pts = sampleBrace(perBrace);
        const jitter = () => (Math.random() - 0.5) * scale * 0.35;
        let pi = 0;
        for (const mirror of [false, true]) {
          for (const [sx, sy] of pts) {
            const p = particles[pi++];
            if (!p) break;
            const lx = (sx - 9.25) * scale * (mirror ? -1 : 1);
            p.home = {
              x: w / 2 + (mirror ? offset : -offset) + lx + jitter(),
              y: cy + (sy - 16) * scale + jitter(),
            };
          }
        }
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx < 0 || cy < 0 || cx > rect.width || cy > rect.height) return;
      pointer.x = cx;
      pointer.y = cy;
      pointer.strength = 1;
    };

    const tick = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      pointer.strength *= 0.985; // relax when the cursor goes quiet

      const R = Math.min(w, h) * 0.45; // attraction radius
      const active = pointer.strength > 0.05;

      for (const p of particles) {
        let pulled = false;
        if (active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < R) {
            pulled = true;
            const near = Math.max(d, 24);
            const f =
              (0.09 * p.agility * pointer.strength * (1 - d / R)) *
              (d > 30 ? 1 : -0.6); // gentle push-back inside 30px
            p.vx += (dx / near) * f * 10;
            p.vy += (dy / near) * f * 10;
          }
        }

        if (p.home) {
          // Spring back into the brace formation; the pull weakens while the
          // cursor owns the particle so the flock can break shape freely.
          const k = 0.02 * p.agility * (pulled ? 0.12 : 1);
          p.vx += (p.home.x - p.x) * k;
          p.vy += (p.home.y - p.y) * k;
          p.tw += 0.012;
          p.vx += Math.cos(p.tw) * 0.002;
          p.vy += Math.sin(p.tw * 0.9) * 0.002;
          p.vx *= 0.88;
          p.vy *= 0.88;
        } else {
          // Ambient drifters keep the whole hero alive.
          p.tw += 0.012;
          p.vx += Math.cos(p.tw) * 0.004;
          p.vy += Math.sin(p.tw * 0.9) * 0.004;
          p.vx *= 0.94;
          p.vy *= 0.94;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (!p.home) {
          if (p.x < -6) p.x = w + 6;
          if (p.x > w + 6) p.x = -6;
          if (p.y < -6) p.y = h + 6;
          if (p.y > h + 6) p.y = -6;
        }

        const speed = Math.hypot(p.vx, p.vy);
        const alpha = Math.min(
          0.9,
          p.a * (0.6 + 0.4 * Math.sin(p.tw)) + speed * 0.25
        );
        const glow = p.r * (1 + Math.min(1.6, speed * 0.8));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow * 3);
        grad.addColorStop(0, `rgba(169, 157, 255, ${alpha.toFixed(3)})`);
        grad.addColorStop(1, "rgba(139, 124, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, maxCount]);

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}
