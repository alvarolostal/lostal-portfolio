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

    const targets = document.querySelectorAll("section:not(#contact), .fade-in");
    targets.forEach((el) => {
      el.classList.add("transition-all", "duration-1000", "ease-out", "opacity-0", "translate-y-10");
      observer.observe(el);
    });

    return () => {
      targets.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}
