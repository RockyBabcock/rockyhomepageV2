import React from "react";
import { cn } from "../lib/utils";

export type ExhibitStatus =
  | "Shipped"
  | "Active Build"
  | "Prototype"
  | "Learning Archive"
  | "Personal Archive"
  | "Simulation"
  | "Sealed";

export function StatusPill({
  status,
  className,
}: {
  status: ExhibitStatus | string;
  className?: string;
}) {
  const statusColors: Record<string, string> = {
    Shipped:
      "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
    "Active Build":
      "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5",
    Prototype:
      "text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/5",
    "Learning Archive":
      "text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
    "Personal Archive":
      "text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/5",
    Simulation:
      "text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/5",
    Sealed:
      "text-stone-600 dark:text-stone-400 border-stone-500/30 bg-stone-500/5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center border px-2 py-0.5 text-[10px] uppercase font-mono tracking-[0.18em]",
        statusColors[status] || "border-stone-700 text-stone-500",
        className,
      )}
    >
      {status}
    </span>
  );
}
