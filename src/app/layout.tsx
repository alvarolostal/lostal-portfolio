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
  metadataBase: new URL("https://lostal.dev"),
  title: {
    default: "Álvaro Lostal | Creative Developer",
    template: "%s | Álvaro Lostal",
  },
  description:
    "Ingeniero Informático especializado en Desarrollo Web Frontend.",
  keywords: [
    "Álvaro Lostal",
    "Creative Developer",
    "Frontend Developer",
    "Desarrollo Web",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Álvaro Lostal", url: "https://lostal.dev" }],
  creator: "Álvaro Lostal",
  publisher: "Álvaro Lostal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/icon.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicons/favicon.ico",
    apple: [
      { url: "/favicons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://lostal.dev",
    title: "Álvaro Lostal | Creative Developer",
    description:
      "Ingeniero Informático especializado en Desarrollo Web Frontend.",
    siteName: "Álvaro Lostal Portfolio",
    images: [
      {
        url: "/og/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Álvaro Lostal Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Álvaro Lostal | Creative Developer",
    description:
      "Ingeniero Informático especializado en Desarrollo Web Frontend.",
    images: ["/og/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Añade aquí tus códigos de verificación cuando los tengas
    // google: "tu-codigo-de-verificacion",
    // yandex: "tu-codigo-de-verificacion",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="theme-color" content="#050505" />
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
