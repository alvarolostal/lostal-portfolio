// src/scripts/theme.js
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Variables de control para la gestión de temas
let userManualOverride = false; // Flag para saber si el usuario cambió manualmente
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let deviceInfo = null; // Cache de información del dispositivo
let themeChangeInProgress = false; // Prevenir cambios concurrentes

// Función para detectar características del dispositivo (feature detection)
function getDeviceInfo() {
  if (deviceInfo) return deviceInfo; // usar cache

  // Detectar si tiene pantalla táctil moderna
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const hasTouchAPI = maxTouchPoints > 0;
  const pointerCoarse =
    window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  const touchScreen = hasTouchAPI || pointerCoarse || 'ontouchstart' in window;

  // Determinar tipo de dispositivo de forma simple y robusta
  const isSmallWidth = window.innerWidth <= 768;
  const isTabletWidth = window.innerWidth > 768 && window.innerWidth <= 1024;

  const deviceType = isSmallWidth
    ? 'mobile'
    : isTabletWidth
      ? 'tablet'
      : 'desktop';

  deviceInfo = {
    deviceType,
    operatingSystem: navigator.platform || 'unknown',
    touchScreen,
    orientation: typeof window.orientation !== 'undefined',
    isMobile: deviceType === 'mobile' || deviceType === 'tablet',
  };

  return deviceInfo;
}

// Función para obtener el tema preferido del sistema
function getSystemTheme() {
  return systemThemeMediaQuery.matches ? 'dark' : 'light';
}

// Función para obtener el tema que se debe aplicar al cargar
function getInitialTheme() {
  // Verificar si hay una preferencia manual guardada en esta sesión
  const manualOverride = sessionStorage.getItem('themeManualOverride');

  if (manualOverride === 'true') {
    const manualTheme = localStorage.getItem('theme');
    if (manualTheme) {
      userManualOverride = true;
      return manualTheme;
    }
  }

  // Si no hay override manual, usar el tema del sistema
  userManualOverride = false;
  return getSystemTheme();
}

// Función para aplicar el tema
function applyTheme(theme, source = 'system') {
  if (!theme || themeChangeInProgress) return;

  themeChangeInProgress = true;
  const device = getDeviceInfo();

  // Desarrollo: no imprimir logs en la consola del usuario
  // (la información de depuración se mantiene accesible vía window.themeDebug)

  // Optimización para móviles: aplicar tema sin transiciones si es necesario
  if (device.isMobile && source === 'system') {
    html.classList.add('theme-loading');
    requestAnimationFrame(() => {
      html.setAttribute('data-theme', theme);
      updateThemeIcon();
      requestAnimationFrame(() => {
        html.classList.remove('theme-loading');
        themeChangeInProgress = false;
      });
    });
  } else {
    html.setAttribute('data-theme', theme);
    updateThemeIcon();
    setTimeout(() => {
      themeChangeInProgress = false;
    }, 300);
  }

  // Si el cambio no es manual, limpiar cualquier override
  if (source !== 'manual') {
    localStorage.removeItem('theme');
    sessionStorage.removeItem('themeManualOverride');
    userManualOverride = false;
  }
}

// Función para actualizar el ícono del tema
function updateThemeIcon() {
  if (!themeIcon) return;

  const device = getDeviceInfo();

  // Reducir animaciones en móviles para mejor rendimiento
  const animationDuration = device.isMobile ? '0.2s' : '0.3s';
  themeIcon.style.transition = `all ${animationDuration} ease`;

  // Remover todas las clases de iconos
  themeIcon.classList.remove('fa-moon', 'fa-sun', 'fa-lightbulb');

  // Usar el ícono de bombilla como era originalmente
  themeIcon.classList.add('fa-lightbulb');

  // Animación más ligera en móviles
  const rotationAngle = device.isMobile ? '15deg' : '20deg';
  themeIcon.style.transform = `rotate(${rotationAngle})`;
  setTimeout(
    () => {
      themeIcon.style.transform = 'rotate(0deg)';
    },
    device.isMobile ? 200 : 300
  );
}

// Aplicar tema inicial inmediatamente al cargar
const initialTheme = getInitialTheme();
applyTheme(initialTheme, userManualOverride ? 'manual' : 'system');

// Función para manejar cambios del sistema en tiempo real
function handleSystemThemeChange(e) {
  // Solo aplicar cambios automáticos si no hay override manual
  if (!userManualOverride) {
    const systemTheme = e.matches ? 'dark' : 'light';
    applyTheme(systemTheme, 'system');
  }
}

// Escuchar cambios en la preferencia del sistema
systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);

