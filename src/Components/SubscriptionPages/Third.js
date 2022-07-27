import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper } from "@material-ui/core";
import { Checkbox } from "antd";

import "../../css/SubscriptionPages/styles.css";

const CITY_URL = "https://data.merd.online:8000/cities";
const CATEGORY_URL = "https://data.merd.online:8000/categories";

const Third = ({ handleNext, handlePrev, handleCheck, subTo }) => {
  const [cityOptions, setCityOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
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
    console.log(e.target.checked, e.target.value);
  }

  const demographic = (
    <div>
      <Paper style={{ marginTop: "100px" }}>
        <h1>Demographic</h1>
        {cityOptions.map((city) => (
          <Checkbox value={city.name} onChange={checkCities}>
            <span>{city.name}</span>
          </Checkbox>
        ))}
      </Paper>
    </div>
  );
  const allProducts = (
    <div>
      <Paper style={{ marginTop: "100px" }}>
        <h1>All Products</h1>
        {cityOptions.map((city) => (
          <Checkbox value={city.name} onChange={checkCities}>
            <span>{city.name}</span>
          </Checkbox>
        ))}
        <br />
        {categoryOptions.map((cat) => (
          <Checkbox value={cat.name} onChange={checkCities}>
            <span>{cat.name}</span>
          </Checkbox>
        ))}
      </Paper>
    </div>
  );

  return (
    <>
      <div className="sub-container third">
        <span onClick={handlePrev} className="btn">
          Back
        </span>
        {subTo === "demographic" ? demographic : allProducts}
      </div>
    </>
  );
};

export default Third;
