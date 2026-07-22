const sequelize = require('../config/database');

const Usuario = require('./Usuario')(sequelize);
const Estudiante = require('./Estudiante')(sequelize);
const Convocatoria = require('./Convocatoria')(sequelize);
const Postulacion = require('./Postulacion')(sequelize);

// Relaciones existentes (Postulacion)
Estudiante.hasMany(Postulacion, { foreignKey: 'estudiante_id' });
Postulacion.belongsTo(Estudiante, { foreignKey: 'estudiante_id' });

Convocatoria.hasMany(Postulacion, { foreignKey: 'convocatoria_id' });
Postulacion.belongsTo(Convocatoria, { foreignKey: 'convocatoria_id' });

// Usuario (rol) -> Estudiante
// Nota: este esquema asume que Estudiante es una “vista”/tabla adicional referenciando Usuario
// y para simplificar dejamos Estudiante.id como si fuera estudiante_id. Ajusta si quieres normalizar.
Usuario.hasMany(Estudiante, { foreignKey: 'usuario_id' });
Estudiante.belongsTo(Usuario, { foreignKey: 'usuario_id' });

const syncAll = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
};

module.exports = {
  sequelize,
  Usuario,
  Estudiante,
  Convocatoria,
  Postulacion,
  syncAll,
};


