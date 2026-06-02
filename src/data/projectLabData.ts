export type ProjectStatus =
  | "Shipped"
  | "Active Build"
  | "Prototype"
  | "Learning Archive"
  | "Concept";

export interface ProjectEntry {
  id: string;
  title: string;
  oneLine: string;
  role: string;
  status: ProjectStatus;
  techStack: string[];
  problem: string;
  built: string[];
  learned: string[];
  limitations?: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projectLabData: ProjectEntry[] = [
  {
    id: "rocky-homepage-v2",
    title: "Rocky Homepage V2",
    oneLine: "A personal digital museum combining portfolio, archive, experiments, and interactive identity.",
    role: "Designer / Frontend Developer",
    status: "Active Build",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Motion"],
    problem: "Most personal portfolios feel too generic and fail to express technical identity and creative taste.",
    built: [
      "Designed a museum-style homepage structure",
      "Created modular sections for projects, skills, archives, AI, Web3, and personal systems",
      "Built a dark terminal-inspired visual system",
      "Implemented interactive modules and animated UI details"
    ],
    learned: [
      "How to organize a dense homepage without making it feel random",
      "How to balance professional proof and personal expression",
      "How to structure React modules for a long-form interactive homepage"
    ],
    limitations: [
      "Some modules are still being converted from concept to evidence-based content",
      "Analytics and skill data need to be connected to real sources"
    ],
    liveUrl: "https://rockybabcock.fun",
    repoUrl: "https://github.com/RockyBabcock/rockyhomepageV2"
  },
  {
    id: "ai-assistant",
    title: "AI Assistant Experiments",
    oneLine: "An interface concept for experimenting with AI-assisted workflows.",
    role: "Developer",
    status: "Prototype",
    techStack: ["Prompting", "LLMs", "Agents"],
    problem: "Exploring how AI agents can interact with human intent seamlessly.",
    built: [
      "Constructed multi-agent decision chains",
      "Explored tool formulation schemas"
    ],
    learned: [
      "AI tools need clear boundaries, context, and visible state."
    ],
    limitations: [
      "Connect the interface to real API flows and add saved experiment logs."
    ]
  },
  {
    id: "interactive-chess",
    title: "Interactive Chess Concepts",
    oneLine: "Rendered interactive modular 3D chess boards and geometric tactical game state visualizations.",
    role: "Developer",
    status: "Concept",
    techStack: ["Chess.com API", "Three.js", "LocalStorage"],
    problem: "Creating an engaging and strategic online chess representation.",
    built: [
      "Modular 3D chess board environment",
      "Visual geometry mapping of potential maneuvers"
    ],
    learned: [
      "Chess provides a useful metaphor for interface design: every move changes the available system state."
    ]
  },
  {
    id: "web3-learning",
    title: "Web3 Learning Projects",
    oneLine: "A visual archive for Web3 concepts, wallet interaction patterns, and ownership models.",
    role: "Explorer",
    status: "Learning Archive",
    techStack: ["Solidity", "Foundry", "Wallet UX"],
    problem: "Understanding decentralization primitives and multi-signature operations.",
    built: [
      "Self-authored sandbox protocols mapping multi-sig treasury security vaults.",
      "Documented wallet connection UX concepts."
    ],
    learned: [
      "Web3 interfaces often fail because they hide too much complexity or expose too much too early."
    ],
    limitations: [
      "Needs a small wallet-connected prototype to demonstrate interaction flow."
    ]
  }
];

