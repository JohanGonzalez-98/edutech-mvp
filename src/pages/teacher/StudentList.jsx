import { Link, useParams } from 'react-router-dom';
import { getSubject, STUDENTS } from '../../data/mockData';
import { PageHead, EmptyState } from '../../components/ui';

// Listado de estudiantes del grupo con su estado de entrega (vista del docente).
export default function StudentList() {
  const { id } = useParams();
  const subject = getSubject(id);
  if (!subject) return <EmptyState icon="🔍" title="Grupo no encontrado" />;

  const estadoBadge = (estado) => ({
    enviado: 'badge-warning', calificado: 'badge-success', pendiente: 'badge-danger',
  }[estado] || 'badge-neutral');

  return (
    <>
      <Link to={`/docente/materia/${id}`} className="text-muted" style={{ fontSize: '.9rem' }}>← Volver al grupo</Link>
      <PageHead title="Estudiantes" subtitle={`${subject.nombre} · ${subject.estudiantes} inscritos`} />
      <table className="table">
        <thead>
          <tr><th>Estudiante</th><th>Correo institucional</th><th>Entrega</th><th>Archivo</th><th>Nota</th></tr>
        </thead>
        <tbody>
          {STUDENTS.map((s) => (
            <tr key={s.id}>
              <td>{s.nombre}</td>
              <td className="text-muted">{s.email}</td>
              <td><span className={'badge ' + estadoBadge(s.estado)}>{s.entrega}</span></td>
              <td>{s.archivo ? <a href="#descargar">{s.archivo}</a> : <span className="text-muted">—</span>}</td>
              <td><strong>{s.calificacion != null ? s.calificacion : '—'}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
