import React from "react";

export const sectionTones = {
  entrance: {
    primary: "#FF006E",
    secondary: "#3A86FF",
    soft: "rgba(255, 0, 110, 0.14)",
  },
  projects: {
    primary: "#3A86FF",
    secondary: "#00C2FF",
    soft: "rgba(58, 134, 255, 0.14)",
  },
  skills: {
    primary: "#FF9F1C",
    secondary: "#8338EC",
    soft: "rgba(255, 159, 28, 0.14)",
  },
  experiments: {
    primary: "#8338EC",
    secondary: "#00C2FF",
    soft: "rgba(131, 56, 236, 0.14)",
  },
  live: {
    primary: "#00C2FF",
    secondary: "#06D6A0",
    soft: "rgba(0, 194, 255, 0.14)",
  },
  personal: {
    primary: "#FF9F1C",
    secondary: "#FF4D6D",
    soft: "rgba(255, 159, 28, 0.14)",
  },
  garden: {
    primary: "#06D6A0",
    secondary: "#FFE66D",
    soft: "rgba(6, 214, 160, 0.14)",
  },
  signal: {
    primary: "#FF006E",
    secondary: "#FF9F1C",
    soft: "rgba(255, 0, 110, 0.14)",
  },
};

type MuseumSectionLayoutProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: keyof typeof sectionTones;
  layout?: "default" | "featured" | "split" | "mosaic" | "editorial" | "immersive";
  children: React.ReactNode;
};

export function MuseumSectionLayout({
  id,
  eyebrow,
  title,
  description,
  tone,
  layout = "default",
  children,
}: MuseumSectionLayoutProps) {
  const colors = sectionTones[tone];

  return (
    <section id={id} className="relative px-4 sm:px-6 lg:px-10 py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-96 pointer-events-none opacity-80"
        style={{
          background: `
            radial-gradient(circle at 18% 20%, ${colors.soft}, transparent 34%),
            radial-gradient(circle at 82% 10%, ${colors.secondary}1f, transparent 30%)
          `,
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="mb-12 max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] border shadow-sm"
            style={{
              color: colors.primary,
              borderColor: `${colors.primary}44`,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
            {eyebrow}
          </div>

          <h2 className="mt-5 font-space text-5xl md:text-7xl tracking-[-0.06em] text-slate-950">
            {title}
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--lab-text-soft)]">
            {description}
          </p>

          <div
            className="mt-6 h-1 w-40 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
            }}
          />
        </header>

        <div className={`lab-section-grid-${layout}`}>
          {children}
        </div>
      </div>
    </section>
  );
}
