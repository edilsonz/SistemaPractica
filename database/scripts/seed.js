// Opcional: semillas simples. Puedes ejecutarlo manualmente si lo deseas.
// Ejecución sugerida: node src/migrations/seed.js

const { Usuario, Estudiante, Convocatoria } = require('../../backend/src/models');
const bcrypt = require('../../backend/node_modules/bcryptjs');

async function seed() {
  const [adminPassword, empresaPassword, estudiantePassword] = await Promise.all([
    bcrypt.hash('admin123', 12),
    bcrypt.hash('empresa123', 12),
    bcrypt.hash('estudiante123', 12),
  ]);
  // Usuarios demo
  await Usuario.findOrCreate({
    where: { email: 'admin@unsch.edu.pe' },
    defaults: {
      nombre: 'Admin UNSCH',
      passwordHash: adminPassword,
      rol: 'admin',
    },
  });

  await Usuario.findOrCreate({
    where: { email: 'empresa@unsch.edu.pe' },
    defaults: {
      nombre: 'Empresa Demo',
      passwordHash: empresaPassword,
      rol: 'empresa',
      approved: true,
      razon_social: 'Empresa Demo S.A.C.',
      ruc: '20123456789',
      descripcion: 'Empresa colaboradora autorizada por UNSCH.',
    },
  });

  const [estudianteUsuario] = await Usuario.findOrCreate({
    where: { email: 'demo@unsch.edu.pe' },
    defaults: {
      nombre: 'Demo Estudiante',
      passwordHash: estudiantePassword,
      rol: 'estudiante',
    },
  });

  const [estudiante1] = await Estudiante.findOrCreate({
    where: { email: 'demo@unsch.edu.pe' },
    defaults: {
      nombre: 'Demo Estudiante',
      email: 'demo@unsch.edu.pe',
      usuario_id: estudianteUsuario.id,
    },
  });

  const [convocatoria1] = await Convocatoria.findOrCreate({
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

  console.log('Seed OK:', { estudiante1, convocatoria1 });
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});


