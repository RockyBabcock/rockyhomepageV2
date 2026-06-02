import React from 'react';
import { motion } from "motion/react";
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
import { Plus } from "lucide-react";

// Museum components
import { HallHeader } from "../components/HallHeader";
import { MuseumDirectory } from "../components/MuseumDirectory";
import { ExhibitNote } from "../components/ExhibitNote";
import { TransitionPanel } from "../components/TransitionPanel";

const ComingSoonPlaceholder = ({ colSpan = "col-span-12 md:col-span-4" }: { colSpan?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className={`${colSpan} group relative min-h-[300px] border-2 border-dashed border-primary/20 dark:border-primary/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center overflow-hidden bg-white/35 dark:bg-black/30 backdrop-blur-sm cursor-pointer hover:bg-primary/5 transition-colors duration-500`}
  >
    {/* Blueprint bg decoration */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04]" 
         style={{ 
           backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, currentColor 10px, currentColor 11px), repeating-linear-gradient(90deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`, 
           backgroundSize: '10px 10px' 
         }} 
    />
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 group-hover:text-primary transition-all duration-500 shadow-md">
      <Plus className="w-8 h-8 text-primary opacity-60 group-hover:opacity-100" />
    </div>
    <div className="text-[10px] font-mono tracking-[0.2em] text-primary/70 mb-2 uppercase font-bold">Sealed Archive Gate</div>
    <h3 className="font-headline text-2xl font-black mb-2 opacity-90 text-ink dark:text-base">Exhibit Under Construction</h3>
    <p className="font-body text-xs text-ink/60 dark:text-base/60 max-w-[280px] leading-relaxed">
      This chamber is currently locked and undergoing heavy active calibration. Reserved for future software intelligence & cybernetic hardware expansions.
    </p>
  </motion.div>
);

export default function HomePage() {
  return (
    <>
      <TableOfContents />
      <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        
        {/* HALL 00 // ENTRANCE */}
        <div id="hero" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 00" 
            title="Entrance Hall" 
            subtitle="Curator identity signal, professional availability parameters, and foundational credentials terminal."
            category="Curator Dossier"
            status="ACTIVE"
          />
          <ProfileModule />
          <div className="mt-8 col-span-12">
            <JobApplicationModule />
          </div>
        </div>

        {/* HALL 01 // MAP DIRECTORY */}
        <div id="directory" className="scroll-mt-32 col-span-12">
          <MuseumDirectory />
        </div>

        {/* Transition: Entrance -> Laboratory */}
        <TransitionPanel 
          currentHall="HALL 00 / ENTRANCE HALL" 
          nextHall="HALL 01 / PROJECT LABORATORY" 
          visitorPath="proof-of-work route"
          signalStrength="stable // telemetry live"
        />

        {/* HALL 02 // LAB PROJECTS */}
        <div id="projects" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 01" 
            title="Project Laboratory" 
            subtitle="Curated showcases of functional software engineering, interactive web systems, and direct proof of construction capability."
            category="Core Exhibits"
            status="ACTIVE"
          />
          <ProjectLabModule />
          <div className="mt-6">
            <GitHubModule />
          </div>
        </div>

        {/* Transition: Laboratory -> The Forge */}
        <TransitionPanel 
          currentHall="HALL 01 / PROJECT LABORATORY" 
          nextHall="HALL 02 / THE FORGE" 
          visitorPath="technical capability flow"
          signalStrength="dense frequency waves // online"
        />

        {/* HALL 03 // THE FORGE */}
        <div id="forge" className="scroll-mt-32 col-span-12 my-6">
          <HallHeader 
            code="HALL 02" 
            title="The Forge" 
            subtitle="Deep systems instrumentation detailing technical stack proficiencies, real-time wave fluctuations, and design token matrices."
            category="Arsenal / Infrastructure"
            status="ACTIVE"
          />
          <div className="w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+4rem)] -ml-4 md:-ml-8 lg:-ml-8">
            <CoreCapabilitiesModule />
          </div>
        </div>

        {/* Transition: The Forge -> Experiments */}
        <TransitionPanel 
          currentHall="HALL 02 / THE FORGE" 
          nextHall="HALL 03 / EXPERIMENT CHAMBERS" 
          visitorPath="conceptual explorations link"
          signalStrength="computational entropy elevated"
        />

        {/* HALL 04 // EXPERIMENTS */}
        <div id="experiments" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 03" 
            title="Experiment Chambers" 
            subtitle="Active sandboxes exploring autonomous agent integrations, decentralized Web3 protocol nodes, and cybernetic physical-digital loops."
            category="Active Sandboxes"
            status="EXPERIMENTAL"
          />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-6">
              <AIPlaygroundModule />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <Web3VaultModule />
            </div>
            <div className="col-span-12">
              <ExhibitNote 
                label="living systems telemetry"
                title="Biological & Mechanical Systems Integration"
                body="Small-scale automated loops, microcontrollers, and real-time environment variables applied directly to physical flora. This documents the exact same state machine logic backing virtual software systems, customized to run in physical soil."
                className="mb-4"
              />
              <WateringSystemModule />
            </div>
          </div>
        </div>

        {/* Transition: Experiments -> Archives */}
        <TransitionPanel 
          currentHall="HALL 03 / EXPERIMENT CHAMBERS" 
          nextHall="HALL 04 / PERSONAL ARCHIVES" 
          visitorPath="sensory exploration zone"
          signalStrength="calm // human memories accessible"
        />

        {/* HALL 05 // LIFE ARCHIVES */}
        <div id="archives" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 04" 
            title="Personal Archives" 
            subtitle="Exhibitions mapping cognitive reasoning mechanisms, strategic foresight exercises, discipline-driven kinetic memory records, and timelines."
            category="Memory Systems"
            status="ACTIVE"
          />
          
          <div className="grid grid-cols-12 gap-6 mb-8">
            <div className="col-span-12 xl:col-span-6">
              <ExhibitNote 
                label="strategic logic exhibit"
                title="Strategic Thinking Hall"
                body="Chess is included here because it reflects how I think about systems: constraints, time limits, sacrifice, pattern recognition, and long-term planning."
                className="h-full"
              />
            </div>
            <div className="col-span-12 xl:col-span-6">
              <ExhibitNote 
                label="discipline and kinetics"
                title="Motion & Discipline Archive"
                body="A personal record of rhythm, practice, physical stamina, and competitive mindset, documenting the active relationship between physical action and mental clarity."
                className="h-full"
              />
            </div>
          </div>

          <ChessModule />
          <div className="my-6">
            <BasketballModule />
          </div>
          
          <div className="grid grid-cols-12 gap-6 my-6">
            <div className="col-span-12 lg:col-span-6">
              <ExhibitNote 
                label="taste & design grammar"
                title="Media Universe"
                body="Curating cinematic frames, visual environments, structural storyboarding, and interactive game design history to establish a rich creative library."
                className="h-full"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <ExhibitNote 
                label="temporal records"
                title="Curated Timeline Terminal"
                body="A linear log documenting professional evolutions, speaking engagements, design thresholds, and historical contributions throughout my journey."
                className="h-full"
              />
            </div>
          </div>

          <GameMediaModule />
          <div className="mt-6">
            <TimelineModule />
          </div>
        </div>

        {/* Transition: Archives -> Garden */}
        <TransitionPanel 
          currentHall="HALL 04 / PERSONAL ARCHIVES" 
          nextHall="HALL 05 / DIGITAL GARDEN" 
          visitorPath="cognitive semantic path"
          signalStrength="thought stream optimized"
        />

        {/* HALL 06 // DIGITAL GARDEN */}
        <div id="garden" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 05" 
            title="Digital Garden & Blog" 
            subtitle="Modular essays, technical post-mortems, interface paradigms, and quick-fire creative observations curated on-chain and locally."
            category="Cognitive Logs"
            status="ACTIVE"
          />
          <TemporalQuotesModule />
          <div className="grid grid-cols-12 gap-6 mt-6">
            <div className="col-span-12 lg:col-span-8">
              <BlogModule />
            </div>
            <ComingSoonPlaceholder colSpan="col-span-12 lg:col-span-4" />
          </div>
        </div>

        {/* Transition: Garden -> Signal Room */}
        <TransitionPanel 
          currentHall="HALL 05 / DIGITAL GARDEN" 
          nextHall="HALL 06 / SIGNAL ROOM" 
          visitorPath="comm-port connection"
          signalStrength="link clear // ready to bind"
        />

        {/* HALL 07 // SIGNAL ROOM */}
        <div id="signal" className="scroll-mt-32 col-span-12">
          <HallHeader 
            code="HALL 06" 
            title="Signal Room & Telemetry" 
            subtitle="Establish direct secure communication, request custom builds, or audit real-time visitation statistics."
            category="Portals & Auditing"
            status="ACTIVE"
          />
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-7">
              <ConnectModule />
            </div>
            <div className="col-span-12 xl:col-span-5">
              <VisitorAnalyticsModule />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
