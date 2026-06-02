import React from "react";
import { motion } from "motion/react";
import {
  Map,
  ArrowRight,
  UserCheck,
  Microscope,
  Compass,
  Library,
  BookOpen,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "../lib/utils";

export const museumDirectory = [
  {
    code: "HALL 00",
    title: "Entrance Hall",
    subtitle:
      "Identity, core mission, availability, and professional credentials terminal.",
    anchor: "hero",
    icon: UserCheck,
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    code: "HALL 01",
    title: "Project Laboratory",
    subtitle:
      "Constructed systems, interactive engineering products, and live deployment cards.",
    anchor: "projects",
    icon: Microscope,
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    code: "HALL 02",
    title: "The active Forge",
    subtitle:
      "Real-time systems instrumentation, tactical tech inventories, and stack benchmarks.",
    anchor: "forge",
    icon: Sparkles,
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    code: "HALL 03",
    title: "Experiment Chambers",
    subtitle:
      "Autonomous sandboxes exploring Gemini agent interaction models, AI play, and Web3 nodes.",
    anchor: "experiments",
    icon: Compass,
    color: "from-purple-500/10 to-pink-500/10",
  },
  {
    code: "HALL 04",
    title: "Personal Archives",
    subtitle:
      "Systems reasoning applied to physical space, game states (chess), watering hardware, and memory timelines.",
    anchor: "archives",
    icon: Library,
    color: "from-rose-500/10 to-red-500/10",
  },
  {
    code: "HALL 05",
    title: "Digital Garden",
    subtitle:
      "Essays, modular documentation, architecture concepts, and live cognitive stream logs.",
    anchor: "garden",
    icon: BookOpen,
    color: "from-cyan-500/10 to-sky-500/10",
  },
  {
    code: "HALL 06",
    title: "Signal Room",
    subtitle:
      "Bi-directional contact portals, active site telemetry logs, and collaborative hooks.",
    anchor: "signal",
    icon: Send,
    color: "from-stone-500/10 to-slate-500/10",
  },
];

export function MuseumDirectory() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id="directory" className="scroll-mt-32 col-span-12 my-8 p-1">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="premium-card p-6 md:p-8 dark:bg-zinc-950/40 relative overflow-hidden"
      >
        {/* Decorative Grid Grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 15px, #000 15px, #000 16px), repeating-linear-gradient(90deg, transparent, transparent 15px, #000 15px, #000 16px)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Layout elements */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 mb-8 border-b border-ink/10 dark:border-base/10 relative z-10">
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-2xl text-primary border border-primary/20 shrink-0">
                <Map className="w-6 h-6 animate-[pulse_2s_infinite]" />
              </div>
              <div>
                <div className="text-[10px] font-mono tracking-[0.2em] text-primary font-bold uppercase">
                  Archive Directory Mapping
                </div>
                <h3 className="text-2xl md:text-3xl font-headline font-black uppercase text-ink dark:text-base">
                  Museum Floor Plan
                </h3>
              </div>
            </div>
            <p className="text-xs text-ink/70 dark:text-base/70 font-mono leading-relaxed border-l-2 border-primary/40 pl-3 py-1">
              This is not a standard portfolio. It is organized as a digital
              museum: part proof-of-work, part learning archive, part personal
              world map. Take the fast route to projects and contact, or explore
              the full museum.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => handleScrollTo("projects")}
              className="text-xs font-mono uppercase tracking-wider font-bold px-4 py-2.5 bg-primary text-white hover:bg-primary/95 transition-all rounded-xl shadow-lg border border-primary/20 flex items-center gap-2 group cursor-pointer"
            >
              <span>Fast Route (Projects)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo("directory-grid")}
              className="text-xs font-mono uppercase tracking-wider font-bold px-4 py-2.5 bg-white/80 dark:bg-zinc-900 border border-ink/10 dark:border-base/10 hover:border-primary/50 text-ink/70 dark:text-base/80 hover:text-ink dark:hover:text-base transition-all rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Floor Map</span>
            </button>
          </div>
        </div>

        {/* Directory Blueprint Grid */}
        <div
          id="directory-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative z-10"
        >
          {museumDirectory.map((hall, idx) => {
            const IconComponent = hall.icon;

            return (
              <motion.div
                key={hall.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -3, scale: 1.01 }}
                onClick={() => handleScrollTo(hall.anchor)}
                className={cn(
                  "premium-card !rounded-2xl p-5 hover:border-primary/50 cursor-pointer flex flex-col justify-between h-[180px] bg-gradient-to-br transition-all dark:bg-zinc-900/40 relative group border-[0.5px]",
                  hall.color,
                )}
              >
                {/* Visual guide markers */}
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-ink/10 dark:border-base/10 pointer-events-none group-hover:border-primary/40 transition-colors" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-ink/10 dark:border-base/10 pointer-events-none group-hover:border-primary/40 transition-colors" />

                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-bold text-primary tracking-[0.2em]">
                    {hall.code}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/40 dark:bg-zinc-950/40 border border-ink/5 dark:border-base/5 text-ink/40 dark:text-base/40 group-hover:text-primary group-hover:border-primary/20 transition-all">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                <div className="mt-4 flex-1">
                  <h4 className="text-sm font-headline font-black uppercase text-ink dark:text-base group-hover:text-primary transition-colors">
                    {hall.title}
                  </h4>
                  <p className="text-[11px] font-body text-ink/60 dark:text-base/60 mt-1.5 line-clamp-2 md:line-clamp-3 leading-normal">
                    {hall.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.15em] text-indigo-500/80 group-hover:text-primary transition-colors pt-2 border-t border-dashed border-ink/5 dark:border-base/5 mt-2">
                  <span>ENTER PORTAL</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
