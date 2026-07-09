const express = require("express")
const { dbConn, UserModel, TaskModel } = require("../models");
const router = express.Router()

// IMPORTANT: Do not forget to add await before every async operation such as interacting with the DB.

router.get("/", async (request, response, next) => {
    const params = request.params
    const query = request.query

    try {
        if (query) {
            const email = query.email
            const foundUser = await UserModel.findOne({
                where: {email: email}
            })
            return foundUser ? response.status(200).json(foundUser) : response.status(404).send("No user found.")
        }

        const allUsers = await UserModel.findAll()
        return response.status(200).json(allUsers)
    } catch(error) {
        next(error)
    }
})

module.exports = router