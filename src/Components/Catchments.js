import React, { Component } from "react";
import { Radio, Space, Dropdown, Menu, Checkbox, Modal, Button } from "antd";
import { ArrowBack, ExpandMore } from "@material-ui/icons";
import axios from "axios";

import NavTwo from "./NavTwo";
import Footer from "./Footer";

import "../css/Catchments.css";
import getUserDetail from "../utils/getUserDetail";
import SubscriptionAlert from "./Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "./Dashboard/OneTimeSubPopUp";
import CancelPopUp from "./Dashboard/CancelPopUp";

const MALLS_URL = "https://data.merd.online:8000/catchments_info/";
const API_URL = "https://data.merd.online:8000/api/filter";
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
      firstTimePopUp: false,
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

  createOptions = (res, malls) => {
    let citiesData = Object.entries(res.data.filters[0].cities);
    this.setState({ cities: citiesData });
    let _cities = [];
    console.log(citiesData);
    for (let city of citiesData) {
      for (let mall of malls.data) {
        if (city[1].id === mall.city) {
          _cities.push({
            id: mall.city,
            name: city[1].city,
            country: city[1].country.country,
          });
        }
      }
    }
    _cities = _cities.filter(
      (city, index, self) =>
        index ===
        self.findIndex((t) => t.id === city.id && t.name === city.name)
    );
    this.setState({ citiesOptions: _cities });
    console.log(_cities);
    this.setState({ malls: malls.data });
  };

  componentDidMount = () => {
    axios.get(MALLS_URL).then((res) => {
      const malls = res.data;

      if (localStorage.getItem("catchments-options")) {
        this.createOptions(
          JSON.parse(localStorage.getItem("catchments-options")),
          malls
        );
      } else {
        this.setState({ firstTimePopUp: true });
        axios.get(API_URL).then((res) => {
          this.createOptions(res, malls);
          localStorage.setItem("catchments-options", JSON.stringify(res));
        });
      }
    });
  };

  handleCitySelection = (e) => {
    this.setState({ selectedCity: e.target.value });
    console.log(e.target.value);
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
    this.setState({ zones, selectedZones: zones });
  };

  addZone = (e) => {
    const zone = e.target.value;
    let tempZones = [...this.state.selectedZones];
    if (!tempZones.includes(zone)) {
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

  citiesMenu = (citiesOptions, selectedCity) => {
    const countries = [];
    for (let city of citiesOptions) {
      const idx = countries.findIndex(
        (country) => country.country === city.country
      );
      if (idx === -1) {
        countries.push({
          country: city.country,
          cities: [{ id: city.id, city: city.name }],
        });
      } else {
        countries[idx].cities.push({ id: city.id, city: city.name });
      }
    }

    return (
      <Menu
        mode="horizontal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {countries.map((country) => (
          <Menu.SubMenu
            key={country.country}
            title={
              <h4 align="center">
                {country.country}
                <ExpandMore />
              </h4>
            }
            style={{
              width: "10rem",
              border: "1px solid var(--lightBlue)",
              borderRadius: "1rem",
            }}
          >
            {country.cities.map((city) => (
              <Menu.Item>
                <Radio
                  value={city.city}
                  checked={selectedCity === city.city}
                  onClick={this.handleCitySelection}
                >
                  {city.city}
                </Radio>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    );
  };

  render() {
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
              <Checkbox
                key={idx}
                value={zone}
                checked={this.state.selectedZones.includes(zone)}
                onClick={(e) => this.addZone(e)}
              >
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
              style={{ fontSize: "3.5rem", color: "lightblue", top: "2rem" }}
            />
          )}
          <div
            className="catchments bg-gray-50 "
            style={{ left: `${this.state.scrollX}vw` }}
          >
            <div className="intro slide bg-white rounded-lg text-black text-center text-3xl">
              We understand you like to conduct a catchments analysis. <br />{" "}
              Please choose the city and the mall
              <button
                type="button"
                onClick={this.handleNext}
                className="text-white mt-5 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Proceed
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
              </button>
            </div>

            <div className="slide slide2  text-black text-3xl">
              <span
                style={{
                  padding: "1rem",
                  margin: "1rem",
                  borderBottom: "1px solid var(--lightBlue)",
                }}
              >
                Select a city from the dropdowns below
                <ExpandMore />
              </span>
              {this.state.citiesOptions.length
                ? this.citiesMenu(
                    this.state.citiesOptions,
                    this.state.selectedCity
                  )
                : "\nLoading Cities..."}
              <span
                style={{
                  border: "2px solid var(--lightBlue)",
                  padding: "0.5rem 1rem",
                  margin: "1rem",
                  fontSize: "1.5rem",
                }}
              >
                {this.state.selectedCity
                  ? `City Selected: ${this.state.selectedCity}`
                  : "No City Selected"}
              </span>
              {this.state.mallOptions.length ? (
                <span
                  className="text-white mt-5 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={this.handleNext}
                >
                  Proceed{" "}
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
                </span>
              ) : (
                <span className="text-white mt-5 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disable">
                  Proceed
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
                </span>
              )}
            </div>
            <div className="slide slide3 text-black text-3xl">
              Select a mall from the dropdown below
              {this.state.mallOptions.length ? (
                <Dropdown overlay={mallsMenu} placement="bottomCenter" arrow>
                  <span className="drp-dwn-btn custom-btn rounded-lg borde">
                    {this.state.selectedMall || "Mall"}
                    <ExpandMore style={{ fontSize: "2rem" }} />
                  </span>
                </Dropdown>
              ) : (
                "\nLoading Malls..."
              )}
              {this.state.zones.length ? (
                <span
                  className="text-white mt-3 bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={this.handleNext}
                >
                  Proceed
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
                </span>
              ) : (
                <span className="text-white mt-3 bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disable">
                  Proceed
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
                </span>
              )}
            </div>
            <div className="slide slide4">
              <div className="zones-menu text-black">
                {this.state.selectedMall} CATCHMENTS AREAS
                <br />
                <form
                  method="GET"
                  action="/dashboard"
                  style={{ width: "15rem" }}
                >
                  {this.state.zones.length ? zonesMenu : "\nLoading Zones..."}
                  {this.state.selectedZones.length ? (
                    <>
                      <input
                        type="hidden"
                        name="data"
                        value={JSON.stringify({
                          selectedCity: this.state.selectedCity,
                          selectedZones: this.state.selectedZones,
                          selectedMall: this.state.selectedMall,
                        })}
                      />
                      <input
                        type="submit"
                        value="See Market Size"
                        className="disabled text-white mt-6 cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      />
                      <br />
                      <p>
                        NOTE:We have carefully delineated the catchments areas
                        based on drive time and competitive environment.
                        However, if you want to be conservative and deselect any
                        zone, then you can do that
                      </p>
                    </>
                  ) : (
                    <span style={{ color: "pink", fontSize: "1rem" }}>
                      Please select atleast one zone.
                    </span>
                  )}
                </form>
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
