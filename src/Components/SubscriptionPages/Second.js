import React, { useEffect } from "react";

import Paper from "@material-ui/core/Paper";
import { CheckCircle, CheckCircleOutline } from "@material-ui/icons";

import Aos from "aos";

import "../../css/SubscriptionPages/styles.css";

const Second = ({ handleNext, handlePrev }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  return (
    <>
      <div className="sub-container second">
        <div className="plan-list">
          <div>
            <Paper className="plan-paper left" elevation={3}>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  marginTop: "15px",
                }}
                alignSelf="center"
              >
                Reports
              </span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  textTransform: "uppercase",
                }}
              >
                $120
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                }}
              >
                per report
              </span>
              <div className="features reports">
                <ul>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>City Report</span>
                  </li>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>Tourist Report</span>
                  </li>
                </ul>
              </div>
              <span
                style={{
                  fontWeight: "400",
                  marginBottom: "20px",
                }}
              >
                Research efficiently
              </span>
              <span
                className="buy-btn"
                onClick={() => (window.location.href = "/cityreport")}
              >
                Buy Now
              </span>
            </Paper>
          </div>
          <div>
            <Paper className="plan-paper recommended" elevation={5}>
              <Paper className="plan-paper bordered">
                <span className="blue-pill-abs">Our Recommendation</span>
                <span
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    marginTop: "15px",
                  }}
                  alignSelf="center"
                >
                  All Products
                </span>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "300",
                    textTransform: "uppercase",
                  }}
                >
                  $3,000
                </span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "400",
                  }}
                >
                  per annum
                </span>
                <span className="red-pill">
                  20% off on successive subscription
                </span>
                <div className="features">
                  <ul>
                    <li>
                      <CheckCircle className="check-circle" />
                      <span>All demographic data</span>
                    </li>
                    <li>
                      <CheckCircle className="check-circle" />
                      <span>
                        Monthly Market Size Data By Neighbourhood and
                        Nationality For Chosen Category and Sub Categories
                      </span>
                    </li>
                    <li>
                      <span>
                        <CheckCircle className="check-circle" />
                      </span>
                      <span>
                        Catchments Analysis Maps and Market Size For Key Malls
                        In Chosen City
                      </span>
                    </li>
                    <li>
                      <CheckCircle className="check-circle" />
                      <span>City Report For Chosen City</span>
                    </li>
                    <li>
                      <CheckCircle className="check-circle" />
                      <span>Tourist Data For Chosen City</span>
                    </li>
                    <li>
                      <CheckCircle className="check-circle" />
                      <span>UPDATED MONTHLY</span>
                    </li>
                  </ul>
                </div>
                <span
                  style={{
                    fontWeight: "400",
                    marginBottom: "20px",
                  }}
                >
                  Research efficiently
                </span>
                <span
                  className="buy-btn filled"
                  onClick={() => handleNext("all-products")}
                >
                  Buy Now
                </span>
              </Paper>
            </Paper>
          </div>
          <div>
            <Paper className="plan-paper right" elevation={3}>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  marginTop: "15px",
                }}
                alignSelf="center"
              >
                Demographic Only
              </span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "300",
                  textTransform: "uppercase",
                }}
              >
                $1,000
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                }}
              >
                per annum
              </span>
              <span className="red-pill green">
                20% off on successive subscription
              </span>
              <div className="features">
                <ul>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>All demographic data</span>
                  </li>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>
                      Population Distribution By Neighbourhood and Nationality
                    </span>
                  </li>
                  <li>
                    <span>
                      <CheckCircleOutline className="check-circle" />
                    </span>
                    <span>
                      Income Distribution By Neighbourhood and Nationality
                    </span>
                  </li>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>Age Distribution By Neighbourhood</span>
                  </li>
                  <li>
                    <CheckCircleOutline className="check-circle" />
                    <span>UPDATED ANNUALLY</span>
                  </li>
                </ul>
              </div>
              <span
                style={{
                  fontWeight: "400",
                  marginBottom: "20px",
                }}
              >
                Research efficiently
              </span>
              <span
                className="buy-btn"
                onClick={() => handleNext("demographic")}
              >
                Buy Now
              </span>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Second;
