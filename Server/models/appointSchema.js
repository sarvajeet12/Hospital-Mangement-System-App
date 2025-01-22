const Mongoose = require("mongoose");

const appointmentSchema = new Mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    dob: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    appointDate: {
        // appointment date
        type: String

    },
    address: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },

});





// define the model or the collection name
const Appointment = new Mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;