/**
 * Tests de integración — LoginForm
 * Simula interacción completa del usuario con el formulario de login.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import LoginForm from '../../src/components/auth/LoginForm';

// En producción DEV=false → campos vacíos
vi.stubEnv('DEV', false);

describe('LoginForm — render', () => {
  test('muestra el título "Iniciar sesión"', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('muestra campos de email y contraseña', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByPlaceholderText('tu@correo.edu.pe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  test('muestra los botones de selección de rol', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByText(/estudiante/i)).toBeInTheDocument();
    expect(screen.getByText(/organización/i)).toBeInTheDocument();
  });

  test('muestra el botón de ingresar', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByText('Ingresar al sistema')).toBeInTheDocument();
  });

  test('muestra link para registrarse', () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByText('Crear cuenta gratis')).toBeInTheDocument();
  });
});

describe('LoginForm — interacción', () => {
  let user;

  beforeEach(() => {
    user = userEvent.setup();
  });

  test('llama onLogin al enviar el formulario', async () => {
    const onLogin = vi.fn().mockResolvedValue(undefined);
    render(<LoginForm onLogin={onLogin} loading={false} onSwitchToRegister={vi.fn()} />);

    const emailInput = screen.getByPlaceholderText('tu@correo.edu.pe');
    const passInput  = screen.getByPlaceholderText('••••••••');

    // Cambiar valores directamente con fireEvent para saltear las restricciones de jsdom
    fireEvent.change(emailInput, { target: { value: 'test@unsch.edu.pe' } });
    fireEvent.change(passInput,  { target: { value: 'pass1234' } });
    fireEvent.submit(emailInput.closest('form'));

    await waitFor(() => {
      expect(onLogin).toHaveBeenCalledTimes(1);
      const [emailArg, passArg] = onLogin.mock.calls[0];
      expect(emailArg).toBe('test@unsch.edu.pe');
      expect(passArg).toBe('pass1234');
    });
  });

  test('llama onSwitchToRegister al hacer click en "Crear cuenta"', async () => {
    const onSwitch = vi.fn();
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={onSwitch} />);

    await user.click(screen.getByText('Crear cuenta gratis'));
    expect(onSwitch).toHaveBeenCalledTimes(1);
  });

  test('el botón muestra spinner y texto "Verificando..." durante loading', () => {
    render(<LoginForm onLogin={vi.fn()} loading={true} onSwitchToRegister={vi.fn()} />);
    expect(screen.getByText('Verificando...')).toBeInTheDocument();
    expect(screen.queryByText('Ingresar al sistema')).not.toBeInTheDocument();
  });

  test('el botón está deshabilitado durante loading', () => {
    render(<LoginForm onLogin={vi.fn()} loading={true} onSwitchToRegister={vi.fn()} />);
    const btn = screen.getByRole('button', { name: /verificando/i });
    expect(btn).toBeDisabled();
  });

  test('toggle de visibilidad de contraseña cambia type del input', async () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);

    const passInput = screen.getByPlaceholderText('••••••••');
    expect(passInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByLabelText('Ver contraseña'));
    expect(passInput).toHaveAttribute('type', 'text');

    await user.click(screen.getByLabelText('Ocultar contraseña'));
    expect(passInput).toHaveAttribute('type', 'password');
  });

  test('cambiar rol a Organización actualiza el botón activo', async () => {
    render(<LoginForm onLogin={vi.fn()} loading={false} onSwitchToRegister={vi.fn()} />);

    const btnOrg = screen.getByText(/organización/i);
    await user.click(btnOrg);

    // El botón de organización debe quedar con borde azul (border-color como check)
    expect(btnOrg.style.borderColor).toBe('rgb(13, 110, 253)');
  });
});
