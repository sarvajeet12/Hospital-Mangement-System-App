import React, { useContext, useEffect, useState } from "react";
import Style from "../components/core/appointment-page/appoint.module.css";
import { apiConnector } from "../services/api-connect";
import { appoint } from "../services/apis";
import ActionBtn from "../components/common/subComponents/action-btn";
import { AppContext } from "../context/store";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const YourAppointment = () => {
  const [userAppointmentDetails, setUserAppointmentDetails] = useState("");
  const { authorizationToken, token, load, loadData } = useContext(AppContext);

  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  const getUserAppointmentData = async () => {
    try {
      loadData(true);
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "GET",
        appoint.APPOINTMENT_DETAILS_API,
        "",
        headers
      );

      if (!response.data.success) {
        loadData(false);
        throw new Error(response.data.message);
      } else {
        loadData(false);
        setUserAppointmentDetails(response.data.response);
      }
    } catch (error) {
      loadData(false);
      // console.log("Error in your appointment", error.response.data);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserAppointmentData(); // function call
  }, []);

  return (
    <div className={Style.yourAppointment}>
      <h1>Your Appointment Details</h1>
      {load ? (
        <div
          style={{ textAlign: "center", fontSize: "2rem ", marginTop: "5rem" }}
        >
          Loading...
        </div>
      ) : (
        <>
          {userAppointmentDetails.name !== null ? (
            <div className={Style.appointmentDetails}>
              <div className={Style.appointmentDetailsLeft}>
                <p>
                  <span>Appointment Date: </span>
                  <span>{userAppointmentDetails.appointDate}</span>
                </p>
                <p>
                  <span>Name: </span>
                  <span>{userAppointmentDetails.name}</span>
                </p>
                <p>
                  <span>Email: </span>
                  <span>{userAppointmentDetails.email}</span>
                </p>
                <p>
                  <span>Phone: </span>
                  <span>{userAppointmentDetails.phone}</span>
                </p>
                <p>
                  <span>DOB: </span>
                  <span>{userAppointmentDetails.dob}</span>
                </p>
                <p>
                  <span>Gender: </span>
                  <span>{userAppointmentDetails.gender}</span>
                </p>
                <p>
                  <span>Address: </span>
                  <span>{userAppointmentDetails.address}</span>
                </p>
              </div>
              <div className={Style.appointmentDetailsRight}>
                {/* <ActionBtn color={"red"}>Cancel Appointment</ActionBtn> */}
                <ActionBtn colorChange={userAppointmentDetails.status}>
                  Appointment: {userAppointmentDetails.status}
                </ActionBtn>
              </div>
            </div>
          ) : (
            <div className={Style.noAppointmentYet}>
              {" "}
              <h2>No Appointment Yet !</h2>
              <ActionBtn link={"/appointment"}>Get Appointment</ActionBtn>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default YourAppointment;
