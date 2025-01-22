import React, { useContext, useEffect, useState } from "react";
import Style from "./doctors.module.css";
import { apiConnector } from "../../../services/api-connect";
import { admin } from "../../../services/apis";
import ActionBtn from "../../common/subComponents/action-btn";
import ReadMore from "../../common/subComponents/read-more-btn";
import { AppContext } from "../../../context/store";

const DoctorsList = ({ department }) => {
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
        setDoctorList(response.data.response);
        // console.log("all- appoint list", response.data.response);
      }
    } catch (error) {
      // console.log("Appointment Data Error" + error.response.data);
      loadData(false);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getDoctorList(); // function call
  }, []);

  return (
    <div className={Style.doctorsList}>
      {load ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem ",
            marginTop: "5rem",
            width: "80vw",
          }}
        >
          Loading...
        </div>
      ) : (
        <>
          {doctorList.length > 0 ? (
            <>
              {doctorList.map((item, index) => {
                if ("All" === department || item.department === department) {
                  return (
                    <div key={index} className={Style.doctorsCard}>
                      <div>
                        <img src={item.image} alt="doctor image" />
                      </div>
                      <div>
                        <p>
                          <span>Name: </span>
                          <span>{item.name}</span>
                        </p>
                        <p>
                          <span>Department: </span>
                          <span>{item.department}</span>
                        </p>
                        <p>
                          <span>Experience: </span>
                          <span>{item.experience}</span>
                        </p>
                        <p>
                          <span>Degree: </span>
                          <span>{item.degree}</span>
                        </p>
                      </div>
                      <div>
                        <ReadMore link={`/doctors/read-more/${item._id}`}>
                          Read More
                        </ReadMore>
                      </div>
                    </div>
                  );
                }
              })}
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "2rem ",
                marginTop: "5rem",
                width: "80vw",
              }}
            >
              No Doctors Yet !
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorsList;
