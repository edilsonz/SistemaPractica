/**
 * Tests de integración — Convocatorias
 * Verifica filtros, búsqueda y renderizado de tarjetas.
 */
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import Convocatorias from '../../src/components/estudiante/Convocatorias';

const MOCK_CONVOCATORIAS = [
  {
    id: 1,
    titulo: 'Práctica en Sistemas',
    empresa: 'GORE Ayacucho',
    descripcion: 'Soporte técnico y desarrollo',
    modalidad: 'Presencial',
    activo: true,
    fecha_fin: '2027-12-31',
  },
  {
    id: 2,
    titulo: 'Práctica Contable',
    empresa: 'SUNAT Ayacucho',
    descripcion: 'Auditoría y reportes financieros',
    modalidad: 'Virtual',
    activo: true,
    fecha_fin: '2027-10-01',
  },
  {
    id: 3,
    titulo: 'Práctica en Marketing',
    empresa: 'Empresa Local SAC',
    descripcion: 'Manejo de redes sociales',
    modalidad: 'Híbrida',
    activo: true,
    fecha_fin: null,
  },
];

describe('Convocatorias — render', () => {
  test('muestra el título de la sección', () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );
    expect(screen.getByText('Convocatorias disponibles')).toBeInTheDocument();
  });

  test('muestra las 3 convocatorias', () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );
    expect(screen.getByText('Práctica en Sistemas')).toBeInTheDocument();
    expect(screen.getByText('Práctica Contable')).toBeInTheDocument();
    expect(screen.getByText('Práctica en Marketing')).toBeInTheDocument();
  });

  test('muestra el nombre de la empresa en cada tarjeta', () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );
    expect(screen.getByText('GORE Ayacucho')).toBeInTheDocument();
    expect(screen.getByText('SUNAT Ayacucho')).toBeInTheDocument();
  });

  test('muestra badge "✓ Postulado" en convocatorias ya postuladas', () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set([1])}
        onPostular={vi.fn()}
        loading={false}
      />
    );
    expect(screen.getByText('✓ Postulado')).toBeInTheDocument();
  });

  test('muestra LoadingSpinner cuando loading=true', () => {
    render(
      <Convocatorias
        convocatorias={[]}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={true}
      />
    );
    expect(screen.getByText('Cargando convocatorias...')).toBeInTheDocument();
  });

  test('muestra EmptyState cuando no hay convocatorias', () => {
    render(
      <Convocatorias
        convocatorias={[]}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );
    expect(screen.getByText(/sin resultados/i)).toBeInTheDocument();
  });
});

describe('Convocatorias — filtros', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('filtra por modalidad "Virtual" y muestra solo 1 resultado', async () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    await user.selectOptions(screen.getByLabelText('Filtrar por modalidad'), 'Virtual');

    expect(screen.getByText('Práctica Contable')).toBeInTheDocument();
    expect(screen.queryByText('Práctica en Sistemas')).not.toBeInTheDocument();
    expect(screen.queryByText('Práctica en Marketing')).not.toBeInTheDocument();
  });

  test('filtra por búsqueda de texto y encuentra por título', async () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    await user.type(
      screen.getByPlaceholderText('Buscar por título, empresa o descripción...'),
      'Contable'
    );

    expect(screen.getByText('Práctica Contable')).toBeInTheDocument();
    expect(screen.queryByText('Práctica en Sistemas')).not.toBeInTheDocument();
  });

  test('filtra por búsqueda de texto y encuentra por empresa', async () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    await user.type(
      screen.getByPlaceholderText('Buscar por título, empresa o descripción...'),
      'GORE'
    );

    expect(screen.getByText('Práctica en Sistemas')).toBeInTheDocument();
    expect(screen.queryByText('Práctica Contable')).not.toBeInTheDocument();
  });

  test('botón "Limpiar filtros" resetea los filtros', async () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    // Aplicar filtro que deje sin resultados
    await user.type(
      screen.getByPlaceholderText('Buscar por título, empresa o descripción...'),
      'xxxxxxxxnoexiste'
    );
    expect(screen.getByText('Sin resultados')).toBeInTheDocument();

    // Limpiar
    await user.click(screen.getByText('Limpiar filtros'));

    expect(screen.getByText('Práctica en Sistemas')).toBeInTheDocument();
    expect(screen.getByText('Práctica Contable')).toBeInTheDocument();
  });

  test('el contador de resultados es correcto al filtrar', async () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    // Inicialmente 3
    expect(screen.getByText('3 resultados')).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText('Filtrar por modalidad'), 'Presencial');
    expect(screen.getByText('1 resultado')).toBeInTheDocument();
  });
});

describe('Convocatorias — postular', () => {
  test('llama onPostular con el id correcto al hacer click', async () => {
    const onPostular = vi.fn();
    const user = userEvent.setup();

    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set()}
        onPostular={onPostular}
        loading={false}
      />
    );

    // Click en el primer botón "Postular ahora"
    const botones = screen.getAllByText('Postular ahora');
    await user.click(botones[0]);

    expect(onPostular).toHaveBeenCalledWith(1);
  });

  test('el botón está deshabilitado para convocatorias ya postuladas', () => {
    render(
      <Convocatorias
        convocatorias={MOCK_CONVOCATORIAS}
        postuladoIds={new Set([2])}
        onPostular={vi.fn()}
        loading={false}
      />
    );

    const btnPostulado = screen.getByText('✓ Ya postulaste');
    expect(btnPostulado).toBeDisabled();
  });
});
