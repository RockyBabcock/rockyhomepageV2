import { cn } from "@/lib/utils";
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

const sizeClass = {
  xl: "py-24 lg:py-32",
  lg: "py-20 lg:py-28",
  md: "py-16 lg:py-20",
  compact: "py-12 lg:py-16",
};

type MuseumSectionLayoutProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone: keyof typeof sectionTones;
  layout?: "default" | "featured" | "split" | "asymmetric" | "dashboard" | "mosaic" | "editorial" | "immersive" | "custom";
  size?: "xl" | "lg" | "md" | "compact";
  headerVariant?: "featured" | "compact" | "side" | "centered" | "hidden";
  childrenClassName?: string;
  className?: string;
  children: React.ReactNode;
};

export function MuseumSectionLayout({
  id,
  eyebrow,
  title,
  description,
  tone,
  layout = "default",
  size = "xl",
  headerVariant = "featured",
  childrenClassName,
  className,
  children,
}: MuseumSectionLayoutProps) {
  const colors = sectionTones[tone];

  const renderHeaderContent = () => (
    <>
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

      <h2 className={cn("mt-5 font-space tracking-[-0.06em] text-slate-950", 
        headerVariant === "compact" ? "text-4xl md:text-5xl" : "text-5xl md:text-7xl")}
      >
        {title}
      </h2>

      <p className={cn("mt-5 text-lg leading-8 text-[var(--lab-text-soft)]", 
        headerVariant === "centered" ? "mx-auto max-w-2xl" : "max-w-2xl")}
      >
        {description}
      </p>

      <div
        className={cn("mt-6 h-1 w-40 rounded-full",
          headerVariant === "centered" && "mx-auto"
        )}
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        }}
      />
    </>
  );

  return (
    <section id={id} className={cn(`relative px-4 sm:px-6 lg:px-10 overflow-hidden`, sizeClass[size], className)}>
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
        {headerVariant !== "hidden" && (
          <header className={cn(
            "mb-12",
            headerVariant === "featured" && "max-w-4xl",
            headerVariant === "compact" && "max-w-3xl mb-8",
            headerVariant === "side" && "grid lg:grid-cols-[1fr_auto] gap-8 items-end max-w-none",
            headerVariant === "centered" && "max-w-3xl mx-auto text-center"
          )}>
            {headerVariant === "side" ? (
              <>
                <div className="max-w-2xl">
                  {renderHeaderContent()}
                </div>
                {/* Optional side content could go here if needed in the future */}
              </>
            ) : (
              renderHeaderContent()
            )}
          </header>
        )}

        <div className={cn(layout !== "custom" && `lab-section-grid-${layout}`, childrenClassName)}>
          {children}
        </div>
      </div>
    </section>
  );
}
