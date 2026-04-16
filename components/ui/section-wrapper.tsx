"use client";

import { motion } from "motion/react";

type SectionWrapperProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
};

export function SectionWrapper({ children, id, className = "" }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className={`py-24 px-6 md:px-12 lg:px-24 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
