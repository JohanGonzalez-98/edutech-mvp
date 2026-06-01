import { Link, useParams } from 'react-router-dom';
import { getSubject, getTasksBySubject } from '../../data/mockData';
import { PageHead, StatusBadge, EmptyState } from '../../components/ui';

// Listado de tareas de una materia (vista "Tareas" del Figma).
export default function SubjectTasks() {
  const { id } = useParams();
  const subject = getSubject(id);
  const tasks = getTasksBySubject(id);

  if (!subject) return <EmptyState icon="🔍" title="Materia no encontrada" />;

  return (
    <>
      <Link to="/estudiante" className="text-muted" style={{ fontSize: '.9rem' }}>← Volver al inicio</Link>
      <PageHead title={subject.nombre} subtitle={`Docente: ${subject.docente}`} />

      {tasks.length === 0 ? (
        <EmptyState title="No hay tareas pendientes" text="Cuando el docente publique actividades aparecerán aquí." />
      ) : (
        <div>
          {tasks.map((t) => (
            <Link key={t.id} to={`/estudiante/tarea/${t.id}`} className="task-row" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="task-meta">
                <strong>{t.titulo}</strong>
                <small>Cierre: {t.cierre}</small>
              </div>
              <div className="flex items-center gap">
                {t.status === 'calificada' && <strong style={{ color: 'var(--success-pressed)' }}>{t.calificacion}</strong>}
                <StatusBadge status={t.status} />
                <span className="text-muted">›</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
