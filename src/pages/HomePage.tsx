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

function SectionBridge({
  label,
  from,
  to,
  color,
}: {
  label: string;
  from: string;
  to: string;
  color: string;
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="rainbow-rule opacity-70" />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
        <span>{from}</span>
        <span style={{ color, fontWeight: "bold" }}>{label}</span>
        <span>{to}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="rainbow-lab-bg text-[var(--museum-text)]">
      <TableOfContents />
      
      {/* 01 Entrance */}
      <ProfileModule />

      <SectionBridge
        label="Route Shift / 01"
        from="Entrance"
        to="Project Lab"
        color="var(--rainbow-blue)"
      />

      {/* 02 Proof of Work */}
      <MuseumSectionLayout 
        id="projects" 
        tone="projects"
        layout="featured"
      >
        <ProjectLabModule />
      </MuseumSectionLayout>

      {/* 03 Capability System */}
      <MuseumSectionLayout 
        id="directory" 
        tone="skills" 
        layout="immersive"
      >
        <CoreCapabilitiesModule />
      </MuseumSectionLayout>

      <SectionBridge
        label="Route Shift / 02"
        from="Skill Spectrum"
        to="Experiment Chambers"
        color="var(--rainbow-purple)"
      />

      {/* 04 Experiments */}
      <MuseumSectionLayout 
        id="experiments" 
        tone="experiments" 
        layout="split"
        title="Experimental Chambers"
        eyebrow="Labs & Prototypes"
        description="Live testing grounds for AI interfaces and Web3 concepts."
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
        tone="liveProof" 
        layout="split"
        title="Live Proof"
        eyebrow="Signals & Data"
        description="Signals from what I build, commit, test, and improve."
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
        tone="archives" 
        layout="mosaic"
        title="Personal Worlds"
        eyebrow="Life Archives"
        description="Systems that shape how I think, move, play, remember, and form taste."
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
        tone="garden" 
        layout="editorial"
        title="Digital Garden"
        eyebrow="Writing & Thoughts"
        description="Ongoing creative reflections, logic post-mortems, and writing."
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

      <SectionBridge
        label="Route Shift / 03"
        from="Life Archives"
        to="Signal Room"
        color="var(--rainbow-pink)"
      />

      {/* 08 Contact */}
      <MuseumSectionLayout 
        id="signal" 
        tone="signal"
        layout="default"
      >
        <ConnectModule />
      </MuseumSectionLayout>
    </main>
  );
}
