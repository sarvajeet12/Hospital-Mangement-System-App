const { z } = require("zod");


//creating an object schema

const userLoginSchemaVal = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z
        .string({ required_error: "Password is required" })


});

module.exports = userLoginSchemaVal;