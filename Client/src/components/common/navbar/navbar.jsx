import React, { useContext, useEffect, useState } from "react";
import Style from "./navbar.module.css";
import { Link, matchPath, useLocation } from "react-router-dom";
import { navbarLink } from "../../../data/navlink-data";
import ActionBtn from "../subComponents/action-btn";
import { AppContext } from "../../../context/store";
import Profile from "./profile";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [shadow, setShadow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const { setToken, setUser } = useContext(AppContext);
  const { token } = useContext(AppContext);

  //toggle hamburger menu according to width
  const toggleMenu = () => {
    setToggle(!toggle);
  };

  // scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setShadow(true) : setShadow(false);
    });
  }, []);

  // match route
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

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
    <div className={`${Style.navbar} ${shadow ? Style.navBoxShadow : ""}`}>
      <h1>HMS</h1>
      <ul className={toggle ? Style.showMenu : ""}>
        {navbarLink.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item?.path}
                style={{
                  fontWeight: `${matchRoute(item?.path) ? "bold" : ""}`,
                }}
              >
                {item.link}
              </Link>
            </li>
          );
        })}
      </ul>
      <div>
        {!token ? <ActionBtn link={"/login"}>Login</ActionBtn> : <Profile />}
      </div>
      <div className={Style.hamburgerMenu}>
        {
          !toggle ? <GiHamburgerMenu onClick={() => toggleMenu()} /> :
            <IoClose onClick={() => toggleMenu()} />
        }
      </div>
    </div>
  );
};

export default Navbar;
