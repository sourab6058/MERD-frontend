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
import getUserDetail from "../../utils/getUserDetail";
import SubscriptionAlert from "../Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "../Dashboard/OneTimeSubPopUp";
import CancelPopUp from "../Dashboard/CancelPopUp";

const API_URL = "https://data.merd.online:8000/api/filter";
const CANCEL_URL = "https://merd.online/subscription-process-cancel/";

export default class NewDemographic extends Component {
  constructor() {
    super();
    this.dataToBeEmailed = null;
    this.user = getUserDetail();
    this.state = {
      userDetails: null,
      registeredUser: true,
      subscriptionAlertOpen: false,
      oneTimeSubPopUpOpen: false,
      cancelPopUpOpen: false,
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
        type: "demogpc",
      },
      alertOpen: false,
    };
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  componentDidMount = () => {
    console.log("newdemo");

    let optionData;
    if (localStorage.getItem("option-data")) {
      optionData = JSON.parse(localStorage.getItem("option-data"));
      this.createData(optionData);
      console.log(optionData);
      this.setState({ firstTimePopUp: false });
    } else {
      this.setState({ firstTimePopUp: true });
      axios
        .get(API_URL)
        .then((res) => {
          optionData = Object.entries(res.data.filters[0]);
          optionData = sortZones(optionData);
          localStorage.setItem("option-data", JSON.stringify(optionData));
          this.createData(optionData);
          this.setState({ firstTimePopUp: false });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  handleSubscriptionAlert = () => {
    this.setState({ subscriptionAlertOpen: false });
  };
  handleSubscriptionAlert = () => {
    this.setState({ subscriptionAlertOpen: false });
  };
  showOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: true });
  };
  handleCancelPopUp = (state) => {
    this.setState({ cancelPopUpOpen: state });
    this.setState({ alertOpenInvalid: false });
    if (!state) this.submitForm(this.dataToBeEmailed, false);
  };

  hideOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: false });
    this.setState({ subscriptionAlertOpen: false });
    this.submitForm(this.dataToBeEmailed, true);
  };
  checkUserRights = () => {
    console.log("check");
    const userDetails = getUserDetail();
    this.setState({ userDetails });
    if (userDetails.username) this.setState({ registeredUser: true });
    else {
      this.setState({ registeredUser: false });
    }
    const citiesCheckedNames = [];
    this.state.postObject.cities.forEach((cityChecked) => {
      this.state.cities.forEach((city) => {
        if (city.id === cityChecked) citiesCheckedNames.push(city.city);
      });
    });
    if (this.state.idx === 0 && userDetails.username) {
      const invalidCities = citiesCheckedNames.filter(
        (cityChecked) => !userDetails.cities.includes(cityChecked)
      );
      console.log(citiesCheckedNames, invalidCities);
      if (invalidCities.length > 0) {
        this.dataToBeEmailed = {
          cities: citiesCheckedNames,
        };
        // this.setState({ subscriptionAlertOpen: true });
        this.setState({ idx: 0 });
      }
    } else if (!userDetails.username) {
      this.setState({ subscriptionAlertOpen: true });
      this.dataToBeEmailed = {
        cities: citiesCheckedNames,
      };
      this.setState({ idx: 0 });
    }
    return true;
  };

  submitForm = (data, oneTime) => {
    const user = getUserDetail();

    const createFormInput = (name, value, form) => {
      let input = document.createElement("input");
      input.name = name;
      input.value = value;
      form.appendChild(input);
    };

    let formTarget = user.username ? "hidden-frame" : "_blank";

    let form = document.createElement("form");
    form.style.visibility = "hidden"; // no user interaction is necessary
    form.method = "POST"; // forms by default use GET query strings
    form.target = formTarget;
    form.action = CANCEL_URL;

    if (user.username) {
      createFormInput("username", user.username, form);
    }
    if (oneTime) {
      createFormInput("type", "One Time Buy from demographic", form);
    } else {
      createFormInput("type", "Cancel from demographic", form);
    }

    data["categories"] = [
      ...this.state.postObject.types,
      ...this.state.postObject.displayModes,
    ];

    for (let attribute in data) {
      createFormInput(attribute, data[attribute].join(), form);
    }
    document.body.appendChild(form);
    form.submit();
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
    if (!this.checkUserRights()) return false;

    if (this.state.postObject.cities.length === 0 && this.state.idx === 0) {
      this.setState({ alertOpen: true });
      return false;
    }
    if (
      (this.state.postObject.types.length === 0 ||
        this.state.postObject.displayModes.length === 0) &&
      this.state.idx === 1
    ) {
      this.setState({ alertOpen: true, idx: 1 });
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
        idx={this.state.idx}
        handlePrev={this.handlePrev}
        setPostObject={(postObject) => this.setState({ postObject })}
      />,

      <div className="flex w-full justify-around second-page">
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
        registeredUser={this.state.registeredUser}
        citiesSubscribed={this.user.cities}
        showOneTimeSubPopUp={this.showOneTimeSubPopUp}
      />,
    ];
    const pageCount = pages.length;
    return (
      <div style={{ width: "100vw" }}>
        {this.state.subscriptionAlertOpen && this.state.idx === 2 && (
          <SubscriptionAlert
            registered={this.state.registeredUser}
            handleSubscriptionAlert={this.handleSubscriptionAlert}
            showOneTimeSubPopUp={this.showOneTimeSubPopUp}
            handleCancelPopUp={this.handleCancelPopUp}
            postObject={this.state.postObject}
          />
        )}{" "}
        {this.state.oneTimeSubPopUpOpen && (
          <OneTimeSubPopUp hideOneTimeSubPopUp={this.hideOneTimeSubPopUp} />
        )}
        {this.state.cancelPopUpOpen && (
          <CancelPopUp handleCancelPopUp={this.handleCancelPopUp} />
        )}
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
              <span style={{ color: "black" }}>Okay</span>
            </Button>,
          ]}
        >
          <div>
            Filters takes only a minute to load for the first time. Please wait.
            This only happens once.
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
        <iframe
          name="hidden-frame"
          id="hidden-frame"
          hidden
          frameborder="0"
        ></iframe>
        <Footer />
      </div>
    );
  }
}
