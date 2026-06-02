import React from "react";
import { museumSections } from "@/data/museumSections";
import { HallHeader } from "@/components/HallHeader";
import { SectionContainer } from "./SectionContainer";

export const sectionTones = {
  entrance: {
    name: "Entrance",
    primary: "#FF006E",
    secondary: "#3A86FF",
    soft: "rgba(255, 0, 110, 0.12)",
  },
  projects: {
    name: "Project Lab",
    primary: "#3A86FF",
    secondary: "#00C2FF",
    soft: "rgba(58, 134, 255, 0.12)",
  },
  skills: {
    name: "Skill Spectrum",
    primary: "#FF9F1C",
    secondary: "#8338EC",
    soft: "rgba(255, 159, 28, 0.12)",
  },
  experiments: {
    name: "Experiments",
    primary: "#8338EC",
    secondary: "#00C2FF",
    soft: "rgba(131, 56, 236, 0.12)",
  },
  liveProof: {
    name: "Live Proof",
    primary: "#00C2FF",
    secondary: "#06D6A0",
    soft: "rgba(0, 194, 255, 0.12)",
  },
  archives: {
    name: "Personal Worlds",
    primary: "#FF9F1C",
    secondary: "#FF4D6D",
    soft: "rgba(255, 159, 28, 0.12)",
  },
  garden: {
    name: "Digital Garden",
    primary: "#06D6A0",
    secondary: "#FFE66D",
    soft: "rgba(6, 214, 160, 0.12)",
  },
  signal: {
    name: "Signal Room",
    primary: "#FF006E",
    secondary: "#FF9F1C",
    soft: "rgba(255, 0, 110, 0.12)",
  },
};

type MuseumSectionLayoutProps = {
  id?: string;
  sectionId?: string; // mapping for backwards compatibility if needed
  tone?: keyof typeof sectionTones;
  layout?: "default" | "featured" | "split" | "mosaic" | "editorial" | "immersive";
  title?: string;
  eyebrow?: string;
  description?: string;
  children: React.ReactNode;
};

export function MuseumSectionLayout({
  id,
  sectionId,
  tone,
  layout = "default",
  title,
  eyebrow,
  description,
  children,
}: MuseumSectionLayoutProps) {
  const section = sectionId ? museumSections.find((item) => item.id === sectionId) : null;
  const targetId = id || sectionId;
  const currentTone = tone ? sectionTones[tone] : { primary: "var(--museum-accent)", soft: "rgba(0, 0, 0, 0.05)" };

  return (
    <section id={targetId} className="lab-section">
      <div
        className="absolute inset-x-0 top-0 h-64 opacity-50 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${currentTone.soft}, transparent 60%)`,
        }}
      />

      <div className="lab-section-inner">
        {(title || section) && (
          <div className="mb-10 max-w-3xl">
            {(eyebrow || section?.code) && (
              <div
                className="section-eyebrow"
                style={{ borderColor: `${currentTone.primary}55`, color: currentTone.primary }}
              >
                {eyebrow || section?.code}
              </div>
            )}

            <h2 className="mt-5 text-4xl md:text-6xl font-headline font-bold tracking-tight text-[var(--lab-text)]">
              {title || section?.title}
            </h2>

            {(description || section?.subtitle) && (
              <p className="mt-5 text-lg leading-8 text-[var(--lab-text-soft)]">
                {description || section?.subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`lab-section-grid-${layout}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
