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
        "col-span-12 my-12 border-y border-ink/15 dark:border-base/15 py-8 relative",
        className,
      )}
    >
      <div className="absolute top-0 left-4 px-3 -translate-y-1/2 bg-[#faf8f5] dark:bg-[#030508] text-[9px] font-mono uppercase tracking-[0.3em] text-primary border border-ink/10 dark:border-base/10 shadow-sm">
        Route Transition Gateway
      </div>

      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-ink/40 dark:text-base/40">
        {eyebrow}
      </div>

      <h3 className="mt-2 text-xl md:text-3xl font-headline font-black uppercase text-ink dark:text-white">
        {title}
      </h3>

      <p className="mt-3 max-w-2xl font-body text-xs md:text-sm text-ink/70 dark:text-base/60 leading-relaxed">
        {body}
      </p>

      {next && (
        <div className="mt-5 text-[9px] font-mono uppercase tracking-[0.25em] text-primary dark:text-primary flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_currentColor]" />
          <span>Next Hallward Target: {next}</span>
        </div>
      )}
    </motion.section>
  );
}
