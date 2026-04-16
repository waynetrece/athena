"use client";

import { motion } from "motion/react";
import { MemberPreview } from "./member-preview";
import type { BookingData } from "./booking-flow";

const serviceLabels: Record<string, string> = {
  eyes: "眼部整形", nose: "鼻部整形", face: "臉部微整",
  body: "體雕抽脂", intimate: "私密整形", skin: "皮膚美容",
};
const methodLabels: Record<string, string> = { video: "線上視訊", line: "LINE 通話", inperson: "到店面談" };

export function BookingComplete({ data }: { data: BookingData }) {
  const serviceName = serviceLabels[data.service] ?? data.service;

  return (
    <div className="min-h-screen px-6 py-24" style={{
      background: "linear-gradient(160deg, #F5F3E8 0%, #FDFCF0 30%, #F8F6EB 70%, #F0EDE0 100%)",
    }}>
      <motion.div
        className="max-w-lg mx-auto text-center mb-20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Check icon */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center" style={{
          border: "1.5px solid #D4AF37",
          color: "#D4AF37",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="font-serif text-4xl mb-4" style={{
          color: "#0A0A0A",
          fontStyle: "italic",
          textShadow: "0 2px 12px rgba(0,0,0,0.04)",
        }}>
          預約成功
        </h2>

        {/* Summary card */}
        <div className="text-left mt-8 p-6 space-y-4" style={{
          border: "1px solid rgba(17,17,17,0.08)",
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        }}>
          {[
            { label: "諮詢項目", value: serviceName, highlight: true },
            { label: "諮詢方式", value: methodLabels[data.method] },
            { label: "預約日期", value: `${data.date} ${data.time}` },
            { label: "姓名", value: data.name },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center py-1" style={{
              borderBottom: "1px solid rgba(17,17,17,0.04)",
            }}>
              <span className="text-sm" style={{ color: "#999999" }}>{row.label}</span>
              <span className="text-sm font-medium" style={{
                color: row.highlight ? "#B8962D" : "#222222",
              }}>{row.value}</span>
            </div>
          ))}
        </div>

        <p className="text-sm mt-6 tracking-wider" style={{ color: "#999999" }}>
          我們會在 24 小時內透過 LINE 與您確認詳細資訊
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <a
            href="https://lin.ee/uy9vYWW"
            className="px-8 py-3 text-sm tracking-[0.15em] font-medium transition-all duration-300 hover:shadow-lg"
            style={{ background: "#D4AF37", color: "#FDFCF0" }}
          >
            加入 LINE 好友
          </a>
          <a
            href="/"
            className="px-8 py-3 text-sm tracking-[0.15em] font-medium transition-all duration-300"
            style={{ border: "1.5px solid rgba(17,17,17,0.15)", color: "#555555" }}
          >
            返回首頁
          </a>
        </div>
      </motion.div>

      {/* Member center preview */}
      <MemberPreview />
    </div>
  );
}
