import React from "react";
import Card from "./Card";

const blue = require("../../img/blue.jpg");
const rising = require("../../img/rising.jpg");
const darkLights = require("../../img/darkLights.jpg");
const rodsAbstract = require("../../img/rodsAbstract.jpg");
const angel = require("../../img/angel.jpg");

const Cards = ({ productsRef }) => {
  return (
    <div id={'product'} className="cards-container" ref={productsRef}>
      <Card
        link={"new-demographic"}
        linkText="See Demographic Information"
        seeMore="dashboard"
        img={darkLights}
        imgOnRight={true}
        headingClass="cardHeading"
        heading="DEMOGRAPHIC INFORMATION"
        body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                    level."
      />
      <Card
        linkText="See Market Sizes"
        link={"dashboard"}
        img={rodsAbstract}
        seeMore="catchments"
        imgOnRight={false}
        headingClass="cardHeading"
        heading="DETAILED MARKET SIZE"
        body="View market sizes of 50+ categories - by neighbourhood and / or nationality."
      />
      <Card
        linkText="See Mall Catchments"
        link={"catchments"}
        img={rising}
        seeMore="cityreport"
        imgOnRight={true}
        headingClass="cardHeading"
        heading="CATCHMENTS ANALYSIS / RETAIL INTELLIGENCE"
        body="Assess your chosen site/s or choosing potential site/s based on demographic / market size criteria."
      ></Card>
      <Card
        link={"cityreport"}
        linkText="See City Reports"
        img={blue}
        seeMore="touristreport"

        imgOnRight={false}
        headingClass="cardHeading"
        heading="CITY REPORTS"
        body="View key demographic information such as income, nationality, age distribution - at a neighbourhood
                level."
      />
      <Card
        link={"touristreport"}
        linkText="See Tourist Reports"
        img={angel}
        seeMore="none"
        imgOnRight={true}
        headingClass="cardHeading"
        heading="TOURIST RELATED INFORMATION"
        body="Get access to inbound tourist statistics - volume and retail spend - at a nationality level."
      />
    </div>
  );
};

export default Cards;
