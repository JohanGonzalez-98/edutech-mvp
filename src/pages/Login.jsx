import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Login.css';

// Historia de Usuario 1 (ET001): Inicio de sesión.
// Cubre los 4 escenarios: éxito, credenciales incorrectas, campos vacíos y cuenta bloqueada.
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ id: '', password: '', role: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
    setFormError(null);
  };

  const validate = () => {
    const e = {};
    if (!form.id.trim()) e.id = 'Ingresa tu usuario.';
    if (!form.password) e.password = 'Ingresa tu contraseña.';
    if (!form.role) e.role = 'Selecciona un rol.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return; // Escenario 3: campos vacíos.

    const res = login(form.id, form.password, form.role);
    if (res.ok) {
      navigate(res.user.firstLogin ? '/cambiar-password' : `/${res.user.role}`, { replace: true });
      return;
    }
    if (res.error === 'blocked') {
      setFormError({ type: 'danger', msg: 'Cuenta bloqueada por múltiples intentos fallidos. Contacta al administrador para desbloquearla.' });
    } else if (res.error === 'role') {
      setFormError({ type: 'danger', msg: 'El rol seleccionado no corresponde a este usuario.' });
    } else {
      const extra = res.remaining != null ? ` Te quedan ${res.remaining} intento(s).` : '';
      setFormError({ type: 'danger', msg: 'Usuario o contraseña incorrectos.' + extra });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <Logo size={64} showText={false} />
          <h1 className="login-title">EduTech</h1>
          <p className="login-tag">Plataforma de Aprendizaje Colaborativo</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {formError && (
            <div className={`alert alert-${formError.type}`} role="alert">
              <span>⚠️</span><span>{formError.msg}</span>
            </div>
          )}

          <div className="field">
            <label htmlFor="id">Usuario</label>
            <input
              id="id" className={'input' + (errors.id ? ' error' : '')}
              placeholder="Id de usuario"
              value={form.id} onChange={update('id')} autoComplete="username"
            />
            {errors.id && <span className="field-error">{errors.id}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password" type="password" className={'input' + (errors.password ? ' error' : '')}
              placeholder="Contraseña"
              value={form.password} onChange={update('password')} autoComplete="current-password"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="role">Rol</label>
            <select
              id="role" className={'select' + (errors.role ? ' error' : '')}
              value={form.role} onChange={update('role')}
            >
              <option value="">Seleccionar rol</option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="admin">Administrador</option>
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
            Iniciar Sesión
          </button>

          <a href="#recuperar" className="login-forgot">¿Olvidaste tu contraseña?</a>
        </form>

        <div className="login-demo">
          <strong>Usuarios de demostración</strong>
          <span>Estudiante: <code>estudiante</code> · Docente: <code>docente</code> · Admin: <code>admin</code></span>
          <span>Contraseña para todos: <code>edutech123</code></span>
          <span>Primer ingreso (cambia contraseña): <code>nuevo</code></span>
        </div>
      </div>
    </div>
  );
}
