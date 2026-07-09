const { DataTypes } = require("sequelize")
const dbConn = require("../db")

const TaskModel = dbConn.define('task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "todo",
    },
})

module.exports = TaskModel