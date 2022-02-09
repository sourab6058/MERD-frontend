import React, { Component } from "react";
import axios from "axios";

import FiltersPage from "./FiltersPage";
import Nav from "../NavTwo";
import Footer from "../Footer";

import { sortZones } from "../../utils/sort";

import "../../css/Demographic.css";

const API_URL = "http://data.merd.online:8000/api/filter";

export default class NewDemographic extends Component {
  constructor() {
    super();
    this.state = {
      years: [],
      cities: [],
      nationalities: [],
      menuLoading: true,
    };
  }
  componentDidMount = () => {
    if (localStorage.getItem("option-data")) {
      const optionData = JSON.parse(localStorage.getItem("option-data"));
      this.createData(optionData);
    } else {
      axios
        .get(API_URL)
        .then((res) => {
          let optionData = Object.entries(res.data.filters[0]);
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
      years: optionData[0][1],
      cities: optionData[4][1],
      nationalities: optionData[2][1],
    });
    this.setState({ menuLoading: false }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container">
          <FiltersPage
            years={this.state.years}
            cities={this.state.cities}
            nationalities={this.state.nationalities}
          />
          <div className="continue-btn">next</div>
        </div>
        <Footer />
      </div>
    );
  }
}
