import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../css/HomePage/Hero.css";
import getUserDetail from "../../utils/getUserDetail";
class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: false,
    };
  }

  componentDidMount = () => {
    const user = localStorage.getItem("user-details");
    const userDetails = getUserDetail(user);

    if (userDetails.username) {
      this.setState({ username: userDetails.username });
    }
  };
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
            <>
              <Link className="home-page-subscribe button" to="/subscribe">
                Subscribe
              </Link>
              <Link className="home-page-readmore button" href="/">
                Read More
              </Link>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
