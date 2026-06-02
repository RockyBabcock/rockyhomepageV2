import React from "react";

type MuseumCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "green" | "pink" | "red" | "orange" | "yellow" | "cyan";
};

const GLOW_SHADOWS = {
  blue: "0 24px 80px rgba(58, 134, 255, 0.13)",
  purple: "0 24px 80px rgba(131, 56, 236, 0.14)",
  green: "0 24px 80px rgba(6, 214, 160, 0.14)",
  pink: "0 24px 80px rgba(255, 0, 110, 0.13)",
  red: "0 24px 80px rgba(255, 77, 109, 0.13)",
  orange: "0 24px 80px rgba(255, 159, 28, 0.13)",
  yellow: "0 24px 80px rgba(255, 230, 109, 0.13)",
  cyan: "0 24px 80px rgba(0, 194, 255, 0.13)",
  default: "0 20px 60px rgba(15, 23, 42, 0.08)",
};

export function MuseumCard({ children, className = "", glowColor }: MuseumCardProps) {
  const shadow = glowColor ? GLOW_SHADOWS[glowColor] : GLOW_SHADOWS.default;
  return (
    <div
      className={`bg-[rgba(255,255,255,0.76)] border border-[rgba(15,23,42,0.10)] rounded-[28px] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 ${className}`}
      style={{
        boxShadow: `${shadow}, inset 0 1px 0 rgba(255,255,255,0.85)`
      }}
    >
      {children}
    </div>
  );
}
