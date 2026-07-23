/**
 * Tests unitarios — Toast y ToastContainer
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import SingleToast, { ToastContainer } from '../../src/components/shared/Toast';

describe('SingleToast', () => {
  test('muestra el mensaje', () => {
    render(<SingleToast type="success" message="Operación exitosa" onDone={() => {}} />);
    expect(screen.getByText('Operación exitosa')).toBeInTheDocument();
  });

  test('tiene role="alert" para accesibilidad', () => {
    render(<SingleToast type="info" message="Hola" onDone={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('llama onDone al hacer click en Cerrar', () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<SingleToast type="danger" message="Error" onDone={onDone} />);

    fireEvent.click(screen.getByLabelText('Cerrar'));
    vi.advanceTimersByTime(300); // espera la animación de salida (220ms)

    expect(onDone).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  test('aplica color de fondo correcto según type success', () => {
    const { getByRole } = render(<SingleToast type="success" message="OK" onDone={() => {}} />);
    const alert = getByRole('alert');
    expect(alert.style.background).toBe('rgb(209, 231, 221)'); // #d1e7dd
  });

  test('aplica color de fondo correcto según type danger', () => {
    const { getByRole } = render(<SingleToast type="danger" message="Error" onDone={() => {}} />);
    expect(getByRole('alert').style.background).toBe('rgb(248, 215, 218)'); // #f8d7da
  });
});

describe('ToastContainer', () => {
  test('no renderiza nada cuando toasts está vacío', () => {
    const { container } = render(<ToastContainer toasts={[]} onRemove={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  test('renderiza los toasts correctamente', () => {
    const toasts = [
      { id: 1, type: 'success', message: 'Guardado' },
      { id: 2, type: 'warning', message: 'Advertencia' },
    ];
    render(<ToastContainer toasts={toasts} onRemove={() => {}} />);
    expect(screen.getByText('Guardado')).toBeInTheDocument();
    expect(screen.getByText('Advertencia')).toBeInTheDocument();
  });

  test('tiene aria-label="Notificaciones"', () => {
    const toasts = [{ id: 1, type: 'info', message: 'Info' }];
    render(<ToastContainer toasts={toasts} onRemove={() => {}} />);
    expect(screen.getByLabelText('Notificaciones')).toBeInTheDocument();
  });
});
