import React, { Component } from "react";
import axios from "axios";
import { Button } from "antd";
import reportsImg from "../img/research-landing.jpg";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Reports.css";
import getUserDetail from "../utils/getUserDetail";
import postForm from "../utils/postForm";

const API_URL = "https://data.merd.online:8000/city_reports/";
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    const report = file.split(".pdf")[0];
    postForm(BUY_ONCE_URL, report, "City Report");
    console.log(report);
  };

  render() {
    return (
      <div style={{ width: "100vw" }}>
        <NavTwo />
        <div className="header">
          <img
            className="headerImg mb-3 brightness-50"
            src="https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="building"
          />
          <div className="header-text">
            <h2 className="heading text-5xl">City Market Reports</h2>
            {/* <p className="heading-text text-xl">Your source for market research</p> */}
          </div>
        </div>
        <div className="reports-container">
          {this.state.files.length ? (
            <>
              <div className="city-report">
                <span className="recent-report text-gray-800 text-3xl">
                  Recent Reports
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-4 mt-4">
                {this.state.files.map((file, idx) => (
                  <li
                    className="p-4 border border-sky-500   rounded-lg drop-shadow-xl bg-white"
                    key={idx}
                    style={{
                      backgroundColor: idx % 2 ? "white" : "",
                    }}
                  >
                    <span className="text-gray-800 text-2xl pb-4 ">{file}</span>
                    <br />

                    {this.state.subscribedCities.includes(
                      this.state.cities[idx]
                    ) ? (
                      <div className="pb-4 mt-4">
                        <Button
                          className="rounded-lg px-4 py-4 text-white bg-blue-500 text-center flex items-center"
                          key={idx}
                          onClick={() => this.handleExport(file)}
                        >
                          Download{" "}
                          <i class="fa-solid ml-2 text-black fa-download"></i>
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-4 pb-4 mt-4">
                        <Button className="rounded-lg px-4 py-4 text-white bg-blue-500 text-center flex items-center">
                          <a onClick={() => this.handleBuyOnce(file)}>
                            Buy USD 120
                          </a>
                        </Button>
                        <Button
                          className="rounded-lg px-4 py-4 text-white bg-blue-500 text-center flex items-center"
                          key={idx}
                          disabled
                        >
                          Download{" "}
                          <i class="fa-solid ml-2 text-black fa-download"></i>
                        </Button>
                      </div>
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
      </div>
    );
  }
}

export default CityReports;
