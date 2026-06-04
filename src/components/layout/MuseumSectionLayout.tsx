import React from "react";
import { cn } from "@/lib/utils";

export const sectionTones = {
  entrance: {
    primary: "#FF006E",
    secondary: "#3A86FF",
    soft: "rgba(255, 0, 110, 0.12)",
    surface: "rgba(255, 0, 110, 0.06)",
    gradient: "linear-gradient(135deg, #FF006E, #3A86FF)",
  },
  projects: {
    primary: "#3A86FF",
    secondary: "#00C2FF",
    soft: "rgba(58, 134, 255, 0.12)",
    surface: "rgba(58, 134, 255, 0.06)",
    gradient: "linear-gradient(135deg, #3A86FF, #00C2FF)",
  },
  skills: {
    primary: "#FF9F1C",
    secondary: "#8338EC",
    soft: "rgba(255, 159, 28, 0.12)",
    surface: "rgba(255, 159, 28, 0.06)",
    gradient: "linear-gradient(135deg, #FF9F1C, #8338EC)",
  },
  experiments: {
    primary: "#8338EC",
    secondary: "#00C2FF",
    soft: "rgba(131, 56, 236, 0.12)",
    surface: "rgba(131, 56, 236, 0.06)",
    gradient: "linear-gradient(135deg, #8338EC, #00C2FF)",
  },
  live: {
    primary: "#00C2FF",
    secondary: "#06D6A0",
    soft: "rgba(0, 194, 255, 0.12)",
    surface: "rgba(0, 194, 255, 0.06)",
    gradient: "linear-gradient(135deg, #00C2FF, #06D6A0)",
  },
  personal: {
    primary: "#FF9F1C",
    secondary: "#FF4D6D",
    soft: "rgba(255, 159, 28, 0.12)",
    surface: "rgba(255, 159, 28, 0.06)",
    gradient: "linear-gradient(135deg, #FF9F1C, #FF4D6D)",
  },
  garden: {
    primary: "#06D6A0",
    secondary: "#FFE66D",
    soft: "rgba(6, 214, 160, 0.12)",
    surface: "rgba(6, 214, 160, 0.06)",
    gradient: "linear-gradient(135deg, #06D6A0, #FFE66D)",
  },
  signal: {
    primary: "#FF006E",
    secondary: "#FF9F1C",
    soft: "rgba(255, 0, 110, 0.12)",
    surface: "rgba(255, 0, 110, 0.06)",
    gradient: "linear-gradient(135deg, #FF006E, #FF9F1C)",
  },
} as const;

type SectionTone = keyof typeof sectionTones;

type SectionSize = "xl" | "lg" | "md" | "compact";

type HeaderVariant =
  | "featured"
  | "compact"
  | "side"
  | "centered"
  | "hidden";

type LayoutVariant =
  | "default"
  | "split"
  | "asymmetric"
  | "dashboard"
  | "mosaic"
  | "editorial"
  | "immersive"
  | "centered"
  | "custom";

type SectionWidth = "narrow" | "standard" | "wide" | "full";

const widthClasses: Record<SectionWidth, string> = {
  narrow: "max-w-4xl",
  standard: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

type MuseumSectionLayoutProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  tone: SectionTone;
  size?: SectionSize;
  width?: SectionWidth;
  headerVariant?: HeaderVariant;
  layout?: LayoutVariant;
  childrenClassName?: string;
  className?: string;
  children: React.ReactNode;
};

const sizeClasses: Record<SectionSize, string> = {
  xl: "py-16 md:py-20 lg:py-28",
  lg: "py-12 md:py-16 lg:py-24",
  md: "py-10 md:py-14 lg:py-18",
  compact: "py-8 md:py-10 lg:py-14",
};

const layoutClasses: Record<LayoutVariant, string> = {
  default: "lab-section-grid-default",
  split: "lab-section-grid-split",
  asymmetric: "lab-section-grid-asymmetric",
  dashboard: "lab-section-grid-dashboard",
  mosaic: "lab-section-grid-mosaic",
  editorial: "lab-section-grid-editorial",
  immersive: "lab-section-grid-immersive",
  centered: "lab-section-grid-centered",
  custom: "",
};

function SectionEyebrow({
  eyebrow,
  color,
}: {
  eyebrow?: string;
  color: string;
}) {
  if (!eyebrow) return null;

  return (
    <div className="mb-8 flex items-center gap-4">
      <span 
        className="font-mono text-xs uppercase tracking-[0.2em] font-semibold"
        style={{ color: "var(--hall-primary)" }}
      >
        {eyebrow}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(90deg, var(--hall-soft), transparent 80%)"
        }}
      />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  colors,
  variant,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  colors: (typeof sectionTones)[SectionTone];
  variant: HeaderVariant;
}) {
  if (variant === "hidden") return null;
  if (!title && !description && !eyebrow) return null;

  const titleNode = title ? (
    <h2
      className={cn(
        "mt-5 font-space font-bold tracking-[-0.06em] text-slate-950",
        variant === "compact"
          ? "text-3xl md:text-4xl"
          : "text-4xl md:text-6xl",
      )}
    >
      {title}
    </h2>
  ) : null;

  const descriptionNode = description ? (
    <p
      className={cn(
        "mt-5 leading-8 text-slate-600",
        variant === "compact" ? "max-w-xl text-base" : "max-w-2xl text-lg",
      )}
    >
      {description}
    </p>
  ) : null;

  const ruleNode = (
    <div
      className={cn(
        "mt-6 h-1 w-20 rounded-full",
        variant === "centered" ? "mx-auto" : "",
      )}
      style={{
        background: "var(--hall-gradient)",
      }}
    />
  );

  if (variant === "centered") {
    return (
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <SectionEyebrow eyebrow={eyebrow} color={colors.primary} />
        {titleNode}
        <div className="mx-auto">{descriptionNode}</div>
        {ruleNode}
      </header>
    );
  }

  if (variant === "side") {
    return (
      <header className="mb-12 grid items-end gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionEyebrow eyebrow={eyebrow} color={colors.primary} />
          {titleNode}
          {ruleNode}
        </div>

        {description ? (
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:ml-auto">
            {description}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "max-w-4xl",
        variant === "compact" ? "mb-8" : "mb-12",
      )}
    >
      <SectionEyebrow eyebrow={eyebrow} color={colors.primary} />
      {titleNode}
      {descriptionNode}
      {ruleNode}
    </header>
  );
}

export function MuseumSectionLayout({
  id,
  eyebrow,
  title,
  description,
  tone,
  size = "lg",
  width = "standard",
  headerVariant = "featured",
  layout = "default",
  childrenClassName,
  className,
  children,
}: MuseumSectionLayoutProps) {
  const colors = sectionTones[tone];

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        sizeClasses[size],
        className,
      )}
      style={
        {
          "--hall-primary": colors.primary,
          "--hall-secondary": colors.secondary,
          "--hall-soft": colors.soft,
          "--hall-surface": colors.surface,
          "--hall-gradient": colors.gradient,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 hall-glow"
      />

      {/* Subtle top border for section transition */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--hall-primary)] to-transparent opacity-20" />

      <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10", widthClasses[width])}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          colors={colors}
          variant={headerVariant}
        />

        <div
          className={cn(
            layoutClasses[layout],
            layout === "custom" && childrenClassName,
            layout !== "custom" && childrenClassName,
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
