import React, { Component, useEffect } from "react";
import { Radio, Space, Dropdown, Menu, Checkbox } from "antd";
import { ArrowBack, ExpandMore } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Catchments.css";
import getUserDetail from "../utils/getUserDetail";
import SubscriptionAlert from "./Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "./Dashboard/OneTimeSubPopUp";
import CancelPopUp from "./Dashboard/CancelPopUp";

const mapImg = require("../img/maps.jpg");

const MALLS_URL = "http://3.108.159.143:8000/catchments_info/";
const API_URL = "http://3.108.159.143:8000/api/filter";
// const MALLS_URL = "http://localhost:8000/catchments_info/";
// const API_URL = "http://localhost:8000/api/filter";

export class Catchments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      malls: [],
      mallOptions: [],
      cities: [],
      citiesOptions: [],
      selectedCity: null,
      selectedMall: false,
      zones: [],
      selectedZones: [],
      validSelections: false,
      userDetails: null,
      subscribed: true,
      scrollX: 0,
      subscriptionAlertOpen: false,
      oneTimeSubPopUpOpen: false,
      cancelPopUpOpen: false,
    };

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }

  handleSubscriptionAlert = () => {
    this.setState({ subscriptionAlertOpen: false });
  };
  showOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: true });
  };
  handleCancelPopUp = (state) => {
    this.setState({ cancelPopUpOpen: state });
  };

  hideOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: false });
  };

  handleNext = () => {
    if (this.state.scrollX > -300)
      this.setState({ scrollX: this.state.scrollX - 100 });
  };

  handlePrev = () => {
    if (this.state.scrollX < 0)
      this.setState({ scrollX: this.state.scrollX + 100 });
  };

  componentDidMount = () => {
    axios.get(MALLS_URL).then((res) => {
      const malls = res.data;
      axios.get(API_URL).then((res) => {
        let citiesData = Object.entries(res.data.filters[0].cities);
        this.setState({ cities: citiesData });
        let _cities = [];
        console.log(citiesData);
        for (let city of citiesData) {
          for (let mall of malls.data) {
            if (city[1].id === mall.city) {
              _cities.push({ id: mall.city, name: city[1].city });
            }
          }
        }
        _cities = _cities.filter(
          (city, index, self) =>
            index ===
            self.findIndex((t) => t.id === city.id && t.name === city.name)
        );
        this.setState({ citiesOptions: _cities });
        this.setState({ malls: malls.data });
      });
    });
  };

  handleCitySelection = (e) => {
    this.setState({ selectedCity: e.target.value });
    const user = getUserDetail();

    if (user.username) {
      this.setState({ subscribed: true });
      this.setState({ userDetails: user });
    } else {
      this.setState({ subscribed: false });
    }
    const selectedCityId = this.state.citiesOptions.filter(
      (city) => city.name === e.target.value
    )[0].id;
    let distinctMalls = this.state.malls.filter(
      (mall) => mall.city === selectedCityId
    );
    distinctMalls = distinctMalls.map((mall) => mall.name);
    distinctMalls = [...new Set(distinctMalls)];
    console.log(distinctMalls);
    this.setState({ mallOptions: distinctMalls });
  };

  handleMallSelection = (e) => {
    const usrDetail = localStorage.getItem("user-details");
    const user = getUserDetail(usrDetail);

    const subscribedCities = user.cities;
    const validSelections = subscribedCities.includes(this.state.selectedCity);
    console.log(subscribedCities, this.state.selectedCity);
    if (!(user.username && validSelections)) {
      this.setState({ subscriptionAlertOpen: true });
      return false;
    }
    let finalMalls = this.state.malls.filter(
      (mall) => mall.name === e.target.value
    );
    this.setState({ selectedMall: e.target.value });
    const [city] = this.state.cities.filter(
      (city) => city[1].city === this.state.selectedCity
    );
    const zonesId = finalMalls.map((mall) => mall.zone);
    const zones = [];
    for (let zId of zonesId) {
      for (let zone of city[1].zone) {
        if (zId === zone.id) {
          zones.push(zone.zone);
        }
      }
    }
    this.setState({ zones });
  };

  addZone = (zone, e) => {
    let tempZones = [...this.state.selectedZones];
    if (e.target.checked) {
      tempZones.push(zone);
      tempZones = [...new Set(tempZones)];
    } else {
      let idx = tempZones.findIndex((z) => zone === z);
      if (idx !== -1) {
        tempZones.splice(idx, 1);
      }
    }

    this.setState({ selectedZones: tempZones });
  };

  render() {
    const citiesMenu = (
      <Menu key={1}>
        <Radio.Group
          onChange={this.handleCitySelection}
          value={this.state.selectedCity}
        >
          <Space direction="vertical" className="h-52 overflow-y-scroll">
            {this.state.citiesOptions.map((city) => (
              <Menu.Item key={city.id}>
                <Radio key={city.id} value={city.name}>
                  {city.name}
                </Radio>
              </Menu.Item>
            ))}
          </Space>
        </Radio.Group>
      </Menu>
    );
    const mallsMenu = (
      <Menu key={2}>
        <Radio.Group
          onChange={this.handleMallSelection}
          value={this.state.selectedMall}
        >
          <Space direction="vertical">
            {this.state.mallOptions.map((mall, idx) => (
              <Menu.Item key={mall}>
                <Radio key={idx} value={mall}>
                  {mall}
                </Radio>
              </Menu.Item>
            ))}
          </Space>
        </Radio.Group>
      </Menu>
    );
    const zonesMenu = (
      <Menu>
        <Menu.ItemGroup>
          {this.state.zones.map((zone, idx) => (
            <Menu.Item key={idx}>
              <Checkbox key={idx} onChange={(e) => this.addZone(zone, e)}>
                Zone {zone}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    );

    return (
      <>
        <NavTwo />
        {this.state.subscriptionAlertOpen && (
          <SubscriptionAlert
            registered={this.state.subscribed}
            handleSubscriptionAlert={this.handleSubscriptionAlert}
            showOneTimeSubPopUp={this.showOneTimeSubPopUp}
            handleCancelPopUp={this.handleCancelPopUp}
          />
        )}
        {this.state.oneTimeSubPopUpOpen && (
          <OneTimeSubPopUp hideOneTimeSubPopUp={this.hideOneTimeSubPopUp} />
        )}
        {this.state.cancelPopUpOpen && (
          <CancelPopUp handleCancelPopUp={this.handleCancelPopUp} />
        )}
        <div className="carousal-outer">
          {this.state.scrollX < 0 && (
            <ArrowBack
              className="arrow-back"
              onClick={this.handlePrev}
              style={{ fontSize: "3.5rem", color: "white" }}
            />
          )}
          <div
            className="catchments bg-gray-50"
            style={{ left: `${this.state.scrollX}vw` }}
          >
            <div className="intro slide text-black text-3xl">
              We understand you like to conduct a catchments analysis. Please
              choose the city and the mall
              <button type="button" onClick={this.handleNext} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Proceed
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>

            <div className="slide slide2  text-black">
              Select a city from the dropdown below
              {this.state.citiesOptions.length ? (
                <Dropdown overlay={citiesMenu} placement="bottomCenter" arrow>
                  <span className="drp-dwn-btn custom-btn">
                    {this.state.selectedCity || "City"}
                    <ExpandMore style={{ fontSize: "2rem" }} />
                  </span>
                </Dropdown>
              ) : (
                "\nLoading Cities..."
              )}
              {this.state.mallOptions.length ? (
                <span className="custom-btn" onClick={this.handleNext}>
                  Proceed
                </span>
              ) : (
                <span className="custom-btn disabled">Proceed</span>
              )}
            </div>
            <div className="slide slide3 text-black text-3xl">
              Select a mall from the dropdown below
              {this.state.mallOptions.length ? (
                <Dropdown overlay={mallsMenu} placement="bottomCenter" arrow>
                  <span className="drp-dwn-btn custom-btn">
                    {this.state.selectedMall || "Mall"}
                    <ExpandMore style={{ fontSize: "2rem" }} />
                  </span>
                </Dropdown>
              ) : (
                "\nLoading Malls..."
              )}
              {this.state.zones.length ? (
                <span className="custom-btn" onClick={this.handleNext}>
                  Proceed
                </span>
              ) : (
                <span className="custom-btn disabled">Proceed</span>
              )}
            </div>
            <div className="slide slide4">
              <img src={mapImg} className="catchments-map"></img>
              <div className="zones-menu">
                Zones fall under the malls catchments
                {this.state.zones.length ? zonesMenu : "\nLoading Zones..."}
                {this.state.selectedZones.length ? (
                  <>
                    <Link className="custom-btn" to="/dashboard">
                      See Market Size
                    </Link>
                    <Link className="custom-btn" to="/demographic">
                      See Demographic Data
                    </Link>
                  </>
                ) : (
                  <span style={{ color: "pink", fontSize: "1rem" }}>
                    Please select atleast one zone.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Catchments;
