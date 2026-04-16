"use client";

import { motion } from "motion/react";
import { GoldDivider } from "@/components/ui/gold-divider";

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
      <GoldDivider className="mb-16" />

      <p className="text-gold/60 text-sm tracking-[0.2em] uppercase text-center mb-4">
        Member Center Preview
      </p>
      <h3 className="font-serif text-gold text-2xl text-center mb-12">
        會員中心 — 行程追蹤概念
      </h3>

      <motion.div
        className="bg-obsidian-card border-hairline border-gold/20 p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold font-serif">W</div>
          <div>
            <p className="text-gold text-sm">Hi, 王小姐</p>
            <p className="text-neutral-600 text-xs">眼部整形 — 雙眼皮手術</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {journeySteps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-3 h-3 shrink-0 ${
                step.status === "done" ? "bg-gold" :
                step.status === "current" ? "border border-gold bg-gold/30 animate-pulse" :
                "border border-gold/20"
              }`} />
              <div className="flex-1 flex justify-between">
                <span className={`text-sm ${
                  step.status === "done" ? "text-gold/60" :
                  step.status === "current" ? "text-gold" :
                  "text-neutral-600"
                }`}>{step.label}</span>
                <span className="text-neutral-600 text-xs">{step.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="border border-gold/10 p-4">
            <p className="text-gold text-xs tracking-wider mb-2">我的文件</p>
            <p className="text-neutral-400 text-sm">護照 &#10003;</p>
            <p className="text-neutral-400 text-sm">體檢報告 &#10003;</p>
            <p className="text-neutral-600 text-sm">同意書 &#10007;</p>
          </div>
          <div className="border border-gold/10 p-4">
            <p className="text-gold text-xs tracking-wider mb-2">我的顧問</p>
            <p className="text-neutral-400 text-sm">Kelly 顧問</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs border border-gold/20 text-gold/60 px-2 py-1">LINE 對話</span>
              <span className="text-xs border border-gold/20 text-gold/60 px-2 py-1">撥打電話</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
