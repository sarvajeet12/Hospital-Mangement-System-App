import React from "react";
import Style from "./contact-page.module.css";
import ContactData from "../../../data/contact-data";
import { Link } from "react-router-dom";

const ContactWays = () => {
  return (
    <div className={Style.contactWays}>
      {ContactData.map((item, index) => {
        const ComponentIcon = item.icon;
        return (
          <div key={index}>
            <span>
              <ComponentIcon />
            </span>
            <span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <Link
                to={item.link}
                target={item.id === 0 || item.id === 1 ? "_blank" : ""}
              >
                {item.info}
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ContactWays;
