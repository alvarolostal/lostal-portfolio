// src/scripts/scroll-progress.js

// Variables globales
let progressIndicator = null;
let progressFill = null;
let isVisible = false;
let hasAutoScrolled = false;
let isTouchDevice = false;
let initialScrollDetected = false;

// Detectar si es un dispositivo táctil
function detectTouchDevice() {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0 ||
    window.innerWidth <= 1024 // Considerar tablets como táctiles
  );
}

// Función para mostrar la barra
function showProgressBar() {
  if (!isVisible && progressIndicator) {
    isVisible = true;
    progressIndicator.classList.add('showing');
    progressIndicator.style.opacity = '1';
    progressIndicator.style.visibility = 'visible';
    
    // Remover la clase de animación después de que termine
    setTimeout(() => {
      progressIndicator.classList.remove('showing');
    }, 400);
    
    console.log('✅ Barra de progreso mostrada');
  }
}

// Función para ocultar la barra
function hideProgressBar() {
  if (isVisible && progressIndicator) {
    isVisible = false;
    progressIndicator.style.opacity = '0';
    progressIndicator.style.visibility = 'hidden';
    console.log('🙈 Barra de progreso ocultada');
  }
}

// Función principal para actualizar el progreso
function updateScrollProgress() {
  if (!progressIndicator || !progressFill) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  
  // Calcular el porcentaje de scroll (de 0 a 100)
  const scrollProgress = Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100);
  
  // Actualizar la altura de la barra (se llena hacia abajo)
  progressFill.style.height = `${scrollProgress}%`;
  
  // Debug adicional para dispositivos táctiles
  if (isTouchDevice && scrollTop < 100) {
    console.log(`📱 Touch Debug - ScrollTop: ${scrollTop}, Visible: ${isVisible}, InitialDetected: ${initialScrollDetected}`);
  }
  
  // Lógica de visibilidad
  handleVisibility(scrollTop, windowHeight);
}

// Manejar la visibilidad según el dispositivo y estado de scroll
function handleVisibility(scrollTop, windowHeight) {
  const scrollThreshold = windowHeight * 0.1; // 10% de la pantalla
  
  if (isTouchDevice) {
    // En dispositivos táctiles: mostrar apenas se detecte scroll
    if (scrollTop > 20 && !initialScrollDetected) {
      initialScrollDetected = true;
      showProgressBar();
      console.log('📱 Dispositivo táctil: mostrando barra al deslizar');
    }
    
    // IMPORTANTE: También ocultar cuando volvemos al top en táctiles
    if (scrollTop < 50) {
      hideProgressBar();
      initialScrollDetected = false;
      console.log('📱 Dispositivo táctil: ocultando barra al volver al top');
    }
  } else {
    // En desktop: mostrar después del auto-scroll o scroll manual significativo
    if (scrollTop > scrollThreshold) {
      if (!hasAutoScrolled) {
        // Detectar si fue auto-scroll (movimiento suave y rápido)
        detectAutoScroll(scrollTop);
      }
      
      if (hasAutoScrolled || scrollTop > windowHeight * 0.3) {
        showProgressBar();
      }
    } else if (scrollTop < 50) {
      // Ocultar cuando volvemos al top
      hideProgressBar();
      hasAutoScrolled = false;
      initialScrollDetected = false;
    }
  }
}

// Detectar auto-scroll (para desktop)
function detectAutoScroll(currentScrollTop) {
  // El auto-scroll típicamente lleva a la sección "about" que está alrededor del 100vh
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    const aboutPosition = aboutSection.offsetTop;
    const tolerance = 100; // margen de tolerancia
    
    if (Math.abs(currentScrollTop - aboutPosition + 80) < tolerance) {
      hasAutoScrolled = true;
      console.log('🎯 Auto-scroll detectado');
    }
  }
  
  // También detectar por velocidad/patrón de scroll
  if (currentScrollTop > window.innerHeight * 0.8) {
    hasAutoScrolled = true;
  }
}

// Event listeners
function setupEventListeners() {
  // Scroll listener principal
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  // Resize listener
  window.addEventListener('resize', () => {
    // Re-detectar si cambió el tipo de dispositivo
    isTouchDevice = detectTouchDevice();
    updateScrollProgress();
  }, { passive: true });
  
  // Touch listeners específicos para móviles
  if (isTouchDevice) {
    window.addEventListener('touchstart', () => {
      console.log('👆 Touch start detectado');
    }, { passive: true });
    
    window.addEventListener('touchmove', () => {
      if (!initialScrollDetected) {
        setTimeout(updateScrollProgress, 50);
      }
    }, { passive: true });
    
    // Listener específico para detectar cuando se vuelve al top en móviles
    window.addEventListener('touchend', () => {
      setTimeout(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop <= 10) {
          console.log('📱 Touch end detectado en top - forzando ocultación');
          hideProgressBar();
          initialScrollDetected = false;
        }
      }, 100);
    }, { passive: true });
  }
  
  // Listener para clicks en enlaces de navegación (auto-scroll)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link && !isTouchDevice) {
      // Marcar que va a haber auto-scroll
      setTimeout(() => {
        hasAutoScrolled = true;
        console.log('� Auto-scroll iniciado por navegación');
      }, 100);
    }
  });
}

// Inicialización
function initScrollProgress() {
  console.log('🚀 Inicializando scroll progress...');
  console.log('📏 Scrollbar del navegador oculta - usando barra personalizada');
  
  progressIndicator = document.getElementById('scrollProgressIndicator');
  progressFill = document.getElementById('progressFill');
  
  if (!progressIndicator || !progressFill) {
    console.log('❌ Elementos no encontrados');
    return;
  }
  
  // Detectar tipo de dispositivo
  isTouchDevice = detectTouchDevice();
  console.log(`📱 Dispositivo táctil: ${isTouchDevice ? 'SÍ' : 'NO'}`);
  
  // Configurar event listeners
  setupEventListeners();
  
  // Estado inicial
  updateScrollProgress();
  
  console.log('✅ Scroll progress inicializado correctamente');
}

// Puntos de inicialización
document.addEventListener('DOMContentLoaded', initScrollProgress);
window.addEventListener('load', initScrollProgress);