import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { techStackData, TechItem, categoryColors } from '../data/techStack';
import { cn } from '../lib/utils';
import { ExternalLink, Activity, Shield } from 'lucide-react';

const DOMAIN_CONFIG: Record<string, any> = {
  interface: {
    title: 'INTERFACE ENGINEERING',
    emoji: '⚡',
    aura: '#ff0055',
    secondary: '#ff99cc',
    status: '[HOT]',
    years: '4 YEARS',
    primaryTool: 'React 19 RC / Next.js',
    learning: { name: 'WebGL / GLSL', progress: 24 },
    telemetry: { commit: '1h ago', shipped: 24, streak: 128 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 100% 100%, rgba(255,0,85,0.05) 0%, transparent 50%), linear-gradient(0deg, rgba(255,0,85,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,85,0.03) 1px, transparent 1px)',
    bgSize: '100% 100%, 20px 20px, 20px 20px',
    heatLevel: 'white-hot',
    rainChars: ['<', '>', '/', '{', '}', '=', ';']
  },
  systems: {
    title: 'SYSTEMS ARCHITECTURE',
    emoji: '🗄️',
    aura: '#00ccff',
    secondary: '#99eeff',
    status: '[ACTIVE]',
    years: '5 YEARS',
    primaryTool: 'Node.js / PostgreSQL',
    learning: { name: 'Go Microservices', progress: 15 },
    telemetry: { commit: '5h ago', shipped: 18, streak: 45 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,204,255,0.05) 19px, rgba(0,204,255,0.05) 20px)',
    bgSize: '100% 20px',
    heatLevel: 'active-burn',
    rainChars: ['{', '}', '[', ']', '->', '::']
  },
  intelligence: {
    title: 'MACHINE INTELLIGENCE',
    emoji: '🧠',
    aura: '#aa00ff',
    secondary: '#dd99ff',
    status: '[ACTIVE]',
    years: '2 YEARS',
    primaryTool: 'OpenAI + LangChain',
    learning: { name: 'Local LLMs', progress: 60 },
    telemetry: { commit: '4h ago', shipped: 8, streak: 12 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 50% 50%, rgba(170,0,255,0.08) 0%, transparent 60%)',
    bgSize: '100% 100%',
    heatLevel: 'active-burn',
    rainChars: ['0', '1', 'Σ', '∂', '∇']
  },
  web3: {
    title: 'DECENTRALIZED SYS',
    emoji: '⛓️',
    aura: '#00ff66',
    secondary: '#99ffcc',
    status: '[STANDBY]',
    years: '3 YEARS',
    primaryTool: 'Solidity ^0.8.20',
    learning: { name: 'Rust (Solana)', progress: 34 },
    telemetry: { commit: '2d ago', shipped: 5, streak: 4 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'linear-gradient(30deg, rgba(0,255,102,0.04) 12%, transparent 12.5%, transparent 87%, rgba(0,255,102,0.04) 87.5%, rgba(0,255,102,0.04))',
    bgSize: '20px 35px',
    heatLevel: 'warm-standby',
    rainChars: ['0x', 'Ξ', '⧉', '⚡']
  },
  creative: {
    title: 'CREATIVE COMPUTING',
    emoji: '🎨',
    aura: '#ffcc00',
    secondary: '#ffee99',
    status: '[ACTIVE]',
    years: '3 YEARS',
    primaryTool: 'Three.js / WebGL',
    learning: { name: 'TouchDesigner', progress: 10 },
    telemetry: { commit: '1w ago', shipped: 6, streak: 2 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 0% 0%, rgba(255,204,0,0.08) 0%, transparent 60%)',
    bgSize: '100% 100%',
    heatLevel: 'white-hot',
    rainChars: ['sin', 'cos', 'vec3', 'gl_FragColor']
  },
  design: {
    title: 'DESIGN OPERATIONS',
    emoji: '📐',
    aura: '#ff6600',
    secondary: '#ffbb99',
    status: '[HOT]',
    years: '6 YEARS',
    primaryTool: 'Figma / Storybook',
    learning: { name: 'Design Tokens', progress: 80 },
    telemetry: { commit: '2h ago', shipped: 50, streak: 200 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'linear-gradient(45deg, rgba(255,102,0,0.05) 25%, transparent 25%, transparent 75%, rgba(255,102,0,0.05) 75%)',
    bgSize: '20px 20px',
    heatLevel: 'active-burn',
    rainChars: ['#', 'px', 'em', 'rem', 'rgba']
  },
  tooling: {
    title: 'TOOLING & AUTOMATION',
    emoji: '⚙️',
    aura: '#ffffff',
    secondary: '#cccccc',
    status: '[HOT]',
    years: '5 YEARS',
    primaryTool: 'Cursor / GitHub Actions',
    learning: { name: 'Nix', progress: 5 },
    telemetry: { commit: '10m ago', shipped: 100, streak: 365 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.05) 49px, rgba(255,255,255,0.05) 50px)',
    bgSize: '50px 100%',
    heatLevel: 'white-hot',
    rainChars: ['$', '>', 'make', 'npm', 'run']
  },
  research: {
    title: 'RESEARCH & EXPERIMENT',
    emoji: '🔬',
    aura: '#ff00cc',
    secondary: '#ff99e6',
    status: '[COLD]',
    years: '1 YEAR',
    primaryTool: 'Rust / Zig',
    learning: { name: 'WASM', progress: 40 },
    telemetry: { commit: '3w ago', shipped: 2, streak: 1 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 100% 0%, rgba(255,0,204,0.05) 0%, transparent 60%)',
    bgSize: '100% 100%',
    heatLevel: 'cold-storage',
    rainChars: ['?', '!', '*', '&', '%']
  },
  spatial: {
    title: 'SPATIAL COMPUTING',
    emoji: '🕶️',
    aura: '#ff00aa',
    secondary: '#ff66cc',
    status: '[ACTIVE]',
    years: '2 YEARS',
    primaryTool: 'WebXR / Unity',
    learning: { name: 'VisionOS', progress: 30 },
    telemetry: { commit: '4d ago', shipped: 3, streak: 5 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 50% 50%, rgba(255,0,170,0.05) 0%, transparent 60%)',
    bgSize: '100% 100%',
    heatLevel: 'active-burn',
    rainChars: ['X', 'Y', 'Z', 'w', 'quat']
  },
  audio: {
    title: 'AUDIO / DSP',
    emoji: '🌊',
    aura: '#00ffaa',
    secondary: '#66ffcc',
    status: '[STANDBY]',
    years: '3 YEARS',
    primaryTool: 'Web Audio API / Tone.js',
    learning: { name: 'SuperCollider', progress: 20 },
    telemetry: { commit: '2w ago', shipped: 4, streak: 2 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,255,170,0.05) 10px, rgba(0,255,170,0.05) 20px)',
    bgSize: '100% 100%',
    heatLevel: 'warm-standby',
    rainChars: ['Hz', 'dB', 'fft', 'osc', 'vol']
  },
  hardware: {
    title: 'HARDWARE / IOT',
    emoji: '🔌',
    aura: '#ffaa00',
    secondary: '#ffcc66',
    status: '[COLD]',
    years: '4 YEARS',
    primaryTool: 'Arduino / ESP32',
    learning: { name: 'PCB Design', progress: 15 },
    telemetry: { commit: '1m ago', shipped: 5, streak: 1 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'linear-gradient(90deg, rgba(255,170,0,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(255,170,0,0.05) 1px, transparent 1px)',
    bgSize: '20px 20px',
    heatLevel: 'cold-storage',
    rainChars: ['1', '0', 'GND', 'VCC', 'RX']
  },
  language: {
    title: 'LANGUAGE DESIGN',
    emoji: '📝',
    aura: '#aa00aa',
    secondary: '#cc66cc',
    status: '[ACTIVE]',
    years: '1 YEAR',
    primaryTool: 'Parsers / ASTs',
    learning: { name: 'LLVM', progress: 10 },
    telemetry: { commit: '1d ago', shipped: 1, streak: 7 },
    widthClass: 'col-span-1 lg:col-span-5',
    bgTexture: 'radial-gradient(circle at 0% 100%, rgba(170,0,170,0.05) 0%, transparent 60%)',
    bgSize: '100% 100%',
    heatLevel: 'active-burn',
    rainChars: ['AST', 'lex', 'parse', 'token', 'EOF']
  }
};

