const express = require("express")
const { dbConn, UserModel, TaskModel } = require("../models");
const { Op } = require("sequelize")
const router = express.Router()

// IMPORTANT: Do not forget to add await before every async operation such as interactions with the DB.

router.get("/", async (request, response, next) => {
    const query = request.query
    const {search, status, minPriority} = query

    try {
        // Object entries in where should be what you are trying to filter through in the database.
        const where = {}
        if (status) {
            // Support multiple statuses by splitting.
            const split = status.split(',')
            where.status = {[Op.in]: split}
        }
        if (search) {
            where.title  = {[Op.iLike]: `%${search}%`}
        }
        if (minPriority) {
            where.priority = {[Op.gte]: Number(minPriority)}
        }   

        // console.log("THIS IS Where:", where)
        const allTasks = await TaskModel.findAll({ where })
        return allTasks.length > 0 ? response.status(200).json(allTasks) : response.status(404).send("No tasks found.")
    } catch(error) {
        next(error)
    }
})

router.get("/:id", async (request, response, next) => {
    const params = request.params
    const id = Number(params.id)

    try {
        const foundTask = await TaskModel.findByPk(id)
        if (foundTask) {
            return response.status(200).json(foundTask)
        } else {
            return response.sendStatus(404)
        }

    } catch(error) {
        next(error)
    }
})

// requireTitle
function validateTask(request, response, next) {
    const title = request.body.title
    if (!title) {
        response.status(400).send("Title is missing.")
    }
    next()
}

// Create some validation middleware
router.post("/", validateTask, async (request, response, next) => {
    const body = request.body

    try {
        const newTask = await TaskModel.create({...body})
        console.log(newTask)
        return response.status(201).json(newTask)

    } catch(error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ Error: error.errors[0].message });
        }
        next(error)
    }
})

router.patch("/:id", async (request, response, next) => {
    const params = request.params
    const id = Number(params.id)
    const body = request.body

    try {
        const foundTask = await TaskModel.findByPk(id)
        console.log(foundTask)
        if (foundTask) {
            foundTask.update(body)
            return response.status(204).json(foundTask)
        } else {
            return response.sendStatus(404)
        }

    } catch(error) {
        next(error)
    }
})

router.delete("/:id", async (request, response, next) => {
    const params = request.params
    const id = Number(params.id)

    try {
        const foundTask = await TaskModel.findByPk(id)
        console.log(foundTask)
        if (foundTask) {
            foundTask.destroy()
            return response.status(204).json(foundTask)
        } else {
            return response.sendStatus(404)
        }

    } catch(error) {
        next(error)
    }
})

module.exports = router