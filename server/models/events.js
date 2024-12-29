const mongoose = require("mongoose")
const { Schema } = mongoose

const eventsSchema = new Schema({
    userID: { type: String, required: true },
    eventID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    location: { type: String },
    category: { type: String },
    date: { type: String },
}, { timestamps: true })

const eventsModel = mongoose.model("events", eventsSchema)

module.exports = eventsModel