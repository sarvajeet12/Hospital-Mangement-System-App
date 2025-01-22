import React, { useContext, useEffect, useState } from "react";
import Style from "./doctors.module.css";
import { apiConnector } from "../../../services/api-connect";
import { admin } from "../../../services/apis";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/store";

const DoctorReadMore = () => {
  const [singleDoctorData, setSingleDoctorData] = useState("");
  const { load, loadData } = useContext(AppContext);

  const params = useParams();

  const getSingleDoctorData = async () => {
    try {
      loadData(true);
      const response = await apiConnector(
        "GET",
        `https://hospital-mangement-system-app.onrender.com/api/v1/admin/doctors/read-more/${params.id}`
      );

      if (!response.data.success) {
        loadData(false);
        throw new Error(response.data.message);
      } else {
        loadData(false);
        setSingleDoctorData(response.data.response);

        // console.log("single doctor list", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error", error.response.data);
      loadData(false);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSingleDoctorData(); // function call
  }, []);

  return (
    <div className={Style.readMore}>
      {load ? (
        <div
          style={{
            textAlign: "end",
            fontSize: "2rem ",
            margin: "5rem 3rem 0 0",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          {/* single doctors details */}
          <div>
            <p>
              <span>Name: </span>
              <span>{singleDoctorData.name}</span>
            </p>
            <p>
              <span>Department: </span>
              <span>{singleDoctorData.department}</span>
            </p>
            <p>
              <span>Experience: </span>
              <span>{singleDoctorData.experience}</span>
            </p>
            <p>
              <span>Degree: </span>
              <span>{singleDoctorData.degree}</span>
            </p>

            <p>
              <span>About: </span>
              <span>{singleDoctorData.about}</span>
            </p>
          </div>
          {/* image */}
          <div>
            <img src={singleDoctorData.image} alt="doctor image" />
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorReadMore;
