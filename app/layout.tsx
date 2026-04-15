import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Athena 韓境美學 — 網站優化提案",
  description: "韓國頂尖醫美，台灣安心出發",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-neutral-200 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
