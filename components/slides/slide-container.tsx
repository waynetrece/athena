"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import { slideData } from "@/lib/data";
import { SlideContent } from "./slide-content";

const ParticlesBg = dynamic(
  () => import("./particles-bg").then((m) => m.ParticlesBg),
  { ssr: false }
);

export function SlideContainer() {
  const [current, setCurrent] = useState(0);
  const total = slideData.length;

  const goTo = useCallback((n: number) => {
    if (n >= 0 && n < total) setCurrent(n);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none" style={{ background: "#FDFCF0" }}>
      {/* Warm subtle atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.03) 0%, transparent 60%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.015) 0%, transparent 40%)",
        }} />
      </div>

      {/* Subtle paper texture noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Editorial hairline frame */}
      <div className="absolute inset-6 pointer-events-none z-20" style={{ border: "0.5px solid rgba(17,17,17,0.06)" }} />

      {/* Gold accent corners */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-6 left-6 w-10 h-10">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />
          <div className="absolute top-0 left-0 h-full w-px" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.4), transparent)" }} />
        </div>
        <div className="absolute top-6 right-6 w-10 h-10">
          <div className="absolute top-0 right-0 w-full h-px" style={{ background: "linear-gradient(270deg, rgba(212,175,55,0.4), transparent)" }} />
          <div className="absolute top-0 right-0 h-full w-px" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.4), transparent)" }} />
        </div>
        <div className="absolute bottom-6 left-6 w-10 h-10">
          <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />
          <div className="absolute bottom-0 left-0 h-full w-px" style={{ background: "linear-gradient(0deg, rgba(212,175,55,0.4), transparent)" }} />
        </div>
        <div className="absolute bottom-6 right-6 w-10 h-10">
          <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: "linear-gradient(270deg, rgba(212,175,55,0.4), transparent)" }} />
          <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: "linear-gradient(0deg, rgba(212,175,55,0.4), transparent)" }} />
        </div>
      </div>

      {/* Three.js floating particles */}
      <ParticlesBg />

      {/* Click zones — narrow edge strips so content links remain clickable */}
      <div className="absolute top-0 left-0 w-[12%] h-full z-10 cursor-pointer" onClick={() => goTo(current - 1)} />
      <div className="absolute top-0 right-0 w-[12%] h-full z-10 cursor-pointer" onClick={() => goTo(current + 1)} />

      {/* Slide content with page-turn transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full flex items-center justify-center px-12 md:px-24 relative z-[5]"
        >
          <SlideContent slide={slideData[current]} />
        </motion.div>
      </AnimatePresence>

      {/* Page indicator — editorial dashes */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {slideData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-700 ease-out"
            style={{
              width: i === current ? "28px" : "6px",
              height: i === current ? "2px" : "1px",
              background: i === current
                ? "#D4AF37"
                : "rgba(17,17,17,0.15)",
              boxShadow: i === current ? "0 0 8px rgba(212,175,55,0.3)" : "none",
            }}
          />
        ))}
      </div>

      {/* Slide number — editorial serif */}
      <div className="absolute bottom-7 right-10 z-30 flex items-center gap-3">
        <span className="font-serif text-sm tracking-wider" style={{ color: "#D4AF37" }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-4 h-px" style={{ background: "rgba(17,17,17,0.15)" }} />
        <span className="font-serif text-sm tracking-wider" style={{ color: "rgba(17,17,17,0.25)" }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Brand label — top left editorial */}
      <div className="absolute top-7 left-10 z-30 flex items-center gap-3">
        <div className="w-4 h-px" style={{ background: "rgba(212,175,55,0.4)" }} />
        <span className="text-[10px] tracking-[0.35em] uppercase font-sans" style={{ color: "rgba(17,17,17,0.3)" }}>
          Athena Proposal
        </span>
      </div>

      {/* Volume / date — top right editorial */}
      <div className="absolute top-7 right-10 z-30">
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(17,17,17,0.2)" }}>
          April 2026
        </span>
      </div>
    </div>
  );
}
