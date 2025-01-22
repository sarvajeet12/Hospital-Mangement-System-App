import React from "react";
import { Link } from "react-router-dom";
import Style from "./sub-components.module.css";

const ReadMore = ({ children, link }) => {
  return (
    <>
      <Link to={link}>
        <button className={Style.readBtn}>{children}</button>
      </Link>
    </>
  );
};

export default ReadMore;
