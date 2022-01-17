import React from "react";

import "../../css/SubscriptionPages/styles.css";
import fisrtImg from "../../img/handshake.jpg";

const First = ({ handleNext }) => (
  <>
    <div className="sub-hero first">
    <div className="sub-content">
      <div className="sub-text">
      <span className="sub-hero-text">We understand that you would like to subscribe to our data. <br /> Great!</span>
      <div className="next-btn-div"><span className="next-btn" onClick={handleNext}>
        Next
      </span>
      </div>
      </div >
      <div className="handshake-img-div">
      <img className="handshake-img"  src={fisrtImg} alt="handshake" />
      </div>
      </div>
    </div>
  </>
);

export default First;
