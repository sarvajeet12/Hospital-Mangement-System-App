import React from "react";
import TextImage from "../components/core/home-page/text-image";
import { homeData } from "../data/home-data";
import { imageAssets } from "../assets/js/image-assets";
import Departments from "../components/core/home-page/departments";
import Style from "../components/core/home-page/home-page.module.css";
import BookAppointment from "../components/core/home-page/book-appointment";

const Home = () => {
  return (
    <div className={Style.home}>
      <div>
        <TextImage
          heading={homeData.heading1}
          para={homeData.para1}
          image={imageAssets.HeroSection1}
        />
      </div>
      <div>
        <TextImage
          heading={homeData.heading2}
          para={homeData.para2}
          image={imageAssets.HeroSection2}
          reverse={true}
          text={true}
          button={true}
        />
      </div>
      <div>
        <h1>Departments</h1>
        <Departments />
      </div>
      <div>
        <BookAppointment />
      </div>
    </div>
  );
};

export default Home;
