import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DramaPulse - Watch the Best Short Dramas Online Free",
    template: "%s | DramaPulse",
  },
  description:
    "Discover and watch the best Chinese short dramas with English subtitles. Romance, revenge, thriller, and action mini-series. Stream free on GoodShort.",
  keywords: [
    "short drama",
    "Chinese drama",
    "mini series",
    "watch online free",
    "English subtitles",
    "GoodShort",
    "romance drama",
    "revenge drama",
    "action thriller",
  ],
  openGraph: {
    title: "DramaPulse - Watch the Best Short Dramas Online Free",
    description:
      "Discover and watch the best Chinese short dramas with English subtitles. Romance, revenge, thriller, and action mini-series.",
    url: "https://dramapulse.vercel.app",
    siteName: "DramaPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DramaPulse - Watch the Best Short Dramas Online Free",
    description:
      "Discover and watch the best Chinese short dramas with English subtitles. Stream free on GoodShort.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
