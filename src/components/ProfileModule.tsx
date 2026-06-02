import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Download,
  ArrowUpRight,
  Calendar,
  Activity,
  MapPin,
  BookOpen,
  MonitorPlay,
  Trophy,
  Code,
  Briefcase,
  GraduationCap,
  Mic,
  MessageSquare,
  Sparkles,
  Layout,
  X,
  ArrowDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { Typewriter } from "./Typewriter";

const timelineData = [
  {
    type: "Work",
    role: "Lead Product Designer",
    company: "TechNova",
    date: "2022 - Present",
    desc: "Spearheaded the redesign of the core enterprise platform, increasing user retention by 40%. Managed a team of 6 designers.",
    fullDesc:
      "At TechNova, I led a complete overhaul of our flagship enterprise product. We moved from a legacy monolithic frontend to a modern React-based micro-frontend architecture. My role involved not just UI/UX design, but also establishing the design system from scratch, conducting extensive user research, and mentoring junior designers. The result was a 40% increase in user retention and a 25% decrease in support tickets related to usability.",
    icon: Briefcase,
  },
  {
    type: "Work",
    role: "Senior Frontend Engineer",
    company: "CreativeGrit",
    date: "2019 - 2022",
    desc: "Architected a modular component library used across 12 products. Reduced bundle size by 35%.",
    fullDesc:
      "As the lead frontend engineer, I recognized the need for consistency across our product suite. I initiated and architected 'GritUI', a modular component library built with React and styled-components. This involved setting up the CI/CD pipeline for the package, writing comprehensive documentation using Storybook, and advocating for its adoption across 4 different engineering teams. It ultimately reduced our average bundle size by 35% and sped up new feature development by an estimated 20%.",
    icon: Code,
  },
  {
    type: "Talks",
    role: "Keynote Speaker",
    company: "Design Systems Conf",
    date: "Oct 2021",
    desc: "Delivered a talk on 'The Physics of UI: Motion as a Structural Element' to an audience of 500+.",
    fullDesc:
      "I was invited to give the opening keynote at the annual Design Systems Conference. My talk, 'The Physics of UI', explored how we can use animation not just for delight, but as a core structural element to communicate hierarchy, state changes, and spatial relationships within an interface. I shared practical examples using Framer Motion and discussed the psychological impact of well-crafted micro-interactions.",
    icon: Mic,
  },
  {
    type: "Education",
    role: "MSc Human-Computer Interaction",
    company: "Technical University",
    date: "2017 - 2019",
    desc: "Graduated with Honors. Thesis on tactile feedback in flat interfaces.",
    fullDesc:
      "My master's program focused heavily on the intersection of psychology and interface design. My thesis explored how we can simulate tactile feedback (like the feeling of pressing a physical button) in purely flat, digital interfaces using subtle visual cues and animation timings. This research heavily influences my current approach to Neo-Brutalist design, where I strive to make digital elements feel physical and grounded.",
    icon: GraduationCap,
  },
];

