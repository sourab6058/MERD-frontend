import React from "react";
import "../../css/HomePage/AboutUs.css";

const manOne = require("../../img/manone.jpg");
const manTwo = require("../../img/mantwo.jpg");
const manThree = require("../../img/manthree.jpg");
const manFour = require("../../img/manfour.jpg");

function AboutUs() {
  return (
    <div className="about-us">
      <div className="row">
        <h3>Our People</h3>
      </div>
      <div className="row">
        <div className="img-container">
          <img src={manOne} className="people-img" />
          <span className="people-name">Dinesh Minesh</span>
        </div>
        <div className="img-container">
          <img src={manTwo} className="people-img" />
          <span className="people-name">Dinesh Minesh</span>
        </div>
      </div>
      <div className="row">
        <div className="img-container">
          <img src={manThree} className="people-img" />
          <span className="people-name">Dinesh Minesh</span>
        </div>
        <div className="img-container">
          <img src={manFour} className="people-img" />
          <span className="people-name">Dinesh Minesh</span>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
