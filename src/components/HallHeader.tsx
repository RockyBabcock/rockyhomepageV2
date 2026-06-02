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
  const statusColors: Record<string, string> = {
    Active:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    "Personal Archive":
      "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/5",
    "Learning Archive":
      "text-yellow-600 dark:text-yellow-400 border-yellow-500/20 bg-yellow-500/5",
    Experimental:
      "text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    Simulation:
      "text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/5",
    Sealed: "text-stone-500 border-stone-500/25 bg-stone-500/5",
    WIP: "text-purple-600 dark:text-purple-400 border-purple-500/20 bg-purple-500/5",
    ACTIVE:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    ARCHIVED:
      "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/5",
    EXPERIMENTAL:
      "text-cyan-600 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "relative w-full border-b border-ink/10 dark:border-base/10 pb-6 mb-8 mt-12 bg-white/40 dark:bg-black/20 backdrop-blur-sm p-6 rounded-3xl overflow-hidden shadow-sm dark:shadow-none border-[0.5px] border-solid border-ink/5 dark:border-base/5",
        className,
      )}
    >
      {/* Visual background guide lines */}
      <div className="hidden md:block absolute top-0 right-12 bottom-0 w-[1px] bg-ink/[0.04] dark:bg-base/[0.04] pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-ink/[0.02] dark:bg-base/[0.02] pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-primary/70 dark:text-primary/90 bg-primary/5 dark:bg-primary/10 px-2.5 py-1 rounded-md border border-primary/15 uppercase">
            {code}
          </span>
          {category && (
            <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-[0.15em] text-ink/40 dark:text-base/40">
              // {category}
            </span>
          )}
        </div>

        <div
          className={cn(
            "hidden md:block w-fit font-mono text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border",
            statusColors[status] || statusColors["Active"],
          )}
        >
          {status}
        </div>
      </div>

      <div className="mt-4 relative z-10">
        <h2 id={id} className="text-2xl md:text-4xl lg:text-5xl font-headline font-black uppercase tracking-tight text-ink dark:text-base mb-2 md:mb-3 leading-tight">
          {title}
        </h2>

        <p className="max-w-3xl text-sm md:text-base text-ink/70 dark:text-base/70 font-body leading-relaxed md:pr-16">
          {subtitle}
        </p>
      </div>

      {/* Aesthetic corner marker */}
      <div className="absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center text-ink/10 dark:text-base/10 pointer-events-none">
        <div className="w-2 h-2 border-r border-b border-current" />
      </div>
    </motion.header>
  );
}
