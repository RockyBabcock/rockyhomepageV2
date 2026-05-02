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
  category: 'frontend' | 'backend' | 'web3' | 'ai' | 'tools' | 'devops';
  level: TechLevel;
  icon: React.ReactNode;
  description: string;
  projects: Project[];
  proficiency: number; // 1-10
}

export const categoryColors: Record<string, string> = {
  frontend: '#00B2A9', // Blue
  backend: '#C17A53', // Terracotta
  web3: '#10B981', // Green
  ai: '#8B5CF6', // Purple
  tools: '#6B7280', // Gray
  devops: '#F59E0B', // Amber
};

export const techStackData: TechItem[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', level: 'core', icon: <Layout />, description: 'A JavaScript library for building user interfaces.', projects: [{ name: 'DeFi Dashboard', url: '#' }, { name: 'NFT Marketplace', url: '#' }], proficiency: 9 },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', level: 'core', icon: <Braces />, description: 'Strongly typed programming language that builds on JavaScript.', projects: [{ name: 'Web3 Wallet', url: '#' }, { name: 'Analytics Platform', url: '#' }], proficiency: 9 },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', level: 'proficient', icon: <Layers />, description: 'The React Framework for the Web.', projects: [{ name: 'Portfolio Site', url: '#' }, { name: 'Blog', url: '#' }], proficiency: 8 },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', level: 'proficient', icon: <Zap />, description: 'A utility-first CSS framework for rapid UI development.', projects: [{ name: 'Component Library', url: '#' }], proficiency: 9 },
  { id: 'framer-motion', name: 'Framer Motion', category: 'frontend', level: 'proficient', icon: <Wand2 />, description: 'Production-ready motion library for React.', projects: [{ name: 'Interactive Portfolio', url: '#' }], proficiency: 8 },
  { id: 'zustand', name: 'Zustand', category: 'frontend', level: 'proficient', icon: <Box />, description: 'A small, fast and scalable bearbones state-management solution.', projects: [{ name: 'E-commerce App', url: '#' }], proficiency: 8 },
  { id: 'shadcn-ui', name: 'shadcn/ui', category: 'frontend', level: 'proficient', icon: <Component />, description: 'Beautifully designed components that you can copy and paste into your apps.', projects: [{ name: 'Admin Dashboard', url: '#' }], proficiency: 9 },

  // AI / ML
  { id: 'python', name: 'Python', category: 'ai', level: 'core', icon: <Terminal />, description: 'Versatile language for backend and AI development.', projects: [{ name: 'AI Trading Bot', url: '#' }, { name: 'Data Pipeline', url: '#' }], proficiency: 9 },
  { id: 'pytorch', name: 'PyTorch', category: 'ai', level: 'exploration', icon: <Cpu />, description: 'An open source machine learning framework that accelerates the path from research prototyping to production deployment.', projects: [{ name: 'Model Training', url: '#' }], proficiency: 4 },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai', level: 'exploration', icon: <Brain />, description: 'End-to-end open source machine learning platform.', projects: [{ name: 'Image Classifier', url: '#' }], proficiency: 3 },
  { id: 'openai', name: 'OpenAI', category: 'ai', level: 'core', icon: <Sparkles />, description: 'API for accessing state-of-the-art AI models like GPT-4.', projects: [{ name: 'AI Assistant', url: '#' }], proficiency: 8 },
  { id: 'langchain', name: 'LangChain', category: 'ai', level: 'exploration', icon: <Workflow />, description: 'Framework for developing applications powered by language models.', projects: [{ name: 'AI Agent', url: '#' }], proficiency: 5 },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai', level: 'proficient', icon: <Smile />, description: 'The AI community building the future.', projects: [{ name: 'NLP Pipeline', url: '#' }], proficiency: 6 },
  { id: 'scikit-learn', name: 'scikit-learn', category: 'ai', level: 'exploration', icon: <LineChart />, description: 'Machine Learning in Python.', projects: [{ name: 'Predictive Model', url: '#' }], proficiency: 5 },

  // Web3
  { id: 'solidity', name: 'Solidity', category: 'web3', level: 'core', icon: <Hexagon />, description: 'Object-oriented language for writing smart contracts.', projects: [{ name: 'Staking Protocol', url: '#' }, { name: 'DAO Governance', url: '#' }], proficiency: 8 },
  { id: 'rust', name: 'Rust', category: 'web3', level: 'proficient', icon: <Triangle />, description: 'A language empowering everyone to build reliable and efficient software.', projects: [{ name: 'High-perf Indexer', url: '#' }], proficiency: 6 },
  { id: 'ethers', name: 'Ethers.js', category: 'web3', level: 'proficient', icon: <Globe />, description: 'A complete and compact library for interacting with the Ethereum Blockchain.', projects: [{ name: 'DApp Frontend', url: '#' }], proficiency: 8 },
  { id: 'foundry', name: 'Foundry', category: 'web3', level: 'exploration', icon: <Shield />, description: 'A blazing fast, portable and modular toolkit for Ethereum application development.', projects: [{ name: 'Smart Contract Tests', url: '#' }], proficiency: 5 },
  { id: 'hardhat', name: 'Hardhat', category: 'web3', level: 'proficient', icon: <HardHat />, description: 'Ethereum development environment for professionals.', projects: [{ name: 'Token Launch', url: '#' }], proficiency: 7 },
  { id: 'ipfs', name: 'IPFS', category: 'web3', level: 'exploration', icon: <Share2 />, description: 'A peer-to-peer hypermedia protocol.', projects: [{ name: 'Decentralized Storage', url: '#' }], proficiency: 4 },
  { id: 'walletconnect', name: 'WalletConnect', category: 'web3', level: 'proficient', icon: <Wallet />, description: 'Open protocol for connecting wallets to Dapps.', projects: [{ name: 'Web3 Login', url: '#' }], proficiency: 7 },

  // Data / Backend
  { id: 'postgresql', name: 'PostgreSQL', category: 'backend', level: 'proficient', icon: <Database />, description: 'Powerful, open source object-relational database system.', projects: [{ name: 'User Service', url: '#' }], proficiency: 7 },
  { id: 'mongodb', name: 'MongoDB', category: 'backend', level: 'exploration', icon: <Database />, description: 'A document-based, distributed database built for modern application developers.', projects: [{ name: 'Log Storage', url: '#' }], proficiency: 5 },
  { id: 'redis', name: 'Redis', category: 'backend', level: 'proficient', icon: <Layers />, description: 'In-memory data structure store, used as a database, cache, and message broker.', projects: [{ name: 'Session Cache', url: '#' }], proficiency: 6 },
  { id: 'pandas', name: 'Pandas', category: 'backend', level: 'exploration', icon: <Table />, description: 'Fast, powerful, flexible and easy to use open source data analysis and manipulation tool.', projects: [{ name: 'Data Analysis', url: '#' }], proficiency: 5 },
  { id: 'prisma', name: 'Prisma', category: 'backend', level: 'proficient', icon: <Triangle />, description: 'Next-generation Node.js and TypeScript ORM.', projects: [{ name: 'API Backend', url: '#' }], proficiency: 7 },
  { id: 'nodejs', name: 'Node.js', category: 'backend', level: 'core', icon: <Server />, description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.', projects: [{ name: 'API Gateway', url: '#' }, { name: 'Realtime Chat', url: '#' }], proficiency: 8 },
  { id: 'express', name: 'Express', category: 'backend', level: 'proficient', icon: <FastForward />, description: 'Fast, unopinionated, minimalist web framework for Node.js.', projects: [{ name: 'REST API', url: '#' }], proficiency: 8 },

  // DevOps / Deployment
  { id: 'docker', name: 'Docker', category: 'devops', level: 'core', icon: <Container />, description: 'Platform for developing, shipping, and running applications in containers.', projects: [{ name: 'Microservices', url: '#' }], proficiency: 8 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', level: 'exploration', icon: <Ship />, description: 'Production-Grade Container Orchestration.', projects: [{ name: 'Cluster Setup', url: '#' }], proficiency: 4 },
  { id: 'aws', name: 'AWS', category: 'devops', level: 'proficient', icon: <Cloud />, description: 'Comprehensive and broadly adopted cloud platform.', projects: [{ name: 'Cloud Infrastructure', url: '#' }], proficiency: 6 },
  { id: 'vercel', name: 'Vercel', category: 'devops', level: 'core', icon: <Triangle />, description: 'Platform for frontend frameworks and static sites.', projects: [{ name: 'Frontend Deployment', url: '#' }], proficiency: 9 },
  { id: 'github-actions', name: 'GitHub Actions', category: 'devops', level: 'proficient', icon: <Github />, description: 'Automate your workflow from idea to production.', projects: [{ name: 'CI/CD Pipeline', url: '#' }], proficiency: 7 },
  { id: 'cloudflare', name: 'Cloudflare', category: 'devops', level: 'proficient', icon: <CloudLightning />, description: 'Web performance and security company.', projects: [{ name: 'DNS & CDN', url: '#' }], proficiency: 6 },
  { id: 'supabase', name: 'Supabase', category: 'devops', level: 'proficient', icon: <Database />, description: 'The open source Firebase alternative.', projects: [{ name: 'Backend as a Service', url: '#' }], proficiency: 7 },
];
