import React, { useContext, useEffect, useState } from "react";
import Style from "../../components/core/admin-dashboad-page/admin.module.css";
import { AppContext } from "../../context/store";
import AppointList from "../../components/core/admin-dashboad-page/appoint-list";
import { apiConnector } from "../../services/api-connect";
import { admin } from "../../services/apis";
import { toast } from "react-toastify";

export const AdminDashboard = () => {
  const { user, authorizationToken, load, loadData } = useContext(AppContext);
  const [doctorList, setDoctorList] = useState([]);
  const [appointList, setAppointList] = useState([]);
  const [numberOfAppoint, setNumberOfAppoint] = useState([]);

  // ---------------------------------------------- get number of appointment ------------------------------

  const getAllAppointment = async () => {
    try {
      loadData(true);
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "GET",
        admin.GET_ALL_APPOINTMENT_API,
        "",
        headers
      );

      if (!response.data.success) {
        loadData(false);
        throw new Error(response.data.message);
      } else {
        loadData(false);

        // calculate number of appoint
        const appointValue = response.data.response;
        // console.log("value: ",appointValue.filter((item)=>item.name !=null));
        setNumberOfAppoint(appointValue.filter((item) => item.name !== null));

        setAppointList(response.data.response);
        // console.log("all appointment list", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error" + error.response.data);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails, { autoClose: 500, closeButton: true})
        : toast.error(error.response.data.message, { autoClose: 500, closeButton: true});
    }
  };

  // ---------------------------------------------- get number of doctors ----------------------------------

  const getDoctorList = async () => {
    try {
      loadData(true);
      const response = await apiConnector("GET", admin.GET_ALL_DOCTORS);

      if (!response.data.success) {
        loadData(false);
        throw new Error(response.data.message);
      } else {
        loadData(false);
        // console.log(response.data.response);

        setDoctorList(response.data.response);

        // console.log("all doctor list data", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error" + error);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails, { autoClose: 500, closeButton: true})
        : toast.error(error.response.data.message, { autoClose: 500, closeButton: true});
    }
  };

  useEffect(() => {
    getAllAppointment();
    getDoctorList();
  }, []);

  return (
    <div className={Style.adminDashboard}>
      {/* -------------------------------------- admin info -------------------------------------------------- */}
      <div className={Style.info}>
        <div>
          <span>
            <img src={user?.image} alt="" />
          </span>
          <span>
            <h2>Welcome, {user?.name}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore reiciendis vero sint error tempora quod quaerat, maiores
              quia quo explicabo.
            </p>
          </span>
        </div>
        <div>
          <h2>Total Appointments</h2>
          <h2>{numberOfAppoint.length}</h2>
        </div>
        <div>
          <h2>Total Doctors</h2>
          <h2>{doctorList.length}</h2>
        </div>
      </div>

      {/* ------------------------------------------ appointment details -------------------------------------------------- */}
      <div className={Style.appointmentContainer}>
        <h1>Appointment List</h1>
        <AppointList appointList={appointList} />
      </div>
    </div>
  );
};
