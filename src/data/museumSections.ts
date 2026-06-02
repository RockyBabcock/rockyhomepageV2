import { MuseumSection } from "@/types/museum";

export type MuseumSectionStatus =
  | "Active"
  | "Experimental"
  | "Learning Archive"
  | "Personal Archive"
  | "Simulation"
  | "Sealed";

export const museumSections: MuseumSection[] = [
  {
    id: "entrance",
    code: "HALL 00",
    title: "Entrance Hall",
    subtitle: "Identity, mission, availability, and professional signal.",
    status: "Active",
    category: "Identity",
  },
  {
    id: "projects",
    code: "HALL 01",
    title: "Project Laboratory",
    subtitle: "Selected builds and prototypes that show how I design, structure, and implement web interfaces.",
    status: "Active",
    category: "Proof of Work",
  },
  {
    id: "forge",
    code: "HALL 02",
    title: "The Forge",
    subtitle: "A living map of the tools I use, the systems I am learning, and the projects that prove them.",
    status: "Active",
    category: "Capabilities",
  },
  {
    id: "experiments",
    code: "HALL 03",
    title: "Experiment Chambers",
    subtitle:
      "Interface experiments for AI-native workflows, prompt systems, agents, and creative tools.",
    status: "Experimental",
    category: "Experiments",
  },
  {
    id: "archives",
    code: "HALL 04",
    title: "Personal Archives",
    subtitle:
      "Strategic thinking, movement, media, timeline, and memory systems.",
    status: "Personal Archive",
    category: "Identity Systems",
  },
  {
    id: "garden",
    code: "HALL 05",
    title: "Digital Garden",
    subtitle: "Notes, essays, fragments, and reflections from the systems I build and the worlds I study.",
    status: "Active",
    category: "Writing",
  },
  {
    id: "signal",
    code: "HALL 06",
    title: "Signal Room",
    subtitle: "The route ends here. Open a channel for collaboration, project discussion, or contact.",
    status: "Active",
    category: "Contact",
  },
];
