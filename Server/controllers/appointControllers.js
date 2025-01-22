const Appointment = require("../models/appointSchema");
const bcrypt = require("bcrypt");
const User = require('../models/userSchema');




// -----------------------------------------User Appointment Page Logic--------------------------------------------

const appoint = async (req, resp) => {
    try {


        // destructuring
        const { name, email, phone, dob, gender, appointDate, address } = req.body;

        // any of these things missing
        if (!name || !email || !phone || !dob || !gender || !appointDate || !address) {
            return resp.status(400).json({ success: false, message: "Fill The Full Form" });
        }

        // this is use for protecting from invalid email or not registered email
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return resp.status(400).json({ success: false, message: "Email is not registered" });
        }

        //get logged in user id
        const id = req.user.id;

        // find user data
        //we already set null data and created appointment while register

        const userDetails = await User.findById(id);
        const appointmentIdOfUser = userDetails.yourAppointment;
        const appointmentDetails = await Appointment.findById(appointmentIdOfUser)


        if (appointmentDetails.name === null) {
            appointmentDetails.name = name;
            appointmentDetails.email = email;
            appointmentDetails.phone = phone;
            appointmentDetails.dob = dob;
            appointmentDetails.gender = gender;
            appointmentDetails.appointDate = appointDate;
            appointmentDetails.address = address;

            await appointmentDetails.save();
            resp.status(200).json({
                success: true,
                message: "Appointment Send Successfully",
                response: appointmentDetails
            });
        } else if (appointmentDetails.status === 'Rejected') {

            appointmentDetails.name = name;
            appointmentDetails.email = email;
            appointmentDetails.phone = phone;
            appointmentDetails.dob = dob;
            appointmentDetails.gender = gender;
            appointmentDetails.appointDate = appointDate;
            appointmentDetails.address = address;
            appointmentDetails.status = 'Pending';

            await appointmentDetails.save();

            resp.status(200).json({
                success: true,
                message: "Appointment Send Successfully",
                response: appointmentDetails
            });

        } else {
            return resp.status(400).json({ success: false, message: "Already registered for appointment" });
        }

    } catch (error) {
        // console.log("Error Occurs while appointment: ", error);
        next(error)
    }
}

// ----------------------------------------- get all user appointment details ---------------------------
const singleUserAppointmentDetails = async (req, resp) => {
    try {

        const id = req.user.id;

        const userDetails = await User.findById(id);
        const appointmentIdOfUser = userDetails.yourAppointment;

        const singleAppointmentData = await Appointment.findOne({ _id: appointmentIdOfUser });
        resp.status(200).json({
            success: true,
            response: singleAppointmentData
        })

    } catch (error) {
        // resp.status(500).json({ success: false, message: error.message });
        // console.log(error);
        next(error)
    }
}





module.exports = { appoint, singleUserAppointmentDetails };