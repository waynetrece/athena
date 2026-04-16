"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { advantages } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

function Counter({ value, suffix }: { value: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const numericValue = parseInt(value);
  const isNumber = !isNaN(numericValue);

  useEffect(() => {
    if (!inView || !isNumber) return;
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numericValue, isNumber]);

  return (
    <span ref={ref} className="text-gold-gradient font-serif text-5xl md:text-6xl font-bold">
      {isNumber ? count : value}
      {isNumber && value.includes("+") && "+"}
      {suffix && <span className="text-lg text-gold/60 ml-1 font-normal">{suffix}</span>}
    </span>
  );
}

export function WhyAthena() {
  return (
    <SectionWrapper className="relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 justify-center mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <p className="text-gold/50 text-xs tracking-[0.3em] uppercase">Why Athena</p>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
        <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-16">
          為什麼選擇我們
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {/* Card container */}
              <div className="border border-gold/10 p-8 bg-obsidian-card/50 hover:border-gold/25 transition-all duration-500">
                <div className="w-12 h-12 mx-auto mb-5 border border-gold/20 flex items-center justify-center bg-gold/[0.05]">
                  <span className="text-2xl">{adv.icon}</span>
                </div>
                <Counter value={adv.value} suffix={adv.suffix} />
                <h3 className="text-gold text-sm tracking-wider mt-4 mb-2 uppercase">{adv.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{adv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
