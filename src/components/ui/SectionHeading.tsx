import React from "react";

export const SectionHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h2 className="flex items-center gap-6 text-4xl md:text-[64px] font-black tracking-[0.12em] text-ink dark:text-white mb-12 uppercase">
      <span className="inline-block h-10 w-2 md:h-16 md:w-3 bg-[#FF00FF] shadow-[0_0_12px_#FF00FF]"></span>
      {title}
    </h2>
  );
};
