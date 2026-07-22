const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Postulacion = sequelize.define(
    'Postulacion',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'estudiantes',
          key: 'id',
        },
      },
      convocatoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'convocatorias',
          key: 'id',
        },
      },
      estado: {
        type: DataTypes.ENUM('Enviado', 'En Evaluación', 'Seleccionado', 'Rechazado'),
        allowNull: false,
        defaultValue: 'Enviado',
      },
    },
    {
      tableName: 'postulaciones',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ['estudiante_id', 'convocatoria_id'],
        },
      ],
    }
  );

  return Postulacion;
};

