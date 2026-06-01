import { createContext, useContext, useState, useCallback } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext(null);

const MAX_ATTEMPTS = 5; // RQNF006: bloqueo automático tras 4-6 intentos fallidos.

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [attempts, setAttempts] = useState({}); // intentos fallidos por id de usuario

  // Devuelve { ok, error, user } — no lanza excepciones para facilitar el manejo en el form.
  const login = useCallback((id, password, role) => {
    const key = (id || '').trim().toLowerCase();
    const failed = attempts[key] || 0;

    if (failed >= MAX_ATTEMPTS) {
      return { ok: false, error: 'blocked' };
    }

    const found = USERS.find((u) => u.id.toLowerCase() === key);
    const validPassword = found && found.password === password;
    const validRole = found && found.role === role;

    if (!found || !validPassword) {
      const next = failed + 1;
      setAttempts((a) => ({ ...a, [key]: next }));
      if (next >= MAX_ATTEMPTS) return { ok: false, error: 'blocked' };
      return { ok: false, error: 'invalid', remaining: MAX_ATTEMPTS - next };
    }
    if (!validRole) {
      return { ok: false, error: 'role' };
    }

    setAttempts((a) => ({ ...a, [key]: 0 }));
    const session = { ...found };
    delete session.password;
    setUser(session);
    return { ok: true, user: session };
  }, [attempts]);

  const logout = useCallback(() => setUser(null), []);

  // Cambio de contraseña en primer ingreso (RQNF002).
  const updatePassword = useCallback(() => {
    setUser((u) => (u ? { ...u, firstLogin: false } : u));
  }, []);

  const value = { user, login, logout, updatePassword, isAuthenticated: !!user };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
