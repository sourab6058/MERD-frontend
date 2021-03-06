import React from "react";
import { Checkbox, Space } from "antd";
import { Paper } from "@material-ui/core";

import "../../css/Demographic.css";

export default function TableTypesPage({ handleTypeCheck, types }) {
  function handleOnClick(e) {
    const new_types = types;

    if (e.target.checked) {
      new_types.push(e.target.value);
    } else {
      const idx = new_types.findIndex((c) => c === e.target.value);
      if (idx !== -1) new_types.splice(idx, 1);
    }

    console.log(new_types);

    handleTypeCheck(new_types);
  }

  return (
    <div>
      <div className="page-title mb-0" align="center">
        What would you like to view?
      </div>
      <Paper>
        <div className="checkboxes-container rounded-lg shadow-lg p-4">
          <Space direction="vertical">
            {types.includes("income_checked") ? (
              <Checkbox
                value="income_checked"
                checked={true}
                onClick={(e) => handleOnClick(e)}
              >
                Income Levels
              </Checkbox>
            ) : (
              <Checkbox
                value="income_checked"
                checked={false}
                onClick={(e) => handleOnClick(e)}
              >
                Income Levels
              </Checkbox>
            )}
            {types.includes("population_checked") ? (
              <Checkbox
                value="population_checked"
                checked={true}
                onClick={(e) => handleOnClick(e)}
              >
                Population
              </Checkbox>
            ) : (
              <Checkbox
                value="population_checked"
                checked={false}
                onClick={(e) => handleOnClick(e)}
              >
                Population
              </Checkbox>
            )}
            {types.includes("age_checked") ? (
              <Checkbox
                value="age_checked"
                checked={true}
                onClick={(e) => handleOnClick(e)}
              >
                Age Distribution
              </Checkbox>
            ) : (
              <Checkbox
                value="age_checked"
                checked={false}
                onClick={(e) => handleOnClick(e)}
              >
                Age Distribution
              </Checkbox>
            )}
          </Space>
        </div>
      </Paper>
    </div>
  );
}
