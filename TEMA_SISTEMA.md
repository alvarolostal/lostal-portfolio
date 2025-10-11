# Sistema Avanzado de Gestión de Temas

Este sistema implementa una gestión inteligente de temas que se adapta dinámicamente a las preferencias del dispositivo y del usuario.

## Características Principales

### 🎯 Detección Automática de Dispositivo
- **Sistemas Operativos Soportados**: Windows, macOS, Linux, iOS, iPadOS, Android, ChromeOS, Windows Mobile
- **Tipos de Dispositivo**: Desktop, Mobile, Tablet
- **Navegadores**: Chrome, Firefox, Safari, Edge y otros
- **Capacidades**: Pantalla táctil, orientación, modo standalone, soporte para dark mode

### 🌓 Gestión Inteligente de Temas
- **Sincronización Automática**: El tema se sincroniza automáticamente con las preferencias del sistema del dispositivo
- **Cambios en Tiempo Real**: Detecta y aplica cambios del modo oscuro/claro del sistema instantáneamente
- **Respeto a la Elección Manual**: Si el usuario cambia manualmente el tema, el sistema respeta esta decisión hasta que se recargue la página

### 🔄 Funcionalidades Avanzadas

#### Cambio Manual de Tema
- **Click Simple**: Cambia entre modo claro y oscuro
- **Doble Click**: Resetea al tema del sistema (sincronización automática)
- **Feedback Visual**: Animaciones y transformaciones suaves
- **Vibración**: En dispositivos móviles compatibles

#### Detección de Estados del Sistema
- **Visibilidad de la Página**: Verifica cambios de tema cuando se vuelve a la pestaña
- **Cambios de Orientación**: Recargre el tema en dispositivos móviles al rotar la pantalla
- **Batería Baja**: Reduce animaciones automáticamente cuando la batería está baja (<20%)

### ♿ Accesibilidad
- **Respeto por `prefers-reduced-motion`**: Reduce o elimina animaciones según las preferencias del usuario
- **Transiciones Suaves**: Cambios graduales sin flashs molestos
- **Prevención de FOUC**: No hay flash de contenido sin estilo durante la carga

## Uso del Sistema

### API JavaScript

El sistema expone las siguientes funciones para uso avanzado:

```javascript
// Solo disponible en modo desarrollo (localhost)
window.themeDebug = {
  getState: () => themeManager.getState(),      // Obtiene el estado actual
  forceTheme: (theme) => themeManager.applyTheme(theme, 'debug'), // Fuerza un tema
  resetToSystem: () => themeManager.resetToSystem(), // Resetea al sistema
  showNotification: showThemeNotification       // Muestra notificación personalizada
};
```

### Eventos Personalizados

El sistema dispara un evento `themechange` cada vez que cambia el tema:

```javascript
window.addEventListener('themechange', (e) => {
  const { theme, source, deviceInfo } = e.detail;
  console.log(`Tema cambió a: ${theme}, origen: ${source}`);
});
```

## Arquitectura del Sistema

### Archivos Principales

1. **`theme-utils.js`**: Utilidades base para detección de dispositivos y gestión de temas
2. **`theme.js`**: Lógica principal e interfaz de usuario
3. **`Layout.astro`**: Script inline para aplicación inmediata del tema
4. **`global.css`**: Estilos globales y transiciones

### Flujo de Funcionamiento

1. **Carga Inicial**: Script inline en `<head>` aplica el tema inmediatamente
2. **Inicialización**: `ThemeManager` detecta dispositivo y configura listeners
3. **Escucha Activa**: Sistema monitorea cambios del sistema operativo
4. **Respuesta a Eventos**: Aplica cambios según la fuente (sistema vs. manual)

### Almacenamiento

- **`localStorage.theme`**: Tema elegido manualmente por el usuario
- **`sessionStorage.themeManualOverride`**: Flag indica si hay override manual activo

## Compatibilidad

### Navegadores Soportados
- Chrome/Chromium 76+
- Firefox 67+
- Safari 12.1+
- Edge 79+

### Características por Dispositivo

| Característica | Desktop | Mobile | Tablet |
|----------------|---------|--------|--------|
| Detección automática | ✅ | ✅ | ✅ |
| Cambios en tiempo real | ✅ | ✅ | ✅ |
| Vibración al cambiar | ❌ | ✅ | ✅ |
| Detección de orientación | ❌ | ✅ | ✅ |
| Gestión de batería | ❌ | ✅ | ✅ |

## Debugging

En modo desarrollo, el sistema proporciona logs detallados en la consola:

```
🎨 Cambio de tema detectado: {
  tema: "dark",
  origen: "system",
  dispositivo: "android mobile",
  navegador: "chrome",
  pantalla: "390x844",
  capacidades: { touchScreen: true, orientation: true, ... }
}
```

## Personalización

### Variables CSS Personalizables

```css
:root {
  --animation-duration: 0.3s; /* Duración de las transiciones */
}
```

### Temas Personalizados

Para añadir temas adicionales, modifica `variables.css`:

```css
[data-theme="custom"] {
  --bg-primary: #your-color;
  --text-primary: #your-color;
  /* ... más variables */
}
```

## Optimizaciones de Rendimiento

- **Lazy Loading**: Los detectores se inicializan solo cuando es necesario
- **Debouncing**: Los eventos de cambio se procesan de manera eficiente
- **Memory Management**: Limpieza automática de listeners al descargar la página
- **Battery Awareness**: Reduce animaciones automáticamente en dispositivos con batería baja

## Troubleshooting

### Problema: El tema no cambia automáticamente
**Solución**: Verifica que no haya un override manual activo. Haz doble click en el botón de tema para resetear.

### Problema: Las animaciones son muy lentas
**Solución**: El sistema puede haber detectado preferencia de movimiento reducido o batería baja. Esto es normal.

### Problema: Flash de contenido al cargar
**Solución**: Verifica que el script inline en `<head>` esté ejecutándose correctamente antes que los estilos.