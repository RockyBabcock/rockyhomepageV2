import React from "react";

export type SkillLevel =
  | "Exploring"
  | "Learning"
  | "Comfortable"
  | "Advanced"
  | "Primary Tool";

export interface TechItem {
  id: string;
  name: string;
  category:
    | "frontend"
    | "backend"
    | "devops"
    | "design"
    | "ai"
    | "web3"
    | "creative"
    | "audio"
    | "hardware"
    | "language"
    | "spatial"
    | "tooling";
  level: SkillLevel;
  description: string;
  evidence: string[];
  usedIn: string[];
  learningFocus?: string;
}

export const categoryColors: Record<string, { pri: string; sec: string }> = {
  frontend: { pri: "#f59e0b", sec: "#00f0ff" }, // Amber
  backend: { pri: "#3b82f6", sec: "#00f0ff" }, // Azure
  devops: { pri: "#ef4444", sec: "#ff006e" }, // Red
  design: { pri: "#00f0ff", sec: "#ff006e" }, // Cyan
  ai: { pri: "#a855f7", sec: "#00f0ff" }, // Violet
  web3: { pri: "#10b981", sec: "#00f0ff" }, // Matrix Green
  creative: { pri: "#00b8ff", sec: "#00ffff" },
  audio: { pri: "#ffaa00", sec: "#ffff00" },
  hardware: { pri: "#ff5500", sec: "#ffaa00" },
  language: { pri: "#aa00aa", sec: "#ff00ff" },
  spatial: { pri: "#88ff00", sec: "#aaff00" },
  tooling: { pri: "#00ff55", sec: "#55ff55" },
};

export const levelColors: Record<string, string> = {
  "Primary Tool": "#f59e0b",
  Advanced: "#3b82f6",
  Comfortable: "#10b981",
  Learning: "#a855f7",
  Exploring: "#94a3b8",
};

const rawData = [
  {
    cat: "frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    cat: "backend",
    tools: ["Node.js", "Express", "GraphQL", "MongoDB", "PostgreSQL"],
  },
  {
    cat: "devops",
    tools: [
      "Docker",
      "Kubernetes",
      "CI/CD Pipelines",
      "AWS / GCP",
      "Terraform",
    ],
  },
  {
    cat: "design",
    tools: [
      "Figma",
      "Adobe Creative Suite",
      "Storybook",
      "Zeplin",
      "Design Systems",
    ],
  },
  {
    cat: "ai",
    tools: ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "HuggingFace"],
  },
  { cat: "web3", tools: ["Solidity", "Hardhat", "Ethers.js", "IPFS", "Wagmi"] },
  {
    cat: "creative",
    tools: ["Three.js", "React Three Fiber", "WebGL", "GLSL", "p5.js"],
  },
  {
    cat: "audio",
    tools: ["Web Audio API", "Tone.js", "Max/MSP", "SuperCollider"],
  },
  { cat: "hardware", tools: ["Arduino", "ESP32", "Raspberry Pi", "Sensors"] },
  { cat: "language", tools: ["AST & Parsers", "DSLs", "LLVM", "Compilers"] },
  { cat: "spatial", tools: ["WebXR", "ARKit", "Unity WebGL", "A-Frame"] },
  { cat: "tooling", tools: ["Cursor", "Warp", "Neovim", "Git Automation"] },
];

export const TECH_DATABASE: Record<string, Partial<TechItem>> = {
  React: {
    level: "Primary Tool",
    description:
      "Component architecture, interaction design, frontend systems.",
    evidence: [
      "Built modular homepage architecture",
      "Created reusable interface modules",
      "Managed component-level interaction logic",
    ],
    usedIn: ["Rocky Homepage V2", "AI Assistant Experiments"],
    learningFocus:
      "Better state organization, lazy loading, cleaner component boundaries",
  },
  TypeScript: {
    level: "Primary Tool",
    description: "Type safety, state predictability, interface scaling.",
    evidence: [
      "Typed data pipelines and dynamic props",
      "Integrated strict enums for status and module modes",
      "Enforced component logic contracts",
    ],
    usedIn: ["Rocky Homepage V2", "AI Assistant Experiments"],
  },
  "Tailwind CSS": {
    level: "Primary Tool",
    description: "Rapid structural design and interaction aesthetics.",
    evidence: [
      "Created neo-brutalist dark terminal visual system",
      "Implemented responsive token scales",
      "Crafted component micro-interactions",
    ],
    usedIn: ["Rocky Homepage V2"],
  },
  Solidity: {
    level: "Learning",
    description: "EVM smart contract design and consensus modeling.",
    evidence: [
      "Studying wallet UX, ownership models, and decentralized patterns",
      "Self-authored basic security vaults",
    ],
    usedIn: ["Web3 Archive Vault"],
    learningFocus: "Smart contracts, wallet interactions, on-chain identity",
  },
  "OpenAI API": {
    level: "Learning",
    description: "API integration for deep thinking and agent routing.",
    evidence: [
      "Integrating model inference into frontend concepts",
      "Exploring tool formulation schemas",
    ],
    usedIn: ["AI Assistant Experiments"],
    learningFocus:
      "Function calling robustness and continuous context management",
  },
};

export const techStackData: TechItem[] = [];

rawData.forEach((row) => {
  row.tools.forEach((tool, idx) => {
    let level: SkillLevel = "Comfortable";
    if (idx === 0 || idx === 1) level = "Primary Tool";
    else if (idx === 2 || idx === 3) level = "Advanced";
    else if (idx >= 4) level = "Exploring";

    const dbEntry = TECH_DATABASE[tool] || {};

    techStackData.push({
      id: tool.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: tool,
      category: row.cat as any,
      level: dbEntry.level || level,
      description:
        dbEntry.description ||
        `Learning and applying ${tool} for specialized ${row.cat} workloads.`,
      evidence: dbEntry.evidence || [
        `Used as part of exploratory ${row.cat} builds.`,
      ],
      usedIn: dbEntry.usedIn || [`Various local prototypes.`],
      learningFocus: dbEntry.learningFocus || undefined,
    });
  });
});
