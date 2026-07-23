/**
 * Tests unitarios — EmptyState
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import EmptyState from '../../src/components/shared/EmptyState';

describe('EmptyState', () => {
  test('muestra el título por defecto cuando no se pasa title', () => {
    render(<EmptyState />);
    expect(screen.getByText('Sin datos')).toBeInTheDocument();
  });

  test('muestra el título personalizado', () => {
    render(<EmptyState title="No hay convocatorias" />);
    expect(screen.getByText('No hay convocatorias')).toBeInTheDocument();
  });

  test('muestra la descripción cuando se pasa', () => {
    render(<EmptyState title="Vacío" description="Intenta con otros filtros." />);
    expect(screen.getByText('Intenta con otros filtros.')).toBeInTheDocument();
  });

  test('no muestra descripción cuando no se pasa', () => {
    render(<EmptyState title="Vacío" />);
    expect(screen.queryByText('Intenta con otros filtros.')).not.toBeInTheDocument();
  });

  test('muestra el botón de acción cuando se pasa', () => {
    render(
      <EmptyState
        title="Vacío"
        action={<button>Limpiar filtros</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Limpiar filtros' })).toBeInTheDocument();
  });

  test('tiene role="status" para accesibilidad', () => {
    render(<EmptyState title="Vacío" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('muestra emoji de fallback cuando no hay iconKey', () => {
    render(<EmptyState icon="📭" title="Vacío" />);
    expect(screen.getByText('📭')).toBeInTheDocument();
  });

  test('muestra SVG cuando se pasa iconKey válido', () => {
    const { container } = render(<EmptyState iconKey="search" title="Sin resultados" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
