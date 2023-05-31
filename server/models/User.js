const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        match: /^[8-9]{1}[0-9]{9}$/
    },

}, { timestamps: true })
module.exports = mongoose.model("user", userSchema)