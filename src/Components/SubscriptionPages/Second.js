import React, { useEffect } from "react";
import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";

const Second = ({ handleNext, handlePrev }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <>
      <div className="sub-container second">
        <span onClick={handlePrev} className="btn">
          Back
        </span>
        <div className="top-text">
          <h1>Plans</h1>
        </div>
        <table>
          <tr>
            <th>Demographic Data</th>
            <th>All Products</th>
          </tr>
          <tr>
            <td>Population Distribution By Neighbourhood and Nationality</td>
            <td rowSpan={3}>All Demographic Data</td>
          </tr>
          <tr className="lightBlue">
            <td>Income Distribution By Neighbourhood and Nationality</td>
          </tr>
          <tr>
            <td>Age Distribution By Neighbourhood</td>
          </tr>
          <tr className="lightBlue">
            <td rowSpan={4}></td>
            <td>
              Monthly Market Size Data By Neighbourhood and Nationality For
              Chosen Category and Sub Categories
            </td>
          </tr>
          <tr>
            <td>
              Catchments Analysis Maps and Market Size For Key Malls In Chosen
              City
            </td>
          </tr>
          <tr className="lightBlue">
            <td>City Report For Chosen City</td>
          </tr>
          <tr>
            <td>Tourist Data For Chosen City</td>
          </tr>
          <tr>
            <td>UPDATED ANNUALLY</td>
            <td className="lightBlue">MARKET SIZE DATA UPDATED MONTHLY</td>
          </tr>
          <tr style={{ backgroundColor: "darkblue" }}>
            <td align="center">USD 1,000 PER ANNUM</td>
            <td align="center">USD 3,000 PER ANNUM</td>
          </tr>
          <tr style={{ backgroundColor: "white" }}>
            <td align="center">
              <span
                className="sub-btn equal-btns"
                onClick={() => handleNext("demographic")}
              >
                Subscribe To Demographic
              </span>
            </td>
            <td align="center">
              <span
                className="sub-btn equal-btns"
                onClick={() => handleNext("all-products")}
              >
                Subscribe To All Products
              </span>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};

export default Second;
