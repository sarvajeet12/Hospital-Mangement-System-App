import React from "react";
import Style from "./doctors.module.css";

import { doctorsDepartment } from "../../../data/doctors-data";

const DoctorMenuList = ({ department, setDepartment }) => {
  return (
    <div className={Style.doctorsMenuList}>
      <ul>
        {doctorsDepartment.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() =>
                setDepartment((prev) => (prev === item ? "All" : item))
              }
              className={department === item ? Style.active : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DoctorMenuList;
