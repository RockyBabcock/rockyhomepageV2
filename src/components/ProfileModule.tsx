import { motion } from "motion/react";
import { Zap, MapPin, Code, Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const heroJumps = [
  {
    label: "Projects",
    desc: "Selected builds and interface experiences",
    target: "projects",
    color: "#3A86FF",
  },
  {
    label: "Skill Spectrum",
    desc: "Tools, stack, and learning map",
    target: "directory",
    color: "#FF9F1C",
  },
  {
    label: "AI Chamber",
    desc: "Prompt systems and intelligent UI experiments",
    target: "experiments",
    color: "#8338EC",
  },
  {
    label: "Signal Room",
    desc: "Contact, links, and availability",
    target: "signal",
    color: "#FF006E",
  },
];

export function ProfileModule() {
  const [liveLive, setLiveLive] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveLive(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`Section with id "${id}" was not found.`);
      return;
    }

    const offset = 88;
    const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: pos,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col relative z-10 w-full mb-24">
      {/* Hero Section */}
      <section className="w-full relative min-h-screen pt-28 pb-20 flex flex-col items-center">
        {/* Background glow for the section */}
        <div className="hero-spectrum-glow" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-12 lg:gap-16 relative z-10 flex-grow">
          {/* Left Column: Hero Copy */}
          <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-center">
            <div className="section-eyebrow mb-8" style={{ color: "var(--rainbow-purple)", borderColor: "rgba(131, 56, 236, 0.2)" }}>
              <span>Personal Digital Museum / 2026</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-headline font-bold text-[var(--museum-text)] leading-[0.88] tracking-tighter mb-8 relative"
            >
              <span className="relative z-10">
                ROCKY
                <br />
                BABCOCK
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-headline font-semibold text-[var(--museum-text)] mb-6 tracking-tight leading-snug"
            >
              Creative Technologist <br className="hidden lg:block md:hidden"/>
              AI Interface Builder <br className="hidden lg:block md:hidden"/>
              Web Systems Explorer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl font-body text-[var(--museum-text-soft)] max-w-2xl mb-12 leading-[1.75]"
            >
              I build playful, intelligent, and highly visual web experiences — mixing frontend engineering, AI workflows, interaction design, and personal digital systems.
            </motion.p>
          </div>

          {/* Right Column: Spectrum Identity Card */}
          <div className="col-span-12 lg:col-span-4 relative z-10 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="lab-card vivid-border w-full max-w-sm p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] relative overflow-hidden self-start"
            >
              {/* Top right subtle glow inside card */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-rainbow-purple)]/20 rounded-full blur-[40px] pointer-events-none" />

              <div className="flex justify-between items-start mb-6 border-b border-[var(--lab-border)] pb-5 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--lab-text-muted)] mb-1">
                    Status
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--lab-text)] font-semibold">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-rainbow-green)] animate-pulse" />
                    Available for projects
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--lab-text-muted)] mb-1">
                    Local
                  </p>
                  <p className="font-mono text-xs text-[var(--lab-text)] font-bold">
                    {liveLive}
                  </p>
                </div>
              </div>

              <div className="space-y-5 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lab-text-muted)] mb-2 flex items-center gap-1.5">
                    <Code size={14} /> Main Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind"].map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-white border border-[var(--lab-border)] rounded text-xs font-mono font-medium text-[var(--lab-text)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lab-text-muted)] mb-1.5 flex items-center gap-1.5">
                    <MapPin size={14} /> Base
                  </p>
                  <p className="font-body text-sm text-[var(--lab-text)] font-medium">
                    California, US
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lab-text-muted)] mb-1.5 flex items-center gap-1.5">
                    <Sparkles size={14} /> Interests
                  </p>
                  <p className="font-body text-sm text-[var(--lab-text-soft)] leading-relaxed">
                    Design Engineering, Creative AI Interfaces, Local-first prototypes.
                  </p>
                </div>
              </div>

              {/* Mini rainbow orbit visualization */}
              <div className="mt-6 pt-5 border-t border-[var(--lab-border)] flex items-center justify-center relative h-16">
                <div className="absolute inset-0 flex items-center justify-center opacity-40 select-none pointer-events-none">
                  <div className="w-16 h-16 rounded-full border border-[var(--color-rainbow-red)] animate-[spin_10s_linear_infinite] absolute" />
                  <div className="w-10 h-10 rounded-full border border-[var(--color-rainbow-cyan)] animate-[spin_6s_linear_infinite_reverse] absolute" />
                  <div className="w-4 h-4 rounded-full border border-[var(--color-rainbow-orange)] animate-[spin_4s_linear_infinite] absolute" />
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--lab-text-muted)] z-10 flex items-center gap-2 font-bold">
                  Online <span className="w-1 h-1 bg-[--color-rainbow-cyan] rounded-full" />
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full mt-14 relative z-10">
           {/* Quick jump cards */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
           >
             {heroJumps.map((item) => (
               <button
                 key={item.label}
                 onClick={() => scrollToElement(item.target)}
                 className="group lab-card p-5 text-left transition-all hover:-translate-y-1"
                 style={{
                   boxShadow: `0 18px 55px ${item.color}18`,
                 }}
               >
                 <div
                   className="mb-4 h-11 w-11 rounded-2xl"
                   style={{
                     background: `linear-gradient(135deg, ${item.color}, white)`,
                   }}
                 />
                 <div className="font-space text-lg font-bold text-slate-950">
                   {item.label}
                 </div>
                 <p className="mt-1 text-sm leading-6 text-slate-500 font-body">
                   {item.desc}
                 </p>
               </button>
             ))}
           </motion.div>
        </div>
      </section>

      {/* Real History Section */}
      <section className="max-w-7xl mx-auto w-full mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-headline font-bold mb-10 text-[var(--lab-text)]">
          Current State
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="lab-card p-8 group transition-colors">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-orange)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-orange)] group-hover:scale-150 transition-transform"></span>
              Currently Building
            </h3>
            <ul className="space-y-4 font-body text-[var(--lab-text-soft)] text-sm leading-relaxed">
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Rocky Homepage V2
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                AI interface experiments
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Web3 learning archive
              </li>
            </ul>
          </div>

          <div className="lab-card p-8 group transition-colors relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-rainbow-cyan)]/5 rounded-full blur-3xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-cyan)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-cyan)] group-hover:scale-150 transition-transform"></span>
              Learning Focus
            </h3>
            <ul className="space-y-4 font-body text-[var(--lab-text-soft)] text-sm leading-relaxed">
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                React / TypeScript / Tailwind
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                AI application design
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Framer Motion techniques
              </li>
            </ul>
          </div>

          <div className="lab-card p-8 group transition-colors">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-pink)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-pink)] group-hover:scale-150 transition-transform"></span>
              Looking For
            </h3>
            <ul className="space-y-4 font-body text-[var(--lab-text-soft)] text-sm leading-relaxed">
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Design engineering internships
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Frontend creative technology roles
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-[var(--lab-border)]">
                Interface collaborations
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
