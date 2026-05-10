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

    techStackData.push({
      id: tool.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: tool,
      category: row.cat as any,
      level,
      description: 'A pivotal element of the operational architecture, selected for its ecosystem maturity and robust deployment profile. This framework allows for high-velocity iterations while maintaining rigorous type safety and operational boundaries.',
      version: 'v' + Math.floor(Math.random() * 20) + '.' + Math.floor(Math.random() * 10) + '.0 RC',
      operationalStatus: level === 'expert' ? 'PRIMARY INTERFACE' : level === 'advanced' ? 'SUPPORTING SYSTEM' : 'EXPERIMENTAL',
      ecosystemMaturity: 'HIGH',
      adoption: 'WIDESPREAD',
      deploymentConfidence: level === 'expert' ? '99.9%' : '85.0%',
      features: [
         { name: 'COMPONENT ARCHITECTURE', status: 'DEPLOYED', importance: 95 },
         { name: 'ASYNC PATTERNS', status: 'ACTIVE', importance: 80 },
         { name: 'STATE ISOLATION', status: 'HIGH', importance: 90 },
      ],
      philosophy: [
         'Maximizes structural flexibility without compromising type safety.',
         'Ensures low-friction scalability during high-traffic events.',
         'Integrates seamlessly with existing CI/CD orchestration layer.'
      ],
      projects: [
        { name: 'sys-layer-beta', url: '#', repo: '#', desc: 'Secure data aggregation layer.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80', status: 'SHIPPED', date: '2026-01-12' },
        { name: 'project-neo', url: '#', repo: '#', desc: 'Next-generation user interfaces for AI platforms.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80', status: 'PROTOTYPE', date: '2025-11-20' }
      ],
      proficiency,
      cert,
      yearsActive: Math.floor(Math.random() * 6) + 1
    });
  });
});
