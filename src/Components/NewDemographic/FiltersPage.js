import React from "react";
import { Paper } from "@material-ui/core";
import { Checkbox } from "antd";

export default function FiltersPage({ years, cities, nationalities }) {
  function handleCitySelection(values) {
    console.log(values);
  }
  return (
    <div className="page">
      <div>Please select Cities, Years and Nationalities</div>
      <div className="filter-papers">
        <Paper className="city-paper paper">
          <span className="city-header filter-header">Cities</span>
          {cities.length > 0 && (
            <Checkbox.Group
              onChange={handleCitySelection}
              className="check-box-group"
            >
              {cities.map((city) => (
                <Checkbox value={city.id} key={city.id}>
                  <span>{city.city}</span>
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </Paper>
        <Paper className="year-paper paper">
          <span className="year-header filter-header">Years</span>
        </Paper>
        <Paper className="nationality-paper paper">
          <span className="nationality-header filter-header">
            Nationalities
          </span>
        </Paper>
      </div>
    </div>
  );
}
