/**
 * Tests unitarios — StatCard
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import StatCard from '../../src/components/shared/StatCard';

describe('StatCard', () => {
  test('muestra el label correctamente', () => {
    render(<StatCard label="Convocatorias" value={5} />);
    expect(screen.getByText('Convocatorias')).toBeInTheDocument();
  });

  test('muestra el valor numérico', () => {
    render(<StatCard label="Total" value={42} />);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('muestra 0 cuando value es undefined', () => {
    render(<StatCard label="Total" />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('muestra el icono cuando se pasa la prop icon', () => {
    render(<StatCard label="Test" value={1} icon="📋" />);
    expect(screen.getByText('📋')).toBeInTheDocument();
  });

  test('no muestra icono cuando no se pasa la prop icon', () => {
    render(<StatCard label="Test" value={1} />);
    expect(screen.queryByText('📋')).not.toBeInTheDocument();
  });

  test('muestra el footer cuando se pasa la prop', () => {
    render(<StatCard label="Test" value={1} footer="Actualizado hoy" />);
    expect(screen.getByText('Actualizado hoy')).toBeInTheDocument();
  });

  test('no muestra footer cuando no se pasa la prop', () => {
    render(<StatCard label="Test" value={1} />);
    expect(screen.queryByText('Actualizado hoy')).not.toBeInTheDocument();
  });

  test('aplica clase bg-primary con color="primary"', () => {
    const { container } = render(<StatCard label="Test" value={1} color="primary" />);
    expect(container.firstChild).toHaveClass('bg-primary');
  });

  test('aplica clase bg-success con color="success"', () => {
    const { container } = render(<StatCard label="Test" value={1} color="success" />);
    expect(container.firstChild).toHaveClass('bg-success');
  });

  test('aplica clase bg-light por defecto', () => {
    const { container } = render(<StatCard label="Test" value={1} />);
    expect(container.firstChild).toHaveClass('bg-light');
  });
});
