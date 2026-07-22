const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Estudiante = sequelize.define(
    'Estudiante',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      // Relación opcional con Usuario (para roles)
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      escuela: {
        type: DataTypes.STRING(180),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      cv_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
    },
    {
      tableName: 'estudiantes',
      timestamps: true,
      underscored: true,
    }
  );

  return Estudiante;
};


