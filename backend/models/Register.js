const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [5, 'Name cannot be less than 5 characters'],
        maxLength: [20, 'Name cannot be more than 20 characters'],
        required: true,
        // lowercase: true,
        uppercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 12
    },
    filename: String,
    path: String,
})

const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterModel;

