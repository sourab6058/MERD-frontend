import React from "react";

import "../../css/SubscriptionPages/styles.css";

const subFirst = require("../../img/sub-handshake.jpg");

const First = ({ handleNext }) => (
  <>
    <div className="sub-container first">
      <img src={subFirst} alt="img-sub" className="sub-img img-1" />
      <span className="text text-1">
        We understand that you would like to subscribe to our data.
        <span className="sub-btn" onClick={handleNext}>
          Subscribe
        </span>
      </span>
    </div>
  </>
);

export default First;
