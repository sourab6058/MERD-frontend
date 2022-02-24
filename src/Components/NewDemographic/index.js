import React, { Component } from "react";
import axios from "axios";

import FiltersPage from "./FiltersPage";
import TableTypesPage from "./TableTypesPage";
import DisplayModePage from "./DisplayModePage";
import FilesPage from "./FilesPage";
import Nav from "../NavTwo";
import Footer from "../Footer";

import { sortZones } from "../../utils/sort";

import "../../css/Demographic.css";

const API_URL = "http://data.merd.online:8000/api/filter";

export default class NewDemographic extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      menuLoading: true,
      idx: 0,
      postObject: {
        cities: [],
        types: [],
        displayModes: [],
      },
    };
  }
  componentDidMount = () => {
    let optionData;
    if (localStorage.getItem("option-data")) {
      optionData = JSON.parse(localStorage.getItem("option-data"));
      this.createData(optionData);
    } else {
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

  render() {
    const pages = [
      <FiltersPage
        cities={this.state.cities}
        handleCitiesCheck={(cities) =>
          this.setState({ postObject: { ...this.state.postObject, cities } })
        }
      />,
      <TableTypesPage handleTypeCheck={this.handleTypeCheck} />,
      <DisplayModePage
        handleDisplayModeCheck={this.handleDisplayModeCheck}
        types={this.state.postObject.types}
      />,
      <FilesPage
        postObject={this.state.postObject}
        citiesOptions={this.state.cities}
      />,
    ];
    const pageCount = pages.length;
    return (
      <div>
        <Nav />
        <div className="container">
          {this.state.idx > 0 && (
            <div className="previous-btn" onClick={this.handlePrev}>
              Prev
            </div>
          )}
          {pages[this.state.idx]}
          {this.state.idx < pageCount - 1 && (
            <div
              className="continue-btn"
              onClick={() => this.handleNext(pageCount)}
            >
              next
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
