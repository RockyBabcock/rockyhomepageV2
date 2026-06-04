import { motion } from "motion/react";
import { useState, useEffect } from "react";

const heroJumps = [
  {
    label: "Projects",
    desc: "Selected builds and implementation stories.",
    target: "projects",
    color: "var(--blue)",
  },
  {
    label: "Skill Spectrum",
    desc: "Tools, skills, workflows, and proof-of-work.",
    target: "forge",
    color: "var(--orange)",
  },
  {
    label: "AI Chamber",
    desc: "AI interfaces, experiments, and prototypes.",
    target: "experiments",
    color: "var(--purple)",
  },
  {
    label: "Signal Room",
    desc: "Contact, collaboration, and external links.",
    target: "signal",
    color: "var(--pink)",
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
    <div className="flex flex-col relative z-10 w-full mb-16 lg:mb-24">
      {/* Hero Section */}
      <section className="w-full relative min-h-screen pt-28 lg:pt-36 pb-16 flex flex-col justify-center items-center overflow-hidden">
        {/* Very subtle overall hero radial glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 flex justify-center items-center">
           <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[var(--pink)]/5 via-transparent to-[var(--cyan)]/5 blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid gap-12 lg:gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(380px,1fr)] lg:items-center relative z-10 flex-grow px-4 sm:px-6 lg:px-8">
          {/* Left Column: Hero Copy */}
          <div className="flex flex-col items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 lg:mb-8 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-soft)]"
            >
              PERSONAL DIGITAL MUSEUM / {new Date().getFullYear()}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[0.9] tracking-[-0.04em] text-[var(--ink)] mb-6 relative"
            >
              ROCKY BABCOCK
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-5 lg:mb-6 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-[var(--ink-soft)] font-semibold"
            >
              Creative Technologist · AI Interface Builder · Web Systems Explorer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-[var(--ink-soft)]"
            >
              I build colorful interfaces, experimental systems, and digital spaces where code, design, and imagination meet.
            </motion.p>

            {/* CTA Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-12 lg:mb-16"
            >
              <button
                onClick={() => scrollToElement("projects")}
                className="group relative overflow-hidden rounded-full bg-[var(--ink)] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[var(--ink)]/10 transition hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                View Projects
              </button>

              <button
                onClick={() => scrollToElement("projects")}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--card)] backdrop-blur-md px-8 py-3.5 text-sm font-semibold text-[var(--ink)] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Enter the Museum
              </button>
            </motion.div>

            {/* Meta Row / Status */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col md:flex-row md:items-center gap-y-3 gap-x-6 font-mono text-xs uppercase tracking-[0.1em] text-[var(--ink-muted)] lg:mt-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[var(--green)] animate-pulse" />
                Available for collaboration
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-[var(--border-strong)] md:block" />
              <div>Building with React / TS / AI tools</div>
              <div className="hidden h-1 w-1 rounded-full bg-[var(--border-strong)] md:block" />
              <div>Based in the digital frontier</div>
            </motion.div>
          </div>

          {/* Right Column: Status Dashboard */}
          <div className="relative z-10 flex justify-center lg:justify-end mt-4 lg:mt-0 w-full group">
            {/* Soft rainbow glow behind the card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[70px] pointer-events-none opacity-30 transition-opacity duration-1000 group-hover:opacity-60"
              style={{
                background: "conic-gradient(from 180deg at 50% 50%, var(--pink) 0deg, var(--orange) 72deg, var(--yellow) 144deg, var(--cyan) 216deg, var(--blue) 288deg, var(--pink) 360deg)"
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
              className="museum-card-strong w-full max-w-[420px] p-6 lg:p-8 relative overflow-hidden self-start mx-auto lg:mx-0"
            >
              {/* Internal card grid / decoration */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

              <div className="flex justify-between items-start mb-6 border-b border-[var(--border)] pb-5 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                    IDENT
                  </p>
                  <div className="font-space font-bold text-lg lg:text-xl text-[var(--ink)] tracking-tight">
                    Rocky Babcock
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-2">
                    SYSTEM TIME
                  </p>
                  <span className="font-mono text-sm text-[var(--ink-soft)] font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded shadow-sm">
                    {liveLive}
                  </span>
                </div>
              </div>

              <div className="space-y-6 lg:space-y-8 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">
                    Current Focus
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm text-[var(--ink-soft)] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue)] shadow-[0_0_8px_var(--blue)]" />
                      Rocky Homepage V2
                    </li>
                    <li className="flex items-center gap-3 text-sm text-[var(--ink-soft)] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)] shadow-[0_0_8px_var(--purple)]" />
                      AI Interface Experiments
                    </li>
                    <li className="flex items-center gap-3 text-sm text-[var(--ink-soft)] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--orange)] shadow-[0_0_8px_var(--orange)]" />
                      Web3 Learning Archive
                    </li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">
                    Main Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind", "Motion", "AI Models"].map((skill) => (
                      <span key={skill} className="px-2.5 py-1.5 bg-[var(--canvas-soft)] border border-[var(--border)] rounded-md text-[11px] font-mono font-medium text-[var(--ink)] shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between p-3 lg:p-4 rounded-xl bg-[var(--canvas-soft)] shadow-inner border border-[var(--border)]">
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-1">Mode</span>
                      <span className="font-mono text-xs font-semibold text-[var(--ink)]">Live Build</span>
                    </div>
                    <div className="h-6 w-px bg-[var(--border)]" />
                    <div className="flex flex-col text-right">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-1">Status</span>
                      <span className="font-mono text-xs font-semibold text-[var(--green)] flex items-center gap-1.5 justify-end">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--green)] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--green)]"></span>
                        </span>
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick jump cards placing */}
        <div className="w-full relative z-10 px-4 sm:px-6 lg:px-8 mt-16 lg:mt-24 max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
           >
              {heroJumps.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToElement(item.target)}
                  className="museum-card group p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--ink-muted)]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-1.5 w-12 rounded-full transition-all duration-300 group-hover:w-16" style={{ backgroundColor: item.color }} />
                    <div className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      <svg className="w-4 h-4 text-[var(--ink-soft)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-space text-base font-bold text-[var(--ink)] mb-1.5">
                    {item.label}
                  </div>
                  <div className="text-xs leading-relaxed text-[var(--ink-soft)]">
                    {item.desc}
                  </div>
                </button>
              ))}
           </motion.div>
        </div>
      </section>
    </div>
  );
}

