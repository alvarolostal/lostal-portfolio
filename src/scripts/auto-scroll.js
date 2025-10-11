// src/scripts/auto-scroll.js
let isAutoScrolling = false;

function initAutoScroll() {
  // Detectar si es un dispositivo táctil/móvil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
  // Deshabilitar auto-scroll en dispositivos táctiles
  if (isTouchDevice) {
    console.log('Auto-scroll deshabilitado en dispositivo táctil');
    return;
  }

  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const aboutSection = document.getElementById('about');
    
    if (!aboutSection || isAutoScrolling) return;

    // Verificar si estamos en la parte superior (primeros 100px)
    const isAtTop = currentScrollY < 100;

    // Si estamos en la parte superior y el usuario hace scroll hacia abajo
    if (isAtTop && currentScrollY > lastScrollY && currentScrollY > 10) {
      autoScrollToAbout();
    }

    lastScrollY = currentScrollY;
  }

  function autoScrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    isAutoScrolling = true;

    // Calcular la posición exacta para un scroll más preciso
    const aboutPosition = aboutSection.getBoundingClientRect().top + window.scrollY;
    const offset = 60; // Pequeño offset para mejor presentación

    // Scroll suave hacia la sección About
    window.scrollTo({
      top: aboutPosition - offset,
      behavior: 'smooth'
    });

    // Resetear el flag después de completar el scroll
    setTimeout(() => {
      isAutoScrolling = false;
    }, 800);
  }

  // Escuchar eventos de scroll
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Detectar el scroll con la rueda del mouse para respuesta instantánea
  window.addEventListener('wheel', (e) => {
    const currentScrollY = window.scrollY;
    
    // Si estamos cerca de la parte superior y hacemos scroll hacia abajo
    if (currentScrollY < 50 && e.deltaY > 0 && !isAutoScrolling) {
      autoScrollToAbout();
    }
  }, { passive: true });

  // Los eventos táctiles están deshabilitados para evitar errores en móviles
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoScroll);
} else {
  initAutoScroll();
}