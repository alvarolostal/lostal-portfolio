// i18n.js - Sistema de internacionalización
const translations = {
  es: {
    // Navigation
    'nav.projects': 'Proyectos',
    'nav.journey': 'Recorrido',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contacto',
    'nav.theme': 'Cambiar tema',
    'nav.menu': 'Menú',

    // Hero
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Álvaro Lostal',
    'hero.description':
      'Ingeniero Informático especializado en Desarrollo Web Frontend.',
    'hero.description2': 'Me inspiran el diseño y la simplicidad.',
    'hero.cta.contact': 'Contactar',
    'hero.cta.portfolio': 'Ver portafolio',

    // About Card
    'about.title': 'Sobre mí',
    'about.text':
      'Soy Álvaro Lostal, ingeniero informático (21) de Santander, España. Me dedico al desarrollo frontend y al diseño de interfaces elegantes, minimalistas y funcionales; estudio el último año del grado en la Universidad Europea del Atlántico.',
    'about.stat.graduation': 'Graduación',
    'about.stat.english': 'Inglés',
    'about.stat.selftaught': 'Autodidacta',

    // Projects
    'projects.label': 'Proyectos',
    'projects.title': 'Mi Trabajo',
    'projects.description':
      'Estos proyectos web reflejan mi enfoque en el diseño minimalista, una UX cuidada y buenas prácticas de desarrollo.',
    'projects.prev': 'Proyecto anterior',
    'projects.next': 'Siguiente proyecto',
    'projects.view': 'Ver proyecto',
    'projects.more': 'Ver más',
    'projects.vivenza.title': 'Rediseño Vivenza Expo',
    'projects.vivenza.description':
      'Rediseño completo de la landing page de Vivenza Expo, aplicando principios de diseño moderno.',
    'projects.vivenza.more': 'Ver más sobre Rediseño Vivenza Expo',
    'projects.creative.title': 'Creative Hands',
    'projects.creative.description':
      'Tienda PWA con autenticación JWT y chat en tiempo real (Socket.io).',
    'projects.creative.more': 'Ver más sobre Creative Hands',

    // Journey
    'journey.label': 'Recorrido',
    'journey.experience': 'Experiencia',
    'journey.education': 'Educación',
    'journey.eurocastalia.title': 'Prácticas en Desarrollo Web',
    'journey.eurocastalia.date': 'Sep 2025 - Actualidad',
    'journey.eurocastalia.company': 'Eurocastalia',
    'journey.eurocastalia.description':
      'Prácticas centradas en WordPress, con algo de Liferay y desarrollo en PHP, usando HTML, CSS y JavaScript. Participé en todo el ciclo de diseño y despliegue, tratando con clientes y priorizando accesibilidad y rendimiento.',
    'journey.eurocastalia.task1':
      'Desarrollo y personalización en WordPress, PHP y Liferay',
    'journey.eurocastalia.task2': 'Optimización del SEO y accesibilidad',
    'journey.uea.title': 'Grado en Ingeniería Informática',
    'journey.uea.date': 'Sep 2022 - Jun 2026',
    'journey.uea.institution': 'Universidad Europea del Atlántico',
    'journey.uea.description':
      'Programa integral de informática, con formación en distintas áreas del desarrollo y la tecnología.',
    'journey.uea.subject1': 'Desarrollo Web',
    'journey.uea.subject2': 'Ingeniería del Software',
    'journey.uea.subject3': 'Seguridad Informática y Criptografía',
    'journey.cambridge.title': 'B2 First (FCE)',
    'journey.cambridge.date': '2021',
    'journey.cambridge.institution': 'Cambridge Assessment English',
    'journey.cambridge.description': 'Certificación oficial B2 (FCE).',

    // Skills
    'skills.label': 'Habilidades',
    'skills.title': 'Competencias Técnicas',
    'skills.description':
      'Tecnologías y herramientas con las que trabajo día a día',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Herramientas',

    // Contact
    'contact.label': 'Contacto',
    'contact.title': 'Conectemos',
    'contact.description': '¿Tienes algo en mente? Ponte en contacto conmigo.',

    // Footer
    'footer.copyright': 'Hecho con ❤️ en Santander, España.',

    // Accessibility
    'hero.image.alt': 'Ver información personal de Álvaro Lostal',
    'about.close.label': 'Cerrar información',
    'scroll.label': 'Ir a proyectos',
  },
  en: {
    // Navigation
    'nav.projects': 'Projects',
    'nav.journey': 'Journey',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    'nav.theme': 'Toggle theme',
    'nav.menu': 'Menu',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.name': 'Álvaro Lostal',
    'hero.description':
      'Computer Engineer specialized in Frontend Web Development.',
    'hero.description2': 'Inspired by design and simplicity.',
    'hero.cta.contact': 'Contact',
    'hero.cta.portfolio': 'View portfolio',

    // About Card
    'about.title': 'About me',
    'about.text':
      "I'm Álvaro Lostal, a 21-year-old computer engineer from Santander, Spain. I dedicate myself to frontend development and designing elegant, minimalist and functional interfaces; I'm studying the last year of my degree at the European University of the Atlantic.",
    'about.stat.graduation': 'Graduation',
    'about.stat.english': 'English',
    'about.stat.selftaught': 'Self-taught',

    // Projects
    'projects.label': 'Projects',
    'projects.title': 'My Work',
    'projects.description':
      'These web projects reflect my focus on minimalist design, careful UX and good development practices.',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.view': 'View project',
    'projects.more': 'View more',
    'projects.vivenza.title': 'Vivenza Expo Redesign',
    'projects.vivenza.description':
      'Complete redesign of the Vivenza Expo landing page, applying modern design principles.',
    'projects.vivenza.more': 'View more about Vivenza Expo Redesign',
    'projects.creative.title': 'Creative Hands',
    'projects.creative.description':
      'PWA store with JWT authentication and real-time chat (Socket.io).',
    'projects.creative.more': 'View more about Creative Hands',

    // Journey
    'journey.label': 'Journey',
    'journey.experience': 'Experience',
    'journey.education': 'Education',
    'journey.eurocastalia.title': 'Web Development Internship',
    'journey.eurocastalia.date': 'Sep 2025 - Present',
    'journey.eurocastalia.company': 'Eurocastalia',
    'journey.eurocastalia.description':
      'Internship focused on WordPress, with some Liferay and PHP development, using HTML, CSS and JavaScript. Participated in the entire design and deployment cycle, dealing with clients and prioritizing accessibility and performance.',
    'journey.eurocastalia.task1':
      'Development and customization in WordPress, PHP and Liferay',
    'journey.eurocastalia.task2': 'SEO and accessibility optimization',
    'journey.uea.title': "Bachelor's Degree in Computer Engineering",
    'journey.uea.date': 'Sep 2022 - Jun 2026',
    'journey.uea.institution': 'European University of the Atlantic',
    'journey.uea.description':
      'Comprehensive computer science program, with training in different areas of development and technology.',
    'journey.uea.subject1': 'Web Development',
    'journey.uea.subject2': 'Software Engineering',
    'journey.uea.subject3': 'Computer Security and Cryptography',
    'journey.cambridge.title': 'B2 First (FCE)',
    'journey.cambridge.date': '2021',
    'journey.cambridge.institution': 'Cambridge Assessment English',
    'journey.cambridge.description': 'Official B2 (FCE) certification.',

    // Skills
    'skills.label': 'Skills',
    'skills.title': 'Technical Competencies',
    'skills.description': 'Technologies and tools I work with daily',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools',

    // Contact
    'contact.label': 'Contact',
    'contact.title': "Let's Connect",
    'contact.description': 'Have something in mind? Get in touch with me.',

    // Footer
    'footer.copyright': 'Made with ❤️ in Santander, Spain.',

    // Accessibility
    'hero.image.alt': "View Álvaro Lostal's personal information",
    'about.close.label': 'Close information',
    'scroll.label': 'Go to projects',
  },
};

