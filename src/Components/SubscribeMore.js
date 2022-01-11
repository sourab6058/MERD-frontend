import React, { Component } from "react";
import NavTwo from "./NavTwo";
import Footer from "./Footer";
import { Paper } from "@material-ui/core";
import { Checkbox, Divider } from "antd";
import axios from "axios";

import "../css/SubscribeMore.css";

const API_URL = "http://3.108.159.143:8000/";
const REGISTERATION_URL = "https://merd.online/subscription-confirmation/";

export default class SubscribeMore extends Component {
  constructor(props) {
    super(props);
    this.submitRef = React.createRef();
    this.state = {
      citiesOptions: [],
      categoriesOptions: [],
      citiesSelected: [],
      categoriesSelected: [],
      citiesSubscribed: [],
      categoriesSubscribed: [],
      finalCost: 0,
    };
  }
  componentDidMount = () => {
    //fetching category options
    const categoryFetchUrl = API_URL + "categories";
    axios.get(categoryFetchUrl).then((res) => {
      // console.log(res.data.data);
      const categories = res.data.data.map((cat) => cat.name);
      this.setState({ categoriesOptions: categories });
    });
    //fetching city options
    const cityFetchUrl = API_URL + "cities";
    axios.get(cityFetchUrl).then((res) => {
      // console.log(res.data);
      const cities = res.data.data.map((city) => city.name);
      this.setState({ citiesOptions: cities });
    });
  };
  calcCost = () => {
    const subs =
      this.state.categoriesSelected.length * this.state.citiesSelected.length;

    const cost = subs * 200;

    this.setState({ finalCost: cost });
  };

  handleCatgs = (e) => {
    const cat = e.target.value;
    let catgSelected = this.state.categoriesSelected;
    if (e.target.checked) {
      catgSelected.push(cat);
      catgSelected = [...new Set(catgSelected)];
    } else {
      catgSelected = catgSelected.filter((catg) => catg !== cat);
    }
    this.setState({ categoriesSelected: catgSelected });
    this.calcCost();
  };
  handleCities = (e) => {
    const city = e.target.value;
    let citySelected = this.state.citiesSelected;
    if (e.target.checked) {
      citySelected.push(city);
      citySelected = [...new Set(citySelected)];
    } else {
      citySelected = citySelected.filter((cityname) => cityname !== city);
    }
    this.setState({ citiesSelected: citySelected });
    this.calcCost();
  };
  handleSubscrition = () => {
    this.submitRef.current.click();
  };

  handleSubmit = (e) => {
    e.target.preventDefault();
  };
  render() {
    return (
      <>
        <NavTwo />
        <div className="subscribe-more">
          <h1>Subscribe More</h1>
          <div className="options-container">
            <Paper className="categories options">
              <h3>Categories</h3>
              <br />
              {this.state.categoriesOptions.map((cat, idx) => (
                <Checkbox
                  id={idx}
                  onChange={this.handleCatgs}
                  value={cat}
                  className="checkboxes"
                >
                  {cat}
                </Checkbox>
              ))}
            </Paper>
            <Paper className="cities options">
              <h3>Cities</h3> <br />
              {this.state.citiesOptions.map((city, idx) => (
                <Checkbox
                  id={this.state.categoriesOptions.length + idx}
                  value={city}
                  onChange={this.handleCities}
                >
                  {city}
                </Checkbox>
              ))}
            </Paper>
            <div className="order-container">
              <Paper className="order-part">
                <h3>Your Order</h3>
                <Divider />
                <div className="order-list">
                  <div className="row">
                    <span
                      style={{ fontSize: "1.5rem", color: "rgb(90, 90, 90)" }}
                    >
                      Cities Selected:
                    </span>
                    <span>
                      {this.state.citiesSelected.length
                        ? this.state.citiesSelected.join()
                        : "None"}
                    </span>
                  </div>
                  <div className="row">
                    <span
                      style={{ fontSize: "1.5rem", color: "rgb(90, 90, 90)" }}
                    >
                      Categories Selected:
                    </span>
                    <span style={{ alignSelf: "right" }}>
                      {this.state.categoriesSelected.length
                        ? this.state.categoriesSelected.join()
                        : "None"}
                    </span>
                  </div>
                  <Divider />
                  <div className="row">
                    <span
                      style={{ fontSize: "1.5rem", color: "rgb(90, 90, 90)" }}
                    >
                      Total
                    </span>
                    <span
                      style={{ fontSize: "2rem", color: "rgb(0, 255, 34)" }}
                    >
                      {`$${this.state.finalCost}`}
                    </span>
                  </div>
                </div>
              </Paper>
              <span
                className={
                  this.state.categoriesSelected.length *
                  this.state.citiesSelected.length
                    ? "order-btn"
                    : "order-btn disabled"
                }
                onClick={this.handleSubscrition}
              >
                Place Order
              </span>
            </div>
          </div>
        </div>
        <form
          action={REGISTERATION_URL}
          method="POST"
          style={{ visibility: "hidden" }}
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="cities"
            value={this.state.citiesSelected.join()}
          />
          <input
            type="text"
            name="categories"
            value={this.state.categoriesSelected.join()}
          />
          <input
            type="text"
            name="amount"
            value={this.state.finalCost.toString()}
          />
          <input type="submit" ref={this.submitRef} />
        </form>
        <Footer />
      </>
    );
  }
}
