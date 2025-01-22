import React, { useContext} from "react";
import Style from "./admin.module.css";
import { apiConnector } from "../../../services/api-connect";
import { admin } from "../../../services/apis";
import { AppContext } from "../../../context/store";
import { Link } from "react-router-dom";

const AppointList = ({ appointList }) => {
  const { load } = useContext(AppContext);
  
  const result = appointList.filter((item) => item.name !== null || item.appointDate !== null);

  return (
    <div className={Style.appointList}>
      {load ? (
        <div
          style={{ textAlign: "center", fontSize: "2rem ", marginTop: "5rem" }}
        >
          Loading...
        </div>
      ) : (
        <>
          {result.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>S. no.</th>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointList
                  .filter(
                    (item) => item.name !== null || item.appointDate !== null
                  )
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.appointDate}</td>
                        <td>{item.status}</td>
                        <td>
                          <Link to={`/admin/appoint-status/${item._id}`}>
                            Update
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <div style={{fontSize:"2.5rem", textAlign:"center"}}>No appointment yet !</div>
          )}
        </>
      )}
    </div>
  );
};

export default AppointList;
