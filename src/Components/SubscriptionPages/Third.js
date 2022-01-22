import React from "react";
import { ArrowBackIos } from "@material-ui/icons";

import "../../css/SubscriptionPages/styles.css";

const Third = ({ handleNext, handlePrev }) => {
  return (
    <>
      <div className="sub-hero second" data-aos="fade-left">
        <span onClick={handlePrev} className="prev-btn">
          <ArrowBackIos style={{ fontSize: "3rem" }} />
        </span>
        Our pricing works progressively - the first subscription costs AED 6,500
        for 6 months or AED 9,500 for 12 months.And every subsequent
        subscription is 20% cheaper (AED 5,200 for 6 months or AED 7,600 for 12
        months.
        <span className="next-btn" onClick={handleNext}>
          Okay
        </span>
      </div>
    </>
  );
};

export default Third;
