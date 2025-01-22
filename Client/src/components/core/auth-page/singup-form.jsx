import React, { useContext, useState } from "react";
import Style from "./auth-page.module.css";
import ActionBtn from "../../common/subComponents/action-btn";
import { Link, useNavigate } from "react-router-dom";
import { apiConnector } from "../../../services/api-connect";
import { auth } from "../../../services/apis";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/store";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const SignUpForm = () => {
  const [eye, setEye] = useState(false);
  const { saveSignUpData } = useContext(AppContext);
  const [dateDob, setDateBob] = useState(false);
  const [userSignUpData, setUserSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    phone: "",
    gender: "",
  });

  const navigate = useNavigate();

  // TODO : ---------------------------------------------------------- handle input ------------------------------------------------------------
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserSignUpData({
      ...userSignUpData,
      [name]: value,
    });
  };

  // TODO : --------------------------------------------------- handle otp input--------------------------------------------------------------
  const handleSignUpFormData = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Submitting your data...");
    try {
      // save sign up data in store while calling function
      saveSignUpData(userSignUpData);

      const response = await apiConnector("POST", auth.SEND_OTP_API, {
        name: userSignUpData.name,
        email: userSignUpData.email,
        password: userSignUpData.password,
        dob: userSignUpData.dob,
        phone: userSignUpData.phone,
        gender: userSignUpData.gender,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "OTP Send Successfully check your mail, if not received check spam folder",
          type: "success",
          isLoading: false,
          autoClose: 10000,
          closeButton: true,
          position: "top-center"
        });
        navigate("/verify-email");
        // console.log("otp response : ", response);
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

  // TODO : --------------------------------------------------- handle Date input--------------------------------------------------------------
  const handleFocusDOB = () => {
    setDateBob(true);
  };

  const handleBlurDOB = () => {
    setDateBob(false);
  };

  return (
    <form
      className={Style.signupForm}
      onSubmit={(e) => handleSignUpFormData(e)}
    >
      <div>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter Full Name"
          value={userSignUpData.name}
          onChange={(e) => handleInput(e)}
        />
        <input
          type="email"
          name="email"
          required
          onChange={(e) => handleInput(e)}
          value={userSignUpData.email}
          placeholder="Enter Email Address"
        />
      </div>
      <div>
        <input
          type="number"
          name="phone"
          required
          onChange={(e) => handleInput(e)}
          placeholder="Enter Contact Number"
          value={userSignUpData.phone}
        />

        <input
          type={dateDob ? "date" : "text"}
          name="dob"
          required
          onChange={(e) => handleInput(e)}
          onFocus={handleFocusDOB}
          onBlur={handleBlurDOB}
          placeholder="Enter Date of Birth"
          value={userSignUpData.dob}
        />
      </div>

      <div>
        <select
          name="gender"
          value={userSignUpData.gender}
          onChange={(e) => handleInput(e)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <span style={{ position: "relative" }}>
          <input
            type={eye ? "text" : "password"}
            name="password"
            required
            onChange={(e) => handleInput(e)}
            placeholder="Enter Password"
            value={userSignUpData.password}
          />
          {
            eye ? <IoMdEye style={{
              fontSize: "2.5rem",
              cursor: "pointer",
              position: "absolute",
              top: ".5rem",
              right: ".5rem"
            }} onClick={() => setEye(false)} /> : <IoMdEyeOff style={{
              fontSize: "2.5rem",
              cursor: "pointer",
              position: "absolute",
              top: ".5rem",
              right: ".5rem"
            }} onClick={() => setEye(true)} />
          }
        </span>
      </div>

      <p>
        Already Registered? <Link to={"/login"}>Login now</Link>{" "}
      </p>

      <div>
        {" "}
        <button type="submit" className="btn">
          Register
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
