// public/scripts/theme.js (copied from src, used as deferred static asset)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

let userManualOverride = false;
const systemThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let deviceInfo = null;
let themeChangeInProgress = false;

function getDeviceInfo() {
  if (deviceInfo) return deviceInfo;

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  let deviceType = 'desktop';
  let operatingSystem = 'unknown';

  if (/iphone|ipad|ipod/.test(userAgent)) {
    operatingSystem = /ipad/.test(userAgent) ? 'ipados' : 'ios';
    deviceType = /ipad/.test(userAgent) ? 'tablet' : 'mobile';
  } else if (/android/.test(userAgent)) {
    operatingSystem = 'android';
    deviceType = /mobile/.test(userAgent) ? 'mobile' : 'tablet';
  } else if (/windows phone/.test(userAgent)) {
    operatingSystem = 'windows_mobile';
    deviceType = 'mobile';
  } else if (/windows/.test(userAgent) || /win32|win64/.test(platform)) {
    operatingSystem = 'windows';
  } else if (/macintosh|mac os x/.test(userAgent)) {
    operatingSystem = 'macos';
  } else if (/linux/.test(userAgent)) {
    operatingSystem = 'linux';
  } else if (/cros/.test(userAgent)) {
    operatingSystem = 'chromeos';
  }

  if (/mobile|android|iphone|ipod|blackberry|windows phone/.test(userAgent)) {
    deviceType = 'mobile';
  } else if (
    /ipad|tablet/.test(userAgent) ||
    (window.innerWidth <= 1024 && 'ontouchstart' in window)
  ) {
    deviceType = 'tablet';
  }

  deviceInfo = {
    deviceType,
    operatingSystem,
    touchScreen: 'ontouchstart' in window,
    orientation: typeof window.orientation !== 'undefined',
    isMobile: deviceType === 'mobile' || deviceType === 'tablet',
  };

  return deviceInfo;
}

function getSystemTheme() {
  return systemThemeMediaQuery.matches ? 'dark' : 'light';
}

function getInitialTheme() {
  const manualOverride = sessionStorage.getItem('themeManualOverride');

  if (manualOverride === 'true') {
    const manualTheme = localStorage.getItem('theme');
    if (manualTheme) {
      userManualOverride = true;
      return manualTheme;
    }
  }

  userManualOverride = false;
  return getSystemTheme();
}

function applyTheme(theme, source = 'system') {
  if (!theme || themeChangeInProgress) return;

  themeChangeInProgress = true;
  const device = getDeviceInfo();

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

  if (source !== 'manual') {
    localStorage.removeItem('theme');
    sessionStorage.removeItem('themeManualOverride');
    userManualOverride = false;
  }
}

function updateThemeIcon() {
  if (!themeIcon) return;

  const device = getDeviceInfo();
  const animationDuration = device.isMobile ? '0.2s' : '0.3s';
  themeIcon.style.transition = `all ${animationDuration} ease`;
  themeIcon.classList.remove('fa-moon', 'fa-sun', 'fa-lightbulb');
  themeIcon.classList.add('fa-lightbulb');
  const rotationAngle = device.isMobile ? '15deg' : '20deg';
  themeIcon.style.transform = `rotate(${rotationAngle})`;
  setTimeout(() => {
    themeIcon.style.transform = 'rotate(0deg)';
  }, device.isMobile ? 200 : 300);
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme, userManualOverride ? 'manual' : 'system');

function handleSystemThemeChange(e) {
  if (!userManualOverride) {
    const systemTheme = e.matches ? 'dark' : 'light';
    applyTheme(systemTheme, 'system');
  }
}

systemThemeMediaQuery.addEventListener('change', handleSystemThemeChange);
if (systemThemeMediaQuery.addListener) {
  systemThemeMediaQuery.addListener(handleSystemThemeChange);
}

if (themeToggle) {
  themeToggle.addEventListener('click', e => {
    e.preventDefault();

    const currentTheme = html.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    userManualOverride = true;
    themeToggle.classList.add('animate');
    setTimeout(() => {
      themeToggle.classList.remove('animate');
    }, 800);

    localStorage.setItem('theme', newTheme);
    sessionStorage.setItem('themeManualOverride', 'true');

    applyTheme(newTheme, 'manual');

    const device = getDeviceInfo();
    if ('vibrate' in navigator && device.touchScreen) {
      navigator.vibrate(50);
    }
  });

  let clickCount = 0;
  themeToggle.addEventListener('click', () => {
    clickCount++;
    setTimeout(() => {
      if (clickCount === 2) {
        userManualOverride = false;
        localStorage.removeItem('theme');
        sessionStorage.removeItem('themeManualOverride');

        const systemTheme = getSystemTheme();
        applyTheme(systemTheme, 'system');

        themeToggle.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
          themeToggle.style.animation = '';
        }, 600);

        showThemeNotification(`Tema sincronizado con el sistema (${systemTheme})`);
      }
      clickCount = 0;
    }, 300);
  });
}

function showThemeNotification(message) {
  let notification = document.getElementById('theme-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'theme-notification';
    notification.style.cssText = `position: fixed; top: 80px; right: 20px; background: var(--bg-secondary); color: var(--text-primary); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border); font-size: 14px; z-index: 10000; opacity: 0; transform: translateX(100%); transition: all 0.3s ease; box-shadow: var(--shadow-lg); backdrop-filter: blur(10px); max-width: 300px; font-family: inherit;`;
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
  }, 3000);
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && !userManualOverride) {
    const currentSystemTheme = getSystemTheme();
    const currentPageTheme = html.getAttribute('data-theme');

    if (currentSystemTheme !== currentPageTheme) {
      applyTheme(currentSystemTheme, 'system');
    }
  }
});

window.addEventListener('orientationchange', () => {
  setTimeout(() => {
    if (!userManualOverride) {
      const currentSystemTheme = getSystemTheme();
      applyTheme(currentSystemTheme, 'system');
    }
  }, 100);
});

if (window.matchMedia) {
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotionQuery.addEventListener('change', e => {
    if (e.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
  });

  if (reduceMotionQuery.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
  }
}

window.addEventListener('beforeunload', () => {
  if (systemThemeMediaQuery.removeEventListener) {
    systemThemeMediaQuery.removeEventListener('change', handleSystemThemeChange);
  }
  if (systemThemeMediaQuery.removeListener) {
    systemThemeMediaQuery.removeListener(handleSystemThemeChange);
  }

  const notification = document.getElementById('theme-notification');
  if (notification) {
    notification.remove();
  }
});

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
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
