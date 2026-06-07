# Decisiones de diseño — del prototipo Figma al MVP funcional

Este documento explica **qué cambió** entre el prototipo de Figma (Actividad 2) y el MVP
funcional (Actividad 3), y **por qué**. Sirve de guion de apoyo para el video.

> Idea central: el Figma era un **prototipo estático** (pantallas que se conectan al hacer clic).
> El MVP es una **aplicación real** que valida datos, controla el acceso y responde a errores.
> Pasar de uno al otro exige tomar decisiones que en el diseño no estaban resueltas.

---

## 1. Un solo login con selector de rol (antes: 3 pantallas de login)

- **Figma:** tenía pantallas separadas — "Login docente", "Login estudiante", etc.
- **MVP:** una única pantalla de login con un **selector de rol** (que ya aparecía en el diseño).
- **Por qué:** evita duplicar la misma pantalla 3 veces. Una sola fuente de verdad es más
  fácil de mantener y menos propensa a errores. El propio Figma ya insinuaba esto con el
  campo "Seleccionar rol".

## 2. Etiquetas y mensajes de error visibles en los formularios

- **Figma:** los campos mostraban solo un texto gris de ejemplo ("Id User", "Contraseña").
- **MVP:** cada campo tiene una **etiqueta** encima y muestra **mensajes de error** en rojo
  cuando algo falla (campo vacío, credenciales incorrectas, etc.).
- **Por qué:** lo exige la propia ERS (los criterios de aceptación de la HU1 piden mensajes
  "claros, visibles y de color visible"). Además mejora la **usabilidad y accesibilidad**:
  el usuario siempre sabe qué campo está llenando y qué salió mal.

## 3. Fondo del login: degradado en vez de fotografía

- **Figma:** usaba una imagen de fondo (foto).
- **MVP:** un **degradado índigo** con los colores de marca.
- **Por qué:** no se contaba con el archivo original de la imagen exportado, y un degradado
  con los colores corporativos carga más rápido, pesa menos y mantiene la identidad visual.

## 4. Iconos: emojis del sistema en vez de Phosphor Icons

- **Figma:** iconos de la librería Phosphor (mensajes, notificaciones, etc.).
- **MVP:** **emojis** equivalentes (💬 🔔 ☁️ ✅ ⚠️).
- **Por qué:** para el MVP no era necesario instalar y licenciar un set de iconos; los emojis
  se ven consistentes en Chrome y Edge (los navegadores objetivo según RQNF007). Es un
  cambio fácilmente reversible en una fase posterior.

## 5. Diseño adaptable (responsive) en vez de medida fija

- **Figma:** todas las pantallas estaban diseñadas a 1440×1024 px (medida fija).
- **MVP:** la interfaz se **adapta** al tamaño de la ventana (header, grids y tablas se
  reorganizan en pantallas pequeñas).
- **Por qué:** una web real se ve en monitores de distintos tamaños. El grid de materias usa
  columnas automáticas para no romperse.

## 6. El semáforo de colores se volvió funcional

- **Figma:** el semáforo (rojo/amarillo/verde) era una decisión de Design Thinking dibujada.
- **MVP:** ahora es un **componente real** (`StatusBadge`) que pinta cada tarea según su
  estado: 🔴 urgente, 🟡 por vencer, 🟢 entregada.
- **Por qué:** es el valor diferencial de la solución (reducir la carga cognitiva del estudiante),
  así que debía funcionar de verdad, no solo verse.

---

## Funcionalidades nuevas (no existían en el prototipo estático)

Estas no son "cambios de diseño" sino **lógica real** que convierte el prototipo en MVP:

| Funcionalidad | Requisito | Qué hace |
|---------------|-----------|----------|
| Validación de login (4 escenarios) | HU1 / ET001 | Éxito, credenciales incorrectas, campos vacíos, cuenta bloqueada |
| Bloqueo de cuenta | RQNF006 | Bloquea tras 5 intentos fallidos |
| Cambio de contraseña en primer ingreso | RQNF002 | Pantalla obligatoria la primera vez |
| Control de acceso por rol | — | Cada rol solo ve sus pantallas; redirige si no corresponde |
| Subida de archivo con validación | HU4 / RQF005 | Valida formato y tamaño; genera comprobante con fecha y hora (RQNF012) |
| Calificación con validación | RQF007 / RQF009 | Nota entre 0.0 y 5.0, con retroalimentación |

---

## Lo que NO cambió (fidelidad al diseño)

- **Paleta de colores** exacta del UI Kit (índigo + semáforo).
- **Tipografías** Roboto + Poppins.
- **Estructura** de cada pantalla: header superior, pestañas de navegación, tarjetas de
  materias, pie con "Configuración | Soporte".
- **Concepto** de tarjetas con franja de color y el semáforo de estados.
