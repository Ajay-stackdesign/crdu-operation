const express = require("express")
const companyRoute = require("./routes/ompanyRoute")
const app = express()
const bodyParser = require("body-parser")

app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use("/api/v1/", companyRoute)



module.exports = app