import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { projectLabData, ProjectEntry } from "../data/projectLabData";
import {
  Hammer,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Workflow,
  ExternalLink,
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { EvidenceBadge } from "./EvidenceBadge";

export const ProjectLabModule = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="col-span-12 lg:col-span-8 premium-card p-8 md:p-10 relative overflow-hidden group border-x-indigo-500/10 border-b-indigo-500/10 border-t-[3px] border-t-indigo-500"
    >
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-screen"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Hammer size={20} />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
                System Status: Active
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-headline font-black mb-2">
              Project Lab
            </h2>
            <p className="font-body text-ink/70 dark:text-base/70">
              Tracking the systems, prototypes, and creative tools I'm building.
            </p>
          </div>
          <Link
            to="/projects"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-xl transition-colors border border-indigo-500/20 font-bold text-sm tracking-wide"
          >
            Open Lab <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projectLabData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 md:p-8 flex flex-col rounded-3xl bg-white/50 dark:bg-[#0a0a0a]/50 border border-ink/5 dark:border-base/10 hover:border-indigo-500/30 transition-all shadow-sm group/card"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <StatusPill status={project.status} />
                    <span className="text-[11px] font-mono uppercase text-ink/50 dark:text-base/50 tracking-wider font-bold">
                      Role: {project.role}
                    </span>
                  </div>

                  <h3 className="text-2xl font-headline font-black mb-3 text-ink dark:text-base leading-tight group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm md:text-base font-body text-ink/80 dark:text-base/80 mb-6 leading-relaxed max-w-2xl">
                    {project.oneLine}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.techStack.map((chip) => (
                      <span
                        key={chip}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-ink/70 dark:text-base/70 font-semibold tracking-wide"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl && (
                      <EvidenceBadge type="Live Demo" href={project.liveUrl} />
                    )}
                    {project.repoUrl && (
                      <EvidenceBadge type="GitHub" href={project.repoUrl} />
                    )}
                    {!project.liveUrl && !project.repoUrl && (
                      <EvidenceBadge type="Case Study" />
                    )}
                  </div>
                </div>

                <div className="lg:w-2/5 space-y-5 bg-ink/5 dark:bg-base/5 rounded-2xl p-5 md:p-6 border border-ink/5 dark:border-base/5">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400 font-bold tracking-widest mb-2 flex items-center gap-2">
                      <Workflow className="w-3 h-3" /> Core Challenge
                    </h4>
                    <p className="text-xs text-ink/70 dark:text-base/70 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-ink/10 dark:border-base/10">
                    <h4 className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-bold tracking-widest mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" /> Executed Scope
                    </h4>
                    <ul className="space-y-1.5">
                      {project.built.slice(0, 3).map((item, i) => (
                        <li
                          key={i}
                          className="text-xs text-ink/70 dark:text-base/70 leading-relaxed flex items-start gap-1.5"
                        >
                          <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500/50" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
