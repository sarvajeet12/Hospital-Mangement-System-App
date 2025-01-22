import React, { useEffect, useState } from "react";
import Style from "../components/core/doctors-page/doctors.module.css";
import DoctorMenuList from "../components/core/doctors-page/doctor-menu-list";
import DoctorsList from "../components/core/doctors-page/doctors-list";

const Doctors = () => {
  const [department, setDepartment] = useState("All");

  return (
    <div className={Style.doctors}>
      <h1>Doctors</h1>
      <DoctorMenuList department={department} setDepartment={setDepartment} />
      <DoctorsList department={department} />
    </div>
  );
};

export default Doctors;
