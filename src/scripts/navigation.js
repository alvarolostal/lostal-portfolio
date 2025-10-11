// src/scripts/navigation.js
// Navbar scroll effect
const navbar = document.getElementById("navbar");
const scrollDown = document.getElementById("scrollDown");

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  
  // Navbar effect
  if (navbar) {
    if (scrollPosition > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  
  // Scroll down arrow visibility
  if (scrollDown) {
    if (scrollPosition > 100) {
      scrollDown.classList.add("hidden");
    } else {
      scrollDown.classList.remove("hidden");
    }
  }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Notificar al auto-scroll que se está realizando navegación manual
    if (window.setManualNavigation) {
      window.setManualNavigation(true);
    }
    
    if (mobileMenu) {
      mobileMenu.classList.remove("active");
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    
    // Notificar al auto-scroll que se está realizando navegación manual
    if (window.setManualNavigation) {
      window.setManualNavigation(true);
    }
    
    const href = anchor.getAttribute("href");
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        const offset = 60;
        const targetPosition = target.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});