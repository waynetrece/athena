"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "服務流程", href: "#timeline" },
  { label: "療程項目", href: "#treatments" },
  { label: "醫師團隊", href: "#doctors" },
  { label: "常見問題", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.02);
  });

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-black/90 backdrop-blur-md border-b border-gold/10" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-serif text-gold text-xl tracking-wider">
            Athena
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-400 hover:text-gold transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <Button href="/booking" variant="primary" className="text-xs py-2 px-6">
              預約諮詢
            </Button>
          </div>
        </nav>
      </motion.header>
    </>
  );
}
