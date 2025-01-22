import React from "react";
import Style from "./home-page.module.css";
import { imageAssets } from "../../../assets/js/image-assets";
import ActionBtn from "../../common/subComponents/action-btn";

const BookAppointment = () => {
  return (
    <div className={Style.bookAppointment}>
      <div>
        <h1>Book Appointment</h1>
        <h1>With 100+ Trusted Doctors</h1>
        <span>
          <ActionBtn link={"/login"}>Create Account</ActionBtn>
        </span>
      </div>
      <div>
        <img src={imageAssets.Appointment2} alt="" />
      </div>
    </div>
  );
};

export default BookAppointment;
