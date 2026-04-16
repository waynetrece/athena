"use client";

import { motion } from "motion/react";
import { doctors } from "@/lib/data";
import { SectionWrapper } from "@/components/ui/section-wrapper";

export function DoctorTeam() {
  return (
    <SectionWrapper id="doctors">
      {/* Section header */}
      <div className="text-center mb-20">
        <p className="text-gold/50 text-xs tracking-[0.3em] uppercase mb-4 diamond-accent inline-block">
          Medical Team
        </p>
        <h2 className="font-serif text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
          韓國醫師團隊
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
          <span className="text-gold/30 text-xs">&#9671;</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
        </div>
        <p className="text-neutral-500 max-w-lg mx-auto">
          PASCAL Clinic — 韓國美容整形醫學院教授級陣容
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((doc, i) => {
          const initial = doc.name.charAt(0);
          return (
            <motion.div
              key={i}
              className="group relative overflow-hidden bg-obsidian-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {/* Gold monogram area */}
              <div className="aspect-square relative bg-obsidian flex items-center justify-center overflow-hidden">
                {/* Subtle radial gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]" />

                {/* Decorative corner frame */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/20" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/20" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/20" />

                {/* Gold-bordered monogram square */}
                <div className="relative w-28 h-28">
                  {/* Gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/50 via-gold/15 to-gold/50 group-hover:from-gold/70 group-hover:via-gold/30 group-hover:to-gold/70 transition-all duration-700" />
                  <div className="absolute inset-[0.5px] bg-obsidian flex flex-col items-center justify-center">
                    {/* Large serif initial */}
                    <span className="font-serif text-5xl text-gold-gradient select-none leading-none">{initial}</span>
                    {/* Korean specialty text below initial */}
                    <span className="text-gold/30 text-[9px] tracking-[0.15em] mt-2 text-center px-2 leading-tight">
                      {doc.specialty.split(" / ")[0]}
                    </span>
                  </div>
                </div>

                {/* Thin diagonal decorative lines */}
                <div className="absolute top-0 right-0 w-16 h-px bg-gradient-to-l from-gold/10 to-transparent origin-top-right rotate-45 translate-y-12" />
                <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-gold/10 to-transparent origin-bottom-left rotate-45 -translate-y-12" />
              </div>

              {/* Info area */}
              <div className="p-5 border-t border-gold/10">
                <h3 className="text-gold font-medium text-sm tracking-wide">{doc.name}</h3>
                <p className="text-neutral-600 text-xs mt-1.5 tracking-wide">{doc.title}</p>
              </div>

              {/* Hover overlay with full details */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/95 to-black/80 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-all duration-600 backdrop-blur-sm">
                {/* Small monogram */}
                <div className="w-14 h-14 mb-5 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/60 to-gold/20" />
                  <div className="absolute inset-[0.5px] bg-black flex items-center justify-center">
                    <span className="font-serif text-2xl text-gold">{initial}</span>
                  </div>
                </div>

                <h3 className="text-gold font-serif text-lg tracking-wide text-center">{doc.name}</h3>
                <div className="w-8 h-px bg-gold/30 mx-auto my-3" />
                <p className="text-gold/60 text-sm text-center mb-2">{doc.specialty}</p>
                <p className="text-neutral-500 text-xs text-center">{doc.title}</p>
                <p className="text-neutral-600 text-xs text-center mt-1">{doc.org}</p>

                {/* Gold border glow on hover */}
                <div className="absolute inset-0 border border-gold/30 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(212,175,55,0.08), 0 0 20px rgba(212,175,55,0.1)" }} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
