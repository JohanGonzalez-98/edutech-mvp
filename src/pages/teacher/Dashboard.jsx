import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SUBJECTS, getTasksBySubject } from '../../data/mockData';
import { PageHead } from '../../components/ui';

// Dashboard del docente: tarjetas de grupos/materias con nº de estudiantes y pendientes por calificar.
export default function TeacherDashboard() {
  const { user } = useAuth();
  // En la demo, el docente "ve" las primeras materias como suyas.
  const grupos = SUBJECTS.slice(0, 4);

  return (
    <>
      <PageHead
        title={`Hola, ${user.name.split(' ')[0]} 👋`}
        subtitle="Estos son tus grupos."
        action={<Link to="/docente/grupos" className="btn btn-primary">+ Crear espacio</Link>}
      />
      <div className="cards-grid">
        {grupos.map((s) => {
          const tasks = getTasksBySubject(s.id);
          return (
            <Link key={s.id} to={`/docente/materia/${s.id}`} className="card card-hover subject-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="subject-stripe" style={{ background: s.color }} />
              <h3 style={{ marginBottom: 4 }}>{s.nombre}</h3>
              <p className="text-muted" style={{ fontSize: '.88rem' }}>Estudiantes: {s.estudiantes}</p>
              <div className="mt flex items-center justify-between">
                <span className="badge badge-neutral">{tasks.length} actividad(es)</span>
                <small className="text-muted">Ver grupo ›</small>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
