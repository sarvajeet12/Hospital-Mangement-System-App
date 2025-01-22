const { z } = require("zod");


//creating an object schema

const forgotPassValidation = z.object({

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max({ message: "Email must not be more than 255 characters" }),

    newPassword: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password Must Contain At Least 8 Characters!" })
        .max(12, { message: "Password Must Contain At Most 12 Characters!" }),
});

module.exports = forgotPassValidation;