import React from "react";
import { Paper } from "@material-ui/core";
import { Checkbox } from "antd";

import "../../css/Demographic.css";

export default function FiltersPage({
  years,
  cities,
  nationalities,
  handleCitiesCheck,
  handleYearsCheck,
  handleNationalitiesCheck,
}) {
  return (
    <div className="page">
      <div className="main-heading">
        Please select Cities, Years and Nationalities
      </div>
      <div className="filter-papers">
        <Paper className="city-paper paper">
          <span className="city-header filter-header">Cities</span>
          {cities.length > 0 && (
            <Checkbox.Group
              onChange={handleCitiesCheck}
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
          {years.length > 0 && (
            <Checkbox.Group
              onChange={handleYearsCheck}
              className="check-box-group"
            >
              {years.map((year) => (
                <Checkbox key={year} value={year}>
                  <span>{year}</span>
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </Paper>
        <Paper className="nationality-paper paper">
          <span className="nationality-header filter-header">
            Nationalities
          </span>
          {nationalities.length > 0 && (
            <Checkbox.Group
              onChange={handleNationalitiesCheck}
              className="check-box-group"
            >
              {nationalities.map((nat) => (
                <Checkbox value={nat.id} key={nat.id}>
                  <span>{nat.nationality}</span>
                </Checkbox>
              ))}
            </Checkbox.Group>
          )}
        </Paper>
      </div>
    </div>
  );
}
