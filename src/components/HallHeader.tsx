import React from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

import { MuseumSectionStatus } from "@/data/museumSections";

type HallHeaderProps = {
  code: string;
  title: string;
  subtitle: string;
  status?: MuseumSectionStatus | string;
  category?: string;
  className?: string;
};

export function HallHeader({
  code,
  title,
  subtitle,
  status = "Active",
  category,
  className,
  id,
}: HallHeaderProps & { id?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative w-full border-b border-[rgba(15,23,42,0.1)] pb-8 mb-8 mt-12",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 font-body text-xs font-bold uppercase tracking-widest text-[var(--museum-text-muted)] mb-4">
        <span className="px-3 py-1 bg-white border border-[rgba(15,23,42,0.05)] rounded-full shadow-sm">
           {code}
        </span>
        {status && (
          <span className={cn(
             "px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.1em]",
             status === "Active" || status === "ACTIVE" ? "bg-[var(--color-rainbow-green)]/10 text-[var(--color-rainbow-green)]" 
             : status === "Experimental" || status === "EXPERIMENTAL" ? "bg-[var(--color-rainbow-cyan)]/10 text-[var(--color-rainbow-cyan)]"
             : "bg-[var(--museum-border)] text-[var(--museum-text-muted)]"
          )}>
            {status}
          </span>
        )}
        {category && (
          <span className="text-[var(--color-rainbow-purple)] font-black tracking-[0.2em]">{category}</span>
        )}
      </div>

      <h2 id={id} className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tight text-[var(--museum-text)] mb-4 leading-none">
        {title}
      </h2>

      <p className="max-w-3xl text-base md:text-lg text-[var(--museum-text-muted)] font-body leading-relaxed">
        {subtitle}
      </p>
    </motion.header>
  );
}
