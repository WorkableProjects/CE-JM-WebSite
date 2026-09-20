"use client";

import { useEffect, useRef, useState } from "react";

interface GridNode {
  ox: number;
  oy: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
}

const SPACING = 56;
const REPULSE_RADIUS = 140;
const REPULSE_STRENGTH = 1.6;
const SPRING_K = 0.045;
const DAMPING = 0.86;

function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Ambient background grid. Reacts to pointer on fine-pointer, motion-enabled
 * devices; renders as a plain static CSS grid otherwise (touch / reduced
 * motion), so the effect is always decorative and never required to read
 * the page.
 */
export default function ReactiveGrid({ className = "" }: { className?: string }) {
  const [interactive, setInteractive] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setInteractive(!isCoarsePointer() && !prefersReducedMotion());
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let disposed = false;
    let visible = true;
    let raf: number | null = null;
    let nodes: GridNode[] = [];
    let dims = { w: 0, h: 0, dpr: 1 };
    const pointer = { x: -9999, y: -9999, active: false };

    function buildNodes() {
      nodes = [];
      const cols = Math.ceil(dims.w / SPACING) + 1;
      const rows = Math.ceil(dims.h / SPACING) + 1;
      for (let ry = 0; ry <= rows; ry++) {
        for (let rx = 0; rx <= cols; rx++) {
          nodes.push({ ox: rx * SPACING, oy: ry * SPACING, dx: 0, dy: 0, vx: 0, vy: 0 });
        }
      }
    }

    function resize() {
      if (!container || !canvas || !ctx) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      dims = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, dims.w, dims.h);
      ctx.strokeStyle = "rgba(36,27,121,0.22)";
      ctx.fillStyle = "rgba(36,27,121,0.35)";
      ctx.lineWidth = 1;

      for (const n of nodes) {
        if (pointer.active) {
          const ddx = n.ox + n.dx - pointer.x;
          const ddy = n.oy + n.dy - pointer.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
          if (dist < REPULSE_RADIUS) {
            const force = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) * REPULSE_STRENGTH;
            n.vx += (ddx / dist) * force;
            n.vy += (ddy / dist) * force;
          }
        }
        n.vx += -n.dx * SPRING_K;
        n.vy += -n.dy * SPRING_K;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.dx += n.vx;
        n.dy += n.vy;
      }

      const cols = Math.ceil(dims.w / SPACING) + 2;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = n.ox + n.dx;
        const y = n.oy + n.dy;
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();

        const right = nodes[i + 1];
        if (right && (i + 1) % cols !== 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(right.ox + right.dx, right.oy + right.dy);
          ctx.stroke();
        }
        const down = nodes[i + cols];
        if (down) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(down.ox + down.dx, down.oy + down.dy);
          ctx.stroke();
        }
      }
    }

    function loop() {
      if (disposed) return;
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    draw();
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    function onPointerMove(e: PointerEvent) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onPointerLeave() {
      pointer.active = false;
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave, { passive: true });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, [interactive]);

  if (!interactive) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(36,27,121,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(36,27,121,0.14) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 60% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 30%, black 0%, transparent 75%)",
        }}
      />
    );
  }

  return (
    <div ref={containerRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{
          maskImage: "radial-gradient(ellipse at 60% 30%, black 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 30%, black 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
