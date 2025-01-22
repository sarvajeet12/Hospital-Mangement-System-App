const User = require("../models/userSchema");
const Bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const Appointment = require("../models/appointSchema");
const OtpGenerator = require("otp-generator");
const Otp = require("../models/otp")




// TODO: ------------------------ Send otp -----------------------------------------------------
const sendOTP = async (req, resp) => {

    try {

        const { email } = req.body;


        // already exist or not
        const alreadyExists = await User.findOne({ email: email });

        if (alreadyExists) {
            return resp.status(403).json({
                success: false,
                message: "User already registered"
            })
        }

        //generate otp [in otp only numbers present]
        let otp = OtpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });


        // check otp is unique or not
        const checkOtp = await Otp.findOne({ otp: otp });

        // ? We want unique otp, so jab tak  unique otp nahi milta, tab tak loop chalega
        // if not unique
        while (checkOtp) {
            otp = OtpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });

            checkOtp = await Otp.findOne({ otp: otp })
        }



        const otpPayload = { email, otp };

        //create an entry for otp in db
        const otpBody = await Otp.create(otpPayload);
        // console.log("OTP Payload: ", otpBody);

        // return response 
        return resp.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            response: otpBody
        })

    } catch (error) {
        // console.log("Something went wrong while send otp: ", error);
        // return resp.status(500).json({
        //     success: false,
        //     message: "Something went wrong while send otp",
        //     error: error.message
        // });
        next(error)
    }


}


// TODO: ------------------------ User Register Page Logic -----------------------------------------------------

const register = async (req, resp) => {
    try {

        // destructuring
        // console.log("verify email: ", req.body)
        const { name, email, password, phone, dob, gender, otp } = req.body;

        // any of these things are missing
        if (!name || !email || !password || !phone || !dob || !gender || !otp) {
            return resp.status(400).json({ success: false, message: "Fill the form properly" });
        }


        // if email already exits
        const userExist = await User.findOne({ email });

        // if (userExist return true and false)
        if (userExist) {
            return resp.status(400).json({ success: false, message: "User Already Register" });
        }

        // get recent otp
        const recentOtp = await Otp.findOne({ email: email }).sort({ createdAt: -1 });

        // if otp not found and matched 
        if (recentOtp === null) {
            return resp.status(404).json({
                success: false,
                message: "Invalid otp"  // in otp collection no otp found with this email
            })
        } else if (otp != recentOtp.otp) {
            return resp.status(401).json({
                success: false,
                message: "Invalid Otp"
            })
        }

        // hash the password
        const salt = await Bcrypt.genSalt(10);
        const hashPassword = await Bcrypt.hash(password, salt);

        // your appointment
        const yourAppointment = await Appointment.create({
            name: null,
            email: null,
            phone: null,
            dob: null,
            gender: null,
            appointDate: null,
            address: null,
        })

        //Get 9initial character
        let initial='';
        if (name.charAt(0) === 'H' || name.charAt(0) === 'h' || name.charAt(0) === 'S' || name.charAt(0) === 's') {
            initial = name.charAt(0).toUpperCase();
        }else{
            initial = name.charAt(0).toLowerCase();
        }


        //else
        const userCreated = await User.create({
            name,
            email,
            password: hashPassword,
            phone,
            gender,
            dob,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${initial}`,
            yourAppointment: yourAppointment._id
        });

        resp.status(200).json({
            success: true,
            message: "Register Successfully",
            response: userCreated,
            // token: await userCreated.generateToken(),
            // userId: userCreated._id.toString()
        })

    } catch (error) {
        // console.log("Error Occurs while singUp: ", error);
        next(error)
    }
}


// TODO: -------------------------------------- User Login Page Logic -------------------------------------------

const login = async (req, resp) => {
    try {

        const { email, password } = req.body;

        // validate
        if (!email || !password) {
            return resp.status(404).json({
                success: false,
                message: "Please Enter All Fields"
            })
        }

        // matching  login email and register email
        const user = await User.findOne({ email: email });

        // console.log(user) : if true, show all information of that data
        if (!user) {
            return resp.status(400).json({ success: false, message: "User not registered, please singUp first" });

        }

        // password comparing frontend password and db password
        const isMatch = await Bcrypt.compare(password, user.password);

        if (!isMatch) {
            return resp.status(401).json({ success: false, message: "Invalid email or password" })
        }

        // generate JWT, after matching the password
        if (isMatch) {
            const payload = {
                email: user.email,
                id: user._id,
                isAdmin: user.isAdmin
            }

            const token = JWT.sign(payload, process.env.JWT_SECRET_KEY, {
                expiresIn: "300000",  //5min
            })

            //? milliseconds unit is used by default ("120" is equal to "120ms").



            resp.status(200).json({
                success: true,
                message: "User Login Successful",
                token: token,
                response: user,

            });
        } else {
            return resp.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

    } catch (error) {
        // console.log("Error Occurs while login: ", error);
        next(error)
        // resp.status(500).json({ message: error });
        // console.log(error);
    }
}


// TODO: ---------------------to send user data - User Logic (check which user log in) -------------------------

const user = async (req, resp) => {
    try {
        const userData = req.user;

        const userEmail = userData.email;

        const userDetails = await User.find({ email: userEmail })


        resp.status(200).json({ success: true, response: userDetails });
    } catch (error) {
        // console.log("Error Occurs while user data: ", error);
        next(error)
    }
}


// TODO: ----------------------------------- forgot user password ------------------------------------
const forgotPassword = async (req, resp) => {
    try {
        const { email, newPassword } = req.body;

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return resp.status(404).json({ success: false, message: "User is not registered with this email" })
        }

        // const hashedPassword = await bcrypt.hash(newPassword, 10);   
        const salt = await Bcrypt.genSalt(10);
        const hashPassword = await Bcrypt.hash(newPassword, salt);


        const updatePassword = await User.findOneAndUpdate({ email }, { password: hashPassword }, {
            new: true
        });
        resp.status(200).json({
            success: true,
            message: "Password updated successfully",
            response: updatePassword
        });

    } catch (error) {
        // console.log("Error Occurs forgot password : ", error);
        next(error)
    }
}



module.exports = { register, login, user, sendOTP, forgotPassword };