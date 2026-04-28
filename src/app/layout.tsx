import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loseny | Company Portfolio",
  description: "Single-page company portfolio built with Next.js 16, Tailwind CSS, GSAP, and Three.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
