import React from "react";

import "../../css/SubscriptionPages/styles.css";

const First = ({ handleNext }) => (
  <>
    <div className="sub-hero first">
      We understand that you would like to subscribe to our data. <br /> Great!
      <span className="next-btn" onClick={handleNext}>
        Next
      </span>
    </div>
  </>
);

export default First;
