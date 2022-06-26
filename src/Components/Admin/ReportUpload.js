import { Checkbox } from "antd";
import axios from "axios";
import React, { Component } from "react";

const API_URL = "https://data.merd.online:8000/";

export default class ReportUpload extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      files: [],
      filesToDelete: [],
    };
  }
  componentDidMount() {
    const url = API_URL + this.props.url;
    axios
      .get(url, {
        params: {
          filename: "all-files",
        },
      })
      .then((res) => {
        this.setState({ files: res.data.reports });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.props);
  }

  handleInputChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  handleSubmit = () => {
    const url = API_URL + this.props.url;
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(this.touristUrl, data, () => {})
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
      .post(this.touristUrl, {
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
      <div>
        <div className="admin-side">
          <h1 align="center">{this.props.title}</h1>
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
      </div>
    );
  }
}
