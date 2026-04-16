"use client";

import { motion } from "motion/react";

const journeySteps = [
  { status: "done", label: "諮詢評估", date: "04/16" },
  { status: "done", label: "方案確認", date: "04/18" },
  { status: "current", label: "機票訂購", date: "04/20" },
  { status: "pending", label: "飯店入住", date: "05/01" },
  { status: "pending", label: "術前檢查", date: "05/02" },
  { status: "pending", label: "手術日", date: "05/03" },
  { status: "pending", label: "術後回診", date: "05/04" },
  { status: "pending", label: "觀光回程", date: "05/05" },
];

export function MemberPreview() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Editorial divider */}
      <div className="flex items-center gap-4 mb-16">
        <div className="h-[1.5px] flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(17,17,17,0.1))" }} />
        <div className="w-2 h-2 rotate-45" style={{ border: "1.5px solid rgba(212,175,55,0.4)" }} />
        <div className="h-[1.5px] flex-1" style={{ background: "linear-gradient(270deg, transparent, rgba(17,17,17,0.1))" }} />
      </div>

      <p className="text-sm tracking-[0.3em] uppercase text-center mb-4 font-medium" style={{ color: "rgba(17,17,17,0.35)" }}>
        Member Center Preview
      </p>
      <h3 className="font-serif text-2xl text-center mb-12" style={{
        color: "#0A0A0A",
        fontStyle: "italic",
      }}>
        會員中心 — 行程追蹤概念
      </h3>

      <motion.div
        className="p-8"
        style={{
          border: "1px solid rgba(17,17,17,0.08)",
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 flex items-center justify-center font-serif text-lg" style={{
            border: "1.5px solid rgba(212,175,55,0.3)",
            background: "rgba(212,175,55,0.06)",
            color: "#B8962D",
          }}>W</div>
          <div>
            <p className="text-sm font-medium" style={{ color: "#222222" }}>Hi, 王小姐</p>
            <p className="text-xs" style={{ color: "#999999" }}>眼部整形 — 雙眼皮手術</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {journeySteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-3 h-3 shrink-0" style={{
                background: step.status === "done" ? "#D4AF37" :
                  step.status === "current" ? "rgba(212,175,55,0.3)" : "transparent",
                border: step.status === "pending" ? "1.5px solid rgba(17,17,17,0.12)" :
                  step.status === "current" ? "1.5px solid #D4AF37" : "none",
              }} />
              <div className="flex-1 flex justify-between">
                <span className="text-sm" style={{
                  color: step.status === "done" ? "#999999" :
                    step.status === "current" ? "#B8962D" : "rgba(17,17,17,0.3)",
                  fontWeight: step.status === "current" ? 600 : 400,
                }}>{step.label}</span>
                <span className="text-xs" style={{ color: "rgba(17,17,17,0.3)" }}>{step.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4" style={{ border: "1px solid rgba(17,17,17,0.06)" }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-3 font-medium" style={{ color: "#B8962D" }}>我的文件</p>
            <p className="text-sm" style={{ color: "#555555" }}>護照 ✓</p>
            <p className="text-sm" style={{ color: "#555555" }}>體檢報告 ✓</p>
            <p className="text-sm" style={{ color: "rgba(17,17,17,0.3)" }}>同意書 —</p>
          </div>
          <div className="p-4" style={{ border: "1px solid rgba(17,17,17,0.06)" }}>
            <p className="text-xs tracking-[0.15em] uppercase mb-3 font-medium" style={{ color: "#B8962D" }}>我的顧問</p>
            <p className="text-sm mb-2" style={{ color: "#555555" }}>Kelly 顧問</p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1" style={{ border: "1px solid rgba(17,17,17,0.1)", color: "#999999" }}>LINE 對話</span>
              <span className="text-xs px-2 py-1" style={{ border: "1px solid rgba(17,17,17,0.1)", color: "#999999" }}>撥打電話</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
