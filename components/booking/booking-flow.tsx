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
    <div className="min-h-screen flex items-center justify-center px-6 py-24" style={{
      background: "linear-gradient(160deg, #F5F3E8 0%, #FDFCF0 30%, #F8F6EB 70%, #F0EDE0 100%)",
    }}>
      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        boxShadow: "inset 0 0 200px 60px rgba(120,110,80,0.08)",
      }} />

      {/* Editorial frame */}
      <div className="fixed inset-6 pointer-events-none z-0" style={{
        border: "1px solid rgba(17,17,17,0.06)",
      }} />

      <div className="w-full max-w-lg relative z-10">
        {/* Brand */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1.5px]" style={{ background: "#D4AF37" }} />
            <span className="text-xs tracking-[0.4em] uppercase font-medium" style={{ color: "rgba(17,17,17,0.4)" }}>
              Athena Booking
            </span>
            <div className="w-8 h-[1.5px]" style={{ background: "#D4AF37" }} />
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-6 mb-14">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-9 h-9 flex items-center justify-center text-sm font-serif transition-all duration-500"
                style={{
                  border: `1.5px solid ${i <= step ? "#D4AF37" : "rgba(17,17,17,0.12)"}`,
                  color: i <= step ? "#D4AF37" : "rgba(17,17,17,0.25)",
                  background: i < step ? "rgba(212,175,55,0.08)" : "transparent",
                }}
              >
                {i < step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : i + 1}
              </div>
              <span className="text-xs tracking-wider hidden sm:inline font-medium" style={{
                color: i <= step ? "#B8962D" : "rgba(17,17,17,0.25)",
              }}>{label}</span>
              {i < 2 && (
                <div className="w-10 h-[1.5px] transition-all duration-500" style={{
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
