import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

type TransitionPanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  next?: string;
  className?: string;
};

export function TransitionPanel({
  eyebrow,
  title,
  body,
  next,
  className,
}: TransitionPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "col-span-12 my-16 py-12 px-6 md:px-12 bg-[rgba(255,255,255,0.4)] backdrop-blur-md rounded-3xl border border-[rgba(15,23,42,0.05)] text-center max-w-4xl mx-auto shadow-sm",
        className,
      )}
    >
      <div className="text-xs font-body font-bold uppercase tracking-widest text-[var(--color-rainbow-purple)] mb-4">
        {eyebrow}
      </div>

      <h3 className="text-2xl md:text-4xl font-headline font-bold text-[var(--museum-text)] tracking-tight">
        {title}
      </h3>

      <p className="mt-4 max-w-2xl mx-auto font-body text-base md:text-lg text-[var(--museum-text-muted)] leading-relaxed">
        {body}
      </p>

      {next && (
        <div className="mt-8 pt-6 border-t border-[rgba(15,23,42,0.05)] text-xs font-body font-bold uppercase tracking-[0.15em] text-[var(--museum-text-muted)] inline-flex items-center gap-2">
           Next Section: <span className="text-[var(--museum-text)]">{next}</span>
        </div>
      )}
    </motion.section>
  );
}
