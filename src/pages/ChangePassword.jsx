import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import './Login.css';

// Flujo obligatorio de actualización de contraseña al iniciar sesión por primera vez (RQNF002).
export default function ChangePassword() {
  const { user, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pwd.length < 8) return setError('La contraseña debe tener al menos 8 caracteres.');
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return setError('Debe incluir al menos una mayúscula y un número.');
    if (pwd !== confirm) return setError('Las contraseñas no coinciden.');
    updatePassword();
    navigate(`/${user.role}`, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <Logo size={56} showText={false} />
          <h1 className="login-title" style={{ fontSize: '1.9rem' }}>Actualiza tu contraseña</h1>
          <p className="login-tag">Es tu primer ingreso. Por seguridad, define una contraseña personal.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="alert alert-danger" role="alert"><span>⚠️</span><span>{error}</span></div>}
          <div className="field">
            <label htmlFor="pwd">Nueva contraseña</label>
            <input id="pwd" type="password" className="input" placeholder="Mínimo 8 caracteres"
              value={pwd} onChange={(e) => { setPwd(e.target.value); setError(null); }} />
          </div>
          <div className="field">
            <label htmlFor="confirm">Confirmar contraseña</label>
            <input id="confirm" type="password" className="input" placeholder="Repite la contraseña"
              value={confirm} onChange={(e) => { setConfirm(e.target.value); setError(null); }} />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
            Guardar y continuar
          </button>
        </form>
      </div>
    </div>
  );
}
