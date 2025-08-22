import React from "react";
import Image from "next/image";
import { SKILLS } from "@/constants/skills";

const Skills = () => {
  // Split skills into two rows
  const midPoint = Math.ceil(SKILLS.length / 2);
  const firstRow = SKILLS.slice(0, midPoint);
  const secondRow = SKILLS.slice(midPoint);

  const SkillCard = ({ skill }) => (
    <div className="group flex min-w-[120px] flex-shrink-0 flex-col items-center p-3 transition-all duration-300 hover:scale-105 md:min-w-[140px] md:p-4">
      {/* Logo */}
      <div className="mb-3 flex h-40 w-32 flex-col items-center justify-center rounded-xl border border-gray-800 bg-[#1a1a1a] transition-all duration-300 group-hover:border-gray-600 group-hover:bg-gray-700 group-hover:shadow-lg md:h-44 md:w-36 lg:h-48 lg:w-40">
        <div className="relative mb-4 h-16 w-16 md:h-18 md:w-18 lg:h-20 lg:w-20">
          <Image
            src={skill.logo}
            alt={skill.name}
            loading="lazy"
            width={80}
            height={80}
            sizes="(max-width: 768px) 64px, (max-width: 1024px) 72px, 80px"
            className="object-contain filter transition-all duration-300 group-hover:brightness-110"
          />
        </div>
        {/* Skill Name */}
        <h3 className="px-2 text-center text-sm leading-tight font-medium text-white md:text-base lg:text-lg">
          {skill.name}
        </h3>
      </div>
    </div>
  );

  const SkillRow = ({ skills, direction = "left" }) => (
    <div className="relative mb-4 md:mb-6">
      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r from-black via-black/80 to-transparent md:w-16"></div>
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l from-black via-black/80 to-transparent md:w-16"></div>

      {/* Scrollable Container */}
      <div className="scrollbar-hide overflow-x-auto">
        <div
          className={`flex space-x-4 px-6 md:space-x-6 md:px-8 animate-scroll-${direction}`}
          style={{
            width: "max-content",
            animationDuration: "30s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          {/* Duplicate skills for seamless loop */}
          {[...skills, ...skills].map((skill, index) => (
            <SkillCard key={`${skill.name}-${index}`} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      className="w-full bg-black px-4 py-16 md:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-head my-4 text-4xl font-bold text-white md:my-8 md:text-7xl lg:my-10 lg:text-9xl">
          Skills
        </h2>

        {/* Two Rows of Skills */}
        <div className="space-y-4 md:space-y-6">
          <SkillRow skills={firstRow} direction="left" />
          <SkillRow skills={secondRow} direction="right" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
