"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export default function ProjectModal({ modal, projects }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let xMoveContainer, yMoveContainer;
    let handleMouseMove;

    import("gsap").then((gsap) => {
      if (!modalContainer.current) return;

      xMoveContainer = gsap.default.quickTo(modalContainer.current, "left", {
        duration: 0.8,
        ease: "power3",
      });
      yMoveContainer = gsap.default.quickTo(modalContainer.current, "top", {
        duration: 0.8,
        ease: "power3",
      });

      handleMouseMove = (e) => {
        xMoveContainer(e.pageX);
        yMoveContainer(e.pageY);
      };

      window.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      if (handleMouseMove) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      ref={modalContainer}
      variants={scaleAnimation}
      initial="initial"
      animate={active ? "enter" : "closed"}
      className="pointer-events-none absolute z-50 flex hidden h-72 w-96 items-center justify-center overflow-hidden border border-gray-700 opacity-0 shadow-2xl transition-opacity duration-300 md:flex md:opacity-100"
    >
      <div
        style={{ top: `${index * -100}%` }}
        className="absolute h-full w-full transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        {projects.map((project, projectIndex) => {
          const backgroundColors = [
            "bg-gradient-to-br from-purple-500 to-pink-500",
            "bg-gradient-to-br from-blue-500 to-cyan-500",
            "bg-gradient-to-br from-green-500 to-emerald-500",
            "bg-gradient-to-br from-orange-500 to-red-500",
            "bg-gradient-to-br from-indigo-500 to-purple-500",
            "bg-gradient-to-br from-teal-500 to-blue-500",
            "bg-gradient-to-br from-rose-500 to-pink-500",
            "bg-gradient-to-br from-amber-500 to-orange-500",
          ];

          const bgColor =
            backgroundColors[projectIndex % backgroundColors.length];

          return (
            <div
              className={`flex h-full w-full items-center justify-center p-4 ${bgColor}`}
              key={`modal_${projectIndex}`}
            >
              <div className="relative h-52 w-80 overflow-hidden shadow-lg">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
