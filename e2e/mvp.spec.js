// ===== PRUEBAS DE INTERACCIÓN (E2E) =====
// Validan el MVP desplegado/funcionando de extremo a extremo con Playwright:
// recorren el flujo real del usuario en el navegador.
import { test, expect } from '@playwright/test';

async function login(page, id, password, role) {
  await page.goto('/login');
  await page.fill('#id', id);
  await page.fill('#password', password);
  await page.selectOption('#role', role);
  await page.getByRole('button', { name: /iniciar sesión/i }).click();
}

test('login fallido muestra mensaje de error', async ({ page }) => {
  await login(page, 'estudiante', 'clave-mala', 'estudiante');
  await expect(page.getByText(/usuario o contraseña incorrectos/i)).toBeVisible();
});

test('estudiante: login → dashboard → materia → entrega de tarea', async ({ page }) => {
  await login(page, 'estudiante', 'edutech123', 'estudiante');

  // Llega al dashboard del estudiante.
  await expect(page.getByText(/hola, nicole/i)).toBeVisible();

  // Entra a una materia y abre una tarea.
  await page.getByText('Inglés').first().click();
  await expect(page.getByText('Tarea 1 — Reading comprehension')).toBeVisible();
  await page.getByText('Tarea 1 — Reading comprehension').click();

  // Sube la entrega.
  await page.getByRole('link', { name: /subir entrega/i }).click();
  await expect(page.getByText(/arrastra y suelta/i)).toBeVisible();

  // Adjunta un archivo y envía.
  await page.setInputFiles('input[type="file"]', {
    name: 'entrega.pdf',
    mimeType: 'application/pdf',
    buffer: Buffer.from('contenido de prueba'),
  });
  await page.getByRole('button', { name: /enviar actividad/i }).click();

  // Verifica el comprobante de entrega.
  await expect(page.getByText(/entrega exitosa/i)).toBeVisible();
  await expect(page.getByText(/fecha y hora de entrega/i)).toBeVisible();
});

test('docente: login → publicar actividad con validación', async ({ page }) => {
  await login(page, 'docente', 'edutech123', 'docente');
  await expect(page.getByText(/hola, tatiana/i)).toBeVisible();

  await page.getByText('Inglés').first().click();
  await page.getByRole('link', { name: /publicar actividad/i }).click();

  // Intenta publicar vacío → debe mostrar errores.
  await page.getByRole('button', { name: /publicar actividad/i }).click();
  await expect(page.getByText(/el título es obligatorio/i)).toBeVisible();

  // Completa el formulario y publica.
  await page.fill('#titulo', 'Tarea de prueba E2E');
  await page.fill('#descripcion', 'Descripción de prueba automatizada.');
  await page.fill('#cierre', '2026-12-31');
  await page.getByRole('button', { name: /publicar actividad/i }).click();
  await expect(page.getByText(/actividad publicada/i)).toBeVisible();
});

test('admin: login y panel de métricas', async ({ page }) => {
  await login(page, 'admin', 'edutech123', 'admin');
  await expect(page.getByText(/panel de administración/i)).toBeVisible();
  await expect(page.getByText('Docentes')).toBeVisible();
});
