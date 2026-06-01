// Configuración global para las pruebas con Vitest + Testing Library.
import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Limpia el DOM después de cada prueba para evitar fugas entre tests.
afterEach(() => cleanup());
