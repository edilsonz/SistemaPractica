/**
 * Footer — Pie de página de la aplicación.
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="text-center text-muted py-3 mt-auto border-top bg-white">
      <small>
        © {new Date().getFullYear()} Universidad Nacional de San Cristóbal de Huamanga — Sistema de Prácticas Preprofesionales
      </small>
    </footer>
  );
}