const INTEGRATION_BADGES: Record<string, { label: string, color: string }> = {
  interface: { label: '⚡ HIGH-VELOCITY', color: '#ff0055' },
  systems: { label: '🛡️ ZERO-TRUST', color: '#00ccff' },
  intelligence: { label: '🧠 AI-INTEGRATED', color: '#aa00ff' },
  web3: { label: '🔗 TRUSTLESS', color: '#00ff66' },
  creative: { label: '🎨 GENERATIVE', color: '#ffcc00' },
  design: { label: '📐 SYSTEMATIC', color: '#ff6600' },
  tooling: { label: '✅ AUTOMATED', color: '#ffffff' },
  research: { label: '🧪 EXPERIMENTAL', color: '#ff00cc' },
  spatial: { label: '🕶️ IMMERSIVE', color: '#ff00aa' },
  audio: { label: '🔊 REALTIME DSP', color: '#00ffaa' },
  hardware: { label: '⚙️ BARE-METAL', color: '#ffaa00' },
  language: { label: '📝 AST-DRIVEN', color: '#aa00aa' },
};

const getToolRarity = (proficiency: number) => {
  if (proficiency >= 9) return { level: 'Legendary', badge: '⬡', styleClass: 'rarity-legendary' };
  if (proficiency >= 7) return { level: 'Epic', badge: '◈', styleClass: 'rarity-epic' };
  if (proficiency >= 5) return { level: 'Rare', badge: '◆', styleClass: 'rarity-rare' };
  return { level: 'Common', badge: '', styleClass: 'rarity-common' };
};

