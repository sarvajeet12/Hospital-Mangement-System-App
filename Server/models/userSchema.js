const Mongoose = require("mongoose");



const userSchema = new Mongoose.Schema({
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
    dob: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },
    password: {
        type: String,
        required: true,
        //select: false,  // it means when  we get data from database it will not show the password
    },
    image: {
        type: String,
    },
    yourAppointment: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});




// define the model or the collection name
const User = new Mongoose.model("User", userSchema);

module.exports = User;