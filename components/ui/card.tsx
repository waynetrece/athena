"use client";

import { motion } from "motion/react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
};

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-obsidian-card border-hairline border-gold/20 p-6 ${className}`}
      whileHover={hover ? { borderColor: "rgba(212,175,55,0.5)", boxShadow: "0 0 20px rgba(212,175,55,0.15)" } : undefined}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
