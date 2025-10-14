// src/scripts/navigation.js
// Navbar scroll effect
const navbar = document.getElementById("navbar");
const scrollDown = document.getElementById("scrollDown");

// Detectar si es un dispositivo táctil
function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.innerWidth <= 1024
  );
}

window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset;
  
  // Navbar effect
  if (navbar) {
    if (isTouchDevice()) {
      // En dispositivos táctiles: mostrar navbar solo al llegar a la sección "about"
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const aboutPosition = aboutSection.offsetTop - 100; // Offset para que aparezca un poco antes
        if (scrollPosition >= aboutPosition) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    } else {
      // En ordenador: comportamiento actual (al hacer scroll mínimo)
      if (scrollPosition > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
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
    mobileMenuBtn.classList.toggle("active");
    
    // Add a subtle vibration on mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
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
    
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove("active");
    }
  });
});

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    
    const href = anchor.getAttribute("href");
    
    // Tratamiento especial para el logo AL
    if (href === "#top") {
      console.log('🏠 Click en logo AL detectado');
      
      // Notificar al auto-scroll
      if (window.setManualNavigation) {
        window.setManualNavigation(true);
      }
      
      // Scroll al top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
      // Resetear el auto-scroll después de llegar al top
      setTimeout(() => {
        if (window.resetAutoScroll) {
          window.resetAutoScroll();
        }
      }, 600);
      
      return;
    }
    
    // Para otros enlaces, comportamiento normal
    if (window.setManualNavigation) {
      window.setManualNavigation(true);
    }
    
    if (href) {
      const target = document.querySelector(href);
      if (target) {
        const targetPosition = target.offsetTop - offset;
        
        // Usar requestAnimationFrame para asegurar que setManualNavigation se ejecute primero
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        });
      }
    }
  });
});