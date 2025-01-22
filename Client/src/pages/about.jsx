import React from "react";
import { imageAssets } from "../assets/js/image-assets";
import { aboutData } from "../data/about-data";
import TextImage from "../components/core/home-page/text-image";
import Style from "../components/core/about-page/about-page.module.css";
import WhyChoose from "../components/core/about-page/why-choose";
import Counter from "../components/core/about-page/counter";

const About = () => {
  return (
    <div className={Style.about}>
      <div>
        <TextImage
          heading={aboutData.heading1}
          para={aboutData.para1}
          image={imageAssets.AboutImage1}
        />
        <br /><br />
        <p className={Style.paraThree}>{aboutData.para3}</p>
        <br />
        <p className={Style.paraThree}>{aboutData.para3}</p>
        <br />
        <p className={Style.paraThree}>{aboutData.para3}</p>
      </div>
      <div>
        <TextImage
          heading={aboutData.heading2}
          para={aboutData.para2}
          image={imageAssets.AboutImage2}
          reverse={true}
          text={true}
          button={false}
        />
      </div>
      <div>
        <Counter />
      </div>
      <div>
        <h1>Why Choose Us</h1>
        <WhyChoose />
      </div>
    </div>
  );
};

export default About;
