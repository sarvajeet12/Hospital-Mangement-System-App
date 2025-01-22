import React, { useContext } from "react";
import Style from "./navbar.module.css";
import { AppContext } from "../../../context/store";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  // const profileList = ["Your Appointment", "Logout"];
  const profileList = [
    { label: "Your Appointment", visibleFor: "user" },
    { label: "Admin Dashboard", visibleFor: "admin" },
    { label: "Logout", visibleFor: "both" },
  ];

  const { user, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = (value) => {
    // console.log("index: ", index);
    if (value === "Logout") {
      logoutUser();
    }

    if (value === "Your Appointment") {
      navigate("/your-appointment");
    }

    if (value === "Admin Dashboard") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className={Style.profile}>
      <img src={user?.image} alt="profileImage" />
      <ul className={Style.profileDropDown}>
        {profileList
          .filter(
            (item) =>
              item.visibleFor === "both" ||
              (user?.isAdmin
                ? item.visibleFor !== "user"
                : item.visibleFor !== "admin")
          )
          .map((item, index) => (
            <li key={index} onClick={() => handleLogOut(item.label)}>
              {" "}
              <Link>{item.label}</Link>{" "}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Profile;
