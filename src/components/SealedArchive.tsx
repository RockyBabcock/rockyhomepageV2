import React from "react";
import { motion } from "motion/react";
import { BoxSelect } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { MuseumCard } from "./common/MuseumCard";

export function SealedArchive({
  title = "Exhibit Under Construction",
  description = "This chamber is reserved for a future experiment.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="col-span-12"
    >
      <MuseumCard className="border border-dashed border-[var(--museum-border-strong)] bg-[var(--museum-bg)] p-6 md:p-10 rounded-2xl flex flex-col items-center justify-center text-center opacity-80">
      <div className="mb-4">
        <StatusPill status="Sealed" />
      </div>

      <BoxSelect className="w-8 h-8 text-[var(--museum-text-muted)] mb-3 opacity-50" />

      <div className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--museum-text-faint)] mb-2">
        Sealed Archive
      </div>

      <h3 className="text-xl md:text-2xl font-headline font-black uppercase text-[var(--museum-text)]">
        {title}
      </h3>

      <p className="mt-2 text-sm text-[var(--museum-text-muted)] max-w-md mx-auto">
        {description}
      </p>
      </MuseumCard>
    </motion.section>
  );
}
