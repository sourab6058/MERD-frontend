import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import axios from "axios";
import { Layout, Menu, Checkbox, Button, Radio, Space } from "antd";

import SubCategory from "../Dashboard/Menu/SubCategory";
import SubCity from "../Dashboard//Menu/SubCity";
import SubNationality from "../Dashboard/Menu/SubNationality";
import SubMonths from "../Dashboard/Menu/SubMonths";
import PurchaseMode from "../Dashboard/Menu/PurchaseMode";
import PlaceOfPurchase from "../Dashboard/Menu/PlaceOfPurchase";
import { sortZones } from "../../utils/sort";
import * as _ from "lodash";
const { SubMenu, Item } = Menu;

const API_URL = "https://data.merd.online:8000/api/filter";
const CENSUS_DELETE_API = "https://data.merd.online:8000/delete_census/";

// const API_URL = "http://localhost:8000/api/filter";
// const CENSUS_DELETE_API = "http://localhost:8000/delete_census/";
export default class DeleteCensus extends Component {
  constructor(props) {
    super(props);
    this.optionsCreated = false;
    this.state = {
      optionsCreated: false,
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
      },
    };
  }

  componentDidMount() {
    console.log(this.state.postObject);
    let optionData;
    if (!this.optionsCreated) {
      if (localStorage.getItem("option-data")) {
        optionData = JSON.parse(localStorage.getItem("option-data"));
        optionData = Object.entries(optionData.filters[0]);
        optionData = sortZones(optionData);
        this.createData(optionData);
        this.optionsCreated = true;
      } else {
        axios.get(API_URL).then((res) => {
          optionData = Object.entries(res.data.filters[0]);
          localStorage.setItem("option-data", JSON.stringify(res.data));
          optionData = sortZones(optionData);
          this.createData(optionData);
          this.optionsCreated = true;
        });
      }
    }
  }
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
    }
    this.setState({ postObject: tempData }, () =>
      console.log(this.state.postObject)
    );
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
    console.log(this.state.postObject);
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
      tempData[whereToBePushed].splice(
        tempData[whereToBePushed].indexOf(itemToBePushed),
        1
      );
      this.setState({ postObject: tempData });
    }
    console.log(tempData);
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
      console.log(tempData);
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

  createData(receivedData) {
    let optionData = receivedData;
    console.log(receivedData);

    //Using raw api data to fill in menu variables
    //months is static for now, can be changed later
    this.setState({
      years: optionData[0][1],
      category: optionData[3][1],
      cities: optionData[4][1],
      nationality: optionData[2][1],
    });
    this.setState({ menuLoading: false });
    return {
      years: optionData[0][1],
      category: optionData[3][1],
      cities: optionData[4][1],
      nationality: optionData[2][1],
    };
  }

  deleteCensus = () => {
    const postObject = this.state.postObject;
    let valid = false;
    for (let key of Object.keys(postObject)) {
      if (postObject[key].length !== 0) valid = true;
    }
    if (postObject.years.length === 0 && postObject.months.length !== 0) {
      alert("Please select year for months");
      return false;
    }
    if (!valid) {
      alert("Please Select any one filter.");
      return false;
    }
    axios.post(CENSUS_DELETE_API, this.state.postObject).then((res) => {
      console.log(res.data);
    });
  };

  months = [
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

  showSelections = (postObject) => {
    const { cities, zones, category, nationality } = this.state;
    const selections = {
      years: postObject.years.join(", "),
      Months: this.months
        .filter((mon, idx) => {
          if (postObject.months.includes(idx + 1)) return mon;
        })
        .join(", "),
      Cities: cities
        .filter((city) => {
          if (postObject.cities.includes(city.id)) return city;
        })
        .map((city) => city.city)
        .join(", "),
      Categories: "",
      SubCategories: "",
      SubSubCategories: "",
      Nationalities: "",
    };

    console.log("options", cities, zones, category, nationality);
    console.log("postObject", postObject);
    return JSON.stringify(selections);
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
    return finalStr.join(", ");
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
    return finalStr.join(", ");
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
    console.log(this.state.postObject);
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
      checkCity = checkCity.join(", ");
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
    }
    return (
      <div style={{ margin: "1rem" }}>
        <h1 align="center">Delete Census Rows</h1>
        <div style={{ display: "flex" }}>
          <Paper style={{ width: "30vw" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                maxHeight: "100vh",
                borderRight: 0,
                overflowY: "auto",
                overflowX: "hidden",
              }}
              theme={"light"}
            >
              <SubMenu key="City" title="City">
                {this.state.cities.map((city) => (
                  <SubCity
                    key={city.city}
                    city={city}
                    zonesSelected={this.state.postObject.zones}
                    country={city.country}
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
                      checked={this.state.postObject.years.includes(year)}
                    >
                      {year}
                    </Checkbox>
                  </Menu.Item>
                ))}
              </SubMenu>
              <SubMonths
                addmonths={this.addMonths}
                monthsSelected={this.state.postObject.months}
              />
              <SubMenu key="Category" title="Category">
                {this.state.category.map((main) => (
                  <SubCategory
                    key={main.id}
                    checked={this.state.postObject.categories.includes(main.id)}
                    main={main}
                    additem={this.addItem}
                    selectallsubsubcategories={this.selectAllSubSubCategories}
                    selectallsubcategories={this.selectAllSubCategories}
                    subCatgSelected={this.state.postObject.subCategories}
                    subsubcategoriesSelected={
                      this.state.postObject.subSubCategories
                    }
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
                natSelected={this.state.postObject.nationalities}
              />
              <div
                className="view-market-size-div"
                style={{ textAlign: "center" }}
              >
                <Item>
                  <Button
                    type="danger"
                    style={{ color: "red" }}
                    onClick={() => this.deleteCensus()}
                  >
                    Delete Census
                  </Button>
                </Item>
              </div>
            </Menu>
          </Paper>
          <Paper style={{ width: "70vw", padding: "1rem" }}>
            <h2>Selections Made</h2>
            Categories:
            {this.categoryDisplayer(
              checkCategory,
              checkSubCategory,
              checkSubSubCategory
            )}
            <br />
            Cities:{this.zonesToCity(checkZone)}
            <br />
            Years:{checkYear.join(", ")}
            <br />
            Months:{checkMonth.join(", ")}
            <br />
            Nationalities:{checkNationality.join(", ")}
          </Paper>
        </div>
      </div>
    );
  }
}
