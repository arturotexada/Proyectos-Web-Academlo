require('dotenv').config();
// Vamos a gestionar la conexión con una base de datos
// Importat sequelize
const { Sequelize } = require('sequelize');

// Crear una instancia de sequelize con la configuración
// de conexión

const db = new Sequelize({
    host: process.env.DB_HOST, // "dpg-chdfag3hp8u3v707v0d0-a.ohio-postgres.render.com",
    database: process.env.DB_NAME,
    //"users_crud_775s",
    port: process.env.DB_PORT,
    //5432,
    username: process.env.DB_USERNAME,
    //'arturoxts',
    password: process.env.DB_PASSWORD,
    //'pS2KgX4pq0BrP5GWFqdil1PDZCoW9fRP',
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

module.exports = db;

//  postgres://arturoxts:pS2KgX4pq0BrP5GWFqdil1PDZCoW9fRP@dpg-chdfag3hp8u3v707v0d0-a.ohio-postgres.render.com/users_crud_775s