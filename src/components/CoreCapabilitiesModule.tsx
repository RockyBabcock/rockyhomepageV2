import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation, useInView, useScroll, useTransform } from "motion/react";
import { techStackData, TechItem, categoryColors } from "../data/techStack";
import { cn } from "../lib/utils";
import { ExternalLink, Github } from "lucide-react";
import { Lightbox } from './Lightbox';

const DOMAIN_CONFIG: Record<string, { title: string; count: number }> = {
  frontend: { title: "FRONTEND", count: 5 },
  backend: { title: "BACKEND", count: 5 },
  devops: { title: "DEVOPS", count: 5 },
  design: { title: "DESIGN", count: 5 },
  ai: { title: "AI/ML", count: 5 },
  web3: { title: "WEB3", count: 5 },
  creative: { title: "CREATIVE", count: 5 },
  audio: { title: "AUDIO", count: 4 },
  hardware: { title: "HARDWARE", count: 4 },
  language: { title: "LANGUAGE", count: 4 },
  spatial: { title: "SPATIAL", count: 4 },
  tooling: { title: "TOOLING", count: 4 },
};

const domains = Object.keys(DOMAIN_CONFIG);

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E`;

/* Thermometer Proficiency Bar */
const ThermometerBar = ({ proficiency, level, pColor, isHovered }: { proficiency: number, level: string, pColor: string, isHovered?: boolean }) => {
  const segments = 20;
  const activeSegments = Math.round((proficiency / 100) * segments);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  
  const [displayProficiency, setDisplayProficiency] = useState(0);

  useEffect(() => {
    if (inView) {
      controls.start(i => ({
        backgroundColor: i < activeSegments ? pColor : '#292524',
        transition: { delay: i * 0.04, duration: 0.1 }
      }));
      
      const duration = segments * 0.04 * 1000 + 400; // Roughly match segment reveal
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease out
        setDisplayProficiency(Math.floor(eased * proficiency));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, activeSegments, controls, pColor, proficiency]);

  return (
    <div className="flex items-center gap-3 w-full group/thermo" ref={ref}>
      <div className={cn("flex-1 h-[12px] bg-[#1a1714] border border-[#292524] p-[2px] relative overflow-hidden thermometer-fill items-center", isHovered ? "hovered" : "")} style={{ transform: 'skewX(-15deg)' }}>
         <motion.div
           className="h-full relative overflow-hidden"
           initial={{ width: '0%' }}
           animate={inView ? { width: `${displayProficiency}%` } : { width: '0%' }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           style={{
             background: `linear-gradient(90deg, transparent, ${pColor}80, ${pColor}, ${pColor}80, transparent)`,
             backgroundSize: '200% 100%',
             filter: `drop-shadow(0 0 8px ${pColor}40)`,
             animation: 'scanline-drift 3s linear infinite'
           }}
         >
           {/* Terminal glowing edge */}
           <div className="absolute right-0 top-0 h-full w-[2px] bg-white shadow-[0_0_8px_white]" />
         </motion.div>
      </div>
      <div className="flex items-center gap-2 shrink-0 h-[12px]">
        <span className="font-mono font-bold text-[14px] leading-none tracking-[-1px]" style={{ color: pColor }}>
          {displayProficiency}%
        </span>
        <div className="flex items-center gap-1 font-mono text-[10px] uppercase ml-1 leading-none">
          <span style={{ color: '#00ff88' }} className="animate-pulse">●</span>
          <span style={{ color: '#00ff88' }}>SYS</span>
          <span className="text-[#a8a29e] ml-1">{level}</span>
        </div>
      </div>
    </div>
  );
};

import { siReact, siDocker, siNodedotjs, siTypescript, siThreedotjs, siFramer, siGraphql, siTensorflow, siSolidity, siFigma, siTailwindcss, siNextdotjs, siKubernetes, siTerraform, siStorybook, siPytorch, siIpfs, siArduino, siRaspberrypi, siUnity } from 'simple-icons/icons';

const TechSigil = ({ name, isHovered, colorPair }: { name: string, isHovered?: boolean, colorPair?: any }) => {
  const activeColor = isHovered ? colorPair?.pri || '#ff5722' : '#57534e';
  const dropShadow = isHovered ? `0 0 10px ${colorPair?.pri || '#ff5722'}` : 'none';
  
  let path = '';
  if (/react/i.test(name)) path = siReact.path;
  else if (/docker/i.test(name)) path = siDocker.path;
  else if (/node/i.test(name)) path = siNodedotjs.path;
  else if (/type/i.test(name)) path = siTypescript.path;
  else if (/three/i.test(name)) path = siThreedotjs.path;
  else if (/motion/i.test(name) || /framer/i.test(name)) path = siFramer.path;
  else if (/graph/i.test(name)) path = siGraphql.path;
  else if (/tensor/i.test(name)) path = siTensorflow.path;
  else if (/solid/i.test(name)) path = siSolidity.path;
  else if (/(figma|design)/i.test(name)) path = siFigma.path;
  else if (/tailwind/i.test(name)) path = siTailwindcss.path;
  else if (/next/i.test(name)) path = siNextdotjs.path;
  else if (/kube/i.test(name)) path = siKubernetes.path;
  else if (/aws|gcp/i.test(name)) path = siDocker.path; // fallback
  else if (/terra/i.test(name)) path = siTerraform.path;
  else if (/adobe/i.test(name)) path = '';
  else if (/story/i.test(name)) path = siStorybook.path;
  else if (/pytorch/i.test(name)) path = siPytorch.path;
  else if (/openai/i.test(name)) path = '';
  else if (/ipfs/i.test(name)) path = siIpfs.path;
  else if (/arduino/i.test(name)) path = siArduino.path;
  else if (/rasp/i.test(name)) path = siRaspberrypi.path;
  else if (/unity/i.test(name)) path = siUnity.path;
  else path = ''; // fallback
  
  let content = <span style={{ color: activeColor, textShadow: dropShadow }} className={cn("transition-all duration-300 font-bold", isHovered && "animate-pulse")}>{name.substring(0, 2).toUpperCase()}</span>;
  if (path) {
     content = <svg viewBox="0 0 24 24" fill="none" stroke={activeColor} strokeWidth={isHovered ? "1.5" : "1"} className={cn("w-6 h-6 transition-all duration-300", isHovered ? "drop-shadow-[0_0_8px_currentColor]" : "opacity-50")}><path d={path} /></svg>;
  }

  return (
    <div 
       className="w-10 h-10 flex items-center justify-center text-[20px] font-mono leading-none tracking-tighter bg-transparent shrink-0 transition-all duration-500 relative overflow-hidden"
       style={{ 
         border: `1px solid ${isHovered ? `${colorPair?.pri}80` : '#292524'}`,
       }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent transition-opacity duration-300 opacity-0" style={{ opacity: isHovered ? 1 : 0, backgroundColor: colorPair?.pri }} />
      <div className="relative z-10">{content}</div>
    </div>
  );
};

export const TechMetricsPanel = ({ tool, colorPair }: { tool: TechItem, colorPair: any }) => {
  const [logs, setLogs] = useState<string[]>([
    "[14:02:11] DEPLOYMENT VERIFIED",
    "[14:03:52] CACHE REBUILT",
    "[14:05:04] NODE SYNC COMPLETE",
    "[14:06:18] TELEMETRY RECALIBRATED"
  ]);

  useEffect(() => {
    const events = [
      "SYSTEM_OK", "SYNCING_ASSETS...", "0xAF42_CONNECTED",
      "VRAM_ALLOC_OPT...", "PACKET_RECEIVED", "INTEGRITY_CHECK: PASS",
      "HANDSHAKE_ESTABLISHED", "EVALUATING_HEURISTICS", "PORT_SCAN_COMPLETE",
      "AUTH_TOKEN_RENEWED", "PULSE_NOMINAL", "AWAITING_INPUT",
      "CORE_TEMP_NOMINAL", "BYTES_TRANSFERRED", "REDUNDANCY_CHECK: OK"
    ];

    let intervalId: ReturnType<typeof setTimeout>;
    
    const generateLog = () => {
      const time = new Date();
      const timeStr = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}`;
      const event = events[Math.floor(Math.random() * events.length)];
      
      setLogs(prev => {
        const next = [...prev, `[${timeStr}] ${event}`];
        return next.length > 8 ? next.slice(next.length - 8) : next; // Keep last 8 logs
      });
      
      intervalId = setTimeout(generateLog, 800 + Math.random() * 2000);
    };
    
    generateLog();
    return () => clearTimeout(intervalId);
  }, []);

  // Frequency based on tool complexity (level) and Mastery (proficiency)
  const masteryRatio = tool.proficiency / 100;
  // High Mastery = Dense, stable waves. Low Mastery = Faster, erratic pulses.
  const waveDurationBase = 0.3 + (masteryRatio * 1.5); // high mastery -> longer duration -> slower/stable
  const heightVariance = masteryRatio > 0.8 ? 20 : 60; // high mastery -> stable max height
  
  const pulseLabel = tool.level === 'expert' ? 'HIGH FREQUENCY' : tool.level === 'advanced' ? 'MED FREQUENCY' : 'LOW FREQUENCY';
  // number of waves: more dense logic
  const waveCount = Math.floor(20 + (masteryRatio * 30)); // 20 to 50 nodes

  // Ecosystem Mapping
  const ecosystemAssociations: Record<string, string[]> = {
    'React': ['Vite', 'Redux', 'Next.js', 'React Router'],
    'TypeScript': ['tRPC', 'Zod', 'Prisma', 'ESLint'],
    'Tailwind CSS': ['PostCSS', 'Radix UI', 'shadcn/ui', 'Framer Motion'],
  };
  const ecosystemNodes = ecosystemAssociations[tool.name] || ['Core', 'Plugins', 'Extensions', 'Community'];

  return (
    <div className="flex flex-col h-full gap-4 w-full">
       {/* Top: Tech Activity Pulse Wave */}
       <div className="h-[90px] shrink-0 border-[0.5px] border-[#06b6d433] rounded-[2px] relative p-3 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#031014] to-transparent">
          <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20" style={{ backgroundImage: `radial-gradient(circle at top right, ${colorPair.pri}, transparent)` }} />
          <div className="absolute top-2 left-2 text-[#0891b2] text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
             <span className="w-1 h-1 bg-[#06b6d4] animate-pulse" /> DATA_PULSE: {pulseLabel}
          </div>
          
          {/* Drifting signal points */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
             <div className="absolute top-[40%] h-[1px] w-4 bg-[#06b6d4] animate-[packet-drift_3s_linear_infinite]" />
             <div className="absolute top-[60%] h-[1px] w-2 bg-[#06b6d4] animate-[packet-drift_5s_linear_infinite]" />
          </div>

          <div className="w-full h-full flex items-end justify-between gap-[1px] opacity-40 pt-4 px-1">
             {Array.from({ length: waveCount }).map((_, i) => (
                <motion.div 
                   key={i} 
                   className="w-full rounded-t-[1px]" 
                   style={{ backgroundColor: colorPair.pri }}
                   animate={{ height: [`${10 + Math.random() * 10}%`, `${30 + Math.random() * heightVariance}%`, `${10 + Math.random() * 10}%`] }}
                   transition={{ duration: waveDurationBase * (0.5 + Math.random()), repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                />
             ))}
          </div>
       </div>

       {/* Middle: Ecosystem Dependency Map */}
       <div className="flex-1 bg-[#031014] border-[0.5px] border-[#06b6d433] rounded-[2px] relative p-4 flex flex-col justify-center items-center overflow-hidden min-h-[160px]">
          <div className="absolute top-2 left-2 text-[#0891b2] text-[10px] font-mono tracking-widest uppercase">ECOSYSTEM_MAP</div>
          
          {/* Subtle machine marks */}
          <div className="absolute top-2 right-2 text-[#164e63] text-[8px] font-mono">GRID: ON</div>
          <div className="absolute bottom-2 left-2 text-[#164e63] text-[8px] font-mono">REF: {(Math.random() * 1000).toFixed(2)}</div>
          
          <div className="relative w-full h-[150px] flex items-center justify-center mt-4">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
               className="absolute w-[200px] h-[200px] origin-center flex items-center justify-center"
             >
                {/* SVG Constellation Lines */}
                <svg className="absolute w-full h-full pointer-events-none opacity-20" overflow="visible">
                   <line x1="50%" y1="50%" x2="15%" y2="30%" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="2,2" />
                   <line x1="50%" y1="50%" x2="85%" y2="25%" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="2,2" />
                   <line x1="50%" y1="50%" x2="75%" y2="85%" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="2,2" />
                   <line x1="50%" y1="50%" x2="25%" y2="75%" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="2,2" />
                   <circle cx="50%" cy="50%" r="40%" fill="none" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="2,4" opacity="0.3" />
                   <circle cx="50%" cy="50%" r="60%" fill="none" stroke={colorPair.pri} strokeWidth="0.5" strokeDasharray="1,6" opacity="0.1" />
                </svg>
                {/* Orbital Nodes */}
                <div className="absolute top-[30%] left-[15%] flex flex-col items-center">
                  <div className="w-[4px] h-[4px] rounded-full bg-white opacity-80 mb-1" style={{ boxShadow: `0 0 10px ${colorPair.pri}` }} />
                  <span className="text-[7px] text-[#06b6d4] font-mono select-none" style={{ transform: 'rotate(-45deg)'}}>{ecosystemNodes[0]}</span>
                </div>
                <div className="absolute top-[25%] left-[85%] flex flex-col items-center">
                  <div className="w-[3px] h-[3px] rounded-full bg-white opacity-80 mb-1" style={{ boxShadow: `0 0 10px ${colorPair.pri}` }} />
                  <span className="text-[7px] text-[#06b6d4] font-mono select-none pointer-events-none" style={{ transform: 'rotate(45deg)'}}>{ecosystemNodes[1]}</span>
                </div>
                <div className="absolute top-[85%] left-[75%] flex flex-col items-center">
                  <div className="w-[5px] h-[5px] rounded-full bg-white opacity-80 mb-1" style={{ boxShadow: `0 0 10px ${colorPair.pri}` }} />
                  <span className="text-[7px] text-[#06b6d4] font-mono select-none pointer-events-none" style={{ transform: 'rotate(-135deg)'}}>{ecosystemNodes[2]}</span>
                </div>
                <div className="absolute top-[75%] left-[25%] flex flex-col items-center">
                  <div className="w-[2px] h-[2px] rounded-full bg-white opacity-80 mb-1" style={{ boxShadow: `0 0 10px ${colorPair.pri}` }} />
                  <span className="text-[7px] text-[#06b6d4] font-mono select-none pointer-events-none" style={{ transform: 'rotate(135deg)'}}>{ecosystemNodes[3]}</span>
                </div>
             </motion.div>
             
             {/* Center Node */}
             <div className="relative z-10 w-12 h-12 rounded-[2px] border-[0.5px] border-[#06b6d480] bg-[#031014] flex flex-col items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md">
                 <div className="absolute inset-0 border border-dashed border-[#06b6d433] animate-[spin_8s_linear_infinite]" />
                 <TechSigil name={tool.name} isHovered={true} colorPair={{ pri: '#06b6d4', sec: '#0891b2'}} />
             </div>
          </div>
       </div>

       {/* Bottom: SYSTEM EVENTS */}
       <div className="h-[140px] shrink-0 border-[0.5px] border-[#06b6d433] rounded-[2px] relative p-3 flex flex-col pt-8 overflow-hidden bg-gradient-to-t from-[#031014] to-transparent">
          <div className="absolute top-2 left-2 text-[#0891b2] text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full animate-pulse shadow-[0_0_5px_#06b6d4]" />
             [SYSTEM EVENTS]
          </div>
          
          <div className="absolute right-2 top-2 text-[#164e63] text-[8px] font-mono animate-pulse">REC_ACTIVE</div>           <div className="flex flex-col font-mono text-[9px] text-[#22d3ee] opacity-70 tracking-tighter leading-[1.6] mt-2 relative h-full">
             {/* Overlay for top/bottom fade */}
             <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#031014] via-transparent to-[#031014]" />
             <div className="flex flex-col justify-end overflow-hidden h-full">
               <AnimatePresence>
                 {logs.map((evt, i) => (
                    <motion.div
                      key={evt + i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="whitespace-nowrap flex gap-3 hover:text-white transition-colors cursor-default"
                    >
                      <span className="opacity-50 text-[8px]">0x{(i * Math.random()).toString(16).padEnd(4, '0').substring(0,4)}</span>
                      <span>{evt}</span>
                    </motion.div>
                 ))}
               </AnimatePresence>
             </div>
          </div>
       </div>
    </div>
  );
};

const TerminalBootSequence = ({ tool, colorPair, onCollapse }: { tool: TechItem, colorPair: any, onCollapse: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  const isDocker = /docker/i.test(tool.name);
  const isDevOps = tool.category === 'devops';
  
  const statusLabels = isDocker ? [
    "> Node integrity checks    [SECURED]",
    "> Layer cache check        [OPTIMIZED]",
    "> Swarm manager status     [OPERATIONAL]"
  ] : tool.projects.map((p, i) => `> ${p.name.padEnd(20)} [${i === 0 ? 'DEPLOYED' : i === 1 ? 'BETA' : 'ACTIVE'}]`);

  const capLabels = isDocker ? [
    "> IMAGE LAYER OPT    [LOCKED]",
    "> PERSISTENT STORAGE [READY]",
    "> NETWORK ISOLATION  [DEPLOYED]"
  ] : [
    "> ARCHITECTURE       [LOCKED]",
    "> PERFORMANCE        [OPTIMIZED]",
    "> SCALABILITY        [HIGH]"
  ];

  const fullText = `> INIT_DRILLDOWN: [${tool.name.toUpperCase()}]
> FETCHING PRODUCTION HISTORY...

${isDocker ? '[DOCKER STATUS PROFILE]' : '[SYSTEM LOGS]'}
${statusLabels.join('\n')}

${isDocker ? '[KEY CAPABILITIES PROFILE]' : '[CAPABILITY MANIFEST]'}
${capLabels.join('\n')}

[ACCESS PERMISSIONS]
> ${tool.level === 'expert' ? 'LEVEL 5 CLEARANCE GRANTED' : 'LEVEL 3 CLEARANCE GRANTED'}

> DOSSIER COMPLETE. 112ms.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [fullText]);

  const renderFormattedText = () => {
    return displayedText.split('\n').map((line, idx) => {
      let colorClass = "text-[#d6d3d1]";
      if (line.startsWith('[')) colorClass = "font-bold text-[" + colorPair.pri + "]";
      else if (line.startsWith('>')) colorClass = "text-[#57534e]";
      return <div key={idx} className={colorClass} style={{ color: line.startsWith('[') ? colorPair.pri : undefined, minHeight: '1.2em' }}>{line}</div>;
    });
  };

  return (
    <div className="border border-[#292524] bg-[#1a1714] p-4 text-[11px] font-mono relative overflow-hidden flex-1 h-full pl-6">
      <div className="absolute top-4 left-2 w-1.5 h-1.5 rounded-full bg-[#00ff88] drop-shadow-[0_0_4px_#00ff88] animate-[pulse_2s_infinite]" />
      {renderFormattedText()}
      {isTyping && <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="inline-block w-[8px] h-[14px] bg-[#fafaf9] ml-1 align-middle mt-1" />}
      {!isTyping && <div className="inline-block w-[8px] h-[14px] bg-[#fafaf9] ml-1 align-middle mt-1" />}
    </div>
  );
};

const SpecimenCard: React.FC<{ tool: TechItem; onHoverChange?: (hovered: boolean) => void; isExpandedOverride?: boolean; onExpand?: () => void }> = ({ tool }) => {
  const colorPair = categoryColors[tool.category] || { pri: '#B08A52', sec: '#D98F5A' };
  
  // Synthesized metadata for the deeper display
  const metadata = {
    experience: Math.floor(Math.random() * 5) + 1 + " years operational",
    lastDeployed: "2026.05." + String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'),
    ecosystemSize: Math.floor(Math.random() * 20) + 5 + " direct deps",
  };

  return (
    <div className="flex flex-col relative w-full h-full overflow-y-auto custom-scrollbar bg-[#05070a] text-[#e5e7eb] border-r-[0.5px] border-b-[0.5px] border-[#ffffff1a]" style={{ boxShadow: `inset 0 0 80px rgba(0,0,0,0.8)` }}>
      
      {/* Background Grid Pattern (Atmospheric) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #fff 19px, #fff 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #fff 19px, #fff 20px)`, backgroundSize: '20px 20px' }} />
      {/* Radial Bloom Behind Content */}
      <div className="absolute top-[20%] left-[50%] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-[0.08] mix-blend-screen" style={{ background: `radial-gradient(circle, ${colorPair.pri} 0%, transparent 70%)` }} />
      {/* Giant Background Mastery Metric Watermark */}
      <div className="absolute top-[30px] right-2 font-digital text-[200px] font-black pointer-events-none leading-none opacity-[0.02]" style={{ color: colorPair.pri }}>
         {tool.proficiency}
      </div>

      {/* HEADER STRIP */}
      <div className="flex flex-col border-b-[0.5px] border-[#ffffff1a] bg-[#0a0f19]/80 relative pb-4 backdrop-blur-md">
         {/* Accents */}
         <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: colorPair.pri, boxShadow: `0 0 10px ${colorPair.pri}80` }} />
         <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-white opacity-80 shadow-[0_0_8px_white]" />
         
         <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 w-full">
            <div className="flex items-center gap-6">
               {/* Icon with Rotating Ring */}
               <div className="relative w-16 h-16 flex items-center justify-center bg-[#0a0f19] border border-[#ffffff1a] shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]">
                  <div className="absolute inset-[2px] rounded-full border border-dashed border-[#ffffff33] animate-[spin_8s_linear_infinite]" style={{ borderTopColor: colorPair.pri }} />
                  <TechSigil name={tool.name} isHovered={true} colorPair={colorPair} />
               </div>
               <div className="flex flex-col">
                  <h4 className="font-space font-black text-[32px] md:text-[48px] tracking-tighter leading-none" style={{ color: colorPair.pri, textShadow: `0 0 20px ${colorPair.pri}4d` }}>
                    <span className="typewriter-text" style={{ borderColor: 'transparent' }}>{tool.name.toUpperCase()}</span>
                  </h4>
                  <div className="flex items-center gap-3 mt-2 font-mono text-[10px] md:text-[11px] text-[#9ca3af] uppercase tracking-widest">
                     <span className="bg-[#1f2937]/50 px-2 py-0.5 border-[0.5px] border-[#ffffff1a]">{tool.version || 'v1.0.0'}</span>
                     <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_5px]" style={{ backgroundColor: tool.level === 'expert' ? '#00ff88' : '#f59e0b', color: tool.level === 'expert' ? '#00ff88' : '#f59e0b' }}/> {tool.operationalStatus || 'ACTIVE'}</span>
                  </div>
               </div>
            </div>
            
            {/* Quick Metrics */}
            <div className="hidden lg:flex gap-8 font-mono text-[10px] uppercase h-full items-end">
               <div className="flex flex-col text-right justify-end mb-1">
                  <span className="text-[#6b7280]">Adoption</span>
                  <span className="text-white font-bold tracking-widest">{tool.adoption || 'WIDESPREAD'}</span>
               </div>
               <div className="flex flex-col text-right justify-end mb-1">
                  <span className="text-[#6b7280]">Stability</span>
                  <span className="text-white font-bold tracking-widest">{tool.deploymentConfidence || '99.9%'}</span>
               </div>
               <div className="flex flex-col text-right relative pt-4 flex-shrink-0 min-w-[120px]">
                  <span className="text-[#6b7280] absolute top-0 right-0">Mastery</span>
                  <div className="flex items-baseline justify-end -space-x-1 mt-1">
                     <span className="font-digital text-[40px] leading-none" style={{ color: '#00ff88', textShadow: '0 0 15px #00ff88' }}>
                        {tool.proficiency}
                     </span>
                     <span className="font-digital text-[20px] leading-none" style={{ color: '#00ff88', textShadow: '0 0 15px #00ff88' }}>%</span>
                  </div>
                  <span className="font-bold tracking-widest mt-1" style={{ color: colorPair.pri }}>{tool.level}</span>
               </div>
            </div>
         </div>
         
         {/* Tiny telemetry markings */}
         <div className="absolute bottom-1 right-2 font-mono text-[8px] text-[#4b5563]">SYS_REF: 0x{tool.id.replace(/[^a-z0-9]/g, '').substring(0,6).toUpperCase()} // SECTOR 7</div>
      </div>
      
      <div className="flex flex-col flex-1 p-6 md:p-8 gap-8 relative z-10 w-full overflow-y-auto custom-scrollbar">
         {/* Subtle Wear Overlay inside the card */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
         
         {/* Internal alignment ticks */}
         <div className="absolute left-2 top-[30%] bottom-[30%] w-[1px] bg-gradient-to-b from-transparent via-[#4b5563] to-transparent opacity-40" />
         <div className="absolute right-2 top-[40%] bottom-[40%] w-[1px] bg-gradient-to-b from-transparent via-[#4b5563] to-transparent opacity-40" />
         
         {/* SECTION 1: ABOUT */}
         <div className="flex flex-col lg:flex-row gap-8 relative w-full">
            <div className="flex flex-col relative w-full lg:w-[65%]">
               <div className="flex items-center gap-2 mb-4">
                 <span className="px-2 py-0.5 border-[0.5px] border-[#ffffff1a] bg-[#ffffff05] font-mono text-[9px] text-[#00ff88] uppercase tracking-widest opacity-80 mix-blend-screen shadow-[0_0_5px_rgba(0,255,136,0.2)]">PROTO_TYPE_A</span>
                 <span className="px-2 py-0.5 border-[0.5px] border-[#ffffff1a] bg-[#ffffff05] font-mono text-[9px] text-[#00ff88] uppercase tracking-widest opacity-80 mix-blend-screen shadow-[0_0_5px_rgba(0,255,136,0.2)]">STABLE_BUILD_V2</span>
                 <span className="ml-auto font-mono text-[8px] text-[#4b5563]">NODE: US-WEST-04 // HASH: {(Math.random() * 0xFFFFFF).toString(16).padEnd(6, '0').toUpperCase()}</span>
               </div>
               <div className="flex flex-col gap-2 relative border-l-[1px] border-dashed border-[#4b5563] pl-4">
                  <div className="absolute -left-[3px] top-0 w-[5px] h-[5px] bg-[#4b5563]" />
                  <div className="absolute -left-[3px] bottom-0 w-[5px] h-[5px] bg-[#4b5563]" />
                  <h5 className="font-mono text-[10px] text-[#6b7280] uppercase tracking-[0.2em] relative">
                      <span className="typewriter-text-fast" style={{ borderColor: colorPair.pri }}>01 // System Overview</span>
                      <div className="absolute top-1/2 left-full -translate-y-1/2 ml-4 w-32 h-[1px] bg-[#374151] opacity-50" />
                  </h5>
                  <p className="font-mono text-[12px] tracking-[1px] text-[#d1d5db] leading-[2] max-w-none pt-2">
                     {tool.description}
                  </p>
               </div>
            </div>
            
            {/* Contextual Sidebar Instrument */}
            <div className="hidden lg:flex flex-col w-[35%] shrink-0 gap-3 pt-8">
               <div className="border-[0.5px] border-[#ffffff1a] bg-[#ffffff03] p-3 flex flex-col gap-2 relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#ffffff33]" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#ffffff33]" />
                  
                  <div className="flex items-center justify-between mb-2">
                     <span className="font-mono text-[9px] text-[#6b7280] uppercase tracking-widest">Op_Parameters</span>
                     <span className="font-mono text-[8px] text-[#00ff88] bg-[#00ff881a] px-1 animate-pulse">NOMINAL</span>
                  </div>
                  
                  <div className="flex justify-between items-center border-b-[0.5px] border-[#ffffff1a] pb-1">
                     <span className="font-mono text-[10px] text-[#9ca3af]">Latency Threshold</span>
                     <span className="font-mono text-[10px] text-[#00ff88]">{'<'}50ms</span>
                  </div>
                  <div className="flex justify-between items-center border-b-[0.5px] border-[#ffffff1a] pb-1">
                     <span className="font-mono text-[10px] text-[#9ca3af]">Encryption</span>
                     <span className="font-mono text-[10px] text-white">TLS 1.3 / AES-256</span>
                  </div>
                  <div className="flex justify-between items-center border-b-[0.5px] border-[#ffffff1a] pb-1">
                     <span className="font-mono text-[10px] text-[#9ca3af]">Availability</span>
                     <span className="font-mono text-[10px] text-white">Zone_Redundant</span>
                  </div>
                  <div className="flex justify-between items-center pb-1 pt-1 opacity-50">
                     <span className="font-mono text-[8px] text-[#9ca3af]">Thermal</span>
                     <span className="font-mono text-[8px] text-[#9ca3af]">STABLE</span>
                  </div>
               </div>
            </div>
         </div>

         {/* SECTION 2: KEY FEATURES */}
         <div className="flex flex-col gap-4">
            <h5 className="font-mono text-[10px] text-[#6b7280] uppercase tracking-[0.2em] border-b border-[#1f2937] w-full pb-2">
               <span className="typewriter-text-fast" style={{ borderColor: colorPair.pri }}>02 // Feature Matrix</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
               {(tool.features || []).map((feat, i) => (
                  <div key={i} className="bg-[#111827] border border-[#1f2937] p-3 flex flex-col gap-2 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-[#1f2937]/50 to-transparent pointer-events-none" />
                     <div className="flex justify-between items-center">
                        <span className="font-space font-bold text-[11px] uppercase tracking-wide text-[#e5e7eb]">{feat.name}</span>
                        <span className="font-mono text-[8px]" style={{ color: feat.status === 'DEPLOYED' ? '#10b981' : '#f59e0b'}}>[{feat.status}]</span>
                     </div>
                     <div className="w-full h-[2px] bg-[#1f2937] relative overflow-hidden">
                         <div className="absolute left-0 top-0 h-full transition-all relative overflow-hidden" style={{ width: `${feat.importance}%`, backgroundColor: colorPair.pri }}>
                             <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-60 translate-x-[-150%] group-hover:animate-[thermo-flow_1.5s_ease-out_infinite]" style={{ transform: 'skewX(-20deg)' }} />
                         </div>
                     </div>
                     <span className="font-mono text-[8px] text-[#4b5563] text-right mt-1">CAPACITY: {feat.importance}%</span>
                  </div>
               ))}
               {(!tool.features || tool.features.length === 0) && (
                  <div className="col-span-full font-mono text-[10px] text-[#6b7280] p-4 border border-dashed border-[#374151] text-center">NO FEATURE MATRIX DATA AVAILABLE.</div>
               )}
            </div>
         </div>

         {/* SECTION 3: SYSTEM INTELLIGENCE */}
         <div className="flex flex-col gap-4">
            <h5 className="font-mono text-[10px] text-[#6b7280] uppercase tracking-[0.2em] border-b-[0.5px] border-[#ffffff1a] w-full pb-2">
               <span className="typewriter-text-fast" style={{ borderColor: colorPair.pri }}>03 // System Intelligence</span>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Architecture Notes */}
               <div className="flex flex-col gap-2 p-4 bg-[#0a0f19] border-[0.5px] border-[#ffffff1a]">
                   <span className="font-mono text-[9px] text-[#f59e0b] uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-[#f59e0b]" /> Architecture Notes
                   </span>
                   {tool.philosophy && tool.philosophy[0] ? (
                       <p className="font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80">{tool.philosophy[0]}</p>
                   ) : (
                       <p className="font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80">Optimized for concurrent node communication and stable deployment scaling.</p>
                   )}
               </div>

               {/* Known Limitations */}
               <div className="flex flex-col gap-2 p-4 bg-[#0a0f19] border-[0.5px] border-[#ffffff1a] relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-8 h-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMCAwIEwxMDAgMTAwIE0xMDAgMCBMMCAxMDAiIHN0cm9rZT0icmdiYSgyNTUsMCwwLDAuMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none" />
                   <span className="font-mono text-[9px] text-[#ef4444] uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-[#ef4444]" /> Known Limitations
                   </span>
                   {tool.philosophy && tool.philosophy[1] ? (
                       <p className="font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80">{tool.philosophy[1]}</p>
                   ) : (
                       <p className="font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80">Aggressive caching paradigms may delay propagation under heavy un-hydrated loads.</p>
                   )}
               </div>

               {/* Field Applications */}
               <div className="flex flex-col gap-2 p-4 bg-[#0a0f19] border-[0.5px] border-[#ffffff1a]">
                   <span className="font-mono text-[9px] text-[#3b82f6] uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-[#3b82f6]" /> Field Applications
                   </span>
                   <ul className="flex flex-col font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80 gap-1 mt-1">
                      <li className="flex items-center gap-2"><span className="text-[#3b82f6] opacity-50">-</span> High-frequency data telemetry interfaces</li>
                      <li className="flex items-center gap-2"><span className="text-[#3b82f6] opacity-50">-</span> Real-time spatial observation dashboards</li>
                      <li className="flex items-center gap-2"><span className="text-[#3b82f6] opacity-50">-</span> Persistent multi-agent networking layers</li>
                   </ul>
               </div>

               {/* Integration Surfaces */}
               <div className="flex flex-col gap-2 p-4 bg-[#0a0f19] border-[0.5px] border-[#ffffff1a]">
                   <span className="font-mono text-[9px] text-[#8b5cf6] uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-[#8b5cf6]" /> Integration Surfaces
                   </span>
                   <p className="font-mono text-[11px] text-[#d1d5db] leading-relaxed opacity-80">CONNECTED STACK:</p>
                   <div className="flex flex-wrap gap-2 mt-1">
                       {['NEXT.JS', 'TYPESCRIPT', 'ZUSTAND', 'TAILWIND', 'TRPC'].map(tech => (
                           <span key={tech} className="px-1.5 py-0.5 border-[0.5px] border-[#8b5cf640] bg-[#8b5cf61a] text-[9px] font-mono text-[#c4b5fd]">
                               {tech}
                           </span>
                       ))}
                   </div>
               </div>
            </div>
         </div>         {/* SECTION 4: MISSION LOG */}
         <div className="flex flex-col gap-4 mt-auto w-full pt-4 relative z-10">
            <h5 className="font-mono text-[11px] text-[#6b7280] uppercase tracking-[0.2em] border-b-[0.5px] border-[#ffffff1a] w-full pb-2 flex justify-between">
               <span>04 // MISSION LOG [Artifact Deployments]</span>
               <span className="opacity-50">[{tool.projects.length} RECORDS]</span>
            </h5>
            <div className="flex flex-col gap-4 w-full">
               {tool.projects.map((proj, i) => (
                  <div key={i} className="flex flex-col md:flex-row w-full bg-[#030508]/60 border-[0.5px] border-[#ffffff1a] p-4 gap-4 relative hover:bg-[#ffffff05] transition-colors group/proj">
                     <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: proj.status === 'SHIPPED' ? '#10b981' : '#f59e0b', opacity: 0.3 }} />
                     
                     <div className="flex flex-col md:w-[60%] gap-3 border-r-[0.5px] border-transparent md:border-[#ffffff1a] md:pr-4">
                        <div className="flex items-center justify-between">
                           <h6 className="font-space font-bold uppercase text-[14px] text-[#e5e7eb] tracking-tight">{proj.name}</h6>
                           <span className="font-mono text-[9px] font-bold px-1.5 py-0.5" style={{ backgroundColor: proj.status === 'SHIPPED' ? '#10b9811a' : '#f59e0b1a', color: proj.status === 'SHIPPED' ? '#10b981' : '#f59e0b', border: `0.5px solid ${proj.status === 'SHIPPED' ? '#10b9814d' : '#f59e0b4d'}`}}>{proj.status || 'ACTIVE'}</span>
                        </div>
                        <p className="font-mono text-[11px] text-[#9ca3af] leading-relaxed">{proj.desc}</p>
                     </div>
                     
                     <div className="flex flex-col md:w-[40%] gap-2 justify-center pl-2">
                        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] text-[#6b7280] uppercase">
                           <span>ENV: PRODUCTION_US_WEST</span>
                           <span>//</span>
                           <span>ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                           <button className="h-[28px] px-3 font-mono text-[9px] uppercase tracking-widest text-[#e5e7eb] border-[0.5px] border-[#ffffff33] bg-[#0a0f19] hover:bg-[#ffffff1a] hover:border-white transition-all flex items-center gap-2 shadow-[4px_4px_0_0_rgba(255,255,255,0.05)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0_0_transparent]">
                              <span className="w-1.5 h-1.5 bg-[#4b5563] group-hover/proj:bg-white transition-colors" /> VIEW SOURCE
                           </button>
                           <button className="h-[28px] px-3 font-mono text-[9px] uppercase tracking-widest text-[#00ff88] border-[0.5px] border-[#00ff884d] bg-[#00ff880a] hover:bg-[#00ff881a] hover:border-[#00ff88] transition-all flex items-center gap-2 shadow-[4px_4px_0_0_rgba(0,255,136,0.1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0_0_transparent]">
                              <span className="w-1.5 h-1.5 bg-[#00ff88] animate-pulse" /> LIVE DEMO
                           </button>
                           <button className="h-[28px] px-3 font-mono text-[9px] uppercase tracking-widest text-[#e5e7eb] border-[0.5px] border-[#ffffff33] bg-[#0a0f19] hover:bg-[#ffffff1a] hover:border-white transition-all flex items-center gap-2 shadow-[4px_4px_0_0_rgba(255,255,255,0.05)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-[0px_0px_0_0_transparent]">
                              CASE FILE
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
               {tool.projects.length === 0 && (
                  <div className="w-full font-mono text-[11px] text-[#6b7280] p-4 border border-dashed border-[#ffffff1a] text-center">NO MISSIONS LOGGED FOR THIS SYSTEM.</div>
               )}
            </div>
         </div>
      </div>
      
      {/* SECTION 5: TELEMETRY FOOTER */}
      <div className="h-14 shrink-0 bg-[#020408]/80 border-t-[0.5px] border-[#ffffff1a] flex items-center px-6 justify-between font-mono text-[10px] uppercase text-[#6b7280] overflow-hidden w-full relative">
         <div className="flex items-center gap-6 z-10 w-1/2">
            <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" /> UPLINK STABLE</span>
            <span className="hidden sm:inline">LAST COMMIT: {metadata.lastDeployed || 'RECENT'}</span>
         </div>
         {/* Simple Green Bar Chart (Telemetry) */}
         <div className="flex gap-[2px] items-end h-[36px] w-1/2 justify-end z-10 right-4 absolute opacity-70">
            {Array.from({ length: 48 }).map((_, i) => {
               const height = 10 + Math.random() * 90;
               return (
                 <div key={i} className="w-[3px] bg-[#10b981]" style={{ height: `${height}%` }} />
               )
            })}
         </div>
         <div className="absolute right-4 bottom-2 text-[#10b981] opacity-50 text-[8px] z-20">TELEMETRY_DAT</div>
      </div>
    </div>
  );
};

