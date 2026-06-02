import React from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCircuit, Sparkles, AlertCircle } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";
import { MuseumButton } from "./common/MuseumButton";

export const AIPlaygroundModule = () => {
  const navigate = useNavigate();

  return (
    <div
      className="col-span-12 lg:col-span-4 h-full flex flex-col"
    >
      <MuseumCard className="p-8 md:p-10 relative overflow-hidden group border-t-[var(--museum-border-strong)] h-full flex flex-col rounded-3xl">
      {/* Neural Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--museum-accent)]/50 rounded-full blur-[40px]" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--museum-text)]/50 rounded-full blur-[50px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full flex-1">
        <div className="mb-6">
          <div className="flex justify-between items-start gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--museum-accent)]/10 flex items-center justify-center border border-[var(--museum-accent)]/20 text-[var(--museum-accent)]">
                <BrainCircuit size={20} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--museum-accent)]">
                Intelligence
              </span>
            </div>
            <StatusPill status="Prototype" />
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-2 text-[var(--museum-text)]">
            AI Experiment Chamber
          </h2>
          <p className="font-body text-[var(--museum-text-muted)] text-sm">
            Interface experiments for AI-native workflows, prompt systems, agents, and creative tools. Some experiments are prototypes or interface concepts. The goal is to document how AI changes the way software feels, not to pretend every idea is already a finished product.
          </p>
        </div>

        <div className="space-y-5 flex-1 mb-8 pt-4 border-t border-[var(--museum-border-strong)]">
          <div>
            <h4 className="font-mono text-[10px] text-[var(--museum-accent)] uppercase tracking-widest font-bold mb-1">
              What I built
            </h4>
            <p className="text-sm text-[var(--museum-text-muted)] leading-relaxed bg-[var(--museum-bg)] p-3 rounded-lg border border-[var(--museum-border)]">
              An interface concept for experimenting with AI-assisted workflows.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-[var(--museum-accent)] uppercase tracking-widest font-bold mb-1">
              What I learned
            </h4>
            <p className="text-sm text-[var(--museum-text-muted)] leading-relaxed bg-[var(--museum-bg)] p-3 rounded-lg border border-[var(--museum-border)]">
              AI tools need visible state, clear boundaries, and strong context
              to be effective.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-[var(--museum-accent)] uppercase tracking-widest font-bold mb-1">
              What's next
            </h4>
            <div className="text-sm text-[var(--museum-text-muted)] leading-relaxed bg-[var(--museum-bg)] p-3 rounded-lg border border-[var(--museum-border)] flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 text-[var(--museum-accent)]/70 flex-shrink-0" />
              <span>
                Connect the interface to real API flows and add saved experiment
                logs.
              </span>
            </div>
          </div>
        </div>

        <MuseumButton
          variant="secondary"
          onClick={() => navigate("/projects")}
          className="mt-auto py-4 text-[var(--museum-accent)] border-[var(--museum-accent)]/20 bg-[var(--museum-accent)]/10 hover:bg-[var(--museum-accent)]/20 w-full"
        >
          <Sparkles size={16} className="mr-2" /> Open Playground
        </MuseumButton>
      </div>
      </MuseumCard>
    </div>
  );
};
