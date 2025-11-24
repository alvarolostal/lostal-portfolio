"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach((sec) => {
      sec.classList.add("transition-all", "duration-1000", "ease-out", "opacity-0", "translate-y-10");
      observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return null;
}
