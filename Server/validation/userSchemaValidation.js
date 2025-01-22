const { z } = require("zod");


//creating an object schema

const userSchemaValidation = z.object({
    name: z
        .string({ required_error: "First Name is required" })
        .trim()
        .min(3, { message: "Name must be at least of 3 characters" })
        .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max({ message: "Email must not be more than 255 characters" }),

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(10, { message: "Phone must be at least of 10 characters" }),

    dob: z
        .string({ required_error: "Date of birth is required" }),

    gender: z
        .string({ required_error: "Gender is required" })
        .trim(),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password Must Contain At Least 8 Characters!" })
        .max(12, { message: "Password Must Contain At Most 12 Characters!" }),
});

module.exports = userSchemaValidation;