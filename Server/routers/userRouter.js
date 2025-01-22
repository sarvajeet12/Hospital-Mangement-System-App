const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers")

// Validation path
const userSchemaValidation = require("../validation/userSchemaValidation");
const forgotPassValidation = require("../validation/forgotPassVal");

const userLoginSchemaVal = require("../validation/userLoginSchemaVal");

// middleware
const validate = require("../middlewares/validatorMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");


// user login [which user is log (admin or not)]
router
    .route("/send-otp")
    .post(validate(userSchemaValidation), userControllers.sendOTP)

// user login [which user is log (admin or not)]
router
    .route("/resend-otp")
    .post(userControllers.sendOTP)

// register page  
router
    .route("/register").
    post(userControllers.register);

// login page  
router
    .route("/login").
    post(validate(userLoginSchemaVal), userControllers.login);

// user login [which user is log (admin or not)]
router
    .route("/user-details")
    .get(authMiddleware, userControllers.user);

// update and forgot password
router
    .route("/forgot-password")
    .put(validate(forgotPassValidation), userControllers.forgotPassword)




module.exports = router; 
