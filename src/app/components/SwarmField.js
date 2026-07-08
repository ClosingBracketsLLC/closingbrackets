"use client";

import { useEffect, useRef } from "react";

/**
 * The hero particle swarm: violet motes that drift lazily, then flock toward
 * the cursor when it moves across the hero (touch drags work too). Pure 2D
 * canvas — a few KB, no WebGL, runs on every device. Mounted via
 * VisibilityGate so it never competes with first paint and is skipped
 * entirely under prefers-reduced-motion.
 *
 * @param {number} density  particles per ~9000 px² (capped)
 * @param {number} maxCount hard cap on particle count
 */
export default function SwarmField({ density = 1, maxCount = 220 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    // Pointer in canvas coords; active decays so the swarm relaxes after
    // the cursor stops or leaves.
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
        // A little individuality so the flock never moves in lockstep.
        agility: 0.5 + Math.random() * 0.9,
      }));
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
      for (const p of particles) {
        if (pointer.strength > 0.05) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < R) {
            // Soft attraction, stronger near the edge of personal space —
            // motes gather around the cursor without collapsing onto it.
            const near = Math.max(d, 24);
            const f =
              (0.09 * p.agility * pointer.strength * (1 - d / R)) *
              (d > 30 ? 1 : -0.6); // gentle push-back inside 30px
            p.vx += (dx / near) * f * 10;
            p.vy += (dy / near) * f * 10;
          }
        }
        // Lazy drift + damping keeps motion organic.
        p.tw += 0.012;
        p.vx += Math.cos(p.tw) * 0.004;
        p.vy += Math.sin(p.tw * 0.9) * 0.004;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -6) p.x = w + 6;
        if (p.x > w + 6) p.x = -6;
        if (p.y < -6) p.y = h + 6;
        if (p.y > h + 6) p.y = -6;

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
