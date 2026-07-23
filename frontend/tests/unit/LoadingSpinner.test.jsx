/**
 * Tests unitarios — LoadingSpinner
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import LoadingSpinner from '../../src/components/shared/LoadingSpinner';

describe('LoadingSpinner', () => {
  test('muestra el texto de carga por defecto', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('muestra texto personalizado', () => {
    render(<LoadingSpinner text="Guardando datos..." />);
    expect(screen.getByText('Guardando datos...')).toBeInTheDocument();
  });

  test('no muestra texto cuando text es vacío', () => {
    render(<LoadingSpinner text="" />);
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument();
  });

  test('sin overlay no tiene role="status"', () => {
    render(<LoadingSpinner />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('con overlay=true tiene role="status" y aria-live', () => {
    render(<LoadingSpinner overlay={true} text="Espera..." />);
    const overlay = screen.getByRole('status');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute('aria-live', 'polite');
  });

  test('con overlay=true muestra el texto dentro del overlay', () => {
    render(<LoadingSpinner overlay={true} text="Procesando..." />);
    expect(screen.getByText('Procesando...')).toBeInTheDocument();
  });
});
