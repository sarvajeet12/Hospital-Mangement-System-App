import React from "react";
import Style from "./auth-page.module.css";
import SignUpForm from "./singup-form";
import LoginForm from "./login-form";

const AuthTemplate = ({ formType, title, heading, description }) => {
  return (
    <div
      className={`${Style.authTemplate} ${
        formType === "login" ? Style.templateLogin : ""
      }`}
    >
      <h1>{heading}</h1>
      <p>{title}</p>
      <p>{description}</p>
      {formType === "signUp" ? <SignUpForm /> : <LoginForm />}
    </div>
  );
};

export default AuthTemplate;
