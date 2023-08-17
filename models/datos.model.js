const { DataTypes } = require('sequelize');
const dbConnection = require('../database/config');

const DatosRiego = dbConnection.define('datosRiego', {
  idDatos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  humedadAmbiente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  temperaturaAmbiente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  humedadTierra: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sensorLluvia: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = DatosRiego;
