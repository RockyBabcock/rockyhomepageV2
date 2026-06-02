import { motion } from "motion/react";
import { Download, CheckCircle2 } from "lucide-react";
import { MuseumCard } from "./common/MuseumCard";
import { MuseumButton } from "./common/MuseumButton";

export function JobApplicationModule() {
  return (
    <div
      id="JobApplication"
      className="col-span-12 md:col-span-4 h-full flex flex-col"
    >
      <MuseumCard className="!bg-[var(--museum-bg)] !text-[var(--museum-text)] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 rounded-3xl h-full border border-[var(--museum-border-strong)]">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[var(--museum-accent)]/10 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--museum-accent)] pointer-events-none"></div>

      <div className="relative z-10 flex-1">
        <h2 className="text-4xl lg:text-5xl font-headline font-medium italic mb-6 leading-tight text-[var(--museum-text)]">
          Open for Inquiry.
        </h2>
        <p className="font-body text-[var(--museum-text-muted)] mb-8 leading-relaxed">
          Seeking high-impact roles in design engineering and creative
          technology. Available currently.
        </p>

        <ul className="space-y-4 font-label text-xs tracking-widest uppercase font-bold text-[var(--museum-text-faint)]">
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--museum-accent)]" /> Design Systems
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--museum-accent)]" /> Creative Direction
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--museum-accent)]" /> React / Tailwind
          </li>
        </ul>
      </div>

      <MuseumButton
        variant="secondary"
        className="mt-10 py-5 text-[var(--museum-accent)] border-[var(--museum-accent)]/20 bg-[var(--museum-accent)]/10 hover:bg-[var(--museum-accent)]/20 w-full shadow-lg"
      >
        <Download className="w-4 h-4 mr-2 group-hover:-translate-y-1 transition-transform" />
        Fetch Resume
      </MuseumButton>
      </MuseumCard>
    </div>
  );
}
