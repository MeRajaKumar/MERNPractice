import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata = {
  title: "Swayam Swarup Panda | Frontend Developer",
  description:
    "I craft intelligent, interactive user interfaces using modern web technologies like React, Next.js, and Tailwind.",
  keywords:
    "Frontend Developer, React, Next.js, Web Development, Redux, JavaScript, TypeScript, Portfolio, Tailwind, GSAP, Framer, Swayam Swarup Panda",
  metadataBase: new URL("https://swayam-nine.vercel.app/"),
  openGraph: {
    title: "Swayam Swarup Panda | Frontend Developer",
    description:
      "Interactive and performant web experiences with cutting-edge frontend tech.",
    url: "https://swayam-nine.vercel.app/",
    siteName: "Swayam's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swayam's Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swayam Swarup Panda | Frontend Developer",
    description: "Interactive and performant web experiences.",
    creator: "@Swayam_Dev",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Swayam Swarup Panda",
              url: "https://swayam-nine.vercel.app",
              jobTitle: "Frontend Developer",
              sameAs: [
                "https://github.com/swayamDev",
                "https://x.com/Swayam_Dev",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
