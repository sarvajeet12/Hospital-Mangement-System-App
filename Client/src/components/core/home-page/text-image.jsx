import React from "react";
import Style from "./home-page.module.css";
import ActionBtn from "../../common/subComponents/action-btn";

const TextImage = ({ heading, para, image, reverse, text, button }) => {
  return (
    <div className={`${Style.textImage} ${reverse ? Style.reverse : ""}`}>
      <div>
        <p>{text ? "Biography" : ""}</p>
        <h1>{heading}</h1>
        <p>{para}</p>
        {button ? <ActionBtn link={"/about"}>Read more</ActionBtn> : ""}
      </div>
      <div>
        <img src={image} alt="heroImage" />
      </div>
    </div>
  );
};

export default TextImage;
