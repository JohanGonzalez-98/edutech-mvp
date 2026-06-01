# EduTech — MVP Frontend

Plataforma web de aprendizaje colaborativo para gestionar la entrega, publicación y
retroalimentación de actividades académicas entre **administradores, docentes y estudiantes**.

Este repositorio contiene el **desarrollo del frontend del MVP** (Actividad 3), construido a
partir del prototipo de Figma y la especificación de requisitos (ERS) de la Actividad 2.

> Corporación Universitaria Iberoamericana · Análisis y diseño de sistemas

---

## 🛠️ Stack tecnológico

| Capa | Herramienta |
|------|-------------|
| Framework | **React 19** + **Vite** |
| Routing | **react-router-dom 7** (navegación SPA multi-rol) |
| Estilos | CSS con design tokens extraídos del UI Kit de Figma |
| Pruebas unitarias / integración | **Vitest** + **Testing Library** |
| Pruebas de interacción (E2E) | **Playwright** |
| Despliegue | **Vercel** |

## 🚀 Puesta en marcha

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo  → http://localhost:5173
npm run build      # build de producción     → /dist
npm run preview    # previsualizar el build
```

## 👤 Usuarios de demostración

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `edutech123` | Administrador |
| `docente` | `edutech123` | Docente |
| `estudiante` | `edutech123` | Estudiante |
| `nuevo` | `edutech123` | Estudiante (fuerza cambio de contraseña en primer ingreso) |

En la pantalla de login debes seleccionar el **rol** correspondiente al usuario.

## 🧩 Funcionalidades implementadas (mapeo con la ERS)

### Módulo global / autenticación
- **RQF002 / HU1** — Inicio de sesión con los 4 escenarios: éxito, credenciales incorrectas, campos vacíos y cuenta bloqueada.
- **RQNF006** — Bloqueo automático tras 5 intentos fallidos.
- **RQNF002** — Cambio obligatorio de contraseña en el primer ingreso.

### Rol Estudiante
- Dashboard con materias y **semáforo de colores** (🔴 urgente / 🟡 por vencer / 🟢 entregada).
- Listado y detalle de actividades.
- **RQF005 / HU4** — Entrega de actividad con carga *arrastrar y soltar*, validación de formato y tamaño.
- **RQNF012** — Comprobante de entrega con fecha y hora exactas.
- **RQF008** — Consulta de calificaciones y retroalimentación.
- Calendario de fechas de cierre.

### Rol Docente
- Dashboard de grupos con nº de estudiantes.
- **RQF004 / HU3** — Publicación de actividades con validación de campos y fecha futura.
- **RQF006** — Listado de estudiantes y sus entregas.
- **RQF007 / RQF009** — Calificación y modificación de notas con retroalimentación.

### Rol Administrador
- Dashboard de gestión con métricas globales.
- **RQF001** — Registro de docentes y estudiantes.
- **RQF003** — Creación y gestión de espacios académicos.

## 🎨 Design tokens (extraídos del Figma vía API)

- **Primario (Indigo):** `#3f51b5` · hover `#303f9f` · pressed `#1a237e` · soft `#e8eaf6`
- **Semáforo:** Success `#16a34a` · Warning `#edca03` · Danger `#ef4444`
- **Tipografías:** Roboto (títulos) + Poppins (cuerpo)

Definidos como variables CSS en [`src/index.css`](src/index.css).

## ✅ Pruebas

```bash
npm test           # unitarias + integración (Vitest)
npm run test:e2e   # interacción end-to-end (Playwright)
```

| Tipo | Archivo | Qué valida |
|------|---------|-----------|
| Unitaria | `src/test/auth.unit.test.jsx` | Lógica de login, bloqueo de cuenta, helpers de datos |
| Integración | `src/test/login.integration.test.jsx` | Formulario de login + routing + contexto |
| Interacción (E2E) | `e2e/mvp.spec.js` | Flujos reales en navegador de los 3 roles |

## ☁️ Despliegue en Vercel

El proyecto incluye [`vercel.json`](vercel.json) con los *rewrites* necesarios para una SPA.

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importa el repo.
3. Vercel detecta Vite automáticamente (build: `npm run build`, output: `dist`).
4. **Deploy**. La URL pública resultante es la que se muestra en el video del entregable.

```bash
# Alternativa por CLI:
npm i -g vercel && vercel --prod
```

## 📁 Estructura

```
src/
├── components/   # Layout, ProtectedRoute, Logo, UI compartida
├── context/      # AuthContext (sesión y roles)
├── data/         # Datos de prueba (mock)
├── pages/        # Login + vistas por rol (student / teacher / admin)
└── test/         # Pruebas unitarias e integración
e2e/              # Pruebas de interacción (Playwright)
```
