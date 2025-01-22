const { z } = require("zod");

//creating an object schema

const msgSchemaValidation = z.object({
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

    message: z
        .string({ required_error: "Message is required" })
        .min(10, { message: "Message at least 10 characters" })
        .max(500, { message: "Message must not be more than 255 characters" })
});

module.exports = msgSchemaValidation;