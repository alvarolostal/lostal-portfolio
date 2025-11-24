"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const hoverables = document.querySelectorAll(".hoverable");

    const moveCursor = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      }
      
      // Move project preview if visible
      const preview = document.getElementById('project-preview');
      if(preview && preview.style.opacity === '1') {
          preview.style.left = (e.clientX + 50) + 'px'; 
          preview.style.top = e.clientY + 'px';
      }
    };

    const addHover = () => document.body.classList.add("hovering");
    const removeHover = () => document.body.classList.remove("hovering");

    document.addEventListener("mousemove", moveCursor);

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });
    
    // Also attach to any new hoverables that might appear (if we had dynamic content, 
    // but for now this is fine. Ideally we'd use a MutationObserver or event delegation 
    // but the original script just selected .hoverable on load).
    // To be safer with React hydration, we might want to use event delegation on body.
    
    const handleMouseOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.hoverable')) {
            addHover();
        }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest('.hoverable')) {
            removeHover();
        }
    };

    // Replacing the direct attachment with delegation to handle React re-renders if needed,
    // but strictly following the original script logic is safer for "exact" replication 
    // if the DOM is static. However, in React, elements mount/unmount.
    // Let's stick to the original logic but re-run it? 
    // Actually, event delegation is better for React.
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      
      // Cleanup original listeners if we used them
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return <div id="cursor"></div>;
}
