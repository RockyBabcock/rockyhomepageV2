import React from 'react';

export type TechLevel = 'expert' | 'advanced' | 'proficient';

export interface TechFeature {
  name: string;
  status: string;
  importance: number;
}

export interface Project {
  name: string;
  url: string;
  repo: string;
  desc: string;
  image: string;
  status: 'SHIPPED' | 'PROTOTYPE' | 'EXPERIMENT' | 'ARCHIVED' | 'MAINTENANCE';
  date: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'ai' | 'web3' | 'creative' | 'audio' | 'hardware' | 'language' | 'spatial' | 'tooling';
  level: TechLevel;
  description: string;
  version: string;
  operationalStatus: string;
  ecosystemMaturity: string;
  adoption: string;
  deploymentConfidence: string;
  features: TechFeature[];
  philosophy: string[];
  projects: Project[];
  proficiency: number;
  cert?: { label: string; bg: string };
  yearsActive: number;
}

export const categoryColors: Record<string, { pri: string, sec: string }> = {
  frontend: { pri: '#f59e0b', sec: '#00f0ff' }, // Amber
  backend: { pri: '#3b82f6', sec: '#00f0ff' },  // Azure
  devops: { pri: '#ef4444', sec: '#ff006e' },   // Red
  design: { pri: '#00f0ff', sec: '#ff006e' },   // Cyan
  ai: { pri: '#a855f7', sec: '#00f0ff' },       // Violet
  web3: { pri: '#10b981', sec: '#00f0ff' },     // Matrix Green
  creative: { pri: '#00b8ff', sec: '#00ffff' },
  audio: { pri: '#ffaa00', sec: '#ffff00' },
  hardware: { pri: '#ff5500', sec: '#ffaa00' },
  language: { pri: '#aa00aa', sec: '#ff00ff' },
  spatial: { pri: '#88ff00', sec: '#aaff00' },
  tooling: { pri: '#00ff55', sec: '#55ff55' }
};

export const levelColors: Record<string, string> = {
  expert: '#f59e0b', 
  advanced: '#3b82f6', 
  proficient: '#10b981', 
};

const rawData = [
  { cat: 'frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { cat: 'backend', tools: ['Node.js', 'Express', 'GraphQL', 'MongoDB', 'PostgreSQL'] },
  { cat: 'devops', tools: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'AWS / GCP', 'Terraform'] },
  { cat: 'design', tools: ['Figma', 'Adobe Creative Suite', 'Storybook', 'Zeplin', 'Design Systems'] },
  { cat: 'ai', tools: ['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI API', 'HuggingFace'] },
  { cat: 'web3', tools: ['Solidity', 'Hardhat', 'Ethers.js', 'IPFS', 'Wagmi'] },
  { cat: 'creative', tools: ['Three.js', 'React Three Fiber', 'WebGL', 'GLSL', 'p5.js'] },
  { cat: 'audio', tools: ['Web Audio API', 'Tone.js', 'Max/MSP', 'SuperCollider'] },
  { cat: 'hardware', tools: ['Arduino', 'ESP32', 'Raspberry Pi', 'Sensors'] },
  { cat: 'language', tools: ['AST & Parsers', 'DSLs', 'LLVM', 'Compilers'] },
  { cat: 'spatial', tools: ['WebXR', 'ARKit', 'Unity WebGL', 'A-Frame'] },
  { cat: 'tooling', tools: ['Cursor', 'Warp', 'Neovim', 'Git Automation'] }
];

