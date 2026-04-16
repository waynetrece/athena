"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { slideData } from "@/lib/data";

type Slide = (typeof slideData)[number];

/* ─── Shared animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" as const } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

/* ─── Editorial gold line separator — bolder ─── */
function EditorialLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="h-[2px] flex-1 origin-left"
        style={{ background: "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.1))" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
      <div className="w-2.5 h-2.5 rotate-45 border-2" style={{ borderColor: "rgba(212,175,55,0.6)" }} />
      <motion.div
        className="h-[2px] flex-1 origin-right"
        style={{ background: "linear-gradient(270deg, #D4AF37, rgba(212,175,55,0.1))" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ─── Animated shimmer sweep — bolder ─── */
function GoldShimmer() {
  return (
    <div className="relative h-[2px] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: "rgba(17,17,17,0.12)" }} />
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)" }}
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      />
    </div>
  );
}

/* ─── Depth shadow style for cards/sections ─── */
const depthShadow = "0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)";
const goldGlow = "0 0 30px rgba(212,175,55,0.08)";

/* ─── Reveal Comparison Row — problem first, then solution slides in ─── */
function RevealComparisonRow({ item, index }: { item: { label: string; bad: string; good: string }; index: number }) {
  const [showGood, setShowGood] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowGood(true), 1600 + index * 600);
    return () => clearTimeout(timer);
  }, [index]);

  const rowDelay = 0.15 * index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + rowDelay, ease: "easeOut" as const }}
      className="grid grid-cols-12 gap-0"
      style={{
        borderBottom: "1px solid rgba(17,17,17,0.08)",
        background: index % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(248,246,238,0.5)",
      }}
    >
      {/* Label */}
      <div className="col-span-3 py-7 px-6 flex items-center">
        <span className="font-serif text-xl tracking-wide font-medium" style={{ color: "#B8962D" }}>
          {item.label}
        </span>
      </div>

      {/* Bad — always visible */}
      <div className="col-span-4 py-7 px-8" style={{ borderLeft: "2px solid rgba(196,64,64,0.15)" }}>
        <div className="flex items-start gap-4">
          <motion.span
            className="text-lg mt-0.5 shrink-0 font-bold"
            style={{ color: "#C44040" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + rowDelay, type: "spring" }}
          >
            ✕
          </motion.span>
          <div>
            <span className="text-xs tracking-[0.2em] uppercase block mb-2 font-semibold" style={{ color: "#C44040" }}>
              現狀
            </span>
            <span className="text-base leading-relaxed" style={{ color: "#555555" }}>{item.bad}</span>
          </div>
        </div>
      </div>

      {/* Good — slides in after delay */}
      <motion.div
        className="col-span-5 py-7 px-8 overflow-hidden"
        style={{ borderLeft: "2px solid rgba(212,175,55,0.2)" }}
        initial={{ opacity: 0 }}
        animate={showGood ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex items-start gap-4"
          initial={{ x: 60, opacity: 0 }}
          animate={showGood ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-lg mt-0.5 shrink-0 font-bold" style={{ color: "#2D8A4E" }}>✓</span>
          <div>
            <span className="text-xs tracking-[0.2em] uppercase block mb-2 font-semibold" style={{ color: "#D4AF37" }}>
              建議優化
            </span>
            <span className="text-base leading-relaxed font-medium" style={{ color: "#222222" }}>{item.good}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Gold highlight flash when solution appears */}
      <motion.div
        className="col-span-12 absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={showGood ? { opacity: [0, 0.15, 0] } : { opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg, transparent 60%, rgba(212,175,55,0.3))" }}
      />
    </motion.div>
  );
}

