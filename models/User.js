const { DataTypes } = require("sequelize")
const dbConn = require("../db")

const UserModel = dbConn.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Email must be valid email i.e. must contain '@'
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    // Password must be at least 8 chars
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = UserModel