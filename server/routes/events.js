const express = require("express")
const router = express.Router()

const eventsModel = require("../models/events")
const verfiyToken = require("../middlewares/auth")

router.get("/all", verfiyToken, async (req, res) => {
    try {
        const userID = req.userID
        const events = await eventsModel.find({ userID })

        res.status(200).json({ message: "Fetched events successfully!", events })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.post("/create", async (req, res) => {
    try {
        const { userID, title, description, imageURL, location, category, date } = req.body

        await eventsModel.create({
            userID,
            title,
            description,
            imageURL,
            location,
            category,
            date
        })

        res.status(201).json({ message: "Event created!" })
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