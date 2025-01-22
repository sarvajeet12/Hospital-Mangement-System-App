import React, { useState } from "react";
import Style from "../components/core/auth-page/auth-page.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { apiConnector } from "../services/api-connect";
import { auth } from "../services/apis";
import { toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const ForgotPassword = () => {
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setForgotPassword({
      ...forgotPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleForgotFormData = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Password updating...");

    try {
      const response = await apiConnector("PUT", auth.FORGOT_PASSWORD_API, {
        email: forgotPassword.email,
        newPassword: forgotPassword.password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Password Update Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        // console.log("forgot password response: ", response);
        navigate("/login");
      }
    } catch (error) {
      // console.log("error  forgot: ", error.response.data);
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
    <div className={Style.forgotPassword}>
      <div>
        <h1>Choose New Password</h1>
        <p> Enter your new password and you're all set.</p>
      </div>
      <form action="" onSubmit={(e) => handleForgotFormData(e)}>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={forgotPassword.email}
          onChange={(e) => handleInput(e)}
        />
        <span style={{ position: "relative" }}>
          <input
            type={eye ? "text" : "password"}
            name="password"
            placeholder="Enter Your New Password"
            value={forgotPassword.password}
            onChange={(e) => handleInput(e)}
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
        <button className="btn">Update Password</button>
      </form>
      <div className={Style.backToLogin}>
        <Link to="/login">
          <BiArrowBack />
          Back To login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
