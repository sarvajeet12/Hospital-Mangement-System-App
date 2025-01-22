import React from "react";
import Style from "./footer.module.css";
import { footerQuickLinks } from "../../../data/footer-data";
import { footerHours } from "../../../data/footer-data";
import { footerContact } from "../../../data/footer-data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footerLinks}>
        {/* Quick links */}
        <div>
          <h2>Quick Links</h2>
          <ul>
            {footerQuickLinks.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path}>{item.quickLink}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* hours */}
        <div>
          <h2>Hours</h2>
          <ul>
            {footerHours.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item.day}</span>
                  <span>:</span>
                  <span>{item.time}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* contacts */}
        <div>
          <h2>Contacts</h2>
          <ul>
            {footerContact.map((item, index) => {
              const ComponentIcon = item.icon;
              return (
                <li key={index}>
                  <span>
                    <ComponentIcon />
                  </span>
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr />
      <div className={Style.copyright}>
        <p>
          Copyright {new Date().getFullYear()} &copy; HMS: All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
