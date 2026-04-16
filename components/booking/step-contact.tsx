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
  const inputCls = "w-full bg-transparent border-b border-gold/20 py-3 text-neutral-200 placeholder:text-neutral-600 focus:border-gold focus:outline-none transition-colors";

  return (
    <div>
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-2">最後一步</h2>
      <p className="text-neutral-500 text-center mb-10 text-sm">留下聯絡方式，我們會盡快與您確認</p>

      <div className="space-y-6">
        <div>
          <label className="text-gold/60 text-xs tracking-wider">姓名 *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="您的姓名"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">電話 *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="0912-345-678"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">LINE ID（選填）</label>
          <input
            type="text"
            value={data.lineId}
            onChange={(e) => update({ lineId: e.target.value })}
            placeholder="方便我們加您好友"
            className={inputCls}
          />
        </div>
        <div>
          <label className="text-gold/60 text-xs tracking-wider">備註（選填）</label>
          <textarea
            value={data.note}
            onChange={(e) => update({ note: e.target.value })}
            placeholder="想特別諮詢的問題..."
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="text-neutral-500 text-sm hover:text-gold transition-colors">&larr; 上一步</button>
        <motion.button
          onClick={onNext}
          disabled={!canSubmit}
          className={`px-10 py-3 text-sm tracking-widest uppercase ${
            canSubmit ? "bg-gold text-black" : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={canSubmit ? { scale: 1.02 } : undefined}
        >
          確認預約 &#10003;
        </motion.button>
      </div>
    </div>
  );
}
