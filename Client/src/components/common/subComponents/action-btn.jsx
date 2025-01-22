import React from "react";
import { Link } from "react-router-dom";
import Style from "./sub-components.module.css";

const ActionBtn = ({ children, link, colorChange }) => {

  return (
    <>
      <Link to={link}>
        <button
          className={Style.actionBtn}
          style={{
            backgroundColor: `${
              colorChange === "Rejected"
                ? "#e74c3c"
                : colorChange === "Accepted"
                ? "#44bd32"
                : ""
            }`,
          }}
        >
          {children}
        </button> 
      </Link>
    </>
  );
};

export default ActionBtn;
