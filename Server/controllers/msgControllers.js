const Messages = require("../models/msgSchema");
const User = require("../models/userSchema");

// ------------------------------------------------- send msg -----------------------------------------------
const sendMsg = async (req, resp) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return resp.status(400).json({ message: "Fill The Form" });
        }

        // this is use for protecting from invalid email or not registered email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return resp.status(400).json({ success: false, message: "Email is not registered" });
        }

        const result = await Messages.create({
            name, email, phone, message
        })

        resp.status(201).json({
            success: true,
            message: "Message Sent Successfully",
            response: result
        })

    } catch (error) {
        // resp.status(400).json({ message: error });
        next(error)
    }
}


// ------------------------------------------------- delete msg -----------------------------------------------
const deleteMsg = async (req, resp) => {
    try {
        const { id } = req.body;

        const deleteMessage = await Messages.deleteOne({ _id: id })

        resp.status(200).json({
            success: true,
            response: deleteMessage,
            message: "Message delete successfully"
        })
    } catch (error) {
        next(error)
    }

}



module.exports = { sendMsg, deleteMsg }; 