const ControlLever: React.FC<{
  category: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ category, isSelected, onClick }) => {
  const conf = DOMAIN_CONFIG[category];
  const colorPair = categoryColors[category] || { pri: '#B08A52', sec: '#D98F5A' };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center relative group transition-colors duration-200 flex-grow h-[48px] px-2 outline-none category-tab",
        isSelected ? 'active' : ''
      )}
      style={{ 
        minWidth: "100px",
        backgroundColor: 'transparent',
      }}
      data-category={category}
    >
      <div 
        className="absolute inset-x-1 inset-y-0 transition-colors duration-200 translate-y-[2px]"
        style={{
           backgroundColor: isSelected ? `${colorPair.pri}11` : 'transparent',
           borderTop: isSelected ? `2px solid ${colorPair.pri}` : '2px solid transparent',
           borderLeft: isSelected ? `2px solid ${colorPair.pri}` : '2px solid transparent',
           borderRight: isSelected ? `2px solid ${colorPair.pri}` : '2px solid transparent',
           borderBottom: 'none',
           transform: 'skewX(-16deg)',
           boxShadow: isSelected ? `inset 0 0 20px ${colorPair.pri}26` : 'none',
           borderTopRightRadius: '4px',
        }}
      />
      {/* 2px top border preview on hover for inactive */}
      {!isSelected && (
        <div className="absolute top-0 left-2 right-4 h-[2px] opacity-0 group-hover:opacity-20 transition-opacity transform skew-x-[-16deg]" style={{ backgroundColor: colorPair.pri }} />
      )}
      
      <div className="flex flex-col items-center justify-center relative z-10 w-full h-full pb-1">
         <span className={cn(
           "font-sans uppercase tracking-tight transition-all", 
           isSelected 
             ? "font-bold text-[13px] text-[#fafaf9] drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]" 
             : "font-medium text-[12px] text-[#57534e] opacity-40 group-hover:opacity-70 group-hover:text-[#57534e]"
         )}>
           {conf.title}
         </span>
         <div className="flex items-center gap-1 mt-0.5">
           {isSelected ? (
              <>
                <motion.div 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" 
                  style={{ boxShadow: `0 0 6px #00ff88` }} 
                />
                <span className="text-[9px] font-mono tracking-widest text-[#00ff88]">
                  LIVE
                </span>
              </>
           ) : (
              <>
                 <span className="text-[9px] font-mono tracking-tight text-[#44403c] opacity-40">
                   STBY
                 </span>
              </>
           )}
         </div>
      </div>
    </button>
  );
};

