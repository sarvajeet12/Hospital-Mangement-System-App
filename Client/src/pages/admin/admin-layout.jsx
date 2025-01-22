import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AdminNav from "../../components/common/navbar/admin-nav";

import Style from "../../components/core/admin-dashboad-page/admin.module.css";
import { AppContext } from "../../context/store";

const AdminLayout = () => {
  const { user, isLoading, token, setToken, setUser } = useContext(AppContext);

  // -------------------------- if user is not logged in and user is not admin ------------------------------------
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    if (isLoading) {
      return (
        <div
          style={{
            textAlign: "center",
            fontSize: "2rem ",
            marginTop: "15rem",
            width: "80vw",
          }}
        >
          Loading...
        </div>
      );
    }
    if (!user?.isAdmin) {
      // console.log("user null", user);
      return <Navigate to="/" />;
    }
  }

  // ------------------------------------ token time out ------------------------------------------
  setTimeout(() => {
    const storedTokenTime = localStorage.getItem("tokenHMSTime");
    const currentTime = Date.now();

    if (currentTime - storedTokenTime >= 300000) {
      setToken("");
      setUser(null);
      localStorage.removeItem("tokenHMS");
      localStorage.removeItem("tokenHMSTime");
    }
  });

  return (
    <div className={Style.adminLayout}>
      <AdminNav />
      <hr style={{ margin: "3rem auto 0 auto", width: "80%" }} />
      <div className="adminContainer">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
