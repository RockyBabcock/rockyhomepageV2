import React from "react";
import { museumSections } from "@/data/museumSections";
import { HallHeader } from "@/components/HallHeader";

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
    <section id={section.id} aria-labelledby={`heading-` + section.id} className="relative py-20">
      <HallHeader
        id={`heading-` + section.id}
        code={section.code}
        title={section.title}
        subtitle={section.subtitle}
        status={section.status}
        category={section.category}
      />

      <div className="mt-8">{children}</div>
    </section>
  );
}
