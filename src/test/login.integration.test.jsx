// ===== PRUEBAS DE INTEGRACIÓN =====
// Validan el componente Login integrado con el routing y el contexto de auth:
// renderiza el formulario, valida campos vacíos, muestra errores y navega al panel.
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../pages/Login';

// Monta el Login con un destino simulado para cada rol.
function renderLogin() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/estudiante" element={<h1>Panel Estudiante</h1>} />
          <Route path="/docente" element={<h1>Panel Docente</h1>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
}

describe('Login — integración', () => {
  let user;
  beforeEach(() => { user = userEvent.setup(); });

  it('muestra el formulario con los campos esperados', () => {
    renderLogin();
    expect(screen.getByText('EduTech')).toBeInTheDocument();
    expect(screen.getByLabelText('Usuario')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
    expect(screen.getByLabelText('Rol')).toBeInTheDocument();
  });

  it('valida campos vacíos (Escenario 3)', async () => {
    renderLogin();
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(await screen.findByText('Ingresa tu usuario.')).toBeInTheDocument();
    expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument();
    expect(screen.getByText('Selecciona un rol.')).toBeInTheDocument();
  });

  it('muestra error con credenciales incorrectas (Escenario 2)', async () => {
    renderLogin();
    await user.type(screen.getByLabelText('Usuario'), 'estudiante');
    await user.type(screen.getByLabelText('Contraseña'), 'incorrecta');
    await user.selectOptions(screen.getByLabelText('Rol'), 'estudiante');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    expect(await screen.findByText(/usuario o contraseña incorrectos/i)).toBeInTheDocument();
  });

  it('inicia sesión y redirige al panel del estudiante (Escenario 1)', async () => {
    renderLogin();
    await user.type(screen.getByLabelText('Usuario'), 'estudiante');
    await user.type(screen.getByLabelText('Contraseña'), 'edutech123');
    await user.selectOptions(screen.getByLabelText('Rol'), 'estudiante');
    await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));
    await waitFor(() => expect(screen.getByText('Panel Estudiante')).toBeInTheDocument());
  });
});
