"use client";

import { motion } from "motion/react";
import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  className?: string;
};

export function Button({ children, href, variant = "primary", onClick, className = "" }: ButtonProps) {
  const base = "inline-block px-8 py-3 font-sans text-sm tracking-widest uppercase transition-all duration-300";
  const variants = {
    primary: "bg-gold text-black hover:shadow-gold-lg",
    outline: "border-hairline border-gold text-gold hover:bg-gold/10",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02, boxShadow: "0 0 30px rgba(212,175,55,0.4)" },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={cls}>{children}</Link>
      </motion.div>
    );
  }

  return (
    <motion.button {...motionProps} className={cls} onClick={onClick}>
      {children}
    </motion.button>
  );
}
