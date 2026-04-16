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
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {stepLabels.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center text-sm border ${
                i <= step ? "border-gold text-gold" : "border-gold/20 text-gold/20"
              }`}>
                {i < step ? "\u2713" : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${
                i <= step ? "text-gold" : "text-gold/20"
              }`}>{label}</span>
              {i < 2 && <div className={`w-8 h-px ${i < step ? "bg-gold" : "bg-gold/20"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
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
