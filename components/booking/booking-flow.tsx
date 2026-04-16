"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StepService } from "./step-service";
import { StepSchedule } from "./step-schedule";
import { StepContact } from "./step-contact";
import { BookingComplete } from "./booking-complete";

export type BookingData = {
  service: string;
  method: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  lineId: string;
  note: string;
};

const stepLabels = ["選擇服務", "預約時間", "聯絡資料"];

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingData>({
    service: "", method: "", date: "", time: "",
    name: "", phone: "", lineId: "", note: "",
  });

  const update = (partial: Partial<BookingData>) => setData((prev) => ({ ...prev, ...partial }));

  if (step === 3) return <BookingComplete data={data} />;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden" style={{
      background: "linear-gradient(160deg, #F5F3E8 0%, #FDFCF0 30%, #F8F6EB 70%, #F0EDE0 100%)",
    }}>
      {/* Multi-layer warm atmosphere — same as slides */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 55%)",
        }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at 80% 80%, rgba(212,175,55,0.04) 0%, transparent 40%)",
        }} />
      </div>

      {/* Deep vignette */}
      <div className="fixed inset-0 pointer-events-none z-[2]" style={{
        boxShadow: "inset 0 0 200px 60px rgba(120,110,80,0.12), inset 0 0 80px 20px rgba(80,70,40,0.06)",
      }} />

      {/* Paper texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      {/* Editorial frame */}
      <div className="fixed inset-6 pointer-events-none z-20" style={{
        border: "1px solid rgba(17,17,17,0.1)",
        boxShadow: "0 0 40px rgba(0,0,0,0.04), inset 0 0 60px rgba(212,175,55,0.02)",
      }} />

      {/* Gold accent corners */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[["top-6 left-6", "90deg", "180deg"], ["top-6 right-6", "270deg", "180deg"], ["bottom-6 left-6", "90deg", "0deg"], ["bottom-6 right-6", "270deg", "0deg"]].map(([pos, hDir, vDir], i) => (
          <div key={i} className={`absolute ${pos} w-14 h-14`}>
            <div className="absolute" style={{
              [i < 2 ? "top" : "bottom"]: 0,
              [i % 2 === 0 ? "left" : "right"]: 0,
              width: "100%", height: "2px",
              background: `linear-gradient(${hDir}, #D4AF37, transparent)`,
            }} />
            <div className="absolute" style={{
              [i < 2 ? "top" : "bottom"]: 0,
              [i % 2 === 0 ? "left" : "right"]: 0,
              height: "100%", width: "2px",
              background: `linear-gradient(${vDir}, #D4AF37, transparent)`,
            }} />
          </div>
        ))}
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[2px]" style={{ background: "#D4AF37", boxShadow: "0 0 8px rgba(212,175,55,0.3)" }} />
            <span className="text-sm tracking-[0.4em] uppercase font-medium" style={{ color: "rgba(17,17,17,0.45)" }}>
              Athena Booking
            </span>
            <div className="w-10 h-[2px]" style={{ background: "#D4AF37", boxShadow: "0 0 8px rgba(212,175,55,0.3)" }} />
          </div>
        </div>

        {/* Progress — bigger */}
        <div className="flex items-center justify-center gap-6 mb-14">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-11 h-11 flex items-center justify-center text-base font-serif transition-all duration-500"
                style={{
                  border: `2px solid ${i <= step ? "#D4AF37" : "rgba(17,17,17,0.12)"}`,
                  color: i <= step ? "#D4AF37" : "rgba(17,17,17,0.25)",
                  background: i < step ? "rgba(212,175,55,0.08)" : "transparent",
                  boxShadow: i <= step ? "0 2px 12px rgba(212,175,55,0.15)" : "none",
                }}
              >
                {i < step ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : i + 1}
              </div>
              <span className="text-sm tracking-wider hidden sm:inline font-medium" style={{
                color: i <= step ? "#B8962D" : "rgba(17,17,17,0.25)",
              }}>{label}</span>
              {i < 2 && (
                <div className="w-12 h-[2px] transition-all duration-500" style={{
                  background: i < step ? "#D4AF37" : "rgba(17,17,17,0.1)",
                }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <StepService data={data} update={update} onNext={() => setStep(1)} />}
            {step === 1 && <StepSchedule data={data} update={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {step === 2 && <StepContact data={data} update={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
