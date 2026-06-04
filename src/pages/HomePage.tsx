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
import {
  MuseumSectionLayout,
  sectionTones,
} from "@/components/layout/MuseumSectionLayout";
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
    <main className="rainbow-lab-bg text-[var(--museum-text)] museum-page-shell">
      <TableOfContents />

      {/* 01 Entrance */}
      <ProfileModule />

      {/* 02 Proof of Work */}
      <MuseumSectionLayout
        id="projects"
        eyebrow="HALL 01 / PROOF OF WORK"
        title="Project Laboratory"
        description="Selected builds that show how I design, structure, and implement web systems."
        tone="projects"
        layout="custom"
        size="xl"
        width="wide"
        headerVariant="side"
      >
        <ProjectLabModule />
      </MuseumSectionLayout>

      {/* 03 Capability System */}
      <MuseumSectionLayout
        id="forge"
        eyebrow="HALL 02 / CAPABILITY SYSTEM"
        title="Capability Forge"
        description="A living map of the tools I use to design, build, automate, and experiment."
        tone="skills"
        layout="dashboard"
        size="xl"
        width="wide"
        headerVariant="side"
      >
        <CoreCapabilitiesModule />
      </MuseumSectionLayout>

      {/* 04 Experiments */}
      <MuseumSectionLayout
        id="experiments"
        eyebrow="HALL 03 / EXPERIMENT CHAMBERS"
        title="AI, Web3 & Interface Systems"
        description="Explorations in intelligent interfaces, decentralized systems, and creative tools."
        tone="experiments"
        layout="split"
        size="xl"
        width="wide"
        headerVariant="side"
      >
          <ModuleErrorBoundary fallbackTitle="AI Experiment Chamber Offline">
            <Suspense
              fallback={<ModuleSkeleton label="Loading AI Playground..." />}
            >
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
            <Suspense
              fallback={<ModuleSkeleton label="Loading Web3 Vault..." />}
            >
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
        eyebrow="HALL 04 / LIVE PROOF"
        title="Activity Signals"
        description="Signals from what I build, commit, track, and improve."
        tone="live"
        layout="mosaic"
        size="xl"
        width="wide"
        headerVariant="side"
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
        eyebrow="HALL 05 / PERSONAL ARCHIVES"
        title="Play, Strategy & Memory"
        description="The human side of the site: games, sport, media, chess, and daily systems."
        tone="personal"
        layout="mosaic"
        size="xl"
        width="wide"
        headerVariant="centered"
      >
        <PersonalWorldPreview
          title="Chess Archive"
          eyebrow="Strategy"
          description="A personal thinking hall about chess, constraints, and long-term planning."
          color="#D4AF37"
          href="/chess"
        />

        <PersonalWorldPreview
          title="Basketball Geometry"
          eyebrow="Motion"
          description="A cinematic archive about Spurs basketball, structure, movement, and design systems."
          color="#FF6B35"
          href="/basketball"
        />

        <PersonalWorldPreview
          title="Media Universe"
          eyebrow="Memory"
          description="Games, films, music, and visual references that shape my interface taste."
          color="#8338EC"
          href="/media"
        />

        <PersonalWorldPreview
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
        eyebrow="HALL 06 / DIGITAL GARDEN"
        title="Digital Garden"
        description="Notes, essays, and fragments from the systems I build."
        tone="garden"
        layout="editorial"
        size="lg"
        width="narrow"
        headerVariant="compact"
      >
        <Suspense fallback={<ModuleSkeleton label="Loading Blog Module..." />}>
          <BlogModule />
        </Suspense>

        <Suspense fallback={<ModuleSkeleton label="Loading Timeline..." />}>
          <TimelineModule />
        </Suspense>
      </MuseumSectionLayout>

      {/* 08 Contact */}
      <MuseumSectionLayout
        id="signal"
        eyebrow="HALL 07 / SIGNAL ROOM"
        title="Let’s Build Something"
        description="Open to frontend, design engineering, AI interface, and creative web collaborations."
        tone="signal"
        layout="centered"
        size="xl"
        width="wide"
        headerVariant="centered"
      >
        <ConnectModule />
      </MuseumSectionLayout>
    </main>
  );
}
