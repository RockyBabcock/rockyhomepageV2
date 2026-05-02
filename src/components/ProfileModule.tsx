import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Download, ArrowUpRight, Calendar, Activity, MapPin, BookOpen, MonitorPlay, Trophy, Code, Briefcase, GraduationCap, Mic, MessageSquare, Sparkles, Layout, X, ArrowDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../lib/utils";
import { Typewriter } from "./Typewriter";

const timelineData = [
  { type: 'Work', role: "Lead Product Designer", company: "TechNova", date: "2022 - Present", desc: "Spearheaded the redesign of the core enterprise platform, increasing user retention by 40%. Managed a team of 6 designers.", fullDesc: "At TechNova, I led a complete overhaul of our flagship enterprise product. We moved from a legacy monolithic frontend to a modern React-based micro-frontend architecture. My role involved not just UI/UX design, but also establishing the design system from scratch, conducting extensive user research, and mentoring junior designers. The result was a 40% increase in user retention and a 25% decrease in support tickets related to usability.", icon: Briefcase },
  { type: 'Work', role: "Senior Frontend Engineer", company: "CreativeGrit", date: "2019 - 2022", desc: "Architected a modular component library used across 12 products. Reduced bundle size by 35%.", fullDesc: "As the lead frontend engineer, I recognized the need for consistency across our product suite. I initiated and architected 'GritUI', a modular component library built with React and styled-components. This involved setting up the CI/CD pipeline for the package, writing comprehensive documentation using Storybook, and advocating for its adoption across 4 different engineering teams. It ultimately reduced our average bundle size by 35% and sped up new feature development by an estimated 20%.", icon: Code },
  { type: 'Talks', role: "Keynote Speaker", company: "Design Systems Conf", date: "Oct 2021", desc: "Delivered a talk on 'The Physics of UI: Motion as a Structural Element' to an audience of 500+.", fullDesc: "I was invited to give the opening keynote at the annual Design Systems Conference. My talk, 'The Physics of UI', explored how we can use animation not just for delight, but as a core structural element to communicate hierarchy, state changes, and spatial relationships within an interface. I shared practical examples using Framer Motion and discussed the psychological impact of well-crafted micro-interactions.", icon: Mic },
  { type: 'Education', role: "MSc Human-Computer Interaction", company: "Technical University", date: "2017 - 2019", desc: "Graduated with Honors. Thesis on tactile feedback in flat interfaces.", fullDesc: "My master's program focused heavily on the intersection of psychology and interface design. My thesis explored how we can simulate tactile feedback (like the feeling of pressing a physical button) in purely flat, digital interfaces using subtle visual cues and animation timings. This research heavily influences my current approach to Neo-Brutalist design, where I strive to make digital elements feel physical and grounded.", icon: GraduationCap }
];

