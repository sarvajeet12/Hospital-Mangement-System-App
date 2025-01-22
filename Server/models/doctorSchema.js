const Mongoose = require("mongoose");

const doctorSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    department: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});


// define the model or the collection name
const Doctors = new Mongoose.model("Doctor", doctorSchema);

module.exports = Doctors;