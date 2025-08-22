"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Image1 from "@/public/image1.jpeg";
import Image2 from "@/public/image2.jpeg";
import Image3 from "@/public/image3.jpg";

const IMAGES = [
  { id: 1, image: Image1, alt: "Swayam Swarup Panda - Butterfly" },
  { id: 2, image: Image2, alt: "Swayam Swarup Panda - Beach Cave" },
  { id: 3, image: Image3, alt: "Swayam Swarup Panda - Desert Tree" },
];

const About = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const heading = "Hi, I'm Swayam";

  const word = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-black px-4 pt-16 text-white md:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text Column */}
          <div className="order-1 space-y-8">
            {/* Animated Heading - word-by-word */}
            <motion.h1
              className="font-head my-4 flex flex-wrap gap-2 text-4xl font-bold md:my-8 md:text-5xl lg:mt-0 lg:text-6xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {heading.split(" ").map((wordStr, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={word}
                  className="inline-block"
                >
                  {wordStr}
                </motion.span>
              ))}
            </motion.h1>

            {/* Paragraph */}
            <motion.p
              className="text-lg leading-relaxed text-gray-300 md:text-xl lg:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              A frontend developer focused on building fast, accessible, and
              intelligent web interfaces using Next.js and React. I combine
              clean design with cutting-edge technology to create seamless,
              business-driven digital experiences.
            </motion.p>

            {/* Button */}
            <motion.a
              href="#contact"
              aria-label="Contact Me"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-black shadow transition duration-300 hover:bg-gray-200"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true }}
            >
              Contact Me
            </motion.a>
          </div>

          {/* Image Column */}
          <div className="relative order-2 h-[400px] md:h-[500px] lg:h-[700px]">
            {/* Mobile - Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 z-10 h-96 w-80 -translate-x-1/2 -translate-y-1/2 transform md:hidden"
            >
              <Image
                src={IMAGES[1].image}
                alt={IMAGES[1].alt}
                fill
                sizes="(max-width: 768px) 80vw"
                className="rounded-lg object-cover shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Butterfly */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute bottom-0 left-[80px] z-30 hidden h-48 w-36 md:block lg:bottom-[40px] lg:left-0"
            >
              <Image
                src={IMAGES[0].image}
                alt={IMAGES[0].alt}
                fill
                sizes="(min-width: 768px) 144px"
                className="rounded-lg object-cover shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Beach Cave */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="absolute bottom-[60px] left-1/2 z-10 hidden h-96 w-80 -translate-x-1/2 transform md:block lg:bottom-[100px] lg:left-[280px]"
            >
              <Image
                src={IMAGES[1].image}
                alt={IMAGES[1].alt}
                fill
                sizes="(min-width: 768px) 320px"
                className="rounded-lg object-cover shadow-2xl"
              />
            </motion.div>

            {/* Desktop - Desert Tree */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="absolute right-[70px] bottom-[120px] z-20 hidden h-64 w-52 md:block lg:right-0 lg:bottom-[180px]"
            >
              <Image
                src={IMAGES[2].image}
                alt={IMAGES[2].alt}
                fill
                sizes="(min-width: 768px) 208px"
                className="rounded-lg object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
