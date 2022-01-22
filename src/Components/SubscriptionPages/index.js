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
  const [index, setIndex] = useState(0);
  const [showPlansTable, setShowPlansTable] = useState(false);
  const [cities, setCities] = useState();
  const [categories, setCategories] = useState();
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);

  const Pages = [
    <First handleNext={handleNext} />,
    <Second handleNext={handleNext} handlePrev={handlePrev} />,
    <Third handleNext={handleNext} handlePrev={handlePrev} />,
    <Fourth
      handlePrev={handlePrev}
      setCities={setCities}
      setCategories={setCategories}
      setSubscriptionsCount={setSubscriptionsCount}
    />,
  ];

  function handleNext() {
    if (index < Pages.length - 1) setIndex(index + 1);
  }
  function handlePrev() {
    showPlansTable && setShowPlansTable(false);
    if (index > 0) setIndex(index - 1);
  }

  return (
    <div className="sub-main-container">
      <NavTwo />

      {showPlansTable ? (
        <>
          <h1>Subscription Plans</h1>
          <h3>Plans for {subscriptionsCount} subscriptions.</h3>
          <SubcriptionPlansTable
            subscriptionsCount={subscriptionsCount}
            cities={cities}
            categories={categories}
          />
        </>
      ) : (
        <>{Pages[index]}</>
      )}
      <Footer />
    </div>
  );
};

export default SubscriptionJourney;
