import { createContext, useEffect, useState } from "react";
import { apiConnector } from "../services/api-connect";
import { auth } from "../services/apis";

// 1. create
export const AppContext = createContext();

// 2. Provider
const ContextProvider = (props) => {
  // TODO: -------------------------------------- State -----------------------------------------------------
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("tokenHMS"));
  const [isLoading, setIsLoading] = useState(true);

  const [signupData, setSignupData] = useState("");

  const [load, setLoad] = useState(true);

  // TODO: ------------------------------------ definition of dataLoad  -----------------------------
  const loadData = (value) => {
    setLoad(value);
  };

  // TODO: ------------------------------------ definition of saveSignUP data -----------------------------
  const saveSignUpData = (data) => {
    setSignupData(data);
  };

  // TODO: --------------------------- definition of storeTokenInLS -----------------------------------------
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("tokenHMS", serverToken);

    // set token time
    localStorage.setItem("tokenHMSTime", Date.now());
    return;
  };

  // TODO: ------------------------------------- get user data ---------------------------------------------

  const authorizationToken = `Bearer ${token}`;

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector("GET", auth.USER_API, "", headers);

      const userData = response.data.response[0];

      if (!response.data.success) {
        setUser(null);
        setIsLoading(false);
      } else {
        setUser(userData);
        setIsLoading(false);
        // console.log("store response: ", response);
      }
    } catch (error) {
      // console.log("userAuthentication Error: ", error.message);
      // console.log(error.response.data.message);
      throw new Error(
        error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message
      );
    }
  };

  // automatically run this function
  useEffect(() => {
    userAuthentication();
  }, [token]);

  // TODO: ------------------------------------- user logout ---------------------------------------------

  const logoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("tokenHMS");
    return;
  };

  // bundle
  const contextValue = {
    user,
    token,
    isLoading,
    load,
    authorizationToken,
    signupData,
    storeTokenInLS,
    logoutUser,
    setToken,
    setUser,
    saveSignUpData,
    loadData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
