import React, { Component } from "react";
import { Menu, Checkbox, Radio, Modal, Space, Button } from "antd";
import axios from "axios";

import SubMonths from "./Dashboard/Menu/SubMonths";
import SubCategory from "./Dashboard/Menu/SubCategory";
import SubNationality from "./Dashboard/Menu/SubNationality";
import PurchaseMode from "./Dashboard/Menu/PurchaseMode";
import PlaceOfPurchase from "./Dashboard/Menu/PlaceOfPurchase";
import NavTwo from "./NavTwo";
import Footer from "./Footer";
import { sortZones } from "../utils/sort";

import "../css/CatchmentsDashboard.css";

const { SubMenu, Item } = Menu;
const API_URL = "http://3.108.159.143:8000/api/filter";

export default class CatchmentsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      category: [],
      cities: [],
      nationality: [],
      postObject: {
        cities: [1],
        zones: [91, 92],
        years: [],
        months: [],
        categories: [],
        subCategories: [],
        subSubCategories: [],
        nationalities: [],
        purchaseMode: [],
        placeOfPurchase: [],
      },
      isModalOpen: false,
      alertOpenInvalid: false,
      displayMode: "distinct",
    };
  }
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
  }
  componentDidMount() {
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
  }

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

  addMonths = (months) => {
    const tempData = this.state.postObject;
    tempData.months = months;
    this.setState({ postObject: tempData });
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
  render() {
    console.log(this.state.postObject);
    return (
      <div className="body-content">
        <NavTwo />
        <div className="body-content">
          <div className="filters">
            <Menu mode="inline">
              <Menu.Item>
                <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
                  Select Below
                </span>
              </Menu.Item>
              <SubMenu key="Years" title="Years">
                {this.state.years.map((year) => (
                  <Menu.Item key={year}>
                    <Checkbox onClick={(e) => this.addItem("years", year, e)}>
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
                    selectallsubsubcategories={this.selectAllSubSubCategories}
                    selectallsubcategories={this.selectAllSubCategories}
                  />
                ))}
              </SubMenu>
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
              <Menu.Item>
                <Button onClick={this.checkData}>Generate Market Size</Button>
              </Menu.Item>
            </Menu>
          </div>
          <Modal
            visible={this.state.isModalOpen}
            onCancel={() => this.setState({ isModalOpen: false })}
            onOk={() => this.setState({ isModalOpen: false })}
          >
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
                  onClick={() => this.setState({ displayMode: "distinct" })}
                  type="primary"
                  size="large"
                >
                  Broken down in detail (by category, nationality, neighbourhood
                  and time frame){" "}
                </Radio>
                <Radio
                  value="nationality"
                  onClick={() => this.setState({ displayMode: "nationality" })}
                  type="primary"
                  size="large"
                >
                  Broken down by neighbourhood and category with all months in a
                  year added{" "}
                </Radio>
                <Radio
                  value="zones"
                  onClick={() => this.setState({ displayMode: "zones" })}
                  type="primary"
                  size="large"
                >
                  Broken down by category only with all months in a year added{" "}
                </Radio>
              </Space>
            </Radio.Group>
          </Modal>
          <Modal
            visible={this.state.alertOpenInvalid}
            onOk={() => this.setState({ alertOpenInvalid: false })}
            onCancel={() => this.setState({ alertOpenInvalid: false })}
            footer={[
              <Button
                onClick={() => this.setState({ alertOpenInvalid: false })}
              >
                OK
              </Button>,
            ]}
          >
            <h3>You Need To Select All Filters Before Viewing Market Size</h3>
          </Modal>
        </div>

        <Footer />
      </div>
    );
  }
}
