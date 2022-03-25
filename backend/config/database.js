const mongoose = require("mongoose")


const database = () => {

    mongoose.connect("mongodb://localhost:27017/iconnect", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .then(() => {
            console.log("connected to database")
        }).catch((err) => {
            console.log(err)
        })
}


module.exports = database