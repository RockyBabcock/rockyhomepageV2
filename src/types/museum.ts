import { MuseumSectionStatus } from "@/data/museumSections";

export interface MuseumSection {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  status: MuseumSectionStatus;
  category: string;
}