const MaterialSampleBlock: React.FC<{
  tool: TechItem;
  isActive: boolean;
  onClick: () => void;
}> = ({ tool, isActive, onClick }) => {
  let bgClass = "";
  let shimmerClass = "";
  if (tool.level === "expert") {
    bgClass = "bg-[#B08A52] border-[#ebd1a5]"; // Gold brick
    shimmerClass =
      "bg-gradient-to-tr from-transparent via-white/40 to-transparent";
  } else if (tool.level === "advanced") {
    bgClass = "bg-[#D98F5A] border-[#f2be9b]"; // Copper ingot
    shimmerClass =
      "bg-gradient-to-tr from-transparent via-white/30 to-transparent";
  } else {
    bgClass = "bg-[#7AA1C1] border-[#b0d2eb] backdrop-blur-sm opacity-90"; // Ice crystal
    shimmerClass =
      "bg-gradient-to-bl from-white/10 via-white/70 to-transparent";
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-[2px] flex items-center justify-center p-2 cursor-pointer font-bold text-[8px] md:text-[10px] text-center uppercase tracking-tighter shadow-[4px_4px_0_0_#1A1816] transition-all duration-300 relative overflow-hidden shrink-0",
        bgClass,
        isActive
          ? "shadow-[0_0_20px_5px_rgba(199,91,58,0.6),6px_6px_0_0_#1A1816] -translate-y-1 brightness-125 z-20"
          : "hover:-translate-y-[2px] hover:shadow-[6px_6px_0_0_#1A1816] z-10",
        tool.level !== "proficient" && "rounded-sm", // Hard materials are sharper
      )}
    >
      <div
        className={cn(
          "absolute inset-0 mix-blend-overlay opacity-60",
          shimmerClass,
        )}
      />
      <div className="relative text-[#1A1816] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] z-20 break-all select-none">
        {tool.name}
      </div>

      {/* Ambient pulse when hot */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 border-[3px] border-[#C75B3A] z-30"
        />
      )}
    </div>
  );
};

