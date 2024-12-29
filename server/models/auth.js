const mongoose = require("mongoose")
const { Schema } = mongoose

const usersSchema = new Schema({
    userID: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [String], required: true },
    status: { type: String, required: true }
}, { timestamps: true })

const usersModel = mongoose.model("users", usersSchema)

module.exports = usersModel