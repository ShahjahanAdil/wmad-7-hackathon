const express = require("express")
const router = express.Router()

const todosModel = require('../models/todos')
const verfiyToken = require("../middlewares/auth")

const generateRandomID = () => { return Math.random().toString(36).slice(5) }

router.get("/all", verfiyToken, async (req, res) => {
    try {
        const userID = req.userID
        const todos = await todosModel.find({ userID })

        res.status(200).json({ message: "Fetched Todos!", todos })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.post("/create", async (req, res) => {
    try {
        const { userID, title, description, status, imageURL } = req.body

        await todosModel.create({
            userID,
            todoID: generateRandomID(),
            title,
            description,
            status,
            imageURL
        })

        res.status(201).json({ message: "Todo created!" })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.patch("/update/:todoID", async (req, res) => {
    try {
        const updatedTodo = req.body
        const { todoID } = req.params

        await todosModel.findOneAndUpdate({ todoID }, updatedTodo, { new: true })

        res.status(202).json({ message: 'Todo updated!' })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.delete("/delete/:todoID", async (req, res) => {
    try {
        const { todoID } = req.params

        await todosModel.findOneAndDelete({ todoID })

        res.status(203).json({ message: 'Todo deleted!' })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

module.exports = router