export function CoreCapabilitiesModule() {
  const [activeDomain, setActiveDomain] = useState<string>('frontend');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeColor, setActiveColor] = useState('#f59e0b'); // default frontend color
  const [mousePos, setMousePos] = useState({ x: 500, y: 500 });
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  
  // New State for Toolbar
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeSort, setActiveSort] = useState('RELEVANCE');
  const [activeView, setActiveView] = useState('MASONRY');
  const [isContentSweeping, setIsContentSweeping] = useState(false);

  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);
  
  const handleToolSelect = (id: string) => {
    if (id !== expandedToolId) {
      setIsContentSweeping(true);
      setExpandedToolId(id);
      setTimeout(() => setIsContentSweeping(false), 400); // scanline
    }
  };
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  
  // Track mouse for ambient glow
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    // Use lerp for a smoother feel in a real app, but raw coords work fine for ambient
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  // Update active color glow
  useEffect(() => {
    setActiveColor(categoryColors[activeDomain]?.pri || '#B08A52');
    const firstTool = techStackData.find(t => t.category === activeDomain);
    setExpandedToolId(firstTool ? firstTool.id : null);
  }, [activeDomain]);

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full font-sans flex flex-col h-full py-12 md:py-[80px] overflow-hidden transition-colors duration-700"
      style={{
        background: 'radial-gradient(circle at center, #0a1118 0%, #05070a 100%)',
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.5)'
      }}
    >
      {/* Substrate Texture Overlay - Concrete Grain */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: `url("${noiseSvg}")`, backgroundSize: '100px 100px' }}
      />
      
      {/* CRT Scanline Overlay */}
      <div 
        className="absolute inset-0 z-[100] pointer-events-none mix-blend-overlay opacity-50"
        style={{ 
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(255,255,255,0.02) 0px, transparent 1px, transparent 4px)',
          backgroundSize: '100% 4px',
          animation: 'scanline-drift 60s linear infinite'
        }} 
      />

      {/* Deep Background Geometry (Parallax simulation) Layer 2 */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ 
          y: y1,
          backgroundImage: 'linear-gradient(30deg, #a855f7 1px, transparent 1px), linear-gradient(150deg, #a855f7 1px, transparent 1px)',
          backgroundSize: '80px 46px',
        }} 
      />
      
      {/* Dynamic Particle Flow (Mouse Parallax) */}
      <motion.div 
        className="absolute -inset-[100px] z-[1] pointer-events-none opacity-[0.25]"
        animate={{
          x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)) * -0.015,
          y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)) * -0.015
        }}
        transition={{ type: "spring", damping: 50, stiffness: 150 }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(250,250,249,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <motion.div 
        className="absolute -inset-[100px] z-[1] pointer-events-none opacity-[0.15]"
        animate={{
          x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)) * -0.03,
          y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)) * -0.03
        }}
        transition={{ type: "spring", damping: 50, stiffness: 150 }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(250,250,249,0.6) 1.5px, transparent 1.5px)',
          backgroundSize: '70px 70px',
          backgroundPosition: '15px 15px'
        }}
      />
      <motion.div 
        className="absolute -inset-[100px] z-[1] pointer-events-none opacity-[0.1]"
        animate={{
          x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 500)) * -0.05,
          y: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 500)) * -0.05
        }}
        transition={{ type: "spring", damping: 50, stiffness: 150 }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(250,250,249,0.8) 2px, transparent 2px)',
          backgroundSize: '110px 110px',
          backgroundPosition: '30px 30px'
        }}
      />

      {/* Background Floating Nodes (Layer 3) */}
      <motion.div 
        className="absolute inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-screen opacity-[0.05]"
        style={{ y: y2 }}
      >
          <div className="absolute w-[2px] h-[2px] rounded-full bg-[#a855f7] top-[20%] left-[10%] animate-[pulse_4s_infinite]" />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-[#a855f7] top-[60%] left-[80%] animate-[pulse_6s_infinite]" />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-[#a855f7] top-[80%] left-[30%] animate-[pulse_5s_infinite]" />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-[#00ff88] top-[10%] left-[70%] animate-[pulse_8s_infinite]" />
          <div className="absolute w-[2px] h-[2px] rounded-full bg-[#00ff88] top-[40%] left-[40%] animate-[pulse_7s_infinite]" />
      </motion.div>

      {/* Data Packets (Layer 4) */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden mix-blend-screen opacity-[0.08]">
          <div className="absolute h-px w-32 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent top-[30%] -left-[10%] animate-[packet-drift_8s_linear_infinite]" />
          <div className="absolute h-px w-24 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent top-[70%] -left-[10%] animate-[packet-drift_12s_linear_infinite_4s]" />
      </div>

      {/* Screen Scanlines (Layer 5) */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)`,
          backgroundSize: '100% 4px',
          animation: 'scanline-drift 20s linear infinite'
        }}
      />

      {/* Blueprint Grid Lines */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(30deg, transparent, transparent 59px, rgba(41, 37, 36, 0.8) 59px, rgba(41, 37, 36, 0.8) 60px)`
        }}
      />

      {/* Cursor Mouse Tracking Glow */}
      <div 
        className="absolute z-0 pointer-events-none transition-colors duration-1000 blur-3xl opacity-[0.15]"
        style={{
          left: `${mousePos.x - 400}px`, // 800px wide -> offset 400
          top: `${mousePos.y - 400}px`,
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle at center, ${activeColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Background Sphere Glow */}
      <div 
        className="absolute z-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 mix-blend-screen animate-[spin_20s_linear_infinite]"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at 30% 30%, #4c1d95, #1e3a8a, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      
      {/* Top / Bottom Edge Bleed Rule & Coordinates */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-40 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      <div className="absolute top-2 left-6 right-6 flex justify-between z-10 pointer-events-none opacity-40 font-mono text-[8px] select-none transition-colors duration-500" style={{ color: activeColor }}>
         <span>LAT: 47.6062° N / LONG: 122.3321° W</span>
         <span>[ 0x00A1F0.SYS_CORE ]</span>
         <span>SECTOR 04.99 // ONLINE</span>
      </div>
      
      {/* Segmented corners and inset utility rails */}
      <div className="absolute top-0 left-0 w-32 h-1 opacity-80 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      <div className="absolute top-0 right-0 w-16 h-1 opacity-80 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      
      <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      <div className="absolute bottom-0 right-0 w-32 h-1 opacity-80 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      <div className="absolute bottom-0 left-0 w-8 h-1 opacity-80 z-10 pointer-events-none transition-colors duration-500" style={{ backgroundColor: activeColor }} />
      
      {/* Measurement ticks */}
      <div className="absolute left-0 top-[10%] bottom-[10%] w-[6px] z-10 pointer-events-none flex flex-col justify-between opacity-40 transition-colors duration-500" style={{ color: activeColor }}>
          {Array.from({ length: 20 }).map((_, i) => <div key={i} className="w-full h-[1px] bg-current" />)}
      </div>
      <div className="absolute right-0 top-[20%] bottom-[20%] w-[6px] z-10 pointer-events-none flex flex-col justify-between opacity-40 items-end transition-colors duration-500" style={{ color: activeColor }}>
          {Array.from({ length: 15 }).map((_, i) => <div key={i} className="w-[3px] h-[1px] bg-current" />)}
      </div>

      <div className="absolute bottom-2 left-6 right-6 flex justify-between z-10 pointer-events-none opacity-40 font-mono text-[8px] select-none transition-colors duration-500" style={{ color: activeColor }}>
         <span>DATA_STREAM: 0x8F9A 0x11B2 0xFFEE 0x0001 0xCC74</span>
         <span>01001000 01100101 01101100 01101100 01101111</span>
      </div>

      <div className="w-full relative z-20 flex flex-col h-full max-w-7xl mx-auto py-12 md:py-20 px-6 md:px-20">
        
        {/* THE FORGE HEADER (CONTROL PANEL) */}
        <div className="flex flex-col gap-6 md:gap-8 relative w-full mb-12">
            {/* Descending Telemetry Support Lines */}
            <div className="absolute top-[100%] left-[5%] w-[1px] h-[48px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="absolute top-[100%] left-[25%] w-[1px] h-[48px] bg-gradient-to-b from-[#00ff88]/40 to-transparent pointer-events-none" />
            <div className="absolute top-[100%] right-[10%] w-[1px] h-[48px] bg-gradient-to-b from-[#00ff88]/40 to-transparent pointer-events-none delay-100" />
            <div className="absolute top-[100%] right-[30%] w-[1px] h-[48px] bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            
           <div className="flex flex-col md:flex-row justify-between items-center pb-8 pt-2 relative border-b border-[rgba(255,255,255,0.1)] mb-4">
              {/* Left */}
              <div className="flex flex-col relative z-10 shrink-0">
                 <h2 className="font-space text-[32px] md:text-[40px] font-black tracking-[-0.02em] text-[#fafaf9] uppercase leading-none drop-shadow-md">
                    THE FORGE 
                 </h2>
                 <span className="font-mono text-[11px] text-[#a8a29e] tracking-[0.1em] font-normal uppercase mt-1">
                   — TECHNOLOGY ARSENAL
                 </span>
              </div>
              
              {/* Center */}
              <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.1em] text-[#a8a29e] ml-12 lg:ml-24">
                 <div className="flex flex-col items-center">
                    <span className="text-[#57534e]">TOTAL TOOLS</span>
                    <span className="text-white font-bold text-[14px]">47</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[#57534e]">ACTIVE DOMAINS</span>
                    <span className="text-white font-bold text-[14px]">5</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[#57534e]">STREAK</span>
                    <span className="text-white font-bold text-[14px]">128 DAYS</span>
                 </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 mt-4 md:mt-0 z-10 shrink-0 ml-auto">
                 <div className="flex flex-col items-end mr-2">
                    <span className="text-[#57534e] text-[10px] uppercase tracking-widest font-mono">System</span>
                    <span className="text-[#00ff88] text-[12px] uppercase font-bold font-mono">LIVE</span>
                 </div>
                 <div className="w-24 h-8 flex flex-row items-end border border-[rgba(255,255,255,0.1)] p-1 gap-[2px] overflow-hidden">
                    {Array.from({ length: 16 }).map((_, i) => (
                       <motion.div 
                         key={i} 
                         className="flex-1 bg-[#00ff88] opacity-80 rounded-t-[1px]" 
                         animate={{ height: ['20%', '100%', '20%'] }} 
                         transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: 'easeInOut' }}
                       />
                    ))}
                 </div>
              </div>
           </div>
                 {/* FILTER BAR - Capsule Pills */}
           <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-4 pb-2">
             <div className="flex items-center gap-x-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#a8a29e] flex-1 overflow-x-auto hide-scrollbar pb-2 relative z-20">
                <span className="mr-2 text-[#57534e] shrink-0">SHOW:</span>
                {['ALL', 'EXPERT', 'ADVANCED', 'PROFICIENT', 'LEARNING'].map((filter, i) => (
                  <button 
                    key={filter} 
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                    "relative px-4 h-[32px] border transition-colors flex items-center justify-center rounded-[2px] shrink-0",
                    filter === activeFilter ? `text-white bg-[#292524]` : "border-[#44403c] hover:bg-[#292524] text-[#a8a29e]"
                  )} style={filter === activeFilter ? { backgroundColor: `${activeColor}33`, borderColor: activeColor } : {}}>
                    {filter === activeFilter && (
                      <motion.div 
                        layoutId="wave-filter"
                        initial={{ opacity: 0.8, scaleX: 1, scaleY: 1 }}
                        animate={{ opacity: 0, scaleX: 1.4, scaleY: 2 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute inset-0 border"
                        style={{ borderColor: activeColor }}
                      />
                    )}
                    {filter} {filter === activeFilter && '●'}
                  </button>
                ))}
                
                <div className="hidden lg:flex items-center gap-x-2 ml-6 shrink-0 relative z-20">
                   <span className="mr-2 text-[#57534e]">SORT:</span>
                   {['RELEVANCE', 'MASTERY'].map((filter, i) => (
                     <button 
                       key={filter} 
                       onClick={() => setActiveSort(filter)}
                       className={cn(
                       "relative group px-4 h-[32px] border transition-colors flex items-center justify-center rounded-[2px] gap-2",
                       filter === activeSort ? `text-white border-white bg-[#292524]` : "border-[#44403c] hover:bg-[#292524] text-[#a8a29e]"
                     )}>
                       {filter === activeSort && (
                         <motion.div 
                           layoutId="wave-sort"
                           initial={{ opacity: 0.8, scaleX: 1, scaleY: 1 }}
                           animate={{ opacity: 0, scaleX: 1.4, scaleY: 2 }}
                           transition={{ duration: 0.4, ease: "easeOut" }}
                           className="absolute inset-0 border border-white"
                         />
                       )}
                       {filter} 
                       <div className="flex flex-col items-center justify-center -space-y-[4px]">
                          <span className={cn("text-[8px] transition-colors", filter === activeSort ? "text-[#fafaf9]" : "text-[#57534e] opacity-30 group-hover:opacity-60")}>▲</span>
                          <span className="text-[8px] text-[#57534e] opacity-30 group-hover:opacity-60 transition-colors">▼</span>
                       </div>
                     </button>
                   ))}
                </div>
             </div>
             
             <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-[#a8a29e] shrink-0 overflow-x-auto hide-scrollbar pb-2 lg:pb-0 relative z-20">
                <span className="mr-2 text-[#57534e]">VIEW:</span>
                {['MASONRY', 'COMPACT'].map(viewMode => (
                   <button 
                     key={viewMode}
                     onClick={() => setActiveView(viewMode)}
                     className={cn(
                       "relative px-4 h-[32px] border transition-colors flex items-center justify-center gap-2 rounded-[2px]",
                       viewMode === activeView ? "bg-[#292524] text-white border-white" : "border-[#44403c] hover:bg-[#292524] text-[#a8a29e]"
                     )}
                     style={viewMode === activeView ? { borderColor: activeColor } : {}}
                   >
                     {viewMode === activeView && (
                         <motion.div 
                           layoutId="wave-view"
                           initial={{ opacity: 0.8, scaleX: 1, scaleY: 1 }}
                           animate={{ opacity: 0, scaleX: 1.4, scaleY: 2 }}
                           transition={{ duration: 0.4, ease: "easeOut" }}
                           className="absolute inset-0 border border-white"
                         />
                     )}
                     {viewMode} {viewMode === activeView && <span className="w-1 h-1 bg-white block"></span>}
                   </button>
                ))}
             </div>
           </div>
        </div>

        {/* CONTENT BENCH - Split Layout */}
        <div className="relative w-full">
            <div className={cn(
              "gap-6 pb-8 h-[calc(100vh-200px)] min-h-[600px] transition-all duration-500",
              activeView === 'MASONRY' 
                ? "flex flex-col lg:flex-row" 
                : "grid grid-cols-1 lg:grid-cols-[180px_1fr_250px] gap-2 lg:h-[calc(100vh-150px)]"
            )}>
               
               {/* Left Column - Navigation Directory */}
               <div className={cn(
                 "shrink-0 flex flex-col overflow-y-auto custom-scrollbar relative z-20 transition-all duration-500",
                 activeView === 'MASONRY' ? "w-full lg:w-[200px] gap-4 pr-2 p-2 bg-[#050b14]/90 backdrop-blur-[20px] border-[0.5px] border-[#3b82f633] shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(59,130,246,0.03)]" : "w-full gap-2 p-1 border-[0.5px] border-[#3b82f633] bg-[#050b14]/90"
               )}>
                 {/* Decorative L borders for the container */}
                 <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-[#3b82f680] shadow-[0_0_8px_rgba(59,130,246,0.3)] pointer-events-none" />
                 <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-[#3b82f680] shadow-[0_0_8px_rgba(59,130,246,0.3)] pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-[#3b82f680] shadow-[0_0_8px_rgba(59,130,246,0.3)] pointer-events-none" />
                 <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-[#3b82f680] shadow-[0_0_8px_rgba(59,130,246,0.3)] pointer-events-none" />
                 
                 {/* Vertical Scanline */}
                 <div className="absolute top-0 right-1 w-[1px] h-full bg-gradient-to-b from-transparent to-transparent opacity-30 animate-[packet-drift_4s_linear_infinite]" style={{ backgroundImage: `linear-gradient(to bottom, transparent, #3b82f6, transparent)` }} />

                 <div className="text-[11px] font-mono text-[#60a5fa] mb-1 uppercase tracking-[0.1em] pl-2 drop-shadow-[0_0_2px_rgba(96,165,250,0.5)]">Archive_Directory</div>
                 
                 <div className="flex flex-col gap-2 flex-1 relative z-10 w-full overflow-y-auto hide-scrollbar custom-scrollbar pr-1">
                   {domains.map(cat => {
                      const isExpanded = cat === activeDomain;
                      let categoryTools = techStackData.filter(t => t.category === cat);
                      if (activeFilter !== 'ALL') {
                        categoryTools = categoryTools.filter(t => t.level.toUpperCase() === activeFilter);
                      }
                      if (activeSort === 'MASTERY') {
                        categoryTools = [...categoryTools].sort((a, b) => b.proficiency - a.proficiency);
                       }
                      const colorPair = categoryColors[cat] || { pri: '#B08A52', sec: '#D98F5A' };
                      
                      if (categoryTools.length === 0) return null;
                      
                      return (
                         <div key={cat} className="flex flex-col gap-1">
                            <button 
                              onClick={() => { setActiveDomain(cat); setIsMobileMenuOpen(false); }}
                              className="flex items-center justify-between w-full p-2 text-[11px] font-space font-bold uppercase tracking-widest transition-colors bg-[#0f172a] border-[0.5px] border-[#1e293b] hover:bg-[#1e293b]"
                              style={isExpanded ? { borderLeft: `2px solid #60a5fa`, color: '#bfdbfe', backgroundColor: '#1e293b' } : { color: '#64748b' }}
                            >
                               <span className="flex items-center gap-2">
                                  <span className={cn("text-[8px] transition-transform", isExpanded ? "rotate-90 text-[#60a5fa]" : "text-[#475569]")}>▶</span>
                                  {DOMAIN_CONFIG[cat]?.title || cat}
                               </span>
                               <span className="font-mono text-[9px] opacity-70">[{categoryTools.length}]</span>
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="flex flex-col overflow-hidden w-full pl-2 border-l-[0.5px] border-[#1e293b] ml-1 mt-1"
                                >
                                   {categoryTools.map((tool, idx) => (
                                      <div
                                         key={tool.id}
                                         className={cn("w-full transition-all duration-300 cursor-pointer relative group/nav p-1.5 border-[0.5px] border-t-0 flex items-center gap-2 rounded-none overflow-hidden", expandedToolId === tool.id ? "bg-[#1e293b80]" : "border-transparent hover:bg-[#1e293b40]")}
                                         style={expandedToolId === tool.id ? { borderColor: `#3b82f640`, boxShadow: `inset 0 0 10px #3b82f61a` } : {}}
                                         onClick={() => handleToolSelect(tool.id)}
                                      >
                                         {/* Scanning Sweep Effect on Hover */}
                                         <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#60a5fa] opacity-0 group-hover/nav:opacity-100 group-hover/nav:animate-[pulse_1.5s_infinite] transition-all" />
                                         <div className="absolute inset-0 bg-gradient-to-r from-[#3b82f633] to-transparent translate-x-[-100%] group-hover/nav:animate-[thermo-flow_1.5s_ease-out_infinite] pointer-events-none mix-blend-screen" />

                                         <div className="scale-75 origin-left opacity-80 group-hover/nav:opacity-100 transition-opacity z-10 shrink-0">
                                           <TechSigil name={tool.name} isHovered={expandedToolId === tool.id} colorPair={colorPair} />
                                         </div>
                                         <div className="flex flex-col flex-1 overflow-hidden z-10 relative">
                                            <div className="flex items-center justify-between w-full">
                                               <span className={cn("text-[10px] font-mono truncate transition-colors font-medium tracking-[0.05em]", expandedToolId === tool.id ? "text-[#bfdbfe]" : "text-[#94a3b8] group-hover/nav:text-[#e2e8f0]")}>{tool.name}</span>
                                               {/* Micro telemetry that wakes up on hover */}
                                               <span className="text-[7px] font-mono text-[#60a5fa] opacity-0 group-hover/nav:opacity-80 transition-opacity duration-300 translate-x-2 group-hover/nav:translate-x-0 tracking-widest uppercase">
                                                   SYNC
                                               </span>
                                            </div>
                                            <span className="text-[8px] font-mono text-[#475569] truncate w-full flex items-center justify-between mt-[2px] tracking-widest opacity-80 group-hover/nav:opacity-100">
                                              <span>{tool.level.toUpperCase()}</span>
                                              {expandedToolId === tool.id && <span className="animate-pulse shadow-[0_0_5px_#60a5fa] text-[#60a5fa]">●</span>}
                                            </span>
                                         </div>
                                      </div>
                                   ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                         </div>
                      );
                   })}
                   
                   {/* Sense of Scale: Truncated Indicators */}
                   <div className="mt-4 pb-8 flex flex-col gap-2 relative opacity-50">
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#475569] to-transparent" />
                      <div className="flex items-center gap-2 pl-2 mt-2">
                         <span className="w-1.5 h-1.5 bg-[#475569] rounded-sm" />
                         <span className="font-mono text-[9px] text-[#475569] tracking-widest uppercase">7 Archival Nodes</span>
                      </div>
                      <div className="flex items-center gap-2 pl-2">
                         <span className="w-1.5 h-1.5 bg-[#475569] rounded-sm" />
                         <span className="font-mono text-[9px] text-[#475569] tracking-widest uppercase">14 Encrypted Subsystems</span>
                      </div>
                      <div className="flex items-center justify-center mt-4">
                         <span className="font-mono text-[8px] text-[#3b82f6] tracking-widest uppercase animate-pulse drop-shadow-[0_0_2px_#3b82f6]">REMOTE ARCHIVE LINKED</span>
                      </div>
                      {/* Fading rail off-screen */}
                      <div className="absolute top-[80%] left-[-10px] w-[50px] h-[1px] bg-gradient-to-r from-transparent to-[#475569] -rotate-45 pointer-events-none" />
                   </div>
                 </div>
               </div>

               {/* Center Column (1fr) - Detailed Content Area */}
               <div className={cn(
                 "w-full shrink-0 relative flex flex-col h-full overflow-hidden z-10 transition-all duration-500",
                 activeView === 'MASONRY' 
                   ? "lg:flex-1 bg-[#0f0905]/80 backdrop-blur-[30px] border-[0.5px] border-[#f59e0b33] hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(245,158,11,0.03)]" 
                   : "bg-[#0f0905]/60 border-[0.5px] border-[#f59e0b1a]"
               )}
                    style={activeView === 'MASONRY' ? { WebkitBoxReflect: 'below 4px linear-gradient(to bottom, transparent 90%, rgba(255,255,255,0.1) 100%)' } : {}}>
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] pointer-events-none z-20" />
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] pointer-events-none z-20" />
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] pointer-events-none z-20" />
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] pointer-events-none z-20" />
                 
                 {/* Internal CRT Glow */}
                 <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen" style={{ background: 'radial-gradient(circle at center, transparent 30%, #78350f 100%)' }} />
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-[#f59e0b] opacity-40 shadow-[0_0_8px_#f59e0b,0_0_2px_white] z-[120] pointer-events-none mix-blend-screen animate-[continuous-scan_4s_linear_infinite]" />

                 <AnimatePresence mode="wait">
                    {techStackData.filter(t => t.id === expandedToolId).map(tool => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{ opacity: 0, scale: 0.99, filter: 'blur(4px)' }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="w-full h-full relative overflow-hidden group/dossier flex flex-col"
                      >
                         <div className={cn(
                           "absolute left-0 right-0 w-full h-[80px] bg-gradient-to-b from-transparent via-[#f59e0b90] to-transparent z-[150] pointer-events-none mix-blend-screen opacity-0 transition-opacity",
                           isContentSweeping ? "animate-[scan-downward_0.4s_ease-out] opacity-100" : ""
                         )} />
                         <div className={cn("transition-opacity duration-200 h-full w-full", isContentSweeping ? "opacity-30 blur-[2px]" : "opacity-100")}>
                           <SpecimenCard 
                             tool={tool} 
                             isExpandedOverride={true}
                             onExpand={() => {}}
                           />
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
               </div>

               {/* Right Column (300px) - Technical Metrics Radar & Timeline */}
               <div className="w-full lg:w-[300px] shrink-0 bg-[#031014]/90 backdrop-blur-[20px] border-[0.5px] border-[#06b6d433] relative flex flex-col h-full overflow-hidden p-4 shadow-[0_0_20px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(6,182,212,0.03)] z-20">
                 <div className="absolute top-0 left-0 w-3 h-3 border-t-[1px] border-l-[1px] border-[#06b6d480] shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none z-20" />
                 <div className="absolute top-0 right-0 w-3 h-3 border-t-[1px] border-r-[1px] border-[#06b6d480] shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none z-20" />
                 <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1px] border-l-[1px] border-[#06b6d480] shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none z-20" />
                 <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1px] border-r-[1px] border-[#06b6d480] shadow-[0_0_8px_rgba(6,182,212,0.3)] pointer-events-none z-20" />

                 
                 <AnimatePresence mode="wait">
                    {techStackData.filter(t => t.id === expandedToolId).map(tool => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full relative flex flex-col"
                      >
                         <TechMetricsPanel tool={tool} colorPair={categoryColors[tool.category]} />
                      </motion.div>
                    ))}
                 </AnimatePresence>
               </div>
            </div>
            
            {techStackData.filter(t => t.category === activeDomain).length === 0 && (
               <div className="p-12 text-center text-[#57534e] font-mono text-sm uppercase flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-[#292524] mt-8 bg-[#1a1714]">
                  <span className="block mb-2 text-2xl">⚠</span>
                  [NO ASSETS DETECTED IN THIS SUB-SYSTEM]
               </div>
            )}
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes scanline-drift {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 100vh;
          }
        }
        @keyframes packet-drift {
          0% {
            transform: translateX(-10vw);
          }
          100% {
            transform: translateX(110vw);
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
        
        button, a, [role="button"], .cursor-pointer {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4v4M12 16v4M4 12h4M16 12h4M10 10h4v4h-4z" stroke="%2306b6d4" stroke-width="1.5" fill="none"/></svg>') 12 12, pointer !important;
        }

        .thermometer-fill.hovered::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 30%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: translateX(-100%);
          animation: thermo-flow 2s linear infinite;
          z-index: 20;
          mix-blend-mode: overlay;
          pointer-events: none;
        }
        @keyframes thermo-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(800%); }
        }
        @keyframes scan-downward {
          0% { transform: translateY(-20%); }
          100% { transform: translateY(120vh); }
        }
        @keyframes continuous-scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink { 
          50% { border-color: transparent } 
        }
        .typewriter-text {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
          border-right: 2px solid #06b6d4;
          animation: typewriter 0.8s steps(30, end) forwards, blink 1s step-end infinite;
        }
        .typewriter-text-fast {
          animation: typewriter 0.4s steps(20, end) forwards, blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
}