const MicroSparkline = ({ color }: { color: string }) => {
  const points = `0,10 5,8 10,12 15,4 20,6 25,2 30,5`;
  return (
    <svg width="30" height="15" viewBox="0 0 30 15" className="opacity-60 mix-blend-screen">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
      <circle cx="30" cy="5" r="1.5" fill={color} />
    </svg>
  );
};

const DataRain = ({ chars, color }: { chars: string[], color: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono font-bold whitespace-nowrap"
          style={{ color, left: `${Math.random() * 100}%` }}
          animate={{ y: ['-10%', '110%'] }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * -20
          }}
        >
          {Array.from({ length: 15 }).map((_, j) => (
            <div key={j} className="my-4">
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

const TechDomainBlock = ({ category, items }: { category: string, items: TechItem[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const conf = DOMAIN_CONFIG[category];
  const color = categoryColors[category] || '#CCC';
  const secColor = conf.secondary || '#FFF';
  
  if (!conf || !items.length) return null;

  const sortedItems = [...items].sort((a, b) => b.proficiency - a.proficiency);
  const topItems = sortedItems.slice(0, 3);
  
  const allProjects = sortedItems.flatMap((t) => t.projects);
  const uniqueProjects = Array.from(new Map(allProjects.map(p => [p.name, p])).values()).slice(0, 3);
  const projStatuses = ['🟢 PASSING', '🟡 PROTOTYPE', '🔴 FAILING'];

  const HeatMapBoxShadow = () => {
    if (isHovered) return `0 0 0 2px ${color}, 0 40px 80px -30px ${color}80`;
    if (conf.heatLevel === 'white-hot') return `0 0 0 2px ${color}, 0 20px 60px -20px ${color}40`;
    if (conf.heatLevel === 'active-burn') return `0 0 0 1px ${color}, 0 10px 40px -20px ${color}30`;
    if (conf.heatLevel === 'warm-standby') return `0 0 0 1px ${color}80, 0 5px 20px -10px ${color}20`;
    return `0 0 0 1px ${color}40`;
  };
  
  const BorderStyle = () => {
    if (isHovered) return 'solid';
    if (conf.heatLevel === 'white-hot') return 'solid';
    if (conf.heatLevel === 'active-burn') return 'solid';
    if (conf.heatLevel === 'warm-standby') return 'dashed';
    return 'dotted';
  };
  
  const getToolOpacity = (rarity: string) => {
    switch (rarity) {
       case 'Legendary': return '1';
       case 'Epic': return '0.9';
       case 'Rare': return '0.7';
       default: return '0.5';
    }
  }

  const getToolBorderWidth = (rarity: string) => rarity === 'Legendary' ? '2px' : '1px';

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] } }}
      className={cn(
        "relative overflow-hidden flex flex-col justify-between transition-all duration-700 cursor-pointer bg-[#0a0a0a]",
        conf.widthClass,
        isHovered ? "z-20 transform -translate-y-2" : "z-10"
      )}
      style={{ 
        boxShadow: HeatMapBoxShadow(),
        border: `1px ${BorderStyle()} ${color}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <DataRain chars={conf.rainChars} color={color} />
      
      {/* Background Texture Layers */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
        style={{ 
          backgroundImage: conf.bgTexture,
          backgroundSize: conf.bgSize,
          opacity: isHovered || isExpanded ? 0.8 : 0.3
        }}
      />
      
      {/* Expanded/Hover Status Text */}
      <AnimatePresence>
        {isHovered && !isExpanded && (
           <motion.div 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -10 }}
             className="absolute top-2 right-2 text-[8px] font-mono tracking-widest z-30"
             style={{ color: secColor }}
           >
             [CLICK TO EXPAND: {sortedItems.length} TOOLS]
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scanline Cursor Effect */}
      {isHovered && (
        <motion.div 
          className="absolute left-0 right-0 h-[1px] z-20 pointer-events-none select-none"
          style={{ backgroundColor: color, opacity: 0.5, boxShadow: `0 0 10px 2px ${color}` }}
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <div className="relative z-10 p-5 md:p-6 flex flex-col gap-5 h-full">
        
        {/* Layer 1: Banner & Action Strip */}
        <motion.div layout="position" className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl drop-shadow-md">{conf.emoji}</span>
              <h3 className="font-headline font-extrabold text-white text-xl md:text-2xl tracking-tight uppercase">
                {conf.title}
              </h3>
            </div>
            {INTEGRATION_BADGES[category] && (
              <span 
                className="hidden xl:inline-block mt-2 px-1.5 py-0.5 text-[8px] font-mono border rounded-sm self-start"
                style={{ borderColor: INTEGRATION_BADGES[category].color, color: INTEGRATION_BADGES[category].color, backgroundColor: `${INTEGRATION_BADGES[category].color}20` }}
              >
                {INTEGRATION_BADGES[category].label}
              </span>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-[10px] md:text-xs font-bold px-1.5 rounded-sm" style={{ color: color, backgroundColor: `${color}20` }}>
              {conf.status}
            </span>
            <span className="font-mono text-[8px] md:text-[9px] text-white/40 tracking-widest">
              OP TIME: {conf.years}
            </span>
          </div>
        </motion.div>

        {/* Functionality: Currently Equipped & Loading */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden pt-2"
            >
              <div className="border border-white/10 p-3 bg-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: color }} />
                <div className="text-[8px] md:text-[9px] font-mono mb-1 uppercase tracking-wider" style={{ color: secColor }}>🎯 ACTIVE EQUIP</div>
                <div className="font-headline text-xs md:text-sm text-white font-bold">{conf.primaryTool}</div>
              </div>
              <div className="border border-white/10 p-3 bg-white/5 flex flex-col justify-between">
                <div className="flex justify-between items-baseline mb-2">
                  <div className="text-[8px] md:text-[9px] font-mono mb-1 uppercase tracking-wider text-[#ff006e]">🔄 RESEARCH LAB</div>
                  <div className="text-[8px] font-mono text-white/60">{conf.learning.progress}%</div>
                </div>
                <div className="font-headline text-[10px] md:text-xs text-white/80 mb-2">{conf.learning.name}</div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff006e]" style={{ width: `${conf.learning.progress}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Layer 2: Toolbelt (Tag Cloud, Equipment Layer) */}
        <motion.div layout className="flex flex-wrap gap-2 pt-1">
          {(isExpanded ? sortedItems : topItems).map(item => {
            const version = item.version;
            const rarity = getToolRarity(item.proficiency);
            
            return (
              <div 
                key={item.id}
                className={cn(
                  "font-mono rounded transition-all duration-300 flex items-center gap-1.5 relative group/tool bg-white/5",
                  isExpanded ? "text-[10px] md:text-xs px-2 py-1 md:px-2.5 md:py-1.5" : "text-[10px] px-2 py-1"
                )}
                style={{
                  backgroundColor: `${color}${isHovered ? '20' : '10'}`,
                  border: `${getToolBorderWidth(rarity.level)} ${rarity.level === 'Common' ? 'dashed' : 'solid'} ${color}${Math.round(parseFloat(getToolOpacity(rarity.level))*255).toString(16).padStart(2,'0')}`,
                  color: isHovered ? '#fff' : '#e5e5e5',
                  boxShadow: rarity.level === 'Legendary' ? `0 0 8px 0 ${color}40` : 'none'
                }}
              >
                {rarity.badge && <span style={{ color: secColor }}>{rarity.badge}</span>}
                {item.name}
                {version && isExpanded && <span className="text-[8px] opacity-70 border-l pl-1.5" style={{ borderColor: `${color}40` }}>{version}</span>}
                
                {/* Tooltip Hover Bloom - 6 Dimensions */}
                <div 
                  className="opacity-0 group-hover/tool:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-3 bg-[#0a0a0a] border rounded-sm text-[9px] pointer-events-none transition-all duration-300 z-50 flex flex-col gap-2 min-w-[200px]"
                  style={{ 
                    borderColor: color, 
                    boxShadow: `0 0 20px -5px ${color}, inset 0 0 10px -5px ${color}` 
                  }}
                >
                  <div className="flex justify-between items-center border-b pb-1" style={{ borderColor: `${color}40` }}>
                    <strong style={{ color: secColor }} className="uppercase tracking-widest">{item.name}</strong>
                    <span className="text-white/60 font-medium">{version || 'STABLE'}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 font-mono text-[8px] tracking-wide">
                    <div className="flex justify-between">
                      <span className="text-white/40">PROFICIENCY</span>
                      <span className="text-white relative top-px">{item.proficiency * 10}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">STATUS</span>
                      <span className="text-[#00ff66] relative top-px">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">SHIPPED</span>
                      <span className="text-white relative top-px">{item.shipped || item.projects.length} PROJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">SYNERGY</span>
                      <span style={{ color: secColor }} className="relative top-px">{Math.floor(60 + item.proficiency * 3)}%</span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-white/40 text-[8px] uppercase">Ecosystem</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: secColor }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Tag for collapsed state to hint more */}
          {!isExpanded && sortedItems.length > 3 && (
            <div className="font-mono text-[10px] px-2 py-1 rounded bg-white/5 border border-white/10 text-white/50 flex items-center hover:bg-white/10 transition-colors">
              +{sortedItems.length - 3} MORE
            </div>
          )}
        </motion.div>

        {/* Layer 3: Mission Log (Projects) */}
        <AnimatePresence>
          {isExpanded && uniqueProjects.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border border-white/10 bg-black/40 rounded-sm p-3 space-y-2 mt-auto overflow-hidden"
            >
              <div className="text-[8px] md:text-[9px] font-mono tracking-widest text-white/40 mb-2 uppercase">MISSION LOG // LATEST</div>
              {uniqueProjects.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between group/proj cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] md:text-[8px] font-mono w-16" style={{ color: idx === 2 ? '#ef4444' : idx === 1 ? '#eab308' : '#10b981' }}>
                      {projStatuses[idx % projStatuses.length]}
                    </span>
                    <span className="font-headline text-[10px] md:text-sm text-white/80 group-hover/proj:text-white transition-colors">{p.name}</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-white/20 group-hover/proj:text-white/60 transition-colors" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
        
      {/* Layer 4: Telemetry Footer */}
      <AnimatePresence>
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 w-full bg-black/60 border-t border-white/5 py-2 px-4 flex flex-wrap items-center justify-between text-[8px] md:text-[9px] font-mono text-white/40 backdrop-blur-sm"
        >
          <div className="flex gap-4">
            <span>CMT: {conf.telemetry.commit}</span>
            <span>SHP: {conf.telemetry.shipped}</span>
            <span>STRK: {conf.telemetry.streak}d</span>
          </div>
          <div className="hidden sm:block">
            <MicroSparkline color={color} />
          </div>
        </motion.div>
      )}
      </AnimatePresence>

    </motion.div>
  );
};

export function CoreCapabilitiesModule() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [syncPosition, setSyncPosition] = useState(-20);

  // Sync Pulse Effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setSyncPosition(prev => {
        if (prev > 120) return -20;
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="col-span-12 w-full flex flex-col bg-[#050505] text-[#e5e5e5] border-y border-white/10 relative overflow-hidden"
    >
      {/* Global Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Command Strip Header */}
      <div className="relative z-10 w-full flex flex-col font-mono text-[9px] md:text-[10px] text-white/60 tracking-widest border-b border-white/10 bg-[#050505] shadow-xl">
        <div className="p-3 md:p-4 flex items-center gap-2 border-b border-white/5 bg-white/[0.02]">
           <Activity className="w-4 h-4 text-[#00f0ff]" />
           <span className="text-white drop-shadow-sm uppercase">Core Capabilities</span>
           <span className="text-[#00f0ff] ml-auto font-bold animate-pulse">[LIVE]</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-b border-white/5">
          <div className="p-3 md:p-4 flex flex-col gap-1.5 md:gap-2">
            <span className="text-white/40 uppercase text-[8px] md:text-[9px]">SYSTEM LOAD</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/10 relative rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-[78%] bg-gradient-to-r from-[#3b82f6] to-[#a855f7]" />
              </div>
              <span className="text-white">78%</span>
            </div>
          </div>
          <div className="p-3 md:p-4 flex flex-col gap-1.5 md:gap-2">
            <span className="text-white/40 uppercase text-[8px] md:text-[9px]">ACTIVE TOOLS</span>
            <span className="text-white">23 / {techStackData.length}</span>
          </div>
          <div className="p-3 md:p-4 flex flex-col gap-1.5 md:gap-2">
            <span className="text-white/40 uppercase text-[8px] md:text-[9px]">STREAK</span>
            <span className="text-white">128 DAYS</span>
          </div>
          <div className="p-3 md:p-4 flex flex-col gap-1.5 md:gap-2">
             <span className="text-white/40 uppercase text-[8px] md:text-[9px]">SYNC STATUS</span>
             <span className="text-[#10b981]">● ONLINE (04:22 UTC)</span>
          </div>
        </div>
        <div className="flex p-2 md:p-3 gap-2 bg-black/40 items-center overflow-x-auto border-t border-black relative z-20 shadow-md">
          <button className="px-3 py-1.5 bg-white/10 text-white rounded-sm border border-white/20 transition-colors shrink-0 shadow">GRID VIEW</button>
          <button className="px-3 py-1.5 text-white/40 hover:text-white transition-colors shrink-0">TREE VIEW</button>
          <button className="px-3 py-1.5 text-white/40 hover:text-white transition-colors shrink-0">TIMELINE VIEW</button>
          <button className="px-3 py-1.5 text-white/40 hover:text-white transition-colors shrink-0">HEATMAP VIEW</button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="relative z-10 w-full p-4 md:p-6 lg:p-8 perspective-1000">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6 w-full max-w-7xl mx-auto auto-rows-auto">
          
          <TechDomainBlock category="interface" items={techStackData.filter(t => t.category === 'interface')} />
          <TechDomainBlock category="systems" items={techStackData.filter(t => t.category === 'systems')} />
          <TechDomainBlock category="intelligence" items={techStackData.filter(t => t.category === 'intelligence')} />
          <TechDomainBlock category="web3" items={techStackData.filter(t => t.category === 'web3')} />
          <TechDomainBlock category="creative" items={techStackData.filter(t => t.category === 'creative')} />
          <TechDomainBlock category="design" items={techStackData.filter(t => t.category === 'design')} />
          <TechDomainBlock category="tooling" items={techStackData.filter(t => t.category === 'tooling')} />
          <TechDomainBlock category="research" items={techStackData.filter(t => t.category === 'research')} />
          <TechDomainBlock category="spatial" items={techStackData.filter(t => t.category === 'spatial')} />
          <TechDomainBlock category="audio" items={techStackData.filter(t => t.category === 'audio')} />
          <TechDomainBlock category="hardware" items={techStackData.filter(t => t.category === 'hardware')} />
          <TechDomainBlock category="language" items={techStackData.filter(t => t.category === 'language')} />
          
        </div>
      </div>
    </motion.section>
  );
}
