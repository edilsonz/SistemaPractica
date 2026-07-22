/**
 * Script de seed — crea datos de demostración en la base de datos.
 * Ejecutar desde el directorio backend/:
 *   node src/migrations/seed.js
 */

const { Usuario, Estudiante, Convocatoria, syncAll } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  await syncAll();

  const [adminPass, empresaPass, estudiantePass] = await Promise.all([
    bcrypt.hash('admin123', 12),
    bcrypt.hash('empresa123', 12),
    bcrypt.hash('estudiante123', 12),
  ]);

  await Usuario.findOrCreate({
    where: { email: 'admin@unsch.edu.pe' },
    defaults: { nombre: 'Admin UNSCH', passwordHash: adminPass, rol: 'admin', approved: true },
  });

  await Usuario.findOrCreate({
    where: { email: 'empresa@unsch.edu.pe' },
    defaults: {
      nombre: 'Empresa Demo',
      passwordHash: empresaPass,
      rol: 'empresa',
      approved: true,
      razon_social: 'Empresa Demo S.A.C.',
      ruc: '20123456789',
      descripcion: 'Empresa colaboradora autorizada por UNSCH.',
    },
  });

  const [estudianteUsuario] = await Usuario.findOrCreate({
    where: { email: 'demo@unsch.edu.pe' },
    defaults: { nombre: 'Demo Estudiante', passwordHash: estudiantePass, rol: 'estudiante', approved: true },
  });

  await Estudiante.findOrCreate({
    where: { email: 'demo@unsch.edu.pe' },
    defaults: {
      nombre: 'Demo Estudiante',
      email: 'demo@unsch.edu.pe',
      usuario_id: estudianteUsuario.id,
      escuela: 'Ingeniería Informática',
    },
  });

  await Convocatoria.findOrCreate({
    where: { titulo: 'Prácticas de Desarrollo Web' },
    defaults: {
      empresa: 'Empresa Demo',
      descripcion: 'Oportunidad para aprender y desarrollar en proyectos reales.',
      modalidad: 'Híbrida',
      activo: true,
      fecha_inicio: new Date(),
      fecha_fin: null,
    },
  });

  console.log('✅ Seed completado correctamente.');
  process.exit(0);
}

seed().catch((e) => { console.error('❌ Error en seed:', e.message); process.exit(1); });