// Compatibilidad con navegadores más antiguos
if (systemThemeMediaQuery.addListener) {
  systemThemeMediaQuery.addListener(handleSystemThemeChange);
}

// Funcionalidad del botón toggle (cambio manual)
if (themeToggle) {
  themeToggle.addEventListener('click', e => {
    e.preventDefault();

    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Marcar como override manual
    userManualOverride = true;

    // Añadir clase de animación
    themeToggle.classList.add('animate');

    // Remover la clase después de la animación
    setTimeout(() => {
      themeToggle.classList.remove('animate');
    }, 800);

    // Guardar preferencia manual
    localStorage.setItem('theme', newTheme);
    sessionStorage.setItem('themeManualOverride', 'true');

    // Aplicar el tema
    applyTheme(newTheme, 'manual');

    // Vibración en móviles si está disponible
    const device = getDeviceInfo();
    if ('vibrate' in navigator && device.touchScreen) {
      navigator.vibrate(50);
    }
  });

  // Funcionalidad adicional: doble click para resetear al sistema
  let clickCount = 0;
  themeToggle.addEventListener('click', () => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 2) {
        // Doble click: resetear al tema del sistema
        userManualOverride = false;
        localStorage.removeItem('theme');
        sessionStorage.removeItem('themeManualOverride');

        const systemTheme = getSystemTheme();
        applyTheme(systemTheme, 'system');

        // Feedback visual
        themeToggle.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
          themeToggle.style.animation = '';
        }, 600);

        // Mostrar notificación temporal
        showThemeNotification(
          `Tema sincronizado con el sistema (${systemTheme})`
        );
      }
      clickCount = 0;
    }, 300);
  });
}

// Función para mostrar notificaciones de tema
function showThemeNotification(message) {
  const notification = document.getElementById('theme-notification');
  if (!notification) return; // si no existe, no hacemos nada

  // Actualizar texto y mostrar mediante clase
  notification.textContent = message;
  notification.classList.add('is-visible');

  // Ocultar después de 3s
  window.clearTimeout(notification._hideTimeout);
  notification._hideTimeout = setTimeout(() => {
    notification.classList.remove('is-visible');
  }, 3000);
}

// Escuchar eventos de visibilidad para detectar cambios cuando se vuelve a la página
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !userManualOverride) {
    // Si la página se vuelve visible y no hay override manual,
    // verificar si el tema del sistema ha cambiado
    const currentSystemTheme = getSystemTheme();
    const currentPageTheme = html.getAttribute('data-theme');

    if (currentSystemTheme !== currentPageTheme) {
      applyTheme(currentSystemTheme, 'system');
    }
  }
});

// Detectar cambios de orientación en móviles
window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    if (!userManualOverride) {
      const currentSystemTheme = getSystemTheme();
      applyTheme(currentSystemTheme, 'system');
    }
  }, 100);
});

// Detectar preferencia de movimiento reducido
if (window.matchMedia) {
  const reduceMotionQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  reduceMotionQuery.addEventListener('change', e => {
    if (e.matches) {
      document.documentElement.style.setProperty(
        '--animation-duration',
        '0.1s'
      );
    } else {
      document.documentElement.style.setProperty(
        '--animation-duration',
        '0.3s'
      );
    }
  });

  if (reduceMotionQuery.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
  }
}

// Cleanup al descargar la página
window.addEventListener('beforeunload', () => {
  if (systemThemeMediaQuery.removeEventListener) {
    systemThemeMediaQuery.removeEventListener(
      'change',
      handleSystemThemeChange
    );
  }
  if (systemThemeMediaQuery.removeListener) {
    systemThemeMediaQuery.removeListener(handleSystemThemeChange);
  }

  // Limpiar cualquier timeout pendiente de la notificación y esconderla.
  const notification = document.getElementById('theme-notification');
  if (notification) {
    if (notification._hideTimeout) {
      window.clearTimeout(notification._hideTimeout);
    }
    notification.classList.remove('is-visible');
  }
});

// API de debugging para desarrollo
if (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
) {
  window.themeDebug = {
    getState: () => ({
      currentTheme: html.getAttribute('data-theme'),
      userOverride: userManualOverride,
      systemTheme: getSystemTheme(),
      deviceInfo: getDeviceInfo(),
    }),
    forceTheme: theme => applyTheme(theme, 'debug'),
    resetToSystem: () => {
      userManualOverride = false;
      localStorage.removeItem('theme');
      sessionStorage.removeItem('themeManualOverride');
      applyTheme(getSystemTheme(), 'system');
    },
    showNotification: showThemeNotification,
  };
}
