import React from 'react';
import { motion } from 'motion/react';
import { Info, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

type ExhibitNoteProps = {
  label?: string;
  title: string;
  body: string;
  className?: string;
  type?: 'default' | 'alert' | 'technical';
};

export function ExhibitNote({
  label = "EXHIBIT NOTE // INSIGHT",
  title,
  body,
  className,
  type = 'default',
}: ExhibitNoteProps) {
  const themes = {
    default: "border-primary/20 bg-primary/[0.02] text-ink dark:text-base selection:bg-primary/25",
    alert: "border-amber-500/20 bg-amber-500/[0.02] text-ink dark:text-base",
    technical: "border-cyan-500/10 bg-cyan-500/[0.01] text-ink dark:text-base font-mono text-[11px]"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "premium-card !rounded-2xl p-5 border border-solid relative overflow-hidden flex flex-col md:flex-row items-start gap-4 shadow-sm",
        themes[type] || themes.default,
        className
      )}
    >
      {/* Subtle side highlight line */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary/40 rounded-r-md" />

      <div className="p-2 bg-primary/5 rounded-xl border border-primary/10 text-primary shrink-0 hidden sm:flex">
        <Info className="w-4 h-4" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-primary/80 dark:text-primary">
            {label}
          </span>
        </div>

        <h4 className="text-sm font-headline font-black uppercase tracking-tight text-ink dark:text-base mb-1">
          {title}
        </h4>

        <p className="text-xs md:text-sm text-ink/70 dark:text-base/70 leading-relaxed font-body">
          {body}
        </p>
      </div>

      {/* Blueprint background grid */}
      <div className="absolute right-0 bottom-0 w-24 h-24 opacity-[0.02] dark:opacity-[0.04] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-[100px] h-[100px]">
          <circle cx="50" cy="50" r="40" strokeDasharray="2,2" />
          <circle cx="50" cy="50" r="24" />
          <path d="M50 0 v100 M0 50 h100" strokeDasharray="3,3" />
        </svg>
      </div>
    </motion.div>
  );
}
