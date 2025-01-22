import React, { useContext, useState } from "react";
import { AppContext } from "../context/store";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import Style from "../components/core/auth-page/auth-page.module.css";
import { apiConnector } from "../services/api-connect";
import { auth } from "../services/apis";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { signupData } = useContext(AppContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // ------------------------------- submitting signup data in db -------------------------------

  const handleSubmitUserData = async (e) => {
    e.preventDefault();

    // console.log("signup data: ", signupData);

    const { name, email, password, phone, dob, gender } = signupData;
    const loadingToastId = toast.loading("Submitting your data...");
    try {
      // console.log("set otp", otp);
      const response = await apiConnector("POST", auth.SIGNUP_API, {
        name,
        email,
        password,
        dob,
        phone,
        gender,
        otp: otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        // console.log("Verify email response : ", response);
        toast.update(loadingToastId, {
          render: "Signup Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        navigate("/login");
      }
    } catch (error) {
      // console.log("Error in verify email: ", error);
      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  // -------------------------------------- resend otp --------------------------------------------------
  const resendOtp = async (e) => {
    e.preventDefault();
    const { email } = signupData;
    const loadingToastId = toast.loading("Sending otp...");

    try {
      const response = await apiConnector("POST", auth.RESEND_OTP_API, {
        email,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "OTP Send Successfully, check your mail",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        // navigate("/verify-email");
      }
    } catch (error) {
      // console.log("error in otp form: ", error.response.data);

      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div className={Style.verifyEmail}>
      <div className={Style.verifyEmailHeading}>
        <h1>Verify Email</h1>
        <p>A verification code has been sent to you. Enter the code below</p>
      </div>
      <form action="" onSubmit={(e) => handleSubmitUserData(e)}>
        <OTPInput
          value={otp}
          name={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props) => (
            <input {...props} placeholder="-" className={Style.otpInputBox} />
          )}
        />
        <input className="btn" type="submit" value="Verify Email" />
      </form>
      <div className={Style.backToAndResend}>
        <Link to="/register">
          <BiArrowBack />
          Back To Signup
        </Link>
        <button onClick={(e) => resendOtp(e)}>
          <RxCountdownTimer />
          Resend it
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;

// onClick={() => handleResendOTP()}
