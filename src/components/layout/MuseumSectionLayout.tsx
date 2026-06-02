import React from "react";
import { museumSections } from "@/data/museumSections";
import { HallHeader } from "@/components/HallHeader";
import { SectionContainer } from "./SectionContainer";

type MuseumSectionLayoutProps = {
  sectionId: string;
  children: React.ReactNode;
};

export function MuseumSectionLayout({
  sectionId,
  children,
}: MuseumSectionLayoutProps) {
  const section = museumSections.find((item) => item.id === sectionId);

  if (!section) return null;

  return (
    <SectionContainer className="relative py-24 md:py-32">
      <section id={section.id} aria-labelledby={`heading-` + section.id}>
        <HallHeader
          id={`heading-` + section.id}
          code={section.code}
          title={section.title}
          subtitle={section.subtitle}
          status={section.status}
          category={section.category}
        />

        <div className="mt-10">{children}</div>
      </section>
    </SectionContainer>
  );
}
