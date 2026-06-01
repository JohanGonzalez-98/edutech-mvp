import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_STATS, SUBJECTS } from '../../data/mockData';
import { PageHead } from '../../components/ui';

// Dashboard de gestión del administrador con métricas globales.
export default function AdminDashboard() {
  const { user } = useAuth();
  const stats = [
    { label: 'Docentes', value: ADMIN_STATS.docentes, icon: '👩‍🏫' },
    { label: 'Estudiantes', value: ADMIN_STATS.estudiantes, icon: '🎓' },
    { label: 'Espacios académicos', value: ADMIN_STATS.espacios, icon: '🏫' },
    { label: 'Actividades publicadas', value: ADMIN_STATS.actividades, icon: '📝' },
  ];

  return (
    <>
      <PageHead
        title={`Panel de administración`}
        subtitle={`Bienvenido, ${user.name}. Visión general de la plataforma.`}
        action={<Link to="/admin/usuarios" className="btn btn-primary">+ Registrar usuario</Link>}
      />
      <div className="cards-grid mb">
        {stats.map((s) => (
          <div key={s.label} className="card stat-card">
            <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
            <span className="stat-num">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <h3 className="mb">Espacios académicos recientes</h3>
      <table className="table">
        <thead><tr><th>Materia</th><th>Docente</th><th>Estudiantes</th></tr></thead>
        <tbody>
          {SUBJECTS.map((s) => (
            <tr key={s.id}><td>{s.nombre}</td><td>{s.docente}</td><td>{s.estudiantes}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
