import { Link, useParams } from 'react-router-dom';
import { getSubject, getTasksBySubject } from '../../data/mockData';
import { PageHead, StatusBadge, EmptyState } from '../../components/ui';

// Listado de actividades de un grupo (vista del docente), con accesos a publicar,
// ver estudiantes y calificar.
export default function SubjectActivities() {
  const { id } = useParams();
  const subject = getSubject(id);
  const tasks = getTasksBySubject(id);
  if (!subject) return <EmptyState icon="🔍" title="Grupo no encontrado" />;

  return (
    <>
      <Link to="/docente" className="text-muted" style={{ fontSize: '.9rem' }}>← Volver a mis grupos</Link>
      <PageHead
        title={subject.nombre}
        subtitle={`${subject.estudiantes} estudiantes`}
        action={
          <div className="flex gap">
            <Link to={`/docente/materia/${id}/estudiantes`} className="btn btn-outline">Ver estudiantes</Link>
            <Link to={`/docente/materia/${id}/publicar`} className="btn btn-primary">+ Publicar actividad</Link>
          </div>
        }
      />

      {tasks.length === 0 ? (
        <EmptyState title="Sin actividades" text="Publica la primera actividad para este grupo." />
      ) : (
        tasks.map((t) => (
          <div key={t.id} className="task-row">
            <div className="task-meta">
              <strong>{t.titulo}</strong>
              <small>Cierre: {t.cierre}</small>
            </div>
            <div className="flex items-center gap">
              <StatusBadge status={t.status} />
              <Link to={`/docente/tarea/${t.id}/calificar`} className="btn btn-soft btn-sm">Calificar</Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
