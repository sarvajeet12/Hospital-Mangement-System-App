import React from "react";
import Style from "../components/common/subComponents/error.module.css";
import ActionBtn from "../components/common/subComponents/action-btn";

const Error = () => {
  return (
    <div className={Style.errorPage}>
      <h1>404</h1>
      <h3>sorry! page not found</h3>
      <p>
        Oops! It seems like the page your'e trying doesn't exist. 
      </p>
      <ActionBtn link={"/"}>Go Back To Home</ActionBtn>
    </div>
  );
};

export default Error;
