"use client";

import { motion } from "motion/react";
import { treatments } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function Treatments() {
  return (
    <SectionWrapper id="treatments" className="bg-obsidian-light">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-gold/50 text-xs tracking-[0.3em] uppercase mb-4 diamond-accent inline-block">
          Treatments
        </p>
        <h2 className="font-serif text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
          療程項目
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/30 text-xs">&#9671;</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {treatments.map((t, i) => (
          <motion.div
            key={t.id}
            className="luxury-card group p-0 transition-all duration-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ boxShadow: "0 0 40px rgba(212,175,55,0.12), 0 0 80px rgba(212,175,55,0.05)" }}
          >
            {/* Top gold accent line with shimmer */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent group-hover:via-gold transition-all duration-700" />

            {/* Icon area */}
            <div className="pt-8 pb-4 px-6 flex justify-center">
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-gold/5 group-hover:from-gold/30 group-hover:to-gold/10 transition-all duration-700" />
                <div className="absolute inset-[0.5px] bg-obsidian-light flex items-center justify-center">
                  <span className="text-gold/80 font-serif text-xl tracking-wide">{t.title.charAt(0)}</span>
                </div>
                {/* Corner ticks */}
                <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-gold/30" />
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 border-t border-r border-gold/30" />
                <div className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 border-b border-l border-gold/30" />
                <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-gold/30" />
              </div>
            </div>

            {/* Title */}
            <div className="px-6 text-center mb-5">
              <h3 className="font-serif text-gold text-xl tracking-wide">{t.title}</h3>
              <div className="w-8 h-px bg-gold/20 mx-auto mt-3" />
            </div>

            {/* Items list */}
            <div className="px-6 pb-5 space-y-3">
              {t.items.map((item, j) => (
                <div key={j} className="flex items-center gap-3 text-neutral-400 text-sm">
                  <span className="text-gold/40 text-[8px]">&#9671;</span>
                  <span className="group-hover:text-neutral-300 transition-colors duration-500">{item}</span>
                </div>
              ))}
            </div>

            {/* Doctor footer */}
            <div className="mt-auto mx-6 mb-6 pt-4 border-t border-gold/10 group-hover:border-gold/20 transition-colors duration-500">
              <p className="text-gold/30 text-[10px] tracking-[0.2em] uppercase mb-1">主治醫師</p>
              <p className="text-neutral-400 text-sm group-hover:text-gold/70 transition-colors duration-500">{t.doctor}</p>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.02] via-transparent to-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
