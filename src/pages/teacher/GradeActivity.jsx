import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TASKS, getSubject, STUDENTS } from '../../data/mockData';
import { PageHead, EmptyState } from '../../components/ui';

// Panel de calificación (RQF007 / RQF009): el docente ingresa nota y retroalimentación
// por estudiante, y puede modificar calificaciones previas.
export default function GradeActivity() {
  const { id } = useParams();
  const task = TASKS.find((t) => t.id === id);
  // Estado local de calificaciones por estudiante.
  const [grades, setGrades] = useState(
    () => Object.fromEntries(STUDENTS.map((s) => [s.id, { nota: s.calificacion ?? '', retro: '', saved: s.estado === 'calificado' }]))
  );

  if (!task) return <EmptyState icon="🔍" title="Actividad no encontrada" />;
  const subject = getSubject(task.subjectId);

  const setField = (sid, field, value) =>
    setGrades((g) => ({ ...g, [sid]: { ...g[sid], [field]: value, saved: false } }));

  const save = (sid) => {
    const g = grades[sid];
    const nota = parseFloat(g.nota);
    if (isNaN(nota) || nota < 0 || nota > 5) {
      setGrades((gr) => ({ ...gr, [sid]: { ...gr[sid], err: 'La nota debe estar entre 0.0 y 5.0' } }));
      return;
    }
    setGrades((gr) => ({ ...gr, [sid]: { ...gr[sid], saved: true, err: null } }));
  };

  return (
    <>
      <Link to={`/docente/materia/${task.subjectId}`} className="text-muted" style={{ fontSize: '.9rem' }}>← Volver al grupo</Link>
      <PageHead title="Calificar actividad" subtitle={`${subject.nombre} · ${task.titulo}`} />

      {STUDENTS.filter((s) => s.estado !== 'pendiente').map((s) => {
        const g = grades[s.id];
        return (
          <div key={s.id} className="card mb">
            <div className="flex justify-between items-center mb" style={{ flexWrap: 'wrap', gap: 12 }}>
              <div>
                <strong>{s.nombre}</strong>
                <p className="text-muted" style={{ fontSize: '.85rem' }}>📎 {s.archivo}</p>
              </div>
              {g.saved && <span className="badge badge-success">Calificado</span>}
            </div>
            <div className="flex gap" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div className="field" style={{ maxWidth: 140, marginBottom: 0 }}>
                <label>Nota (0.0 – 5.0)</label>
                <input className={'input' + (g.err ? ' error' : '')} type="number" step="0.1" min="0" max="5"
                  value={g.nota} onChange={(e) => setField(s.id, 'nota', e.target.value)} />
              </div>
              <div className="field flex-1" style={{ marginBottom: 0, minWidth: 220 }}>
                <label>Retroalimentación</label>
                <input className="input" value={g.retro} placeholder="Comentario para el estudiante…"
                  onChange={(e) => setField(s.id, 'retro', e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={() => save(s.id)}>
                {g.saved ? 'Modificar' : 'Guardar nota'}
              </button>
            </div>
            {g.err && <span className="field-error">{g.err}</span>}
          </div>
        );
      })}
    </>
  );
}
