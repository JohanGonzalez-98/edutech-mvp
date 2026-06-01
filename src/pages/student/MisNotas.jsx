import { TASKS, getSubject } from '../../data/mockData';
import { PageHead, StatusBadge } from '../../components/ui';

// Consulta de calificaciones (RQF008): notas y comentarios del docente.
export default function MisNotas() {
  const calificadas = TASKS.filter((t) => t.status === 'calificada');

  return (
    <>
      <PageHead title="Mis notas" subtitle="Calificaciones y retroalimentación de tus actividades." />
      <table className="table">
        <thead>
          <tr><th>Materia</th><th>Actividad</th><th>Nota</th><th>Retroalimentación</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {TASKS.map((t) => (
            <tr key={t.id}>
              <td>{getSubject(t.subjectId)?.nombre}</td>
              <td>{t.titulo}</td>
              <td><strong>{t.calificacion != null ? `${t.calificacion} / 5.0` : '—'}</strong></td>
              <td className="text-muted">{t.retro || '—'}</td>
              <td><StatusBadge status={t.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {calificadas.length === 0 && <p className="text-muted mt">Aún no tienes actividades calificadas.</p>}
    </>
  );
}
