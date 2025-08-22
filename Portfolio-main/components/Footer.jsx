"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/constants/index";
import { FaChevronUp } from "react-icons/fa";

// Starfield Canvas Component (enhanced glow)
const StarfieldCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const stars = [];
    const numStars = 100;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createStars = () => {
      stars.length = 0;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.8,
          opacity: Math.random() * 0.3 + 0.3,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const currentOpacity = star.opacity + twinkle * 0.1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(
          0,
          Math.min(1, currentOpacity),
        )})`;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate(0);

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      style={{ zIndex: 1 }}
    />
  );
};

// Shooting Star Component (SSR-safe)
const ShootingStar = ({ isVisible, onComplete }) => {
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(0);
  const [endX, setEndX] = useState(1200); // fallback if no window

  useEffect(() => {
    if (isVisible && typeof window !== "undefined") {
      const y = Math.random() * window.innerHeight * 0.5 + 50;
      setStartY(y);
      setEndY(y + 100 + Math.random() * 100);
      setEndX(window.innerWidth + 200);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-white"
      style={{ top: startY, left: -100, zIndex: 2 }}
      initial={{
        x: -50,
        y: 0,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: endX,
        y: endY - startY,
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
      aria-hidden="true"
    >
      <div className="absolute top-0 -left-24 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-80 blur-sm" />
      <div className="absolute top-0 -left-12 h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 blur-sm" />
    </motion.div>
  );
};

// Back to Top Button (with a11y)
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed right-8 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors duration-200 hover:bg-gray-200"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Back to top"
      title="Scroll to top"
    >
      <FaChevronUp size={20} />
    </motion.button>
  );
};

const Footer = () => {
  const [showShootingStar, setShowShootingStar] = useState(false);

  useEffect(() => {
    const triggerShootingStar = () => {
      setShowShootingStar(true);
    };

    const initialTimeout = setTimeout(triggerShootingStar, 2000);
    const interval = setInterval(() => {
      triggerShootingStar();
    }, 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleShootingStarComplete = () => {
    setShowShootingStar(false);
  };

  return (
    <>
      <div
        className="relative h-[550px] overflow-hidden"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <div className="fixed bottom-0 left-0 h-[550px] w-full">
          <footer
            className="relative flex h-full w-full flex-col justify-between bg-gray-950 text-white"
            role="contentinfo"
          >
            {/* Starfield Background */}
            <StarfieldCanvas />

            {/* Shooting Star */}
            <ShootingStar
              isVisible={showShootingStar}
              onComplete={handleShootingStarComplete}
            />

            {/* Content */}
            <div
              className="relative flex flex-grow items-center px-4 md:px-8 lg:px-10"
              style={{ zIndex: 3 }}
            >
              <div className="mx-auto w-full max-w-7xl py-8 md:py-12">
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center md:gap-12">
                  {/* Navigation Links */}
                  <nav className="flex-1" aria-label="Footer navigation">
                    <ul className="space-y-4 text-white">
                      {NAV_ITEMS.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.href}
                            className="block w-fit text-lg font-semibold transition-colors duration-200 hover:text-gray-300 md:text-xl"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Social Links */}
                  <div className="flex-1 md:text-right">
                    <h3 className="mb-6 text-lg font-semibold tracking-wide text-gray-400">
                      Follow Me
                    </h3>
                    <div className="mb-8 flex gap-4 md:justify-end">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.id}
                          href={social.href}
                          target={
                            social.href.startsWith("mailto:")
                              ? undefined
                              : "_blank"
                          }
                          rel={
                            social.href.startsWith("mailto:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-800 text-black transition-all duration-200 hover:bg-gray-300"
                          aria-label={social.label}
                          title={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">
                      © {new Date().getFullYear()} Built with ❤️ and ✨ by
                      Swayam.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Name */}
            <div
              className="font-head relative text-center text-[14vw] leading-none font-extrabold tracking-tight text-white opacity-20"
              style={{ zIndex: 3 }}
            >
              Swayam
            </div>
          </footer>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default Footer;
