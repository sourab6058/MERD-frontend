import React from 'react';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import "../../css/SubscriptionPages/styles.css";

const Third = ({ handleNext, handlePrev }) => {
  return (<>
    <div className="sub-hero second" data-aos="fade-left">

      Our pricing works progressively - the first subscription costs AED 6,500 for 6 months or AED 9,500
      for 12 months.And every subsequent subscription is 20% cheaper (AED 5,200 for 6 months or AED 7,600 for 12 months.
      <span className="next-btn" onClick={handleNext}>Okay</span>
    </div>
  </>)
};

export default Third;