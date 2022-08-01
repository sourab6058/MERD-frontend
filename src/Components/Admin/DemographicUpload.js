import React, { Component } from "react";
import { Radio, Space, Checkbox, Button } from "antd";
import { Paper } from "@material-ui/core";
import axios from "axios";

import { sortZones } from "../../utils/sort";
import "../../css/DemoUpload.css";

const API_URL = "https://data.merd.online:8000/demographic/";
const OPTION_URL = "https://data.merd.online:8000/api/filter";

export default class DemographicUpload extends Component {
  constructor() {
    super();
    this.state = {
      options: {},
      postObject: {
        city: null,
        type: null,
        mode: null,
        file: null,
      },
      files: [],
      filesToDelete: [],
    };
  }
  componentDidMount = () => {
    let optionData;
    if (localStorage.getItem("option-data") && false) {
      optionData = JSON.parse(localStorage.getItem("option-data"));
      console.log(optionData);
      this.createData(optionData);
    } else {
      axios
        .get(OPTION_URL)
        .then((res) => {
          optionData = Object.entries(res.data.filters[0]);
          optionData = sortZones(optionData);
          localStorage.setItem("option-data", JSON.stringify(optionData));
          console.log(optionData);
          this.createData(optionData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //getting excel files saved in backend
    axios.get(API_URL).then((res) => {
      this.setState({ files: res.data.excel_files });
      console.log(res.data.excel_files);
    });
  };

  createData = (receivedData) => {
    let optionData = receivedData;
    console.log("receivedData", optionData[4]);

    this.setState({
      options: {
        cities: optionData[4][1],
      },
    });
  };

  handleOptionCheck = (e, field) => {
    const newPostObject = this.state.postObject;
    newPostObject[field] = e.target.value;
    this.setState({ postObject: newPostObject });
    console.log(newPostObject);
    console.log(this.allSelected());
  };

  handleFileInput = (e) => {
    const file = e.target.files[0];
    const newPostObject = { ...this.state.postObject, file };
    this.setState({ postObject: newPostObject });
  };

  allSelected = () => {
    const { city, type, mode, file } = this.state.postObject;
    return city && type && mode && file;
  };

  handleSubmit = () => {
    const postForm = new FormData();
    for (let key of Object.keys(this.state.postObject)) {
      postForm.append(key, this.state.postObject[key]);
    }
    axios
      .post(API_URL, postForm)
      .then((res) => {
        if (res.data.hasOwnProperty("id")) {
          this.setState({ files: [...this.state.files, res.data] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  handleDelete = () => {
    axios
      .post(API_URL, { files: this.state.filesToDelete })
      .then((res) => {
        const remainingFiles = [];
        this.state.files.forEach((file) => {
          res.data.filesDeleted.forEach((fd) => {
            if (file.id !== fd) remainingFiles.push(file);
          });
        });
        this.setState({ files: remainingFiles, filesToDelete: [] });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div>
        <div className="admin-side">
          <h1 align="center">Upload Demographic Files</h1>
          <div className="filters">
            <div>
              <Paper style={{ padding: "1rem" }}>
                <h3>Cities</h3>
                <Radio.Group
                  onChange={(e) => this.handleOptionCheck(e, "city")}
                  key={1}
                >
                  <Space direction="vertical">
                    {Object.keys(this.state.options).length > 0 &&
                      this.state.options.cities.map((city) => (
                        <Radio key={city.id} value={city.id}>
                          {city.city}
                        </Radio>
                      ))}
                  </Space>
                </Radio.Group>
              </Paper>
            </div>
            <div>
              <Paper style={{ padding: "1rem" }}>
                <h3>Table Type</h3>
                <Radio.Group
                  onChange={(e) => this.handleOptionCheck(e, "type")}
                  key={4}
                >
                  <Space direction="vertical">
                    <Radio key={1} value={"income_checked"}>
                      Income Levels
                    </Radio>
                    <Radio key={3} value={"population_checked"}>
                      Population
                    </Radio>
                    <Radio key={4} value={"capita_checked"}>
                      Retail Spend Per Capita
                    </Radio>
                    <Radio key={5} value={"age_checked"}>
                      Age Distribution
                    </Radio>
                    <Radio key={6} value={"labourers_checked"}>
                      Percentage Labourers
                    </Radio>
                    <Radio key={7} value={"families_checked"}>
                      Percentage without families but not labourers
                    </Radio>
                  </Space>
                </Radio.Group>
              </Paper>
            </div>

            <div>
              <Paper style={{ padding: "1rem" }}>
                <h3>Display Mode</h3>
                <Radio.Group
                  onChange={(e) => this.handleOptionCheck(e, "mode")}
                  key={5}
                >
                  <Space direction="vertical">
                    <Radio key={1} value={"zone"}>
                      By Zone
                    </Radio>
                    <Radio key={2} value={"nat"}>
                      By Nationality
                    </Radio>
                    <Radio key={3} value={"zone-and-nat"}>
                      By Zone and nationality
                    </Radio>
                  </Space>
                </Radio.Group>
              </Paper>
            </div>
            <div>
              <Paper style={{ padding: "1rem" }}>
                <h3>Upload table file</h3>
                <input
                  type="file"
                  name="Upload Excel File"
                  id="table-upload"
                  onChange={this.handleFileInput}
                />
                {this.allSelected() && (
                  <Button
                    onClick={this.handleSubmit}
                    style={{ border: "2px solid var(--darkBlue)" }}
                  >
                    Upload
                  </Button>
                )}
              </Paper>
            </div>
          </div>
          <Paper style={{ margin: "1rem", padding: "1rem" }}>
            <h3 color="pink">Select To Delete</h3>
            <Checkbox.Group
              onChange={(filesToDelete) => this.setState({ filesToDelete })}
            >
              <Space direction="vertical">
                {this.state.files.length > 0 &&
                  this.state.files.map((file) => (
                    <Checkbox value={file.id} key={file.id}>
                      {file.file}
                    </Checkbox>
                  ))}

                <Button
                  onClick={this.handleDelete}
                  disabled={this.state.filesToDelete.length === 0}
                >
                  Delete
                </Button>
              </Space>
            </Checkbox.Group>
          </Paper>
        </div>
      </div>
    );
  }
}
