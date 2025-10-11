// src/scripts/auto-scroll.js
let isAutoScrolling = false;
let isManualNavigation = false;

function initAutoScroll() {
  // Detectar si es un dispositivo táctil/móvil
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  
  // Deshabilitar auto-scroll en dispositivos táctiles
  if (isTouchDevice) {
    console.log('Auto-scroll deshabilitado en dispositivo táctil');
    return;
  }

  let lastScrollY = window.scrollY;
  let isInitialized = false;

  // Dar tiempo para que la página se cargue completamente antes de activar auto-scroll
  setTimeout(() => {
    isInitialized = true;
  }, 1000);

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const aboutSection = document.getElementById('about');
    
    if (!aboutSection || isAutoScrolling || isManualNavigation || !isInitialized) return;

    // Verificar si estamos en la parte superior (primeros 50px para ser más estricto)
    const isAtTop = currentScrollY < 50;

    // Solo activar si realmente estamos muy cerca del inicio y hay un scroll mínimo
    if (isAtTop && currentScrollY > lastScrollY && currentScrollY > 20) {
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
    
    // Solo activar si estamos muy cerca del inicio (menos de 30px) y la página está inicializada
    if (currentScrollY < 30 && e.deltaY > 0 && !isAutoScrolling && !isManualNavigation && isInitialized) {
      autoScrollToAbout();
    }
  }, { passive: true });

  // Los eventos táctiles están deshabilitados para evitar errores en móviles
}

// Función para indicar que se está realizando navegación manual
function setManualNavigation(isManual) {
  isManualNavigation = isManual;
  if (isManual) {
    // Resetear después de un tiempo para permitir auto-scroll nuevamente
    setTimeout(() => {
      isManualNavigation = false;
    }, 1500);
  }
}

// Exponer la función globalmente para que navigation.js pueda usarla
window.setManualNavigation = setManualNavigation;

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoScroll);
} else {
  initAutoScroll();
}