import React from "react";

type MuseumCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function MuseumCard({ children, className = "" }: MuseumCardProps) {
  return (
    <div
      className={`border border-stone-800 bg-[var(--museum-panel)] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition duration-300 hover:border-orange-500/40 hover:-translate-y-1 hover:bg-stone-900/70 ${className}`}
    >
      {children}
    </div>
  );
}
