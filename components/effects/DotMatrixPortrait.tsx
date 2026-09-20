"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  ox: number; // origin x, normalized 0..1
  oy: number; // origin y, normalized 0..1
  dx: number; // current displacement from origin, px
  dy: number;
  vx: number;
  vy: number;
  r: number; // dot radius, px
  color: string; // "r,g,b"
  alpha: number;
}

interface DotMatrixPortraitProps {
  src: string;
  alt: string;
  initials: string;
  /** True when the parent card is hovered/focused — sharpens the portrait. */
  active?: boolean;
  className?: string;
}

const SAMPLE_MAX_W = 200;
const SAMPLE_MAX_H = 250;
const LUMINANCE_FLOOR = 14;
const REPULSE_RADIUS = 70;
const REPULSE_STRENGTH = 900;
const SPRING_K = 0.06;
const DAMPING = 0.82;

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default function DotMatrixPortrait({
  src,
  alt,
  initials,
  active = false,
  className = "",
}: DotMatrixPortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const ambientRef = useRef(0.55);
  const activeRef = useRef(active);
  const rafRef = useRef<number | null>(null);
  const visibleRef = useRef(true);
  const [failed, setFailed] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    reducedMotionRef.current = prefersReducedMotion();
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let disposed = false;

    function buildParticlesFromImage(img: HTMLImageElement) {
      const aspect = img.naturalHeight / img.naturalWidth || 1.25;
      let sampleW = SAMPLE_MAX_W;
      let sampleH = Math.round(sampleW * aspect);
      if (sampleH > SAMPLE_MAX_H) {
        sampleH = SAMPLE_MAX_H;
        sampleW = Math.round(sampleH / aspect);
      }

      const offscreen = document.createElement("canvas");
      offscreen.width = sampleW;
      offscreen.height = sampleH;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.drawImage(img, 0, 0, sampleW, sampleH);

      let data: Uint8ClampedArray;
      try {
        data = offCtx.getImageData(0, 0, sampleW, sampleH).data;
      } catch {
        setFailed(true);
        return;
      }

      const step = isCoarsePointer() ? 6 : 5;
      const particles: Particle[] = [];

      for (let y = 0; y < sampleH; y += step) {
        for (let x = 0; x < sampleW; x += step) {
          const idx = (y * sampleW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          if (a < 40) continue;
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          if (luminance < LUMINANCE_FLOOR) continue;

          const norm = Math.min(1, luminance / 255);
          particles.push({
            ox: x / sampleW,
            oy: y / sampleH,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0,
            r: 0.6 + norm * 1.6,
            color: `${r},${g},${b}`,
            alpha: 0.35 + norm * 0.65,
          });
        }
      }

      particlesRef.current = particles;
    }

    function resize() {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      if (sizeRef.current.w === w && sizeRef.current.h === h && sizeRef.current.dpr === dpr) {
        return;
      }
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const c = canvas.getContext("2d");
      c?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const { w, h } = sizeRef.current;
      if (!ctx || w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);

      const targetAmbient = activeRef.current ? 1 : 0.55;
      ambientRef.current += (targetAmbient - ambientRef.current) * 0.08;
      const globalAlpha = ambientRef.current;
      const sizeBoost = activeRef.current ? 1.15 : 1;

      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const reduced = reducedMotionRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const baseX = p.ox * w;
        const baseY = p.oy * h;

        if (!reduced) {
          if (pointer.active) {
            const ddx = baseX + p.dx - pointer.x;
            const ddy = baseY + p.dy - pointer.y;
            const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
            if (dist < REPULSE_RADIUS) {
              const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * REPULSE_STRENGTH;
              p.vx += (ddx / dist) * force * 0.0016;
              p.vy += (ddy / dist) * force * 0.0016;
            }
          }
          p.vx += -p.dx * SPRING_K;
          p.vy += -p.dy * SPRING_K;
          p.vx *= DAMPING;
          p.vy *= DAMPING;
          p.dx += p.vx;
          p.dy += p.vy;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${(p.alpha * globalAlpha).toFixed(3)})`;
        ctx.arc(baseX + p.dx, baseY + p.dy, p.r * sizeBoost, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function loop() {
      if (disposed) return;
      if (visibleRef.current) {
        draw();
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      resize();
      buildParticlesFromImage(img);
      draw();
      if (!reducedMotionRef.current) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    img.onerror = () => {
      if (disposed) return;
      setFailed(true);
    };
    img.src = src;

    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotionRef.current) draw();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        visibleRef.current = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }
    function onPointerLeave() {
      pointerRef.current.active = false;
    }

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {!failed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="h-full w-full"
        />
      )}
      {failed && (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center bg-obsidian"
        >
          <span className="font-display text-6xl text-chalk/80">{initials}</span>
        </div>
      )}
      <span className="sr-only">{alt}</span>
    </div>
  );
}
