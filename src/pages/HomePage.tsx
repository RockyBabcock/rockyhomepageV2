import React from 'react';
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { ProfileModule } from "../components/ProfileModule";
import { JobApplicationModule } from "../components/JobApplicationModule";
import { CoreCapabilitiesModule } from "../components/CoreCapabilitiesModule";
import { ChessModule } from "../components/chess/ChessModule";
import { BasketballModule } from "../components/BasketballModule";
import { GitHubModule } from "../components/GitHubModule";
import { TimelineModule } from "../components/TimelineModule";
import { GameMediaModule } from "../components/GameMediaModule";
import { WateringSystemModule } from "../components/WateringSystemModule";
import { BlogModule } from "../components/BlogModule";
import { ConnectModule } from "../components/ConnectModule";
import { ProjectLabModule } from "../components/ProjectLabModule";
import { AIPlaygroundModule } from "../components/AIPlaygroundModule";
import { Web3VaultModule } from "../components/Web3VaultModule";
import { VisitorAnalyticsModule } from "../components/VisitorAnalyticsModule";
import { TableOfContents } from "../components/TableOfContents";

import { TemporalQuotesModule } from "../components/chess/TemporalQuotesModule";

const ComingSoonPlaceholder = ({ colSpan = "col-span-12 md:col-span-4" }: { colSpan?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className={`${colSpan} group relative min-h-[300px] border-2 border-dashed border-ink/20 dark:border-base/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center overflow-hidden bg-white/30 dark:bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-white/50 dark:hover:bg-black/50 transition-colors duration-500`}
  >
    <div className="w-16 h-16 rounded-full bg-ink/5 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 shadow-md">
      <Plus className="w-8 h-8 opacity-40 group-hover:opacity-100" />
    </div>
    <h3 className="font-headline text-xl font-bold mb-2 opacity-60 group-hover:opacity-100 transition-opacity">Reserved for Expansion</h3>
    <p className="font-mono text-xs uppercase tracking-widest opacity-40 group-hover:opacity-80 transition-opacity max-w-[200px]">
      New module coming soon
    </p>
  </motion.div>
);

const SectionHeader = ({ id, title, subtitle }: { id?: string, title: string, subtitle?: string }) => (
  <div id={id} className="scroll-mt-32 col-span-12 mb-4 mt-8 flex flex-col md:flex-row md:items-end justify-between border-b border-ink/10 dark:border-base/10 pb-4">
    <div>
      <h2 className="text-2xl font-headline font-black">{title}</h2>
      {subtitle && <p className="font-body text-ink/60 dark:text-base/60 text-sm mt-1">{subtitle}</p>}
    </div>
  </div>
);

export default function HomePage() {
  return (
    <>
      <TableOfContents />
      <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        
        {/* Zone 1 — Professional First Impression */}
        <div id="hero" className="scroll-mt-32 col-span-12 mb-4">
          <ProfileModule />
        </div>

        <SectionHeader id="foundations" title="Professional Foundations" subtitle="Who I am and what I can do" />
        <JobApplicationModule />
        
        {/* Full-bleed forge module */}
        <div className="w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+4rem)] -ml-4 md:-ml-8 lg:-ml-8 col-span-12 my-12" id="tech-stack-vault">
           <CoreCapabilitiesModule />
        </div>

        <VisitorAnalyticsModule />

        {/* Zone 2 — Proof of Work & Learning System */}
        <SectionHeader id="active-systems" title="Active Systems" subtitle="What I'm building, learning, and exploring" />
        <ProjectLabModule />
        <AIPlaygroundModule />
        <div className="col-span-12 md:col-span-12 lg:col-span-8">
          <Web3VaultModule />
        </div>
        <GitHubModule />

        {/* Confidential Archives */}
        <SectionHeader id="archives" title="Confidential Archives" subtitle="Accessing localized intelligence terminal..." />
        <TimelineModule />

        {/* Zone 4 — Personal Worlds */}
        <SectionHeader id="personal" title="Personal Worlds" subtitle="Deep dives into my interests and hobbies" />
        <TemporalQuotesModule />
        <ChessModule />
        <BasketballModule />
        <GameMediaModule />
        <WateringSystemModule />

        {/* Zone 5 — Writing / Blog */}
        <SectionHeader id="blog" title="Digital Garden & Blog" subtitle="Thoughts, notes, and long-form writing" />
        <BlogModule />
        <ComingSoonPlaceholder colSpan="col-span-12 md:col-span-5 relative" />

        {/* Zone 6 — Contact */}
        <SectionHeader id="connect" title="Connect" subtitle="Let's build something together" />
        <ConnectModule />

      </div>
    </>
  );
}
