import React from "react";
import { adminNavLink } from "../../../data/navlink-data";
import Style from "./navbar.module.css";
import { Link, matchPath, useLocation } from "react-router-dom";

const AdminNav = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className={Style.adminNav}>
      <ul>
        {adminNavLink.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item?.path}
                style={{
                  borderBottom: `${
                    matchRoute(item?.path) ? ".2rem solid black" : "none"
                  }`,
                }}
              >
                {item.link}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminNav;
