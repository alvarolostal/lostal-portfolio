// src/scripts/theme.js
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const html = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", savedTheme);

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  themeIcon.classList.remove("fa-moon", "fa-sun");
  if (theme === "dark") {
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.add("fa-sun");
  }
}

updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}