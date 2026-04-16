"use client";

import { motion } from "motion/react";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function StepContact({ data, update, onNext, onBack }: Props) {
  const canSubmit = data.name.trim() && data.phone.trim();

  return (
    <div>
      <h2 className="font-serif text-4xl text-center mb-2" style={{
        color: "#0A0A0A",
        fontStyle: "italic",
        textShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}>
        最後一步
      </h2>
      <p className="text-center mb-10 text-sm tracking-wider" style={{ color: "#999999" }}>
        留下聯絡方式，我們會盡快與您確認
      </p>

      <div className="space-y-6 p-8" style={{
        border: "1px solid rgba(17,17,17,0.06)",
        background: "rgba(255,255,255,0.4)",
      }}>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase font-medium block mb-2" style={{ color: "#B8962D" }}>
            姓名 *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="您的姓名"
            className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300 text-base"
            style={{
              borderBottom: "1.5px solid rgba(17,17,17,0.1)",
              color: "#222222",
            }}
            onFocus={(e) => e.target.style.borderBottomColor = "#D4AF37"}
            onBlur={(e) => e.target.style.borderBottomColor = "rgba(17,17,17,0.1)"}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase font-medium block mb-2" style={{ color: "#B8962D" }}>
            電話 *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="0912-345-678"
            className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300 text-base"
            style={{
              borderBottom: "1.5px solid rgba(17,17,17,0.1)",
              color: "#222222",
            }}
            onFocus={(e) => e.target.style.borderBottomColor = "#D4AF37"}
            onBlur={(e) => e.target.style.borderBottomColor = "rgba(17,17,17,0.1)"}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase font-medium block mb-2" style={{ color: "#B8962D" }}>
            LINE ID（選填）
          </label>
          <input
            type="text"
            value={data.lineId}
            onChange={(e) => update({ lineId: e.target.value })}
            placeholder="方便我們加您好友"
            className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300 text-base"
            style={{
              borderBottom: "1.5px solid rgba(17,17,17,0.1)",
              color: "#222222",
            }}
            onFocus={(e) => e.target.style.borderBottomColor = "#D4AF37"}
            onBlur={(e) => e.target.style.borderBottomColor = "rgba(17,17,17,0.1)"}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.2em] uppercase font-medium block mb-2" style={{ color: "#B8962D" }}>
            備註（選填）
          </label>
          <textarea
            value={data.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder="想特別諮詢的問題..."
            rows={3}
            className="w-full bg-transparent py-3 focus:outline-none transition-colors duration-300 resize-none text-base"
            style={{
              borderBottom: "1.5px solid rgba(17,17,17,0.1)",
              color: "#222222",
            }}
            onFocus={(e) => e.target.style.borderBottomColor = "#D4AF37"}
            onBlur={(e) => e.target.style.borderBottomColor = "rgba(17,17,17,0.1)"}
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-medium tracking-wider transition-colors duration-300 hover:opacity-70" style={{ color: "#999999" }}>
          ← 上一步
        </button>
        <motion.button
          onClick={onNext}
          disabled={!canSubmit}
          className="px-12 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500"
          style={{
            background: canSubmit ? "#D4AF37" : "rgba(212,175,55,0.15)",
            color: canSubmit ? "#FDFCF0" : "rgba(212,175,55,0.4)",
            boxShadow: canSubmit ? "0 4px 20px rgba(212,175,55,0.3)" : "none",
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
          whileHover={canSubmit ? { scale: 1.02 } : undefined}
        >
          確認預約
        </motion.button>
      </div>
    </div>
  );
}
