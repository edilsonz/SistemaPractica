/**
 * Validaciones para convocatorias.
 */

const MODALIDADES_VALIDAS = ['Presencial', 'Virtual', 'Híbrida'];

function validarCrearConvocatoria({ titulo, descripcion, modalidad, fecha_inicio, fecha_fin }) {
  const errores = [];
  if (!titulo) errores.push('titulo es requerido.');
  if (!descripcion) errores.push('descripcion es requerida.');
  if (modalidad && !MODALIDADES_VALIDAS.includes(modalidad)) {
    errores.push(`Modalidad inválida. Valores permitidos: ${MODALIDADES_VALIDAS.join(', ')}.`);
  }

  const fechaInicio = fecha_inicio ? new Date(fecha_inicio) : new Date();
  const fechaFin = fecha_fin ? new Date(fecha_fin) : null;

  if (Number.isNaN(fechaInicio.getTime())) errores.push('fecha_inicio no tiene un formato válido.');
  if (fechaFin && Number.isNaN(fechaFin.getTime())) errores.push('fecha_fin no tiene un formato válido.');
  if (fechaFin && !Number.isNaN(fechaFin.getTime()) && fechaFin < fechaInicio) {
    errores.push('fecha_fin no puede ser anterior a fecha_inicio.');
  }

  return errores;
}

module.exports = { validarCrearConvocatoria, MODALIDADES_VALIDAS };
