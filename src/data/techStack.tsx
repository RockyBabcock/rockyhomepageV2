import React from 'react';
import { 
  Code2, Database, Globe, Cpu, Layers, 
  Box, Braces, Terminal, Server, Layout,
  Zap, Shield, Workflow, Hexagon, Triangle,
  CircleDot, Blocks, Wand2, Component, Brain,
  Sparkles, Smile, LineChart, HardHat, Share2,
  Wallet, Table, FastForward, Container, Ship,
  Cloud, Github, CloudLightning
} from 'lucide-react';

export type TechLevel = 'core' | 'proficient' | 'exploration';

export interface Project {
  name: string;
  url: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'interface' | 'systems' | 'intelligence' | 'web3' | 'creative' | 'design' | 'tooling' | 'research' | 'spatial' | 'audio' | 'hardware' | 'language';
  level: TechLevel;
  icon: React.ReactNode;
  description: string;
  projects: Project[];
  proficiency: number;
  version?: string;
  shipped?: number;
}

export const categoryColors: Record<string, string> = {
  interface: '#ff0055', // Hot Pink
  systems: '#00ccff', // Electric Blue
  intelligence: '#aa00ff', // Plasma Violet
  web3: '#00ff66', // Acid Green
  creative: '#ffcc00', // Solar Yellow
  design: '#ff6600', // Blaze Orange
  tooling: '#ffffff', // Pure White
  research: '#ff00cc', // Magenta Burst
  spatial: '#ff00aa',
  audio: '#00ffaa',
  hardware: '#ffaa00',
  language: '#aa00aa',
};

