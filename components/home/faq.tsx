"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqItems } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

function FaqItem({ item, index, isOpen, onToggle }: { item: typeof faqItems[0]; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-gold/10 transition-colors duration-500 ${isOpen ? "border-gold/25" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Gold diamond bullet */}
          <span className={`text-[10px] shrink-0 transition-all duration-500 ${isOpen ? "text-gold" : "text-gold/30 group-hover:text-gold/60"}`}>
            &#9671;
          </span>
          {/* Question number */}
          <span className={`font-serif text-xs shrink-0 transition-colors duration-500 ${isOpen ? "text-gold/60" : "text-gold/20 group-hover:text-gold/40"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* Question text */}
          <span className={`text-sm md:text-base transition-colors duration-500 ${isOpen ? "text-gold" : "text-neutral-300 group-hover:text-gold/80"}`}>
            {item.q}
          </span>
        </div>

        {/* Gold plus/minus indicator */}
        <div className="relative w-8 h-8 shrink-0 ml-4 flex items-center justify-center">
          <div className={`absolute inset-0 border transition-all duration-500 ${isOpen ? "border-gold/40 bg-gold/5" : "border-gold/15 group-hover:border-gold/30"}`} />
          {/* Horizontal bar (always visible) */}
          <span className="absolute w-3 h-[0.5px] bg-gold/70" />
          {/* Vertical bar (rotates to disappear when open) */}
          <motion.span
            className="absolute w-[0.5px] h-3 bg-gold/70"
            animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-[52px] md:pl-[56px] pr-12">
              <div className="w-6 h-px bg-gold/20 mb-4" />
              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper id="faq" className="bg-obsidian-light">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="text-gold/50 text-xs tracking-[0.3em] uppercase mb-4 diamond-accent inline-block">
          FAQ
        </p>
        <h2 className="font-serif text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
          常見問題
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/30 text-xs">&#9671;</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Top border */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-0" />
        {faqItems.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
