import type { Metadata } from "next";
import { Merriweather, Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-playfair", // keep the variable name the same so we don't have to update all CSS files immediately, or update it
  display: "swap",
  weight: ["300", "400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Startup Graveyard — Where Failed AI Startups Rest",
    template: "%s | Startup Graveyard",
  },
  description:
    "A post-mortem database of failed AI startups. Explore what went wrong, the capital lost, and the patterns behind the deaths of hundreds of AI companies.",
  keywords: [
    "failed startups",
    "AI startups",
    "startup post-mortem",
    "startup failure",
    "startup graveyard",
    "AI company failures",
  ],
  authors: [{ name: "Startup Graveyard" }],
  openGraph: {
    title: "Startup Graveyard — Where Failed AI Startups Rest",
    description:
      "A post-mortem database of failed AI startups. Explore what went wrong and the patterns behind the deaths.",
    type: "website",
    locale: "en_US",
    siteName: "Startup Graveyard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Graveyard",
    description: "A post-mortem database of failed AI startups.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${merriweather.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
