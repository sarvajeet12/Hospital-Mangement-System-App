import React, { useContext, useState } from "react";
import Style from "./appoint.module.css";
import { appoint } from "../../../services/apis";
import { apiConnector } from "../../../services/api-connect";
import { AppContext } from "../../../context/store";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const { authorizationToken } = useContext(AppContext);
  const [dateDob, setDateBob] = useState(false);
  const [dateAppoint, setDateAppoint] = useState(false);
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    appointDate: "",
    address: "",
  });

  // TODO : ------------------------------------- handle input ----------------------------------------------
  const handleAppointmentFormInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  // TODO : ------------------------------------ handle appointment form -----------------------------------------
  const handleAppointmentForm = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Submitting your data...");

    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "POST",
        appoint.APPOINTMENT_API,
        {
          name: appointment.name,
          email: appointment.email,
          phone: appointment.phone,
          dob: appointment.dob,
          gender: appointment.gender,
          appointDate: appointment.appointDate,
          address: appointment.address,
        },
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Appointment Send Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });


        setAppointment({
          name: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          appointDate: "",
          address: "",
        });

        // console.log("Appointment Response : ", response);
      }
    } catch (error) {
      // console.log("error in appointment form: ", error);
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

  // TODO : Start - handle Date input------------------------------
  const handleFocusDOB = () => {
    setDateBob(true);
  };

  const handleBlurDOB = () => {
    setDateBob(false);
  };

  const handleFocusAppoint = () => {
    setDateAppoint(true);
  };

  const handleBlurAppoint = () => {
    setDateAppoint(false);
  };

  return (
    <form
      className={Style.appointForm}
      onSubmit={(e) => handleAppointmentForm(e)}
    >
      <div>
        <input
          type="text"
          name="name"
          id=""
          placeholder="Enter Full Name"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.name}
        />
        <input
          type="email"
          name="email"
          id=""
          placeholder="Enter Email Address"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.email}
        />
      </div>
      <div>
        <input
          type="number"
          name="phone"
          id=""
          placeholder="Enter Contact Number"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.phone}
        />
        <input
          type={dateDob ? "date" : "text"}
          name="dob"
          onFocus={handleFocusDOB}
          onBlur={handleBlurDOB}
          id=""
          placeholder="Enter Date of Birth"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.dob}
        />
      </div>
      <div>
        <select
          name="gender"
          id=""
          placeholder="Enter Gender"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.gender}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type={dateAppoint ? "date" : "text"}
          name="appointDate"
          onFocus={handleFocusAppoint}
          onBlur={handleBlurAppoint}
          id=""
          placeholder="Enter Appointment Date"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.appointDate}
        />
      </div>
      <div>
        <textarea
          name="address"
          id=""
          placeholder="Enter Address"
          onChange={(e) => handleAppointmentFormInput(e)}
          value={appointment.address}
        ></textarea>
      </div>
      <div>
        <button type="submit" className="btn">
          Get Appointment
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
