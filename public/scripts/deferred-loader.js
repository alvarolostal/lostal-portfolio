// public/scripts/deferred-loader.js
// Loader diferido para scripts no críticos. Diseñado para ser incluido con `defer`.
(function () {
  'use strict';

  function loadScript(src, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
        try {
          const s = document.createElement('script');
          s.src = src;
          if (opts.type) s.type = opts.type;
          if (opts.defer) s.defer = true;
          if (opts.async) s.async = true;
          s.onload = resolve;
          s.onerror = function (err) { reject(err); };
          document.body.appendChild(s);
        } catch (err) {
          reject(err);
        }
    });
  }

  function loadNonCritical() {
    const scripts = [
      '/scripts/navigation.js',
      '/scripts/animations.js',
      '/scripts/auto-scroll.js',
      '/scripts/floating-contact.js',
      '/scripts/theme.js'
    ];

    scripts.forEach(function (s) {
      loadScript(s, { defer: true }).catch(function () {});
    });
  }

  function scheduleLoad() {
    if (typeof requestIdleCallback === 'function') {
        try {
          requestIdleCallback(loadNonCritical, { timeout: 1000 });
          return;
        } catch {
          // fallthrough to load event
        }
    }

    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('load', function () {
        setTimeout(loadNonCritical, 300);
      }, false);
    } else {
      // last resort
      setTimeout(loadNonCritical, 1000);
    }
  }

  // If the DOM is already ready, schedule immediately; otherwise schedule when script runs (defer ensures parsing done)
  try {
    scheduleLoad();
  } catch (err) {
    void err;
  }
})();
