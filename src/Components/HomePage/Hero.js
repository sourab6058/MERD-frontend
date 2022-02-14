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
    let heroImg = require("../../img/duotone.png");
    return (
      <div className="hero">
        <img src={heroImg} className="heroImg" alt="" />
        {/* <img src={heromap} className="heroMap" alt="" /> */}
        <div className="heroText">
          <span className="text-4xl font-bold underline text-white mb-4">WELCOME TO</span>
          <h1 className="text-4xl text-white font-bold  mb-4">Middle East Retail Data</h1>
          <h3 className="text-xl text-white">
            Real Time And Detailed Consumer And Sales Data Available At The
            Click Of A Mouse
          </h3>
          <div className="home-page-btns">
            <>
              {this.props.subscribed ? (
                <Link
                  className="rounded-full"
                  to="/subscribe-more"
                >
                  Subscribe
                </Link>
              ) : (
                <Link className="font-bold text-lg  text-white bg-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-7 py-3 text-center mr-7 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="/subscribe">
                  Subscribe
                </Link>
              )}
              <Link className="home-page-readmore font-bold text-lg text-white rounded-lg text-sm px-7 py-3 text-center mr-2 mb-2   button" href="/">
              Schedule a Demo
              </Link>
            </>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
