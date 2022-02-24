import React from "react";
import { Checkbox, Space } from "antd";
import { Paper } from "@material-ui/core";

import "../../css/Demographic.css";

export default function TableTypesPage({ handleTypeCheck }) {
  return (
    <div>
      <span className="page-title" align="center">
        What would you like to view?
      </span>
      <Paper>
        <Checkbox.Group onChange={handleTypeCheck}>
          <div className="checkboxes-container">
            <Space direction="vertical">
              <Checkbox value="income_checked">Income Levels</Checkbox>
              <Checkbox value="population_checked">Population</Checkbox>
              <Checkbox value="capita_checked">
                Retail Spend Per Capita
              </Checkbox>
              <Checkbox value="age_checked">Age Distribution</Checkbox>
              <Checkbox value="labourers_checked">
                Percentage Labourers
              </Checkbox>
              <Checkbox value="families_checked">
                Percentage without families but not labourers
              </Checkbox>
            </Space>
          </div>
        </Checkbox.Group>
      </Paper>
    </div>
  );
}
