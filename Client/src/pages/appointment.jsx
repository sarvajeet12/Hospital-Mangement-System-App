import React from "react";
import { appointmentData } from "../data/appointment-data";
import { imageAssets } from "../assets/js/image-assets";
import Style from "../components/core/appointment-page/appoint.module.css";
import TextImage from "../components/core/home-page/text-image";
import AppointmentForm from "../components/core/appointment-page/appoint-form";

const Appointment = () => {
  return (
    <div className={Style.appointment}>
      <div>
        <TextImage
          heading={appointmentData.heading1}
          para={appointmentData.para1}
          image={imageAssets.Appointment1}
        />
      </div>
      <div>
        <h1>Appointment</h1>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Appointment;
