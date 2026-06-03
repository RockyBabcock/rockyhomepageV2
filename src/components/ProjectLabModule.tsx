import React from "react";
import { motion } from "motion/react";
import { projectLabData } from "../data/projectLabData";
import {
  CheckCircle2,
  ChevronRight,
  Workflow,
  ArrowRight,
  Lightbulb,
  PenTool,
  Code2,
  RefreshCw
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { EvidenceBadge } from "./EvidenceBadge";
import { Link } from "react-router-dom";

export const ProjectLabModule = () => {
  const featuredProject = projectLabData[0];
  const sideProjects = projectLabData.slice(1, 3); // Take next 2 projects

  return (
    <div className="grid grid-cols-12 gap-6">
      <motion.article 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lab-card col-span-12 lg:col-span-7 flex flex-col p-8 lg:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-rainbow-blue)]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col relative z-10 w-full">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="section-eyebrow" style={{ color: "var(--color-rainbow-blue)", borderColor: "rgba(58, 134, 255, 0.2)" }}>
                Featured Build
              </span>
              <StatusPill status={featuredProject.status} />
            </div>

            <h3 className="text-4xl lg:text-5xl font-headline font-bold mb-4 text-[var(--lab-text)] tracking-tight">
              {featuredProject.title}
            </h3>

            <p className="text-lg text-[var(--lab-text-soft)] mb-8 leading-relaxed max-w-2xl font-body">
              {featuredProject.oneLine}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {featuredProject.techStack.map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1.5 rounded bg-white border border-[var(--lab-border)] text-xs font-mono font-medium text-[var(--lab-text)]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              {featuredProject.liveUrl && (
                <EvidenceBadge type="Live Demo" href={featuredProject.liveUrl} />
              )}
              {featuredProject.repoUrl && (
                <EvidenceBadge type="GitHub" href={featuredProject.repoUrl} />
              )}
            </div>
          </div>

          <div className="w-full space-y-6 bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[var(--lab-border)] shadow-sm mt-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-mono uppercase text-[var(--color-rainbow-blue)] font-bold tracking-widest mb-3 flex items-center gap-2">
                  <Workflow className="w-4 h-4" /> Core Challenge
                </h4>
                <p className="text-sm font-body text-[var(--lab-text-soft)] leading-relaxed">
                  {featuredProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[var(--color-rainbow-cyan)] font-bold tracking-widest mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Executed Scope
                </h4>
                <ul className="space-y-3">
                  {featuredProject.built.slice(0, 3).map((item, i) => (
                    <li
                      key={i}
                      className="text-sm font-body text-[var(--lab-text-soft)] leading-relaxed flex items-start gap-2"
                    >
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-rainbow-cyan)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      <div className="col-span-12 lg:col-span-5 grid gap-6">
        {sideProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="lab-card p-6 flex flex-col justify-between group transition-all hover:-translate-y-1 relative overflow-hidden h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-rainbow-cyan)]/0 to-[var(--color-rainbow-blue)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10 w-full">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <StatusPill status={project.status} />
              </div>
              <h3 className="text-xl font-bold font-headline text-[var(--lab-text)] mb-2 group-hover:text-[var(--color-rainbow-blue)] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--lab-text-soft)] font-body leading-relaxed mb-6">
                {project.oneLine}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.slice(0, 3).map((chip) => (
                  <span
                    key={chip}
                    className="px-2 py-1 rounded bg-white/50 border border-[var(--lab-border)] text-xs font-mono text-[var(--lab-text-muted)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-[var(--lab-border)] w-full">
              <div className="flex gap-2">
                {project.repoUrl && <EvidenceBadge type="GitHub" href={project.repoUrl} />}
                {project.liveUrl && <EvidenceBadge type="Live Demo" href={project.liveUrl} />}
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--lab-text-muted)] group-hover:text-[var(--color-rainbow-blue)] transition-colors group-hover:translate-x-1" />
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lab-card p-5 col-span-12 hidden md:block"
      >
        <div className="grid grid-cols-4 divide-x divide-[var(--lab-border)]">
          <div className="flex flex-col items-center justify-center p-4 text-center group">
            <Lightbulb className="w-6 h-6 mb-3 text-[var(--lab-text-muted)] group-hover:text-[var(--color-rainbow-blue)] transition-colors" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--lab-text)] mb-1">Think</span>
            <span className="text-xs text-[var(--lab-text-soft)]">Define constraints</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center group">
            <PenTool className="w-6 h-6 mb-3 text-[var(--lab-text-muted)] group-hover:text-[var(--color-rainbow-cyan)] transition-colors" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--lab-text)] mb-1">Design</span>
            <span className="text-xs text-[var(--lab-text-soft)]">System anatomy</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center group">
            <Code2 className="w-6 h-6 mb-3 text-[var(--lab-text-muted)] group-hover:text-[var(--color-rainbow-green)] transition-colors" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--lab-text)] mb-1">Build</span>
            <span className="text-xs text-[var(--lab-text-soft)]">Prototype loops</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center group">
            <RefreshCw className="w-6 h-6 mb-3 text-[var(--lab-text-muted)] group-hover:text-[var(--color-rainbow-purple)] transition-colors" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--lab-text)] mb-1">Iterate</span>
            <span className="text-xs text-[var(--lab-text-soft)]">Refine interaction</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
