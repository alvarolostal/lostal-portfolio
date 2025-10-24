// public/scripts/floating-contact.js (deferred static copy)
class FloatingContactWidget {
  constructor() {
    this.widget = null;
    this.contactSection = null;
    this.projectsSection = null;
    this.isVisible = false;
    this.isAnimating = false;

    this.cachedPositions = {
      projectsTop: 0,
      contactTop: 0,
      lastUpdate: 0,
    };

    this.ticking = false;

    if (!this.isMobile()) {
      this.init();
    }
  }

  isMobile() {
    return (
      window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }

  init() {
    this.widget = document.getElementById('floating-contact');
    this.contactSection = document.getElementById('contact');
    this.projectsSection = document.getElementById('projects');

    if (!this.widget || !this.contactSection || !this.projectsSection) {
      console.warn('FloatingContact: Elementos requeridos no encontrados');
      return;
    }

    this.updateCachedPositions();

    window.addEventListener('scroll', () => this.requestTick(), { passive: true });

    window.addEventListener('resize', () => { this.updateCachedPositions(); }, { passive: true });

    this.handleScroll();
  }

  requestTick() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.handleScroll());
      this.ticking = true;
    }
  }

  updateCachedPositions() {
    const projectsRect = this.projectsSection.getBoundingClientRect();
    const contactRect = this.contactSection.getBoundingClientRect();
    const scrollY = window.scrollY;

    this.cachedPositions = {
      projectsTop: projectsRect.top + scrollY,
      contactTop: contactRect.top + scrollY,
      lastUpdate: Date.now(),
    };
  }

  handleScroll() {
    this.ticking = false;

    if (this.isAnimating) return;

    if (Date.now() - this.cachedPositions.lastUpdate > 5000) {
      this.updateCachedPositions();
    }

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const { projectsTop, contactTop } = this.cachedPositions;

    const afterProjects = scrollY + windowHeight > projectsTop + 200;
    const contactIconsVisible = scrollY + windowHeight > contactTop + 100;

    const shouldShow = afterProjects && !contactIconsVisible;

    if (shouldShow && !this.isVisible) {
      this.show();
    } else if (!shouldShow && this.isVisible) {
      this.hide();
    }
  }

  show() {
    if (this.isVisible || this.isAnimating) return;

    this.isAnimating = true;
    this.isVisible = true;

    this.widget.classList.remove('slide-down');
    this.widget.classList.add('visible');
    this.widget.classList.add('slide-up');

    setTimeout(() => {
      this.widget.classList.remove('slide-up');
      this.isAnimating = false;
    }, 500);
  }

  hide() {
    if (!this.isVisible || this.isAnimating) return;

    this.isAnimating = true;
    this.isVisible = false;

    this.widget.classList.remove('slide-up');
    this.widget.classList.add('slide-down');

    setTimeout(() => {
      this.widget.classList.remove('visible', 'slide-down');
      this.isAnimating = false;
    }, 400);
  }
}

(function initFloatingContact() {
  function bootstrap() { new FloatingContactWidget(); }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootstrap();
  } else {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  }
})();
