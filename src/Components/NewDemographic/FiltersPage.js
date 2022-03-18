import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { Checkbox, Space } from "antd";

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
        <div className="main-heading">Please select Cities</div>
        <div className="filter-papers">
          <Paper className="city-paper paper">
            {this.props.cities.length > 0 && (
              <Space direction="horizontal">
                <span className="city-header filter-header">Cities</span>
                {this.props.cities.map((city) =>
                  this.props.citiesChecked.includes(city.id) ? (
                    <Checkbox
                      value={city.id}
                      key={city.id}
                      checked={true}
                      onClick={(e) => this.handleCitySelect(e, city.id)}
                    >
                      <span>{city.city}</span>
                    </Checkbox>
                  ) : (
                    <Checkbox
                      value={city.id}
                      key={city.id}
                      onClick={(e) => this.handleCitySelect(e, city.id)}
                      checked={false}
                    >
                      
                      <span>{city.city}</span>
                    </Checkbox>
                  )
                )}
              </Space>
            )}
          </Paper>
        </div>
      </div>
    );
  }
}
