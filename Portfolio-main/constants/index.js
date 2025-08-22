import project1 from "@/public/project1.webp";
import project2 from "@/public/project2.webp";
import project3 from "@/public/project3.webp";
import project4 from "@/public/project4.webp";
import project5 from "@/public/project5.webp";
import project6 from "@/public/project6.webp";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

// constants/navigation.js
export const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#works", label: "Works" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const BRAND_NAME = "Swayam";

export const PROJECTS = [
  {
    name: "SaaSify",
    image: project1,
    href: "https://saasify-rho.vercel.app/",
  },
  {
    name: "Ethical Feedback Collector",
    image: project2,
    href: "https://ethical-feedback-collector.vercel.app/",
  },
  {
    name: "Contrast Studio",
    image: project3,
    href: "https://color-contrast-checker-six.vercel.app/",
  },
  {
    name: "ZentroLab",
    image: project4,
    href: "https://zentrolab.vercel.app/",
  },
  {
    name: "Creativerse",
    image: project5,
    href: "https://creativerse-ten.vercel.app/",
  },
  {
    name: "PawCity",
    image: project6,
    href: "https://petfriendlycity.netlify.app/",
  },
];

export const SOCIAL_LINKS = [
  {
    id: 1,
    label: "GitHub",
    href: "https://github.com/swayamDev",
    icon: <FaGithub className="text-2xl text-white" />,
  },
  {
    id: 2,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/swayam-webdev/",
    icon: <FaLinkedinIn className="text-2xl text-white" />,
  },
  {
    id: 3,
    label: "Twitter",
    href: "https://x.com/Swayam_Dev",
    icon: <FaXTwitter className="text-2xl text-white" />,
  },
  {
    id: 4,
    label: "Email",
    href: "mailto:swayamcoder@gmail.com",
    icon: <MdEmail className="text-2xl text-white" />,
  },
];
