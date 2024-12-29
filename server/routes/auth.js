const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const authModel = require("../models/auth")
const verfiyToken = require("../middlewares/auth")

const generateRandomID = () => { return Math.random().toString(36).slice(2) }

router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await authModel.create({
            userID: generateRandomID(),
            username,
            email,
            password: hashedPassword,
            roles: ['customer'],
            status: 'active'
        })

        res.status(201).json({ message: "User created succesfully!", user })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({ message: err.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await authModel.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const matchedPassword = await bcrypt.compare(password, user.password)

        if (matchedPassword) {
            const { userID } = user
            const token = jwt.sign({ userID }, "secret-key", { expiresIn: '1d' })

            res.status(200).json({ message: "User Logged In Successfully!", token, user })
        } else {
            return res.status(401).json({ message: "Invalid email or password" })
        }
    }
    catch (error) {
        console.error(error)
        res.status(400).json({ message: error.message })
    }
})

router.get("/user", verfiyToken, async (req, res) => {
    try {
        const userID = req.userID
        const user = await authModel.findOne({ userID })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        res.status(200).json({ user })
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error })
    }
})

module.exports = router