import React, { useContext, useState } from "react";
import Style from "./auth-page.module.css";
import ActionBtn from "../../common/subComponents/action-btn";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../services/apis";
import { apiConnector } from "../../../services/api-connect";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/store";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const LoginForm = () => {
  const [eye, setEye] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useContext(AppContext);

  // TODO : ------------------------------------- handle input ----------------------------------------------
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserLoginData({
      ...userLoginData,
      [name]: value,
    });
  };

  // TODO : ------------------------------------ handle Date input-----------------------------------------
  const handleUserLoginFormData = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Submitting your data...");

    try {
      const response = await apiConnector("POST", auth.LOGIN_API, {
        email: userLoginData.email,
        password: userLoginData.password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        setUserLoginData({
          email: "",
          password: "",
        });

        // store token in localStorage
        storeTokenInLS(response.data.token);

        toast.update(loadingToastId, {
          render: "Login Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        navigate("/");

        // console.log("Login Response : ", response);
      }
    } catch (error) {
      // console.log("error in login form: ", error.response.data);
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
    <form
      className={Style.loginForm}
      onSubmit={(e) => handleUserLoginFormData(e)}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Enter Email Address"
        value={userLoginData.email}
        onChange={(e) => handleInput(e)}
      />

      <div style={{ position: "relative" }}>
        <input
          type={eye ? "text" : "password"}
          name="password"
          required
          placeholder="Enter Password"
          value={userLoginData.password}
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
      </div>
      <div>
        <span>
          Forgot Password? <Link to={"/forgot-password"}>Click here</Link>{" "}
        </span>

        <button type="submit" className="btn">
          Login
        </button>

        <span>
          Not Registered? <Link to={"/register"}>Register now</Link>{" "}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
