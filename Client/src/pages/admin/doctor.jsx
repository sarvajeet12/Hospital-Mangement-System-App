import React from "reac";
import DoctorList from "../../components/core/admin-dashboad-page/doctor-list";
import Style from "../../components/core/admin-dashboad-page/admin.module.css";

const Doctor = () => {
  return (
    <div className={Style.doctor}>
      <h1>Doctor List</h1>
      <DoctorList />
    </div>
  );
};

export default Doctor;
