const express = require("express")
const router = express.Router()

const eventsModel = require("../models/events")
const verfiyToken = require("../middlewares/auth")

const generateRandomID = () => { return Math.random().toString(36).slice(5) }

router.get("/all-events", async (req, res) => {
    try {
        const events = await eventsModel.find()

        res.status(200).json({ message: "Fetched events successfully!", events })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

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
        const { userID, title, description, imageURL, location, category, date, privacy } = req.body
        const eventID = generateRandomID()

        await eventsModel.create({
            userID,
            eventID,
            title,
            description,
            imageURL,
            location,
            category,
            date,
            privacy
        })

        res.status(201).json({ message: "Event created!" })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.patch("/update/:eventID", async (req, res) => {
    try {
        const updatedEvent = req.body
        const { eventID } = req.params

        await eventsModel.findOneAndUpdate({ eventID }, updatedEvent, { new: true })

        res.status(202).json({ message: 'Event updated!' })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.delete("/delete/:eventID", async (req, res) => {
    try {
        const { eventID } = req.params

        await eventsModel.findOneAndDelete({ eventID })

        res.status(203).json({ message: 'Event deleted!' })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

module.exports = router