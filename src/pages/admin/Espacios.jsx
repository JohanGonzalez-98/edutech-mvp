import { useState } from 'react';
import { SUBJECTS } from '../../data/mockData';
import { PageHead } from '../../components/ui';

// Gestión de espacios académicos (RQF003): crear clases/materias y asignar docente.
export default function Espacios() {
  const [espacios, setEspacios] = useState(SUBJECTS);
  const [form, setForm] = useState({ nombre: '', docente: '' });
  const [error, setError] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.docente.trim()) { setError('Completa todos los campos.'); return; }
    const colors = ['#3f51b5', '#16a34a', '#ef4444', '#edca03', '#8e24aa'];
    setEspacios((s) => [{ id: 'n' + Date.now(), nombre: form.nombre, docente: form.docente, color: colors[s.length % colors.length], estudiantes: 0 }, ...s]);
    setForm({ nombre: '', docente: '' });
    setError(null);
  };

  return (
    <>
      <PageHead title="Espacios académicos" subtitle="Crea y administra las clases de la institución." />
      {error && <div className="alert alert-danger mb"><span>⚠️</span><span>{error}</span></div>}
      <form onSubmit={submit} className="card mb">
        <div className="flex gap" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="field flex-1" style={{ marginBottom: 0, minWidth: 200 }}>
            <label>Nombre de la materia</label>
            <input className="input" value={form.nombre} onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))} placeholder="Ej. Química orgánica" />
          </div>
          <div className="field flex-1" style={{ marginBottom: 0, minWidth: 200 }}>
            <label>Docente asignado</label>
            <input className="input" value={form.docente} onChange={(e) => setForm((f) => ({ ...f, docente: e.target.value }))} placeholder="Nombre del docente" />
          </div>
          <button type="submit" className="btn btn-primary">Crear espacio</button>
        </div>
      </form>

      <div className="cards-grid">
        {espacios.map((s) => (
          <div key={s.id} className="card subject-card">
            <div className="subject-stripe" style={{ background: s.color }} />
            <h3 style={{ marginBottom: 4 }}>{s.nombre}</h3>
            <p className="text-muted" style={{ fontSize: '.88rem' }}>{s.docente}</p>
            <p className="text-muted mt" style={{ fontSize: '.85rem' }}>👥 {s.estudiantes} estudiantes</p>
          </div>
        ))}
      </div>
    </>
  );
}
