import Footer from "@/components/Footer";
import ScrollingText from "@/components/ScrollingText";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Hero from "@/sections/Hero";
import { Highlights } from "@/sections/Highlights";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollingText />
      <About />
      <Highlights />
      <ScrollingText />
      <Projects />
      <Skills />
      <ScrollingText />
      <Contact />
      <Footer />
    </>
  );
}
