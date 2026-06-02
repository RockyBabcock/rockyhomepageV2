import React, { lazy, Suspense } from "react";
import { ProfileModule } from "../components/ProfileModule";
import { JobApplicationModule } from "../components/JobApplicationModule";
import { CoreCapabilitiesModule } from "../components/CoreCapabilitiesModule";
import { GitHubModule } from "../components/GitHubModule";
import { ConnectModule } from "../components/ConnectModule";
import { ProjectLabModule } from "../components/ProjectLabModule";
import { TableOfContents } from "../components/TableOfContents";
import { TemporalQuotesModule } from "../components/chess/TemporalQuotesModule";

// Museum components
import { MuseumDirectory } from "../components/MuseumDirectory";
import { ExhibitNote } from "../components/ExhibitNote";
import { TransitionPanel } from "../components/TransitionPanel";
import { SealedArchive } from "../components/SealedArchive";
import { MuseumSectionLayout } from "@/components/layout/MuseumSectionLayout";
import { ModuleSkeleton } from "@/components/common/ModuleSkeleton";

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
    <>
      <TableOfContents />
      <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        {/* HALL 00 // ENTRANCE */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="entrance">
            <ProfileModule />
            <div className="mt-8">
              <JobApplicationModule />
            </div>
            <div id="directory" className="mt-12">
              <MuseumDirectory />
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: Entrance -> Laboratory */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 01"
            title="First, Proof of Work"
            body="Before listing tools, the laboratory shows what has actually been built, shipped, or prototyped."
            next="Project Laboratory"
          />
        </div>

        {/* HALL 01 // LAB PROJECTS */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="projects">
            <ProjectLabModule />
            <div className="mt-6">
              <GitHubModule />
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: Laboratory -> The Forge */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 02"
            title="From Output to System"
            body="The projects show the result. The Forge exposes the tools, patterns, and technical habits behind those results."
            next="The Forge"
          />
        </div>

        {/* HALL 02 // THE FORGE */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="forge">
            <div className="w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] lg:w-[calc(100%+4rem)] -ml-4 md:-ml-8 lg:-ml-8">
              <CoreCapabilitiesModule />
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: The Forge -> Experiments */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 03"
            title="Entering Experiment Chambers"
            body="Once the build system is visible, the next wing shows where it is being tested: AI interfaces, Web3 concepts, and small living systems."
            next="Experiment Chambers"
          />
        </div>

        {/* HALL 03 // EXPERIMENTS */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="experiments">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6">
                <Suspense
                  fallback={<ModuleSkeleton label="Loading AI Playground..." />}
                >
                  <AIPlaygroundModule />
                </Suspense>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Suspense
                  fallback={<ModuleSkeleton label="Loading Web3 Vault..." />}
                >
                  <Web3VaultModule />
                </Suspense>
              </div>
              <div className="col-span-12">
                <ExhibitNote
                  label="Why this exists"
                  title="Small automation, real environment"
                  body="The watering system represents physical-world systems thinking: sensing, routine, feedback, and environmental interaction."
                  className="mb-4"
                />
                <Suspense
                  fallback={
                    <ModuleSkeleton label="Loading Watering System..." />
                  }
                >
                  <WateringSystemModule />
                </Suspense>
              </div>
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: Experiments -> Archives */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 04"
            title="Beyond the Workbench"
            body="Not every system is professional. Some systems shape how I think, move, play, remember, and form taste."
            next="Personal Archives"
          />
        </div>

        {/* HALL 04 // LIFE ARCHIVES */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="archives">
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

            <Suspense
              fallback={<ModuleSkeleton label="Loading Chess Visualizer..." />}
            >
              <ChessModule />
            </Suspense>

            <div className="my-6">
              <Suspense
                fallback={
                  <ModuleSkeleton label="Loading Basketball Archive..." />
                }
              >
                <BasketballModule />
              </Suspense>
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

            <Suspense
              fallback={<ModuleSkeleton label="Loading Game Media..." />}
            >
              <GameMediaModule />
            </Suspense>

            <div className="mt-6">
              <Suspense
                fallback={<ModuleSkeleton label="Loading Timeline..." />}
              >
                <TimelineModule />
              </Suspense>
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: Archives -> Garden */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 05"
            title="The Semantic Garden"
            body="The timeline archives concrete events and milestones. The digital garden registers ongoing creative reflections, logic post-mortems, and writing."
            next="Digital Garden"
          />
        </div>

        {/* HALL 05 // DIGITAL GARDEN */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="garden">
            <TemporalQuotesModule />
            <div className="grid grid-cols-12 gap-6 mt-6">
              <div className="col-span-12 lg:col-span-8">
                <Suspense
                  fallback={<ModuleSkeleton label="Loading Blog Module..." />}
                >
                  <BlogModule />
                </Suspense>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <SealedArchive />
              </div>
            </div>
          </MuseumSectionLayout>
        </div>

        {/* Transition: Garden -> Signal Room */}
        <div className="col-span-12">
          <TransitionPanel
            eyebrow="Route Shift / 06"
            title="Signal Port Open"
            body="At the end of currently indexed digital museum space lies direct portal access. Communications channels are verified and online."
            next="Signal Room"
          />
        </div>

        {/* HALL 07 // SIGNAL ROOM */}
        <div className="col-span-12 scroll-mt-32">
          <MuseumSectionLayout sectionId="signal">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 xl:col-span-7">
                <ConnectModule />
              </div>
              <div className="col-span-12 xl:col-span-5">
                <Suspense
                  fallback={<ModuleSkeleton label="Loading Analytics..." />}
                >
                  <VisitorAnalyticsModule />
                </Suspense>
              </div>
            </div>
          </MuseumSectionLayout>
        </div>
      </div>
    </>
  );
}