export const TECH_DATABASE: Record<string, Partial<TechItem>> = {
  'React': {
    description: 'Emphasizes virtual DOM, concurrent rendering, and high-performance component architecture.',
    features: [
      { name: 'Atomic Design', status: 'DEPLOYED', importance: 95 },
      { name: 'Custom Hooks', status: 'ACTIVE', importance: 90 },
      { name: 'Performance Profiling', status: 'HIGH', importance: 85 }
    ],
    philosophy: [
      'Unidirectional data flow for predictable state management.',
      'Component-driven architecture for robust composability.',
      'Spec: Latency: <16ms (60FPS), Render: Virtualized.'
    ],
    projects: [
      { name: 'Rocky Digital Museum', url: '#', repo: '#', desc: 'Used for modular interface architecture, interactive custom animations, and responsive layouts.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-06' }
    ]
  },
  'TypeScript': {
    description: 'Focuses on type safety, static analysis, and its engineering advantages in large-scale architectures.',
    features: [
      { name: 'Static Typing', status: 'DEPLOYED', importance: 100 },
      { name: 'Interface Design', status: 'ACTIVE', importance: 95 },
      { name: 'Decorators', status: 'HIGH', importance: 80 }
    ],
    philosophy: [
      'Compile-time safety eliminates a completely entire class of runtime errors.',
      'Self-documenting codebase through expressive types.',
      'Spec: Reliability: 99.9%, Type Coverage: 100%.'
    ],
    projects: [
      { name: 'Rocky Digital Museum', url: '#', repo: '#', desc: 'Provides strict complete typing across state events, component props, and API interfaces.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-06' }
    ]
  },
  'Tailwind CSS': {
    description: 'Modern CSS architecture, atomic class names, and rapid UI prototyping.',
    features: [
      { name: 'JIT Engine', status: 'DEPLOYED', importance: 95 },
      { name: 'Responsive Design', status: 'ACTIVE', importance: 90 },
      { name: 'Theming', status: 'HIGH', importance: 85 }
    ],
    philosophy: [
      'Utility-first approach constraints values to a standardized design system.',
      'Enables rapid iteration without context-switching between files.',
      'Spec: Build Time: <50ms, Output: Minimized CSS.'
    ],
    projects: [
      { name: 'Rocky Digital Museum', url: '#', repo: '#', desc: 'Powers the entire neo-brutalist custom theme, responsive token scale, and terminal effects.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-06' }
    ]
  },
  'Framer Motion': {
    description: 'Declarative layout animations, exit states, and spring-driven physical gestures.',
    features: [
      { name: 'AnimatePresence', status: 'DEPLOYED', importance: 90 },
      { name: 'Layout Morphing', status: 'ACTIVE', importance: 85 },
      { name: 'Gesture Handling', status: 'HIGH', importance: 80 }
    ],
    philosophy: [
      'Visual physics over standard cubic transitions.',
      'Provides state-driven tactile feedback across modules.'
    ],
    projects: [
      { name: 'Rocky Digital Museum', url: '#', repo: '#', desc: 'Handles transition thresholds, smooth route entrances, and tactile hover scales.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-06' }
    ]
  },
  'Three.js': {
    description: 'Low-overhead WebGL helper, custom coordinate geometry, and scene rendering.',
    features: [
      { name: 'Custom Shaders', status: 'DEPLOYED', importance: 85 },
      { name: 'Camera Controls', status: 'ACTIVE', importance: 80 }
    ],
    philosophy: [
      'Encapsulates primitive matrices for rapid 3D space prototyping.'
    ],
    projects: [
      { name: 'Interactive Chess Concepts', url: '#', repo: '#', desc: 'Renders interactive modular 3D chess boards and geometric tactical game state visualizations.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', status: 'PROTOTYPE', date: '2026-05' }
    ]
  },
  'Solidity': {
    description: 'EVM-compatible language for secure contract design and consensus parameters.',
    features: [
      { name: 'Token Standards', status: 'DEPLOYED', importance: 95 },
      { name: 'Access Control', status: 'ACTIVE', importance: 90 }
    ],
    philosophy: [
      'Immutability and strict failure states over complex on-chain logic.'
    ],
    projects: [
      { name: 'Web3 Learning Projects', url: '#', repo: '#', desc: 'Self-authored sandbox protocols mapping multi-sig treasury security vaults.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'EXPERIMENT', date: '2026-04' }
    ]
  },
  'OpenAI API': {
    description: 'Enterprise API integration for deep thinking LLMs, vector embedding, and assistant models.',
    features: [
      { name: 'Model Tuning', status: 'DEPLOYED', importance: 90 },
      { name: 'Function Calling', status: 'ACTIVE', importance: 85 }
    ],
    philosophy: [
      'Empowers direct user intents via scalable tool routing endpoints.'
    ],
    projects: [
      { name: 'AI Assistant Experiments', url: '#', repo: '#', desc: 'Constructing multi-agent decision chains integrating local environmental feedback loops.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', status: 'EXPERIMENT', date: '2026-05' }
    ]
  }
}

export const techStackData: TechItem[] = [];

rawData.forEach(row => {
  row.tools.forEach((tool, idx) => {
    let level: TechLevel = 'proficient';
    if (idx === 0 || idx === 1) level = 'expert';
    else if (idx === 2 || idx === 3) level = 'advanced';
    
    let proficiency = 60;
    if (tool === 'Docker') {
       proficiency = 97;
    } else if (level === 'expert') {
       proficiency = Math.floor(Math.random() * 5) + 95;
    } else if (level === 'advanced') {
       proficiency = Math.floor(Math.random() * 10) + 80;
    } else {
       proficiency = Math.floor(Math.random() * 15) + 65;
    }
    
    let cert: { label: string; bg: string } | undefined;
    if (tool === 'React') cert = { label: 'META FRONTEND', bg: '#0668E1' };
    if (tool === 'AWS / GCP') cert = { label: 'AWS CERTIFIED', bg: '#ff9900' };

    const dbEntry = TECH_DATABASE[tool] || {};

    const categoryFeatures: Record<string, string[]> = {
      frontend: ['COMPONENT ARCHITECTURE', 'STATE MANAGEMENT', 'USER INTERFACES'],
      backend: ['API GATEWAY', 'DATABASE INTEGRATION', 'SCALABLE COMPUTE'],
      devops: ['CONTAINERIZATION', 'CI/CD AUTOMATION', 'INFRASTRUCTURE AS CODE'],
      design: ['DESIGN SYSTEMS', 'USER EXPERIENCE', 'WIREFRAMING'],
      ai: ['MODEL INFERENCE', 'DATA PIPELINES', 'NEURAL NETWORKS'],
      web3: ['SMART CONTRACTS', 'DECENTRALIZED STORAGE', 'CONSENSUS ALGORITHMS'],
      creative: ['WEBGL RENDERING', 'PROCEDURAL GENERATION', 'PARTICLE SYSTEMS'],
      audio: ['SIGNAL PROCESSING', 'SYNTHESIS ENGINE', 'FFT ANALYSIS'],
      hardware: ['FIRMWARE', 'SENSOR INTEGRATION', 'I/O ROUTING'],
      language: ['AST PARSING', 'COMPILER PIPELINE', 'STATIC ANALYSIS'],
      spatial: ['3D CANVAS', 'TRACKING ALGORITHMS', 'SPATIAL AUDIO'],
      tooling: ['WORKFLOW AUTOMATION', 'IDE INTEGRATION', 'VERSION CONTROL']
    };

    const fallbackFeatNames = categoryFeatures[row.cat as string] || ['CORE ARCHITECTURE', 'ASYNC PATTERNS', 'STATE ISOLATION'];

    techStackData.push({
      id: tool.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: tool,
      category: row.cat as any,
      level,
      description: dbEntry.description || `A pivotal subsystem of the operational ${row.cat} architecture. Selected for its high-performance deployment profile and ecosystem maturity. Handles complex ${tool}-specific workflows seamlessly.`,
      version: 'v' + Math.floor(Math.random() * 20) + '.' + Math.floor(Math.random() * 10) + '.0 RC',
      operationalStatus: level === 'expert' ? 'PRIMARY INTERFACE' : level === 'advanced' ? 'SUPPORTING SYSTEM' : 'EXPERIMENTAL',
      ecosystemMaturity: 'HIGH',
      adoption: 'WIDESPREAD',
      deploymentConfidence: level === 'expert' ? '99.9%' : '85.0%',
      features: dbEntry.features || [
         { name: fallbackFeatNames[0], status: 'DEPLOYED', importance: 95 },
         { name: fallbackFeatNames[1], status: 'ACTIVE', importance: 85 },
         { name: fallbackFeatNames[2], status: 'HIGH', importance: 75 },
      ],
      philosophy: dbEntry.philosophy || [
         `Maximizes structural flexibility without compromising ${row.cat} safety.`,
         `Ensures low-friction scalability during high-traffic ${tool} operations.`,
         'Integrates seamlessly with existing orchestration layers.'
      ],
      projects: dbEntry.projects || [
        { name: `${tool.toLowerCase()}-sys-beta`, url: '#', repo: '#', desc: 'Secure data aggregation layer instance.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-01-12' },
        { name: `project-neo-${tool.toLowerCase()}`, url: '#', repo: '#', desc: 'Next-generation user interfaces for AI platforms.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', status: 'PROTOTYPE', date: '2025-11-20' }
      ],
      proficiency,
      cert,
      yearsActive: Math.floor(Math.random() * 6) + 1
    });
  });
});
