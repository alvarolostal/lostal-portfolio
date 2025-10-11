// src/scripts/theme.js
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

// Función para obtener el tema preferido del sistema
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Función para obtener el tema que se debe aplicar
function getTheme() {
  const savedTheme = localStorage.getItem("theme");
  
  // Si no hay tema guardado, usar el del sistema
  if (!savedTheme) {
    return getSystemTheme();
  }
  
  // Si hay tema guardado, usarlo
  return savedTheme;
}

// Aplicar el tema inicial
const initialTheme = getTheme();
html.setAttribute("data-theme", initialTheme);

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  
  // Añadir animación de giro
  themeIcon.style.transform = 'rotate(360deg)';
  themeIcon.style.transition = 'transform 0.6s ease-in-out';
  
  // Resetear la transformación después de la animación
  setTimeout(() => {
    themeIcon.style.transform = 'rotate(0deg)';
  }, 600);
  
  themeIcon.classList.remove("fa-moon", "fa-sun", "fa-lightbulb");
  themeIcon.classList.add("fa-lightbulb");
}

updateThemeIcon(initialTheme);

// Escuchar cambios en la preferencia del sistema
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  // Solo cambiar automáticamente si no hay preferencia guardada del usuario
  if (!localStorage.getItem("theme")) {
    const systemTheme = e.matches ? "dark" : "light";
    html.setAttribute("data-theme", systemTheme);
    updateThemeIcon(systemTheme);
  }
});

// Funcionalidad del botón toggle (cambio manual)
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    // Añadir clase de animación
    themeToggle.classList.add('animate');
    
    // Remover la clase después de la animación
    setTimeout(() => {
      themeToggle.classList.remove('animate');
    }, 600);
    
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}