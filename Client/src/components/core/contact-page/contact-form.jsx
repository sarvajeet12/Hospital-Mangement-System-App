import React, { useContext, useState } from "react";
import Style from "./contact-page.module.css";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../../context/store";
import { toast } from "react-toastify";
import { apiConnector } from "../../../services/api-connect";
import { msg } from "../../../services/apis";

const ContactForm = () => {
  const { user, token, authorizationToken } = useContext(AppContext);

  const [userContact, setUserContact] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // TODO : ------------------------------------- handle input ----------------------------------------------
  const handleContactFormInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserContact({
      ...userContact,
      [name]: value,
    });
  };

  // TODO : ------------------------------------ handle contact form -----------------------------------------
  const handleContactForm = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Data Sending...");

    try {
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "POST",
        msg.MSG_API,
        {
          name: userContact.name,
          email: userContact.email,
          phone: userContact.phone,
          message: userContact.message,
        },
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Message Send Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        setUserContact({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // console.log("contact Response : ", response);
      }
    } catch (error) {
      // console.log("error in contact form: ", error.response.data);

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
    <form className={Style.contactForm} onSubmit={(e) => handleContactForm(e)}>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        required
        value={userContact.name}
        onChange={(e) => handleContactFormInput(e)}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email Address"
        required
        value={userContact.email}
        onChange={(e) => handleContactFormInput(e)}
      />
      <input
        type="number"
        name="phone"
        placeholder="Enter Phone number"
        required
        value={userContact.phone}
        onChange={(e) => handleContactFormInput(e)}
      />
      <textarea
        name="message"
        placeholder="Enter Message ..."
        required
        value={userContact.message}
        onChange={(e) => handleContactFormInput(e)}
      ></textarea>
      <input type="submit" value="Send" />
    </form>
  );
};
export default ContactForm;
