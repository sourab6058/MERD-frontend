import React from "react";
import { Paper } from "@material-ui/core";
import { Checkbox } from "antd";

import "../../css/Demographic.css";

export default function FiltersPage({ cities, handleCitiesCheck }) {
  return (
    <div className="page">
      <div className="main-heading">Please select Cities</div>
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
      </div>
    </div>
  );
}
