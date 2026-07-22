const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Convocatoria = sequelize.define(
    'Convocatoria',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      empresa: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      modalidad: {
        type: DataTypes.ENUM('Presencial', 'Virtual', 'Híbrida'),
        allowNull: true,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'convocatorias',
      timestamps: true,
      underscored: true,
    }
  );

  return Convocatoria;
};

