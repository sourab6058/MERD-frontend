import React, { Component } from "react";
import axios from "axios";

import FiltersPage from "./FiltersPage";
import TableTypesPage from "./TableTypesPage";
import DisplayModePage from "./DisplayModePage";
import FilesPage from "./FilesPage";
import Nav from "../NavTwo";
import Footer from "../Footer";

import { Modal, Button } from "antd";

import { sortZones } from "../../utils/sort";

import "../../css/Demographic.css";

const API_URL = "http://data.merd.online:8000/api/filter";

export default class NewDemographic extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      countryAndCities: {
        country: "",
        city: [],
      },
      firstTimePopUp: false,
      idx: 0,
      postObject: {
        cities: [],
        types: [],
        displayModes: [],
      },
      alertOpen: false,
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  componentDidMount = () => {
    let optionData;
    if (localStorage.getItem("option-data")) {
      optionData = JSON.parse(localStorage.getItem("option-data"));
      this.createData(optionData);
    } else {
      this.setState({ firstTimePopUp: true });
      axios
        .get(API_URL)
        .then((res) => {
          optionData = Object.entries(res.data.filters[0]);
          optionData = sortZones(optionData);
          localStorage.setItem("option-data", JSON.stringify(optionData));
          this.createData(optionData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  createData(receivedData) {
    let optionData = receivedData;

    //Using raw api data to fill in menu variables
    //months is static for now, can be changed later
    this.setState({
      cities: optionData[4][1],
    });
    this.setState({ menuLoading: false }, () => {
      console.log(this.state);
    });
  }

  handleNext = (max) => {
    if (this.state.postObject.cities.length === 0 && this.state.idx === 0) {
      this.setState({ alertOpen: true });
      return false;
    }
    if (this.state.postObject.types.length === 0 && this.state.idx === 1) {
      this.setState({ alertOpen: true });
      return false;
    }
    if (
      this.state.postObject.displayModes.length === 0 &&
      this.state.idx === 2
    ) {
      this.setState({ alertOpen: true });
      return false;
    }

    if (this.state.idx < max - 1) {
      this.setState({ idx: this.state.idx + 1 });
    }
  };

  handlePrev = () => {
    if (this.state.idx > 0) {
      this.setState({ idx: this.state.idx - 1 });
    }
  };
  handleTypeCheck = (types) => {
    const newPostObject = { ...this.state.postObject, types };
    this.setState({ postObject: newPostObject }, () =>
      console.log(this.state.postObject)
    );
  };
  handleDisplayModeCheck = (displayModes) => {
    this.setState({ postObject: { ...this.state.postObject, displayModes } });
  };

  warning = () => {
    Modal.warning({
      title: "SOMETHING IS MISSING...",
      content: "Please Select Atleast One Field Before Proceeding",
      onOk: () => this.setState({ alertOpen: false }),
    });
  };

  //  CountryCityMapper = () =>{
  // }

  render() {
    const pages = [
      <FiltersPage
        cities={this.state.cities}
        handleCitiesCheck={(cities) =>
          this.setState({ postObject: { ...this.state.postObject, cities } })
        }
        citiesChecked={this.state.postObject.cities}
      />,

      <div className="flex w-full justify-around">
        <TableTypesPage
          handleTypeCheck={this.handleTypeCheck}
          types={this.state.postObject.types}
        />
        <DisplayModePage
          handleDisplayModeCheck={this.handleDisplayModeCheck}
          modes={this.state.postObject.displayModes}
          types={this.state.postObject.types}
        />
      </div>,
      <FilesPage
        postObject={this.state.postObject}
        citiesOptions={this.state.cities}
      />,
    ];
    const pageCount = pages.length;
    return (
      <div>
        <Nav />
        <Modal
          visible={this.state.firstTimePopUp}
          title="Please wait while the filters load"
          onOk={() => this.setState({ firstTimePopUp: false })}
          onCancel={() => this.setState({ firstTimePopUp: false })}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => this.setState({ firstTimePopUp: false })}
            >
              Okay
            </Button>,
          ]}
        >
          <div>
            Filters takes from 2-5 minutes to load for the first time. Please
            wait. This only happens once.
          </div>
        </Modal>
        <div className="container">
          <div className="flex justify-between items-center w-full pl-10 pr-10">
            <div>
              {this.state.idx > 0 && (
                <div
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center"
                  onClick={this.handlePrev}
                >
                  <svg
                    class="mr-2 -mr-1 w-5 h-5 rotate-180"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>{" "}
                  Prev
                </div>
              )}
            </div>
            <div>
              {this.state.idx < pageCount - 1 && (
                <div
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  rounded-lg flex items-center "
                  onClick={() => this.handleNext(pageCount)}
                  style={{ margin: "1rem" }}
                >
                  Next{" "}
                  <svg
                    class="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          {pages[this.state.idx]}
        </div>
        {this.state.alertOpen && this.warning()}
        <Footer />
      </div>
    );
  }
}
