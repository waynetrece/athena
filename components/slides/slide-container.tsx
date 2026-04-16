"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const dirRef = useRef(1); // 1 = forward, -1 = backward
  const total = slideData.length;

  const goTo = useCallback((n: number) => {
    if (n >= 0 && n < total) {
      dirRef.current = n > current ? 1 : -1;
      setCurrent(n);
    }
  }, [total, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(current - 1); }
      const num = parseInt(e.key);
      if (num >= 1 && num <= total) { e.preventDefault(); goTo(num - 1); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo, total]);

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none" style={{
      background: "linear-gradient(160deg, #F5F3E8 0%, #FDFCF0 30%, #F8F6EB 70%, #F0EDE0 100%)",
    }}>
      {/* Multi-layer warm atmosphere for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 55%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.04) 0%, transparent 40%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 20% 70%, rgba(180,160,100,0.03) 0%, transparent 40%)",
        }} />
      </div>

      {/* Deep vignette for depth — darkens edges */}
      <div className="absolute inset-0 pointer-events-none z-[2]" style={{
        boxShadow: "inset 0 0 200px 60px rgba(120,110,80,0.12), inset 0 0 80px 20px rgba(80,70,40,0.06)",
      }} />

      {/* Paper texture noise — slightly stronger */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Editorial frame — stronger border + shadow for depth */}
      <div className="absolute inset-6 pointer-events-none z-20" style={{
        border: "1px solid rgba(17,17,17,0.1)",
        boxShadow: "0 0 40px rgba(0,0,0,0.04), inset 0 0 60px rgba(212,175,55,0.02)",
      }} />

      {/* Gold accent corners — larger + bolder */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Top-left */}
        <div className="absolute top-6 left-6 w-14 h-14">
          <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          <div className="absolute top-0 left-0 h-full w-[2px]" style={{ background: "linear-gradient(180deg, #D4AF37, transparent)" }} />
        </div>
        {/* Top-right */}
        <div className="absolute top-6 right-6 w-14 h-14">
          <div className="absolute top-0 right-0 w-full h-[2px]" style={{ background: "linear-gradient(270deg, #D4AF37, transparent)" }} />
          <div className="absolute top-0 right-0 h-full w-[2px]" style={{ background: "linear-gradient(180deg, #D4AF37, transparent)" }} />
        </div>
        {/* Bottom-left */}
        <div className="absolute bottom-6 left-6 w-14 h-14">
          <div className="absolute bottom-0 left-0 w-full h-[2px]" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          <div className="absolute bottom-0 left-0 h-full w-[2px]" style={{ background: "linear-gradient(0deg, #D4AF37, transparent)" }} />
        </div>
        {/* Bottom-right */}
        <div className="absolute bottom-6 right-6 w-14 h-14">
          <div className="absolute bottom-0 right-0 w-full h-[2px]" style={{ background: "linear-gradient(270deg, #D4AF37, transparent)" }} />
          <div className="absolute bottom-0 right-0 h-full w-[2px]" style={{ background: "linear-gradient(0deg, #D4AF37, transparent)" }} />
        </div>
      </div>

      {/* Three.js floating particles */}
      <ParticlesBg />

      {/* Click zones */}
      <div className="absolute top-0 left-0 w-[12%] h-full z-10 cursor-pointer" onClick={() => goTo(current - 1)} />
      <div className="absolute top-0 right-0 w-[12%] h-full z-10 cursor-pointer" onClick={() => goTo(current + 1)} />

      {/* Slide content — horizontal parallax transition */}
      <AnimatePresence mode="wait" custom={dirRef.current}>
        <motion.div
          key={current}
          custom={dirRef.current}
          variants={{
            enter: (dir: number) => ({
              opacity: 0,
              x: dir * 120,
              scale: 0.96,
              filter: "blur(4px)",
            }),
            center: {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
            },
            exit: (dir: number) => ({
              opacity: 0,
              x: dir * -80,
              scale: 0.98,
              filter: "blur(3px)",
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full flex items-center justify-center px-12 md:px-24 relative z-[5]"
        >
          <SlideContent slide={slideData[current]} />
        </motion.div>
      </AnimatePresence>

      {/* Page indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
        {slideData.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-700 ease-out"
            style={{
              width: i === current ? "32px" : "8px",
              height: i === current ? "3px" : "2px",
              background: i === current ? "#D4AF37" : "rgba(17,17,17,0.2)",
              boxShadow: i === current ? "0 0 10px rgba(212,175,55,0.4)" : "none",
            }}
          />
        ))}
      </div>

      {/* Slide number */}
      <div className="absolute bottom-7 right-10 z-30 flex items-center gap-3">
        <span className="font-serif text-base tracking-wider font-medium" style={{ color: "#D4AF37" }}>
          {String(current + 1).padStart(2, "0")}
        </span>
        <div className="w-5 h-[1.5px]" style={{ background: "rgba(17,17,17,0.2)" }} />
        <span className="font-serif text-base tracking-wider" style={{ color: "rgba(17,17,17,0.35)" }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Brand label */}
      <div className="absolute top-7 left-10 z-30 flex items-center gap-3">
        <div className="w-5 h-[1.5px]" style={{ background: "#D4AF37" }} />
        <span className="text-xs tracking-[0.35em] uppercase font-sans font-medium" style={{ color: "rgba(17,17,17,0.45)" }}>
          Athena Proposal
        </span>
      </div>

      {/* Date */}
      <div className="absolute top-7 right-10 z-30">
        <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: "rgba(17,17,17,0.3)" }}>
          April 2026
        </span>
      </div>
    </div>
  );
}
