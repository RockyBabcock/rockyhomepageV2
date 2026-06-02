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
    subtitle: "Selected builds, prototypes, and proof-of-work.",
    status: "Active",
    category: "Proof of Work",
  },
  {
    id: "forge",
    code: "HALL 02",
    title: "The Forge",
    subtitle: "Tools, systems, and technical habits behind the work.",
    status: "Active",
    category: "Capabilities",
  },
  {
    id: "experiments",
    code: "HALL 03",
    title: "Experiment Chambers",
    subtitle:
      "AI-native interfaces, Web3 learning, and physical-world systems.",
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
    subtitle: "Writing, notes, reflections, and long-term thinking.",
    status: "Active",
    category: "Writing",
  },
  {
    id: "signal",
    code: "HALL 06",
    title: "Signal Room",
    subtitle: "Contact, collaboration, and external channels.",
    status: "Active",
    category: "Contact",
  },
];
