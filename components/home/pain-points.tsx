"use client";

import { motion } from "motion/react";
import { painPoints } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function PainPoints() {
  return (
    <SectionWrapper>
      <div className="flex items-center gap-3 justify-center mb-6">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
        <p className="text-gold/50 text-xs tracking-[0.3em] uppercase">Common Concerns</p>
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
      </div>
      <h2 className="font-serif text-gold text-3xl md:text-4xl text-center mb-4">
        想去韓國做醫美，但...
      </h2>
      <p className="text-neutral-500 text-center mb-14 max-w-lg mx-auto">
        這些疑慮，我們都幫你想好了
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {painPoints.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
          >
            <div className="group relative bg-gradient-to-b from-obsidian-card to-obsidian border border-gold/10 p-8 text-center hover:border-gold/30 transition-all duration-500 overflow-hidden">
              {/* Subtle top gold accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-gold/40" />

              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 border border-gold/20 flex items-center justify-center bg-gold/[0.05] group-hover:bg-gold/10 transition-colors">
                  <span className="text-3xl">{point.icon}</span>
                </div>
                <h3 className="text-gold font-serif text-xl mb-4">{point.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
