const mongoose = require("mongoose")
const { Schema } = mongoose

const todosSchema = new Schema({
    userID: { type: String, required: true },
    todoID: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String },
    imageURL: { type: String }
}, { timestamps: true })

const todosModel = mongoose.model("todos", todosSchema)

module.exports = todosModel