"use client";

import { motion } from "motion/react";
import { timeSlots } from "@/lib/data";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

const methods = [
  {
    id: "video", label: "線上視訊", desc: "30 分鐘",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="14" height="14" rx="2" />
        <path d="M16 10l4-2v8l-4-2" />
      </svg>
    ),
  },
  {
    id: "line", label: "LINE 通話", desc: "20 分鐘",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "inperson", label: "到店面談", desc: "台北中山區",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

function MiniCalendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = today.toLocaleDateString("zh-TW", { year: "numeric", month: "long" });

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div>
      <p className="text-sm mb-3 font-medium tracking-wider" style={{ color: "#B8962D" }}>{monthName}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="py-1 font-medium" style={{ color: "rgba(17,17,17,0.35)" }}>{d}</div>
        ))}
        {days.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isPast = day <= today.getDate();
          const isSelected = selected === dateStr;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onSelect(dateStr)}
              className="py-1.5 transition-all duration-300"
              style={{
                background: isSelected ? "#D4AF37" : "transparent",
                color: isSelected ? "#FDFCF0" : isPast ? "rgba(17,17,17,0.15)" : "#555555",
                cursor: isPast ? "not-allowed" : "pointer",
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StepSchedule({ data, update, onNext, onBack }: Props) {
  const canProceed = data.method && data.date && data.time;

  return (
    <div>
      <h2 className="font-serif text-5xl md:text-6xl text-center mb-12" style={{
        color: "#0A0A0A",
        fontStyle: "italic",
        textShadow: "0 2px 15px rgba(0,0,0,0.05)",
      }}>
        選擇諮詢方式與時間
      </h2>

      {/* Method */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {methods.map((m) => {
          const selected = data.method === m.id;
          return (
            <button
              key={m.id}
              onClick={() => update({ method: m.id })}
              className="p-5 text-center transition-all duration-500"
              style={{
                border: `2px solid ${selected ? "#D4AF37" : "rgba(17,17,17,0.08)"}`,
                background: selected ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.5)",
                boxShadow: selected ? "0 6px 24px rgba(212,175,55,0.2)" : "0 3px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex justify-center mb-2" style={{
                color: selected ? "#D4AF37" : "rgba(17,17,17,0.3)",
              }}>
                {m.icon}
              </div>
              <div className="font-medium tracking-wider" style={{
                color: selected ? "#B8962D" : "#555555",
              }}>{m.label}</div>
              <div className="text-xs mt-1" style={{ color: "rgba(17,17,17,0.35)" }}>{m.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Calendar + Time */}
      <div className="grid md:grid-cols-2 gap-6 p-6" style={{
        border: "1px solid rgba(17,17,17,0.06)",
        background: "rgba(255,255,255,0.4)",
      }}>
        <MiniCalendar selected={data.date} onSelect={(d) => update({ date: d })} />
        <div>
          <p className="text-sm mb-3 font-medium tracking-wider" style={{ color: "#B8962D" }}>選擇時段</p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const selected = data.time === slot;
              return (
                <button
                  key={slot}
                  onClick={() => update({ time: slot })}
                  className="py-2 text-sm transition-all duration-300"
                  style={{
                    border: `1px solid ${selected ? "#D4AF37" : "rgba(17,17,17,0.08)"}`,
                    background: selected ? "rgba(212,175,55,0.08)" : "transparent",
                    color: selected ? "#B8962D" : "#666666",
                    fontWeight: selected ? 600 : 400,
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-12 flex justify-between items-center">
        <button onClick={onBack} className="text-sm font-medium tracking-wider transition-colors duration-300 hover:opacity-70" style={{ color: "#999999" }}>
          ← 上一步
        </button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className="px-12 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500"
          style={{
            background: canProceed ? "#D4AF37" : "rgba(212,175,55,0.15)",
            color: canProceed ? "#FDFCF0" : "rgba(212,175,55,0.4)",
            boxShadow: canProceed ? "0 4px 20px rgba(212,175,55,0.3)" : "none",
            cursor: canProceed ? "pointer" : "not-allowed",
          }}
          whileHover={canProceed ? { scale: 1.02 } : undefined}
        >
          下一步 →
        </motion.button>
      </div>
    </div>
  );
}
