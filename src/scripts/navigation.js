const navbar = document.getElementById('navbar');
const scrollDown = document.getElementById('scrollDown');
// detector táctil
function isTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.innerWidth <= 1024
  );
}

window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  if (navbar) {
    if (isTouchDevice()) {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const aboutPosition = aboutSection.offsetTop - 100;
        if (scrollPosition >= aboutPosition) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }
    } else {
      if (scrollPosition > 50) navbar.classList.add('scrolled');
      else navbar.classList.remove('scrolled');
    }
  }
  if (scrollDown) {
    if (scrollPosition > 100) scrollDown.classList.add('hidden');
    else scrollDown.classList.remove('hidden');
  }
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    if (navigator.vibrate) navigator.vibrate(50);
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.setManualNavigation) window.setManualNavigation(true);
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
  });
});

const langBtn = document.getElementById('langBtn');
const langPopover = document.getElementById('langPopover');
const langMenu = document.querySelector('.lang-menu');
const langIcon = document.getElementById('langIcon');
if (langMenu) langMenu.dataset.ready = '0';
if (langBtn && langPopover && langMenu) {
  const closeMenu = () => {
    langBtn.setAttribute('aria-expanded', 'false');
    langMenu.classList.remove('open');
  };
  const openMenu = () => {
    langBtn.setAttribute('aria-expanded', 'true');
    langMenu.classList.add('open');
  };

  const setLanguage = lang => {
    langBtn.setAttribute('data-lang', lang);
    if (lang === 'es') {
      langBtn.setAttribute('aria-label', 'Idioma: Español');
      langBtn.title = 'Español';
    } else {
      langBtn.setAttribute('aria-label', 'Language: English');
      langBtn.title = 'English';
    }
    try {
      localStorage.setItem('siteLang', lang);
    } catch {}
    window.dispatchEvent(new CustomEvent('localeChange', { detail: { lang } }));
    // Update visual selection inside the popover (if present)
    try {
      const items = langPopover.querySelectorAll('button[data-lang]');
      items.forEach(b => {
        if (b.getAttribute('data-lang') === lang) b.classList.add('selected');
        else b.classList.remove('selected');
      });
    } catch (e) {}
  };

  const selectNextLanguage = () => {
    const current = langBtn.getAttribute('data-lang') || 'es';
    const next = current === 'es' ? 'en' : 'es';
    setLanguage(next);
    try {
      if (typeof langBtn.focus === 'function') langBtn.focus();
    } catch (e) {}
    closeMenu();
    if (navigator.vibrate) navigator.vibrate(20);
  };

  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (langIcon) {
      langIcon.classList.remove('clicked');
      void langIcon.offsetWidth;
      langIcon.classList.add('clicked');
      clearTimeout(langIcon._langAnimTimeout);
      langIcon._langAnimTimeout = setTimeout(
        () => langIcon.classList.remove('clicked'),
        380
      );
    }
    // On touch devices, clicking the button should immediately toggle language.
    // On non-touch (hover-capable) devices, clicking toggles the popover open/close
    // so the user can hover/click the specific language.
    if (isTouchDevice && isTouchDevice()) {
      selectNextLanguage();
    } else {
      // Toggle menu open/close for desktop users
      if (langMenu.classList.contains('open')) closeMenu();
      else openMenu();
    }
  });

  if (langIcon) {
    langIcon.addEventListener('animationend', e => {
      if (
        e.animationName &&
        (e.animationName.indexOf('lang-click-bounce-icon') >= 0 ||
          e.animationName === 'lang-click-bounce-icon')
      ) {
        langIcon.classList.remove('clicked');
        clearTimeout(langIcon._langAnimTimeout);
      }
    });
  }
  langBtn.addEventListener('animationend', e => {
    if (
      e.animationName &&
      (e.animationName.indexOf('lang-click-bounce-icon') >= 0 ||
        e.animationName === 'lang-click-bounce-icon')
    )
      langBtn.classList.remove('clicked');
  });

  langBtn.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const first = langPopover.querySelector('button[data-lang]');
      first && first.focus();
      openMenu();
    } else if (e.key === 'Escape') {
      closeMenu();
      langBtn.focus();
    } else if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (langIcon) {
        langIcon.classList.remove('clicked');
        void langIcon.offsetWidth;
        langIcon.classList.add('clicked');
        clearTimeout(langIcon._langAnimTimeout);
        langIcon._langAnimTimeout = setTimeout(
          () => langIcon.classList.remove('clicked'),
          380
        );
      } else {
        langBtn.classList.remove('clicked');
        void langBtn.offsetWidth;
        langBtn.classList.add('clicked');
      }
      // On keyboard: if device is touch (or we detect mobile), toggle language; otherwise open the menu
      if (isTouchDevice && isTouchDevice()) selectNextLanguage();
      else openMenu();
    }
  });

  document.addEventListener('click', e => {
    if (!langMenu.contains(e.target)) closeMenu();
  });

  langPopover.querySelectorAll('button[data-lang]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const selected = btn.getAttribute('data-lang');
      if (langIcon) {
        langIcon.classList.remove('clicked');
        void langIcon.offsetWidth;
        langIcon.classList.add('clicked');
        clearTimeout(langIcon._langAnimTimeout);
        langIcon._langAnimTimeout = setTimeout(
          () => langIcon.classList.remove('clicked'),
          380
        );
      } else {
        langBtn.classList.remove('clicked');
        void langBtn.offsetWidth;
        langBtn.classList.add('clicked');
      }
      setLanguage(selected);
      try {
        if (typeof langBtn.focus === 'function') langBtn.focus();
      } catch (e) {}
      closeMenu();
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const selected = btn.getAttribute('data-lang');
        setLanguage(selected);
        closeMenu();
        return;
      }
      const items = Array.from(
        langPopover.querySelectorAll('button[data-lang]')
      );
      const idx = items.indexOf(btn);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[(idx + 1) % items.length];
        next && next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[(idx - 1 + items.length) % items.length];
        prev && prev.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0] && items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1] && items[items.length - 1].focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        langBtn.focus();
      }
    });
  });

  (function initLang() {
    let initial = 'es';
    try {
      const stored = localStorage.getItem('siteLang');
      if (stored) initial = stored;
      else if (langBtn.getAttribute('data-lang'))
        initial = langBtn.getAttribute('data-lang');
    } catch {
      if (langBtn.getAttribute('data-lang'))
        initial = langBtn.getAttribute('data-lang');
    }
    setLanguage(initial);
    try {
      closeMenu();
    } catch (e) {}
    try {
      if (typeof langBtn.blur === 'function') langBtn.blur();
    } catch (e) {}
    try {
      langIcon && langIcon.classList.remove('clicked');
    } catch (e) {}
    try {
      langBtn && langBtn.classList.remove('clicked');
    } catch (e) {}
    try {
      setTimeout(() => {
        langMenu.dataset.ready = '1';
      }, 50);
    } catch (e) {}
  })();
}

// Smooth scroll mejorado
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    const href = anchor.getAttribute('href');

    // Tratamiento especial para el logo AL
    if (href === '#top') {
      // Notificar al auto-scroll
      if (window.setManualNavigation) {
        window.setManualNavigation(true);
      }

      // Scroll al top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
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
        const offset = 60;
        const targetPosition = target.offsetTop - offset;

        // Usar requestAnimationFrame para asegurar que setManualNavigation se ejecute primero
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          });
        });
      }
    }
  });
});
