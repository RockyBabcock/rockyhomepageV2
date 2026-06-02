import React from "react";
import { motion } from "motion/react";
import { Eye, Users, MousePointerClick, Clock, TrendingUp } from "lucide-react";
import { StatusPill } from "./StatusPill";

export const VisitorAnalyticsModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 md:col-span-4 premium-card p-6 md:p-8 relative overflow-hidden"
    >
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <h2 className="font-headline font-bold text-lg">Telemetry Wall</h2>
          </div>
          <StatusPill status="Simulation" />
        </div>

        <p className="text-[10px] uppercase font-mono tracking-wider text-ink/50 dark:text-base/50">
          Mode: Local Interface Concept
          <br />
          Real data not yet connected.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70">
          <Eye className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">12,408</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">
            Simulated Views
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70">
          <Users className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">4,192</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">
            Simulated Visitors
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70">
          <Clock className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">2m 14s</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">
            Simulated Session
          </div>
        </div>
        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70">
          <MousePointerClick className="w-4 h-4 mb-2 opacity-50" />
          <div className="font-mono text-xl font-bold">842</div>
          <div className="text-[9px] uppercase tracking-wider opacity-60 mt-1 font-bold">
            Simulated Clicks
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-ink/10 dark:border-base/10">
        <div className="text-[9px] font-mono text-ink/70 dark:text-base/70 space-y-1">
          <span className="text-orange-500/80 uppercase tracking-widest font-bold">
            Next Patch:
          </span>
          <br />- Connect Vercel Analytics
          <br />- Replace simulated counters with actuals
          <br />- Add timestamp & source logs
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
    </motion.section>
  );
};
