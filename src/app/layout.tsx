import type { Metadata } from "next";
import {
  Playfair_Display,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";
import ProjectPreview from "@/components/ProjectPreview";
import Navbar from "@/components/Navbar";
import ScrollObserver from "@/components/ScrollObserver";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Álvaro Lostal | Creative Developer",
  description:
    "Ingeniero Informático especializado en Desarrollo Web Frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased bg-ink text-paper cursor-none overflow-x-hidden`}
      >
        <Cursor />
        <Noise />
        <ProjectPreview />
        <Navbar />
        <ScrollObserver />
        {children}
      </body>
    </html>
  );
}
