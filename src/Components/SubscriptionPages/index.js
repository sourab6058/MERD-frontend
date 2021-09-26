import React, { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";

import Footer from "../Footer";
import NavTwo from "../NavTwo";
import SubcriptionPlansTable from "./SubcriptionPlansTable";

const SubscriptionJourney = () => {
  const [scrollX, setScrollX] = useState(0);
  const [showPlansTable, setShowPlansTable] = useState(false);
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);

  function handleNext() {
    if (scrollX > -400) setScrollX(scrollX - 100);
  }
  function handlePrev() {
    showPlansTable && setShowPlansTable(false);
    if (scrollX < 0) setScrollX(scrollX + 100);
  }

  return (
    <div className="sub-main-container">
      <NavTwo />
      {scrollX < 0 && (
        <ArrowBackIcon
          className="arrow-back"
          onClick={handlePrev}
          style={{ fontSize: "3.5rem", color: "white" }}
        />
      )}
      <div className="subscriptions">
        <div className="sub-container" style={{ left: `${scrollX}vw` }}>
          <First handleNext={handleNext} />
          <Second handleNext={handleNext} handlePrev={handlePrev} />
          <Third
            handleNext={handleNext}
            handlePrev={handlePrev}
            setSubscriptionsCount={setSubscriptionsCount}
          />
          <Fourth setShowPlansTable={setShowPlansTable} />
        </div>
      </div>
      {showPlansTable && (
        <>
          <h1>Subscription Plans</h1>
          <SubcriptionPlansTable subscriptionsCount={subscriptionsCount} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default SubscriptionJourney;
