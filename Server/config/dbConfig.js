//TODO : Database configuration [connect database to backend]

const Mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await Mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected successfully!");
    } catch (error) {
        console.log("database connection failed");
        console.error(error)
        process.exit(0); // or 1
    }
}

module.exports = connectDB;