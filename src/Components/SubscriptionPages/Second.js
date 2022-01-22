import React, { useEffect } from "react";
import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";
import { ArrowBackIos } from "@material-ui/icons";

const Second = ({ handleNext, handlePrev }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <>
      <div className="sub-hero second" data-aos="fade-left">
        <span onClick={handlePrev} className="prev-btn">
          <ArrowBackIos style={{ fontSize: "3rem" }} />
        </span>
        One city and one category makes one subscription.
        <span className="next-btn" onClick={handleNext}>
          Next
        </span>
      </div>
    </>
  );
};

export default Second;
