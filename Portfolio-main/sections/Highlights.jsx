"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/BentoGrid";
import { FaSearch, FaTools } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { GoShieldCheck, GoShieldLock } from "react-icons/go";
import { IoPricetagsOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { logos1, logos2, logos3 } from "@/constants/skills";
import Image from "next/image";

export function Highlights() {
  return (
    <section
      id="highlights"
      className="relative w-full bg-black px-4 py-16 sm:px-6 md:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-head my-4 text-4xl font-bold text-white sm:text-5xl md:my-8 md:text-7xl lg:my-10 lg:text-9xl">
          Highlights
        </h2>
        <BentoGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:auto-rows-[20rem]">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

// Shared motion logo grid
const renderLogoGrid = (logos) => (
  <div className="grid grid-cols-3 gap-4">
    {logos.map((logo, i) => (
      <div key={i} className="flex items-center justify-center">
        <Image
          src={logo.src}
          alt=""
          width={56}
          height={56}
          className="rounded bg-[#1a1a1a] p-1 shadow-md transition-transform duration-300 hover:scale-110"
        />
      </div>
    ))}
  </div>
);

const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 5,
      transition: { duration: 0.2 },
    },
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: {
      x: -10,
      rotate: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex w-3/4 items-center space-x-2 rounded-full border border-gray-700 bg-black p-2"
      >
        <FaCheck className="h-6 w-6 rounded-full bg-green-600 text-white" />
        <p className="text-sm text-gray-300">https://www.YourProSite.com</p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="ml-auto flex w-3/4 items-center space-x-2 rounded-full border border-gray-700 bg-black p-2"
      >
        <p className="text-sm text-gray-300">https://www.BadDesigns.com</p>
        <RxCross2 className="h-6 w-6 rounded-full bg-red-600 text-white" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex w-3/4 items-center space-x-2 rounded-full border border-gray-700 bg-black p-2"
      >
        <RxCross2 className="h-6 w-6 rounded-full bg-red-600 text-white" />
        <p className="text-sm text-gray-300">http://www.NoSEOHere.net</p>
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const hoverVariants = {
    initial: (w) => ({ width: w }),
    hover: (w) => ({
      width: ["0%", w],
      transition: { duration: 1.2, ease: "easeInOut" },
    }),
    exit: (w) => ({
      width: w,
      transition: { duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      exit="exit"
      className="bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full flex-col space-y-4 rounded-md text-white"
    >
      <div>
        <p className="mb-1 text-gray-300">My Sites:</p>
        <motion.div
          custom="100%"
          variants={hoverVariants}
          className="h-4 w-full rounded-full bg-gradient-to-r from-green-400 to-cyan-400 shadow-lg"
        />
      </div>
      <div>
        <p className="mb-1 text-gray-300">The Other Sites:</p>
        <div className="flex flex-col space-y-2">
          <motion.div
            custom="80%"
            variants={hoverVariants}
            className="h-3 w-[80%] rounded-full bg-yellow-400"
          />
          <motion.div
            custom="65%"
            variants={hoverVariants}
            className="h-3 w-[65%] rounded-full bg-orange-500"
          />
          <motion.div
            custom="50%"
            variants={hoverVariants}
            className="h-3 w-[50%] rounded-full bg-red-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="bg-dot-white/[0.2] flex h-full w-full items-center justify-center rounded-lg"
      style={{
        background:
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      <GoShieldLock className="size-16 text-gray-300" />
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="bg-dot-white/[0.2] flex h-full w-full flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
    >
      <motion.div
        variants={first}
        className="flex w-full flex-col items-center justify-center rounded-2xl border border-gray-700 bg-black p-4"
      >
        {renderLogoGrid(logos1)}
      </motion.div>
      <motion.div className="flex w-full flex-col items-center justify-center rounded-2xl border border-gray-700 bg-black p-4">
        {renderLogoGrid(logos2)}
      </motion.div>
      <motion.div
        variants={second}
        className="flex w-full flex-col items-center justify-center rounded-2xl border border-gray-700 bg-black p-4"
      >
        {renderLogoGrid(logos3)}
      </motion.div>
    </motion.div>
  );
};

const SkeletonFive = () => {
  const barVariants = {
    initial: (h) => ({ height: h }),
    hover: (h) => ({
      height: ["0%", h],
      transition: { duration: 1.2, ease: "easeInOut" },
    }),
    exit: (h) => ({
      height: h,
      transition: { duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      exit="exit"
      className="bg-dot-white/[0.2] flex h-full min-h-[6rem] w-full items-end justify-center gap-8"
    >
      <div className="flex flex-1 flex-col items-center">
        <div className="relative flex h-20 w-full max-w-20 items-end justify-center">
          <motion.div
            custom="100%"
            variants={barVariants}
            className="w-full rounded-t-lg bg-red-500"
          />
        </div>
        <p className="mt-2 text-center text-gray-300">Cost With Them</p>
      </div>
      <div className="flex flex-1 flex-col items-center">
        <div className="relative flex h-10 w-full max-w-16 items-end justify-center">
          <motion.div
            custom="60%"
            variants={barVariants}
            className="w-full rounded-t-lg bg-blue-400"
          />
        </div>
        <p className="mt-2 text-center text-gray-300">Cost With Me</p>
      </div>
    </motion.div>
  );
};

const items = [
  {
    title: "SEO Optimized",
    description: (
      <span>
        Clean architecture and performance-focused development for better Google
        rankings and discoverability.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <FaSearch className="size-3.5 text-emerald-500 md:size-5" />,
  },
  {
    title: "Fast & Performant",
    description: (
      <span>
        Built with Next.js and optimized assets for blazing-fast load times and
        a smooth UX across devices.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <BsGraphUpArrow className="size-3.5 text-blue-500 md:size-5" />,
  },
  {
    title: "Security First",
    description: (
      <span>
        I prioritize modern security practices and ensure your product is
        protected from common vulnerabilities.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <GoShieldCheck className="size-4 text-green-500 md:size-5.5" />,
  },
  {
    title: "Modern Stack. Real Impact.",
    description: (
      <span>
        I build with the tools that power modern, scalable, and maintainable
        applications.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <FaTools className="size-3.5 text-purple-500 md:size-5" />,
  },
  {
    title: "Cost-Efficient",
    description: (
      <span>
        Get high-quality development without compromising your budget, designed
        with scalability in mind.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IoPricetagsOutline className="size-3.5 text-yellow-500 md:size-5" />,
  },
];
