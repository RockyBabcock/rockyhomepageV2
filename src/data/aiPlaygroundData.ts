export interface AIExperiment {
  id: string;
  title: string;
  label: string;
  description: string;
}

export const aiPlaygroundData: AIExperiment[] = [
  {
    id: "prompt-eng",
    title: "Prompt Engineering",
    label: "Iteration Lab",
    description:
      "Before / after prompts, structure, clarity, and output testing.",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    label: "Workflow",
    description:
      "Planning modular assistants for research, coding, and task support.",
  },
  {
    id: "dl-notes",
    title: "Deep Learning Notes",
    label: "Learning",
    description:
      "Neural networks, embeddings, model behavior, and training concepts.",
  },
  {
    id: "ai-coding",
    title: "AI Coding Workflow",
    label: "Builder Mode",
    description:
      "Stitch, AI Studio, Antigravity, and prompt-to-code workflows.",
  },
];
