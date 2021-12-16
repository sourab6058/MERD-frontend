import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "./Dashboard/Alert";
import SubscriptionAlert from "./Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "./Dashboard/OneTimeSubPopUp";
import CancelPopUp from "./Dashboard/CancelPopUp";

import axios from "axios";
import * as _ from "lodash";

import rendercsv from "../utils/rendercsv";
import { sortZones } from "../utils/sort";
import { CSVLink } from "react-csv";

import { Layout, Menu, Checkbox, Button, Radio, Space } from "antd";
import { CaretRightOutlined, DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import "../css/modal.css";

import SubCategory from "./Dashboard/Menu/SubCategory";
import SubCity from "./Dashboard//Menu/SubCity";
import Tables from "./Dashboard/Tables";
import SubNationality from "./Dashboard/Menu/SubNationality";
import SubMonths from "./Dashboard/Menu/SubMonths";
import PurchaseMode from "./Dashboard/Menu/PurchaseMode";

import { Modal } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CityIcon from "@material-ui/icons/LocationCity";
import YearIcon from "@material-ui/icons/CalendarToday";
import CategoryIcon from "@material-ui/icons/Category";
import NationalityIcon from "@material-ui/icons/Public";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Footer from "./Footer";
import NavTwo from "./NavTwo";
import PlaceOfPurchase from "./Dashboard/Menu/PlaceOfPurchase";
let optionData = require("./Dashboard/optionData.json");

const { SubMenu, Item } = Menu;
const { Content, Sider, Header } = Layout;

// const API_URL = "http://ec2-3-219-204-162.compute-1.amazonaws.com/api/filter";
const API_URL = "http://3.108.159.143:8000/api/filter";

export class NewDashboard extends Component {
  constructor(props) {
    super(props);

    //optionData is the raw data received from the backend
    //All other array variables are used to render the menu
    //postObject is the object that gets constructed for POST

    this.state = {
      optionData: [],
      tableData: [],
      cities: [],
      zones: [],
      years: [],
      category: [],
      nationality: [],
      postObject: {
        cities: [],
        zones: [],
        years: [],
        months: [],
        categories: [],
        subCategories: [],
        subSubCategories: [],
        nationalities: [],
        purchaseMode: [],
        placeOfPurchase: [],
      },
      registeredUser: true,
      loading: false,
      csvData: [],
      menuLoading: true,
      isModalOpen: false,
      displayMode: "distinct",
      alertOpen: true,
      alertOpenInvalid: false,
      openUploadLinks: false,
      uploadLinkOpenerText: "Open file upload links",
      selectionListExpanded: false,
      subscriber: true,
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

  handleSubscriber = (e) => {
    this.setState({ subscriber: e.target.checked });
  };

  handleRegistered = (e) => {
    if (!e.target.checked) this.setState({ subscriber: false });
    this.setState({ registeredUser: e.target.checked });
  };

  scrollToTop = () => {
    this.top.scrollIntoView({ behavior: "auto" });
  };

  //GET request
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.scrollToTop(); //scrolls to the top, on loading, otherwise scrolls to footer.
    this.createData(optionData);
    // axios
    //   .get(API_URL)
    //   .then((res) => {
    //     let optionData = Object.entries(res.data.filters[0]);
    //     optionData = sortZones(optionData);
    //     console.log("optionData", optionData);
    //     this.createData(optionData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  postData = (displayMode) => {
    this.checkSubscription();
    if (!this.state.registeredUser || !this.state.subscriber) return false;
    let isEmpty = false;
    let isCatEmpty = false;
    if (this.state.postObject.cities.length === 0) isEmpty = true;
    if (this.state.postObject.zones.length === 0) isEmpty = true;
    if (this.state.postObject.nationalities.length === 0) isEmpty = true;
    if (this.state.postObject.months.length === 0) isEmpty = true;
    if (this.state.postObject.years.length === 0) isEmpty = true;
    if (
      this.state.postObject.categories.length === 0 &&
      this.state.postObject.subCategories.length === 0 &&
      this.state.postObject.subSubCategories.length === 0
    )
      isCatEmpty = true;

    if (isEmpty || isCatEmpty) {
      // alert('Please Select all required options');
      this.setState({ isModalOpen: false, alertOpenInvalid: true });
      return;
    }

    this.setState({ displayMode: displayMode });
    this.setState({ isModalOpen: false });
    //changing tableData to [] so loading screen appears again in Table.js
    this.setState({ tableData: [] });
    this.setState({ loading: true });

    let dataToBePost = this.state.postObject;
    dataToBePost["filter_type"] = displayMode;
    console.log("datatobePost", dataToBePost);

    axios
      .post(API_URL, dataToBePost)
      .then((res) => {
        console.log("POST request succesful.");
        console.log(res.data.results);
        let tableData = res.data.results;
        this.setState({ tableData });
      })
      .catch((err) => {
        console.log(err);
      });
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

  checkData = () => {
    let isEmpty = false;
    let isCatEmpty = false;
    if (this.state.postObject.cities.length === 0) isEmpty = true;
    if (this.state.postObject.zones.length === 0) isEmpty = true;
    if (this.state.postObject.nationalities.length === 0) isEmpty = true;
    if (this.state.postObject.months.length === 0) isEmpty = true;
    if (this.state.postObject.years.length === 0) isEmpty = true;
    if (this.state.postObject.purchaseMode.length === 0) isEmpty = true;
    if (this.state.postObject.placeOfPurchase.length === 0) isEmpty = true;
    if (
      this.state.postObject.categories.length === 0 &&
      this.state.postObject.subCategories.length === 0 &&
      this.state.postObject.subSubCategories.length === 0
    )
      isCatEmpty = true;

    if (isEmpty || isCatEmpty) {
      // alert('Please Select all required options');
      this.setState({ isModalOpen: false, alertOpenInvalid: true });
      console.log("Invalid");
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

  selectAllPurchaseMode = (e) => {
    let tempData = this.state.postObject;
    if (e.target.checked) {
      let purchaseMode = ["online", "offline"];
      tempData = { ...tempData, purchaseMode };
      this.setState({ postObject: tempData });
    } else {
      tempData = { ...tempData, purchaseMode: [] };
      this.setState({ postObject: tempData });
    }
  };

  selectAllPlaceOfPurchase = (e) => {
    let tempData = this.state.postObject;
    if (e.target.checked) {
      let placeOfPurchase = ["in", "out"];
      tempData = { ...tempData, placeOfPurchase };
      this.setState({ postObject: tempData });
    } else {
      tempData = { ...tempData, placeOfPurchase: [] };
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
      tempData[whereToBePushed].splice(1);
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
  };

  addMonths = (months) => {
    const tempData = this.state.postObject;
    tempData.months = months;
    this.setState({ postObject: tempData });
  };

  insertCommas = (list) => {
    // returns an array of items with commas at the end, except the last item
    return list.map((item, idx) => {
      if (idx < list.length - 1) return item + ", ";
      else return item;
    });
  };

  categoryDisplayer = (cat, sub, subsub) => {
    let catArray = [];
    let subObject = {};
    let subsubObject = {};
    if (cat.length > 0) {
      catArray = cat.map((item) => item.toUpperCase() + ">All items");
      catArray = [...new Set(catArray)];
    }
    if (sub.length > 0) {
      for (let category of this.state.category) {
        for (let subItem of sub) {
          if (
            category.sub_category.some((sub_cat) => sub_cat.name === subItem)
          ) {
            if (subObject.hasOwnProperty(category.name)) {
              subObject[category.name].push(subItem);
            } else {
              subObject[category.name] = [subItem];
            }
          }
        }
      }
    }
    if (subsub.length > 0) {
      const categories = this.state.category;
      for (let subsubItem of subsub) {
        for (let category of categories) {
          for (let subcategory of category.sub_category) {
            if (
              subcategory.sub_sub_category.some((el) => el.name === subsubItem)
            ) {
              if (subsubObject.hasOwnProperty(category.name)) {
                if (
                  subsubObject[category.name].hasOwnProperty(subcategory.name)
                ) {
                  subsubObject[category.name][subcategory.name].push(
                    subsubItem
                  );
                } else {
                  subsubObject[category.name][subcategory.name] = [subsubItem];
                }
              } else {
                subsubObject[category.name] = {};
                subsubObject[category.name][subcategory.name] = [subsubItem];
              }
            }
          }
        }
      }
    }

    let finalStr = [...catArray];
    console.log(subObject);
    for (let [key, values] of Object.entries(subObject)) {
      finalStr.push(`${key.toUpperCase()}>${values}>All Items`);
    }
    for (let [category, subcategory] of Object.entries(subsubObject)) {
      for (let [subcat, subsubcategory] of Object.entries(subcategory)) {
        finalStr.push(`${category.toUpperCase()}>${subcat}>${subsubcategory}`);
      }
    }
    return this.insertCommas(finalStr);
  };
  citiesAndZonesDisplayer = (zones) => {
    const cities = this.state.cities;
    let citiesAndZones = {};
    zones.forEach((zone) => {
      cities.forEach((city) => {
        if (city.zone.some((data) => data.id === zone.id)) {
          if (citiesAndZones.hasOwnProperty(city.city))
            citiesAndZones[city.city].push(zone.zone);
          else citiesAndZones[city.city] = [zone.zone];
        }
      });
    });

    let finalStr = [];
    for (let [city, zones] of Object.entries(citiesAndZones)) {
      let cityItem = "";
      cityItem += city + ">";
      let maxZones = this.state.cities.find((data) => data.city === city).zone
        .length;
      if (zones.length === maxZones) cityItem += "All zones";
      else cityItem += zones;
      finalStr.push(cityItem);
    }
    return this.insertCommas(finalStr);
  };

  render() {
    let checkCity = [];
    let checkZone = [];
    let checkYear = [];
    let checkMonth = [];
    let checkCategory = [];
    let checkSubCategory = [];
    let checkSubSubCategory = [];
    let checkNationality = [];
    if (this.state.postObject.cities.length > 0) {
      const cities = this.state.cities;
      const subcities = this.state.postObject.cities;
      const subzones = this.state.postObject.zones;
      console.log("cities", this.state.cities);
      //checkArray will get all zones of particular city

      //Populating checkArray
      cities.forEach((data) => {
        subcities.forEach((data2) => {
          if (data.id === data2) {
            checkCity.push(data.city);
            data.zone.forEach((id) => {
              subzones.forEach((data3) => {
                if (id.id === data3) {
                  checkZone.push(id);
                }
              });
            });

            console.log("if loop");
            console.log(checkCity);
          }
        });
      });
      checkCity = this.insertCommas(checkCity);
    }
    if (this.state.postObject.years.length > 0) {
      const year = this.state.years;
      const subyear = this.state.postObject.years;
      year.forEach((data) => {
        subyear.forEach((data2) => {
          if (data === data2) {
            checkYear.push(data);

            console.log("if loop");
            console.log(checkYear);
          }
        });
      });
      // checkYear = this.insertCommas(checkYear);
    }
    if (this.state.postObject.months.length > 0) {
      // const year = this.state.years;
      const submonth = this.state.postObject.months;
      submonth.forEach((data) => {
        if (data === 1) {
          checkMonth.push("January");
        }
        if (data === 2) {
          checkMonth.push("February");
        }
        if (data === 3) {
          checkMonth.push("March");
        }
        if (data === 4) {
          checkMonth.push("April");
        }
        if (data === 5) {
          checkMonth.push("May");
        }
        if (data === 6) {
          checkMonth.push("June");
        }
        if (data === 7) {
          checkMonth.push("July");
        }
        if (data === 8) {
          checkMonth.push("August");
        }
        if (data === 9) {
          checkMonth.push("September");
        }
        if (data === 10) {
          checkMonth.push("October");
        }
        if (data === 11) {
          checkMonth.push("November");
        }
        if (data === 12) {
          checkMonth.push("December");
        }
      });
      // checkMonth = this.insertCommas(checkMonth);s
    }
    if (this.state.postObject.categories.length > 0) {
      const cat = this.state.category;
      const subcat = this.state.postObject.categories;
      cat.forEach((data) => {
        subcat.forEach((data2) => {
          if (data.id === data2) {
            checkCategory.push(data.name);

            console.log("if loop");
            console.log("cat", checkCategory);
          }
        });
      });
      // checkCategory = this.insertCommas(checkCategory);
    }
    if (this.state.postObject.subCategories.length > 0) {
      const cat = this.state.category;
      const subcat = this.state.postObject.subCategories;
      cat.forEach((data) => {
        subcat.forEach((data2) => {
          data.sub_category.forEach((data3) => {
            if (data3.id === data2) {
              checkSubCategory.push(data3.name);

              console.log("if loop");
              console.log("sub", checkSubCategory);
            }
          });
        });
      });
      // checkSubCategory = this.insertCommas(checkSubCategory);
    }
    if (this.state.postObject.subSubCategories.length > 0) {
      const cat = this.state.category;
      const subcat = this.state.postObject.subSubCategories;
      cat.forEach((data) => {
        subcat.forEach((data2) => {
          data.sub_category.forEach((data3) => {
            data3.sub_sub_category.forEach((data4) => {
              if (data4.id === data2) {
                checkSubSubCategory.push(data4.name);

                console.log("if loop");
                console.log("subsub", checkSubSubCategory);
              }
            });
          });
        });
      });
      // checkSubSubCategory = this.insertCommas(checkSubSubCategory);
    }
    if (this.state.postObject.nationalities.length > 0) {
      const nat = this.state.nationality;
      const subnat = this.state.postObject.nationalities;
      nat.forEach((data) => {
        subnat.forEach((data2) => {
          if (data.id === data2) {
            checkNationality.push(data.nationality);

            console.log("if loop");
            console.log(checkNationality);
          }
        });
      });
      checkNationality = this.insertCommas(checkNationality);
    }
    console.log("states of market");
    console.log(this.state);

    return (
      <div>
        <div
          ref={(el) => (this.top = el)}
          style={{ position: "absolute", top: 0, left: 0 }}
        ></div>{" "}
        {/* <Nav /> */}
        {this.state.alertOpen && (
          <div ref={this.setWrapperRef}>
            <Alert
              title={"Instructions"}
              contentText={
                "Make selections in the panel on the left to view market sizes."
              }
              btnText={"CONTINUE"}
              ModalHandlerClose={this.ModalHandlerClose}
            />
          </div>
        )}
        <div>
          <Layout>
            <Header style={{ padding: 0, height: "auto", lineHeight: 1.5715 }}>
              <NavTwo />
            </Header>
          </Layout>
          <Layout
            style={{
              height: "90vh",
              overflowY: "auto",
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
                  <SubMonths addmonths={this.addMonths} />
                  <SubMenu key="Category" title="Category">
                    {this.state.category.map((main) => (
                      <SubCategory
                        key={main.id}
                        main={main}
                        additem={this.addItem}
                        selectallsubsubcategories={
                          this.selectAllSubSubCategories
                        }
                        selectallsubcategories={this.selectAllSubCategories}
                      />
                    ))}
                  </SubMenu>
                  {/* <SubMenu key="Nationality" title="Nationality">
                                {this.state.nationality.map(nation => <Menu.Item key={nation.nationality}><Checkbox onClick={(e) => this.addItem('nationalities', nation.id, e)}>{nation.nationality}</Checkbox></Menu.Item>)}
                            </SubMenu> */}
                  <SubNationality
                    nationality={this.state.nationality}
                    additem={this.addItem}
                    selectAllNationalities={this.selectAllNationalities}
                  />
                  <SubMenu key="purchase mode" title="Purchase Mode">
                    <PurchaseMode
                      addItem={this.addItem}
                      selectAllPurchaseMode={this.selectAllPurchaseMode}
                    />
                  </SubMenu>
                  <SubMenu key="place of purchase" title="Place Of Purchase">
                    <PlaceOfPurchase
                      addItem={this.addItem}
                      selectAllPlaceOfPurchase={this.selectAllPlaceOfPurchase}
                    />
                  </SubMenu>
                  <Item>
                    <Button
                      onClick={() => this.checkData()}
                      icon={<CaretRightOutlined />}
                      className="view-market-size-btn"
                    >
                      View Market Size
                    </Button>
                  </Item>
                </Menu>
              ) : (
                <div
                  style={{
                    height: "100%",
                    borderRight: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    background: "white",
                  }}
                  theme={"light"}
                >
                  {[...Array(5)].map((e, i) => (
                    <Skeleton
                      key={i}
                      animation="wave"
                      height={65}
                      width={280}
                    />
                  ))}
                </div>
              )}
            </Sider>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
              }}
            >
              <Accordion
                onChange={() =>
                  this.state.loading &&
                  this.setState({
                    selectionListExpanded: !this.state.selectionListExpanded,
                  })
                }
                expanded={
                  !this.state.loading || this.state.selectionListExpanded
                }
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Selections Made</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Cities and zones"
                        secondary={
                          this.state.postObject.cities.length > 0
                            ? this.citiesAndZonesDisplayer(checkZone)
                            : "Select cities & zones"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <YearIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Years and months"
                        secondary={
                          (this.state.postObject.years.length > 0
                            ? "Years>" + checkYear
                            : "Select years") +
                          (this.state.postObject.months.length > 0
                            ? checkMonth.length === 12 //if all the months are selected
                              ? ", months>The whole year"
                              : ", months>" + checkMonth
                            : ", Select months")
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CategoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Categories"
                        secondary={
                          checkCategory.length > 0 ||
                          checkSubCategory.length > 0 ||
                          checkSubSubCategory.length > 0
                            ? this.categoryDisplayer(
                                checkCategory,
                                checkSubCategory,
                                checkSubSubCategory
                              )
                            : "Select categories"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <NationalityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Nationalities"
                        secondary={
                          this.state.postObject.nationalities.length > 0
                            ? checkNationality.length === //if all the nationalities are checked
                              this.state.nationality.length
                              ? "All Nationalities"
                              : checkNationality
                            : "Select nationalities"
                        }
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              {this.state.alertOpenInvalid && (
                <Alert
                  title={<span style={{ color: "red" }}>Warning !</span>}
                  contentText={"Please Select all required options"}
                  btnText={"OK"}
                  ModalHandlerClose={this.ModalHandlerClose}
                />
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
                {/* <div className="formatSelectionModal">
                                    <h3>How do you want your data to be displayed?</h3>
                                    <Radio className="button" onClick={() => this.postData('distinct')} type="primary" size="large">Broken down in detail (by category, nationality, neighbourhood and time frame) </Radio><br></br>
                                    <Radio className="button" onClick={() => this.postData('nationality')} type="primary" size="large">Broken down by neighbourhood and category with all months in a year added </Radio><br></br>
                                    <Radio className="button" onClick={() => this.postData('zones')} type="primary" size="large">Broken down by category only with all months in a year added </Radio><br></br>
                                    </div> */}
                <div className="formatSelectionModal">
                  <h3>How do you want your data to be displayed?</h3>
                  <Radio.Group
                    name="displayMode"
                    defaultValue={"distinct"}
                    className="radio-grp"
                    value={this.state.displayMode}
                  >
                    <Space direction="vertical">
                      <Radio
                        value="distinct"
                        onClick={() =>
                          this.setState({ displayMode: "distinct" })
                        }
                        type="primary"
                        size="large"
                      >
                        Broken down in detail (by category, nationality,
                        neighbourhood and time frame){" "}
                      </Radio>
                      <Radio
                        value="nationality"
                        onClick={() =>
                          this.setState({ displayMode: "nationality" })
                        }
                        type="primary"
                        size="large"
                      >
                        Broken down by neighbourhood and category with all
                        months in a year added{" "}
                      </Radio>
                      <Radio
                        value="zones"
                        onClick={() => this.setState({ displayMode: "zones" })}
                        type="primary"
                        size="large"
                      >
                        Broken down by category only with all months in a year
                        added{" "}
                      </Radio>
                    </Space>
                  </Radio.Group>
                  <Button
                    disabled={this.state.displayMode !== null ? false : true}
                    onClick={() => this.postData(this.state.displayMode)}
                  >
                    {" "}
                    Generate Tables
                  </Button>
                  <Button onClick={() => this.setState({ isModalOpen: false })}>
                    Close
                  </Button>
                </div>
              </Modal>
              <div style={{ textAlign: "right", margin: "10px" }}>
                {this.state.registeredUser && (
                  <Checkbox
                    onChange={this.handleSubscriber}
                    checked={this.state.subscriber}
                  >
                    Subscriber(for testing)
                  </Checkbox>
                )}
                <Checkbox
                  onChange={this.handleRegistered}
                  checked={this.state.registeredUser}
                >
                  Registered(for testing)
                </Checkbox>
                <CSVLink onClick={this.getCsvData} data={this.state.csvData}>
                  <Button
                    icon={<DownloadOutlined />}
                    disabled={this.state.tableData.length > 0 ? false : true}
                  >
                    Download CSV
                  </Button>
                </CSVLink>
              </div>
              {!this.state.registeredUser ? (
                <h1 align="center">You need to subscribe to access data.</h1>
              ) : (
                this.state.loading && (
                  <Tables
                    data={this.state.tableData}
                    displayMode={this.state.displayMode}
                    purchaseMode={this.state.postObject.purchaseMode}
                  ></Tables>
                )
              )}
            </Content>
          </Layout>
        </div>
        <Footer />
      </div>
    );
  }
}

export default NewDashboard;
