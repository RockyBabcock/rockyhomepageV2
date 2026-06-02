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

import { SealedArchive } from "../components/SealedArchive";

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
          eyebrow="Route Shift / 01"
          title="First, Proof of Work"
          body="Before listing tools, the laboratory shows what has actually been built, shipped, or prototyped."
          next="Project Laboratory"
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
          eyebrow="Route Shift / 02"
          title="From Output to System"
          body="The projects show the result. The Forge exposes the tools, patterns, and technical habits behind those results."
          next="The Forge"
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
          eyebrow="Route Shift / 03"
          title="Entering Experiment Chambers"
          body="Once the build system is visible, the next wing shows where it is being tested: AI interfaces, Web3 concepts, and small living systems."
          next="Experiment Chambers"
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
                label="Why this exists"
                title="Small automation, real environment"
                body="The watering system represents physical-world systems thinking: sensing, routine, feedback, and environmental interaction."
                className="mb-4"
              />
              <WateringSystemModule />
            </div>
          </div>
        </div>

        {/* Transition: Experiments -> Archives */}
        <TransitionPanel 
          eyebrow="Route Shift / 04"
          title="Beyond the Workbench"
          body="Not every system is professional. Some systems shape how I think, move, play, remember, and form taste."
          next="Personal Archives"
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
                label="Why this exists"
                title="Chess as a thinking system"
                body="Chess appears here because it reflects how I think about systems: constraints, timing, sacrifice, pattern recognition, and long-term planning."
                className="h-full"
              />
            </div>
            <div className="col-span-12 xl:col-span-6">
              <ExhibitNote 
                label="Why this exists"
                title="Basketball as rhythm and discipline"
                body="Basketball records another kind of system: movement, repetition, physical timing, competitive pressure, and practice."
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
                label="Why this exists"
                title="Media as worldbuilding material"
                body="Games and media are included as cultural inputs — the worlds, mechanics, and atmospheres that influence my design taste."
                className="h-full"
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <ExhibitNote 
                label="Why this exists"
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
          eyebrow="Route Shift / 05"
          title="The Semantic Garden"
          body="The timeline archives concrete events and milestones. The digital garden registers ongoing creative reflections, logic post-mortems, and writing."
          next="Digital Garden"
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
            <div className="col-span-12 lg:col-span-4">
              <SealedArchive />
            </div>
          </div>
        </div>

        {/* Transition: Garden -> Signal Room */}
        <TransitionPanel 
          eyebrow="Route Shift / 06"
          title="Signal Port Open"
          body="At the end of currently indexed digital museum space lies direct portal access. Communications channels are verified and online."
          next="Signal Room"
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
