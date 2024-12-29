const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())
app.use(cors());
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL, { dbName: "rnhackathon" })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch(error => {
        console.error("Database connection failed:", error.message);
    })

// const { PORT = 8000 } = process.env

// app.listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// })

app.get("/", (req, res) => {
    res.send("Deployed on Vercel")
})

const authRouter = require("./routes/auth")
const eventsRouter = require("./routes/events")
// const todosRouter = require("./routes/todos")

app.use("/auth", authRouter)
app.use("/events", eventsRouter)
// app.use("/todos", todosRouter)

module.exports = app;