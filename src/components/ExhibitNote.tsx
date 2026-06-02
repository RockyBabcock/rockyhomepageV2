import React from "react";
import { motion } from "motion/react";
import { Info, HelpCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { MuseumCard } from "./common/MuseumCard";

type ExhibitNoteProps = {
  label?: string;
  title: string;
  body: string;
  className?: string;
  type?: "default" | "alert" | "technical";
};

export function ExhibitNote({
  label = "EXHIBIT NOTE // INSIGHT",
  title,
  body,
  className,
  type = "default",
}: ExhibitNoteProps) {
  const themes = {
    default:
      "border-[var(--museum-border)] bg-[var(--museum-panel)]",
    alert: "border-[#eab308]/20 bg-[#eab308]/5",
    technical:
      "border-[#06b6d4]/10 bg-[#06b6d4]/5 font-mono text-[11px]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <MuseumCard className={cn(
        "!rounded-2xl p-5 border relative overflow-hidden flex flex-col md:flex-row items-start gap-4 shadow-sm",
        themes[type] || themes.default
      )}>
      {/* Subtle side highlight line */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[var(--museum-accent)] rounded-r-md opacity-40" />

      <div className="p-2 bg-[var(--museum-accent)]/10 rounded-xl border border-[var(--museum-accent)]/20 text-[var(--museum-accent)] shrink-0 hidden sm:flex">
        <Info className="w-4 h-4" />
      </div>

      <div className="flex-1 z-10">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--museum-accent)]">
            {label}
          </span>
        </div>

        <h4 className="text-sm font-headline font-black uppercase tracking-tight text-[var(--museum-text)] mb-1">
          {title}
        </h4>

        <p className="text-xs md:text-sm text-[var(--museum-text-muted)] leading-relaxed font-body">
          {body}
        </p>
      </div>

      {/* Blueprint background grid */}
      <div className="absolute right-0 bottom-0 w-24 h-24 opacity-5 pointer-events-none select-none text-[var(--museum-text)]">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="w-[100px] h-[100px]"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="24" />
          <path d="M50 0 v100 M0 50 h100" strokeDasharray="3,3" />
        </svg>
      </div>
      </MuseumCard>
    </motion.div>
  );
}
