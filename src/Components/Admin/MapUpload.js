import axios from "axios";
import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Radio, Space, Button, Checkbox } from "antd";

import "../../css/MapUpload.css";

const MAPS_URL = "http://data.merd.online:8000/catchments_info/malls/";

export default class MapUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mallOptions: [],
      file: null,
      mall: null,
      files: [],
      filesSelected: [],
    };
  }

  handleMallSelection = (e) => {
    const mall = e.target.value;
    this.setState({ mall });
  };

  handleMapSelection = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  handlFileUpload = () => {
    const postForm = new FormData();
    const postObject = { mall: this.state.mall, file: this.state.file };
    for (let key of Object.keys(postObject)) {
      postForm.append(key, postObject[key]);
    }
    axios
      .post(MAPS_URL, postForm)
      .then((res) => {
        console.log(res.data);
        this.setState({ files: res.data.files });
      })
      .catch((res) => {
        console.log(res);
      });
  };

  handleFileSelection = (files) => {
    this.setState({ filesSelected: files }, () =>
      console.log(this.state.filesSelected)
    );
    console.log(files);
  };

  handleDelete = () => {
    axios
      .post(MAPS_URL, { files: this.state.filesSelected })
      .then((res) => {
        console.log(res);
        const newFiles = [];

        this.state.files.forEach((file) => {
          this.state.filesSelected.forEach((fileSelected) => {
            if (file !== fileSelected) {
              newFiles.push(file);
            }
          });
        });
        this.setState({ files: newFiles });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount = () => {
    axios
      .get(MAPS_URL)
      .then((res) => {
        this.setState({ mallOptions: res.data.malls });
        console.log(res.data.malls);
      })
      .catch((err) => console.error(err));
    axios
      .get(MAPS_URL + "?files=true")
      .then((res) => this.setState({ files: res.data.files }))
      .catch((err) => console.error(err));
  };
  render() {
    return (
      <div>
        <div className="admin-side">
          <h1 align="center">Map Upload</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Paper style={{ width: "fit-content", padding: "1rem" }}>
              <h3 style={{ margin: "1rem" }}>Select Mall</h3>
              <Radio.Group onChange={this.handleMallSelection}>
                <Space direction="vertical">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto",
                    }}
                  >
                    {this.state.mallOptions.length > 0 ? (
                      this.state.mallOptions.map((mall) => (
                        <Radio key={mall} value={mall}>
                          {mall}
                        </Radio>
                      ))
                    ) : (
                      <h3>Loading Options</h3>
                    )}
                  </div>
                </Space>
              </Radio.Group>
            </Paper>
            <Paper style={{ width: "fit-content", padding: "1rem" }}>
              <h3>Pick Pdf</h3>
              <br />
              <input
                type="file"
                name="map-input"
                id="mapInput"
                accept="application/pdf"
                onChange={this.handleMapSelection}
              />
              <Button
                onClick={this.handlFileUpload}
                disabled={!(this.state.mall && this.state.file)}
              >
                Upload To Server
              </Button>
            </Paper>
            <Paper>
              <Space direction="vertical">
                {this.state.files.length > 0 ? (
                  <Checkbox.Group onChange={this.handleFileSelection}>
                    <Space direction="vertical">
                      {this.state.files.map((file) => (
                        <Checkbox value={file} key={file}>
                          {file}
                        </Checkbox>
                      ))}
                    </Space>
                  </Checkbox.Group>
                ) : (
                  <h3>No Files To Delete</h3>
                )}
                {this.state.files.length > 0 && (
                  <Button
                    onClick={this.handleDelete}
                    disabled={this.state.filesSelected.length === 0}
                  >
                    Delete Selected Files
                  </Button>
                )}
              </Space>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}
