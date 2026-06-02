import { motion } from "motion/react";
import { Zap, MapPin, Code, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

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
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-12 relative">
      {/* Hero Section */}
      <section className="col-span-12 w-full min-h-[90vh] grid grid-cols-12 gap-8 items-center p-4 md:p-8 relative overflow-hidden">
        {/* Background glow for the section */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-[var(--color-rainbow-pink)]/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-[var(--color-rainbow-blue)]/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute top-[60%] left-[60%] w-[30vw] h-[30vw] bg-[var(--color-rainbow-green)]/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        {/* Left Column: Hero Copy */}
        <div className="col-span-12 lg:col-span-7 relative z-10 flex flex-col items-start text-left justify-center pt-24 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-rainbow-green)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-rainbow-green)]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-green)] font-bold">
              System Online
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-headline font-normal text-[var(--museum-text)] leading-[0.85] tracking-tighter mb-6 relative"
          >
            ROCKY
            <br />
            BABCOCK
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-body font-semibold text-[var(--color-rainbow-cyan)] mb-4 tracking-tight"
          >
            Creative Technologist / AI Interface Builder / Web Systems Explorer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg font-body text-[var(--museum-text-muted)] max-w-xl mb-12 leading-relaxed"
          >
            I design and build expressive web systems where interface, AI, code, and personal memory become explorable digital spaces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToElement("directory")}
              className="px-6 py-3 bg-[var(--museum-text)] text-[var(--museum-bg)] hover:bg-white font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-all"
            >
              Enter the Museum
            </button>
            <button
              onClick={() => scrollToElement("projects")}
              className="px-6 py-3 bg-[var(--museum-panel)] text-[var(--museum-text)] hover:bg-[var(--museum-border-strong)] border border-[var(--museum-border-strong)] font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-all"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToElement("signal")}
              className="px-6 py-3 bg-transparent text-[var(--museum-text)] hover:text-[var(--color-rainbow-pink)] font-mono text-xs uppercase tracking-widest font-bold rounded-full transition-colors flex items-center gap-2"
            >
              Contact <Zap size={14} />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Spectrum Identity Card */}
        <div className="col-span-12 lg:col-span-5 relative z-10 flex justify-center lg:justify-end mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full max-w-md bg-[var(--museum-panel-elevated)] backdrop-blur-xl border border-[var(--museum-border-strong)] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Top right subtle glow inside card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--color-rainbow-purple)]/20 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex justify-between items-start mb-8 border-b border-[var(--museum-border)] pb-6 relative z-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-muted)] mb-1">
                  Status
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--museum-text)] font-medium">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-rainbow-green)] animate-pulse" />
                  Building Museum V2
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-muted)] mb-1">
                  Local Time
                </p>
                <p className="font-mono text-sm text-[var(--museum-text)] font-medium">
                  {liveLive}
                </p>
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-2 flex items-center gap-2">
                  <Code size={12} /> Main Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Tailwind", "Framer Motion"].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-[var(--museum-panel)] border border-[var(--museum-border-strong)] rounded-md text-xs font-mono text-[var(--museum-text)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-2 flex items-center gap-2">
                  <MapPin size={12} /> Location
                </p>
                <p className="font-body text-sm text-[var(--museum-text)]">
                  California, US
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--museum-text-faint)] mb-2 flex items-center gap-2">
                  <Sparkles size={12} /> Active Interests
                </p>
                <p className="font-body text-sm text-[var(--museum-text)] leading-relaxed">
                  Design Engineering, Creative AI Interfaces, Local-first software, Interactive Experiences.
                </p>
              </div>
            </div>

            {/* Mini rainbow orbit visualization */}
            <div className="mt-8 pt-6 border-t border-[var(--museum-border)] flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-[var(--color-rainbow-red)] animate-[spin_10s_linear_infinite] absolute" />
                <div className="w-16 h-16 rounded-full border border-[var(--color-rainbow-cyan)] animate-[spin_6s_linear_infinite_reverse] absolute" />
                <div className="w-8 h-8 rounded-full border border-[var(--color-rainbow-orange)] animate-[spin_4s_linear_infinite] absolute" />
              </div>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--museum-text-muted)] z-10 py-6">
                SPECTRUM SYNCHRONIZED
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Real History Section (Replacing Fake Resumes) */}
      <section className="col-span-12 p-4 md:p-8 mt-12 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl md:text-5xl font-headline font-black mb-12 text-center text-[var(--museum-text)]">
          Current State.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--museum-panel)] rounded-3xl p-8 border border-[var(--museum-border-strong)] hover:border-[var(--color-rainbow-orange)] transition-colors group">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-orange)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-orange)] group-hover:scale-150 transition-transform"></span>
              Currently Building
            </h3>
            <ul className="space-y-4 font-body text-[var(--museum-text-muted)] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Personal digital museum
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                AI interface experiments
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Web3 learning archive
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Interactive frontend modules
              </li>
            </ul>
          </div>

          <div className="bg-[var(--museum-panel)] rounded-3xl p-8 border border-[var(--museum-border-strong)] hover:border-[var(--color-rainbow-cyan)] transition-colors group relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-rainbow-cyan)]/5 rounded-full blur-3xl pointer-events-none transition-opacity opacity-0 group-hover:opacity-100" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-cyan)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-cyan)] group-hover:scale-150 transition-transform"></span>
              Learning Focus
            </h3>
            <ul className="space-y-4 font-body text-[var(--museum-text-muted)] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                React / TypeScript / Tailwind
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                AI application design
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Web animation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Creative coding
              </li>
            </ul>
          </div>

          <div className="bg-[var(--museum-panel)] rounded-3xl p-8 border border-[var(--museum-border-strong)] hover:border-[var(--color-rainbow-pink)] transition-colors group">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--color-rainbow-pink)] font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-rainbow-pink)] group-hover:scale-150 transition-transform"></span>
              Looking For
            </h3>
            <ul className="space-y-4 font-body text-[var(--museum-text-muted)] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Design engineering internships
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                Frontend creative technology roles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--museum-border-strong)] mt-0.5">›</span> 
                AI product interface opportunities
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
