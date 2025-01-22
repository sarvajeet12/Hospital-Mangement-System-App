import React from "react";
import Style from "../components/core/contact-page/contact-page.module.css";
import ContactWays from "../components/core/contact-page/contact-ways";
import ContactForm from "../components/core/contact-page/contact-form";

const Contact = () => {
  return (
    <div className={Style.contact}>
      <div>
        <ContactWays />
      </div>
      <div className={Style.contactRight}>
        <h1>Send us a message</h1>
        <p>
          Communication between patients and the hospital staff, providing a
          direct line for inquiries, feedback, or support
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