export const techStackData: TechItem[] = [
  // 01 Interface Engineering
  { id: 'react', name: 'React', category: 'interface', level: 'core', icon: <Layout />, description: 'Frontend UI library', projects: [{ name: 'DeFi Dashboard', url: '#' }], proficiency: 10, version: '19.0.0-rc', shipped: 24 },
  { id: 'nextjs', name: 'Next.js', category: 'interface', level: 'core', icon: <Layers />, description: 'React framework', projects: [{ name: 'Portfolio Site', url: '#' }], proficiency: 9, version: '15.0', shipped: 12 },
  { id: 'typescript', name: 'TypeScript', category: 'interface', level: 'core', icon: <Braces />, description: 'Typed JS', projects: [{ name: 'Web3 Wallet', url: '#' }], proficiency: 10, version: '5.7', shipped: 45 },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'interface', level: 'proficient', icon: <Zap />, description: 'Utility CSS', projects: [{ name: 'Admin Dashboard', url: '#' }], proficiency: 9, version: '3.4', shipped: 30 },
  { id: 'framer-motion', name: 'Framer Motion', category: 'interface', level: 'proficient', icon: <Wand2 />, description: 'Animation library', projects: [{ name: 'Interactive DB', url: '#' }], proficiency: 8, version: '11.0', shipped: 15 },
  { id: 'shadcn', name: 'Shadcn/ui', category: 'interface', level: 'proficient', icon: <Component />, description: 'UI components', projects: [{ name: 'Dashboard', url: '#' }], proficiency: 9, version: '0.8', shipped: 10 },
  { id: 'zustand', name: 'Zustand', category: 'interface', level: 'proficient', icon: <Box />, description: 'State management', projects: [{ name: 'E-commerce', url: '#' }], proficiency: 8, version: '4.5', shipped: 8 },

  // 02 Systems Architecture
  { id: 'nodejs', name: 'Node.js', category: 'systems', level: 'core', icon: <Server />, description: 'JS runtime', projects: [{ name: 'API Gateway', url: '#' }], proficiency: 9, version: '20.x', shipped: 18 },
  { id: 'python', name: 'Python', category: 'systems', level: 'proficient', icon: <Terminal />, description: 'Backend & ML', projects: [{ name: 'Trading Bot', url: '#' }], proficiency: 8, version: '3.12', shipped: 11 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'systems', level: 'core', icon: <Database />, description: 'Relational DB', projects: [{ name: 'User Auth', url: '#' }], proficiency: 9, version: '16', shipped: 20 },
  { id: 'redis', name: 'Redis', category: 'systems', level: 'proficient', icon: <Layers />, description: 'In-memory cache', projects: [{ name: 'Session Cache', url: '#' }], proficiency: 7, version: '7.2', shipped: 14 },
  { id: 'docker', name: 'Docker', category: 'systems', level: 'proficient', icon: <Container />, description: 'Containerization', projects: [{ name: 'Microservices', url: '#' }], proficiency: 8, version: '24.0', shipped: 22 },

  // 03 Machine Intelligence
  { id: 'openai', name: 'OpenAI API', category: 'intelligence', level: 'core', icon: <Sparkles />, description: 'LLM API', projects: [{ name: 'AI Assistant', url: '#' }], proficiency: 9, version: 'v1', shipped: 12 },
  { id: 'gemini', name: 'Gemini API', category: 'intelligence', level: 'proficient', icon: <Brain />, description: 'Google LLM API', projects: [{ name: 'Multimodal Bot', url: '#' }], proficiency: 8, version: 'v1', shipped: 5 },
  { id: 'langchain', name: 'LangChain', category: 'intelligence', level: 'exploration', icon: <Workflow />, description: 'LLM framework', projects: [{ name: 'AI Agent', url: '#' }], proficiency: 7, version: '0.2', shipped: 8 },
  { id: 'pytorch', name: 'PyTorch', category: 'intelligence', level: 'exploration', icon: <Cpu />, description: 'ML framework', projects: [{ name: 'Model Training', url: '#' }], proficiency: 5, version: '2.2', shipped: 2 },
  
  // 04 Decentralized Systems
  { id: 'solidity', name: 'Solidity', category: 'web3', level: 'core', icon: <Hexagon />, description: 'Smart Contracts', projects: [{ name: 'Staking Protocol', url: '#' }], proficiency: 9, version: '^0.8.20', shipped: 14 },
  { id: 'ethers', name: 'Ethers.js', category: 'web3', level: 'proficient', icon: <Globe />, description: 'Web3 provider', projects: [{ name: 'DApp Frontend', url: '#' }], proficiency: 8, version: '6.0', shipped: 10 },
  { id: 'hardhat', name: 'Hardhat', category: 'web3', level: 'proficient', icon: <HardHat />, description: 'Ethereum dev env', projects: [{ name: 'Token Launch', url: '#' }], proficiency: 8, version: '2.19', shipped: 8 },
  { id: 'ipfs', name: 'IPFS', category: 'web3', level: 'exploration', icon: <Share2 />, description: 'Decentralized storage', projects: [{ name: 'NFT Metadata', url: '#' }], proficiency: 6, version: 'v0.20', shipped: 5 },

  // 05 Creative Computing
  { id: 'threejs', name: 'Three.js', category: 'creative', level: 'proficient', icon: <Triangle />, description: '3D library', projects: [{ name: '3D Portfolio', url: '#' }], proficiency: 7, version: 'r160', shipped: 4 },
  { id: 'webgl', name: 'WebGL', category: 'creative', level: 'exploration', icon: <CircleDot />, description: 'Graphics API', projects: [], proficiency: 5, version: '2.0', shipped: 1 },
  { id: 'glsl', name: 'GLSL', category: 'creative', level: 'exploration', icon: <Code2 />, description: 'Shader language', projects: [], proficiency: 4, version: '300 es', shipped: 1 },
  
  // 06 Design Operations
  { id: 'figma', name: 'Figma', category: 'design', level: 'core', icon: <Layout />, description: 'Design tool', projects: [{ name: 'Design System', url: '#' }], proficiency: 10, version: 'Stable', shipped: 50 },
  { id: 'storybook', name: 'Storybook', category: 'design', level: 'proficient', icon: <Blocks />, description: 'UI explorer', projects: [{ name: 'Component Lib', url: '#' }], proficiency: 8, version: '8.0', shipped: 6 },
  
  // 07 Tooling & Automation
  { id: 'cursor', name: 'Cursor', category: 'tooling', level: 'core', icon: <Terminal />, description: 'AI Code Editor', projects: [{ name: 'Every project', url: '#' }], proficiency: 9, version: '0.30', shipped: 100 },
  { id: 'git', name: 'Git', category: 'tooling', level: 'core', icon: <Github />, description: 'Version control', projects: [], proficiency: 10, version: '2.40', shipped: 200 },
  { id: 'github-actions', name: 'GitHub Actions', category: 'tooling', level: 'proficient', icon: <Workflow />, description: 'CI/CD', projects: [], proficiency: 8, version: 'v3', shipped: 40 },
  { id: 'vercel', name: 'Vercel', category: 'tooling', level: 'core', icon: <Triangle />, description: 'Edge network', projects: [], proficiency: 9, version: 'CLI', shipped: 50 },

  // 08 Research & Experiment
  { id: 'rust', name: 'Rust', category: 'research', level: 'exploration', icon: <Triangle />, description: 'Systems programming', projects: [{ name: 'High-perf Indexer', url: '#' }], proficiency: 6, version: '1.75', shipped: 2 },
  { id: 'zig', name: 'Zig', category: 'research', level: 'exploration', icon: <Zap />, description: 'Systems language', projects: [], proficiency: 3, version: '0.11', shipped: 0 },
  { id: 'bun', name: 'Bun', category: 'research', level: 'exploration', icon: <Box />, description: 'JS Runtime', projects: [], proficiency: 7, version: '1.0', shipped: 3 },
];
