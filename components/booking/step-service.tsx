"use client";

import { motion } from "motion/react";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
};

/* SVG icons for each service */
const serviceIcons: Record<string, React.ReactNode> = {
  eyes: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  nose: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8" />
      <path d="M8 18c0-2 1.5-4 4-4s4 2 4 4" />
      <path d="M6 18h12" />
    </svg>
  ),
  face: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
      <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
    </svg>
  ),
  body: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    </svg>
  ),
  intimate: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  skin: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

const services = [
  { id: "eyes", label: "眼部整形" },
  { id: "nose", label: "鼻部整形" },
  { id: "face", label: "臉部微整" },
  { id: "body", label: "體雕抽脂" },
  { id: "intimate", label: "私密整形" },
  { id: "skin", label: "皮膚美容" },
];

export function StepService({ data, update, onNext }: Props) {
  return (
    <div>
      <h2 className="font-serif text-4xl text-center mb-2" style={{
        color: "#0A0A0A",
        fontStyle: "italic",
        textShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}>
        您想諮詢什麼項目？
      </h2>
      <p className="text-center mb-10 text-sm tracking-wider" style={{ color: "#999999" }}>
        選擇一個療程類別
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {services.map((svc) => {
          const selected = data.service === svc.id;
          return (
            <motion.button
              key={svc.id}
              onClick={() => update({ service: svc.id })}
              className="p-6 text-center transition-all duration-500 group"
              style={{
                border: `1.5px solid ${selected ? "#D4AF37" : "rgba(17,17,17,0.08)"}`,
                background: selected ? "rgba(212,175,55,0.06)" : "rgba(255,255,255,0.4)",
                boxShadow: selected ? "0 4px 20px rgba(212,175,55,0.15)" : "0 2px 8px rgba(0,0,0,0.03)",
              }}
              whileHover={{ y: -2, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mb-3 flex justify-center transition-colors duration-500" style={{
                color: selected ? "#D4AF37" : "rgba(17,17,17,0.35)",
              }}>
                {serviceIcons[svc.id]}
              </div>
              <div className="text-sm font-medium tracking-wider" style={{
                color: selected ? "#B8962D" : "#555555",
              }}>
                {svc.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <motion.button
          onClick={onNext}
          disabled={!data.service}
          className="px-12 py-3.5 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500"
          style={{
            background: data.service ? "#D4AF37" : "rgba(212,175,55,0.15)",
            color: data.service ? "#FDFCF0" : "rgba(212,175,55,0.4)",
            boxShadow: data.service ? "0 4px 20px rgba(212,175,55,0.3)" : "none",
            cursor: data.service ? "pointer" : "not-allowed",
          }}
          whileHover={data.service ? { scale: 1.02 } : undefined}
        >
          下一步 →
        </motion.button>
      </div>
    </div>
  );
}
