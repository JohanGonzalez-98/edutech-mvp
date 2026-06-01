// ===== PRUEBAS UNITARIAS =====
// Validan la lógica de autenticación (AuthContext) de forma aislada:
// login correcto, credenciales inválidas, rol incorrecto y bloqueo por intentos.
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { getSubject, getTasksBySubject, SUBJECTS } from '../data/mockData';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext — login', () => {
  it('autentica con credenciales y rol correctos', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let res;
    act(() => { res = result.current.login('estudiante', 'edutech123', 'estudiante'); });
    expect(res.ok).toBe(true);
    expect(result.current.user.role).toBe('estudiante');
    expect(result.current.user.password).toBeUndefined(); // no se expone la contraseña
  });

  it('rechaza una contraseña incorrecta e informa intentos restantes', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let res;
    act(() => { res = result.current.login('docente', 'mala', 'docente'); });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('invalid');
    expect(res.remaining).toBe(4);
  });

  it('rechaza cuando el rol no corresponde al usuario', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let res;
    act(() => { res = result.current.login('docente', 'edutech123', 'estudiante'); });
    expect(res.ok).toBe(false);
    expect(res.error).toBe('role');
  });

  it('bloquea la cuenta tras 5 intentos fallidos (RQNF006)', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let res;
    for (let i = 0; i < 5; i++) {
      act(() => { res = result.current.login('admin', 'incorrecta', 'admin'); });
    }
    expect(res.error).toBe('blocked');
  });

  it('cierra la sesión correctamente', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => { result.current.login('estudiante', 'edutech123', 'estudiante'); });
    expect(result.current.isAuthenticated).toBe(true);
    act(() => { result.current.logout(); });
    expect(result.current.isAuthenticated).toBe(false);
  });
});

describe('mockData — helpers', () => {
  it('getSubject devuelve la materia por id', () => {
    expect(getSubject('s1').nombre).toBe('Inglés');
    expect(getSubject('inexistente')).toBeUndefined();
  });

  it('getTasksBySubject filtra las tareas de una materia', () => {
    const tareas = getTasksBySubject('s1');
    expect(tareas.length).toBeGreaterThan(0);
    expect(tareas.every((t) => t.subjectId === 's1')).toBe(true);
  });

  it('todas las materias tienen color para el semáforo visual', () => {
    expect(SUBJECTS.every((s) => /^#[0-9a-f]{6}$/i.test(s.color))).toBe(true);
  });
});
