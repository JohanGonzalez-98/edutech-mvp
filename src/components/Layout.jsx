import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_LABELS } from '../data/mockData';
import Logo from './Logo';
import './Layout.css';

// Navegación por rol — refleja las pestañas del Figma ("Área principal", "Mis grupos", etc.)
const NAV_BY_ROLE = {
  estudiante: [
    { to: '/estudiante', label: 'Área principal', end: true },
    { to: '/estudiante/notas', label: 'Mis notas' },
    { to: '/estudiante/calendario', label: 'Calendario' },
  ],
  docente: [
    { to: '/docente', label: 'Área principal', end: true },
    { to: '/docente/grupos', label: 'Mis grupos' },
  ],
  admin: [
    { to: '/admin', label: 'Panel', end: true },
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/espacios', label: 'Espacios académicos' },
  ],
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = NAV_BY_ROLE[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner container">
          <div className="flex items-center gap-lg">
            <Logo size={36} />
            <nav className="nav-tabs">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => 'nav-tab' + (isActive ? ' active' : '')}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap">
            <button className="icon-btn" title="Mensajes" aria-label="Mensajes">💬</button>
            <button className="icon-btn" title="Notificaciones" aria-label="Notificaciones">🔔</button>
            <div className="user-chip">
              <span className="user-avatar">{(user?.name || '?').charAt(0)}</span>
              <span className="user-meta">
                <strong>{user?.name}</strong>
                <small>{ROLE_LABELS[user?.role]}</small>
              </span>
            </div>
            <button className="btn btn-soft btn-sm" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container flex justify-between items-center">
          <span>© 2026 EduTech — Plataforma de Aprendizaje Colaborativo</span>
          <span className="flex gap"><a href="#config">Configuración</a> | <a href="#soporte">Soporte</a></span>
        </div>
      </footer>
    </div>
  );
}
