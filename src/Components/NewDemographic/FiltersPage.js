import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Checkbox, Space } from "antd";
import { PinDrop, People } from "@material-ui/icons";

import "../../css/Demographic.css";

export default class FiltersPage extends Component {
  constructor(props) {
    super(props);
  }

  handleCitySelect = (e, city) => {
    const cities = this.props.citiesChecked;

    if (e.target.checked) {
      cities.push(city);
    } else {
      const idx = cities.findIndex((c) => c === city);
      if (idx !== -1) cities.splice(idx, 1);
    }

    console.log(cities);

    this.props.handleCitiesCheck(cities);

    console.log(this.props.citiesChecked);
  };

  render() {
    return (
      <div className="page">
        <PinDrop className="bg-logo" style={{ fontSize: "30rem" }} />
        <People className="bg-logo people" style={{ fontSize: "30rem" }} />
        <div className="main-heading">Please select Cities</div>
        <div className="filter-papers">
          <Paper className="city-paper paper mb-5">
            {this.props.cities.length > 0 && (
              <Space direction="vertical">
                <span className="city-header filter-header">Cities</span>
                <div className="city-grid">
                  {this.props.cities.map((city) => (
                    <Checkbox
                      value={city.id}
                      key={city.id}
                      checked={this.props.citiesChecked.includes(city.id)}
                      onClick={(e) => this.handleCitySelect(e, city.id)}
                    >
                      <span style={{ fontSize: "1rem" }}>{city.city}</span>
                    </Checkbox>
                  ))}
                </div>
              </Space>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}
