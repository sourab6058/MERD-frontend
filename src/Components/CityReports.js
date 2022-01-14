import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";
import reportsImg from "../img/research-landing.jpg";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Reports.css";
import getUserDetail from "../utils/getUserDetail";
import postForm from "../utils/postForm";

const API_URL = "http://3.108.159.143:8000/city_reports/";
const BUY_ONCE_URL = "https://merd.online/subscription-confirmation/";
// const API_URL = "http://localhost:8000/city_reports/";
// const API_URL = 'http://ec2-3-219-204-162.compute-1.amazonaws.com/'

export class CityReports extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      files: [],
      cities: [],
      subscribedCities: [],
      filesToDelete: [],
      subscriptionAlertOpen: false,
      oneTimeSubPopUpOpen: false,
      cancelPopUpOpen: false,
      subscribed: true,
    };
  }

  componentDidMount() {
    const user = getUserDetail();
    let files = [];

    if (!user.username) {
      this.setState({ subscribed: false });
    } else {
      this.setState({ subscribed: true });
      this.setState({ subscribedCities: user.cities });
    }
    axios
      .get(API_URL, {
        params: {
          filename: "all-files",
        },
      })
      .then((res) => {
        console.log(res.data);
        files = res.data.reports;
        const cities = files.map((file) => file.split(".pdf")[0]);
        this.setState({ cities });
        this.setState({ files: res.data.reports });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSubscriptionAlert = () => {
    this.setState({ subscriptionAlertOpen: false });
  };
  showOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: true });
  };
  handleCancelPopUp = (state) => {
    this.setState({ cancelPopUpOpen: state });
  };

  hideOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: false });
  };

  downloadBlob = (blob, name) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    console.log(blobUrl);
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Remove link from body
    document.body.removeChild(link);
  };

  // Usage

  handleExport = (filename) => {
    axios
      .get(API_URL, {
        responseType: "blob",
        params: {
          filename,
        },
      })
      .then((res) => {
        // const blob = new Blob([res.data], { type: "application/pdf" });
        // this.downloadBlob(blob, "test.pdf");
        console.log(res);
        this.downloadBlob(res.data, filename);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleBuyOnce = (file) => {
    const report = file.split(".pdf")[0] + " city report";
    postForm(BUY_ONCE_URL, report);
    console.log(report);
  };

  render() {
    return (
      <>
        <NavTwo />
        <div className="header">
          <img className="headerImg" src={reportsImg} alt="building" />
          <div className="header-text">
            <h2 className="heading">City Market Reports</h2>
            <p className="heading-text">Your source for market research</p>
          </div>
        </div>
        <div className="reports-container">
          {this.state.files.length ? (
            <>
              <div className="city-report">
                <span className="recent-report">Recent Reports</span>
              </div>
              <ul className="report-list">
                {this.state.files.map((file, idx) => (
                  <li
                    className="list-item"
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 ? "transparent" : "#dbe1ff",
                    }}
                  >
                    <span>{file}</span>
                    <br />

                    {this.state.subscribedCities.includes(
                      this.state.cities[idx]
                    ) ? (
                      <Button
                        className="report-link"
                        key={idx}
                        onClick={() => this.handleExport(file)}
                      >
                        Download
                      </Button>
                    ) : (
                      <>
                        <Button className="report-link-buy">
                          <a onClick={() => this.handleBuyOnce(file)}>
                            Buy Once
                          </a>
                        </Button>
                        <Button className="report-link" key={idx} disabled>
                          Download
                        </Button>
                      </>
                    )}
                    <hr />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3>No city reports uploaded.</h3>
          )}
        </div>
        <br />
        <Footer />
      </>
    );
  }
}

export default CityReports;
