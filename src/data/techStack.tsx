import React from 'react';

export type TechLevel = 'expert' | 'advanced' | 'proficient';

export interface Project {
  name: string;
  url: string;
  repo: string;
  desc: string;
  image: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'ai' | 'web3' | 'creative' | 'audio' | 'hardware' | 'language' | 'spatial' | 'tooling';
  level: TechLevel;
  description: string;
  projects: Project[];
  proficiency: number;
}

export const categoryColors: Record<string, string> = {
  expert: '#B08A52', // Gold
  advanced: '#D98F5A', // Copper
  proficient: '#7AA1C1' // Ice
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
    if (level === 'expert') proficiency = Math.floor(Math.random() * 5) + 95;
    else if (level === 'advanced') proficiency = Math.floor(Math.random() * 10) + 80;
    else proficiency = Math.floor(Math.random() * 15) + 65;
    
    techStackData.push({
      id: tool.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: tool,
      category: row.cat as any,
      level,
      description: 'Used extensively in production and experimental scenarios to achieve high-performance results.',
      projects: [
        { name: 'sys-layer-beta', url: '#', repo: '#', desc: 'A complex data layer built from scratch.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80' },
        { name: 'project-neo', url: '#', repo: '#', desc: 'Next-generation user interfaces for AI platforms.', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80' }
      ],
      proficiency
    });
  });
});
