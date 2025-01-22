import React, { useContext, useEffect, useState } from "react";
import Style from "./admin.module.css";
import { Link } from "react-router-dom";
import { admin } from "../../../services/apis";
import { apiConnector } from "../../../services/api-connect";
import { AppContext } from "../../../context/store";
import { toast } from "react-toastify";

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState("");
  const { load, loadData } = useContext(AppContext);

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

        // console.log("all doctor list", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error" + error);
      loadData(false);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails, { autoClose: 500, closeButton: true})
        : toast.error(error.response.data.message, { autoClose: 500, closeButton: true});
    }
  };

  useEffect(() => {
    getDoctorList(); // function call
  }, []);

  return (
    <div className={Style.appointList}>
      {load ? (
        <div
          style={{ textAlign: "center", fontSize: "2rem ", marginTop: "5rem" }}
        >
          Loading...
        </div>
      ) : (
        <>
          {doctorList.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>S. no.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctorList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.image} alt="doctor image" />
                      </td>
                      <td>{item.name}</td>
                      <td>
                        <Link to={`/admin/doctor-update/${item._id}`}>
                          Know More
                        </Link>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{fontSize:"2.5rem", textAlign:"center"}}>No Doctors !</div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorList;
