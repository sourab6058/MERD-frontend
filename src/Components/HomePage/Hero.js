import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../../css/HomePage/Hero.css";
import getUserDetail from "../../utils/getUserDetail";
function Hero() {
  const [username, setUsername] = useState();
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     username: false,
  //   };
  // }
  useEffect(() => {
    const user = getUserDetail();
    if (user.username) setUsername(user.username);
  });

  return (
    <div className="hero">
      <div className="heroText">
        <h1 className="text-white heroText1">Empowering People With Data</h1>
        <div className="home-page-btns">
          <>
            {username ? (
              ""
            ) : (
              <>
                <Link
                  className="font-bold text-lg  text-white bg-blue-700 hover:text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-7 py-3 text-center mr-7 mb-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  to="/subscribe"
                >
                  Subscribe
                </Link>
                <Link
                  to="/ScheduleDemo"
                  className="home-page-readmore font-bold text-lg text-white rounded-lg text-sm px-7 py-3 text-center mr-2 mb-2   button"
                >
                  Schedule a Demo
                </Link>
              </>
            )}
          </>
        </div>
      </div>
      <div className="tutorial-vid">
        <span className="text-white one-min">
          1 Minute Description of Middle East Retail Data
        </span>
        <iframe
          src="https://www.youtube.com/embed/E7wJTI-1dvQ"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
          height="150"
          width="300"
        />
      </div>
    </div>
  );
}

export default Hero;
