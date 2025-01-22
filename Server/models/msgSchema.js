const Mongoose = require("mongoose");


const msgSchema = new Mongoose.Schema({
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
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});



// define the model or the collection name
const Messages = new Mongoose.model("Message", msgSchema);

module.exports = Messages;