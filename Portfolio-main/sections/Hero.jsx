"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Hero = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  let ticking = false;
  let ctx = null;
  let stars = [];
  let shootingStars = [];
  const numStars = 150;
  const maxDistance = 100;
  let shootingStarTimeout;

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvasRef.current.width;
      this.y = Math.random() * canvasRef.current.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
      this.twinkleSpeed = Math.random() * 0.02 + 0.01;
      this.twinkleOffset = Math.random() * Math.PI * 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = canvasRef.current.width;
      if (this.x > canvasRef.current.width) this.x = 0;
      if (this.y < 0) this.y = canvasRef.current.height;
      if (this.y > canvasRef.current.height) this.y = 0;

      const dx = mouseRef.current.x - this.x;
      const dy = mouseRef.current.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        const force = (100 - distance) / 100;
        this.x -= dx * force * 0.001;
        this.y -= dy * force * 0.001;
      }
    }

    draw() {
      const time = performance.now();
      const opacity =
        0.5 + Math.sin(time * this.twinkleSpeed + this.twinkleOffset) * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvasRef.current.width * 0.5;
      this.y = Math.random() * canvasRef.current.height * 0.3;
      this.length = Math.random() * 300 + 100;
      this.speed = Math.random() * 12 + 8;
      this.angle = Math.PI / 4;
      this.opacity = 1;
      this.life = 0;
      this.maxLife = 60;
    }

    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.life++;
      this.opacity = Math.max(0, 1 - this.life / this.maxLife);
    }

    draw() {
      const xEnd = this.x - this.length * Math.cos(this.angle);
      const yEnd = this.y - this.length * Math.sin(this.angle);
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = `rgba(255,255,255,${this.opacity})`;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "white";
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    isDead() {
      return this.opacity <= 0;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }
    };

    const drawConnections = () => {
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < maxDistance) {
            const opacity = ((maxDistance - distance) / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      drawConnections();

      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      shootingStars = shootingStars.filter((star) => !star.isDead());

      animationRef.current = requestAnimationFrame(animate);
    };

    const spawnShootingStar = () => {
      shootingStars.push(new ShootingStar());
      shootingStarTimeout = setTimeout(
        spawnShootingStar,
        Math.random() * 4000 + 3000,
      );
    };

    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          mouseRef.current.x = e.clientX;
          mouseRef.current.y = e.clientY;
          ticking = false;
        });
        ticking = true;
      }
    };

    resizeCanvas();
    initStars();
    animate();
    spawnShootingStar();

    canvas.classList.add("loaded");

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (shootingStarTimeout) clearTimeout(shootingStarTimeout);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const letterContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navbar />
      <div className="relative h-screen overflow-hidden bg-gray-950">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-1000 ease-in-out"
          aria-hidden="true"
        />
        <div
          role="banner"
          aria-label="Hero Section"
          className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            className="mx-auto max-w-7xl text-center text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <motion.h1
              className="font-head text-5xl leading-tight font-extrabold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
              variants={letterContainer}
            >
              {"Swayam".split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  variants={letterVariant}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-4 max-w-5xl text-base leading-relaxed font-light text-gray-300 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15, // word delay
                  },
                },
              }}
            >
              {"Frontend Engineer blending performance, accessibility & design."
                .split(" ")
                .map((word, idx) => (
                  <motion.span
                    key={idx}
                    className="mr-1.5 inline-block whitespace-nowrap"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, ease: "easeOut" },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
