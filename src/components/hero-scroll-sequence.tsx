"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 121;

const framePaths = Array.from({ length: FRAME_COUNT }, (_, index) => {
  const frame = index.toString().padStart(6, "0");
  return `/api/video-frames/frame_${frame}.jpg`;
});

export function HeroScrollSequence() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const frameState = { index: 0 };
    const images = framePaths.map((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    let activeFrame = 0;

    const drawFrame = (index: number) => {
      const image = images[index];

      if (!image || !image.complete || !image.naturalWidth || !image.naturalHeight) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const width = Math.max(Math.floor(rect.width), 1);
      const height = Math.max(Math.floor(rect.height), 1);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.scale(ratio, ratio);

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
        offsetY = (height - drawHeight) / 2;
      }

      context.filter = "saturate(1.08) contrast(1.06) brightness(0.7)";
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      context.filter = "none";

      activeFrame = index;
    };

    const primeFrame = images[0];
    primeFrame.onload = () => drawFrame(0);

    images.forEach((image, index) => {
      if (index === 0) {
        return;
      }

      image.onload = () => {
        if (index === activeFrame) {
          drawFrame(index);
        }
      };
    });

    const onResize = () => {
      drawFrame(activeFrame);
      ScrollTrigger.refresh();
    };

    const tween = gsap.to(frameState, {
      index: FRAME_COUNT - 1,
      ease: "none",
      snap: "index",
      onUpdate: () => drawFrame(frameState.index),
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom+=65% top",
        scrub: 0.32,
      },
    });

    const hudTween = gsap.to("[data-hero-hud]", {
      yPercent: -10,
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
      hudTween.scrollTrigger?.kill();
      hudTween.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(81,185,255,0.16),transparent_28%),linear-gradient(180deg,rgba(3,10,18,0.08),rgba(1,4,9,0.7))]"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,18,0.08),rgba(1,4,9,0.82))]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(115,226,255,0.1)_1px,transparent_1px),linear-gradient(180deg,rgba(115,226,255,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)] opacity-[0.08]" />

      <div
        data-hero-hud
        className="absolute left-4 top-4 max-w-[12rem] border border-cyan-300/20 bg-slate-950/45 px-3 py-3 text-[9px] uppercase tracking-[0.24em] text-cyan-100/72 opacity-90 backdrop-blur sm:left-7 sm:top-7 sm:max-w-[14rem] sm:px-4 sm:py-4 sm:text-[10px]"
      >
        <p className="text-cyan-300">Visual feed</p>
        <p className="mt-2 leading-5 text-white/62">
          Scroll-linked frame sequence with surveillance-grid grading and signal bloom.
        </p>
      </div>
    </div>
  );
}
