import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protege rutas: exige sesión, valida el rol y fuerza el cambio de contraseña
// en el primer ingreso (RQNF002).
export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (user.firstLogin && location.pathname !== '/cambiar-password') {
    return <Navigate to="/cambiar-password" replace />;
  }
  if (role && user.role !== role) {
    // Si el rol no corresponde, redirige al panel propio del usuario.
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
}
