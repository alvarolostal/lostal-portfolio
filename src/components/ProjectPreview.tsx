"use client";

import { useEffect } from "react";

export default function ProjectPreview() {
  useEffect(() => {
    const preview = document.getElementById("project-preview");
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectItem = target.closest(".project-item");
      
      if (projectItem && preview) {
        const color = projectItem.getAttribute("data-color");
        if (color) {
          preview.style.backgroundColor = color;
          preview.style.opacity = "1";
          preview.style.transform = "translate(-50%, -50%) scale(1) rotate(-5deg)";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const projectItem = target.closest(".project-item");
      
      if (projectItem && preview) {
        preview.style.opacity = "0";
        preview.style.transform = "translate(-50%, -50%) scale(0.8) rotate(0deg)";
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div id="project-preview"></div>;
}