class I18n {
  constructor() {
    this.currentLang = this.getInitialLanguage();
    this.init();
  }

  getInitialLanguage() {
    try {
      const stored = localStorage.getItem('siteLang');
      if (stored && (stored === 'es' || stored === 'en')) {
        return stored;
      }
    } catch (e) {
      console.warn('Could not access localStorage:', e);
    }
    return 'es';
  }

  init() {
    // Aplicar idioma inicial
    this.applyTranslations(this.currentLang);

    // Escuchar eventos de cambio de idioma
    window.addEventListener('localeChange', e => {
      const newLang = e.detail.lang;
      if (newLang !== this.currentLang && translations[newLang]) {
        this.currentLang = newLang;
        this.applyTranslations(newLang);
      }
    });
  }

  applyTranslations(lang) {
    if (!translations[lang]) {
      console.warn(`Language ${lang} not found`);
      return;
    }

    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = translations[lang][key];

      if (translation) {
        // Actualizar el contenido de texto
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Actualizar atributos aria-label
    const ariaElements = document.querySelectorAll('[data-i18n-aria]');
    ariaElements.forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = translations[lang][key];

      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });

    // Actualizar alt de imágenes
    const altElements = document.querySelectorAll('[data-i18n-alt]');
    altElements.forEach(element => {
      const key = element.getAttribute('data-i18n-alt');
      const translation = translations[lang][key];

      if (translation) {
        element.setAttribute('alt', translation);
      }
    });
  }

  translate(key, lang = this.currentLang) {
    return translations[lang]?.[key] || key;
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
  });
} else {
  window.i18n = new I18n();
}
