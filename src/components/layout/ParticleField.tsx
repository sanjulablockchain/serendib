"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vx: number; vy: number; p: number; s: number };

const DENSITY = 1;

function readColor(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Resolves any CSS color string (hex, rgb, named) to an "r, g, b" triplet. */
function toRgb(color: string) {
  const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!probe || !color) return null;
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
  return `${r}, ${g}, ${b}`;
}

/** Drifting light motes on a fixed canvas. They react to scroll and follow the active theme. */
export function ParticleField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 size-full";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let motes: Mote[] = [];
    let w = 0;
    let h = 0;
    let rgb = "200, 240, 244";
    let glow = "";
    let light = false;
    let raf = 0;
    let lastY = window.scrollY;
    let scrollDelta = 0;

    const readTheme = () => {
      light = document.documentElement.dataset.theme === "light";
      glow = readColor("--color-mote-glow");
      rgb = toRgb(readColor("--color-mote")) ?? rgb;
    };

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(900, Math.round(((w * h) / 9000) * DENSITY));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vy: -(Math.random() * 0.25 + 0.05),
        vx: (Math.random() - 0.5) * 0.12,
        p: Math.random() * 6.28,
        s: Math.random() * 0.02 + 0.005,
      }));
    };

    const onScroll = () => {
      scrollDelta += window.scrollY - lastY;
      lastY = window.scrollY;
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const sd = scrollDelta;
      scrollDelta = 0;
      ctx.shadowColor = glow;
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy - sd * (0.12 + m.r * 0.3);
        m.p += m.s;
        if (m.y > h + 4) {
          m.y = -4;
          m.x = Math.random() * w;
        }
        if (m.y < -4) {
          m.y = h + 4;
          m.x = Math.random() * w;
        }
        const pulse = 0.5 + 0.5 * Math.sin(m.p);
        const alpha = light ? 0.3 + 0.5 * pulse : 0.25 + 0.55 * pulse;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, 6.283);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.shadowBlur = m.r * 4;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    readTheme();
    seed();
    const resize = new ResizeObserver(seed);
    resize.observe(host);
    const themeWatch = new MutationObserver(readTheme);
    themeWatch.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      themeWatch.disconnect();
      window.removeEventListener("scroll", onScroll);
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
