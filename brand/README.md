# Recursos de marca — EduTech

Logos e identidad visual del proyecto, listos para usar en documentos, presentaciones y el video.

## Logos

| Archivo | Uso |
|---------|-----|
| `edutech-logo.svg` / `.png` | Logo horizontal (icono + texto). Fondos claros. |
| `edutech-logo-blanco.svg` / `.png` | Versión blanca para fondos oscuros. |
| `edutech-icon.svg` / `.png` | Solo el icono (birrete). Favicon, avatar, app icon. |

> Los `.svg` son vectoriales (escalan sin perder calidad) → ideales para impresión y diapositivas.
> Los `.png` son a 2x de resolución (icono 1024×1024, logo 2080×560) con fondo transparente.

## Paleta de colores (extraída del UI Kit de Figma)

| Token | HEX | Uso |
|-------|-----|-----|
| Primario | `#3f51b5` | Botones, enlaces, color de marca |
| Primario oscuro | `#1a237e` | Texto del logo, estados "pressed" |
| Primario suave | `#e8eaf6` | Fondos de header y tarjetas |
| Success (verde) | `#16a34a` | Semáforo: tarea entregada |
| Warning (amarillo) | `#edca03` | Semáforo: tarea por vencer |
| Danger (rojo) | `#ef4444` | Semáforo: tarea urgente / errores |

## Tipografías

- **Roboto** — títulos y encabezados.
- **Poppins** — cuerpo de texto e interfaz.

Ambas son gratuitas de Google Fonts.

## Sobre los iconos de la interfaz

Los pequeños iconos de la app (💬 mensajes, 🔔 notificaciones, ☁️ subir, ✅ éxito, ⚠️ alerta)
son **emojis del sistema**, no archivos de imagen. Esto se decidió para el MVP porque:

- No dependen de descargar ni licenciar un set de iconos.
- Se ven consistentes en Chrome y Edge (los navegadores objetivo, RQNF007).

> En el Figma original se usaban iconos de la librería **Phosphor Icons**. Si en una fase
> posterior se quiere fidelidad total, se pueden instalar con `npm i @phosphor-icons/react`
> y reemplazar los emojis. Para el MVP no era necesario.
