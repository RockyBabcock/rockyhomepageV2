import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { BrainCircuit, Sparkles, AlertCircle } from "lucide-react";
import { StatusPill } from "./StatusPill";

export const AIPlaygroundModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 lg:col-span-4 premium-card p-8 md:p-10 relative overflow-hidden group border-t-[3px] border-t-purple-500"
    >
      {/* Neural Background Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/50 rounded-full blur-[40px]" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/50 rounded-full blur-[50px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div className="flex justify-between items-start gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-600 dark:text-purple-400">
                <BrainCircuit size={20} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-purple-600 dark:text-purple-400">
                Intelligence
              </span>
            </div>
            <StatusPill status="Prototype" />
          </div>
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-2">
            AI Experiment Chamber
          </h2>
          <p className="font-body text-ink/70 dark:text-base/70 text-sm">
            Interface experiments for AI-native workflows, prompt systems, agents, and creative tools. Some experiments are prototypes or interface concepts. The goal is to document how AI changes the way software feels, not to pretend every idea is already a finished product.
          </p>
        </div>

        <div className="space-y-5 flex-1 mb-8 pt-4 border-t border-ink/10 dark:border-base/10">
          <div>
            <h4 className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold mb-1">
              What I built
            </h4>
            <p className="text-sm text-ink/80 dark:text-base/80 leading-relaxed bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-ink/5 dark:border-base/5">
              An interface concept for experimenting with AI-assisted workflows.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold mb-1">
              What I learned
            </h4>
            <p className="text-sm text-ink/80 dark:text-base/80 leading-relaxed bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-ink/5 dark:border-base/5">
              AI tools need visible state, clear boundaries, and strong context
              to be effective.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-[10px] text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold mb-1">
              What's next
            </h4>
            <div className="text-sm text-ink/80 dark:text-base/80 leading-relaxed bg-white/40 dark:bg-black/20 p-3 rounded-lg border border-ink/5 dark:border-base/5 flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 text-purple-500/70" />
              <span>
                Connect the interface to real API flows and add saved experiment
                logs.
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/projects"
          className="mt-auto w-full py-4 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded-xl transition-all border border-purple-500/20 font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:shadow-md active:scale-95"
        >
          <Sparkles size={16} /> Open Playground
        </Link>
      </div>
    </motion.section>
  );
};
