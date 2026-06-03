import React, { lazy, Suspense } from "react";
import { ProfileModule } from "../components/ProfileModule";
import { JobApplicationModule } from "../components/JobApplicationModule";
import { CoreCapabilitiesModule } from "../components/CoreCapabilitiesModule";
import { GitHubModule } from "../components/GitHubModule";
import { ConnectModule } from "../components/ConnectModule";
import { ProjectLabModule } from "../components/ProjectLabModule";
import { TableOfContents } from "../components/TableOfContents";

// Museum components
import { ExhibitNote } from "../components/ExhibitNote";
import { SealedArchive } from "../components/SealedArchive";
import { MuseumSectionLayout, sectionTones } from "@/components/layout/MuseumSectionLayout";
import { PersonalWorldPreview } from "@/components/PersonalWorldPreview";
import { ModuleSkeleton } from "@/components/common/ModuleSkeleton";
import { features } from "../config/features";
import { ModuleErrorBoundary } from "../components/common/ModuleErrorBoundary";

// Lazy-loaded heavy modules
const AIPlaygroundModule = lazy(() =>
  import("../components/AIPlaygroundModule").then((m) => ({
    default: m.AIPlaygroundModule,
  })),
);
const Web3VaultModule = lazy(() =>
  import("../components/Web3VaultModule").then((m) => ({
    default: m.Web3VaultModule,
  })),
);
const TimelineModule = lazy(() =>
  import("../components/TimelineModule").then((m) => ({
    default: m.TimelineModule,
  })),
);
const BlogModule = lazy(() =>
  import("../components/BlogModule").then((m) => ({ default: m.BlogModule })),
);
const VisitorAnalyticsModule = lazy(() =>
  import("../components/VisitorAnalyticsModule").then((m) => ({
    default: m.VisitorAnalyticsModule,
  })),
);

