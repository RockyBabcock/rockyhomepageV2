import React from "react";
import { motion } from "motion/react";
import { Eye, Users, MousePointerClick, Clock, TrendingUp } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";

export const VisitorAnalyticsModule = () => {
  return (
    <div
      id="VisitorAnalytics"
      className="col-span-12 md:col-span-4 h-full flex flex-col"
    >
      <MuseumCard className="p-6 md:p-8 relative overflow-hidden h-full flex flex-col rounded-3xl border border-[var(--museum-border)]">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--museum-accent)]">
            <TrendingUp className="w-5 h-5" />
            <h2 className="font-headline font-bold text-lg text-[var(--museum-text)]">Telemetry Wall</h2>
          </div>
          <StatusPill status="Simulation" />
        </div>

        <p className="text-[10px] uppercase font-mono tracking-wider text-[var(--museum-text-faint)]">
          Mode: Local Interface Concept
          <br />
          Real data not yet connected.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="bg-[var(--museum-bg)] rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70 border border-[var(--museum-border-strong)]">
          <Eye className="w-4 h-4 mb-2 text-[var(--museum-text-muted)]" />
          <div className="font-mono text-xl font-bold text-[var(--museum-text)]">12,408</div>
          <div className="text-[9px] uppercase tracking-wider text-[var(--museum-text-muted)] mt-1 font-bold">
            Simulated Views
          </div>
        </div>
        <div className="bg-[var(--museum-bg)] rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70 border border-[var(--museum-border-strong)]">
          <Users className="w-4 h-4 mb-2 text-[var(--museum-text-muted)]" />
          <div className="font-mono text-xl font-bold text-[var(--museum-text)]">4,192</div>
          <div className="text-[9px] uppercase tracking-wider text-[var(--museum-text-muted)] mt-1 font-bold">
            Simulated Visitors
          </div>
        </div>
        <div className="bg-[var(--museum-bg)] rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70 border border-[var(--museum-border-strong)]">
          <Clock className="w-4 h-4 mb-2 text-[var(--museum-text-muted)]" />
          <div className="font-mono text-xl font-bold text-[var(--museum-text)]">2m 14s</div>
          <div className="text-[9px] uppercase tracking-wider text-[var(--museum-text-muted)] mt-1 font-bold">
            Simulated Session
          </div>
        </div>
        <div className="bg-[var(--museum-bg)] rounded-xl p-4 flex flex-col items-center justify-center text-center opacity-70 border border-[var(--museum-border-strong)]">
          <MousePointerClick className="w-4 h-4 mb-2 text-[var(--museum-text-muted)]" />
          <div className="font-mono text-xl font-bold text-[var(--museum-text)]">842</div>
          <div className="text-[9px] uppercase tracking-wider text-[var(--museum-text-muted)] mt-1 font-bold">
            Simulated Clicks
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--museum-border)]">
        <div className="text-[9px] font-mono text-[var(--museum-text-muted)] space-y-1">
          <span className="text-[var(--museum-accent)] uppercase tracking-widest font-bold">
            Next Patch:
          </span>
          <br />- Connect Vercel Analytics
          <br />- Replace simulated counters with actuals
          <br />- Add timestamp & source logs
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--museum-accent)]/5 blur-3xl rounded-full pointer-events-none" />
      </MuseumCard>
    </div>
  );
};
