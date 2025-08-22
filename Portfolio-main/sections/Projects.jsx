"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ImArrowUpRight2 } from "react-icons/im";
import { PROJECTS } from "@/constants/index";
import ProjectModal from "@/components/ProjectModal"; // Adjust the import path as needed

const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section id="works" className="bg-black px-4 py-16 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-head my-4 text-4xl font-bold text-white md:my-8 md:text-7xl lg:my-10 lg:text-9xl">
          Works
        </h2>
        <div className="space-y-0">
          {PROJECTS.map(({ name, image, href }, index) => (
            <a
              href={href}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-t border-dotted border-gray-700 py-6 transition-all duration-300 last:border-b hover:bg-gray-900/30 md:py-8 lg:py-10"
              onMouseEnter={() => setModal({ active: true, index })}
              onMouseLeave={() => setModal({ active: false, index })}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
                {/* Mobile Image */}
                <div className="relative aspect-video overflow-hidden rounded-lg md:hidden">
                  <Image
                    src={image}
                    alt={`${name} project`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Project Info */}
                <div className="flex flex-1 items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-head text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gray-300 md:text-2xl lg:text-3xl xl:text-4xl">
                      {name}
                    </h3>
                    <div className="mt-2 md:hidden">
                      <span className="text-sm text-gray-400">
                        View Project
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden text-sm text-gray-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                      View Project
                    </div>
                    <ImArrowUpRight2 className="h-5 w-5 flex-shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-6 md:w-6" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* Modal Component */}
      <ProjectModal modal={modal} projects={PROJECTS} />
    </section>
  );
};

export default Projects;