export default function HomePage() {
  return (
    <main className="rainbow-lab-bg text-[var(--museum-text)]">
      <TableOfContents />
      
      {/* 01 Entrance */}
      <ProfileModule />

      {/* 02 Proof of Work */}
      <MuseumSectionLayout 
        id="projects" 
        eyebrow="Selected Work"
        title="Project Lab"
        description="Real builds, interface experiments, and systems I am actively shaping."
        tone="projects"
        layout="default"
        size="xl"
        headerVariant="featured"
      >
        <ProjectLabModule />
      </MuseumSectionLayout>

      {/* 03 Capability System */}
      <MuseumSectionLayout 
        id="directory" 
        eyebrow="Technical Map"
        title="Skill Spectrum"
        description="A living map of the tools I use to design, build, automate, and experiment."
        tone="skills" 
        layout="default"
        size="xl"
        headerVariant="side"
      >
        <CoreCapabilitiesModule />
      </MuseumSectionLayout>

      {/* 04 Experiments */}
      <MuseumSectionLayout 
        id="experiments" 
        eyebrow="Experimental Chambers"
        title="AI, Web3 & Interface Systems"
        description="Explorations in intelligent interfaces, decentralized systems, and creative tools."
        tone="experiments" 
        layout="custom"
        size="lg"
        headerVariant="compact"
        childrenClassName="grid grid-cols-12 gap-6 items-stretch"
      >
        <div className="col-span-12 lg:col-span-7">
          <ModuleErrorBoundary fallbackTitle="AI Experiment Chamber Offline">
            <Suspense fallback={<ModuleSkeleton label="Loading AI Playground..." />}>
              {features.aiPlayground ? (
                <AIPlaygroundModule />
              ) : (
                <SealedArchive 
                  title="AI Experiment Chamber Offline" 
                  description="Live AI calls are disabled in this production build."
                />
              )}
            </Suspense>
          </ModuleErrorBoundary>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <ModuleErrorBoundary fallbackTitle="Web3 Archive Mode">
            <Suspense fallback={<ModuleSkeleton label="Loading Web3 Vault..." />}>
              {features.web3Vault ? (
                <Web3VaultModule />
              ) : (
                <SealedArchive 
                  title="Web3 Archive Mode" 
                  description="Wallet interaction is disabled."
                />
              )}
            </Suspense>
          </ModuleErrorBoundary>
        </div>
      </MuseumSectionLayout>

      {/* 05 Live Proof */}
      <MuseumSectionLayout 
        id="live-proof" 
        eyebrow="Live Proof"
        title="Activity Signals"
        description="A small dashboard of building, shipping, tracking, and learning in public."
        tone="live" 
        layout="dashboard"
        size="md"
        headerVariant="compact"
      >
        <ModuleErrorBoundary fallbackTitle="GitHub Signal Unavailable">
          {features.githubActivity ? (
            <GitHubModule />
          ) : (
            <SealedArchive 
              title="GitHub Signal Unavailable" 
              description="Live repository data could not be loaded."
            />
          )}
        </ModuleErrorBoundary>

        <ModuleErrorBoundary fallbackTitle="Telemetry Simulation">
          <Suspense fallback={<ModuleSkeleton label="Loading Analytics..." />}>
            {features.telemetry ? (
              <VisitorAnalyticsModule />
            ) : (
              <SealedArchive 
                title="Telemetry Simulation" 
                description="Real analytics are not connected yet."
              />
            )}
          </Suspense>
        </ModuleErrorBoundary>
      </MuseumSectionLayout>

      {/* 06 Personal Worlds */}
      <MuseumSectionLayout 
        id="archives" 
        eyebrow="Personal Worlds"
        title="Play, Strategy & Memory"
        description="The human side of the site: games, sport, media, chess, and daily systems."
        tone="personal" 
        layout="custom"
        size="lg"
        headerVariant="centered"
        childrenClassName="grid grid-cols-12 gap-6 items-stretch"
      >
        <PersonalWorldPreview
          className="col-span-12 md:col-span-6 xl:col-span-3"
          title="Chess Archive"
          eyebrow="Strategy"
          description="A personal thinking hall about chess, constraints, and long-term planning."
          color="#D4AF37"
          href="/chess"
        />

        <PersonalWorldPreview
          className="col-span-12 md:col-span-6 xl:col-span-3"
          title="Basketball Geometry"
          eyebrow="Motion"
          description="A cinematic archive about Spurs basketball, structure, movement, and design systems."
          color="#FF6B35"
          href="/basketball"
        />

        <PersonalWorldPreview
          className="col-span-12 md:col-span-6 xl:col-span-3"
          title="Media Universe"
          eyebrow="Memory"
          description="Games, films, music, and visual references that shape my interface taste."
          color="#8338EC"
          href="/media"
        />

        <PersonalWorldPreview
          className="col-span-12 md:col-span-6 xl:col-span-3"
          title="Watering System"
          eyebrow="Daily System"
          description="A small personal system about routines, care, tracking, and growth."
          color="#06D6A0"
          href="/watering"
        />
      </MuseumSectionLayout>

      {/* 07 Writing */}
      <MuseumSectionLayout 
        id="garden" 
        eyebrow="Digital Garden"
        title="Notes, Timeline & Thinking"
        description="A calmer space for writing, reflection, learning notes, and personal records."
        tone="garden" 
        layout="editorial"
        size="md"
        headerVariant="side"
      >
        <div>
          <Suspense fallback={<ModuleSkeleton label="Loading Blog Module..." />}>
            <BlogModule />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<ModuleSkeleton label="Loading Timeline..." />}>
            <TimelineModule />
          </Suspense>
        </div>
      </MuseumSectionLayout>

      {/* 08 Contact */}
      <MuseumSectionLayout 
        id="signal" 
        eyebrow="Signal Room"
        title="Let’s Build Something"
        description="Open to frontend, design engineering, AI interface, and creative web collaborations."
        tone="signal"
        layout="default"
        size="xl"
        headerVariant="centered"
      >
        <ConnectModule />
      </MuseumSectionLayout>
    </main>
  );
}
