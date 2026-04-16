"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap-register";
import { Button } from "@/components/ui/button";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.6, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  const titleText = "韓國頂尖醫美 台灣安心出發";

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0A0A0A_0%,_#000000_70%)]" />

      {/* Gold shimmer grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Top & bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Decorative gold arcs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold/[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/[0.06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/[0.03]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          className="inline-block mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 1 }}
        >
          <div className="flex items-center gap-3 justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-gold/60 text-xs tracking-[0.4em] uppercase">Athena 韓境美學</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/60" />
          </div>
        </motion.div>

        <h1 ref={titleRef} className="font-serif text-4xl md:text-6xl lg:text-7xl text-gold leading-tight mb-8">
          {titleText.split("").map((char, i) => (
            <span key={i} className="char inline-block" style={{ opacity: 0 }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          className="text-neutral-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          KFDA 認證醫師團隊 · 全程中韓翻譯陪同 · 雙重保險保障
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Button href="/booking">立即預約諮詢</Button>
          <Button href="#timeline" variant="outline">了解服務流程</Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <span className="text-gold/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>
  );
}
