import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Style from "./admin.module.css";
import { apiConnector } from "../../../services/api-connect";
import { AppContext } from "../../../context/store";
import { toast } from "react-toastify";

const AppointStatus = () => {
  // const appointmentStatus = ["Pending", "Accepted", "Rejected"];
  const { authorizationToken } = useContext(AppContext);

  const [userAppointUpdate, setUserAppointUpdate] = useState({
    status: "",
  });

  // ------------------------------ get appointmentData ---------------------------------------------
  const params = useParams();
  const navigate = useNavigate();

  const getAppointmentData = async () => {
    try {
      const response = await apiConnector(
        "GET",
        `http://localhost:4000/api/v1/admin/appoint-user/${params.id}`
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        // console.log(response.data.response);
        setUserAppointUpdate(response.data.response);

        // console.log("appointment status", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error" + error);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAppointmentData(); // function call
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserAppointUpdate({ ...userAppointUpdate, [name]: value });
  };

  // ----------------------------------------- update appointment data ----------------------------------

  const handleAppointmentForm = async (e) => {
    // console.log("appoint update data: ", userAppointUpdate.status);

    e.preventDefault();
    const loadingToastId = toast.loading("Updating...");
    try {
      const headers = {
        Authorization: authorizationToken,
      };

      const response = await apiConnector(
        "PUT",
        `http://localhost:4000/api/v1/admin/update-status/${params.id}`,
        {
          status: userAppointUpdate.status,
        },
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Appointment Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        // console.log(response.data.response);

        setUserAppointUpdate(response.data.response);
        navigate("/admin/dashboard");

        // console.log("update status ", response.data.response);
      }
    } catch (error) {
      // console.log("update status Data Error" + error);
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
    <div className={Style.appointUpdate}>
      <h1>Update Appointment Details</h1>
      <form onSubmit={(e) => handleAppointmentForm(e)}>
        <input
          type="text"
          name="name"
          disabled={true}
          value={userAppointUpdate.name}
        />
        <input
          type="email"
          name="email"
          disabled={true}
          value={userAppointUpdate.email}
        />
        <input
          type="number"
          name="phone"
          disabled={true}
          value={userAppointUpdate.phone}
        />
        <input
          type="text"
          name="dob"
          disabled={true}
          value={`DOB : ${userAppointUpdate.dob}`}
        />
        <input type="text" disabled={true} value={userAppointUpdate.gender} />
        <input
          type="text"
          name="appointDate"
          disabled={true}
          value={`Appointment Date : ${userAppointUpdate.appointDate}`}
        />
        <input
          type="text"
          name="address"
          disabled={true}
          value={userAppointUpdate.address}
        />
        <select
          name="status"
          value={userAppointUpdate.status}
          onChange={(e) => handleInput(e)}
        >
          {/* <option value="dbValue">{userAppointUpdate.status}</option> */}
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit" className="btn">
          Update Status
        </button>
      </form>
    </div>
  );
};

export default AppointStatus;
