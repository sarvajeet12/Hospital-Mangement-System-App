import React from "react";
import { imageAssets } from "../../../assets/js/image-assets";
import Style from "./error.module.css";

const Offline = () => {
  return (
    <div className={Style.offlinePage}>
      <img src={imageAssets.OfflineImage} />
      <h2>No Internet Connection !</h2>
      <h2>Please Check Your Internet Connection</h2>
    </div>
  );
};

export default Offline;
