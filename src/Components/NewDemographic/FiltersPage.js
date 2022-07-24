import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Checkbox, Menu, Space } from "antd";
import { PinDrop, People, ExpandMore } from "@material-ui/icons";

import "../../css/Demographic.css";

export default class FiltersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (localStorage.getItem("selectionsMade")) {
      let selectionsMade = JSON.parse(localStorage.getItem("selectionsMade"));
      if (selectionsMade.type === "demogpc") {
        this.props.setPostObject(selectionsMade);
      }
    }
  }

  handleCitySelect = (e, city) => {
    const cities = this.props.citiesChecked;

    if (e.target.checked) {
      cities.push(city);
    } else {
      const idx = cities.findIndex((c) => c === city);
      if (idx !== -1) cities.splice(idx, 1);
    }

    this.props.handleCitiesCheck(cities);

    console.log(this.props.citiesChecked);
  };
  citiesMenu = (citiesOptions) => {
    const countries = [];
    for (let city of citiesOptions) {
      const idx = countries.findIndex(
        (country) => country.country === city.country.country
      );
      if (idx === -1) {
        countries.push({
          country: city.country.country,
          cities: [{ id: city.id, city: city.city }],
        });
      } else {
        countries[idx].cities.push({ id: city.id, city: city.city });
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
              marginRight: "4px",
            }}
          >
            {country.cities.map((city, idx) => (
              <Menu.Item key={city.city}>
                <Checkbox
                  value={city.id}
                  checked={this.props.citiesChecked.includes(city.id)}
                  onClick={(e) => this.handleCitySelect(e, city.id)}
                >
                  {city.city}
                </Checkbox>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ))}
      </Menu>
    );
  };

  getCheckedCitiesName = () => {
    const names = [];
    this.props.cities.forEach((city) => {
      this.props.citiesChecked.forEach((cityChecked) => {
        if (cityChecked === city.id) names.push(city.city);
      });
    });
    return names.join(", ");
  };

  render() {
    return (
      <div className="page">
        <PinDrop className="bg-logo" style={{ fontSize: "30rem" }} />
        <People className="bg-logo people" style={{ fontSize: "30rem" }} />
        <div className="main-heading">Please select Cities</div>
        <div className="filter-papers">
          <Space direction="vertical">
            <Paper className="city-paper paper mb-5">
              {this.props.cities.length > 0 &&
                this.citiesMenu(this.props.cities)}
            </Paper>
            <Paper
              style={{
                marginTop: "2rem",
                padding: "1rem",
                maxWidth: "50%",
              }}
            >
              <h3>Cities Selected: </h3>

              <span style={{ fontSize: "1.5rem" }}>
                {this.getCheckedCitiesName()}
              </span>
            </Paper>
          </Space>
        </div>
      </div>
    );
  }
}
