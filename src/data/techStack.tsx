import React from "react";

export type SkillLevel =
  | "Exploring"
  | "Learning"
  | "Comfortable"
  | "Advanced"
  | "Primary Tool"
  | "core"
  | "proficient"
  | "exploration"
  | string;

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
    | "tooling"
    | string;
  level: SkillLevel;
  description: string;
  evidence: string[];
  usedIn: string[];
  learningFocus?: string;
  version?: string;
  operationalStatus?: string;
  adoption?: string;
  deploymentConfidence?: string;
  philosophy?: string[];
  proficiency?: number;
  projects?: { name?: string; url?: string; [key: string]: any }[];
  icon?: any;
}

export const categoryColors: Record<string, { pri: string; sec: string }> = {
  frontend: { pri: "#FF9F1C", sec: "#FFE66D" }, // warm creation
  backend: { pri: "#3A86FF", sec: "#00C2FF" }, // system logic
  devops: { pri: "#FF4D6D", sec: "#FF9F1C" }, // infrastructure/fire
  design: { pri: "#FF006E", sec: "#8338EC" }, // visual imagination
  ai: { pri: "#8338EC", sec: "#00C2FF" }, // intelligence
  web3: { pri: "#06D6A0", sec: "#3A86FF" }, // network/value
  creative: { pri: "#00C2FF", sec: "#FF006E" }, // generative media
  audio: { pri: "#FFE66D", sec: "#FF9F1C" }, // sound/wave
  hardware: { pri: "#FF6B35", sec: "#06D6A0" }, // physical computing
  language: { pri: "#C77DFF", sec: "#FF006E" }, // abstraction
  spatial: { pri: "#80FFDB", sec: "#3A86FF" }, // space/XR
  tooling: { pri: "#06D6A0", sec: "#FFE66D" }, // productivity
};

export const levelColors: Record<string, string> = {
  "Primary Tool": "#FF9F1C",
  Advanced: "#3A86FF",
  Comfortable: "#06D6A0",
  Learning: "#8338EC",
  Exploring: "#94A3B8",
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
