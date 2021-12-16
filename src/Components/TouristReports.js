import React, { Component } from "react";
import axios from "axios";
import { Checkbox } from "antd";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Reports.css";

const API_URL = "http://3.108.159.143:8000/tourist_reports/";
// const API_URL = 'http://ec2-3-219-204-162.compute-1.amazonaws.com/'

export class TouristReports extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL, {
        params: {
          filename: "all-files",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ files: res.data.reports });
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  render() {
    return (
      <>
        <NavTwo />
        <div className="reports-container">
          {this.state.files.length ? (
            <>
              <h3>Tourist Reports</h3>
              <br />
              <ul>
                {this.state.files.map((file, idx) => (
                  <li key={idx}>
                    <a key={idx} onClick={() => this.handleExport(file)}>
                      {file}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <h3>No tourist reports uploaded.</h3>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default TouristReports;
