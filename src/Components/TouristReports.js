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
      selectedFile: "",
      files: [],
      filesToDelete: [],
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

  // Usage

  handleInputChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
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
  handleSubmit = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(API_URL, data, () => {})
      .then((res) => {
        const filename = res.data.filename;
        const files = [...this.state.files, filename];
        this.setState({ files });
      })
      .catch((res) => {
        console.log(res);
      });
  };
  handleCheckDelete = (e, file) => {
    const idx = this.state.filesToDelete.findIndex((f) => f === file);
    if (e.target.checked) {
      if (idx === -1) {
        const files = [...this.state.filesToDelete, file];
        this.setState({ filesToDelete: files });
      }
    } else {
      const files = this.state.filesToDelete.filter((f) => f !== file);
      this.setState({ filesToDelete: files });
    }
    console.log(this.state.filesToDelete);
  };
  handleDelete = () => {
    axios
      .post(API_URL, {
        filesToDelete: this.state.filesToDelete,
        operation: "delete",
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ files: res.data.reports });
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
        <br />
        <div className="admin-side">
          <h4 style={{ alignSelf: "center" }}>Only for admins:</h4>
          <input
            type="file"
            name="pdf"
            id="pdf"
            class="pdf-input"
            onChange={this.handleInputChange}
          />
          <br />
          {this.state.selectedFile && (
            <button className="report-btn" onClick={this.handleSubmit}>
              Import
            </button>
          )}
          <br />
          {this.state.files.length && (
            <>
              <h4>Delete Below:</h4>
              <br />
              {this.state.files.map((file) => (
                <>
                  <Checkbox onChange={(e) => this.handleCheckDelete(e, file)}>
                    {file}
                  </Checkbox>
                  <br />
                </>
              ))}
              {this.state.filesToDelete.length !== 0 && (
                <button className="report-btn" onClick={this.handleDelete}>
                  Delete
                </button>
              )}
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default TouristReports;
