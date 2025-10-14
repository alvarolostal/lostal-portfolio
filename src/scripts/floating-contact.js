// src/scripts/floating-contact.js

class FloatingContactWidget {
  constructor() {
    this.floatingContact = null;
    this.mainContactLinks = null;
    this.heroSection = null;
    this.projectsSection = null;
    this.contactSection = null;
    
    this.isVisible = false;
    this.isMerging = false;
    this.hasTriggeredMerge = false;
    this.isMobile = this.detectMobile();
    
    // Esperar a que el DOM esté cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  detectMobile() {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  init() {
    // Buscar elementos
    this.floatingContact = document.getElementById('floating-contact');
    this.mainContactLinks = document.getElementById('main-contact-links');
    this.heroSection = document.querySelector('#hero, .hero, section:first-of-type');
    this.projectsSection = document.getElementById('projects');
    this.contactSection = document.getElementById('contact');
    
    if (!this.floatingContact || !this.projectsSection || !this.contactSection) {
      console.warn('FloatingContact: Required elements not found');
      return;
    }

    this.setupScrollListener();
    this.setupIntersectionObserver();
    this.setupHoverEffects();
    
    // Evaluar estado inicial
    setTimeout(() => this.handleScrollUpdate(), 100);
    
    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', () => {
      this.isMobile = this.detectMobile();
    });
  }

  setupHoverEffects() {
    if (!this.isMobile && this.floatingContact) {
      // Solo en desktop: efectos de hover para el peek
      this.floatingContact.addEventListener('mouseenter', () => {
        if (this.isVisible && !this.isMerging) {
          this.floatingContact.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
      
      this.floatingContact.addEventListener('mouseleave', () => {
        if (this.isVisible && !this.isMerging) {
          this.floatingContact.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    }
  }

  setupScrollListener() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScrollUpdate();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === this.contactSection) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            this.triggerMergeAnimation();
          } else if (!entry.isIntersecting && this.hasTriggeredMerge) {
            this.resetMergeState();
          }
        }
      });
    }, options);

    if (this.contactSection) {
      observer.observe(this.contactSection);
    }
  }

  handleScrollUpdate() {
    if (!this.floatingContact || !this.projectsSection || !this.contactSection) {
      return;
    }

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Calcular posiciones de las secciones
    const projectsTop = this.projectsSection.offsetTop;
    const contactTop = this.contactSection.offsetTop;
    
    // Mostrar widget cuando esté en o después de la sección de proyectos, pero antes del contacto
    // En móvil: más margen para facilitar interacción
    const marginOffset = this.isMobile ? 300 : 200;
    const afterProjects = scrollY + windowHeight > projectsTop + marginOffset;
    const beforeContact = scrollY + windowHeight < contactTop + 100;
    const shouldShow = afterProjects && beforeContact;

    if (shouldShow && !this.isVisible && !this.isMerging) {
      this.showWidget();
    } else if (!shouldShow && this.isVisible && !this.isMerging) {
      this.hideWidget();
    }
  }

  showWidget() {
    if (this.isVisible || this.isMerging) return;
    
    this.isVisible = true;
    this.floatingContact.classList.add('visible');
    
    // Delay más corto para móvil
    const delay = this.isMobile ? 200 : 300;
    setTimeout(() => {
      if (this.floatingContact) {
        this.floatingContact.style.pointerEvents = 'auto';
      }
    }, delay);
  }

  hideWidget() {
    if (!this.isVisible || this.isMerging) return;
    
    this.isVisible = false;
    this.floatingContact.classList.remove('visible');
    this.floatingContact.style.pointerEvents = 'none';
  }

  triggerMergeAnimation() {
    if (this.isMerging || this.hasTriggeredMerge || !this.isVisible) return;
    
    this.isMerging = true;
    this.hasTriggeredMerge = true;
    
    // Iniciar animación de fusión
    this.floatingContact.classList.add('merge-animation');
    
    // Delay diferente para móvil y desktop
    const mergeDelay = this.isMobile ? 300 : 400;
    const hideDelay = this.isMobile ? 600 : 800;
    
    // Después de un delay, activar la animación de aparición en contacto
    setTimeout(() => {
      if (this.mainContactLinks) {
        this.mainContactLinks.classList.add('merge-active');
      }
    }, mergeDelay);
    
    // Ocultar completamente el widget flotante
    setTimeout(() => {
      this.floatingContact.classList.remove('visible');
      this.floatingContact.classList.add('merging');
      this.isVisible = false;
    }, hideDelay);
  }

  resetMergeState() {
    if (!this.hasTriggeredMerge) return;
    
    this.hasTriggeredMerge = false;
    this.isMerging = false;
    
    // Limpiar clases de animación
    this.floatingContact.classList.remove('merge-animation', 'merging');
    if (this.mainContactLinks) {
      this.mainContactLinks.classList.remove('merge-active');
    }
    
    // Restaurar el estado del widget basado en la posición actual
    setTimeout(() => {
      this.handleScrollUpdate();
    }, 100);
  }

  // Método público para forzar actualización
  update() {
    this.handleScrollUpdate();
  }
}

// Inicializar cuando esté disponible
let widget = null;

function initWidget() {
  if (!widget) {
    widget = new FloatingContactWidget();
    window.floatingContactWidget = widget;
  }
}

// Múltiples puntos de inicialización para asegurar carga
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

// También inicializar en el evento load por si acaso
window.addEventListener('load', initWidget);

// Reinicializar en cambios de tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.floatingContactWidget) {
      window.floatingContactWidget.update();
    }
  }, 250);
});