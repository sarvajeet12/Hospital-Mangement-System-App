const express = require("express");
const router = express.Router();

// middlewares
const authMiddleware = require("../middlewares/authMiddleware");

const upload = require("../middlewares/upload");

const adminMiddleware = require("../middlewares/adminMiddleware");

const validate = require("../middlewares/validatorMiddleware");


// controllers
const adminControllers = require("../controllers/adminControllers");
const doctorSchemaValidation = require("../validation/doctorSchemaValidation");
const updateDoctorVal = require("../validation/updateDoctorVal");


//get appointment data
router
    .route("/get/appointment")
    .get(authMiddleware, adminMiddleware, adminControllers.getAppointData);


// get user by id (get data of particular user)
router
    .route("/appoint-user/:id")
    .get(adminControllers.appointUser);

// update user by id (update data of particular user)
router
    .route("/update-status/:id")
    .put(authMiddleware, adminMiddleware, adminControllers.updateStatus);


// get all messages
router
    .route("/get-all-msg")
    .get(authMiddleware, adminMiddleware, adminControllers.getAllMsg);

// register new doctors
router
    .route("/register/doctor")
    .post(authMiddleware, adminMiddleware, validate(doctorSchemaValidation), adminControllers.doctorRegister);


//get all doctors data
router
    .route("/get/doctors")
    .get(adminControllers.getAllDoctors);

//get single doctors data
router
    .route("/doctors/read-more/:id")
    .get(adminControllers.singleDoctorsData);

//get single doctors data
router
    .route("/doctors/update/:id")
    .put(authMiddleware, adminMiddleware, validate(updateDoctorVal), adminControllers.updateDoctorProfile);


// search doctor

// router
//     .route("/search/:key")
//     .get(adminControllers.searchDoctor);




module.exports = router;