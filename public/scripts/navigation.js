// public/scripts/navigation.js (deferred static copy)
// Navbar scroll effect
const navbar = document.getElementById('navbar');
const scrollDown = document.getElementById('scrollDown');

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
        if (scrollPosition >= aboutPosition) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    } else {
      if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  if (scrollDown) {
    if (scrollPosition > 100) {
      scrollDown.classList.add('hidden');
    } else {
      scrollDown.classList.remove('hidden');
    }
  }
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  });
}

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.setManualNavigation) {
      window.setManualNavigation(true);
    }

    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('active');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    const href = anchor.getAttribute('href');

    if (href === '#top') {
      if (window.setManualNavigation) {
        window.setManualNavigation(true);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        if (window.resetAutoScroll) {
          window.resetAutoScroll();
        }
      }, 600);

      return;
    }

    if (window.setManualNavigation) {
      window.setManualNavigation(true);
    }

    if (href) {
      const target = document.querySelector(href);
      if (target) {
        const offset = 60;
        const targetPosition = target.offsetTop - offset;

        requestAnimationFrame(() => {
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        });
      }
    }
  });
});
