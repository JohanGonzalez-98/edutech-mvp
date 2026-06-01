import { Link, useParams } from 'react-router-dom';
import { TASKS, getSubject } from '../../data/mockData';
import { PageHead, StatusBadge, EmptyState } from '../../components/ui';

// Detalle de una actividad (vista "Tarea pendiente" / "Tarea completada").
export default function TaskDetail() {
  const { id } = useParams();
  const task = TASKS.find((t) => t.id === id);
  if (!task) return <EmptyState icon="🔍" title="Actividad no encontrada" />;
  const subject = getSubject(task.subjectId);
  const entregada = task.status === 'entregada' || task.status === 'calificada';

  return (
    <>
      <Link to={`/estudiante/materia/${task.subjectId}`} className="text-muted" style={{ fontSize: '.9rem' }}>← Volver a {subject.nombre}</Link>
      <PageHead
        title={task.titulo}
        subtitle={`${subject.nombre} · Cierre: ${task.cierre}`}
        action={<StatusBadge status={task.status} />}
      />

      <div className="card mb">
        <h4 style={{ marginBottom: 8 }}>Descripción</h4>
        <p>{task.descripcion}</p>
      </div>

      {entregada ? (
        <div className="receipt mb">
          <span style={{ fontSize: '1.6rem' }}>✅</span>
          <div>
            <strong>Entrega registrada</strong>
            <p className="text-muted" style={{ fontSize: '.85rem' }}>Recibido el {task.cierre} · comprobante generado.</p>
          </div>
        </div>
      ) : null}

      {task.status === 'calificada' && (
        <div className="card alert-success mb">
          <h4>Calificación: {task.calificacion} / 5.0</h4>
          {task.retro && <p style={{ marginTop: 6 }}><strong>Retroalimentación:</strong> {task.retro}</p>}
        </div>
      )}

      <div className="flex gap">
        {!entregada && (
          <Link to={`/estudiante/tarea/${task.id}/subir`} className="btn btn-primary">Subir entrega</Link>
        )}
        {entregada && task.status !== 'calificada' && (
          <Link to={`/estudiante/tarea/${task.id}/subir`} className="btn btn-outline">Modificar entrega</Link>
        )}
      </div>
    </>
  );
}
