// src/scripts/auto-scroll.js
let isAutoScrolling = false;
let isManualNavigation = false;
let scrollTimeout = null;
let wheelTimeout = null;
let hasTriggeredAutoScroll = false;

function initAutoScroll() {
  // Detectar si es un dispositivo táctil/móvil más preciso
  const isTouchDevice = () => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.innerWidth <= 1024 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  };
  
  // Deshabilitar auto-scroll en dispositivos táctiles
  if (isTouchDevice()) {
    console.log('🚫 Auto-scroll deshabilitado en dispositivo táctil');
    return;
  }
  
  console.log('✅ Auto-scroll habilitado para dispositivo de escritorio');

  let lastScrollY = window.scrollY;
  let isInitialized = false;
  let scrollDirection = 0;
  let consecutiveScrollDown = 0;

  // Esperar a que la página esté completamente cargada
  const initializeAutoScroll = () => {
    if (document.readyState === 'complete') {
      setTimeout(() => {
        isInitialized = true;
        console.log('Auto-scroll inicializado correctamente');
      }, 500); // Reducido de 1000ms a 500ms
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          isInitialized = true;
          console.log('Auto-scroll inicializado correctamente');
        }, 300);
      });
    }
  };

  function autoScrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection || hasTriggeredAutoScroll) return;

    isAutoScrolling = true;
    hasTriggeredAutoScroll = true;

    // Calcular la posición exacta
    const projectsPosition = projectsSection.getBoundingClientRect().top + window.scrollY;
    const offset = 80; // Ajustado para mejor posicionamiento

    console.log('🚀 Auto-scroll activado instantáneamente hacia Projects');

    // Cancelar cualquier animación de scroll en curso
    window.scrollTo({
      top: window.scrollY,
      behavior: 'auto'
    });

    // Inmediatamente después, hacer el scroll suave hacia Projects
    requestAnimationFrame(() => {
      window.scrollTo({
        top: projectsPosition - offset,
        behavior: 'smooth'
      });
    });

    // Resetear flags después de completar el scroll
    setTimeout(() => {
      isAutoScrolling = false;
      // Permitir que se pueda activar nuevamente después de volver al top
      setTimeout(() => {
        if (window.scrollY < 100) {
          hasTriggeredAutoScroll = false;
        }
      }, 500);
    }, 1000); // Tiempo para completar el scroll suave
  }

  function handleScroll() {
    if (!isInitialized || isAutoScrolling || isManualNavigation) return;

    const currentScrollY = window.scrollY;
    
    // Resetear el flag si volvemos muy cerca del top
    if (currentScrollY < 50 && hasTriggeredAutoScroll) {
      hasTriggeredAutoScroll = false;
      consecutiveScrollDown = 0;
    }

    lastScrollY = currentScrollY;
  }

  // Manejar evento wheel (más preciso para desktop) - INSTANTÁNEO
  function handleWheel(e) {
    if (!isInitialized || isAutoScrolling || isManualNavigation) return;
    
    const currentScrollY = window.scrollY;
    
    // Interceptar CUALQUIER scroll hacia abajo desde el área del hero
    if (e.deltaY > 0 && currentScrollY < 100 && !hasTriggeredAutoScroll) {
      // PREVENIR completamente el scroll natural
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🛑 Scroll interceptado - activando auto-scroll');
      
      // Limpiar cualquier timeout pendiente
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Activar inmediatamente
      autoScrollToProjects();
      return false; // Asegurar que no se propague
    }
  }

  // Inicializar
  initializeAutoScroll();

  // Event listeners - El wheel listener se registra primero para máxima prioridad
  window.addEventListener('wheel', handleWheel, { passive: false, capture: true }); // Capture phase para interceptar antes
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Listener adicional en el documento para máxima cobertura
  document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
}

// Función para indicar que se está realizando navegación manual
function setManualNavigation(isManual) {
  isManualNavigation = isManual;
  console.log(`Navegación manual: ${isManual ? 'activada' : 'desactivada'}`);
  
  if (isManual) {
    // Limpiar timeouts activos
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }
    if (wheelTimeout) {
      clearTimeout(wheelTimeout);
      wheelTimeout = null;
    }
    
    // Resetear después de un tiempo para permitir auto-scroll nuevamente
    setTimeout(() => {
      isManualNavigation = false;
      console.log('Navegación manual desactivada automáticamente');
    }, 2000); // Aumentado a 2 segundos para mayor seguridad
  }
}

// Detectar navegación manual por teclado (Page Down, Space, flechas)
function handleKeyNavigation(e) {
  const navigationKeys = [
    'PageDown', 'PageUp', 'Home', 'End', 
    'ArrowDown', 'ArrowUp', 'Space'
  ];
  
  if (navigationKeys.includes(e.code)) {
    const currentScrollY = window.scrollY;
    
    // Si estamos en el top y es ArrowDown, activar auto-scroll instantáneo
    if (e.code === 'ArrowDown' && currentScrollY < 80 && !hasTriggeredAutoScroll && 
        isInitialized && !isAutoScrolling && !isManualNavigation) {
      e.preventDefault();
      autoScrollToProjects();
    } else {
      setManualNavigation(true);
    }
  }
}

// Detectar clicks en enlaces internos
function handleLinkClick(e) {
  const target = e.target.closest('a[href^="#"]');
  if (target) {
    setManualNavigation(true);
  }
}

// Exponer funciones globalmente
window.setManualNavigation = setManualNavigation;

// Event listeners adicionales para detectar navegación manual
document.addEventListener('keydown', handleKeyNavigation);
document.addEventListener('click', handleLinkClick);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoScroll);
} else {
  initAutoScroll();
}