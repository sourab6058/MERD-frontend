import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "../../css/FileUpload.css";
import axios from "axios";

const API_URL = "http://localhost:8000/";
// const API_URL = 'http://ec2-3-219-204-162.compute-1.amazonaws.com/'

export class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      uploadButton: true,
      uploadStatus: false,
      uploadMessage: "",
      buttonActive: true,
      newalert: false,
      newalertError: false,
      errorMessage: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
    this.setState({ uploadButton: false });
  };
  hideAlert = () => {
    this.setState({ newalert: false, newalertError: false });
  };
  submit = () => {
    this.setState({ uploadMessage: "Uploading File.", buttonActive: false });
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    console.warn(this.state.selectedFile);
    let url = API_URL + this.props.api;
    axios
      .post(url, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log("222222");
        console.log(res);
        if (res.data.status) {
          // alert("successfully uploaded")
          this.setState({
            newalert: true,
            newalertError: false,
            uploadMessage: "File uploaded successfully.",
            buttonActive: true,
            uploadStatus: true,
          });
        } else if (res.data.error) {
          this.setState({
            newalertError: true,
            errorMessage: res.data.error,
            newalert: false,
            uploadMessage: "File could not be uploaded successfully.",
            buttonActive: true,
            uploadStatus: true,
          });
        }
        // this.setState({ uploadStatus: true })
        // this.setState({ uploadMessage: 'File uploaded succesfully.',buttonActive:true})
      })
      .catch((res) => {
        console.log("333333");
        console.log(res);
        // if(res.data.error){
        this.setState({
          newalertError: true,
          errorMessage: "Timeout",
          newalert: false,
        });
        // }
        this.setState({ uploadStatus: true });
        this.setState({ uploadStatus: true });
        this.setState({
          uploadMessage: "File could not be uploaded.",
          buttonActive: true,
        });
      });
  };

  render() {
    return (
      <div className="uploadFileContainer">
        {this.state.newalert && (
          <div className="Alertcontainer">
            <div className="cardAlert shaodw-lg cardAlert-1">
              <div className="cardAlert-header pt-3 pb-0 ml-auto border-0 ">
                {" "}
                <svg
                  className=" cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 172 172"
                  style={{ fill: "#000000", marginLeft: "90%" }}
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ "mix-blend-mode": "normal" }}
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#ffffff">
                      <path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path>
                    </g>
                  </g>
                </svg>{" "}
              </div>
              <div className="cardAlert-body d-flex pt-0">
                <div className="row no-gutters mx-auto justify-content-start flex-sm-row flex-column">
                  <div className="col-md-4 text-center">
                    <img
                      className="irc_mi img-fluid mr-0"
                      src="https://cdn4.iconfinder.com/data/icons/logistics-delivery-2-5/64/137-512.png"
                      onClick={() => this.hideAlert()}
                      width="150"
                      height="150"
                    />
                  </div>
                  <div className="col-md-6 ">
                    <div className="cardAlert border-0 ">
                      <div className="cardAlert-body">
                        <h5 className="cardAlert-title ">
                          <b>File Upload Complete.</b>
                        </h5>
                        <p className="cardAlert-text ">
                          <p>Your Files got Uploaded Successfully.</p>
                        </p>{" "}
                        <button
                          type="button"
                          className="btn btn-primary btn-round-lg btn-lg"
                          onClick={() => this.hideAlert()}
                        >
                          {" "}
                          OK{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.newalertError && (
          <div className="Alertcontainer">
            <div className="cardAlertError shaodw-lg cardAlertError-1">
              <div className="cardAlertError-header pt-3 pb-0 ml-auto border-0 ">
                {" "}
                <svg
                  className=" cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 172 172"
                  style={{ fill: "#000000", marginLeft: "90%" }}
                >
                  <g
                    fill="none"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    style={{ "mix-blend-mode": "normal" }}
                  >
                    <path d="M0,172v-172h172v172z" fill="none"></path>
                    <g fill="#ffffff">
                      <path d="M33.73372,23.59961l-10.13411,10.13411l52.26628,52.26628l-52.26628,52.26628l10.13411,10.13411l52.26628,-52.26628l52.26628,52.26628l10.13411,-10.13411l-52.26628,-52.26628l52.26628,-52.26628l-10.13411,-10.13411l-52.26628,52.26628z"></path>
                    </g>
                  </g>
                </svg>{" "}
              </div>
              <div className="cardAlertError-body d-flex pt-0">
                <div className="row no-gutters mx-auto justify-content-start flex-sm-row flex-column">
                  <div className="col-md-4 text-center">
                    <img
                      className="irc_mi img-fluid mr-0"
                      src="https://cdn4.iconfinder.com/data/icons/logistics-delivery-2-5/64/137-512.png"
                      onClick={() => this.hideAlert()}
                      width="150"
                      height="150"
                    />
                  </div>
                  <div className="col-md-6 ">
                    <div className="cardAlertError border-0 ">
                      <div className="cardAlertError-body">
                        <h5 className="cardAlertError-title ">
                          <b>File Upload Incomplete.</b>
                        </h5>
                        <p className="cardAlertError-text ">
                          <p>Your Files got Uploaded Unsuccessfully.</p>
                          <p>Error : {this.state.errorMessage}</p>
                        </p>{" "}
                        <button
                          type="button"
                          className="btn btn-primary btn-round-lg btn-lg"
                          onClick={() => this.hideAlert()}
                        >
                          {" "}
                          OK{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <label className="text-white">{this.props.title}</label>
        <div className="uploadButtonGroup">
          <Button
            variant="contained"
            size="small"
            component="label"
            className="uploadButton"
          >
            Select Files
            <input
              hidden
              type="file"
              name="upload_file"
              id="upload_file"
              onChange={this.handleInputChange}
            />
          </Button>
          {this.state.buttonActive && (
            <Button
              variant="contained"
              type="submit"
              onClick={() => this.submit()}
              className="uploadButton"
              disabled={this.state.uploadButton}
            >
              Upload &nbsp;<span className="fa fa-upload"></span>
            </Button>
          )}
        </div>
        {this.state.uploadStatus && (
          <div className="uploadStatus">{this.state.uploadMessage}</div>
        )}
      </div>
    );
  }
}

export default FileUpload;
