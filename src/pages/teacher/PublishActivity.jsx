import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getSubject } from '../../data/mockData';
import { PageHead, EmptyState } from '../../components/ui';

// Historia de Usuario 3 (ET003): publicación de actividades.
// Valida campos completos y que la fecha de cierre sea futura.
export default function PublishActivity() {
  const { id } = useParams();
  const subject = getSubject(id);
  const [form, setForm] = useState({ titulo: '', descripcion: '', cierre: '' });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  if (!subject) return <EmptyState icon="🔍" title="Grupo no encontrado" />;

  const update = (f) => (e) => { setForm((s) => ({ ...s, [f]: e.target.value })); setErrors((x) => ({ ...x, [f]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.titulo.trim()) err.titulo = 'El título es obligatorio.';
    if (!form.descripcion.trim()) err.descripcion = 'La descripción es obligatoria.';
    if (!form.cierre) err.cierre = 'Define una fecha de cierre.';
    else if (form.cierre <= new Date().toISOString().slice(0, 10)) err.cierre = 'La fecha de cierre debe ser futura.';
    setErrors(err);
    if (Object.keys(err).length === 0) setDone(true);
  };

  if (done) {
    return (
      <>
        <PageHead title="Actividad publicada ✅" subtitle={subject.nombre} />
        <div className="alert alert-success mb"><span>✅</span><span>La actividad <strong>{form.titulo}</strong> se publicó correctamente y ya es visible para los estudiantes.</span></div>
        <div className="flex gap">
          <Link to={`/docente/materia/${id}`} className="btn btn-primary">Ver actividades</Link>
          <button className="btn btn-outline" onClick={() => { setDone(false); setForm({ titulo: '', descripcion: '', cierre: '' }); }}>Publicar otra</button>
        </div>
      </>
    );
  }

  return (
    <>
      <Link to={`/docente/materia/${id}`} className="text-muted" style={{ fontSize: '.9rem' }}>← Volver al grupo</Link>
      <PageHead title="Publicar actividad" subtitle={subject.nombre} />
      <form onSubmit={submit} className="card" style={{ maxWidth: 640 }} noValidate>
        <div className="field">
          <label htmlFor="titulo">Título de la actividad</label>
          <input id="titulo" className={'input' + (errors.titulo ? ' error' : '')} value={form.titulo} onChange={update('titulo')} placeholder="Ej. Tarea 2 — Ensayo argumentativo" />
          {errors.titulo && <span className="field-error">{errors.titulo}</span>}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción / instrucciones</label>
          <textarea id="descripcion" className={'textarea' + (errors.descripcion ? ' error' : '')} value={form.descripcion} onChange={update('descripcion')} placeholder="Describe qué deben entregar los estudiantes…" />
          {errors.descripcion && <span className="field-error">{errors.descripcion}</span>}
        </div>
        <div className="field">
          <label htmlFor="cierre">Fecha de cierre</label>
          <input id="cierre" type="date" className={'input' + (errors.cierre ? ' error' : '')} value={form.cierre} onChange={update('cierre')} />
          {errors.cierre && <span className="field-error">{errors.cierre}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Publicar actividad</button>
      </form>
    </>
  );
}
