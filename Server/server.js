require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorMiddleware = require("./middlewares/errorMiddleware");
const connectDB = require("./config/dbConfig");
const cloudinaryConnect = require("./config/cloudinaryConfig");
const fileUpload = require("express-fileupload");

// for deployment purpose (require path)
const path = require("path");

const app = express();
const port = process.env.PORT;

// for deployment purpose (take path)
const _dirname = path.resolve();
console.log("path",_dirname)

// cloudinary connect
cloudinaryConnect()


// TODO: tackle cors

const corsOption = {
    // origin: "http://localhost:5173",
    origin: "https://hospital-mangement-system-app.onrender.com",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// file upload
const fileUploadOption = {
    useTempFiles: true,
    tempFileDir: "/tmp",
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption))
app.use(fileUpload(fileUploadOption))





// ? Router Path
const msgRouter = require("./routers/msgRouter");
const userRouter = require("./routers/userRouter");
const appointRouter = require("./routers/appointRouter");
const adminRouter = require("./routers/adminRouter");


// TODO: routers
app.use("/api/v1/message", msgRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointRouter);
app.use("/api/v1/admin", adminRouter);


// for deployment purpose
app.use(express.static(path.join(_dirname,"/Client/dist")));
app.get("*",(req,resp)=>{
    resp.sendFile(path.resolve(_dirname, "Client", "dist", "index.html"))
});

// centralized error
app.use(errorMiddleware);


// If database connected successfully THEN run "app.listen"
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at port no: ${port}`);
    });
});