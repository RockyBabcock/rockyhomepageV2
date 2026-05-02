export interface ProjectEntry {
  id: string;
  title: string;
  status: "Building" | "Exploring" | "Prototype" | "Learning";
  techChips: string[];
  progress: number;
}

export const projectLabData: ProjectEntry[] = [
  {
    id: "personal-homepage",
    title: "Personal Homepage V2",
    status: "Building",
    techChips: ["React", "TypeScript", "Tailwind"],
    progress: 70,
  },
  {
    id: "ai-assistant",
    title: "AI Assistant Experiments",
    status: "Exploring",
    techChips: ["Prompting", "LLMs", "Agents"],
    progress: 45,
  },
  {
    id: "interactive-chess",
    title: "Interactive Chess Concepts",
    status: "Prototype",
    techChips: ["Chess.com API", "Three.js", "LocalStorage"],
    progress: 35,
  },
  {
    id: "web3-learning",
    title: "Web3 Learning Projects",
    status: "Learning",
    techChips: ["Solidity", "Foundry", "Wallet UX"],
    progress: 30,
  },
];
