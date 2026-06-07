# Guion de video — Mi parte: Inicio de sesión y autenticación

**Duración objetivo:** ~3 a 4 minutos (ajustable según el reparto del equipo).
**Qué cubre:** la primera parte del MVP — el módulo de acceso y todo lo que se puede hacer en él.

> Consejo: abre el MVP **ya desplegado en Vercel** (no localhost) para que se vea la URL pública.
> Ten 2 pestañas listas: una en el login y la consigna de usuarios de demo a mano.

---

## Estructura (con tiempos sugeridos)

| Tiempo | En pantalla (qué haces) | Qué dices (narración) |
|--------|--------------------------|------------------------|
| 0:00–0:20 | Muestra la pantalla de login completa. Señala con el cursor el logo, el título y los campos. | "Esta es la puerta de entrada a EduTech, el módulo de inicio de sesión. Es la primera pantalla que ve cualquier usuario —administrador, docente o estudiante— y desde aquí se controla todo el acceso a la plataforma." |
| 0:20–0:45 | Pasa el cursor por los 3 campos: Usuario, Contraseña y el selector de Rol. Despliega el selector de rol. | "El acceso pide tres datos: usuario, contraseña y el rol. Decidimos usar **un solo login con un selector de rol** en lugar de tres pantallas distintas, porque simplifica el mantenimiento y ya estaba insinuado en nuestro diseño de Figma." |
| 0:45–1:20 | **Escenario 1 (éxito):** escribe `estudiante` / `edutech123`, elige rol Estudiante, inicia sesión. Muestra que entra al dashboard. Vuelve al login. | "Veamos los cuatro escenarios de la Historia de Usuario 1. Primero, un inicio **exitoso**: el sistema valida las credenciales y redirige al panel correspondiente al rol. Aquí el estudiante entra a su área principal." |
| 1:20–1:45 | **Escenario 2 (credenciales incorrectas):** escribe una contraseña mala, intenta entrar. Muestra el mensaje de error rojo. | "Segundo, **credenciales incorrectas**: el sistema no permite el acceso y muestra un mensaje de error claro y visible, en rojo, e incluso indica cuántos intentos quedan." |
| 1:45–2:05 | **Escenario 3 (campos vacíos):** borra los campos y pulsa Iniciar Sesión. Muestra los 3 mensajes de validación. | "Tercero, **campos vacíos**: si falta algún dato, el sistema lo señala campo por campo y no deja continuar. Esto cumple el criterio de aceptación de mensajes claros y consistentes." |
| 2:05–2:35 | **Escenario 4 (cuenta bloqueada):** falla el login varias veces seguidas (5) hasta que aparezca el mensaje de cuenta bloqueada. | "Cuarto, la **seguridad**: tras varios intentos fallidos —cinco en nuestra configuración— la cuenta se **bloquea automáticamente**. Esto responde al requisito no funcional RQNF006 y protege contra accesos no autorizados." |
| 2:35–3:05 | Inicia sesión con el usuario `nuevo` / `edutech123` (rol Estudiante). Muestra la pantalla de **cambio de contraseña** obligatoria. Cambia la contraseña y entra. | "Además, contemplamos el **primer ingreso**: cuando un usuario entra por primera vez con la contraseña genérica que le asigna el administrador, el sistema lo **obliga a definir una contraseña personal** antes de continuar. Esto es el requisito RQNF002 y es clave para la privacidad." |
| 3:05–3:35 | Vuelve al login. Inicia sesión rápido como `docente` y luego como `admin` para mostrar que cada rol llega a un panel distinto. | "Por último, el acceso es **diferenciado por rol**: con las mismas reglas, un docente llega a su panel de grupos y un administrador a su panel de gestión. Cada usuario solo ve lo que le corresponde." |
| 3:35–4:00 | Pantalla de login de fondo. Cierre. | "En resumen, este módulo no es solo una pantalla: es una capa de **seguridad, validación y control de acceso** que conecta a cada usuario con su experiencia. Le doy el paso a mi compañero/a, que mostrará [siguiente parte]." |

---

## Frases clave que conviene mencionar (para la rúbrica)

- **Decisión de diseño:** "Unificamos el login en una sola pantalla con selector de rol."
- **Decisión de diseño:** "Añadimos etiquetas y mensajes de error visibles porque el prototipo de Figma era estático y el MVP debe guiar al usuario."
- **Valor agregado:** "El bloqueo automático y el cambio de contraseña obligatorio aportan seguridad real, no solo apariencia."
- **Design Thinking:** "En la fase de empatizar detectamos que la fricción y la inseguridad alejaban a los usuarios; por eso el acceso es simple pero seguro."
- **Trazabilidad con requisitos:** nombra **HU1/ET001** (inicio de sesión), **RQNF002** (cambio de contraseña) y **RQNF006** (bloqueo de cuenta).

## Datos de demostración (tenlos a la vista al grabar)

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `estudiante` | `edutech123` | Estudiante |
| `docente` | `edutech123` | Docente |
| `admin` | `edutech123` | Administrador |
| `nuevo` | `edutech123` | Estudiante (fuerza cambio de contraseña) |

## Checklist antes de grabar

- [ ] MVP abierto en la **URL de Vercel** (que se vea en la barra del navegador).
- [ ] Ventana del navegador a buen tamaño (no muy pequeña) para que se lea todo.
- [ ] Cierra pestañas y notificaciones que distraigan.
- [ ] Practica una vez el recorrido para que fluya sin pausas largas.
- [ ] Si te bloqueas la cuenta probando el escenario 4, **recarga la página** para reiniciar los intentos.
