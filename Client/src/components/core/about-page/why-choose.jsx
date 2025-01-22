import React from "react";
import Style from "./about-page.module.css";
import { whyChooseAboutSection } from "../../../data/about-data";

const WhyChoose = () => {
  return (
    <div className={Style.whyChoose}>
      {whyChooseAboutSection.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          
        );
      })}
    </div>
  );
};

export default WhyChoose;
