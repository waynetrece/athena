"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────
   Three style previews for the Athena proposal
   S05 — 日式極簡  ·  S19 — 奢華編輯  ·  S23 — 奢華銀灰
   ───────────────────────────────────────────── */

const styles = ["S05", "S19", "S23"] as const;
type StyleKey = (typeof styles)[number];

const meta: Record<StyleKey, { name: string; sub: string; desc: string }> = {
  S05: { name: "日式極簡", sub: "Japanese Minimal Zen", desc: "白 · 奶油 · 呼吸感" },
  S19: { name: "奢華編輯", sub: "Luxury Editorial", desc: "象牙 · 襯線 · 雜誌排版" },
  S23: { name: "奢華銀灰", sub: "Luxury Silver", desc: "銀灰 · 冷調 · 金屬感" },
};

export default function StylePreviewPage() {
  const [active, setActive] = useState<StyleKey>("S05");

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* ── Tab bar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-center gap-2 py-4 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5">
        {styles.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-5 py-2 text-sm tracking-wide transition-all duration-500 rounded-full ${
              active === s
                ? "bg-white text-black font-medium shadow-lg shadow-white/10"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            {s} — {meta[s].name}
          </button>
        ))}
      </nav>

      {/* ── Previews ── */}
      <div className="pt-20">
        <AnimatePresence mode="wait">
          {active === "S05" && <S05Preview key="s05" />}
          {active === "S19" && <S19Preview key="s19" />}
          {active === "S23" && <S23Preview key="s23" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   S05 — 日式極簡  Japanese Minimal Zen
   White #FFFFFF / Cream #FAF9F6 / Accent #C5A059
   Noto Serif JP + Noto Sans JP / 2-4px radius
   ═══════════════════════════════════════════════ */
function S05Preview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Cover Slide ── */}
      <section
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#FFFFFF" }}
      >
        {/* Subtle warm gradient atmosphere */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(197,160,89,0.04) 0%, transparent 70%)",
        }} />

        {/* Top gold hairline */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-16 h-px" style={{ background: "#C5A059" }} />

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center z-10 px-8"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-8" style={{ color: "#C5A059", fontFamily: "'Inter', sans-serif" }}>
            Website Proposal
          </p>

          <h1
            className="text-6xl md:text-8xl font-light mb-6 leading-tight"
            style={{ color: "#111111", fontFamily: "'Noto Serif JP', 'Playfair Display', serif", letterSpacing: "-0.02em" }}
          >
            Athena
          </h1>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-12 h-px" style={{ background: "rgba(197,160,89,0.4)" }} />
            <p className="text-lg tracking-[0.3em]" style={{ color: "#666666", fontFamily: "'Inter', sans-serif" }}>
              韓 境 美 學
            </p>
            <div className="w-12 h-px" style={{ background: "rgba(197,160,89,0.4)" }} />
          </div>

          <p className="text-sm tracking-wider" style={{ color: "#999999", fontFamily: "'Inter', sans-serif" }}>
            網站優化提案
          </p>
        </motion.div>

        {/* Bottom zen element */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="w-24 h-px origin-center"
            style={{ background: "linear-gradient(90deg, transparent, #C5A059, transparent)" }}
          />
        </div>
      </section>

      {/* ── Content Slide — List ── */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{ background: "#FAF9F6" }}
      >
        <div className="max-w-2xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#C5A059" }}>
              Analysis
            </p>
            <h2
              className="text-4xl md:text-5xl font-light mb-16 leading-snug"
              style={{ color: "#111111", fontFamily: "'Noto Serif JP', 'Playfair Display', serif" }}
            >
              我們深度分析了<br />您的網站
            </h2>
          </motion.div>

          <div className="space-y-6">
            {["HTML 原始碼逐行檢查", "SEO 標籤與搜尋排名分析", "設計風格與使用者體驗評估", "功能完整性與競品對比", "效能與安全性檢測"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 group"
              >
                <span className="text-xs w-6 text-right" style={{ color: "#C5A059", fontFamily: "'Inter', sans-serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-grow transition-all duration-700 group-hover:w-8" style={{ background: "rgba(197,160,89,0.2)", maxWidth: "40px" }} />
                <span className="text-lg" style={{ color: "#333333", fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Card Slide ── */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{ background: "#FFFFFF" }}
      >
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ color: "#111111", fontFamily: "'Noto Serif JP', 'Playfair Display', serif" }}>
              功能升級建議
            </h2>
            <p className="text-base" style={{ color: "#999999" }}>提升轉換率的關鍵功能</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "預約流程簡化", desc: "引導式 3 步驟，降低填寫壓力" },
              { label: "LINE 即時聯繫", desc: "浮動按鈕，一鍵諮詢" },
              { label: "會員體驗升級", desc: "行程追蹤、術後提醒、專屬顧問" },
              { label: "數據追蹤佈建", desc: "GA4 + GTM + FB Pixel 全面導入" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="p-8 transition-all duration-500 hover:shadow-lg"
                style={{
                  background: "#FAF9F6",
                  borderRadius: "4px",
                  border: "1px solid rgba(197,160,89,0.12)",
                }}
              >
                <div className="w-8 h-px mb-6" style={{ background: "#C5A059" }} />
                <h3 className="text-xl font-medium mb-3" style={{ color: "#111111", fontFamily: "'Inter', sans-serif" }}>
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#777777" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Style label */}
      <div className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full text-xs tracking-wider"
        style={{ background: "rgba(250,249,246,0.95)", color: "#C5A059", border: "1px solid rgba(197,160,89,0.2)" }}>
        S05 — 日式極簡
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   S19 — 奢華編輯  Luxury Editorial
   Cream #FDFCF0 / Text #111111 / Accent #D4AF37
   Bodoni MT + Inter / 0px radius / 0.5px hairlines
   Magazine grid, dramatic serif, editorial flair
   ═══════════════════════════════════════════════ */
function S19Preview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Cover Slide ── */}
      <section
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "#FDFCF0" }}
      >
        {/* Hairline frame */}
        <div className="absolute inset-8 pointer-events-none" style={{ border: "0.5px solid rgba(17,17,17,0.08)" }} />

        {/* Editorial layout — asymmetric */}
        <div className="relative z-10 flex items-end gap-16 px-16">
          {/* Left — big title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1"
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}>
              Website Proposal · 2026
            </p>

            <h1
              className="text-7xl md:text-9xl leading-none mb-8"
              style={{
                color: "#111111",
                fontFamily: "'Playfair Display', 'Bodoni MT', serif",
                fontWeight: 400,
                fontStyle: "italic",
                letterSpacing: "-0.03em",
              }}
            >
              Athena
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px" style={{ background: "#D4AF37" }} />
              <span className="text-sm tracking-[0.25em]" style={{ color: "#111111", fontFamily: "'Inter', sans-serif" }}>
                韓境美學
              </span>
            </div>

            <p className="text-sm" style={{ color: "#999999", fontFamily: "'Inter', sans-serif" }}>
              網站優化提案
            </p>
          </motion.div>

          {/* Right — decorative gold block */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="w-px h-48 origin-bottom"
            style={{ background: "linear-gradient(to top, #D4AF37, transparent)" }}
          />
        </div>

        {/* Bottom editorial line */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#BBBBBB" }}>Vol. I</span>
          <div className="flex-1 mx-8 h-px" style={{ background: "rgba(17,17,17,0.06)" }} />
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#BBBBBB" }}>April 2026</span>
        </div>
      </section>

      {/* ── Content Slide — List ── */}
      <section
        className="h-screen flex items-center relative"
        style={{ background: "#FDFCF0" }}
      >
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(17,17,17,0.06)" }} />

        {/* Magazine two-column layout */}
        <div className="grid grid-cols-12 gap-8 w-full max-w-6xl mx-auto px-16">
          {/* Left column — title area */}
          <div className="col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ color: "#D4AF37" }}>
                01 — Analysis
              </span>
              <h2
                className="text-5xl md:text-6xl leading-tight mb-8"
                style={{
                  color: "#111111",
                  fontFamily: "'Playfair Display', 'Bodoni MT', serif",
                  fontWeight: 400,
                }}
              >
                深度<br />網站<br />分析
              </h2>
              <div className="w-12 h-px" style={{ background: "#D4AF37" }} />
            </motion.div>
          </div>

          {/* Right column — items with hairline separators */}
          <div className="col-span-7 col-start-6 flex flex-col justify-center">
            {["HTML 原始碼逐行檢查", "SEO 標籤與搜尋排名分析", "設計風格與使用者體驗評估", "功能完整性與競品對比", "效能與安全性檢測"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="py-6 group"
                style={{ borderBottom: "0.5px solid rgba(17,17,17,0.08)" }}
              >
                <div className="flex items-baseline gap-6">
                  <span
                    className="text-3xl font-light"
                    style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg" style={{ color: "#333333", fontFamily: "'Inter', sans-serif" }}>
                    {item}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Card Slide ── */}
      <section
        className="h-screen flex items-center relative"
        style={{ background: "#F8F7F0" }}
      >
        <div className="max-w-6xl mx-auto px-16 w-full">
          <div className="flex items-end justify-between mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[10px] tracking-[0.5em] uppercase block mb-4" style={{ color: "#D4AF37" }}>
                02 — Upgrade
              </span>
              <h2 className="text-5xl" style={{ color: "#111111", fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: "italic" }}>
                功能升級建議
              </h2>
            </motion.div>
            <p className="text-sm" style={{ color: "#999999" }}>提升轉換率的關鍵功能</p>
          </div>

          <div className="grid grid-cols-4 gap-0" style={{ border: "0.5px solid rgba(17,17,17,0.08)" }}>
            {[
              { label: "預約流程簡化", desc: "引導式 3 步驟，降低填寫壓力" },
              { label: "LINE 即時聯繫", desc: "浮動按鈕，一鍵諮詢" },
              { label: "會員體驗升級", desc: "行程追蹤、術後提醒、專屬顧問" },
              { label: "數據追蹤佈建", desc: "GA4 + GTM + FB Pixel 全面導入" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="p-10 relative group hover:bg-white/50 transition-colors duration-500"
                style={{ borderRight: i < 3 ? "0.5px solid rgba(17,17,17,0.08)" : "none" }}
              >
                <span className="text-5xl font-light block mb-6" style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-medium mb-3" style={{ color: "#111111", fontFamily: "'Inter', sans-serif", letterSpacing: "0.02em" }}>
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#888888" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Style label */}
      <div className="fixed bottom-6 left-6 z-50 px-4 py-2 text-xs tracking-wider"
        style={{ background: "rgba(253,252,240,0.95)", color: "#D4AF37", border: "0.5px solid rgba(212,175,55,0.2)" }}>
        S19 — 奢華編輯
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   S23 — 奢華銀灰  Luxury Silver
   BG #0D0D0D / Silver #E5E5E5 / Accent #C0C0C0
   Montserrat / 4px radius / Metallic reflections
   ═══════════════════════════════════════════════ */
function S23Preview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── Cover Slide ── */}
      <section
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(170deg, #111111 0%, #0A0A0A 50%, #0D0D0D 100%)" }}
      >
        {/* Silver glow atmosphere */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(192,192,192,0.06) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(192,192,192,0.03) 0%, transparent 40%)",
        }} />

        {/* Metallic border frame */}
        <div className="absolute inset-6 pointer-events-none" style={{
          border: "1px solid rgba(192,192,192,0.08)",
          borderRadius: "4px",
        }} />

        {/* Corner metallic accents */}
        <div className="absolute top-6 left-6 w-12 h-12 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, rgba(192,192,192,0.3), transparent)" }} />
          <div className="absolute top-0 left-0 h-full w-px" style={{ background: "linear-gradient(180deg, rgba(192,192,192,0.3), transparent)" }} />
        </div>
        <div className="absolute top-6 right-6 w-12 h-12 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-px" style={{ background: "linear-gradient(270deg, rgba(192,192,192,0.3), transparent)" }} />
          <div className="absolute top-0 right-0 h-full w-px" style={{ background: "linear-gradient(180deg, rgba(192,192,192,0.3), transparent)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center z-10"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-10" style={{ color: "#808080", fontFamily: "'Montserrat', 'Inter', sans-serif" }}>
            Website Proposal
          </p>

          <h1
            className="text-7xl md:text-9xl font-light mb-4"
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 200,
              letterSpacing: "0.08em",
              background: "linear-gradient(180deg, #FFFFFF 0%, #C0C0C0 50%, #808080 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ATHENA
          </h1>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-10 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.5))" }} />
            <span className="text-lg tracking-[0.4em] font-light" style={{ color: "#C0C0C0", fontFamily: "'Montserrat', 'Inter', sans-serif" }}>
              韓境美學
            </span>
            <div className="w-10 h-px" style={{ background: "linear-gradient(270deg, transparent, rgba(192,192,192,0.5))" }} />
          </div>

          <p className="text-sm tracking-widest" style={{ color: "#666666", fontFamily: "'Montserrat', 'Inter', sans-serif" }}>
            網站優化提案
          </p>
        </motion.div>

        {/* Bottom silver line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-16 w-32 h-px origin-center"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,192,192,0.4), transparent)" }}
        />
      </section>

      {/* ── Content Slide — List ── */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{ background: "#0D0D0D" }}
      >
        <div className="max-w-2xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "#808080", fontFamily: "'Montserrat', sans-serif" }}>
              Analysis
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 200,
              color: "#E5E5E5",
              letterSpacing: "0.02em",
            }}>
              我們深度分析了<br />您的網站
            </h2>
          </motion.div>

          <div className="space-y-1">
            {["HTML 原始碼逐行檢查", "SEO 標籤與搜尋排名分析", "設計風格與使用者體驗評估", "功能完整性與競品對比", "效能與安全性檢測"].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center gap-5 py-5 group transition-colors duration-300 hover:bg-white/[0.02] px-4"
                style={{ borderRadius: "4px" }}
              >
                <span className="text-sm w-8 text-right font-light" style={{
                  color: "#808080",
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="w-6 h-px" style={{ background: "rgba(192,192,192,0.15)" }} />
                <span className="text-lg font-light" style={{
                  color: "#CCCCCC",
                  fontFamily: "'Montserrat', 'Inter', sans-serif",
                }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Card Slide ── */}
      <section
        className="h-screen flex items-center justify-center relative"
        style={{ background: "#0A0A0A" }}
      >
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 200,
              color: "#E5E5E5",
            }}>
              功能升級建議
            </h2>
            <p className="text-sm font-light" style={{ color: "#666666", fontFamily: "'Montserrat', sans-serif" }}>
              提升轉換率的關鍵功能
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "預約流程簡化", desc: "引導式 3 步驟，降低填寫壓力" },
              { label: "LINE 即時聯繫", desc: "浮動按鈕，一鍵諮詢" },
              { label: "會員體驗升級", desc: "行程追蹤、術後提醒、專屬顧問" },
              { label: "數據追蹤佈建", desc: "GA4 + GTM + FB Pixel 全面導入" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 transition-all duration-500 group relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "4px",
                  border: "1px solid rgba(192,192,192,0.06)",
                }}
              >
                {/* Silver shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: "linear-gradient(135deg, transparent, rgba(192,192,192,0.03), transparent)" }}
                />
                <span className="text-4xl font-extralight block mb-5" style={{
                  background: "linear-gradient(180deg, #C0C0C0, #808080)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base mb-2" style={{ color: "#E5E5E5", fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                  {item.label}
                </h3>
                <p className="text-sm font-light" style={{ color: "#888888" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Style label */}
      <div className="fixed bottom-6 left-6 z-50 px-4 py-2 rounded text-xs tracking-wider"
        style={{ background: "rgba(13,13,13,0.95)", color: "#C0C0C0", border: "1px solid rgba(192,192,192,0.15)" }}>
        S23 — 奢華銀灰
      </div>
    </motion.div>
  );
}
