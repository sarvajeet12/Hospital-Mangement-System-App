const express = require("express");
const router = express.Router();

// appointment Controllers
const appointControllers = require("../controllers/appointControllers")

// Validation path
const appointSchemaVal = require("../validation/appointSchemaVal");


// =========================================== middleware =====================================

// validation 
const validate = require("../middlewares/validatorMiddleware");

// admin
// const adminMiddleware = require("../middlewares/adminMiddleware");

// authMiddleware
const authMiddleware = require("../middlewares/authMiddleware");



// Appointment page  
router
    .route("/get-appointment").
    post(validate(appointSchemaVal), authMiddleware, appointControllers.appoint);


router
    .route("/your-appointment").
    get(authMiddleware, appointControllers.singleUserAppointmentDetails);





module.exports = router;
