"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // Only trigger if the contact section is covering the navbar (top <= navbar height approx 80px)
        // We use a smaller value (e.g. 20px) to ensure it's really there
        setIsContactVisible(rect.top <= 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showGlass = isScrolled && !isContactVisible;

  return (
    <nav
      className={`fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 text-white transition-all duration-300 ${
        showGlass ? "backdrop-blur-md bg-ink/50" : "mix-blend-difference"
      }`}
    >
      <Link href="#hero" className="text-2xl font-bold font-sans hoverable tracking-tighter">
        AL
      </Link>

      <div className="hidden md:flex gap-12 font-mono text-sm">
        <Link href="#projects" className="hoverable hover:text-acid transition-colors">
          Proyectos
        </Link>
        <Link href="#habilidades" className="hoverable hover:text-acid transition-colors">
          Habilidades
        </Link>
        <Link href="#recorrido" className="hoverable hover:text-acid transition-colors">
          Recorrido
        </Link>
        <Link href="#contact" className="hoverable hover:text-acid transition-colors">
          Contacto
        </Link>
      </div>

      <div className="font-mono text-xs flex flex-col items-end">
        <span className="block">SANTANDER, ES</span>
      </div>
    </nav>
  );
}
