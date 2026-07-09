const { Sequelize } = require("sequelize")
require('dotenv').config();

const dbConn = new Sequelize(process.env.DB_URL, {logging: false})

module.exports = dbConn