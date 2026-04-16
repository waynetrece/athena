"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-register";
import { timelineSteps } from "@/lib/data";

export function ServiceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const steps = containerRef.current.querySelectorAll(".timeline-step");
    const ctx = gsap.context(() => {
      // Animate the main gold line drawing
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { strokeDashoffset: 1200 },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // Animate the traveling gold dot
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { attr: { cy: 0 } },
          {
            attr: { cy: "100%" },
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      // Animate each step
      steps.forEach((step, i) => {
        const contentBox = step.querySelector(".step-content");
        const iconBox = step.querySelector(".step-icon-box");

        gsap.fromTo(step,
          { opacity: 0 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        if (contentBox) {
          const isLeft = i % 2 === 0;
          gsap.fromTo(contentBox,
            { opacity: 0, x: isLeft ? -30 : 30 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: step,
                start: "top 72%",
                end: "top 48%",
                scrub: 1,
              },
            }
          );
        }

        if (iconBox) {
          gsap.fromTo(iconBox,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              scrollTrigger: {
                trigger: step,
                start: "top 72%",
                end: "top 55%",
                scrub: 1,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle radial gold ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-24">
          <p className="text-gold/50 text-xs tracking-[0.3em] uppercase mb-4 diamond-accent inline-block">
            Service Flow
          </p>
          <h2 className="font-serif text-gold text-3xl md:text-4xl lg:text-5xl mb-4">
            您的蛻變之旅
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/40" />
            <span className="text-gold/30 text-xs">&#9671;</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/40" />
          </div>
          <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
            從諮詢到回程，每一步都有人為您守護
          </p>
        </div>

        <div ref={containerRef} className="relative">
          {/* Vertical gold line (desktop) with glow */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full hidden md:block">
            {/* Glow behind line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-gold/5 blur-sm" />
            <svg className="absolute left-1/2 -translate-x-[1px] top-0 h-full" width="2" height="100%">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glowFilter">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <line
                ref={lineRef}
                x1="1" y1="0" x2="1" y2="100%"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="1200"
                strokeDashoffset="1200"
              />
              {/* Traveling gold dot */}
              <circle
                ref={glowRef}
                cx="1"
                cy="0"
                r="4"
                fill="#D4AF37"
                filter="url(#glowFilter)"
                opacity="0.9"
              />
            </svg>
          </div>

          {/* Top decorative diamond */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 items-center justify-center z-10">
            <div className="w-3 h-3 border border-gold/40 rotate-45 bg-obsidian" />
          </div>

          <div className="space-y-20 md:space-y-32">
            {timelineSteps.map((step, i) => (
              <div
                key={i}
                className={`timeline-step flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content side */}
                <div className={`step-content md:w-5/12 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`inline-block ${i % 2 === 0 ? "md:float-right md:text-right" : ""}`}>
                    <span className="text-gold/30 text-[10px] tracking-[0.4em] uppercase font-sans">{step.day}</span>
                    <h3 className="font-serif text-gold text-2xl lg:text-3xl mt-2 mb-3">{step.title}</h3>
                    <div className={`w-12 h-px bg-gradient-to-r from-gold/40 to-transparent mb-4 ${i % 2 === 0 ? "md:ml-auto md:bg-gradient-to-l md:from-gold/40 md:to-transparent" : ""}`} />
                    <p className="text-neutral-400 leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>

                {/* Center icon box with gold border */}
                <div className="step-icon-box relative shrink-0 z-10">
                  {/* Outer gold-gradient border */}
                  <div className="w-20 h-20 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/50 via-gold/20 to-gold/50 p-[0.5px]">
                      <div className="w-full h-full bg-obsidian flex items-center justify-center">
                        <span className="text-3xl">{step.icon}</span>
                      </div>
                    </div>
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gold/60" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gold/60" />
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gold/60" />
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gold/60" />
                  </div>
                  {/* Small connecting horizontal lines to the vertical line (desktop) */}
                  <div className={`hidden md:block absolute top-1/2 -translate-y-px h-px bg-gold/20 ${
                    i % 2 === 0 ? "-right-10 w-10" : "-left-10 w-10"
                  }`} />
                </div>

                {/* Empty side for layout balance */}
                <div className="md:w-5/12" />
              </div>
            ))}
          </div>

          {/* Bottom decorative diamond */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 items-center justify-center z-10">
            <div className="w-3 h-3 border border-gold/40 rotate-45 bg-obsidian" />
          </div>
        </div>
      </div>
    </section>
  );
}
