const { Sequelize } = require("sequelize")
const dbConn = new Sequelize("postgres://postgres:root@localhost:5432/task-api", {logging: false})

module.exports = dbConn