import { TASKS, getSubject } from '../../data/mockData';
import { PageHead } from '../../components/ui';

// Calendario de entregas — agrupa las actividades por fecha de cierre.
export default function Calendario() {
  const ordenadas = [...TASKS].sort((a, b) => a.cierre.localeCompare(b.cierre));

  return (
    <>
      <PageHead title="Calendario" subtitle="Próximas fechas de cierre de tus actividades." />
      <div className="card">
        {ordenadas.map((t) => (
          <div key={t.id} className="flex items-center gap" style={{ padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{
              minWidth: 92, textAlign: 'center', padding: '8px 10px',
              background: 'var(--primary-soft)', borderRadius: 'var(--radius)', fontWeight: 600, color: 'var(--primary-pressed)',
            }}>
              {t.cierre.slice(5)}
            </div>
            <div className="flex-1">
              <strong>{t.titulo}</strong>
              <p className="text-muted" style={{ fontSize: '.85rem' }}>{getSubject(t.subjectId)?.nombre}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
