/**
 * Utilidad para exportar datos a CSV.
 */

/**
 * Descarga un archivo CSV desde un array de filas.
 * @param {string}   nombre - Nombre del archivo (sin extensión)
 * @param {Array[]}  filas  - Array de arrays con los valores por fila
 */
export function exportarCSV(nombre, filas) {
  const contenido = filas
    .map((fila) => fila.map((v) => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','))
    .join('\n');

  const blob = new Blob([`\uFEFF${contenido}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `${nombre}.csv`;
  enlace.click();
  URL.revokeObjectURL(url);
}