export function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    /* ═══════════════ COVER ═══════════════ */
    case "cover":
      return (
        <motion.div
          className="text-center relative w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Gold radial atmosphere — stronger */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none" style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 65%)",
          }} />

          {/* Decorative vertical gold line — stronger */}
          <motion.div
            className="absolute right-[12%] top-1/2 -translate-y-1/2 w-[2px] h-0 origin-center"
            animate={{ height: "350px" }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            style={{
              background: "linear-gradient(180deg, transparent, #D4AF37, transparent)",
              boxShadow: "0 0 12px rgba(212,175,55,0.3)",
            }}
          />

          {/* Subtle left vertical line */}
          <motion.div
            className="absolute left-[12%] top-1/2 -translate-y-1/2 w-px h-0 origin-center"
            animate={{ height: "200px" }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
            style={{ background: "linear-gradient(180deg, transparent, rgba(17,17,17,0.08), transparent)" }}
          />

          <motion.p
            variants={fadeUp}
            className="text-sm tracking-[0.5em] uppercase mb-10 relative z-10 font-medium"
            style={{ color: "#B8962D" }}
          >
            Website Proposal · 2026
          </motion.p>

          <EditorialLine className="max-w-sm mx-auto mb-12" delay={0.3} />

          <motion.h1
            variants={fadeUp}
            className="font-serif text-8xl md:text-[140px] leading-none mb-8 relative z-10"
            style={{
              color: "#0A0A0A",
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 20px rgba(0,0,0,0.06)",
            }}
          >
            Athena
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 mb-8 relative z-10">
            <div className="w-16 h-[2px]" style={{ background: "#D4AF37", boxShadow: "0 0 8px rgba(212,175,55,0.3)" }} />
            <p className="text-2xl tracking-[0.4em] font-medium" style={{ color: "#222222" }}>
              韓 境 美 學
            </p>
            <div className="w-16 h-[2px]" style={{ background: "#D4AF37", boxShadow: "0 0 8px rgba(212,175,55,0.3)" }} />
          </motion.div>

          <motion.p variants={fadeUp} className="text-xl tracking-widest relative z-10" style={{ color: "#777777" }}>
            網站優化提案
          </motion.p>

          <EditorialLine className="max-w-sm mx-auto mt-14 mb-8" delay={0.6} />

          <motion.p variants={fadeUp} className="text-base tracking-wider relative z-10" style={{ color: "#AAAAAA" }}>
            按 <span className="font-medium" style={{ color: "#D4AF37" }}>→</span> 或點擊右側繼續
          </motion.p>
        </motion.div>
      );

    /* ═══════════════ LIST ═══════════════ */
    case "list":
      return (
        <motion.div
          className="w-full max-w-6xl"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left — large editorial title with depth */}
            <div className="col-span-5">
              <motion.div variants={slideFromLeft}>
                <span className="text-sm tracking-[0.5em] uppercase block mb-6 font-medium" style={{ color: "#B8962D" }}>
                  01 — Overview
                </span>
                <h2
                  className="font-serif text-6xl md:text-7xl leading-tight mb-10"
                  style={{
                    color: "#0A0A0A",
                    fontStyle: "italic",
                    textShadow: "0 2px 15px rgba(0,0,0,0.05)",
                  }}
                >
                  網站<br />全面<br />體檢
                </h2>
                <motion.div
                  className="w-20 h-[2px] origin-left"
                  style={{ background: "#D4AF37", boxShadow: "0 0 8px rgba(212,175,55,0.3)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            </div>

            {/* Right — items list */}
            <div className="col-span-6 col-start-7">
              {(slide.items as string[]).map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="py-8 group"
                  style={{ borderBottom: "1.5px solid rgba(17,17,17,0.1)" }}
                >
                  <div className="flex items-baseline gap-8">
                    <span
                      className="font-serif text-4xl font-light transition-colors duration-500 group-hover:text-[#D4AF37]"
                      style={{ color: "rgba(212,175,55,0.5)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-2xl font-medium transition-colors duration-500 group-hover:text-[#0A0A0A]"
                      style={{ color: "#222222" }}
                    >
                      {item}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );

    /* ═══════════════ COMPARISON — Flip Cards ═══════════════ */
    case "comparison":
      return (
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
                02 — SEO
              </span>
              <h2 className="font-serif text-5xl md:text-6xl" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                {slide.title}
              </h2>
            </div>
            <p className="text-xl font-medium" style={{ color: "#666666" }}>{slide.subtitle}</p>
          </motion.div>
          <GoldShimmer />

          <div className="mt-8 relative" style={{ boxShadow: depthShadow }}>
            {(slide.items as Array<{ label: string; bad: string; good: string }>).map((item, i) => (
              <RevealComparisonRow key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      );

    /* ═══════════════ BULLETS (Design Issues) ═══════════════ */
    case "bullets":
      return (
        <motion.div
          className="max-w-5xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
              03 — Design
            </span>
            <h2 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#666666" }}>{slide.subtitle}</p>
          </motion.div>
          <GoldShimmer />

          <div className="mt-10 space-y-0">
            {(slide.items as string[]).map((item, i) => (
              <motion.div
                key={i}
                variants={slideFromLeft}
                className="group relative"
              >
                <div className="flex items-start gap-8 py-7" style={{ borderBottom: "1.5px solid rgba(17,17,17,0.08)" }}>
                  {/* Large editorial number */}
                  <span className="font-serif text-5xl font-light shrink-0 w-16 text-right transition-colors duration-500 group-hover:text-[#D4AF37]" style={{ color: "rgba(17,17,17,0.12)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Red accent bar + content */}
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div
                      className="w-[3px] h-0 shrink-0 mt-2 rounded-full"
                      style={{ background: "#C44040", boxShadow: "0 0 6px rgba(196,64,64,0.3)" }}
                      animate={{ height: "28px" }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    />
                    <span className="text-xl leading-relaxed" style={{ color: "#222222" }}>{item}</span>
                  </div>
                </div>

                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.05), transparent 40%)" }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    /* ═══════════════ DESIGN VISION ═══════════════ */
    case "design-vision":
      return (
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
              04 — Design Vision
            </span>
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-5xl md:text-6xl" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                {slide.title}
              </h2>
              <p className="text-xl font-medium" style={{ color: "#666666" }}>{slide.subtitle}</p>
            </div>
          </motion.div>
          <GoldShimmer />

          {/* 2x3 vision grid */}
          <div className="grid grid-cols-3 gap-0 mt-8" style={{ border: "1px solid rgba(17,17,17,0.08)", boxShadow: depthShadow }}>
            {(slide.items as Array<{ icon: string; title: string; desc: string }>).map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="relative group p-8 transition-all duration-500 hover:bg-white/60"
                style={{
                  borderRight: (i % 3 !== 2) ? "1px solid rgba(17,17,17,0.08)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(17,17,17,0.08)" : "none",
                }}
              >
                {/* Gold diamond icon */}
                <motion.div
                  className="text-2xl mb-5 inline-block"
                  style={{ color: "#D4AF37", textShadow: "0 0 12px rgba(212,175,55,0.3)" }}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 200 }}
                >
                  {item.icon}
                </motion.div>

                {/* Gold line */}
                <motion.div
                  className="w-8 h-[2px] mb-4 origin-left"
                  style={{ background: "#D4AF37", boxShadow: "0 0 6px rgba(212,175,55,0.3)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                />

                <h3 className="text-lg font-semibold mb-3 tracking-wide" style={{ color: "#0A0A0A" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#666666" }}>
                  {item.desc}
                </p>

                {/* Hover corner accent */}
                <div className="absolute bottom-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-full h-[1.5px]" style={{ background: "#D4AF37" }} />
                  <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: "#D4AF37" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    /* ═══════════════ ISSUES (Content Optimization) ═══════════════ */
    case "issues":
      return (
        <motion.div
          className="max-w-5xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
              05 — Content
            </span>
            <h2 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#666666" }}>{slide.subtitle}</p>
          </motion.div>
          <GoldShimmer />

          <div className="mt-10 space-y-0">
            {(slide.items as Array<{ icon: string; text: string }>).map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group"
              >
                <div
                  className="flex items-start gap-6 py-7 px-6 transition-all duration-500 group-hover:bg-white/50 group-hover:shadow-sm"
                  style={{ borderBottom: "1.5px solid rgba(17,17,17,0.08)" }}
                >
                  <span className="text-xl mt-0.5 shrink-0 transition-all duration-500 group-hover:scale-125" style={{ color: "#D4AF37", textShadow: "0 0 8px rgba(212,175,55,0.3)" }}>
                    {item.icon}
                  </span>
                  <span className="text-xl leading-relaxed" style={{ color: "#222222" }}>{item.text}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    /* ═══════════════ FEATURES (Upgrade Suggestions) ═══════════════ */
    case "features":
      return (
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
                06 — Upgrade
              </span>
              <h2 className="font-serif text-5xl md:text-6xl" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                {slide.title}
              </h2>
            </div>
            <p className="text-xl font-medium" style={{ color: "#666666" }}>{slide.subtitle}</p>
          </motion.div>

          {/* Magazine 4-column grid with depth */}
          <div className="grid grid-cols-4 gap-0" style={{
            border: "1.5px solid rgba(17,17,17,0.1)",
            boxShadow: depthShadow,
          }}>
            {(slide.items as Array<{ label: string; desc: string }>).map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="p-10 relative group transition-all duration-500 hover:bg-white/70 hover:shadow-lg"
                style={{ borderRight: i < 3 ? "1.5px solid rgba(17,17,17,0.1)" : "none" }}
              >
                {/* Large editorial number */}
                <motion.span
                  className="font-serif text-6xl font-light block mb-8 transition-colors duration-500 group-hover:text-[#D4AF37]"
                  style={{ color: "rgba(212,175,55,0.35)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                {/* Gold accent line */}
                <motion.div
                  className="w-10 h-[2px] mb-6 origin-left"
                  style={{ background: "#D4AF37", boxShadow: "0 0 6px rgba(212,175,55,0.3)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                />

                <h3 className="text-xl font-semibold mb-4 tracking-wide" style={{ color: "#0A0A0A" }}>
                  {item.label}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#666666" }}>
                  {item.desc}
                </p>

                {/* Bottom-right corner accent on hover */}
                <div className="absolute bottom-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-full h-[2px]" style={{ background: "#D4AF37" }} />
                  <div className="absolute bottom-0 right-0 h-full w-[2px]" style={{ background: "#D4AF37" }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );

    /* ═══════════════ TIMELINE PREVIEW ═══════════════ */
    case "timeline-preview":
      return (
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="text-sm tracking-[0.5em] uppercase block mb-4 font-medium" style={{ color: "#B8962D" }}>
              07 — Journey
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mb-4" style={{ color: "#0A0A0A", fontStyle: "italic", textShadow: "0 2px 15px rgba(0,0,0,0.05)" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#666666" }}>{slide.subtitle}</p>
          </motion.div>

          <EditorialLine className="max-w-sm mx-auto mb-8" delay={0.2} />

          <motion.p variants={fadeUp} className="text-xl leading-relaxed mb-16 text-center max-w-2xl mx-auto" style={{ color: "#444444" }}>
            {slide.description}
          </motion.p>

          {/* Timeline with depth */}
          <div className="relative">
            {/* Connecting horizontal line — bolder */}
            <motion.div
              className="absolute top-[68px] left-[6%] right-[6%] h-[2px] origin-left"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
                boxShadow: "0 0 10px rgba(212,175,55,0.3)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
            />

            {/* Traveling gold dot — bigger glow */}
            <motion.div
              className="absolute top-[63px] w-4 h-4 rounded-full z-10"
              style={{ background: "#D4AF37", boxShadow: "0 0 20px rgba(212,175,55,0.8), 0 0 40px rgba(212,175,55,0.3)" }}
              initial={{ left: "6%", opacity: 0 }}
              animate={{ left: "94%", opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
            />

            <div className="flex justify-between relative z-10 px-2">
              {[
                { step: "專業諮詢", icon: "01", sub: "Day 1" },
                { step: "出發入住", icon: "02", sub: "Day 2" },
                { step: "手術日", icon: "03", sub: "Day 3" },
                { step: "術後休養", icon: "04", sub: "Day 4" },
                { step: "觀光回程", icon: "05", sub: "Day 5" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="flex flex-col items-center gap-4 group"
                >
                  {/* Step circle with shadow for depth */}
                  <motion.div
                    className="w-[130px] h-[130px] relative cursor-default"
                    whileHover={{ y: -8, transition: { duration: 0.4 } }}
                  >
                    {/* Outer ring — stronger */}
                    <div className="absolute inset-0 rounded-full" style={{
                      border: "1.5px solid rgba(17,17,17,0.12)",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                    }} />
                    {/* Inner content */}
                    <div className="absolute inset-2 rounded-full flex flex-col items-center justify-center" style={{
                      background: "rgba(253,252,240,0.98)",
                      boxShadow: `inset 0 0 20px rgba(212,175,55,0.05), ${goldGlow}`,
                    }}>
                      <span className="font-serif text-3xl font-medium" style={{ color: "#D4AF37" }}>{item.icon}</span>
                      <span className="text-xs tracking-[0.2em] uppercase mt-1 font-medium" style={{ color: "#999999" }}>{item.sub}</span>
                    </div>
                    {/* Hover gold ring */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                      border: "2px solid rgba(212,175,55,0.5)",
                      boxShadow: "0 0 30px rgba(212,175,55,0.25)",
                    }} />
                  </motion.div>

                  <span className="text-lg tracking-wide font-medium transition-colors duration-500 group-hover:text-[#D4AF37]" style={{ color: "#222222" }}>
                    {item.step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );

    default:
      return null;
  }
}
