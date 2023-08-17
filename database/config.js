const { Sequelize } = require('sequelize');

const  dbConection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    database: process.env.DB_NAME || 'asistencia_art140',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || '',
    port: process.env.DB_PORT || '3306',
    dialect: "mysql",
  });

module.exports = dbConection;