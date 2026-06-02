import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import { cn } from '../lib/utils';

type TransitionPanelProps = {
  currentHall: string;
  nextHall: string;
  signalStrength?: string;
  visitorPath?: string;
  className?: string;
};

export function TransitionPanel({
  currentHall,
  nextHall,
  signalStrength = "stable // 99.8% duty",
  visitorPath = "active exhibition route",
  className,
}: TransitionPanelProps) {
  return (
    <div className={cn("col-span-12 my-12 flex flex-col items-center justify-center relative py-8", className)}>
      {/* Central scanning/laser line */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/95 dark:bg-[#080a0f] border border-ink/10 dark:border-base/15 rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 shadow-xl text-center md:text-left min-w-[280px] md:min-w-[500px]"
      >
        <div className="p-2.5 rounded-xl bg-ink/5 dark:bg-base/5 border border-ink/10 dark:border-base/10 text-primary dark:text-primary animate-pulse">
          <Layers className="w-4 h-4" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-[8px] font-mono uppercase tracking-[0.2em] text-ink/40 dark:text-base/40">
            <span>Leaving: {currentHall}</span>
            <span className="text-primary">•</span>
            <span>Entering: {nextHall}</span>
          </div>

          <h5 className="font-mono text-xs uppercase tracking-[0.1em] text-ink dark:text-base font-bold mt-1">
            Hallway Transition Threshold Gate
          </h5>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-[9px] font-mono text-ink/50 dark:text-base/50 mt-1">
            <span>Path: <strong className="text-primary/80">{visitorPath}</strong></span>
            <span className="hidden md:inline">|</span>
            <span>Signal: <strong>{signalStrength}</strong></span>
          </div>
        </div>

        {/* Dynamic scan line effect bounding box decoration */}
        <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-primary" />
        <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-primary" />
        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-primary" />
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-primary" />
      </motion.div>
    </div>
  );
}
