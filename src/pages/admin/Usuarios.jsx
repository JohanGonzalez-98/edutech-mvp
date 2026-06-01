import { useState } from 'react';
import { PageHead } from '../../components/ui';

// Registro de usuarios (RQF001): el administrador registra docentes y estudiantes.
// Tras el registro se "envía" una contraseña genérica al correo institucional.
export default function Usuarios() {
  const [form, setForm] = useState({ nombre: '', email: '', role: 'estudiante' });
  const [errors, setErrors] = useState({});
  const [registrados, setRegistrados] = useState([]);

  const update = (f) => (e) => { setForm((s) => ({ ...s, [f]: e.target.value })); setErrors((x) => ({ ...x, [f]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'Nombre obligatorio.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Correo institucional inválido.';
    setErrors(err);
    if (Object.keys(err).length) return;
    setRegistrados((r) => [{ ...form, id: Date.now() }, ...r]);
    setForm({ nombre: '', email: '', role: 'estudiante' });
  };

  return (
    <>
      <PageHead title="Gestión de usuarios" subtitle="Registra docentes y estudiantes en la plataforma." />
      <div className="flex gap-lg" style={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <form onSubmit={submit} className="card" style={{ width: 380 }} noValidate>
          <h4 className="mb">Nuevo usuario</h4>
          <div className="field">
            <label>Nombre completo</label>
            <input className={'input' + (errors.nombre ? ' error' : '')} value={form.nombre} onChange={update('nombre')} />
            {errors.nombre && <span className="field-error">{errors.nombre}</span>}
          </div>
          <div className="field">
            <label>Correo institucional</label>
            <input className={'input' + (errors.email ? ' error' : '')} value={form.email} onChange={update('email')} placeholder="nombre@edutech.edu.co" />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>
          <div className="field">
            <label>Rol</label>
            <select className="select" value={form.role} onChange={update('role')}>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Registrar usuario</button>
        </form>

        <div className="flex-1" style={{ minWidth: 320 }}>
          <h4 className="mb">Usuarios registrados en esta sesión</h4>
          {registrados.length === 0
            ? <p className="text-muted">Aún no has registrado usuarios.</p>
            : (
              <table className="table">
                <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th></tr></thead>
                <tbody>
                  {registrados.map((u) => (
                    <tr key={u.id}><td>{u.nombre}</td><td className="text-muted">{u.email}</td><td><span className="badge badge-neutral">{u.role}</span></td></tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </>
  );
}
