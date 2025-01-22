import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { imageAssets } from "../../../assets/js/image-assets";
import Style from "./home-page.module.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: imageAssets.DepartmentImage1,
    },
    {
      name: "Orthopedics",
      imageUrl: imageAssets.DepartmentImage2,
    },
    {
      name: "Cardiology",
      imageUrl: imageAssets.DepartmentImage3,
    },
    {
      name: "Neurology",
      imageUrl: imageAssets.DepartmentImage4,
    },
    {
      name: "Oncology",
      imageUrl: imageAssets.DepartmentImage5,
    },
    {
      name: "Radiology",
      imageUrl: imageAssets.DepartmentImage6,
    },
    {
      name: "Physical Therapy",
      imageUrl: imageAssets.DepartmentImage7,
    },
    {
      name: "Dermatology",
      imageUrl: imageAssets.DepartmentImage8,
    },
    {
      name: "ENT",
      imageUrl: imageAssets.DepartmentImage9,
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <>
      <Carousel
        responsive={responsive}
        removeArrowOnDeviceType={[
          // "superLargeDesktop",
          // "desktop",
          "tablet",
          "mobile",
        ]}
      >
        {departmentsArray.map((item, index) => {
          return (
            <div key={index} className={Style.departmentCard}>
              <h2>{item.name}</h2>
              <img src={item.imageUrl} alt="Department" />
            </div>
          );
        })}
      </Carousel>
      ;
    </>
  );
};

export default Departments;
