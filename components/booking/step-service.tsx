"use client";

import { motion } from "motion/react";
import { bookingServices } from "@/lib/data";
import type { BookingData } from "./booking-flow";

type Props = {
  data: BookingData;
  update: (d: Partial<BookingData>) => void;
  onNext: () => void;
};

export function StepService({ data, update, onNext }: Props) {
  return (
    <div>
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-2">您想諮詢什麼項目？</h2>
      <p className="text-neutral-500 text-center mb-10 text-sm">選擇一個療程類別</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {bookingServices.map((svc) => (
          <motion.button
            key={svc.id}
            onClick={() => update({ service: svc.id })}
            className={`p-6 text-center border transition-all ${
              data.service === svc.id
                ? "border-gold bg-gold/10 text-gold"
                : "border-gold/10 text-neutral-400 hover:border-gold/30"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-2xl mb-2">{svc.icon}</div>
            <div className="text-sm">{svc.label}</div>
          </motion.button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <motion.button
          onClick={onNext}
          disabled={!data.service}
          className={`px-10 py-3 text-sm tracking-widest uppercase transition-all ${
            data.service
              ? "bg-gold text-black hover:shadow-gold"
              : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={data.service ? { scale: 1.02 } : undefined}
        >
          下一步 &rarr;
        </motion.button>
      </div>
    </div>
  );
}
