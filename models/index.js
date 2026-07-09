const dbConn = require('../db')
const UserModel = require("./User")
const TaskModel = require("./Task")

UserModel.hasMany(TaskModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    hooks: true
})
TaskModel.belongsTo(UserModel, {
    foreignKey: 'userId'
})


module.exports = {dbConn, UserModel, TaskModel}