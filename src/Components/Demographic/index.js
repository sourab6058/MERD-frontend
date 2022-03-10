import React, { Component } from "react";
import { Container } from "@material-ui/core";
import { Divider } from "antd";
import axios from "axios";

import NavTwo from "../NavTwo";
import Footer from "../Footer";

import CityFilter from "./CityFilter";
import TypeFilter from "./TypeFilter";
import ModesFilter from "./ModesFilter";

import "../../css/Demo.css";

const CITY_URL = "http://data.merd.online:8000/cities";

export default class Demographic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citiesOptions: [],
      types: [],
      modes: [],
      selectedCity: null,
    };
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  componentDidMount = () => {
    axios
      .get(CITY_URL)
      .then((res) => {
        this.setState({ citiesOptions: res.data }, console.log(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  setCity = (city) => {
    console.log(city);
    this.setState({ selectedCity: city });
  };
  setType = (type) => {
    console.log(type);
  };
  setMode = (mode) => {
    console.log(mode);
  };

  render() {
    return (
      <div>
        <NavTwo />
        <Container style={{ minHeight: "60vh", border: "1px solid red" }}>
          <h1 style={{ paddingTop: "2rem" }}>Demogrphic Tables</h1>
          <div className="filters">
            <CityFilter
              setCity={this.setCity}
              citiesOptions={this.state.citiesOptions}
            />
            <TypeFilter setType={this.setType} />
            <ModesFilter setMode={this.setMode} />
          </div>
          <Divider />
        </Container>
        <Footer />
      </div>
    );
  }
}
