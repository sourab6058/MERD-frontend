import React, { Component } from "react";

import "../../css/HomePage/Hero.css";
class Hero extends Component {
  render() {
    let heroImg = require("../../img/buildings.jpg");
    return (
      <div className="hero">
        <img src={heroImg} className="heroImg" alt="" />
        {/* <img src={heromap} className="heroMap" alt="" /> */}
        <div className="heroText">
          <span>Welcome to</span>
          <h1>Middle East Retail Data</h1>
          <h3>
            Real Time And Detailed Consumer And Sales Data Available At The
            Click Of A Mouse
          </h3>
          <div className="home-page-btns">
            <a className="home-page-subscribe btn" href="/">
              Subscribe
            </a>
            <a className="home-page-readmore btn" href="/">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
