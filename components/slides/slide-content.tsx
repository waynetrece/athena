"use client";

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

/* ─── Editorial gold line separator ─── */
function EditorialLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="h-[1.5px] flex-1 origin-left"
        style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.6), rgba(212,175,55,0.05))" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
      <div className="w-2 h-2 rotate-45 border-[1.5px]" style={{ borderColor: "rgba(212,175,55,0.4)" }} />
      <motion.div
        className="h-[1.5px] flex-1 origin-right"
        style={{ background: "linear-gradient(270deg, rgba(212,175,55,0.6), rgba(212,175,55,0.05))" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ─── Animated shimmer sweep ─── */
function GoldShimmer() {
  return (
    <div className="relative h-[1.5px] w-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: "rgba(17,17,17,0.08)" }} />
      <motion.div
        className="absolute inset-y-0 w-1/3"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }}
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      />
    </div>
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
          {/* Subtle gold radial atmosphere */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none" style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)",
          }} />

          {/* Decorative vertical gold line */}
          <motion.div
            className="absolute right-[12%] top-1/2 -translate-y-1/2 w-px h-0 origin-center"
            animate={{ height: "320px" }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            style={{ background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.35), transparent)" }}
          />

          <motion.p
            variants={fadeUp}
            className="text-sm tracking-[0.5em] uppercase mb-10 relative z-10"
            style={{ color: "#D4AF37" }}
          >
            Website Proposal · 2026
          </motion.p>

          <EditorialLine className="max-w-sm mx-auto mb-12" delay={0.3} />

          <motion.h1
            variants={fadeUp}
            className="font-serif text-8xl md:text-[140px] leading-none mb-8 relative z-10"
            style={{ color: "#111111", fontStyle: "italic", letterSpacing: "-0.03em" }}
          >
            Athena
          </motion.h1>

          <motion.div variants={fadeUp} className="flex items-center justify-center gap-6 mb-8 relative z-10">
            <div className="w-16 h-[1.5px]" style={{ background: "#D4AF37" }} />
            <p className="text-2xl tracking-[0.4em]" style={{ color: "#333333" }}>
              韓 境 美 學
            </p>
            <div className="w-16 h-[1.5px]" style={{ background: "#D4AF37" }} />
          </motion.div>

          <motion.p variants={fadeUp} className="text-xl tracking-widest relative z-10" style={{ color: "#999999" }}>
            網站優化提案
          </motion.p>

          <EditorialLine className="max-w-sm mx-auto mt-14 mb-8" delay={0.6} />

          <motion.p variants={fadeUp} className="text-base tracking-wider relative z-10" style={{ color: "#CCCCCC" }}>
            按 <span style={{ color: "#D4AF37" }}>→</span> 或點擊右側繼續
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
          {/* Magazine two-column layout */}
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left — large editorial title */}
            <div className="col-span-5">
              <motion.div variants={slideFromLeft}>
                <span className="text-sm tracking-[0.5em] uppercase block mb-6" style={{ color: "#D4AF37" }}>
                  01 — Analysis
                </span>
                <h2
                  className="font-serif text-6xl md:text-7xl leading-tight mb-10"
                  style={{ color: "#111111", fontStyle: "italic" }}
                >
                  深度<br />網站<br />分析
                </h2>
                <motion.div
                  className="w-16 h-[1.5px] origin-left"
                  style={{ background: "#D4AF37" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>
            </div>

            {/* Right — items list with hairline separators */}
            <div className="col-span-6 col-start-7">
              {(slide.items as string[]).map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="py-8 group"
                  style={{ borderBottom: "1px solid rgba(17,17,17,0.08)" }}
                >
                  <div className="flex items-baseline gap-8">
                    <span
                      className="font-serif text-4xl font-light transition-colors duration-500 group-hover:text-[#D4AF37]"
                      style={{ color: "rgba(212,175,55,0.35)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-2xl transition-colors duration-500 group-hover:text-[#111111]"
                      style={{ color: "#333333" }}
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

    /* ═══════════════ COMPARISON ═══════════════ */
    case "comparison":
      return (
        <motion.div
          className="max-w-6xl w-full"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          {/* Editorial header */}
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
                02 — SEO
              </span>
              <h2 className="font-serif text-5xl md:text-6xl" style={{ color: "#111111", fontStyle: "italic" }}>
                {slide.title}
              </h2>
            </div>
            <p className="text-xl" style={{ color: "#999999" }}>{slide.subtitle}</p>
          </motion.div>
          <GoldShimmer />

          <div className="mt-10 space-y-0">
            {(slide.items as Array<{ label: string; bad: string; good: string }>).map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-12 gap-0 group"
                style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }}
              >
                {/* Label column */}
                <div className="col-span-3 py-7 pr-6 flex items-center">
                  <span className="font-serif text-xl tracking-wide" style={{ color: "#D4AF37" }}>
                    {item.label}
                  </span>
                </div>

                {/* Bad column */}
                <div className="col-span-4 py-7 px-8 relative" style={{ borderLeft: "1px solid rgba(17,17,17,0.06)" }}>
                  <div className="flex items-start gap-4">
                    <motion.span
                      className="text-lg mt-0.5 shrink-0"
                      style={{ color: "rgba(200,60,60,0.7)" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                    >
                      ✕
                    </motion.span>
                    <div>
                      <span className="text-xs tracking-[0.2em] uppercase block mb-2" style={{ color: "rgba(200,60,60,0.5)" }}>
                        現狀
                      </span>
                      <span className="text-base leading-relaxed" style={{ color: "#777777" }}>{item.bad}</span>
                    </div>
                  </div>
                </div>

                {/* Good column */}
                <div className="col-span-5 py-7 px-8 relative" style={{ borderLeft: "1px solid rgba(17,17,17,0.06)", background: "rgba(212,175,55,0.02)" }}>
                  <div className="flex items-start gap-4">
                    <motion.span
                      className="text-lg mt-0.5 shrink-0"
                      style={{ color: "rgba(52,140,80,0.8)" }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                    >
                      ✓
                    </motion.span>
                    <div>
                      <span className="text-xs tracking-[0.2em] uppercase block mb-2" style={{ color: "rgba(212,175,55,0.7)" }}>
                        建議
                      </span>
                      <span className="text-base leading-relaxed" style={{ color: "#333333" }}>{item.good}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
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
            <span className="text-sm tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
              03 — Design
            </span>
            <h2 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#111111", fontStyle: "italic" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#999999" }}>{slide.subtitle}</p>
          </motion.div>
          <GoldShimmer />

          <div className="mt-10 space-y-0">
            {(slide.items as string[]).map((item, i) => (
              <motion.div
                key={i}
                variants={slideFromLeft}
                className="group relative"
              >
                <div className="flex items-start gap-8 py-7" style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }}>
                  {/* Large editorial number */}
                  <span className="font-serif text-5xl font-light shrink-0 w-16 text-right transition-colors duration-500 group-hover:text-[#D4AF37]" style={{ color: "rgba(17,17,17,0.08)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Red accent bar + content */}
                  <div className="flex items-start gap-5 flex-1">
                    <motion.div
                      className="w-[2px] h-0 shrink-0 mt-2"
                      style={{ background: "rgba(200,60,60,0.5)" }}
                      animate={{ height: "24px" }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    />
                    <span className="text-xl leading-relaxed" style={{ color: "#333333" }}>{item}</span>
                  </div>
                </div>

                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.03), transparent 40%)" }}
                />
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
            <span className="text-sm tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
              04 — Content
            </span>
            <h2 className="font-serif text-5xl md:text-6xl mb-4" style={{ color: "#111111", fontStyle: "italic" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#999999" }}>{slide.subtitle}</p>
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
                  className="flex items-start gap-6 py-7 px-6 transition-colors duration-500 group-hover:bg-[rgba(212,175,55,0.02)]"
                  style={{ borderBottom: "1px solid rgba(17,17,17,0.06)" }}
                >
                  {/* Gold icon */}
                  <span className="text-lg mt-0.5 shrink-0 transition-all duration-500 group-hover:scale-125" style={{ color: "#D4AF37" }}>
                    {item.icon}
                  </span>
                  <span className="text-xl leading-relaxed" style={{ color: "#333333" }}>{item.text}</span>
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
              <span className="text-sm tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
                05 — Upgrade
              </span>
              <h2 className="font-serif text-5xl md:text-6xl" style={{ color: "#111111", fontStyle: "italic" }}>
                {slide.title}
              </h2>
            </div>
            <p className="text-xl" style={{ color: "#999999" }}>{slide.subtitle}</p>
          </motion.div>

          {/* Magazine 4-column grid */}
          <div className="grid grid-cols-4 gap-0" style={{ border: "1px solid rgba(17,17,17,0.08)" }}>
            {(slide.items as Array<{ label: string; desc: string }>).map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="p-10 relative group transition-colors duration-500 hover:bg-white/60"
                style={{ borderRight: i < 3 ? "1px solid rgba(17,17,17,0.08)" : "none" }}
              >
                {/* Large editorial number */}
                <motion.span
                  className="font-serif text-6xl font-light block mb-8 transition-colors duration-500 group-hover:text-[#D4AF37]"
                  style={{ color: "rgba(212,175,55,0.2)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                {/* Gold accent line */}
                <motion.div
                  className="w-8 h-[1.5px] mb-6 origin-left"
                  style={{ background: "#D4AF37" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                />

                <h3 className="text-xl font-medium mb-4 tracking-wide" style={{ color: "#111111" }}>
                  {item.label}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "#888888" }}>
                  {item.desc}
                </p>

                {/* Bottom-right corner accent on hover */}
                <div className="absolute bottom-4 right-4 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 right-0 w-full h-[1.5px]" style={{ background: "rgba(212,175,55,0.4)" }} />
                  <div className="absolute bottom-0 right-0 h-full w-[1.5px]" style={{ background: "rgba(212,175,55,0.4)" }} />
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
            <span className="text-sm tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
              06 — Journey
            </span>
            <h2 className="font-serif text-5xl md:text-7xl mb-4" style={{ color: "#111111", fontStyle: "italic" }}>
              {slide.title}
            </h2>
            <p className="text-xl" style={{ color: "#999999" }}>{slide.subtitle}</p>
          </motion.div>

          <EditorialLine className="max-w-sm mx-auto mb-8" delay={0.2} />

          <motion.p variants={fadeUp} className="text-xl leading-relaxed mb-16 text-center max-w-2xl mx-auto" style={{ color: "#555555" }}>
            {slide.description}
          </motion.p>

          {/* Creative editorial timeline */}
          <div className="relative">
            {/* Connecting horizontal line */}
            <motion.div
              className="absolute top-[68px] left-[6%] right-[6%] h-[1.5px] origin-left"
              style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: "easeOut" }}
            />

            {/* Traveling gold dot */}
            <motion.div
              className="absolute top-[64px] w-3 h-3 rounded-full z-10"
              style={{ background: "#D4AF37", boxShadow: "0 0 16px rgba(212,175,55,0.6)" }}
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
                  {/* Step circle */}
                  <motion.div
                    className="w-[130px] h-[130px] relative cursor-default"
                    whileHover={{ y: -8, transition: { duration: 0.4 } }}
                  >
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(17,17,17,0.08)" }} />
                    {/* Inner content */}
                    <div className="absolute inset-2 rounded-full flex flex-col items-center justify-center" style={{ background: "rgba(253,252,240,0.95)" }}>
                      <span className="font-serif text-3xl" style={{ color: "#D4AF37" }}>{item.icon}</span>
                      <span className="text-xs tracking-[0.2em] uppercase mt-1" style={{ color: "#BBBBBB" }}>{item.sub}</span>
                    </div>
                    {/* Hover gold ring */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500" style={{
                      border: "1.5px solid rgba(212,175,55,0.4)",
                      boxShadow: "0 0 24px rgba(212,175,55,0.15)",
                    }} />
                  </motion.div>

                  <span className="text-lg tracking-wide transition-colors duration-500 group-hover:text-[#D4AF37]" style={{ color: "#333333" }}>
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
