// src/scripts/auto-scroll.js
class AutoScrollManager {
  constructor() {
    this.isAutoScrolling = false;
    this.isManualNavigation = false;
    this.hasTriggeredAutoScroll = false;
    this.isInitialized = false;
    this.scrollTimeout = null;
    this.wheelTimeout = null;
    this.lastScrollY = window.scrollY;
    this.consecutiveScrollDown = 0;

    // Detectar si es un dispositivo táctil/móvil más preciso
    this.isTouchDevice = this.detectTouchDevice();

    if (this.isTouchDevice) {
      // Auto-scroll disabled on touch devices
      return;
    }
    this.init();
  }

  detectTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0 ||
      window.innerWidth <= 1024 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }

  init() {
    // Esperar a que todo esté completamente cargado, incluyendo otros scripts
    if (document.readyState === 'complete') {
      this.delayedInit();
    } else {
      window.addEventListener('load', () => this.delayedInit());
    }
  }

  delayedInit() {
    // Inicialización más rápida para mejor responsividad
    setTimeout(() => {
      this.isInitialized = true;
      this.bindEvents();
    }, 300); // Reducido para ser más responsivo
  }

  bindEvents() {
    // Event listeners con máxima prioridad para intercepción inmediata
    const wheelHandler = e => this.handleWheel(e);

    // Registrar en múltiples targets para máxima cobertura
    window.addEventListener('wheel', wheelHandler, {
      passive: false,
      capture: true,
    });
    document.addEventListener('wheel', wheelHandler, {
      passive: false,
      capture: true,
    });

    // Listener de scroll para resetear flags (más frecuente)
    window.addEventListener('scroll', () => this.handleScroll(), {
      passive: true,
    });

    // Listeners para detectar navegación manual
    document.addEventListener('keydown', e => this.handleKeyNavigation(e));
    document.addEventListener('click', e => this.handleLinkClick(e));

    // Event listeners configured
  }

  autoScrollToProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection || this.hasTriggeredAutoScroll) {
      // Auto-scroll blocked: section not found or already executed
      return;
    }

    this.isAutoScrolling = true;
    this.hasTriggeredAutoScroll = true;

    // Limpiar cualquier timeout pendiente
    this.clearTimeouts();

    // Calcular la posición exacta
    const projectsPosition =
      projectsSection.getBoundingClientRect().top + window.scrollY;
    const offset = 60;

    // Scroll suave hacia Projects
    window.scrollTo({
      top: projectsPosition - offset,
      behavior: 'smooth',
    });

    // Resetear flags después de completar el scroll
    this.scrollTimeout = setTimeout(() => {
      this.isAutoScrolling = false;

      // Permitir reactivación si se vuelve al top
      setTimeout(() => {
        if (window.scrollY < 100) {
          this.hasTriggeredAutoScroll = false;
        }
      }, 500);
    }, 1200);
  }

  clearTimeouts() {
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
    if (this.wheelTimeout) {
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = null;
    }
  }

  handleScroll() {
    if (!this.isInitialized || this.isAutoScrolling) return;

    const currentScrollY = window.scrollY;

    // Resetear el flag si volvemos muy cerca del top
    if (currentScrollY < 50 && this.hasTriggeredAutoScroll) {
      this.hasTriggeredAutoScroll = false;
      this.consecutiveScrollDown = 0;

      // Resetear también la navegación manual cuando llegamos al top
      if (this.isManualNavigation) {
        this.isManualNavigation = false;
      }
    }

    this.lastScrollY = currentScrollY;
  }

  handleWheel(e) {
    const currentScrollY = window.scrollY;

    // Condición más estricta y confiable para el auto-scroll
    if (e.deltaY > 0 && currentScrollY <= 150 && !this.hasTriggeredAutoScroll) {
      // Verificaciones adicionales solo después de detectar scroll hacia abajo
      if (!this.isInitialized || this.isAutoScrolling) {
        return;
      }

      // Si está en navegación manual, resetearla si estamos en el top
      if (this.isManualNavigation && currentScrollY < 80) {
        this.isManualNavigation = false;
      }

      // Si aún está en navegación manual, no hacer auto-scroll
      if (this.isManualNavigation) {
        return;
      }

      // Wheel intercepted - trigger immediate auto-scroll

      // Prevenir COMPLETAMENTE el scroll natural
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      // Ejecutar inmediatamente sin delays
      this.executeImmediateAutoScroll();
      return false;
    }
  }

  executeImmediateAutoScroll() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) {
      // Section not found
      return;
    }

    // Marcar inmediatamente para evitar ejecuciones múltiples
    this.isAutoScrolling = true;
    this.hasTriggeredAutoScroll = true;

    // Ejecutando auto-scroll inmediato

    // Limpiar timeouts
    this.clearTimeouts();

    // Calcular posición y ejecutar INMEDIATAMENTE
    const rect = projectsSection.getBoundingClientRect();
    const targetPosition = window.scrollY + rect.top - 60;

    // Scroll inmediato y suave
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });

    // Reset más rápido para mejor responsividad
    this.scrollTimeout = setTimeout(() => {
      this.isAutoScrolling = false;
    }, 800);
  }

  handleKeyNavigation(e) {
    const navigationKeys = [
      'PageDown',
      'PageUp',
      'Home',
      'End',
      'ArrowDown',
      'ArrowUp',
      'Space',
    ];

    if (navigationKeys.includes(e.code)) {
      const currentScrollY = window.scrollY;

      // Si estamos en el top y es ArrowDown, activar auto-scroll
      if (
        e.code === 'ArrowDown' &&
        currentScrollY < 80 &&
        !this.hasTriggeredAutoScroll &&
        this.isInitialized &&
        !this.isAutoScrolling &&
        !this.isManualNavigation
      ) {
        e.preventDefault();
        this.autoScrollToProjects();
      } else {
        this.setManualNavigation(true);
      }
    }
  }

  handleLinkClick(e) {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      const href = target.getAttribute('href');
      // Click en enlace interno detectado

      // Si es click en el logo (AL) que va al top
      if (href === '#top') {
        // Click en logo AL - preparando para auto-scroll
        this.setManualNavigation(true);

        // Después de que termine el scroll al top, resetear flags más rápido
        setTimeout(() => {
          if (window.scrollY < 100) {
            this.hasTriggeredAutoScroll = false;
            this.isManualNavigation = false;
          }
        }, 800);
      } else {
        this.setManualNavigation(true);
      }
    }
  }

  setManualNavigation(isManual) {
    this.isManualNavigation = isManual;

    if (isManual) {
      this.clearTimeouts();

      // Resetear después de un tiempo más corto cuando se hace clic en el logo
      const resetTime = window.scrollY < 100 ? 1000 : 2000; // Más rápido si estamos cerca del top

      setTimeout(() => {
        this.isManualNavigation = false;
      }, resetTime);
    }
  }
}

// Instancia global del manager
let autoScrollManager;

// Exponer funciones globalmente para compatibilidad
window.setManualNavigation = function (isManual) {
  if (autoScrollManager) {
    autoScrollManager.setManualNavigation(isManual);
  }
};

// Función adicional para resetear el estado del auto-scroll
window.resetAutoScroll = function () {
  if (autoScrollManager) {
    autoScrollManager.hasTriggeredAutoScroll = false;
    autoScrollManager.isManualNavigation = false;
    autoScrollManager.consecutiveScrollDown = 0;
  }
};

// Inicializar cuando el DOM esté listo
function initAutoScrollManager() {
  // Evitar doble inicialización
  if (autoScrollManager) {
    return;
  }
  autoScrollManager = new AutoScrollManager();
}

// Inicializar con el timing correcto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAutoScrollManager);
} else {
  // Si el DOM ya está listo, esperar un poco para otros scripts
  setTimeout(initAutoScrollManager, 100);
}
