import React from "react";
import { motion } from "motion/react";
import { projectLabData } from "../data/projectLabData";
import {
  CheckCircle2,
  ChevronRight,
  Workflow,
} from "lucide-react";
import { StatusPill } from "./StatusPill";
import { EvidenceBadge } from "./EvidenceBadge";
import { MuseumCard } from "./common/MuseumCard";
import { MuseumButton } from "./common/MuseumButton";
import { Link } from "react-router-dom";

export const ProjectLabModule = () => {
  return (
    <div className="flex flex-col gap-6">
      {projectLabData.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <MuseumCard className="flex flex-col rounded-3xl bg-white/50 dark:bg-[#0a0a0a]/50 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <StatusPill status={project.status} />
                  <span className="text-[11px] font-mono uppercase text-ink/50 dark:text-base/50 tracking-wider font-bold">
                    Role: {project.role}
                  </span>
                </div>

                <h3 className="text-2xl font-headline font-black mb-3 text-[var(--museum-text)] leading-tight transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm md:text-base font-body text-[var(--museum-text-muted)] mb-6 leading-relaxed max-w-2xl">
                  {project.oneLine}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((chip) => (
                    <span
                      key={chip}
                      className="text-[10px] font-mono px-2.5 py-1 rounded bg-[var(--museum-panel-elevated)] border border-[var(--museum-border)] text-[var(--museum-text-muted)] font-semibold tracking-wide"
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

              <div className="lg:w-2/5 space-y-5 bg-[var(--museum-bg)] rounded-2xl p-5 md:p-6 border border-[var(--museum-border)]">
                <div>
                  <h4 className="text-[10px] font-mono uppercase text-[var(--museum-accent)] font-bold tracking-widest mb-2 flex items-center gap-2">
                    <Workflow className="w-3 h-3" /> Core Challenge
                  </h4>
                  <p className="text-xs text-[var(--museum-text-muted)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--museum-border-strong)]">
                  <h4 className="text-[10px] font-mono uppercase text-[var(--museum-success)] font-bold tracking-widest mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> Executed Scope
                  </h4>
                  <ul className="space-y-1.5">
                    {project.built.slice(0, 3).map((item, i) => (
                      <li
                        key={i}
                        className="text-xs text-[var(--museum-text-faint)] leading-relaxed flex items-start gap-1.5"
                      >
                        <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-emerald-500/50" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </MuseumCard>
        </motion.div>
      ))}
      <div className="mt-8 flex justify-center">
        <MuseumButton as={Link} to="/projects" variant="primary">
          View All Projects
        </MuseumButton>
      </div>
    </div>
  );
};
