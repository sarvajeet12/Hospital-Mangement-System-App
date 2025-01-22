const { z } = require("zod");


//creating an object schema

const doctorSchemaValidation = z.object({
    name: z
        .string({ required_error: "Name is required" })
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

    gender: z
        .string({ required_error: "Gender is required" }),

    department: z
        .string({ required_error: "Department is required" }),

    address: z
        .string({ required_error: "Address is required" }),

    experience: z
        .string({ required_error: "Experience is required" }),
    degree: z
        .string({ required_error: "Degree is required" }),
    about: z
        .string({ required_error: "About is required" }),


});

module.exports = doctorSchemaValidation;