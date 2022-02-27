import React, { Component } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "./Dashboard/Alert";
import SubscriptionAlert from "./Dashboard/SubscriptionAlert";
import OneTimeSubPopUp from "./Dashboard/OneTimeSubPopUp";
import CancelPopUp from "./Dashboard/CancelPopUp";

import axios from "axios";
import * as _ from "lodash";

import rendercsv from "../utils/rendercsv";
import renderExcel from "../utils/renderExcel";
import getUserDetail from "../utils/getUserDetail";
import { sortZones } from "../utils/sort";
import { CSVLink } from "react-csv";
import PdfDownloader from './pdfDownloader'

import { Layout, Menu, Checkbox, Button, Radio, Space } from "antd";
import { CaretRightOutlined, DownloadOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";

import "../css/modal.css";
import "../css/dashboard.css";

import SubCategory from "./Dashboard/Menu/SubCategory";
import SubCity from "./Dashboard//Menu/SubCity";
import Tables from "./Dashboard/Tables";
import SubNationality from "./Dashboard/Menu/SubNationality";
import SubMonths from "./Dashboard/Menu/SubMonths";
import PurchaseMode from "./Dashboard/Menu/PurchaseMode";

import { Modal } from "@material-ui/core";
import ButtonMui from '@material-ui/core/Button';

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CityIcon from "@material-ui/icons/LocationCity";
import YearIcon from "@material-ui/icons/CalendarToday";
import CategoryIcon from "@material-ui/icons/Category";
import NationalityIcon from "@material-ui/icons/Public";
import PlaceIcon from '@material-ui/icons/Place';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Download from "@material-ui/icons/CloudDownload";

import Footer from "./Footer";
import NavTwo from "./NavTwo";
import PlaceOfPurchase from "./Dashboard/Menu/PlaceOfPurchase";
let optionData = require("./Dashboard/optionData.json");

const { SubMenu, Item } = Menu;
const { Content, Sider, Header } = Layout;

// pdf downloader
// const API_URL = "http://ec2-3-219-204-162.compute-1.amazonaws.com/api/filter";
const API_URL = "http://3.108.159.143:8000/api/filter";
const CANCEL_URL = "https://merd.online/subscription-process-cancel/";
// const API_URL = "http://localhost:8000/api/filter";

export class NewDashboard extends Component {
  constructor(props) {
    super(props);
    this.dataToBeEmailed = null;

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
      notSubscribed: {
        cities: [],
        catgs: [],
      },
      selectedCities: [],
      selectedCatgs: [],
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
      siderWidth: 300,
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  ModalHandlerClose = async () => {
    this.setState({ alertOpen: false, alertOpenInvalid: false });
  };

  setWrapperRef = (node) => {
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

  scrollToTop = () => {
    this.top.scrollIntoView({ behavior: "auto" });
  };

  //GET request
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    window.scrollTo(0, 0); //scrolls to the top, on loading, otherwise scrolls to footer.
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
    this.setState({ subscriber: true });
    const isSubscribed = this.checkUserRights();

    console.log(isSubscribed);

    if (!isSubscribed) {
      this.setState({ subscriber: false, subscriptionAlertOpen: true });
      console.log("not subscribed to the data");
      return false;
    }

    // this.setState({ postObject: isSubscribed });
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
      alert("Please Select all required options");
      this.setState({ isModalOpen: false, alertOpenInvalid: true });
      console.log(this.state.postObject);
      return;
    }

    this.setState({ displayMode: displayMode });
    this.setState({ isModalOpen: false });
    //changing tableData to [] so loading screen appears again in Table.js
    this.setState({ tableData: [] });
    this.setState({ loading: true });
    // this.setState({ siderWidth: 0 });

    let dataToBePost = isSubscribed.postObject;
    console.log(dataToBePost);
    dataToBePost["filter_type"] = displayMode;

    axios
      .post(API_URL, dataToBePost)
      .then((res) => {
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
    this.setState({ alertOpenInvalid: false });
    if (!state) this.submitForm(this.dataToBeEmailed, false);
  };

  hideOneTimeSubPopUp = () => {
    this.setState({ oneTimeSubPopUpOpen: false });
    this.setState({ subscriptionAlertOpen: false });
    this.submitForm(this.dataToBeEmailed, true);
  };

  submitForm = (data, oneTime) => {
    const user = getUserDetail();

    let formTarget = user.username ? "hidden-frame" : "_blank";
    formTarget = "_blank";

    let form = document.createElement("form");
    form.style.visibility = "hidden"; // no user interaction is necessary
    form.method = "POST"; // forms by default use GET query strings
    form.target = formTarget;
    form.action = CANCEL_URL;
    if (oneTime) {
      let input = document.createElement("input");
      input.name = "type";
      input.value = "One Time Buy";
      form.appendChild(input);
      if (user.username) {
        input = document.createElement("input");
        input.name = "username";
        input.value = user.username;
        form.appendChild(input);
      }
      for (let attribute in data) {
        input = document.createElement("input");
        input.name = attribute;
        input.value = data[attribute].join();
        form.appendChild(input);
      }
    } else {
      let input = document.createElement("input");
      input.name = "type";
      input.value = "Cancel";
      form.appendChild(input);

      input = document.createElement("input");
      input.name = "username";
      input.value = user.username;
      form.appendChild(input);
      for (let attribute in data) {
        input = document.createElement("input");
        input.name = attribute;
        input.value = data[attribute].join();
        form.appendChild(input);
      }
    }
    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit();
  };

  checkData = () => {
    let isEmpty = false;
    let isCatEmpty = false;
    this.setState({ subscriber: true });
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
      this.setState({
        isModalOpen: false,
        alertOpenInvalid: true,
      });
      console.log("invalid");
      return;
    } else {
      this.setState({ isModalOpen: true, alertOpenInvalid: false });
    }
  };

  getCsvData = () => {
    //Passing control to utils/rendercsv for the generation of csv-react readable data (Multidimensional Array)
    const cities = this.state.cities;
    const subcities = this.state.postObject.cities;
    const subzones = this.state.postObject.zones;

    const checkCity = [];
    const checkZone = [];
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
        }
      });
    });

    const zones = this.zonesToCity(checkZone);

    let nationalities = [];

    const nat = this.state.nationality;
    const subnat = this.state.postObject.nationalities;
    nat.forEach((data) => {
      subnat.forEach((data2) => {
        if (data.id === data2) {
          nationalities.push(data.nationality);
        }
      });
    });
    if (nationalities.length === this.state.nationality.length)
      nationalities = ["All Nationalities"];

    let csvData = rendercsv(
      this.state.tableData,
      this.state.postObject.months,
      this.state.displayMode,
      this.state.postObject.purchaseMode,
      this.state.postObject.placeOfPurchase,
      zones,
      nationalities
    );

    //If data received, update state. *May not need this if condition
    if (csvData) {
      this.setState({ csvData });
    }
    console.log(csvData, "csvDaata")
    return csvData;

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
  getPurchaseModePlace = () => {
    let finalStr = "";
    let placeStr = "";
    const purchasePlace = this.state.postObject.placeOfPurchase;
    if (purchasePlace.length == 0) placeStr = "Select Place Of Purchase";
    else if (purchasePlace.length === 2)
      placeStr = "In City And OutSide City";
    else if (purchasePlace[0] == "in") placeStr = "In City";
    else if (purchasePlace[0] == "out") placeStr = "OutSide City";

    let modeStr = "";

    const mode = this.state.postObject.purchaseMode;

    if (mode.length == 0) modeStr = "Select Mode Of Purchase";
    else if (mode.length === 2) modeStr = "Online and Offline Both";
    else if (mode[0] == "online") modeStr = "Only Online Mode";
    else if (mode[0] == "offline") modeStr = "Only Offline Mode";

    // finalStr = modeStr + placeStr;
    return placeStr;
  };
  getPurchaseMode = () => {
    let finalStr = "";
    let placeStr = "";
    const purchasePlace = this.state.postObject.placeOfPurchase;
    if (purchasePlace.length == 0) placeStr = "Select Place Of Purchase";
    else if (purchasePlace.length === 2)
      placeStr = "Inside the city and outside the city.";
    else if (purchasePlace[0] == "in") placeStr = "Inside the Cities";
    else if (purchasePlace[0] == "out") placeStr = "Outside the Cities";

    let modeStr = "";

    const mode = this.state.postObject.purchaseMode;

    if (mode.length == 0) modeStr = "Select Mode Of Purchase";
    else if (mode.length === 2) modeStr = "Online and Offline Both.";
    else if (mode[0] == "online") modeStr = "Only Online Mode.";
    else if (mode[0] == "offline") modeStr = "Only Offline Mode.";


    return modeStr;
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
  zonesToCity = (zones) => {
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
    console.log(this.insertCommas(finalStr));
    return this.insertCommas(finalStr);
  };

  getCategory = (id, propertyName) => {
    if (propertyName == "category") {
      let category = this.state.category.find((cat) => cat.id === id);
      return { name: category.name, id: category.id };
    } else if (propertyName === "subcategory") {
      let category = {};
      this.state.category.forEach((cat) => {
        cat.sub_category.forEach((sub_cat) => {
          if (sub_cat.id === id) {
            category.name = cat.name;
            category.id = cat.id;
            return;
          }
        });
      });
      return category;
    } else if (propertyName === "subsubcategory") {
      let category = {};
      this.state.category.forEach((cat) => {
        cat.sub_category.forEach((sub_cat) => {
          sub_cat.sub_sub_category.forEach((sub_sub_cat) => {
            if (sub_sub_cat.id === id) {
              category.name = cat.name;
              category.id = cat.id;
              return;
            }
          });
        });
      });
      return category;
    }
  };

  getDataToEmail = (postData) => { };

  checkUserRights = () => {
    const userDetails = getUserDetail();
    const citiesSelected = this.state.postObject.cities;
    const catgSeleted = this.state.postObject.categories;
    const subCatgSelected = this.state.postObject.subCategories;
    const subSubCatgSelected = this.state.postObject.subSubCategories;

    let dataToBeEmailed = {
      cities: [],
      categories: [],
      years: this.state.postObject.years,
      months: [],
      nationalities: [],
      placeOfPurchase: this.state.postObject.placeOfPurchase,
      purchaseMode: this.state.postObject.purchaseMode,
    };

    citiesSelected.forEach((city) => {
      this.state.cities.forEach((cityOption) => {
        if (city === cityOption.id) {
          dataToBeEmailed.cities = [...dataToBeEmailed.cities, cityOption.city];
        }
      });
    });

    dataToBeEmailed.categories = catgSeleted.map(
      (catg) => this.getCategory(catg, "category").name
    );
    dataToBeEmailed.categories = [
      ...dataToBeEmailed.categories,
      ...subCatgSelected.map((sc) => this.getCategory(sc, "subcategory").name),
    ];
    dataToBeEmailed.categories = [
      ...dataToBeEmailed.categories,
      ...subSubCatgSelected.map(
        (ssc) => this.getCategory(ssc, "subsubcategory").name
      ),
    ];

    dataToBeEmailed.categories = [...new Set(dataToBeEmailed.categories)];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    dataToBeEmailed.months = this.state.postObject.months.map(
      (mon) => monthNames[mon - 1]
    );

    this.state.nationality.forEach((natOption) => {
      this.state.postObject.nationalities.forEach((nat) => {
        if (natOption.id === nat) {
          dataToBeEmailed.nationalities.push(natOption.nationality);
        }
      });
    });

    this.dataToBeEmailed = dataToBeEmailed;

    console.log(dataToBeEmailed);

    if (userDetails.username) {
      const citiesSubscribed = [];

      userDetails.cities.forEach((city) => {
        this.state.cities.forEach((cityOption) => {
          if (city === cityOption.city) {
            citiesSubscribed.push(cityOption.id);
          }
        });
      });

      const catgSubscribed = [];

      userDetails.categories.forEach((catg) => {
        this.state.category.forEach((catgOption) => {
          if (catg === catgOption.name) {
            catgSubscribed.push(catgOption.id);
          }
        });
      });

      const subCatIntersection = subCatgSelected.filter((subSel) => {
        const catId = this.getCategory(subSel, "subcategory").id;
        if (catgSubscribed.includes(catId)) {
          return subSel;
        }
      });

      const subsubCatIntersection = subSubCatgSelected.filter((subSubSel) => {
        const catId = this.getCategory(subSubSel, "subsubcategory").id;
        if (catgSubscribed.includes(catId)) {
          return subSubSel;
        }
      });

      const cityIntersection = [];
      const cityNotSubscribed = [];
      citiesSelected.forEach((city) => {
        if (citiesSubscribed.includes(city)) {
          cityIntersection.push(city);
        } else {
          cityNotSubscribed.push(city);
        }
      });
      const catgIntersection = [];
      const catgNotSubscribed = [];
      catgSeleted.forEach((cat) => {
        if (catgSubscribed.includes(cat)) {
          catgIntersection.push(cat);
        } else {
          catgNotSubscribed.push(cat);
        }
      });

      this.setState({
        notSubscribed: {
          cities: cityNotSubscribed,
          catgs: catgNotSubscribed,
        },
      });

      if (
        catgIntersection.length === 0 &&
        subCatIntersection.length === 0 &&
        subsubCatIntersection.length === 0
      ) {
        this.setState({ subscriber: false });
        return false;
      }

      if (cityIntersection.length === 0) {
        this.setState({ subscriber: false });
        return false;
      }

      if (
        cityIntersection.length !== citiesSelected.length ||
        catgIntersection.length !== catgSeleted.length ||
        subCatIntersection.length !== subCatgSelected.length ||
        subsubCatIntersection.length !== subSubCatgSelected.length
      ) {
        this.setState({ subscriber: false, alertOpenInvalid: true });
      }

      let allowedData = this.state.postObject;
      allowedData.cities = cityIntersection;
      allowedData.categories = catgIntersection;
      allowedData.subCategories = subCatIntersection;
      allowedData.subSubCategories = subsubCatIntersection;

      return {
        postObject: allowedData,
        selectedCities: citiesSelected,
        selectedCatgs: catgSeleted,
      };
    } else {
      this.setState({ registeredUser: false });
      return false;
    }
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
          }
        });
      });
      checkNationality = this.insertCommas(checkNationality);
    }

    return (
      <div style={{ position: "relative" }}>
        <div
          ref={(el) => (this.top = el)}
          style={{ position: "absolute", top: 0, left: 0 }}
        ></div>{" "}
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
              // height: "1000vh",
              // overflowY: "auto",
            }}
          >

            <Sider
              width={this.state.siderWidth}
              className="site-layout-background"
            >
              <h2 className="text-lg text-slate-500 pl-3 font-semibold capitalize bg-white">Make selections in the panel <br />  to view market sizes</h2>

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
                  <div className="view-market-size-div" style={{ textAlign: "center" }}>
                    <Item>
                      <span className="view-market-size-btn">
                        <Button
                          style={{ all: "unset" }}
                          onClick={() => this.checkData()}

                        >
                          <span className="view-market-size-btn-text " >
                            View Market Size
                          </span>
                        </Button>
                      </span>
                    </Item>
                  </div>
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
            {/* <span
              onClick={() =>
                this.setState({
                  siderWidth: this.state.siderWidth === 300 ? 0 : 300,
                })
              }
              className="menu-expand-more"
            >
              {this.state.siderWidth === 0 ? (
                <RightOutlined style={{ fontSize: "2rem" }} />
              ) : (
                <LeftOutlined style={{ fontSize: "2rem" }} />
              )}
            </span> */}
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
                  <Typography className="selection-made-text">
                    You Are Viewing Market Size For:
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="dashboard-avatar">
                          <div className="dashboard-icon">
                            <CityIcon className="dashboard-icon-inner" />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Cities & Zones"
                        secondary={
                          this.state.postObject.cities.length > 0
                            ? this.zonesToCity(checkZone)
                            : "Select Cities & Zones"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <div className="dashboard-icon">
                            <YearIcon className="dashboard-icon-inner" />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Years and Months"
                        secondary={
                          (this.state.postObject.months.length > 0
                            ? checkMonth.length === 12 //if all the months are selected
                              ? "Months:- The whole year"
                              : "Months :- " + checkMonth
                            : "Select Months") +
                          (this.state.postObject.years.length > 0
                            ? ", Years :-  " + checkYear
                            : ", Select Years")
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <div className="dashboard-icon">
                            <CategoryIcon className="dashboard-icon-inner" />
                          </div>
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
                            : "Select Categories"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <div className="dashboard-icon">
                            <NationalityIcon className="dashboard-icon-inner" />
                          </div>
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
                            : "Select Nationalities"
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <div className="dashboard-icon">
                            <PlaceIcon className="dashboard-icon-inner" />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Place Of Purchase"
                        secondary={this.getPurchaseModePlace()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <div className="dashboard-icon">
                            <ShoppingCartIcon className="dashboard-icon-inner" />
                          </div>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Purchase Mode"
                        secondary={this.getPurchaseMode()}
                      />
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              {this.state.alertOpenInvalid &&
                (this.state.subscriber ? (
                  <Alert
                    // title={<span style={{ color: "#fff" }}>Caution!</span>}
                    contentText={"You Need To Select All Filters Before Viewing Market Size"}
                    btnText={"OK"}
                    ModalHandlerClose={this.ModalHandlerClose}
                  />
                ) : (
                  <SubscriptionAlert
                    registered={this.state.registeredUser}
                    handleSubscriptionAlert={this.handleSubscriptionAlert}
                    showOneTimeSubPopUp={this.showOneTimeSubPopUp}
                    handleCancelPopUp={this.handleCancelPopUp}
                  />
                ))}
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
                        className="formatSelectionOptions"
                        value="distinct"
                        onClick={() =>
                          this.setState({ displayMode: "distinct" })
                        }
                        type="primary"
                        size="large"
                      >
                        <span className="formatSelectionOptions">
                          Broken down in detail (by category, nationality,
                          neighbourhood and time frame){" "}
                        </span>
                      </Radio>
                      <Radio
                        className="formatSelectionOptions"
                        value="nationality"
                        onClick={() =>
                          this.setState({ displayMode: "nationality" })
                        }
                        type="primary"
                        size="large"
                      >
                        <span className="formatSelectionOptions">
                          Broken down by neighbourhood and category with all
                          months in a year added{" "}
                        </span>
                      </Radio>
                      <Radio
                        className="formatSelectionOptions"
                        value="zones"
                        onClick={() => this.setState({ displayMode: "zones" })}
                        type="primary"
                        size="large"
                      >
                        <span className="formatSelectionOptions">
                          Broken down by category only with all months in a year
                          added{" "}
                        </span>
                      </Radio>
                    </Space>
                  </Radio.Group>
                  <div className="formatSelctionButtons-div">
                    <Button
                      style={{ all: "unset" }}
                      disabled={this.state.displayMode !== null ? false : true}
                      onClick={() => this.postData(this.state.displayMode)}
                    >
                      <span className="formatSelctionButtons cta">
                        Generate Tables
                      </span>
                    </Button>
                    <Button
                      style={{ all: "unset" }}
                      onClick={() => this.setState({ isModalOpen: false })}
                    >
                      <span className="formatSelctionButtons cta">Close</span>
                    </Button>
                  </div>
                </div>
              </Modal>
              <div style={{ textAlign: "right", margin: "10px" }}>
                {/* {this.state.registeredUser && (
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
                </Checkbox> */}
                {/* <CSVLink onClick={this.getCsvData} data={this.state.csvData}> */}
                {/* removee */}
                {
                  this.state.displayMode == 'distinct' ?
                    ""
                    : <ButtonMui
                      variant="contained" endIcon={<Download />} color="primary"
                      disabled={this.state.tableData.length > 0 ? false : true}
                      onClick={() => renderExcel(this.getCsvData())}
                    >
                      Export Excel
                    </ButtonMui>
                }

                {/* <Button
                  icon={<DownloadOutlined />}
                  disabled={this.state.tableData.length > 0 ? false : true}
                  onClick={() => PdfDownloader(this.getCsvData())}
                >
                  Download pdf

                </Button> */}
                {/* removee */}

                {/* </CSVLink> */}
              </div>
              {!this.state.registeredUser ? (
                <h1 style={{ fontSize: "1.5rem" }}>
                  You need to subscribe to access data.
                </h1>
              ) : (
                this.state.loading && (
                  <div style={{ marginBlock: "4rem" }}>
                    <Tables
                      data={this.state.tableData}
                      displayMode={this.state.displayMode}
                      purchaseMode={this.state.postObject.purchaseMode}
                      placeOfPurchase={this.state.postObject.placeOfPurchase}
                      months={
                        checkMonth.length === 12 //if all the months are selected
                          ? "The whole year"
                          : checkMonth
                      }
                      nationalities={
                        this.state.postObject.nationalities.length > 0
                          ? checkNationality.length === //if all the nationalities are checked
                            this.state.nationality.length
                            ? "All Nationalities"
                            : checkNationality
                          : "Select Nationalities"
                      }
                      zones={this.zonesToCity(checkZone)}
                    ></Tables>
                  </div>
                )
              )}
            </Content>
          </Layout>
        </div>
        {/* TODO:to ask them if its */}

        <iframe name="hidden-frame" style={{ visibility: "hidden" }}></iframe>
        <Footer />
      </div>
    );
  }
}

export default NewDashboard;