export function ProfileModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTimelineItem, setSelectedTimelineItem] = useState<typeof timelineData[0] | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const [liveStatus, setLiveStatus] = useState({
    city: "California",
    reading: "AI + Web3 / Designing AI for Humans",
    workingOn: "Building homepage V2",
    synced: `LAST UPDATED: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
  });

  const [recentThoughts, setRecentThoughts] = useState([
    { text: "Just published a new article on why the 1px border is dying. Tonal layering is the future of depth in UI.", platform: "TWITTER", time: "2H AGO" },
    { text: "Framer Motion physics combined with Neo-Brutalism creates such a satisfying tactile experience.", platform: "LINKEDIN", time: "1D AGO" }
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

  // Removed continuous fake synced update
  useEffect(() => {
    setLiveStatus(prev => ({
      ...prev,
      synced: `LAST UPDATED: ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}`
    }));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedTimelineItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
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
            <span className="font-headline font-bold text-sm hidden md:block">Available for new opportunities</span>
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
      <motion.section 
        className="premium-card w-full min-h-[85vh] flex flex-col items-center justify-center text-center p-8"
      >
        <motion.div 
          style={{ y, opacity }}
          className="absolute inset-0 z-0"
        >
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
            {/* Floral Elements */}
            <div className="absolute -inset-6 opacity-60 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
              <svg viewBox="0 0 200 200" className="w-full h-full text-green-700/30 fill-current animate-[spin_60s_linear_infinite]">
                <path d="M100,10 C120,40 160,40 190,100 C160,160 120,160 100,190 C80,160 40,160 10,100 C40,40 80,40 100,10 Z" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                <path d="M50,50 Q70,30 100,50 T150,50" fill="none" stroke="currentColor" strokeWidth="4" />
                <path d="M50,150 Q70,170 100,150 T150,150" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden border-4 border-ink shadow-[8px_8px_0px_0px_currentColor] text-primary dark:border-base relative z-10 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[16px_16px_0px_0px_currentColor]">
              <img 
                src="https://images.unsplash.com/photo-1654573817889-296cad084c97?q=80&w=800&auto=format&fm=webp&fit=crop" 
                alt="Profile" 
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-ink/10 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg z-20 whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-1">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink">Available for Projects</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-artnouveau text-[#2E4F3B] mb-4 leading-[1.1] tracking-normal"
          >
            rocky babcock
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl font-body text-ink/70 max-w-2xl mb-12"
          >
            <Typewriter 
              words={[
                "Creative Technologist & Product Innovator.",
                "Design Systems Architect.",
                "Neo-Brutalist Engineer.",
                "AI Builder & Web3 Expert."
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
            <button className="px-8 py-4 bg-primary text-white font-label text-xs uppercase tracking-widest font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(159,64,45,0.2)] flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Latest CV
            </button>
            <button className="px-8 py-4 bg-ink text-base font-label text-xs uppercase tracking-widest font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2">
              <Layout className="w-4 h-4" /> View Full Portfolio
            </button>
            <button className="px-8 py-4 bg-black/5 dark:bg-white/5 text-ink border border-ink/10 font-label text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book a Call
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="font-label text-[10px] uppercase tracking-widest opacity-40 font-bold">Scroll to Explore</span>
            <ArrowDown className="w-4 h-4 opacity-40" />
          </motion.div>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Personal Bio & Lifestyle */}
        <section className="col-span-12 md:col-span-7 premium-card p-8 md:p-12 flex flex-col gap-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-headline font-black">The Origin Story.</h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert font-body text-ink/80 leading-relaxed">
            <p>
              My journey began at the intersection of graphic design and computer science. I realized early on that beautiful pixels mean nothing if they aren't backed by robust, scalable architecture.
            </p>
            <p>
              Over the past decade, I've transitioned from crafting editorial layouts to engineering complex web applications. This unique blend allows me to speak both the language of the designer and the developer, bridging the gap that often stalls product innovation.
            </p>
            <p>
              Today, I focus on Neo-Brutalist architecture in web interfaces—rejecting the sterile, generic look of modern SaaS in favor of high-contrast, tactile experiences that feel human and intentional.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fm=webp&fit=crop" loading="lazy" alt="Team collaboration" className="rounded-3xl aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
            <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fm=webp&fit=crop" loading="lazy" alt="Coding workspace" className="rounded-3xl aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-500" referrerPolicy="no-referrer" />
          </div>

          <div className="mt-8">
            <h3 className="font-label text-xs uppercase tracking-[0.2em] font-bold mb-6 text-ink/60">Core Capabilities</h3>
            <div className="flex flex-wrap gap-3">
              {['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design', 'Design Systems', 'Node.js', 'GraphQL', 'WebGL'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-black/5 dark:bg-white/5 text-ink font-mono text-xs rounded-full border border-ink/5 hover:border-primary/50 hover:text-primary transition-colors cursor-default">
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
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink"><MapPin className="w-5 h-5" /></div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Current City</p>
                  <p className="font-headline font-bold text-xl">{liveStatus.city}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink"><BookOpen className="w-5 h-5" /></div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Learning</p>
                  <p className="font-headline font-bold text-xl">{liveStatus.reading}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-lg text-ink"><MonitorPlay className="w-5 h-5" /></div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Working On</p>
                  <p className="font-headline font-bold text-xl">{liveStatus.workingOn}</p>
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
                <div key={i} className="p-4 bg-base rounded-lg border border-ink/5 hover:-translate-y-1 transition-transform cursor-pointer">
                  <p className="font-body text-sm text-ink/80 mb-2">{thought.text}</p>
                  <span className="font-mono text-[10px] opacity-50">{thought.platform} • {thought.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three Things I'm Most Proud Of */}
        <section className="col-span-12 premium-card !bg-ink !text-base p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-headline font-black mb-10 text-center">Milestones of Impact.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "My First AI Project", stat: "100K+", sub: "Users Impacted", desc: "Built a generative UI tool that streamlined workflows for designers.", icon: Sparkles },
              { title: "Social Impact Platform", stat: "$2M+", sub: "Funds Raised", desc: "Designed the core platform for a global non-profit initiative.", icon: Trophy },
              { title: "Awwwards Site of the Day", stat: "3x", sub: "Winner", desc: "Recognized for pushing the boundaries of web typography and motion.", icon: Layout }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-black/5 dark:bg-white/5 p-8 rounded-3xl border border-base/10 flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="p-4 bg-base/10 rounded-full mb-6 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="font-headline text-2xl font-bold mb-2">{item.title}</h3>
                <p className="font-body text-base/60 text-sm mb-6">{item.desc}</p>
                <div className="mt-auto pt-6 border-t border-base/10 w-full">
                  <span className="block text-4xl font-black font-headline text-primary mb-1">{item.stat}</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">{item.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Career Timeline */}
        <section className="col-span-12 premium-card p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <h2 className="text-3xl md:text-4xl font-headline font-black">The Journey.</h2>
            <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-lg overflow-x-auto max-w-full">
              {['All', 'Work', 'Education', 'Talks'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "px-4 py-2 font-label text-xs uppercase tracking-widest rounded-md transition-all whitespace-nowrap",
                    activeFilter === filter ? "bg-ink text-base shadow-md" : "text-ink/60 hover:text-ink hover:bg-ink/5"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative border-l-2 border-ink/10 ml-4 md:ml-6 space-y-12">
            {timelineData.filter(item => activeFilter === 'All' || item.type === activeFilter).map((item, i) => (
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
                      <h3 className="font-headline text-2xl font-bold">{item.role}</h3>
                      <p className="font-mono text-xs text-primary font-bold uppercase tracking-widest">{item.company}</p>
                    </div>
                    <span className="font-mono text-[10px] opacity-50 bg-ink/5 px-3 py-1 rounded-full whitespace-nowrap">{item.date}</span>
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
            <h3 className="font-headline text-2xl font-bold text-primary mb-2">Next Chapter</h3>
            <p className="font-body text-ink/80">Focusing on AI-driven interfaces and spatial computing design patterns.</p>
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
                    <h2 className="font-headline text-3xl font-black mb-1">{selectedTimelineItem.role}</h2>
                    <p className="font-mono text-sm text-primary font-bold uppercase tracking-widest">{selectedTimelineItem.company}</p>
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
                  <span className="font-mono text-xs opacity-70">{selectedTimelineItem.date}</span>
                  <span className="mx-2 opacity-30">•</span>
                  <span className="font-label text-[10px] uppercase tracking-widest bg-ink/5 px-2 py-1 rounded-md">{selectedTimelineItem.type}</span>
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

