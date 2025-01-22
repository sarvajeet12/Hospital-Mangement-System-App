import React, { useEffect, useState } from "react";
import Navbar from "./components/common/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/common/footer/footer";
import Offline from "./components/common/subComponents/offline";

const App = () => {
  // --------------------------------------- offline or not -----------------------------------------------------------------------
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline); // Clean up event listeners on component unmount

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {isOnline ? (
        <>
          <Navbar />
          <div className="container">
            <Outlet />{" "}
          </div>
          <hr />
          <Footer />
        </>
      ) : (
        <Offline />
      )}
    </>
  );
};

export default App;
