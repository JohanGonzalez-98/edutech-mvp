import { Link } from 'react-router-dom';
import { TASK_STATUS } from '../data/mockData';

// Encabezado de página con saludo (refleja "Hola, (nombre)" del Figma).
export function PageHead({ title, subtitle, action }) {
  return (
    <div className="flex justify-between items-center mb" style={{ flexWrap: 'wrap', gap: 16 }}>
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle" style={{ marginBottom: 0 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// Badge de estado según el semáforo de colores (rojo/amarillo/verde).
export function StatusBadge({ status }) {
  const cfg = TASK_STATUS[status] || TASK_STATUS.pendiente;
  return <span className={`badge ${cfg.badge}`}>{cfg.label}</span>;
}

// Tarjeta de materia / espacio académico.
export function SubjectCard({ subject, to, footer }) {
  return (
    <Link to={to} className="card card-hover subject-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="subject-stripe" style={{ background: subject.color }} />
      <h3 style={{ marginBottom: 4 }}>{subject.nombre}</h3>
      <p className="text-muted" style={{ fontSize: '.88rem' }}>{subject.docente}</p>
      {footer}
    </Link>
  );
}

// Estado vacío reutilizable.
export function EmptyState({ icon = '📭', title, text }) {
  return (
    <div className="card text-center" style={{ padding: '48px 24px' }}>
      <div style={{ fontSize: '2.4rem', marginBottom: 8 }}>{icon}</div>
      <h3 style={{ marginBottom: 4 }}>{title}</h3>
      {text && <p className="text-muted">{text}</p>}
    </div>
  );
}
