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
  { id: "video", label: "線上視訊", desc: "30 分鐘", icon: "📹" },
  { id: "line", label: "LINE 通話", desc: "20 分鐘", icon: "💬" },
  { id: "inperson", label: "到店面談", desc: "台北中山區", icon: "🏢" },
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
      <p className="text-gold text-sm mb-3">{monthName}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {["日", "一", "二", "三", "四", "五", "六"].map((d) => (
          <div key={d} className="text-neutral-600 py-1">{d}</div>
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
              className={`py-1.5 transition-all ${
                isSelected ? "bg-gold text-black" :
                isPast ? "text-neutral-700 cursor-not-allowed" :
                "text-neutral-400 hover:text-gold hover:bg-gold/10"
              }`}
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
      <h2 className="font-serif text-gold text-2xl md:text-3xl text-center mb-10">選擇諮詢方式與時間</h2>

      {/* Method */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => update({ method: m.id })}
            className={`p-4 text-center border text-sm transition-all ${
              data.method === m.id ? "border-gold text-gold bg-gold/10" : "border-gold/10 text-neutral-400 hover:border-gold/30"
            }`}
          >
            <div className="text-xl mb-1">{m.icon}</div>
            <div>{m.label}</div>
            <div className="text-xs text-neutral-600 mt-1">{m.desc}</div>
          </button>
        ))}
      </div>

      {/* Calendar + Time */}
      <div className="grid md:grid-cols-2 gap-6">
        <MiniCalendar selected={data.date} onSelect={(d) => update({ date: d })} />
        <div>
          <p className="text-gold text-sm mb-3">選擇時段</p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => update({ time: slot })}
                className={`py-2 text-sm border transition-all ${
                  data.time === slot ? "border-gold text-gold bg-gold/10" : "border-gold/10 text-neutral-500 hover:border-gold/30"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="text-neutral-500 text-sm hover:text-gold transition-colors">&larr; 上一步</button>
        <motion.button
          onClick={onNext}
          disabled={!canProceed}
          className={`px-10 py-3 text-sm tracking-widest uppercase ${
            canProceed ? "bg-gold text-black" : "bg-gold/20 text-gold/40 cursor-not-allowed"
          }`}
          whileHover={canProceed ? { scale: 1.02 } : undefined}
        >
          下一步 &rarr;
        </motion.button>
      </div>
    </div>
  );
}
