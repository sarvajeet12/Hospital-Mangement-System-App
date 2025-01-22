const Appointment = require("../models/appointSchema");
const Messages = require("../models/msgSchema");
const Doctors = require("../models/doctorSchema");
const Cloudinary = require("../utils/upload")


// get All appointment Data --------------------------------------------------------------------------------
const getAppointData = async (req, resp) => {
    try {
        const appointData = await Appointment.find({})

        if (!appointData || appointData.length === 0) {
            return resp.status(404).send({ message: "No Users Found" });
        }

        resp.status(200).json({
            success: true,
            response: appointData
        });
    } catch (error) {
        // resp.status(500).json({ message: error });
        // console.log(error);
        next(error)
    }
}


//*--------------------------------------------------  get single user data for update

const appointUser = async (req, resp) => {
    try {
        const id = req.params.id;
        const usersById = await Appointment.findOne({ _id: id });
        resp.status(200).send({ success: true, response: usersById });
        return;
    } catch (error) {
        next(error);
    }
}


// ----------------------------------------  update status ---------------------------------------------------------
const updateStatus = async (req, resp) => {
    try {
        const id = req.params.id;

        // console.log("status", req.body)

        const { status } = req.body;


        let updatedData = await Appointment.findByIdAndUpdate(
            { _id: id }, //find
            { status },
            { new: true }
        );

        resp.status(200).json({
            success: true,
            message: "Status Update Successfully",
            response: updatedData
        });


    } catch (error) {
        // resp.status(500).json({ success: false, message: error.message });
        // console.log(error);
        next(error)
    }
}


// --------------------------------------- get all message messages -----------------------------------------------
const getAllMsg = async (req, resp) => {
    try {
        const msg = await Messages.find({})

        if (!msg || msg.length === 0) {
            return resp.status(404).send({ message: "No Message Found" });
        }

        resp.status(200).json({ success: true, response: msg });
    } catch (error) {
        // resp.status(500).json({ message: error });
        // console.log(error);
        next(error)
    }
}


// ------------------------------------------------------- register new doctors ------------------------------------------------


const doctorRegister = async (req, resp) => {
    try {

        const { displayPicture } = req.files;

        if (!displayPicture) {
            return resp.status(400).json({ message: "Please fill all the fields" })
        }

        if (displayPicture.mimetype !== 'image/jpeg') {
            return resp.status(400).json({ message: "Invalid file formate" });
        }

        // doctor data add part
        const { name, email, phone, gender, department, address, experience, degree, about } = req.body

        if (!name || !email || !phone || !gender || !department || !address || !experience || !degree || !about) {
            return resp.status(400).json({ message: "Please fill all the fields" });
        }

        // email already exists
        const doctor = await Doctors.findOne({ email: email });

        if (doctor) {
            return resp.status(400).json({ message: "Email already exist" });
        }

        // image save in Cloudinary
        const image = await Cloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )


        const doctorRegister = await Doctors.create({
            name,
            email,
            phone,
            gender,
            department,
            address,
            experience,
            degree,
            about,
            image: image.secure_url,
        });


        return resp.status(200).json({
            success: true,
            message: "Doctor Registered Successfully",
            response: doctorRegister
        })
    } catch (error) {
        // return resp.status(500).json({
        //     success: false,
        //     message: error.message,
        // })
        next(error)
    }
}

// ------------------------------------------ get all register doctors -----------------------------------
const getAllDoctors = async (req, resp) => {
    try {
        const doctorList = await Doctors.find({})

        if (!doctorList || doctorList.length === 0) {
            return resp.status(404).send({ success: false, message: "No Doctors Found" });
        }

        resp.status(200).json({
            success: true,
            response: doctorList
        });
    } catch (error) {
        next(error)
        // resp.status(500).json({ success: false, message: error.message });
        // console.log(error);
    }
}

// ------------------------------------ single doctors data ------------------------------------------------
const singleDoctorsData = async (req, resp) => {
    try {

        const id = req.params.id;
        const getSingleDoctorData = await Doctors.findOne({ _id: id });
        resp.status(200).json({
            success: true,
            response: getSingleDoctorData
        })

    } catch (error) {
        next(error)
        // resp.status(500).json({ success: false, message: error.message });
        // console.log(error);
    }
}
// ------------------------------------ update single doctors data ------------------------------------------------
const updateDoctorProfile = async (req, resp) => {
    try {
        const id = req.params.id;


        const { address, about, experience, degree, phone, department } = req.body;


        let updatedData = await Doctors.findByIdAndUpdate(
            { _id: id }, //find
            { address, about, experience, degree, phone, department },
            { new: true }
        );

        resp.status(200).json({
            success: true,
            message: "Doctor Profile Update Successfully",
            response: updatedData
        });


    } catch (error) {
        next(error)
        // resp.status(500).json({ success: false, message: error.message });
        // console.log(error);
    }
}




module.exports = { getAppointData, updateStatus, getAllMsg, doctorRegister, appointUser, getAllDoctors, singleDoctorsData, updateDoctorProfile };