import { motion } from "motion/react";
import { useState, useEffect } from "react";

const heroJumps = [
  {
    label: "Projects",
    desc: "Selected builds and implementation stories.",
    target: "projects",
    color: "#3A86FF",
  },
  {
    label: "Capability Forge",
    desc: "Tools, skills, workflows, and proof-of-work.",
    target: "forge",
    color: "#FF9F1C",
  },
  {
    label: "AI Chamber",
    desc: "AI interfaces, experiments, and prototypes.",
    target: "experiments",
    color: "#8338EC",
  },
  {
    label: "Signal Room",
    desc: "Contact, collaboration, and external links.",
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
      <section className="w-full relative min-h-screen pt-28 pb-10 flex flex-col items-center overflow-hidden">
        {/* Background glow for the section */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/30 to-transparent">
          <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-pink-300/20 blur-3xl" />
          <div className="absolute right-10 top-32 h-[320px] w-[320px] rounded-full bg-cyan-300/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-center relative z-10 flex-grow px-4 sm:px-6 lg:px-8">
          {/* Left Column: Hero Copy */}
          <div className="flex flex-col items-start justify-center">
            <div className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
              Personal Digital Museum / 2026
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-space text-6xl font-black leading-[0.9] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-8xl mb-5 relative"
            >
              Rocky
              <span className="block bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-500 bg-clip-text text-transparent">
                Babcock
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 max-w-2xl font-space text-2xl font-semibold leading-tight text-slate-800 sm:text-3xl"
            >
              AI Interfaces, Web Systems & Digital Archives
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg mb-8"
            >
              I design and build playful, intelligent, and highly visual web experiences — combining frontend engineering, AI workflows, interaction design, and personal knowledge systems.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {["Creative Technologist", "AI Interface Builder", "Web Systems Explorer"].map((role) => (
                <span key={role} className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur-sm">
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToElement("projects")}
                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
              >
                View Projects
              </button>

              <button
                onClick={() => scrollToElement("forge")}
                className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 shadow-sm backdrop-blur-sm"
              >
                Explore Capability Forge
              </button>

              <button
                onClick={() => scrollToElement("signal")}
                className="rounded-full border border-pink-200 bg-pink-50 px-5 py-3 text-sm font-semibold text-pink-700 transition hover:-translate-y-0.5 shadow-sm"
              >
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right Column: Status Dashboard */}
          <div className="relative z-10 flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="w-full max-w-sm rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl relative overflow-hidden self-start"
            >
              {/* Top right subtle glow inside card */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-[40px] pointer-events-none" />

              <div className="flex justify-between items-start mb-6 border-b border-slate-200/80 pb-5 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5">
                    Status
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-900 font-semibold bg-white/80 px-2 py-1 rounded-md shadow-sm border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for projects
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1.5 flex justify-end">
                    Local
                  </p>
                  <span className="font-mono text-sm text-slate-600 bg-white/80 px-2 py-1 rounded-md shadow-sm border border-slate-100 block">
                    {liveLive}
                  </span>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Currently Building
                  </p>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-700 font-medium whitespace-nowrap">Rocky Homepage V2</li>
                    <li className="text-sm text-slate-700 font-medium whitespace-nowrap">AI interface experiments</li>
                    <li className="text-sm text-slate-700 font-medium whitespace-nowrap">Web3 learning archive</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Main Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Tailwind", "Motion"].map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-mono font-medium text-slate-800 shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">
                    Looking For
                  </p>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-700 font-medium">Design engineering internships</li>
                    <li className="text-sm text-slate-700 font-medium">Frontend creative technology roles</li>
                    <li className="text-sm text-slate-700 font-medium">Interface collaborations</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full mt-20 relative z-10 px-4 sm:px-6 lg:px-8 pb-10">
           {/* Quick jump cards */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.5 }}
             className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
           >
              {heroJumps.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToElement(item.target)}
                  className="group rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-left shadow-sm backdrop-blur transition hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <div className="mb-2 h-1 w-10 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="font-space text-sm font-bold text-slate-950">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-slate-500">
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

