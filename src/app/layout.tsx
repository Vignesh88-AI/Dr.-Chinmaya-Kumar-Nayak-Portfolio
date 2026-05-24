import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Chinmaya Kumar Nayak | AI & Data Science",
  description:
    "Professional academic portfolio for Dr. Chinmaya Kumar Nayak – Head of School of AI & Data Science at Sri Sri University, Odisha. Research in WSN, AI, ML, IoT, and Big Data.",
  metadataBase: new URL("https://vignesh88-ai.github.io"),
  openGraph: {
    title: "Dr. Chinmaya Kumar Nayak | AI & Data Science",
    description:
      "Academic leader & Head of School of AI & Data Science, Sri Sri University. Explorer of intelligent networks, WSN routing, and machine learning models.",
    url: "https://vignesh88-ai.github.io",
    siteName: "Dr. Chinmaya Kumar Nayak Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-[#0a0f1e] text-[#e2e8f0] font-sans selection:bg-[#2dd4bf]/25 selection:text-white">
        {children}
      </body>
    </html>
  );
}
