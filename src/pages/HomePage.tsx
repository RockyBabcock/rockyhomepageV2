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
const ChessModule = lazy(() =>
  import("../components/chess/ChessModule").then((m) => ({
    default: m.ChessModule,
  })),
);
const BasketballModule = lazy(() =>
  import("../components/BasketballModule").then((m) => ({
    default: m.BasketballModule,
  })),
);
const WateringSystemModule = lazy(() =>
  import("../components/WateringSystemModule").then((m) => ({
    default: m.WateringSystemModule,
  })),
);
const GameMediaModule = lazy(() =>
  import("../components/GameMediaModule").then((m) => ({
    default: m.GameMediaModule,
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
        layout="featured"
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
        layout="immersive"
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
        layout="split"
      >
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
      </MuseumSectionLayout>

      {/* 05 Live Proof */}
      <MuseumSectionLayout 
        id="live-proof" 
        eyebrow="Live Proof"
        title="Activity Signals"
        description="A small dashboard of building, shipping, tracking, and learning in public."
        tone="live" 
        layout="split"
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
        layout="mosaic"
      >
        <div className="col-span-12 lg:col-span-6">
          <Suspense fallback={<ModuleSkeleton label="Loading Chess Visualizer..." />}>
            <ChessModule />
          </Suspense>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Suspense fallback={<ModuleSkeleton label="Loading Basketball Archive..." />}>
            <BasketballModule />
          </Suspense>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <Suspense fallback={<ModuleSkeleton label="Loading Game Media..." />}>
            <GameMediaModule />
          </Suspense>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <Suspense fallback={<ModuleSkeleton label="Loading Watering System..." />}>
            <WateringSystemModule />
          </Suspense>
        </div>
      </MuseumSectionLayout>

      {/* 07 Writing */}
      <MuseumSectionLayout 
        id="garden" 
        eyebrow="Digital Garden"
        title="Notes, Timeline & Thinking"
        description="A calmer space for writing, reflection, learning notes, and personal records."
        tone="garden" 
        layout="editorial"
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
      >
        <ConnectModule />
      </MuseumSectionLayout>
    </main>
  );
}
