// ===================================================================
// Datos de prueba (mock) para el MVP de EduTech.
// Simulan la información que en producción vendría de la API / MongoDB.
// ===================================================================

// Usuarios de demostración para el login.
// La contraseña genérica de primer ingreso es "edutech123".
export const USERS = [
  { id: 'admin',     password: 'edutech123', role: 'admin',      name: 'Carlos Admin',     firstLogin: false, email: 'admin@edutech.edu.co' },
  { id: 'docente',   password: 'edutech123', role: 'docente',    name: 'Tatiana Cabrera',  firstLogin: false, email: 'tatiana@edutech.edu.co' },
  { id: 'estudiante',password: 'edutech123', role: 'estudiante', name: 'Nicole Tamayo',    firstLogin: false, email: 'nicole@edutech.edu.co' },
  // Usuario que entra por primera vez (forzará cambio de contraseña):
  { id: 'nuevo',     password: 'edutech123', role: 'estudiante', name: 'Estudiante Nuevo', firstLogin: true,  email: 'nuevo@edutech.edu.co' },
];

export const ROLE_LABELS = {
  admin: 'Administrador',
  docente: 'Docente',
  estudiante: 'Estudiante',
};

// Estado de una tarea según el semáforo de colores definido en Design Thinking:
//  - 'urgente'   (rojo)     => vence pronto / vencida
//  - 'porvencer' (amarillo) => próxima a vencer
//  - 'entregada' (verde)    => ya entregada
export const TASK_STATUS = {
  urgente:   { label: 'Urgente',    badge: 'badge-danger' },
  porvencer: { label: 'Por vencer', badge: 'badge-warning' },
  entregada: { label: 'Entregada',  badge: 'badge-success' },
  calificada:{ label: 'Calificada', badge: 'badge-success' },
  pendiente: { label: 'Pendiente',  badge: 'badge-neutral' },
};

// Materias / espacios académicos.
export const SUBJECTS = [
  { id: 's1', nombre: 'Inglés',              docente: 'Jorge Ramírez',   color: '#3f51b5', estudiantes: 18 },
  { id: 's2', nombre: 'Matemáticas básicas', docente: 'Cristina López',  color: '#16a34a', estudiantes: 22 },
  { id: 's3', nombre: 'Biología',            docente: 'Marcelo Díaz',    color: '#ef4444', estudiantes: 15 },
  { id: 's4', nombre: 'Estadística',         docente: 'Gloria Mejía',    color: '#edca03', estudiantes: 15 },
  { id: 's5', nombre: 'Geografía',           docente: 'Martha Suárez',   color: '#8e24aa', estudiantes: 12 },
];

// Actividades (tareas) por materia.
export const TASKS = [
  { id: 't1', subjectId: 's1', titulo: 'Tarea 1 — Reading comprehension', descripcion: 'Leer el capítulo 3 y responder el cuestionario adjunto.', cierre: '2026-06-05', status: 'urgente',   calificacion: null, retro: '' },
  { id: 't2', subjectId: 's1', titulo: 'Tarea 2 — Vocabulary list',        descripcion: 'Elaborar una lista de 30 palabras con su traducción.',    cierre: '2026-06-12', status: 'porvencer', calificacion: null, retro: '' },
  { id: 't3', subjectId: 's2', titulo: 'Tarea 3 — Ecuaciones lineales',    descripcion: 'Resolver los ejercicios 1 al 10 de la guía.',             cierre: '2026-06-08', status: 'porvencer', calificacion: null, retro: '' },
  { id: 't4', subjectId: 's4', titulo: 'Tarea 4 — Distribución normal',    descripcion: 'Análisis de un conjunto de datos usando la normal.',      cierre: '2026-06-03', status: 'urgente',   calificacion: null, retro: '' },
  { id: 't5', subjectId: 's3', titulo: 'Tarea 5 — Célula eucariota',       descripcion: 'Mapa conceptual sobre los organelos celulares.',          cierre: '2026-05-28', status: 'entregada', calificacion: null, retro: '' },
  { id: 't6', subjectId: 's2', titulo: 'Tarea 0 — Diagnóstico',            descripcion: 'Evaluación diagnóstica inicial del curso.',               cierre: '2026-05-20', status: 'calificada',calificacion: 4.6, retro: '¡Excelente trabajo! Repasa el punto 4.' },
];

// Estudiantes inscritos (para la vista del docente).
export const STUDENTS = [
  { id: 'e1', nombre: 'Nicole Tamayo Molano',      email: 'nicole@edutech.edu.co',  entrega: 'Enviado para calificar', archivo: 'tarea1_nicole.pdf',  estado: 'enviado',  calificacion: null },
  { id: 'e2', nombre: 'Katy Hernández Lambraño',   email: 'katy@edutech.edu.co',    entrega: 'Enviado para calificar', archivo: 'tarea1_katy.docx',   estado: 'enviado',  calificacion: null },
  { id: 'e3', nombre: 'Johan Gonzalez Peña',       email: 'johan@edutech.edu.co',   entrega: 'Sin entregar',           archivo: null,                 estado: 'pendiente',calificacion: null },
  { id: 'e4', nombre: 'Jose Luis Gonzalez Florez', email: 'jose@edutech.edu.co',    entrega: 'Calificado',             archivo: 'tarea1_jose.pdf',    estado: 'calificado',calificacion: 4.2 },
];

// Métricas para el dashboard del administrador.
export const ADMIN_STATS = {
  docentes: 12,
  estudiantes: 248,
  espacios: 18,
  actividades: 94,
};

export function getSubject(id) {
  return SUBJECTS.find((s) => s.id === id);
}

export function getTasksBySubject(id) {
  return TASKS.filter((t) => t.subjectId === id);
}
