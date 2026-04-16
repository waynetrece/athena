"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-32 md:py-40 px-6 relative overflow-hidden">
      {/* Multi-layer gold radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(212,175,55,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.04)_0%,transparent_40%)]" />
      </div>

      {/* Art Deco decorative frame */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left Art Deco corner */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12">
          <div className="w-20 h-20 md:w-32 md:h-32">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-gold/40 to-transparent" />
            <div className="absolute top-2 left-2 w-4 h-4 md:w-6 md:h-6 border-t border-l border-gold/20" />
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-2 h-2 border-t border-l border-gold/10" />
          </div>
        </div>
        {/* Top-right Art Deco corner */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12">
          <div className="w-20 h-20 md:w-32 md:h-32">
            <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold/40 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gold/40 to-transparent" />
            <div className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 border-t border-r border-gold/20" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-2 h-2 border-t border-r border-gold/10" />
          </div>
        </div>
        {/* Bottom-left Art Deco corner */}
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
          <div className="w-20 h-20 md:w-32 md:h-32 relative">
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-gold/40 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-gold/40 to-transparent" />
            <div className="absolute bottom-2 left-2 w-4 h-4 md:w-6 md:h-6 border-b border-l border-gold/20" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-2 h-2 border-b border-l border-gold/10" />
          </div>
        </div>
        {/* Bottom-right Art Deco corner */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12">
          <div className="w-20 h-20 md:w-32 md:h-32 relative">
            <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-gold/40 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-gold/40 to-transparent" />
            <div className="absolute bottom-2 right-2 w-4 h-4 md:w-6 md:h-6 border-b border-r border-gold/20" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-2 h-2 border-b border-r border-gold/10" />
          </div>
        </div>

        {/* Center horizontal decorative lines */}
        <div className="absolute top-1/2 left-0 w-1/4 h-px bg-gradient-to-r from-transparent to-gold/10 -translate-y-20" />
        <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-gold/10 -translate-y-20" />
        <div className="absolute top-1/2 left-0 w-1/4 h-px bg-gradient-to-r from-transparent to-gold/10 translate-y-20" />
        <div className="absolute top-1/2 right-0 w-1/4 h-px bg-gradient-to-l from-transparent to-gold/10 translate-y-20" />
      </div>

      {/* Animated gold pulse background */}
      <div className="absolute inset-0 animate-gold-pulse opacity-30 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5" />

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Decorative top accent */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <div className="w-2 h-2 border border-gold/40 rotate-45" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <h2 className="font-serif text-gold text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight">
          準備好開始您的<br className="hidden md:block" />蛻變之旅了嗎？
        </h2>

        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold/20" />
          <span className="text-gold/30 text-xs">&#9671;</span>
          <div className="w-8 h-px bg-gold/20" />
        </div>

        <p className="text-neutral-400 mb-12 leading-relaxed text-lg max-w-lg mx-auto">
          預約免費諮詢，讓我們為您量身規劃專屬的韓國醫美旅程
        </p>

        <div className="animate-gold-pulse inline-block">
          <Button href="/booking" className="text-base px-14 py-5 tracking-[0.15em]">
            預約免費諮詢
          </Button>
        </div>

        {/* Decorative bottom accent */}
        <div className="flex items-center justify-center gap-3 mt-14">
          <div className="w-4 h-px bg-gold/15" />
          <span className="text-gold/20 text-[8px]">&#9671;</span>
          <div className="w-8 h-px bg-gold/15" />
          <span className="text-gold/20 text-[8px]">&#9671;</span>
          <div className="w-8 h-px bg-gold/15" />
          <span className="text-gold/20 text-[8px]">&#9671;</span>
          <div className="w-4 h-px bg-gold/15" />
        </div>
      </motion.div>
    </section>
  );
}
