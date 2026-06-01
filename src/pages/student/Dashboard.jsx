import { useAuth } from '../../context/AuthContext';
import { SUBJECTS, getTasksBySubject } from '../../data/mockData';
import { PageHead, SubjectCard, StatusBadge } from '../../components/ui';

// Dashboard del estudiante: grid de materias, cada una mostrando su tarea
// más próxima con el semáforo de colores.
export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <>
      <PageHead title={`Hola, ${user.name.split(' ')[0]} 👋`} subtitle="Estas son tus materias y pendientes." />
      <div className="cards-grid">
        {SUBJECTS.map((s) => {
          const tasks = getTasksBySubject(s.id);
          const next = tasks.find((t) => t.status === 'urgente' || t.status === 'porvencer') || tasks[0];
          return (
            <SubjectCard
              key={s.id}
              subject={s}
              to={`/estudiante/materia/${s.id}`}
              footer={
                <div className="mt flex items-center justify-between">
                  {next ? <StatusBadge status={next.status} /> : <span className="badge badge-neutral">Sin tareas</span>}
                  <small className="text-muted">{tasks.length} actividad(es)</small>
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}
