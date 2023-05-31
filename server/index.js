const express = require("express")
require("dotenv").config({ path: "./.env" })
const path = require("path")
const mongoose = require("mongoose")
const cors = require("cors")


mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use(cors({
    origin: "http://localhost:5174"
}))

app.use("/api/user", require("./routes/userRoutes"))

const PORT = process.env.PORT || 5000


app.use("*", (req, res,) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
    // res.status(400).json({
    //     message: "404 : Resource You Are Looking For Is Not Available",
    // })
})

mongoose.connection.once("open", () => {
    console.log("DB CONNECTED")
    app.listen(PORT, console.log(`http://localhost:${PORT}`))
})
mongoose.connection.on("error", err => {
    // Will Setup The Error Reporting Here 
    console.log("MONGO ERROR ", err)
})
