const express = require("express");
const router = express.Router();

// ValidateMiddleware Path
const validate = require("../middlewares/validatorMiddleware");

//msg controllers
const msgControllers = require("../controllers/msgControllers");

// msgSchemaValidation path
const msgSchemaValidation = require("../validation/msgSchemaValidation");

// authMiddleware
const authMiddleware = require("../middlewares/authMiddleware");

// admin middleware
const adminMiddleware = require("../middlewares/adminMiddleware");


// message route
router
    .route("/send").
    post(validate(msgSchemaValidation), authMiddleware, msgControllers.sendMsg);

// message route
router
    .route("/delete-message").
    delete(authMiddleware, adminMiddleware, msgControllers.deleteMsg);




module.exports = router;