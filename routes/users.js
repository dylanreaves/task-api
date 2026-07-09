const express = require("express")
const { dbConn, UserModel, TaskModel } = require("../models");
const router = express.Router()

// IMPORTANT: Do not forget to add await before every async operation such as interacting with the DB.

router.get("/", async (request, response, next) => {
    const params = request.params
    const query = request.query
    console.log(query)

    try {
        const email = query.email
        if (email) {
            const foundUser = await UserModel.findOne({
                where: {email: email},
                attributes: {
                    exclude: ["password"],
                }
            })
            return foundUser ? response.status(200).json(foundUser) : response.status(404).send("No user found.")
        }

        const allUsers = await UserModel.findAll({
            attributes: {
                exclude: ["password"],
            }
        })
        return response.status(200).json(allUsers)
    } catch(error) {
        next(error)
    }
})

router.get("/:id/tasks", async (request, response, next) => {
    const params = request.params
    const id = Number(params.id)

    try {
        const foundUser = await UserModel.findByPk(id, {
            attributes: {exclude: ["password"],}
        })

        if (foundUser) {
            const userTasks = await TaskModel.findAll({
                where: {userId: id}
            })
            return userTasks ? response.status(200).json(userTasks) : response.status(404).send("No tasks found for user.")
        }

        return response.status(404).send("No user found.")
    } catch(error) {
        next(error)
    }
})

module.exports = router