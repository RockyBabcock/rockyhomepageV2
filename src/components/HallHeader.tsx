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
        "relative w-full border-b border-[var(--museum-border-strong)] pb-8 mb-8 mt-12",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[var(--museum-text-muted)] mb-4">
        <span>[{code}]</span>
        {status && (
          <>
            <span className="text-[var(--museum-text-faint)]">/</span>
            <span className={status === "Active" || status === "ACTIVE" ? "text-[var(--museum-success)]" : status === "Experimental" || status === "EXPERIMENTAL" ? "text-[var(--museum-accent)]" : "text-stone-400"}>
              {status}
            </span>
          </>
        )}
        {category && (
          <>
            <span className="text-[var(--museum-text-faint)]">/</span>
            <span className="text-[var(--museum-text-faint)] uppercase tracking-[0.2em]">{category}</span>
          </>
        )}
      </div>

      <h2 id={id} className="text-3xl md:text-5xl lg:text-6xl font-headline font-black uppercase tracking-tight text-[var(--museum-text)] mb-4 leading-none">
        {title}
      </h2>

      <p className="max-w-3xl text-sm md:text-base text-[var(--museum-text-muted)] font-body leading-relaxed">
        {subtitle}
      </p>
    </motion.header>
  );
}
