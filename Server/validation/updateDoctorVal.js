const { z } = require("zod");


//creating an object schema

const updateDoctorVal = z.object({

    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(10, { message: "Phone must be at least of 10 characters" }),

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

module.exports = updateDoctorVal;