export function ProfileModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<
    (typeof timelineData)[0] | null
  >(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const [liveStatus, setLiveStatus] = useState({
    city: "California",
    reading: "AI + Web3 / Designing AI for Humans",
    workingOn: "Building homepage V2",
    synced: `LAST UPDATED: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
  });

  const [recentThoughts, setRecentThoughts] = useState([
    {
      text: "Just published a new article on why the 1px border is dying. Tonal layering is the future of depth in UI.",
      platform: "TWITTER",
      time: "2H AGO",
    },
    {
      text: "Framer Motion physics combined with Neo-Brutalism creates such a satisfying tactile experience.",
      platform: "LINKEDIN",
      time: "1D AGO",
    },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setLiveStatus((prev) => ({
        ...prev,
        synced: `LOCAL TIME: ${new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTimelineItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedTimelineItem]);

  return (
    <div className="flex flex-col gap-12" ref={containerRef}>
      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-ink/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-4"
          >
            <span className="font-headline font-bold text-sm hidden md:block">
              Available for new opportunities
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-white font-label text-[10px] uppercase tracking-widest font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2">
                <Download className="w-3 h-3" /> CV
              </button>
              <button className="px-4 py-2 bg-ink text-base font-label text-[10px] uppercase tracking-widest font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Book
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section className="premium-card w-full min-h-[85vh] flex flex-col items-center justify-center text-center p-8">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fm=webp&fit=crop"
            alt="Abstract Workspace"
            loading="lazy"
            className="w-full h-full object-cover opacity-40 dark:opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-base/10 via-base/50 to-base"></div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto mt-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative mb-8 group cursor-pointer"
          >
            {/* Custom Logo/Avatar (Geometric/Neo-brutalist) */}
            <div className="absolute -inset-6 opacity-60 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-green-700/30 fill-current animate-[spin_60s_linear_infinite]"
              >
                <polygon
                  points="100,10 190,100 100,190 10,100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
                <rect
                  x="50"
                  y="50"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
              </svg>
            </div>

            <div className="w-40 h-40 md:w-56 md:h-56 rounded-none overflow-hidden border-[6px] border-ink bg-base shadow-[12px_12px_0px_0px_currentColor] text-primary dark:border-base relative z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[20px_20px_0px_0px_currentColor]">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fm=webp&fit=crop"
                alt="Profile Logo"
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale contrast-150 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center font-headline font-black text-6xl text-ink bg-primary mix-blend-screen opacity-80">
                RB
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border-[3px] border-ink px-4 py-2 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-1">
              <span className="w-3 h-3 bg-green-500 border border-ink animate-pulse"></span>
              <div className="font-mono text-xs font-black uppercase tracking-widest text-ink overflow-hidden whitespace-nowrap border-r-2 border-ink animate-[typing_3s_steps(22)_infinite,blink_0.5s_step-end_infinite] w-[18ch]">
                Available for Projects
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-headline font-black text-ink mb-4 leading-[1.1] tracking-tight uppercase"
          >
            ROCKY BABCOCK DIGITAL MUSEUM
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl font-body font-semibold tracking-wide text-ink mb-2 max-w-2xl dark:text-base"
          >
            I build experimental web interfaces, AI-native workflows, and personal digital systems.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-base md:text-lg font-body text-ink/70 dark:text-base/70 mb-4 max-w-2xl"
          >
            This site is a living archive of my projects, tools, experiments, writing, and personal worlds.
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base font-mono text-ink max-w-2xl mb-12 font-bold tracking-tight bg-primary/20 inline-block px-4 py-2 border border-ink shadow-[4px_4px_0px_0px_currentColor]"
          >
            <Typewriter
              words={[
                "AI Builder • Creative Technologist • Interface Explorer",
                "Architecting Tactile Digital Exhibitions.",
                "Neo-Brutalist Systems Engineer.",
                "Explore Museum Exhibits // Build Laboratory Live.",
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              pauseTime={2500}
            />
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) {
                  const offset = 80;
                  const pos =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;
                  window.scrollTo({ top: pos, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-primary text-white border-[3px] border-ink font-mono text-xs uppercase tracking-widest font-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2 cursor-pointer"
            >
              Take Fast Route (Projects + CV)
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("directory");
                if (el) {
                  const offset = 80;
                  const pos =
                    el.getBoundingClientRect().top +
                    window.pageYOffset -
                    offset;
                  window.scrollTo({ top: pos, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-ink text-base border-[3px] border-ink font-mono text-xs uppercase tracking-widest font-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_currentColor] active:translate-y-0 active:shadow-[2px_2px_0px_0px_currentColor] transition-all flex items-center gap-2 cursor-pointer"
            >
              Explore Full Museum Map
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-6 mt-12 mb-8 bg-white/50 border-[3px] border-ink p-4 shadow-[6px_6px_0px_0px_currentColor]"
          >
            <a
              href="https://github.com/RockyBabcock"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink hover:text-primary transition-colors flex items-center gap-2 font-mono text-xs uppercase font-black tracking-widest group"
            >
              <svg
                className="w-6 h-6 group-hover:-translate-y-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
            <a
              href="#"
              className="text-ink hover:text-primary transition-colors flex items-center gap-2 font-mono text-xs uppercase font-black tracking-widest group border-l-[3px] border-ink pl-6"
            >
              <svg
                className="w-6 h-6 group-hover:-translate-y-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
              LinkedIn
            </a>
            <a
              href="#"
              className="text-ink hover:text-primary transition-colors flex items-center gap-2 font-mono text-xs uppercase font-black tracking-widest group border-l-[3px] border-ink pl-6"
            >
              <svg
                className="w-6 h-6 group-hover:-translate-y-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 12, 0] }}
            transition={{
              delay: 1.5,
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-black cursor-pointer"
            onClick={() =>
              window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: "smooth",
              })
            }
          >
            <span className="font-mono text-[10px] uppercase tracking-widest bg-ink text-base px-2 py-1 transform -skew-x-12">
              Scroll Explore
            </span>
            <div className="p-2 border-[3px] border-ink bg-primary text-ink shadow-[4px_4px_0px_0px_currentColor]">
              <ArrowDown className="w-6 h-6 stroke-[3]" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Personal Bio & Lifestyle */}
        <section className="col-span-12 md:col-span-7 premium-card !p-0 border-4 border-ink shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
          <div className="flex items-center gap-3 p-8 border-b-4 border-ink bg-primary">
            <Sparkles className="w-8 h-8 text-ink fill-ink" />
            <h2 className="text-4xl font-headline font-black uppercase text-ink tracking-tighter">
              The Origin Story.
            </h2>
          </div>

          <div className="prose prose-lg dark:prose-invert font-mono font-medium text-ink leading-relaxed p-8 bg-white/50">
            <p>
              My journey began at the intersection of graphic design and
              computer science. I realized early on that beautiful pixels mean
              nothing if they aren't backed by robust, scalable architecture.
            </p>
            <p>
              Over the past decade, I've transitioned from crafting editorial
              layouts to engineering complex web applications. This unique blend
              allows me to speak both the language of the designer and the
              developer, bridging the gap that often stalls product innovation.
            </p>
            <p className="bg-ink text-white p-4 font-bold">
              Today, I focus on{" "}
              <a
                href="#directory"
                className="text-primary hover:text-white underline decoration-2 underline-offset-4 decoration-primary transition-all"
              >
                Neo-Brutalist architecture
              </a>{" "}
              in web interfaces—rejecting the sterile, generic look of modern
              SaaS in favor of high-contrast, tactile experiences that feel
              human and intentional. Check out my thoughts on{" "}
              <a
                href="#directory"
                className="underline decoration-2 underline-offset-4 decoration-yellow-400 hover:text-yellow-400 transition-colors"
              >
                Tonal Layering
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-0 border-t-4 border-ink bg-ink">
            <div className="relative overflow-hidden group border-r-4 border-ink aspect-square bg-black">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fm=webp&fit=crop"
                loading="lazy"
                alt="Team collaboration"
                className="w-full h-full object-cover grayscale contrast-150 mix-blend-screen opacity-80 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
            <div className="relative overflow-hidden group aspect-square bg-black">
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fm=webp&fit=crop"
                loading="lazy"
                alt="Coding workspace"
                className="w-full h-full object-cover grayscale contrast-150 mix-blend-screen opacity-80 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-500 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="p-8 bg-white">
            <h3 className="font-mono text-sm uppercase font-black mb-6 flex items-center gap-2">
              <span className="w-3 h-3 bg-ink"></span> Core Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React / Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "UI/UX Design",
                "Design Systems",
                "Node.js",
                "GraphQL",
                "WebGL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white text-ink font-mono text-xs font-bold border-2 border-ink shadow-[2px_2px_0px_0px_currentColor] cursor-default hover:bg-primary hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Real-Time Status & Mini Feed */}
        <section className="col-span-12 md:col-span-5 flex flex-col gap-6">
          <div className="premium-card p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-label text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Live Status
              </h3>
              <span className="font-mono text-[10px] opacity-50 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                {liveStatus.synced}
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">
                    Current City
                  </p>
                  <p className="font-headline font-bold text-xl">
                    {liveStatus.city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">
                    Learning
                  </p>
                  <p className="font-headline font-bold text-xl">
                    {liveStatus.reading}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink">
                  <MonitorPlay className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">
                    Working On
                  </p>
                  <p className="font-headline font-bold text-xl">
                    {liveStatus.workingOn}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card p-8 flex-1">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-6">
              <MessageSquare className="w-4 h-4 text-primary" /> Recent Thoughts
            </h3>
            <div className="space-y-4">
              {recentThoughts.map((thought, i) => (
                <div
                  key={i}
                  className="p-4 bg-base rounded-lg border border-ink/5 hover:-translate-y-1 transition-transform cursor-pointer"
                >
                  <p className="font-body text-sm text-ink/80 mb-2">
                    {thought.text}
                  </p>
                  <span className="font-mono text-[10px] opacity-50">
                    {thought.platform} • {thought.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Things I'm Most Proud Of */}
        <section className="col-span-12 premium-card !bg-ink !text-base p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-10 text-center">
            Milestones of Impact.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "My First AI Project",
                stat: "100K+",
                sub: "Users Impacted",
                desc: "Built a generative UI tool that streamlined workflows for designers.",
                icon: Sparkles,
                linkText: "Live Demo",
                link: "#",
                linkIcon: MonitorPlay,
              },
              {
                title: "Social Impact Platform",
                stat: "$2M+",
                sub: "Funds Raised",
                desc: "Designed the core platform for a global non-profit initiative.",
                icon: Trophy,
                linkText: "Case Study",
                link: "#",
                linkIcon: BookOpen,
              },
              {
                title: "Awwwards Site of the Day",
                stat: "3x",
                sub: "Winner",
                desc: "Recognized for pushing the boundaries of web typography and motion.",
                icon: Layout,
                linkText: "View Source",
                link: "#",
                linkIcon: Code,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-base/10 flex flex-col items-center text-center group"
              >
                <div className="p-4 bg-base/10 rounded-full mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-base/60 text-sm mb-6">
                  {item.desc}
                </p>
                <div className="mt-auto pt-6 border-t border-base/10 w-full mb-6">
                  <span className="block text-4xl font-black font-headline text-primary mb-1">
                    {item.stat}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
                    {item.sub}
                  </span>
                </div>
                <a
                  href={item.link}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-base/10 hover:bg-primary hover:text-ink text-base rounded-xl font-mono text-xs uppercase font-bold tracking-widest transition-all"
                >
                  <item.linkIcon className="w-4 h-4" /> {item.linkText}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Timeline */}
        <section className="col-span-12 premium-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-headline font-black">
              The Journey.
            </h2>
            <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-lg overflow-x-auto max-w-full">
              {["All", "Work", "Education", "Talks"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 font-label text-xs uppercase tracking-widest rounded-md transition-all whitespace-nowrap",
                    activeFilter === filter
                      ? "bg-ink text-base shadow-md"
                      : "text-ink/60 hover:text-ink hover:bg-ink/5",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative border-l-2 border-ink/10 ml-4 md:ml-6 space-y-12">
            {timelineData
              .filter(
                (item) => activeFilter === "All" || item.type === activeFilter,
              )
              .map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 md:pl-12 group"
                >
                  <div className="absolute -left-[21px] top-1 w-10 h-10 bg-base border-2 border-ink/10 rounded-full flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors shadow-sm">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div
                    className="bg-white dark:bg-[#111] p-6 rounded-3xl border border-ink/5 group-hover:border-primary/30 transition-colors cursor-pointer hover:shadow-md"
                    onClick={() => setSelectedTimelineItem(item)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                      <div>
                        <h3 className="font-headline text-2xl font-bold">
                          {item.role}
                        </h3>
                        <p className="font-mono text-xs text-primary font-bold uppercase tracking-widest">
                          {item.company}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] opacity-50 bg-ink/5 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.date}
                      </span>
                    </div>
                    <p className="font-body text-ink/80">{item.desc}</p>

                    <div className="mt-4 pt-4 border-t border-ink/10 flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          <div className="mt-16 text-center p-8 bg-primary/5 rounded-3xl border border-primary/20">
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">
              Next Chapter
            </h3>
            <p className="font-body text-ink/80">
              Focusing on AI-driven interfaces and spatial computing design
              patterns.
            </p>
          </div>
        </section>
      </div>

      {/* Timeline Modal */}
      <AnimatePresence>
        {selectedTimelineItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base/80 backdrop-blur-sm"
            onClick={() => setSelectedTimelineItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-base w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-ink/10 flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 md:p-8 border-b border-ink/10 flex justify-between items-start bg-transparent">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-black/5 dark:bg-white/5 rounded-3xl text-primary">
                    <selectedTimelineItem.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-headline text-3xl font-black mb-1">
                      {selectedTimelineItem.role}
                    </h2>
                    <p className="font-mono text-sm text-primary font-bold uppercase tracking-widest">
                      {selectedTimelineItem.company}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTimelineItem(null)}
                  className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-4 h-4 opacity-50" />
                  <span className="font-mono text-xs opacity-70">
                    {selectedTimelineItem.date}
                  </span>
                  <span className="mx-2 opacity-30">•</span>
                  <span className="font-label text-[10px] uppercase tracking-widest bg-ink/5 px-2 py-1 rounded-md">
                    {selectedTimelineItem.type}
                  </span>
                </div>

                <div className="prose prose-lg dark:prose-invert font-body text-ink/80">
                  <p className="text-xl font-medium leading-relaxed mb-6 text-ink">
                    {selectedTimelineItem.desc}
                  </p>
                  <div className="h-px w-full bg-ink/10 my-6"></div>
                  <p className="leading-relaxed">
                    {selectedTimelineItem.fullDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-transparent border-t border-ink/10 flex justify-end">
                <button
                  onClick={() => setSelectedTimelineItem(null)}
                  className="px-6 py-3 bg-ink text-base font-label text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-ink/90 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
