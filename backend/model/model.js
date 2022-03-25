const mongoose = require("mongoose")
const validator = require("validator")

const CompanySchema = new mongoose.Schema({
    // models for company
    name: {
        type: String,
        required: [true, "Please Enter the Company Name"],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Please Enter the Description"],
    },
    contact: {
        type: Number,
        required: ["Please Enter the Number"],
    },
    email: {
        type: String,
        required: [true, "Please Enter the Email"],
        validate: [validator.isEmail, "Please Enter the Vallid Email"],
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = new mongoose.model("Company", CompanySchema)