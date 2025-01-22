import React, { useContext, useEffect, useState } from "react";
import Style from "../../components/core/admin-dashboad-page/admin.module.css";
import { apiConnector } from "../../services/api-connect";
import { admin, msg } from "../../services/apis";
import ActionBtn from "../../components/common/subComponents/action-btn";
import { AppContext } from "../../context/store";
import DateFormate from "../../components/core/admin-dashboad-page/date-formate";
import { toast } from "react-toastify";

const Message = () => {
  const [allMsg, setAllMsg] = useState([]);

  const { authorizationToken, load, loadData } = useContext(AppContext);

  // *------------------------------------------- Get all message ------------------------------------------------------
  const getAllMsg = async () => {
    try {
      loadData(true);
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "GET",
        admin.GET_ALL_MSG_API,
        "",
        headers
      );

      if (!response.data.success) {
        loadData(false);
        throw new Error(response.data.message);
      } else {
        loadData(false);
        setAllMsg(response.data.response);
        // console.log("all msg response: ", response.data.response);
      }
    } catch (error) {
      // console.log("Error in get all msg ", response.data.response);
      loadData(false);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails, { autoClose: 500, closeButton: true})
        : toast.error(error.response.data.message, { autoClose: 500, closeButton: true});
    }
  };

  useEffect(() => {
    getAllMsg(); // function call
  }, []);

  // --------------------------------------------- delete msg ------------------------------------------
  const handleDeleteMsg = async (value) => {
    const loadingToastId = toast.loading("Deleting...");

    try {
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "DELETE",
        msg.DELETE_MSG_API,
        { id: value },
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Message Delete Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        getAllMsg();
        // console.log("delete msg response: ", response.data.response);
      }
    } catch (error) {
      // console.log("Delete Msg  Error" + error);

      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div className={Style.messageContainer}>
      <h1>User Send Messages</h1>
      {load ? (
        <div
          style={{ textAlign: "center", fontSize: "2rem ", marginTop: "5rem" }}
        >
          Loading...
        </div>
      ) : (
        <>
          {allMsg && allMsg.length > 0 ? (
            allMsg.map((item, index) => {
              return (
                <div key={index} className={Style.allMsg}>
                  <div>
                    <h3>Date: </h3>
                    <p>
                      <DateFormate date={item.date} />
                    </p>
                  </div>
                  <div>
                    <h3>Name: </h3>
                    <p>{item.name}</p>
                  </div>
                  <div>
                    <h3>Email: </h3>
                    <p>{item.email}</p>
                  </div>
                  <div>
                    <h3>Phone: </h3>
                    <p>{item.phone}</p>
                  </div>
                  <div>
                    <h3>Message: </h3>
                    <p>{item.message}</p>
                  </div>
                  <div>
                    <button onClick={() => handleDeleteMsg(item._id)}>
                      Delete Message
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{fontSize:"2.5rem", textAlign:"center", fontWeight:"0"}}>
              No Message Found!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
