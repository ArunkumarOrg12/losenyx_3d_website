"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 121;

const FRAME_SRCS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames2/frame_${String(i).padStart(6, "0")}.jpg`,
);

export function AboutScrollSequence({
  triggerSelector,
}: {
  triggerSelector?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const frameState = { index: 0 };
    const imgs: HTMLImageElement[] = [];

    // ── size canvas to its wrapper ─────────────────────────────────────────────
    const syncSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      paint(frameState.index);
    };

    // ── draw one frame cover-fitted ────────────────────────────────────────────
    const paint = (idx: number) => {
      const roundedIdx = Math.round(idx);
      const img = imgs[roundedIdx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx2d.clearRect(0, 0, W, H);

      const ir = img.naturalWidth / img.naturalHeight;
      const cr = W / H;
      let sw = W, sh = H, sx = 0, sy = 0;
      if (ir > cr) {
        sw = H * ir;
        sx = (W - sw) / 2;
      } else {
        sh = W / ir;
        sy = (H - sh) / 2;
      }

      ctx2d.filter = "brightness(0.62) contrast(1.08) saturate(1.12)";
      ctx2d.drawImage(img, sx, sy, sw, sh);
      ctx2d.filter = "none";
    };

    // ── preload all frames ─────────────────────────────────────────────────────
    FRAME_SRCS.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        if (i === Math.round(frameState.index)) paint(i);
      };
      img.src = src;
      imgs.push(img);
    });

    syncSize();
    if (!imgs[0].complete) {
      imgs[0].addEventListener("load", () => paint(0), { once: true });
    }

    // ── resize observer ────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => syncSize());
    ro.observe(wrap);
    window.addEventListener("resize", syncSize, { passive: true });

    // ── scroll → frame (GSAP) ─────────────────────────────────────────────────
    const triggerEl = triggerSelector
      ? document.querySelector(triggerSelector)
      : wrap;

    const tween = gsap.to(frameState, {
      index: TOTAL_FRAMES - 1,
      ease: "none",
      snap: "index",
      onUpdate: () => paint(frameState.index),
      scrollTrigger: {
        trigger: triggerEl || wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncSize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [triggerSelector]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} aria-hidden className="block" />

      {/* dark radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.72)_100%)]" />

      {/* subtle cyber grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(115,226,255,0.07) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(115,226,255,0.05) 1px,transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      {/* fine CRT scan lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg,transparent 0px,transparent 3px,rgba(0,0,0,0.22) 3px,rgba(0,0,0,0.22) 4px)",
        }}
      />

      {/* bottom fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent" />
    </div>
  );
}
