import React, { Component } from "react";
import NavTwo from "./NavTwo";

import axios from "axios";
import * as _ from "lodash";

import Loader from "react-loader-spinner";

import rendercsv from "../utils/rendercsv";
import { sortZones } from "../utils/sort";
import { CSVLink } from "react-csv";

import { Layout, Menu, Checkbox, Button } from "antd";
import { CaretRightOutlined, DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

import "../css/modal.css";

import SubCategory from "./Dashboard/Menu/SubCategory";
import SubCity from "./Dashboard//Menu/SubCity";
import DemographicTables from "./Dashboard/Tables/DemographicTable";
import SubNationality from "./Dashboard/Menu/SubNationality";
import SubMonths from "./Dashboard/Menu/SubMonths";

import { Modal } from "@material-ui/core";
import { concat } from "lodash";
import Footer from "./Footer";
import { Header } from "antd/lib/layout/layout";
import getUserDetail from "../utils/getUserDetail";
import SubscriptionAlert from "./Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "./Dashboard/OneTimeSubPopUp";
import CancelPopUp from "./Dashboard/CancelPopUp";

const { SubMenu, Item } = Menu;
const { Content, Sider } = Layout;

// const API_URL = "http://ec2-3-219-204-162.compute-1.amazonaws.com/api/filter";
// const API_URL = "http://localhost:8000/api/filter";
// const API_PST_URL = "http://localhost:8000/demographic_info/";
const API_URL = "http://3.108.159.143:8000/api/filter";
const API_PST_URL = "http://3.108.159.143:8000/demographic_info/";
// const API_PST_URL = "http://ec2-3-219-204-162.compute-1.amazonaws.com/demographic_info/";
export class Demographic extends Component {
  constructor(props) {
    super(props);

    //optionData is the raw data received from the backend
    //All other array variables are used to render the menu
    //postObject is the object that gets constructed for POST

    this.state = {
      optionData: [],
      sendnow: false,
      tableData: [],
      cities: [],
      zones: [],
      years: [],
      selected_categories: [],
      category: [],
      nationality: [],
      postObject: {
        cities: [],
        zones: [],
        years: [],
        months: [],
        categories: [],
        selected_categories: [],
        subCategories: [],
        subSubCategories: [],
        nationalities: [],
        income_checked: false,
        nationality_checked: false,
        age_checked: false,
        families_checked: false,
        labourers_checked: false,
        capita_checked: false,
        // clothes_checked:false,
        // footwear_checked:false,
        // cosmetics_checked:false,
        // accessories_checked:false,
        // furnishings_checked:false,
        // luxury_checked:false,
        // food_checked:false,
        population_checked: false,
      },
      loading: false,
      csvData: [],
      menuLoading: true,
      isModalOpen: false,
      displayMode: "nationality_new",
      alertOpen: true,
      alertOpenInvalid: false,
      selectedCitiesNames: [],
      subscriber: true,
      registeredUser: true,
      subscriptionAlertOpen: false,
      oneTimeSubPopUpOpen: false,
      cancelPopUpOpen: false,
    };
    this.ModalHandlerClose = this.ModalHandlerClose.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  ModalHandlerClose = async () => {
    this.setState({ alertOpen: false, alertOpenInvalid: false });
  };

  setWrapperRef = (node) => {
    console.log("ZZZZZZZ");
    this.wrapperRef = node;
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        alertOpen: false,
        alertOpenInvalid: false,
      });
    }
  }

  //GET request
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    const usrDetails = localStorage.getItem("user-details");
    const user = getUserDetail(usrDetails);
    if (!user.username) {
      this.setState({ registeredUser: false });
    }
    axios
      .get(API_URL)
      .then((res) => {
        let optionData = Object.entries(res.data.filters[0]);
        optionData = sortZones(optionData);
        this.createData(optionData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postData = async (displayMode) => {
    let isEmpty = false;
    // let isCatEmpty = false;
    console.log("DEMOGRAPH");
    console.log(this.state);
    if (this.state.postObject.cities.length === 0) isEmpty = true;
    if (this.state.postObject.zones.length === 0) isEmpty = true;
    // if (this.state.postObject.zones.length ==0){
    //     isEmpty = false;
    if (this.state.income_checked) this.state.postObject.income_checked = true;
    else if (this.state.nationality_checked)
      this.state.postObject.nationality_checked = true;
    else if (this.state.age_checked) this.state.postObject.age_checked = true;
    else if (this.state.families_checked)
      this.state.postObject.families_checked = true;
    else if (this.state.labourers_checked)
      this.state.postObject.labourers_checked = true;
    else if (this.state.capita_checked)
      this.state.postObject.capita_checked = true;
    // if(this.state.clothes_checked)this.state.postObject.clothes_checked=true;
    // if(this.state.footwear_checked)this.state.postObject.footwear_checked=true;
    // if(this.state.cosmetics_checked)this.state.postObject.cosmetics_checked=true;
    // if(this.state.accessories_checked)this.state.postObject.accessories_checked=true;
    // if(this.state.furnishings_checked)this.state.postObject.furnishings_checked=true;
    // if(this.state.luxury_checked)this.state.postObject.luxury_checked=true;
    // if(this.state.food_checked)this.state.postObject.food_checked=true;
    else if (this.state.population_checked)
      this.state.postObject.population_checked = true;
    else {
      isEmpty = true;
    }
    // }
    // if (this.state.postObject.nationalities.length === 0) isEmpty = true;
    // if (this.state.postObject.months.length === 0) isEmpty = true;
    if (this.state.postObject.years.length === 0) isEmpty = true;
    // if (this.state.postObject.categories.length === 0
    //     && this.state.postObject.subCategories.length === 0
    //     && this.state.postObject.subSubCategories.length === 0) isCatEmpty = true;

    if (isEmpty) {
      // alert('Please Select all required options');
      this.setState({ isModalOpen: false, alertOpenInvalid: true });
      return;
    }

    this.setState({ displayMode: "nationality_new" });
    this.setState({ isModalOpen: false });
    //changing tableData to [] so loading screen appears again in Table.js
    // this.setState({tableData: [] })
    this.setState({ loading: true });

    let dataToBePost = this.state.postObject;
    dataToBePost["filter_type"] = displayMode;
    console.log(dataToBePost);

    axios
      .post(API_PST_URL, dataToBePost)
      .then((res) => {
        console.log("POST request succesful.");
        console.log(res.data);

        // let tableData=res.data

        this.state.tableData = res.data;
        this.setState({ tableData: res.data, sendnow: true });
      })
      .catch((err) => {
        console.log(err);
      });
    //  this.setState({postObject:{ cities: [],
    //     zones: [],
    //     years: [],
    //     months: [],
    //     categories: [],
    //     selected_categories: [],
    //     subCategories: [],
    //     subSubCategories: [],
    //     nationalities: [],
    //     income_checked:false,
    //     nationality_checked:false,
    //     age_checked:false,
    //     families_checked:false,
    //     labourers_checked:false,
    //     capita_checked:false,
    //     population_checked:false,
    // },nationality_checked:false})
  };

  checkSubscription = () => {
    if (!this.state.subscriber || !this.state.registeredUser) {
      this.setState({ subscriptionAlertOpen: true });
    }
  };

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

  checkData = (checkCities) => {
    const citiesSubscribed = getUserDetail(
      localStorage.getItem("user-details")
    ).cities;
    const validSelections = checkCities.every((city) =>
      citiesSubscribed.includes(city)
    );
    if (!(validSelections && this.state.registeredUser)) {
      this.setState({ subscriptionAlertOpen: true });
      return;
    }
    let isEmpty = false;
    // let isCatEmpty = false;
    if (this.state.postObject.cities.length === 0) isEmpty = true;
    if (this.state.postObject.zones.length === 0) isEmpty = true;
    // if (this.state.postObject.nationalities.length === 0) isEmpty = true;
    // if (this.state.postObject.months.length === 0) isEmpty = true;
    if (this.state.postObject.years.length === 0) isEmpty = true;
    // if (this.state.postObject.categories.length === 0
    //     && this.state.postObject.subCategories.length === 0
    //     && this.state.postObject.subSubCategories.length === 0) isCatEmpty = true;

    if (isEmpty) {
      // alert('Please Select all required options');
      this.setState({ isModalOpen: false, alertOpenInvalid: true });
      return;
    } else {
      this.setState({ isModalOpen: true, alertOpenInvalid: false });
    }
  };

  getCsvData = () => {
    //Passing control to utils/rendercsv for the generation of csv-react readable data (Multidimensional Array)
    let csvData = rendercsv(
      this.state.tableData,
      this.state.postObject.months,
      this.state.displayMode
    );

    //If data received, update state. *May not need this if condition
    if (csvData) {
      this.setState({ csvData });
    }
  };

  //Used to create state variables that are used to display the menus
  createData(receivedData) {
    let optionData = receivedData;

    //Using raw api data to fill in menu variables
    //months is static for now, can be changed later
    this.setState({
      years: optionData[0][1],
      category: optionData[3][1],
      cities: optionData[4][1],
      nationality: optionData[2][1],
    });
    this.setState({ menuLoading: false });
  }

  //Adding a single zone
  addZone = (whereToBePushed, itemToBePushed, e) => {
    var tempData = this.state.postObject;
    var cities = this.state.cities;

    //Searching city in which zone exists, and adding the city to the postObject
    //As city id required even for one zone selected
    cities.forEach((city) => {
      city.zone.forEach((zones) => {
        if (
          zones.id === itemToBePushed &&
          tempData.cities.indexOf(city.id) === -1
        ) {
          tempData.cities.push(city.id);
        }
      });
    });

    //Adding/Deleting zone
    if (e.target.checked) {
      tempData[whereToBePushed].push(itemToBePushed);
      this.setState({ postObject: tempData });
    } else {
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      this.setState({ postObject: tempData });
    }
  };

  //Called for Months, Years, Nationalities, SubSubCategories
  addItem = (whereToBePushed, itemToBePushed, e) => {
    var tempData = this.state.postObject;

    if (e.target.checked) {
      tempData[whereToBePushed].push(itemToBePushed);
      this.setState({ postObject: tempData });
    } else {
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      this.setState({ postObject: tempData });
    }
  };

  //Called for Cities
  selectAllZones = (whereToBePushed, itemToBePushed, e) => {
    var tempData = this.state.postObject;
    const cities = this.state.cities;
    //checkArray will get all zones of particular city
    const checkArray = [];

    //Populating checkArray
    cities.forEach((data) => {
      if (data.id === itemToBePushed) {
        data.zone.forEach((id) => {
          checkArray.push(id.id);
        });
      }
    });

    //Adding city id to city
    if (e.target.checked) {
      //Check if city already exists in propObject,
      //if it does not, add city
      //if it does, only add respective zones
      if (tempData.cities.indexOf(itemToBePushed) === -1) {
        tempData.zones = _.union([...checkArray], [...tempData.zones]);
        tempData[whereToBePushed].push(itemToBePushed);
        this.setState({ postObject: tempData });
      } else {
        tempData.zones = _.union([...checkArray], [...tempData.zones]);
        this.setState({ postObject: tempData });
      }
    } else {
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      tempData.zones = tempData.zones.filter((el) => !checkArray.includes(el));
      this.setState({ postObject: tempData });
    }

    console.log(this.state.postObject);
  };

  //Called for Categories
  selectAllSubCategories = (whereToBePushed, itemToBePushed, e) => {
    var tempData = this.state.postObject;
    const category = this.state.category;
    //checkSubArray will get all sub categories of particular category
    const checkSubArray = [];
    //checkSubSubArray will get all sub sub categories of particular category
    const checkSubSubArray = [];

    //Populating checkSubArray
    category.forEach((main) => {
      if (main.id === itemToBePushed) {
        main.sub_category.forEach((sub) => {
          checkSubArray.push(sub.id);
        });
      }
    });

    //Populating checkSubSubArray
    category.forEach((main) => {
      if (main.id === itemToBePushed) {
        main.sub_category.forEach((sub) => {
          sub.sub_sub_category.forEach((subsub) => {
            checkSubSubArray.push(subsub.id);
          });
        });
      }
    });

    //Delete all subCat and subSubCat that are present in particular Category
    tempData.subSubCategories = tempData.subSubCategories.filter(
      (el) => !checkSubSubArray.includes(el)
    );
    tempData.subCategories = tempData.subCategories.filter(
      (el) => !checkSubArray.includes(el)
    );

    //Adding Category id to Category
    if (e.target.checked) {
      tempData[whereToBePushed].push(itemToBePushed);
      this.setState({ postObject: tempData });
    } else {
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      this.setState({ postObject: tempData });
    }
  };

  selectAllSubSubCategories = (whereToBePushed, itemToBePushed, e) => {
    var tempData = this.state.postObject;
    const category = this.state.category;
    //checkArray is for all subSubCategories for a particular Category
    const checkArray = [];

    //Populating checkArray
    category.forEach((main) => {
      main.sub_category.forEach((sub) => {
        if (sub.id === itemToBePushed) {
          sub.sub_sub_category.forEach((subsub) => {
            checkArray.push(subsub.id);
          });
        }
      });
    });

    //Deleting all subSubCategories present in particular category
    tempData.subSubCategories = tempData.subSubCategories.filter(
      (el) => !checkArray.includes(el)
    );

    //Adding subCategory id to subCategories
    if (e.target.checked) {
      tempData[whereToBePushed].push(itemToBePushed);
      this.setState({ postObject: tempData });
    } else {
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      this.setState({ postObject: tempData });
    }
  };

  selectAllNationalities = (e) => {
    const tempData = this.state.postObject;
    const allNationalities = this.state.nationality.map((nation) => nation.id);

    if (e.target.checked) {
      tempData.nationalities = allNationalities;
      this.setState({ postObject: tempData });
    } else {
      tempData.nationalities = [];
      this.setState({ postObject: tempData });
    }

    console.log(this.state.postObject);
  };

  addMonths = (months) => {
    const tempData = this.state.postObject;
    tempData.months = months;
    this.setState({ postObject: tempData });

    console.log(this.state.postObject);
  };
  handleChange = (event) => {
    var isChecked = event.target.checked;
    var item = event.target.value;
    console.log("////////");
    console.log(item);
    var selected_categories = this.state.selected_categories;
    // this.setState({selected_categories:[item]});
    this.state.postObject.categories = this.state.postObject.categories.concat([
      item,
    ]);
  };

  render() {
    console.log("DEMOGRAPHrender");
    console.log(this.state);
    const data = this.state;
    const Table = this.state.tableData ? this.state.tableData : [];
    const {
      income_checked,
      nationality_checked,
      age_checked,
      families_checked,
      labourers_checked,
      capita_checked,
      clothes_checked,
      footwear_checked,
      cosmetics_checked,
      accessories_checked,
      furnishings_checked,
      luxury_checked,
      food_checked,
      population_checked,
    } = this.state;
    let checkCity = [];
    let checkZones = [];
    let checkYear = [];
    let checkNationality = [];
    if (this.state.postObject.cities.length > 0) {
      const cities = this.state.cities;
      const subcities = this.state.postObject.cities;
      const subzones = this.state.postObject.zones;
      //checkArray will get all zones of particular city

      //Populating checkArray
      cities.forEach((data) => {
        subcities.forEach((data2) => {
          if (data.id === data2) {
            checkCity.push(data.city);
            data.zone.forEach((id) => {
              subzones.forEach((data3) => {
                if (id.id === data3) {
                  checkZones.push(id.zone + ", ");
                }
              });
            });

            console.log("if loop");
            console.log(checkCity);
          }
        });
      });
    }
    if (this.state.postObject.years.length > 0) {
      const year = this.state.years;
      const subyear = this.state.postObject.years;
      year.forEach((data) => {
        subyear.forEach((data2) => {
          if (data === data2) {
            checkYear.push(data + ", ");

            console.log("if loop");
            console.log(checkYear);
          }
        });
      });
    }
    if (this.state.postObject.nationalities.length > 0) {
      const nat = this.state.nationality;
      const subnat = this.state.postObject.nationalities;
      nat.forEach((data) => {
        subnat.forEach((data2) => {
          if (data.id === data2) {
            checkNationality.push(data.nationality + ", ");

            console.log("if loop");
            console.log(checkNationality);
          }
        });
      });
    }

    return (
      <div>
        {/* <Nav /> */}
        {/* {this.state.alertOpen && (
          <div ref={this.setWrapperRef}>
            <div className="card1 transition">
              <h4 className="transition2">
                <small>
                  Make selections in the panel on the left to view demographic
                  data
                </small>
              </h4>
              <div className="cta-container transition">
                <a
                  href="#"
                  onClick={() => this.ModalHandlerClose()}
                  className="cta"
                >
                  Continue
                </a>
              </div>
              <div className="card_circle transition"></div>
            </div>
          </div>
        )} */}

        <div>
          <Layout>
            <Header style={{ padding: 0, height: "auto", lineHeight: 1.5715 }}>
              <NavTwo />
            </Header>
          </Layout>
          <Layout
            style={{
              padding: "10px",
              // height: '90vh',
              height: "100vh",
            }}
          >
            <Sider width={300} className="site-layout-background">
              {!this.state.menuLoading ? (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                  theme={"light"}
                >
                  <SubMenu key="City" title="City">
                    {this.state.cities.map((city) => (
                      <SubCity
                        key={city.city}
                        city={city}
                        addzone={this.addZone}
                        selectallzones={this.selectAllZones}
                      ></SubCity>
                    ))}
                  </SubMenu>
                  <SubMenu key="Years" title="Years">
                    {this.state.years.map((year) => (
                      <Menu.Item key={year}>
                        <Checkbox
                          onClick={(e) => this.addItem("years", year, e)}
                        >
                          {year}
                        </Checkbox>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                  {/* <SubMonths addmonths={this.addMonths} /> */}
                  {/* <SubMenu key="Category" title="Category">
                                {this.state.category.map(main =>
                                    <SubCategory
                                        key={main.id}
                                        main={main}
                                        additem={this.addItem}
                                        selectallsubsubcategories={this.selectAllSubSubCategories}
                                        selectallsubcategories={this.selectAllSubCategories}
                                    />
                                )}
                            </SubMenu> */}
                  {/* <SubMenu key="Nationality" title="Nationality">
                                {this.state.nationality.map(nation => <Menu.Item key={nation.nationality}><Checkbox onClick={(e) => this.addItem('nationalities', nation.id, e)}>{nation.nationality}</Checkbox></Menu.Item>)}
                            </SubMenu> */}
                  <SubNationality
                    nationality={this.state.nationality}
                    additem={this.addItem}
                    selectAllNationalities={this.selectAllNationalities}
                  />
                  <Item>
                    <Button
                      onClick={() => this.checkData(checkCity)}
                      icon={<CaretRightOutlined />}
                    >
                      Render Tables
                    </Button>
                  </Item>
                </Menu>
              ) : (
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                    display: "flex",
                    justifyContent: "center",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                  theme={"light"}
                >
                  <div
                    style={{
                      alignSelf: "center",
                    }}
                  >
                    <Loader
                      type="Oval"
                      color="#00BFFF"
                      height={100}
                      width={100}
                    ></Loader>
                  </div>
                </Menu>
              )}
            </Sider>
            <Layout
              style={{
                margin: "0 5px",
                padding: "0 24px 24px",
                backgroundColor: "white",
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                }}
              >
                {this.state.postObject.cities.length > 0 && (
                  <h4>
                    SELECTIONS MADE<br></br>
                    Selected City : <small>{checkCity}</small>
                    <br></br>
                    Selceted Zones : <small>{checkZones}</small>
                  </h4>
                )}
                {this.state.postObject.years.length > 0 && (
                  <h4>
                    Selected Years : <small>{checkYear}</small>
                  </h4>
                )}
                {this.state.postObject.nationalities.length > 0 && (
                  <h4>
                    Selected Nationality : <small>{checkNationality}</small>
                  </h4>
                )}

                {this.state.alertOpenInvalid && (
                  <div ref={this.setWrapperRef}>
                    <div className="card1 transition">
                      <h2 className="transition3">Warning !</h2>
                      <h4 className="transition2">
                        <small>Please Select all required options</small>
                      </h4>
                      <div className="cta-container transition">
                        <a
                          href="#"
                          onClick={() => this.ModalHandlerClose()}
                          className="cta"
                        >
                          OK
                        </a>
                      </div>
                      <div className="card_circle transition"></div>
                    </div>
                  </div>
                )}
                {this.state.subscriptionAlertOpen && (
                  <SubscriptionAlert
                    registered={this.state.registeredUser}
                    handleSubscriptionAlert={this.handleSubscriptionAlert}
                    showOneTimeSubPopUp={this.showOneTimeSubPopUp}
                    handleCancelPopUp={this.handleCancelPopUp}
                  />
                )}
                {this.state.oneTimeSubPopUpOpen && (
                  <OneTimeSubPopUp
                    hideOneTimeSubPopUp={this.hideOneTimeSubPopUp}
                  />
                )}
                {this.state.cancelPopUpOpen && (
                  <CancelPopUp handleCancelPopUp={this.handleCancelPopUp} />
                )}
                <Modal
                  open={this.state.isModalOpen}
                  onClose={() => this.setState({ isModalOpen: false })}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "0",
                  }}
                >
                  <div className="formatSelectionModal">
                    <h3>How do you want your data to be displayed?</h3>
                    {/* <Button className="button" onClick={() => this.postData('distinct')} type="primary" size="large">Distinct</Button>
                                    <Button className="button" onClick={() => this.postData('zones')} type="primary" size="large">Category Wise</Button>
                                    <Button className="button" onClick={() => this.postData('nationality')} type="primary" size="large">Zone Wise</Button> */}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.income_checked}
                        onClick={() =>
                          this.setState({ income_checked: !income_checked })
                        }
                      >
                        Income Levels
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.nationality_checked}
                        onClick={() =>
                          this.setState({
                            nationality_checked: !nationality_checked,
                          })
                        }
                      >
                        Nationality Distribution
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.age_checked}
                        onClick={() =>
                          this.setState({ age_checked: !age_checked })
                        }
                      >
                        Age Distribution
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.families_checked}
                        onClick={() =>
                          this.setState({ families_checked: !families_checked })
                        }
                      >
                        Percentage Without Families but not Labourers
                      </Checkbox>
                    )}
                    <p></p>
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.labourers_checked}
                        onClick={() =>
                          this.setState({
                            labourers_checked: !labourers_checked,
                          })
                        }
                      >
                        Percentage Labourers
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.population_checked}
                        onClick={() =>
                          this.setState({
                            population_checked: !population_checked,
                          })
                        }
                      >
                        Population (Free)
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.capita_checked}
                        onClick={() =>
                          this.setState({ capita_checked: !capita_checked })
                        }
                      >
                        Retail Spend Per Capita
                      </Checkbox>
                    )}

                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.income_checked}
                        disabled
                        onClick={() =>
                          this.setState({ income_checked: !income_checked })
                        }
                      >
                        Income Levels
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.nationality_checked}
                        disabled
                        onClick={() =>
                          this.setState({
                            nationality_checked: !nationality_checked,
                          })
                        }
                      >
                        Nationality Distribution
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.age_checked}
                        disabled
                        onClick={() =>
                          this.setState({ age_checked: !age_checked })
                        }
                      >
                        Age Distribution
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.families_checked}
                        disabled
                        onClick={() =>
                          this.setState({ families_checked: !families_checked })
                        }
                      >
                        Percentage Without Families but not Labourers
                      </Checkbox>
                    )}
                    <p></p>
                    {this.state.postObject.nationalities.length > 0 && (
                      <Checkbox
                        checked={this.state.labourers_checked}
                        disabled
                        onClick={() =>
                          this.setState({
                            labourers_checked: !labourers_checked,
                          })
                        }
                      >
                        Percentage Labourers
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.population_checked}
                        disabled
                        onClick={() =>
                          this.setState({
                            population_checked: !population_checked,
                          })
                        }
                      >
                        Population (Free)
                      </Checkbox>
                    )}
                    {this.state.postObject.nationalities.length < 1 && (
                      <Checkbox
                        checked={this.state.capita_checked}
                        disabled
                        onClick={() =>
                          this.setState({ capita_checked: !capita_checked })
                        }
                      >
                        Retail Spend Per Capita
                      </Checkbox>
                    )}

                    {this.state.capita_checked &&
                      this.state.postObject.nationalities.length < 1 && (
                        <p>
                          {" "}
                          <p></p>
                          {data.category.map((category) => (
                            <Checkbox
                              disabled
                              value={category.id}
                              onClick={this.handleChange}
                            >
                              {category.name}
                            </Checkbox>
                          ))}
                        </p>
                      )}
                    {this.state.capita_checked &&
                      this.state.postObject.nationalities.length > 0 && (
                        <p>
                          {" "}
                          <p></p>
                          {data.category.map((category) => (
                            <Checkbox
                              value={category.id}
                              onClick={this.handleChange}
                            >
                              {category.name}
                            </Checkbox>
                          ))}
                        </p>
                      )}

                    <p></p>

                    <Button
                      className="button"
                      type="primary"
                      size="large"
                      onClick={() => this.postData()}
                    >
                      Submit
                    </Button>
                  </div>
                </Modal>

                {this.state.tableData && this.state.tableData.length > 0 && (
                  <div style={{ textAlign: "right", margin: "10px" }}>
                    <CSVLink
                      onClick={this.getCsvData}
                      data={this.state.csvData}
                    >
                      <Button icon={<DownloadOutlined />}>Download CSV</Button>
                    </CSVLink>
                  </div>
                )}

                {this.state.loading &&
                  this.state.tableData &&
                  this.state.sendnow && (
                    <DemographicTables
                      data={Table}
                      datatable={Table}
                      displayMode={this.state.displayMode}
                    ></DemographicTables>
                  )}
              </Content>
            </Layout>
          </Layout>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Demographic;
