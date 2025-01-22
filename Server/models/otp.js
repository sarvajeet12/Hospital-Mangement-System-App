const Mongoose = require("mongoose");
const SendEmail = require("../utils/sendMail");
const OtpTemplate = require("../template/email-verification");

const otpSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,   //5min
        // means otp deleted automatically after 5 minutes of its creation time
    }
});


const sendVerificationEmail = async (email, otp) => {
    try {
        const response = await SendEmail(email, "Otp Verification", OtpTemplate(otp));

        // console.log("email sent successfully: ", response);
        // ! never write return resp.status(statuscode).json({})  => gives error

    } catch (error) {
        console.log("Error occur while sending mail", error);
        // ! never write return resp.status(statuscode).json({})  => gives error   
        throw error;
    }
}


otpSchema.pre("save", function (next) {
    sendVerificationEmail(this.email, this.otp);
    next();
})




module.exports = Mongoose.model("Otp", otpSchema);