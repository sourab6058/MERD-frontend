import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Checkbox } from "antd";
import numberWithCommas from "../../utils/commaSeparated";

import "../../css/SubscriptionPages/styles.css";

const CITY_URL = "https://data.merd.online:8000/cities";
const REGISTERATION_URL = "https://merd.online/subscription-confirmation/";
const CATEGORY_URL = "https://data.merd.online:8000/categories";

const Third = ({
  handleNext,
  citiesChecked,
  categoriesChecked,
  setCities,
  setCategories,
  handlePrev,
  subTo,
}) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    setCategories(["Demographic"]);
    axios.get(CITY_URL).then((res) => setCityOptions(res.data.data));
    axios
      .get(CATEGORY_URL)
      .then((res) =>
        setCategoryOptions(
          res.data.data.filter(
            (cat) =>
              !["Demographic", "City Report", "Tourist Report"].includes(
                cat.name
              )
          )
        )
      );
  }, []);

  function checkCities(e) {
    let cities;
    if (e.target.checked) {
      cities = [...new Set([...citiesChecked, e.target.value])];
    } else {
      cities = citiesChecked;
      cities = cities.filter((city) => city !== e.target.value);
    }
    setCities(cities);
  }
  function checkCategories(e) {
    let categories;
    if (e.target.checked) {
      categories = [...new Set([...categoriesChecked, e.target.value])];
    } else {
      categories = categoriesChecked;
      categories = categories.filter((cat) => cat !== e.target.value);
    }
    setCategories(categories);
  }

  function calCost() {
    let count = citiesChecked.length;
    let curCost = 1000;
    if (subTo !== "demographic") {
      count *= categoriesChecked.length;
      curCost = 3000;
    }
    console.log(categoriesChecked.length);
    let total = 0;
    for (let n = 1; n <= count; n++) {
      total += curCost * Math.pow(0.8, n - 1);
    }
    total = Math.floor(total * 0.1) * 10;
    return total;
  }

  const cityDiv = (
    <Paper
      style={{
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", margin: "12px" }}>Select Cities</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          rowGap: "20px",
        }}
      >
        {cityOptions.map((city) => (
          <Checkbox
            value={city.name}
            key={city.name}
            onClick={checkCities}
            checked={citiesChecked.includes(city.name)}
          >
            {city.name}
          </Checkbox>
        ))}
      </div>
    </Paper>
  );

  const categoriesDiv = (
    <Paper
      style={{
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", margin: "12px" }}>Select Categories</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          rowGap: "20px",
        }}
      >
        {categoryOptions.map((cat) => (
          <Checkbox
            value={cat.name}
            key={cat.name}
            onClick={checkCategories}
            checked={categoriesChecked.includes(cat.name)}
          >
            {cat.name}
          </Checkbox>
        ))}
      </div>
    </Paper>
  );

  const demographic = (
    <div style={{ margin: "50px" }}>
      <h1>Demographic</h1>
      {cityDiv}
    </div>
  );
  const allProducts = (
    <div style={{ margin: "50px" }}>
      <h1>All Products</h1>
      {cityDiv}
      <br />
      {categoriesDiv}
    </div>
  );

  function clearChecked() {
    if (subTo === "demographic") setCategories(["Demographic"]);
    else setCategories([]);
    setCities([]);
  }

  function subscribe() {
    let form = document.createElement("form");
    form.style.visibility = "hidden"; // no user interaction is necessary
    form.method = "POST"; // forms by default use GET query strings
    form.action = REGISTERATION_URL;

    const cityInput = document.createElement("input");
    cityInput.name = "cities";
    cityInput.value = citiesChecked.toString();
    form.appendChild(cityInput);

    const categoryInput = document.createElement("input");
    categoryInput.name = "categories";
    categoryInput.value = categoriesChecked.toString();
    form.appendChild(categoryInput);

    const amountInput = document.createElement("input");
    amountInput.name = "amount";
    amountInput.value = calCost().toString();
    form.appendChild(amountInput);

    document.body.appendChild(form); // forms cannot be submitted outside of body
    form.submit();
  }

  return (
    <>
      <div className="sub-container third">
        <span onClick={handlePrev} className="btn">
          Back
        </span>
        {subTo === "demographic" ? demographic : allProducts}
        <Paper
          style={{
            padding: "10px",
            paddingInline: "100px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "2rem", color: "black" }}>
              Total Subscriptions:
            </span>
            <span style={{ fontSize: "2rem", color: "green" }}>
              {citiesChecked.length * categoriesChecked.length}
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "2rem", color: "black" }}>
              Total Cost:
            </span>
            <span style={{ fontSize: "2rem", color: "green" }}>
              ${numberWithCommas(calCost())}
            </span>
          </div>
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "50px",
          }}
        >
          <span className="sub-btn" onClick={clearChecked}>
            Clear
          </span>
          <span className="sub-btn" onClick={subscribe}>
            Subscribe
          </span>
        </div>
      </div>
    </>
  );
};

export default Third;
