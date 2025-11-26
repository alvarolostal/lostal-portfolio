"use client";

import { useEffect, useState } from "react";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if mobile
    const isMobile = () => {
      return (
        window.matchMedia("(max-width: 768px)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (isMobile()) return;

    let ticking = false;
    let cachedPositions = {
      projectsTop: 0,
      contactTop: 0,
      lastUpdate: 0,
    };

    const updateCachedPositions = () => {
      const projectsSection = document.getElementById("projects");
      const contactSection = document.getElementById("contact");

      if (!projectsSection || !contactSection) return;

      const projectsRect = projectsSection.getBoundingClientRect();
      const contactRect = contactSection.getBoundingClientRect();
      const scrollY = window.scrollY;

      cachedPositions = {
        projectsTop: projectsRect.top + scrollY,
        contactTop: contactRect.top + scrollY,
        lastUpdate: Date.now(),
      };
    };

    const handleScroll = () => {
      ticking = false;

      // Update cache if too old
      if (Date.now() - cachedPositions.lastUpdate > 5000) {
        updateCachedPositions();
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const { projectsTop, contactTop } = cachedPositions;

      // Logic from prompt
      const afterProjects = scrollY + windowHeight > projectsTop + 200;
      const contactIconsVisible = scrollY + windowHeight > contactTop + 100;

      const shouldShow = afterProjects && !contactIconsVisible;

      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Initial setup
    updateCachedPositions();
    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateCachedPositions, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateCachedPositions);
    };
  }, [isVisible]);

  return (
    <div
      id="floating-contact"
      className={`fixed left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        ${isVisible 
          ? "opacity-100 visible pointer-events-auto bottom-[-37px]" 
          : "opacity-0 invisible bottom-[-100px] pointer-events-none"}
        hover:bottom-[10px]
      `}
    >
      <div className="relative flex items-center gap-[14px] px-5 py-3 bg-white/95 backdrop-blur-xl border border-gray-200/30 rounded-[36px] shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.15),0_4px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]
        dark:bg-black/95 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]
      ">
        {/* Invisible hover area to prevent jitter */}
        <div className="absolute -bottom-10 -left-5 -right-5 h-[50px] bg-transparent pointer-events-auto" />

        <a
          href="mailto:alvarolostal04@gmail.com"
          className="flex items-center justify-center w-12 h-12 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-full text-[#1d1d1f] dark:text-[#f5f5f7] text-xl border border-[#d2d2d7] dark:border-[#424245] transition-all duration-300
            hover:bg-gold hover:text-black hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(213,189,55,0.3)] hover:border-gold"
          title="Email"
        >
          <i className="fas fa-envelope"></i>
        </a>

        <a
          href="https://github.com/lostal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-full text-[#1d1d1f] dark:text-[#f5f5f7] text-xl border border-[#d2d2d7] dark:border-[#424245] transition-all duration-300
            hover:bg-gold hover:text-black hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(213,189,55,0.3)] hover:border-gold"
          title="GitHub"
        >
          <i className="fab fa-github"></i>
        </a>

        <a
          href="https://linkedin.com/in/alvarolostal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-[#f5f5f7] dark:bg-[#1d1d1f] rounded-full text-[#1d1d1f] dark:text-[#f5f5f7] text-xl border border-[#d2d2d7] dark:border-[#424245] transition-all duration-300
            hover:bg-gold hover:text-black hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(213,189,55,0.3)] hover:border-gold"
          title="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}
