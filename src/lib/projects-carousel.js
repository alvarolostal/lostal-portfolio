import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/**
 * Inicializa el carrusel de proyectos usando Swiper
 * @returns {Object|null} Instancia de Swiper o null si no existe el carrusel
 */
function initProjectsCarousel() {
  const carousel = document.querySelector('.projects-carousel');
  if (!carousel) return null;

  // Prevenir múltiples inicializaciones
  if (carousel.swiperInstance) {
    return carousel.swiperInstance;
  }

  const slider = carousel.querySelector('.swiper');
  const prevEl = carousel.querySelector('.slider-nav__item_prev');
  const nextEl = carousel.querySelector('.slider-nav__item_next');

  // Crear instancia de Swiper
  const swiper = new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1.3,
    spaceBetween: 24,
    speed: 500,
    centeredSlides: true,
    initialSlide: 0,
    loop: false,
    grabCursor: true,
    navigation: {
      nextEl,
      prevEl,
      disabledClass: 'disabled',
    },
    breakpoints: {
      // Móvil pequeño
      375: {
        slidesPerView: 1.4,
        spaceBetween: 20,
      },
      // Móvil grande
      480: {
        slidesPerView: 1.5,
        spaceBetween: 24,
      },
      // Tablet pequeña
      640: {
        slidesPerView: 2.0,
        spaceBetween: 28,
      },
      // Tablet
      768: {
        slidesPerView: 2.2,
        spaceBetween: 32,
      },
      // Desktop pequeño
      1024: {
        slidesPerView: 2.6,
        spaceBetween: 36,
      },
      // Desktop medio
      1280: {
        slidesPerView: 2.8,
        spaceBetween: 40,
      },
      // Desktop grande
      1440: {
        slidesPerView: 3.0,
        spaceBetween: 44,
      },
      // Desktop muy grande
      1920: {
        slidesPerView: 3.2,
        spaceBetween: 48,
      },
      // Pantallas ultra anchas
      2400: {
        slidesPerView: 3.4,
        spaceBetween: 52,
      },
    },
  });

  // Guardar la instancia para acceso externo (navegación por teclado)
  carousel.swiperInstance = swiper;

  // Función nombrada para navegación por teclado (permite eliminarla después)
  const handleKeyNavigation = e => {
    // Solo activar si el carrusel o sus elementos tienen el foco
    const carouselHasFocus =
      carousel.contains(document.activeElement) ||
      document.activeElement === carousel;

    if (!carouselHasFocus) return;

    // Soporte para IE/Edge legacy y navegadores modernos
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      swiper.slidePrev();
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      swiper.slideNext();
    }
  };

  // Eliminar listener previo si existe (prevenir duplicados)
  if (carousel._keyNavigationHandler) {
    document.removeEventListener('keydown', carousel._keyNavigationHandler);
  }

  // Guardar referencia y añadir listener
  carousel._keyNavigationHandler = handleKeyNavigation;
  document.addEventListener('keydown', handleKeyNavigation);

  // Hacer el carrusel focusable para navegación por teclado
  if (!carousel.hasAttribute('tabindex')) {
    carousel.setAttribute('tabindex', '0');
  }

  // Método de limpieza para cuando el componente se desmonta
  carousel.destroy = () => {
    // Limpiar event listener de teclado
    if (carousel._keyNavigationHandler) {
      document.removeEventListener('keydown', carousel._keyNavigationHandler);
      carousel._keyNavigationHandler = null;
    }
    // Destruir instancia de Swiper (true, true = limpiar completamente)
    if (carousel.swiperInstance) {
      carousel.swiperInstance.destroy(true, true);
      carousel.swiperInstance = null;
    }
  };

  return swiper;
}

/**
 * Inicializa la funcionalidad del modal de detalles de proyectos
 */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const closeButton = modal?.querySelector('.project-modal__close');
  const overlay = modal?.querySelector('.project-modal__overlay');
  const buttons = document.querySelectorAll('[data-project]');

  if (!modal || !modalContent) return;

  let scrollPosition = 0;

  // Función para abrir el modal
  const openModal = projectId => {
    const template = document.getElementById(`${projectId}-template`);
    if (!template) return;

    // Guardar la posición actual del scroll
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Clonar el contenido del template
    const content = template.content.cloneNode(true);
    modalContent.innerHTML = '';
    modalContent.appendChild(content);

    // Aplicar traducciones al contenido del modal
    if (window.i18n) {
      window.i18n.applyTranslations(window.i18n.currentLang);
    }

    // Bloquear el scroll del body
    document.body.classList.add('modal-open');
    document.body.style.top = `-${scrollPosition}px`;

    // Abrir el modal con animación
    modal.classList.add('is-open');
  };

  // Función para cerrar el modal
  const closeModal = () => {
    modal.classList.remove('is-open');

    // Limpiar contenido después de la animación
    setTimeout(() => {
      modalContent.innerHTML = '';
      
      // Restaurar scroll del body después de que termine la animación del modal
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      
      // Usar requestAnimationFrame para una restauración más suave
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosition);
      });
    }, 300);
  };

  // Event listeners para abrir el modal
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const projectId = button.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Event listener para cerrar con el botón X
  closeButton?.addEventListener('click', closeModal);

  // Event listener para cerrar con el overlay
  overlay?.addEventListener('click', closeModal);

  // Event listener para cerrar con la tecla Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initProjectsCarousel();
    initProjectModal();
  });
} else {
  initProjectsCarousel();
  initProjectModal();
}
